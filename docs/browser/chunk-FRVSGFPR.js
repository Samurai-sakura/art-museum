import { a as l } from "./chunk-VF6U3J5G.js";
import {
  $a as C,
  Aa as x,
  Pa as d,
  Ua as u,
  Va as v,
  Wa as t,
  Xa as i,
  Ya as c,
  Za as h,
  _ as s,
  ab as b,
  fb as o,
  ga as f,
  gb as p,
  ha as m,
  lb as w,
  mb as P,
  wa as g,
  za as a,
} from "./chunk-GLZPDDGB.js";
var S = (r, e) => e.id;
function I(r, e) {
  if (r & 1) {
    let n = h();
    t(0, "div", 8)(1, "a", 9),
      c(2, "img", 10),
      i(),
      t(3, "div", 11)(4, "div", 12),
      o(5),
      i(),
      t(6, "span", 13),
      o(7),
      i(),
      t(8, "span", 14),
      o(9, "Public"),
      i()(),
      t(10, "div", 15)(11, "button", 16),
      C("click", function () {
        let O = f(n).$implicit,
          M = b();
        return m(M.setToFavorites(O));
      }),
      c(12, "img", 17),
      i()()();
  }
  if (r & 2) {
    let n = e.$implicit;
    a(2), d("src", n.image_url, g), a(3), p(n.title), a(2), p(n.artist_title);
  }
}
var y = class r {
  constructor(e) {
    this.localStorageService = e;
  }
  pictures = [];
  ngOnInit() {
    this.loadItems();
  }
  loadItems() {
    let e = localStorage.getItem("favorites");
    e && (this.pictures = JSON.parse(e).pictures);
  }
  setToFavorites(e) {
    this.localStorageService.addToLocalStorage(e);
  }
  static ɵfac = function (n) {
    return new (n || r)(x(l));
  };
  static ɵcmp = s({
    type: r,
    selectors: [["app-favorites"]],
    standalone: !0,
    features: [w([l]), P],
    decls: 15,
    vars: 0,
    consts: [
      [1, "favorites__container"],
      [1, "favorites__title"],
      [
        "src",
        "icons/BigVector.png",
        "alt",
        "",
        "width",
        "40px",
        1,
        "favorites__vector",
      ],
      [1, "orange__text"],
      [1, "home__container__text"],
      [1, "little__text"],
      [1, "big__text"],
      [1, "pictures__container"],
      [1, "picture__item"],
      ["href", "", 1, "link__menu"],
      ["alt", "", 1, "image__item", 3, "src"],
      [1, "picture__text__container"],
      [1, "picture__text__title"],
      [1, "picture__text__artist"],
      [1, "picture__text_public"],
      [1, "picture__favorites"],
      [1, "button__favorites", 3, "click"],
      ["src", "icons/Vector.png", "alt", ""],
    ],
    template: function (n, _) {
      n & 1 &&
        (t(0, "div", 0)(1, "span", 1),
        o(2, "Here Are Your"),
        i(),
        t(3, "span", 1),
        c(4, "img", 2),
        t(5, "span", 3),
        o(6, "Favorites"),
        i()()(),
        t(7, "div", 4)(8, "span", 5),
        o(9, "Saved by you"),
        i(),
        t(10, "span", 6),
        o(11, "Your favorites list"),
        i()(),
        t(12, "div", 7),
        u(13, I, 13, 3, "div", 8, S),
        i()),
        n & 2 && (a(13), v(_.pictures));
    },
    styles: [
      ".favorites__container[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;margin-top:100px}.orange__text[_ngcontent-%COMP%]{color:#f17900;margin-left:25px}.favorites__title[_ngcontent-%COMP%]{display:block;font-family:Lexend Deca;font-size:64px;font-weight:700;line-height:80px;text-align:center}.favorites__vector[_ngcontent-%COMP%]{margin-bottom:5px}.little__text[_ngcontent-%COMP%]{font-family:Lexend Deca;font-size:16px;font-weight:400;line-height:20px;text-align:left;color:#e0a449}.big__text[_ngcontent-%COMP%]{font-family:Lexend Deca;font-size:32px;font-weight:400;line-height:40px;text-align:left;margin-bottom:40px}.home__container__text[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;margin-top:100px;flex-direction:column}.pictures__container[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:center;justify-content:space-between;padding:0 30px;gap:16px;margin-bottom:100px}.picture__item[_ngcontent-%COMP%]{display:flex;width:416px;height:130px;border:2px solid #f0f1f1;background-color:#fff;margin-bottom:10px;padding:16px;gap:10px}.picture__text__title[_ngcontent-%COMP%]{display:block;font-family:Inter;font-size:17.54px;font-weight:500;line-height:26.32px;letter-spacing:-.03em;text-align:left;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.picture__text__artist[_ngcontent-%COMP%]{display:block;font-family:Inter;font-size:17.54px;font-weight:400;line-height:26.32px;letter-spacing:-.03em;text-align:left;color:#e0a449}.picture__text_public[_ngcontent-%COMP%]{font-family:Inter;font-size:15.35px;font-weight:700;line-height:26.32px;letter-spacing:-.01em;text-align:left;display:block;margin-top:15px}.button__favorites[_ngcontent-%COMP%]{border:none;background-color:#f9f9f9;width:90%;height:90%;border-radius:30%}.picture__text__container[_ngcontent-%COMP%]{display:inline-block;width:219px;margin-left:5px;overflow:hidden;white-space:nowrap}.picture__favorites[_ngcontent-%COMP%]{width:59px;height:59px;padding-top:5px;padding-left:5px;border-radius:50%;background-color:#f9f9f9;margin-top:15px}.image__item[_ngcontent-%COMP%]{border-radius:inherit;object-fit:cover;width:100%;height:100%}.link__menu[_ngcontent-%COMP%]{cursor:pointer;display:block;width:90px;height:90px}@media (max-width: 921px){.pictures__container[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center}}@media (max-width: 490px){.picture__item[_ngcontent-%COMP%]{width:350px}.picture__favorites[_ngcontent-%COMP%]{padding-left:4px}}@media (max-width: 410px){.picture__item[_ngcontent-%COMP%]{width:310px}.picture__favorites[_ngcontent-%COMP%]{padding-left:3px}.favorites__title[_ngcontent-%COMP%]{font-size:40px}.little__text[_ngcontent-%COMP%]{font-size:10px}.big__text[_ngcontent-%COMP%]{font-size:26px}}",
    ],
    changeDetection: 0,
  });
};
export { y as FavoritesComponent };
