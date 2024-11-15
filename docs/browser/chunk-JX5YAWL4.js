import {
  Wa as o,
  Xa as i,
  _ as t,
  fb as a,
  mb as s,
} from "./chunk-GLZPDDGB.js";
var p = class n {
  static ɵfac = function (e) {
    return new (e || n)();
  };
  static ɵcmp = t({
    type: n,
    selectors: [["app-loading-spiner"]],
    standalone: !0,
    features: [s],
    decls: 4,
    vars: 0,
    consts: [
      [1, "d-flex", "justify-content-center", "spinner"],
      ["role", "status", 1, "spinner-border"],
      [1, "visually-hidden"],
    ],
    template: function (e, d) {
      e & 1 &&
        (o(0, "div", 0)(1, "div", 1)(2, "span", 2),
        a(3, "Loading..."),
        i()()());
    },
    styles: [".spinner[_ngcontent-%COMP%]{padding:10rem 0}"],
  });
};
var f = "/full/843,/0/default.jpg";
var g = { apiUrl: "https://api.artic.edu/api/v1/artworks" };
export { f as a, p as b, g as c };
