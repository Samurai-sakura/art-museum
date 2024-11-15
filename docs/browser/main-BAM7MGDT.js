import {
  b as M,
  d as P,
  g as O,
  h as k,
  i as D,
  j as A,
  k as s,
  l,
  m as R,
  n as f,
} from "./chunk-6WXTCIC4.js";
import {
  Aa as v,
  Ma as x,
  Pa as c,
  Wa as n,
  Xa as r,
  Ya as o,
  _ as a,
  fb as _,
  mb as p,
  nb as d,
  za as m,
  zb as y,
} from "./chunk-GLZPDDGB.js";
var F = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    loadComponent: () =>
      import("./chunk-XCXDOZQA.js").then((e) => e.HomeComponent),
  },
  {
    path: "favorites",
    loadComponent: () =>
      import("./chunk-FRVSGFPR.js").then((e) => e.FavoritesComponent),
  },
  {
    path: "home/details/:id",
    loadComponent: () =>
      import("./chunk-ABEIUJUS.js").then((e) => e.DetailsComponent),
  },
];
var S = { providers: [y({ eventCoalescing: !0 }), R(F), k()] };
var I = () => ["favorites"];
function H(e, i) {
  e & 1 && (n(0, "a", 2), o(1, "img", 9), n(2, "span", 8), _(3, "Home"), r()());
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
    return new (t || e)(v(D));
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
        (n(0, "div", 0)(1, "div", 1)(2, "a", 2),
        o(3, "img", 3),
        r(),
        n(4, "div", 4),
        x(5, H, 4, 0, "a", 5),
        n(6, "a", 6),
        o(7, "img", 7),
        n(8, "span", 8),
        _(9, "Your favorites"),
        r()()()()()),
        t & 2 &&
          (m(5),
          c("ngIf", C.currentPath !== "home"),
          m(),
          c("routerLink", d(2, I)));
    },
    dependencies: [P, M, f, s, l],
    styles: [
      ".header[_ngcontent-%COMP%]{height:127px;background:linear-gradient(90deg,#343333 38.05%,#484848 69.22%,#282828 98.98%);padding-top:1.6%;padding-left:20%;padding-right:20%}.header__container[_ngcontent-%COMP%]{display:flex;min-width:100%;margin-top:.5%;justify-content:space-between;align-items:center}a[_ngcontent-%COMP%]{text-decoration:none;display:flex;align-items:center}.header__text[_ngcontent-%COMP%]{margin-left:5px;color:#fff}.header__links[_ngcontent-%COMP%]{display:flex;gap:30px}@media (max-width: 1200px){.header[_ngcontent-%COMP%]{height:90px;padding-top:.8%}}@media (max-width: 790px){.header[_ngcontent-%COMP%]{height:80px;padding-left:10%;padding-top:.7%}}@media (max-width: 650px){.header[_ngcontent-%COMP%]{padding-left:5%}}@media (max-width: 435px){.header[_ngcontent-%COMP%]{height:70px;padding-left:0%;padding-top:.3%}.header__links[_ngcontent-%COMP%]{display:flex;gap:10px}.header__links[_ngcontent-%COMP%]{font-size:14px}}",
    ],
    changeDetection: 0,
  });
};
var N = () => ["home"],
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
          (n(0, "div", 0)(1, "div")(2, "a", 1),
          o(3, "img", 2),
          r()(),
          n(4, "div"),
          o(5, "img", 3),
          r()()),
          t & 2 && (m(2), c("routerLink", d(1, N)));
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
      t & 1 && o(0, "app-header")(1, "router-outlet")(2, "app-footer");
    },
    dependencies: [A, g, u],
  });
};
O(h, S).catch((e) => console.error(e));
