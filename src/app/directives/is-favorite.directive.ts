import { AfterViewInit, Directive, ElementRef, Input, OnInit } from '@angular/core';
import { PictureInterface } from '@app/interfaces/data.interface';

@Directive({
  selector: '[appIsFavorite]',
  standalone: true
})
export class IsFavoriteDirective implements AfterViewInit, OnInit{

  @Input('appIsFavorite') pictureId?: number;
  isFavorite = false;

  private _el: ElementRef;

  constructor(el: ElementRef) {
    this._el = el;
  }

  ngOnInit(): void {
    const picture = localStorage.getItem('favorites');
    let pic;
    if(picture){
      pic = JSON.parse(picture);
    }
    this.isFavorite = pic.pictures.some((obj: PictureInterface) => 
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
