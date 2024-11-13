import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DetailsService } from "@app/services/response-details-picture.service";
import { PictureInterface } from "@interfaces/data.interface";
import { HttpClientModule } from "@angular/common/http";
import { LoadingSpinerComponent } from "@components/loading-spiner/loading-spiner.component";
import { CommonModule } from "@angular/common";
import { Config } from "@interfaces/config.interface";
import { Painter } from "@interfaces/painter-info.interface";
import { LocalStorageService } from "@app/services/add-remove-local-storage.service";
import { onePictureCardMapper } from "@utils/one-picture-mapper";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-details",
  standalone: true,
  imports: [HttpClientModule, LoadingSpinerComponent, CommonModule],
  templateUrl: "./details.component.html",
  styleUrl: "./details.component.scss",
  providers: [DetailsService, LocalStorageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit {
  itemId: number | string | null = null;
  pageNumber: boolean | null | string = null;
  picture: PictureInterface = {
    id: 0,
    title: "",
    thumbnail: {
      lqip: "",
      alt_text: "",
    },
    date_end: "",
    date_start: "",
    date_display: "",
    place_of_origin: "",
    credit_line: "",
    artist_display: "",
    artist_title: "",
    dimensions: "",
    image_id: "",
    image_url: "",
    main_reference_number: "",
  };
  loading = false;
  painter_info: Painter = {
    main_reference_number: "",
    painter_nationality: "",
  };
  artist_life: string | null | RegExpMatchArray = "";
  config: Config = {
    iiif_url: "",
    website_url: "",
  };

  private destroyRef = inject(DestroyRef);

  constructor(
    private route: ActivatedRoute,
    private detailsService: DetailsService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      this.itemId = params.get("id");

      this.detailsService.getData(this.itemId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((res) => {
        this.picture = res.data;
        this.config = res.config;
        this.picture = onePictureCardMapper(this.picture, this.config);
        this.painter_info.main_reference_number =
          this.picture.date_start + "-" + this.picture.date_end;
        this.painter_info.painter_nationality = this.picture.place_of_origin;
        this.loading = false;
      });
    });
  }

  setToFavorites(link: HTMLButtonElement): void {
    this.localStorageService.addToLocalStorage(this.picture);
    link.style.backgroundColor = 'black';
  }
}
