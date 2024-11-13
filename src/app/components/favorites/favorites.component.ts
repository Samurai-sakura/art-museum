import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { PictureInterface } from "@interfaces/data.interface";
import { LocalStorageService } from "@services/local-storage.service";

@Component({
  selector: "app-favorites",
  standalone: true,
  imports: [],
  templateUrl: "./favorites.component.html",
  styleUrl: "./favorites.component.scss",
  providers: [LocalStorageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent implements OnInit {
  pictures: PictureInterface[] = [];
  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    // this.loadItems();
    this.localStorageService.favorites$.subscribe((data) => {
      this.pictures = data;
    });
  }

  // public loadItems() {
  //   const pictures = localStorage.getItem("favorites");
  //   if (pictures) {
  //     this.pictures = JSON.parse(pictures).pictures;
  //   }
  // }

  setToFavorites(picture: PictureInterface): void {
    this.localStorageService.addToLocalStorage(picture);
  }
}
