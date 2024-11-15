import { AfterViewInit, Directive, ElementRef, Input, OnInit } from '@angular/core';
import { PictureInterface } from '@app/interfaces/data.interface';

@Directive({
  selector: '[appIsFavorite]',
  standalone: true
})
export class IsFavoriteDirective implements AfterViewInit, OnInit{

  @Input('appIsFavorite') pictureId?: number;
  isFavorite = false;
  favorites: PictureInterface[] = [];
  private _el: ElementRef;

  constructor(el: ElementRef) {
    this._el = el;
  }

  ngOnInit(): void {
    let picture;
    if(typeof window !== 'undefined'){
      picture = localStorage.getItem('favorites');
      this.favorites = picture ? JSON.parse(picture).pictures : [];
    }
    this.isFavorite = this.favorites.some((obj: PictureInterface) => 
      Object.values(obj).includes(this.pictureId)
    )
    if(this.isFavorite){
      this.changeColor(this._el)
    }
  }

  ngAfterViewInit(): void {
    if(this.isFavorite){
      this.changeColor(this._el)
    }
  }


  changeColor(el: ElementRef){
    el.nativeElement.style.backgroundColor = "black"
  }

}
