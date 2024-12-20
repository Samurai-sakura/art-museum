import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, signal } from "@angular/core";
import { PictureInterface } from "@interfaces/data.interface";
import { Pagination } from "@interfaces/pagination.interface";
import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { Config } from "@interfaces/config.interface";
import { pictureCardMapper } from "@utils/picture-mapper";
import { LoadingSpinerComponent } from "@components/loading-spiner/loading-spiner.component";
import { RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { LocalStorageService } from "@app/services/add-remove-local-storage.service";
import { PaginationService } from "@app/services/response-pagination-pictures.service";
import { ResponseService } from "@app/services/response-pictures.service";
import { debounceTime, distinctUntilChanged, Subject, tap } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { IsFavoriteDirective } from "@app/directives/is-favorite.directive";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    NgbPaginationModule,
    LoadingSpinerComponent,
    RouterLink,
    ReactiveFormsModule,
    IsFavoriteDirective
  ],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
  providers: [ResponseService, PaginationService, LocalStorageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  pictures: PictureInterface[] = [];
  paginationParameters: Pagination = {
    total: 0,
    limit: 0,
    next_url: "",
    prev_url: "",
    current_page: 0,
  };
  searchPictures: PictureInterface[] = [];
  isPagination = false;
  isPicture = true;
  config: Config = {
    iiif_url: "",
    website_url: "",
  };
  searchString = "";
  private searchSubject: Subject<string> = new Subject<string>(); 
  pageNumber = 1;
  paginationPictures: PictureInterface[] = [];
  isLoading = signal<boolean>(false);
  paginationLoading = signal<boolean>(false)

  searchForm = new FormGroup({
      search: new FormControl("", [Validators.pattern(/^[A-Za-zА-Яа-яЁё\s]+$/)]),
  });

  constructor(
    private responseService: ResponseService,
    private paginationService: PaginationService,
    private localStorageService: LocalStorageService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this.responseService.getData().pipe(
      tap(() => this.isLoading.set(true)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((res) => {
      this.paginationParameters = res.pagination;
      this.config = res.config;
      this.pictures = pictureCardMapper(res.data, this.config);
      this.searchPictures = this.pictures;
    });
    
    this.paginationService.getData(this.pageNumber)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.paginationPictures = res.data;
        this.paginationPictures = this.paginationPictures.slice(0, 3);
        this.paginationPictures = pictureCardMapper(
          this.paginationPictures,
          this.config
        );
        this.isLoading.set(false);
      });

      this.searchSubject
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          takeUntilDestroyed(this.destroyRef)
        )
        .subscribe(() => {
          this.searchArts();
        });
  }

  onSearchChange(value: Event): void {
    const target = value.target as HTMLInputElement
    this.searchString = target.value; 
    this.searchSubject.next(target.value); 
  }

  searchArts(): void {
    if (!this.searchForm.get('search')?.value) {
      return;
    }
    const searchTerm = this.searchForm.value.search!.toLowerCase();

    const allPictures = [...this.pictures, ...this.paginationPictures];

    this.searchPictures = allPictures.filter((picture) =>
      picture.title.toLowerCase().includes(searchTerm) || 
      picture.artist_title.toLowerCase().includes(searchTerm)
    );
    this.searchPictures = this.searchPictures.filter(
      (item, index, self) => index === self.findIndex((t) => t.id === item.id)
    );
  }

      // this.searchPictures = this.pictures.filter((picture) =>
    //   picture.title.toLowerCase().includes(this.searchForm.value.search!.toLowerCase())
    // );
    // this.searchPictures = this.searchPictures.concat(
    //   this.paginationPictures.filter((picture) =>
    //     picture.title.toLowerCase().includes(this.searchForm.value.search!.toLowerCase())
    //   )
    // );
    // this.searchPictures = this.searchPictures.concat(
    //   this.pictures.filter((picture) =>
    //     picture.artist_title
    //       .toLowerCase()
    //       .includes(this.searchForm.value.search!.toLowerCase())
    //   )
    // );
    // this.searchPictures = this.searchPictures.concat(
    //   this.paginationPictures.filter((picture) =>
    //     picture.artist_title
    //       .toLowerCase()
    //       .includes(this.searchForm.value.search!.toLowerCase())
    //   )
    // );

  selectChanged(value: Event): void {
    const target = value.target as HTMLSelectElement;
    const sortKey = target.value;

    const sortFunc = (a: PictureInterface, b: PictureInterface) => {
      const aValue = a[sortKey === "title" ? "title" : sortKey === "author" ? "artist_title" : "place_of_origin"];
      const bValue = b[sortKey === "title" ? "title" : sortKey === "author" ? "artist_title" : "place_of_origin"];
      
      return aValue.localeCompare(bValue);
    };
    
    this.searchPictures.sort(sortFunc);
  }
    // if (target.value === "title") {
    //   this.searchPictures.sort((a, b) => {
    //     if (a.title < b.title) {
    //       return -1;
    //     }
    //     if (a.title > b.title) {
    //       return 1;
    //     }
    //     return 0;
    //   });
    // } else if (target.value === "author") {
    //   this.searchPictures.sort((a, b) => {
    //     if (a.artist_title < b.artist_title) {
    //       return -1;
    //     }
    //     if (a.artist_title > b.artist_title) {
    //       return 1;
    //     }
    //     return 0;
    //   });
    // } else {
    //   this.searchPictures.sort((a, b) => {
    //     if (a.place_of_origin < b.place_of_origin) {
    //       return -1;
    //     }
    //     if (a.place_of_origin > b.place_of_origin) {
    //       return 1;
    //     }
    //     return 0;
    //   });
    // }

  onPageChanged(pageNumber: number): void {
    this.paginationService
      .getData(pageNumber)
      .pipe(
        takeUntilDestroyed(this.destroyRef), 
        tap(() => this.paginationLoading.set(true)))
      .subscribe((res) => {
        this.paginationPictures = res.data.splice(0, 3);
        this.pageNumber = res.pagination.current_page;
        this.paginationPictures = pictureCardMapper(
          this.paginationPictures,
          this.config
        );
        this.paginationLoading.set(false);
      });
  }

  setToFavorites(picture: PictureInterface, link: HTMLButtonElement): void {
    this.localStorageService.addToLocalStorage(picture);
    if(link.style.backgroundColor == "black"){
      link.style.backgroundColor = '#f9f9f9';
      return;
    }
    link.style.backgroundColor = 'black';
  }
}
