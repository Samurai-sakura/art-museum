import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { PictureInterface } from "@interfaces/data.interface";
import { LocalStorageService } from "@app/services/add-remove-local-storage.service";
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: "app-favorites",
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: "./favorites.component.html",
  styleUrl: "./favorites.component.scss",
  providers: [LocalStorageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent implements OnInit {
  pictures: PictureInterface[] = [];
  constructor(private localStorageService: LocalStorageService, private destroyRef: DestroyRef) {}

  ngOnInit(): void {
    // this.loadItems();
    this.localStorageService.favorites$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data) => {
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
