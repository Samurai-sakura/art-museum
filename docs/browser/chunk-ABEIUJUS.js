import { a as L, b as k, c as z } from "./chunk-JX5YAWL4.js";
import { b as I, d as w, e as D, f as E, i as j } from "./chunk-6WXTCIC4.js";
import { a as d } from "./chunk-VF6U3J5G.js";
import {
  $a as M,
  Aa as s,
  Ma as y,
  Pa as _,
  Q as u,
  V as x,
  Wa as a,
  Xa as i,
  Ya as m,
  Za as P,
  _ as h,
  ab as g,
  fb as n,
  ga as b,
  gb as f,
  ha as v,
  hb as c,
  lb as O,
  mb as S,
  wa as C,
  za as r,
} from "./chunk-GLZPDDGB.js";
var l = class e {
  constructor(o) {
    this.httpClient = o;
  }
  getData(o) {
    return this.httpClient.get(z.apiUrl + `/${o}`);
  }
  static ɵfac = function (t) {
    return new (t || e)(x(D));
  };
  static ɵprov = u({ token: e, factory: e.ɵfac, providedIn: "root" });
};
function A(e, o) {
  return (
    e.image_id
      ? (e.image_url = o.iiif_url + "/" + e.image_id + L)
      : (e.image_url = "icons/image 2.png"),
    e
  );
}
function N(e, o) {
  e & 1 && m(0, "app-loading-spiner");
}
function V(e, o) {
  if (e & 1) {
    let t = P();
    a(0, "div", 2)(1, "div", 3),
      m(2, "img", 4),
      a(3, "button", 5),
      M("click", function () {
        b(t);
        let F = g();
        return v(F.setToFavorites());
      }),
      m(4, "img", 6),
      i()(),
      a(5, "div", 7)(6, "span", 8),
      n(7),
      i(),
      a(8, "span", 9),
      n(9),
      i(),
      a(10, "span", 10),
      n(11),
      i(),
      a(12, "span", 11),
      n(13, "Overview"),
      i(),
      a(14, "span", 12)(15, "span", 13),
      n(16, "Artist nacionality: "),
      i(),
      n(17),
      i(),
      a(18, "span", 12)(19, "span", 13),
      n(20, "Dimensions: Sheet: "),
      i(),
      n(21),
      i(),
      a(22, "span", 12)(23, "span", 13),
      n(24, "Credit Line: "),
      i(),
      n(25),
      i(),
      a(26, "span", 12)(27, "span", 13),
      n(28, "Repository: "),
      i(),
      n(29),
      i(),
      a(30, "span", 14),
      n(31, "Public"),
      i()()();
  }
  if (e & 2) {
    let t = g();
    r(2),
      _("src", t.picture.image_url, C),
      r(5),
      f(t.picture.title),
      r(2),
      f(t.picture.artist_title),
      r(2),
      f(t.painter_info.main_reference_number),
      r(6),
      c(" ", t.painter_info.painter_nationality, " "),
      r(4),
      c(" ", t.picture.dimensions, " "),
      r(4),
      c(" ", t.picture.credit_line, " "),
      r(4),
      c(" ", t.picture.place_of_origin, " ");
  }
}
var T = class e {
  constructor(o, t, p) {
    this.route = o;
    this.detailsService = t;
    this.localStorageService = p;
  }
  itemId = null;
  pageNumber = null;
  picture = {
    id: 0,
    title: "",
    thumbnail: { lqip: "", alt_text: "" },
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
  loading = !1;
  painter_info = { main_reference_number: "", painter_nationality: "" };
  artist_life = "";
  config = { iiif_url: "", website_url: "" };
  ngOnInit() {
    (this.loading = !0),
      this.route.paramMap.subscribe((o) => {
        (this.itemId = o.get("id")),
          this.detailsService.getData(this.itemId).subscribe((t) => {
            (this.picture = t.data),
              (this.config = t.config),
              (this.picture = A(this.picture, this.config)),
              (this.painter_info.main_reference_number =
                this.picture.date_start + "-" + this.picture.date_end),
              (this.painter_info.painter_nationality =
                this.picture.place_of_origin),
              (this.loading = !1);
          });
      });
  }
  setToFavorites() {
    this.localStorageService.addToLocalStorage(this.picture);
  }
  static ɵfac = function (t) {
    return new (t || e)(s(j), s(l), s(d));
  };
  static ɵcmp = h({
    type: e,
    selectors: [["app-details"]],
    standalone: !0,
    features: [O([l, d]), S],
    decls: 2,
    vars: 2,
    consts: [
      [4, "ngIf"],
      ["class", "details__container", 4, "ngIf"],
      [1, "details__container"],
      [1, "picture__container"],
      ["alt", "", 1, "image__item", 3, "src"],
      [1, "button__favorites", 3, "click"],
      ["src", "icons/Vector.png", "alt", ""],
      [1, "text__container"],
      [1, "text__title"],
      [1, "artist__title"],
      [1, "date__text"],
      [1, "info__title"],
      [1, "picture__info"],
      [1, "orange__text"],
      [1, "text__public"],
    ],
    template: function (t, p) {
      t & 1 && y(0, N, 1, 0, "app-loading-spiner", 0)(1, V, 32, 8, "div", 1),
        t & 2 && (_("ngIf", p.loading), r(), _("ngIf", !p.loading));
    },
    dependencies: [E, k, w, I],
    styles: [
      ".details__container[_ngcontent-%COMP%]{height:fit-content;display:flex;align-items:center;justify-content:center;padding:150px 0}.picture__container[_ngcontent-%COMP%]{position:relative;width:497px;height:570px}.image__item[_ngcontent-%COMP%]{border-radius:inherit;object-fit:cover;width:100%;height:100%}.text__container[_ngcontent-%COMP%]{margin-left:50px;justify-content:left;height:fit-content;padding-top:0;padding-bottom:0}.text__title[_ngcontent-%COMP%]{display:block;width:640px;margin-bottom:25px;font-family:Lexend Deca;font-size:32px;font-weight:400;line-height:40px;text-align:left}.artist__title[_ngcontent-%COMP%]{display:block;margin-bottom:10px;font-family:Lexend Deca;font-size:24px;font-weight:400;line-height:30px;text-align:left;color:#e0a449}.date__text[_ngcontent-%COMP%]{display:block;font-family:Lexend Deca;font-size:16px;font-weight:700;line-height:20px;text-align:left}.info__title[_ngcontent-%COMP%]{font-family:Lexend Deca;font-size:32px;font-weight:400;line-height:40px;text-align:left;display:block;margin-top:180px;margin-bottom:20px}.artist__info[_ngcontent-%COMP%]{display:block}.button__favorites[_ngcontent-%COMP%]{border:none;background-color:#f9f9f9;width:70px;height:70px;border-radius:50%;position:absolute;left:400px;bottom:480px}.text__public[_ngcontent-%COMP%]{font-family:Lexend Deca;font-size:16px;font-weight:400;line-height:20px;text-align:left}.orange__text[_ngcontent-%COMP%]{color:#e0a449;font-family:Lexend Deca;font-size:16px;font-weight:400;line-height:20px;text-align:left}.picture__info[_ngcontent-%COMP%]{width:600px;display:block;margin-bottom:10px}@media (max-width: 1250px){.picture__container[_ngcontent-%COMP%]{width:300px;height:400px}.button__favorites[_ngcontent-%COMP%]{left:210px;bottom:310px}.text__container[_ngcontent-%COMP%]{width:fit-content}.info__title[_ngcontent-%COMP%]{margin-top:20px}}@media (max-width: 1050px){.details__container[_ngcontent-%COMP%]{flex-direction:column}.picture__container[_ngcontent-%COMP%]{margin-bottom:50px}.button__favorites[_ngcontent-%COMP%]{left:210px;bottom:310px}.text__container[_ngcontent-%COMP%]{justify-content:center}.text__title[_ngcontent-%COMP%]{font-size:20px;display:flex;width:100%;justify-content:center}.artist__title[_ngcontent-%COMP%]{display:flex;width:100%;justify-content:center}.picture__info[_ngcontent-%COMP%]{display:flex;width:100%;justify-content:left}.date__text[_ngcontent-%COMP%]{display:flex;justify-content:center}.info__title[_ngcontent-%COMP%]{display:flex;justify-self:center}.text__public[_ngcontent-%COMP%]{display:flex;justify-content:center}}",
    ],
    changeDetection: 0,
  });
};
export { T as DetailsComponent };
