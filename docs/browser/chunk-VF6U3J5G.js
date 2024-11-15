import { Q as a } from "./chunk-GLZPDDGB.js";
var s = class i {
  addToLocalStorage(o) {
    let e = localStorage.getItem("favorites");
    if (e) {
      let t = JSON.parse(e);
      for (let r = 0; r < t.pictures.length; r++)
        if (t.pictures[r].id === o.id) {
          t.pictures.splice(r, 1),
            localStorage.setItem("favorites", JSON.stringify(t));
          return;
        }
      t.pictures.push(o), localStorage.setItem("favorites", JSON.stringify(t));
    } else localStorage.setItem("favorites", JSON.stringify({ pictures: [] }));
  }
  static ɵfac = function (e) {
    return new (e || i)();
  };
  static ɵprov = a({ token: i, factory: i.ɵfac, providedIn: "root" });
};
export { s as a };
