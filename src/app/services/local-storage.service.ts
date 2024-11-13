import { Injectable } from "@angular/core";
import { PictureInterface } from "../interfaces/data.interface";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  private favorites: PictureInterface[] = [];
  private favoritesSubject = new BehaviorSubject<PictureInterface[]>(
    this.favorites
  );
  favorites$ = this.favoritesSubject.asObservable();

  constructor() {
    this.loadFavorites();
  }

  private loadFavorites() {
    if (typeof window !== "undefined") {
      const favorites = localStorage.getItem("favorites");
      this.favorites = favorites ? JSON.parse(favorites).pictures : [];
      this.favoritesSubject.next(this.favorites);
    }
  }

  addToLocalStorage(pictureArgument: PictureInterface) {
    const favorites: string | null = localStorage.getItem("favorites");

    if (favorites) {
      const fav = JSON.parse(favorites);
      const index = fav.pictures.findIndex(
        (p: PictureInterface) => p.id === pictureArgument.id
      );

      if (index > -1) {
        fav.pictures.splice(index, 1);
      } else {
        fav.pictures.push(pictureArgument);
      }

      localStorage.setItem("favorites", JSON.stringify(fav));
      this.favoritesSubject.next(fav.pictures);
    } else {
      const newFavorites = { pictures: [pictureArgument] };
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      this.favoritesSubject.next(newFavorites.pictures);
    }
  }
}
