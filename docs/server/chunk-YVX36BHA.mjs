import "./polyfills.server.mjs";
import { c as D } from "./chunk-XSVDBO6X.mjs";
import {
  A as l,
  B as b,
  C as f,
  f as P,
  h as O,
  t as k,
  u as A,
  v as R,
  w as S,
  z as s,
} from "./chunk-FIQ4B6TP.mjs";
import {
  Ab as y,
  La as x,
  Mb as M,
  Oa as c,
  Va as o,
  W as a,
  Wa as r,
  Xa as n,
  eb as _,
  lb as p,
  mb as d,
  ya as m,
  za as v,
} from "./chunk-INGTML2I.mjs";
var E = () => ["favorites"];
function T(e, i) {
  e & 1 && (o(0, "a", 2), n(1, "img", 9), o(2, "span", 8), _(3, "Home"), r()());
}
var g = class e {
  constructor(i) {
    this.router = i;
  }
  currentPath;
  ngOnInit() {
    (this.currentPath = this.router.snapshot.url.join()),
      console.log(this.currentPath);
  }
  static ɵfac = function (t) {
    return new (t || e)(v(R));
  };
  static ɵcmp = a({
    type: e,
    selectors: [["app-header"]],
    standalone: !0,
    features: [p],
    decls: 10,
    vars: 3,
    consts: [
      [1, "header"],
      [1, "header__container"],
      ["href", ""],
      ["src", "icons/museum-logo 2.svg", "alt", ""],
      [1, "header__links"],
      ["href", "", 4, "ngIf"],
      ["routerLinkActive", "active", 3, "routerLink"],
      ["src", "icons/Vector.png", "alt", "Vector", 1, "header__load"],
      [1, "header__text"],
      ["src", "icons/home.png", "alt", "Home", 1, "header__load"],
    ],
    template: function (t, C) {
      t & 1 &&
        (o(0, "div", 0)(1, "div", 1)(2, "a", 2),
        n(3, "img", 3),
        r(),
        o(4, "div", 4),
        x(5, T, 4, 0, "a", 5),
        o(6, "a", 6),
        n(7, "img", 7),
        o(8, "span", 8),
        _(9, "Your favorites"),
        r()()()()()),
        t & 2 &&
          (m(5),
          c("ngIf", C.currentPath !== "home"),
          m(),
          c("routerLink", d(2, E)));
    },
    dependencies: [O, P, f, s, l],
    styles: [
      ".header[_ngcontent-%COMP%]{height:127px;background:linear-gradient(90deg,#343333 38.05%,#484848 69.22%,#282828 98.98%);padding-top:1.6%;padding-left:20%;padding-right:20%}.header__container[_ngcontent-%COMP%]{display:flex;min-width:100%;margin-top:.5%;justify-content:space-between;align-items:center}a[_ngcontent-%COMP%]{text-decoration:none;display:flex;align-items:center}.header__text[_ngcontent-%COMP%]{margin-left:5px;color:#fff}.header__links[_ngcontent-%COMP%]{display:flex;gap:30px}@media (max-width: 1200px){.header[_ngcontent-%COMP%]{height:90px;padding-top:.8%}}@media (max-width: 790px){.header[_ngcontent-%COMP%]{height:80px;padding-left:10%;padding-top:.7%}}@media (max-width: 650px){.header[_ngcontent-%COMP%]{padding-left:5%}}@media (max-width: 435px){.header[_ngcontent-%COMP%]{height:70px;padding-left:0%;padding-top:.3%}.header__links[_ngcontent-%COMP%]{display:flex;gap:10px}.header__links[_ngcontent-%COMP%]{font-size:14px}}",
    ],
    changeDetection: 0,
  });
};
var j = () => ["home"],
  u = class e {
    static ɵfac = function (t) {
      return new (t || e)();
    };
    static ɵcmp = a({
      type: e,
      selectors: [["app-footer"]],
      standalone: !0,
      features: [p],
      decls: 6,
      vars: 2,
      consts: [
        [1, "footer__container"],
        ["routerLinkActive", "active", 3, "routerLink"],
        ["src", "icons/museum-logo 3.svg", "alt", ""],
        ["src", "icons/logo modsen-02 2.png", "alt", ""],
      ],
      template: function (t, C) {
        t & 1 &&
          (o(0, "div", 0)(1, "div")(2, "a", 1),
          n(3, "img", 2),
          r()(),
          o(4, "div"),
          n(5, "img", 3),
          r()()),
          t & 2 && (m(2), c("routerLink", d(1, j)));
      },
      dependencies: [s, f, l],
      styles: [
        ".footer__container[_ngcontent-%COMP%]{background-color:#fff;padding-left:10%;padding-right:10%;display:flex;justify-content:space-between;align-items:center;height:127px}@media (max-width: 500px){.footer__container[_ngcontent-%COMP%]{padding-left:10%}}@media (max-width: 435px){.footer__container[_ngcontent-%COMP%]{padding-left:1%}}",
      ],
      changeDetection: 0,
    });
  };
var h = class e {
  title = "art-museum";
  static ɵfac = function (t) {
    return new (t || e)();
  };
  static ɵcmp = a({
    type: e,
    selectors: [["app-root"]],
    standalone: !0,
    features: [p],
    decls: 3,
    vars: 0,
    template: function (t, C) {
      t & 1 && n(0, "app-header")(1, "router-outlet")(2, "app-footer");
    },
    dependencies: [S, g, u],
  });
};
var L = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    loadComponent: () =>
      import("./chunk-TLDQ45G6.mjs").then((e) => e.HomeComponent),
  },
  {
    path: "favorites",
    loadComponent: () =>
      import("./chunk-BIRGILUO.mjs").then((e) => e.FavoritesComponent),
  },
  {
    path: "home/details/:id",
    loadComponent: () =>
      import("./chunk-M7CWCOJ5.mjs").then((e) => e.DetailsComponent),
  },
];
var I = { providers: [y({ eventCoalescing: !0 }), b(L), A()] };
var V = { providers: [D()] },
  H = M(I, V);
var z = () => k(h, H),
  ue = z;
export { ue as a };
