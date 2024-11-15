import {
  $ as me,
  $a as si,
  A as se,
  Aa as L,
  Ab as Ie,
  B as hn,
  Ba as Jr,
  Bb as li,
  C as be,
  Ca as Qr,
  Cb as di,
  D as Br,
  Da as ei,
  Db as Qe,
  E as pe,
  Ea as Ze,
  F as oe,
  Fa as Ke,
  G as fn,
  Ga as En,
  Gb as hi,
  H as jr,
  I as $r,
  J as zr,
  Ja as Sn,
  K as k,
  Ka as ti,
  L as Vr,
  La as bn,
  M as I,
  N as T,
  Na as ni,
  O as Gr,
  Oa as ri,
  Q as D,
  R as ge,
  S as Hr,
  T as b,
  U as pn,
  V as g,
  W as d,
  X as gn,
  Y as qr,
  Ya as ii,
  Z as qe,
  _ as Wr,
  a as f,
  aa as De,
  b as O,
  ba as Ae,
  bb as oi,
  c as Pr,
  ca as Yr,
  cb as ai,
  d as It,
  da as ve,
  db as ui,
  e as Lr,
  ea as j,
  f as Nr,
  fa as Re,
  g as un,
  h as cn,
  i as ln,
  ia as mn,
  j as re,
  ja as Dn,
  k as B,
  ka as Mt,
  l as ie,
  la as We,
  m as _,
  ma as ae,
  mb as ci,
  n as p,
  na as z,
  o as Ge,
  oa as vn,
  p as kr,
  pa as Ye,
  q as xr,
  qa as Zr,
  r as S,
  ra as yn,
  s as Ft,
  sa as Kr,
  sb as Ot,
  t as N,
  ta as q,
  tb as An,
  u as He,
  ua as wn,
  ub as Rn,
  v as Ur,
  va as Cn,
  vb as Xe,
  w as dn,
  wb as Je,
  xa as Xr,
  xb as Tn,
  y as J,
  ya as Te,
  yb as _t,
  z as Se,
} from "./chunk-GLZPDDGB.js";
var vi = null;
function Fe() {
  return vi;
}
function yi(t) {
  vi ??= t;
}
var Pt = class {};
var P = new b(""),
  _n = (() => {
    class t {
      historyGo(e) {
        throw new Error("");
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵprov = D({
          token: t,
          factory: () => d(Zs),
          providedIn: "platform",
        });
      }
    }
    return t;
  })(),
  wi = new b(""),
  Zs = (() => {
    class t extends _n {
      constructor() {
        super(),
          (this._doc = d(P)),
          (this._location = window.location),
          (this._history = window.history);
      }
      getBaseHrefFromDOM() {
        return Fe().getBaseHref(this._doc);
      }
      onPopState(e) {
        let n = Fe().getGlobalEventTarget(this._doc, "window");
        return (
          n.addEventListener("popstate", e, !1),
          () => n.removeEventListener("popstate", e)
        );
      }
      onHashChange(e) {
        let n = Fe().getGlobalEventTarget(this._doc, "window");
        return (
          n.addEventListener("hashchange", e, !1),
          () => n.removeEventListener("hashchange", e)
        );
      }
      get href() {
        return this._location.href;
      }
      get protocol() {
        return this._location.protocol;
      }
      get hostname() {
        return this._location.hostname;
      }
      get port() {
        return this._location.port;
      }
      get pathname() {
        return this._location.pathname;
      }
      get search() {
        return this._location.search;
      }
      get hash() {
        return this._location.hash;
      }
      set pathname(e) {
        this._location.pathname = e;
      }
      pushState(e, n, i) {
        this._history.pushState(e, n, i);
      }
      replaceState(e, n, i) {
        this._history.replaceState(e, n, i);
      }
      forward() {
        this._history.forward();
      }
      back() {
        this._history.back();
      }
      historyGo(e = 0) {
        this._history.go(e);
      }
      getState() {
        return this._history.state;
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵprov = D({
          token: t,
          factory: () => new t(),
          providedIn: "platform",
        });
      }
    }
    return t;
  })();
function Pn(t, r) {
  if (t.length == 0) return r;
  if (r.length == 0) return t;
  let e = 0;
  return (
    t.endsWith("/") && e++,
    r.startsWith("/") && e++,
    e == 2 ? t + r.substring(1) : e == 1 ? t + r : t + "/" + r
  );
}
function fi(t) {
  let r = t.match(/#|\?|$/),
    e = (r && r.index) || t.length,
    n = e - (t[e - 1] === "/" ? 1 : 0);
  return t.slice(0, n) + t.slice(e);
}
function Q(t) {
  return t && t[0] !== "?" ? "?" + t : t;
}
var ee = (() => {
    class t {
      historyGo(e) {
        throw new Error("");
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: () => d(Ln), providedIn: "root" });
      }
    }
    return t;
  })(),
  Ci = new b(""),
  Ln = (() => {
    class t extends ee {
      constructor(e, n) {
        super(),
          (this._platformLocation = e),
          (this._removeListenerFns = []),
          (this._baseHref =
            n ??
            this._platformLocation.getBaseHrefFromDOM() ??
            d(P).location?.origin ??
            "");
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; )
          this._removeListenerFns.pop()();
      }
      onPopState(e) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(e),
          this._platformLocation.onHashChange(e)
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      prepareExternalUrl(e) {
        return Pn(this._baseHref, e);
      }
      path(e = !1) {
        let n =
            this._platformLocation.pathname + Q(this._platformLocation.search),
          i = this._platformLocation.hash;
        return i && e ? `${n}${i}` : n;
      }
      pushState(e, n, i, s) {
        let o = this.prepareExternalUrl(i + Q(s));
        this._platformLocation.pushState(e, n, o);
      }
      replaceState(e, n, i, s) {
        let o = this.prepareExternalUrl(i + Q(s));
        this._platformLocation.replaceState(e, n, o);
      }
      forward() {
        this._platformLocation.forward();
      }
      back() {
        this._platformLocation.back();
      }
      getState() {
        return this._platformLocation.getState();
      }
      historyGo(e = 0) {
        this._platformLocation.historyGo?.(e);
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)(g(_n), g(Ci, 8));
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: t.ɵfac, providedIn: "root" });
      }
    }
    return t;
  })(),
  Ei = (() => {
    class t extends ee {
      constructor(e, n) {
        super(),
          (this._platformLocation = e),
          (this._baseHref = ""),
          (this._removeListenerFns = []),
          n != null && (this._baseHref = n);
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; )
          this._removeListenerFns.pop()();
      }
      onPopState(e) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(e),
          this._platformLocation.onHashChange(e)
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      path(e = !1) {
        let n = this._platformLocation.hash ?? "#";
        return n.length > 0 ? n.substring(1) : n;
      }
      prepareExternalUrl(e) {
        let n = Pn(this._baseHref, e);
        return n.length > 0 ? "#" + n : n;
      }
      pushState(e, n, i, s) {
        let o = this.prepareExternalUrl(i + Q(s));
        o.length == 0 && (o = this._platformLocation.pathname),
          this._platformLocation.pushState(e, n, o);
      }
      replaceState(e, n, i, s) {
        let o = this.prepareExternalUrl(i + Q(s));
        o.length == 0 && (o = this._platformLocation.pathname),
          this._platformLocation.replaceState(e, n, o);
      }
      forward() {
        this._platformLocation.forward();
      }
      back() {
        this._platformLocation.back();
      }
      getState() {
        return this._platformLocation.getState();
      }
      historyGo(e = 0) {
        this._platformLocation.historyGo?.(e);
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)(g(_n), g(Ci, 8));
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: t.ɵfac });
      }
    }
    return t;
  })(),
  Oe = (() => {
    class t {
      constructor(e) {
        (this._subject = new ae()),
          (this._urlChangeListeners = []),
          (this._urlChangeSubscription = null),
          (this._locationStrategy = e);
        let n = this._locationStrategy.getBaseHref();
        (this._basePath = Js(fi(pi(n)))),
          this._locationStrategy.onPopState((i) => {
            this._subject.emit({
              url: this.path(!0),
              pop: !0,
              state: i.state,
              type: i.type,
            });
          });
      }
      ngOnDestroy() {
        this._urlChangeSubscription?.unsubscribe(),
          (this._urlChangeListeners = []);
      }
      path(e = !1) {
        return this.normalize(this._locationStrategy.path(e));
      }
      getState() {
        return this._locationStrategy.getState();
      }
      isCurrentPathEqualTo(e, n = "") {
        return this.path() == this.normalize(e + Q(n));
      }
      normalize(e) {
        return t.stripTrailingSlash(Xs(this._basePath, pi(e)));
      }
      prepareExternalUrl(e) {
        return (
          e && e[0] !== "/" && (e = "/" + e),
          this._locationStrategy.prepareExternalUrl(e)
        );
      }
      go(e, n = "", i = null) {
        this._locationStrategy.pushState(i, "", e, n),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(e + Q(n)), i);
      }
      replaceState(e, n = "", i = null) {
        this._locationStrategy.replaceState(i, "", e, n),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(e + Q(n)), i);
      }
      forward() {
        this._locationStrategy.forward();
      }
      back() {
        this._locationStrategy.back();
      }
      historyGo(e = 0) {
        this._locationStrategy.historyGo?.(e);
      }
      onUrlChange(e) {
        return (
          this._urlChangeListeners.push(e),
          (this._urlChangeSubscription ??= this.subscribe((n) => {
            this._notifyUrlChangeListeners(n.url, n.state);
          })),
          () => {
            let n = this._urlChangeListeners.indexOf(e);
            this._urlChangeListeners.splice(n, 1),
              this._urlChangeListeners.length === 0 &&
                (this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeSubscription = null));
          }
        );
      }
      _notifyUrlChangeListeners(e = "", n) {
        this._urlChangeListeners.forEach((i) => i(e, n));
      }
      subscribe(e, n, i) {
        return this._subject.subscribe({ next: e, error: n, complete: i });
      }
      static {
        this.normalizeQueryParams = Q;
      }
      static {
        this.joinWithSlash = Pn;
      }
      static {
        this.stripTrailingSlash = fi;
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)(g(ee));
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: () => Ks(), providedIn: "root" });
      }
    }
    return t;
  })();
function Ks() {
  return new Oe(g(ee));
}
function Xs(t, r) {
  if (!t || !r.startsWith(t)) return r;
  let e = r.substring(t.length);
  return e === "" || ["/", ";", "?", "#"].includes(e[0]) ? e : r;
}
function pi(t) {
  return t.replace(/\/index.html$/, "");
}
function Js(t) {
  if (new RegExp("^(https?:)?//").test(t)) {
    let [, e] = t.split(/\/\/[^\/]+/);
    return e;
  }
  return t;
}
function Lt(t, r) {
  r = encodeURIComponent(r);
  for (let e of t.split(";")) {
    let n = e.indexOf("="),
      [i, s] = n == -1 ? [e, ""] : [e.slice(0, n), e.slice(n + 1)];
    if (i.trim() === r) return decodeURIComponent(s);
  }
  return null;
}
var _c = (() => {
    class t {
      constructor(e, n) {
        (this._viewContainer = e),
          (this._context = new In()),
          (this._thenTemplateRef = null),
          (this._elseTemplateRef = null),
          (this._thenViewRef = null),
          (this._elseViewRef = null),
          (this._thenTemplateRef = n);
      }
      set ngIf(e) {
        (this._context.$implicit = this._context.ngIf = e), this._updateView();
      }
      set ngIfThen(e) {
        gi("ngIfThen", e),
          (this._thenTemplateRef = e),
          (this._thenViewRef = null),
          this._updateView();
      }
      set ngIfElse(e) {
        gi("ngIfElse", e),
          (this._elseTemplateRef = e),
          (this._elseViewRef = null),
          this._updateView();
      }
      _updateView() {
        this._context.$implicit
          ? this._thenViewRef ||
            (this._viewContainer.clear(),
            (this._elseViewRef = null),
            this._thenTemplateRef &&
              (this._thenViewRef = this._viewContainer.createEmbeddedView(
                this._thenTemplateRef,
                this._context
              )))
          : this._elseViewRef ||
            (this._viewContainer.clear(),
            (this._thenViewRef = null),
            this._elseTemplateRef &&
              (this._elseViewRef = this._viewContainer.createEmbeddedView(
                this._elseTemplateRef,
                this._context
              )));
      }
      static ngTemplateContextGuard(e, n) {
        return !0;
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)(L(Ke), L(Qr));
        };
      }
      static {
        this.ɵdir = De({
          type: t,
          selectors: [["", "ngIf", ""]],
          inputs: { ngIf: "ngIf", ngIfThen: "ngIfThen", ngIfElse: "ngIfElse" },
          standalone: !0,
        });
      }
    }
    return t;
  })(),
  In = class {
    constructor() {
      (this.$implicit = null), (this.ngIf = null);
    }
  };
function gi(t, r) {
  if (!!!(!r || r.createEmbeddedView))
    throw new Error(`${t} must be a TemplateRef, but received '${Gr(r)}'.`);
}
var Pc = (() => {
  class t {
    constructor(e) {
      (this._viewContainerRef = e),
        (this._viewRef = null),
        (this.ngTemplateOutletContext = null),
        (this.ngTemplateOutlet = null),
        (this.ngTemplateOutletInjector = null);
    }
    ngOnChanges(e) {
      if (this._shouldRecreateView(e)) {
        let n = this._viewContainerRef;
        if (
          (this._viewRef && n.remove(n.indexOf(this._viewRef)),
          !this.ngTemplateOutlet)
        ) {
          this._viewRef = null;
          return;
        }
        let i = this._createContextForwardProxy();
        this._viewRef = n.createEmbeddedView(this.ngTemplateOutlet, i, {
          injector: this.ngTemplateOutletInjector ?? void 0,
        });
      }
    }
    _shouldRecreateView(e) {
      return !!e.ngTemplateOutlet || !!e.ngTemplateOutletInjector;
    }
    _createContextForwardProxy() {
      return new Proxy(
        {},
        {
          set: (e, n, i) =>
            this.ngTemplateOutletContext
              ? Reflect.set(this.ngTemplateOutletContext, n, i)
              : !1,
          get: (e, n, i) => {
            if (this.ngTemplateOutletContext)
              return Reflect.get(this.ngTemplateOutletContext, n, i);
          },
        }
      );
    }
    static {
      this.ɵfac = function (n) {
        return new (n || t)(L(Ke));
      };
    }
    static {
      this.ɵdir = De({
        type: t,
        selectors: [["", "ngTemplateOutlet", ""]],
        inputs: {
          ngTemplateOutletContext: "ngTemplateOutletContext",
          ngTemplateOutlet: "ngTemplateOutlet",
          ngTemplateOutletInjector: "ngTemplateOutletInjector",
        },
        standalone: !0,
        features: [Re],
      });
    }
  }
  return t;
})();
var Qs = (() => {
    class t {
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵmod = me({ type: t });
      }
      static {
        this.ɵinj = ge({});
      }
    }
    return t;
  })(),
  Nn = "browser",
  eo = "server";
function to(t) {
  return t === Nn;
}
function et(t) {
  return t === eo;
}
var Si = (() => {
    class t {
      static {
        this.ɵprov = D({
          token: t,
          providedIn: "root",
          factory: () => (to(d(q)) ? new Fn(d(P), window) : new Mn()),
        });
      }
    }
    return t;
  })(),
  Fn = class {
    constructor(r, e) {
      (this.document = r), (this.window = e), (this.offset = () => [0, 0]);
    }
    setOffset(r) {
      Array.isArray(r) ? (this.offset = () => r) : (this.offset = r);
    }
    getScrollPosition() {
      return [this.window.scrollX, this.window.scrollY];
    }
    scrollToPosition(r) {
      this.window.scrollTo(r[0], r[1]);
    }
    scrollToAnchor(r) {
      let e = no(this.document, r);
      e && (this.scrollToElement(e), e.focus());
    }
    setHistoryScrollRestoration(r) {
      this.window.history.scrollRestoration = r;
    }
    scrollToElement(r) {
      let e = r.getBoundingClientRect(),
        n = e.left + this.window.pageXOffset,
        i = e.top + this.window.pageYOffset,
        s = this.offset();
      this.window.scrollTo(n - s[0], i - s[1]);
    }
  };
function no(t, r) {
  let e = t.getElementById(r) || t.getElementsByName(r)[0];
  if (e) return e;
  if (
    typeof t.createTreeWalker == "function" &&
    t.body &&
    typeof t.body.attachShadow == "function"
  ) {
    let n = t.createTreeWalker(t.body, NodeFilter.SHOW_ELEMENT),
      i = n.currentNode;
    for (; i; ) {
      let s = i.shadowRoot;
      if (s) {
        let o = s.getElementById(r) || s.querySelector(`[name="${r}"]`);
        if (o) return o;
      }
      i = n.nextNode();
    }
  }
  return null;
}
var Mn = class {
    setOffset(r) {}
    getScrollPosition() {
      return [0, 0];
    }
    scrollToPosition(r) {}
    scrollToAnchor(r) {}
    setHistoryScrollRestoration(r) {}
  },
  Me = class {};
var nt = class {},
  xt = class {},
  W = class t {
    constructor(r) {
      (this.normalizedNames = new Map()),
        (this.lazyUpdate = null),
        r
          ? typeof r == "string"
            ? (this.lazyInit = () => {
                (this.headers = new Map()),
                  r
                    .split(
                      `
`
                    )
                    .forEach((e) => {
                      let n = e.indexOf(":");
                      if (n > 0) {
                        let i = e.slice(0, n),
                          s = i.toLowerCase(),
                          o = e.slice(n + 1).trim();
                        this.maybeSetNormalizedName(i, s),
                          this.headers.has(s)
                            ? this.headers.get(s).push(o)
                            : this.headers.set(s, [o]);
                      }
                    });
              })
            : typeof Headers < "u" && r instanceof Headers
              ? ((this.headers = new Map()),
                r.forEach((e, n) => {
                  this.setHeaderEntries(n, e);
                }))
              : (this.lazyInit = () => {
                  (this.headers = new Map()),
                    Object.entries(r).forEach(([e, n]) => {
                      this.setHeaderEntries(e, n);
                    });
                })
          : (this.headers = new Map());
    }
    has(r) {
      return this.init(), this.headers.has(r.toLowerCase());
    }
    get(r) {
      this.init();
      let e = this.headers.get(r.toLowerCase());
      return e && e.length > 0 ? e[0] : null;
    }
    keys() {
      return this.init(), Array.from(this.normalizedNames.values());
    }
    getAll(r) {
      return this.init(), this.headers.get(r.toLowerCase()) || null;
    }
    append(r, e) {
      return this.clone({ name: r, value: e, op: "a" });
    }
    set(r, e) {
      return this.clone({ name: r, value: e, op: "s" });
    }
    delete(r, e) {
      return this.clone({ name: r, value: e, op: "d" });
    }
    maybeSetNormalizedName(r, e) {
      this.normalizedNames.has(e) || this.normalizedNames.set(e, r);
    }
    init() {
      this.lazyInit &&
        (this.lazyInit instanceof t
          ? this.copyFrom(this.lazyInit)
          : this.lazyInit(),
        (this.lazyInit = null),
        this.lazyUpdate &&
          (this.lazyUpdate.forEach((r) => this.applyUpdate(r)),
          (this.lazyUpdate = null)));
    }
    copyFrom(r) {
      r.init(),
        Array.from(r.headers.keys()).forEach((e) => {
          this.headers.set(e, r.headers.get(e)),
            this.normalizedNames.set(e, r.normalizedNames.get(e));
        });
    }
    clone(r) {
      let e = new t();
      return (
        (e.lazyInit =
          this.lazyInit && this.lazyInit instanceof t ? this.lazyInit : this),
        (e.lazyUpdate = (this.lazyUpdate || []).concat([r])),
        e
      );
    }
    applyUpdate(r) {
      let e = r.name.toLowerCase();
      switch (r.op) {
        case "a":
        case "s":
          let n = r.value;
          if ((typeof n == "string" && (n = [n]), n.length === 0)) return;
          this.maybeSetNormalizedName(r.name, e);
          let i = (r.op === "a" ? this.headers.get(e) : void 0) || [];
          i.push(...n), this.headers.set(e, i);
          break;
        case "d":
          let s = r.value;
          if (!s) this.headers.delete(e), this.normalizedNames.delete(e);
          else {
            let o = this.headers.get(e);
            if (!o) return;
            (o = o.filter((u) => s.indexOf(u) === -1)),
              o.length === 0
                ? (this.headers.delete(e), this.normalizedNames.delete(e))
                : this.headers.set(e, o);
          }
          break;
      }
    }
    setHeaderEntries(r, e) {
      let n = (Array.isArray(e) ? e : [e]).map((s) => s.toString()),
        i = r.toLowerCase();
      this.headers.set(i, n), this.maybeSetNormalizedName(r, i);
    }
    forEach(r) {
      this.init(),
        Array.from(this.normalizedNames.keys()).forEach((e) =>
          r(this.normalizedNames.get(e), this.headers.get(e))
        );
    }
  };
var xn = class {
  encodeKey(r) {
    return Ai(r);
  }
  encodeValue(r) {
    return Ai(r);
  }
  decodeKey(r) {
    return decodeURIComponent(r);
  }
  decodeValue(r) {
    return decodeURIComponent(r);
  }
};
function ro(t, r) {
  let e = new Map();
  return (
    t.length > 0 &&
      t
        .replace(/^\?/, "")
        .split("&")
        .forEach((i) => {
          let s = i.indexOf("="),
            [o, u] =
              s == -1
                ? [r.decodeKey(i), ""]
                : [r.decodeKey(i.slice(0, s)), r.decodeValue(i.slice(s + 1))],
            a = e.get(o) || [];
          a.push(u), e.set(o, a);
        }),
    e
  );
}
var io = /%(\d[a-f0-9])/gi,
  so = {
    40: "@",
    "3A": ":",
    24: "$",
    "2C": ",",
    "3B": ";",
    "3D": "=",
    "3F": "?",
    "2F": "/",
  };
function Ai(t) {
  return encodeURIComponent(t).replace(io, (r, e) => so[e] ?? r);
}
function Nt(t) {
  return `${t}`;
}
var ce = class t {
  constructor(r = {}) {
    if (
      ((this.updates = null),
      (this.cloneFrom = null),
      (this.encoder = r.encoder || new xn()),
      r.fromString)
    ) {
      if (r.fromObject)
        throw new Error("Cannot specify both fromString and fromObject.");
      this.map = ro(r.fromString, this.encoder);
    } else
      r.fromObject
        ? ((this.map = new Map()),
          Object.keys(r.fromObject).forEach((e) => {
            let n = r.fromObject[e],
              i = Array.isArray(n) ? n.map(Nt) : [Nt(n)];
            this.map.set(e, i);
          }))
        : (this.map = null);
  }
  has(r) {
    return this.init(), this.map.has(r);
  }
  get(r) {
    this.init();
    let e = this.map.get(r);
    return e ? e[0] : null;
  }
  getAll(r) {
    return this.init(), this.map.get(r) || null;
  }
  keys() {
    return this.init(), Array.from(this.map.keys());
  }
  append(r, e) {
    return this.clone({ param: r, value: e, op: "a" });
  }
  appendAll(r) {
    let e = [];
    return (
      Object.keys(r).forEach((n) => {
        let i = r[n];
        Array.isArray(i)
          ? i.forEach((s) => {
              e.push({ param: n, value: s, op: "a" });
            })
          : e.push({ param: n, value: i, op: "a" });
      }),
      this.clone(e)
    );
  }
  set(r, e) {
    return this.clone({ param: r, value: e, op: "s" });
  }
  delete(r, e) {
    return this.clone({ param: r, value: e, op: "d" });
  }
  toString() {
    return (
      this.init(),
      this.keys()
        .map((r) => {
          let e = this.encoder.encodeKey(r);
          return this.map
            .get(r)
            .map((n) => e + "=" + this.encoder.encodeValue(n))
            .join("&");
        })
        .filter((r) => r !== "")
        .join("&")
    );
  }
  clone(r) {
    let e = new t({ encoder: this.encoder });
    return (
      (e.cloneFrom = this.cloneFrom || this),
      (e.updates = (this.updates || []).concat(r)),
      e
    );
  }
  init() {
    this.map === null && (this.map = new Map()),
      this.cloneFrom !== null &&
        (this.cloneFrom.init(),
        this.cloneFrom
          .keys()
          .forEach((r) => this.map.set(r, this.cloneFrom.map.get(r))),
        this.updates.forEach((r) => {
          switch (r.op) {
            case "a":
            case "s":
              let e = (r.op === "a" ? this.map.get(r.param) : void 0) || [];
              e.push(Nt(r.value)), this.map.set(r.param, e);
              break;
            case "d":
              if (r.value !== void 0) {
                let n = this.map.get(r.param) || [],
                  i = n.indexOf(Nt(r.value));
                i !== -1 && n.splice(i, 1),
                  n.length > 0
                    ? this.map.set(r.param, n)
                    : this.map.delete(r.param);
              } else {
                this.map.delete(r.param);
                break;
              }
          }
        }),
        (this.cloneFrom = this.updates = null));
  }
};
var Un = class {
  constructor() {
    this.map = new Map();
  }
  set(r, e) {
    return this.map.set(r, e), this;
  }
  get(r) {
    return (
      this.map.has(r) || this.map.set(r, r.defaultValue()), this.map.get(r)
    );
  }
  delete(r) {
    return this.map.delete(r), this;
  }
  has(r) {
    return this.map.has(r);
  }
  keys() {
    return this.map.keys();
  }
};
function oo(t) {
  switch (t) {
    case "DELETE":
    case "GET":
    case "HEAD":
    case "OPTIONS":
    case "JSONP":
      return !1;
    default:
      return !0;
  }
}
function Ri(t) {
  return typeof ArrayBuffer < "u" && t instanceof ArrayBuffer;
}
function Ti(t) {
  return typeof Blob < "u" && t instanceof Blob;
}
function Ii(t) {
  return typeof FormData < "u" && t instanceof FormData;
}
function ao(t) {
  return typeof URLSearchParams < "u" && t instanceof URLSearchParams;
}
var tt = class t {
    constructor(r, e, n, i) {
      (this.url = e),
        (this.body = null),
        (this.reportProgress = !1),
        (this.withCredentials = !1),
        (this.responseType = "json"),
        (this.method = r.toUpperCase());
      let s;
      if (
        (oo(this.method) || i
          ? ((this.body = n !== void 0 ? n : null), (s = i))
          : (s = n),
        s &&
          ((this.reportProgress = !!s.reportProgress),
          (this.withCredentials = !!s.withCredentials),
          s.responseType && (this.responseType = s.responseType),
          s.headers && (this.headers = s.headers),
          s.context && (this.context = s.context),
          s.params && (this.params = s.params),
          (this.transferCache = s.transferCache)),
        (this.headers ??= new W()),
        (this.context ??= new Un()),
        !this.params)
      )
        (this.params = new ce()), (this.urlWithParams = e);
      else {
        let o = this.params.toString();
        if (o.length === 0) this.urlWithParams = e;
        else {
          let u = e.indexOf("?"),
            a = u === -1 ? "?" : u < e.length - 1 ? "&" : "";
          this.urlWithParams = e + a + o;
        }
      }
    }
    serializeBody() {
      return this.body === null
        ? null
        : typeof this.body == "string" ||
            Ri(this.body) ||
            Ti(this.body) ||
            Ii(this.body) ||
            ao(this.body)
          ? this.body
          : this.body instanceof ce
            ? this.body.toString()
            : typeof this.body == "object" ||
                typeof this.body == "boolean" ||
                Array.isArray(this.body)
              ? JSON.stringify(this.body)
              : this.body.toString();
    }
    detectContentTypeHeader() {
      return this.body === null || Ii(this.body)
        ? null
        : Ti(this.body)
          ? this.body.type || null
          : Ri(this.body)
            ? null
            : typeof this.body == "string"
              ? "text/plain"
              : this.body instanceof ce
                ? "application/x-www-form-urlencoded;charset=UTF-8"
                : typeof this.body == "object" ||
                    typeof this.body == "number" ||
                    typeof this.body == "boolean"
                  ? "application/json"
                  : null;
    }
    clone(r = {}) {
      let e = r.method || this.method,
        n = r.url || this.url,
        i = r.responseType || this.responseType,
        s = r.transferCache ?? this.transferCache,
        o = r.body !== void 0 ? r.body : this.body,
        u = r.withCredentials ?? this.withCredentials,
        a = r.reportProgress ?? this.reportProgress,
        c = r.headers || this.headers,
        l = r.params || this.params,
        h = r.context ?? this.context;
      return (
        r.setHeaders !== void 0 &&
          (c = Object.keys(r.setHeaders).reduce(
            (y, C) => y.set(C, r.setHeaders[C]),
            c
          )),
        r.setParams &&
          (l = Object.keys(r.setParams).reduce(
            (y, C) => y.set(C, r.setParams[C]),
            l
          )),
        new t(e, n, o, {
          params: l,
          headers: c,
          context: h,
          reportProgress: a,
          responseType: i,
          withCredentials: u,
          transferCache: s,
        })
      );
    }
  },
  le = (function (t) {
    return (
      (t[(t.Sent = 0)] = "Sent"),
      (t[(t.UploadProgress = 1)] = "UploadProgress"),
      (t[(t.ResponseHeader = 2)] = "ResponseHeader"),
      (t[(t.DownloadProgress = 3)] = "DownloadProgress"),
      (t[(t.Response = 4)] = "Response"),
      (t[(t.User = 5)] = "User"),
      t
    );
  })(le || {}),
  rt = class {
    constructor(r, e = 200, n = "OK") {
      (this.headers = r.headers || new W()),
        (this.status = r.status !== void 0 ? r.status : e),
        (this.statusText = r.statusText || n),
        (this.url = r.url || null),
        (this.ok = this.status >= 200 && this.status < 300);
    }
  },
  Ut = class t extends rt {
    constructor(r = {}) {
      super(r), (this.type = le.ResponseHeader);
    }
    clone(r = {}) {
      return new t({
        headers: r.headers || this.headers,
        status: r.status !== void 0 ? r.status : this.status,
        statusText: r.statusText || this.statusText,
        url: r.url || this.url || void 0,
      });
    }
  },
  ye = class t extends rt {
    constructor(r = {}) {
      super(r),
        (this.type = le.Response),
        (this.body = r.body !== void 0 ? r.body : null);
    }
    clone(r = {}) {
      return new t({
        body: r.body !== void 0 ? r.body : this.body,
        headers: r.headers || this.headers,
        status: r.status !== void 0 ? r.status : this.status,
        statusText: r.statusText || this.statusText,
        url: r.url || this.url || void 0,
      });
    }
  },
  ue = class extends rt {
    constructor(r) {
      super(r, 0, "Unknown Error"),
        (this.name = "HttpErrorResponse"),
        (this.ok = !1),
        this.status >= 200 && this.status < 300
          ? (this.message = `Http failure during parsing for ${r.url || "(unknown url)"}`)
          : (this.message = `Http failure response for ${r.url || "(unknown url)"}: ${r.status} ${r.statusText}`),
        (this.error = r.error || null);
    }
  },
  ji = 200,
  uo = 204;
function kn(t, r) {
  return {
    body: r,
    headers: t.headers,
    context: t.context,
    observe: t.observe,
    params: t.params,
    reportProgress: t.reportProgress,
    responseType: t.responseType,
    withCredentials: t.withCredentials,
    transferCache: t.transferCache,
  };
}
var co = (() => {
    class t {
      constructor(e) {
        this.handler = e;
      }
      request(e, n, i = {}) {
        let s;
        if (e instanceof tt) s = e;
        else {
          let a;
          i.headers instanceof W ? (a = i.headers) : (a = new W(i.headers));
          let c;
          i.params &&
            (i.params instanceof ce
              ? (c = i.params)
              : (c = new ce({ fromObject: i.params }))),
            (s = new tt(e, n, i.body !== void 0 ? i.body : null, {
              headers: a,
              context: i.context,
              params: c,
              reportProgress: i.reportProgress,
              responseType: i.responseType || "json",
              withCredentials: i.withCredentials,
              transferCache: i.transferCache,
            }));
        }
        let o = p(s).pipe(se((a) => this.handler.handle(a)));
        if (e instanceof tt || i.observe === "events") return o;
        let u = o.pipe(J((a) => a instanceof ye));
        switch (i.observe || "body") {
          case "body":
            switch (s.responseType) {
              case "arraybuffer":
                return u.pipe(
                  S((a) => {
                    if (a.body !== null && !(a.body instanceof ArrayBuffer))
                      throw new Error("Response is not an ArrayBuffer.");
                    return a.body;
                  })
                );
              case "blob":
                return u.pipe(
                  S((a) => {
                    if (a.body !== null && !(a.body instanceof Blob))
                      throw new Error("Response is not a Blob.");
                    return a.body;
                  })
                );
              case "text":
                return u.pipe(
                  S((a) => {
                    if (a.body !== null && typeof a.body != "string")
                      throw new Error("Response is not a string.");
                    return a.body;
                  })
                );
              case "json":
              default:
                return u.pipe(S((a) => a.body));
            }
          case "response":
            return u;
          default:
            throw new Error(
              `Unreachable: unhandled observe type ${i.observe}}`
            );
        }
      }
      delete(e, n = {}) {
        return this.request("DELETE", e, n);
      }
      get(e, n = {}) {
        return this.request("GET", e, n);
      }
      head(e, n = {}) {
        return this.request("HEAD", e, n);
      }
      jsonp(e, n) {
        return this.request("JSONP", e, {
          params: new ce().append(n, "JSONP_CALLBACK"),
          observe: "body",
          responseType: "json",
        });
      }
      options(e, n = {}) {
        return this.request("OPTIONS", e, n);
      }
      patch(e, n, i = {}) {
        return this.request("PATCH", e, kn(i, n));
      }
      post(e, n, i = {}) {
        return this.request("POST", e, kn(i, n));
      }
      put(e, n, i = {}) {
        return this.request("PUT", e, kn(i, n));
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)(g(nt));
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: t.ɵfac });
      }
    }
    return t;
  })(),
  lo = /^\)\]\}',?\n/,
  ho = "X-Request-URL";
function Fi(t) {
  if (t.url) return t.url;
  let r = ho.toLocaleLowerCase();
  return t.headers.get(r);
}
var fo = (() => {
    class t {
      constructor() {
        (this.fetchImpl =
          d(Bn, { optional: !0 })?.fetch ?? ((...e) => globalThis.fetch(...e))),
          (this.ngZone = d(z));
      }
      handle(e) {
        return new un((n) => {
          let i = new AbortController();
          return (
            this.doRequest(e, i.signal, n).then(jn, (s) =>
              n.error(new ue({ error: s }))
            ),
            () => i.abort()
          );
        });
      }
      doRequest(e, n, i) {
        return It(this, null, function* () {
          let s = this.createRequestInit(e),
            o;
          try {
            let C = this.ngZone.runOutsideAngular(() =>
              this.fetchImpl(e.urlWithParams, f({ signal: n }, s))
            );
            po(C), i.next({ type: le.Sent }), (o = yield C);
          } catch (C) {
            i.error(
              new ue({
                error: C,
                status: C.status ?? 0,
                statusText: C.statusText,
                url: e.urlWithParams,
                headers: C.headers,
              })
            );
            return;
          }
          let u = new W(o.headers),
            a = o.statusText,
            c = Fi(o) ?? e.urlWithParams,
            l = o.status,
            h = null;
          if (
            (e.reportProgress &&
              i.next(new Ut({ headers: u, status: l, statusText: a, url: c })),
            o.body)
          ) {
            let C = o.headers.get("content-length"),
              E = [],
              w = o.body.getReader(),
              v = 0,
              M,
              H,
              R = typeof Zone < "u" && Zone.current;
            yield this.ngZone.runOutsideAngular(() =>
              It(this, null, function* () {
                for (;;) {
                  let { done: X, value: Ve } = yield w.read();
                  if (X) break;
                  if ((E.push(Ve), (v += Ve.length), e.reportProgress)) {
                    H =
                      e.responseType === "text"
                        ? (H ?? "") +
                          (M ??= new TextDecoder()).decode(Ve, { stream: !0 })
                        : void 0;
                    let _r = () =>
                      i.next({
                        type: le.DownloadProgress,
                        total: C ? +C : void 0,
                        loaded: v,
                        partialText: H,
                      });
                    R ? R.run(_r) : _r();
                  }
                }
              })
            );
            let K = this.concatChunks(E, v);
            try {
              let X = o.headers.get("Content-Type") ?? "";
              h = this.parseBody(e, K, X);
            } catch (X) {
              i.error(
                new ue({
                  error: X,
                  headers: new W(o.headers),
                  status: o.status,
                  statusText: o.statusText,
                  url: Fi(o) ?? e.urlWithParams,
                })
              );
              return;
            }
          }
          l === 0 && (l = h ? ji : 0),
            l >= 200 && l < 300
              ? (i.next(
                  new ye({
                    body: h,
                    headers: u,
                    status: l,
                    statusText: a,
                    url: c,
                  })
                ),
                i.complete())
              : i.error(
                  new ue({
                    error: h,
                    headers: u,
                    status: l,
                    statusText: a,
                    url: c,
                  })
                );
        });
      }
      parseBody(e, n, i) {
        switch (e.responseType) {
          case "json":
            let s = new TextDecoder().decode(n).replace(lo, "");
            return s === "" ? null : JSON.parse(s);
          case "text":
            return new TextDecoder().decode(n);
          case "blob":
            return new Blob([n], { type: i });
          case "arraybuffer":
            return n.buffer;
        }
      }
      createRequestInit(e) {
        let n = {},
          i = e.withCredentials ? "include" : void 0;
        if (
          (e.headers.forEach((s, o) => (n[s] = o.join(","))),
          e.headers.has("Accept") ||
            (n.Accept = "application/json, text/plain, */*"),
          !e.headers.has("Content-Type"))
        ) {
          let s = e.detectContentTypeHeader();
          s !== null && (n["Content-Type"] = s);
        }
        return {
          body: e.serializeBody(),
          method: e.method,
          headers: n,
          credentials: i,
        };
      }
      concatChunks(e, n) {
        let i = new Uint8Array(n),
          s = 0;
        for (let o of e) i.set(o, s), (s += o.length);
        return i;
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: t.ɵfac });
      }
    }
    return t;
  })(),
  Bn = class {};
function jn() {}
function po(t) {
  t.then(jn, jn);
}
function $i(t, r) {
  return r(t);
}
function go(t, r) {
  return (e, n) => r.intercept(e, { handle: (i) => t(i, n) });
}
function mo(t, r, e) {
  return (n, i) => j(e, () => r(n, (s) => t(s, i)));
}
var Do = new b(""),
  $n = new b(""),
  zi = new b(""),
  Vi = new b("", { providedIn: "root", factory: () => !0 });
function vo() {
  let t = null;
  return (r, e) => {
    t === null && (t = (d(Do, { optional: !0 }) ?? []).reduceRight(go, $i));
    let n = d(We);
    if (d(Vi)) {
      let s = n.add();
      return t(r, e).pipe(pe(() => n.remove(s)));
    } else return t(r, e);
  };
}
var Mi = (() => {
  class t extends nt {
    constructor(e, n) {
      super(),
        (this.backend = e),
        (this.injector = n),
        (this.chain = null),
        (this.pendingTasks = d(We)),
        (this.contributeToStability = d(Vi));
    }
    handle(e) {
      if (this.chain === null) {
        let n = Array.from(
          new Set([...this.injector.get($n), ...this.injector.get(zi, [])])
        );
        this.chain = n.reduceRight((i, s) => mo(i, s, this.injector), $i);
      }
      if (this.contributeToStability) {
        let n = this.pendingTasks.add();
        return this.chain(e, (i) => this.backend.handle(i)).pipe(
          pe(() => this.pendingTasks.remove(n))
        );
      } else return this.chain(e, (n) => this.backend.handle(n));
    }
    static {
      this.ɵfac = function (n) {
        return new (n || t)(g(xt), g(ve));
      };
    }
    static {
      this.ɵprov = D({ token: t, factory: t.ɵfac });
    }
  }
  return t;
})();
var yo = /^\)\]\}',?\n/;
function wo(t) {
  return "responseURL" in t && t.responseURL
    ? t.responseURL
    : /^X-Request-URL:/m.test(t.getAllResponseHeaders())
      ? t.getResponseHeader("X-Request-URL")
      : null;
}
var Oi = (() => {
    class t {
      constructor(e) {
        this.xhrFactory = e;
      }
      handle(e) {
        if (e.method === "JSONP") throw new T(-2800, !1);
        let n = this.xhrFactory;
        return (n.ɵloadImpl ? _(n.ɵloadImpl()) : p(null)).pipe(
          k(
            () =>
              new un((s) => {
                let o = n.build();
                if (
                  (o.open(e.method, e.urlWithParams),
                  e.withCredentials && (o.withCredentials = !0),
                  e.headers.forEach((w, v) =>
                    o.setRequestHeader(w, v.join(","))
                  ),
                  e.headers.has("Accept") ||
                    o.setRequestHeader(
                      "Accept",
                      "application/json, text/plain, */*"
                    ),
                  !e.headers.has("Content-Type"))
                ) {
                  let w = e.detectContentTypeHeader();
                  w !== null && o.setRequestHeader("Content-Type", w);
                }
                if (e.responseType) {
                  let w = e.responseType.toLowerCase();
                  o.responseType = w !== "json" ? w : "text";
                }
                let u = e.serializeBody(),
                  a = null,
                  c = () => {
                    if (a !== null) return a;
                    let w = o.statusText || "OK",
                      v = new W(o.getAllResponseHeaders()),
                      M = wo(o) || e.url;
                    return (
                      (a = new Ut({
                        headers: v,
                        status: o.status,
                        statusText: w,
                        url: M,
                      })),
                      a
                    );
                  },
                  l = () => {
                    let { headers: w, status: v, statusText: M, url: H } = c(),
                      R = null;
                    v !== uo &&
                      (R =
                        typeof o.response > "u" ? o.responseText : o.response),
                      v === 0 && (v = R ? ji : 0);
                    let K = v >= 200 && v < 300;
                    if (e.responseType === "json" && typeof R == "string") {
                      let X = R;
                      R = R.replace(yo, "");
                      try {
                        R = R !== "" ? JSON.parse(R) : null;
                      } catch (Ve) {
                        (R = X), K && ((K = !1), (R = { error: Ve, text: R }));
                      }
                    }
                    K
                      ? (s.next(
                          new ye({
                            body: R,
                            headers: w,
                            status: v,
                            statusText: M,
                            url: H || void 0,
                          })
                        ),
                        s.complete())
                      : s.error(
                          new ue({
                            error: R,
                            headers: w,
                            status: v,
                            statusText: M,
                            url: H || void 0,
                          })
                        );
                  },
                  h = (w) => {
                    let { url: v } = c(),
                      M = new ue({
                        error: w,
                        status: o.status || 0,
                        statusText: o.statusText || "Unknown Error",
                        url: v || void 0,
                      });
                    s.error(M);
                  },
                  y = !1,
                  C = (w) => {
                    y || (s.next(c()), (y = !0));
                    let v = { type: le.DownloadProgress, loaded: w.loaded };
                    w.lengthComputable && (v.total = w.total),
                      e.responseType === "text" &&
                        o.responseText &&
                        (v.partialText = o.responseText),
                      s.next(v);
                  },
                  E = (w) => {
                    let v = { type: le.UploadProgress, loaded: w.loaded };
                    w.lengthComputable && (v.total = w.total), s.next(v);
                  };
                return (
                  o.addEventListener("load", l),
                  o.addEventListener("error", h),
                  o.addEventListener("timeout", h),
                  o.addEventListener("abort", h),
                  e.reportProgress &&
                    (o.addEventListener("progress", C),
                    u !== null &&
                      o.upload &&
                      o.upload.addEventListener("progress", E)),
                  o.send(u),
                  s.next({ type: le.Sent }),
                  () => {
                    o.removeEventListener("error", h),
                      o.removeEventListener("abort", h),
                      o.removeEventListener("load", l),
                      o.removeEventListener("timeout", h),
                      e.reportProgress &&
                        (o.removeEventListener("progress", C),
                        u !== null &&
                          o.upload &&
                          o.upload.removeEventListener("progress", E)),
                      o.readyState !== o.DONE && o.abort();
                  }
                );
              })
          )
        );
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)(g(Me));
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: t.ɵfac });
      }
    }
    return t;
  })(),
  Gi = new b(""),
  Co = "XSRF-TOKEN",
  Eo = new b("", { providedIn: "root", factory: () => Co }),
  So = "X-XSRF-TOKEN",
  bo = new b("", { providedIn: "root", factory: () => So }),
  Bt = class {},
  Ao = (() => {
    class t {
      constructor(e, n, i) {
        (this.doc = e),
          (this.platform = n),
          (this.cookieName = i),
          (this.lastCookieString = ""),
          (this.lastToken = null),
          (this.parseCount = 0);
      }
      getToken() {
        if (this.platform === "server") return null;
        let e = this.doc.cookie || "";
        return (
          e !== this.lastCookieString &&
            (this.parseCount++,
            (this.lastToken = Lt(e, this.cookieName)),
            (this.lastCookieString = e)),
          this.lastToken
        );
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)(g(P), g(q), g(Eo));
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: t.ɵfac });
      }
    }
    return t;
  })();
function Ro(t, r) {
  let e = t.url.toLowerCase();
  if (
    !d(Gi) ||
    t.method === "GET" ||
    t.method === "HEAD" ||
    e.startsWith("http://") ||
    e.startsWith("https://")
  )
    return r(t);
  let n = d(Bt).getToken(),
    i = d(bo);
  return (
    n != null &&
      !t.headers.has(i) &&
      (t = t.clone({ headers: t.headers.set(i, n) })),
    r(t)
  );
}
var Hi = (function (t) {
  return (
    (t[(t.Interceptors = 0)] = "Interceptors"),
    (t[(t.LegacyInterceptors = 1)] = "LegacyInterceptors"),
    (t[(t.CustomXsrfConfiguration = 2)] = "CustomXsrfConfiguration"),
    (t[(t.NoXsrfProtection = 3)] = "NoXsrfProtection"),
    (t[(t.JsonpSupport = 4)] = "JsonpSupport"),
    (t[(t.RequestsMadeViaParent = 5)] = "RequestsMadeViaParent"),
    (t[(t.Fetch = 6)] = "Fetch"),
    t
  );
})(Hi || {});
function To(t, r) {
  return { ɵkind: t, ɵproviders: r };
}
function Io(...t) {
  let r = [
    co,
    Oi,
    Mi,
    { provide: nt, useExisting: Mi },
    { provide: xt, useFactory: () => d(fo, { optional: !0 }) ?? d(Oi) },
    { provide: $n, useValue: Ro, multi: !0 },
    { provide: Gi, useValue: !0 },
    { provide: Bt, useClass: Ao },
  ];
  for (let e of t) r.push(...e.ɵproviders);
  return Ae(r);
}
var _i = new b("");
function Fo() {
  return To(Hi.LegacyInterceptors, [
    { provide: _i, useFactory: vo },
    { provide: $n, useExisting: _i, multi: !0 },
  ]);
}
var Hc = (() => {
  class t {
    static {
      this.ɵfac = function (n) {
        return new (n || t)();
      };
    }
    static {
      this.ɵmod = me({ type: t });
    }
    static {
      this.ɵinj = ge({ providers: [Io(Fo())] });
    }
  }
  return t;
})();
var Mo = new b(""),
  Pi = "b",
  Li = "h",
  Ni = "s",
  ki = "st",
  xi = "u",
  Ui = "rt",
  kt = new b(""),
  Oo = ["GET", "HEAD"];
function _o(t, r) {
  let C = d(kt),
    { isCacheActive: e } = C,
    n = Pr(C, ["isCacheActive"]),
    { transferCache: i, method: s } = t;
  if (
    !e ||
    i === !1 ||
    (s === "POST" && !n.includePostRequests && !i) ||
    (s !== "POST" && !Oo.includes(s)) ||
    (!n.includeRequestsWithAuthHeaders && Po(t)) ||
    n.filter?.(t) === !1
  )
    return r(t);
  let o = d(Cn),
    u = d(Mo, { optional: !0 }),
    a = et(d(q));
  if (u && !a) throw new T(2803, !1);
  let c = a && u ? xo(t.url, u) : t.url,
    l = No(t, c),
    h = o.get(l, null),
    y = n.includeHeaders;
  if ((typeof i == "object" && i.includeHeaders && (y = i.includeHeaders), h)) {
    let { [Pi]: E, [Ui]: w, [Li]: v, [Ni]: M, [ki]: H, [xi]: R } = h,
      K = E;
    switch (w) {
      case "arraybuffer":
        K = new TextEncoder().encode(E).buffer;
        break;
      case "blob":
        K = new Blob([E]);
        break;
    }
    let X = new W(v);
    return p(new ye({ body: K, headers: X, status: M, statusText: H, url: R }));
  }
  return r(t).pipe(
    I((E) => {
      E instanceof ye &&
        a &&
        o.set(l, {
          [Pi]: E.body,
          [Li]: Lo(E.headers, y),
          [Ni]: E.status,
          [ki]: E.statusText,
          [xi]: c,
          [Ui]: t.responseType,
        });
    })
  );
}
function Po(t) {
  return t.headers.has("authorization") || t.headers.has("proxy-authorization");
}
function Lo(t, r) {
  if (!r) return {};
  let e = {};
  for (let n of r) {
    let i = t.getAll(n);
    i !== null && (e[n] = i);
  }
  return e;
}
function Bi(t) {
  return [...t.keys()]
    .sort()
    .map((r) => `${r}=${t.getAll(r)}`)
    .join("&");
}
function No(t, r) {
  let { params: e, method: n, responseType: i } = t,
    s = Bi(e),
    o = t.serializeBody();
  o instanceof URLSearchParams ? (o = Bi(o)) : typeof o != "string" && (o = "");
  let u = [n, i, r, o, s].join("|"),
    a = ko(u);
  return a;
}
function ko(t) {
  let r = 0;
  for (let e of t) r = (Math.imul(31, r) + e.charCodeAt(0)) << 0;
  return (r += 2147483648), r.toString();
}
function qi(t) {
  return [
    {
      provide: kt,
      useFactory: () => (
        En("NgHttpTransferCache"), f({ isCacheActive: !0 }, t)
      ),
    },
    { provide: zi, useValue: _o, multi: !0, deps: [Cn, kt] },
    {
      provide: Xe,
      multi: !0,
      useFactory: () => {
        let r = d(Je),
          e = d(kt);
        return () => {
          Tn(r).then(() => {
            e.isCacheActive = !1;
          });
        };
      },
    },
  ];
}
function xo(t, r) {
  let e = new URL(t, "resolve://").origin,
    n = r[e];
  return n ? t.replace(e, n) : t;
}
var Gn = class extends Pt {
    constructor() {
      super(...arguments), (this.supportsDOMEvents = !0);
    }
  },
  Hn = class t extends Gn {
    static makeCurrent() {
      yi(new t());
    }
    onAndCancel(r, e, n) {
      return (
        r.addEventListener(e, n),
        () => {
          r.removeEventListener(e, n);
        }
      );
    }
    dispatchEvent(r, e) {
      r.dispatchEvent(e);
    }
    remove(r) {
      r.remove();
    }
    createElement(r, e) {
      return (e = e || this.getDefaultDocument()), e.createElement(r);
    }
    createHtmlDocument() {
      return document.implementation.createHTMLDocument("fakeTitle");
    }
    getDefaultDocument() {
      return document;
    }
    isElementNode(r) {
      return r.nodeType === Node.ELEMENT_NODE;
    }
    isShadowRoot(r) {
      return r instanceof DocumentFragment;
    }
    getGlobalEventTarget(r, e) {
      return e === "window"
        ? window
        : e === "document"
          ? r
          : e === "body"
            ? r.body
            : null;
    }
    getBaseHref(r) {
      let e = Bo();
      return e == null ? null : jo(e);
    }
    resetBaseElement() {
      it = null;
    }
    getUserAgent() {
      return window.navigator.userAgent;
    }
    getCookie(r) {
      return Lt(document.cookie, r);
    }
  },
  it = null;
function Bo() {
  return (
    (it = it || document.querySelector("base")),
    it ? it.getAttribute("href") : null
  );
}
function jo(t) {
  return new URL(t, document.baseURI).pathname;
}
var $o = (() => {
    class t {
      build() {
        return new XMLHttpRequest();
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: t.ɵfac });
      }
    }
    return t;
  })(),
  qn = new b(""),
  Ki = (() => {
    class t {
      constructor(e, n) {
        (this._zone = n),
          (this._eventNameToPlugin = new Map()),
          e.forEach((i) => {
            i.manager = this;
          }),
          (this._plugins = e.slice().reverse());
      }
      addEventListener(e, n, i) {
        return this._findPluginFor(n).addEventListener(e, n, i);
      }
      getZone() {
        return this._zone;
      }
      _findPluginFor(e) {
        let n = this._eventNameToPlugin.get(e);
        if (n) return n;
        if (((n = this._plugins.find((s) => s.supports(e))), !n))
          throw new T(5101, !1);
        return this._eventNameToPlugin.set(e, n), n;
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)(g(qn), g(z));
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: t.ɵfac });
      }
    }
    return t;
  })(),
  jt = class {
    constructor(r) {
      this._doc = r;
    }
  },
  zn = "ng-app-id",
  Xi = (() => {
    class t {
      constructor(e, n, i, s = {}) {
        (this.doc = e),
          (this.appId = n),
          (this.nonce = i),
          (this.platformId = s),
          (this.styleRef = new Map()),
          (this.hostNodes = new Set()),
          (this.styleNodesInDOM = this.collectServerRenderedStyles()),
          (this.platformIsServer = et(s)),
          this.resetHostNodes();
      }
      addStyles(e) {
        for (let n of e)
          this.changeUsageCount(n, 1) === 1 && this.onStyleAdded(n);
      }
      removeStyles(e) {
        for (let n of e)
          this.changeUsageCount(n, -1) <= 0 && this.onStyleRemoved(n);
      }
      ngOnDestroy() {
        let e = this.styleNodesInDOM;
        e && (e.forEach((n) => n.remove()), e.clear());
        for (let n of this.getAllStyles()) this.onStyleRemoved(n);
        this.resetHostNodes();
      }
      addHost(e) {
        this.hostNodes.add(e);
        for (let n of this.getAllStyles()) this.addStyleToHost(e, n);
      }
      removeHost(e) {
        this.hostNodes.delete(e);
      }
      getAllStyles() {
        return this.styleRef.keys();
      }
      onStyleAdded(e) {
        for (let n of this.hostNodes) this.addStyleToHost(n, e);
      }
      onStyleRemoved(e) {
        let n = this.styleRef;
        n.get(e)?.elements?.forEach((i) => i.remove()), n.delete(e);
      }
      collectServerRenderedStyles() {
        let e = this.doc.head?.querySelectorAll(`style[${zn}="${this.appId}"]`);
        if (e?.length) {
          let n = new Map();
          return (
            e.forEach((i) => {
              i.textContent != null && n.set(i.textContent, i);
            }),
            n
          );
        }
        return null;
      }
      changeUsageCount(e, n) {
        let i = this.styleRef;
        if (i.has(e)) {
          let s = i.get(e);
          return (s.usage += n), s.usage;
        }
        return i.set(e, { usage: n, elements: [] }), n;
      }
      getStyleElement(e, n) {
        let i = this.styleNodesInDOM,
          s = i?.get(n);
        if (s?.parentNode === e) return i.delete(n), s.removeAttribute(zn), s;
        {
          let o = this.doc.createElement("style");
          return (
            this.nonce && o.setAttribute("nonce", this.nonce),
            (o.textContent = n),
            this.platformIsServer && o.setAttribute(zn, this.appId),
            e.appendChild(o),
            o
          );
        }
      }
      addStyleToHost(e, n) {
        let i = this.getStyleElement(e, n),
          s = this.styleRef,
          o = s.get(n)?.elements;
        o ? o.push(i) : s.set(n, { elements: [i], usage: 1 });
      }
      resetHostNodes() {
        let e = this.hostNodes;
        e.clear(), e.add(this.doc.head);
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)(g(P), g(yn), g(wn, 8), g(q));
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: t.ɵfac });
      }
    }
    return t;
  })(),
  Vn = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/",
    math: "http://www.w3.org/1998/Math/MathML",
  },
  Zn = /%COMP%/g,
  Ji = "%COMP%",
  zo = `_nghost-${Ji}`,
  Vo = `_ngcontent-${Ji}`,
  Go = !0,
  Ho = new b("", { providedIn: "root", factory: () => Go });
function qo(t) {
  return Vo.replace(Zn, t);
}
function Wo(t) {
  return zo.replace(Zn, t);
}
function Qi(t, r) {
  return r.map((e) => e.replace(Zn, t));
}
var Wi = (() => {
    class t {
      constructor(e, n, i, s, o, u, a, c = null) {
        (this.eventManager = e),
          (this.sharedStylesHost = n),
          (this.appId = i),
          (this.removeStylesOnCompDestroy = s),
          (this.doc = o),
          (this.platformId = u),
          (this.ngZone = a),
          (this.nonce = c),
          (this.rendererByCompId = new Map()),
          (this.platformIsServer = et(u)),
          (this.defaultRenderer = new st(e, o, a, this.platformIsServer));
      }
      createRenderer(e, n) {
        if (!e || !n) return this.defaultRenderer;
        this.platformIsServer &&
          n.encapsulation === qe.ShadowDom &&
          (n = O(f({}, n), { encapsulation: qe.Emulated }));
        let i = this.getOrCreateRenderer(e, n);
        return (
          i instanceof $t
            ? i.applyToHost(e)
            : i instanceof ot && i.applyStyles(),
          i
        );
      }
      getOrCreateRenderer(e, n) {
        let i = this.rendererByCompId,
          s = i.get(n.id);
        if (!s) {
          let o = this.doc,
            u = this.ngZone,
            a = this.eventManager,
            c = this.sharedStylesHost,
            l = this.removeStylesOnCompDestroy,
            h = this.platformIsServer;
          switch (n.encapsulation) {
            case qe.Emulated:
              s = new $t(a, c, n, this.appId, l, o, u, h);
              break;
            case qe.ShadowDom:
              return new Wn(a, c, e, n, o, u, this.nonce, h);
            default:
              s = new ot(a, c, n, l, o, u, h);
              break;
          }
          i.set(n.id, s);
        }
        return s;
      }
      ngOnDestroy() {
        this.rendererByCompId.clear();
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)(
            g(Ki),
            g(Xi),
            g(yn),
            g(Ho),
            g(P),
            g(q),
            g(z),
            g(wn)
          );
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: t.ɵfac });
      }
    }
    return t;
  })(),
  st = class {
    constructor(r, e, n, i) {
      (this.eventManager = r),
        (this.doc = e),
        (this.ngZone = n),
        (this.platformIsServer = i),
        (this.data = Object.create(null)),
        (this.throwOnSyntheticProps = !0),
        (this.destroyNode = null);
    }
    destroy() {}
    createElement(r, e) {
      return e
        ? this.doc.createElementNS(Vn[e] || e, r)
        : this.doc.createElement(r);
    }
    createComment(r) {
      return this.doc.createComment(r);
    }
    createText(r) {
      return this.doc.createTextNode(r);
    }
    appendChild(r, e) {
      (Yi(r) ? r.content : r).appendChild(e);
    }
    insertBefore(r, e, n) {
      r && (Yi(r) ? r.content : r).insertBefore(e, n);
    }
    removeChild(r, e) {
      e.remove();
    }
    selectRootElement(r, e) {
      let n = typeof r == "string" ? this.doc.querySelector(r) : r;
      if (!n) throw new T(-5104, !1);
      return e || (n.textContent = ""), n;
    }
    parentNode(r) {
      return r.parentNode;
    }
    nextSibling(r) {
      return r.nextSibling;
    }
    setAttribute(r, e, n, i) {
      if (i) {
        e = i + ":" + e;
        let s = Vn[i];
        s ? r.setAttributeNS(s, e, n) : r.setAttribute(e, n);
      } else r.setAttribute(e, n);
    }
    removeAttribute(r, e, n) {
      if (n) {
        let i = Vn[n];
        i ? r.removeAttributeNS(i, e) : r.removeAttribute(`${n}:${e}`);
      } else r.removeAttribute(e);
    }
    addClass(r, e) {
      r.classList.add(e);
    }
    removeClass(r, e) {
      r.classList.remove(e);
    }
    setStyle(r, e, n, i) {
      i & (Te.DashCase | Te.Important)
        ? r.style.setProperty(e, n, i & Te.Important ? "important" : "")
        : (r.style[e] = n);
    }
    removeStyle(r, e, n) {
      n & Te.DashCase ? r.style.removeProperty(e) : (r.style[e] = "");
    }
    setProperty(r, e, n) {
      r != null && (r[e] = n);
    }
    setValue(r, e) {
      r.nodeValue = e;
    }
    listen(r, e, n) {
      if (
        typeof r == "string" &&
        ((r = Fe().getGlobalEventTarget(this.doc, r)), !r)
      )
        throw new Error(`Unsupported event target ${r} for event ${e}`);
      return this.eventManager.addEventListener(
        r,
        e,
        this.decoratePreventDefault(n)
      );
    }
    decoratePreventDefault(r) {
      return (e) => {
        if (e === "__ngUnwrap__") return r;
        (this.platformIsServer ? this.ngZone.runGuarded(() => r(e)) : r(e)) ===
          !1 && e.preventDefault();
      };
    }
  };
function Yi(t) {
  return t.tagName === "TEMPLATE" && t.content !== void 0;
}
var Wn = class extends st {
    constructor(r, e, n, i, s, o, u, a) {
      super(r, s, o, a),
        (this.sharedStylesHost = e),
        (this.hostEl = n),
        (this.shadowRoot = n.attachShadow({ mode: "open" })),
        this.sharedStylesHost.addHost(this.shadowRoot);
      let c = Qi(i.id, i.styles);
      for (let l of c) {
        let h = document.createElement("style");
        u && h.setAttribute("nonce", u),
          (h.textContent = l),
          this.shadowRoot.appendChild(h);
      }
    }
    nodeOrShadowRoot(r) {
      return r === this.hostEl ? this.shadowRoot : r;
    }
    appendChild(r, e) {
      return super.appendChild(this.nodeOrShadowRoot(r), e);
    }
    insertBefore(r, e, n) {
      return super.insertBefore(this.nodeOrShadowRoot(r), e, n);
    }
    removeChild(r, e) {
      return super.removeChild(null, e);
    }
    parentNode(r) {
      return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(r)));
    }
    destroy() {
      this.sharedStylesHost.removeHost(this.shadowRoot);
    }
  },
  ot = class extends st {
    constructor(r, e, n, i, s, o, u, a) {
      super(r, s, o, u),
        (this.sharedStylesHost = e),
        (this.removeStylesOnCompDestroy = i),
        (this.styles = a ? Qi(a, n.styles) : n.styles);
    }
    applyStyles() {
      this.sharedStylesHost.addStyles(this.styles);
    }
    destroy() {
      this.removeStylesOnCompDestroy &&
        this.sharedStylesHost.removeStyles(this.styles);
    }
  },
  $t = class extends ot {
    constructor(r, e, n, i, s, o, u, a) {
      let c = i + "-" + n.id;
      super(r, e, n, s, o, u, a, c),
        (this.contentAttr = qo(c)),
        (this.hostAttr = Wo(c));
    }
    applyToHost(r) {
      this.applyStyles(), this.setAttribute(r, this.hostAttr, "");
    }
    createElement(r, e) {
      let n = super.createElement(r, e);
      return super.setAttribute(n, this.contentAttr, ""), n;
    }
  },
  Yo = (() => {
    class t extends jt {
      constructor(e) {
        super(e);
      }
      supports(e) {
        return !0;
      }
      addEventListener(e, n, i) {
        return (
          e.addEventListener(n, i, !1), () => this.removeEventListener(e, n, i)
        );
      }
      removeEventListener(e, n, i) {
        return e.removeEventListener(n, i);
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)(g(P));
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: t.ɵfac });
      }
    }
    return t;
  })(),
  Zi = ["alt", "control", "meta", "shift"],
  Zo = {
    "\b": "Backspace",
    "	": "Tab",
    "\x7F": "Delete",
    "\x1B": "Escape",
    Del: "Delete",
    Esc: "Escape",
    Left: "ArrowLeft",
    Right: "ArrowRight",
    Up: "ArrowUp",
    Down: "ArrowDown",
    Menu: "ContextMenu",
    Scroll: "ScrollLock",
    Win: "OS",
  },
  Ko = {
    alt: (t) => t.altKey,
    control: (t) => t.ctrlKey,
    meta: (t) => t.metaKey,
    shift: (t) => t.shiftKey,
  },
  Xo = (() => {
    class t extends jt {
      constructor(e) {
        super(e);
      }
      supports(e) {
        return t.parseEventName(e) != null;
      }
      addEventListener(e, n, i) {
        let s = t.parseEventName(n),
          o = t.eventCallback(s.fullKey, i, this.manager.getZone());
        return this.manager
          .getZone()
          .runOutsideAngular(() => Fe().onAndCancel(e, s.domEventName, o));
      }
      static parseEventName(e) {
        let n = e.toLowerCase().split("."),
          i = n.shift();
        if (n.length === 0 || !(i === "keydown" || i === "keyup")) return null;
        let s = t._normalizeKey(n.pop()),
          o = "",
          u = n.indexOf("code");
        if (
          (u > -1 && (n.splice(u, 1), (o = "code.")),
          Zi.forEach((c) => {
            let l = n.indexOf(c);
            l > -1 && (n.splice(l, 1), (o += c + "."));
          }),
          (o += s),
          n.length != 0 || s.length === 0)
        )
          return null;
        let a = {};
        return (a.domEventName = i), (a.fullKey = o), a;
      }
      static matchEventFullKeyCode(e, n) {
        let i = Zo[e.key] || e.key,
          s = "";
        return (
          n.indexOf("code.") > -1 && ((i = e.code), (s = "code.")),
          i == null || !i
            ? !1
            : ((i = i.toLowerCase()),
              i === " " ? (i = "space") : i === "." && (i = "dot"),
              Zi.forEach((o) => {
                if (o !== i) {
                  let u = Ko[o];
                  u(e) && (s += o + ".");
                }
              }),
              (s += i),
              s === n)
        );
      }
      static eventCallback(e, n, i) {
        return (s) => {
          t.matchEventFullKeyCode(s, e) && i.runGuarded(() => n(s));
        };
      }
      static _normalizeKey(e) {
        return e === "esc" ? "escape" : e;
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)(g(P));
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: t.ɵfac });
      }
    }
    return t;
  })();
function Sl(t, r) {
  return li(f({ rootComponent: t }, Jo(r)));
}
function Jo(t) {
  return {
    appProviders: [...ra, ...(t?.providers ?? [])],
    platformProviders: na,
  };
}
function Qo() {
  Hn.makeCurrent();
}
function ea() {
  return new vn();
}
function ta() {
  return Zr(document), document;
}
var na = [
  { provide: q, useValue: Nn },
  { provide: Kr, useValue: Qo, multi: !0 },
  { provide: P, useFactory: ta, deps: [] },
];
var ra = [
  { provide: Yr, useValue: "root" },
  { provide: vn, useFactory: ea, deps: [] },
  { provide: qn, useClass: Yo, multi: !0, deps: [P, z, q] },
  { provide: qn, useClass: Xo, multi: !0, deps: [P] },
  Wi,
  Xi,
  Ki,
  { provide: ei, useExisting: Wi },
  { provide: Me, useClass: $o, deps: [] },
  [],
];
var es = (() => {
  class t {
    constructor(e) {
      this._doc = e;
    }
    getTitle() {
      return this._doc.title;
    }
    setTitle(e) {
      this._doc.title = e || "";
    }
    static {
      this.ɵfac = function (n) {
        return new (n || t)(g(P));
      };
    }
    static {
      this.ɵprov = D({ token: t, factory: t.ɵfac, providedIn: "root" });
    }
  }
  return t;
})();
var Yn = (function (t) {
  return (
    (t[(t.NoHttpTransferCache = 0)] = "NoHttpTransferCache"),
    (t[(t.HttpTransferCacheOptions = 1)] = "HttpTransferCacheOptions"),
    (t[(t.I18nSupport = 2)] = "I18nSupport"),
    (t[(t.EventReplay = 3)] = "EventReplay"),
    t
  );
})(Yn || {});
function bl(...t) {
  let r = [],
    e = new Set(),
    n = e.has(Yn.HttpTransferCacheOptions);
  for (let { ɵproviders: i, ɵkind: s } of t) e.add(s), i.length && r.push(i);
  return Ae([[], di(), e.has(Yn.NoHttpTransferCache) || n ? [] : qi({}), r]);
}
var m = "primary",
  Ct = Symbol("RouteTitle"),
  er = class {
    constructor(r) {
      this.params = r || {};
    }
    has(r) {
      return Object.prototype.hasOwnProperty.call(this.params, r);
    }
    get(r) {
      if (this.has(r)) {
        let e = this.params[r];
        return Array.isArray(e) ? e[0] : e;
      }
      return null;
    }
    getAll(r) {
      if (this.has(r)) {
        let e = this.params[r];
        return Array.isArray(e) ? e : [e];
      }
      return [];
    }
    get keys() {
      return Object.keys(this.params);
    }
  };
function xe(t) {
  return new er(t);
}
function sa(t, r, e) {
  let n = e.path.split("/");
  if (
    n.length > t.length ||
    (e.pathMatch === "full" && (r.hasChildren() || n.length < t.length))
  )
    return null;
  let i = {};
  for (let s = 0; s < n.length; s++) {
    let o = n[s],
      u = t[s];
    if (o[0] === ":") i[o.substring(1)] = u;
    else if (o !== u.path) return null;
  }
  return { consumed: t.slice(0, n.length), posParams: i };
}
function oa(t, r) {
  if (t.length !== r.length) return !1;
  for (let e = 0; e < t.length; ++e) if (!Y(t[e], r[e])) return !1;
  return !0;
}
function Y(t, r) {
  let e = t ? tr(t) : void 0,
    n = r ? tr(r) : void 0;
  if (!e || !n || e.length != n.length) return !1;
  let i;
  for (let s = 0; s < e.length; s++)
    if (((i = e[s]), !hs(t[i], r[i]))) return !1;
  return !0;
}
function tr(t) {
  return [...Object.keys(t), ...Object.getOwnPropertySymbols(t)];
}
function hs(t, r) {
  if (Array.isArray(t) && Array.isArray(r)) {
    if (t.length !== r.length) return !1;
    let e = [...t].sort(),
      n = [...r].sort();
    return e.every((i, s) => n[s] === i);
  } else return t === r;
}
function fs(t) {
  return t.length > 0 ? t[t.length - 1] : null;
}
function fe(t) {
  return kr(t) ? t : An(t) ? _(Promise.resolve(t)) : p(t);
}
var aa = { exact: gs, subset: ms },
  ps = { exact: ua, subset: ca, ignored: () => !0 };
function ts(t, r, e) {
  return (
    aa[e.paths](t.root, r.root, e.matrixParams) &&
    ps[e.queryParams](t.queryParams, r.queryParams) &&
    !(e.fragment === "exact" && t.fragment !== r.fragment)
  );
}
function ua(t, r) {
  return Y(t, r);
}
function gs(t, r, e) {
  if (
    !Ce(t.segments, r.segments) ||
    !Gt(t.segments, r.segments, e) ||
    t.numberOfChildren !== r.numberOfChildren
  )
    return !1;
  for (let n in r.children)
    if (!t.children[n] || !gs(t.children[n], r.children[n], e)) return !1;
  return !0;
}
function ca(t, r) {
  return (
    Object.keys(r).length <= Object.keys(t).length &&
    Object.keys(r).every((e) => hs(t[e], r[e]))
  );
}
function ms(t, r, e) {
  return Ds(t, r, r.segments, e);
}
function Ds(t, r, e, n) {
  if (t.segments.length > e.length) {
    let i = t.segments.slice(0, e.length);
    return !(!Ce(i, e) || r.hasChildren() || !Gt(i, e, n));
  } else if (t.segments.length === e.length) {
    if (!Ce(t.segments, e) || !Gt(t.segments, e, n)) return !1;
    for (let i in r.children)
      if (!t.children[i] || !ms(t.children[i], r.children[i], n)) return !1;
    return !0;
  } else {
    let i = e.slice(0, t.segments.length),
      s = e.slice(t.segments.length);
    return !Ce(t.segments, i) || !Gt(t.segments, i, n) || !t.children[m]
      ? !1
      : Ds(t.children[m], r, s, n);
  }
}
function Gt(t, r, e) {
  return r.every((n, i) => ps[e](t[i].parameters, n.parameters));
}
var ne = class {
    constructor(r = new A([], {}), e = {}, n = null) {
      (this.root = r), (this.queryParams = e), (this.fragment = n);
    }
    get queryParamMap() {
      return (
        (this._queryParamMap ??= xe(this.queryParams)), this._queryParamMap
      );
    }
    toString() {
      return ha.serialize(this);
    }
  },
  A = class {
    constructor(r, e) {
      (this.segments = r),
        (this.children = e),
        (this.parent = null),
        Object.values(e).forEach((n) => (n.parent = this));
    }
    hasChildren() {
      return this.numberOfChildren > 0;
    }
    get numberOfChildren() {
      return Object.keys(this.children).length;
    }
    toString() {
      return Ht(this);
    }
  },
  we = class {
    constructor(r, e) {
      (this.path = r), (this.parameters = e);
    }
    get parameterMap() {
      return (this._parameterMap ??= xe(this.parameters)), this._parameterMap;
    }
    toString() {
      return ys(this);
    }
  };
function la(t, r) {
  return Ce(t, r) && t.every((e, n) => Y(e.parameters, r[n].parameters));
}
function Ce(t, r) {
  return t.length !== r.length ? !1 : t.every((e, n) => e.path === r[n].path);
}
function da(t, r) {
  let e = [];
  return (
    Object.entries(t.children).forEach(([n, i]) => {
      n === m && (e = e.concat(r(i, n)));
    }),
    Object.entries(t.children).forEach(([n, i]) => {
      n !== m && (e = e.concat(r(i, n)));
    }),
    e
  );
}
var Et = (() => {
    class t {
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵprov = D({
          token: t,
          factory: () => new Ue(),
          providedIn: "root",
        });
      }
    }
    return t;
  })(),
  Ue = class {
    parse(r) {
      let e = new rr(r);
      return new ne(
        e.parseRootSegment(),
        e.parseQueryParams(),
        e.parseFragment()
      );
    }
    serialize(r) {
      let e = `/${at(r.root, !0)}`,
        n = ga(r.queryParams),
        i = typeof r.fragment == "string" ? `#${fa(r.fragment)}` : "";
      return `${e}${n}${i}`;
    }
  },
  ha = new Ue();
function Ht(t) {
  return t.segments.map((r) => ys(r)).join("/");
}
function at(t, r) {
  if (!t.hasChildren()) return Ht(t);
  if (r) {
    let e = t.children[m] ? at(t.children[m], !1) : "",
      n = [];
    return (
      Object.entries(t.children).forEach(([i, s]) => {
        i !== m && n.push(`${i}:${at(s, !1)}`);
      }),
      n.length > 0 ? `${e}(${n.join("//")})` : e
    );
  } else {
    let e = da(t, (n, i) =>
      i === m ? [at(t.children[m], !1)] : [`${i}:${at(n, !1)}`]
    );
    return Object.keys(t.children).length === 1 && t.children[m] != null
      ? `${Ht(t)}/${e[0]}`
      : `${Ht(t)}/(${e.join("//")})`;
  }
}
function vs(t) {
  return encodeURIComponent(t)
    .replace(/%40/g, "@")
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",");
}
function zt(t) {
  return vs(t).replace(/%3B/gi, ";");
}
function fa(t) {
  return encodeURI(t);
}
function nr(t) {
  return vs(t)
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/%26/gi, "&");
}
function qt(t) {
  return decodeURIComponent(t);
}
function ns(t) {
  return qt(t.replace(/\+/g, "%20"));
}
function ys(t) {
  return `${nr(t.path)}${pa(t.parameters)}`;
}
function pa(t) {
  return Object.entries(t)
    .map(([r, e]) => `;${nr(r)}=${nr(e)}`)
    .join("");
}
function ga(t) {
  let r = Object.entries(t)
    .map(([e, n]) =>
      Array.isArray(n)
        ? n.map((i) => `${zt(e)}=${zt(i)}`).join("&")
        : `${zt(e)}=${zt(n)}`
    )
    .filter((e) => e);
  return r.length ? `?${r.join("&")}` : "";
}
var ma = /^[^\/()?;#]+/;
function Kn(t) {
  let r = t.match(ma);
  return r ? r[0] : "";
}
var Da = /^[^\/()?;=#]+/;
function va(t) {
  let r = t.match(Da);
  return r ? r[0] : "";
}
var ya = /^[^=?&#]+/;
function wa(t) {
  let r = t.match(ya);
  return r ? r[0] : "";
}
var Ca = /^[^&#]+/;
function Ea(t) {
  let r = t.match(Ca);
  return r ? r[0] : "";
}
var rr = class {
  constructor(r) {
    (this.url = r), (this.remaining = r);
  }
  parseRootSegment() {
    return (
      this.consumeOptional("/"),
      this.remaining === "" ||
      this.peekStartsWith("?") ||
      this.peekStartsWith("#")
        ? new A([], {})
        : new A([], this.parseChildren())
    );
  }
  parseQueryParams() {
    let r = {};
    if (this.consumeOptional("?"))
      do this.parseQueryParam(r);
      while (this.consumeOptional("&"));
    return r;
  }
  parseFragment() {
    return this.consumeOptional("#")
      ? decodeURIComponent(this.remaining)
      : null;
  }
  parseChildren() {
    if (this.remaining === "") return {};
    this.consumeOptional("/");
    let r = [];
    for (
      this.peekStartsWith("(") || r.push(this.parseSegment());
      this.peekStartsWith("/") &&
      !this.peekStartsWith("//") &&
      !this.peekStartsWith("/(");

    )
      this.capture("/"), r.push(this.parseSegment());
    let e = {};
    this.peekStartsWith("/(") &&
      (this.capture("/"), (e = this.parseParens(!0)));
    let n = {};
    return (
      this.peekStartsWith("(") && (n = this.parseParens(!1)),
      (r.length > 0 || Object.keys(e).length > 0) && (n[m] = new A(r, e)),
      n
    );
  }
  parseSegment() {
    let r = Kn(this.remaining);
    if (r === "" && this.peekStartsWith(";")) throw new T(4009, !1);
    return this.capture(r), new we(qt(r), this.parseMatrixParams());
  }
  parseMatrixParams() {
    let r = {};
    for (; this.consumeOptional(";"); ) this.parseParam(r);
    return r;
  }
  parseParam(r) {
    let e = va(this.remaining);
    if (!e) return;
    this.capture(e);
    let n = "";
    if (this.consumeOptional("=")) {
      let i = Kn(this.remaining);
      i && ((n = i), this.capture(n));
    }
    r[qt(e)] = qt(n);
  }
  parseQueryParam(r) {
    let e = wa(this.remaining);
    if (!e) return;
    this.capture(e);
    let n = "";
    if (this.consumeOptional("=")) {
      let o = Ea(this.remaining);
      o && ((n = o), this.capture(n));
    }
    let i = ns(e),
      s = ns(n);
    if (r.hasOwnProperty(i)) {
      let o = r[i];
      Array.isArray(o) || ((o = [o]), (r[i] = o)), o.push(s);
    } else r[i] = s;
  }
  parseParens(r) {
    let e = {};
    for (
      this.capture("(");
      !this.consumeOptional(")") && this.remaining.length > 0;

    ) {
      let n = Kn(this.remaining),
        i = this.remaining[n.length];
      if (i !== "/" && i !== ")" && i !== ";") throw new T(4010, !1);
      let s;
      n.indexOf(":") > -1
        ? ((s = n.slice(0, n.indexOf(":"))), this.capture(s), this.capture(":"))
        : r && (s = m);
      let o = this.parseChildren();
      (e[s] = Object.keys(o).length === 1 ? o[m] : new A([], o)),
        this.consumeOptional("//");
    }
    return e;
  }
  peekStartsWith(r) {
    return this.remaining.startsWith(r);
  }
  consumeOptional(r) {
    return this.peekStartsWith(r)
      ? ((this.remaining = this.remaining.substring(r.length)), !0)
      : !1;
  }
  capture(r) {
    if (!this.consumeOptional(r)) throw new T(4011, !1);
  }
};
function ws(t) {
  return t.segments.length > 0 ? new A([], { [m]: t }) : t;
}
function Cs(t) {
  let r = {};
  for (let [n, i] of Object.entries(t.children)) {
    let s = Cs(i);
    if (n === m && s.segments.length === 0 && s.hasChildren())
      for (let [o, u] of Object.entries(s.children)) r[o] = u;
    else (s.segments.length > 0 || s.hasChildren()) && (r[n] = s);
  }
  let e = new A(t.segments, r);
  return Sa(e);
}
function Sa(t) {
  if (t.numberOfChildren === 1 && t.children[m]) {
    let r = t.children[m];
    return new A(t.segments.concat(r.segments), r.children);
  }
  return t;
}
function Ee(t) {
  return t instanceof ne;
}
function ba(t, r, e = null, n = null) {
  let i = Es(t);
  return Ss(i, r, e, n);
}
function Es(t) {
  let r;
  function e(s) {
    let o = {};
    for (let a of s.children) {
      let c = e(a);
      o[a.outlet] = c;
    }
    let u = new A(s.url, o);
    return s === t && (r = u), u;
  }
  let n = e(t.root),
    i = ws(n);
  return r ?? i;
}
function Ss(t, r, e, n) {
  let i = t;
  for (; i.parent; ) i = i.parent;
  if (r.length === 0) return Xn(i, i, i, e, n);
  let s = Aa(r);
  if (s.toRoot()) return Xn(i, i, new A([], {}), e, n);
  let o = Ra(s, i, t),
    u = o.processChildren
      ? lt(o.segmentGroup, o.index, s.commands)
      : As(o.segmentGroup, o.index, s.commands);
  return Xn(i, o.segmentGroup, u, e, n);
}
function Wt(t) {
  return typeof t == "object" && t != null && !t.outlets && !t.segmentPath;
}
function ft(t) {
  return typeof t == "object" && t != null && t.outlets;
}
function Xn(t, r, e, n, i) {
  let s = {};
  n &&
    Object.entries(n).forEach(([a, c]) => {
      s[a] = Array.isArray(c) ? c.map((l) => `${l}`) : `${c}`;
    });
  let o;
  t === r ? (o = e) : (o = bs(t, r, e));
  let u = ws(Cs(o));
  return new ne(u, s, i);
}
function bs(t, r, e) {
  let n = {};
  return (
    Object.entries(t.children).forEach(([i, s]) => {
      s === r ? (n[i] = e) : (n[i] = bs(s, r, e));
    }),
    new A(t.segments, n)
  );
}
var Yt = class {
  constructor(r, e, n) {
    if (
      ((this.isAbsolute = r),
      (this.numberOfDoubleDots = e),
      (this.commands = n),
      r && n.length > 0 && Wt(n[0]))
    )
      throw new T(4003, !1);
    let i = n.find(ft);
    if (i && i !== fs(n)) throw new T(4004, !1);
  }
  toRoot() {
    return (
      this.isAbsolute && this.commands.length === 1 && this.commands[0] == "/"
    );
  }
};
function Aa(t) {
  if (typeof t[0] == "string" && t.length === 1 && t[0] === "/")
    return new Yt(!0, 0, t);
  let r = 0,
    e = !1,
    n = t.reduce((i, s, o) => {
      if (typeof s == "object" && s != null) {
        if (s.outlets) {
          let u = {};
          return (
            Object.entries(s.outlets).forEach(([a, c]) => {
              u[a] = typeof c == "string" ? c.split("/") : c;
            }),
            [...i, { outlets: u }]
          );
        }
        if (s.segmentPath) return [...i, s.segmentPath];
      }
      return typeof s != "string"
        ? [...i, s]
        : o === 0
          ? (s.split("/").forEach((u, a) => {
              (a == 0 && u === ".") ||
                (a == 0 && u === ""
                  ? (e = !0)
                  : u === ".."
                    ? r++
                    : u != "" && i.push(u));
            }),
            i)
          : [...i, s];
    }, []);
  return new Yt(e, r, n);
}
var Le = class {
  constructor(r, e, n) {
    (this.segmentGroup = r), (this.processChildren = e), (this.index = n);
  }
};
function Ra(t, r, e) {
  if (t.isAbsolute) return new Le(r, !0, 0);
  if (!e) return new Le(r, !1, NaN);
  if (e.parent === null) return new Le(e, !0, 0);
  let n = Wt(t.commands[0]) ? 0 : 1,
    i = e.segments.length - 1 + n;
  return Ta(e, i, t.numberOfDoubleDots);
}
function Ta(t, r, e) {
  let n = t,
    i = r,
    s = e;
  for (; s > i; ) {
    if (((s -= i), (n = n.parent), !n)) throw new T(4005, !1);
    i = n.segments.length;
  }
  return new Le(n, !1, i - s);
}
function Ia(t) {
  return ft(t[0]) ? t[0].outlets : { [m]: t };
}
function As(t, r, e) {
  if (((t ??= new A([], {})), t.segments.length === 0 && t.hasChildren()))
    return lt(t, r, e);
  let n = Fa(t, r, e),
    i = e.slice(n.commandIndex);
  if (n.match && n.pathIndex < t.segments.length) {
    let s = new A(t.segments.slice(0, n.pathIndex), {});
    return (
      (s.children[m] = new A(t.segments.slice(n.pathIndex), t.children)),
      lt(s, 0, i)
    );
  } else
    return n.match && i.length === 0
      ? new A(t.segments, {})
      : n.match && !t.hasChildren()
        ? ir(t, r, e)
        : n.match
          ? lt(t, 0, i)
          : ir(t, r, e);
}
function lt(t, r, e) {
  if (e.length === 0) return new A(t.segments, {});
  {
    let n = Ia(e),
      i = {};
    if (
      Object.keys(n).some((s) => s !== m) &&
      t.children[m] &&
      t.numberOfChildren === 1 &&
      t.children[m].segments.length === 0
    ) {
      let s = lt(t.children[m], r, e);
      return new A(t.segments, s.children);
    }
    return (
      Object.entries(n).forEach(([s, o]) => {
        typeof o == "string" && (o = [o]),
          o !== null && (i[s] = As(t.children[s], r, o));
      }),
      Object.entries(t.children).forEach(([s, o]) => {
        n[s] === void 0 && (i[s] = o);
      }),
      new A(t.segments, i)
    );
  }
}
function Fa(t, r, e) {
  let n = 0,
    i = r,
    s = { match: !1, pathIndex: 0, commandIndex: 0 };
  for (; i < t.segments.length; ) {
    if (n >= e.length) return s;
    let o = t.segments[i],
      u = e[n];
    if (ft(u)) break;
    let a = `${u}`,
      c = n < e.length - 1 ? e[n + 1] : null;
    if (i > 0 && a === void 0) break;
    if (a && c && typeof c == "object" && c.outlets === void 0) {
      if (!is(a, c, o)) return s;
      n += 2;
    } else {
      if (!is(a, {}, o)) return s;
      n++;
    }
    i++;
  }
  return { match: !0, pathIndex: i, commandIndex: n };
}
function ir(t, r, e) {
  let n = t.segments.slice(0, r),
    i = 0;
  for (; i < e.length; ) {
    let s = e[i];
    if (ft(s)) {
      let a = Ma(s.outlets);
      return new A(n, a);
    }
    if (i === 0 && Wt(e[0])) {
      let a = t.segments[r];
      n.push(new we(a.path, rs(e[0]))), i++;
      continue;
    }
    let o = ft(s) ? s.outlets[m] : `${s}`,
      u = i < e.length - 1 ? e[i + 1] : null;
    o && u && Wt(u)
      ? (n.push(new we(o, rs(u))), (i += 2))
      : (n.push(new we(o, {})), i++);
  }
  return new A(n, {});
}
function Ma(t) {
  let r = {};
  return (
    Object.entries(t).forEach(([e, n]) => {
      typeof n == "string" && (n = [n]),
        n !== null && (r[e] = ir(new A([], {}), 0, n));
    }),
    r
  );
}
function rs(t) {
  let r = {};
  return Object.entries(t).forEach(([e, n]) => (r[e] = `${n}`)), r;
}
function is(t, r, e) {
  return t == e.path && Y(r, e.parameters);
}
var dt = "imperative",
  F = (function (t) {
    return (
      (t[(t.NavigationStart = 0)] = "NavigationStart"),
      (t[(t.NavigationEnd = 1)] = "NavigationEnd"),
      (t[(t.NavigationCancel = 2)] = "NavigationCancel"),
      (t[(t.NavigationError = 3)] = "NavigationError"),
      (t[(t.RoutesRecognized = 4)] = "RoutesRecognized"),
      (t[(t.ResolveStart = 5)] = "ResolveStart"),
      (t[(t.ResolveEnd = 6)] = "ResolveEnd"),
      (t[(t.GuardsCheckStart = 7)] = "GuardsCheckStart"),
      (t[(t.GuardsCheckEnd = 8)] = "GuardsCheckEnd"),
      (t[(t.RouteConfigLoadStart = 9)] = "RouteConfigLoadStart"),
      (t[(t.RouteConfigLoadEnd = 10)] = "RouteConfigLoadEnd"),
      (t[(t.ChildActivationStart = 11)] = "ChildActivationStart"),
      (t[(t.ChildActivationEnd = 12)] = "ChildActivationEnd"),
      (t[(t.ActivationStart = 13)] = "ActivationStart"),
      (t[(t.ActivationEnd = 14)] = "ActivationEnd"),
      (t[(t.Scroll = 15)] = "Scroll"),
      (t[(t.NavigationSkipped = 16)] = "NavigationSkipped"),
      t
    );
  })(F || {}),
  $ = class {
    constructor(r, e) {
      (this.id = r), (this.url = e);
    }
  },
  Be = class extends $ {
    constructor(r, e, n = "imperative", i = null) {
      super(r, e),
        (this.type = F.NavigationStart),
        (this.navigationTrigger = n),
        (this.restoredState = i);
    }
    toString() {
      return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
    }
  },
  G = class extends $ {
    constructor(r, e, n) {
      super(r, e), (this.urlAfterRedirects = n), (this.type = F.NavigationEnd);
    }
    toString() {
      return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
    }
  },
  U = (function (t) {
    return (
      (t[(t.Redirect = 0)] = "Redirect"),
      (t[(t.SupersededByNewNavigation = 1)] = "SupersededByNewNavigation"),
      (t[(t.NoDataFromResolver = 2)] = "NoDataFromResolver"),
      (t[(t.GuardRejected = 3)] = "GuardRejected"),
      t
    );
  })(U || {}),
  Zt = (function (t) {
    return (
      (t[(t.IgnoredSameUrlNavigation = 0)] = "IgnoredSameUrlNavigation"),
      (t[(t.IgnoredByUrlHandlingStrategy = 1)] =
        "IgnoredByUrlHandlingStrategy"),
      t
    );
  })(Zt || {}),
  te = class extends $ {
    constructor(r, e, n, i) {
      super(r, e),
        (this.reason = n),
        (this.code = i),
        (this.type = F.NavigationCancel);
    }
    toString() {
      return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
    }
  },
  de = class extends $ {
    constructor(r, e, n, i) {
      super(r, e),
        (this.reason = n),
        (this.code = i),
        (this.type = F.NavigationSkipped);
    }
  },
  pt = class extends $ {
    constructor(r, e, n, i) {
      super(r, e),
        (this.error = n),
        (this.target = i),
        (this.type = F.NavigationError);
    }
    toString() {
      return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
    }
  },
  Kt = class extends $ {
    constructor(r, e, n, i) {
      super(r, e),
        (this.urlAfterRedirects = n),
        (this.state = i),
        (this.type = F.RoutesRecognized);
    }
    toString() {
      return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  sr = class extends $ {
    constructor(r, e, n, i) {
      super(r, e),
        (this.urlAfterRedirects = n),
        (this.state = i),
        (this.type = F.GuardsCheckStart);
    }
    toString() {
      return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  or = class extends $ {
    constructor(r, e, n, i, s) {
      super(r, e),
        (this.urlAfterRedirects = n),
        (this.state = i),
        (this.shouldActivate = s),
        (this.type = F.GuardsCheckEnd);
    }
    toString() {
      return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
    }
  },
  ar = class extends $ {
    constructor(r, e, n, i) {
      super(r, e),
        (this.urlAfterRedirects = n),
        (this.state = i),
        (this.type = F.ResolveStart);
    }
    toString() {
      return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  ur = class extends $ {
    constructor(r, e, n, i) {
      super(r, e),
        (this.urlAfterRedirects = n),
        (this.state = i),
        (this.type = F.ResolveEnd);
    }
    toString() {
      return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  cr = class {
    constructor(r) {
      (this.route = r), (this.type = F.RouteConfigLoadStart);
    }
    toString() {
      return `RouteConfigLoadStart(path: ${this.route.path})`;
    }
  },
  lr = class {
    constructor(r) {
      (this.route = r), (this.type = F.RouteConfigLoadEnd);
    }
    toString() {
      return `RouteConfigLoadEnd(path: ${this.route.path})`;
    }
  },
  dr = class {
    constructor(r) {
      (this.snapshot = r), (this.type = F.ChildActivationStart);
    }
    toString() {
      return `ChildActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""}')`;
    }
  },
  hr = class {
    constructor(r) {
      (this.snapshot = r), (this.type = F.ChildActivationEnd);
    }
    toString() {
      return `ChildActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""}')`;
    }
  },
  fr = class {
    constructor(r) {
      (this.snapshot = r), (this.type = F.ActivationStart);
    }
    toString() {
      return `ActivationStart(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""}')`;
    }
  },
  pr = class {
    constructor(r) {
      (this.snapshot = r), (this.type = F.ActivationEnd);
    }
    toString() {
      return `ActivationEnd(path: '${(this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""}')`;
    }
  },
  Xt = class {
    constructor(r, e, n) {
      (this.routerEvent = r),
        (this.position = e),
        (this.anchor = n),
        (this.type = F.Scroll);
    }
    toString() {
      let r = this.position ? `${this.position[0]}, ${this.position[1]}` : null;
      return `Scroll(anchor: '${this.anchor}', position: '${r}')`;
    }
  },
  gt = class {},
  je = class {
    constructor(r, e) {
      (this.url = r), (this.navigationBehaviorOptions = e);
    }
  };
function Oa(t, r) {
  return (
    t.providers &&
      !t._injector &&
      (t._injector = bn(t.providers, r, `Route: ${t.path}`)),
    t._injector ?? r
  );
}
function V(t) {
  return t.outlet || m;
}
function _a(t, r) {
  let e = t.filter((n) => V(n) === r);
  return e.push(...t.filter((n) => V(n) !== r)), e;
}
function St(t) {
  if (!t) return null;
  if (t.routeConfig?._injector) return t.routeConfig._injector;
  for (let r = t.parent; r; r = r.parent) {
    let e = r.routeConfig;
    if (e?._loadedInjector) return e._loadedInjector;
    if (e?._injector) return e._injector;
  }
  return null;
}
var gr = class {
    get injector() {
      return St(this.route?.snapshot) ?? this.rootInjector;
    }
    set injector(r) {}
    constructor(r) {
      (this.rootInjector = r),
        (this.outlet = null),
        (this.route = null),
        (this.children = new bt(this.rootInjector)),
        (this.attachRef = null);
    }
  },
  bt = (() => {
    class t {
      constructor(e) {
        (this.rootInjector = e), (this.contexts = new Map());
      }
      onChildOutletCreated(e, n) {
        let i = this.getOrCreateContext(e);
        (i.outlet = n), this.contexts.set(e, i);
      }
      onChildOutletDestroyed(e) {
        let n = this.getContext(e);
        n && ((n.outlet = null), (n.attachRef = null));
      }
      onOutletDeactivated() {
        let e = this.contexts;
        return (this.contexts = new Map()), e;
      }
      onOutletReAttached(e) {
        this.contexts = e;
      }
      getOrCreateContext(e) {
        let n = this.getContext(e);
        return (
          n || ((n = new gr(this.rootInjector)), this.contexts.set(e, n)), n
        );
      }
      getContext(e) {
        return this.contexts.get(e) || null;
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)(g(ve));
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: t.ɵfac, providedIn: "root" });
      }
    }
    return t;
  })(),
  Jt = class {
    constructor(r) {
      this._root = r;
    }
    get root() {
      return this._root.value;
    }
    parent(r) {
      let e = this.pathFromRoot(r);
      return e.length > 1 ? e[e.length - 2] : null;
    }
    children(r) {
      let e = mr(r, this._root);
      return e ? e.children.map((n) => n.value) : [];
    }
    firstChild(r) {
      let e = mr(r, this._root);
      return e && e.children.length > 0 ? e.children[0].value : null;
    }
    siblings(r) {
      let e = Dr(r, this._root);
      return e.length < 2
        ? []
        : e[e.length - 2].children.map((i) => i.value).filter((i) => i !== r);
    }
    pathFromRoot(r) {
      return Dr(r, this._root).map((e) => e.value);
    }
  };
function mr(t, r) {
  if (t === r.value) return r;
  for (let e of r.children) {
    let n = mr(t, e);
    if (n) return n;
  }
  return null;
}
function Dr(t, r) {
  if (t === r.value) return [r];
  for (let e of r.children) {
    let n = Dr(t, e);
    if (n.length) return n.unshift(r), n;
  }
  return [];
}
var x = class {
  constructor(r, e) {
    (this.value = r), (this.children = e);
  }
  toString() {
    return `TreeNode(${this.value})`;
  }
};
function Pe(t) {
  let r = {};
  return t && t.children.forEach((e) => (r[e.value.outlet] = e)), r;
}
var Qt = class extends Jt {
  constructor(r, e) {
    super(r), (this.snapshot = e), Rr(this, r);
  }
  toString() {
    return this.snapshot.toString();
  }
};
function Rs(t) {
  let r = Pa(t),
    e = new B([new we("", {})]),
    n = new B({}),
    i = new B({}),
    s = new B({}),
    o = new B(""),
    u = new he(e, n, s, o, i, m, t, r.root);
  return (u.snapshot = r.root), new Qt(new x(u, []), r);
}
function Pa(t) {
  let r = {},
    e = {},
    n = {},
    i = "",
    s = new Ne([], r, n, i, e, m, t, null, {});
  return new tn("", new x(s, []));
}
var he = class {
  constructor(r, e, n, i, s, o, u, a) {
    (this.urlSubject = r),
      (this.paramsSubject = e),
      (this.queryParamsSubject = n),
      (this.fragmentSubject = i),
      (this.dataSubject = s),
      (this.outlet = o),
      (this.component = u),
      (this._futureSnapshot = a),
      (this.title = this.dataSubject?.pipe(S((c) => c[Ct])) ?? p(void 0)),
      (this.url = r),
      (this.params = e),
      (this.queryParams = n),
      (this.fragment = i),
      (this.data = s);
  }
  get routeConfig() {
    return this._futureSnapshot.routeConfig;
  }
  get root() {
    return this._routerState.root;
  }
  get parent() {
    return this._routerState.parent(this);
  }
  get firstChild() {
    return this._routerState.firstChild(this);
  }
  get children() {
    return this._routerState.children(this);
  }
  get pathFromRoot() {
    return this._routerState.pathFromRoot(this);
  }
  get paramMap() {
    return (
      (this._paramMap ??= this.params.pipe(S((r) => xe(r)))), this._paramMap
    );
  }
  get queryParamMap() {
    return (
      (this._queryParamMap ??= this.queryParams.pipe(S((r) => xe(r)))),
      this._queryParamMap
    );
  }
  toString() {
    return this.snapshot
      ? this.snapshot.toString()
      : `Future(${this._futureSnapshot})`;
  }
};
function en(t, r, e = "emptyOnly") {
  let n,
    { routeConfig: i } = t;
  return (
    r !== null &&
    (e === "always" ||
      i?.path === "" ||
      (!r.component && !r.routeConfig?.loadComponent))
      ? (n = {
          params: f(f({}, r.params), t.params),
          data: f(f({}, r.data), t.data),
          resolve: f(f(f(f({}, t.data), r.data), i?.data), t._resolvedData),
        })
      : (n = {
          params: f({}, t.params),
          data: f({}, t.data),
          resolve: f(f({}, t.data), t._resolvedData ?? {}),
        }),
    i && Is(i) && (n.resolve[Ct] = i.title),
    n
  );
}
var Ne = class {
    get title() {
      return this.data?.[Ct];
    }
    constructor(r, e, n, i, s, o, u, a, c) {
      (this.url = r),
        (this.params = e),
        (this.queryParams = n),
        (this.fragment = i),
        (this.data = s),
        (this.outlet = o),
        (this.component = u),
        (this.routeConfig = a),
        (this._resolve = c);
    }
    get root() {
      return this._routerState.root;
    }
    get parent() {
      return this._routerState.parent(this);
    }
    get firstChild() {
      return this._routerState.firstChild(this);
    }
    get children() {
      return this._routerState.children(this);
    }
    get pathFromRoot() {
      return this._routerState.pathFromRoot(this);
    }
    get paramMap() {
      return (this._paramMap ??= xe(this.params)), this._paramMap;
    }
    get queryParamMap() {
      return (
        (this._queryParamMap ??= xe(this.queryParams)), this._queryParamMap
      );
    }
    toString() {
      let r = this.url.map((n) => n.toString()).join("/"),
        e = this.routeConfig ? this.routeConfig.path : "";
      return `Route(url:'${r}', path:'${e}')`;
    }
  },
  tn = class extends Jt {
    constructor(r, e) {
      super(e), (this.url = r), Rr(this, e);
    }
    toString() {
      return Ts(this._root);
    }
  };
function Rr(t, r) {
  (r.value._routerState = t), r.children.forEach((e) => Rr(t, e));
}
function Ts(t) {
  let r = t.children.length > 0 ? ` { ${t.children.map(Ts).join(", ")} } ` : "";
  return `${t.value}${r}`;
}
function Jn(t) {
  if (t.snapshot) {
    let r = t.snapshot,
      e = t._futureSnapshot;
    (t.snapshot = e),
      Y(r.queryParams, e.queryParams) ||
        t.queryParamsSubject.next(e.queryParams),
      r.fragment !== e.fragment && t.fragmentSubject.next(e.fragment),
      Y(r.params, e.params) || t.paramsSubject.next(e.params),
      oa(r.url, e.url) || t.urlSubject.next(e.url),
      Y(r.data, e.data) || t.dataSubject.next(e.data);
  } else
    (t.snapshot = t._futureSnapshot),
      t.dataSubject.next(t._futureSnapshot.data);
}
function vr(t, r) {
  let e = Y(t.params, r.params) && la(t.url, r.url),
    n = !t.parent != !r.parent;
  return e && !n && (!t.parent || vr(t.parent, r.parent));
}
function Is(t) {
  return typeof t.title == "string" || t.title === null;
}
var La = (() => {
    class t {
      constructor() {
        (this.activated = null),
          (this._activatedRoute = null),
          (this.name = m),
          (this.activateEvents = new ae()),
          (this.deactivateEvents = new ae()),
          (this.attachEvents = new ae()),
          (this.detachEvents = new ae()),
          (this.parentContexts = d(bt)),
          (this.location = d(Ke)),
          (this.changeDetector = d(Ie)),
          (this.inputBinder = d(on, { optional: !0 })),
          (this.supportsBindingToComponentInputs = !0);
      }
      get activatedComponentRef() {
        return this.activated;
      }
      ngOnChanges(e) {
        if (e.name) {
          let { firstChange: n, previousValue: i } = e.name;
          if (n) return;
          this.isTrackedInParentContexts(i) &&
            (this.deactivate(), this.parentContexts.onChildOutletDestroyed(i)),
            this.initializeOutletWithName();
        }
      }
      ngOnDestroy() {
        this.isTrackedInParentContexts(this.name) &&
          this.parentContexts.onChildOutletDestroyed(this.name),
          this.inputBinder?.unsubscribeFromRouteData(this);
      }
      isTrackedInParentContexts(e) {
        return this.parentContexts.getContext(e)?.outlet === this;
      }
      ngOnInit() {
        this.initializeOutletWithName();
      }
      initializeOutletWithName() {
        if (
          (this.parentContexts.onChildOutletCreated(this.name, this),
          this.activated)
        )
          return;
        let e = this.parentContexts.getContext(this.name);
        e?.route &&
          (e.attachRef
            ? this.attach(e.attachRef, e.route)
            : this.activateWith(e.route, e.injector));
      }
      get isActivated() {
        return !!this.activated;
      }
      get component() {
        if (!this.activated) throw new T(4012, !1);
        return this.activated.instance;
      }
      get activatedRoute() {
        if (!this.activated) throw new T(4012, !1);
        return this._activatedRoute;
      }
      get activatedRouteData() {
        return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
      }
      detach() {
        if (!this.activated) throw new T(4012, !1);
        this.location.detach();
        let e = this.activated;
        return (
          (this.activated = null),
          (this._activatedRoute = null),
          this.detachEvents.emit(e.instance),
          e
        );
      }
      attach(e, n) {
        (this.activated = e),
          (this._activatedRoute = n),
          this.location.insert(e.hostView),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.attachEvents.emit(e.instance);
      }
      deactivate() {
        if (this.activated) {
          let e = this.component;
          this.activated.destroy(),
            (this.activated = null),
            (this._activatedRoute = null),
            this.deactivateEvents.emit(e);
        }
      }
      activateWith(e, n) {
        if (this.isActivated) throw new T(4013, !1);
        this._activatedRoute = e;
        let i = this.location,
          o = e.snapshot.component,
          u = this.parentContexts.getOrCreateContext(this.name).children,
          a = new yr(e, u, i.injector);
        (this.activated = i.createComponent(o, {
          index: i.length,
          injector: a,
          environmentInjector: n,
        })),
          this.changeDetector.markForCheck(),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.activateEvents.emit(this.activated.instance);
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵdir = De({
          type: t,
          selectors: [["router-outlet"]],
          inputs: { name: "name" },
          outputs: {
            activateEvents: "activate",
            deactivateEvents: "deactivate",
            attachEvents: "attach",
            detachEvents: "detach",
          },
          exportAs: ["outlet"],
          standalone: !0,
          features: [Re],
        });
      }
    }
    return t;
  })(),
  yr = class t {
    __ngOutletInjector(r) {
      return new t(this.route, this.childContexts, r);
    }
    constructor(r, e, n) {
      (this.route = r), (this.childContexts = e), (this.parent = n);
    }
    get(r, e) {
      return r === he
        ? this.route
        : r === bt
          ? this.childContexts
          : this.parent.get(r, e);
    }
  },
  on = new b(""),
  ss = (() => {
    class t {
      constructor() {
        this.outletDataSubscriptions = new Map();
      }
      bindActivatedRouteToOutletComponent(e) {
        this.unsubscribeFromRouteData(e), this.subscribeToRouteData(e);
      }
      unsubscribeFromRouteData(e) {
        this.outletDataSubscriptions.get(e)?.unsubscribe(),
          this.outletDataSubscriptions.delete(e);
      }
      subscribeToRouteData(e) {
        let { activatedRoute: n } = e,
          i = Ft([n.queryParams, n.params, n.data])
            .pipe(
              k(
                ([s, o, u], a) => (
                  (u = f(f(f({}, s), o), u)),
                  a === 0 ? p(u) : Promise.resolve(u)
                )
              )
            )
            .subscribe((s) => {
              if (
                !e.isActivated ||
                !e.activatedComponentRef ||
                e.activatedRoute !== n ||
                n.component === null
              ) {
                this.unsubscribeFromRouteData(e);
                return;
              }
              let o = hi(n.component);
              if (!o) {
                this.unsubscribeFromRouteData(e);
                return;
              }
              for (let { templateName: u } of o.inputs)
                e.activatedComponentRef.setInput(u, s[u]);
            });
        this.outletDataSubscriptions.set(e, i);
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: t.ɵfac });
      }
    }
    return t;
  })();
function Na(t, r, e) {
  let n = mt(t, r._root, e ? e._root : void 0);
  return new Qt(n, r);
}
function mt(t, r, e) {
  if (e && t.shouldReuseRoute(r.value, e.value.snapshot)) {
    let n = e.value;
    n._futureSnapshot = r.value;
    let i = ka(t, r, e);
    return new x(n, i);
  } else {
    if (t.shouldAttach(r.value)) {
      let s = t.retrieve(r.value);
      if (s !== null) {
        let o = s.route;
        return (
          (o.value._futureSnapshot = r.value),
          (o.children = r.children.map((u) => mt(t, u))),
          o
        );
      }
    }
    let n = xa(r.value),
      i = r.children.map((s) => mt(t, s));
    return new x(n, i);
  }
}
function ka(t, r, e) {
  return r.children.map((n) => {
    for (let i of e.children)
      if (t.shouldReuseRoute(n.value, i.value.snapshot)) return mt(t, n, i);
    return mt(t, n);
  });
}
function xa(t) {
  return new he(
    new B(t.url),
    new B(t.params),
    new B(t.queryParams),
    new B(t.fragment),
    new B(t.data),
    t.outlet,
    t.component,
    t
  );
}
var Dt = class {
    constructor(r, e) {
      (this.redirectTo = r), (this.navigationBehaviorOptions = e);
    }
  },
  Fs = "ngNavigationCancelingError";
function nn(t, r) {
  let { redirectTo: e, navigationBehaviorOptions: n } = Ee(r)
      ? { redirectTo: r, navigationBehaviorOptions: void 0 }
      : r,
    i = Ms(!1, U.Redirect);
  return (i.url = e), (i.navigationBehaviorOptions = n), i;
}
function Ms(t, r) {
  let e = new Error(`NavigationCancelingError: ${t || ""}`);
  return (e[Fs] = !0), (e.cancellationCode = r), e;
}
function Ua(t) {
  return Os(t) && Ee(t.url);
}
function Os(t) {
  return !!t && t[Fs];
}
var Ba = (t, r, e, n) =>
    S(
      (i) => (
        new wr(r, i.targetRouterState, i.currentRouterState, e, n).activate(t),
        i
      )
    ),
  wr = class {
    constructor(r, e, n, i, s) {
      (this.routeReuseStrategy = r),
        (this.futureState = e),
        (this.currState = n),
        (this.forwardEvent = i),
        (this.inputBindingEnabled = s);
    }
    activate(r) {
      let e = this.futureState._root,
        n = this.currState ? this.currState._root : null;
      this.deactivateChildRoutes(e, n, r),
        Jn(this.futureState.root),
        this.activateChildRoutes(e, n, r);
    }
    deactivateChildRoutes(r, e, n) {
      let i = Pe(e);
      r.children.forEach((s) => {
        let o = s.value.outlet;
        this.deactivateRoutes(s, i[o], n), delete i[o];
      }),
        Object.values(i).forEach((s) => {
          this.deactivateRouteAndItsChildren(s, n);
        });
    }
    deactivateRoutes(r, e, n) {
      let i = r.value,
        s = e ? e.value : null;
      if (i === s)
        if (i.component) {
          let o = n.getContext(i.outlet);
          o && this.deactivateChildRoutes(r, e, o.children);
        } else this.deactivateChildRoutes(r, e, n);
      else s && this.deactivateRouteAndItsChildren(e, n);
    }
    deactivateRouteAndItsChildren(r, e) {
      r.value.component &&
      this.routeReuseStrategy.shouldDetach(r.value.snapshot)
        ? this.detachAndStoreRouteSubtree(r, e)
        : this.deactivateRouteAndOutlet(r, e);
    }
    detachAndStoreRouteSubtree(r, e) {
      let n = e.getContext(r.value.outlet),
        i = n && r.value.component ? n.children : e,
        s = Pe(r);
      for (let o of Object.values(s)) this.deactivateRouteAndItsChildren(o, i);
      if (n && n.outlet) {
        let o = n.outlet.detach(),
          u = n.children.onOutletDeactivated();
        this.routeReuseStrategy.store(r.value.snapshot, {
          componentRef: o,
          route: r,
          contexts: u,
        });
      }
    }
    deactivateRouteAndOutlet(r, e) {
      let n = e.getContext(r.value.outlet),
        i = n && r.value.component ? n.children : e,
        s = Pe(r);
      for (let o of Object.values(s)) this.deactivateRouteAndItsChildren(o, i);
      n &&
        (n.outlet && (n.outlet.deactivate(), n.children.onOutletDeactivated()),
        (n.attachRef = null),
        (n.route = null));
    }
    activateChildRoutes(r, e, n) {
      let i = Pe(e);
      r.children.forEach((s) => {
        this.activateRoutes(s, i[s.value.outlet], n),
          this.forwardEvent(new pr(s.value.snapshot));
      }),
        r.children.length && this.forwardEvent(new hr(r.value.snapshot));
    }
    activateRoutes(r, e, n) {
      let i = r.value,
        s = e ? e.value : null;
      if ((Jn(i), i === s))
        if (i.component) {
          let o = n.getOrCreateContext(i.outlet);
          this.activateChildRoutes(r, e, o.children);
        } else this.activateChildRoutes(r, e, n);
      else if (i.component) {
        let o = n.getOrCreateContext(i.outlet);
        if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
          let u = this.routeReuseStrategy.retrieve(i.snapshot);
          this.routeReuseStrategy.store(i.snapshot, null),
            o.children.onOutletReAttached(u.contexts),
            (o.attachRef = u.componentRef),
            (o.route = u.route.value),
            o.outlet && o.outlet.attach(u.componentRef, u.route.value),
            Jn(u.route.value),
            this.activateChildRoutes(r, null, o.children);
        } else
          (o.attachRef = null),
            (o.route = i),
            o.outlet && o.outlet.activateWith(i, o.injector),
            this.activateChildRoutes(r, null, o.children);
      } else this.activateChildRoutes(r, null, n);
    }
  },
  rn = class {
    constructor(r) {
      (this.path = r), (this.route = this.path[this.path.length - 1]);
    }
  },
  ke = class {
    constructor(r, e) {
      (this.component = r), (this.route = e);
    }
  };
function ja(t, r, e) {
  let n = t._root,
    i = r ? r._root : null;
  return ut(n, i, e, [n.value]);
}
function $a(t) {
  let r = t.routeConfig ? t.routeConfig.canActivateChild : null;
  return !r || r.length === 0 ? null : { node: t, guards: r };
}
function ze(t, r) {
  let e = Symbol(),
    n = r.get(t, e);
  return n === e ? (typeof t == "function" && !Hr(t) ? t : r.get(t)) : n;
}
function ut(
  t,
  r,
  e,
  n,
  i = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let s = Pe(r);
  return (
    t.children.forEach((o) => {
      za(o, s[o.value.outlet], e, n.concat([o.value]), i),
        delete s[o.value.outlet];
    }),
    Object.entries(s).forEach(([o, u]) => ht(u, e.getContext(o), i)),
    i
  );
}
function za(
  t,
  r,
  e,
  n,
  i = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let s = t.value,
    o = r ? r.value : null,
    u = e ? e.getContext(t.value.outlet) : null;
  if (o && s.routeConfig === o.routeConfig) {
    let a = Va(o, s, s.routeConfig.runGuardsAndResolvers);
    a
      ? i.canActivateChecks.push(new rn(n))
      : ((s.data = o.data), (s._resolvedData = o._resolvedData)),
      s.component ? ut(t, r, u ? u.children : null, n, i) : ut(t, r, e, n, i),
      a &&
        u &&
        u.outlet &&
        u.outlet.isActivated &&
        i.canDeactivateChecks.push(new ke(u.outlet.component, o));
  } else
    o && ht(r, u, i),
      i.canActivateChecks.push(new rn(n)),
      s.component
        ? ut(t, null, u ? u.children : null, n, i)
        : ut(t, null, e, n, i);
  return i;
}
function Va(t, r, e) {
  if (typeof e == "function") return e(t, r);
  switch (e) {
    case "pathParamsChange":
      return !Ce(t.url, r.url);
    case "pathParamsOrQueryParamsChange":
      return !Ce(t.url, r.url) || !Y(t.queryParams, r.queryParams);
    case "always":
      return !0;
    case "paramsOrQueryParamsChange":
      return !vr(t, r) || !Y(t.queryParams, r.queryParams);
    case "paramsChange":
    default:
      return !vr(t, r);
  }
}
function ht(t, r, e) {
  let n = Pe(t),
    i = t.value;
  Object.entries(n).forEach(([s, o]) => {
    i.component
      ? r
        ? ht(o, r.children.getContext(s), e)
        : ht(o, null, e)
      : ht(o, r, e);
  }),
    i.component
      ? r && r.outlet && r.outlet.isActivated
        ? e.canDeactivateChecks.push(new ke(r.outlet.component, i))
        : e.canDeactivateChecks.push(new ke(null, i))
      : e.canDeactivateChecks.push(new ke(null, i));
}
function At(t) {
  return typeof t == "function";
}
function Ga(t) {
  return typeof t == "boolean";
}
function Ha(t) {
  return t && At(t.canLoad);
}
function qa(t) {
  return t && At(t.canActivate);
}
function Wa(t) {
  return t && At(t.canActivateChild);
}
function Ya(t) {
  return t && At(t.canDeactivate);
}
function Za(t) {
  return t && At(t.canMatch);
}
function _s(t) {
  return t instanceof xr || t?.name === "EmptyError";
}
var Vt = Symbol("INITIAL_VALUE");
function $e() {
  return k((t) =>
    Ft(t.map((r) => r.pipe(be(1), zr(Vt)))).pipe(
      S((r) => {
        for (let e of r)
          if (e !== !0) {
            if (e === Vt) return Vt;
            if (e === !1 || Ka(e)) return e;
          }
        return !0;
      }),
      J((r) => r !== Vt),
      be(1)
    )
  );
}
function Ka(t) {
  return Ee(t) || t instanceof Dt;
}
function Xa(t, r) {
  return N((e) => {
    let {
      targetSnapshot: n,
      currentSnapshot: i,
      guards: { canActivateChecks: s, canDeactivateChecks: o },
    } = e;
    return o.length === 0 && s.length === 0
      ? p(O(f({}, e), { guardsResult: !0 }))
      : Ja(o, n, i, t).pipe(
          N((u) => (u && Ga(u) ? Qa(n, s, t, r) : p(u))),
          S((u) => O(f({}, e), { guardsResult: u }))
        );
  });
}
function Ja(t, r, e, n) {
  return _(t).pipe(
    N((i) => iu(i.component, i.route, e, r, n)),
    oe((i) => i !== !0, !0)
  );
}
function Qa(t, r, e, n) {
  return _(r).pipe(
    se((i) =>
      Ur(
        tu(i.route.parent, n),
        eu(i.route, n),
        ru(t, i.path, e),
        nu(t, i.route, e)
      )
    ),
    oe((i) => i !== !0, !0)
  );
}
function eu(t, r) {
  return t !== null && r && r(new fr(t)), p(!0);
}
function tu(t, r) {
  return t !== null && r && r(new dr(t)), p(!0);
}
function nu(t, r, e) {
  let n = r.routeConfig ? r.routeConfig.canActivate : null;
  if (!n || n.length === 0) return p(!0);
  let i = n.map((s) =>
    dn(() => {
      let o = St(r) ?? e,
        u = ze(s, o),
        a = qa(u) ? u.canActivate(r, t) : j(o, () => u(r, t));
      return fe(a).pipe(oe());
    })
  );
  return p(i).pipe($e());
}
function ru(t, r, e) {
  let n = r[r.length - 1],
    s = r
      .slice(0, r.length - 1)
      .reverse()
      .map((o) => $a(o))
      .filter((o) => o !== null)
      .map((o) =>
        dn(() => {
          let u = o.guards.map((a) => {
            let c = St(o.node) ?? e,
              l = ze(a, c),
              h = Wa(l) ? l.canActivateChild(n, t) : j(c, () => l(n, t));
            return fe(h).pipe(oe());
          });
          return p(u).pipe($e());
        })
      );
  return p(s).pipe($e());
}
function iu(t, r, e, n, i) {
  let s = r && r.routeConfig ? r.routeConfig.canDeactivate : null;
  if (!s || s.length === 0) return p(!0);
  let o = s.map((u) => {
    let a = St(r) ?? i,
      c = ze(u, a),
      l = Ya(c) ? c.canDeactivate(t, r, e, n) : j(a, () => c(t, r, e, n));
    return fe(l).pipe(oe());
  });
  return p(o).pipe($e());
}
function su(t, r, e, n) {
  let i = r.canLoad;
  if (i === void 0 || i.length === 0) return p(!0);
  let s = i.map((o) => {
    let u = ze(o, t),
      a = Ha(u) ? u.canLoad(r, e) : j(t, () => u(r, e));
    return fe(a);
  });
  return p(s).pipe($e(), Ps(n));
}
function Ps(t) {
  return Nr(
    I((r) => {
      if (typeof r != "boolean") throw nn(t, r);
    }),
    S((r) => r === !0)
  );
}
function ou(t, r, e, n) {
  let i = r.canMatch;
  if (!i || i.length === 0) return p(!0);
  let s = i.map((o) => {
    let u = ze(o, t),
      a = Za(u) ? u.canMatch(r, e) : j(t, () => u(r, e));
    return fe(a);
  });
  return p(s).pipe($e(), Ps(n));
}
var vt = class {
    constructor(r) {
      this.segmentGroup = r || null;
    }
  },
  yt = class extends Error {
    constructor(r) {
      super(), (this.urlTree = r);
    }
  };
function _e(t) {
  return Ge(new vt(t));
}
function au(t) {
  return Ge(new T(4e3, !1));
}
function uu(t) {
  return Ge(Ms(!1, U.GuardRejected));
}
var Cr = class {
    constructor(r, e) {
      (this.urlSerializer = r), (this.urlTree = e);
    }
    lineralizeSegments(r, e) {
      let n = [],
        i = e.root;
      for (;;) {
        if (((n = n.concat(i.segments)), i.numberOfChildren === 0)) return p(n);
        if (i.numberOfChildren > 1 || !i.children[m])
          return au(`${r.redirectTo}`);
        i = i.children[m];
      }
    }
    applyRedirectCommands(r, e, n, i, s) {
      if (typeof e != "string") {
        let u = e,
          {
            queryParams: a,
            fragment: c,
            routeConfig: l,
            url: h,
            outlet: y,
            params: C,
            data: E,
            title: w,
          } = i,
          v = j(s, () =>
            u({
              params: C,
              data: E,
              queryParams: a,
              fragment: c,
              routeConfig: l,
              url: h,
              outlet: y,
              title: w,
            })
          );
        if (v instanceof ne) throw new yt(v);
        e = v;
      }
      let o = this.applyRedirectCreateUrlTree(
        e,
        this.urlSerializer.parse(e),
        r,
        n
      );
      if (e[0] === "/") throw new yt(o);
      return o;
    }
    applyRedirectCreateUrlTree(r, e, n, i) {
      let s = this.createSegmentGroup(r, e.root, n, i);
      return new ne(
        s,
        this.createQueryParams(e.queryParams, this.urlTree.queryParams),
        e.fragment
      );
    }
    createQueryParams(r, e) {
      let n = {};
      return (
        Object.entries(r).forEach(([i, s]) => {
          if (typeof s == "string" && s[0] === ":") {
            let u = s.substring(1);
            n[i] = e[u];
          } else n[i] = s;
        }),
        n
      );
    }
    createSegmentGroup(r, e, n, i) {
      let s = this.createSegments(r, e.segments, n, i),
        o = {};
      return (
        Object.entries(e.children).forEach(([u, a]) => {
          o[u] = this.createSegmentGroup(r, a, n, i);
        }),
        new A(s, o)
      );
    }
    createSegments(r, e, n, i) {
      return e.map((s) =>
        s.path[0] === ":" ? this.findPosParam(r, s, i) : this.findOrReturn(s, n)
      );
    }
    findPosParam(r, e, n) {
      let i = n[e.path.substring(1)];
      if (!i) throw new T(4001, !1);
      return i;
    }
    findOrReturn(r, e) {
      let n = 0;
      for (let i of e) {
        if (i.path === r.path) return e.splice(n), i;
        n++;
      }
      return r;
    }
  },
  Er = {
    matched: !1,
    consumedSegments: [],
    remainingSegments: [],
    parameters: {},
    positionalParamSegments: {},
  };
function cu(t, r, e, n, i) {
  let s = Ls(t, r, e);
  return s.matched
    ? ((n = Oa(r, n)),
      ou(n, r, e, i).pipe(S((o) => (o === !0 ? s : f({}, Er)))))
    : p(s);
}
function Ls(t, r, e) {
  if (r.path === "**") return lu(e);
  if (r.path === "")
    return r.pathMatch === "full" && (t.hasChildren() || e.length > 0)
      ? f({}, Er)
      : {
          matched: !0,
          consumedSegments: [],
          remainingSegments: e,
          parameters: {},
          positionalParamSegments: {},
        };
  let i = (r.matcher || sa)(e, t, r);
  if (!i) return f({}, Er);
  let s = {};
  Object.entries(i.posParams ?? {}).forEach(([u, a]) => {
    s[u] = a.path;
  });
  let o =
    i.consumed.length > 0
      ? f(f({}, s), i.consumed[i.consumed.length - 1].parameters)
      : s;
  return {
    matched: !0,
    consumedSegments: i.consumed,
    remainingSegments: e.slice(i.consumed.length),
    parameters: o,
    positionalParamSegments: i.posParams ?? {},
  };
}
function lu(t) {
  return {
    matched: !0,
    parameters: t.length > 0 ? fs(t).parameters : {},
    consumedSegments: t,
    remainingSegments: [],
    positionalParamSegments: {},
  };
}
function os(t, r, e, n) {
  return e.length > 0 && fu(t, e, n)
    ? {
        segmentGroup: new A(r, hu(n, new A(e, t.children))),
        slicedSegments: [],
      }
    : e.length === 0 && pu(t, e, n)
      ? {
          segmentGroup: new A(t.segments, du(t, e, n, t.children)),
          slicedSegments: e,
        }
      : { segmentGroup: new A(t.segments, t.children), slicedSegments: e };
}
function du(t, r, e, n) {
  let i = {};
  for (let s of e)
    if (an(t, r, s) && !n[V(s)]) {
      let o = new A([], {});
      i[V(s)] = o;
    }
  return f(f({}, n), i);
}
function hu(t, r) {
  let e = {};
  e[m] = r;
  for (let n of t)
    if (n.path === "" && V(n) !== m) {
      let i = new A([], {});
      e[V(n)] = i;
    }
  return e;
}
function fu(t, r, e) {
  return e.some((n) => an(t, r, n) && V(n) !== m);
}
function pu(t, r, e) {
  return e.some((n) => an(t, r, n));
}
function an(t, r, e) {
  return (t.hasChildren() || r.length > 0) && e.pathMatch === "full"
    ? !1
    : e.path === "";
}
function gu(t, r, e) {
  return r.length === 0 && !t.children[e];
}
var Sr = class {};
function mu(t, r, e, n, i, s, o = "emptyOnly") {
  return new br(t, r, e, n, i, o, s).recognize();
}
var Du = 31,
  br = class {
    constructor(r, e, n, i, s, o, u) {
      (this.injector = r),
        (this.configLoader = e),
        (this.rootComponentType = n),
        (this.config = i),
        (this.urlTree = s),
        (this.paramsInheritanceStrategy = o),
        (this.urlSerializer = u),
        (this.applyRedirects = new Cr(this.urlSerializer, this.urlTree)),
        (this.absoluteRedirectCount = 0),
        (this.allowRedirects = !0);
    }
    noMatchError(r) {
      return new T(4002, `'${r.segmentGroup}'`);
    }
    recognize() {
      let r = os(this.urlTree.root, [], [], this.config).segmentGroup;
      return this.match(r).pipe(
        S(({ children: e, rootSnapshot: n }) => {
          let i = new x(n, e),
            s = new tn("", i),
            o = ba(n, [], this.urlTree.queryParams, this.urlTree.fragment);
          return (
            (o.queryParams = this.urlTree.queryParams),
            (s.url = this.urlSerializer.serialize(o)),
            { state: s, tree: o }
          );
        })
      );
    }
    match(r) {
      let e = new Ne(
        [],
        Object.freeze({}),
        Object.freeze(f({}, this.urlTree.queryParams)),
        this.urlTree.fragment,
        Object.freeze({}),
        m,
        this.rootComponentType,
        null,
        {}
      );
      return this.processSegmentGroup(this.injector, this.config, r, m, e).pipe(
        S((n) => ({ children: n, rootSnapshot: e })),
        Se((n) => {
          if (n instanceof yt)
            return (this.urlTree = n.urlTree), this.match(n.urlTree.root);
          throw n instanceof vt ? this.noMatchError(n) : n;
        })
      );
    }
    processSegmentGroup(r, e, n, i, s) {
      return n.segments.length === 0 && n.hasChildren()
        ? this.processChildren(r, e, n, s)
        : this.processSegment(r, e, n, n.segments, i, !0, s).pipe(
            S((o) => (o instanceof x ? [o] : []))
          );
    }
    processChildren(r, e, n, i) {
      let s = [];
      for (let o of Object.keys(n.children))
        o === "primary" ? s.unshift(o) : s.push(o);
      return _(s).pipe(
        se((o) => {
          let u = n.children[o],
            a = _a(e, o);
          return this.processSegmentGroup(r, a, u, o, i);
        }),
        $r((o, u) => (o.push(...u), o)),
        hn(null),
        jr(),
        N((o) => {
          if (o === null) return _e(n);
          let u = Ns(o);
          return vu(u), p(u);
        })
      );
    }
    processSegment(r, e, n, i, s, o, u) {
      return _(e).pipe(
        se((a) =>
          this.processSegmentAgainstRoute(
            a._injector ?? r,
            e,
            a,
            n,
            i,
            s,
            o,
            u
          ).pipe(
            Se((c) => {
              if (c instanceof vt) return p(null);
              throw c;
            })
          )
        ),
        oe((a) => !!a),
        Se((a) => {
          if (_s(a)) return gu(n, i, s) ? p(new Sr()) : _e(n);
          throw a;
        })
      );
    }
    processSegmentAgainstRoute(r, e, n, i, s, o, u, a) {
      return V(n) !== o && (o === m || !an(i, s, n))
        ? _e(i)
        : n.redirectTo === void 0
          ? this.matchSegmentAgainstRoute(r, i, n, s, o, a)
          : this.allowRedirects && u
            ? this.expandSegmentAgainstRouteUsingRedirect(r, i, e, n, s, o, a)
            : _e(i);
    }
    expandSegmentAgainstRouteUsingRedirect(r, e, n, i, s, o, u) {
      let {
        matched: a,
        parameters: c,
        consumedSegments: l,
        positionalParamSegments: h,
        remainingSegments: y,
      } = Ls(e, i, s);
      if (!a) return _e(e);
      typeof i.redirectTo == "string" &&
        i.redirectTo[0] === "/" &&
        (this.absoluteRedirectCount++,
        this.absoluteRedirectCount > Du && (this.allowRedirects = !1));
      let C = new Ne(
          s,
          c,
          Object.freeze(f({}, this.urlTree.queryParams)),
          this.urlTree.fragment,
          as(i),
          V(i),
          i.component ?? i._loadedComponent ?? null,
          i,
          us(i)
        ),
        E = en(C, u, this.paramsInheritanceStrategy);
      (C.params = Object.freeze(E.params)), (C.data = Object.freeze(E.data));
      let w = this.applyRedirects.applyRedirectCommands(
        l,
        i.redirectTo,
        h,
        C,
        r
      );
      return this.applyRedirects
        .lineralizeSegments(i, w)
        .pipe(N((v) => this.processSegment(r, n, e, v.concat(y), o, !1, u)));
    }
    matchSegmentAgainstRoute(r, e, n, i, s, o) {
      let u = cu(e, n, i, r, this.urlSerializer);
      return (
        n.path === "**" && (e.children = {}),
        u.pipe(
          k((a) =>
            a.matched
              ? ((r = n._injector ?? r),
                this.getChildConfig(r, n, i).pipe(
                  k(({ routes: c }) => {
                    let l = n._loadedInjector ?? r,
                      {
                        parameters: h,
                        consumedSegments: y,
                        remainingSegments: C,
                      } = a,
                      E = new Ne(
                        y,
                        h,
                        Object.freeze(f({}, this.urlTree.queryParams)),
                        this.urlTree.fragment,
                        as(n),
                        V(n),
                        n.component ?? n._loadedComponent ?? null,
                        n,
                        us(n)
                      ),
                      w = en(E, o, this.paramsInheritanceStrategy);
                    (E.params = Object.freeze(w.params)),
                      (E.data = Object.freeze(w.data));
                    let { segmentGroup: v, slicedSegments: M } = os(e, y, C, c);
                    if (M.length === 0 && v.hasChildren())
                      return this.processChildren(l, c, v, E).pipe(
                        S((R) => new x(E, R))
                      );
                    if (c.length === 0 && M.length === 0)
                      return p(new x(E, []));
                    let H = V(n) === s;
                    return this.processSegment(
                      l,
                      c,
                      v,
                      M,
                      H ? m : s,
                      !0,
                      E
                    ).pipe(S((R) => new x(E, R instanceof x ? [R] : [])));
                  })
                ))
              : _e(e)
          )
        )
      );
    }
    getChildConfig(r, e, n) {
      return e.children
        ? p({ routes: e.children, injector: r })
        : e.loadChildren
          ? e._loadedRoutes !== void 0
            ? p({ routes: e._loadedRoutes, injector: e._loadedInjector })
            : su(r, e, n, this.urlSerializer).pipe(
                N((i) =>
                  i
                    ? this.configLoader.loadChildren(r, e).pipe(
                        I((s) => {
                          (e._loadedRoutes = s.routes),
                            (e._loadedInjector = s.injector);
                        })
                      )
                    : uu(e)
                )
              )
          : p({ routes: [], injector: r });
    }
  };
function vu(t) {
  t.sort((r, e) =>
    r.value.outlet === m
      ? -1
      : e.value.outlet === m
        ? 1
        : r.value.outlet.localeCompare(e.value.outlet)
  );
}
function yu(t) {
  let r = t.value.routeConfig;
  return r && r.path === "";
}
function Ns(t) {
  let r = [],
    e = new Set();
  for (let n of t) {
    if (!yu(n)) {
      r.push(n);
      continue;
    }
    let i = r.find((s) => n.value.routeConfig === s.value.routeConfig);
    i !== void 0 ? (i.children.push(...n.children), e.add(i)) : r.push(n);
  }
  for (let n of e) {
    let i = Ns(n.children);
    r.push(new x(n.value, i));
  }
  return r.filter((n) => !e.has(n));
}
function as(t) {
  return t.data || {};
}
function us(t) {
  return t.resolve || {};
}
function wu(t, r, e, n, i, s) {
  return N((o) =>
    mu(t, r, e, n, o.extractedUrl, i, s).pipe(
      S(({ state: u, tree: a }) =>
        O(f({}, o), { targetSnapshot: u, urlAfterRedirects: a })
      )
    )
  );
}
function Cu(t, r) {
  return N((e) => {
    let {
      targetSnapshot: n,
      guards: { canActivateChecks: i },
    } = e;
    if (!i.length) return p(e);
    let s = new Set(i.map((a) => a.route)),
      o = new Set();
    for (let a of s) if (!o.has(a)) for (let c of ks(a)) o.add(c);
    let u = 0;
    return _(o).pipe(
      se((a) =>
        s.has(a)
          ? Eu(a, n, t, r)
          : ((a.data = en(a, a.parent, t).resolve), p(void 0))
      ),
      I(() => u++),
      fn(1),
      N((a) => (u === o.size ? p(e) : ie))
    );
  });
}
function ks(t) {
  let r = t.children.map((e) => ks(e)).flat();
  return [t, ...r];
}
function Eu(t, r, e, n) {
  let i = t.routeConfig,
    s = t._resolve;
  return (
    i?.title !== void 0 && !Is(i) && (s[Ct] = i.title),
    Su(s, t, r, n).pipe(
      S(
        (o) => (
          (t._resolvedData = o), (t.data = en(t, t.parent, e).resolve), null
        )
      )
    )
  );
}
function Su(t, r, e, n) {
  let i = tr(t);
  if (i.length === 0) return p({});
  let s = {};
  return _(i).pipe(
    N((o) =>
      bu(t[o], r, e, n).pipe(
        oe(),
        I((u) => {
          if (u instanceof Dt) throw nn(new Ue(), u);
          s[o] = u;
        })
      )
    ),
    fn(1),
    Br(s),
    Se((o) => (_s(o) ? ie : Ge(o)))
  );
}
function bu(t, r, e, n) {
  let i = St(r) ?? n,
    s = ze(t, i),
    o = s.resolve ? s.resolve(r, e) : j(i, () => s(r, e));
  return fe(o);
}
function Qn(t) {
  return k((r) => {
    let e = t(r);
    return e ? _(e).pipe(S(() => r)) : p(r);
  });
}
var xs = (() => {
    class t {
      buildTitle(e) {
        let n,
          i = e.root;
        for (; i !== void 0; )
          (n = this.getResolvedTitleForRoute(i) ?? n),
            (i = i.children.find((s) => s.outlet === m));
        return n;
      }
      getResolvedTitleForRoute(e) {
        return e.data[Ct];
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: () => d(Au), providedIn: "root" });
      }
    }
    return t;
  })(),
  Au = (() => {
    class t extends xs {
      constructor(e) {
        super(), (this.title = e);
      }
      updateTitle(e) {
        let n = this.buildTitle(e);
        n !== void 0 && this.title.setTitle(n);
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)(g(es));
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: t.ɵfac, providedIn: "root" });
      }
    }
    return t;
  })(),
  Rt = new b("", { providedIn: "root", factory: () => ({}) }),
  Ru = (() => {
    class t {
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵcmp = Wr({
          type: t,
          selectors: [["ng-component"]],
          standalone: !0,
          features: [ci],
          decls: 1,
          vars: 0,
          template: function (n, i) {
            n & 1 && ii(0, "router-outlet");
          },
          dependencies: [La],
          encapsulation: 2,
        });
      }
    }
    return t;
  })();
function Tr(t) {
  let r = t.children && t.children.map(Tr),
    e = r ? O(f({}, t), { children: r }) : f({}, t);
  return (
    !e.component &&
      !e.loadComponent &&
      (r || e.loadChildren) &&
      e.outlet &&
      e.outlet !== m &&
      (e.component = Ru),
    e
  );
}
var wt = new b(""),
  Ir = (() => {
    class t {
      constructor() {
        (this.componentLoaders = new WeakMap()),
          (this.childrenLoaders = new WeakMap()),
          (this.compiler = d(_t));
      }
      loadComponent(e) {
        if (this.componentLoaders.get(e)) return this.componentLoaders.get(e);
        if (e._loadedComponent) return p(e._loadedComponent);
        this.onLoadStartListener && this.onLoadStartListener(e);
        let n = fe(e.loadComponent()).pipe(
            S(Us),
            I((s) => {
              this.onLoadEndListener && this.onLoadEndListener(e),
                (e._loadedComponent = s);
            }),
            pe(() => {
              this.componentLoaders.delete(e);
            })
          ),
          i = new ln(n, () => new re()).pipe(cn());
        return this.componentLoaders.set(e, i), i;
      }
      loadChildren(e, n) {
        if (this.childrenLoaders.get(n)) return this.childrenLoaders.get(n);
        if (n._loadedRoutes)
          return p({ routes: n._loadedRoutes, injector: n._loadedInjector });
        this.onLoadStartListener && this.onLoadStartListener(n);
        let s = Tu(n, this.compiler, e, this.onLoadEndListener).pipe(
            pe(() => {
              this.childrenLoaders.delete(n);
            })
          ),
          o = new ln(s, () => new re()).pipe(cn());
        return this.childrenLoaders.set(n, o), o;
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: t.ɵfac, providedIn: "root" });
      }
    }
    return t;
  })();
function Tu(t, r, e, n) {
  return fe(t.loadChildren()).pipe(
    S(Us),
    N((i) =>
      i instanceof ti || Array.isArray(i) ? p(i) : _(r.compileModuleAsync(i))
    ),
    S((i) => {
      n && n(t);
      let s,
        o,
        u = !1;
      return (
        Array.isArray(i)
          ? ((o = i), (u = !0))
          : ((s = i.create(e).injector),
            (o = s.get(wt, [], { optional: !0, self: !0 }).flat())),
        { routes: o.map(Tr), injector: s }
      );
    })
  );
}
function Iu(t) {
  return t && typeof t == "object" && "default" in t;
}
function Us(t) {
  return Iu(t) ? t.default : t;
}
var Fr = (() => {
    class t {
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: () => d(Fu), providedIn: "root" });
      }
    }
    return t;
  })(),
  Fu = (() => {
    class t {
      shouldProcessUrl(e) {
        return !0;
      }
      extract(e) {
        return e;
      }
      merge(e, n) {
        return e;
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: t.ɵfac, providedIn: "root" });
      }
    }
    return t;
  })(),
  Bs = new b(""),
  js = new b("");
function Mu(t, r, e) {
  let n = t.get(js),
    i = t.get(P);
  return t.get(z).runOutsideAngular(() => {
    if (!i.startViewTransition || n.skipNextTransition)
      return (n.skipNextTransition = !1), new Promise((c) => setTimeout(c));
    let s,
      o = new Promise((c) => {
        s = c;
      }),
      u = i.startViewTransition(() => (s(), Ou(t))),
      { onViewTransitionCreated: a } = n;
    return a && j(t, () => a({ transition: u, from: r, to: e })), o;
  });
}
function Ou(t) {
  return new Promise((r) => {
    ni({ read: () => setTimeout(r) }, { injector: t });
  });
}
var _u = new b(""),
  Mr = (() => {
    class t {
      get hasRequestedNavigation() {
        return this.navigationId !== 0;
      }
      constructor() {
        (this.currentNavigation = null),
          (this.currentTransition = null),
          (this.lastSuccessfulNavigation = null),
          (this.events = new re()),
          (this.transitionAbortSubject = new re()),
          (this.configLoader = d(Ir)),
          (this.environmentInjector = d(ve)),
          (this.urlSerializer = d(Et)),
          (this.rootContexts = d(bt)),
          (this.location = d(Oe)),
          (this.inputBindingEnabled = d(on, { optional: !0 }) !== null),
          (this.titleStrategy = d(xs)),
          (this.options = d(Rt, { optional: !0 }) || {}),
          (this.paramsInheritanceStrategy =
            this.options.paramsInheritanceStrategy || "emptyOnly"),
          (this.urlHandlingStrategy = d(Fr)),
          (this.createViewTransition = d(Bs, { optional: !0 })),
          (this.navigationErrorHandler = d(_u, { optional: !0 })),
          (this.navigationId = 0),
          (this.afterPreactivation = () => p(void 0)),
          (this.rootComponentType = null);
        let e = (i) => this.events.next(new cr(i)),
          n = (i) => this.events.next(new lr(i));
        (this.configLoader.onLoadEndListener = n),
          (this.configLoader.onLoadStartListener = e);
      }
      complete() {
        this.transitions?.complete();
      }
      handleNavigationRequest(e) {
        let n = ++this.navigationId;
        this.transitions?.next(
          O(f(f({}, this.transitions.value), e), { id: n })
        );
      }
      setupNavigations(e, n, i) {
        return (
          (this.transitions = new B({
            id: 0,
            currentUrlTree: n,
            currentRawUrl: n,
            extractedUrl: this.urlHandlingStrategy.extract(n),
            urlAfterRedirects: this.urlHandlingStrategy.extract(n),
            rawUrl: n,
            extras: {},
            resolve: () => {},
            reject: () => {},
            promise: Promise.resolve(!0),
            source: dt,
            restoredState: null,
            currentSnapshot: i.snapshot,
            targetSnapshot: null,
            currentRouterState: i,
            targetRouterState: null,
            guards: { canActivateChecks: [], canDeactivateChecks: [] },
            guardsResult: null,
          })),
          this.transitions.pipe(
            J((s) => s.id !== 0),
            S((s) =>
              O(f({}, s), {
                extractedUrl: this.urlHandlingStrategy.extract(s.rawUrl),
              })
            ),
            k((s) => {
              let o = !1,
                u = !1;
              return p(s).pipe(
                k((a) => {
                  if (this.navigationId > s.id)
                    return (
                      this.cancelNavigationTransition(
                        s,
                        "",
                        U.SupersededByNewNavigation
                      ),
                      ie
                    );
                  (this.currentTransition = s),
                    (this.currentNavigation = {
                      id: a.id,
                      initialUrl: a.rawUrl,
                      extractedUrl: a.extractedUrl,
                      targetBrowserUrl:
                        typeof a.extras.browserUrl == "string"
                          ? this.urlSerializer.parse(a.extras.browserUrl)
                          : a.extras.browserUrl,
                      trigger: a.source,
                      extras: a.extras,
                      previousNavigation: this.lastSuccessfulNavigation
                        ? O(f({}, this.lastSuccessfulNavigation), {
                            previousNavigation: null,
                          })
                        : null,
                    });
                  let c =
                      !e.navigated ||
                      this.isUpdatingInternalState() ||
                      this.isUpdatedBrowserUrl(),
                    l = a.extras.onSameUrlNavigation ?? e.onSameUrlNavigation;
                  if (!c && l !== "reload") {
                    let h = "";
                    return (
                      this.events.next(
                        new de(
                          a.id,
                          this.urlSerializer.serialize(a.rawUrl),
                          h,
                          Zt.IgnoredSameUrlNavigation
                        )
                      ),
                      a.resolve(!1),
                      ie
                    );
                  }
                  if (this.urlHandlingStrategy.shouldProcessUrl(a.rawUrl))
                    return p(a).pipe(
                      k((h) => {
                        let y = this.transitions?.getValue();
                        return (
                          this.events.next(
                            new Be(
                              h.id,
                              this.urlSerializer.serialize(h.extractedUrl),
                              h.source,
                              h.restoredState
                            )
                          ),
                          y !== this.transitions?.getValue()
                            ? ie
                            : Promise.resolve(h)
                        );
                      }),
                      wu(
                        this.environmentInjector,
                        this.configLoader,
                        this.rootComponentType,
                        e.config,
                        this.urlSerializer,
                        this.paramsInheritanceStrategy
                      ),
                      I((h) => {
                        (s.targetSnapshot = h.targetSnapshot),
                          (s.urlAfterRedirects = h.urlAfterRedirects),
                          (this.currentNavigation = O(
                            f({}, this.currentNavigation),
                            { finalUrl: h.urlAfterRedirects }
                          ));
                        let y = new Kt(
                          h.id,
                          this.urlSerializer.serialize(h.extractedUrl),
                          this.urlSerializer.serialize(h.urlAfterRedirects),
                          h.targetSnapshot
                        );
                        this.events.next(y);
                      })
                    );
                  if (
                    c &&
                    this.urlHandlingStrategy.shouldProcessUrl(a.currentRawUrl)
                  ) {
                    let {
                        id: h,
                        extractedUrl: y,
                        source: C,
                        restoredState: E,
                        extras: w,
                      } = a,
                      v = new Be(h, this.urlSerializer.serialize(y), C, E);
                    this.events.next(v);
                    let M = Rs(this.rootComponentType).snapshot;
                    return (
                      (this.currentTransition = s =
                        O(f({}, a), {
                          targetSnapshot: M,
                          urlAfterRedirects: y,
                          extras: O(f({}, w), {
                            skipLocationChange: !1,
                            replaceUrl: !1,
                          }),
                        })),
                      (this.currentNavigation.finalUrl = y),
                      p(s)
                    );
                  } else {
                    let h = "";
                    return (
                      this.events.next(
                        new de(
                          a.id,
                          this.urlSerializer.serialize(a.extractedUrl),
                          h,
                          Zt.IgnoredByUrlHandlingStrategy
                        )
                      ),
                      a.resolve(!1),
                      ie
                    );
                  }
                }),
                I((a) => {
                  let c = new sr(
                    a.id,
                    this.urlSerializer.serialize(a.extractedUrl),
                    this.urlSerializer.serialize(a.urlAfterRedirects),
                    a.targetSnapshot
                  );
                  this.events.next(c);
                }),
                S(
                  (a) => (
                    (this.currentTransition = s =
                      O(f({}, a), {
                        guards: ja(
                          a.targetSnapshot,
                          a.currentSnapshot,
                          this.rootContexts
                        ),
                      })),
                    s
                  )
                ),
                Xa(this.environmentInjector, (a) => this.events.next(a)),
                I((a) => {
                  if (
                    ((s.guardsResult = a.guardsResult),
                    a.guardsResult && typeof a.guardsResult != "boolean")
                  )
                    throw nn(this.urlSerializer, a.guardsResult);
                  let c = new or(
                    a.id,
                    this.urlSerializer.serialize(a.extractedUrl),
                    this.urlSerializer.serialize(a.urlAfterRedirects),
                    a.targetSnapshot,
                    !!a.guardsResult
                  );
                  this.events.next(c);
                }),
                J((a) =>
                  a.guardsResult
                    ? !0
                    : (this.cancelNavigationTransition(a, "", U.GuardRejected),
                      !1)
                ),
                Qn((a) => {
                  if (a.guards.canActivateChecks.length)
                    return p(a).pipe(
                      I((c) => {
                        let l = new ar(
                          c.id,
                          this.urlSerializer.serialize(c.extractedUrl),
                          this.urlSerializer.serialize(c.urlAfterRedirects),
                          c.targetSnapshot
                        );
                        this.events.next(l);
                      }),
                      k((c) => {
                        let l = !1;
                        return p(c).pipe(
                          Cu(
                            this.paramsInheritanceStrategy,
                            this.environmentInjector
                          ),
                          I({
                            next: () => (l = !0),
                            complete: () => {
                              l ||
                                this.cancelNavigationTransition(
                                  c,
                                  "",
                                  U.NoDataFromResolver
                                );
                            },
                          })
                        );
                      }),
                      I((c) => {
                        let l = new ur(
                          c.id,
                          this.urlSerializer.serialize(c.extractedUrl),
                          this.urlSerializer.serialize(c.urlAfterRedirects),
                          c.targetSnapshot
                        );
                        this.events.next(l);
                      })
                    );
                }),
                Qn((a) => {
                  let c = (l) => {
                    let h = [];
                    l.routeConfig?.loadComponent &&
                      !l.routeConfig._loadedComponent &&
                      h.push(
                        this.configLoader.loadComponent(l.routeConfig).pipe(
                          I((y) => {
                            l.component = y;
                          }),
                          S(() => {})
                        )
                      );
                    for (let y of l.children) h.push(...c(y));
                    return h;
                  };
                  return Ft(c(a.targetSnapshot.root)).pipe(hn(null), be(1));
                }),
                Qn(() => this.afterPreactivation()),
                k(() => {
                  let { currentSnapshot: a, targetSnapshot: c } = s,
                    l = this.createViewTransition?.(
                      this.environmentInjector,
                      a.root,
                      c.root
                    );
                  return l ? _(l).pipe(S(() => s)) : p(s);
                }),
                S((a) => {
                  let c = Na(
                    e.routeReuseStrategy,
                    a.targetSnapshot,
                    a.currentRouterState
                  );
                  return (
                    (this.currentTransition = s =
                      O(f({}, a), { targetRouterState: c })),
                    (this.currentNavigation.targetRouterState = c),
                    s
                  );
                }),
                I(() => {
                  this.events.next(new gt());
                }),
                Ba(
                  this.rootContexts,
                  e.routeReuseStrategy,
                  (a) => this.events.next(a),
                  this.inputBindingEnabled
                ),
                be(1),
                I({
                  next: (a) => {
                    (o = !0),
                      (this.lastSuccessfulNavigation = this.currentNavigation),
                      this.events.next(
                        new G(
                          a.id,
                          this.urlSerializer.serialize(a.extractedUrl),
                          this.urlSerializer.serialize(a.urlAfterRedirects)
                        )
                      ),
                      this.titleStrategy?.updateTitle(
                        a.targetRouterState.snapshot
                      ),
                      a.resolve(!0);
                  },
                  complete: () => {
                    o = !0;
                  },
                }),
                Vr(
                  this.transitionAbortSubject.pipe(
                    I((a) => {
                      throw a;
                    })
                  )
                ),
                pe(() => {
                  !o &&
                    !u &&
                    this.cancelNavigationTransition(
                      s,
                      "",
                      U.SupersededByNewNavigation
                    ),
                    this.currentTransition?.id === s.id &&
                      ((this.currentNavigation = null),
                      (this.currentTransition = null));
                }),
                Se((a) => {
                  if (((u = !0), Os(a)))
                    this.events.next(
                      new te(
                        s.id,
                        this.urlSerializer.serialize(s.extractedUrl),
                        a.message,
                        a.cancellationCode
                      )
                    ),
                      Ua(a)
                        ? this.events.next(
                            new je(a.url, a.navigationBehaviorOptions)
                          )
                        : s.resolve(!1);
                  else {
                    let c = new pt(
                      s.id,
                      this.urlSerializer.serialize(s.extractedUrl),
                      a,
                      s.targetSnapshot ?? void 0
                    );
                    try {
                      let l = j(this.environmentInjector, () =>
                        this.navigationErrorHandler?.(c)
                      );
                      if (l instanceof Dt) {
                        let { message: h, cancellationCode: y } = nn(
                          this.urlSerializer,
                          l
                        );
                        this.events.next(
                          new te(
                            s.id,
                            this.urlSerializer.serialize(s.extractedUrl),
                            h,
                            y
                          )
                        ),
                          this.events.next(
                            new je(l.redirectTo, l.navigationBehaviorOptions)
                          );
                      } else {
                        this.events.next(c);
                        let h = e.errorHandler(a);
                        s.resolve(!!h);
                      }
                    } catch (l) {
                      this.options.resolveNavigationPromiseOnError
                        ? s.resolve(!1)
                        : s.reject(l);
                    }
                  }
                  return ie;
                })
              );
            })
          )
        );
      }
      cancelNavigationTransition(e, n, i) {
        let s = new te(
          e.id,
          this.urlSerializer.serialize(e.extractedUrl),
          n,
          i
        );
        this.events.next(s), e.resolve(!1);
      }
      isUpdatingInternalState() {
        return (
          this.currentTransition?.extractedUrl.toString() !==
          this.currentTransition?.currentUrlTree.toString()
        );
      }
      isUpdatedBrowserUrl() {
        let e = this.urlHandlingStrategy.extract(
            this.urlSerializer.parse(this.location.path(!0))
          ),
          n =
            this.currentNavigation?.targetBrowserUrl ??
            this.currentNavigation?.extractedUrl;
        return (
          e.toString() !== n?.toString() &&
          !this.currentNavigation?.extras.skipLocationChange
        );
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: t.ɵfac, providedIn: "root" });
      }
    }
    return t;
  })();
function Pu(t) {
  return t !== dt;
}
var Lu = (() => {
    class t {
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: () => d(Nu), providedIn: "root" });
      }
    }
    return t;
  })(),
  Ar = class {
    shouldDetach(r) {
      return !1;
    }
    store(r, e) {}
    shouldAttach(r) {
      return !1;
    }
    retrieve(r) {
      return null;
    }
    shouldReuseRoute(r, e) {
      return r.routeConfig === e.routeConfig;
    }
  },
  Nu = (() => {
    class t extends Ar {
      static {
        this.ɵfac = (() => {
          let e;
          return function (i) {
            return (e || (e = mn(t)))(i || t);
          };
        })();
      }
      static {
        this.ɵprov = D({ token: t, factory: t.ɵfac, providedIn: "root" });
      }
    }
    return t;
  })(),
  $s = (() => {
    class t {
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: () => d(ku), providedIn: "root" });
      }
    }
    return t;
  })(),
  ku = (() => {
    class t extends $s {
      constructor() {
        super(...arguments),
          (this.location = d(Oe)),
          (this.urlSerializer = d(Et)),
          (this.options = d(Rt, { optional: !0 }) || {}),
          (this.canceledNavigationResolution =
            this.options.canceledNavigationResolution || "replace"),
          (this.urlHandlingStrategy = d(Fr)),
          (this.urlUpdateStrategy =
            this.options.urlUpdateStrategy || "deferred"),
          (this.currentUrlTree = new ne()),
          (this.rawUrlTree = this.currentUrlTree),
          (this.currentPageId = 0),
          (this.lastSuccessfulId = -1),
          (this.routerState = Rs(null)),
          (this.stateMemento = this.createStateMemento());
      }
      getCurrentUrlTree() {
        return this.currentUrlTree;
      }
      getRawUrlTree() {
        return this.rawUrlTree;
      }
      restoredState() {
        return this.location.getState();
      }
      get browserPageId() {
        return this.canceledNavigationResolution !== "computed"
          ? this.currentPageId
          : (this.restoredState()?.ɵrouterPageId ?? this.currentPageId);
      }
      getRouterState() {
        return this.routerState;
      }
      createStateMemento() {
        return {
          rawUrlTree: this.rawUrlTree,
          currentUrlTree: this.currentUrlTree,
          routerState: this.routerState,
        };
      }
      registerNonRouterCurrentEntryChangeListener(e) {
        return this.location.subscribe((n) => {
          n.type === "popstate" && e(n.url, n.state);
        });
      }
      handleRouterEvent(e, n) {
        if (e instanceof Be) this.stateMemento = this.createStateMemento();
        else if (e instanceof de) this.rawUrlTree = n.initialUrl;
        else if (e instanceof Kt) {
          if (
            this.urlUpdateStrategy === "eager" &&
            !n.extras.skipLocationChange
          ) {
            let i = this.urlHandlingStrategy.merge(n.finalUrl, n.initialUrl);
            this.setBrowserUrl(n.targetBrowserUrl ?? i, n);
          }
        } else
          e instanceof gt
            ? ((this.currentUrlTree = n.finalUrl),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                n.finalUrl,
                n.initialUrl
              )),
              (this.routerState = n.targetRouterState),
              this.urlUpdateStrategy === "deferred" &&
                !n.extras.skipLocationChange &&
                this.setBrowserUrl(n.targetBrowserUrl ?? this.rawUrlTree, n))
            : e instanceof te &&
                (e.code === U.GuardRejected || e.code === U.NoDataFromResolver)
              ? this.restoreHistory(n)
              : e instanceof pt
                ? this.restoreHistory(n, !0)
                : e instanceof G &&
                  ((this.lastSuccessfulId = e.id),
                  (this.currentPageId = this.browserPageId));
      }
      setBrowserUrl(e, n) {
        let i = e instanceof ne ? this.urlSerializer.serialize(e) : e;
        if (this.location.isCurrentPathEqualTo(i) || n.extras.replaceUrl) {
          let s = this.browserPageId,
            o = f(f({}, n.extras.state), this.generateNgRouterState(n.id, s));
          this.location.replaceState(i, "", o);
        } else {
          let s = f(
            f({}, n.extras.state),
            this.generateNgRouterState(n.id, this.browserPageId + 1)
          );
          this.location.go(i, "", s);
        }
      }
      restoreHistory(e, n = !1) {
        if (this.canceledNavigationResolution === "computed") {
          let i = this.browserPageId,
            s = this.currentPageId - i;
          s !== 0
            ? this.location.historyGo(s)
            : this.currentUrlTree === e.finalUrl &&
              s === 0 &&
              (this.resetState(e), this.resetUrlToCurrentUrlTree());
        } else
          this.canceledNavigationResolution === "replace" &&
            (n && this.resetState(e), this.resetUrlToCurrentUrlTree());
      }
      resetState(e) {
        (this.routerState = this.stateMemento.routerState),
          (this.currentUrlTree = this.stateMemento.currentUrlTree),
          (this.rawUrlTree = this.urlHandlingStrategy.merge(
            this.currentUrlTree,
            e.finalUrl ?? this.rawUrlTree
          ));
      }
      resetUrlToCurrentUrlTree() {
        this.location.replaceState(
          this.urlSerializer.serialize(this.rawUrlTree),
          "",
          this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId)
        );
      }
      generateNgRouterState(e, n) {
        return this.canceledNavigationResolution === "computed"
          ? { navigationId: e, ɵrouterPageId: n }
          : { navigationId: e };
      }
      static {
        this.ɵfac = (() => {
          let e;
          return function (i) {
            return (e || (e = mn(t)))(i || t);
          };
        })();
      }
      static {
        this.ɵprov = D({ token: t, factory: t.ɵfac, providedIn: "root" });
      }
    }
    return t;
  })(),
  ct = (function (t) {
    return (
      (t[(t.COMPLETE = 0)] = "COMPLETE"),
      (t[(t.FAILED = 1)] = "FAILED"),
      (t[(t.REDIRECTING = 2)] = "REDIRECTING"),
      t
    );
  })(ct || {});
function zs(t, r) {
  t.events
    .pipe(
      J(
        (e) =>
          e instanceof G ||
          e instanceof te ||
          e instanceof pt ||
          e instanceof de
      ),
      S((e) =>
        e instanceof G || e instanceof de
          ? ct.COMPLETE
          : (
                e instanceof te
                  ? e.code === U.Redirect ||
                    e.code === U.SupersededByNewNavigation
                  : !1
              )
            ? ct.REDIRECTING
            : ct.FAILED
      ),
      J((e) => e !== ct.REDIRECTING),
      be(1)
    )
    .subscribe(() => {
      r();
    });
}
function xu(t) {
  throw t;
}
var Uu = {
    paths: "exact",
    fragment: "ignored",
    matrixParams: "ignored",
    queryParams: "exact",
  },
  Bu = {
    paths: "subset",
    fragment: "ignored",
    matrixParams: "ignored",
    queryParams: "subset",
  },
  Z = (() => {
    class t {
      get currentUrlTree() {
        return this.stateManager.getCurrentUrlTree();
      }
      get rawUrlTree() {
        return this.stateManager.getRawUrlTree();
      }
      get events() {
        return this._events;
      }
      get routerState() {
        return this.stateManager.getRouterState();
      }
      constructor() {
        (this.disposed = !1),
          (this.console = d(Ot)),
          (this.stateManager = d($s)),
          (this.options = d(Rt, { optional: !0 }) || {}),
          (this.pendingTasks = d(We)),
          (this.urlUpdateStrategy =
            this.options.urlUpdateStrategy || "deferred"),
          (this.navigationTransitions = d(Mr)),
          (this.urlSerializer = d(Et)),
          (this.location = d(Oe)),
          (this.urlHandlingStrategy = d(Fr)),
          (this._events = new re()),
          (this.errorHandler = this.options.errorHandler || xu),
          (this.navigated = !1),
          (this.routeReuseStrategy = d(Lu)),
          (this.onSameUrlNavigation =
            this.options.onSameUrlNavigation || "ignore"),
          (this.config = d(wt, { optional: !0 })?.flat() ?? []),
          (this.componentInputBindingEnabled = !!d(on, { optional: !0 })),
          (this.eventsSubscription = new Lr()),
          this.resetConfig(this.config),
          this.navigationTransitions
            .setupNavigations(this, this.currentUrlTree, this.routerState)
            .subscribe({
              error: (e) => {
                this.console.warn(e);
              },
            }),
          this.subscribeToNavigationEvents();
      }
      subscribeToNavigationEvents() {
        let e = this.navigationTransitions.events.subscribe((n) => {
          try {
            let i = this.navigationTransitions.currentTransition,
              s = this.navigationTransitions.currentNavigation;
            if (i !== null && s !== null) {
              if (
                (this.stateManager.handleRouterEvent(n, s),
                n instanceof te &&
                  n.code !== U.Redirect &&
                  n.code !== U.SupersededByNewNavigation)
              )
                this.navigated = !0;
              else if (n instanceof G) this.navigated = !0;
              else if (n instanceof je) {
                let o = n.navigationBehaviorOptions,
                  u = this.urlHandlingStrategy.merge(n.url, i.currentRawUrl),
                  a = f(
                    {
                      browserUrl: i.extras.browserUrl,
                      info: i.extras.info,
                      skipLocationChange: i.extras.skipLocationChange,
                      replaceUrl:
                        i.extras.replaceUrl ||
                        this.urlUpdateStrategy === "eager" ||
                        Pu(i.source),
                    },
                    o
                  );
                this.scheduleNavigation(u, dt, null, a, {
                  resolve: i.resolve,
                  reject: i.reject,
                  promise: i.promise,
                });
              }
            }
            $u(n) && this._events.next(n);
          } catch (i) {
            this.navigationTransitions.transitionAbortSubject.next(i);
          }
        });
        this.eventsSubscription.add(e);
      }
      resetRootComponentType(e) {
        (this.routerState.root.component = e),
          (this.navigationTransitions.rootComponentType = e);
      }
      initialNavigation() {
        this.setUpLocationChangeListener(),
          this.navigationTransitions.hasRequestedNavigation ||
            this.navigateToSyncWithBrowser(
              this.location.path(!0),
              dt,
              this.stateManager.restoredState()
            );
      }
      setUpLocationChangeListener() {
        this.nonRouterCurrentEntryChangeSubscription ??=
          this.stateManager.registerNonRouterCurrentEntryChangeListener(
            (e, n) => {
              setTimeout(() => {
                this.navigateToSyncWithBrowser(e, "popstate", n);
              }, 0);
            }
          );
      }
      navigateToSyncWithBrowser(e, n, i) {
        let s = { replaceUrl: !0 },
          o = i?.navigationId ? i : null;
        if (i) {
          let a = f({}, i);
          delete a.navigationId,
            delete a.ɵrouterPageId,
            Object.keys(a).length !== 0 && (s.state = a);
        }
        let u = this.parseUrl(e);
        this.scheduleNavigation(u, n, o, s);
      }
      get url() {
        return this.serializeUrl(this.currentUrlTree);
      }
      getCurrentNavigation() {
        return this.navigationTransitions.currentNavigation;
      }
      get lastSuccessfulNavigation() {
        return this.navigationTransitions.lastSuccessfulNavigation;
      }
      resetConfig(e) {
        (this.config = e.map(Tr)), (this.navigated = !1);
      }
      ngOnDestroy() {
        this.dispose();
      }
      dispose() {
        this.navigationTransitions.complete(),
          this.nonRouterCurrentEntryChangeSubscription &&
            (this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),
            (this.nonRouterCurrentEntryChangeSubscription = void 0)),
          (this.disposed = !0),
          this.eventsSubscription.unsubscribe();
      }
      createUrlTree(e, n = {}) {
        let {
            relativeTo: i,
            queryParams: s,
            fragment: o,
            queryParamsHandling: u,
            preserveFragment: a,
          } = n,
          c = a ? this.currentUrlTree.fragment : o,
          l = null;
        switch (u ?? this.options.defaultQueryParamsHandling) {
          case "merge":
            l = f(f({}, this.currentUrlTree.queryParams), s);
            break;
          case "preserve":
            l = this.currentUrlTree.queryParams;
            break;
          default:
            l = s || null;
        }
        l !== null && (l = this.removeEmptyProps(l));
        let h;
        try {
          let y = i ? i.snapshot : this.routerState.snapshot.root;
          h = Es(y);
        } catch {
          (typeof e[0] != "string" || e[0][0] !== "/") && (e = []),
            (h = this.currentUrlTree.root);
        }
        return Ss(h, e, l, c ?? null);
      }
      navigateByUrl(e, n = { skipLocationChange: !1 }) {
        let i = Ee(e) ? e : this.parseUrl(e),
          s = this.urlHandlingStrategy.merge(i, this.rawUrlTree);
        return this.scheduleNavigation(s, dt, null, n);
      }
      navigate(e, n = { skipLocationChange: !1 }) {
        return ju(e), this.navigateByUrl(this.createUrlTree(e, n), n);
      }
      serializeUrl(e) {
        return this.urlSerializer.serialize(e);
      }
      parseUrl(e) {
        try {
          return this.urlSerializer.parse(e);
        } catch {
          return this.urlSerializer.parse("/");
        }
      }
      isActive(e, n) {
        let i;
        if (
          (n === !0 ? (i = f({}, Uu)) : n === !1 ? (i = f({}, Bu)) : (i = n),
          Ee(e))
        )
          return ts(this.currentUrlTree, e, i);
        let s = this.parseUrl(e);
        return ts(this.currentUrlTree, s, i);
      }
      removeEmptyProps(e) {
        return Object.entries(e).reduce(
          (n, [i, s]) => (s != null && (n[i] = s), n),
          {}
        );
      }
      scheduleNavigation(e, n, i, s, o) {
        if (this.disposed) return Promise.resolve(!1);
        let u, a, c;
        o
          ? ((u = o.resolve), (a = o.reject), (c = o.promise))
          : (c = new Promise((h, y) => {
              (u = h), (a = y);
            }));
        let l = this.pendingTasks.add();
        return (
          zs(this, () => {
            queueMicrotask(() => this.pendingTasks.remove(l));
          }),
          this.navigationTransitions.handleNavigationRequest({
            source: n,
            restoredState: i,
            currentUrlTree: this.currentUrlTree,
            currentRawUrl: this.currentUrlTree,
            rawUrl: e,
            extras: s,
            resolve: u,
            reject: a,
            promise: c,
            currentSnapshot: this.routerState.snapshot,
            currentRouterState: this.routerState,
          }),
          c.catch((h) => Promise.reject(h))
        );
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: t.ɵfac, providedIn: "root" });
      }
    }
    return t;
  })();
function ju(t) {
  for (let r = 0; r < t.length; r++) if (t[r] == null) throw new T(4008, !1);
}
function $u(t) {
  return !(t instanceof gt) && !(t instanceof je);
}
var cs = (() => {
    class t {
      constructor(e, n, i, s, o, u) {
        (this.router = e),
          (this.route = n),
          (this.tabIndexAttribute = i),
          (this.renderer = s),
          (this.el = o),
          (this.locationStrategy = u),
          (this.href = null),
          (this.onChanges = new re()),
          (this.preserveFragment = !1),
          (this.skipLocationChange = !1),
          (this.replaceUrl = !1),
          (this.routerLinkInput = null);
        let a = o.nativeElement.tagName?.toLowerCase();
        (this.isAnchorElement = a === "a" || a === "area"),
          this.isAnchorElement
            ? (this.subscription = e.events.subscribe((c) => {
                c instanceof G && this.updateHref();
              }))
            : this.setTabIndexIfNotOnNativeEl("0");
      }
      setTabIndexIfNotOnNativeEl(e) {
        this.tabIndexAttribute != null ||
          this.isAnchorElement ||
          this.applyAttributeValue("tabindex", e);
      }
      ngOnChanges(e) {
        this.isAnchorElement && this.updateHref(), this.onChanges.next(this);
      }
      set routerLink(e) {
        e == null
          ? ((this.routerLinkInput = null),
            this.setTabIndexIfNotOnNativeEl(null))
          : (Ee(e)
              ? (this.routerLinkInput = e)
              : (this.routerLinkInput = Array.isArray(e) ? e : [e]),
            this.setTabIndexIfNotOnNativeEl("0"));
      }
      onClick(e, n, i, s, o) {
        let u = this.urlTree;
        if (
          u === null ||
          (this.isAnchorElement &&
            (e !== 0 ||
              n ||
              i ||
              s ||
              o ||
              (typeof this.target == "string" && this.target != "_self")))
        )
          return !0;
        let a = {
          skipLocationChange: this.skipLocationChange,
          replaceUrl: this.replaceUrl,
          state: this.state,
          info: this.info,
        };
        return this.router.navigateByUrl(u, a), !this.isAnchorElement;
      }
      ngOnDestroy() {
        this.subscription?.unsubscribe();
      }
      updateHref() {
        let e = this.urlTree;
        this.href =
          e !== null && this.locationStrategy
            ? this.locationStrategy?.prepareExternalUrl(
                this.router.serializeUrl(e)
              )
            : null;
        let n =
          this.href === null
            ? null
            : Xr(
                this.href,
                this.el.nativeElement.tagName.toLowerCase(),
                "href"
              );
        this.applyAttributeValue("href", n);
      }
      applyAttributeValue(e, n) {
        let i = this.renderer,
          s = this.el.nativeElement;
        n !== null ? i.setAttribute(s, e, n) : i.removeAttribute(s, e);
      }
      get urlTree() {
        return this.routerLinkInput === null
          ? null
          : Ee(this.routerLinkInput)
            ? this.routerLinkInput
            : this.router.createUrlTree(this.routerLinkInput, {
                relativeTo:
                  this.relativeTo !== void 0 ? this.relativeTo : this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                queryParamsHandling: this.queryParamsHandling,
                preserveFragment: this.preserveFragment,
              });
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)(L(Z), L(he), Dn("tabindex"), L(Ze), L(Ye), L(ee));
        };
      }
      static {
        this.ɵdir = De({
          type: t,
          selectors: [["", "routerLink", ""]],
          hostVars: 1,
          hostBindings: function (n, i) {
            n & 1 &&
              si("click", function (o) {
                return i.onClick(
                  o.button,
                  o.ctrlKey,
                  o.shiftKey,
                  o.altKey,
                  o.metaKey
                );
              }),
              n & 2 && ri("target", i.target);
          },
          inputs: {
            target: "target",
            queryParams: "queryParams",
            fragment: "fragment",
            queryParamsHandling: "queryParamsHandling",
            state: "state",
            info: "info",
            relativeTo: "relativeTo",
            preserveFragment: [2, "preserveFragment", "preserveFragment", Qe],
            skipLocationChange: [
              2,
              "skipLocationChange",
              "skipLocationChange",
              Qe,
            ],
            replaceUrl: [2, "replaceUrl", "replaceUrl", Qe],
            routerLink: "routerLink",
          },
          standalone: !0,
          features: [Sn, Re],
        });
      }
    }
    return t;
  })(),
  Vl = (() => {
    class t {
      get isActive() {
        return this._isActive;
      }
      constructor(e, n, i, s, o) {
        (this.router = e),
          (this.element = n),
          (this.renderer = i),
          (this.cdr = s),
          (this.link = o),
          (this.classes = []),
          (this._isActive = !1),
          (this.routerLinkActiveOptions = { exact: !1 }),
          (this.isActiveChange = new ae()),
          (this.routerEventsSubscription = e.events.subscribe((u) => {
            u instanceof G && this.update();
          }));
      }
      ngAfterContentInit() {
        p(this.links.changes, p(null))
          .pipe(He())
          .subscribe((e) => {
            this.update(), this.subscribeToEachLinkOnChanges();
          });
      }
      subscribeToEachLinkOnChanges() {
        this.linkInputChangesSubscription?.unsubscribe();
        let e = [...this.links.toArray(), this.link]
          .filter((n) => !!n)
          .map((n) => n.onChanges);
        this.linkInputChangesSubscription = _(e)
          .pipe(He())
          .subscribe((n) => {
            this._isActive !== this.isLinkActive(this.router)(n) &&
              this.update();
          });
      }
      set routerLinkActive(e) {
        let n = Array.isArray(e) ? e : e.split(" ");
        this.classes = n.filter((i) => !!i);
      }
      ngOnChanges(e) {
        this.update();
      }
      ngOnDestroy() {
        this.routerEventsSubscription.unsubscribe(),
          this.linkInputChangesSubscription?.unsubscribe();
      }
      update() {
        !this.links ||
          !this.router.navigated ||
          queueMicrotask(() => {
            let e = this.hasActiveLinks();
            this.classes.forEach((n) => {
              e
                ? this.renderer.addClass(this.element.nativeElement, n)
                : this.renderer.removeClass(this.element.nativeElement, n);
            }),
              e && this.ariaCurrentWhenActive !== void 0
                ? this.renderer.setAttribute(
                    this.element.nativeElement,
                    "aria-current",
                    this.ariaCurrentWhenActive.toString()
                  )
                : this.renderer.removeAttribute(
                    this.element.nativeElement,
                    "aria-current"
                  ),
              this._isActive !== e &&
                ((this._isActive = e),
                this.cdr.markForCheck(),
                this.isActiveChange.emit(e));
          });
      }
      isLinkActive(e) {
        let n = zu(this.routerLinkActiveOptions)
          ? this.routerLinkActiveOptions
          : this.routerLinkActiveOptions.exact || !1;
        return (i) => {
          let s = i.urlTree;
          return s ? e.isActive(s, n) : !1;
        };
      }
      hasActiveLinks() {
        let e = this.isLinkActive(this.router);
        return (this.link && e(this.link)) || this.links.some(e);
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)(L(Z), L(Ye), L(Ze), L(Ie), L(cs, 8));
        };
      }
      static {
        this.ɵdir = De({
          type: t,
          selectors: [["", "routerLinkActive", ""]],
          contentQueries: function (n, i, s) {
            if ((n & 1 && oi(s, cs, 5), n & 2)) {
              let o;
              ai((o = ui())) && (i.links = o);
            }
          },
          inputs: {
            routerLinkActiveOptions: "routerLinkActiveOptions",
            ariaCurrentWhenActive: "ariaCurrentWhenActive",
            routerLinkActive: "routerLinkActive",
          },
          outputs: { isActiveChange: "isActiveChange" },
          exportAs: ["routerLinkActive"],
          standalone: !0,
          features: [Re],
        });
      }
    }
    return t;
  })();
function zu(t) {
  return !!t.paths;
}
var sn = class {};
var Vu = (() => {
    class t {
      constructor(e, n, i, s, o) {
        (this.router = e),
          (this.injector = i),
          (this.preloadingStrategy = s),
          (this.loader = o);
      }
      setUpPreloading() {
        this.subscription = this.router.events
          .pipe(
            J((e) => e instanceof G),
            se(() => this.preload())
          )
          .subscribe(() => {});
      }
      preload() {
        return this.processRoutes(this.injector, this.router.config);
      }
      ngOnDestroy() {
        this.subscription && this.subscription.unsubscribe();
      }
      processRoutes(e, n) {
        let i = [];
        for (let s of n) {
          s.providers &&
            !s._injector &&
            (s._injector = bn(s.providers, e, `Route: ${s.path}`));
          let o = s._injector ?? e,
            u = s._loadedInjector ?? o;
          ((s.loadChildren && !s._loadedRoutes && s.canLoad === void 0) ||
            (s.loadComponent && !s._loadedComponent)) &&
            i.push(this.preloadConfig(o, s)),
            (s.children || s._loadedRoutes) &&
              i.push(this.processRoutes(u, s.children ?? s._loadedRoutes));
        }
        return _(i).pipe(He());
      }
      preloadConfig(e, n) {
        return this.preloadingStrategy.preload(n, () => {
          let i;
          n.loadChildren && n.canLoad === void 0
            ? (i = this.loader.loadChildren(e, n))
            : (i = p(null));
          let s = i.pipe(
            N((o) =>
              o === null
                ? p(void 0)
                : ((n._loadedRoutes = o.routes),
                  (n._loadedInjector = o.injector),
                  this.processRoutes(o.injector ?? e, o.routes))
            )
          );
          if (n.loadComponent && !n._loadedComponent) {
            let o = this.loader.loadComponent(n);
            return _([s, o]).pipe(He());
          } else return s;
        });
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)(g(Z), g(_t), g(ve), g(sn), g(Ir));
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: t.ɵfac, providedIn: "root" });
      }
    }
    return t;
  })(),
  Vs = new b(""),
  Gu = (() => {
    class t {
      constructor(e, n, i, s, o = {}) {
        (this.urlSerializer = e),
          (this.transitions = n),
          (this.viewportScroller = i),
          (this.zone = s),
          (this.options = o),
          (this.lastId = 0),
          (this.lastSource = "imperative"),
          (this.restoredId = 0),
          (this.store = {}),
          (o.scrollPositionRestoration ||= "disabled"),
          (o.anchorScrolling ||= "disabled");
      }
      init() {
        this.options.scrollPositionRestoration !== "disabled" &&
          this.viewportScroller.setHistoryScrollRestoration("manual"),
          (this.routerEventsSubscription = this.createScrollEvents()),
          (this.scrollEventsSubscription = this.consumeScrollEvents());
      }
      createScrollEvents() {
        return this.transitions.events.subscribe((e) => {
          e instanceof Be
            ? ((this.store[this.lastId] =
                this.viewportScroller.getScrollPosition()),
              (this.lastSource = e.navigationTrigger),
              (this.restoredId = e.restoredState
                ? e.restoredState.navigationId
                : 0))
            : e instanceof G
              ? ((this.lastId = e.id),
                this.scheduleScrollEvent(
                  e,
                  this.urlSerializer.parse(e.urlAfterRedirects).fragment
                ))
              : e instanceof de &&
                e.code === Zt.IgnoredSameUrlNavigation &&
                ((this.lastSource = void 0),
                (this.restoredId = 0),
                this.scheduleScrollEvent(
                  e,
                  this.urlSerializer.parse(e.url).fragment
                ));
        });
      }
      consumeScrollEvents() {
        return this.transitions.events.subscribe((e) => {
          e instanceof Xt &&
            (e.position
              ? this.options.scrollPositionRestoration === "top"
                ? this.viewportScroller.scrollToPosition([0, 0])
                : this.options.scrollPositionRestoration === "enabled" &&
                  this.viewportScroller.scrollToPosition(e.position)
              : e.anchor && this.options.anchorScrolling === "enabled"
                ? this.viewportScroller.scrollToAnchor(e.anchor)
                : this.options.scrollPositionRestoration !== "disabled" &&
                  this.viewportScroller.scrollToPosition([0, 0]));
        });
      }
      scheduleScrollEvent(e, n) {
        this.zone.runOutsideAngular(() => {
          setTimeout(() => {
            this.zone.run(() => {
              this.transitions.events.next(
                new Xt(
                  e,
                  this.lastSource === "popstate"
                    ? this.store[this.restoredId]
                    : null,
                  n
                )
              );
            });
          }, 0);
        });
      }
      ngOnDestroy() {
        this.routerEventsSubscription?.unsubscribe(),
          this.scrollEventsSubscription?.unsubscribe();
      }
      static {
        this.ɵfac = function (n) {
          Jr();
        };
      }
      static {
        this.ɵprov = D({ token: t, factory: t.ɵfac });
      }
    }
    return t;
  })();
function Gl(t, ...r) {
  return Ae([
    { provide: wt, multi: !0, useValue: t },
    [],
    { provide: he, useFactory: Gs, deps: [Z] },
    { provide: Xe, multi: !0, useFactory: Hs },
    r.map((e) => e.ɵproviders),
  ]);
}
function Gs(t) {
  return t.routerState.root;
}
function Tt(t, r) {
  return { ɵkind: t, ɵproviders: r };
}
function Hs() {
  let t = d(Mt);
  return (r) => {
    let e = t.get(Je);
    if (r !== e.components[0]) return;
    let n = t.get(Z),
      i = t.get(qs);
    t.get(Or) === 1 && n.initialNavigation(),
      t.get(Ws, null, pn.Optional)?.setUpPreloading(),
      t.get(Vs, null, pn.Optional)?.init(),
      n.resetRootComponentType(e.componentTypes[0]),
      i.closed || (i.next(), i.complete(), i.unsubscribe());
  };
}
var qs = new b("", { factory: () => new re() }),
  Or = new b("", { providedIn: "root", factory: () => 1 });
function Hu() {
  return Tt(2, [
    { provide: Or, useValue: 0 },
    {
      provide: Rn,
      multi: !0,
      deps: [Mt],
      useFactory: (r) => {
        let e = r.get(wi, Promise.resolve());
        return () =>
          e.then(
            () =>
              new Promise((n) => {
                let i = r.get(Z),
                  s = r.get(qs);
                zs(i, () => {
                  n(!0);
                }),
                  (r.get(Mr).afterPreactivation = () => (
                    n(!0), s.closed ? p(void 0) : s
                  )),
                  i.initialNavigation();
              })
          );
      },
    },
  ]);
}
function qu() {
  return Tt(3, [
    {
      provide: Rn,
      multi: !0,
      useFactory: () => {
        let r = d(Z);
        return () => {
          r.setUpLocationChangeListener();
        };
      },
    },
    { provide: Or, useValue: 2 },
  ]);
}
var Ws = new b("");
function Wu(t) {
  return Tt(0, [
    { provide: Ws, useExisting: Vu },
    { provide: sn, useExisting: t },
  ]);
}
function Yu() {
  return Tt(8, [ss, { provide: on, useExisting: ss }]);
}
function Zu(t) {
  let r = [
    { provide: Bs, useValue: Mu },
    {
      provide: js,
      useValue: f({ skipNextTransition: !!t?.skipInitialTransition }, t),
    },
  ];
  return Tt(9, r);
}
var ls = new b("ROUTER_FORROOT_GUARD"),
  Ku = [
    Oe,
    { provide: Et, useClass: Ue },
    Z,
    bt,
    { provide: he, useFactory: Gs, deps: [Z] },
    Ir,
    [],
  ],
  Hl = (() => {
    class t {
      constructor(e) {}
      static forRoot(e, n) {
        return {
          ngModule: t,
          providers: [
            Ku,
            [],
            { provide: wt, multi: !0, useValue: e },
            { provide: ls, useFactory: ec, deps: [[Z, new gn(), new qr()]] },
            { provide: Rt, useValue: n || {} },
            n?.useHash ? Ju() : Qu(),
            Xu(),
            n?.preloadingStrategy ? Wu(n.preloadingStrategy).ɵproviders : [],
            n?.initialNavigation ? tc(n) : [],
            n?.bindToComponentInputs ? Yu().ɵproviders : [],
            n?.enableViewTransitions ? Zu().ɵproviders : [],
            nc(),
          ],
        };
      }
      static forChild(e) {
        return {
          ngModule: t,
          providers: [{ provide: wt, multi: !0, useValue: e }],
        };
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)(g(ls, 8));
        };
      }
      static {
        this.ɵmod = me({ type: t });
      }
      static {
        this.ɵinj = ge({});
      }
    }
    return t;
  })();
function Xu() {
  return {
    provide: Vs,
    useFactory: () => {
      let t = d(Si),
        r = d(z),
        e = d(Rt),
        n = d(Mr),
        i = d(Et);
      return (
        e.scrollOffset && t.setOffset(e.scrollOffset), new Gu(i, n, t, r, e)
      );
    },
  };
}
function Ju() {
  return { provide: ee, useClass: Ei };
}
function Qu() {
  return { provide: ee, useClass: Ln };
}
function ec(t) {
  return "guarded";
}
function tc(t) {
  return [
    t.initialNavigation === "disabled" ? qu().ɵproviders : [],
    t.initialNavigation === "enabledBlocking" ? Hu().ɵproviders : [],
  ];
}
var ds = new b("");
function nc() {
  return [
    { provide: ds, useFactory: Hs },
    { provide: Xe, multi: !0, useExisting: ds },
  ];
}
export {
  Fe as a,
  _c as b,
  Pc as c,
  Qs as d,
  co as e,
  Hc as f,
  Sl as g,
  bl as h,
  he as i,
  La as j,
  cs as k,
  Vl as l,
  Gl as m,
  Hl as n,
};
