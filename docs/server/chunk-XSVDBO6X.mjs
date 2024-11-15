import "./polyfills.server.mjs";
import {
  a as Wr,
  b as Ai,
  c as Ze,
  d as Fn,
  i as Di,
  j as ki,
  k as Ci,
  l as Li,
  n as Mi,
  p as Ri,
  q as Ii,
  r as Oi,
  s as xi,
} from "./chunk-FIQ4B6TP.mjs";
import {
  Bb as Ti,
  Ca as gi,
  Cb as Si,
  Da as _i,
  Eb as wi,
  Gb as Ni,
  J as pe,
  M as ct,
  P as Kr,
  R as ut,
  S as si,
  T as ii,
  Z as ai,
  f as ni,
  ga as oi,
  ja as li,
  ma as ci,
  na as Hn,
  oa as ui,
  pa as hi,
  qa as qn,
  ra as fi,
  sa as di,
  sb as yi,
  ta as pi,
  tb as bi,
  ua as mi,
  xb as Ei,
  yb as vi,
} from "./chunk-INGTML2I.mjs";
import { a as Gr, d as ri, h as $t } from "./chunk-5XUXGTUW.mjs";
var ce = (function (a) {
    return (
      (a[(a.State = 0)] = "State"),
      (a[(a.Transition = 1)] = "Transition"),
      (a[(a.Sequence = 2)] = "Sequence"),
      (a[(a.Group = 3)] = "Group"),
      (a[(a.Animate = 4)] = "Animate"),
      (a[(a.Keyframes = 5)] = "Keyframes"),
      (a[(a.Style = 6)] = "Style"),
      (a[(a.Trigger = 7)] = "Trigger"),
      (a[(a.Reference = 8)] = "Reference"),
      (a[(a.AnimateChild = 9)] = "AnimateChild"),
      (a[(a.AnimateRef = 10)] = "AnimateRef"),
      (a[(a.Query = 11)] = "Query"),
      (a[(a.Stagger = 12)] = "Stagger"),
      a
    );
  })(ce || {}),
  Je = "*";
function Pi(a, e = null) {
  return { type: ce.Sequence, steps: a, options: e };
}
function Bn(a) {
  return { type: ce.Style, styles: a, offset: null };
}
var Dt = class {
    constructor(e = 0, t = 0) {
      (this._onDoneFns = []),
        (this._onStartFns = []),
        (this._onDestroyFns = []),
        (this._originalOnDoneFns = []),
        (this._originalOnStartFns = []),
        (this._started = !1),
        (this._destroyed = !1),
        (this._finished = !1),
        (this._position = 0),
        (this.parentPlayer = null),
        (this.totalTime = e + t);
    }
    _onFinish() {
      this._finished ||
        ((this._finished = !0),
        this._onDoneFns.forEach((e) => e()),
        (this._onDoneFns = []));
    }
    onStart(e) {
      this._originalOnStartFns.push(e), this._onStartFns.push(e);
    }
    onDone(e) {
      this._originalOnDoneFns.push(e), this._onDoneFns.push(e);
    }
    onDestroy(e) {
      this._onDestroyFns.push(e);
    }
    hasStarted() {
      return this._started;
    }
    init() {}
    play() {
      this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
        (this._started = !0);
    }
    triggerMicrotask() {
      queueMicrotask(() => this._onFinish());
    }
    _onStart() {
      this._onStartFns.forEach((e) => e()), (this._onStartFns = []);
    }
    pause() {}
    restart() {}
    finish() {
      this._onFinish();
    }
    destroy() {
      this._destroyed ||
        ((this._destroyed = !0),
        this.hasStarted() || this._onStart(),
        this.finish(),
        this._onDestroyFns.forEach((e) => e()),
        (this._onDestroyFns = []));
    }
    reset() {
      (this._started = !1),
        (this._finished = !1),
        (this._onStartFns = this._originalOnStartFns),
        (this._onDoneFns = this._originalOnDoneFns);
    }
    setPosition(e) {
      this._position = this.totalTime ? e * this.totalTime : 1;
    }
    getPosition() {
      return this.totalTime ? this._position / this.totalTime : 1;
    }
    triggerCallback(e) {
      let t = e == "start" ? this._onStartFns : this._onDoneFns;
      t.forEach((r) => r()), (t.length = 0);
    }
  },
  ur = class {
    constructor(e) {
      (this._onDoneFns = []),
        (this._onStartFns = []),
        (this._finished = !1),
        (this._started = !1),
        (this._destroyed = !1),
        (this._onDestroyFns = []),
        (this.parentPlayer = null),
        (this.totalTime = 0),
        (this.players = e);
      let t = 0,
        r = 0,
        n = 0,
        s = this.players.length;
      s == 0
        ? queueMicrotask(() => this._onFinish())
        : this.players.forEach((i) => {
            i.onDone(() => {
              ++t == s && this._onFinish();
            }),
              i.onDestroy(() => {
                ++r == s && this._onDestroy();
              }),
              i.onStart(() => {
                ++n == s && this._onStart();
              });
          }),
        (this.totalTime = this.players.reduce(
          (i, o) => Math.max(i, o.totalTime),
          0
        ));
    }
    _onFinish() {
      this._finished ||
        ((this._finished = !0),
        this._onDoneFns.forEach((e) => e()),
        (this._onDoneFns = []));
    }
    init() {
      this.players.forEach((e) => e.init());
    }
    onStart(e) {
      this._onStartFns.push(e);
    }
    _onStart() {
      this.hasStarted() ||
        ((this._started = !0),
        this._onStartFns.forEach((e) => e()),
        (this._onStartFns = []));
    }
    onDone(e) {
      this._onDoneFns.push(e);
    }
    onDestroy(e) {
      this._onDestroyFns.push(e);
    }
    hasStarted() {
      return this._started;
    }
    play() {
      this.parentPlayer || this.init(),
        this._onStart(),
        this.players.forEach((e) => e.play());
    }
    pause() {
      this.players.forEach((e) => e.pause());
    }
    restart() {
      this.players.forEach((e) => e.restart());
    }
    finish() {
      this._onFinish(), this.players.forEach((e) => e.finish());
    }
    destroy() {
      this._onDestroy();
    }
    _onDestroy() {
      this._destroyed ||
        ((this._destroyed = !0),
        this._onFinish(),
        this.players.forEach((e) => e.destroy()),
        this._onDestroyFns.forEach((e) => e()),
        (this._onDestroyFns = []));
    }
    reset() {
      this.players.forEach((e) => e.reset()),
        (this._destroyed = !1),
        (this._finished = !1),
        (this._started = !1);
    }
    setPosition(e) {
      let t = e * this.totalTime;
      this.players.forEach((r) => {
        let n = r.totalTime ? Math.min(1, t / r.totalTime) : 1;
        r.setPosition(n);
      });
    }
    getPosition() {
      let e = this.players.reduce(
        (t, r) => (t === null || r.totalTime > t.totalTime ? r : t),
        null
      );
      return e != null ? e.getPosition() : 0;
    }
    beforeDestroy() {
      this.players.forEach((e) => {
        e.beforeDestroy && e.beforeDestroy();
      });
    }
    triggerCallback(e) {
      let t = e == "start" ? this._onStartFns : this._onDoneFns;
      t.forEach((r) => r()), (t.length = 0);
    }
  },
  Qr = "!";
function Hi(a) {
  return new pe(3e3, !1);
}
function rl() {
  return new pe(3100, !1);
}
function nl() {
  return new pe(3101, !1);
}
function sl(a) {
  return new pe(3001, !1);
}
function il(a) {
  return new pe(3003, !1);
}
function al(a) {
  return new pe(3004, !1);
}
function ol(a, e) {
  return new pe(3005, !1);
}
function ll() {
  return new pe(3006, !1);
}
function cl() {
  return new pe(3007, !1);
}
function ul(a, e) {
  return new pe(3008, !1);
}
function hl(a) {
  return new pe(3002, !1);
}
function fl(a, e, t, r, n) {
  return new pe(3010, !1);
}
function dl() {
  return new pe(3011, !1);
}
function pl() {
  return new pe(3012, !1);
}
function ml() {
  return new pe(3200, !1);
}
function gl() {
  return new pe(3202, !1);
}
function _l() {
  return new pe(3013, !1);
}
function yl(a) {
  return new pe(3014, !1);
}
function bl(a) {
  return new pe(3015, !1);
}
function El(a) {
  return new pe(3016, !1);
}
function vl(a, e) {
  return new pe(3404, !1);
}
function Tl(a) {
  return new pe(3502, !1);
}
function Sl(a) {
  return new pe(3503, !1);
}
function wl() {
  return new pe(3300, !1);
}
function Nl(a) {
  return new pe(3504, !1);
}
function Al(a) {
  return new pe(3301, !1);
}
function Dl(a, e) {
  return new pe(3302, !1);
}
function kl(a) {
  return new pe(3303, !1);
}
function Cl(a, e) {
  return new pe(3400, !1);
}
function Ll(a) {
  return new pe(3401, !1);
}
function Ml(a) {
  return new pe(3402, !1);
}
function Rl(a, e) {
  return new pe(3505, !1);
}
function kt(a) {
  switch (a.length) {
    case 0:
      return new Dt();
    case 1:
      return a[0];
    default:
      return new ur(a);
  }
}
function Zi(a, e, t = new Map(), r = new Map()) {
  let n = [],
    s = [],
    i = -1,
    o = null;
  if (
    (e.forEach((h) => {
      let c = h.get("offset"),
        _ = c == i,
        g = (_ && o) || new Map();
      h.forEach((b, C) => {
        let I = C,
          M = b;
        if (C !== "offset")
          switch (((I = a.normalizePropertyName(I, n)), M)) {
            case Qr:
              M = t.get(C);
              break;
            case Je:
              M = r.get(C);
              break;
            default:
              M = a.normalizeStyleValue(C, I, M, n);
              break;
          }
        g.set(I, M);
      }),
        _ || s.push(g),
        (o = g),
        (i = c);
    }),
    n.length)
  )
    throw Tl(n);
  return s;
}
function cs(a, e, t, r) {
  switch (e) {
    case "start":
      a.onStart(() => r(t && Un(t, "start", a)));
      break;
    case "done":
      a.onDone(() => r(t && Un(t, "done", a)));
      break;
    case "destroy":
      a.onDestroy(() => r(t && Un(t, "destroy", a)));
      break;
  }
}
function Un(a, e, t) {
  let r = t.totalTime,
    n = !!t.disabled,
    s = us(
      a.element,
      a.triggerName,
      a.fromState,
      a.toState,
      e || a.phaseName,
      r ?? a.totalTime,
      n
    ),
    i = a._data;
  return i != null && (s._data = i), s;
}
function us(a, e, t, r, n = "", s = 0, i) {
  return {
    element: a,
    triggerName: e,
    fromState: t,
    toState: r,
    phaseName: n,
    totalTime: s,
    disabled: !!i,
  };
}
function Be(a, e, t) {
  let r = a.get(e);
  return r || a.set(e, (r = t)), r;
}
function qi(a) {
  let e = a.indexOf(":"),
    t = a.substring(1, e),
    r = a.slice(e + 1);
  return [t, r];
}
var Il = typeof document > "u" ? null : document.documentElement;
function hs(a) {
  let e = a.parentNode || a.host || null;
  return e === Il ? null : e;
}
function Ol(a) {
  return a.substring(1, 6) == "ebkit";
}
var Bt = null,
  Fi = !1;
function xl(a) {
  Bt ||
    ((Bt = Pl() || {}), (Fi = Bt.style ? "WebkitAppearance" in Bt.style : !1));
  let e = !0;
  return (
    Bt.style &&
      !Ol(a) &&
      ((e = a in Bt.style),
      !e &&
        Fi &&
        (e = "Webkit" + a.charAt(0).toUpperCase() + a.slice(1) in Bt.style)),
    e
  );
}
function Pl() {
  return typeof document < "u" ? document.body : null;
}
function Ji(a, e) {
  for (; e; ) {
    if (e === a) return !0;
    e = hs(e);
  }
  return !1;
}
function ea(a, e, t) {
  if (t) return Array.from(a.querySelectorAll(e));
  let r = a.querySelector(e);
  return r ? [r] : [];
}
var fs = (() => {
    class a {
      validateStyleProperty(t) {
        return xl(t);
      }
      containsElement(t, r) {
        return Ji(t, r);
      }
      getParentElement(t) {
        return hs(t);
      }
      query(t, r, n) {
        return ea(t, r, n);
      }
      computeStyle(t, r, n) {
        return n || "";
      }
      animate(t, r, n, s, i, o = [], h) {
        return new Dt(n, s);
      }
      static {
        this.ɵfac = function (r) {
          return new (r || a)();
        };
      }
      static {
        this.ɵprov = ct({ token: a, factory: a.ɵfac });
      }
    }
    return a;
  })(),
  Vt = class {
    static {
      this.NOOP = new fs();
    }
  },
  zt = class {};
var Hl = 1e3,
  ta = "{{",
  ql = "}}",
  ra = "ng-enter",
  Wn = "ng-leave",
  $r = "ng-trigger",
  en = ".ng-trigger",
  Bi = "ng-animating",
  Qn = ".ng-animating";
function ht(a) {
  if (typeof a == "number") return a;
  let e = a.match(/^(-?[\.\d]+)(m?s)/);
  return !e || e.length < 2 ? 0 : $n(parseFloat(e[1]), e[2]);
}
function $n(a, e) {
  switch (e) {
    case "s":
      return a * Hl;
    default:
      return a;
  }
}
function tn(a, e, t) {
  return a.hasOwnProperty("duration") ? a : Fl(a, e, t);
}
function Fl(a, e, t) {
  let r =
      /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i,
    n,
    s = 0,
    i = "";
  if (typeof a == "string") {
    let o = a.match(r);
    if (o === null) return e.push(Hi(a)), { duration: 0, delay: 0, easing: "" };
    n = $n(parseFloat(o[1]), o[2]);
    let h = o[3];
    h != null && (s = $n(parseFloat(h), o[4]));
    let c = o[5];
    c && (i = c);
  } else n = a;
  if (!t) {
    let o = !1,
      h = e.length;
    n < 0 && (e.push(rl()), (o = !0)),
      s < 0 && (e.push(nl()), (o = !0)),
      o && e.splice(h, 0, Hi(a));
  }
  return { duration: n, delay: s, easing: i };
}
function Bl(a) {
  return a.length
    ? a[0] instanceof Map
      ? a
      : a.map((e) => new Map(Object.entries(e)))
    : [];
}
function et(a, e, t) {
  e.forEach((r, n) => {
    let s = ds(n);
    t && !t.has(n) && t.set(n, a.style[s]), (a.style[s] = r);
  });
}
function jt(a, e) {
  e.forEach((t, r) => {
    let n = ds(r);
    a.style[n] = "";
  });
}
function hr(a) {
  return Array.isArray(a) ? (a.length == 1 ? a[0] : Pi(a)) : a;
}
function Ul(a, e, t) {
  let r = e.params || {},
    n = na(a);
  n.length &&
    n.forEach((s) => {
      r.hasOwnProperty(s) || t.push(sl(s));
    });
}
var Xn = new RegExp(`${ta}\\s*(.+?)\\s*${ql}`, "g");
function na(a) {
  let e = [];
  if (typeof a == "string") {
    let t;
    for (; (t = Xn.exec(a)); ) e.push(t[1]);
    Xn.lastIndex = 0;
  }
  return e;
}
function dr(a, e, t) {
  let r = `${a}`,
    n = r.replace(Xn, (s, i) => {
      let o = e[i];
      return o == null && (t.push(il(i)), (o = "")), o.toString();
    });
  return n == r ? a : n;
}
var jl = /-+([a-z0-9])/g;
function ds(a) {
  return a.replace(jl, (...e) => e[1].toUpperCase());
}
function Vl(a, e) {
  return a === 0 || e === 0;
}
function zl(a, e, t) {
  if (t.size && e.length) {
    let r = e[0],
      n = [];
    if (
      (t.forEach((s, i) => {
        r.has(i) || n.push(i), r.set(i, s);
      }),
      n.length)
    )
      for (let s = 1; s < e.length; s++) {
        let i = e[s];
        n.forEach((o) => i.set(o, ps(a, o)));
      }
  }
  return e;
}
function Fe(a, e, t) {
  switch (e.type) {
    case ce.Trigger:
      return a.visitTrigger(e, t);
    case ce.State:
      return a.visitState(e, t);
    case ce.Transition:
      return a.visitTransition(e, t);
    case ce.Sequence:
      return a.visitSequence(e, t);
    case ce.Group:
      return a.visitGroup(e, t);
    case ce.Animate:
      return a.visitAnimate(e, t);
    case ce.Keyframes:
      return a.visitKeyframes(e, t);
    case ce.Style:
      return a.visitStyle(e, t);
    case ce.Reference:
      return a.visitReference(e, t);
    case ce.AnimateChild:
      return a.visitAnimateChild(e, t);
    case ce.AnimateRef:
      return a.visitAnimateRef(e, t);
    case ce.Query:
      return a.visitQuery(e, t);
    case ce.Stagger:
      return a.visitStagger(e, t);
    default:
      throw al(e.type);
  }
}
function ps(a, e) {
  return window.getComputedStyle(a)[e];
}
var Gl = new Set([
    "width",
    "height",
    "minWidth",
    "minHeight",
    "maxWidth",
    "maxHeight",
    "left",
    "top",
    "bottom",
    "right",
    "fontSize",
    "outlineWidth",
    "outlineOffset",
    "paddingTop",
    "paddingLeft",
    "paddingBottom",
    "paddingRight",
    "marginTop",
    "marginLeft",
    "marginBottom",
    "marginRight",
    "borderRadius",
    "borderWidth",
    "borderTopWidth",
    "borderLeftWidth",
    "borderRightWidth",
    "borderBottomWidth",
    "textIndent",
    "perspective",
  ]),
  rn = class extends zt {
    normalizePropertyName(e, t) {
      return ds(e);
    }
    normalizeStyleValue(e, t, r, n) {
      let s = "",
        i = r.toString().trim();
      if (Gl.has(t) && r !== 0 && r !== "0")
        if (typeof r == "number") s = "px";
        else {
          let o = r.match(/^[+-]?[\d\.]+([a-z]*)$/);
          o && o[1].length == 0 && n.push(ol(e, r));
        }
      return i + s;
    }
  };
var nn = "*";
function Kl(a, e) {
  let t = [];
  return (
    typeof a == "string"
      ? a.split(/\s*,\s*/).forEach((r) => Wl(r, t, e))
      : t.push(a),
    t
  );
}
function Wl(a, e, t) {
  if (a[0] == ":") {
    let h = Ql(a, t);
    if (typeof h == "function") {
      e.push(h);
      return;
    }
    a = h;
  }
  let r = a.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
  if (r == null || r.length < 4) return t.push(bl(a)), e;
  let n = r[1],
    s = r[2],
    i = r[3];
  e.push(Ui(n, i));
  let o = n == nn && i == nn;
  s[0] == "<" && !o && e.push(Ui(i, n));
}
function Ql(a, e) {
  switch (a) {
    case ":enter":
      return "void => *";
    case ":leave":
      return "* => void";
    case ":increment":
      return (t, r) => parseFloat(r) > parseFloat(t);
    case ":decrement":
      return (t, r) => parseFloat(r) < parseFloat(t);
    default:
      return e.push(El(a)), "* => *";
  }
}
var Xr = new Set(["true", "1"]),
  Yr = new Set(["false", "0"]);
function Ui(a, e) {
  let t = Xr.has(a) || Yr.has(a),
    r = Xr.has(e) || Yr.has(e);
  return (n, s) => {
    let i = a == nn || a == n,
      o = e == nn || e == s;
    return (
      !i && t && typeof n == "boolean" && (i = n ? Xr.has(a) : Yr.has(a)),
      !o && r && typeof s == "boolean" && (o = s ? Xr.has(e) : Yr.has(e)),
      i && o
    );
  };
}
var sa = ":self",
  $l = new RegExp(`s*${sa}s*,?`, "g");
function ia(a, e, t, r) {
  return new Yn(a).build(e, t, r);
}
var ji = "",
  Yn = class {
    constructor(e) {
      this._driver = e;
    }
    build(e, t, r) {
      let n = new Zn(t);
      return this._resetContextStyleTimingState(n), Fe(this, hr(e), n);
    }
    _resetContextStyleTimingState(e) {
      (e.currentQuerySelector = ji),
        (e.collectedStyles = new Map()),
        e.collectedStyles.set(ji, new Map()),
        (e.currentTime = 0);
    }
    visitTrigger(e, t) {
      let r = (t.queryCount = 0),
        n = (t.depCount = 0),
        s = [],
        i = [];
      return (
        e.name.charAt(0) == "@" && t.errors.push(ll()),
        e.definitions.forEach((o) => {
          if ((this._resetContextStyleTimingState(t), o.type == ce.State)) {
            let h = o,
              c = h.name;
            c
              .toString()
              .split(/\s*,\s*/)
              .forEach((_) => {
                (h.name = _), s.push(this.visitState(h, t));
              }),
              (h.name = c);
          } else if (o.type == ce.Transition) {
            let h = this.visitTransition(o, t);
            (r += h.queryCount), (n += h.depCount), i.push(h);
          } else t.errors.push(cl());
        }),
        {
          type: ce.Trigger,
          name: e.name,
          states: s,
          transitions: i,
          queryCount: r,
          depCount: n,
          options: null,
        }
      );
    }
    visitState(e, t) {
      let r = this.visitStyle(e.styles, t),
        n = (e.options && e.options.params) || null;
      if (r.containsDynamicStyles) {
        let s = new Set(),
          i = n || {};
        r.styles.forEach((o) => {
          o instanceof Map &&
            o.forEach((h) => {
              na(h).forEach((c) => {
                i.hasOwnProperty(c) || s.add(c);
              });
            });
        }),
          s.size && t.errors.push(ul(e.name, [...s.values()]));
      }
      return {
        type: ce.State,
        name: e.name,
        style: r,
        options: n ? { params: n } : null,
      };
    }
    visitTransition(e, t) {
      (t.queryCount = 0), (t.depCount = 0);
      let r = Fe(this, hr(e.animation), t),
        n = Kl(e.expr, t.errors);
      return {
        type: ce.Transition,
        matchers: n,
        animation: r,
        queryCount: t.queryCount,
        depCount: t.depCount,
        options: Ut(e.options),
      };
    }
    visitSequence(e, t) {
      return {
        type: ce.Sequence,
        steps: e.steps.map((r) => Fe(this, r, t)),
        options: Ut(e.options),
      };
    }
    visitGroup(e, t) {
      let r = t.currentTime,
        n = 0,
        s = e.steps.map((i) => {
          t.currentTime = r;
          let o = Fe(this, i, t);
          return (n = Math.max(n, t.currentTime)), o;
        });
      return (
        (t.currentTime = n),
        { type: ce.Group, steps: s, options: Ut(e.options) }
      );
    }
    visitAnimate(e, t) {
      let r = Jl(e.timings, t.errors);
      t.currentAnimateTimings = r;
      let n,
        s = e.styles ? e.styles : Bn({});
      if (s.type == ce.Keyframes) n = this.visitKeyframes(s, t);
      else {
        let i = e.styles,
          o = !1;
        if (!i) {
          o = !0;
          let c = {};
          r.easing && (c.easing = r.easing), (i = Bn(c));
        }
        t.currentTime += r.duration + r.delay;
        let h = this.visitStyle(i, t);
        (h.isEmptyStep = o), (n = h);
      }
      return (
        (t.currentAnimateTimings = null),
        { type: ce.Animate, timings: r, style: n, options: null }
      );
    }
    visitStyle(e, t) {
      let r = this._makeStyleAst(e, t);
      return this._validateStyleAst(r, t), r;
    }
    _makeStyleAst(e, t) {
      let r = [],
        n = Array.isArray(e.styles) ? e.styles : [e.styles];
      for (let o of n)
        typeof o == "string"
          ? o === Je
            ? r.push(o)
            : t.errors.push(hl(o))
          : r.push(new Map(Object.entries(o)));
      let s = !1,
        i = null;
      return (
        r.forEach((o) => {
          if (
            o instanceof Map &&
            (o.has("easing") && ((i = o.get("easing")), o.delete("easing")), !s)
          ) {
            for (let h of o.values())
              if (h.toString().indexOf(ta) >= 0) {
                s = !0;
                break;
              }
          }
        }),
        {
          type: ce.Style,
          styles: r,
          easing: i,
          offset: e.offset,
          containsDynamicStyles: s,
          options: null,
        }
      );
    }
    _validateStyleAst(e, t) {
      let r = t.currentAnimateTimings,
        n = t.currentTime,
        s = t.currentTime;
      r && s > 0 && (s -= r.duration + r.delay),
        e.styles.forEach((i) => {
          typeof i != "string" &&
            i.forEach((o, h) => {
              let c = t.collectedStyles.get(t.currentQuerySelector),
                _ = c.get(h),
                g = !0;
              _ &&
                (s != n &&
                  s >= _.startTime &&
                  n <= _.endTime &&
                  (t.errors.push(fl(h, _.startTime, _.endTime, s, n)),
                  (g = !1)),
                (s = _.startTime)),
                g && c.set(h, { startTime: s, endTime: n }),
                t.options && Ul(o, t.options, t.errors);
            });
        });
    }
    visitKeyframes(e, t) {
      let r = { type: ce.Keyframes, styles: [], options: null };
      if (!t.currentAnimateTimings) return t.errors.push(dl()), r;
      let n = 1,
        s = 0,
        i = [],
        o = !1,
        h = !1,
        c = 0,
        _ = e.steps.map((P) => {
          let w = this._makeStyleAst(P, t),
            v = w.offset != null ? w.offset : Zl(w.styles),
            N = 0;
          return (
            v != null && (s++, (N = w.offset = v)),
            (h = h || N < 0 || N > 1),
            (o = o || N < c),
            (c = N),
            i.push(N),
            w
          );
        });
      h && t.errors.push(pl()), o && t.errors.push(ml());
      let g = e.steps.length,
        b = 0;
      s > 0 && s < g ? t.errors.push(gl()) : s == 0 && (b = n / (g - 1));
      let C = g - 1,
        I = t.currentTime,
        M = t.currentAnimateTimings,
        G = M.duration;
      return (
        _.forEach((P, w) => {
          let v = b > 0 ? (w == C ? 1 : b * w) : i[w],
            N = v * G;
          (t.currentTime = I + M.delay + N),
            (M.duration = N),
            this._validateStyleAst(P, t),
            (P.offset = v),
            r.styles.push(P);
        }),
        r
      );
    }
    visitReference(e, t) {
      return {
        type: ce.Reference,
        animation: Fe(this, hr(e.animation), t),
        options: Ut(e.options),
      };
    }
    visitAnimateChild(e, t) {
      return t.depCount++, { type: ce.AnimateChild, options: Ut(e.options) };
    }
    visitAnimateRef(e, t) {
      return {
        type: ce.AnimateRef,
        animation: this.visitReference(e.animation, t),
        options: Ut(e.options),
      };
    }
    visitQuery(e, t) {
      let r = t.currentQuerySelector,
        n = e.options || {};
      t.queryCount++, (t.currentQuery = e);
      let [s, i] = Xl(e.selector);
      (t.currentQuerySelector = r.length ? r + " " + s : s),
        Be(t.collectedStyles, t.currentQuerySelector, new Map());
      let o = Fe(this, hr(e.animation), t);
      return (
        (t.currentQuery = null),
        (t.currentQuerySelector = r),
        {
          type: ce.Query,
          selector: s,
          limit: n.limit || 0,
          optional: !!n.optional,
          includeSelf: i,
          animation: o,
          originalSelector: e.selector,
          options: Ut(e.options),
        }
      );
    }
    visitStagger(e, t) {
      t.currentQuery || t.errors.push(_l());
      let r =
        e.timings === "full"
          ? { duration: 0, delay: 0, easing: "full" }
          : tn(e.timings, t.errors, !0);
      return {
        type: ce.Stagger,
        animation: Fe(this, hr(e.animation), t),
        timings: r,
        options: null,
      };
    }
  };
function Xl(a) {
  let e = !!a.split(/\s*,\s*/).find((t) => t == sa);
  return (
    e && (a = a.replace($l, "")),
    (a = a
      .replace(/@\*/g, en)
      .replace(/@\w+/g, (t) => en + "-" + t.slice(1))
      .replace(/:animating/g, Qn)),
    [a, e]
  );
}
function Yl(a) {
  return a ? Gr({}, a) : null;
}
var Zn = class {
  constructor(e) {
    (this.errors = e),
      (this.queryCount = 0),
      (this.depCount = 0),
      (this.currentTransition = null),
      (this.currentQuery = null),
      (this.currentQuerySelector = null),
      (this.currentAnimateTimings = null),
      (this.currentTime = 0),
      (this.collectedStyles = new Map()),
      (this.options = null),
      (this.unsupportedCSSPropertiesFound = new Set());
  }
};
function Zl(a) {
  if (typeof a == "string") return null;
  let e = null;
  if (Array.isArray(a))
    a.forEach((t) => {
      if (t instanceof Map && t.has("offset")) {
        let r = t;
        (e = parseFloat(r.get("offset"))), r.delete("offset");
      }
    });
  else if (a instanceof Map && a.has("offset")) {
    let t = a;
    (e = parseFloat(t.get("offset"))), t.delete("offset");
  }
  return e;
}
function Jl(a, e) {
  if (a.hasOwnProperty("duration")) return a;
  if (typeof a == "number") {
    let s = tn(a, e).duration;
    return jn(s, 0, "");
  }
  let t = a;
  if (t.split(/\s+/).some((s) => s.charAt(0) == "{" && s.charAt(1) == "{")) {
    let s = jn(0, 0, "");
    return (s.dynamic = !0), (s.strValue = t), s;
  }
  let n = tn(t, e);
  return jn(n.duration, n.delay, n.easing);
}
function Ut(a) {
  return (
    a ? ((a = Gr({}, a)), a.params && (a.params = Yl(a.params))) : (a = {}), a
  );
}
function jn(a, e, t) {
  return { duration: a, delay: e, easing: t };
}
function ms(a, e, t, r, n, s, i = null, o = !1) {
  return {
    type: 1,
    element: a,
    keyframes: e,
    preStyleProps: t,
    postStyleProps: r,
    duration: n,
    delay: s,
    totalTime: n + s,
    easing: i,
    subTimeline: o,
  };
}
var pr = class {
    constructor() {
      this._map = new Map();
    }
    get(e) {
      return this._map.get(e) || [];
    }
    append(e, t) {
      let r = this._map.get(e);
      r || this._map.set(e, (r = [])), r.push(...t);
    }
    has(e) {
      return this._map.has(e);
    }
    clear() {
      this._map.clear();
    }
  },
  ec = 1,
  tc = ":enter",
  rc = new RegExp(tc, "g"),
  nc = ":leave",
  sc = new RegExp(nc, "g");
function aa(a, e, t, r, n, s = new Map(), i = new Map(), o, h, c = []) {
  return new Jn().buildKeyframes(a, e, t, r, n, s, i, o, h, c);
}
var Jn = class {
    buildKeyframes(e, t, r, n, s, i, o, h, c, _ = []) {
      c = c || new pr();
      let g = new es(e, t, c, n, s, _, []);
      g.options = h;
      let b = h.delay ? ht(h.delay) : 0;
      g.currentTimeline.delayNextStep(b),
        g.currentTimeline.setStyles([i], null, g.errors, h),
        Fe(this, r, g);
      let C = g.timelines.filter((I) => I.containsAnimation());
      if (C.length && o.size) {
        let I;
        for (let M = C.length - 1; M >= 0; M--) {
          let G = C[M];
          if (G.element === t) {
            I = G;
            break;
          }
        }
        I &&
          !I.allowOnlyTimelineStyles() &&
          I.setStyles([o], null, g.errors, h);
      }
      return C.length
        ? C.map((I) => I.buildKeyframes())
        : [ms(t, [], [], [], 0, b, "", !1)];
    }
    visitTrigger(e, t) {}
    visitState(e, t) {}
    visitTransition(e, t) {}
    visitAnimateChild(e, t) {
      let r = t.subInstructions.get(t.element);
      if (r) {
        let n = t.createSubContext(e.options),
          s = t.currentTimeline.currentTime,
          i = this._visitSubInstructions(r, n, n.options);
        s != i && t.transformIntoNewTimeline(i);
      }
      t.previousNode = e;
    }
    visitAnimateRef(e, t) {
      let r = t.createSubContext(e.options);
      r.transformIntoNewTimeline(),
        this._applyAnimationRefDelays([e.options, e.animation.options], t, r),
        this.visitReference(e.animation, r),
        t.transformIntoNewTimeline(r.currentTimeline.currentTime),
        (t.previousNode = e);
    }
    _applyAnimationRefDelays(e, t, r) {
      for (let n of e) {
        let s = n?.delay;
        if (s) {
          let i =
            typeof s == "number" ? s : ht(dr(s, n?.params ?? {}, t.errors));
          r.delayNextStep(i);
        }
      }
    }
    _visitSubInstructions(e, t, r) {
      let s = t.currentTimeline.currentTime,
        i = r.duration != null ? ht(r.duration) : null,
        o = r.delay != null ? ht(r.delay) : null;
      return (
        i !== 0 &&
          e.forEach((h) => {
            let c = t.appendInstructionToTimeline(h, i, o);
            s = Math.max(s, c.duration + c.delay);
          }),
        s
      );
    }
    visitReference(e, t) {
      t.updateOptions(e.options, !0),
        Fe(this, e.animation, t),
        (t.previousNode = e);
    }
    visitSequence(e, t) {
      let r = t.subContextCount,
        n = t,
        s = e.options;
      if (
        s &&
        (s.params || s.delay) &&
        ((n = t.createSubContext(s)),
        n.transformIntoNewTimeline(),
        s.delay != null)
      ) {
        n.previousNode.type == ce.Style &&
          (n.currentTimeline.snapshotCurrentStyles(), (n.previousNode = sn));
        let i = ht(s.delay);
        n.delayNextStep(i);
      }
      e.steps.length &&
        (e.steps.forEach((i) => Fe(this, i, n)),
        n.currentTimeline.applyStylesToKeyframe(),
        n.subContextCount > r && n.transformIntoNewTimeline()),
        (t.previousNode = e);
    }
    visitGroup(e, t) {
      let r = [],
        n = t.currentTimeline.currentTime,
        s = e.options && e.options.delay ? ht(e.options.delay) : 0;
      e.steps.forEach((i) => {
        let o = t.createSubContext(e.options);
        s && o.delayNextStep(s),
          Fe(this, i, o),
          (n = Math.max(n, o.currentTimeline.currentTime)),
          r.push(o.currentTimeline);
      }),
        r.forEach((i) => t.currentTimeline.mergeTimelineCollectedStyles(i)),
        t.transformIntoNewTimeline(n),
        (t.previousNode = e);
    }
    _visitTiming(e, t) {
      if (e.dynamic) {
        let r = e.strValue,
          n = t.params ? dr(r, t.params, t.errors) : r;
        return tn(n, t.errors);
      } else return { duration: e.duration, delay: e.delay, easing: e.easing };
    }
    visitAnimate(e, t) {
      let r = (t.currentAnimateTimings = this._visitTiming(e.timings, t)),
        n = t.currentTimeline;
      r.delay && (t.incrementTime(r.delay), n.snapshotCurrentStyles());
      let s = e.style;
      s.type == ce.Keyframes
        ? this.visitKeyframes(s, t)
        : (t.incrementTime(r.duration),
          this.visitStyle(s, t),
          n.applyStylesToKeyframe()),
        (t.currentAnimateTimings = null),
        (t.previousNode = e);
    }
    visitStyle(e, t) {
      let r = t.currentTimeline,
        n = t.currentAnimateTimings;
      !n && r.hasCurrentStyleProperties() && r.forwardFrame();
      let s = (n && n.easing) || e.easing;
      e.isEmptyStep
        ? r.applyEmptyStep(s)
        : r.setStyles(e.styles, s, t.errors, t.options),
        (t.previousNode = e);
    }
    visitKeyframes(e, t) {
      let r = t.currentAnimateTimings,
        n = t.currentTimeline.duration,
        s = r.duration,
        o = t.createSubContext().currentTimeline;
      (o.easing = r.easing),
        e.styles.forEach((h) => {
          let c = h.offset || 0;
          o.forwardTime(c * s),
            o.setStyles(h.styles, h.easing, t.errors, t.options),
            o.applyStylesToKeyframe();
        }),
        t.currentTimeline.mergeTimelineCollectedStyles(o),
        t.transformIntoNewTimeline(n + s),
        (t.previousNode = e);
    }
    visitQuery(e, t) {
      let r = t.currentTimeline.currentTime,
        n = e.options || {},
        s = n.delay ? ht(n.delay) : 0;
      s &&
        (t.previousNode.type === ce.Style ||
          (r == 0 && t.currentTimeline.hasCurrentStyleProperties())) &&
        (t.currentTimeline.snapshotCurrentStyles(), (t.previousNode = sn));
      let i = r,
        o = t.invokeQuery(
          e.selector,
          e.originalSelector,
          e.limit,
          e.includeSelf,
          !!n.optional,
          t.errors
        );
      t.currentQueryTotal = o.length;
      let h = null;
      o.forEach((c, _) => {
        t.currentQueryIndex = _;
        let g = t.createSubContext(e.options, c);
        s && g.delayNextStep(s),
          c === t.element && (h = g.currentTimeline),
          Fe(this, e.animation, g),
          g.currentTimeline.applyStylesToKeyframe();
        let b = g.currentTimeline.currentTime;
        i = Math.max(i, b);
      }),
        (t.currentQueryIndex = 0),
        (t.currentQueryTotal = 0),
        t.transformIntoNewTimeline(i),
        h &&
          (t.currentTimeline.mergeTimelineCollectedStyles(h),
          t.currentTimeline.snapshotCurrentStyles()),
        (t.previousNode = e);
    }
    visitStagger(e, t) {
      let r = t.parentContext,
        n = t.currentTimeline,
        s = e.timings,
        i = Math.abs(s.duration),
        o = i * (t.currentQueryTotal - 1),
        h = i * t.currentQueryIndex;
      switch (s.duration < 0 ? "reverse" : s.easing) {
        case "reverse":
          h = o - h;
          break;
        case "full":
          h = r.currentStaggerTime;
          break;
      }
      let _ = t.currentTimeline;
      h && _.delayNextStep(h);
      let g = _.currentTime;
      Fe(this, e.animation, t),
        (t.previousNode = e),
        (r.currentStaggerTime =
          n.currentTime - g + (n.startTime - r.currentTimeline.startTime));
    }
  },
  sn = {},
  es = class a {
    constructor(e, t, r, n, s, i, o, h) {
      (this._driver = e),
        (this.element = t),
        (this.subInstructions = r),
        (this._enterClassName = n),
        (this._leaveClassName = s),
        (this.errors = i),
        (this.timelines = o),
        (this.parentContext = null),
        (this.currentAnimateTimings = null),
        (this.previousNode = sn),
        (this.subContextCount = 0),
        (this.options = {}),
        (this.currentQueryIndex = 0),
        (this.currentQueryTotal = 0),
        (this.currentStaggerTime = 0),
        (this.currentTimeline = h || new an(this._driver, t, 0)),
        o.push(this.currentTimeline);
    }
    get params() {
      return this.options.params;
    }
    updateOptions(e, t) {
      if (!e) return;
      let r = e,
        n = this.options;
      r.duration != null && (n.duration = ht(r.duration)),
        r.delay != null && (n.delay = ht(r.delay));
      let s = r.params;
      if (s) {
        let i = n.params;
        i || (i = this.options.params = {}),
          Object.keys(s).forEach((o) => {
            (!t || !i.hasOwnProperty(o)) && (i[o] = dr(s[o], i, this.errors));
          });
      }
    }
    _copyOptions() {
      let e = {};
      if (this.options) {
        let t = this.options.params;
        if (t) {
          let r = (e.params = {});
          Object.keys(t).forEach((n) => {
            r[n] = t[n];
          });
        }
      }
      return e;
    }
    createSubContext(e = null, t, r) {
      let n = t || this.element,
        s = new a(
          this._driver,
          n,
          this.subInstructions,
          this._enterClassName,
          this._leaveClassName,
          this.errors,
          this.timelines,
          this.currentTimeline.fork(n, r || 0)
        );
      return (
        (s.previousNode = this.previousNode),
        (s.currentAnimateTimings = this.currentAnimateTimings),
        (s.options = this._copyOptions()),
        s.updateOptions(e),
        (s.currentQueryIndex = this.currentQueryIndex),
        (s.currentQueryTotal = this.currentQueryTotal),
        (s.parentContext = this),
        this.subContextCount++,
        s
      );
    }
    transformIntoNewTimeline(e) {
      return (
        (this.previousNode = sn),
        (this.currentTimeline = this.currentTimeline.fork(this.element, e)),
        this.timelines.push(this.currentTimeline),
        this.currentTimeline
      );
    }
    appendInstructionToTimeline(e, t, r) {
      let n = {
          duration: t ?? e.duration,
          delay: this.currentTimeline.currentTime + (r ?? 0) + e.delay,
          easing: "",
        },
        s = new ts(
          this._driver,
          e.element,
          e.keyframes,
          e.preStyleProps,
          e.postStyleProps,
          n,
          e.stretchStartingKeyframe
        );
      return this.timelines.push(s), n;
    }
    incrementTime(e) {
      this.currentTimeline.forwardTime(this.currentTimeline.duration + e);
    }
    delayNextStep(e) {
      e > 0 && this.currentTimeline.delayNextStep(e);
    }
    invokeQuery(e, t, r, n, s, i) {
      let o = [];
      if ((n && o.push(this.element), e.length > 0)) {
        (e = e.replace(rc, "." + this._enterClassName)),
          (e = e.replace(sc, "." + this._leaveClassName));
        let h = r != 1,
          c = this._driver.query(this.element, e, h);
        r !== 0 &&
          (c = r < 0 ? c.slice(c.length + r, c.length) : c.slice(0, r)),
          o.push(...c);
      }
      return !s && o.length == 0 && i.push(yl(t)), o;
    }
  },
  an = class a {
    constructor(e, t, r, n) {
      (this._driver = e),
        (this.element = t),
        (this.startTime = r),
        (this._elementTimelineStylesLookup = n),
        (this.duration = 0),
        (this.easing = null),
        (this._previousKeyframe = new Map()),
        (this._currentKeyframe = new Map()),
        (this._keyframes = new Map()),
        (this._styleSummary = new Map()),
        (this._localTimelineStyles = new Map()),
        (this._pendingStyles = new Map()),
        (this._backFill = new Map()),
        (this._currentEmptyStepKeyframe = null),
        this._elementTimelineStylesLookup ||
          (this._elementTimelineStylesLookup = new Map()),
        (this._globalTimelineStyles = this._elementTimelineStylesLookup.get(t)),
        this._globalTimelineStyles ||
          ((this._globalTimelineStyles = this._localTimelineStyles),
          this._elementTimelineStylesLookup.set(t, this._localTimelineStyles)),
        this._loadKeyframe();
    }
    containsAnimation() {
      switch (this._keyframes.size) {
        case 0:
          return !1;
        case 1:
          return this.hasCurrentStyleProperties();
        default:
          return !0;
      }
    }
    hasCurrentStyleProperties() {
      return this._currentKeyframe.size > 0;
    }
    get currentTime() {
      return this.startTime + this.duration;
    }
    delayNextStep(e) {
      let t = this._keyframes.size === 1 && this._pendingStyles.size;
      this.duration || t
        ? (this.forwardTime(this.currentTime + e),
          t && this.snapshotCurrentStyles())
        : (this.startTime += e);
    }
    fork(e, t) {
      return (
        this.applyStylesToKeyframe(),
        new a(
          this._driver,
          e,
          t || this.currentTime,
          this._elementTimelineStylesLookup
        )
      );
    }
    _loadKeyframe() {
      this._currentKeyframe && (this._previousKeyframe = this._currentKeyframe),
        (this._currentKeyframe = this._keyframes.get(this.duration)),
        this._currentKeyframe ||
          ((this._currentKeyframe = new Map()),
          this._keyframes.set(this.duration, this._currentKeyframe));
    }
    forwardFrame() {
      (this.duration += ec), this._loadKeyframe();
    }
    forwardTime(e) {
      this.applyStylesToKeyframe(), (this.duration = e), this._loadKeyframe();
    }
    _updateStyle(e, t) {
      this._localTimelineStyles.set(e, t),
        this._globalTimelineStyles.set(e, t),
        this._styleSummary.set(e, { time: this.currentTime, value: t });
    }
    allowOnlyTimelineStyles() {
      return this._currentEmptyStepKeyframe !== this._currentKeyframe;
    }
    applyEmptyStep(e) {
      e && this._previousKeyframe.set("easing", e);
      for (let [t, r] of this._globalTimelineStyles)
        this._backFill.set(t, r || Je), this._currentKeyframe.set(t, Je);
      this._currentEmptyStepKeyframe = this._currentKeyframe;
    }
    setStyles(e, t, r, n) {
      t && this._previousKeyframe.set("easing", t);
      let s = (n && n.params) || {},
        i = ic(e, this._globalTimelineStyles);
      for (let [o, h] of i) {
        let c = dr(h, s, r);
        this._pendingStyles.set(o, c),
          this._localTimelineStyles.has(o) ||
            this._backFill.set(o, this._globalTimelineStyles.get(o) ?? Je),
          this._updateStyle(o, c);
      }
    }
    applyStylesToKeyframe() {
      this._pendingStyles.size != 0 &&
        (this._pendingStyles.forEach((e, t) => {
          this._currentKeyframe.set(t, e);
        }),
        this._pendingStyles.clear(),
        this._localTimelineStyles.forEach((e, t) => {
          this._currentKeyframe.has(t) || this._currentKeyframe.set(t, e);
        }));
    }
    snapshotCurrentStyles() {
      for (let [e, t] of this._localTimelineStyles)
        this._pendingStyles.set(e, t), this._updateStyle(e, t);
    }
    getFinalKeyframe() {
      return this._keyframes.get(this.duration);
    }
    get properties() {
      let e = [];
      for (let t in this._currentKeyframe) e.push(t);
      return e;
    }
    mergeTimelineCollectedStyles(e) {
      e._styleSummary.forEach((t, r) => {
        let n = this._styleSummary.get(r);
        (!n || t.time > n.time) && this._updateStyle(r, t.value);
      });
    }
    buildKeyframes() {
      this.applyStylesToKeyframe();
      let e = new Set(),
        t = new Set(),
        r = this._keyframes.size === 1 && this.duration === 0,
        n = [];
      this._keyframes.forEach((o, h) => {
        let c = new Map([...this._backFill, ...o]);
        c.forEach((_, g) => {
          _ === Qr ? e.add(g) : _ === Je && t.add(g);
        }),
          r || c.set("offset", h / this.duration),
          n.push(c);
      });
      let s = [...e.values()],
        i = [...t.values()];
      if (r) {
        let o = n[0],
          h = new Map(o);
        o.set("offset", 0), h.set("offset", 1), (n = [o, h]);
      }
      return ms(
        this.element,
        n,
        s,
        i,
        this.duration,
        this.startTime,
        this.easing,
        !1
      );
    }
  },
  ts = class extends an {
    constructor(e, t, r, n, s, i, o = !1) {
      super(e, t, i.delay),
        (this.keyframes = r),
        (this.preStyleProps = n),
        (this.postStyleProps = s),
        (this._stretchStartingKeyframe = o),
        (this.timings = {
          duration: i.duration,
          delay: i.delay,
          easing: i.easing,
        });
    }
    containsAnimation() {
      return this.keyframes.length > 1;
    }
    buildKeyframes() {
      let e = this.keyframes,
        { delay: t, duration: r, easing: n } = this.timings;
      if (this._stretchStartingKeyframe && t) {
        let s = [],
          i = r + t,
          o = t / i,
          h = new Map(e[0]);
        h.set("offset", 0), s.push(h);
        let c = new Map(e[0]);
        c.set("offset", Vi(o)), s.push(c);
        let _ = e.length - 1;
        for (let g = 1; g <= _; g++) {
          let b = new Map(e[g]),
            C = b.get("offset"),
            I = t + C * r;
          b.set("offset", Vi(I / i)), s.push(b);
        }
        (r = i), (t = 0), (n = ""), (e = s);
      }
      return ms(
        this.element,
        e,
        this.preStyleProps,
        this.postStyleProps,
        r,
        t,
        n,
        !0
      );
    }
  };
function Vi(a, e = 3) {
  let t = Math.pow(10, e - 1);
  return Math.round(a * t) / t;
}
function ic(a, e) {
  let t = new Map(),
    r;
  return (
    a.forEach((n) => {
      if (n === "*") {
        r ??= e.keys();
        for (let s of r) t.set(s, Je);
      } else for (let [s, i] of n) t.set(s, i);
    }),
    t
  );
}
function zi(a, e, t, r, n, s, i, o, h, c, _, g, b) {
  return {
    type: 0,
    element: a,
    triggerName: e,
    isRemovalTransition: n,
    fromState: t,
    fromStyles: s,
    toState: r,
    toStyles: i,
    timelines: o,
    queriedElements: h,
    preStyleProps: c,
    postStyleProps: _,
    totalTime: g,
    errors: b,
  };
}
var Vn = {},
  on = class {
    constructor(e, t, r) {
      (this._triggerName = e), (this.ast = t), (this._stateStyles = r);
    }
    match(e, t, r, n) {
      return ac(this.ast.matchers, e, t, r, n);
    }
    buildStyles(e, t, r) {
      let n = this._stateStyles.get("*");
      return (
        e !== void 0 && (n = this._stateStyles.get(e?.toString()) || n),
        n ? n.buildStyles(t, r) : new Map()
      );
    }
    build(e, t, r, n, s, i, o, h, c, _) {
      let g = [],
        b = (this.ast.options && this.ast.options.params) || Vn,
        C = (o && o.params) || Vn,
        I = this.buildStyles(r, C, g),
        M = (h && h.params) || Vn,
        G = this.buildStyles(n, M, g),
        P = new Set(),
        w = new Map(),
        v = new Map(),
        N = n === "void",
        y = { params: oa(M, b), delay: this.ast.options?.delay },
        ne = _ ? [] : aa(e, t, this.ast.animation, s, i, I, G, y, c, g),
        ee = 0;
      return (
        ne.forEach((oe) => {
          ee = Math.max(oe.duration + oe.delay, ee);
        }),
        g.length
          ? zi(t, this._triggerName, r, n, N, I, G, [], [], w, v, ee, g)
          : (ne.forEach((oe) => {
              let V = oe.element,
                L = Be(w, V, new Set());
              oe.preStyleProps.forEach((Q) => L.add(Q));
              let H = Be(v, V, new Set());
              oe.postStyleProps.forEach((Q) => H.add(Q)), V !== t && P.add(V);
            }),
            zi(
              t,
              this._triggerName,
              r,
              n,
              N,
              I,
              G,
              ne,
              [...P.values()],
              w,
              v,
              ee
            ))
      );
    }
  };
function ac(a, e, t, r, n) {
  return a.some((s) => s(e, t, r, n));
}
function oa(a, e) {
  let t = Gr({}, e);
  return (
    Object.entries(a).forEach(([r, n]) => {
      n != null && (t[r] = n);
    }),
    t
  );
}
var rs = class {
  constructor(e, t, r) {
    (this.styles = e), (this.defaultParams = t), (this.normalizer = r);
  }
  buildStyles(e, t) {
    let r = new Map(),
      n = oa(e, this.defaultParams);
    return (
      this.styles.styles.forEach((s) => {
        typeof s != "string" &&
          s.forEach((i, o) => {
            i && (i = dr(i, n, t));
            let h = this.normalizer.normalizePropertyName(o, t);
            (i = this.normalizer.normalizeStyleValue(o, h, i, t)), r.set(o, i);
          });
      }),
      r
    );
  }
};
function oc(a, e, t) {
  return new ns(a, e, t);
}
var ns = class {
  constructor(e, t, r) {
    (this.name = e),
      (this.ast = t),
      (this._normalizer = r),
      (this.transitionFactories = []),
      (this.states = new Map()),
      t.states.forEach((n) => {
        let s = (n.options && n.options.params) || {};
        this.states.set(n.name, new rs(n.style, s, r));
      }),
      Gi(this.states, "true", "1"),
      Gi(this.states, "false", "0"),
      t.transitions.forEach((n) => {
        this.transitionFactories.push(new on(e, n, this.states));
      }),
      (this.fallbackTransition = lc(e, this.states, this._normalizer));
  }
  get containsQueries() {
    return this.ast.queryCount > 0;
  }
  matchTransition(e, t, r, n) {
    return this.transitionFactories.find((i) => i.match(e, t, r, n)) || null;
  }
  matchStyles(e, t, r) {
    return this.fallbackTransition.buildStyles(e, t, r);
  }
};
function lc(a, e, t) {
  let r = [(i, o) => !0],
    n = { type: ce.Sequence, steps: [], options: null },
    s = {
      type: ce.Transition,
      animation: n,
      matchers: r,
      options: null,
      queryCount: 0,
      depCount: 0,
    };
  return new on(a, s, e);
}
function Gi(a, e, t) {
  a.has(e) ? a.has(t) || a.set(t, a.get(e)) : a.has(t) && a.set(e, a.get(t));
}
var cc = new pr(),
  ss = class {
    constructor(e, t, r) {
      (this.bodyNode = e),
        (this._driver = t),
        (this._normalizer = r),
        (this._animations = new Map()),
        (this._playersById = new Map()),
        (this.players = []);
    }
    register(e, t) {
      let r = [],
        n = [],
        s = ia(this._driver, t, r, n);
      if (r.length) throw Sl(r);
      n.length && void 0, this._animations.set(e, s);
    }
    _buildPlayer(e, t, r) {
      let n = e.element,
        s = Zi(this._normalizer, e.keyframes, t, r);
      return this._driver.animate(n, s, e.duration, e.delay, e.easing, [], !0);
    }
    create(e, t, r = {}) {
      let n = [],
        s = this._animations.get(e),
        i,
        o = new Map();
      if (
        (s
          ? ((i = aa(
              this._driver,
              t,
              s,
              ra,
              Wn,
              new Map(),
              new Map(),
              r,
              cc,
              n
            )),
            i.forEach((_) => {
              let g = Be(o, _.element, new Map());
              _.postStyleProps.forEach((b) => g.set(b, null));
            }))
          : (n.push(wl()), (i = [])),
        n.length)
      )
        throw Nl(n);
      o.forEach((_, g) => {
        _.forEach((b, C) => {
          _.set(C, this._driver.computeStyle(g, C, Je));
        });
      });
      let h = i.map((_) => {
          let g = o.get(_.element);
          return this._buildPlayer(_, new Map(), g);
        }),
        c = kt(h);
      return (
        this._playersById.set(e, c),
        c.onDestroy(() => this.destroy(e)),
        this.players.push(c),
        c
      );
    }
    destroy(e) {
      let t = this._getPlayer(e);
      t.destroy(), this._playersById.delete(e);
      let r = this.players.indexOf(t);
      r >= 0 && this.players.splice(r, 1);
    }
    _getPlayer(e) {
      let t = this._playersById.get(e);
      if (!t) throw Al(e);
      return t;
    }
    listen(e, t, r, n) {
      let s = us(t, "", "", "");
      return cs(this._getPlayer(e), r, s, n), () => {};
    }
    command(e, t, r, n) {
      if (r == "register") {
        this.register(e, n[0]);
        return;
      }
      if (r == "create") {
        let i = n[0] || {};
        this.create(e, t, i);
        return;
      }
      let s = this._getPlayer(e);
      switch (r) {
        case "play":
          s.play();
          break;
        case "pause":
          s.pause();
          break;
        case "reset":
          s.reset();
          break;
        case "restart":
          s.restart();
          break;
        case "finish":
          s.finish();
          break;
        case "init":
          s.init();
          break;
        case "setPosition":
          s.setPosition(parseFloat(n[0]));
          break;
        case "destroy":
          this.destroy(e);
          break;
      }
    }
  },
  Ki = "ng-animate-queued",
  uc = ".ng-animate-queued",
  zn = "ng-animate-disabled",
  hc = ".ng-animate-disabled",
  fc = "ng-star-inserted",
  dc = ".ng-star-inserted",
  pc = [],
  la = {
    namespaceId: "",
    setForRemoval: !1,
    setForMove: !1,
    hasAnimation: !1,
    removedBeforeQueried: !1,
  },
  mc = {
    namespaceId: "",
    setForMove: !1,
    setForRemoval: !1,
    hasAnimation: !1,
    removedBeforeQueried: !0,
  },
  We = "__ng_removed",
  mr = class {
    get params() {
      return this.options.params;
    }
    constructor(e, t = "") {
      this.namespaceId = t;
      let r = e && e.hasOwnProperty("value"),
        n = r ? e.value : e;
      if (((this.value = _c(n)), r)) {
        let s = e,
          { value: i } = s,
          o = ri(s, ["value"]);
        this.options = o;
      } else this.options = {};
      this.options.params || (this.options.params = {});
    }
    absorbOptions(e) {
      let t = e.params;
      if (t) {
        let r = this.options.params;
        Object.keys(t).forEach((n) => {
          r[n] == null && (r[n] = t[n]);
        });
      }
    }
  },
  fr = "void",
  Gn = new mr(fr),
  is = class {
    constructor(e, t, r) {
      (this.id = e),
        (this.hostElement = t),
        (this._engine = r),
        (this.players = []),
        (this._triggers = new Map()),
        (this._queue = []),
        (this._elementListeners = new Map()),
        (this._hostClassName = "ng-tns-" + e),
        ze(t, this._hostClassName);
    }
    listen(e, t, r, n) {
      if (!this._triggers.has(t)) throw Dl(r, t);
      if (r == null || r.length == 0) throw kl(t);
      if (!yc(r)) throw Cl(r, t);
      let s = Be(this._elementListeners, e, []),
        i = { name: t, phase: r, callback: n };
      s.push(i);
      let o = Be(this._engine.statesByElement, e, new Map());
      return (
        o.has(t) || (ze(e, $r), ze(e, $r + "-" + t), o.set(t, Gn)),
        () => {
          this._engine.afterFlush(() => {
            let h = s.indexOf(i);
            h >= 0 && s.splice(h, 1), this._triggers.has(t) || o.delete(t);
          });
        }
      );
    }
    register(e, t) {
      return this._triggers.has(e) ? !1 : (this._triggers.set(e, t), !0);
    }
    _getTrigger(e) {
      let t = this._triggers.get(e);
      if (!t) throw Ll(e);
      return t;
    }
    trigger(e, t, r, n = !0) {
      let s = this._getTrigger(t),
        i = new gr(this.id, t, e),
        o = this._engine.statesByElement.get(e);
      o ||
        (ze(e, $r),
        ze(e, $r + "-" + t),
        this._engine.statesByElement.set(e, (o = new Map())));
      let h = o.get(t),
        c = new mr(r, this.id);
      if (
        (!(r && r.hasOwnProperty("value")) && h && c.absorbOptions(h.options),
        o.set(t, c),
        h || (h = Gn),
        !(c.value === fr) && h.value === c.value)
      ) {
        if (!vc(h.params, c.params)) {
          let M = [],
            G = s.matchStyles(h.value, h.params, M),
            P = s.matchStyles(c.value, c.params, M);
          M.length
            ? this._engine.reportError(M)
            : this._engine.afterFlush(() => {
                jt(e, G), et(e, P);
              });
        }
        return;
      }
      let b = Be(this._engine.playersByElement, e, []);
      b.forEach((M) => {
        M.namespaceId == this.id &&
          M.triggerName == t &&
          M.queued &&
          M.destroy();
      });
      let C = s.matchTransition(h.value, c.value, e, c.params),
        I = !1;
      if (!C) {
        if (!n) return;
        (C = s.fallbackTransition), (I = !0);
      }
      return (
        this._engine.totalQueuedPlayers++,
        this._queue.push({
          element: e,
          triggerName: t,
          transition: C,
          fromState: h,
          toState: c,
          player: i,
          isFallbackTransition: I,
        }),
        I ||
          (ze(e, Ki),
          i.onStart(() => {
            Xt(e, Ki);
          })),
        i.onDone(() => {
          let M = this.players.indexOf(i);
          M >= 0 && this.players.splice(M, 1);
          let G = this._engine.playersByElement.get(e);
          if (G) {
            let P = G.indexOf(i);
            P >= 0 && G.splice(P, 1);
          }
        }),
        this.players.push(i),
        b.push(i),
        i
      );
    }
    deregister(e) {
      this._triggers.delete(e),
        this._engine.statesByElement.forEach((t) => t.delete(e)),
        this._elementListeners.forEach((t, r) => {
          this._elementListeners.set(
            r,
            t.filter((n) => n.name != e)
          );
        });
    }
    clearElementCache(e) {
      this._engine.statesByElement.delete(e), this._elementListeners.delete(e);
      let t = this._engine.playersByElement.get(e);
      t &&
        (t.forEach((r) => r.destroy()),
        this._engine.playersByElement.delete(e));
    }
    _signalRemovalForInnerTriggers(e, t) {
      let r = this._engine.driver.query(e, en, !0);
      r.forEach((n) => {
        if (n[We]) return;
        let s = this._engine.fetchNamespacesByElement(n);
        s.size
          ? s.forEach((i) => i.triggerLeaveAnimation(n, t, !1, !0))
          : this.clearElementCache(n);
      }),
        this._engine.afterFlushAnimationsDone(() =>
          r.forEach((n) => this.clearElementCache(n))
        );
    }
    triggerLeaveAnimation(e, t, r, n) {
      let s = this._engine.statesByElement.get(e),
        i = new Map();
      if (s) {
        let o = [];
        if (
          (s.forEach((h, c) => {
            if ((i.set(c, h.value), this._triggers.has(c))) {
              let _ = this.trigger(e, c, fr, n);
              _ && o.push(_);
            }
          }),
          o.length)
        )
          return (
            this._engine.markElementAsRemoved(this.id, e, !0, t, i),
            r && kt(o).onDone(() => this._engine.processLeaveNode(e)),
            !0
          );
      }
      return !1;
    }
    prepareLeaveAnimationListeners(e) {
      let t = this._elementListeners.get(e),
        r = this._engine.statesByElement.get(e);
      if (t && r) {
        let n = new Set();
        t.forEach((s) => {
          let i = s.name;
          if (n.has(i)) return;
          n.add(i);
          let h = this._triggers.get(i).fallbackTransition,
            c = r.get(i) || Gn,
            _ = new mr(fr),
            g = new gr(this.id, i, e);
          this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: e,
              triggerName: i,
              transition: h,
              fromState: c,
              toState: _,
              player: g,
              isFallbackTransition: !0,
            });
        });
      }
    }
    removeNode(e, t) {
      let r = this._engine;
      if (
        (e.childElementCount && this._signalRemovalForInnerTriggers(e, t),
        this.triggerLeaveAnimation(e, t, !0))
      )
        return;
      let n = !1;
      if (r.totalAnimations) {
        let s = r.players.length ? r.playersByQueriedElement.get(e) : [];
        if (s && s.length) n = !0;
        else {
          let i = e;
          for (; (i = i.parentNode); )
            if (r.statesByElement.get(i)) {
              n = !0;
              break;
            }
        }
      }
      if ((this.prepareLeaveAnimationListeners(e), n))
        r.markElementAsRemoved(this.id, e, !1, t);
      else {
        let s = e[We];
        (!s || s === la) &&
          (r.afterFlush(() => this.clearElementCache(e)),
          r.destroyInnerAnimations(e),
          r._onRemovalComplete(e, t));
      }
    }
    insertNode(e, t) {
      ze(e, this._hostClassName);
    }
    drainQueuedTransitions(e) {
      let t = [];
      return (
        this._queue.forEach((r) => {
          let n = r.player;
          if (n.destroyed) return;
          let s = r.element,
            i = this._elementListeners.get(s);
          i &&
            i.forEach((o) => {
              if (o.name == r.triggerName) {
                let h = us(
                  s,
                  r.triggerName,
                  r.fromState.value,
                  r.toState.value
                );
                (h._data = e), cs(r.player, o.phase, h, o.callback);
              }
            }),
            n.markedForDestroy
              ? this._engine.afterFlush(() => {
                  n.destroy();
                })
              : t.push(r);
        }),
        (this._queue = []),
        t.sort((r, n) => {
          let s = r.transition.ast.depCount,
            i = n.transition.ast.depCount;
          return s == 0 || i == 0
            ? s - i
            : this._engine.driver.containsElement(r.element, n.element)
              ? 1
              : -1;
        })
      );
    }
    destroy(e) {
      this.players.forEach((t) => t.destroy()),
        this._signalRemovalForInnerTriggers(this.hostElement, e);
    }
  },
  as = class {
    _onRemovalComplete(e, t) {
      this.onRemovalComplete(e, t);
    }
    constructor(e, t, r) {
      (this.bodyNode = e),
        (this.driver = t),
        (this._normalizer = r),
        (this.players = []),
        (this.newHostElements = new Map()),
        (this.playersByElement = new Map()),
        (this.playersByQueriedElement = new Map()),
        (this.statesByElement = new Map()),
        (this.disabledNodes = new Set()),
        (this.totalAnimations = 0),
        (this.totalQueuedPlayers = 0),
        (this._namespaceLookup = {}),
        (this._namespaceList = []),
        (this._flushFns = []),
        (this._whenQuietFns = []),
        (this.namespacesByHostElement = new Map()),
        (this.collectedEnterElements = []),
        (this.collectedLeaveElements = []),
        (this.onRemovalComplete = (n, s) => {});
    }
    get queuedPlayers() {
      let e = [];
      return (
        this._namespaceList.forEach((t) => {
          t.players.forEach((r) => {
            r.queued && e.push(r);
          });
        }),
        e
      );
    }
    createNamespace(e, t) {
      let r = new is(e, t, this);
      return (
        this.bodyNode && this.driver.containsElement(this.bodyNode, t)
          ? this._balanceNamespaceList(r, t)
          : (this.newHostElements.set(t, r), this.collectEnterElement(t)),
        (this._namespaceLookup[e] = r)
      );
    }
    _balanceNamespaceList(e, t) {
      let r = this._namespaceList,
        n = this.namespacesByHostElement;
      if (r.length - 1 >= 0) {
        let i = !1,
          o = this.driver.getParentElement(t);
        for (; o; ) {
          let h = n.get(o);
          if (h) {
            let c = r.indexOf(h);
            r.splice(c + 1, 0, e), (i = !0);
            break;
          }
          o = this.driver.getParentElement(o);
        }
        i || r.unshift(e);
      } else r.push(e);
      return n.set(t, e), e;
    }
    register(e, t) {
      let r = this._namespaceLookup[e];
      return r || (r = this.createNamespace(e, t)), r;
    }
    registerTrigger(e, t, r) {
      let n = this._namespaceLookup[e];
      n && n.register(t, r) && this.totalAnimations++;
    }
    destroy(e, t) {
      e &&
        (this.afterFlush(() => {}),
        this.afterFlushAnimationsDone(() => {
          let r = this._fetchNamespace(e);
          this.namespacesByHostElement.delete(r.hostElement);
          let n = this._namespaceList.indexOf(r);
          n >= 0 && this._namespaceList.splice(n, 1),
            r.destroy(t),
            delete this._namespaceLookup[e];
        }));
    }
    _fetchNamespace(e) {
      return this._namespaceLookup[e];
    }
    fetchNamespacesByElement(e) {
      let t = new Set(),
        r = this.statesByElement.get(e);
      if (r) {
        for (let n of r.values())
          if (n.namespaceId) {
            let s = this._fetchNamespace(n.namespaceId);
            s && t.add(s);
          }
      }
      return t;
    }
    trigger(e, t, r, n) {
      if (Zr(t)) {
        let s = this._fetchNamespace(e);
        if (s) return s.trigger(t, r, n), !0;
      }
      return !1;
    }
    insertNode(e, t, r, n) {
      if (!Zr(t)) return;
      let s = t[We];
      if (s && s.setForRemoval) {
        (s.setForRemoval = !1), (s.setForMove = !0);
        let i = this.collectedLeaveElements.indexOf(t);
        i >= 0 && this.collectedLeaveElements.splice(i, 1);
      }
      if (e) {
        let i = this._fetchNamespace(e);
        i && i.insertNode(t, r);
      }
      n && this.collectEnterElement(t);
    }
    collectEnterElement(e) {
      this.collectedEnterElements.push(e);
    }
    markElementAsDisabled(e, t) {
      t
        ? this.disabledNodes.has(e) || (this.disabledNodes.add(e), ze(e, zn))
        : this.disabledNodes.has(e) &&
          (this.disabledNodes.delete(e), Xt(e, zn));
    }
    removeNode(e, t, r) {
      if (Zr(t)) {
        let n = e ? this._fetchNamespace(e) : null;
        n ? n.removeNode(t, r) : this.markElementAsRemoved(e, t, !1, r);
        let s = this.namespacesByHostElement.get(t);
        s && s.id !== e && s.removeNode(t, r);
      } else this._onRemovalComplete(t, r);
    }
    markElementAsRemoved(e, t, r, n, s) {
      this.collectedLeaveElements.push(t),
        (t[We] = {
          namespaceId: e,
          setForRemoval: n,
          hasAnimation: r,
          removedBeforeQueried: !1,
          previousTriggersValues: s,
        });
    }
    listen(e, t, r, n, s) {
      return Zr(t) ? this._fetchNamespace(e).listen(t, r, n, s) : () => {};
    }
    _buildInstruction(e, t, r, n, s) {
      return e.transition.build(
        this.driver,
        e.element,
        e.fromState.value,
        e.toState.value,
        r,
        n,
        e.fromState.options,
        e.toState.options,
        t,
        s
      );
    }
    destroyInnerAnimations(e) {
      let t = this.driver.query(e, en, !0);
      t.forEach((r) => this.destroyActiveAnimationsForElement(r)),
        this.playersByQueriedElement.size != 0 &&
          ((t = this.driver.query(e, Qn, !0)),
          t.forEach((r) => this.finishActiveQueriedAnimationOnElement(r)));
    }
    destroyActiveAnimationsForElement(e) {
      let t = this.playersByElement.get(e);
      t &&
        t.forEach((r) => {
          r.queued ? (r.markedForDestroy = !0) : r.destroy();
        });
    }
    finishActiveQueriedAnimationOnElement(e) {
      let t = this.playersByQueriedElement.get(e);
      t && t.forEach((r) => r.finish());
    }
    whenRenderingDone() {
      return new Promise((e) => {
        if (this.players.length) return kt(this.players).onDone(() => e());
        e();
      });
    }
    processLeaveNode(e) {
      let t = e[We];
      if (t && t.setForRemoval) {
        if (((e[We] = la), t.namespaceId)) {
          this.destroyInnerAnimations(e);
          let r = this._fetchNamespace(t.namespaceId);
          r && r.clearElementCache(e);
        }
        this._onRemovalComplete(e, t.setForRemoval);
      }
      e.classList?.contains(zn) && this.markElementAsDisabled(e, !1),
        this.driver.query(e, hc, !0).forEach((r) => {
          this.markElementAsDisabled(r, !1);
        });
    }
    flush(e = -1) {
      let t = [];
      if (
        (this.newHostElements.size &&
          (this.newHostElements.forEach((r, n) =>
            this._balanceNamespaceList(r, n)
          ),
          this.newHostElements.clear()),
        this.totalAnimations && this.collectedEnterElements.length)
      )
        for (let r = 0; r < this.collectedEnterElements.length; r++) {
          let n = this.collectedEnterElements[r];
          ze(n, fc);
        }
      if (
        this._namespaceList.length &&
        (this.totalQueuedPlayers || this.collectedLeaveElements.length)
      ) {
        let r = [];
        try {
          t = this._flushAnimations(r, e);
        } finally {
          for (let n = 0; n < r.length; n++) r[n]();
        }
      } else
        for (let r = 0; r < this.collectedLeaveElements.length; r++) {
          let n = this.collectedLeaveElements[r];
          this.processLeaveNode(n);
        }
      if (
        ((this.totalQueuedPlayers = 0),
        (this.collectedEnterElements.length = 0),
        (this.collectedLeaveElements.length = 0),
        this._flushFns.forEach((r) => r()),
        (this._flushFns = []),
        this._whenQuietFns.length)
      ) {
        let r = this._whenQuietFns;
        (this._whenQuietFns = []),
          t.length
            ? kt(t).onDone(() => {
                r.forEach((n) => n());
              })
            : r.forEach((n) => n());
      }
    }
    reportError(e) {
      throw Ml(e);
    }
    _flushAnimations(e, t) {
      let r = new pr(),
        n = [],
        s = new Map(),
        i = [],
        o = new Map(),
        h = new Map(),
        c = new Map(),
        _ = new Set();
      this.disabledNodes.forEach((p) => {
        _.add(p);
        let S = this.driver.query(p, uc, !0);
        for (let k = 0; k < S.length; k++) _.add(S[k]);
      });
      let g = this.bodyNode,
        b = Array.from(this.statesByElement.keys()),
        C = $i(b, this.collectedEnterElements),
        I = new Map(),
        M = 0;
      C.forEach((p, S) => {
        let k = ra + M++;
        I.set(S, k), p.forEach((U) => ze(U, k));
      });
      let G = [],
        P = new Set(),
        w = new Set();
      for (let p = 0; p < this.collectedLeaveElements.length; p++) {
        let S = this.collectedLeaveElements[p],
          k = S[We];
        k &&
          k.setForRemoval &&
          (G.push(S),
          P.add(S),
          k.hasAnimation
            ? this.driver.query(S, dc, !0).forEach((U) => P.add(U))
            : w.add(S));
      }
      let v = new Map(),
        N = $i(b, Array.from(P));
      N.forEach((p, S) => {
        let k = Wn + M++;
        v.set(S, k), p.forEach((U) => ze(U, k));
      }),
        e.push(() => {
          C.forEach((p, S) => {
            let k = I.get(S);
            p.forEach((U) => Xt(U, k));
          }),
            N.forEach((p, S) => {
              let k = v.get(S);
              p.forEach((U) => Xt(U, k));
            }),
            G.forEach((p) => {
              this.processLeaveNode(p);
            });
        });
      let y = [],
        ne = [];
      for (let p = this._namespaceList.length - 1; p >= 0; p--)
        this._namespaceList[p].drainQueuedTransitions(t).forEach((k) => {
          let U = k.player,
            W = k.element;
          if ((y.push(U), this.collectedEnterElements.length)) {
            let Ce = W[We];
            if (Ce && Ce.setForMove) {
              if (
                Ce.previousTriggersValues &&
                Ce.previousTriggersValues.has(k.triggerName)
              ) {
                let tt = Ce.previousTriggersValues.get(k.triggerName),
                  xe = this.statesByElement.get(k.element);
                if (xe && xe.has(k.triggerName)) {
                  let Gt = xe.get(k.triggerName);
                  (Gt.value = tt), xe.set(k.triggerName, Gt);
                }
              }
              U.destroy();
              return;
            }
          }
          let ie = !g || !this.driver.containsElement(g, W),
            T = v.get(W),
            R = I.get(W),
            j = this._buildInstruction(k, r, R, T, ie);
          if (j.errors && j.errors.length) {
            ne.push(j);
            return;
          }
          if (ie) {
            U.onStart(() => jt(W, j.fromStyles)),
              U.onDestroy(() => et(W, j.toStyles)),
              n.push(U);
            return;
          }
          if (k.isFallbackTransition) {
            U.onStart(() => jt(W, j.fromStyles)),
              U.onDestroy(() => et(W, j.toStyles)),
              n.push(U);
            return;
          }
          let ue = [];
          j.timelines.forEach((Ce) => {
            (Ce.stretchStartingKeyframe = !0),
              this.disabledNodes.has(Ce.element) || ue.push(Ce);
          }),
            (j.timelines = ue),
            r.append(W, j.timelines);
          let Ie = { instruction: j, player: U, element: W };
          i.push(Ie),
            j.queriedElements.forEach((Ce) => Be(o, Ce, []).push(U)),
            j.preStyleProps.forEach((Ce, tt) => {
              if (Ce.size) {
                let xe = h.get(tt);
                xe || h.set(tt, (xe = new Set())),
                  Ce.forEach((Gt, Jt) => xe.add(Jt));
              }
            }),
            j.postStyleProps.forEach((Ce, tt) => {
              let xe = c.get(tt);
              xe || c.set(tt, (xe = new Set())),
                Ce.forEach((Gt, Jt) => xe.add(Jt));
            });
        });
      if (ne.length) {
        let p = [];
        ne.forEach((S) => {
          p.push(Rl(S.triggerName, S.errors));
        }),
          y.forEach((S) => S.destroy()),
          this.reportError(p);
      }
      let ee = new Map(),
        oe = new Map();
      i.forEach((p) => {
        let S = p.element;
        r.has(S) &&
          (oe.set(S, S),
          this._beforeAnimationBuild(p.player.namespaceId, p.instruction, ee));
      }),
        n.forEach((p) => {
          let S = p.element;
          this._getPreviousPlayers(
            S,
            !1,
            p.namespaceId,
            p.triggerName,
            null
          ).forEach((U) => {
            Be(ee, S, []).push(U), U.destroy();
          });
        });
      let V = G.filter((p) => Xi(p, h, c)),
        L = new Map();
      Qi(L, this.driver, w, c, Je).forEach((p) => {
        Xi(p, h, c) && V.push(p);
      });
      let Q = new Map();
      C.forEach((p, S) => {
        Qi(Q, this.driver, new Set(p), h, Qr);
      }),
        V.forEach((p) => {
          let S = L.get(p),
            k = Q.get(p);
          L.set(p, new Map([...(S?.entries() ?? []), ...(k?.entries() ?? [])]));
        });
      let m = [],
        d = [],
        f = {};
      i.forEach((p) => {
        let { element: S, player: k, instruction: U } = p;
        if (r.has(S)) {
          if (_.has(S)) {
            k.onDestroy(() => et(S, U.toStyles)),
              (k.disabled = !0),
              k.overrideTotalTime(U.totalTime),
              n.push(k);
            return;
          }
          let W = f;
          if (oe.size > 1) {
            let T = S,
              R = [];
            for (; (T = T.parentNode); ) {
              let j = oe.get(T);
              if (j) {
                W = j;
                break;
              }
              R.push(T);
            }
            R.forEach((j) => oe.set(j, W));
          }
          let ie = this._buildAnimation(k.namespaceId, U, ee, s, Q, L);
          if ((k.setRealPlayer(ie), W === f)) m.push(k);
          else {
            let T = this.playersByElement.get(W);
            T && T.length && (k.parentPlayer = kt(T)), n.push(k);
          }
        } else
          jt(S, U.fromStyles),
            k.onDestroy(() => et(S, U.toStyles)),
            d.push(k),
            _.has(S) && n.push(k);
      }),
        d.forEach((p) => {
          let S = s.get(p.element);
          if (S && S.length) {
            let k = kt(S);
            p.setRealPlayer(k);
          }
        }),
        n.forEach((p) => {
          p.parentPlayer ? p.syncPlayerEvents(p.parentPlayer) : p.destroy();
        });
      for (let p = 0; p < G.length; p++) {
        let S = G[p],
          k = S[We];
        if ((Xt(S, Wn), k && k.hasAnimation)) continue;
        let U = [];
        if (o.size) {
          let ie = o.get(S);
          ie && ie.length && U.push(...ie);
          let T = this.driver.query(S, Qn, !0);
          for (let R = 0; R < T.length; R++) {
            let j = o.get(T[R]);
            j && j.length && U.push(...j);
          }
        }
        let W = U.filter((ie) => !ie.destroyed);
        W.length ? bc(this, S, W) : this.processLeaveNode(S);
      }
      return (
        (G.length = 0),
        m.forEach((p) => {
          this.players.push(p),
            p.onDone(() => {
              p.destroy();
              let S = this.players.indexOf(p);
              this.players.splice(S, 1);
            }),
            p.play();
        }),
        m
      );
    }
    afterFlush(e) {
      this._flushFns.push(e);
    }
    afterFlushAnimationsDone(e) {
      this._whenQuietFns.push(e);
    }
    _getPreviousPlayers(e, t, r, n, s) {
      let i = [];
      if (t) {
        let o = this.playersByQueriedElement.get(e);
        o && (i = o);
      } else {
        let o = this.playersByElement.get(e);
        if (o) {
          let h = !s || s == fr;
          o.forEach((c) => {
            c.queued || (!h && c.triggerName != n) || i.push(c);
          });
        }
      }
      return (
        (r || n) &&
          (i = i.filter(
            (o) => !((r && r != o.namespaceId) || (n && n != o.triggerName))
          )),
        i
      );
    }
    _beforeAnimationBuild(e, t, r) {
      let n = t.triggerName,
        s = t.element,
        i = t.isRemovalTransition ? void 0 : e,
        o = t.isRemovalTransition ? void 0 : n;
      for (let h of t.timelines) {
        let c = h.element,
          _ = c !== s,
          g = Be(r, c, []);
        this._getPreviousPlayers(c, _, i, o, t.toState).forEach((C) => {
          let I = C.getRealPlayer();
          I.beforeDestroy && I.beforeDestroy(), C.destroy(), g.push(C);
        });
      }
      jt(s, t.fromStyles);
    }
    _buildAnimation(e, t, r, n, s, i) {
      let o = t.triggerName,
        h = t.element,
        c = [],
        _ = new Set(),
        g = new Set(),
        b = t.timelines.map((I) => {
          let M = I.element;
          _.add(M);
          let G = M[We];
          if (G && G.removedBeforeQueried) return new Dt(I.duration, I.delay);
          let P = M !== h,
            w = Ec((r.get(M) || pc).map((ee) => ee.getRealPlayer())).filter(
              (ee) => {
                let oe = ee;
                return oe.element ? oe.element === M : !1;
              }
            ),
            v = s.get(M),
            N = i.get(M),
            y = Zi(this._normalizer, I.keyframes, v, N),
            ne = this._buildPlayer(I, y, w);
          if ((I.subTimeline && n && g.add(M), P)) {
            let ee = new gr(e, o, M);
            ee.setRealPlayer(ne), c.push(ee);
          }
          return ne;
        });
      c.forEach((I) => {
        Be(this.playersByQueriedElement, I.element, []).push(I),
          I.onDone(() => gc(this.playersByQueriedElement, I.element, I));
      }),
        _.forEach((I) => ze(I, Bi));
      let C = kt(b);
      return (
        C.onDestroy(() => {
          _.forEach((I) => Xt(I, Bi)), et(h, t.toStyles);
        }),
        g.forEach((I) => {
          Be(n, I, []).push(C);
        }),
        C
      );
    }
    _buildPlayer(e, t, r) {
      return t.length > 0
        ? this.driver.animate(e.element, t, e.duration, e.delay, e.easing, r)
        : new Dt(e.duration, e.delay);
    }
  },
  gr = class {
    constructor(e, t, r) {
      (this.namespaceId = e),
        (this.triggerName = t),
        (this.element = r),
        (this._player = new Dt()),
        (this._containsRealPlayer = !1),
        (this._queuedCallbacks = new Map()),
        (this.destroyed = !1),
        (this.parentPlayer = null),
        (this.markedForDestroy = !1),
        (this.disabled = !1),
        (this.queued = !0),
        (this.totalTime = 0);
    }
    setRealPlayer(e) {
      this._containsRealPlayer ||
        ((this._player = e),
        this._queuedCallbacks.forEach((t, r) => {
          t.forEach((n) => cs(e, r, void 0, n));
        }),
        this._queuedCallbacks.clear(),
        (this._containsRealPlayer = !0),
        this.overrideTotalTime(e.totalTime),
        (this.queued = !1));
    }
    getRealPlayer() {
      return this._player;
    }
    overrideTotalTime(e) {
      this.totalTime = e;
    }
    syncPlayerEvents(e) {
      let t = this._player;
      t.triggerCallback && e.onStart(() => t.triggerCallback("start")),
        e.onDone(() => this.finish()),
        e.onDestroy(() => this.destroy());
    }
    _queueEvent(e, t) {
      Be(this._queuedCallbacks, e, []).push(t);
    }
    onDone(e) {
      this.queued && this._queueEvent("done", e), this._player.onDone(e);
    }
    onStart(e) {
      this.queued && this._queueEvent("start", e), this._player.onStart(e);
    }
    onDestroy(e) {
      this.queued && this._queueEvent("destroy", e), this._player.onDestroy(e);
    }
    init() {
      this._player.init();
    }
    hasStarted() {
      return this.queued ? !1 : this._player.hasStarted();
    }
    play() {
      !this.queued && this._player.play();
    }
    pause() {
      !this.queued && this._player.pause();
    }
    restart() {
      !this.queued && this._player.restart();
    }
    finish() {
      this._player.finish();
    }
    destroy() {
      (this.destroyed = !0), this._player.destroy();
    }
    reset() {
      !this.queued && this._player.reset();
    }
    setPosition(e) {
      this.queued || this._player.setPosition(e);
    }
    getPosition() {
      return this.queued ? 0 : this._player.getPosition();
    }
    triggerCallback(e) {
      let t = this._player;
      t.triggerCallback && t.triggerCallback(e);
    }
  };
function gc(a, e, t) {
  let r = a.get(e);
  if (r) {
    if (r.length) {
      let n = r.indexOf(t);
      r.splice(n, 1);
    }
    r.length == 0 && a.delete(e);
  }
  return r;
}
function _c(a) {
  return a ?? null;
}
function Zr(a) {
  return a && a.nodeType === 1;
}
function yc(a) {
  return a == "start" || a == "done";
}
function Wi(a, e) {
  let t = a.style.display;
  return (a.style.display = e ?? "none"), t;
}
function Qi(a, e, t, r, n) {
  let s = [];
  t.forEach((h) => s.push(Wi(h)));
  let i = [];
  r.forEach((h, c) => {
    let _ = new Map();
    h.forEach((g) => {
      let b = e.computeStyle(c, g, n);
      _.set(g, b), (!b || b.length == 0) && ((c[We] = mc), i.push(c));
    }),
      a.set(c, _);
  });
  let o = 0;
  return t.forEach((h) => Wi(h, s[o++])), i;
}
function $i(a, e) {
  let t = new Map();
  if ((a.forEach((o) => t.set(o, [])), e.length == 0)) return t;
  let r = 1,
    n = new Set(e),
    s = new Map();
  function i(o) {
    if (!o) return r;
    let h = s.get(o);
    if (h) return h;
    let c = o.parentNode;
    return t.has(c) ? (h = c) : n.has(c) ? (h = r) : (h = i(c)), s.set(o, h), h;
  }
  return (
    e.forEach((o) => {
      let h = i(o);
      h !== r && t.get(h).push(o);
    }),
    t
  );
}
function ze(a, e) {
  a.classList?.add(e);
}
function Xt(a, e) {
  a.classList?.remove(e);
}
function bc(a, e, t) {
  kt(t).onDone(() => a.processLeaveNode(e));
}
function Ec(a) {
  let e = [];
  return ca(a, e), e;
}
function ca(a, e) {
  for (let t = 0; t < a.length; t++) {
    let r = a[t];
    r instanceof ur ? ca(r.players, e) : e.push(r);
  }
}
function vc(a, e) {
  let t = Object.keys(a),
    r = Object.keys(e);
  if (t.length != r.length) return !1;
  for (let n = 0; n < t.length; n++) {
    let s = t[n];
    if (!e.hasOwnProperty(s) || a[s] !== e[s]) return !1;
  }
  return !0;
}
function Xi(a, e, t) {
  let r = t.get(a);
  if (!r) return !1;
  let n = e.get(a);
  return n ? r.forEach((s) => n.add(s)) : e.set(a, r), t.delete(a), !0;
}
var Yt = class {
  constructor(e, t, r) {
    (this._driver = t),
      (this._normalizer = r),
      (this._triggerCache = {}),
      (this.onRemovalComplete = (n, s) => {}),
      (this._transitionEngine = new as(e.body, t, r)),
      (this._timelineEngine = new ss(e.body, t, r)),
      (this._transitionEngine.onRemovalComplete = (n, s) =>
        this.onRemovalComplete(n, s));
  }
  registerTrigger(e, t, r, n, s) {
    let i = e + "-" + n,
      o = this._triggerCache[i];
    if (!o) {
      let h = [],
        c = [],
        _ = ia(this._driver, s, h, c);
      if (h.length) throw vl(n, h);
      c.length && void 0,
        (o = oc(n, _, this._normalizer)),
        (this._triggerCache[i] = o);
    }
    this._transitionEngine.registerTrigger(t, n, o);
  }
  register(e, t) {
    this._transitionEngine.register(e, t);
  }
  destroy(e, t) {
    this._transitionEngine.destroy(e, t);
  }
  onInsert(e, t, r, n) {
    this._transitionEngine.insertNode(e, t, r, n);
  }
  onRemove(e, t, r) {
    this._transitionEngine.removeNode(e, t, r);
  }
  disableAnimations(e, t) {
    this._transitionEngine.markElementAsDisabled(e, t);
  }
  process(e, t, r, n) {
    if (r.charAt(0) == "@") {
      let [s, i] = qi(r),
        o = n;
      this._timelineEngine.command(s, t, i, o);
    } else this._transitionEngine.trigger(e, t, r, n);
  }
  listen(e, t, r, n, s) {
    if (r.charAt(0) == "@") {
      let [i, o] = qi(r);
      return this._timelineEngine.listen(i, t, o, s);
    }
    return this._transitionEngine.listen(e, t, r, n, s);
  }
  flush(e = -1) {
    this._transitionEngine.flush(e);
  }
  get players() {
    return [...this._transitionEngine.players, ...this._timelineEngine.players];
  }
  whenRenderingDone() {
    return this._transitionEngine.whenRenderingDone();
  }
  afterFlushAnimationsDone(e) {
    this._transitionEngine.afterFlushAnimationsDone(e);
  }
};
function Tc(a, e) {
  let t = null,
    r = null;
  return (
    Array.isArray(e) && e.length
      ? ((t = Kn(e[0])), e.length > 1 && (r = Kn(e[e.length - 1])))
      : e instanceof Map && (t = Kn(e)),
    t || r ? new os(a, t, r) : null
  );
}
var os = class a {
  static {
    this.initialStylesByElement = new WeakMap();
  }
  constructor(e, t, r) {
    (this._element = e),
      (this._startStyles = t),
      (this._endStyles = r),
      (this._state = 0);
    let n = a.initialStylesByElement.get(e);
    n || a.initialStylesByElement.set(e, (n = new Map())),
      (this._initialStyles = n);
  }
  start() {
    this._state < 1 &&
      (this._startStyles &&
        et(this._element, this._startStyles, this._initialStyles),
      (this._state = 1));
  }
  finish() {
    this.start(),
      this._state < 2 &&
        (et(this._element, this._initialStyles),
        this._endStyles &&
          (et(this._element, this._endStyles), (this._endStyles = null)),
        (this._state = 1));
  }
  destroy() {
    this.finish(),
      this._state < 3 &&
        (a.initialStylesByElement.delete(this._element),
        this._startStyles &&
          (jt(this._element, this._startStyles), (this._endStyles = null)),
        this._endStyles &&
          (jt(this._element, this._endStyles), (this._endStyles = null)),
        et(this._element, this._initialStyles),
        (this._state = 3));
  }
};
function Kn(a) {
  let e = null;
  return (
    a.forEach((t, r) => {
      Sc(r) && ((e = e || new Map()), e.set(r, t));
    }),
    e
  );
}
function Sc(a) {
  return a === "display" || a === "position";
}
var ln = class {
    constructor(e, t, r, n) {
      (this.element = e),
        (this.keyframes = t),
        (this.options = r),
        (this._specialStyles = n),
        (this._onDoneFns = []),
        (this._onStartFns = []),
        (this._onDestroyFns = []),
        (this._initialized = !1),
        (this._finished = !1),
        (this._started = !1),
        (this._destroyed = !1),
        (this._originalOnDoneFns = []),
        (this._originalOnStartFns = []),
        (this.time = 0),
        (this.parentPlayer = null),
        (this.currentSnapshot = new Map()),
        (this._duration = r.duration),
        (this._delay = r.delay || 0),
        (this.time = this._duration + this._delay);
    }
    _onFinish() {
      this._finished ||
        ((this._finished = !0),
        this._onDoneFns.forEach((e) => e()),
        (this._onDoneFns = []));
    }
    init() {
      this._buildPlayer(), this._preparePlayerBeforeStart();
    }
    _buildPlayer() {
      if (this._initialized) return;
      this._initialized = !0;
      let e = this.keyframes;
      (this.domPlayer = this._triggerWebAnimation(
        this.element,
        e,
        this.options
      )),
        (this._finalKeyframe = e.length ? e[e.length - 1] : new Map());
      let t = () => this._onFinish();
      this.domPlayer.addEventListener("finish", t),
        this.onDestroy(() => {
          this.domPlayer.removeEventListener("finish", t);
        });
    }
    _preparePlayerBeforeStart() {
      this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
    }
    _convertKeyframesToObject(e) {
      let t = [];
      return (
        e.forEach((r) => {
          t.push(Object.fromEntries(r));
        }),
        t
      );
    }
    _triggerWebAnimation(e, t, r) {
      return e.animate(this._convertKeyframesToObject(t), r);
    }
    onStart(e) {
      this._originalOnStartFns.push(e), this._onStartFns.push(e);
    }
    onDone(e) {
      this._originalOnDoneFns.push(e), this._onDoneFns.push(e);
    }
    onDestroy(e) {
      this._onDestroyFns.push(e);
    }
    play() {
      this._buildPlayer(),
        this.hasStarted() ||
          (this._onStartFns.forEach((e) => e()),
          (this._onStartFns = []),
          (this._started = !0),
          this._specialStyles && this._specialStyles.start()),
        this.domPlayer.play();
    }
    pause() {
      this.init(), this.domPlayer.pause();
    }
    finish() {
      this.init(),
        this._specialStyles && this._specialStyles.finish(),
        this._onFinish(),
        this.domPlayer.finish();
    }
    reset() {
      this._resetDomPlayerState(),
        (this._destroyed = !1),
        (this._finished = !1),
        (this._started = !1),
        (this._onStartFns = this._originalOnStartFns),
        (this._onDoneFns = this._originalOnDoneFns);
    }
    _resetDomPlayerState() {
      this.domPlayer && this.domPlayer.cancel();
    }
    restart() {
      this.reset(), this.play();
    }
    hasStarted() {
      return this._started;
    }
    destroy() {
      this._destroyed ||
        ((this._destroyed = !0),
        this._resetDomPlayerState(),
        this._onFinish(),
        this._specialStyles && this._specialStyles.destroy(),
        this._onDestroyFns.forEach((e) => e()),
        (this._onDestroyFns = []));
    }
    setPosition(e) {
      this.domPlayer === void 0 && this.init(),
        (this.domPlayer.currentTime = e * this.time);
    }
    getPosition() {
      return +(this.domPlayer.currentTime ?? 0) / this.time;
    }
    get totalTime() {
      return this._delay + this._duration;
    }
    beforeDestroy() {
      let e = new Map();
      this.hasStarted() &&
        this._finalKeyframe.forEach((r, n) => {
          n !== "offset" && e.set(n, this._finished ? r : ps(this.element, n));
        }),
        (this.currentSnapshot = e);
    }
    triggerCallback(e) {
      let t = e === "start" ? this._onStartFns : this._onDoneFns;
      t.forEach((r) => r()), (t.length = 0);
    }
  },
  cn = class {
    validateStyleProperty(e) {
      return !0;
    }
    validateAnimatableStyleProperty(e) {
      return !0;
    }
    containsElement(e, t) {
      return Ji(e, t);
    }
    getParentElement(e) {
      return hs(e);
    }
    query(e, t, r) {
      return ea(e, t, r);
    }
    computeStyle(e, t, r) {
      return ps(e, t);
    }
    animate(e, t, r, n, s, i = []) {
      let o = n == 0 ? "both" : "forwards",
        h = { duration: r, delay: n, fill: o };
      s && (h.easing = s);
      let c = new Map(),
        _ = i.filter((C) => C instanceof ln);
      Vl(r, n) &&
        _.forEach((C) => {
          C.currentSnapshot.forEach((I, M) => c.set(M, I));
        });
      let g = Bl(t).map((C) => new Map(C));
      g = zl(e, g, c);
      let b = Tc(e, g);
      return new ln(e, g, h, b);
    }
  };
var Jr = "@",
  ua = "@.disabled",
  un = class {
    constructor(e, t, r, n) {
      (this.namespaceId = e),
        (this.delegate = t),
        (this.engine = r),
        (this._onDestroy = n),
        (this.ɵtype = 0);
    }
    get data() {
      return this.delegate.data;
    }
    destroyNode(e) {
      this.delegate.destroyNode?.(e);
    }
    destroy() {
      this.engine.destroy(this.namespaceId, this.delegate),
        this.engine.afterFlushAnimationsDone(() => {
          queueMicrotask(() => {
            this.delegate.destroy();
          });
        }),
        this._onDestroy?.();
    }
    createElement(e, t) {
      return this.delegate.createElement(e, t);
    }
    createComment(e) {
      return this.delegate.createComment(e);
    }
    createText(e) {
      return this.delegate.createText(e);
    }
    appendChild(e, t) {
      this.delegate.appendChild(e, t),
        this.engine.onInsert(this.namespaceId, t, e, !1);
    }
    insertBefore(e, t, r, n = !0) {
      this.delegate.insertBefore(e, t, r),
        this.engine.onInsert(this.namespaceId, t, e, n);
    }
    removeChild(e, t, r) {
      this.parentNode(t) &&
        this.engine.onRemove(this.namespaceId, t, this.delegate);
    }
    selectRootElement(e, t) {
      return this.delegate.selectRootElement(e, t);
    }
    parentNode(e) {
      return this.delegate.parentNode(e);
    }
    nextSibling(e) {
      return this.delegate.nextSibling(e);
    }
    setAttribute(e, t, r, n) {
      this.delegate.setAttribute(e, t, r, n);
    }
    removeAttribute(e, t, r) {
      this.delegate.removeAttribute(e, t, r);
    }
    addClass(e, t) {
      this.delegate.addClass(e, t);
    }
    removeClass(e, t) {
      this.delegate.removeClass(e, t);
    }
    setStyle(e, t, r, n) {
      this.delegate.setStyle(e, t, r, n);
    }
    removeStyle(e, t, r) {
      this.delegate.removeStyle(e, t, r);
    }
    setProperty(e, t, r) {
      t.charAt(0) == Jr && t == ua
        ? this.disableAnimations(e, !!r)
        : this.delegate.setProperty(e, t, r);
    }
    setValue(e, t) {
      this.delegate.setValue(e, t);
    }
    listen(e, t, r) {
      return this.delegate.listen(e, t, r);
    }
    disableAnimations(e, t) {
      this.engine.disableAnimations(e, t);
    }
  },
  ls = class extends un {
    constructor(e, t, r, n, s) {
      super(t, r, n, s), (this.factory = e), (this.namespaceId = t);
    }
    setProperty(e, t, r) {
      t.charAt(0) == Jr
        ? t.charAt(1) == "." && t == ua
          ? ((r = r === void 0 ? !0 : !!r), this.disableAnimations(e, r))
          : this.engine.process(this.namespaceId, e, t.slice(1), r)
        : this.delegate.setProperty(e, t, r);
    }
    listen(e, t, r) {
      if (t.charAt(0) == Jr) {
        let n = wc(e),
          s = t.slice(1),
          i = "";
        return (
          s.charAt(0) != Jr && ([s, i] = Nc(s)),
          this.engine.listen(this.namespaceId, n, s, i, (o) => {
            let h = o._data || -1;
            this.factory.scheduleListenerCallback(h, r, o);
          })
        );
      }
      return this.delegate.listen(e, t, r);
    }
  };
function wc(a) {
  switch (a) {
    case "body":
      return document.body;
    case "document":
      return document;
    case "window":
      return window;
    default:
      return a;
  }
}
function Nc(a) {
  let e = a.indexOf("."),
    t = a.substring(0, e),
    r = a.slice(e + 1);
  return [t, r];
}
var hn = class {
  constructor(e, t, r) {
    (this.delegate = e),
      (this.engine = t),
      (this._zone = r),
      (this._currentId = 0),
      (this._microtaskId = 1),
      (this._animationCallbacksBuffer = []),
      (this._rendererCache = new Map()),
      (this._cdRecurDepth = 0),
      (t.onRemovalComplete = (n, s) => {
        s?.removeChild(null, n);
      });
  }
  createRenderer(e, t) {
    let r = "",
      n = this.delegate.createRenderer(e, t);
    if (!e || !t?.data?.animation) {
      let c = this._rendererCache,
        _ = c.get(n);
      if (!_) {
        let g = () => c.delete(n);
        (_ = new un(r, n, this.engine, g)), c.set(n, _);
      }
      return _;
    }
    let s = t.id,
      i = t.id + "-" + this._currentId;
    this._currentId++, this.engine.register(i, e);
    let o = (c) => {
      Array.isArray(c)
        ? c.forEach(o)
        : this.engine.registerTrigger(s, i, e, c.name, c);
    };
    return t.data.animation.forEach(o), new ls(this, i, n, this.engine);
  }
  begin() {
    this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
  }
  _scheduleCountTask() {
    queueMicrotask(() => {
      this._microtaskId++;
    });
  }
  scheduleListenerCallback(e, t, r) {
    if (e >= 0 && e < this._microtaskId) {
      this._zone.run(() => t(r));
      return;
    }
    let n = this._animationCallbacksBuffer;
    n.length == 0 &&
      queueMicrotask(() => {
        this._zone.run(() => {
          n.forEach((s) => {
            let [i, o] = s;
            i(o);
          }),
            (this._animationCallbacksBuffer = []);
        });
      }),
      n.push([t, r]);
  }
  end() {
    this._cdRecurDepth--,
      this._cdRecurDepth == 0 &&
        this._zone.runOutsideAngular(() => {
          this._scheduleCountTask(), this.engine.flush(this._microtaskId);
        }),
      this.delegate.end && this.delegate.end();
  }
  whenRenderingDone() {
    return this.engine.whenRenderingDone();
  }
};
var Lc = (() => {
  class a extends Yt {
    constructor(t, r, n) {
      super(t, r, n);
    }
    ngOnDestroy() {
      this.flush();
    }
    static {
      this.ɵfac = function (r) {
        return new (r || a)(ut(Ze), ut(Vt), ut(zt));
      };
    }
    static {
      this.ɵprov = ct({ token: a, factory: a.ɵfac });
    }
  }
  return a;
})();
function Mc() {
  return new rn();
}
function Rc(a, e, t) {
  return new hn(a, e, t);
}
var ha = [
    { provide: zt, useFactory: Mc },
    { provide: Yt, useClass: Lc },
    { provide: gi, useFactory: Rc, deps: [xi, Yt, li] },
  ],
  Mu = [
    { provide: Vt, useFactory: () => new cn() },
    { provide: qn, useValue: "BrowserAnimations" },
    ...ha,
  ],
  Ic = [
    { provide: Vt, useClass: fs },
    { provide: qn, useValue: "NoopAnimations" },
    ...ha,
  ];
function fa() {
  return [...Ic];
}
var Oc = Object.getOwnPropertyNames,
  J = (a, e) =>
    function () {
      return e || (0, a[Oc(a)[0]])((e = { exports: {} }).exports, e), e.exports;
    },
  _r = J({
    "external/npm/node_modules/domino/lib/Event.js"(a, e) {
      "use strict";
      (e.exports = t),
        (t.CAPTURING_PHASE = 1),
        (t.AT_TARGET = 2),
        (t.BUBBLING_PHASE = 3);
      function t(r, n) {
        if (
          ((this.type = ""),
          (this.target = null),
          (this.currentTarget = null),
          (this.eventPhase = t.AT_TARGET),
          (this.bubbles = !1),
          (this.cancelable = !1),
          (this.isTrusted = !1),
          (this.defaultPrevented = !1),
          (this.timeStamp = Date.now()),
          (this._propagationStopped = !1),
          (this._immediatePropagationStopped = !1),
          (this._initialized = !0),
          (this._dispatching = !1),
          r && (this.type = r),
          n)
        )
          for (var s in n) this[s] = n[s];
      }
      t.prototype = Object.create(Object.prototype, {
        constructor: { value: t },
        stopPropagation: {
          value: function () {
            this._propagationStopped = !0;
          },
        },
        stopImmediatePropagation: {
          value: function () {
            (this._propagationStopped = !0),
              (this._immediatePropagationStopped = !0);
          },
        },
        preventDefault: {
          value: function () {
            this.cancelable && (this.defaultPrevented = !0);
          },
        },
        initEvent: {
          value: function (n, s, i) {
            (this._initialized = !0),
              !this._dispatching &&
                ((this._propagationStopped = !1),
                (this._immediatePropagationStopped = !1),
                (this.defaultPrevented = !1),
                (this.isTrusted = !1),
                (this.target = null),
                (this.type = n),
                (this.bubbles = s),
                (this.cancelable = i));
          },
        },
      });
    },
  }),
  ga = J({
    "external/npm/node_modules/domino/lib/UIEvent.js"(a, e) {
      "use strict";
      var t = _r();
      e.exports = r;
      function r() {
        t.call(this), (this.view = null), (this.detail = 0);
      }
      r.prototype = Object.create(t.prototype, {
        constructor: { value: r },
        initUIEvent: {
          value: function (n, s, i, o, h) {
            this.initEvent(n, s, i), (this.view = o), (this.detail = h);
          },
        },
      });
    },
  }),
  _a = J({
    "external/npm/node_modules/domino/lib/MouseEvent.js"(a, e) {
      "use strict";
      var t = ga();
      e.exports = r;
      function r() {
        t.call(this),
          (this.screenX = this.screenY = this.clientX = this.clientY = 0),
          (this.ctrlKey = this.altKey = this.shiftKey = this.metaKey = !1),
          (this.button = 0),
          (this.buttons = 1),
          (this.relatedTarget = null);
      }
      r.prototype = Object.create(t.prototype, {
        constructor: { value: r },
        initMouseEvent: {
          value: function (n, s, i, o, h, c, _, g, b, C, I, M, G, P, w) {
            switch (
              (this.initEvent(n, s, i, o, h),
              (this.screenX = c),
              (this.screenY = _),
              (this.clientX = g),
              (this.clientY = b),
              (this.ctrlKey = C),
              (this.altKey = I),
              (this.shiftKey = M),
              (this.metaKey = G),
              (this.button = P),
              P)
            ) {
              case 0:
                this.buttons = 1;
                break;
              case 1:
                this.buttons = 4;
                break;
              case 2:
                this.buttons = 2;
                break;
              default:
                this.buttons = 0;
                break;
            }
            this.relatedTarget = w;
          },
        },
        getModifierState: {
          value: function (n) {
            switch (n) {
              case "Alt":
                return this.altKey;
              case "Control":
                return this.ctrlKey;
              case "Shift":
                return this.shiftKey;
              case "Meta":
                return this.metaKey;
              default:
                return !1;
            }
          },
        },
      });
    },
  }),
  _s = J({
    "external/npm/node_modules/domino/lib/DOMException.js"(a, e) {
      "use strict";
      e.exports = L;
      var t = 1,
        r = 3,
        n = 4,
        s = 5,
        i = 7,
        o = 8,
        h = 9,
        c = 11,
        _ = 12,
        g = 13,
        b = 14,
        C = 15,
        I = 17,
        M = 18,
        G = 19,
        P = 20,
        w = 21,
        v = 22,
        N = 23,
        y = 24,
        ne = 25,
        ee = [
          null,
          "INDEX_SIZE_ERR",
          null,
          "HIERARCHY_REQUEST_ERR",
          "WRONG_DOCUMENT_ERR",
          "INVALID_CHARACTER_ERR",
          null,
          "NO_MODIFICATION_ALLOWED_ERR",
          "NOT_FOUND_ERR",
          "NOT_SUPPORTED_ERR",
          "INUSE_ATTRIBUTE_ERR",
          "INVALID_STATE_ERR",
          "SYNTAX_ERR",
          "INVALID_MODIFICATION_ERR",
          "NAMESPACE_ERR",
          "INVALID_ACCESS_ERR",
          null,
          "TYPE_MISMATCH_ERR",
          "SECURITY_ERR",
          "NETWORK_ERR",
          "ABORT_ERR",
          "URL_MISMATCH_ERR",
          "QUOTA_EXCEEDED_ERR",
          "TIMEOUT_ERR",
          "INVALID_NODE_TYPE_ERR",
          "DATA_CLONE_ERR",
        ],
        oe = [
          null,
          "INDEX_SIZE_ERR (1): the index is not in the allowed range",
          null,
          "HIERARCHY_REQUEST_ERR (3): the operation would yield an incorrect nodes model",
          "WRONG_DOCUMENT_ERR (4): the object is in the wrong Document, a call to importNode is required",
          "INVALID_CHARACTER_ERR (5): the string contains invalid characters",
          null,
          "NO_MODIFICATION_ALLOWED_ERR (7): the object can not be modified",
          "NOT_FOUND_ERR (8): the object can not be found here",
          "NOT_SUPPORTED_ERR (9): this operation is not supported",
          "INUSE_ATTRIBUTE_ERR (10): setAttributeNode called on owned Attribute",
          "INVALID_STATE_ERR (11): the object is in an invalid state",
          "SYNTAX_ERR (12): the string did not match the expected pattern",
          "INVALID_MODIFICATION_ERR (13): the object can not be modified in this way",
          "NAMESPACE_ERR (14): the operation is not allowed by Namespaces in XML",
          "INVALID_ACCESS_ERR (15): the object does not support the operation or argument",
          null,
          "TYPE_MISMATCH_ERR (17): the type of the object does not match the expected type",
          "SECURITY_ERR (18): the operation is insecure",
          "NETWORK_ERR (19): a network error occurred",
          "ABORT_ERR (20): the user aborted an operation",
          "URL_MISMATCH_ERR (21): the given URL does not match another URL",
          "QUOTA_EXCEEDED_ERR (22): the quota has been exceeded",
          "TIMEOUT_ERR (23): a timeout occurred",
          "INVALID_NODE_TYPE_ERR (24): the supplied node is invalid or has an invalid ancestor for this operation",
          "DATA_CLONE_ERR (25): the object can not be cloned.",
        ],
        V = {
          INDEX_SIZE_ERR: t,
          DOMSTRING_SIZE_ERR: 2,
          HIERARCHY_REQUEST_ERR: r,
          WRONG_DOCUMENT_ERR: n,
          INVALID_CHARACTER_ERR: s,
          NO_DATA_ALLOWED_ERR: 6,
          NO_MODIFICATION_ALLOWED_ERR: i,
          NOT_FOUND_ERR: o,
          NOT_SUPPORTED_ERR: h,
          INUSE_ATTRIBUTE_ERR: 10,
          INVALID_STATE_ERR: c,
          SYNTAX_ERR: _,
          INVALID_MODIFICATION_ERR: g,
          NAMESPACE_ERR: b,
          INVALID_ACCESS_ERR: C,
          VALIDATION_ERR: 16,
          TYPE_MISMATCH_ERR: I,
          SECURITY_ERR: M,
          NETWORK_ERR: G,
          ABORT_ERR: P,
          URL_MISMATCH_ERR: w,
          QUOTA_EXCEEDED_ERR: v,
          TIMEOUT_ERR: N,
          INVALID_NODE_TYPE_ERR: y,
          DATA_CLONE_ERR: ne,
        };
      function L(m) {
        Error.call(this),
          Error.captureStackTrace(this, this.constructor),
          (this.code = m),
          (this.message = oe[m]),
          (this.name = ee[m]);
      }
      L.prototype.__proto__ = Error.prototype;
      for (Q in V)
        (H = { value: V[Q] }),
          Object.defineProperty(L, Q, H),
          Object.defineProperty(L.prototype, Q, H);
      var H, Q;
    },
  }),
  ys = J({
    "external/npm/node_modules/domino/lib/config.js"(a) {
      a.isApiWritable = !globalThis.__domino_frozen__;
    },
  }),
  ke = J({
    "external/npm/node_modules/domino/lib/utils.js"(a) {
      "use strict";
      var e = _s(),
        t = e,
        r = ys().isApiWritable;
      (a.NAMESPACE = {
        HTML: "http://www.w3.org/1999/xhtml",
        XML: "http://www.w3.org/XML/1998/namespace",
        XMLNS: "http://www.w3.org/2000/xmlns/",
        MATHML: "http://www.w3.org/1998/Math/MathML",
        SVG: "http://www.w3.org/2000/svg",
        XLINK: "http://www.w3.org/1999/xlink",
      }),
        (a.IndexSizeError = function () {
          throw new e(t.INDEX_SIZE_ERR);
        }),
        (a.HierarchyRequestError = function () {
          throw new e(t.HIERARCHY_REQUEST_ERR);
        }),
        (a.WrongDocumentError = function () {
          throw new e(t.WRONG_DOCUMENT_ERR);
        }),
        (a.InvalidCharacterError = function () {
          throw new e(t.INVALID_CHARACTER_ERR);
        }),
        (a.NoModificationAllowedError = function () {
          throw new e(t.NO_MODIFICATION_ALLOWED_ERR);
        }),
        (a.NotFoundError = function () {
          throw new e(t.NOT_FOUND_ERR);
        }),
        (a.NotSupportedError = function () {
          throw new e(t.NOT_SUPPORTED_ERR);
        }),
        (a.InvalidStateError = function () {
          throw new e(t.INVALID_STATE_ERR);
        }),
        (a.SyntaxError = function () {
          throw new e(t.SYNTAX_ERR);
        }),
        (a.InvalidModificationError = function () {
          throw new e(t.INVALID_MODIFICATION_ERR);
        }),
        (a.NamespaceError = function () {
          throw new e(t.NAMESPACE_ERR);
        }),
        (a.InvalidAccessError = function () {
          throw new e(t.INVALID_ACCESS_ERR);
        }),
        (a.TypeMismatchError = function () {
          throw new e(t.TYPE_MISMATCH_ERR);
        }),
        (a.SecurityError = function () {
          throw new e(t.SECURITY_ERR);
        }),
        (a.NetworkError = function () {
          throw new e(t.NETWORK_ERR);
        }),
        (a.AbortError = function () {
          throw new e(t.ABORT_ERR);
        }),
        (a.UrlMismatchError = function () {
          throw new e(t.URL_MISMATCH_ERR);
        }),
        (a.QuotaExceededError = function () {
          throw new e(t.QUOTA_EXCEEDED_ERR);
        }),
        (a.TimeoutError = function () {
          throw new e(t.TIMEOUT_ERR);
        }),
        (a.InvalidNodeTypeError = function () {
          throw new e(t.INVALID_NODE_TYPE_ERR);
        }),
        (a.DataCloneError = function () {
          throw new e(t.DATA_CLONE_ERR);
        }),
        (a.nyi = function () {
          throw new Error("NotYetImplemented");
        }),
        (a.shouldOverride = function () {
          throw new Error(
            "Abstract function; should be overriding in subclass."
          );
        }),
        (a.assert = function (n, s) {
          if (!n)
            throw new Error(
              "Assertion failed: " +
                (s || "") +
                `
` +
                new Error().stack
            );
        }),
        (a.expose = function (n, s) {
          for (var i in n)
            Object.defineProperty(s.prototype, i, { value: n[i], writable: r });
        }),
        (a.merge = function (n, s) {
          for (var i in s) n[i] = s[i];
        }),
        (a.documentOrder = function (n, s) {
          return 3 - (n.compareDocumentPosition(s) & 6);
        }),
        (a.toASCIILowerCase = function (n) {
          return n.replace(/[A-Z]+/g, function (s) {
            return s.toLowerCase();
          });
        }),
        (a.toASCIIUpperCase = function (n) {
          return n.replace(/[a-z]+/g, function (s) {
            return s.toUpperCase();
          });
        });
    },
  }),
  ya = J({
    "external/npm/node_modules/domino/lib/EventTarget.js"(a, e) {
      "use strict";
      var t = _r(),
        r = _a(),
        n = ke();
      e.exports = s;
      function s() {}
      s.prototype = {
        addEventListener: function (o, h, c) {
          if (h) {
            c === void 0 && (c = !1),
              this._listeners || (this._listeners = Object.create(null)),
              this._listeners[o] || (this._listeners[o] = []);
            for (var _ = this._listeners[o], g = 0, b = _.length; g < b; g++) {
              var C = _[g];
              if (C.listener === h && C.capture === c) return;
            }
            var I = { listener: h, capture: c };
            typeof h == "function" && (I.f = h), _.push(I);
          }
        },
        removeEventListener: function (o, h, c) {
          if ((c === void 0 && (c = !1), this._listeners)) {
            var _ = this._listeners[o];
            if (_)
              for (var g = 0, b = _.length; g < b; g++) {
                var C = _[g];
                if (C.listener === h && C.capture === c) {
                  _.length === 1
                    ? (this._listeners[o] = void 0)
                    : _.splice(g, 1);
                  return;
                }
              }
          }
        },
        dispatchEvent: function (o) {
          return this._dispatchEvent(o, !1);
        },
        _dispatchEvent: function (o, h) {
          typeof h != "boolean" && (h = !1);
          function c(M, G) {
            var P = G.type,
              w = G.eventPhase;
            if (
              ((G.currentTarget = M),
              w !== t.CAPTURING_PHASE && M._handlers && M._handlers[P])
            ) {
              var v = M._handlers[P],
                N;
              if (typeof v == "function") N = v.call(G.currentTarget, G);
              else {
                var y = v.handleEvent;
                if (typeof y != "function")
                  throw new TypeError(
                    "handleEvent property of event handler object isnot a function."
                  );
                N = y.call(v, G);
              }
              switch (G.type) {
                case "mouseover":
                  N === !0 && G.preventDefault();
                  break;
                case "beforeunload":
                default:
                  N === !1 && G.preventDefault();
                  break;
              }
            }
            var ne = M._listeners && M._listeners[P];
            if (ne) {
              ne = ne.slice();
              for (var ee = 0, oe = ne.length; ee < oe; ee++) {
                if (G._immediatePropagationStopped) return;
                var V = ne[ee];
                if (
                  !(
                    (w === t.CAPTURING_PHASE && !V.capture) ||
                    (w === t.BUBBLING_PHASE && V.capture)
                  )
                )
                  if (V.f) V.f.call(G.currentTarget, G);
                  else {
                    var L = V.listener.handleEvent;
                    if (typeof L != "function")
                      throw new TypeError(
                        "handleEvent property of event listener object is not a function."
                      );
                    L.call(V.listener, G);
                  }
              }
            }
          }
          (!o._initialized || o._dispatching) && n.InvalidStateError(),
            (o.isTrusted = h),
            (o._dispatching = !0),
            (o.target = this);
          for (var _ = [], g = this.parentNode; g; g = g.parentNode) _.push(g);
          o.eventPhase = t.CAPTURING_PHASE;
          for (
            var b = _.length - 1;
            b >= 0 && (c(_[b], o), !o._propagationStopped);
            b--
          );
          if (
            (o._propagationStopped ||
              ((o.eventPhase = t.AT_TARGET), c(this, o)),
            o.bubbles && !o._propagationStopped)
          ) {
            o.eventPhase = t.BUBBLING_PHASE;
            for (
              var C = 0, I = _.length;
              C < I && (c(_[C], o), !o._propagationStopped);
              C++
            );
          }
          if (
            ((o._dispatching = !1),
            (o.eventPhase = t.AT_TARGET),
            (o.currentTarget = null),
            h && !o.defaultPrevented && o instanceof r)
          )
            switch (o.type) {
              case "mousedown":
                this._armed = { x: o.clientX, y: o.clientY, t: o.timeStamp };
                break;
              case "mouseout":
              case "mouseover":
                this._armed = null;
                break;
              case "mouseup":
                this._isClick(o) && this._doClick(o), (this._armed = null);
                break;
            }
          return !o.defaultPrevented;
        },
        _isClick: function (i) {
          return (
            this._armed !== null &&
            i.type === "mouseup" &&
            i.isTrusted &&
            i.button === 0 &&
            i.timeStamp - this._armed.t < 1e3 &&
            Math.abs(i.clientX - this._armed.x) < 10 &&
            Math.abs(i.clientY - this._armed.Y) < 10
          );
        },
        _doClick: function (i) {
          if (!this._click_in_progress) {
            this._click_in_progress = !0;
            for (var o = this; o && !o._post_click_activation_steps; )
              o = o.parentNode;
            o &&
              o._pre_click_activation_steps &&
              o._pre_click_activation_steps();
            var h = this.ownerDocument.createEvent("MouseEvent");
            h.initMouseEvent(
              "click",
              !0,
              !0,
              this.ownerDocument.defaultView,
              1,
              i.screenX,
              i.screenY,
              i.clientX,
              i.clientY,
              i.ctrlKey,
              i.altKey,
              i.shiftKey,
              i.metaKey,
              i.button,
              null
            );
            var c = this._dispatchEvent(h, !0);
            o &&
              (c
                ? o._post_click_activation_steps &&
                  o._post_click_activation_steps(h)
                : o._cancelled_activation_steps &&
                  o._cancelled_activation_steps());
          }
        },
        _setEventHandler: function (o, h) {
          this._handlers || (this._handlers = Object.create(null)),
            (this._handlers[o] = h);
        },
        _getEventHandler: function (o) {
          return (this._handlers && this._handlers[o]) || null;
        },
      };
    },
  }),
  ba = J({
    "external/npm/node_modules/domino/lib/LinkedList.js"(a, e) {
      "use strict";
      var t = ke(),
        r = (e.exports = {
          valid: function (n) {
            return (
              t.assert(n, "list falsy"),
              t.assert(n._previousSibling, "previous falsy"),
              t.assert(n._nextSibling, "next falsy"),
              !0
            );
          },
          insertBefore: function (n, s) {
            t.assert(r.valid(n) && r.valid(s));
            var i = n,
              o = n._previousSibling,
              h = s,
              c = s._previousSibling;
            (i._previousSibling = c),
              (o._nextSibling = h),
              (c._nextSibling = i),
              (h._previousSibling = o),
              t.assert(r.valid(n) && r.valid(s));
          },
          replace: function (n, s) {
            t.assert(r.valid(n) && (s === null || r.valid(s))),
              s !== null && r.insertBefore(s, n),
              r.remove(n),
              t.assert(r.valid(n) && (s === null || r.valid(s)));
          },
          remove: function (n) {
            t.assert(r.valid(n));
            var s = n._previousSibling;
            if (s !== n) {
              var i = n._nextSibling;
              (s._nextSibling = i),
                (i._previousSibling = s),
                (n._previousSibling = n._nextSibling = n),
                t.assert(r.valid(n));
            }
          },
        });
    },
  }),
  Ea = J({
    "external/npm/node_modules/domino/lib/NodeUtils.js"(a, e) {
      "use strict";
      e.exports = {
        serializeOne: G,
        ɵescapeMatchingClosingTag: b,
        ɵescapeClosingCommentTag: I,
        ɵescapeProcessingInstructionContent: M,
      };
      var t = ke(),
        r = t.NAMESPACE,
        n = {
          STYLE: !0,
          SCRIPT: !0,
          XMP: !0,
          IFRAME: !0,
          NOEMBED: !0,
          NOFRAMES: !0,
          PLAINTEXT: !0,
        },
        s = {
          area: !0,
          base: !0,
          basefont: !0,
          bgsound: !0,
          br: !0,
          col: !0,
          embed: !0,
          frame: !0,
          hr: !0,
          img: !0,
          input: !0,
          keygen: !0,
          link: !0,
          meta: !0,
          param: !0,
          source: !0,
          track: !0,
          wbr: !0,
        },
        i = {},
        o = /[&<>\u00A0]/g,
        h = /[&"<>\u00A0]/g;
      function c(P) {
        return o.test(P)
          ? P.replace(o, (w) => {
              switch (w) {
                case "&":
                  return "&amp;";
                case "<":
                  return "&lt;";
                case ">":
                  return "&gt;";
                case "\xA0":
                  return "&nbsp;";
              }
            })
          : P;
      }
      function _(P) {
        return h.test(P)
          ? P.replace(h, (w) => {
              switch (w) {
                case "<":
                  return "&lt;";
                case ">":
                  return "&gt;";
                case "&":
                  return "&amp;";
                case '"':
                  return "&quot;";
                case "\xA0":
                  return "&nbsp;";
              }
            })
          : P;
      }
      function g(P) {
        var w = P.namespaceURI;
        return w
          ? w === r.XML
            ? "xml:" + P.localName
            : w === r.XLINK
              ? "xlink:" + P.localName
              : w === r.XMLNS
                ? P.localName === "xmlns"
                  ? "xmlns"
                  : "xmlns:" + P.localName
                : P.name
          : P.localName;
      }
      function b(P, w) {
        let v = "</" + w;
        if (!P.toLowerCase().includes(v)) return P;
        let N = [...P],
          y = P.matchAll(new RegExp(v, "ig"));
        for (let ne of y) N[ne.index] = "&lt;";
        return N.join("");
      }
      var C = /--!?>/;
      function I(P) {
        return C.test(P) ? P.replace(/(--\!?)>/g, "$1&gt;") : P;
      }
      function M(P) {
        return P.includes(">") ? P.replaceAll(">", "&gt;") : P;
      }
      function G(P, w) {
        var v = "";
        switch (P.nodeType) {
          case 1:
            var N = P.namespaceURI,
              y = N === r.HTML,
              ne = y || N === r.SVG || N === r.MATHML ? P.localName : P.tagName;
            v += "<" + ne;
            for (var ee = 0, oe = P._numattrs; ee < oe; ee++) {
              var V = P._attr(ee);
              (v += " " + g(V)),
                V.value !== void 0 && (v += '="' + _(V.value) + '"');
            }
            if (((v += ">"), !(y && s[ne]))) {
              var L = P.serialize();
              n[ne.toUpperCase()] && (L = b(L, ne)),
                y &&
                  i[ne] &&
                  L.charAt(0) ===
                    `
` &&
                  (v += `
`),
                (v += L),
                (v += "</" + ne + ">");
            }
            break;
          case 3:
          case 4:
            var H;
            w.nodeType === 1 && w.namespaceURI === r.HTML
              ? (H = w.tagName)
              : (H = ""),
              n[H] || (H === "NOSCRIPT" && w.ownerDocument._scripting_enabled)
                ? (v += P.data)
                : (v += c(P.data));
            break;
          case 8:
            v += "<!--" + I(P.data) + "-->";
            break;
          case 7:
            let Q = M(P.data);
            v += "<?" + P.target + " " + Q + "?>";
            break;
          case 10:
            (v += "<!DOCTYPE " + P.name), (v += ">");
            break;
          default:
            t.InvalidStateError();
        }
        return v;
      }
    },
  }),
  Re = J({
    "external/npm/node_modules/domino/lib/Node.js"(a, e) {
      "use strict";
      e.exports = i;
      var t = ya(),
        r = ba(),
        n = Ea(),
        s = ke();
      function i() {
        t.call(this),
          (this.parentNode = null),
          (this._nextSibling = this._previousSibling = this),
          (this._index = void 0);
      }
      var o = (i.ELEMENT_NODE = 1),
        h = (i.ATTRIBUTE_NODE = 2),
        c = (i.TEXT_NODE = 3),
        _ = (i.CDATA_SECTION_NODE = 4),
        g = (i.ENTITY_REFERENCE_NODE = 5),
        b = (i.ENTITY_NODE = 6),
        C = (i.PROCESSING_INSTRUCTION_NODE = 7),
        I = (i.COMMENT_NODE = 8),
        M = (i.DOCUMENT_NODE = 9),
        G = (i.DOCUMENT_TYPE_NODE = 10),
        P = (i.DOCUMENT_FRAGMENT_NODE = 11),
        w = (i.NOTATION_NODE = 12),
        v = (i.DOCUMENT_POSITION_DISCONNECTED = 1),
        N = (i.DOCUMENT_POSITION_PRECEDING = 2),
        y = (i.DOCUMENT_POSITION_FOLLOWING = 4),
        ne = (i.DOCUMENT_POSITION_CONTAINS = 8),
        ee = (i.DOCUMENT_POSITION_CONTAINED_BY = 16),
        oe = (i.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32);
      i.prototype = Object.create(t.prototype, {
        baseURI: { get: s.nyi },
        parentElement: {
          get: function () {
            return this.parentNode && this.parentNode.nodeType === o
              ? this.parentNode
              : null;
          },
        },
        hasChildNodes: { value: s.shouldOverride },
        firstChild: { get: s.shouldOverride },
        lastChild: { get: s.shouldOverride },
        isConnected: {
          get: function () {
            let V = this;
            for (; V != null; ) {
              if (V.nodeType === i.DOCUMENT_NODE) return !0;
              (V = V.parentNode),
                V != null &&
                  V.nodeType === i.DOCUMENT_FRAGMENT_NODE &&
                  (V = V.host);
            }
            return !1;
          },
        },
        previousSibling: {
          get: function () {
            var V = this.parentNode;
            return !V || this === V.firstChild ? null : this._previousSibling;
          },
        },
        nextSibling: {
          get: function () {
            var V = this.parentNode,
              L = this._nextSibling;
            return !V || L === V.firstChild ? null : L;
          },
        },
        textContent: {
          get: function () {
            return null;
          },
          set: function (V) {},
        },
        innerText: {
          get: function () {
            return null;
          },
          set: function (V) {},
        },
        _countChildrenOfType: {
          value: function (V) {
            for (var L = 0, H = this.firstChild; H !== null; H = H.nextSibling)
              H.nodeType === V && L++;
            return L;
          },
        },
        _ensureInsertValid: {
          value: function (L, H, Q) {
            var m = this,
              d,
              f;
            if (!L.nodeType) throw new TypeError("not a node");
            switch (m.nodeType) {
              case M:
              case P:
              case o:
                break;
              default:
                s.HierarchyRequestError();
            }
            switch (
              (L.isAncestor(m) && s.HierarchyRequestError(),
              (H !== null || !Q) && H.parentNode !== m && s.NotFoundError(),
              L.nodeType)
            ) {
              case P:
              case G:
              case o:
              case c:
              case C:
              case I:
                break;
              default:
                s.HierarchyRequestError();
            }
            if (m.nodeType === M)
              switch (L.nodeType) {
                case c:
                  s.HierarchyRequestError();
                  break;
                case P:
                  switch (
                    (L._countChildrenOfType(c) > 0 && s.HierarchyRequestError(),
                    L._countChildrenOfType(o))
                  ) {
                    case 0:
                      break;
                    case 1:
                      if (H !== null)
                        for (
                          Q && H.nodeType === G && s.HierarchyRequestError(),
                            f = H.nextSibling;
                          f !== null;
                          f = f.nextSibling
                        )
                          f.nodeType === G && s.HierarchyRequestError();
                      (d = m._countChildrenOfType(o)),
                        Q
                          ? d > 0 && s.HierarchyRequestError()
                          : (d > 1 || (d === 1 && H.nodeType !== o)) &&
                            s.HierarchyRequestError();
                      break;
                    default:
                      s.HierarchyRequestError();
                  }
                  break;
                case o:
                  if (H !== null)
                    for (
                      Q && H.nodeType === G && s.HierarchyRequestError(),
                        f = H.nextSibling;
                      f !== null;
                      f = f.nextSibling
                    )
                      f.nodeType === G && s.HierarchyRequestError();
                  (d = m._countChildrenOfType(o)),
                    Q
                      ? d > 0 && s.HierarchyRequestError()
                      : (d > 1 || (d === 1 && H.nodeType !== o)) &&
                        s.HierarchyRequestError();
                  break;
                case G:
                  if (H === null)
                    m._countChildrenOfType(o) && s.HierarchyRequestError();
                  else
                    for (
                      f = m.firstChild;
                      f !== null && f !== H;
                      f = f.nextSibling
                    )
                      f.nodeType === o && s.HierarchyRequestError();
                  (d = m._countChildrenOfType(G)),
                    Q
                      ? d > 0 && s.HierarchyRequestError()
                      : (d > 1 || (d === 1 && H.nodeType !== G)) &&
                        s.HierarchyRequestError();
                  break;
              }
            else L.nodeType === G && s.HierarchyRequestError();
          },
        },
        insertBefore: {
          value: function (L, H) {
            var Q = this;
            Q._ensureInsertValid(L, H, !0);
            var m = H;
            return (
              m === L && (m = L.nextSibling),
              Q.doc.adoptNode(L),
              L._insertOrReplace(Q, m, !1),
              L
            );
          },
        },
        appendChild: {
          value: function (V) {
            return this.insertBefore(V, null);
          },
        },
        _appendChild: {
          value: function (V) {
            V._insertOrReplace(this, null, !1);
          },
        },
        removeChild: {
          value: function (L) {
            var H = this;
            if (!L.nodeType) throw new TypeError("not a node");
            return L.parentNode !== H && s.NotFoundError(), L.remove(), L;
          },
        },
        replaceChild: {
          value: function (L, H) {
            var Q = this;
            return (
              Q._ensureInsertValid(L, H, !1),
              L.doc !== Q.doc && Q.doc.adoptNode(L),
              L._insertOrReplace(Q, H, !0),
              H
            );
          },
        },
        contains: {
          value: function (L) {
            return L === null
              ? !1
              : this === L
                ? !0
                : (this.compareDocumentPosition(L) & ee) !== 0;
          },
        },
        compareDocumentPosition: {
          value: function (L) {
            if (this === L) return 0;
            if (this.doc !== L.doc || this.rooted !== L.rooted) return v + oe;
            for (var H = [], Q = [], m = this; m !== null; m = m.parentNode)
              H.push(m);
            for (m = L; m !== null; m = m.parentNode) Q.push(m);
            if ((H.reverse(), Q.reverse(), H[0] !== Q[0])) return v + oe;
            m = Math.min(H.length, Q.length);
            for (var d = 1; d < m; d++)
              if (H[d] !== Q[d]) return H[d].index < Q[d].index ? y : N;
            return H.length < Q.length ? y + ee : N + ne;
          },
        },
        isSameNode: {
          value: function (L) {
            return this === L;
          },
        },
        isEqualNode: {
          value: function (L) {
            if (!L || L.nodeType !== this.nodeType || !this.isEqual(L))
              return !1;
            for (
              var H = this.firstChild, Q = L.firstChild;
              H && Q;
              H = H.nextSibling, Q = Q.nextSibling
            )
              if (!H.isEqualNode(Q)) return !1;
            return H === null && Q === null;
          },
        },
        cloneNode: {
          value: function (V) {
            var L = this.clone();
            if (V)
              for (var H = this.firstChild; H !== null; H = H.nextSibling)
                L._appendChild(H.cloneNode(!0));
            return L;
          },
        },
        lookupPrefix: {
          value: function (L) {
            var H;
            if (L === "" || L === null || L === void 0) return null;
            switch (this.nodeType) {
              case o:
                return this._lookupNamespacePrefix(L, this);
              case M:
                return (H = this.documentElement), H ? H.lookupPrefix(L) : null;
              case b:
              case w:
              case P:
              case G:
                return null;
              case h:
                return (H = this.ownerElement), H ? H.lookupPrefix(L) : null;
              default:
                return (H = this.parentElement), H ? H.lookupPrefix(L) : null;
            }
          },
        },
        lookupNamespaceURI: {
          value: function (L) {
            (L === "" || L === void 0) && (L = null);
            var H;
            switch (this.nodeType) {
              case o:
                return s.shouldOverride();
              case M:
                return (
                  (H = this.documentElement), H ? H.lookupNamespaceURI(L) : null
                );
              case b:
              case w:
              case G:
              case P:
                return null;
              case h:
                return (
                  (H = this.ownerElement), H ? H.lookupNamespaceURI(L) : null
                );
              default:
                return (
                  (H = this.parentElement), H ? H.lookupNamespaceURI(L) : null
                );
            }
          },
        },
        isDefaultNamespace: {
          value: function (L) {
            (L === "" || L === void 0) && (L = null);
            var H = this.lookupNamespaceURI(null);
            return H === L;
          },
        },
        index: {
          get: function () {
            var V = this.parentNode;
            if (this === V.firstChild) return 0;
            var L = V.childNodes;
            if (this._index === void 0 || L[this._index] !== this) {
              for (var H = 0; H < L.length; H++) L[H]._index = H;
              s.assert(L[this._index] === this);
            }
            return this._index;
          },
        },
        isAncestor: {
          value: function (V) {
            if (this.doc !== V.doc || this.rooted !== V.rooted) return !1;
            for (var L = V; L; L = L.parentNode) if (L === this) return !0;
            return !1;
          },
        },
        ensureSameDoc: {
          value: function (V) {
            V.ownerDocument === null
              ? (V.ownerDocument = this.doc)
              : V.ownerDocument !== this.doc && s.WrongDocumentError();
          },
        },
        removeChildren: { value: s.shouldOverride },
        _insertOrReplace: {
          value: function (L, H, Q) {
            var m = this,
              d,
              f;
            if (
              (m.nodeType === P && m.rooted && s.HierarchyRequestError(),
              L._childNodes &&
                ((d = H === null ? L._childNodes.length : H.index),
                m.parentNode === L))
            ) {
              var p = m.index;
              p < d && d--;
            }
            Q && (H.rooted && H.doc.mutateRemove(H), (H.parentNode = null));
            var S = H;
            S === null && (S = L.firstChild);
            var k = m.rooted && L.rooted;
            if (m.nodeType === P) {
              for (
                var U = [0, Q ? 1 : 0], W, ie = m.firstChild;
                ie !== null;
                ie = W
              )
                (W = ie.nextSibling), U.push(ie), (ie.parentNode = L);
              var T = U.length;
              if (
                (Q
                  ? r.replace(S, T > 2 ? U[2] : null)
                  : T > 2 && S !== null && r.insertBefore(U[2], S),
                L._childNodes)
              )
                for (
                  U[0] = H === null ? L._childNodes.length : H._index,
                    L._childNodes.splice.apply(L._childNodes, U),
                    f = 2;
                  f < T;
                  f++
                )
                  U[f]._index = U[0] + (f - 2);
              else
                L._firstChild === H &&
                  (T > 2
                    ? (L._firstChild = U[2])
                    : Q && (L._firstChild = null));
              if (
                (m._childNodes
                  ? (m._childNodes.length = 0)
                  : (m._firstChild = null),
                L.rooted)
              )
                for (L.modify(), f = 2; f < T; f++) L.doc.mutateInsert(U[f]);
            } else {
              if (H === m) return;
              k ? m._remove() : m.parentNode && m.remove(),
                (m.parentNode = L),
                Q
                  ? (r.replace(S, m),
                    L._childNodes
                      ? ((m._index = d), (L._childNodes[d] = m))
                      : L._firstChild === H && (L._firstChild = m))
                  : (S !== null && r.insertBefore(m, S),
                    L._childNodes
                      ? ((m._index = d), L._childNodes.splice(d, 0, m))
                      : L._firstChild === H && (L._firstChild = m)),
                k
                  ? (L.modify(), L.doc.mutateMove(m))
                  : L.rooted && (L.modify(), L.doc.mutateInsert(m));
            }
          },
        },
        lastModTime: {
          get: function () {
            return (
              this._lastModTime || (this._lastModTime = this.doc.modclock),
              this._lastModTime
            );
          },
        },
        modify: {
          value: function () {
            if (this.doc.modclock)
              for (
                var V = ++this.doc.modclock, L = this;
                L;
                L = L.parentElement
              )
                L._lastModTime && (L._lastModTime = V);
          },
        },
        doc: {
          get: function () {
            return this.ownerDocument || this;
          },
        },
        rooted: {
          get: function () {
            return !!this._nid;
          },
        },
        normalize: {
          value: function () {
            for (var V, L = this.firstChild; L !== null; L = V)
              if (
                ((V = L.nextSibling),
                L.normalize && L.normalize(),
                L.nodeType === i.TEXT_NODE)
              ) {
                if (L.nodeValue === "") {
                  this.removeChild(L);
                  continue;
                }
                var H = L.previousSibling;
                H !== null &&
                  H.nodeType === i.TEXT_NODE &&
                  (H.appendData(L.nodeValue), this.removeChild(L));
              }
          },
        },
        serialize: {
          value: function () {
            if (this._innerHTML) return this._innerHTML;
            for (var V = "", L = this.firstChild; L !== null; L = L.nextSibling)
              V += n.serializeOne(L, this);
            return V;
          },
        },
        outerHTML: {
          get: function () {
            return n.serializeOne(this, { nodeType: 0 });
          },
          set: s.nyi,
        },
        ELEMENT_NODE: { value: o },
        ATTRIBUTE_NODE: { value: h },
        TEXT_NODE: { value: c },
        CDATA_SECTION_NODE: { value: _ },
        ENTITY_REFERENCE_NODE: { value: g },
        ENTITY_NODE: { value: b },
        PROCESSING_INSTRUCTION_NODE: { value: C },
        COMMENT_NODE: { value: I },
        DOCUMENT_NODE: { value: M },
        DOCUMENT_TYPE_NODE: { value: G },
        DOCUMENT_FRAGMENT_NODE: { value: P },
        NOTATION_NODE: { value: w },
        DOCUMENT_POSITION_DISCONNECTED: { value: v },
        DOCUMENT_POSITION_PRECEDING: { value: N },
        DOCUMENT_POSITION_FOLLOWING: { value: y },
        DOCUMENT_POSITION_CONTAINS: { value: ne },
        DOCUMENT_POSITION_CONTAINED_BY: { value: ee },
        DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: { value: oe },
      });
    },
  }),
  xc = J({
    "external/npm/node_modules/domino/lib/NodeList.es6.js"(a, e) {
      "use strict";
      e.exports = class extends Array {
        constructor(r) {
          if ((super((r && r.length) || 0), r)) for (var n in r) this[n] = r[n];
        }
        item(r) {
          return this[r] || null;
        }
      };
    },
  }),
  Pc = J({
    "external/npm/node_modules/domino/lib/NodeList.es5.js"(a, e) {
      "use strict";
      function t(n) {
        return this[n] || null;
      }
      function r(n) {
        return n || (n = []), (n.item = t), n;
      }
      e.exports = r;
    },
  }),
  Zt = J({
    "external/npm/node_modules/domino/lib/NodeList.js"(a, e) {
      "use strict";
      var t;
      try {
        t = xc();
      } catch {
        t = Pc();
      }
      e.exports = t;
    },
  }),
  bs = J({
    "external/npm/node_modules/domino/lib/ContainerNode.js"(a, e) {
      "use strict";
      e.exports = n;
      var t = Re(),
        r = Zt();
      function n() {
        t.call(this), (this._firstChild = this._childNodes = null);
      }
      n.prototype = Object.create(t.prototype, {
        hasChildNodes: {
          value: function () {
            return this._childNodes
              ? this._childNodes.length > 0
              : this._firstChild !== null;
          },
        },
        childNodes: {
          get: function () {
            return this._ensureChildNodes(), this._childNodes;
          },
        },
        firstChild: {
          get: function () {
            return this._childNodes
              ? this._childNodes.length === 0
                ? null
                : this._childNodes[0]
              : this._firstChild;
          },
        },
        lastChild: {
          get: function () {
            var s = this._childNodes,
              i;
            return s
              ? s.length === 0
                ? null
                : s[s.length - 1]
              : ((i = this._firstChild),
                i === null ? null : i._previousSibling);
          },
        },
        _ensureChildNodes: {
          value: function () {
            if (!this._childNodes) {
              var s = this._firstChild,
                i = s,
                o = (this._childNodes = new r());
              if (s)
                do o.push(i), (i = i._nextSibling);
                while (i !== s);
              this._firstChild = null;
            }
          },
        },
        removeChildren: {
          value: function () {
            for (
              var i = this.rooted ? this.ownerDocument : null,
                o = this.firstChild,
                h;
              o !== null;

            )
              (h = o),
                (o = h.nextSibling),
                i && i.mutateRemove(h),
                (h.parentNode = null);
            this._childNodes
              ? (this._childNodes.length = 0)
              : (this._firstChild = null),
              this.modify();
          },
        },
      });
    },
  }),
  Es = J({
    "external/npm/node_modules/domino/lib/xmlnames.js"(a) {
      "use strict";
      (a.isValidName = M), (a.isValidQName = G);
      var e = /^[_:A-Za-z][-.:\w]+$/,
        t = /^([_A-Za-z][-.\w]+|[_A-Za-z][-.\w]+:[_A-Za-z][-.\w]+)$/,
        r =
          "_A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD",
        n =
          "-._A-Za-z0-9\xB7\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0300-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD",
        s = "[" + r + "][" + n + "]*",
        i = r + ":",
        o = n + ":",
        h = new RegExp("^[" + i + "][" + o + "]*$"),
        c = new RegExp("^(" + s + "|" + s + ":" + s + ")$"),
        _ = /[\uD800-\uDB7F\uDC00-\uDFFF]/,
        g = /[\uD800-\uDB7F\uDC00-\uDFFF]/g,
        b = /[\uD800-\uDB7F][\uDC00-\uDFFF]/g;
      (r += "\uD800-\u{EFC00}-\uDFFF"),
        (n += "\uD800-\u{EFC00}-\uDFFF"),
        (s = "[" + r + "][" + n + "]*"),
        (i = r + ":"),
        (o = n + ":");
      var C = new RegExp("^[" + i + "][" + o + "]*$"),
        I = new RegExp("^(" + s + "|" + s + ":" + s + ")$");
      function M(P) {
        if (e.test(P) || h.test(P)) return !0;
        if (!_.test(P) || !C.test(P)) return !1;
        var w = P.match(g),
          v = P.match(b);
        return v !== null && 2 * v.length === w.length;
      }
      function G(P) {
        if (t.test(P) || c.test(P)) return !0;
        if (!_.test(P) || !I.test(P)) return !1;
        var w = P.match(g),
          v = P.match(b);
        return v !== null && 2 * v.length === w.length;
      }
    },
  }),
  va = J({
    "external/npm/node_modules/domino/lib/attributes.js"(a) {
      "use strict";
      var e = ke();
      a.property = function (r) {
        if (Array.isArray(r.type)) {
          var n = Object.create(null);
          r.type.forEach(function (o) {
            n[o.value || o] = o.alias || o;
          });
          var s = r.missing;
          s === void 0 && (s = null);
          var i = r.invalid;
          return (
            i === void 0 && (i = s),
            {
              get: function () {
                var o = this._getattr(r.name);
                return o === null
                  ? s
                  : ((o = n[o.toLowerCase()]),
                    o !== void 0 ? o : i !== null ? i : o);
              },
              set: function (o) {
                this._setattr(r.name, o);
              },
            }
          );
        } else {
          if (r.type === Boolean)
            return {
              get: function () {
                return this.hasAttribute(r.name);
              },
              set: function (o) {
                o ? this._setattr(r.name, "") : this.removeAttribute(r.name);
              },
            };
          if (
            r.type === Number ||
            r.type === "long" ||
            r.type === "unsigned long" ||
            r.type === "limited unsigned long with fallback"
          )
            return t(r);
          if (!r.type || r.type === String)
            return {
              get: function () {
                return this._getattr(r.name) || "";
              },
              set: function (o) {
                r.treatNullAsEmptyString && o === null && (o = ""),
                  this._setattr(r.name, o);
              },
            };
          if (typeof r.type == "function") return r.type(r.name, r);
        }
        throw new Error("Invalid attribute definition");
      };
      function t(r) {
        var n;
        typeof r.default == "function"
          ? (n = r.default)
          : typeof r.default == "number"
            ? (n = function () {
                return r.default;
              })
            : (n = function () {
                e.assert(!1, typeof r.default);
              });
        var s = r.type === "unsigned long",
          i = r.type === "long",
          o = r.type === "limited unsigned long with fallback",
          h = r.min,
          c = r.max,
          _ = r.setmin;
        return (
          h === void 0 && (s && (h = 0), i && (h = -2147483648), o && (h = 1)),
          c === void 0 && (s || i || o) && (c = 2147483647),
          {
            get: function () {
              var g = this._getattr(r.name),
                b = r.float ? parseFloat(g) : parseInt(g, 10);
              if (
                g === null ||
                !isFinite(b) ||
                (h !== void 0 && b < h) ||
                (c !== void 0 && b > c)
              )
                return n.call(this);
              if (s || i || o) {
                if (!/^[ \t\n\f\r]*[-+]?[0-9]/.test(g)) return n.call(this);
                b = b | 0;
              }
              return b;
            },
            set: function (g) {
              r.float || (g = Math.floor(g)),
                _ !== void 0 &&
                  g < _ &&
                  e.IndexSizeError(r.name + " set to " + g),
                s
                  ? (g = g < 0 || g > 2147483647 ? n.call(this) : g | 0)
                  : o
                    ? (g = g < 1 || g > 2147483647 ? n.call(this) : g | 0)
                    : i &&
                      (g =
                        g < -2147483648 || g > 2147483647
                          ? n.call(this)
                          : g | 0),
                this._setattr(r.name, String(g));
            },
          }
        );
      }
      a.registerChangeHandler = function (r, n, s) {
        var i = r.prototype;
        Object.prototype.hasOwnProperty.call(i, "_attributeChangeHandlers") ||
          (i._attributeChangeHandlers = Object.create(
            i._attributeChangeHandlers || null
          )),
          (i._attributeChangeHandlers[n] = s);
      };
    },
  }),
  Hc = J({
    "external/npm/node_modules/domino/lib/FilteredElementList.js"(a, e) {
      "use strict";
      e.exports = r;
      var t = Re();
      function r(n, s) {
        (this.root = n),
          (this.filter = s),
          (this.lastModTime = n.lastModTime),
          (this.done = !1),
          (this.cache = []),
          this.traverse();
      }
      r.prototype = Object.create(Object.prototype, {
        length: {
          get: function () {
            return (
              this.checkcache(), this.done || this.traverse(), this.cache.length
            );
          },
        },
        item: {
          value: function (n) {
            return (
              this.checkcache(),
              !this.done && n >= this.cache.length && this.traverse(),
              this.cache[n]
            );
          },
        },
        checkcache: {
          value: function () {
            if (this.lastModTime !== this.root.lastModTime) {
              for (var n = this.cache.length - 1; n >= 0; n--) this[n] = void 0;
              (this.cache.length = 0),
                (this.done = !1),
                (this.lastModTime = this.root.lastModTime);
            }
          },
        },
        traverse: {
          value: function (n) {
            n !== void 0 && n++;
            for (var s; (s = this.next()) !== null; )
              if (
                ((this[this.cache.length] = s),
                this.cache.push(s),
                n && this.cache.length === n)
              )
                return;
            this.done = !0;
          },
        },
        next: {
          value: function () {
            var n =
                this.cache.length === 0
                  ? this.root
                  : this.cache[this.cache.length - 1],
              s;
            for (
              n.nodeType === t.DOCUMENT_NODE
                ? (s = n.documentElement)
                : (s = n.nextElement(this.root));
              s;

            ) {
              if (this.filter(s)) return s;
              s = s.nextElement(this.root);
            }
            return null;
          },
        },
      });
    },
  }),
  Ta = J({
    "external/npm/node_modules/domino/lib/DOMTokenList.js"(a, e) {
      "use strict";
      var t = ke();
      e.exports = r;
      function r(h, c) {
        (this._getString = h),
          (this._setString = c),
          (this._length = 0),
          (this._lastStringValue = ""),
          this._update();
      }
      Object.defineProperties(r.prototype, {
        length: {
          get: function () {
            return this._length;
          },
        },
        item: {
          value: function (h) {
            var c = o(this);
            return h < 0 || h >= c.length ? null : c[h];
          },
        },
        contains: {
          value: function (h) {
            h = String(h);
            var c = o(this);
            return c.indexOf(h) > -1;
          },
        },
        add: {
          value: function () {
            for (var h = o(this), c = 0, _ = arguments.length; c < _; c++) {
              var g = s(arguments[c]);
              h.indexOf(g) < 0 && h.push(g);
            }
            this._update(h);
          },
        },
        remove: {
          value: function () {
            for (var h = o(this), c = 0, _ = arguments.length; c < _; c++) {
              var g = s(arguments[c]),
                b = h.indexOf(g);
              b > -1 && h.splice(b, 1);
            }
            this._update(h);
          },
        },
        toggle: {
          value: function (c, _) {
            return (
              (c = s(c)),
              this.contains(c)
                ? _ === void 0 || _ === !1
                  ? (this.remove(c), !1)
                  : !0
                : _ === void 0 || _ === !0
                  ? (this.add(c), !0)
                  : !1
            );
          },
        },
        replace: {
          value: function (c, _) {
            String(_) === "" && t.SyntaxError(), (c = s(c)), (_ = s(_));
            var g = o(this),
              b = g.indexOf(c);
            if (b < 0) return !1;
            var C = g.indexOf(_);
            return (
              C < 0
                ? (g[b] = _)
                : b < C
                  ? ((g[b] = _), g.splice(C, 1))
                  : g.splice(b, 1),
              this._update(g),
              !0
            );
          },
        },
        toString: {
          value: function () {
            return this._getString();
          },
        },
        value: {
          get: function () {
            return this._getString();
          },
          set: function (h) {
            this._setString(h), this._update();
          },
        },
        _update: {
          value: function (h) {
            h
              ? (n(this, h), this._setString(h.join(" ").trim()))
              : n(this, o(this)),
              (this._lastStringValue = this._getString());
          },
        },
      });
      function n(h, c) {
        var _ = h._length,
          g;
        for (h._length = c.length, g = 0; g < c.length; g++) h[g] = c[g];
        for (; g < _; g++) h[g] = void 0;
      }
      function s(h) {
        return (
          (h = String(h)),
          h === "" && t.SyntaxError(),
          /[ \t\r\n\f]/.test(h) && t.InvalidCharacterError(),
          h
        );
      }
      function i(h) {
        for (var c = h._length, _ = Array(c), g = 0; g < c; g++) _[g] = h[g];
        return _;
      }
      function o(h) {
        var c = h._getString();
        if (c === h._lastStringValue) return i(h);
        var _ = c.replace(/(^[ \t\r\n\f]+)|([ \t\r\n\f]+$)/g, "");
        if (_ === "") return [];
        var g = Object.create(null);
        return _.split(/[ \t\r\n\f]+/g).filter(function (b) {
          var C = "$" + b;
          return g[C] ? !1 : ((g[C] = !0), !0);
        });
      }
    },
  }),
  vs = J({
    "external/npm/node_modules/domino/lib/select.js"(a, e) {
      "use strict";
      var t = Object.create(null, {
          location: {
            get: function () {
              throw new Error("window.location is not supported.");
            },
          },
        }),
        r = function (m, d) {
          return m.compareDocumentPosition(d);
        },
        n = function (m, d) {
          return r(m, d) & 2 ? 1 : -1;
        },
        s = function (m) {
          for (; (m = m.nextSibling) && m.nodeType !== 1; );
          return m;
        },
        i = function (m) {
          for (; (m = m.previousSibling) && m.nodeType !== 1; );
          return m;
        },
        o = function (m) {
          if ((m = m.firstChild))
            for (; m.nodeType !== 1 && (m = m.nextSibling); );
          return m;
        },
        h = function (m) {
          if ((m = m.lastChild))
            for (; m.nodeType !== 1 && (m = m.previousSibling); );
          return m;
        },
        c = function (m) {
          if (!m.parentNode) return !1;
          var d = m.parentNode.nodeType;
          return d === 1 || d === 9;
        },
        _ = function (m) {
          if (!m) return m;
          var d = m[0];
          return d === '"' || d === "'"
            ? (m[m.length - 1] === d ? (m = m.slice(1, -1)) : (m = m.slice(1)),
              m.replace(y.str_escape, function (f) {
                var p = /^\\(?:([0-9A-Fa-f]+)|([\r\n\f]+))/.exec(f);
                if (!p) return f.slice(1);
                if (p[2]) return "";
                var S = parseInt(p[1], 16);
                return String.fromCodePoint
                  ? String.fromCodePoint(S)
                  : String.fromCharCode(S);
              }))
            : y.ident.test(m)
              ? g(m)
              : m;
        },
        g = function (m) {
          return m.replace(y.escape, function (d) {
            var f = /^\\([0-9A-Fa-f]+)/.exec(d);
            if (!f) return d[1];
            var p = parseInt(f[1], 16);
            return String.fromCodePoint
              ? String.fromCodePoint(p)
              : String.fromCharCode(p);
          });
        },
        b = (function () {
          return Array.prototype.indexOf
            ? Array.prototype.indexOf
            : function (m, d) {
                for (var f = this.length; f--; ) if (this[f] === d) return f;
                return -1;
              };
        })(),
        C = function (m, d) {
          var f = y.inside.source.replace(/</g, m).replace(/>/g, d);
          return new RegExp(f);
        },
        I = function (m, d, f) {
          return (
            (m = m.source), (m = m.replace(d, f.source || f)), new RegExp(m)
          );
        },
        M = function (m, d) {
          return m
            .replace(/^(?:\w+:\/\/|\/+)/, "")
            .replace(/(?:\/+|\/*#.*?)$/, "")
            .split("/", d)
            .join("/");
        },
        G = function (m, d) {
          var f = m.replace(/\s+/g, ""),
            p;
          return (
            f === "even"
              ? (f = "2n+0")
              : f === "odd"
                ? (f = "2n+1")
                : f.indexOf("n") === -1 && (f = "0n" + f),
            (p = /^([+-])?(\d+)?n([+-])?(\d+)?$/.exec(f)),
            {
              group: p[1] === "-" ? -(p[2] || 1) : +(p[2] || 1),
              offset: p[4] ? (p[3] === "-" ? -p[4] : +p[4]) : 0,
            }
          );
        },
        P = function (m, d, f) {
          var p = G(m),
            S = p.group,
            k = p.offset,
            U = f ? h : o,
            W = f ? i : s;
          return function (ie) {
            if (c(ie))
              for (var T = U(ie.parentNode), R = 0; T; ) {
                if ((d(T, ie) && R++, T === ie))
                  return (R -= k), S && R ? R % S === 0 && R < 0 == S < 0 : !R;
                T = W(T);
              }
          };
        },
        w = {
          "*": (function () {
            return function () {
              return !0;
            };
          })(),
          type: function (m) {
            return (
              (m = m.toLowerCase()),
              function (d) {
                return d.nodeName.toLowerCase() === m;
              }
            );
          },
          attr: function (m, d, f, p) {
            return (
              (d = v[d]),
              function (S) {
                var k;
                switch (m) {
                  case "for":
                    k = S.htmlFor;
                    break;
                  case "class":
                    (k = S.className),
                      k === "" && S.getAttribute("class") == null && (k = null);
                    break;
                  case "href":
                  case "src":
                    k = S.getAttribute(m, 2);
                    break;
                  case "title":
                    k = S.getAttribute("title") || null;
                    break;
                  case "id":
                  case "lang":
                  case "dir":
                  case "accessKey":
                  case "hidden":
                  case "tabIndex":
                  case "style":
                    if (S.getAttribute) {
                      k = S.getAttribute(m);
                      break;
                    }
                  default:
                    if (S.hasAttribute && !S.hasAttribute(m)) break;
                    k =
                      S[m] != null ? S[m] : S.getAttribute && S.getAttribute(m);
                    break;
                }
                if (k != null)
                  return (
                    (k = k + ""),
                    p && ((k = k.toLowerCase()), (f = f.toLowerCase())),
                    d(k, f)
                  );
              }
            );
          },
          ":first-child": function (m) {
            return !i(m) && c(m);
          },
          ":last-child": function (m) {
            return !s(m) && c(m);
          },
          ":only-child": function (m) {
            return !i(m) && !s(m) && c(m);
          },
          ":nth-child": function (m, d) {
            return P(
              m,
              function () {
                return !0;
              },
              d
            );
          },
          ":nth-last-child": function (m) {
            return w[":nth-child"](m, !0);
          },
          ":root": function (m) {
            return m.ownerDocument.documentElement === m;
          },
          ":empty": function (m) {
            return !m.firstChild;
          },
          ":not": function (m) {
            var d = H(m);
            return function (f) {
              return !d(f);
            };
          },
          ":first-of-type": function (m) {
            if (c(m)) {
              for (var d = m.nodeName; (m = i(m)); )
                if (m.nodeName === d) return;
              return !0;
            }
          },
          ":last-of-type": function (m) {
            if (c(m)) {
              for (var d = m.nodeName; (m = s(m)); )
                if (m.nodeName === d) return;
              return !0;
            }
          },
          ":only-of-type": function (m) {
            return w[":first-of-type"](m) && w[":last-of-type"](m);
          },
          ":nth-of-type": function (m, d) {
            return P(
              m,
              function (f, p) {
                return f.nodeName === p.nodeName;
              },
              d
            );
          },
          ":nth-last-of-type": function (m) {
            return w[":nth-of-type"](m, !0);
          },
          ":checked": function (m) {
            return !!(m.checked || m.selected);
          },
          ":indeterminate": function (m) {
            return !w[":checked"](m);
          },
          ":enabled": function (m) {
            return !m.disabled && m.type !== "hidden";
          },
          ":disabled": function (m) {
            return !!m.disabled;
          },
          ":target": function (m) {
            return m.id === t.location.hash.substring(1);
          },
          ":focus": function (m) {
            return m === m.ownerDocument.activeElement;
          },
          ":is": function (m) {
            return H(m);
          },
          ":matches": function (m) {
            return w[":is"](m);
          },
          ":nth-match": function (m, d) {
            var f = m.split(/\s*,\s*/),
              p = f.shift(),
              S = H(f.join(","));
            return P(p, S, d);
          },
          ":nth-last-match": function (m) {
            return w[":nth-match"](m, !0);
          },
          ":links-here": function (m) {
            return m + "" == t.location + "";
          },
          ":lang": function (m) {
            return function (d) {
              for (; d; ) {
                if (d.lang) return d.lang.indexOf(m) === 0;
                d = d.parentNode;
              }
            };
          },
          ":dir": function (m) {
            return function (d) {
              for (; d; ) {
                if (d.dir) return d.dir === m;
                d = d.parentNode;
              }
            };
          },
          ":scope": function (m, d) {
            var f = d || m.ownerDocument;
            return f.nodeType === 9 ? m === f.documentElement : m === f;
          },
          ":any-link": function (m) {
            return typeof m.href == "string";
          },
          ":local-link": function (m) {
            if (m.nodeName) return m.href && m.host === t.location.host;
            var d = +m + 1;
            return function (f) {
              if (f.href) {
                var p = t.location + "",
                  S = f + "";
                return M(p, d) === M(S, d);
              }
            };
          },
          ":default": function (m) {
            return !!m.defaultSelected;
          },
          ":valid": function (m) {
            return m.willValidate || (m.validity && m.validity.valid);
          },
          ":invalid": function (m) {
            return !w[":valid"](m);
          },
          ":in-range": function (m) {
            return m.value > m.min && m.value <= m.max;
          },
          ":out-of-range": function (m) {
            return !w[":in-range"](m);
          },
          ":required": function (m) {
            return !!m.required;
          },
          ":optional": function (m) {
            return !m.required;
          },
          ":read-only": function (m) {
            if (m.readOnly) return !0;
            var d = m.getAttribute("contenteditable"),
              f = m.contentEditable,
              p = m.nodeName.toLowerCase();
            return (
              (p = p !== "input" && p !== "textarea"),
              (p || m.disabled) && d == null && f !== "true"
            );
          },
          ":read-write": function (m) {
            return !w[":read-only"](m);
          },
          ":hover": function () {
            throw new Error(":hover is not supported.");
          },
          ":active": function () {
            throw new Error(":active is not supported.");
          },
          ":link": function () {
            throw new Error(":link is not supported.");
          },
          ":visited": function () {
            throw new Error(":visited is not supported.");
          },
          ":column": function () {
            throw new Error(":column is not supported.");
          },
          ":nth-column": function () {
            throw new Error(":nth-column is not supported.");
          },
          ":nth-last-column": function () {
            throw new Error(":nth-last-column is not supported.");
          },
          ":current": function () {
            throw new Error(":current is not supported.");
          },
          ":past": function () {
            throw new Error(":past is not supported.");
          },
          ":future": function () {
            throw new Error(":future is not supported.");
          },
          ":contains": function (m) {
            return function (d) {
              var f = d.innerText || d.textContent || d.value || "";
              return f.indexOf(m) !== -1;
            };
          },
          ":has": function (m) {
            return function (d) {
              return Q(m, d).length > 0;
            };
          },
        },
        v = {
          "-": function () {
            return !0;
          },
          "=": function (m, d) {
            return m === d;
          },
          "*=": function (m, d) {
            return m.indexOf(d) !== -1;
          },
          "~=": function (m, d) {
            var f, p, S, k;
            for (p = 0; ; p = f + 1) {
              if (((f = m.indexOf(d, p)), f === -1)) return !1;
              if (
                ((S = m[f - 1]),
                (k = m[f + d.length]),
                (!S || S === " ") && (!k || k === " "))
              )
                return !0;
            }
          },
          "|=": function (m, d) {
            var f = m.indexOf(d),
              p;
            if (f === 0) return (p = m[f + d.length]), p === "-" || !p;
          },
          "^=": function (m, d) {
            return m.indexOf(d) === 0;
          },
          "$=": function (m, d) {
            var f = m.lastIndexOf(d);
            return f !== -1 && f + d.length === m.length;
          },
          "!=": function (m, d) {
            return m !== d;
          },
        },
        N = {
          " ": function (m) {
            return function (d) {
              for (; (d = d.parentNode); ) if (m(d)) return d;
            };
          },
          ">": function (m) {
            return function (d) {
              if ((d = d.parentNode)) return m(d) && d;
            };
          },
          "+": function (m) {
            return function (d) {
              if ((d = i(d))) return m(d) && d;
            };
          },
          "~": function (m) {
            return function (d) {
              for (; (d = i(d)); ) if (m(d)) return d;
            };
          },
          noop: function (m) {
            return function (d) {
              return m(d) && d;
            };
          },
          ref: function (m, d) {
            var f;
            function p(S) {
              for (
                var k = S.ownerDocument,
                  U = k.getElementsByTagName("*"),
                  W = U.length;
                W--;

              )
                if (((f = U[W]), p.test(S))) return (f = null), !0;
              f = null;
            }
            return (
              (p.combinator = function (S) {
                if (!(!f || !f.getAttribute)) {
                  var k = f.getAttribute(d) || "";
                  if (
                    (k[0] === "#" && (k = k.substring(1)), k === S.id && m(f))
                  )
                    return f;
                }
              }),
              p
            );
          },
        },
        y = {
          escape: /\\(?:[^0-9A-Fa-f\r\n]|[0-9A-Fa-f]{1,6}[\r\n\t ]?)/g,
          str_escape: /(escape)|\\(\n|\r\n?|\f)/g,
          nonascii: /[\u00A0-\uFFFF]/,
          cssid: /(?:(?!-?[0-9])(?:escape|nonascii|[-_a-zA-Z0-9])+)/,
          qname: /^ *(cssid|\*)/,
          simple: /^(?:([.#]cssid)|pseudo|attr)/,
          ref: /^ *\/(cssid)\/ */,
          combinator: /^(?: +([^ \w*.#\\]) +|( )+|([^ \w*.#\\]))(?! *$)/,
          attr: /^\[(cssid)(?:([^\w]?=)(inside))?\]/,
          pseudo: /^(:cssid)(?:\((inside)\))?/,
          inside:
            /(?:"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|<[^"'>]*>|\\["'>]|[^"'>])*/,
          ident: /^(cssid)$/,
        };
      (y.cssid = I(y.cssid, "nonascii", y.nonascii)),
        (y.cssid = I(y.cssid, "escape", y.escape)),
        (y.qname = I(y.qname, "cssid", y.cssid)),
        (y.simple = I(y.simple, "cssid", y.cssid)),
        (y.ref = I(y.ref, "cssid", y.cssid)),
        (y.attr = I(y.attr, "cssid", y.cssid)),
        (y.pseudo = I(y.pseudo, "cssid", y.cssid)),
        (y.inside = I(y.inside, `[^"'>]*`, y.inside)),
        (y.attr = I(y.attr, "inside", C("\\[", "\\]"))),
        (y.pseudo = I(y.pseudo, "inside", C("\\(", "\\)"))),
        (y.simple = I(y.simple, "pseudo", y.pseudo)),
        (y.simple = I(y.simple, "attr", y.attr)),
        (y.ident = I(y.ident, "cssid", y.cssid)),
        (y.str_escape = I(y.str_escape, "escape", y.escape));
      var ne = function (m) {
          for (
            var d = m.replace(/^\s+|\s+$/g, ""),
              f,
              p = [],
              S = [],
              k,
              U,
              W,
              ie,
              T;
            d;

          ) {
            if ((W = y.qname.exec(d)))
              (d = d.substring(W[0].length)), (U = g(W[1])), S.push(ee(U, !0));
            else if ((W = y.simple.exec(d)))
              (d = d.substring(W[0].length)),
                (U = "*"),
                S.push(ee(U, !0)),
                S.push(ee(W));
            else throw new SyntaxError("Invalid selector.");
            for (; (W = y.simple.exec(d)); )
              (d = d.substring(W[0].length)), S.push(ee(W));
            if (
              (d[0] === "!" &&
                ((d = d.substring(1)),
                (k = L()),
                (k.qname = U),
                S.push(k.simple)),
              (W = y.ref.exec(d)))
            ) {
              (d = d.substring(W[0].length)),
                (T = N.ref(oe(S), g(W[1]))),
                p.push(T.combinator),
                (S = []);
              continue;
            }
            if ((W = y.combinator.exec(d))) {
              if (
                ((d = d.substring(W[0].length)),
                (ie = W[1] || W[2] || W[3]),
                ie === ",")
              ) {
                p.push(N.noop(oe(S)));
                break;
              }
            } else ie = "noop";
            if (!N[ie]) throw new SyntaxError("Bad combinator.");
            p.push(N[ie](oe(S))), (S = []);
          }
          return (
            (f = V(p)),
            (f.qname = U),
            (f.sel = d),
            k &&
              ((k.lname = f.qname),
              (k.test = f),
              (k.qname = k.qname),
              (k.sel = f.sel),
              (f = k)),
            T && ((T.test = f), (T.qname = f.qname), (T.sel = f.sel), (f = T)),
            f
          );
        },
        ee = function (m, d) {
          if (d) return m === "*" ? w["*"] : w.type(m);
          if (m[1])
            return m[1][0] === "."
              ? w.attr("class", "~=", g(m[1].substring(1)), !1)
              : w.attr("id", "=", g(m[1].substring(1)), !1);
          if (m[2]) return m[3] ? w[g(m[2])](_(m[3])) : w[g(m[2])];
          if (m[4]) {
            var f = m[6],
              p = /["'\s]\s*I$/i.test(f);
            return (
              p && (f = f.replace(/\s*I$/i, "")),
              w.attr(g(m[4]), m[5] || "-", _(f), p)
            );
          }
          throw new SyntaxError("Unknown Selector.");
        },
        oe = function (m) {
          var d = m.length,
            f;
          return d < 2
            ? m[0]
            : function (p) {
                if (p) {
                  for (f = 0; f < d; f++) if (!m[f](p)) return;
                  return !0;
                }
              };
        },
        V = function (m) {
          return m.length < 2
            ? function (d) {
                return !!m[0](d);
              }
            : function (d) {
                for (var f = m.length; f--; ) if (!(d = m[f](d))) return;
                return !0;
              };
        },
        L = function () {
          var m;
          function d(f) {
            for (
              var p = f.ownerDocument,
                S = p.getElementsByTagName(d.lname),
                k = S.length;
              k--;

            )
              if (d.test(S[k]) && m === f) return (m = null), !0;
            m = null;
          }
          return (
            (d.simple = function (f) {
              return (m = f), !0;
            }),
            d
          );
        },
        H = function (m) {
          for (var d = ne(m), f = [d]; d.sel; ) (d = ne(d.sel)), f.push(d);
          return f.length < 2
            ? d
            : function (p) {
                for (var S = f.length, k = 0; k < S; k++)
                  if (f[k](p)) return !0;
              };
        },
        Q = function (m, d) {
          for (
            var f = [],
              p = ne(m),
              S = d.getElementsByTagName(p.qname),
              k = 0,
              U;
            (U = S[k++]);

          )
            p(U) && f.push(U);
          if (p.sel) {
            for (; p.sel; )
              for (
                p = ne(p.sel), S = d.getElementsByTagName(p.qname), k = 0;
                (U = S[k++]);

              )
                p(U) && b.call(f, U) === -1 && f.push(U);
            f.sort(n);
          }
          return f;
        };
      (e.exports = a =
        function (m, d) {
          var f, p;
          if (d.nodeType !== 11 && m.indexOf(" ") === -1) {
            if (
              m[0] === "#" &&
              d.rooted &&
              /^#[A-Z_][-A-Z0-9_]*$/i.test(m) &&
              d.doc._hasMultipleElementsWithId &&
              ((f = m.substring(1)), !d.doc._hasMultipleElementsWithId(f))
            )
              return (p = d.doc.getElementById(f)), p ? [p] : [];
            if (m[0] === "." && /^\.\w+$/.test(m))
              return d.getElementsByClassName(m.substring(1));
            if (/^\w+$/.test(m)) return d.getElementsByTagName(m);
          }
          return Q(m, d);
        }),
        (a.selectors = w),
        (a.operators = v),
        (a.combinators = N),
        (a.matches = function (m, d) {
          var f = { sel: d };
          do if (((f = ne(f.sel)), f(m))) return !0;
          while (f.sel);
          return !1;
        });
    },
  }),
  Ts = J({
    "external/npm/node_modules/domino/lib/ChildNode.js"(a, e) {
      "use strict";
      var t = Re(),
        r = ba(),
        n = function (i, o) {
          for (var h = i.createDocumentFragment(), c = 0; c < o.length; c++) {
            var _ = o[c],
              g = _ instanceof t;
            h.appendChild(g ? _ : i.createTextNode(String(_)));
          }
          return h;
        },
        s = {
          after: {
            value: function () {
              var o = Array.prototype.slice.call(arguments),
                h = this.parentNode,
                c = this.nextSibling;
              if (h !== null) {
                for (
                  ;
                  c &&
                  o.some(function (g) {
                    return g === c;
                  });

                )
                  c = c.nextSibling;
                var _ = n(this.doc, o);
                h.insertBefore(_, c);
              }
            },
          },
          before: {
            value: function () {
              var o = Array.prototype.slice.call(arguments),
                h = this.parentNode,
                c = this.previousSibling;
              if (h !== null) {
                for (
                  ;
                  c &&
                  o.some(function (b) {
                    return b === c;
                  });

                )
                  c = c.previousSibling;
                var _ = n(this.doc, o),
                  g = c ? c.nextSibling : h.firstChild;
                h.insertBefore(_, g);
              }
            },
          },
          remove: {
            value: function () {
              this.parentNode !== null &&
                (this.doc &&
                  (this.doc._preremoveNodeIterators(this),
                  this.rooted && this.doc.mutateRemove(this)),
                this._remove(),
                (this.parentNode = null));
            },
          },
          _remove: {
            value: function () {
              var o = this.parentNode;
              o !== null &&
                (o._childNodes
                  ? o._childNodes.splice(this.index, 1)
                  : o._firstChild === this &&
                    (this._nextSibling === this
                      ? (o._firstChild = null)
                      : (o._firstChild = this._nextSibling)),
                r.remove(this),
                o.modify());
            },
          },
          replaceWith: {
            value: function () {
              var o = Array.prototype.slice.call(arguments),
                h = this.parentNode,
                c = this.nextSibling;
              if (h !== null) {
                for (
                  ;
                  c &&
                  o.some(function (g) {
                    return g === c;
                  });

                )
                  c = c.nextSibling;
                var _ = n(this.doc, o);
                this.parentNode === h
                  ? h.replaceChild(_, this)
                  : h.insertBefore(_, c);
              }
            },
          },
        };
      e.exports = s;
    },
  }),
  Sa = J({
    "external/npm/node_modules/domino/lib/NonDocumentTypeChildNode.js"(a, e) {
      "use strict";
      var t = Re(),
        r = {
          nextElementSibling: {
            get: function () {
              if (this.parentNode) {
                for (var n = this.nextSibling; n !== null; n = n.nextSibling)
                  if (n.nodeType === t.ELEMENT_NODE) return n;
              }
              return null;
            },
          },
          previousElementSibling: {
            get: function () {
              if (this.parentNode) {
                for (
                  var n = this.previousSibling;
                  n !== null;
                  n = n.previousSibling
                )
                  if (n.nodeType === t.ELEMENT_NODE) return n;
              }
              return null;
            },
          },
        };
      e.exports = r;
    },
  }),
  wa = J({
    "external/npm/node_modules/domino/lib/NamedNodeMap.js"(a, e) {
      "use strict";
      e.exports = r;
      var t = ke();
      function r(n) {
        this.element = n;
      }
      Object.defineProperties(r.prototype, {
        length: { get: t.shouldOverride },
        item: { value: t.shouldOverride },
        getNamedItem: {
          value: function (s) {
            return this.element.getAttributeNode(s);
          },
        },
        getNamedItemNS: {
          value: function (s, i) {
            return this.element.getAttributeNodeNS(s, i);
          },
        },
        setNamedItem: { value: t.nyi },
        setNamedItemNS: { value: t.nyi },
        removeNamedItem: {
          value: function (s) {
            var i = this.element.getAttributeNode(s);
            if (i) return this.element.removeAttribute(s), i;
            t.NotFoundError();
          },
        },
        removeNamedItemNS: {
          value: function (s, i) {
            var o = this.element.getAttributeNodeNS(s, i);
            if (o) return this.element.removeAttributeNS(s, i), o;
            t.NotFoundError();
          },
        },
      });
    },
  }),
  yr = J({
    "external/npm/node_modules/domino/lib/Element.js"(a, e) {
      "use strict";
      e.exports = w;
      var t = Es(),
        r = ke(),
        n = r.NAMESPACE,
        s = va(),
        i = Re(),
        o = Zt(),
        h = Ea(),
        c = Hc(),
        _ = _s(),
        g = Ta(),
        b = vs(),
        C = bs(),
        I = Ts(),
        M = Sa(),
        G = wa(),
        P = Object.create(null);
      function w(d, f, p, S) {
        C.call(this),
          (this.nodeType = i.ELEMENT_NODE),
          (this.ownerDocument = d),
          (this.localName = f),
          (this.namespaceURI = p),
          (this.prefix = S),
          (this._tagName = void 0),
          (this._attrsByQName = Object.create(null)),
          (this._attrsByLName = Object.create(null)),
          (this._attrKeys = []);
      }
      function v(d, f) {
        if (d.nodeType === i.TEXT_NODE) f.push(d._data);
        else
          for (var p = 0, S = d.childNodes.length; p < S; p++)
            v(d.childNodes[p], f);
      }
      (w.prototype = Object.create(C.prototype, {
        isHTML: {
          get: function () {
            return this.namespaceURI === n.HTML && this.ownerDocument.isHTML;
          },
        },
        tagName: {
          get: function () {
            if (this._tagName === void 0) {
              var f;
              if (
                (this.prefix === null
                  ? (f = this.localName)
                  : (f = this.prefix + ":" + this.localName),
                this.isHTML)
              ) {
                var p = P[f];
                p || (P[f] = p = r.toASCIIUpperCase(f)), (f = p);
              }
              this._tagName = f;
            }
            return this._tagName;
          },
        },
        nodeName: {
          get: function () {
            return this.tagName;
          },
        },
        nodeValue: {
          get: function () {
            return null;
          },
          set: function () {},
        },
        textContent: {
          get: function () {
            var d = [];
            return v(this, d), d.join("");
          },
          set: function (d) {
            this.removeChildren(),
              d != null &&
                d !== "" &&
                this._appendChild(this.ownerDocument.createTextNode(d));
          },
        },
        innerText: {
          get: function () {
            var d = [];
            return (
              v(this, d),
              d
                .join("")
                .replace(/[ \t\n\f\r]+/g, " ")
                .trim()
            );
          },
          set: function (d) {
            this.removeChildren(),
              d != null &&
                d !== "" &&
                this._appendChild(this.ownerDocument.createTextNode(d));
          },
        },
        innerHTML: {
          get: function () {
            return this.serialize();
          },
          set: r.nyi,
        },
        outerHTML: {
          get: function () {
            return h.serializeOne(this, { nodeType: 0 });
          },
          set: function (d) {
            var f = this.ownerDocument,
              p = this.parentNode;
            if (p !== null) {
              p.nodeType === i.DOCUMENT_NODE && r.NoModificationAllowedError(),
                p.nodeType === i.DOCUMENT_FRAGMENT_NODE &&
                  (p = p.ownerDocument.createElement("body"));
              var S = f.implementation.mozHTMLParser(f._address, p);
              S.parse(d === null ? "" : String(d), !0),
                this.replaceWith(S._asDocumentFragment());
            }
          },
        },
        _insertAdjacent: {
          value: function (f, p) {
            var S = !1;
            switch (f) {
              case "beforebegin":
                S = !0;
              case "afterend":
                var k = this.parentNode;
                return k === null
                  ? null
                  : k.insertBefore(p, S ? this : this.nextSibling);
              case "afterbegin":
                S = !0;
              case "beforeend":
                return this.insertBefore(p, S ? this.firstChild : null);
              default:
                return r.SyntaxError();
            }
          },
        },
        insertAdjacentElement: {
          value: function (f, p) {
            if (p.nodeType !== i.ELEMENT_NODE)
              throw new TypeError("not an element");
            return (
              (f = r.toASCIILowerCase(String(f))), this._insertAdjacent(f, p)
            );
          },
        },
        insertAdjacentText: {
          value: function (f, p) {
            var S = this.ownerDocument.createTextNode(p);
            (f = r.toASCIILowerCase(String(f))), this._insertAdjacent(f, S);
          },
        },
        insertAdjacentHTML: {
          value: function (f, p) {
            (f = r.toASCIILowerCase(String(f))), (p = String(p));
            var S;
            switch (f) {
              case "beforebegin":
              case "afterend":
                (S = this.parentNode),
                  (S === null || S.nodeType === i.DOCUMENT_NODE) &&
                    r.NoModificationAllowedError();
                break;
              case "afterbegin":
              case "beforeend":
                S = this;
                break;
              default:
                r.SyntaxError();
            }
            (!(S instanceof w) ||
              (S.ownerDocument.isHTML &&
                S.localName === "html" &&
                S.namespaceURI === n.HTML)) &&
              (S = S.ownerDocument.createElementNS(n.HTML, "body"));
            var k = this.ownerDocument.implementation.mozHTMLParser(
              this.ownerDocument._address,
              S
            );
            k.parse(p, !0), this._insertAdjacent(f, k._asDocumentFragment());
          },
        },
        children: {
          get: function () {
            return (
              this._children || (this._children = new ee(this)), this._children
            );
          },
        },
        attributes: {
          get: function () {
            return (
              this._attributes || (this._attributes = new y(this)),
              this._attributes
            );
          },
        },
        firstElementChild: {
          get: function () {
            for (var d = this.firstChild; d !== null; d = d.nextSibling)
              if (d.nodeType === i.ELEMENT_NODE) return d;
            return null;
          },
        },
        lastElementChild: {
          get: function () {
            for (var d = this.lastChild; d !== null; d = d.previousSibling)
              if (d.nodeType === i.ELEMENT_NODE) return d;
            return null;
          },
        },
        childElementCount: {
          get: function () {
            return this.children.length;
          },
        },
        nextElement: {
          value: function (d) {
            d || (d = this.ownerDocument.documentElement);
            var f = this.firstElementChild;
            if (!f) {
              if (this === d) return null;
              f = this.nextElementSibling;
            }
            if (f) return f;
            for (var p = this.parentElement; p && p !== d; p = p.parentElement)
              if (((f = p.nextElementSibling), f)) return f;
            return null;
          },
        },
        getElementsByTagName: {
          value: function (f) {
            var p;
            return f
              ? (f === "*"
                  ? (p = function () {
                      return !0;
                    })
                  : this.isHTML
                    ? (p = V(f))
                    : (p = oe(f)),
                new c(this, p))
              : new o();
          },
        },
        getElementsByTagNameNS: {
          value: function (f, p) {
            var S;
            return (
              f === "*" && p === "*"
                ? (S = function () {
                    return !0;
                  })
                : f === "*"
                  ? (S = oe(p))
                  : p === "*"
                    ? (S = L(f))
                    : (S = H(f, p)),
              new c(this, S)
            );
          },
        },
        getElementsByClassName: {
          value: function (f) {
            if (((f = String(f).trim()), f === "")) {
              var p = new o();
              return p;
            }
            return (f = f.split(/[ \t\r\n\f]+/)), new c(this, Q(f));
          },
        },
        getElementsByName: {
          value: function (f) {
            return new c(this, m(String(f)));
          },
        },
        clone: {
          value: function () {
            var f;
            this.namespaceURI !== n.HTML ||
            this.prefix ||
            !this.ownerDocument.isHTML
              ? (f = this.ownerDocument.createElementNS(
                  this.namespaceURI,
                  this.prefix !== null
                    ? this.prefix + ":" + this.localName
                    : this.localName
                ))
              : (f = this.ownerDocument.createElement(this.localName));
            for (var p = 0, S = this._attrKeys.length; p < S; p++) {
              var k = this._attrKeys[p],
                U = this._attrsByLName[k],
                W = U.cloneNode();
              W._setOwnerElement(f), (f._attrsByLName[k] = W), f._addQName(W);
            }
            return (f._attrKeys = this._attrKeys.concat()), f;
          },
        },
        isEqual: {
          value: function (f) {
            if (
              this.localName !== f.localName ||
              this.namespaceURI !== f.namespaceURI ||
              this.prefix !== f.prefix ||
              this._numattrs !== f._numattrs
            )
              return !1;
            for (var p = 0, S = this._numattrs; p < S; p++) {
              var k = this._attr(p);
              if (
                !f.hasAttributeNS(k.namespaceURI, k.localName) ||
                f.getAttributeNS(k.namespaceURI, k.localName) !== k.value
              )
                return !1;
            }
            return !0;
          },
        },
        _lookupNamespacePrefix: {
          value: function (f, p) {
            if (
              this.namespaceURI &&
              this.namespaceURI === f &&
              this.prefix !== null &&
              p.lookupNamespaceURI(this.prefix) === f
            )
              return this.prefix;
            for (var S = 0, k = this._numattrs; S < k; S++) {
              var U = this._attr(S);
              if (
                U.prefix === "xmlns" &&
                U.value === f &&
                p.lookupNamespaceURI(U.localName) === f
              )
                return U.localName;
            }
            var W = this.parentElement;
            return W ? W._lookupNamespacePrefix(f, p) : null;
          },
        },
        lookupNamespaceURI: {
          value: function (f) {
            if (
              ((f === "" || f === void 0) && (f = null),
              this.namespaceURI !== null && this.prefix === f)
            )
              return this.namespaceURI;
            for (var p = 0, S = this._numattrs; p < S; p++) {
              var k = this._attr(p);
              if (
                k.namespaceURI === n.XMLNS &&
                ((k.prefix === "xmlns" && k.localName === f) ||
                  (f === null && k.prefix === null && k.localName === "xmlns"))
              )
                return k.value || null;
            }
            var U = this.parentElement;
            return U ? U.lookupNamespaceURI(f) : null;
          },
        },
        getAttribute: {
          value: function (f) {
            var p = this.getAttributeNode(f);
            return p ? p.value : null;
          },
        },
        getAttributeNS: {
          value: function (f, p) {
            var S = this.getAttributeNodeNS(f, p);
            return S ? S.value : null;
          },
        },
        getAttributeNode: {
          value: function (f) {
            (f = String(f)),
              /[A-Z]/.test(f) && this.isHTML && (f = r.toASCIILowerCase(f));
            var p = this._attrsByQName[f];
            return p ? (Array.isArray(p) && (p = p[0]), p) : null;
          },
        },
        getAttributeNodeNS: {
          value: function (f, p) {
            (f = f == null ? "" : String(f)), (p = String(p));
            var S = this._attrsByLName[f + "|" + p];
            return S || null;
          },
        },
        hasAttribute: {
          value: function (f) {
            return (
              (f = String(f)),
              /[A-Z]/.test(f) && this.isHTML && (f = r.toASCIILowerCase(f)),
              this._attrsByQName[f] !== void 0
            );
          },
        },
        hasAttributeNS: {
          value: function (f, p) {
            (f = f == null ? "" : String(f)), (p = String(p));
            var S = f + "|" + p;
            return this._attrsByLName[S] !== void 0;
          },
        },
        hasAttributes: {
          value: function () {
            return this._numattrs > 0;
          },
        },
        toggleAttribute: {
          value: function (f, p) {
            (f = String(f)),
              t.isValidName(f) || r.InvalidCharacterError(),
              /[A-Z]/.test(f) && this.isHTML && (f = r.toASCIILowerCase(f));
            var S = this._attrsByQName[f];
            return S === void 0
              ? p === void 0 || p === !0
                ? (this._setAttribute(f, ""), !0)
                : !1
              : p === void 0 || p === !1
                ? (this.removeAttribute(f), !1)
                : !0;
          },
        },
        _setAttribute: {
          value: function (f, p) {
            var S = this._attrsByQName[f],
              k;
            S
              ? Array.isArray(S) && (S = S[0])
              : ((S = this._newattr(f)), (k = !0)),
              (S.value = p),
              this._attributes && (this._attributes[f] = S),
              k && this._newattrhook && this._newattrhook(f, p);
          },
        },
        setAttribute: {
          value: function (f, p) {
            (f = String(f)),
              t.isValidName(f) || r.InvalidCharacterError(),
              /[A-Z]/.test(f) && this.isHTML && (f = r.toASCIILowerCase(f)),
              this._setAttribute(f, String(p));
          },
        },
        _setAttributeNS: {
          value: function (f, p, S) {
            var k = p.indexOf(":"),
              U,
              W;
            k < 0
              ? ((U = null), (W = p))
              : ((U = p.substring(0, k)), (W = p.substring(k + 1))),
              (f === "" || f === void 0) && (f = null);
            var ie = (f === null ? "" : f) + "|" + W,
              T = this._attrsByLName[ie],
              R;
            T ||
              ((T = new N(this, W, U, f)),
              (R = !0),
              (this._attrsByLName[ie] = T),
              this._attributes && (this._attributes[this._attrKeys.length] = T),
              this._attrKeys.push(ie),
              this._addQName(T)),
              (T.value = S),
              R && this._newattrhook && this._newattrhook(p, S);
          },
        },
        setAttributeNS: {
          value: function (f, p, S) {
            (f = f == null || f === "" ? null : String(f)),
              (p = String(p)),
              t.isValidQName(p) || r.InvalidCharacterError();
            var k = p.indexOf(":"),
              U = k < 0 ? null : p.substring(0, k);
            ((U !== null && f === null) ||
              (U === "xml" && f !== n.XML) ||
              ((p === "xmlns" || U === "xmlns") && f !== n.XMLNS) ||
              (f === n.XMLNS && !(p === "xmlns" || U === "xmlns"))) &&
              r.NamespaceError(),
              this._setAttributeNS(f, p, String(S));
          },
        },
        setAttributeNode: {
          value: function (f) {
            if (f.ownerElement !== null && f.ownerElement !== this)
              throw new _(_.INUSE_ATTRIBUTE_ERR);
            var p = null,
              S = this._attrsByQName[f.name];
            if (S) {
              if (
                (Array.isArray(S) || (S = [S]),
                S.some(function (k) {
                  return k === f;
                }))
              )
                return f;
              if (f.ownerElement !== null) throw new _(_.INUSE_ATTRIBUTE_ERR);
              S.forEach(function (k) {
                this.removeAttributeNode(k);
              }, this),
                (p = S[0]);
            }
            return this.setAttributeNodeNS(f), p;
          },
        },
        setAttributeNodeNS: {
          value: function (f) {
            if (f.ownerElement !== null) throw new _(_.INUSE_ATTRIBUTE_ERR);
            var p = f.namespaceURI,
              S = (p === null ? "" : p) + "|" + f.localName,
              k = this._attrsByLName[S];
            return (
              k && this.removeAttributeNode(k),
              f._setOwnerElement(this),
              (this._attrsByLName[S] = f),
              this._attributes && (this._attributes[this._attrKeys.length] = f),
              this._attrKeys.push(S),
              this._addQName(f),
              this._newattrhook && this._newattrhook(f.name, f.value),
              k || null
            );
          },
        },
        removeAttribute: {
          value: function (f) {
            (f = String(f)),
              /[A-Z]/.test(f) && this.isHTML && (f = r.toASCIILowerCase(f));
            var p = this._attrsByQName[f];
            if (p) {
              Array.isArray(p)
                ? p.length > 2
                  ? (p = p.shift())
                  : ((this._attrsByQName[f] = p[1]), (p = p[0]))
                : (this._attrsByQName[f] = void 0);
              var S = p.namespaceURI,
                k = (S === null ? "" : S) + "|" + p.localName;
              this._attrsByLName[k] = void 0;
              var U = this._attrKeys.indexOf(k);
              this._attributes &&
                (Array.prototype.splice.call(this._attributes, U, 1),
                (this._attributes[f] = void 0)),
                this._attrKeys.splice(U, 1);
              var W = p.onchange;
              p._setOwnerElement(null),
                W && W.call(p, this, p.localName, p.value, null),
                this.rooted && this.ownerDocument.mutateRemoveAttr(p);
            }
          },
        },
        removeAttributeNS: {
          value: function (f, p) {
            (f = f == null ? "" : String(f)), (p = String(p));
            var S = f + "|" + p,
              k = this._attrsByLName[S];
            if (k) {
              this._attrsByLName[S] = void 0;
              var U = this._attrKeys.indexOf(S);
              this._attributes &&
                Array.prototype.splice.call(this._attributes, U, 1),
                this._attrKeys.splice(U, 1),
                this._removeQName(k);
              var W = k.onchange;
              k._setOwnerElement(null),
                W && W.call(k, this, k.localName, k.value, null),
                this.rooted && this.ownerDocument.mutateRemoveAttr(k);
            }
          },
        },
        removeAttributeNode: {
          value: function (f) {
            var p = f.namespaceURI,
              S = (p === null ? "" : p) + "|" + f.localName;
            return (
              this._attrsByLName[S] !== f && r.NotFoundError(),
              this.removeAttributeNS(p, f.localName),
              f
            );
          },
        },
        getAttributeNames: {
          value: function () {
            var f = this;
            return this._attrKeys.map(function (p) {
              return f._attrsByLName[p].name;
            });
          },
        },
        _getattr: {
          value: function (f) {
            var p = this._attrsByQName[f];
            return p ? p.value : null;
          },
        },
        _setattr: {
          value: function (f, p) {
            var S = this._attrsByQName[f],
              k;
            S || ((S = this._newattr(f)), (k = !0)),
              (S.value = String(p)),
              this._attributes && (this._attributes[f] = S),
              k && this._newattrhook && this._newattrhook(f, p);
          },
        },
        _newattr: {
          value: function (f) {
            var p = new N(this, f, null, null),
              S = "|" + f;
            return (
              (this._attrsByQName[f] = p),
              (this._attrsByLName[S] = p),
              this._attributes && (this._attributes[this._attrKeys.length] = p),
              this._attrKeys.push(S),
              p
            );
          },
        },
        _addQName: {
          value: function (d) {
            var f = d.name,
              p = this._attrsByQName[f];
            p
              ? Array.isArray(p)
                ? p.push(d)
                : (this._attrsByQName[f] = [p, d])
              : (this._attrsByQName[f] = d),
              this._attributes && (this._attributes[f] = d);
          },
        },
        _removeQName: {
          value: function (d) {
            var f = d.name,
              p = this._attrsByQName[f];
            if (Array.isArray(p)) {
              var S = p.indexOf(d);
              r.assert(S !== -1),
                p.length === 2
                  ? ((this._attrsByQName[f] = p[1 - S]),
                    this._attributes &&
                      (this._attributes[f] = this._attrsByQName[f]))
                  : (p.splice(S, 1),
                    this._attributes &&
                      this._attributes[f] === d &&
                      (this._attributes[f] = p[0]));
            } else
              r.assert(p === d),
                (this._attrsByQName[f] = void 0),
                this._attributes && (this._attributes[f] = void 0);
          },
        },
        _numattrs: {
          get: function () {
            return this._attrKeys.length;
          },
        },
        _attr: {
          value: function (d) {
            return this._attrsByLName[this._attrKeys[d]];
          },
        },
        id: s.property({ name: "id" }),
        className: s.property({ name: "class" }),
        classList: {
          get: function () {
            var d = this;
            if (this._classList) return this._classList;
            var f = new g(
              function () {
                return d.className || "";
              },
              function (p) {
                d.className = p;
              }
            );
            return (this._classList = f), f;
          },
          set: function (d) {
            this.className = d;
          },
        },
        matches: {
          value: function (d) {
            return b.matches(this, d);
          },
        },
        closest: {
          value: function (d) {
            var f = this;
            do {
              if (f.matches && f.matches(d)) return f;
              f = f.parentElement || f.parentNode;
            } while (f !== null && f.nodeType === i.ELEMENT_NODE);
            return null;
          },
        },
        querySelector: {
          value: function (d) {
            return b(d, this)[0];
          },
        },
        querySelectorAll: {
          value: function (d) {
            var f = b(d, this);
            return f.item ? f : new o(f);
          },
        },
      })),
        Object.defineProperties(w.prototype, I),
        Object.defineProperties(w.prototype, M),
        s.registerChangeHandler(w, "id", function (d, f, p, S) {
          d.rooted &&
            (p && d.ownerDocument.delId(p, d),
            S && d.ownerDocument.addId(S, d));
        }),
        s.registerChangeHandler(w, "class", function (d, f, p, S) {
          d._classList && d._classList._update();
        });
      function N(d, f, p, S, k) {
        (this.localName = f),
          (this.prefix = p === null || p === "" ? null : "" + p),
          (this.namespaceURI = S === null || S === "" ? null : "" + S),
          (this.data = k),
          this._setOwnerElement(d);
      }
      (N.prototype = Object.create(Object.prototype, {
        ownerElement: {
          get: function () {
            return this._ownerElement;
          },
        },
        _setOwnerElement: {
          value: function (f) {
            (this._ownerElement = f),
              this.prefix === null && this.namespaceURI === null && f
                ? (this.onchange = f._attributeChangeHandlers[this.localName])
                : (this.onchange = null);
          },
        },
        name: {
          get: function () {
            return this.prefix
              ? this.prefix + ":" + this.localName
              : this.localName;
          },
        },
        specified: {
          get: function () {
            return !0;
          },
        },
        value: {
          get: function () {
            return this.data;
          },
          set: function (d) {
            var f = this.data;
            (d = d === void 0 ? "" : d + ""),
              d !== f &&
                ((this.data = d),
                this.ownerElement &&
                  (this.onchange &&
                    this.onchange(this.ownerElement, this.localName, f, d),
                  this.ownerElement.rooted &&
                    this.ownerElement.ownerDocument.mutateAttr(this, f)));
          },
        },
        cloneNode: {
          value: function (f) {
            return new N(
              null,
              this.localName,
              this.prefix,
              this.namespaceURI,
              this.data
            );
          },
        },
        nodeType: {
          get: function () {
            return i.ATTRIBUTE_NODE;
          },
        },
        nodeName: {
          get: function () {
            return this.name;
          },
        },
        nodeValue: {
          get: function () {
            return this.value;
          },
          set: function (d) {
            this.value = d;
          },
        },
        textContent: {
          get: function () {
            return this.value;
          },
          set: function (d) {
            d == null && (d = ""), (this.value = d);
          },
        },
        innerText: {
          get: function () {
            return this.value;
          },
          set: function (d) {
            d == null && (d = ""), (this.value = d);
          },
        },
      })),
        (w._Attr = N);
      function y(d) {
        G.call(this, d);
        for (var f in d._attrsByQName) this[f] = d._attrsByQName[f];
        for (var p = 0; p < d._attrKeys.length; p++)
          this[p] = d._attrsByLName[d._attrKeys[p]];
      }
      y.prototype = Object.create(G.prototype, {
        length: {
          get: function () {
            return this.element._attrKeys.length;
          },
          set: function () {},
        },
        item: {
          value: function (d) {
            return (
              (d = d >>> 0),
              d >= this.length
                ? null
                : this.element._attrsByLName[this.element._attrKeys[d]]
            );
          },
        },
      });
      var ne;
      (ne = globalThis.Symbol) != null &&
        ne.iterator &&
        (y.prototype[globalThis.Symbol.iterator] = function () {
          var d = 0,
            f = this.length,
            p = this;
          return {
            next: function () {
              return d < f ? { value: p.item(d++) } : { done: !0 };
            },
          };
        });
      function ee(d) {
        (this.element = d), this.updateCache();
      }
      ee.prototype = Object.create(Object.prototype, {
        length: {
          get: function () {
            return this.updateCache(), this.childrenByNumber.length;
          },
        },
        item: {
          value: function (f) {
            return this.updateCache(), this.childrenByNumber[f] || null;
          },
        },
        namedItem: {
          value: function (f) {
            return this.updateCache(), this.childrenByName[f] || null;
          },
        },
        namedItems: {
          get: function () {
            return this.updateCache(), this.childrenByName;
          },
        },
        updateCache: {
          value: function () {
            var f =
              /^(a|applet|area|embed|form|frame|frameset|iframe|img|object)$/;
            if (this.lastModTime !== this.element.lastModTime) {
              this.lastModTime = this.element.lastModTime;
              for (
                var p =
                    (this.childrenByNumber && this.childrenByNumber.length) ||
                    0,
                  S = 0;
                S < p;
                S++
              )
                this[S] = void 0;
              (this.childrenByNumber = []),
                (this.childrenByName = Object.create(null));
              for (
                var k = this.element.firstChild;
                k !== null;
                k = k.nextSibling
              )
                if (k.nodeType === i.ELEMENT_NODE) {
                  (this[this.childrenByNumber.length] = k),
                    this.childrenByNumber.push(k);
                  var U = k.getAttribute("id");
                  U && !this.childrenByName[U] && (this.childrenByName[U] = k);
                  var W = k.getAttribute("name");
                  W &&
                    this.element.namespaceURI === n.HTML &&
                    f.test(this.element.localName) &&
                    !this.childrenByName[W] &&
                    (this.childrenByName[U] = k);
                }
            }
          },
        },
      });
      function oe(d) {
        return function (f) {
          return f.localName === d;
        };
      }
      function V(d) {
        var f = r.toASCIILowerCase(d);
        return f === d
          ? oe(d)
          : function (p) {
              return p.isHTML ? p.localName === f : p.localName === d;
            };
      }
      function L(d) {
        return function (f) {
          return f.namespaceURI === d;
        };
      }
      function H(d, f) {
        return function (p) {
          return p.namespaceURI === d && p.localName === f;
        };
      }
      function Q(d) {
        return function (f) {
          return d.every(function (p) {
            return f.classList.contains(p);
          });
        };
      }
      function m(d) {
        return function (f) {
          return f.namespaceURI !== n.HTML ? !1 : f.getAttribute("name") === d;
        };
      }
    },
  }),
  Na = J({
    "external/npm/node_modules/domino/lib/Leaf.js"(a, e) {
      "use strict";
      e.exports = o;
      var t = Re(),
        r = Zt(),
        n = ke(),
        s = n.HierarchyRequestError,
        i = n.NotFoundError;
      function o() {
        t.call(this);
      }
      o.prototype = Object.create(t.prototype, {
        hasChildNodes: {
          value: function () {
            return !1;
          },
        },
        firstChild: { value: null },
        lastChild: { value: null },
        insertBefore: {
          value: function (h, c) {
            if (!h.nodeType) throw new TypeError("not a node");
            s();
          },
        },
        replaceChild: {
          value: function (h, c) {
            if (!h.nodeType) throw new TypeError("not a node");
            s();
          },
        },
        removeChild: {
          value: function (h) {
            if (!h.nodeType) throw new TypeError("not a node");
            i();
          },
        },
        removeChildren: { value: function () {} },
        childNodes: {
          get: function () {
            return (
              this._childNodes || (this._childNodes = new r()), this._childNodes
            );
          },
        },
      });
    },
  }),
  dn = J({
    "external/npm/node_modules/domino/lib/CharacterData.js"(a, e) {
      "use strict";
      e.exports = i;
      var t = Na(),
        r = ke(),
        n = Ts(),
        s = Sa();
      function i() {
        t.call(this);
      }
      (i.prototype = Object.create(t.prototype, {
        substringData: {
          value: function (h, c) {
            if (arguments.length < 2)
              throw new TypeError("Not enough arguments");
            return (
              (h = h >>> 0),
              (c = c >>> 0),
              (h > this.data.length || h < 0 || c < 0) && r.IndexSizeError(),
              this.data.substring(h, h + c)
            );
          },
        },
        appendData: {
          value: function (h) {
            if (arguments.length < 1)
              throw new TypeError("Not enough arguments");
            this.data += String(h);
          },
        },
        insertData: {
          value: function (h, c) {
            return this.replaceData(h, 0, c);
          },
        },
        deleteData: {
          value: function (h, c) {
            return this.replaceData(h, c, "");
          },
        },
        replaceData: {
          value: function (h, c, _) {
            var g = this.data,
              b = g.length;
            (h = h >>> 0),
              (c = c >>> 0),
              (_ = String(_)),
              (h > b || h < 0) && r.IndexSizeError(),
              h + c > b && (c = b - h);
            var C = g.substring(0, h),
              I = g.substring(h + c);
            this.data = C + _ + I;
          },
        },
        isEqual: {
          value: function (h) {
            return this._data === h._data;
          },
        },
        length: {
          get: function () {
            return this.data.length;
          },
        },
      })),
        Object.defineProperties(i.prototype, n),
        Object.defineProperties(i.prototype, s);
    },
  }),
  Aa = J({
    "external/npm/node_modules/domino/lib/Text.js"(a, e) {
      "use strict";
      e.exports = s;
      var t = ke(),
        r = Re(),
        n = dn();
      function s(o, h) {
        n.call(this),
          (this.nodeType = r.TEXT_NODE),
          (this.ownerDocument = o),
          (this._data = h),
          (this._index = void 0);
      }
      var i = {
        get: function () {
          return this._data;
        },
        set: function (o) {
          o == null ? (o = "") : (o = String(o)),
            o !== this._data &&
              ((this._data = o),
              this.rooted && this.ownerDocument.mutateValue(this),
              this.parentNode &&
                this.parentNode._textchangehook &&
                this.parentNode._textchangehook(this));
        },
      };
      s.prototype = Object.create(n.prototype, {
        nodeName: { value: "#text" },
        nodeValue: i,
        textContent: i,
        innerText: i,
        data: {
          get: i.get,
          set: function (o) {
            i.set.call(this, o === null ? "" : String(o));
          },
        },
        splitText: {
          value: function (h) {
            (h > this._data.length || h < 0) && t.IndexSizeError();
            var c = this._data.substring(h),
              _ = this.ownerDocument.createTextNode(c);
            this.data = this.data.substring(0, h);
            var g = this.parentNode;
            return g !== null && g.insertBefore(_, this.nextSibling), _;
          },
        },
        wholeText: {
          get: function () {
            for (
              var h = this.textContent, c = this.nextSibling;
              c && c.nodeType === r.TEXT_NODE;
              c = c.nextSibling
            )
              h += c.textContent;
            return h;
          },
        },
        replaceWholeText: { value: t.nyi },
        clone: {
          value: function () {
            return new s(this.ownerDocument, this._data);
          },
        },
      });
    },
  }),
  Da = J({
    "external/npm/node_modules/domino/lib/Comment.js"(a, e) {
      "use strict";
      e.exports = n;
      var t = Re(),
        r = dn();
      function n(i, o) {
        r.call(this),
          (this.nodeType = t.COMMENT_NODE),
          (this.ownerDocument = i),
          (this._data = o);
      }
      var s = {
        get: function () {
          return this._data;
        },
        set: function (i) {
          i == null ? (i = "") : (i = String(i)),
            (this._data = i),
            this.rooted && this.ownerDocument.mutateValue(this);
        },
      };
      n.prototype = Object.create(r.prototype, {
        nodeName: { value: "#comment" },
        nodeValue: s,
        textContent: s,
        innerText: s,
        data: {
          get: s.get,
          set: function (i) {
            s.set.call(this, i === null ? "" : String(i));
          },
        },
        clone: {
          value: function () {
            return new n(this.ownerDocument, this._data);
          },
        },
      });
    },
  }),
  ka = J({
    "external/npm/node_modules/domino/lib/DocumentFragment.js"(a, e) {
      "use strict";
      e.exports = h;
      var t = Re(),
        r = Zt(),
        n = bs(),
        s = yr(),
        i = vs(),
        o = ke();
      function h(c) {
        n.call(this),
          (this.nodeType = t.DOCUMENT_FRAGMENT_NODE),
          (this.ownerDocument = c);
      }
      h.prototype = Object.create(n.prototype, {
        nodeName: { value: "#document-fragment" },
        nodeValue: {
          get: function () {
            return null;
          },
          set: function () {},
        },
        textContent: Object.getOwnPropertyDescriptor(
          s.prototype,
          "textContent"
        ),
        innerText: Object.getOwnPropertyDescriptor(s.prototype, "innerText"),
        querySelector: {
          value: function (c) {
            var _ = this.querySelectorAll(c);
            return _.length ? _[0] : null;
          },
        },
        querySelectorAll: {
          value: function (c) {
            var _ = Object.create(this);
            (_.isHTML = !0),
              (_.getElementsByTagName = s.prototype.getElementsByTagName),
              (_.nextElement = Object.getOwnPropertyDescriptor(
                s.prototype,
                "firstElementChild"
              ).get);
            var g = i(c, _);
            return g.item ? g : new r(g);
          },
        },
        clone: {
          value: function () {
            return new h(this.ownerDocument);
          },
        },
        isEqual: {
          value: function (_) {
            return !0;
          },
        },
        innerHTML: {
          get: function () {
            return this.serialize();
          },
          set: o.nyi,
        },
        outerHTML: {
          get: function () {
            return this.serialize();
          },
          set: o.nyi,
        },
      });
    },
  }),
  Ca = J({
    "external/npm/node_modules/domino/lib/ProcessingInstruction.js"(a, e) {
      "use strict";
      e.exports = n;
      var t = Re(),
        r = dn();
      function n(i, o, h) {
        r.call(this),
          (this.nodeType = t.PROCESSING_INSTRUCTION_NODE),
          (this.ownerDocument = i),
          (this.target = o),
          (this._data = h);
      }
      var s = {
        get: function () {
          return this._data;
        },
        set: function (i) {
          i == null ? (i = "") : (i = String(i)),
            (this._data = i),
            this.rooted && this.ownerDocument.mutateValue(this);
        },
      };
      n.prototype = Object.create(r.prototype, {
        nodeName: {
          get: function () {
            return this.target;
          },
        },
        nodeValue: s,
        textContent: s,
        innerText: s,
        data: {
          get: s.get,
          set: function (i) {
            s.set.call(this, i === null ? "" : String(i));
          },
        },
        clone: {
          value: function () {
            return new n(this.ownerDocument, this.target, this._data);
          },
        },
        isEqual: {
          value: function (o) {
            return this.target === o.target && this._data === o._data;
          },
        },
      });
    },
  }),
  pn = J({
    "external/npm/node_modules/domino/lib/NodeFilter.js"(a, e) {
      "use strict";
      var t = {
        FILTER_ACCEPT: 1,
        FILTER_REJECT: 2,
        FILTER_SKIP: 3,
        SHOW_ALL: 4294967295,
        SHOW_ELEMENT: 1,
        SHOW_ATTRIBUTE: 2,
        SHOW_TEXT: 4,
        SHOW_CDATA_SECTION: 8,
        SHOW_ENTITY_REFERENCE: 16,
        SHOW_ENTITY: 32,
        SHOW_PROCESSING_INSTRUCTION: 64,
        SHOW_COMMENT: 128,
        SHOW_DOCUMENT: 256,
        SHOW_DOCUMENT_TYPE: 512,
        SHOW_DOCUMENT_FRAGMENT: 1024,
        SHOW_NOTATION: 2048,
      };
      e.exports = t.constructor = t.prototype = t;
    },
  }),
  La = J({
    "external/npm/node_modules/domino/lib/NodeTraversal.js"(a, e) {
      "use strict";
      var t = (e.exports = {
        nextSkippingChildren: r,
        nextAncestorSibling: n,
        next: s,
        previous: o,
        deepLastChild: i,
      });
      function r(h, c) {
        return h === c
          ? null
          : h.nextSibling !== null
            ? h.nextSibling
            : n(h, c);
      }
      function n(h, c) {
        for (h = h.parentNode; h !== null; h = h.parentNode) {
          if (h === c) return null;
          if (h.nextSibling !== null) return h.nextSibling;
        }
        return null;
      }
      function s(h, c) {
        var _;
        return (
          (_ = h.firstChild),
          _ !== null
            ? _
            : h === c
              ? null
              : ((_ = h.nextSibling), _ !== null ? _ : n(h, c))
        );
      }
      function i(h) {
        for (; h.lastChild; ) h = h.lastChild;
        return h;
      }
      function o(h, c) {
        var _;
        return (
          (_ = h.previousSibling),
          _ !== null ? i(_) : ((_ = h.parentNode), _ === c ? null : _)
        );
      }
    },
  }),
  qc = J({
    "external/npm/node_modules/domino/lib/TreeWalker.js"(a, e) {
      "use strict";
      e.exports = _;
      var t = Re(),
        r = pn(),
        n = La(),
        s = ke(),
        i = {
          first: "firstChild",
          last: "lastChild",
          next: "firstChild",
          previous: "lastChild",
        },
        o = {
          first: "nextSibling",
          last: "previousSibling",
          next: "nextSibling",
          previous: "previousSibling",
        };
      function h(g, b) {
        var C, I, M, G, P;
        for (I = g._currentNode[i[b]]; I !== null; ) {
          if (((G = g._internalFilter(I)), G === r.FILTER_ACCEPT))
            return (g._currentNode = I), I;
          if (G === r.FILTER_SKIP && ((C = I[i[b]]), C !== null)) {
            I = C;
            continue;
          }
          for (; I !== null; ) {
            if (((P = I[o[b]]), P !== null)) {
              I = P;
              break;
            }
            if (
              ((M = I.parentNode),
              M === null || M === g.root || M === g._currentNode)
            )
              return null;
            I = M;
          }
        }
        return null;
      }
      function c(g, b) {
        var C, I, M;
        if (((C = g._currentNode), C === g.root)) return null;
        for (;;) {
          for (M = C[o[b]]; M !== null; ) {
            if (((C = M), (I = g._internalFilter(C)), I === r.FILTER_ACCEPT))
              return (g._currentNode = C), C;
            (M = C[i[b]]),
              (I === r.FILTER_REJECT || M === null) && (M = C[o[b]]);
          }
          if (
            ((C = C.parentNode),
            C === null ||
              C === g.root ||
              g._internalFilter(C) === r.FILTER_ACCEPT)
          )
            return null;
        }
      }
      function _(g, b, C) {
        (!g || !g.nodeType) && s.NotSupportedError(),
          (this._root = g),
          (this._whatToShow = Number(b) || 0),
          (this._filter = C || null),
          (this._active = !1),
          (this._currentNode = g);
      }
      Object.defineProperties(_.prototype, {
        root: {
          get: function () {
            return this._root;
          },
        },
        whatToShow: {
          get: function () {
            return this._whatToShow;
          },
        },
        filter: {
          get: function () {
            return this._filter;
          },
        },
        currentNode: {
          get: function () {
            return this._currentNode;
          },
          set: function (b) {
            if (!(b instanceof t)) throw new TypeError("Not a Node");
            this._currentNode = b;
          },
        },
        _internalFilter: {
          value: function (b) {
            var C, I;
            if (
              (this._active && s.InvalidStateError(),
              !((1 << (b.nodeType - 1)) & this._whatToShow))
            )
              return r.FILTER_SKIP;
            if (((I = this._filter), I === null)) C = r.FILTER_ACCEPT;
            else {
              this._active = !0;
              try {
                typeof I == "function" ? (C = I(b)) : (C = I.acceptNode(b));
              } finally {
                this._active = !1;
              }
            }
            return +C;
          },
        },
        parentNode: {
          value: function () {
            for (var b = this._currentNode; b !== this.root; ) {
              if (((b = b.parentNode), b === null)) return null;
              if (this._internalFilter(b) === r.FILTER_ACCEPT)
                return (this._currentNode = b), b;
            }
            return null;
          },
        },
        firstChild: {
          value: function () {
            return h(this, "first");
          },
        },
        lastChild: {
          value: function () {
            return h(this, "last");
          },
        },
        previousSibling: {
          value: function () {
            return c(this, "previous");
          },
        },
        nextSibling: {
          value: function () {
            return c(this, "next");
          },
        },
        previousNode: {
          value: function () {
            var b, C, I, M;
            for (b = this._currentNode; b !== this._root; ) {
              for (I = b.previousSibling; I; I = b.previousSibling)
                if (
                  ((b = I),
                  (C = this._internalFilter(b)),
                  C !== r.FILTER_REJECT)
                ) {
                  for (
                    M = b.lastChild;
                    M &&
                    ((b = M),
                    (C = this._internalFilter(b)),
                    C !== r.FILTER_REJECT);
                    M = b.lastChild
                  );
                  if (C === r.FILTER_ACCEPT) return (this._currentNode = b), b;
                }
              if (b === this.root || b.parentNode === null) return null;
              if (
                ((b = b.parentNode),
                this._internalFilter(b) === r.FILTER_ACCEPT)
              )
                return (this._currentNode = b), b;
            }
            return null;
          },
        },
        nextNode: {
          value: function () {
            var b, C, I, M;
            (b = this._currentNode), (C = r.FILTER_ACCEPT);
            e: for (;;) {
              for (I = b.firstChild; I; I = b.firstChild) {
                if (
                  ((b = I),
                  (C = this._internalFilter(b)),
                  C === r.FILTER_ACCEPT)
                )
                  return (this._currentNode = b), b;
                if (C === r.FILTER_REJECT) break;
              }
              for (
                M = n.nextSkippingChildren(b, this.root);
                M;
                M = n.nextSkippingChildren(b, this.root)
              ) {
                if (
                  ((b = M),
                  (C = this._internalFilter(b)),
                  C === r.FILTER_ACCEPT)
                )
                  return (this._currentNode = b), b;
                if (C === r.FILTER_SKIP) continue e;
              }
              return null;
            }
          },
        },
        toString: {
          value: function () {
            return "[object TreeWalker]";
          },
        },
      });
    },
  }),
  Fc = J({
    "external/npm/node_modules/domino/lib/NodeIterator.js"(a, e) {
      "use strict";
      e.exports = h;
      var t = pn(),
        r = La(),
        n = ke();
      function s(c, _, g) {
        return g ? r.next(c, _) : c === _ ? null : r.previous(c, null);
      }
      function i(c, _) {
        for (; _; _ = _.parentNode) if (c === _) return !0;
        return !1;
      }
      function o(c, _) {
        var g, b;
        for (g = c._referenceNode, b = c._pointerBeforeReferenceNode; ; ) {
          if (b === _) b = !b;
          else if (((g = s(g, c._root, _)), g === null)) return null;
          var C = c._internalFilter(g);
          if (C === t.FILTER_ACCEPT) break;
        }
        return (c._referenceNode = g), (c._pointerBeforeReferenceNode = b), g;
      }
      function h(c, _, g) {
        (!c || !c.nodeType) && n.NotSupportedError(),
          (this._root = c),
          (this._referenceNode = c),
          (this._pointerBeforeReferenceNode = !0),
          (this._whatToShow = Number(_) || 0),
          (this._filter = g || null),
          (this._active = !1),
          c.doc._attachNodeIterator(this);
      }
      Object.defineProperties(h.prototype, {
        root: {
          get: function () {
            return this._root;
          },
        },
        referenceNode: {
          get: function () {
            return this._referenceNode;
          },
        },
        pointerBeforeReferenceNode: {
          get: function () {
            return this._pointerBeforeReferenceNode;
          },
        },
        whatToShow: {
          get: function () {
            return this._whatToShow;
          },
        },
        filter: {
          get: function () {
            return this._filter;
          },
        },
        _internalFilter: {
          value: function (_) {
            var g, b;
            if (
              (this._active && n.InvalidStateError(),
              !((1 << (_.nodeType - 1)) & this._whatToShow))
            )
              return t.FILTER_SKIP;
            if (((b = this._filter), b === null)) g = t.FILTER_ACCEPT;
            else {
              this._active = !0;
              try {
                typeof b == "function" ? (g = b(_)) : (g = b.acceptNode(_));
              } finally {
                this._active = !1;
              }
            }
            return +g;
          },
        },
        _preremove: {
          value: function (_) {
            if (!i(_, this._root) && i(_, this._referenceNode)) {
              if (this._pointerBeforeReferenceNode) {
                for (var g = _; g.lastChild; ) g = g.lastChild;
                if (((g = r.next(g, this.root)), g)) {
                  this._referenceNode = g;
                  return;
                }
                this._pointerBeforeReferenceNode = !1;
              }
              if (_.previousSibling === null)
                this._referenceNode = _.parentNode;
              else {
                this._referenceNode = _.previousSibling;
                var b;
                for (
                  b = this._referenceNode.lastChild;
                  b;
                  b = this._referenceNode.lastChild
                )
                  this._referenceNode = b;
              }
            }
          },
        },
        nextNode: {
          value: function () {
            return o(this, !0);
          },
        },
        previousNode: {
          value: function () {
            return o(this, !1);
          },
        },
        detach: { value: function () {} },
        toString: {
          value: function () {
            return "[object NodeIterator]";
          },
        },
      });
    },
  }),
  Ss = J({
    "external/npm/node_modules/domino/lib/URL.js"(a, e) {
      "use strict";
      e.exports = t;
      function t(r) {
        if (!r) return Object.create(t.prototype);
        this.url = r.replace(/^[ \t\n\r\f]+|[ \t\n\r\f]+$/g, "");
        var n = t.pattern.exec(this.url);
        if (n) {
          if ((n[2] && (this.scheme = n[2]), n[4])) {
            var s = n[4].match(t.userinfoPattern);
            if (
              (s &&
                ((this.username = s[1]),
                (this.password = s[3]),
                (n[4] = n[4].substring(s[0].length))),
              n[4].match(t.portPattern))
            ) {
              var i = n[4].lastIndexOf(":");
              (this.host = n[4].substring(0, i)),
                (this.port = n[4].substring(i + 1));
            } else this.host = n[4];
          }
          n[5] && (this.path = n[5]),
            n[6] && (this.query = n[7]),
            n[8] && (this.fragment = n[9]);
        }
      }
      (t.pattern =
        /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/),
        (t.userinfoPattern = /^([^@:]*)(:([^@]*))?@/),
        (t.portPattern = /:\d+$/),
        (t.authorityPattern = /^[^:\/?#]+:\/\//),
        (t.hierarchyPattern = /^[^:\/?#]+:\//),
        (t.percentEncode = function (n) {
          var s = n.charCodeAt(0);
          if (s < 256) return "%" + s.toString(16);
          throw Error("can't percent-encode codepoints > 255 yet");
        }),
        (t.prototype = {
          constructor: t,
          isAbsolute: function () {
            return !!this.scheme;
          },
          isAuthorityBased: function () {
            return t.authorityPattern.test(this.url);
          },
          isHierarchical: function () {
            return t.hierarchyPattern.test(this.url);
          },
          toString: function () {
            var r = "";
            return (
              this.scheme !== void 0 && (r += this.scheme + ":"),
              this.isAbsolute() &&
                ((r += "//"),
                (this.username || this.password) &&
                  ((r += this.username || ""),
                  this.password && (r += ":" + this.password),
                  (r += "@")),
                this.host && (r += this.host)),
              this.port !== void 0 && (r += ":" + this.port),
              this.path !== void 0 && (r += this.path),
              this.query !== void 0 && (r += "?" + this.query),
              this.fragment !== void 0 && (r += "#" + this.fragment),
              r
            );
          },
          resolve: function (r) {
            var n = this,
              s = new t(r),
              i = new t();
            return (
              s.scheme !== void 0
                ? ((i.scheme = s.scheme),
                  (i.username = s.username),
                  (i.password = s.password),
                  (i.host = s.host),
                  (i.port = s.port),
                  (i.path = h(s.path)),
                  (i.query = s.query))
                : ((i.scheme = n.scheme),
                  s.host !== void 0
                    ? ((i.username = s.username),
                      (i.password = s.password),
                      (i.host = s.host),
                      (i.port = s.port),
                      (i.path = h(s.path)),
                      (i.query = s.query))
                    : ((i.username = n.username),
                      (i.password = n.password),
                      (i.host = n.host),
                      (i.port = n.port),
                      s.path
                        ? (s.path.charAt(0) === "/"
                            ? (i.path = h(s.path))
                            : ((i.path = o(n.path, s.path)),
                              (i.path = h(i.path))),
                          (i.query = s.query))
                        : ((i.path = n.path),
                          s.query !== void 0
                            ? (i.query = s.query)
                            : (i.query = n.query)))),
              (i.fragment = s.fragment),
              i.toString()
            );
            function o(c, _) {
              if (n.host !== void 0 && !n.path) return "/" + _;
              var g = c.lastIndexOf("/");
              return g === -1 ? _ : c.substring(0, g + 1) + _;
            }
            function h(c) {
              if (!c) return c;
              for (var _ = ""; c.length > 0; ) {
                if (c === "." || c === "..") {
                  c = "";
                  break;
                }
                var g = c.substring(0, 2),
                  b = c.substring(0, 3),
                  C = c.substring(0, 4);
                if (b === "../") c = c.substring(3);
                else if (g === "./") c = c.substring(2);
                else if (b === "/./") c = "/" + c.substring(3);
                else if (g === "/." && c.length === 2) c = "/";
                else if (C === "/../" || (b === "/.." && c.length === 3))
                  (c = "/" + c.substring(4)), (_ = _.replace(/\/?[^\/]*$/, ""));
                else {
                  var I = c.match(/(\/?([^\/]*))/)[0];
                  (_ += I), (c = c.substring(I.length));
                }
              }
              return _;
            }
          },
        });
    },
  }),
  Bc = J({
    "external/npm/node_modules/domino/lib/CustomEvent.js"(a, e) {
      "use strict";
      e.exports = r;
      var t = _r();
      function r(n, s) {
        t.call(this, n, s);
      }
      r.prototype = Object.create(t.prototype, { constructor: { value: r } });
    },
  }),
  Ma = J({
    "external/npm/node_modules/domino/lib/events.js"(a, e) {
      "use strict";
      e.exports = {
        Event: _r(),
        UIEvent: ga(),
        MouseEvent: _a(),
        CustomEvent: Bc(),
      };
    },
  }),
  Uc = J({
    "external/npm/node_modules/domino/lib/style_parser.js"(a) {
      "use strict";
      Object.defineProperty(a, "__esModule", { value: !0 }),
        (a.hyphenate = a.parse = void 0);
      function e(r) {
        let n = [],
          s = 0,
          i = 0,
          o = 0,
          h = 0,
          c = 0,
          _ = null;
        for (; s < r.length; )
          switch (r.charCodeAt(s++)) {
            case 40:
              i++;
              break;
            case 41:
              i--;
              break;
            case 39:
              o === 0
                ? (o = 39)
                : o === 39 && r.charCodeAt(s - 1) !== 92 && (o = 0);
              break;
            case 34:
              o === 0
                ? (o = 34)
                : o === 34 && r.charCodeAt(s - 1) !== 92 && (o = 0);
              break;
            case 58:
              !_ &&
                i === 0 &&
                o === 0 &&
                ((_ = t(r.substring(c, s - 1).trim())), (h = s));
              break;
            case 59:
              if (_ && h > 0 && i === 0 && o === 0) {
                let b = r.substring(h, s - 1).trim();
                n.push(_, b), (c = s), (h = 0), (_ = null);
              }
              break;
          }
        if (_ && h) {
          let g = r.slice(h).trim();
          n.push(_, g);
        }
        return n;
      }
      a.parse = e;
      function t(r) {
        return r
          .replace(/[a-z][A-Z]/g, (n) => n.charAt(0) + "-" + n.charAt(1))
          .toLowerCase();
      }
      a.hyphenate = t;
    },
  }),
  ws = J({
    "external/npm/node_modules/domino/lib/CSSStyleDeclaration.js"(a, e) {
      "use strict";
      var { parse: t } = Uc();
      e.exports = function (h) {
        let c = new n(h),
          _ = {
            get: function (g, b) {
              return b in g ? g[b] : g.getPropertyValue(r(b));
            },
            has: function (g, b) {
              return !0;
            },
            set: function (g, b, C) {
              return b in g ? (g[b] = C) : g.setProperty(r(b), C ?? void 0), !0;
            },
          };
        return new Proxy(c, _);
      };
      function r(h) {
        return h.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      }
      function n(h) {
        this._element = h;
      }
      var s = "!important";
      function i(h) {
        let c = { property: {}, priority: {} };
        if (!h) return c;
        let _ = t(h);
        if (_.length < 2) return c;
        for (let g = 0; g < _.length; g += 2) {
          let b = _[g],
            C = _[g + 1];
          C.endsWith(s) &&
            ((c.priority[b] = "important"), (C = C.slice(0, -s.length).trim())),
            (c.property[b] = C);
        }
        return c;
      }
      var o = {};
      n.prototype = Object.create(Object.prototype, {
        _parsed: {
          get: function () {
            if (!this._parsedStyles || this.cssText !== this._lastParsedText) {
              var h = this.cssText;
              (this._parsedStyles = i(h)),
                (this._lastParsedText = h),
                delete this._names;
            }
            return this._parsedStyles;
          },
        },
        _serialize: {
          value: function () {
            var h = this._parsed,
              c = "";
            for (var _ in h.property)
              c && (c += " "),
                (c += _ + ": " + h.property[_]),
                h.priority[_] && (c += " !" + h.priority[_]),
                (c += ";");
            (this.cssText = c), (this._lastParsedText = c), delete this._names;
          },
        },
        cssText: {
          get: function () {
            return this._element.getAttribute("style");
          },
          set: function (h) {
            this._element.setAttribute("style", h);
          },
        },
        length: {
          get: function () {
            return (
              this._names ||
                (this._names = Object.getOwnPropertyNames(
                  this._parsed.property
                )),
              this._names.length
            );
          },
        },
        item: {
          value: function (h) {
            return (
              this._names ||
                (this._names = Object.getOwnPropertyNames(
                  this._parsed.property
                )),
              this._names[h]
            );
          },
        },
        getPropertyValue: {
          value: function (h) {
            return (h = h.toLowerCase()), this._parsed.property[h] || "";
          },
        },
        getPropertyPriority: {
          value: function (h) {
            return (h = h.toLowerCase()), this._parsed.priority[h] || "";
          },
        },
        setProperty: {
          value: function (h, c, _) {
            if (
              ((h = h.toLowerCase()),
              c == null && (c = ""),
              _ == null && (_ = ""),
              c !== o && (c = "" + c),
              (c = c.trim()),
              c === "")
            ) {
              this.removeProperty(h);
              return;
            }
            if (!(_ !== "" && _ !== o && !/^important$/i.test(_))) {
              var g = this._parsed;
              if (c === o) {
                if (!g.property[h]) return;
                _ !== "" ? (g.priority[h] = "important") : delete g.priority[h];
              } else {
                if (c.includes(";") && !c.includes("data:")) return;
                var b = i(h + ":" + c);
                if (
                  Object.getOwnPropertyNames(b.property).length === 0 ||
                  Object.getOwnPropertyNames(b.priority).length !== 0
                )
                  return;
                for (var C in b.property)
                  (g.property[C] = b.property[C]),
                    _ !== o &&
                      (_ !== ""
                        ? (g.priority[C] = "important")
                        : g.priority[C] && delete g.priority[C]);
              }
              this._serialize();
            }
          },
        },
        setPropertyValue: {
          value: function (h, c) {
            return this.setProperty(h, c, o);
          },
        },
        setPropertyPriority: {
          value: function (h, c) {
            return this.setProperty(h, o, c);
          },
        },
        removeProperty: {
          value: function (h) {
            h = h.toLowerCase();
            var c = this._parsed;
            h in c.property &&
              (delete c.property[h], delete c.priority[h], this._serialize());
          },
        },
      });
    },
  }),
  Ra = J({
    "external/npm/node_modules/domino/lib/URLUtils.js"(a, e) {
      "use strict";
      var t = Ss();
      e.exports = r;
      function r() {}
      (r.prototype = Object.create(Object.prototype, {
        _url: {
          get: function () {
            return new t(this.href);
          },
        },
        protocol: {
          get: function () {
            var n = this._url;
            return n && n.scheme ? n.scheme + ":" : ":";
          },
          set: function (n) {
            var s = this.href,
              i = new t(s);
            i.isAbsolute() &&
              ((n = n.replace(/:+$/, "")),
              (n = n.replace(/[^-+\.a-zA-Z0-9]/g, t.percentEncode)),
              n.length > 0 && ((i.scheme = n), (s = i.toString()))),
              (this.href = s);
          },
        },
        host: {
          get: function () {
            var n = this._url;
            return n.isAbsolute() && n.isAuthorityBased()
              ? n.host + (n.port ? ":" + n.port : "")
              : "";
          },
          set: function (n) {
            var s = this.href,
              i = new t(s);
            i.isAbsolute() &&
              i.isAuthorityBased() &&
              ((n = n.replace(
                /[^-+\._~!$&'()*,;:=a-zA-Z0-9]/g,
                t.percentEncode
              )),
              n.length > 0 &&
                ((i.host = n), delete i.port, (s = i.toString()))),
              (this.href = s);
          },
        },
        hostname: {
          get: function () {
            var n = this._url;
            return n.isAbsolute() && n.isAuthorityBased() ? n.host : "";
          },
          set: function (n) {
            var s = this.href,
              i = new t(s);
            i.isAbsolute() &&
              i.isAuthorityBased() &&
              ((n = n.replace(/^\/+/, "")),
              (n = n.replace(
                /[^-+\._~!$&'()*,;:=a-zA-Z0-9]/g,
                t.percentEncode
              )),
              n.length > 0 && ((i.host = n), (s = i.toString()))),
              (this.href = s);
          },
        },
        port: {
          get: function () {
            var n = this._url;
            return n.isAbsolute() && n.isAuthorityBased() && n.port !== void 0
              ? n.port
              : "";
          },
          set: function (n) {
            var s = this.href,
              i = new t(s);
            i.isAbsolute() &&
              i.isAuthorityBased() &&
              ((n = "" + n),
              (n = n.replace(/[^0-9].*$/, "")),
              (n = n.replace(/^0+/, "")),
              n.length === 0 && (n = "0"),
              parseInt(n, 10) <= 65535 && ((i.port = n), (s = i.toString()))),
              (this.href = s);
          },
        },
        pathname: {
          get: function () {
            var n = this._url;
            return n.isAbsolute() && n.isHierarchical() ? n.path : "";
          },
          set: function (n) {
            var s = this.href,
              i = new t(s);
            i.isAbsolute() &&
              i.isHierarchical() &&
              (n.charAt(0) !== "/" && (n = "/" + n),
              (n = n.replace(
                /[^-+\._~!$&'()*,;:=@\/a-zA-Z0-9]/g,
                t.percentEncode
              )),
              (i.path = n),
              (s = i.toString())),
              (this.href = s);
          },
        },
        search: {
          get: function () {
            var n = this._url;
            return n.isAbsolute() && n.isHierarchical() && n.query !== void 0
              ? "?" + n.query
              : "";
          },
          set: function (n) {
            var s = this.href,
              i = new t(s);
            i.isAbsolute() &&
              i.isHierarchical() &&
              (n.charAt(0) === "?" && (n = n.substring(1)),
              (n = n.replace(
                /[^-+\._~!$&'()*,;:=@\/?a-zA-Z0-9]/g,
                t.percentEncode
              )),
              (i.query = n),
              (s = i.toString())),
              (this.href = s);
          },
        },
        hash: {
          get: function () {
            var n = this._url;
            return n == null || n.fragment == null || n.fragment === ""
              ? ""
              : "#" + n.fragment;
          },
          set: function (n) {
            var s = this.href,
              i = new t(s);
            n.charAt(0) === "#" && (n = n.substring(1)),
              (n = n.replace(
                /[^-+\._~!$&'()*,;:=@\/?a-zA-Z0-9]/g,
                t.percentEncode
              )),
              (i.fragment = n),
              (s = i.toString()),
              (this.href = s);
          },
        },
        username: {
          get: function () {
            var n = this._url;
            return n.username || "";
          },
          set: function (n) {
            var s = this.href,
              i = new t(s);
            i.isAbsolute() &&
              ((n = n.replace(
                /[\x00-\x1F\x7F-\uFFFF "#<>?`\/@\\:]/g,
                t.percentEncode
              )),
              (i.username = n),
              (s = i.toString())),
              (this.href = s);
          },
        },
        password: {
          get: function () {
            var n = this._url;
            return n.password || "";
          },
          set: function (n) {
            var s = this.href,
              i = new t(s);
            i.isAbsolute() &&
              (n === ""
                ? (i.password = null)
                : ((n = n.replace(
                    /[\x00-\x1F\x7F-\uFFFF "#<>?`\/@\\]/g,
                    t.percentEncode
                  )),
                  (i.password = n)),
              (s = i.toString())),
              (this.href = s);
          },
        },
        origin: {
          get: function () {
            var n = this._url;
            if (n == null) return "";
            var s = function (i) {
              var o = [n.scheme, n.host, +n.port || i];
              return o[0] + "://" + o[1] + (o[2] === i ? "" : ":" + o[2]);
            };
            switch (n.scheme) {
              case "ftp":
                return s(21);
              case "gopher":
                return s(70);
              case "http":
              case "ws":
                return s(80);
              case "https":
              case "wss":
                return s(443);
              default:
                return n.scheme + "://";
            }
          },
        },
      })),
        (r._inherit = function (n) {
          Object.getOwnPropertyNames(r.prototype).forEach(function (s) {
            if (!(s === "constructor" || s === "href")) {
              var i = Object.getOwnPropertyDescriptor(r.prototype, s);
              Object.defineProperty(n, s, i);
            }
          });
        });
    },
  }),
  Ia = J({
    "external/npm/node_modules/domino/lib/defineElement.js"(a, e) {
      "use strict";
      var t = va(),
        r = ys().isApiWritable;
      e.exports = function (o, h, c, _) {
        var g = o.ctor;
        if (g) {
          var b = o.props || {};
          if (o.attributes)
            for (var C in o.attributes) {
              var I = o.attributes[C];
              (typeof I != "object" || Array.isArray(I)) && (I = { type: I }),
                I.name || (I.name = C.toLowerCase()),
                (b[C] = t.property(I));
            }
          (b.constructor = { value: g, writable: r }),
            (g.prototype = Object.create((o.superclass || h).prototype, b)),
            o.events && i(g, o.events),
            (c[o.name] = g);
        } else g = h;
        return (
          (o.tags || (o.tag && [o.tag]) || []).forEach(function (M) {
            _[M] = g;
          }),
          g
        );
      };
      function n(o, h, c, _) {
        (this.body = o),
          (this.document = h),
          (this.form = c),
          (this.element = _);
      }
      n.prototype.build = function () {
        return () => {};
      };
      function s(o, h, c, _) {
        var g = o.ownerDocument || Object.create(null),
          b = o.form || Object.create(null);
        o[h] = new n(_, g, b, o).build();
      }
      function i(o, h) {
        var c = o.prototype;
        h.forEach(function (_) {
          Object.defineProperty(c, "on" + _, {
            get: function () {
              return this._getEventHandler(_);
            },
            set: function (g) {
              this._setEventHandler(_, g);
            },
          }),
            t.registerChangeHandler(o, "on" + _, s);
        });
      }
    },
  }),
  Ns = J({
    "external/npm/node_modules/domino/lib/htmlelts.js"(a) {
      "use strict";
      var e = Re(),
        t = yr(),
        r = ws(),
        n = ke(),
        s = Ra(),
        i = Ia(),
        o = (a.elements = {}),
        h = Object.create(null);
      a.createElement = function (w, v, N) {
        var y = h[v] || G;
        return new y(w, v, N);
      };
      function c(w) {
        return i(w, M, o, h);
      }
      function _(w) {
        return {
          get: function () {
            var v = this._getattr(w);
            if (v === null) return "";
            var N = this.doc._resolve(v);
            return N === null ? v : N;
          },
          set: function (v) {
            this._setattr(w, v);
          },
        };
      }
      function g(w) {
        return {
          get: function () {
            var v = this._getattr(w);
            return v === null
              ? null
              : v.toLowerCase() === "use-credentials"
                ? "use-credentials"
                : "anonymous";
          },
          set: function (v) {
            v == null ? this.removeAttribute(w) : this._setattr(w, v);
          },
        };
      }
      var b = {
          type: [
            "",
            "no-referrer",
            "no-referrer-when-downgrade",
            "same-origin",
            "origin",
            "strict-origin",
            "origin-when-cross-origin",
            "strict-origin-when-cross-origin",
            "unsafe-url",
          ],
          missing: "",
        },
        C = {
          A: !0,
          LINK: !0,
          BUTTON: !0,
          INPUT: !0,
          SELECT: !0,
          TEXTAREA: !0,
          COMMAND: !0,
        },
        I = function (w, v, N) {
          M.call(this, w, v, N), (this._form = null);
        },
        M = (a.HTMLElement = c({
          superclass: t,
          name: "HTMLElement",
          ctor: function (v, N, y) {
            t.call(this, v, N, n.NAMESPACE.HTML, y);
          },
          props: {
            dangerouslySetInnerHTML: {
              set: function (w) {
                this._innerHTML = w;
              },
            },
            innerHTML: {
              get: function () {
                return this.serialize();
              },
              set: function (w) {
                var v = this.ownerDocument.implementation.mozHTMLParser(
                  this.ownerDocument._address,
                  this
                );
                v.parse(w === null ? "" : String(w), !0);
                for (
                  var N = this instanceof h.template ? this.content : this;
                  N.hasChildNodes();

                )
                  N.removeChild(N.firstChild);
                N.appendChild(v._asDocumentFragment());
              },
            },
            style: {
              get: function () {
                return this._style || (this._style = new r(this)), this._style;
              },
              set: function (w) {
                w == null && (w = ""), this._setattr("style", String(w));
              },
            },
            blur: { value: function () {} },
            focus: { value: function () {} },
            forceSpellCheck: { value: function () {} },
            click: {
              value: function () {
                if (!this._click_in_progress) {
                  this._click_in_progress = !0;
                  try {
                    this._pre_click_activation_steps &&
                      this._pre_click_activation_steps();
                    var w = this.ownerDocument.createEvent("MouseEvent");
                    w.initMouseEvent(
                      "click",
                      !0,
                      !0,
                      this.ownerDocument.defaultView,
                      1,
                      0,
                      0,
                      0,
                      0,
                      !1,
                      !1,
                      !1,
                      !1,
                      0,
                      null
                    );
                    var v = this.dispatchEvent(w);
                    v
                      ? this._post_click_activation_steps &&
                        this._post_click_activation_steps(w)
                      : this._cancelled_activation_steps &&
                        this._cancelled_activation_steps();
                  } finally {
                    this._click_in_progress = !1;
                  }
                }
              },
            },
            submit: { value: n.nyi },
          },
          attributes: {
            title: String,
            lang: String,
            dir: { type: ["ltr", "rtl", "auto"], missing: "" },
            draggable: { type: ["true", "false"], treatNullAsEmptyString: !0 },
            spellcheck: { type: ["true", "false"], missing: "" },
            enterKeyHint: {
              type: [
                "enter",
                "done",
                "go",
                "next",
                "previous",
                "search",
                "send",
              ],
              missing: "",
            },
            autoCapitalize: {
              type: ["off", "on", "none", "sentences", "words", "characters"],
              missing: "",
            },
            autoFocus: Boolean,
            accessKey: String,
            nonce: String,
            hidden: Boolean,
            translate: { type: ["no", "yes"], missing: "" },
            tabIndex: {
              type: "long",
              default: function () {
                return this.tagName in C || this.contentEditable ? 0 : -1;
              },
            },
          },
          events: [
            "abort",
            "canplay",
            "canplaythrough",
            "change",
            "click",
            "contextmenu",
            "cuechange",
            "dblclick",
            "drag",
            "dragend",
            "dragenter",
            "dragleave",
            "dragover",
            "dragstart",
            "drop",
            "durationchange",
            "emptied",
            "ended",
            "input",
            "invalid",
            "keydown",
            "keypress",
            "keyup",
            "loadeddata",
            "loadedmetadata",
            "loadstart",
            "mousedown",
            "mousemove",
            "mouseout",
            "mouseover",
            "mouseup",
            "mousewheel",
            "pause",
            "play",
            "playing",
            "progress",
            "ratechange",
            "readystatechange",
            "reset",
            "seeked",
            "seeking",
            "select",
            "show",
            "stalled",
            "submit",
            "suspend",
            "timeupdate",
            "volumechange",
            "waiting",
            "blur",
            "error",
            "focus",
            "load",
            "scroll",
          ],
        })),
        G = c({
          name: "HTMLUnknownElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
        }),
        P = {
          form: {
            get: function () {
              return this._form;
            },
          },
        };
      c({
        tag: "a",
        name: "HTMLAnchorElement",
        ctor: function (v, N, y) {
          M.call(this, v, N, y);
        },
        props: {
          _post_click_activation_steps: {
            value: function (w) {
              this.href &&
                (this.ownerDocument.defaultView.location = this.href);
            },
          },
        },
        attributes: {
          href: _,
          ping: String,
          download: String,
          target: String,
          rel: String,
          media: String,
          hreflang: String,
          type: String,
          referrerPolicy: b,
          coords: String,
          charset: String,
          name: String,
          rev: String,
          shape: String,
        },
      }),
        s._inherit(h.a.prototype),
        c({
          tag: "area",
          name: "HTMLAreaElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: {
            alt: String,
            target: String,
            download: String,
            rel: String,
            media: String,
            href: _,
            hreflang: String,
            type: String,
            shape: String,
            coords: String,
            ping: String,
            referrerPolicy: b,
            noHref: Boolean,
          },
        }),
        s._inherit(h.area.prototype),
        c({
          tag: "br",
          name: "HTMLBRElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: { clear: String },
        }),
        c({
          tag: "base",
          name: "HTMLBaseElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: { target: String },
        }),
        c({
          tag: "body",
          name: "HTMLBodyElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          events: [
            "afterprint",
            "beforeprint",
            "beforeunload",
            "blur",
            "error",
            "focus",
            "hashchange",
            "load",
            "message",
            "offline",
            "online",
            "pagehide",
            "pageshow",
            "popstate",
            "resize",
            "scroll",
            "storage",
            "unload",
          ],
          attributes: {
            text: { type: String, treatNullAsEmptyString: !0 },
            link: { type: String, treatNullAsEmptyString: !0 },
            vLink: { type: String, treatNullAsEmptyString: !0 },
            aLink: { type: String, treatNullAsEmptyString: !0 },
            bgColor: { type: String, treatNullAsEmptyString: !0 },
            background: String,
          },
        }),
        c({
          tag: "button",
          name: "HTMLButtonElement",
          ctor: function (v, N, y) {
            I.call(this, v, N, y);
          },
          props: P,
          attributes: {
            name: String,
            value: String,
            disabled: Boolean,
            autofocus: Boolean,
            type: {
              type: ["submit", "reset", "button", "menu"],
              missing: "submit",
            },
            formTarget: String,
            formAction: _,
            formNoValidate: Boolean,
            formMethod: {
              type: ["get", "post", "dialog"],
              invalid: "get",
              missing: "",
            },
            formEnctype: {
              type: [
                "application/x-www-form-urlencoded",
                "multipart/form-data",
                "text/plain",
              ],
              invalid: "application/x-www-form-urlencoded",
              missing: "",
            },
          },
        }),
        c({
          tag: "dl",
          name: "HTMLDListElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: { compact: Boolean },
        }),
        c({
          tag: "data",
          name: "HTMLDataElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: { value: String },
        }),
        c({
          tag: "datalist",
          name: "HTMLDataListElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
        }),
        c({
          tag: "details",
          name: "HTMLDetailsElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: { open: Boolean },
        }),
        c({
          tag: "div",
          name: "HTMLDivElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: { align: String },
        }),
        c({
          tag: "embed",
          name: "HTMLEmbedElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: {
            src: _,
            type: String,
            width: String,
            height: String,
            align: String,
            name: String,
          },
        }),
        c({
          tag: "fieldset",
          name: "HTMLFieldSetElement",
          ctor: function (v, N, y) {
            I.call(this, v, N, y);
          },
          props: P,
          attributes: { disabled: Boolean, name: String },
        }),
        c({
          tag: "form",
          name: "HTMLFormElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: {
            action: String,
            autocomplete: { type: ["on", "off"], missing: "on" },
            name: String,
            acceptCharset: { name: "accept-charset" },
            target: String,
            noValidate: Boolean,
            method: {
              type: ["get", "post", "dialog"],
              invalid: "get",
              missing: "get",
            },
            enctype: {
              type: [
                "application/x-www-form-urlencoded",
                "multipart/form-data",
                "text/plain",
              ],
              invalid: "application/x-www-form-urlencoded",
              missing: "application/x-www-form-urlencoded",
            },
            encoding: {
              name: "enctype",
              type: [
                "application/x-www-form-urlencoded",
                "multipart/form-data",
                "text/plain",
              ],
              invalid: "application/x-www-form-urlencoded",
              missing: "application/x-www-form-urlencoded",
            },
          },
        }),
        c({
          tag: "hr",
          name: "HTMLHRElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: {
            align: String,
            color: String,
            noShade: Boolean,
            size: String,
            width: String,
          },
        }),
        c({
          tag: "head",
          name: "HTMLHeadElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
        }),
        c({
          tags: ["h1", "h2", "h3", "h4", "h5", "h6"],
          name: "HTMLHeadingElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: { align: String },
        }),
        c({
          tag: "html",
          name: "HTMLHtmlElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: { xmlns: _, version: String },
        }),
        c({
          tag: "iframe",
          name: "HTMLIFrameElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: {
            src: _,
            srcdoc: String,
            name: String,
            width: String,
            height: String,
            seamless: Boolean,
            allow: Boolean,
            allowFullscreen: Boolean,
            allowUserMedia: Boolean,
            allowPaymentRequest: Boolean,
            referrerPolicy: b,
            loading: { type: ["eager", "lazy"], treatNullAsEmptyString: !0 },
            align: String,
            scrolling: String,
            frameBorder: String,
            longDesc: _,
            marginHeight: { type: String, treatNullAsEmptyString: !0 },
            marginWidth: { type: String, treatNullAsEmptyString: !0 },
          },
        }),
        c({
          tag: "img",
          name: "HTMLImageElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: {
            alt: String,
            src: _,
            srcset: String,
            crossOrigin: g,
            useMap: String,
            isMap: Boolean,
            sizes: String,
            height: { type: "unsigned long", default: 0 },
            width: { type: "unsigned long", default: 0 },
            referrerPolicy: b,
            loading: { type: ["eager", "lazy"], missing: "" },
            name: String,
            lowsrc: _,
            align: String,
            hspace: { type: "unsigned long", default: 0 },
            vspace: { type: "unsigned long", default: 0 },
            longDesc: _,
            border: { type: String, treatNullAsEmptyString: !0 },
          },
        }),
        c({
          tag: "input",
          name: "HTMLInputElement",
          ctor: function (v, N, y) {
            I.call(this, v, N, y);
          },
          props: {
            form: P.form,
            _post_click_activation_steps: {
              value: function (w) {
                if (this.type === "checkbox") this.checked = !this.checked;
                else if (this.type === "radio")
                  for (
                    var v = this.form.getElementsByName(this.name),
                      N = v.length - 1;
                    N >= 0;
                    N--
                  ) {
                    var y = v[N];
                    y.checked = y === this;
                  }
              },
            },
          },
          attributes: {
            name: String,
            disabled: Boolean,
            autofocus: Boolean,
            accept: String,
            alt: String,
            max: String,
            min: String,
            pattern: String,
            placeholder: String,
            step: String,
            dirName: String,
            defaultValue: { name: "value" },
            multiple: Boolean,
            required: Boolean,
            readOnly: Boolean,
            checked: Boolean,
            value: String,
            src: _,
            defaultChecked: { name: "checked", type: Boolean },
            size: { type: "unsigned long", default: 20, min: 1, setmin: 1 },
            width: { type: "unsigned long", min: 0, setmin: 0, default: 0 },
            height: { type: "unsigned long", min: 0, setmin: 0, default: 0 },
            minLength: {
              type: "unsigned long",
              min: 0,
              setmin: 0,
              default: -1,
            },
            maxLength: {
              type: "unsigned long",
              min: 0,
              setmin: 0,
              default: -1,
            },
            autocomplete: String,
            type: {
              type: [
                "text",
                "hidden",
                "search",
                "tel",
                "url",
                "email",
                "password",
                "datetime",
                "date",
                "month",
                "week",
                "time",
                "datetime-local",
                "number",
                "range",
                "color",
                "checkbox",
                "radio",
                "file",
                "submit",
                "image",
                "reset",
                "button",
              ],
              missing: "text",
            },
            formTarget: String,
            formNoValidate: Boolean,
            formMethod: { type: ["get", "post"], invalid: "get", missing: "" },
            formEnctype: {
              type: [
                "application/x-www-form-urlencoded",
                "multipart/form-data",
                "text/plain",
              ],
              invalid: "application/x-www-form-urlencoded",
              missing: "",
            },
            inputMode: {
              type: [
                "verbatim",
                "latin",
                "latin-name",
                "latin-prose",
                "full-width-latin",
                "kana",
                "kana-name",
                "katakana",
                "numeric",
                "tel",
                "email",
                "url",
              ],
              missing: "",
            },
            align: String,
            useMap: String,
          },
        }),
        c({
          tag: "keygen",
          name: "HTMLKeygenElement",
          ctor: function (v, N, y) {
            I.call(this, v, N, y);
          },
          props: P,
          attributes: {
            name: String,
            disabled: Boolean,
            autofocus: Boolean,
            challenge: String,
            keytype: { type: ["rsa"], missing: "" },
          },
        }),
        c({
          tag: "li",
          name: "HTMLLIElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: { value: { type: "long", default: 0 }, type: String },
        }),
        c({
          tag: "label",
          name: "HTMLLabelElement",
          ctor: function (v, N, y) {
            I.call(this, v, N, y);
          },
          props: P,
          attributes: { htmlFor: { name: "for", type: String } },
        }),
        c({
          tag: "legend",
          name: "HTMLLegendElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: { align: String },
        }),
        c({
          tag: "link",
          name: "HTMLLinkElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: {
            href: _,
            rel: String,
            media: String,
            hreflang: String,
            type: String,
            crossOrigin: g,
            nonce: String,
            integrity: String,
            referrerPolicy: b,
            imageSizes: String,
            imageSrcset: String,
            charset: String,
            rev: String,
            target: String,
          },
        }),
        c({
          tag: "map",
          name: "HTMLMapElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: { name: String },
        }),
        c({
          tag: "menu",
          name: "HTMLMenuElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: {
            type: { type: ["context", "popup", "toolbar"], missing: "toolbar" },
            label: String,
            compact: Boolean,
          },
        }),
        c({
          tag: "meta",
          name: "HTMLMetaElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: {
            name: String,
            content: String,
            httpEquiv: { name: "http-equiv", type: String },
            scheme: String,
          },
        }),
        c({
          tag: "meter",
          name: "HTMLMeterElement",
          ctor: function (v, N, y) {
            I.call(this, v, N, y);
          },
          props: P,
        }),
        c({
          tags: ["ins", "del"],
          name: "HTMLModElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: { cite: _, dateTime: String },
        }),
        c({
          tag: "ol",
          name: "HTMLOListElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          props: {
            _numitems: {
              get: function () {
                var w = 0;
                return (
                  this.childNodes.forEach(function (v) {
                    v.nodeType === e.ELEMENT_NODE && v.tagName === "LI" && w++;
                  }),
                  w
                );
              },
            },
          },
          attributes: {
            type: String,
            reversed: Boolean,
            start: {
              type: "long",
              default: function () {
                return this.reversed ? this._numitems : 1;
              },
            },
            compact: Boolean,
          },
        }),
        c({
          tag: "object",
          name: "HTMLObjectElement",
          ctor: function (v, N, y) {
            I.call(this, v, N, y);
          },
          props: P,
          attributes: {
            data: _,
            type: String,
            name: String,
            useMap: String,
            typeMustMatch: Boolean,
            width: String,
            height: String,
            align: String,
            archive: String,
            code: String,
            declare: Boolean,
            hspace: { type: "unsigned long", default: 0 },
            standby: String,
            vspace: { type: "unsigned long", default: 0 },
            codeBase: _,
            codeType: String,
            border: { type: String, treatNullAsEmptyString: !0 },
          },
        }),
        c({
          tag: "optgroup",
          name: "HTMLOptGroupElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: { disabled: Boolean, label: String },
        }),
        c({
          tag: "option",
          name: "HTMLOptionElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          props: {
            form: {
              get: function () {
                for (
                  var w = this.parentNode;
                  w && w.nodeType === e.ELEMENT_NODE;

                ) {
                  if (w.localName === "select") return w.form;
                  w = w.parentNode;
                }
              },
            },
            value: {
              get: function () {
                return this._getattr("value") || this.text;
              },
              set: function (w) {
                this._setattr("value", w);
              },
            },
            text: {
              get: function () {
                return this.textContent.replace(/[ \t\n\f\r]+/g, " ").trim();
              },
              set: function (w) {
                this.textContent = w;
              },
            },
          },
          attributes: {
            disabled: Boolean,
            defaultSelected: { name: "selected", type: Boolean },
            label: String,
          },
        }),
        c({
          tag: "output",
          name: "HTMLOutputElement",
          ctor: function (v, N, y) {
            I.call(this, v, N, y);
          },
          props: P,
          attributes: { name: String },
        }),
        c({
          tag: "p",
          name: "HTMLParagraphElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: { align: String },
        }),
        c({
          tag: "param",
          name: "HTMLParamElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: {
            name: String,
            value: String,
            type: String,
            valueType: String,
          },
        }),
        c({
          tags: ["pre", "listing", "xmp"],
          name: "HTMLPreElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: { width: { type: "long", default: 0 } },
        }),
        c({
          tag: "progress",
          name: "HTMLProgressElement",
          ctor: function (v, N, y) {
            I.call(this, v, N, y);
          },
          props: P,
          attributes: { max: { type: Number, float: !0, default: 1, min: 0 } },
        }),
        c({
          tags: ["q", "blockquote"],
          name: "HTMLQuoteElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: { cite: _ },
        }),
        c({
          tag: "script",
          name: "HTMLScriptElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          props: {
            text: {
              get: function () {
                for (
                  var w = "", v = 0, N = this.childNodes.length;
                  v < N;
                  v++
                ) {
                  var y = this.childNodes[v];
                  y.nodeType === e.TEXT_NODE && (w += y._data);
                }
                return w;
              },
              set: function (w) {
                this.removeChildren(),
                  w !== null &&
                    w !== "" &&
                    this.appendChild(this.ownerDocument.createTextNode(w));
              },
            },
          },
          attributes: {
            src: _,
            type: String,
            charset: String,
            referrerPolicy: b,
            defer: Boolean,
            async: Boolean,
            nomodule: Boolean,
            crossOrigin: g,
            nonce: String,
            integrity: String,
          },
        }),
        c({
          tag: "select",
          name: "HTMLSelectElement",
          ctor: function (v, N, y) {
            I.call(this, v, N, y);
          },
          props: {
            form: P.form,
            options: {
              get: function () {
                return this.getElementsByTagName("option");
              },
            },
          },
          attributes: {
            autocomplete: String,
            name: String,
            disabled: Boolean,
            autofocus: Boolean,
            multiple: Boolean,
            required: Boolean,
            size: { type: "unsigned long", default: 0 },
          },
        }),
        c({
          tag: "span",
          name: "HTMLSpanElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
        }),
        c({
          tag: "style",
          name: "HTMLStyleElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: { media: String, type: String, scoped: Boolean },
        }),
        c({
          tag: "caption",
          name: "HTMLTableCaptionElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: { align: String },
        }),
        c({
          name: "HTMLTableCellElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: {
            colSpan: { type: "unsigned long", default: 1 },
            rowSpan: { type: "unsigned long", default: 1 },
            scope: {
              type: ["row", "col", "rowgroup", "colgroup"],
              missing: "",
            },
            abbr: String,
            align: String,
            axis: String,
            height: String,
            width: String,
            ch: { name: "char", type: String },
            chOff: { name: "charoff", type: String },
            noWrap: Boolean,
            vAlign: String,
            bgColor: { type: String, treatNullAsEmptyString: !0 },
          },
        }),
        c({
          tags: ["col", "colgroup"],
          name: "HTMLTableColElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: {
            span: {
              type: "limited unsigned long with fallback",
              default: 1,
              min: 1,
            },
            align: String,
            ch: { name: "char", type: String },
            chOff: { name: "charoff", type: String },
            vAlign: String,
            width: String,
          },
        }),
        c({
          tag: "table",
          name: "HTMLTableElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          props: {
            rows: {
              get: function () {
                return this.getElementsByTagName("tr");
              },
            },
          },
          attributes: {
            align: String,
            border: String,
            frame: String,
            rules: String,
            summary: String,
            width: String,
            bgColor: { type: String, treatNullAsEmptyString: !0 },
            cellPadding: { type: String, treatNullAsEmptyString: !0 },
            cellSpacing: { type: String, treatNullAsEmptyString: !0 },
          },
        }),
        c({
          tag: "template",
          name: "HTMLTemplateElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y),
              (this._contentFragment = v._templateDoc.createDocumentFragment());
          },
          props: {
            content: {
              get: function () {
                return this._contentFragment;
              },
            },
            serialize: {
              value: function () {
                return this.content.serialize();
              },
            },
          },
        }),
        c({
          tag: "tr",
          name: "HTMLTableRowElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          props: {
            cells: {
              get: function () {
                return this.querySelectorAll("td,th");
              },
            },
          },
          attributes: {
            align: String,
            ch: { name: "char", type: String },
            chOff: { name: "charoff", type: String },
            vAlign: String,
            bgColor: { type: String, treatNullAsEmptyString: !0 },
          },
        }),
        c({
          tags: ["thead", "tfoot", "tbody"],
          name: "HTMLTableSectionElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          props: {
            rows: {
              get: function () {
                return this.getElementsByTagName("tr");
              },
            },
          },
          attributes: {
            align: String,
            ch: { name: "char", type: String },
            chOff: { name: "charoff", type: String },
            vAlign: String,
          },
        }),
        c({
          tag: "textarea",
          name: "HTMLTextAreaElement",
          ctor: function (v, N, y) {
            I.call(this, v, N, y);
          },
          props: {
            form: P.form,
            type: {
              get: function () {
                return "textarea";
              },
            },
            defaultValue: {
              get: function () {
                return this.textContent;
              },
              set: function (w) {
                this.textContent = w;
              },
            },
            value: {
              get: function () {
                return this.defaultValue;
              },
              set: function (w) {
                this.defaultValue = w;
              },
            },
            textLength: {
              get: function () {
                return this.value.length;
              },
            },
          },
          attributes: {
            autocomplete: String,
            name: String,
            disabled: Boolean,
            autofocus: Boolean,
            placeholder: String,
            wrap: String,
            dirName: String,
            required: Boolean,
            readOnly: Boolean,
            rows: { type: "limited unsigned long with fallback", default: 2 },
            cols: { type: "limited unsigned long with fallback", default: 20 },
            maxLength: {
              type: "unsigned long",
              min: 0,
              setmin: 0,
              default: -1,
            },
            minLength: {
              type: "unsigned long",
              min: 0,
              setmin: 0,
              default: -1,
            },
            inputMode: {
              type: [
                "verbatim",
                "latin",
                "latin-name",
                "latin-prose",
                "full-width-latin",
                "kana",
                "kana-name",
                "katakana",
                "numeric",
                "tel",
                "email",
                "url",
              ],
              missing: "",
            },
          },
        }),
        c({
          tag: "time",
          name: "HTMLTimeElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: { dateTime: String, pubDate: Boolean },
        }),
        c({
          tag: "title",
          name: "HTMLTitleElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          props: {
            text: {
              get: function () {
                return this.textContent;
              },
            },
          },
        }),
        c({
          tag: "ul",
          name: "HTMLUListElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: { type: String, compact: Boolean },
        }),
        c({
          name: "HTMLMediaElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: {
            src: _,
            crossOrigin: g,
            preload: {
              type: ["metadata", "none", "auto", { value: "", alias: "auto" }],
              missing: "auto",
            },
            loop: Boolean,
            autoplay: Boolean,
            mediaGroup: String,
            controls: Boolean,
            defaultMuted: { name: "muted", type: Boolean },
          },
        }),
        c({
          name: "HTMLAudioElement",
          tag: "audio",
          superclass: o.HTMLMediaElement,
          ctor: function (v, N, y) {
            o.HTMLMediaElement.call(this, v, N, y);
          },
        }),
        c({
          name: "HTMLVideoElement",
          tag: "video",
          superclass: o.HTMLMediaElement,
          ctor: function (v, N, y) {
            o.HTMLMediaElement.call(this, v, N, y);
          },
          attributes: {
            poster: _,
            width: { type: "unsigned long", min: 0, default: 0 },
            height: { type: "unsigned long", min: 0, default: 0 },
          },
        }),
        c({
          tag: "td",
          name: "HTMLTableDataCellElement",
          superclass: o.HTMLTableCellElement,
          ctor: function (v, N, y) {
            o.HTMLTableCellElement.call(this, v, N, y);
          },
        }),
        c({
          tag: "th",
          name: "HTMLTableHeaderCellElement",
          superclass: o.HTMLTableCellElement,
          ctor: function (v, N, y) {
            o.HTMLTableCellElement.call(this, v, N, y);
          },
        }),
        c({
          tag: "frameset",
          name: "HTMLFrameSetElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
        }),
        c({
          tag: "frame",
          name: "HTMLFrameElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
        }),
        c({
          tag: "canvas",
          name: "HTMLCanvasElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          props: {
            getContext: { value: n.nyi },
            probablySupportsContext: { value: n.nyi },
            setContext: { value: n.nyi },
            transferControlToProxy: { value: n.nyi },
            toDataURL: { value: n.nyi },
            toBlob: { value: n.nyi },
          },
          attributes: {
            width: { type: "unsigned long", default: 300 },
            height: { type: "unsigned long", default: 150 },
          },
        }),
        c({
          tag: "dialog",
          name: "HTMLDialogElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          props: {
            show: { value: n.nyi },
            showModal: { value: n.nyi },
            close: { value: n.nyi },
          },
          attributes: { open: Boolean, returnValue: String },
        }),
        c({
          tag: "menuitem",
          name: "HTMLMenuItemElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          props: {
            _label: {
              get: function () {
                var w = this._getattr("label");
                return w !== null && w !== ""
                  ? w
                  : ((w = this.textContent),
                    w.replace(/[ \t\n\f\r]+/g, " ").trim());
              },
            },
            label: {
              get: function () {
                var w = this._getattr("label");
                return w !== null ? w : this._label;
              },
              set: function (w) {
                this._setattr("label", w);
              },
            },
          },
          attributes: {
            type: {
              type: ["command", "checkbox", "radio"],
              missing: "command",
            },
            icon: _,
            disabled: Boolean,
            checked: Boolean,
            radiogroup: String,
            default: Boolean,
          },
        }),
        c({
          tag: "source",
          name: "HTMLSourceElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: {
            srcset: String,
            sizes: String,
            media: String,
            src: _,
            type: String,
            width: String,
            height: String,
          },
        }),
        c({
          tag: "track",
          name: "HTMLTrackElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: {
            src: _,
            srclang: String,
            label: String,
            default: Boolean,
            kind: {
              type: [
                "subtitles",
                "captions",
                "descriptions",
                "chapters",
                "metadata",
              ],
              missing: "subtitles",
              invalid: "metadata",
            },
          },
          props: {
            NONE: {
              get: function () {
                return 0;
              },
            },
            LOADING: {
              get: function () {
                return 1;
              },
            },
            LOADED: {
              get: function () {
                return 2;
              },
            },
            ERROR: {
              get: function () {
                return 3;
              },
            },
            readyState: { get: n.nyi },
            track: { get: n.nyi },
          },
        }),
        c({
          tag: "font",
          name: "HTMLFontElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: {
            color: { type: String, treatNullAsEmptyString: !0 },
            face: { type: String },
            size: { type: String },
          },
        }),
        c({
          tag: "dir",
          name: "HTMLDirectoryElement",
          ctor: function (v, N, y) {
            M.call(this, v, N, y);
          },
          attributes: { compact: Boolean },
        }),
        c({
          tags: [
            "abbr",
            "address",
            "article",
            "aside",
            "b",
            "bdi",
            "bdo",
            "cite",
            "content",
            "code",
            "dd",
            "dfn",
            "dt",
            "em",
            "figcaption",
            "figure",
            "footer",
            "header",
            "hgroup",
            "i",
            "kbd",
            "main",
            "mark",
            "nav",
            "noscript",
            "rb",
            "rp",
            "rt",
            "rtc",
            "ruby",
            "s",
            "samp",
            "section",
            "small",
            "strong",
            "sub",
            "summary",
            "sup",
            "u",
            "var",
            "wbr",
            "acronym",
            "basefont",
            "big",
            "center",
            "nobr",
            "noembed",
            "noframes",
            "plaintext",
            "strike",
            "tt",
          ],
        });
    },
  }),
  Oa = J({
    "external/npm/node_modules/domino/lib/svg.js"(a) {
      "use strict";
      var e = yr(),
        t = Ia(),
        r = ke(),
        n = ws(),
        s = (a.elements = {}),
        i = Object.create(null);
      a.createElement = function (c, _, g) {
        var b = i[_] || h;
        return new b(c, _, g);
      };
      function o(c) {
        return t(c, h, s, i);
      }
      var h = o({
        superclass: e,
        name: "SVGElement",
        ctor: function (_, g, b) {
          e.call(this, _, g, r.NAMESPACE.SVG, b);
        },
        props: {
          style: {
            get: function () {
              return this._style || (this._style = new n(this)), this._style;
            },
          },
        },
      });
      o({
        name: "SVGSVGElement",
        ctor: function (_, g, b) {
          h.call(this, _, g, b);
        },
        tag: "svg",
        props: {
          createSVGRect: {
            value: function () {
              return a.createElement(this.ownerDocument, "rect", null);
            },
          },
        },
      }),
        o({
          tags: [
            "a",
            "altGlyph",
            "altGlyphDef",
            "altGlyphItem",
            "animate",
            "animateColor",
            "animateMotion",
            "animateTransform",
            "circle",
            "clipPath",
            "color-profile",
            "cursor",
            "defs",
            "desc",
            "ellipse",
            "feBlend",
            "feColorMatrix",
            "feComponentTransfer",
            "feComposite",
            "feConvolveMatrix",
            "feDiffuseLighting",
            "feDisplacementMap",
            "feDistantLight",
            "feFlood",
            "feFuncA",
            "feFuncB",
            "feFuncG",
            "feFuncR",
            "feGaussianBlur",
            "feImage",
            "feMerge",
            "feMergeNode",
            "feMorphology",
            "feOffset",
            "fePointLight",
            "feSpecularLighting",
            "feSpotLight",
            "feTile",
            "feTurbulence",
            "filter",
            "font",
            "font-face",
            "font-face-format",
            "font-face-name",
            "font-face-src",
            "font-face-uri",
            "foreignObject",
            "g",
            "glyph",
            "glyphRef",
            "hkern",
            "image",
            "line",
            "linearGradient",
            "marker",
            "mask",
            "metadata",
            "missing-glyph",
            "mpath",
            "path",
            "pattern",
            "polygon",
            "polyline",
            "radialGradient",
            "rect",
            "script",
            "set",
            "stop",
            "style",
            "switch",
            "symbol",
            "text",
            "textPath",
            "title",
            "tref",
            "tspan",
            "use",
            "view",
            "vkern",
          ],
        });
    },
  }),
  jc = J({
    "external/npm/node_modules/domino/lib/MutationConstants.js"(a, e) {
      "use strict";
      e.exports = {
        VALUE: 1,
        ATTR: 2,
        REMOVE_ATTR: 3,
        REMOVE: 4,
        MOVE: 5,
        INSERT: 6,
      };
    },
  }),
  As = J({
    "external/npm/node_modules/domino/lib/Document.js"(a, e) {
      "use strict";
      e.exports = V;
      var t = Re(),
        r = Zt(),
        n = bs(),
        s = yr(),
        i = Aa(),
        o = Da(),
        h = _r(),
        c = ka(),
        _ = Ca(),
        g = mn(),
        b = qc(),
        C = Fc(),
        I = pn(),
        M = Ss(),
        G = vs(),
        P = Ma(),
        w = Es(),
        v = Ns(),
        N = Oa(),
        y = ke(),
        ne = jc(),
        ee = y.NAMESPACE,
        oe = ys().isApiWritable;
      function V(T, R) {
        n.call(this),
          (this.nodeType = t.DOCUMENT_NODE),
          (this.isHTML = T),
          (this._address = R || "about:blank"),
          (this.readyState = "loading"),
          (this.implementation = new g(this)),
          (this.ownerDocument = null),
          (this._contentType = T ? "text/html" : "application/xml"),
          (this.doctype = null),
          (this.documentElement = null),
          (this._templateDocCache = null),
          (this._nodeIterators = null),
          (this._nid = 1),
          (this._nextnid = 2),
          (this._nodes = [null, this]),
          (this.byId = Object.create(null)),
          (this.modclock = 0);
      }
      var L = {
          event: "Event",
          customevent: "CustomEvent",
          uievent: "UIEvent",
          mouseevent: "MouseEvent",
        },
        H = {
          events: "event",
          htmlevents: "event",
          mouseevents: "mouseevent",
          mutationevents: "mutationevent",
          uievents: "uievent",
        },
        Q = function (T, R, j) {
          return {
            get: function () {
              var ue = T.call(this);
              return ue ? ue[R] : j;
            },
            set: function (ue) {
              var Ie = T.call(this);
              Ie && (Ie[R] = ue);
            },
          };
        };
      function m(T, R) {
        var j, ue, Ie;
        return (
          T === "" && (T = null),
          w.isValidQName(R) || y.InvalidCharacterError(),
          (j = null),
          (ue = R),
          (Ie = R.indexOf(":")),
          Ie >= 0 && ((j = R.substring(0, Ie)), (ue = R.substring(Ie + 1))),
          j !== null && T === null && y.NamespaceError(),
          j === "xml" && T !== ee.XML && y.NamespaceError(),
          (j === "xmlns" || R === "xmlns") &&
            T !== ee.XMLNS &&
            y.NamespaceError(),
          T === ee.XMLNS &&
            !(j === "xmlns" || R === "xmlns") &&
            y.NamespaceError(),
          { namespace: T, prefix: j, localName: ue }
        );
      }
      V.prototype = Object.create(n.prototype, {
        _setMutationHandler: {
          value: function (T) {
            this.mutationHandler = T;
          },
        },
        _dispatchRendererEvent: {
          value: function (T, R, j) {
            var ue = this._nodes[T];
            ue && ue._dispatchEvent(new h(R, j), !0);
          },
        },
        nodeName: { value: "#document" },
        nodeValue: {
          get: function () {
            return null;
          },
          set: function () {},
        },
        documentURI: {
          get: function () {
            return this._address;
          },
          set: y.nyi,
        },
        compatMode: {
          get: function () {
            return this._quirks ? "BackCompat" : "CSS1Compat";
          },
        },
        createTextNode: {
          value: function (T) {
            return new i(this, String(T));
          },
        },
        createComment: {
          value: function (T) {
            return new o(this, T);
          },
        },
        createDocumentFragment: {
          value: function () {
            return new c(this);
          },
        },
        createProcessingInstruction: {
          value: function (T, R) {
            return (
              (!w.isValidName(T) || R.indexOf("?>") !== -1) &&
                y.InvalidCharacterError(),
              new _(this, T, R)
            );
          },
        },
        createAttribute: {
          value: function (T) {
            return (
              (T = String(T)),
              w.isValidName(T) || y.InvalidCharacterError(),
              this.isHTML && (T = y.toASCIILowerCase(T)),
              new s._Attr(null, T, null, null, "")
            );
          },
        },
        createAttributeNS: {
          value: function (T, R) {
            (T = T == null || T === "" ? null : String(T)), (R = String(R));
            var j = m(T, R);
            return new s._Attr(null, j.localName, j.prefix, j.namespace, "");
          },
        },
        createElement: {
          value: function (T) {
            return (
              (T = String(T)),
              w.isValidName(T) || y.InvalidCharacterError(),
              this.isHTML
                ? (/[A-Z]/.test(T) && (T = y.toASCIILowerCase(T)),
                  v.createElement(this, T, null))
                : this.contentType === "application/xhtml+xml"
                  ? v.createElement(this, T, null)
                  : new s(this, T, null, null)
            );
          },
          writable: oe,
        },
        createElementNS: {
          value: function (T, R) {
            (T = T == null || T === "" ? null : String(T)), (R = String(R));
            var j = m(T, R);
            return this._createElementNS(j.localName, j.namespace, j.prefix);
          },
          writable: oe,
        },
        _createElementNS: {
          value: function (T, R, j) {
            return R === ee.HTML
              ? v.createElement(this, T, j)
              : R === ee.SVG
                ? N.createElement(this, T, j)
                : new s(this, T, R, j);
          },
        },
        createEvent: {
          value: function (R) {
            R = R.toLowerCase();
            var j = H[R] || R,
              ue = P[L[j]];
            if (ue) {
              var Ie = new ue();
              return (Ie._initialized = !1), Ie;
            } else y.NotSupportedError();
          },
        },
        createTreeWalker: {
          value: function (T, R, j) {
            if (!T) throw new TypeError("root argument is required");
            if (!(T instanceof t)) throw new TypeError("root not a node");
            return (
              (R = R === void 0 ? I.SHOW_ALL : +R),
              (j = j === void 0 ? null : j),
              new b(T, R, j)
            );
          },
        },
        createNodeIterator: {
          value: function (T, R, j) {
            if (!T) throw new TypeError("root argument is required");
            if (!(T instanceof t)) throw new TypeError("root not a node");
            return (
              (R = R === void 0 ? I.SHOW_ALL : +R),
              (j = j === void 0 ? null : j),
              new C(T, R, j)
            );
          },
        },
        _attachNodeIterator: {
          value: function (T) {
            this._nodeIterators || (this._nodeIterators = []),
              this._nodeIterators.push(T);
          },
        },
        _detachNodeIterator: {
          value: function (T) {
            var R = this._nodeIterators.indexOf(T);
            this._nodeIterators.splice(R, 1);
          },
        },
        _preremoveNodeIterators: {
          value: function (T) {
            this._nodeIterators &&
              this._nodeIterators.forEach(function (R) {
                R._preremove(T);
              });
          },
        },
        _updateDocTypeElement: {
          value: function () {
            this.doctype = this.documentElement = null;
            for (var R = this.firstChild; R !== null; R = R.nextSibling)
              R.nodeType === t.DOCUMENT_TYPE_NODE
                ? (this.doctype = R)
                : R.nodeType === t.ELEMENT_NODE && (this.documentElement = R);
          },
        },
        insertBefore: {
          value: function (R, j) {
            return (
              t.prototype.insertBefore.call(this, R, j),
              this._updateDocTypeElement(),
              R
            );
          },
        },
        replaceChild: {
          value: function (R, j) {
            return (
              t.prototype.replaceChild.call(this, R, j),
              this._updateDocTypeElement(),
              j
            );
          },
        },
        removeChild: {
          value: function (R) {
            return (
              t.prototype.removeChild.call(this, R),
              this._updateDocTypeElement(),
              R
            );
          },
        },
        getElementById: {
          value: function (T) {
            var R = this.byId[T];
            return R ? (R instanceof ie ? R.getFirst() : R) : null;
          },
        },
        _hasMultipleElementsWithId: {
          value: function (T) {
            return this.byId[T] instanceof ie;
          },
        },
        getElementsByName: { value: s.prototype.getElementsByName },
        getElementsByTagName: { value: s.prototype.getElementsByTagName },
        getElementsByTagNameNS: { value: s.prototype.getElementsByTagNameNS },
        getElementsByClassName: { value: s.prototype.getElementsByClassName },
        adoptNode: {
          value: function (R) {
            return (
              R.nodeType === t.DOCUMENT_NODE && y.NotSupportedError(),
              R.nodeType === t.ATTRIBUTE_NODE ||
                (R.parentNode && R.parentNode.removeChild(R),
                R.ownerDocument !== this && W(R, this)),
              R
            );
          },
        },
        importNode: {
          value: function (R, j) {
            return this.adoptNode(R.cloneNode(j));
          },
          writable: oe,
        },
        origin: {
          get: function () {
            return null;
          },
        },
        characterSet: {
          get: function () {
            return "UTF-8";
          },
        },
        contentType: {
          get: function () {
            return this._contentType;
          },
        },
        URL: {
          get: function () {
            return this._address;
          },
        },
        domain: { get: y.nyi, set: y.nyi },
        referrer: { get: y.nyi },
        cookie: { get: y.nyi, set: y.nyi },
        lastModified: { get: y.nyi },
        location: {
          get: function () {
            return this.defaultView ? this.defaultView.location : null;
          },
          set: y.nyi,
        },
        _titleElement: {
          get: function () {
            return this.getElementsByTagName("title").item(0) || null;
          },
        },
        title: {
          get: function () {
            var T = this._titleElement,
              R = T ? T.textContent : "";
            return R.replace(/[ \t\n\r\f]+/g, " ").replace(/(^ )|( $)/g, "");
          },
          set: function (T) {
            var R = this._titleElement,
              j = this.head;
            (!R && !j) ||
              (R || ((R = this.createElement("title")), j.appendChild(R)),
              (R.textContent = T));
          },
        },
        dir: Q(
          function () {
            var T = this.documentElement;
            if (T && T.tagName === "HTML") return T;
          },
          "dir",
          ""
        ),
        fgColor: Q(
          function () {
            return this.body;
          },
          "text",
          ""
        ),
        linkColor: Q(
          function () {
            return this.body;
          },
          "link",
          ""
        ),
        vlinkColor: Q(
          function () {
            return this.body;
          },
          "vLink",
          ""
        ),
        alinkColor: Q(
          function () {
            return this.body;
          },
          "aLink",
          ""
        ),
        bgColor: Q(
          function () {
            return this.body;
          },
          "bgColor",
          ""
        ),
        charset: {
          get: function () {
            return this.characterSet;
          },
        },
        inputEncoding: {
          get: function () {
            return this.characterSet;
          },
        },
        scrollingElement: {
          get: function () {
            return this._quirks ? this.body : this.documentElement;
          },
        },
        body: {
          get: function () {
            return f(this.documentElement, "body");
          },
          set: y.nyi,
        },
        head: {
          get: function () {
            return f(this.documentElement, "head");
          },
        },
        images: { get: y.nyi },
        embeds: { get: y.nyi },
        plugins: { get: y.nyi },
        links: { get: y.nyi },
        forms: { get: y.nyi },
        scripts: { get: y.nyi },
        applets: {
          get: function () {
            return [];
          },
        },
        activeElement: {
          get: function () {
            return null;
          },
        },
        innerHTML: {
          get: function () {
            return this.serialize();
          },
          set: y.nyi,
        },
        outerHTML: {
          get: function () {
            return this.serialize();
          },
          set: y.nyi,
        },
        write: {
          value: function (T) {
            if ((this.isHTML || y.InvalidStateError(), !!this._parser)) {
              this._parser;
              var R = arguments.join("");
              this._parser.parse(R);
            }
          },
        },
        writeln: {
          value: function (R) {
            this.write(
              Array.prototype.join.call(arguments, "") +
                `
`
            );
          },
        },
        open: {
          value: function () {
            this.documentElement = null;
          },
        },
        close: {
          value: function () {
            (this.readyState = "interactive"),
              this._dispatchEvent(new h("readystatechange"), !0),
              this._dispatchEvent(new h("DOMContentLoaded"), !0),
              (this.readyState = "complete"),
              this._dispatchEvent(new h("readystatechange"), !0),
              this.defaultView &&
                this.defaultView._dispatchEvent(new h("load"), !0);
          },
        },
        clone: {
          value: function () {
            var R = new V(this.isHTML, this._address);
            return (
              (R._quirks = this._quirks),
              (R._contentType = this._contentType),
              R
            );
          },
        },
        cloneNode: {
          value: function (R) {
            var j = t.prototype.cloneNode.call(this, !1);
            if (R)
              for (var ue = this.firstChild; ue !== null; ue = ue.nextSibling)
                j._appendChild(j.importNode(ue, !0));
            return j._updateDocTypeElement(), j;
          },
        },
        isEqual: {
          value: function (R) {
            return !0;
          },
        },
        mutateValue: {
          value: function (T) {
            this.mutationHandler &&
              this.mutationHandler({ type: ne.VALUE, target: T, data: T.data });
          },
        },
        mutateAttr: {
          value: function (T, R) {
            this.mutationHandler &&
              this.mutationHandler({
                type: ne.ATTR,
                target: T.ownerElement,
                attr: T,
              });
          },
        },
        mutateRemoveAttr: {
          value: function (T) {
            this.mutationHandler &&
              this.mutationHandler({
                type: ne.REMOVE_ATTR,
                target: T.ownerElement,
                attr: T,
              });
          },
        },
        mutateRemove: {
          value: function (T) {
            this.mutationHandler &&
              this.mutationHandler({
                type: ne.REMOVE,
                target: T.parentNode,
                node: T,
              }),
              U(T);
          },
        },
        mutateInsert: {
          value: function (T) {
            k(T),
              this.mutationHandler &&
                this.mutationHandler({
                  type: ne.INSERT,
                  target: T.parentNode,
                  node: T,
                });
          },
        },
        mutateMove: {
          value: function (T) {
            this.mutationHandler &&
              this.mutationHandler({ type: ne.MOVE, target: T });
          },
        },
        addId: {
          value: function (R, j) {
            var ue = this.byId[R];
            ue
              ? (ue instanceof ie || ((ue = new ie(ue)), (this.byId[R] = ue)),
                ue.add(j))
              : (this.byId[R] = j);
          },
        },
        delId: {
          value: function (R, j) {
            var ue = this.byId[R];
            y.assert(ue),
              ue instanceof ie
                ? (ue.del(j),
                  ue.length === 1 && (this.byId[R] = ue.downgrade()))
                : (this.byId[R] = void 0);
          },
        },
        _resolve: {
          value: function (T) {
            return new M(this._documentBaseURL).resolve(T);
          },
        },
        _documentBaseURL: {
          get: function () {
            var T = this._address;
            T === "about:blank" && (T = "/");
            var R = this.querySelector("base[href]");
            return R ? new M(T).resolve(R.getAttribute("href")) : T;
          },
        },
        _templateDoc: {
          get: function () {
            if (!this._templateDocCache) {
              var T = new V(this.isHTML, this._address);
              this._templateDocCache = T._templateDocCache = T;
            }
            return this._templateDocCache;
          },
        },
        querySelector: {
          value: function (T) {
            return G(T, this)[0];
          },
        },
        querySelectorAll: {
          value: function (T) {
            var R = G(T, this);
            return R.item ? R : new r(R);
          },
        },
      });
      var d = [
        "abort",
        "canplay",
        "canplaythrough",
        "change",
        "click",
        "contextmenu",
        "cuechange",
        "dblclick",
        "drag",
        "dragend",
        "dragenter",
        "dragleave",
        "dragover",
        "dragstart",
        "drop",
        "durationchange",
        "emptied",
        "ended",
        "input",
        "invalid",
        "keydown",
        "keypress",
        "keyup",
        "loadeddata",
        "loadedmetadata",
        "loadstart",
        "mousedown",
        "mousemove",
        "mouseout",
        "mouseover",
        "mouseup",
        "mousewheel",
        "pause",
        "play",
        "playing",
        "progress",
        "ratechange",
        "readystatechange",
        "reset",
        "seeked",
        "seeking",
        "select",
        "show",
        "stalled",
        "submit",
        "suspend",
        "timeupdate",
        "volumechange",
        "waiting",
        "blur",
        "error",
        "focus",
        "load",
        "scroll",
      ];
      d.forEach(function (T) {
        Object.defineProperty(V.prototype, "on" + T, {
          get: function () {
            return this._getEventHandler(T);
          },
          set: function (R) {
            this._setEventHandler(T, R);
          },
        });
      });
      function f(T, R) {
        if (T && T.isHTML) {
          for (var j = T.firstChild; j !== null; j = j.nextSibling)
            if (
              j.nodeType === t.ELEMENT_NODE &&
              j.localName === R &&
              j.namespaceURI === ee.HTML
            )
              return j;
        }
        return null;
      }
      function p(T) {
        if (
          ((T._nid = T.ownerDocument._nextnid++),
          (T.ownerDocument._nodes[T._nid] = T),
          T.nodeType === t.ELEMENT_NODE)
        ) {
          var R = T.getAttribute("id");
          R && T.ownerDocument.addId(R, T), T._roothook && T._roothook();
        }
      }
      function S(T) {
        if (T.nodeType === t.ELEMENT_NODE) {
          var R = T.getAttribute("id");
          R && T.ownerDocument.delId(R, T);
        }
        (T.ownerDocument._nodes[T._nid] = void 0), (T._nid = void 0);
      }
      function k(T) {
        if ((p(T), T.nodeType === t.ELEMENT_NODE))
          for (var R = T.firstChild; R !== null; R = R.nextSibling) k(R);
      }
      function U(T) {
        S(T);
        for (var R = T.firstChild; R !== null; R = R.nextSibling) U(R);
      }
      function W(T, R) {
        (T.ownerDocument = R),
          (T._lastModTime = void 0),
          Object.prototype.hasOwnProperty.call(T, "_tagName") &&
            (T._tagName = void 0);
        for (var j = T.firstChild; j !== null; j = j.nextSibling) W(j, R);
      }
      function ie(T) {
        (this.nodes = Object.create(null)),
          (this.nodes[T._nid] = T),
          (this.length = 1),
          (this.firstNode = void 0);
      }
      (ie.prototype.add = function (T) {
        this.nodes[T._nid] ||
          ((this.nodes[T._nid] = T), this.length++, (this.firstNode = void 0));
      }),
        (ie.prototype.del = function (T) {
          this.nodes[T._nid] &&
            (delete this.nodes[T._nid],
            this.length--,
            (this.firstNode = void 0));
        }),
        (ie.prototype.getFirst = function () {
          if (!this.firstNode) {
            var T;
            for (T in this.nodes)
              (this.firstNode === void 0 ||
                this.firstNode.compareDocumentPosition(this.nodes[T]) &
                  t.DOCUMENT_POSITION_PRECEDING) &&
                (this.firstNode = this.nodes[T]);
          }
          return this.firstNode;
        }),
        (ie.prototype.downgrade = function () {
          if (this.length === 1) {
            var T;
            for (T in this.nodes) return this.nodes[T];
          }
          return this;
        });
    },
  }),
  Ds = J({
    "external/npm/node_modules/domino/lib/DocumentType.js"(a, e) {
      "use strict";
      e.exports = s;
      var t = Re(),
        r = Na(),
        n = Ts();
      function s(i, o, h, c) {
        r.call(this),
          (this.nodeType = t.DOCUMENT_TYPE_NODE),
          (this.ownerDocument = i || null),
          (this.name = o),
          (this.publicId = h || ""),
          (this.systemId = c || "");
      }
      (s.prototype = Object.create(r.prototype, {
        nodeName: {
          get: function () {
            return this.name;
          },
        },
        nodeValue: {
          get: function () {
            return null;
          },
          set: function () {},
        },
        clone: {
          value: function () {
            return new s(
              this.ownerDocument,
              this.name,
              this.publicId,
              this.systemId
            );
          },
        },
        isEqual: {
          value: function (o) {
            return (
              this.name === o.name &&
              this.publicId === o.publicId &&
              this.systemId === o.systemId
            );
          },
        },
      })),
        Object.defineProperties(s.prototype, n);
    },
  }),
  ks = J({
    "external/npm/node_modules/domino/lib/HTMLParser.js"(a, e) {
      "use strict";
      e.exports = de;
      var t = As(),
        r = Ds(),
        n = Re(),
        s = ke().NAMESPACE,
        i = Ns(),
        o = i.elements,
        h = Function.prototype.apply.bind(Array.prototype.push),
        c = -1,
        _ = 1,
        g = 2,
        b = 3,
        C = 4,
        I = 5,
        M = [],
        G =
          /^HTML$|^-\/\/W3O\/\/DTD W3 HTML Strict 3\.0\/\/EN\/\/$|^-\/W3C\/DTD HTML 4\.0 Transitional\/EN$|^\+\/\/Silmaril\/\/dtd html Pro v0r11 19970101\/\/|^-\/\/AdvaSoft Ltd\/\/DTD HTML 3\.0 asWedit \+ extensions\/\/|^-\/\/AS\/\/DTD HTML 3\.0 asWedit \+ extensions\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Level 1\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Level 2\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Strict Level 1\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Strict Level 2\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Strict\/\/|^-\/\/IETF\/\/DTD HTML 2\.0\/\/|^-\/\/IETF\/\/DTD HTML 2\.1E\/\/|^-\/\/IETF\/\/DTD HTML 3\.0\/\/|^-\/\/IETF\/\/DTD HTML 3\.2 Final\/\/|^-\/\/IETF\/\/DTD HTML 3\.2\/\/|^-\/\/IETF\/\/DTD HTML 3\/\/|^-\/\/IETF\/\/DTD HTML Level 0\/\/|^-\/\/IETF\/\/DTD HTML Level 1\/\/|^-\/\/IETF\/\/DTD HTML Level 2\/\/|^-\/\/IETF\/\/DTD HTML Level 3\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 0\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 1\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 2\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 3\/\/|^-\/\/IETF\/\/DTD HTML Strict\/\/|^-\/\/IETF\/\/DTD HTML\/\/|^-\/\/Metrius\/\/DTD Metrius Presentational\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 2\.0 HTML Strict\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 2\.0 HTML\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 2\.0 Tables\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 3\.0 HTML Strict\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 3\.0 HTML\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 3\.0 Tables\/\/|^-\/\/Netscape Comm\. Corp\.\/\/DTD HTML\/\/|^-\/\/Netscape Comm\. Corp\.\/\/DTD Strict HTML\/\/|^-\/\/O'Reilly and Associates\/\/DTD HTML 2\.0\/\/|^-\/\/O'Reilly and Associates\/\/DTD HTML Extended 1\.0\/\/|^-\/\/O'Reilly and Associates\/\/DTD HTML Extended Relaxed 1\.0\/\/|^-\/\/SoftQuad Software\/\/DTD HoTMetaL PRO 6\.0::19990601::extensions to HTML 4\.0\/\/|^-\/\/SoftQuad\/\/DTD HoTMetaL PRO 4\.0::19971010::extensions to HTML 4\.0\/\/|^-\/\/Spyglass\/\/DTD HTML 2\.0 Extended\/\/|^-\/\/SQ\/\/DTD HTML 2\.0 HoTMetaL \+ extensions\/\/|^-\/\/Sun Microsystems Corp\.\/\/DTD HotJava HTML\/\/|^-\/\/Sun Microsystems Corp\.\/\/DTD HotJava Strict HTML\/\/|^-\/\/W3C\/\/DTD HTML 3 1995-03-24\/\/|^-\/\/W3C\/\/DTD HTML 3\.2 Draft\/\/|^-\/\/W3C\/\/DTD HTML 3\.2 Final\/\/|^-\/\/W3C\/\/DTD HTML 3\.2\/\/|^-\/\/W3C\/\/DTD HTML 3\.2S Draft\/\/|^-\/\/W3C\/\/DTD HTML 4\.0 Frameset\/\/|^-\/\/W3C\/\/DTD HTML 4\.0 Transitional\/\/|^-\/\/W3C\/\/DTD HTML Experimental 19960712\/\/|^-\/\/W3C\/\/DTD HTML Experimental 970421\/\/|^-\/\/W3C\/\/DTD W3 HTML\/\/|^-\/\/W3O\/\/DTD W3 HTML 3\.0\/\/|^-\/\/WebTechs\/\/DTD Mozilla HTML 2\.0\/\/|^-\/\/WebTechs\/\/DTD Mozilla HTML\/\//i,
        P = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd",
        w =
          /^-\/\/W3C\/\/DTD HTML 4\.01 Frameset\/\/|^-\/\/W3C\/\/DTD HTML 4\.01 Transitional\/\//i,
        v =
          /^-\/\/W3C\/\/DTD XHTML 1\.0 Frameset\/\/|^-\/\/W3C\/\/DTD XHTML 1\.0 Transitional\/\//i,
        N = Object.create(null);
      (N[s.HTML] = {
        __proto__: null,
        address: !0,
        applet: !0,
        area: !0,
        article: !0,
        aside: !0,
        base: !0,
        basefont: !0,
        bgsound: !0,
        blockquote: !0,
        body: !0,
        br: !0,
        button: !0,
        caption: !0,
        center: !0,
        col: !0,
        colgroup: !0,
        dd: !0,
        details: !0,
        dir: !0,
        div: !0,
        dl: !0,
        dt: !0,
        embed: !0,
        fieldset: !0,
        figcaption: !0,
        figure: !0,
        footer: !0,
        form: !0,
        frame: !0,
        frameset: !0,
        h1: !0,
        h2: !0,
        h3: !0,
        h4: !0,
        h5: !0,
        h6: !0,
        head: !0,
        header: !0,
        hgroup: !0,
        hr: !0,
        html: !0,
        iframe: !0,
        img: !0,
        input: !0,
        li: !0,
        link: !0,
        listing: !0,
        main: !0,
        marquee: !0,
        menu: !0,
        meta: !0,
        nav: !0,
        noembed: !0,
        noframes: !0,
        noscript: !0,
        object: !0,
        ol: !0,
        p: !0,
        param: !0,
        plaintext: !0,
        pre: !0,
        script: !0,
        section: !0,
        select: !0,
        source: !0,
        style: !0,
        summary: !0,
        table: !0,
        tbody: !0,
        td: !0,
        template: !0,
        textarea: !0,
        tfoot: !0,
        th: !0,
        thead: !0,
        title: !0,
        tr: !0,
        track: !0,
        ul: !0,
        wbr: !0,
        xmp: !0,
      }),
        (N[s.SVG] = {
          __proto__: null,
          foreignObject: !0,
          desc: !0,
          title: !0,
        }),
        (N[s.MATHML] = {
          __proto__: null,
          mi: !0,
          mo: !0,
          mn: !0,
          ms: !0,
          mtext: !0,
          "annotation-xml": !0,
        });
      var y = Object.create(null);
      y[s.HTML] = { __proto__: null, address: !0, div: !0, p: !0 };
      var ne = Object.create(null);
      ne[s.HTML] = { __proto__: null, dd: !0, dt: !0 };
      var ee = Object.create(null);
      ee[s.HTML] = {
        __proto__: null,
        table: !0,
        thead: !0,
        tbody: !0,
        tfoot: !0,
        tr: !0,
      };
      var oe = Object.create(null);
      oe[s.HTML] = {
        __proto__: null,
        dd: !0,
        dt: !0,
        li: !0,
        menuitem: !0,
        optgroup: !0,
        option: !0,
        p: !0,
        rb: !0,
        rp: !0,
        rt: !0,
        rtc: !0,
      };
      var V = Object.create(null);
      V[s.HTML] = {
        __proto__: null,
        caption: !0,
        colgroup: !0,
        dd: !0,
        dt: !0,
        li: !0,
        optgroup: !0,
        option: !0,
        p: !0,
        rb: !0,
        rp: !0,
        rt: !0,
        rtc: !0,
        tbody: !0,
        td: !0,
        tfoot: !0,
        th: !0,
        thead: !0,
        tr: !0,
      };
      var L = Object.create(null);
      L[s.HTML] = { __proto__: null, table: !0, template: !0, html: !0 };
      var H = Object.create(null);
      H[s.HTML] = {
        __proto__: null,
        tbody: !0,
        tfoot: !0,
        thead: !0,
        template: !0,
        html: !0,
      };
      var Q = Object.create(null);
      Q[s.HTML] = { __proto__: null, tr: !0, template: !0, html: !0 };
      var m = Object.create(null);
      m[s.HTML] = {
        __proto__: null,
        button: !0,
        fieldset: !0,
        input: !0,
        keygen: !0,
        object: !0,
        output: !0,
        select: !0,
        textarea: !0,
        img: !0,
      };
      var d = Object.create(null);
      (d[s.HTML] = {
        __proto__: null,
        applet: !0,
        caption: !0,
        html: !0,
        table: !0,
        td: !0,
        th: !0,
        marquee: !0,
        object: !0,
        template: !0,
      }),
        (d[s.MATHML] = {
          __proto__: null,
          mi: !0,
          mo: !0,
          mn: !0,
          ms: !0,
          mtext: !0,
          "annotation-xml": !0,
        }),
        (d[s.SVG] = {
          __proto__: null,
          foreignObject: !0,
          desc: !0,
          title: !0,
        });
      var f = Object.create(d);
      (f[s.HTML] = Object.create(d[s.HTML])),
        (f[s.HTML].ol = !0),
        (f[s.HTML].ul = !0);
      var p = Object.create(d);
      (p[s.HTML] = Object.create(d[s.HTML])), (p[s.HTML].button = !0);
      var S = Object.create(null);
      S[s.HTML] = { __proto__: null, html: !0, table: !0, template: !0 };
      var k = Object.create(null);
      k[s.HTML] = { __proto__: null, optgroup: !0, option: !0 };
      var U = Object.create(null);
      U[s.MATHML] = {
        __proto__: null,
        mi: !0,
        mo: !0,
        mn: !0,
        ms: !0,
        mtext: !0,
      };
      var W = Object.create(null);
      W[s.SVG] = { __proto__: null, foreignObject: !0, desc: !0, title: !0 };
      var ie = {
          __proto__: null,
          "xlink:actuate": s.XLINK,
          "xlink:arcrole": s.XLINK,
          "xlink:href": s.XLINK,
          "xlink:role": s.XLINK,
          "xlink:show": s.XLINK,
          "xlink:title": s.XLINK,
          "xlink:type": s.XLINK,
          "xml:base": s.XML,
          "xml:lang": s.XML,
          "xml:space": s.XML,
          xmlns: s.XMLNS,
          "xmlns:xlink": s.XMLNS,
        },
        T = {
          __proto__: null,
          attributename: "attributeName",
          attributetype: "attributeType",
          basefrequency: "baseFrequency",
          baseprofile: "baseProfile",
          calcmode: "calcMode",
          clippathunits: "clipPathUnits",
          diffuseconstant: "diffuseConstant",
          edgemode: "edgeMode",
          filterunits: "filterUnits",
          glyphref: "glyphRef",
          gradienttransform: "gradientTransform",
          gradientunits: "gradientUnits",
          kernelmatrix: "kernelMatrix",
          kernelunitlength: "kernelUnitLength",
          keypoints: "keyPoints",
          keysplines: "keySplines",
          keytimes: "keyTimes",
          lengthadjust: "lengthAdjust",
          limitingconeangle: "limitingConeAngle",
          markerheight: "markerHeight",
          markerunits: "markerUnits",
          markerwidth: "markerWidth",
          maskcontentunits: "maskContentUnits",
          maskunits: "maskUnits",
          numoctaves: "numOctaves",
          pathlength: "pathLength",
          patterncontentunits: "patternContentUnits",
          patterntransform: "patternTransform",
          patternunits: "patternUnits",
          pointsatx: "pointsAtX",
          pointsaty: "pointsAtY",
          pointsatz: "pointsAtZ",
          preservealpha: "preserveAlpha",
          preserveaspectratio: "preserveAspectRatio",
          primitiveunits: "primitiveUnits",
          refx: "refX",
          refy: "refY",
          repeatcount: "repeatCount",
          repeatdur: "repeatDur",
          requiredextensions: "requiredExtensions",
          requiredfeatures: "requiredFeatures",
          specularconstant: "specularConstant",
          specularexponent: "specularExponent",
          spreadmethod: "spreadMethod",
          startoffset: "startOffset",
          stddeviation: "stdDeviation",
          stitchtiles: "stitchTiles",
          surfacescale: "surfaceScale",
          systemlanguage: "systemLanguage",
          tablevalues: "tableValues",
          targetx: "targetX",
          targety: "targetY",
          textlength: "textLength",
          viewbox: "viewBox",
          viewtarget: "viewTarget",
          xchannelselector: "xChannelSelector",
          ychannelselector: "yChannelSelector",
          zoomandpan: "zoomAndPan",
        },
        R = {
          __proto__: null,
          altglyph: "altGlyph",
          altglyphdef: "altGlyphDef",
          altglyphitem: "altGlyphItem",
          animatecolor: "animateColor",
          animatemotion: "animateMotion",
          animatetransform: "animateTransform",
          clippath: "clipPath",
          feblend: "feBlend",
          fecolormatrix: "feColorMatrix",
          fecomponenttransfer: "feComponentTransfer",
          fecomposite: "feComposite",
          feconvolvematrix: "feConvolveMatrix",
          fediffuselighting: "feDiffuseLighting",
          fedisplacementmap: "feDisplacementMap",
          fedistantlight: "feDistantLight",
          feflood: "feFlood",
          fefunca: "feFuncA",
          fefuncb: "feFuncB",
          fefuncg: "feFuncG",
          fefuncr: "feFuncR",
          fegaussianblur: "feGaussianBlur",
          feimage: "feImage",
          femerge: "feMerge",
          femergenode: "feMergeNode",
          femorphology: "feMorphology",
          feoffset: "feOffset",
          fepointlight: "fePointLight",
          fespecularlighting: "feSpecularLighting",
          fespotlight: "feSpotLight",
          fetile: "feTile",
          feturbulence: "feTurbulence",
          foreignobject: "foreignObject",
          glyphref: "glyphRef",
          lineargradient: "linearGradient",
          radialgradient: "radialGradient",
          textpath: "textPath",
        },
        j = {
          __proto__: null,
          0: 65533,
          128: 8364,
          130: 8218,
          131: 402,
          132: 8222,
          133: 8230,
          134: 8224,
          135: 8225,
          136: 710,
          137: 8240,
          138: 352,
          139: 8249,
          140: 338,
          142: 381,
          145: 8216,
          146: 8217,
          147: 8220,
          148: 8221,
          149: 8226,
          150: 8211,
          151: 8212,
          152: 732,
          153: 8482,
          154: 353,
          155: 8250,
          156: 339,
          158: 382,
          159: 376,
        },
        ue = {
          __proto__: null,
          AElig: 198,
          "AElig;": 198,
          AMP: 38,
          "AMP;": 38,
          Aacute: 193,
          "Aacute;": 193,
          "Abreve;": 258,
          Acirc: 194,
          "Acirc;": 194,
          "Acy;": 1040,
          "Afr;": [55349, 56580],
          Agrave: 192,
          "Agrave;": 192,
          "Alpha;": 913,
          "Amacr;": 256,
          "And;": 10835,
          "Aogon;": 260,
          "Aopf;": [55349, 56632],
          "ApplyFunction;": 8289,
          Aring: 197,
          "Aring;": 197,
          "Ascr;": [55349, 56476],
          "Assign;": 8788,
          Atilde: 195,
          "Atilde;": 195,
          Auml: 196,
          "Auml;": 196,
          "Backslash;": 8726,
          "Barv;": 10983,
          "Barwed;": 8966,
          "Bcy;": 1041,
          "Because;": 8757,
          "Bernoullis;": 8492,
          "Beta;": 914,
          "Bfr;": [55349, 56581],
          "Bopf;": [55349, 56633],
          "Breve;": 728,
          "Bscr;": 8492,
          "Bumpeq;": 8782,
          "CHcy;": 1063,
          COPY: 169,
          "COPY;": 169,
          "Cacute;": 262,
          "Cap;": 8914,
          "CapitalDifferentialD;": 8517,
          "Cayleys;": 8493,
          "Ccaron;": 268,
          Ccedil: 199,
          "Ccedil;": 199,
          "Ccirc;": 264,
          "Cconint;": 8752,
          "Cdot;": 266,
          "Cedilla;": 184,
          "CenterDot;": 183,
          "Cfr;": 8493,
          "Chi;": 935,
          "CircleDot;": 8857,
          "CircleMinus;": 8854,
          "CirclePlus;": 8853,
          "CircleTimes;": 8855,
          "ClockwiseContourIntegral;": 8754,
          "CloseCurlyDoubleQuote;": 8221,
          "CloseCurlyQuote;": 8217,
          "Colon;": 8759,
          "Colone;": 10868,
          "Congruent;": 8801,
          "Conint;": 8751,
          "ContourIntegral;": 8750,
          "Copf;": 8450,
          "Coproduct;": 8720,
          "CounterClockwiseContourIntegral;": 8755,
          "Cross;": 10799,
          "Cscr;": [55349, 56478],
          "Cup;": 8915,
          "CupCap;": 8781,
          "DD;": 8517,
          "DDotrahd;": 10513,
          "DJcy;": 1026,
          "DScy;": 1029,
          "DZcy;": 1039,
          "Dagger;": 8225,
          "Darr;": 8609,
          "Dashv;": 10980,
          "Dcaron;": 270,
          "Dcy;": 1044,
          "Del;": 8711,
          "Delta;": 916,
          "Dfr;": [55349, 56583],
          "DiacriticalAcute;": 180,
          "DiacriticalDot;": 729,
          "DiacriticalDoubleAcute;": 733,
          "DiacriticalGrave;": 96,
          "DiacriticalTilde;": 732,
          "Diamond;": 8900,
          "DifferentialD;": 8518,
          "Dopf;": [55349, 56635],
          "Dot;": 168,
          "DotDot;": 8412,
          "DotEqual;": 8784,
          "DoubleContourIntegral;": 8751,
          "DoubleDot;": 168,
          "DoubleDownArrow;": 8659,
          "DoubleLeftArrow;": 8656,
          "DoubleLeftRightArrow;": 8660,
          "DoubleLeftTee;": 10980,
          "DoubleLongLeftArrow;": 10232,
          "DoubleLongLeftRightArrow;": 10234,
          "DoubleLongRightArrow;": 10233,
          "DoubleRightArrow;": 8658,
          "DoubleRightTee;": 8872,
          "DoubleUpArrow;": 8657,
          "DoubleUpDownArrow;": 8661,
          "DoubleVerticalBar;": 8741,
          "DownArrow;": 8595,
          "DownArrowBar;": 10515,
          "DownArrowUpArrow;": 8693,
          "DownBreve;": 785,
          "DownLeftRightVector;": 10576,
          "DownLeftTeeVector;": 10590,
          "DownLeftVector;": 8637,
          "DownLeftVectorBar;": 10582,
          "DownRightTeeVector;": 10591,
          "DownRightVector;": 8641,
          "DownRightVectorBar;": 10583,
          "DownTee;": 8868,
          "DownTeeArrow;": 8615,
          "Downarrow;": 8659,
          "Dscr;": [55349, 56479],
          "Dstrok;": 272,
          "ENG;": 330,
          ETH: 208,
          "ETH;": 208,
          Eacute: 201,
          "Eacute;": 201,
          "Ecaron;": 282,
          Ecirc: 202,
          "Ecirc;": 202,
          "Ecy;": 1069,
          "Edot;": 278,
          "Efr;": [55349, 56584],
          Egrave: 200,
          "Egrave;": 200,
          "Element;": 8712,
          "Emacr;": 274,
          "EmptySmallSquare;": 9723,
          "EmptyVerySmallSquare;": 9643,
          "Eogon;": 280,
          "Eopf;": [55349, 56636],
          "Epsilon;": 917,
          "Equal;": 10869,
          "EqualTilde;": 8770,
          "Equilibrium;": 8652,
          "Escr;": 8496,
          "Esim;": 10867,
          "Eta;": 919,
          Euml: 203,
          "Euml;": 203,
          "Exists;": 8707,
          "ExponentialE;": 8519,
          "Fcy;": 1060,
          "Ffr;": [55349, 56585],
          "FilledSmallSquare;": 9724,
          "FilledVerySmallSquare;": 9642,
          "Fopf;": [55349, 56637],
          "ForAll;": 8704,
          "Fouriertrf;": 8497,
          "Fscr;": 8497,
          "GJcy;": 1027,
          GT: 62,
          "GT;": 62,
          "Gamma;": 915,
          "Gammad;": 988,
          "Gbreve;": 286,
          "Gcedil;": 290,
          "Gcirc;": 284,
          "Gcy;": 1043,
          "Gdot;": 288,
          "Gfr;": [55349, 56586],
          "Gg;": 8921,
          "Gopf;": [55349, 56638],
          "GreaterEqual;": 8805,
          "GreaterEqualLess;": 8923,
          "GreaterFullEqual;": 8807,
          "GreaterGreater;": 10914,
          "GreaterLess;": 8823,
          "GreaterSlantEqual;": 10878,
          "GreaterTilde;": 8819,
          "Gscr;": [55349, 56482],
          "Gt;": 8811,
          "HARDcy;": 1066,
          "Hacek;": 711,
          "Hat;": 94,
          "Hcirc;": 292,
          "Hfr;": 8460,
          "HilbertSpace;": 8459,
          "Hopf;": 8461,
          "HorizontalLine;": 9472,
          "Hscr;": 8459,
          "Hstrok;": 294,
          "HumpDownHump;": 8782,
          "HumpEqual;": 8783,
          "IEcy;": 1045,
          "IJlig;": 306,
          "IOcy;": 1025,
          Iacute: 205,
          "Iacute;": 205,
          Icirc: 206,
          "Icirc;": 206,
          "Icy;": 1048,
          "Idot;": 304,
          "Ifr;": 8465,
          Igrave: 204,
          "Igrave;": 204,
          "Im;": 8465,
          "Imacr;": 298,
          "ImaginaryI;": 8520,
          "Implies;": 8658,
          "Int;": 8748,
          "Integral;": 8747,
          "Intersection;": 8898,
          "InvisibleComma;": 8291,
          "InvisibleTimes;": 8290,
          "Iogon;": 302,
          "Iopf;": [55349, 56640],
          "Iota;": 921,
          "Iscr;": 8464,
          "Itilde;": 296,
          "Iukcy;": 1030,
          Iuml: 207,
          "Iuml;": 207,
          "Jcirc;": 308,
          "Jcy;": 1049,
          "Jfr;": [55349, 56589],
          "Jopf;": [55349, 56641],
          "Jscr;": [55349, 56485],
          "Jsercy;": 1032,
          "Jukcy;": 1028,
          "KHcy;": 1061,
          "KJcy;": 1036,
          "Kappa;": 922,
          "Kcedil;": 310,
          "Kcy;": 1050,
          "Kfr;": [55349, 56590],
          "Kopf;": [55349, 56642],
          "Kscr;": [55349, 56486],
          "LJcy;": 1033,
          LT: 60,
          "LT;": 60,
          "Lacute;": 313,
          "Lambda;": 923,
          "Lang;": 10218,
          "Laplacetrf;": 8466,
          "Larr;": 8606,
          "Lcaron;": 317,
          "Lcedil;": 315,
          "Lcy;": 1051,
          "LeftAngleBracket;": 10216,
          "LeftArrow;": 8592,
          "LeftArrowBar;": 8676,
          "LeftArrowRightArrow;": 8646,
          "LeftCeiling;": 8968,
          "LeftDoubleBracket;": 10214,
          "LeftDownTeeVector;": 10593,
          "LeftDownVector;": 8643,
          "LeftDownVectorBar;": 10585,
          "LeftFloor;": 8970,
          "LeftRightArrow;": 8596,
          "LeftRightVector;": 10574,
          "LeftTee;": 8867,
          "LeftTeeArrow;": 8612,
          "LeftTeeVector;": 10586,
          "LeftTriangle;": 8882,
          "LeftTriangleBar;": 10703,
          "LeftTriangleEqual;": 8884,
          "LeftUpDownVector;": 10577,
          "LeftUpTeeVector;": 10592,
          "LeftUpVector;": 8639,
          "LeftUpVectorBar;": 10584,
          "LeftVector;": 8636,
          "LeftVectorBar;": 10578,
          "Leftarrow;": 8656,
          "Leftrightarrow;": 8660,
          "LessEqualGreater;": 8922,
          "LessFullEqual;": 8806,
          "LessGreater;": 8822,
          "LessLess;": 10913,
          "LessSlantEqual;": 10877,
          "LessTilde;": 8818,
          "Lfr;": [55349, 56591],
          "Ll;": 8920,
          "Lleftarrow;": 8666,
          "Lmidot;": 319,
          "LongLeftArrow;": 10229,
          "LongLeftRightArrow;": 10231,
          "LongRightArrow;": 10230,
          "Longleftarrow;": 10232,
          "Longleftrightarrow;": 10234,
          "Longrightarrow;": 10233,
          "Lopf;": [55349, 56643],
          "LowerLeftArrow;": 8601,
          "LowerRightArrow;": 8600,
          "Lscr;": 8466,
          "Lsh;": 8624,
          "Lstrok;": 321,
          "Lt;": 8810,
          "Map;": 10501,
          "Mcy;": 1052,
          "MediumSpace;": 8287,
          "Mellintrf;": 8499,
          "Mfr;": [55349, 56592],
          "MinusPlus;": 8723,
          "Mopf;": [55349, 56644],
          "Mscr;": 8499,
          "Mu;": 924,
          "NJcy;": 1034,
          "Nacute;": 323,
          "Ncaron;": 327,
          "Ncedil;": 325,
          "Ncy;": 1053,
          "NegativeMediumSpace;": 8203,
          "NegativeThickSpace;": 8203,
          "NegativeThinSpace;": 8203,
          "NegativeVeryThinSpace;": 8203,
          "NestedGreaterGreater;": 8811,
          "NestedLessLess;": 8810,
          "NewLine;": 10,
          "Nfr;": [55349, 56593],
          "NoBreak;": 8288,
          "NonBreakingSpace;": 160,
          "Nopf;": 8469,
          "Not;": 10988,
          "NotCongruent;": 8802,
          "NotCupCap;": 8813,
          "NotDoubleVerticalBar;": 8742,
          "NotElement;": 8713,
          "NotEqual;": 8800,
          "NotEqualTilde;": [8770, 824],
          "NotExists;": 8708,
          "NotGreater;": 8815,
          "NotGreaterEqual;": 8817,
          "NotGreaterFullEqual;": [8807, 824],
          "NotGreaterGreater;": [8811, 824],
          "NotGreaterLess;": 8825,
          "NotGreaterSlantEqual;": [10878, 824],
          "NotGreaterTilde;": 8821,
          "NotHumpDownHump;": [8782, 824],
          "NotHumpEqual;": [8783, 824],
          "NotLeftTriangle;": 8938,
          "NotLeftTriangleBar;": [10703, 824],
          "NotLeftTriangleEqual;": 8940,
          "NotLess;": 8814,
          "NotLessEqual;": 8816,
          "NotLessGreater;": 8824,
          "NotLessLess;": [8810, 824],
          "NotLessSlantEqual;": [10877, 824],
          "NotLessTilde;": 8820,
          "NotNestedGreaterGreater;": [10914, 824],
          "NotNestedLessLess;": [10913, 824],
          "NotPrecedes;": 8832,
          "NotPrecedesEqual;": [10927, 824],
          "NotPrecedesSlantEqual;": 8928,
          "NotReverseElement;": 8716,
          "NotRightTriangle;": 8939,
          "NotRightTriangleBar;": [10704, 824],
          "NotRightTriangleEqual;": 8941,
          "NotSquareSubset;": [8847, 824],
          "NotSquareSubsetEqual;": 8930,
          "NotSquareSuperset;": [8848, 824],
          "NotSquareSupersetEqual;": 8931,
          "NotSubset;": [8834, 8402],
          "NotSubsetEqual;": 8840,
          "NotSucceeds;": 8833,
          "NotSucceedsEqual;": [10928, 824],
          "NotSucceedsSlantEqual;": 8929,
          "NotSucceedsTilde;": [8831, 824],
          "NotSuperset;": [8835, 8402],
          "NotSupersetEqual;": 8841,
          "NotTilde;": 8769,
          "NotTildeEqual;": 8772,
          "NotTildeFullEqual;": 8775,
          "NotTildeTilde;": 8777,
          "NotVerticalBar;": 8740,
          "Nscr;": [55349, 56489],
          Ntilde: 209,
          "Ntilde;": 209,
          "Nu;": 925,
          "OElig;": 338,
          Oacute: 211,
          "Oacute;": 211,
          Ocirc: 212,
          "Ocirc;": 212,
          "Ocy;": 1054,
          "Odblac;": 336,
          "Ofr;": [55349, 56594],
          Ograve: 210,
          "Ograve;": 210,
          "Omacr;": 332,
          "Omega;": 937,
          "Omicron;": 927,
          "Oopf;": [55349, 56646],
          "OpenCurlyDoubleQuote;": 8220,
          "OpenCurlyQuote;": 8216,
          "Or;": 10836,
          "Oscr;": [55349, 56490],
          Oslash: 216,
          "Oslash;": 216,
          Otilde: 213,
          "Otilde;": 213,
          "Otimes;": 10807,
          Ouml: 214,
          "Ouml;": 214,
          "OverBar;": 8254,
          "OverBrace;": 9182,
          "OverBracket;": 9140,
          "OverParenthesis;": 9180,
          "PartialD;": 8706,
          "Pcy;": 1055,
          "Pfr;": [55349, 56595],
          "Phi;": 934,
          "Pi;": 928,
          "PlusMinus;": 177,
          "Poincareplane;": 8460,
          "Popf;": 8473,
          "Pr;": 10939,
          "Precedes;": 8826,
          "PrecedesEqual;": 10927,
          "PrecedesSlantEqual;": 8828,
          "PrecedesTilde;": 8830,
          "Prime;": 8243,
          "Product;": 8719,
          "Proportion;": 8759,
          "Proportional;": 8733,
          "Pscr;": [55349, 56491],
          "Psi;": 936,
          QUOT: 34,
          "QUOT;": 34,
          "Qfr;": [55349, 56596],
          "Qopf;": 8474,
          "Qscr;": [55349, 56492],
          "RBarr;": 10512,
          REG: 174,
          "REG;": 174,
          "Racute;": 340,
          "Rang;": 10219,
          "Rarr;": 8608,
          "Rarrtl;": 10518,
          "Rcaron;": 344,
          "Rcedil;": 342,
          "Rcy;": 1056,
          "Re;": 8476,
          "ReverseElement;": 8715,
          "ReverseEquilibrium;": 8651,
          "ReverseUpEquilibrium;": 10607,
          "Rfr;": 8476,
          "Rho;": 929,
          "RightAngleBracket;": 10217,
          "RightArrow;": 8594,
          "RightArrowBar;": 8677,
          "RightArrowLeftArrow;": 8644,
          "RightCeiling;": 8969,
          "RightDoubleBracket;": 10215,
          "RightDownTeeVector;": 10589,
          "RightDownVector;": 8642,
          "RightDownVectorBar;": 10581,
          "RightFloor;": 8971,
          "RightTee;": 8866,
          "RightTeeArrow;": 8614,
          "RightTeeVector;": 10587,
          "RightTriangle;": 8883,
          "RightTriangleBar;": 10704,
          "RightTriangleEqual;": 8885,
          "RightUpDownVector;": 10575,
          "RightUpTeeVector;": 10588,
          "RightUpVector;": 8638,
          "RightUpVectorBar;": 10580,
          "RightVector;": 8640,
          "RightVectorBar;": 10579,
          "Rightarrow;": 8658,
          "Ropf;": 8477,
          "RoundImplies;": 10608,
          "Rrightarrow;": 8667,
          "Rscr;": 8475,
          "Rsh;": 8625,
          "RuleDelayed;": 10740,
          "SHCHcy;": 1065,
          "SHcy;": 1064,
          "SOFTcy;": 1068,
          "Sacute;": 346,
          "Sc;": 10940,
          "Scaron;": 352,
          "Scedil;": 350,
          "Scirc;": 348,
          "Scy;": 1057,
          "Sfr;": [55349, 56598],
          "ShortDownArrow;": 8595,
          "ShortLeftArrow;": 8592,
          "ShortRightArrow;": 8594,
          "ShortUpArrow;": 8593,
          "Sigma;": 931,
          "SmallCircle;": 8728,
          "Sopf;": [55349, 56650],
          "Sqrt;": 8730,
          "Square;": 9633,
          "SquareIntersection;": 8851,
          "SquareSubset;": 8847,
          "SquareSubsetEqual;": 8849,
          "SquareSuperset;": 8848,
          "SquareSupersetEqual;": 8850,
          "SquareUnion;": 8852,
          "Sscr;": [55349, 56494],
          "Star;": 8902,
          "Sub;": 8912,
          "Subset;": 8912,
          "SubsetEqual;": 8838,
          "Succeeds;": 8827,
          "SucceedsEqual;": 10928,
          "SucceedsSlantEqual;": 8829,
          "SucceedsTilde;": 8831,
          "SuchThat;": 8715,
          "Sum;": 8721,
          "Sup;": 8913,
          "Superset;": 8835,
          "SupersetEqual;": 8839,
          "Supset;": 8913,
          THORN: 222,
          "THORN;": 222,
          "TRADE;": 8482,
          "TSHcy;": 1035,
          "TScy;": 1062,
          "Tab;": 9,
          "Tau;": 932,
          "Tcaron;": 356,
          "Tcedil;": 354,
          "Tcy;": 1058,
          "Tfr;": [55349, 56599],
          "Therefore;": 8756,
          "Theta;": 920,
          "ThickSpace;": [8287, 8202],
          "ThinSpace;": 8201,
          "Tilde;": 8764,
          "TildeEqual;": 8771,
          "TildeFullEqual;": 8773,
          "TildeTilde;": 8776,
          "Topf;": [55349, 56651],
          "TripleDot;": 8411,
          "Tscr;": [55349, 56495],
          "Tstrok;": 358,
          Uacute: 218,
          "Uacute;": 218,
          "Uarr;": 8607,
          "Uarrocir;": 10569,
          "Ubrcy;": 1038,
          "Ubreve;": 364,
          Ucirc: 219,
          "Ucirc;": 219,
          "Ucy;": 1059,
          "Udblac;": 368,
          "Ufr;": [55349, 56600],
          Ugrave: 217,
          "Ugrave;": 217,
          "Umacr;": 362,
          "UnderBar;": 95,
          "UnderBrace;": 9183,
          "UnderBracket;": 9141,
          "UnderParenthesis;": 9181,
          "Union;": 8899,
          "UnionPlus;": 8846,
          "Uogon;": 370,
          "Uopf;": [55349, 56652],
          "UpArrow;": 8593,
          "UpArrowBar;": 10514,
          "UpArrowDownArrow;": 8645,
          "UpDownArrow;": 8597,
          "UpEquilibrium;": 10606,
          "UpTee;": 8869,
          "UpTeeArrow;": 8613,
          "Uparrow;": 8657,
          "Updownarrow;": 8661,
          "UpperLeftArrow;": 8598,
          "UpperRightArrow;": 8599,
          "Upsi;": 978,
          "Upsilon;": 933,
          "Uring;": 366,
          "Uscr;": [55349, 56496],
          "Utilde;": 360,
          Uuml: 220,
          "Uuml;": 220,
          "VDash;": 8875,
          "Vbar;": 10987,
          "Vcy;": 1042,
          "Vdash;": 8873,
          "Vdashl;": 10982,
          "Vee;": 8897,
          "Verbar;": 8214,
          "Vert;": 8214,
          "VerticalBar;": 8739,
          "VerticalLine;": 124,
          "VerticalSeparator;": 10072,
          "VerticalTilde;": 8768,
          "VeryThinSpace;": 8202,
          "Vfr;": [55349, 56601],
          "Vopf;": [55349, 56653],
          "Vscr;": [55349, 56497],
          "Vvdash;": 8874,
          "Wcirc;": 372,
          "Wedge;": 8896,
          "Wfr;": [55349, 56602],
          "Wopf;": [55349, 56654],
          "Wscr;": [55349, 56498],
          "Xfr;": [55349, 56603],
          "Xi;": 926,
          "Xopf;": [55349, 56655],
          "Xscr;": [55349, 56499],
          "YAcy;": 1071,
          "YIcy;": 1031,
          "YUcy;": 1070,
          Yacute: 221,
          "Yacute;": 221,
          "Ycirc;": 374,
          "Ycy;": 1067,
          "Yfr;": [55349, 56604],
          "Yopf;": [55349, 56656],
          "Yscr;": [55349, 56500],
          "Yuml;": 376,
          "ZHcy;": 1046,
          "Zacute;": 377,
          "Zcaron;": 381,
          "Zcy;": 1047,
          "Zdot;": 379,
          "ZeroWidthSpace;": 8203,
          "Zeta;": 918,
          "Zfr;": 8488,
          "Zopf;": 8484,
          "Zscr;": [55349, 56501],
          aacute: 225,
          "aacute;": 225,
          "abreve;": 259,
          "ac;": 8766,
          "acE;": [8766, 819],
          "acd;": 8767,
          acirc: 226,
          "acirc;": 226,
          acute: 180,
          "acute;": 180,
          "acy;": 1072,
          aelig: 230,
          "aelig;": 230,
          "af;": 8289,
          "afr;": [55349, 56606],
          agrave: 224,
          "agrave;": 224,
          "alefsym;": 8501,
          "aleph;": 8501,
          "alpha;": 945,
          "amacr;": 257,
          "amalg;": 10815,
          amp: 38,
          "amp;": 38,
          "and;": 8743,
          "andand;": 10837,
          "andd;": 10844,
          "andslope;": 10840,
          "andv;": 10842,
          "ang;": 8736,
          "ange;": 10660,
          "angle;": 8736,
          "angmsd;": 8737,
          "angmsdaa;": 10664,
          "angmsdab;": 10665,
          "angmsdac;": 10666,
          "angmsdad;": 10667,
          "angmsdae;": 10668,
          "angmsdaf;": 10669,
          "angmsdag;": 10670,
          "angmsdah;": 10671,
          "angrt;": 8735,
          "angrtvb;": 8894,
          "angrtvbd;": 10653,
          "angsph;": 8738,
          "angst;": 197,
          "angzarr;": 9084,
          "aogon;": 261,
          "aopf;": [55349, 56658],
          "ap;": 8776,
          "apE;": 10864,
          "apacir;": 10863,
          "ape;": 8778,
          "apid;": 8779,
          "apos;": 39,
          "approx;": 8776,
          "approxeq;": 8778,
          aring: 229,
          "aring;": 229,
          "ascr;": [55349, 56502],
          "ast;": 42,
          "asymp;": 8776,
          "asympeq;": 8781,
          atilde: 227,
          "atilde;": 227,
          auml: 228,
          "auml;": 228,
          "awconint;": 8755,
          "awint;": 10769,
          "bNot;": 10989,
          "backcong;": 8780,
          "backepsilon;": 1014,
          "backprime;": 8245,
          "backsim;": 8765,
          "backsimeq;": 8909,
          "barvee;": 8893,
          "barwed;": 8965,
          "barwedge;": 8965,
          "bbrk;": 9141,
          "bbrktbrk;": 9142,
          "bcong;": 8780,
          "bcy;": 1073,
          "bdquo;": 8222,
          "becaus;": 8757,
          "because;": 8757,
          "bemptyv;": 10672,
          "bepsi;": 1014,
          "bernou;": 8492,
          "beta;": 946,
          "beth;": 8502,
          "between;": 8812,
          "bfr;": [55349, 56607],
          "bigcap;": 8898,
          "bigcirc;": 9711,
          "bigcup;": 8899,
          "bigodot;": 10752,
          "bigoplus;": 10753,
          "bigotimes;": 10754,
          "bigsqcup;": 10758,
          "bigstar;": 9733,
          "bigtriangledown;": 9661,
          "bigtriangleup;": 9651,
          "biguplus;": 10756,
          "bigvee;": 8897,
          "bigwedge;": 8896,
          "bkarow;": 10509,
          "blacklozenge;": 10731,
          "blacksquare;": 9642,
          "blacktriangle;": 9652,
          "blacktriangledown;": 9662,
          "blacktriangleleft;": 9666,
          "blacktriangleright;": 9656,
          "blank;": 9251,
          "blk12;": 9618,
          "blk14;": 9617,
          "blk34;": 9619,
          "block;": 9608,
          "bne;": [61, 8421],
          "bnequiv;": [8801, 8421],
          "bnot;": 8976,
          "bopf;": [55349, 56659],
          "bot;": 8869,
          "bottom;": 8869,
          "bowtie;": 8904,
          "boxDL;": 9559,
          "boxDR;": 9556,
          "boxDl;": 9558,
          "boxDr;": 9555,
          "boxH;": 9552,
          "boxHD;": 9574,
          "boxHU;": 9577,
          "boxHd;": 9572,
          "boxHu;": 9575,
          "boxUL;": 9565,
          "boxUR;": 9562,
          "boxUl;": 9564,
          "boxUr;": 9561,
          "boxV;": 9553,
          "boxVH;": 9580,
          "boxVL;": 9571,
          "boxVR;": 9568,
          "boxVh;": 9579,
          "boxVl;": 9570,
          "boxVr;": 9567,
          "boxbox;": 10697,
          "boxdL;": 9557,
          "boxdR;": 9554,
          "boxdl;": 9488,
          "boxdr;": 9484,
          "boxh;": 9472,
          "boxhD;": 9573,
          "boxhU;": 9576,
          "boxhd;": 9516,
          "boxhu;": 9524,
          "boxminus;": 8863,
          "boxplus;": 8862,
          "boxtimes;": 8864,
          "boxuL;": 9563,
          "boxuR;": 9560,
          "boxul;": 9496,
          "boxur;": 9492,
          "boxv;": 9474,
          "boxvH;": 9578,
          "boxvL;": 9569,
          "boxvR;": 9566,
          "boxvh;": 9532,
          "boxvl;": 9508,
          "boxvr;": 9500,
          "bprime;": 8245,
          "breve;": 728,
          brvbar: 166,
          "brvbar;": 166,
          "bscr;": [55349, 56503],
          "bsemi;": 8271,
          "bsim;": 8765,
          "bsime;": 8909,
          "bsol;": 92,
          "bsolb;": 10693,
          "bsolhsub;": 10184,
          "bull;": 8226,
          "bullet;": 8226,
          "bump;": 8782,
          "bumpE;": 10926,
          "bumpe;": 8783,
          "bumpeq;": 8783,
          "cacute;": 263,
          "cap;": 8745,
          "capand;": 10820,
          "capbrcup;": 10825,
          "capcap;": 10827,
          "capcup;": 10823,
          "capdot;": 10816,
          "caps;": [8745, 65024],
          "caret;": 8257,
          "caron;": 711,
          "ccaps;": 10829,
          "ccaron;": 269,
          ccedil: 231,
          "ccedil;": 231,
          "ccirc;": 265,
          "ccups;": 10828,
          "ccupssm;": 10832,
          "cdot;": 267,
          cedil: 184,
          "cedil;": 184,
          "cemptyv;": 10674,
          cent: 162,
          "cent;": 162,
          "centerdot;": 183,
          "cfr;": [55349, 56608],
          "chcy;": 1095,
          "check;": 10003,
          "checkmark;": 10003,
          "chi;": 967,
          "cir;": 9675,
          "cirE;": 10691,
          "circ;": 710,
          "circeq;": 8791,
          "circlearrowleft;": 8634,
          "circlearrowright;": 8635,
          "circledR;": 174,
          "circledS;": 9416,
          "circledast;": 8859,
          "circledcirc;": 8858,
          "circleddash;": 8861,
          "cire;": 8791,
          "cirfnint;": 10768,
          "cirmid;": 10991,
          "cirscir;": 10690,
          "clubs;": 9827,
          "clubsuit;": 9827,
          "colon;": 58,
          "colone;": 8788,
          "coloneq;": 8788,
          "comma;": 44,
          "commat;": 64,
          "comp;": 8705,
          "compfn;": 8728,
          "complement;": 8705,
          "complexes;": 8450,
          "cong;": 8773,
          "congdot;": 10861,
          "conint;": 8750,
          "copf;": [55349, 56660],
          "coprod;": 8720,
          copy: 169,
          "copy;": 169,
          "copysr;": 8471,
          "crarr;": 8629,
          "cross;": 10007,
          "cscr;": [55349, 56504],
          "csub;": 10959,
          "csube;": 10961,
          "csup;": 10960,
          "csupe;": 10962,
          "ctdot;": 8943,
          "cudarrl;": 10552,
          "cudarrr;": 10549,
          "cuepr;": 8926,
          "cuesc;": 8927,
          "cularr;": 8630,
          "cularrp;": 10557,
          "cup;": 8746,
          "cupbrcap;": 10824,
          "cupcap;": 10822,
          "cupcup;": 10826,
          "cupdot;": 8845,
          "cupor;": 10821,
          "cups;": [8746, 65024],
          "curarr;": 8631,
          "curarrm;": 10556,
          "curlyeqprec;": 8926,
          "curlyeqsucc;": 8927,
          "curlyvee;": 8910,
          "curlywedge;": 8911,
          curren: 164,
          "curren;": 164,
          "curvearrowleft;": 8630,
          "curvearrowright;": 8631,
          "cuvee;": 8910,
          "cuwed;": 8911,
          "cwconint;": 8754,
          "cwint;": 8753,
          "cylcty;": 9005,
          "dArr;": 8659,
          "dHar;": 10597,
          "dagger;": 8224,
          "daleth;": 8504,
          "darr;": 8595,
          "dash;": 8208,
          "dashv;": 8867,
          "dbkarow;": 10511,
          "dblac;": 733,
          "dcaron;": 271,
          "dcy;": 1076,
          "dd;": 8518,
          "ddagger;": 8225,
          "ddarr;": 8650,
          "ddotseq;": 10871,
          deg: 176,
          "deg;": 176,
          "delta;": 948,
          "demptyv;": 10673,
          "dfisht;": 10623,
          "dfr;": [55349, 56609],
          "dharl;": 8643,
          "dharr;": 8642,
          "diam;": 8900,
          "diamond;": 8900,
          "diamondsuit;": 9830,
          "diams;": 9830,
          "die;": 168,
          "digamma;": 989,
          "disin;": 8946,
          "div;": 247,
          divide: 247,
          "divide;": 247,
          "divideontimes;": 8903,
          "divonx;": 8903,
          "djcy;": 1106,
          "dlcorn;": 8990,
          "dlcrop;": 8973,
          "dollar;": 36,
          "dopf;": [55349, 56661],
          "dot;": 729,
          "doteq;": 8784,
          "doteqdot;": 8785,
          "dotminus;": 8760,
          "dotplus;": 8724,
          "dotsquare;": 8865,
          "doublebarwedge;": 8966,
          "downarrow;": 8595,
          "downdownarrows;": 8650,
          "downharpoonleft;": 8643,
          "downharpoonright;": 8642,
          "drbkarow;": 10512,
          "drcorn;": 8991,
          "drcrop;": 8972,
          "dscr;": [55349, 56505],
          "dscy;": 1109,
          "dsol;": 10742,
          "dstrok;": 273,
          "dtdot;": 8945,
          "dtri;": 9663,
          "dtrif;": 9662,
          "duarr;": 8693,
          "duhar;": 10607,
          "dwangle;": 10662,
          "dzcy;": 1119,
          "dzigrarr;": 10239,
          "eDDot;": 10871,
          "eDot;": 8785,
          eacute: 233,
          "eacute;": 233,
          "easter;": 10862,
          "ecaron;": 283,
          "ecir;": 8790,
          ecirc: 234,
          "ecirc;": 234,
          "ecolon;": 8789,
          "ecy;": 1101,
          "edot;": 279,
          "ee;": 8519,
          "efDot;": 8786,
          "efr;": [55349, 56610],
          "eg;": 10906,
          egrave: 232,
          "egrave;": 232,
          "egs;": 10902,
          "egsdot;": 10904,
          "el;": 10905,
          "elinters;": 9191,
          "ell;": 8467,
          "els;": 10901,
          "elsdot;": 10903,
          "emacr;": 275,
          "empty;": 8709,
          "emptyset;": 8709,
          "emptyv;": 8709,
          "emsp13;": 8196,
          "emsp14;": 8197,
          "emsp;": 8195,
          "eng;": 331,
          "ensp;": 8194,
          "eogon;": 281,
          "eopf;": [55349, 56662],
          "epar;": 8917,
          "eparsl;": 10723,
          "eplus;": 10865,
          "epsi;": 949,
          "epsilon;": 949,
          "epsiv;": 1013,
          "eqcirc;": 8790,
          "eqcolon;": 8789,
          "eqsim;": 8770,
          "eqslantgtr;": 10902,
          "eqslantless;": 10901,
          "equals;": 61,
          "equest;": 8799,
          "equiv;": 8801,
          "equivDD;": 10872,
          "eqvparsl;": 10725,
          "erDot;": 8787,
          "erarr;": 10609,
          "escr;": 8495,
          "esdot;": 8784,
          "esim;": 8770,
          "eta;": 951,
          eth: 240,
          "eth;": 240,
          euml: 235,
          "euml;": 235,
          "euro;": 8364,
          "excl;": 33,
          "exist;": 8707,
          "expectation;": 8496,
          "exponentiale;": 8519,
          "fallingdotseq;": 8786,
          "fcy;": 1092,
          "female;": 9792,
          "ffilig;": 64259,
          "fflig;": 64256,
          "ffllig;": 64260,
          "ffr;": [55349, 56611],
          "filig;": 64257,
          "fjlig;": [102, 106],
          "flat;": 9837,
          "fllig;": 64258,
          "fltns;": 9649,
          "fnof;": 402,
          "fopf;": [55349, 56663],
          "forall;": 8704,
          "fork;": 8916,
          "forkv;": 10969,
          "fpartint;": 10765,
          frac12: 189,
          "frac12;": 189,
          "frac13;": 8531,
          frac14: 188,
          "frac14;": 188,
          "frac15;": 8533,
          "frac16;": 8537,
          "frac18;": 8539,
          "frac23;": 8532,
          "frac25;": 8534,
          frac34: 190,
          "frac34;": 190,
          "frac35;": 8535,
          "frac38;": 8540,
          "frac45;": 8536,
          "frac56;": 8538,
          "frac58;": 8541,
          "frac78;": 8542,
          "frasl;": 8260,
          "frown;": 8994,
          "fscr;": [55349, 56507],
          "gE;": 8807,
          "gEl;": 10892,
          "gacute;": 501,
          "gamma;": 947,
          "gammad;": 989,
          "gap;": 10886,
          "gbreve;": 287,
          "gcirc;": 285,
          "gcy;": 1075,
          "gdot;": 289,
          "ge;": 8805,
          "gel;": 8923,
          "geq;": 8805,
          "geqq;": 8807,
          "geqslant;": 10878,
          "ges;": 10878,
          "gescc;": 10921,
          "gesdot;": 10880,
          "gesdoto;": 10882,
          "gesdotol;": 10884,
          "gesl;": [8923, 65024],
          "gesles;": 10900,
          "gfr;": [55349, 56612],
          "gg;": 8811,
          "ggg;": 8921,
          "gimel;": 8503,
          "gjcy;": 1107,
          "gl;": 8823,
          "glE;": 10898,
          "gla;": 10917,
          "glj;": 10916,
          "gnE;": 8809,
          "gnap;": 10890,
          "gnapprox;": 10890,
          "gne;": 10888,
          "gneq;": 10888,
          "gneqq;": 8809,
          "gnsim;": 8935,
          "gopf;": [55349, 56664],
          "grave;": 96,
          "gscr;": 8458,
          "gsim;": 8819,
          "gsime;": 10894,
          "gsiml;": 10896,
          gt: 62,
          "gt;": 62,
          "gtcc;": 10919,
          "gtcir;": 10874,
          "gtdot;": 8919,
          "gtlPar;": 10645,
          "gtquest;": 10876,
          "gtrapprox;": 10886,
          "gtrarr;": 10616,
          "gtrdot;": 8919,
          "gtreqless;": 8923,
          "gtreqqless;": 10892,
          "gtrless;": 8823,
          "gtrsim;": 8819,
          "gvertneqq;": [8809, 65024],
          "gvnE;": [8809, 65024],
          "hArr;": 8660,
          "hairsp;": 8202,
          "half;": 189,
          "hamilt;": 8459,
          "hardcy;": 1098,
          "harr;": 8596,
          "harrcir;": 10568,
          "harrw;": 8621,
          "hbar;": 8463,
          "hcirc;": 293,
          "hearts;": 9829,
          "heartsuit;": 9829,
          "hellip;": 8230,
          "hercon;": 8889,
          "hfr;": [55349, 56613],
          "hksearow;": 10533,
          "hkswarow;": 10534,
          "hoarr;": 8703,
          "homtht;": 8763,
          "hookleftarrow;": 8617,
          "hookrightarrow;": 8618,
          "hopf;": [55349, 56665],
          "horbar;": 8213,
          "hscr;": [55349, 56509],
          "hslash;": 8463,
          "hstrok;": 295,
          "hybull;": 8259,
          "hyphen;": 8208,
          iacute: 237,
          "iacute;": 237,
          "ic;": 8291,
          icirc: 238,
          "icirc;": 238,
          "icy;": 1080,
          "iecy;": 1077,
          iexcl: 161,
          "iexcl;": 161,
          "iff;": 8660,
          "ifr;": [55349, 56614],
          igrave: 236,
          "igrave;": 236,
          "ii;": 8520,
          "iiiint;": 10764,
          "iiint;": 8749,
          "iinfin;": 10716,
          "iiota;": 8489,
          "ijlig;": 307,
          "imacr;": 299,
          "image;": 8465,
          "imagline;": 8464,
          "imagpart;": 8465,
          "imath;": 305,
          "imof;": 8887,
          "imped;": 437,
          "in;": 8712,
          "incare;": 8453,
          "infin;": 8734,
          "infintie;": 10717,
          "inodot;": 305,
          "int;": 8747,
          "intcal;": 8890,
          "integers;": 8484,
          "intercal;": 8890,
          "intlarhk;": 10775,
          "intprod;": 10812,
          "iocy;": 1105,
          "iogon;": 303,
          "iopf;": [55349, 56666],
          "iota;": 953,
          "iprod;": 10812,
          iquest: 191,
          "iquest;": 191,
          "iscr;": [55349, 56510],
          "isin;": 8712,
          "isinE;": 8953,
          "isindot;": 8949,
          "isins;": 8948,
          "isinsv;": 8947,
          "isinv;": 8712,
          "it;": 8290,
          "itilde;": 297,
          "iukcy;": 1110,
          iuml: 239,
          "iuml;": 239,
          "jcirc;": 309,
          "jcy;": 1081,
          "jfr;": [55349, 56615],
          "jmath;": 567,
          "jopf;": [55349, 56667],
          "jscr;": [55349, 56511],
          "jsercy;": 1112,
          "jukcy;": 1108,
          "kappa;": 954,
          "kappav;": 1008,
          "kcedil;": 311,
          "kcy;": 1082,
          "kfr;": [55349, 56616],
          "kgreen;": 312,
          "khcy;": 1093,
          "kjcy;": 1116,
          "kopf;": [55349, 56668],
          "kscr;": [55349, 56512],
          "lAarr;": 8666,
          "lArr;": 8656,
          "lAtail;": 10523,
          "lBarr;": 10510,
          "lE;": 8806,
          "lEg;": 10891,
          "lHar;": 10594,
          "lacute;": 314,
          "laemptyv;": 10676,
          "lagran;": 8466,
          "lambda;": 955,
          "lang;": 10216,
          "langd;": 10641,
          "langle;": 10216,
          "lap;": 10885,
          laquo: 171,
          "laquo;": 171,
          "larr;": 8592,
          "larrb;": 8676,
          "larrbfs;": 10527,
          "larrfs;": 10525,
          "larrhk;": 8617,
          "larrlp;": 8619,
          "larrpl;": 10553,
          "larrsim;": 10611,
          "larrtl;": 8610,
          "lat;": 10923,
          "latail;": 10521,
          "late;": 10925,
          "lates;": [10925, 65024],
          "lbarr;": 10508,
          "lbbrk;": 10098,
          "lbrace;": 123,
          "lbrack;": 91,
          "lbrke;": 10635,
          "lbrksld;": 10639,
          "lbrkslu;": 10637,
          "lcaron;": 318,
          "lcedil;": 316,
          "lceil;": 8968,
          "lcub;": 123,
          "lcy;": 1083,
          "ldca;": 10550,
          "ldquo;": 8220,
          "ldquor;": 8222,
          "ldrdhar;": 10599,
          "ldrushar;": 10571,
          "ldsh;": 8626,
          "le;": 8804,
          "leftarrow;": 8592,
          "leftarrowtail;": 8610,
          "leftharpoondown;": 8637,
          "leftharpoonup;": 8636,
          "leftleftarrows;": 8647,
          "leftrightarrow;": 8596,
          "leftrightarrows;": 8646,
          "leftrightharpoons;": 8651,
          "leftrightsquigarrow;": 8621,
          "leftthreetimes;": 8907,
          "leg;": 8922,
          "leq;": 8804,
          "leqq;": 8806,
          "leqslant;": 10877,
          "les;": 10877,
          "lescc;": 10920,
          "lesdot;": 10879,
          "lesdoto;": 10881,
          "lesdotor;": 10883,
          "lesg;": [8922, 65024],
          "lesges;": 10899,
          "lessapprox;": 10885,
          "lessdot;": 8918,
          "lesseqgtr;": 8922,
          "lesseqqgtr;": 10891,
          "lessgtr;": 8822,
          "lesssim;": 8818,
          "lfisht;": 10620,
          "lfloor;": 8970,
          "lfr;": [55349, 56617],
          "lg;": 8822,
          "lgE;": 10897,
          "lhard;": 8637,
          "lharu;": 8636,
          "lharul;": 10602,
          "lhblk;": 9604,
          "ljcy;": 1113,
          "ll;": 8810,
          "llarr;": 8647,
          "llcorner;": 8990,
          "llhard;": 10603,
          "lltri;": 9722,
          "lmidot;": 320,
          "lmoust;": 9136,
          "lmoustache;": 9136,
          "lnE;": 8808,
          "lnap;": 10889,
          "lnapprox;": 10889,
          "lne;": 10887,
          "lneq;": 10887,
          "lneqq;": 8808,
          "lnsim;": 8934,
          "loang;": 10220,
          "loarr;": 8701,
          "lobrk;": 10214,
          "longleftarrow;": 10229,
          "longleftrightarrow;": 10231,
          "longmapsto;": 10236,
          "longrightarrow;": 10230,
          "looparrowleft;": 8619,
          "looparrowright;": 8620,
          "lopar;": 10629,
          "lopf;": [55349, 56669],
          "loplus;": 10797,
          "lotimes;": 10804,
          "lowast;": 8727,
          "lowbar;": 95,
          "loz;": 9674,
          "lozenge;": 9674,
          "lozf;": 10731,
          "lpar;": 40,
          "lparlt;": 10643,
          "lrarr;": 8646,
          "lrcorner;": 8991,
          "lrhar;": 8651,
          "lrhard;": 10605,
          "lrm;": 8206,
          "lrtri;": 8895,
          "lsaquo;": 8249,
          "lscr;": [55349, 56513],
          "lsh;": 8624,
          "lsim;": 8818,
          "lsime;": 10893,
          "lsimg;": 10895,
          "lsqb;": 91,
          "lsquo;": 8216,
          "lsquor;": 8218,
          "lstrok;": 322,
          lt: 60,
          "lt;": 60,
          "ltcc;": 10918,
          "ltcir;": 10873,
          "ltdot;": 8918,
          "lthree;": 8907,
          "ltimes;": 8905,
          "ltlarr;": 10614,
          "ltquest;": 10875,
          "ltrPar;": 10646,
          "ltri;": 9667,
          "ltrie;": 8884,
          "ltrif;": 9666,
          "lurdshar;": 10570,
          "luruhar;": 10598,
          "lvertneqq;": [8808, 65024],
          "lvnE;": [8808, 65024],
          "mDDot;": 8762,
          macr: 175,
          "macr;": 175,
          "male;": 9794,
          "malt;": 10016,
          "maltese;": 10016,
          "map;": 8614,
          "mapsto;": 8614,
          "mapstodown;": 8615,
          "mapstoleft;": 8612,
          "mapstoup;": 8613,
          "marker;": 9646,
          "mcomma;": 10793,
          "mcy;": 1084,
          "mdash;": 8212,
          "measuredangle;": 8737,
          "mfr;": [55349, 56618],
          "mho;": 8487,
          micro: 181,
          "micro;": 181,
          "mid;": 8739,
          "midast;": 42,
          "midcir;": 10992,
          middot: 183,
          "middot;": 183,
          "minus;": 8722,
          "minusb;": 8863,
          "minusd;": 8760,
          "minusdu;": 10794,
          "mlcp;": 10971,
          "mldr;": 8230,
          "mnplus;": 8723,
          "models;": 8871,
          "mopf;": [55349, 56670],
          "mp;": 8723,
          "mscr;": [55349, 56514],
          "mstpos;": 8766,
          "mu;": 956,
          "multimap;": 8888,
          "mumap;": 8888,
          "nGg;": [8921, 824],
          "nGt;": [8811, 8402],
          "nGtv;": [8811, 824],
          "nLeftarrow;": 8653,
          "nLeftrightarrow;": 8654,
          "nLl;": [8920, 824],
          "nLt;": [8810, 8402],
          "nLtv;": [8810, 824],
          "nRightarrow;": 8655,
          "nVDash;": 8879,
          "nVdash;": 8878,
          "nabla;": 8711,
          "nacute;": 324,
          "nang;": [8736, 8402],
          "nap;": 8777,
          "napE;": [10864, 824],
          "napid;": [8779, 824],
          "napos;": 329,
          "napprox;": 8777,
          "natur;": 9838,
          "natural;": 9838,
          "naturals;": 8469,
          nbsp: 160,
          "nbsp;": 160,
          "nbump;": [8782, 824],
          "nbumpe;": [8783, 824],
          "ncap;": 10819,
          "ncaron;": 328,
          "ncedil;": 326,
          "ncong;": 8775,
          "ncongdot;": [10861, 824],
          "ncup;": 10818,
          "ncy;": 1085,
          "ndash;": 8211,
          "ne;": 8800,
          "neArr;": 8663,
          "nearhk;": 10532,
          "nearr;": 8599,
          "nearrow;": 8599,
          "nedot;": [8784, 824],
          "nequiv;": 8802,
          "nesear;": 10536,
          "nesim;": [8770, 824],
          "nexist;": 8708,
          "nexists;": 8708,
          "nfr;": [55349, 56619],
          "ngE;": [8807, 824],
          "nge;": 8817,
          "ngeq;": 8817,
          "ngeqq;": [8807, 824],
          "ngeqslant;": [10878, 824],
          "nges;": [10878, 824],
          "ngsim;": 8821,
          "ngt;": 8815,
          "ngtr;": 8815,
          "nhArr;": 8654,
          "nharr;": 8622,
          "nhpar;": 10994,
          "ni;": 8715,
          "nis;": 8956,
          "nisd;": 8954,
          "niv;": 8715,
          "njcy;": 1114,
          "nlArr;": 8653,
          "nlE;": [8806, 824],
          "nlarr;": 8602,
          "nldr;": 8229,
          "nle;": 8816,
          "nleftarrow;": 8602,
          "nleftrightarrow;": 8622,
          "nleq;": 8816,
          "nleqq;": [8806, 824],
          "nleqslant;": [10877, 824],
          "nles;": [10877, 824],
          "nless;": 8814,
          "nlsim;": 8820,
          "nlt;": 8814,
          "nltri;": 8938,
          "nltrie;": 8940,
          "nmid;": 8740,
          "nopf;": [55349, 56671],
          not: 172,
          "not;": 172,
          "notin;": 8713,
          "notinE;": [8953, 824],
          "notindot;": [8949, 824],
          "notinva;": 8713,
          "notinvb;": 8951,
          "notinvc;": 8950,
          "notni;": 8716,
          "notniva;": 8716,
          "notnivb;": 8958,
          "notnivc;": 8957,
          "npar;": 8742,
          "nparallel;": 8742,
          "nparsl;": [11005, 8421],
          "npart;": [8706, 824],
          "npolint;": 10772,
          "npr;": 8832,
          "nprcue;": 8928,
          "npre;": [10927, 824],
          "nprec;": 8832,
          "npreceq;": [10927, 824],
          "nrArr;": 8655,
          "nrarr;": 8603,
          "nrarrc;": [10547, 824],
          "nrarrw;": [8605, 824],
          "nrightarrow;": 8603,
          "nrtri;": 8939,
          "nrtrie;": 8941,
          "nsc;": 8833,
          "nsccue;": 8929,
          "nsce;": [10928, 824],
          "nscr;": [55349, 56515],
          "nshortmid;": 8740,
          "nshortparallel;": 8742,
          "nsim;": 8769,
          "nsime;": 8772,
          "nsimeq;": 8772,
          "nsmid;": 8740,
          "nspar;": 8742,
          "nsqsube;": 8930,
          "nsqsupe;": 8931,
          "nsub;": 8836,
          "nsubE;": [10949, 824],
          "nsube;": 8840,
          "nsubset;": [8834, 8402],
          "nsubseteq;": 8840,
          "nsubseteqq;": [10949, 824],
          "nsucc;": 8833,
          "nsucceq;": [10928, 824],
          "nsup;": 8837,
          "nsupE;": [10950, 824],
          "nsupe;": 8841,
          "nsupset;": [8835, 8402],
          "nsupseteq;": 8841,
          "nsupseteqq;": [10950, 824],
          "ntgl;": 8825,
          ntilde: 241,
          "ntilde;": 241,
          "ntlg;": 8824,
          "ntriangleleft;": 8938,
          "ntrianglelefteq;": 8940,
          "ntriangleright;": 8939,
          "ntrianglerighteq;": 8941,
          "nu;": 957,
          "num;": 35,
          "numero;": 8470,
          "numsp;": 8199,
          "nvDash;": 8877,
          "nvHarr;": 10500,
          "nvap;": [8781, 8402],
          "nvdash;": 8876,
          "nvge;": [8805, 8402],
          "nvgt;": [62, 8402],
          "nvinfin;": 10718,
          "nvlArr;": 10498,
          "nvle;": [8804, 8402],
          "nvlt;": [60, 8402],
          "nvltrie;": [8884, 8402],
          "nvrArr;": 10499,
          "nvrtrie;": [8885, 8402],
          "nvsim;": [8764, 8402],
          "nwArr;": 8662,
          "nwarhk;": 10531,
          "nwarr;": 8598,
          "nwarrow;": 8598,
          "nwnear;": 10535,
          "oS;": 9416,
          oacute: 243,
          "oacute;": 243,
          "oast;": 8859,
          "ocir;": 8858,
          ocirc: 244,
          "ocirc;": 244,
          "ocy;": 1086,
          "odash;": 8861,
          "odblac;": 337,
          "odiv;": 10808,
          "odot;": 8857,
          "odsold;": 10684,
          "oelig;": 339,
          "ofcir;": 10687,
          "ofr;": [55349, 56620],
          "ogon;": 731,
          ograve: 242,
          "ograve;": 242,
          "ogt;": 10689,
          "ohbar;": 10677,
          "ohm;": 937,
          "oint;": 8750,
          "olarr;": 8634,
          "olcir;": 10686,
          "olcross;": 10683,
          "oline;": 8254,
          "olt;": 10688,
          "omacr;": 333,
          "omega;": 969,
          "omicron;": 959,
          "omid;": 10678,
          "ominus;": 8854,
          "oopf;": [55349, 56672],
          "opar;": 10679,
          "operp;": 10681,
          "oplus;": 8853,
          "or;": 8744,
          "orarr;": 8635,
          "ord;": 10845,
          "order;": 8500,
          "orderof;": 8500,
          ordf: 170,
          "ordf;": 170,
          ordm: 186,
          "ordm;": 186,
          "origof;": 8886,
          "oror;": 10838,
          "orslope;": 10839,
          "orv;": 10843,
          "oscr;": 8500,
          oslash: 248,
          "oslash;": 248,
          "osol;": 8856,
          otilde: 245,
          "otilde;": 245,
          "otimes;": 8855,
          "otimesas;": 10806,
          ouml: 246,
          "ouml;": 246,
          "ovbar;": 9021,
          "par;": 8741,
          para: 182,
          "para;": 182,
          "parallel;": 8741,
          "parsim;": 10995,
          "parsl;": 11005,
          "part;": 8706,
          "pcy;": 1087,
          "percnt;": 37,
          "period;": 46,
          "permil;": 8240,
          "perp;": 8869,
          "pertenk;": 8241,
          "pfr;": [55349, 56621],
          "phi;": 966,
          "phiv;": 981,
          "phmmat;": 8499,
          "phone;": 9742,
          "pi;": 960,
          "pitchfork;": 8916,
          "piv;": 982,
          "planck;": 8463,
          "planckh;": 8462,
          "plankv;": 8463,
          "plus;": 43,
          "plusacir;": 10787,
          "plusb;": 8862,
          "pluscir;": 10786,
          "plusdo;": 8724,
          "plusdu;": 10789,
          "pluse;": 10866,
          plusmn: 177,
          "plusmn;": 177,
          "plussim;": 10790,
          "plustwo;": 10791,
          "pm;": 177,
          "pointint;": 10773,
          "popf;": [55349, 56673],
          pound: 163,
          "pound;": 163,
          "pr;": 8826,
          "prE;": 10931,
          "prap;": 10935,
          "prcue;": 8828,
          "pre;": 10927,
          "prec;": 8826,
          "precapprox;": 10935,
          "preccurlyeq;": 8828,
          "preceq;": 10927,
          "precnapprox;": 10937,
          "precneqq;": 10933,
          "precnsim;": 8936,
          "precsim;": 8830,
          "prime;": 8242,
          "primes;": 8473,
          "prnE;": 10933,
          "prnap;": 10937,
          "prnsim;": 8936,
          "prod;": 8719,
          "profalar;": 9006,
          "profline;": 8978,
          "profsurf;": 8979,
          "prop;": 8733,
          "propto;": 8733,
          "prsim;": 8830,
          "prurel;": 8880,
          "pscr;": [55349, 56517],
          "psi;": 968,
          "puncsp;": 8200,
          "qfr;": [55349, 56622],
          "qint;": 10764,
          "qopf;": [55349, 56674],
          "qprime;": 8279,
          "qscr;": [55349, 56518],
          "quaternions;": 8461,
          "quatint;": 10774,
          "quest;": 63,
          "questeq;": 8799,
          quot: 34,
          "quot;": 34,
          "rAarr;": 8667,
          "rArr;": 8658,
          "rAtail;": 10524,
          "rBarr;": 10511,
          "rHar;": 10596,
          "race;": [8765, 817],
          "racute;": 341,
          "radic;": 8730,
          "raemptyv;": 10675,
          "rang;": 10217,
          "rangd;": 10642,
          "range;": 10661,
          "rangle;": 10217,
          raquo: 187,
          "raquo;": 187,
          "rarr;": 8594,
          "rarrap;": 10613,
          "rarrb;": 8677,
          "rarrbfs;": 10528,
          "rarrc;": 10547,
          "rarrfs;": 10526,
          "rarrhk;": 8618,
          "rarrlp;": 8620,
          "rarrpl;": 10565,
          "rarrsim;": 10612,
          "rarrtl;": 8611,
          "rarrw;": 8605,
          "ratail;": 10522,
          "ratio;": 8758,
          "rationals;": 8474,
          "rbarr;": 10509,
          "rbbrk;": 10099,
          "rbrace;": 125,
          "rbrack;": 93,
          "rbrke;": 10636,
          "rbrksld;": 10638,
          "rbrkslu;": 10640,
          "rcaron;": 345,
          "rcedil;": 343,
          "rceil;": 8969,
          "rcub;": 125,
          "rcy;": 1088,
          "rdca;": 10551,
          "rdldhar;": 10601,
          "rdquo;": 8221,
          "rdquor;": 8221,
          "rdsh;": 8627,
          "real;": 8476,
          "realine;": 8475,
          "realpart;": 8476,
          "reals;": 8477,
          "rect;": 9645,
          reg: 174,
          "reg;": 174,
          "rfisht;": 10621,
          "rfloor;": 8971,
          "rfr;": [55349, 56623],
          "rhard;": 8641,
          "rharu;": 8640,
          "rharul;": 10604,
          "rho;": 961,
          "rhov;": 1009,
          "rightarrow;": 8594,
          "rightarrowtail;": 8611,
          "rightharpoondown;": 8641,
          "rightharpoonup;": 8640,
          "rightleftarrows;": 8644,
          "rightleftharpoons;": 8652,
          "rightrightarrows;": 8649,
          "rightsquigarrow;": 8605,
          "rightthreetimes;": 8908,
          "ring;": 730,
          "risingdotseq;": 8787,
          "rlarr;": 8644,
          "rlhar;": 8652,
          "rlm;": 8207,
          "rmoust;": 9137,
          "rmoustache;": 9137,
          "rnmid;": 10990,
          "roang;": 10221,
          "roarr;": 8702,
          "robrk;": 10215,
          "ropar;": 10630,
          "ropf;": [55349, 56675],
          "roplus;": 10798,
          "rotimes;": 10805,
          "rpar;": 41,
          "rpargt;": 10644,
          "rppolint;": 10770,
          "rrarr;": 8649,
          "rsaquo;": 8250,
          "rscr;": [55349, 56519],
          "rsh;": 8625,
          "rsqb;": 93,
          "rsquo;": 8217,
          "rsquor;": 8217,
          "rthree;": 8908,
          "rtimes;": 8906,
          "rtri;": 9657,
          "rtrie;": 8885,
          "rtrif;": 9656,
          "rtriltri;": 10702,
          "ruluhar;": 10600,
          "rx;": 8478,
          "sacute;": 347,
          "sbquo;": 8218,
          "sc;": 8827,
          "scE;": 10932,
          "scap;": 10936,
          "scaron;": 353,
          "sccue;": 8829,
          "sce;": 10928,
          "scedil;": 351,
          "scirc;": 349,
          "scnE;": 10934,
          "scnap;": 10938,
          "scnsim;": 8937,
          "scpolint;": 10771,
          "scsim;": 8831,
          "scy;": 1089,
          "sdot;": 8901,
          "sdotb;": 8865,
          "sdote;": 10854,
          "seArr;": 8664,
          "searhk;": 10533,
          "searr;": 8600,
          "searrow;": 8600,
          sect: 167,
          "sect;": 167,
          "semi;": 59,
          "seswar;": 10537,
          "setminus;": 8726,
          "setmn;": 8726,
          "sext;": 10038,
          "sfr;": [55349, 56624],
          "sfrown;": 8994,
          "sharp;": 9839,
          "shchcy;": 1097,
          "shcy;": 1096,
          "shortmid;": 8739,
          "shortparallel;": 8741,
          shy: 173,
          "shy;": 173,
          "sigma;": 963,
          "sigmaf;": 962,
          "sigmav;": 962,
          "sim;": 8764,
          "simdot;": 10858,
          "sime;": 8771,
          "simeq;": 8771,
          "simg;": 10910,
          "simgE;": 10912,
          "siml;": 10909,
          "simlE;": 10911,
          "simne;": 8774,
          "simplus;": 10788,
          "simrarr;": 10610,
          "slarr;": 8592,
          "smallsetminus;": 8726,
          "smashp;": 10803,
          "smeparsl;": 10724,
          "smid;": 8739,
          "smile;": 8995,
          "smt;": 10922,
          "smte;": 10924,
          "smtes;": [10924, 65024],
          "softcy;": 1100,
          "sol;": 47,
          "solb;": 10692,
          "solbar;": 9023,
          "sopf;": [55349, 56676],
          "spades;": 9824,
          "spadesuit;": 9824,
          "spar;": 8741,
          "sqcap;": 8851,
          "sqcaps;": [8851, 65024],
          "sqcup;": 8852,
          "sqcups;": [8852, 65024],
          "sqsub;": 8847,
          "sqsube;": 8849,
          "sqsubset;": 8847,
          "sqsubseteq;": 8849,
          "sqsup;": 8848,
          "sqsupe;": 8850,
          "sqsupset;": 8848,
          "sqsupseteq;": 8850,
          "squ;": 9633,
          "square;": 9633,
          "squarf;": 9642,
          "squf;": 9642,
          "srarr;": 8594,
          "sscr;": [55349, 56520],
          "ssetmn;": 8726,
          "ssmile;": 8995,
          "sstarf;": 8902,
          "star;": 9734,
          "starf;": 9733,
          "straightepsilon;": 1013,
          "straightphi;": 981,
          "strns;": 175,
          "sub;": 8834,
          "subE;": 10949,
          "subdot;": 10941,
          "sube;": 8838,
          "subedot;": 10947,
          "submult;": 10945,
          "subnE;": 10955,
          "subne;": 8842,
          "subplus;": 10943,
          "subrarr;": 10617,
          "subset;": 8834,
          "subseteq;": 8838,
          "subseteqq;": 10949,
          "subsetneq;": 8842,
          "subsetneqq;": 10955,
          "subsim;": 10951,
          "subsub;": 10965,
          "subsup;": 10963,
          "succ;": 8827,
          "succapprox;": 10936,
          "succcurlyeq;": 8829,
          "succeq;": 10928,
          "succnapprox;": 10938,
          "succneqq;": 10934,
          "succnsim;": 8937,
          "succsim;": 8831,
          "sum;": 8721,
          "sung;": 9834,
          sup1: 185,
          "sup1;": 185,
          sup2: 178,
          "sup2;": 178,
          sup3: 179,
          "sup3;": 179,
          "sup;": 8835,
          "supE;": 10950,
          "supdot;": 10942,
          "supdsub;": 10968,
          "supe;": 8839,
          "supedot;": 10948,
          "suphsol;": 10185,
          "suphsub;": 10967,
          "suplarr;": 10619,
          "supmult;": 10946,
          "supnE;": 10956,
          "supne;": 8843,
          "supplus;": 10944,
          "supset;": 8835,
          "supseteq;": 8839,
          "supseteqq;": 10950,
          "supsetneq;": 8843,
          "supsetneqq;": 10956,
          "supsim;": 10952,
          "supsub;": 10964,
          "supsup;": 10966,
          "swArr;": 8665,
          "swarhk;": 10534,
          "swarr;": 8601,
          "swarrow;": 8601,
          "swnwar;": 10538,
          szlig: 223,
          "szlig;": 223,
          "target;": 8982,
          "tau;": 964,
          "tbrk;": 9140,
          "tcaron;": 357,
          "tcedil;": 355,
          "tcy;": 1090,
          "tdot;": 8411,
          "telrec;": 8981,
          "tfr;": [55349, 56625],
          "there4;": 8756,
          "therefore;": 8756,
          "theta;": 952,
          "thetasym;": 977,
          "thetav;": 977,
          "thickapprox;": 8776,
          "thicksim;": 8764,
          "thinsp;": 8201,
          "thkap;": 8776,
          "thksim;": 8764,
          thorn: 254,
          "thorn;": 254,
          "tilde;": 732,
          times: 215,
          "times;": 215,
          "timesb;": 8864,
          "timesbar;": 10801,
          "timesd;": 10800,
          "tint;": 8749,
          "toea;": 10536,
          "top;": 8868,
          "topbot;": 9014,
          "topcir;": 10993,
          "topf;": [55349, 56677],
          "topfork;": 10970,
          "tosa;": 10537,
          "tprime;": 8244,
          "trade;": 8482,
          "triangle;": 9653,
          "triangledown;": 9663,
          "triangleleft;": 9667,
          "trianglelefteq;": 8884,
          "triangleq;": 8796,
          "triangleright;": 9657,
          "trianglerighteq;": 8885,
          "tridot;": 9708,
          "trie;": 8796,
          "triminus;": 10810,
          "triplus;": 10809,
          "trisb;": 10701,
          "tritime;": 10811,
          "trpezium;": 9186,
          "tscr;": [55349, 56521],
          "tscy;": 1094,
          "tshcy;": 1115,
          "tstrok;": 359,
          "twixt;": 8812,
          "twoheadleftarrow;": 8606,
          "twoheadrightarrow;": 8608,
          "uArr;": 8657,
          "uHar;": 10595,
          uacute: 250,
          "uacute;": 250,
          "uarr;": 8593,
          "ubrcy;": 1118,
          "ubreve;": 365,
          ucirc: 251,
          "ucirc;": 251,
          "ucy;": 1091,
          "udarr;": 8645,
          "udblac;": 369,
          "udhar;": 10606,
          "ufisht;": 10622,
          "ufr;": [55349, 56626],
          ugrave: 249,
          "ugrave;": 249,
          "uharl;": 8639,
          "uharr;": 8638,
          "uhblk;": 9600,
          "ulcorn;": 8988,
          "ulcorner;": 8988,
          "ulcrop;": 8975,
          "ultri;": 9720,
          "umacr;": 363,
          uml: 168,
          "uml;": 168,
          "uogon;": 371,
          "uopf;": [55349, 56678],
          "uparrow;": 8593,
          "updownarrow;": 8597,
          "upharpoonleft;": 8639,
          "upharpoonright;": 8638,
          "uplus;": 8846,
          "upsi;": 965,
          "upsih;": 978,
          "upsilon;": 965,
          "upuparrows;": 8648,
          "urcorn;": 8989,
          "urcorner;": 8989,
          "urcrop;": 8974,
          "uring;": 367,
          "urtri;": 9721,
          "uscr;": [55349, 56522],
          "utdot;": 8944,
          "utilde;": 361,
          "utri;": 9653,
          "utrif;": 9652,
          "uuarr;": 8648,
          uuml: 252,
          "uuml;": 252,
          "uwangle;": 10663,
          "vArr;": 8661,
          "vBar;": 10984,
          "vBarv;": 10985,
          "vDash;": 8872,
          "vangrt;": 10652,
          "varepsilon;": 1013,
          "varkappa;": 1008,
          "varnothing;": 8709,
          "varphi;": 981,
          "varpi;": 982,
          "varpropto;": 8733,
          "varr;": 8597,
          "varrho;": 1009,
          "varsigma;": 962,
          "varsubsetneq;": [8842, 65024],
          "varsubsetneqq;": [10955, 65024],
          "varsupsetneq;": [8843, 65024],
          "varsupsetneqq;": [10956, 65024],
          "vartheta;": 977,
          "vartriangleleft;": 8882,
          "vartriangleright;": 8883,
          "vcy;": 1074,
          "vdash;": 8866,
          "vee;": 8744,
          "veebar;": 8891,
          "veeeq;": 8794,
          "vellip;": 8942,
          "verbar;": 124,
          "vert;": 124,
          "vfr;": [55349, 56627],
          "vltri;": 8882,
          "vnsub;": [8834, 8402],
          "vnsup;": [8835, 8402],
          "vopf;": [55349, 56679],
          "vprop;": 8733,
          "vrtri;": 8883,
          "vscr;": [55349, 56523],
          "vsubnE;": [10955, 65024],
          "vsubne;": [8842, 65024],
          "vsupnE;": [10956, 65024],
          "vsupne;": [8843, 65024],
          "vzigzag;": 10650,
          "wcirc;": 373,
          "wedbar;": 10847,
          "wedge;": 8743,
          "wedgeq;": 8793,
          "weierp;": 8472,
          "wfr;": [55349, 56628],
          "wopf;": [55349, 56680],
          "wp;": 8472,
          "wr;": 8768,
          "wreath;": 8768,
          "wscr;": [55349, 56524],
          "xcap;": 8898,
          "xcirc;": 9711,
          "xcup;": 8899,
          "xdtri;": 9661,
          "xfr;": [55349, 56629],
          "xhArr;": 10234,
          "xharr;": 10231,
          "xi;": 958,
          "xlArr;": 10232,
          "xlarr;": 10229,
          "xmap;": 10236,
          "xnis;": 8955,
          "xodot;": 10752,
          "xopf;": [55349, 56681],
          "xoplus;": 10753,
          "xotime;": 10754,
          "xrArr;": 10233,
          "xrarr;": 10230,
          "xscr;": [55349, 56525],
          "xsqcup;": 10758,
          "xuplus;": 10756,
          "xutri;": 9651,
          "xvee;": 8897,
          "xwedge;": 8896,
          yacute: 253,
          "yacute;": 253,
          "yacy;": 1103,
          "ycirc;": 375,
          "ycy;": 1099,
          yen: 165,
          "yen;": 165,
          "yfr;": [55349, 56630],
          "yicy;": 1111,
          "yopf;": [55349, 56682],
          "yscr;": [55349, 56526],
          "yucy;": 1102,
          yuml: 255,
          "yuml;": 255,
          "zacute;": 378,
          "zcaron;": 382,
          "zcy;": 1079,
          "zdot;": 380,
          "zeetrf;": 8488,
          "zeta;": 950,
          "zfr;": [55349, 56631],
          "zhcy;": 1078,
          "zigrarr;": 8669,
          "zopf;": [55349, 56683],
          "zscr;": [55349, 56527],
          "zwj;": 8205,
          "zwnj;": 8204,
        },
        Ie =
          /(A(?:Elig;?|MP;?|acute;?|breve;|c(?:irc;?|y;)|fr;|grave;?|lpha;|macr;|nd;|o(?:gon;|pf;)|pplyFunction;|ring;?|s(?:cr;|sign;)|tilde;?|uml;?)|B(?:a(?:ckslash;|r(?:v;|wed;))|cy;|e(?:cause;|rnoullis;|ta;)|fr;|opf;|reve;|scr;|umpeq;)|C(?:Hcy;|OPY;?|a(?:cute;|p(?:;|italDifferentialD;)|yleys;)|c(?:aron;|edil;?|irc;|onint;)|dot;|e(?:dilla;|nterDot;)|fr;|hi;|ircle(?:Dot;|Minus;|Plus;|Times;)|lo(?:ckwiseContourIntegral;|seCurly(?:DoubleQuote;|Quote;))|o(?:lon(?:;|e;)|n(?:gruent;|int;|tourIntegral;)|p(?:f;|roduct;)|unterClockwiseContourIntegral;)|ross;|scr;|up(?:;|Cap;))|D(?:D(?:;|otrahd;)|Jcy;|Scy;|Zcy;|a(?:gger;|rr;|shv;)|c(?:aron;|y;)|el(?:;|ta;)|fr;|i(?:a(?:critical(?:Acute;|Do(?:t;|ubleAcute;)|Grave;|Tilde;)|mond;)|fferentialD;)|o(?:pf;|t(?:;|Dot;|Equal;)|uble(?:ContourIntegral;|Do(?:t;|wnArrow;)|L(?:eft(?:Arrow;|RightArrow;|Tee;)|ong(?:Left(?:Arrow;|RightArrow;)|RightArrow;))|Right(?:Arrow;|Tee;)|Up(?:Arrow;|DownArrow;)|VerticalBar;)|wn(?:Arrow(?:;|Bar;|UpArrow;)|Breve;|Left(?:RightVector;|TeeVector;|Vector(?:;|Bar;))|Right(?:TeeVector;|Vector(?:;|Bar;))|Tee(?:;|Arrow;)|arrow;))|s(?:cr;|trok;))|E(?:NG;|TH;?|acute;?|c(?:aron;|irc;?|y;)|dot;|fr;|grave;?|lement;|m(?:acr;|pty(?:SmallSquare;|VerySmallSquare;))|o(?:gon;|pf;)|psilon;|qu(?:al(?:;|Tilde;)|ilibrium;)|s(?:cr;|im;)|ta;|uml;?|x(?:ists;|ponentialE;))|F(?:cy;|fr;|illed(?:SmallSquare;|VerySmallSquare;)|o(?:pf;|rAll;|uriertrf;)|scr;)|G(?:Jcy;|T;?|amma(?:;|d;)|breve;|c(?:edil;|irc;|y;)|dot;|fr;|g;|opf;|reater(?:Equal(?:;|Less;)|FullEqual;|Greater;|Less;|SlantEqual;|Tilde;)|scr;|t;)|H(?:ARDcy;|a(?:cek;|t;)|circ;|fr;|ilbertSpace;|o(?:pf;|rizontalLine;)|s(?:cr;|trok;)|ump(?:DownHump;|Equal;))|I(?:Ecy;|Jlig;|Ocy;|acute;?|c(?:irc;?|y;)|dot;|fr;|grave;?|m(?:;|a(?:cr;|ginaryI;)|plies;)|n(?:t(?:;|e(?:gral;|rsection;))|visible(?:Comma;|Times;))|o(?:gon;|pf;|ta;)|scr;|tilde;|u(?:kcy;|ml;?))|J(?:c(?:irc;|y;)|fr;|opf;|s(?:cr;|ercy;)|ukcy;)|K(?:Hcy;|Jcy;|appa;|c(?:edil;|y;)|fr;|opf;|scr;)|L(?:Jcy;|T;?|a(?:cute;|mbda;|ng;|placetrf;|rr;)|c(?:aron;|edil;|y;)|e(?:ft(?:A(?:ngleBracket;|rrow(?:;|Bar;|RightArrow;))|Ceiling;|Do(?:ubleBracket;|wn(?:TeeVector;|Vector(?:;|Bar;)))|Floor;|Right(?:Arrow;|Vector;)|T(?:ee(?:;|Arrow;|Vector;)|riangle(?:;|Bar;|Equal;))|Up(?:DownVector;|TeeVector;|Vector(?:;|Bar;))|Vector(?:;|Bar;)|arrow;|rightarrow;)|ss(?:EqualGreater;|FullEqual;|Greater;|Less;|SlantEqual;|Tilde;))|fr;|l(?:;|eftarrow;)|midot;|o(?:ng(?:Left(?:Arrow;|RightArrow;)|RightArrow;|left(?:arrow;|rightarrow;)|rightarrow;)|pf;|wer(?:LeftArrow;|RightArrow;))|s(?:cr;|h;|trok;)|t;)|M(?:ap;|cy;|e(?:diumSpace;|llintrf;)|fr;|inusPlus;|opf;|scr;|u;)|N(?:Jcy;|acute;|c(?:aron;|edil;|y;)|e(?:gative(?:MediumSpace;|Thi(?:ckSpace;|nSpace;)|VeryThinSpace;)|sted(?:GreaterGreater;|LessLess;)|wLine;)|fr;|o(?:Break;|nBreakingSpace;|pf;|t(?:;|C(?:ongruent;|upCap;)|DoubleVerticalBar;|E(?:lement;|qual(?:;|Tilde;)|xists;)|Greater(?:;|Equal;|FullEqual;|Greater;|Less;|SlantEqual;|Tilde;)|Hump(?:DownHump;|Equal;)|Le(?:ftTriangle(?:;|Bar;|Equal;)|ss(?:;|Equal;|Greater;|Less;|SlantEqual;|Tilde;))|Nested(?:GreaterGreater;|LessLess;)|Precedes(?:;|Equal;|SlantEqual;)|R(?:everseElement;|ightTriangle(?:;|Bar;|Equal;))|S(?:quareSu(?:bset(?:;|Equal;)|perset(?:;|Equal;))|u(?:bset(?:;|Equal;)|cceeds(?:;|Equal;|SlantEqual;|Tilde;)|perset(?:;|Equal;)))|Tilde(?:;|Equal;|FullEqual;|Tilde;)|VerticalBar;))|scr;|tilde;?|u;)|O(?:Elig;|acute;?|c(?:irc;?|y;)|dblac;|fr;|grave;?|m(?:acr;|ega;|icron;)|opf;|penCurly(?:DoubleQuote;|Quote;)|r;|s(?:cr;|lash;?)|ti(?:lde;?|mes;)|uml;?|ver(?:B(?:ar;|rac(?:e;|ket;))|Parenthesis;))|P(?:artialD;|cy;|fr;|hi;|i;|lusMinus;|o(?:incareplane;|pf;)|r(?:;|ecedes(?:;|Equal;|SlantEqual;|Tilde;)|ime;|o(?:duct;|portion(?:;|al;)))|s(?:cr;|i;))|Q(?:UOT;?|fr;|opf;|scr;)|R(?:Barr;|EG;?|a(?:cute;|ng;|rr(?:;|tl;))|c(?:aron;|edil;|y;)|e(?:;|verse(?:E(?:lement;|quilibrium;)|UpEquilibrium;))|fr;|ho;|ight(?:A(?:ngleBracket;|rrow(?:;|Bar;|LeftArrow;))|Ceiling;|Do(?:ubleBracket;|wn(?:TeeVector;|Vector(?:;|Bar;)))|Floor;|T(?:ee(?:;|Arrow;|Vector;)|riangle(?:;|Bar;|Equal;))|Up(?:DownVector;|TeeVector;|Vector(?:;|Bar;))|Vector(?:;|Bar;)|arrow;)|o(?:pf;|undImplies;)|rightarrow;|s(?:cr;|h;)|uleDelayed;)|S(?:H(?:CHcy;|cy;)|OFTcy;|acute;|c(?:;|aron;|edil;|irc;|y;)|fr;|hort(?:DownArrow;|LeftArrow;|RightArrow;|UpArrow;)|igma;|mallCircle;|opf;|q(?:rt;|uare(?:;|Intersection;|Su(?:bset(?:;|Equal;)|perset(?:;|Equal;))|Union;))|scr;|tar;|u(?:b(?:;|set(?:;|Equal;))|c(?:ceeds(?:;|Equal;|SlantEqual;|Tilde;)|hThat;)|m;|p(?:;|erset(?:;|Equal;)|set;)))|T(?:HORN;?|RADE;|S(?:Hcy;|cy;)|a(?:b;|u;)|c(?:aron;|edil;|y;)|fr;|h(?:e(?:refore;|ta;)|i(?:ckSpace;|nSpace;))|ilde(?:;|Equal;|FullEqual;|Tilde;)|opf;|ripleDot;|s(?:cr;|trok;))|U(?:a(?:cute;?|rr(?:;|ocir;))|br(?:cy;|eve;)|c(?:irc;?|y;)|dblac;|fr;|grave;?|macr;|n(?:der(?:B(?:ar;|rac(?:e;|ket;))|Parenthesis;)|ion(?:;|Plus;))|o(?:gon;|pf;)|p(?:Arrow(?:;|Bar;|DownArrow;)|DownArrow;|Equilibrium;|Tee(?:;|Arrow;)|arrow;|downarrow;|per(?:LeftArrow;|RightArrow;)|si(?:;|lon;))|ring;|scr;|tilde;|uml;?)|V(?:Dash;|bar;|cy;|dash(?:;|l;)|e(?:e;|r(?:bar;|t(?:;|ical(?:Bar;|Line;|Separator;|Tilde;))|yThinSpace;))|fr;|opf;|scr;|vdash;)|W(?:circ;|edge;|fr;|opf;|scr;)|X(?:fr;|i;|opf;|scr;)|Y(?:Acy;|Icy;|Ucy;|acute;?|c(?:irc;|y;)|fr;|opf;|scr;|uml;)|Z(?:Hcy;|acute;|c(?:aron;|y;)|dot;|e(?:roWidthSpace;|ta;)|fr;|opf;|scr;)|a(?:acute;?|breve;|c(?:;|E;|d;|irc;?|ute;?|y;)|elig;?|f(?:;|r;)|grave;?|l(?:e(?:fsym;|ph;)|pha;)|m(?:a(?:cr;|lg;)|p;?)|n(?:d(?:;|and;|d;|slope;|v;)|g(?:;|e;|le;|msd(?:;|a(?:a;|b;|c;|d;|e;|f;|g;|h;))|rt(?:;|vb(?:;|d;))|s(?:ph;|t;)|zarr;))|o(?:gon;|pf;)|p(?:;|E;|acir;|e;|id;|os;|prox(?:;|eq;))|ring;?|s(?:cr;|t;|ymp(?:;|eq;))|tilde;?|uml;?|w(?:conint;|int;))|b(?:Not;|a(?:ck(?:cong;|epsilon;|prime;|sim(?:;|eq;))|r(?:vee;|wed(?:;|ge;)))|brk(?:;|tbrk;)|c(?:ong;|y;)|dquo;|e(?:caus(?:;|e;)|mptyv;|psi;|rnou;|t(?:a;|h;|ween;))|fr;|ig(?:c(?:ap;|irc;|up;)|o(?:dot;|plus;|times;)|s(?:qcup;|tar;)|triangle(?:down;|up;)|uplus;|vee;|wedge;)|karow;|l(?:a(?:ck(?:lozenge;|square;|triangle(?:;|down;|left;|right;))|nk;)|k(?:1(?:2;|4;)|34;)|ock;)|n(?:e(?:;|quiv;)|ot;)|o(?:pf;|t(?:;|tom;)|wtie;|x(?:D(?:L;|R;|l;|r;)|H(?:;|D;|U;|d;|u;)|U(?:L;|R;|l;|r;)|V(?:;|H;|L;|R;|h;|l;|r;)|box;|d(?:L;|R;|l;|r;)|h(?:;|D;|U;|d;|u;)|minus;|plus;|times;|u(?:L;|R;|l;|r;)|v(?:;|H;|L;|R;|h;|l;|r;)))|prime;|r(?:eve;|vbar;?)|s(?:cr;|emi;|im(?:;|e;)|ol(?:;|b;|hsub;))|u(?:ll(?:;|et;)|mp(?:;|E;|e(?:;|q;))))|c(?:a(?:cute;|p(?:;|and;|brcup;|c(?:ap;|up;)|dot;|s;)|r(?:et;|on;))|c(?:a(?:ps;|ron;)|edil;?|irc;|ups(?:;|sm;))|dot;|e(?:dil;?|mptyv;|nt(?:;|erdot;|))|fr;|h(?:cy;|eck(?:;|mark;)|i;)|ir(?:;|E;|c(?:;|eq;|le(?:arrow(?:left;|right;)|d(?:R;|S;|ast;|circ;|dash;)))|e;|fnint;|mid;|scir;)|lubs(?:;|uit;)|o(?:lon(?:;|e(?:;|q;))|m(?:ma(?:;|t;)|p(?:;|fn;|le(?:ment;|xes;)))|n(?:g(?:;|dot;)|int;)|p(?:f;|rod;|y(?:;|sr;|)))|r(?:arr;|oss;)|s(?:cr;|u(?:b(?:;|e;)|p(?:;|e;)))|tdot;|u(?:darr(?:l;|r;)|e(?:pr;|sc;)|larr(?:;|p;)|p(?:;|brcap;|c(?:ap;|up;)|dot;|or;|s;)|r(?:arr(?:;|m;)|ly(?:eq(?:prec;|succ;)|vee;|wedge;)|ren;?|vearrow(?:left;|right;))|vee;|wed;)|w(?:conint;|int;)|ylcty;)|d(?:Arr;|Har;|a(?:gger;|leth;|rr;|sh(?:;|v;))|b(?:karow;|lac;)|c(?:aron;|y;)|d(?:;|a(?:gger;|rr;)|otseq;)|e(?:g;?|lta;|mptyv;)|f(?:isht;|r;)|har(?:l;|r;)|i(?:am(?:;|ond(?:;|suit;)|s;)|e;|gamma;|sin;|v(?:;|ide(?:;|ontimes;|)|onx;))|jcy;|lc(?:orn;|rop;)|o(?:llar;|pf;|t(?:;|eq(?:;|dot;)|minus;|plus;|square;)|ublebarwedge;|wn(?:arrow;|downarrows;|harpoon(?:left;|right;)))|r(?:bkarow;|c(?:orn;|rop;))|s(?:c(?:r;|y;)|ol;|trok;)|t(?:dot;|ri(?:;|f;))|u(?:arr;|har;)|wangle;|z(?:cy;|igrarr;))|e(?:D(?:Dot;|ot;)|a(?:cute;?|ster;)|c(?:aron;|ir(?:;|c;?)|olon;|y;)|dot;|e;|f(?:Dot;|r;)|g(?:;|rave;?|s(?:;|dot;))|l(?:;|inters;|l;|s(?:;|dot;))|m(?:acr;|pty(?:;|set;|v;)|sp(?:1(?:3;|4;)|;))|n(?:g;|sp;)|o(?:gon;|pf;)|p(?:ar(?:;|sl;)|lus;|si(?:;|lon;|v;))|q(?:c(?:irc;|olon;)|s(?:im;|lant(?:gtr;|less;))|u(?:als;|est;|iv(?:;|DD;))|vparsl;)|r(?:Dot;|arr;)|s(?:cr;|dot;|im;)|t(?:a;|h;?)|u(?:ml;?|ro;)|x(?:cl;|ist;|p(?:ectation;|onentiale;)))|f(?:allingdotseq;|cy;|emale;|f(?:ilig;|l(?:ig;|lig;)|r;)|ilig;|jlig;|l(?:at;|lig;|tns;)|nof;|o(?:pf;|r(?:all;|k(?:;|v;)))|partint;|r(?:a(?:c(?:1(?:2;?|3;|4;?|5;|6;|8;)|2(?:3;|5;)|3(?:4;?|5;|8;)|45;|5(?:6;|8;)|78;)|sl;)|own;)|scr;)|g(?:E(?:;|l;)|a(?:cute;|mma(?:;|d;)|p;)|breve;|c(?:irc;|y;)|dot;|e(?:;|l;|q(?:;|q;|slant;)|s(?:;|cc;|dot(?:;|o(?:;|l;))|l(?:;|es;)))|fr;|g(?:;|g;)|imel;|jcy;|l(?:;|E;|a;|j;)|n(?:E;|ap(?:;|prox;)|e(?:;|q(?:;|q;))|sim;)|opf;|rave;|s(?:cr;|im(?:;|e;|l;))|t(?:;|c(?:c;|ir;)|dot;|lPar;|quest;|r(?:a(?:pprox;|rr;)|dot;|eq(?:less;|qless;)|less;|sim;)|)|v(?:ertneqq;|nE;))|h(?:Arr;|a(?:irsp;|lf;|milt;|r(?:dcy;|r(?:;|cir;|w;)))|bar;|circ;|e(?:arts(?:;|uit;)|llip;|rcon;)|fr;|ks(?:earow;|warow;)|o(?:arr;|mtht;|ok(?:leftarrow;|rightarrow;)|pf;|rbar;)|s(?:cr;|lash;|trok;)|y(?:bull;|phen;))|i(?:acute;?|c(?:;|irc;?|y;)|e(?:cy;|xcl;?)|f(?:f;|r;)|grave;?|i(?:;|i(?:int;|nt;)|nfin;|ota;)|jlig;|m(?:a(?:cr;|g(?:e;|line;|part;)|th;)|of;|ped;)|n(?:;|care;|fin(?:;|tie;)|odot;|t(?:;|cal;|e(?:gers;|rcal;)|larhk;|prod;))|o(?:cy;|gon;|pf;|ta;)|prod;|quest;?|s(?:cr;|in(?:;|E;|dot;|s(?:;|v;)|v;))|t(?:;|ilde;)|u(?:kcy;|ml;?))|j(?:c(?:irc;|y;)|fr;|math;|opf;|s(?:cr;|ercy;)|ukcy;)|k(?:appa(?:;|v;)|c(?:edil;|y;)|fr;|green;|hcy;|jcy;|opf;|scr;)|l(?:A(?:arr;|rr;|tail;)|Barr;|E(?:;|g;)|Har;|a(?:cute;|emptyv;|gran;|mbda;|ng(?:;|d;|le;)|p;|quo;?|rr(?:;|b(?:;|fs;)|fs;|hk;|lp;|pl;|sim;|tl;)|t(?:;|ail;|e(?:;|s;)))|b(?:arr;|brk;|r(?:ac(?:e;|k;)|k(?:e;|sl(?:d;|u;))))|c(?:aron;|e(?:dil;|il;)|ub;|y;)|d(?:ca;|quo(?:;|r;)|r(?:dhar;|ushar;)|sh;)|e(?:;|ft(?:arrow(?:;|tail;)|harpoon(?:down;|up;)|leftarrows;|right(?:arrow(?:;|s;)|harpoons;|squigarrow;)|threetimes;)|g;|q(?:;|q;|slant;)|s(?:;|cc;|dot(?:;|o(?:;|r;))|g(?:;|es;)|s(?:approx;|dot;|eq(?:gtr;|qgtr;)|gtr;|sim;)))|f(?:isht;|loor;|r;)|g(?:;|E;)|h(?:ar(?:d;|u(?:;|l;))|blk;)|jcy;|l(?:;|arr;|corner;|hard;|tri;)|m(?:idot;|oust(?:;|ache;))|n(?:E;|ap(?:;|prox;)|e(?:;|q(?:;|q;))|sim;)|o(?:a(?:ng;|rr;)|brk;|ng(?:left(?:arrow;|rightarrow;)|mapsto;|rightarrow;)|oparrow(?:left;|right;)|p(?:ar;|f;|lus;)|times;|w(?:ast;|bar;)|z(?:;|enge;|f;))|par(?:;|lt;)|r(?:arr;|corner;|har(?:;|d;)|m;|tri;)|s(?:aquo;|cr;|h;|im(?:;|e;|g;)|q(?:b;|uo(?:;|r;))|trok;)|t(?:;|c(?:c;|ir;)|dot;|hree;|imes;|larr;|quest;|r(?:Par;|i(?:;|e;|f;))|)|ur(?:dshar;|uhar;)|v(?:ertneqq;|nE;))|m(?:DDot;|a(?:cr;?|l(?:e;|t(?:;|ese;))|p(?:;|sto(?:;|down;|left;|up;))|rker;)|c(?:omma;|y;)|dash;|easuredangle;|fr;|ho;|i(?:cro;?|d(?:;|ast;|cir;|dot;?)|nus(?:;|b;|d(?:;|u;)))|l(?:cp;|dr;)|nplus;|o(?:dels;|pf;)|p;|s(?:cr;|tpos;)|u(?:;|ltimap;|map;))|n(?:G(?:g;|t(?:;|v;))|L(?:eft(?:arrow;|rightarrow;)|l;|t(?:;|v;))|Rightarrow;|V(?:Dash;|dash;)|a(?:bla;|cute;|ng;|p(?:;|E;|id;|os;|prox;)|tur(?:;|al(?:;|s;)))|b(?:sp;?|ump(?:;|e;))|c(?:a(?:p;|ron;)|edil;|ong(?:;|dot;)|up;|y;)|dash;|e(?:;|Arr;|ar(?:hk;|r(?:;|ow;))|dot;|quiv;|s(?:ear;|im;)|xist(?:;|s;))|fr;|g(?:E;|e(?:;|q(?:;|q;|slant;)|s;)|sim;|t(?:;|r;))|h(?:Arr;|arr;|par;)|i(?:;|s(?:;|d;)|v;)|jcy;|l(?:Arr;|E;|arr;|dr;|e(?:;|ft(?:arrow;|rightarrow;)|q(?:;|q;|slant;)|s(?:;|s;))|sim;|t(?:;|ri(?:;|e;)))|mid;|o(?:pf;|t(?:;|in(?:;|E;|dot;|v(?:a;|b;|c;))|ni(?:;|v(?:a;|b;|c;))|))|p(?:ar(?:;|allel;|sl;|t;)|olint;|r(?:;|cue;|e(?:;|c(?:;|eq;))))|r(?:Arr;|arr(?:;|c;|w;)|ightarrow;|tri(?:;|e;))|s(?:c(?:;|cue;|e;|r;)|hort(?:mid;|parallel;)|im(?:;|e(?:;|q;))|mid;|par;|qsu(?:be;|pe;)|u(?:b(?:;|E;|e;|set(?:;|eq(?:;|q;)))|cc(?:;|eq;)|p(?:;|E;|e;|set(?:;|eq(?:;|q;)))))|t(?:gl;|ilde;?|lg;|riangle(?:left(?:;|eq;)|right(?:;|eq;)))|u(?:;|m(?:;|ero;|sp;))|v(?:Dash;|Harr;|ap;|dash;|g(?:e;|t;)|infin;|l(?:Arr;|e;|t(?:;|rie;))|r(?:Arr;|trie;)|sim;)|w(?:Arr;|ar(?:hk;|r(?:;|ow;))|near;))|o(?:S;|a(?:cute;?|st;)|c(?:ir(?:;|c;?)|y;)|d(?:ash;|blac;|iv;|ot;|sold;)|elig;|f(?:cir;|r;)|g(?:on;|rave;?|t;)|h(?:bar;|m;)|int;|l(?:arr;|c(?:ir;|ross;)|ine;|t;)|m(?:acr;|ega;|i(?:cron;|d;|nus;))|opf;|p(?:ar;|erp;|lus;)|r(?:;|arr;|d(?:;|er(?:;|of;)|f;?|m;?)|igof;|or;|slope;|v;)|s(?:cr;|lash;?|ol;)|ti(?:lde;?|mes(?:;|as;))|uml;?|vbar;)|p(?:ar(?:;|a(?:;|llel;|)|s(?:im;|l;)|t;)|cy;|er(?:cnt;|iod;|mil;|p;|tenk;)|fr;|h(?:i(?:;|v;)|mmat;|one;)|i(?:;|tchfork;|v;)|l(?:an(?:ck(?:;|h;)|kv;)|us(?:;|acir;|b;|cir;|d(?:o;|u;)|e;|mn;?|sim;|two;))|m;|o(?:intint;|pf;|und;?)|r(?:;|E;|ap;|cue;|e(?:;|c(?:;|approx;|curlyeq;|eq;|n(?:approx;|eqq;|sim;)|sim;))|ime(?:;|s;)|n(?:E;|ap;|sim;)|o(?:d;|f(?:alar;|line;|surf;)|p(?:;|to;))|sim;|urel;)|s(?:cr;|i;)|uncsp;)|q(?:fr;|int;|opf;|prime;|scr;|u(?:at(?:ernions;|int;)|est(?:;|eq;)|ot;?))|r(?:A(?:arr;|rr;|tail;)|Barr;|Har;|a(?:c(?:e;|ute;)|dic;|emptyv;|ng(?:;|d;|e;|le;)|quo;?|rr(?:;|ap;|b(?:;|fs;)|c;|fs;|hk;|lp;|pl;|sim;|tl;|w;)|t(?:ail;|io(?:;|nals;)))|b(?:arr;|brk;|r(?:ac(?:e;|k;)|k(?:e;|sl(?:d;|u;))))|c(?:aron;|e(?:dil;|il;)|ub;|y;)|d(?:ca;|ldhar;|quo(?:;|r;)|sh;)|e(?:al(?:;|ine;|part;|s;)|ct;|g;?)|f(?:isht;|loor;|r;)|h(?:ar(?:d;|u(?:;|l;))|o(?:;|v;))|i(?:ght(?:arrow(?:;|tail;)|harpoon(?:down;|up;)|left(?:arrows;|harpoons;)|rightarrows;|squigarrow;|threetimes;)|ng;|singdotseq;)|l(?:arr;|har;|m;)|moust(?:;|ache;)|nmid;|o(?:a(?:ng;|rr;)|brk;|p(?:ar;|f;|lus;)|times;)|p(?:ar(?:;|gt;)|polint;)|rarr;|s(?:aquo;|cr;|h;|q(?:b;|uo(?:;|r;)))|t(?:hree;|imes;|ri(?:;|e;|f;|ltri;))|uluhar;|x;)|s(?:acute;|bquo;|c(?:;|E;|a(?:p;|ron;)|cue;|e(?:;|dil;)|irc;|n(?:E;|ap;|sim;)|polint;|sim;|y;)|dot(?:;|b;|e;)|e(?:Arr;|ar(?:hk;|r(?:;|ow;))|ct;?|mi;|swar;|tm(?:inus;|n;)|xt;)|fr(?:;|own;)|h(?:arp;|c(?:hcy;|y;)|ort(?:mid;|parallel;)|y;?)|i(?:gma(?:;|f;|v;)|m(?:;|dot;|e(?:;|q;)|g(?:;|E;)|l(?:;|E;)|ne;|plus;|rarr;))|larr;|m(?:a(?:llsetminus;|shp;)|eparsl;|i(?:d;|le;)|t(?:;|e(?:;|s;)))|o(?:ftcy;|l(?:;|b(?:;|ar;))|pf;)|pa(?:des(?:;|uit;)|r;)|q(?:c(?:ap(?:;|s;)|up(?:;|s;))|su(?:b(?:;|e;|set(?:;|eq;))|p(?:;|e;|set(?:;|eq;)))|u(?:;|ar(?:e;|f;)|f;))|rarr;|s(?:cr;|etmn;|mile;|tarf;)|t(?:ar(?:;|f;)|r(?:aight(?:epsilon;|phi;)|ns;))|u(?:b(?:;|E;|dot;|e(?:;|dot;)|mult;|n(?:E;|e;)|plus;|rarr;|s(?:et(?:;|eq(?:;|q;)|neq(?:;|q;))|im;|u(?:b;|p;)))|cc(?:;|approx;|curlyeq;|eq;|n(?:approx;|eqq;|sim;)|sim;)|m;|ng;|p(?:1;?|2;?|3;?|;|E;|d(?:ot;|sub;)|e(?:;|dot;)|hs(?:ol;|ub;)|larr;|mult;|n(?:E;|e;)|plus;|s(?:et(?:;|eq(?:;|q;)|neq(?:;|q;))|im;|u(?:b;|p;))))|w(?:Arr;|ar(?:hk;|r(?:;|ow;))|nwar;)|zlig;?)|t(?:a(?:rget;|u;)|brk;|c(?:aron;|edil;|y;)|dot;|elrec;|fr;|h(?:e(?:re(?:4;|fore;)|ta(?:;|sym;|v;))|i(?:ck(?:approx;|sim;)|nsp;)|k(?:ap;|sim;)|orn;?)|i(?:lde;|mes(?:;|b(?:;|ar;)|d;|)|nt;)|o(?:ea;|p(?:;|bot;|cir;|f(?:;|ork;))|sa;)|prime;|r(?:ade;|i(?:angle(?:;|down;|left(?:;|eq;)|q;|right(?:;|eq;))|dot;|e;|minus;|plus;|sb;|time;)|pezium;)|s(?:c(?:r;|y;)|hcy;|trok;)|w(?:ixt;|ohead(?:leftarrow;|rightarrow;)))|u(?:Arr;|Har;|a(?:cute;?|rr;)|br(?:cy;|eve;)|c(?:irc;?|y;)|d(?:arr;|blac;|har;)|f(?:isht;|r;)|grave;?|h(?:ar(?:l;|r;)|blk;)|l(?:c(?:orn(?:;|er;)|rop;)|tri;)|m(?:acr;|l;?)|o(?:gon;|pf;)|p(?:arrow;|downarrow;|harpoon(?:left;|right;)|lus;|si(?:;|h;|lon;)|uparrows;)|r(?:c(?:orn(?:;|er;)|rop;)|ing;|tri;)|scr;|t(?:dot;|ilde;|ri(?:;|f;))|u(?:arr;|ml;?)|wangle;)|v(?:Arr;|Bar(?:;|v;)|Dash;|a(?:ngrt;|r(?:epsilon;|kappa;|nothing;|p(?:hi;|i;|ropto;)|r(?:;|ho;)|s(?:igma;|u(?:bsetneq(?:;|q;)|psetneq(?:;|q;)))|t(?:heta;|riangle(?:left;|right;))))|cy;|dash;|e(?:e(?:;|bar;|eq;)|llip;|r(?:bar;|t;))|fr;|ltri;|nsu(?:b;|p;)|opf;|prop;|rtri;|s(?:cr;|u(?:bn(?:E;|e;)|pn(?:E;|e;)))|zigzag;)|w(?:circ;|e(?:d(?:bar;|ge(?:;|q;))|ierp;)|fr;|opf;|p;|r(?:;|eath;)|scr;)|x(?:c(?:ap;|irc;|up;)|dtri;|fr;|h(?:Arr;|arr;)|i;|l(?:Arr;|arr;)|map;|nis;|o(?:dot;|p(?:f;|lus;)|time;)|r(?:Arr;|arr;)|s(?:cr;|qcup;)|u(?:plus;|tri;)|vee;|wedge;)|y(?:ac(?:ute;?|y;)|c(?:irc;|y;)|en;?|fr;|icy;|opf;|scr;|u(?:cy;|ml;?))|z(?:acute;|c(?:aron;|y;)|dot;|e(?:etrf;|ta;)|fr;|hcy;|igrarr;|opf;|scr;|w(?:j;|nj;)))|[\s\S]/g,
        Ce = 32,
        tt = /[^\r"&\u0000]+/g,
        xe = /[^\r'&\u0000]+/g,
        Gt = /[^\r\t\n\f &>\u0000]+/g,
        Jt = /[^\r\t\n\f \/>A-Z\u0000]+/g,
        Ka = /[^\r\t\n\f \/=>A-Z\u0000]+/g,
        Wa = /[^\]\r\u0000\uffff]*/g,
        Qa = /[^&<\r\u0000\uffff]*/g,
        Cs = /[^<\r\u0000\uffff]*/g,
        $a = /[^\r\u0000\uffff]*/g,
        Ls = /(?:(\/)?([a-z]+)>)|[\s\S]/g,
        Ms =
          /(?:([-a-z]+)[ \t\n\f]*=[ \t\n\f]*('[^'&\r\u0000]*'|"[^"&\r\u0000]*"|[^\t\n\r\f "&'\u0000>][^&> \t\n\r\f\u0000]*[ \t\n\f]))|[\s\S]/g,
        br = /[^\x09\x0A\x0C\x0D\x20]/,
        _n = /[^\x09\x0A\x0C\x0D\x20]/g,
        Xa = /[^\x00\x09\x0A\x0C\x0D\x20]/,
        Ct = /^[\x09\x0A\x0C\x0D\x20]+/,
        Er = /\x00/g;
      function Me(q) {
        var B = 16384;
        if (q.length < B) return String.fromCharCode.apply(String, q);
        for (var Z = "", $ = 0; $ < q.length; $ += B)
          Z += String.fromCharCode.apply(String, q.slice($, $ + B));
        return Z;
      }
      function Ya(q) {
        for (var B = [], Z = 0; Z < q.length; Z++) B[Z] = q.charCodeAt(Z);
        return B;
      }
      function ye(q, B) {
        if (typeof B == "string")
          return q.namespaceURI === s.HTML && q.localName === B;
        var Z = B[q.namespaceURI];
        return Z && Z[q.localName];
      }
      function Rs(q) {
        return ye(q, U);
      }
      function Is(q) {
        if (ye(q, W)) return !0;
        if (q.namespaceURI === s.MATHML && q.localName === "annotation-xml") {
          var B = q.getAttribute("encoding");
          if (
            (B && (B = B.toLowerCase()),
            B === "text/html" || B === "application/xhtml+xml")
          )
            return !0;
        }
        return !1;
      }
      function Za(q) {
        return q in R ? R[q] : q;
      }
      function Os(q) {
        for (var B = 0, Z = q.length; B < Z; B++)
          q[B][0] in T && (q[B][0] = T[q[B][0]]);
      }
      function xs(q) {
        for (var B = 0, Z = q.length; B < Z; B++)
          if (q[B][0] === "definitionurl") {
            q[B][0] = "definitionURL";
            break;
          }
      }
      function yn(q) {
        for (var B = 0, Z = q.length; B < Z; B++)
          q[B][0] in ie && q[B].push(ie[q[B][0]]);
      }
      function Ps(q, B) {
        for (var Z = 0, $ = q.length; Z < $; Z++) {
          var Te = q[Z][0],
            X = q[Z][1];
          B.hasAttribute(Te) || B._setAttribute(Te, X);
        }
      }
      (de.ElementStack = function () {
        (this.elements = []), (this.top = null);
      }),
        (de.ElementStack.prototype.push = function (q) {
          this.elements.push(q), (this.top = q);
        }),
        (de.ElementStack.prototype.pop = function (q) {
          this.elements.pop(),
            (this.top = this.elements[this.elements.length - 1]);
        }),
        (de.ElementStack.prototype.popTag = function (q) {
          for (var B = this.elements.length - 1; B > 0; B--) {
            var Z = this.elements[B];
            if (ye(Z, q)) break;
          }
          (this.elements.length = B), (this.top = this.elements[B - 1]);
        }),
        (de.ElementStack.prototype.popElementType = function (q) {
          for (
            var B = this.elements.length - 1;
            B > 0 && !(this.elements[B] instanceof q);
            B--
          );
          (this.elements.length = B), (this.top = this.elements[B - 1]);
        }),
        (de.ElementStack.prototype.popElement = function (q) {
          for (
            var B = this.elements.length - 1;
            B > 0 && this.elements[B] !== q;
            B--
          );
          (this.elements.length = B), (this.top = this.elements[B - 1]);
        }),
        (de.ElementStack.prototype.removeElement = function (q) {
          if (this.top === q) this.pop();
          else {
            var B = this.elements.lastIndexOf(q);
            B !== -1 && this.elements.splice(B, 1);
          }
        }),
        (de.ElementStack.prototype.clearToContext = function (q) {
          for (
            var B = this.elements.length - 1;
            B > 0 && !ye(this.elements[B], q);
            B--
          );
          (this.elements.length = B + 1), (this.top = this.elements[B]);
        }),
        (de.ElementStack.prototype.contains = function (q) {
          return this.inSpecificScope(q, Object.create(null));
        }),
        (de.ElementStack.prototype.inSpecificScope = function (q, B) {
          for (var Z = this.elements.length - 1; Z >= 0; Z--) {
            var $ = this.elements[Z];
            if (ye($, q)) return !0;
            if (ye($, B)) return !1;
          }
          return !1;
        }),
        (de.ElementStack.prototype.elementInSpecificScope = function (q, B) {
          for (var Z = this.elements.length - 1; Z >= 0; Z--) {
            var $ = this.elements[Z];
            if ($ === q) return !0;
            if (ye($, B)) return !1;
          }
          return !1;
        }),
        (de.ElementStack.prototype.elementTypeInSpecificScope = function (
          q,
          B
        ) {
          for (var Z = this.elements.length - 1; Z >= 0; Z--) {
            var $ = this.elements[Z];
            if ($ instanceof q) return !0;
            if (ye($, B)) return !1;
          }
          return !1;
        }),
        (de.ElementStack.prototype.inScope = function (q) {
          return this.inSpecificScope(q, d);
        }),
        (de.ElementStack.prototype.elementInScope = function (q) {
          return this.elementInSpecificScope(q, d);
        }),
        (de.ElementStack.prototype.elementTypeInScope = function (q) {
          return this.elementTypeInSpecificScope(q, d);
        }),
        (de.ElementStack.prototype.inButtonScope = function (q) {
          return this.inSpecificScope(q, p);
        }),
        (de.ElementStack.prototype.inListItemScope = function (q) {
          return this.inSpecificScope(q, f);
        }),
        (de.ElementStack.prototype.inTableScope = function (q) {
          return this.inSpecificScope(q, S);
        }),
        (de.ElementStack.prototype.inSelectScope = function (q) {
          for (var B = this.elements.length - 1; B >= 0; B--) {
            var Z = this.elements[B];
            if (Z.namespaceURI !== s.HTML) return !1;
            var $ = Z.localName;
            if ($ === q) return !0;
            if ($ !== "optgroup" && $ !== "option") return !1;
          }
          return !1;
        }),
        (de.ElementStack.prototype.generateImpliedEndTags = function (q, B) {
          for (var Z = B ? V : oe, $ = this.elements.length - 1; $ >= 0; $--) {
            var Te = this.elements[$];
            if ((q && ye(Te, q)) || !ye(this.elements[$], Z)) break;
          }
          (this.elements.length = $ + 1), (this.top = this.elements[$]);
        }),
        (de.ActiveFormattingElements = function () {
          (this.list = []), (this.attrs = []);
        }),
        (de.ActiveFormattingElements.prototype.MARKER = { localName: "|" }),
        (de.ActiveFormattingElements.prototype.insertMarker = function () {
          this.list.push(this.MARKER), this.attrs.push(this.MARKER);
        }),
        (de.ActiveFormattingElements.prototype.push = function (q, B) {
          for (
            var Z = 0, $ = this.list.length - 1;
            $ >= 0 && this.list[$] !== this.MARKER;
            $--
          )
            if (Lt(q, this.list[$], this.attrs[$]) && (Z++, Z === 3)) {
              this.list.splice($, 1), this.attrs.splice($, 1);
              break;
            }
          this.list.push(q);
          for (var Te = [], X = 0; X < B.length; X++) Te[X] = B[X];
          this.attrs.push(Te);
          function Lt(ft, Mt, rt) {
            if (ft.localName !== Mt.localName || ft._numattrs !== rt.length)
              return !1;
            for (var Pe = 0, vr = rt.length; Pe < vr; Pe++) {
              var Rt = rt[Pe][0],
                D = rt[Pe][1];
              if (!ft.hasAttribute(Rt) || ft.getAttribute(Rt) !== D) return !1;
            }
            return !0;
          }
        }),
        (de.ActiveFormattingElements.prototype.clearToMarker = function () {
          for (
            var q = this.list.length - 1;
            q >= 0 && this.list[q] !== this.MARKER;
            q--
          );
          q < 0 && (q = 0), (this.list.length = q), (this.attrs.length = q);
        }),
        (de.ActiveFormattingElements.prototype.findElementByTag = function (q) {
          for (var B = this.list.length - 1; B >= 0; B--) {
            var Z = this.list[B];
            if (Z === this.MARKER) break;
            if (Z.localName === q) return Z;
          }
          return null;
        }),
        (de.ActiveFormattingElements.prototype.indexOf = function (q) {
          return this.list.lastIndexOf(q);
        }),
        (de.ActiveFormattingElements.prototype.remove = function (q) {
          var B = this.list.lastIndexOf(q);
          B !== -1 && (this.list.splice(B, 1), this.attrs.splice(B, 1));
        }),
        (de.ActiveFormattingElements.prototype.replace = function (q, B, Z) {
          var $ = this.list.lastIndexOf(q);
          $ !== -1 && ((this.list[$] = B), (this.attrs[$] = Z));
        }),
        (de.ActiveFormattingElements.prototype.insertAfter = function (q, B) {
          var Z = this.list.lastIndexOf(q);
          Z !== -1 && (this.list.splice(Z, 0, B), this.attrs.splice(Z, 0, B));
        });
      function de(q, B, Z) {
        var $ = null,
          Te = 0,
          X = 0,
          Lt = !1,
          ft = !1,
          Mt = 0,
          rt = [],
          Pe = "",
          vr = !0,
          Rt = 0,
          D = he,
          dt,
          we,
          be = "",
          Tr = "",
          Ee = [],
          qe = "",
          He = "",
          ve = [],
          pt = [],
          mt = [],
          gt = [],
          Ge = [],
          Sr = !1,
          F = Xo,
          nt = null,
          st = [],
          A = new de.ElementStack(),
          le = new de.ActiveFormattingElements(),
          It = B !== void 0,
          wr = null,
          it = null,
          Nr = !0;
        B && (Nr = B.ownerDocument._scripting_enabled),
          Z && Z.scripting_enabled === !1 && (Nr = !1);
        var Ne = !0,
          bn = !1,
          Ar,
          En,
          z = [],
          _t = !1,
          Ot = !1,
          Dr = {
            document: function () {
              return me;
            },
            _asDocumentFragment: function () {
              for (
                var l = me.createDocumentFragment(), u = me.firstChild;
                u.hasChildNodes();

              )
                l.appendChild(u.firstChild);
              return l;
            },
            pause: function () {
              Rt++;
            },
            resume: function () {
              Rt--, this.parse("");
            },
            parse: function (l, u, E) {
              var O;
              return Rt > 0
                ? ((Pe += l), !0)
                : (Mt === 0
                    ? (Pe && ((l = Pe + l), (Pe = "")),
                      u && ((l += "\uFFFF"), (Lt = !0)),
                      ($ = l),
                      (Te = l.length),
                      (X = 0),
                      vr && ((vr = !1), $.charCodeAt(0) === 65279 && (X = 1)),
                      Mt++,
                      (O = qs(E)),
                      (Pe = $.substring(X, Te)),
                      Mt--)
                    : (Mt++,
                      rt.push($, Te, X),
                      ($ = l),
                      (Te = l.length),
                      (X = 0),
                      qs(),
                      (O = !1),
                      (Pe = $.substring(X, Te)),
                      (X = rt.pop()),
                      (Te = rt.pop()),
                      ($ = rt.pop()),
                      Pe &&
                        (($ = Pe + $.substring(X)),
                        (Te = $.length),
                        (X = 0),
                        (Pe = "")),
                      Mt--),
                  O);
            },
          },
          me = new t(!0, q);
        if (((me._parser = Dr), (me._scripting_enabled = Nr), B)) {
          if (
            (B.ownerDocument._quirks && (me._quirks = !0),
            B.ownerDocument._limitedQuirks && (me._limitedQuirks = !0),
            B.namespaceURI === s.HTML)
          )
            switch (B.localName) {
              case "title":
              case "textarea":
                D = vt;
                break;
              case "style":
              case "xmp":
              case "iframe":
              case "noembed":
              case "noframes":
              case "script":
              case "plaintext":
                D = Nn;
                break;
            }
          var Hs = me.createElement("html");
          me._appendChild(Hs),
            A.push(Hs),
            B instanceof o.HTMLTemplateElement && st.push(xn),
            ir();
          for (var er = B; er !== null; er = er.parentElement)
            if (er instanceof o.HTMLFormElement) {
              it = er;
              break;
            }
        }
        function qs(l) {
          for (var u, E, O, x; X < Te; ) {
            if (Rt > 0 || (l && l())) return !0;
            switch (typeof D.lookahead) {
              case "undefined":
                if (((u = $.charCodeAt(X++)), ft && ((ft = !1), u === 10))) {
                  X++;
                  continue;
                }
                switch (u) {
                  case 13:
                    X < Te ? $.charCodeAt(X) === 10 && X++ : (ft = !0), D(10);
                    break;
                  case 65535:
                    if (Lt && X === Te) {
                      D(c);
                      break;
                    }
                  default:
                    D(u);
                    break;
                }
                break;
              case "number":
                u = $.charCodeAt(X);
                var K = D.lookahead,
                  re = !0;
                if ((K < 0 && ((re = !1), (K = -K)), K < Te - X))
                  (E = re ? $.substring(X, X + K) : null), (x = !1);
                else if (Lt)
                  (E = re ? $.substring(X, Te) : null),
                    (x = !0),
                    u === 65535 && X === Te - 1 && (u = c);
                else return !0;
                D(u, E, x);
                break;
              case "string":
                (u = $.charCodeAt(X)), (O = D.lookahead);
                var fe = $.indexOf(O, X);
                if (fe !== -1) (E = $.substring(X, fe + O.length)), (x = !1);
                else {
                  if (!Lt) return !0;
                  (E = $.substring(X, Te)),
                    u === 65535 && X === Te - 1 && (u = c),
                    (x = !0);
                }
                D(u, E, x);
                break;
            }
          }
          return !1;
        }
        function yt(l, u) {
          for (var E = 0; E < Ge.length; E++) if (Ge[E][0] === l) return;
          u !== void 0 ? Ge.push([l, u]) : Ge.push([l]);
        }
        function Ja() {
          Ms.lastIndex = X - 1;
          var l = Ms.exec($);
          if (!l) throw new Error("should never happen");
          var u = l[1];
          if (!u) return !1;
          var E = l[2],
            O = E.length;
          switch (E[0]) {
            case '"':
            case "'":
              (E = E.substring(1, O - 1)), (X += l[0].length - 1), (D = Cn);
              break;
            default:
              (D = Ye), (X += l[0].length - 1), (E = E.substring(0, O - 1));
              break;
          }
          for (var x = 0; x < Ge.length; x++) if (Ge[x][0] === u) return !0;
          return Ge.push([u, E]), !0;
        }
        function eo() {
          (Sr = !1), (be = ""), (Ge.length = 0);
        }
        function tr() {
          (Sr = !0), (be = ""), (Ge.length = 0);
        }
        function at() {
          Ee.length = 0;
        }
        function vn() {
          qe = "";
        }
        function Tn() {
          He = "";
        }
        function Fs() {
          ve.length = 0;
        }
        function Kt() {
          (pt.length = 0), (mt = null), (gt = null);
        }
        function kr() {
          mt = [];
        }
        function bt() {
          gt = [];
        }
        function ge() {
          bn = !0;
        }
        function to() {
          return A.top && A.top.namespaceURI !== "http://www.w3.org/1999/xhtml";
        }
        function Ue(l) {
          return Tr === l;
        }
        function Wt() {
          if (z.length > 0) {
            var l = Me(z);
            if (
              ((z.length = 0),
              Ot &&
                ((Ot = !1),
                l[0] ===
                  `
` && (l = l.substring(1)),
                l.length === 0))
            )
              return;
            De(_, l), (_t = !1);
          }
          Ot = !1;
        }
        function rr(l) {
          l.lastIndex = X - 1;
          var u = l.exec($);
          if (u && u.index === X - 1)
            return (
              (u = u[0]),
              (X += u.length - 1),
              Lt && X === Te && ((u = u.slice(0, -1)), X--),
              u
            );
          throw new Error("should never happen");
        }
        function nr(l) {
          l.lastIndex = X - 1;
          var u = l.exec($)[0];
          return u ? (ro(u), (X += u.length - 1), !0) : !1;
        }
        function ro(l) {
          z.length > 0 && Wt(),
            !(
              Ot &&
              ((Ot = !1),
              l[0] ===
                `
` && (l = l.substring(1)),
              l.length === 0)
            ) && De(_, l);
        }
        function ot() {
          if (Sr) De(b, be);
          else {
            var l = be;
            (be = ""), (Tr = l), De(g, l, Ge);
          }
        }
        function no() {
          if (X === Te) return !1;
          Ls.lastIndex = X;
          var l = Ls.exec($);
          if (!l) throw new Error("should never happen");
          var u = l[2];
          if (!u) return !1;
          var E = l[1];
          return (
            E
              ? ((X += u.length + 2), De(b, u))
              : ((X += u.length + 1), (Tr = u), De(g, u, M)),
            !0
          );
        }
        function so() {
          Sr ? De(b, be, null, !0) : De(g, be, Ge, !0);
        }
        function _e() {
          De(I, Me(pt), mt ? Me(mt) : void 0, gt ? Me(gt) : void 0);
        }
        function ae() {
          Wt(), F(c), (me.modclock = 1);
        }
        var De = (Dr.insertToken = function (u, E, O, x) {
          Wt();
          var K = A.top;
          !K || K.namespaceURI === s.HTML
            ? F(u, E, O, x)
            : u !== g && u !== _
              ? ti(u, E, O, x)
              : (Rs(K) &&
                    (u === _ ||
                      (u === g && E !== "mglyph" && E !== "malignmark"))) ||
                  (u === g &&
                    E === "svg" &&
                    K.namespaceURI === s.MATHML &&
                    K.localName === "annotation-xml") ||
                  Is(K)
                ? ((En = !0), F(u, E, O, x), (En = !1))
                : ti(u, E, O, x);
        });
        function Qe(l) {
          var u = A.top;
          Et && ye(u, ee)
            ? Lr(function (E) {
                return E.createComment(l);
              })
            : (u instanceof o.HTMLTemplateElement && (u = u.content),
              u._appendChild(u.ownerDocument.createComment(l)));
        }
        function $e(l) {
          var u = A.top;
          if (Et && ye(u, ee))
            Lr(function (O) {
              return O.createTextNode(l);
            });
          else {
            u instanceof o.HTMLTemplateElement && (u = u.content);
            var E = u.lastChild;
            E && E.nodeType === n.TEXT_NODE
              ? E.appendData(l)
              : u._appendChild(u.ownerDocument.createTextNode(l));
          }
        }
        function sr(l, u, E) {
          var O = i.createElement(l, u, null);
          if (E)
            for (var x = 0, K = E.length; x < K; x++)
              O._setAttribute(E[x][0], E[x][1]);
          return O;
        }
        var Et = !1;
        function se(l, u) {
          var E = Cr(function (O) {
            return sr(O, l, u);
          });
          return ye(E, m) && (E._form = it), E;
        }
        function Cr(l) {
          var u;
          return (
            Et && ye(A.top, ee)
              ? (u = Lr(l))
              : A.top instanceof o.HTMLTemplateElement
                ? ((u = l(A.top.content.ownerDocument)),
                  A.top.content._appendChild(u))
                : ((u = l(A.top.ownerDocument)), A.top._appendChild(u)),
            A.push(u),
            u
          );
        }
        function Sn(l, u, E) {
          return Cr(function (O) {
            var x = O._createElementNS(l, E, null);
            if (u)
              for (var K = 0, re = u.length; K < re; K++) {
                var fe = u[K];
                fe.length === 2
                  ? x._setAttribute(fe[0], fe[1])
                  : x._setAttributeNS(fe[2], fe[0], fe[1]);
              }
            return x;
          });
        }
        function Bs(l) {
          for (var u = A.elements.length - 1; u >= 0; u--)
            if (A.elements[u] instanceof l) return u;
          return -1;
        }
        function Lr(l) {
          var u,
            E,
            O = -1,
            x = -1,
            K;
          if (
            ((O = Bs(o.HTMLTableElement)),
            (x = Bs(o.HTMLTemplateElement)),
            x >= 0 && (O < 0 || x > O)
              ? (u = A.elements[x])
              : O >= 0 &&
                ((u = A.elements[O].parentNode),
                u ? (E = A.elements[O]) : (u = A.elements[O - 1])),
            u || (u = A.elements[0]),
            u instanceof o.HTMLTemplateElement && (u = u.content),
            (K = l(u.ownerDocument)),
            K.nodeType === n.TEXT_NODE)
          ) {
            var re;
            if (
              (E ? (re = E.previousSibling) : (re = u.lastChild),
              re && re.nodeType === n.TEXT_NODE)
            )
              return re.appendData(K.data), K;
          }
          return E ? u.insertBefore(K, E) : u._appendChild(K), K;
        }
        function ir() {
          for (var l = !1, u = A.elements.length - 1; u >= 0; u--) {
            var E = A.elements[u];
            if (
              (u === 0 && ((l = !0), It && (E = B)), E.namespaceURI === s.HTML)
            ) {
              var O = E.localName;
              switch (O) {
                case "select":
                  for (var x = u; x > 0; ) {
                    var K = A.elements[--x];
                    if (K instanceof o.HTMLTemplateElement) break;
                    if (K instanceof o.HTMLTableElement) {
                      F = zr;
                      return;
                    }
                  }
                  F = lt;
                  return;
                case "tr":
                  F = lr;
                  return;
                case "tbody":
                case "tfoot":
                case "thead":
                  F = qt;
                  return;
                case "caption":
                  F = On;
                  return;
                case "colgroup":
                  F = Vr;
                  return;
                case "table":
                  F = je;
                  return;
                case "template":
                  F = st[st.length - 1];
                  return;
                case "body":
                  F = te;
                  return;
                case "frameset":
                  F = Pn;
                  return;
                case "html":
                  wr === null ? (F = Ur) : (F = In);
                  return;
                default:
                  if (!l) {
                    if (O === "head") {
                      F = Ae;
                      return;
                    }
                    if (O === "td" || O === "th") {
                      F = Qt;
                      return;
                    }
                  }
              }
            }
            if (l) {
              F = te;
              return;
            }
          }
        }
        function Mr(l, u) {
          se(l, u), (D = ar), (nt = F), (F = jr);
        }
        function io(l, u) {
          se(l, u), (D = vt), (nt = F), (F = jr);
        }
        function wn(l, u) {
          return {
            elt: sr(l, le.list[u].localName, le.attrs[u]),
            attrs: le.attrs[u],
          };
        }
        function Oe() {
          if (le.list.length !== 0) {
            var l = le.list[le.list.length - 1];
            if (l !== le.MARKER && A.elements.lastIndexOf(l) === -1) {
              for (
                var u = le.list.length - 2;
                u >= 0 &&
                ((l = le.list[u]),
                !(l === le.MARKER || A.elements.lastIndexOf(l) !== -1));
                u--
              );
              for (u = u + 1; u < le.list.length; u++) {
                var E = Cr(function (O) {
                  return wn(O, u).elt;
                });
                le.list[u] = E;
              }
            }
          }
        }
        var Rr = { localName: "BM" };
        function ao(l) {
          if (ye(A.top, l) && le.indexOf(A.top) === -1) return A.pop(), !0;
          for (var u = 0; u < 8; ) {
            u++;
            var E = le.findElementByTag(l);
            if (!E) return !1;
            var O = A.elements.lastIndexOf(E);
            if (O === -1) return le.remove(E), !0;
            if (!A.elementInScope(E)) return !0;
            for (var x = null, K, re = O + 1; re < A.elements.length; re++)
              if (ye(A.elements[re], N)) {
                (x = A.elements[re]), (K = re);
                break;
              }
            if (x) {
              var fe = A.elements[O - 1];
              le.insertAfter(E, Rr);
              for (
                var Se = x, Le = x, Ve = K, Ke, Ft = 0;
                Ft++, (Se = A.elements[--Ve]), Se !== E;

              ) {
                if (
                  ((Ke = le.indexOf(Se)),
                  Ft > 3 && Ke !== -1 && (le.remove(Se), (Ke = -1)),
                  Ke === -1)
                ) {
                  A.removeElement(Se);
                  continue;
                }
                var At = wn(fe.ownerDocument, Ke);
                le.replace(Se, At.elt, At.attrs),
                  (A.elements[Ve] = At.elt),
                  (Se = At.elt),
                  Le === x && (le.remove(Rr), le.insertAfter(At.elt, Rr)),
                  Se._appendChild(Le),
                  (Le = Se);
              }
              Et && ye(fe, ee)
                ? Lr(function () {
                    return Le;
                  })
                : fe instanceof o.HTMLTemplateElement
                  ? fe.content._appendChild(Le)
                  : fe._appendChild(Le);
              for (
                var cr = wn(x.ownerDocument, le.indexOf(E));
                x.hasChildNodes();

              )
                cr.elt._appendChild(x.firstChild);
              x._appendChild(cr.elt),
                le.remove(E),
                le.replace(Rr, cr.elt, cr.attrs),
                A.removeElement(E);
              var tl = A.elements.lastIndexOf(x);
              A.elements.splice(tl + 1, 0, cr.elt);
            } else return A.popElement(E), le.remove(E), !0;
          }
          return !0;
        }
        function oo() {
          A.pop(), (F = nt);
        }
        function xt() {
          delete me._parser,
            (A.elements.length = 0),
            me.defaultView &&
              me.defaultView.dispatchEvent(new o.Event("load", {}));
        }
        function Y(l, u) {
          (D = u), X--;
        }
        function he(l) {
          switch (l) {
            case 38:
              (dt = he), (D = or);
              break;
            case 60:
              if (no()) break;
              D = lo;
              break;
            case 0:
              z.push(l), (_t = !0);
              break;
            case -1:
              ae();
              break;
            default:
              nr(Qa) || z.push(l);
              break;
          }
        }
        function vt(l) {
          switch (l) {
            case 38:
              (dt = vt), (D = or);
              break;
            case 60:
              D = uo;
              break;
            case 0:
              z.push(65533), (_t = !0);
              break;
            case -1:
              ae();
              break;
            default:
              z.push(l);
              break;
          }
        }
        function ar(l) {
          switch (l) {
            case 60:
              D = po;
              break;
            case 0:
              z.push(65533);
              break;
            case -1:
              ae();
              break;
            default:
              nr(Cs) || z.push(l);
              break;
          }
        }
        function Tt(l) {
          switch (l) {
            case 60:
              D = _o;
              break;
            case 0:
              z.push(65533);
              break;
            case -1:
              ae();
              break;
            default:
              nr(Cs) || z.push(l);
              break;
          }
        }
        function Nn(l) {
          switch (l) {
            case 0:
              z.push(65533);
              break;
            case -1:
              ae();
              break;
            default:
              nr($a) || z.push(l);
              break;
          }
        }
        function lo(l) {
          switch (l) {
            case 33:
              D = zs;
              break;
            case 47:
              D = co;
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              eo(), Y(l, Us);
              break;
            case 63:
              Y(l, Pr);
              break;
            default:
              z.push(60), Y(l, he);
              break;
          }
        }
        function co(l) {
          switch (l) {
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              tr(), Y(l, Us);
              break;
            case 62:
              D = he;
              break;
            case -1:
              z.push(60), z.push(47), ae();
              break;
            default:
              Y(l, Pr);
              break;
          }
        }
        function Us(l) {
          switch (l) {
            case 9:
            case 10:
            case 12:
            case 32:
              D = Ye;
              break;
            case 47:
              D = wt;
              break;
            case 62:
              (D = he), ot();
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              be += String.fromCharCode(l + 32);
              break;
            case 0:
              be += "\uFFFD";
              break;
            case -1:
              ae();
              break;
            default:
              be += rr(Jt);
              break;
          }
        }
        function uo(l) {
          l === 47 ? (at(), (D = ho)) : (z.push(60), Y(l, vt));
        }
        function ho(l) {
          switch (l) {
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              tr(), Y(l, fo);
              break;
            default:
              z.push(60), z.push(47), Y(l, vt);
              break;
          }
        }
        function fo(l) {
          switch (l) {
            case 9:
            case 10:
            case 12:
            case 32:
              if (Ue(be)) {
                D = Ye;
                return;
              }
              break;
            case 47:
              if (Ue(be)) {
                D = wt;
                return;
              }
              break;
            case 62:
              if (Ue(be)) {
                (D = he), ot();
                return;
              }
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              (be += String.fromCharCode(l + 32)), Ee.push(l);
              return;
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              (be += String.fromCharCode(l)), Ee.push(l);
              return;
            default:
              break;
          }
          z.push(60), z.push(47), h(z, Ee), Y(l, vt);
        }
        function po(l) {
          l === 47 ? (at(), (D = mo)) : (z.push(60), Y(l, ar));
        }
        function mo(l) {
          switch (l) {
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              tr(), Y(l, go);
              break;
            default:
              z.push(60), z.push(47), Y(l, ar);
              break;
          }
        }
        function go(l) {
          switch (l) {
            case 9:
            case 10:
            case 12:
            case 32:
              if (Ue(be)) {
                D = Ye;
                return;
              }
              break;
            case 47:
              if (Ue(be)) {
                D = wt;
                return;
              }
              break;
            case 62:
              if (Ue(be)) {
                (D = he), ot();
                return;
              }
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              (be += String.fromCharCode(l + 32)), Ee.push(l);
              return;
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              (be += String.fromCharCode(l)), Ee.push(l);
              return;
            default:
              break;
          }
          z.push(60), z.push(47), h(z, Ee), Y(l, ar);
        }
        function _o(l) {
          switch (l) {
            case 47:
              at(), (D = yo);
              break;
            case 33:
              (D = Eo), z.push(60), z.push(33);
              break;
            default:
              z.push(60), Y(l, Tt);
              break;
          }
        }
        function yo(l) {
          switch (l) {
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              tr(), Y(l, bo);
              break;
            default:
              z.push(60), z.push(47), Y(l, Tt);
              break;
          }
        }
        function bo(l) {
          switch (l) {
            case 9:
            case 10:
            case 12:
            case 32:
              if (Ue(be)) {
                D = Ye;
                return;
              }
              break;
            case 47:
              if (Ue(be)) {
                D = wt;
                return;
              }
              break;
            case 62:
              if (Ue(be)) {
                (D = he), ot();
                return;
              }
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              (be += String.fromCharCode(l + 32)), Ee.push(l);
              return;
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              (be += String.fromCharCode(l)), Ee.push(l);
              return;
            default:
              break;
          }
          z.push(60), z.push(47), h(z, Ee), Y(l, Tt);
        }
        function Eo(l) {
          l === 45 ? ((D = vo), z.push(45)) : Y(l, Tt);
        }
        function vo(l) {
          l === 45 ? ((D = js), z.push(45)) : Y(l, Tt);
        }
        function Xe(l) {
          switch (l) {
            case 45:
              (D = To), z.push(45);
              break;
            case 60:
              D = An;
              break;
            case 0:
              z.push(65533);
              break;
            case -1:
              ae();
              break;
            default:
              z.push(l);
              break;
          }
        }
        function To(l) {
          switch (l) {
            case 45:
              (D = js), z.push(45);
              break;
            case 60:
              D = An;
              break;
            case 0:
              (D = Xe), z.push(65533);
              break;
            case -1:
              ae();
              break;
            default:
              (D = Xe), z.push(l);
              break;
          }
        }
        function js(l) {
          switch (l) {
            case 45:
              z.push(45);
              break;
            case 60:
              D = An;
              break;
            case 62:
              (D = Tt), z.push(62);
              break;
            case 0:
              (D = Xe), z.push(65533);
              break;
            case -1:
              ae();
              break;
            default:
              (D = Xe), z.push(l);
              break;
          }
        }
        function An(l) {
          switch (l) {
            case 47:
              at(), (D = So);
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              at(), z.push(60), Y(l, No);
              break;
            default:
              z.push(60), Y(l, Xe);
              break;
          }
        }
        function So(l) {
          switch (l) {
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              tr(), Y(l, wo);
              break;
            default:
              z.push(60), z.push(47), Y(l, Xe);
              break;
          }
        }
        function wo(l) {
          switch (l) {
            case 9:
            case 10:
            case 12:
            case 32:
              if (Ue(be)) {
                D = Ye;
                return;
              }
              break;
            case 47:
              if (Ue(be)) {
                D = wt;
                return;
              }
              break;
            case 62:
              if (Ue(be)) {
                (D = he), ot();
                return;
              }
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              (be += String.fromCharCode(l + 32)), Ee.push(l);
              return;
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              (be += String.fromCharCode(l)), Ee.push(l);
              return;
            default:
              break;
          }
          z.push(60), z.push(47), h(z, Ee), Y(l, Xe);
        }
        function No(l) {
          switch (l) {
            case 9:
            case 10:
            case 12:
            case 32:
            case 47:
            case 62:
              Me(Ee) === "script" ? (D = St) : (D = Xe), z.push(l);
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              Ee.push(l + 32), z.push(l);
              break;
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              Ee.push(l), z.push(l);
              break;
            default:
              Y(l, Xe);
              break;
          }
        }
        function St(l) {
          switch (l) {
            case 45:
              (D = Ao), z.push(45);
              break;
            case 60:
              (D = Dn), z.push(60);
              break;
            case 0:
              z.push(65533);
              break;
            case -1:
              ae();
              break;
            default:
              z.push(l);
              break;
          }
        }
        function Ao(l) {
          switch (l) {
            case 45:
              (D = Do), z.push(45);
              break;
            case 60:
              (D = Dn), z.push(60);
              break;
            case 0:
              (D = St), z.push(65533);
              break;
            case -1:
              ae();
              break;
            default:
              (D = St), z.push(l);
              break;
          }
        }
        function Do(l) {
          switch (l) {
            case 45:
              z.push(45);
              break;
            case 60:
              (D = Dn), z.push(60);
              break;
            case 62:
              (D = Tt), z.push(62);
              break;
            case 0:
              (D = St), z.push(65533);
              break;
            case -1:
              ae();
              break;
            default:
              (D = St), z.push(l);
              break;
          }
        }
        function Dn(l) {
          l === 47 ? (at(), (D = ko), z.push(47)) : Y(l, St);
        }
        function ko(l) {
          switch (l) {
            case 9:
            case 10:
            case 12:
            case 32:
            case 47:
            case 62:
              Me(Ee) === "script" ? (D = Xe) : (D = St), z.push(l);
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              Ee.push(l + 32), z.push(l);
              break;
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
            case 107:
            case 108:
            case 109:
            case 110:
            case 111:
            case 112:
            case 113:
            case 114:
            case 115:
            case 116:
            case 117:
            case 118:
            case 119:
            case 120:
            case 121:
            case 122:
              Ee.push(l), z.push(l);
              break;
            default:
              Y(l, St);
              break;
          }
        }
        function Ye(l) {
          switch (l) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 47:
              D = wt;
              break;
            case 62:
              (D = he), ot();
              break;
            case -1:
              ae();
              break;
            case 61:
              vn(), (qe += String.fromCharCode(l)), (D = kn);
              break;
            default:
              if (Ja()) break;
              vn(), Y(l, kn);
              break;
          }
        }
        function kn(l) {
          switch (l) {
            case 9:
            case 10:
            case 12:
            case 32:
            case 47:
            case 62:
            case -1:
              Y(l, Co);
              break;
            case 61:
              D = Vs;
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              qe += String.fromCharCode(l + 32);
              break;
            case 0:
              qe += "\uFFFD";
              break;
            case 34:
            case 39:
            case 60:
            default:
              qe += rr(Ka);
              break;
          }
        }
        function Co(l) {
          switch (l) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 47:
              yt(qe), (D = wt);
              break;
            case 61:
              D = Vs;
              break;
            case 62:
              (D = he), yt(qe), ot();
              break;
            case -1:
              yt(qe), ae();
              break;
            default:
              yt(qe), vn(), Y(l, kn);
              break;
          }
        }
        function Vs(l) {
          switch (l) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 34:
              Tn(), (D = Ir);
              break;
            case 39:
              Tn(), (D = Or);
              break;
            case 62:
            default:
              Tn(), Y(l, xr);
              break;
          }
        }
        function Ir(l) {
          switch (l) {
            case 34:
              yt(qe, He), (D = Cn);
              break;
            case 38:
              (dt = Ir), (D = or);
              break;
            case 0:
              He += "\uFFFD";
              break;
            case -1:
              ae();
              break;
            case 10:
              He += String.fromCharCode(l);
              break;
            default:
              He += rr(tt);
              break;
          }
        }
        function Or(l) {
          switch (l) {
            case 39:
              yt(qe, He), (D = Cn);
              break;
            case 38:
              (dt = Or), (D = or);
              break;
            case 0:
              He += "\uFFFD";
              break;
            case -1:
              ae();
              break;
            case 10:
              He += String.fromCharCode(l);
              break;
            default:
              He += rr(xe);
              break;
          }
        }
        function xr(l) {
          switch (l) {
            case 9:
            case 10:
            case 12:
            case 32:
              yt(qe, He), (D = Ye);
              break;
            case 38:
              (dt = xr), (D = or);
              break;
            case 62:
              yt(qe, He), (D = he), ot();
              break;
            case 0:
              He += "\uFFFD";
              break;
            case -1:
              X--, (D = he);
              break;
            case 34:
            case 39:
            case 60:
            case 61:
            case 96:
            default:
              He += rr(Gt);
              break;
          }
        }
        function Cn(l) {
          switch (l) {
            case 9:
            case 10:
            case 12:
            case 32:
              D = Ye;
              break;
            case 47:
              D = wt;
              break;
            case 62:
              (D = he), ot();
              break;
            case -1:
              ae();
              break;
            default:
              Y(l, Ye);
              break;
          }
        }
        function wt(l) {
          switch (l) {
            case 62:
              (D = he), so(!0);
              break;
            case -1:
              ae();
              break;
            default:
              Y(l, Ye);
              break;
          }
        }
        function Pr(l, u, E) {
          var O = u.length;
          E ? (X += O - 1) : (X += O);
          var x = u.substring(0, O - 1);
          (x = x.replace(/\u0000/g, "\uFFFD")),
            (x = x.replace(
              /\u000D\u000A/g,
              `
`
            )),
            (x = x.replace(
              /\u000D/g,
              `
`
            )),
            De(C, x),
            (D = he);
        }
        Pr.lookahead = ">";
        function zs(l, u, E) {
          if (u[0] === "-" && u[1] === "-") {
            (X += 2), Fs(), (D = Lo);
            return;
          }
          u.toUpperCase() === "DOCTYPE"
            ? ((X += 7), (D = Ho))
            : u === "[CDATA[" && to()
              ? ((X += 7), (D = Rn))
              : (D = Pr);
        }
        zs.lookahead = 7;
        function Lo(l) {
          switch ((Fs(), l)) {
            case 45:
              D = Mo;
              break;
            case 62:
              (D = he), De(C, Me(ve));
              break;
            default:
              Y(l, Pt);
              break;
          }
        }
        function Mo(l) {
          switch (l) {
            case 45:
              D = Hr;
              break;
            case 62:
              (D = he), De(C, Me(ve));
              break;
            case -1:
              De(C, Me(ve)), ae();
              break;
            default:
              ve.push(45), Y(l, Pt);
              break;
          }
        }
        function Pt(l) {
          switch (l) {
            case 60:
              ve.push(l), (D = Ro);
              break;
            case 45:
              D = Ln;
              break;
            case 0:
              ve.push(65533);
              break;
            case -1:
              De(C, Me(ve)), ae();
              break;
            default:
              ve.push(l);
              break;
          }
        }
        function Ro(l) {
          switch (l) {
            case 33:
              ve.push(l), (D = Io);
              break;
            case 60:
              ve.push(l);
              break;
            default:
              Y(l, Pt);
              break;
          }
        }
        function Io(l) {
          switch (l) {
            case 45:
              D = Oo;
              break;
            default:
              Y(l, Pt);
              break;
          }
        }
        function Oo(l) {
          switch (l) {
            case 45:
              D = xo;
              break;
            default:
              Y(l, Ln);
              break;
          }
        }
        function xo(l) {
          switch (l) {
            case 62:
            case -1:
              Y(l, Hr);
              break;
            default:
              Y(l, Hr);
              break;
          }
        }
        function Ln(l) {
          switch (l) {
            case 45:
              D = Hr;
              break;
            case -1:
              De(C, Me(ve)), ae();
              break;
            default:
              ve.push(45), Y(l, Pt);
              break;
          }
        }
        function Hr(l) {
          switch (l) {
            case 62:
              (D = he), De(C, Me(ve));
              break;
            case 33:
              D = Po;
              break;
            case 45:
              ve.push(45);
              break;
            case -1:
              De(C, Me(ve)), ae();
              break;
            default:
              ve.push(45), ve.push(45), Y(l, Pt);
              break;
          }
        }
        function Po(l) {
          switch (l) {
            case 45:
              ve.push(45), ve.push(45), ve.push(33), (D = Ln);
              break;
            case 62:
              (D = he), De(C, Me(ve));
              break;
            case -1:
              De(C, Me(ve)), ae();
              break;
            default:
              ve.push(45), ve.push(45), ve.push(33), Y(l, Pt);
              break;
          }
        }
        function Ho(l) {
          switch (l) {
            case 9:
            case 10:
            case 12:
            case 32:
              D = Gs;
              break;
            case -1:
              Kt(), ge(), _e(), ae();
              break;
            default:
              Y(l, Gs);
              break;
          }
        }
        function Gs(l) {
          switch (l) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              Kt(), pt.push(l + 32), (D = Mn);
              break;
            case 0:
              Kt(), pt.push(65533), (D = Mn);
              break;
            case 62:
              Kt(), ge(), (D = he), _e();
              break;
            case -1:
              Kt(), ge(), _e(), ae();
              break;
            default:
              Kt(), pt.push(l), (D = Mn);
              break;
          }
        }
        function Mn(l) {
          switch (l) {
            case 9:
            case 10:
            case 12:
            case 32:
              D = Ks;
              break;
            case 62:
              (D = he), _e();
              break;
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 71:
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77:
            case 78:
            case 79:
            case 80:
            case 81:
            case 82:
            case 83:
            case 84:
            case 85:
            case 86:
            case 87:
            case 88:
            case 89:
            case 90:
              pt.push(l + 32);
              break;
            case 0:
              pt.push(65533);
              break;
            case -1:
              ge(), _e(), ae();
              break;
            default:
              pt.push(l);
              break;
          }
        }
        function Ks(l, u, E) {
          switch (l) {
            case 9:
            case 10:
            case 12:
            case 32:
              X += 1;
              break;
            case 62:
              (D = he), (X += 1), _e();
              break;
            case -1:
              ge(), _e(), ae();
              break;
            default:
              (u = u.toUpperCase()),
                u === "PUBLIC"
                  ? ((X += 6), (D = qo))
                  : u === "SYSTEM"
                    ? ((X += 6), (D = Uo))
                    : (ge(), (D = Nt));
              break;
          }
        }
        Ks.lookahead = 6;
        function qo(l) {
          switch (l) {
            case 9:
            case 10:
            case 12:
            case 32:
              D = Fo;
              break;
            case 34:
              kr(), (D = Ws);
              break;
            case 39:
              kr(), (D = Qs);
              break;
            case 62:
              ge(), (D = he), _e();
              break;
            case -1:
              ge(), _e(), ae();
              break;
            default:
              ge(), (D = Nt);
              break;
          }
        }
        function Fo(l) {
          switch (l) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 34:
              kr(), (D = Ws);
              break;
            case 39:
              kr(), (D = Qs);
              break;
            case 62:
              ge(), (D = he), _e();
              break;
            case -1:
              ge(), _e(), ae();
              break;
            default:
              ge(), (D = Nt);
              break;
          }
        }
        function Ws(l) {
          switch (l) {
            case 34:
              D = $s;
              break;
            case 0:
              mt.push(65533);
              break;
            case 62:
              ge(), (D = he), _e();
              break;
            case -1:
              ge(), _e(), ae();
              break;
            default:
              mt.push(l);
              break;
          }
        }
        function Qs(l) {
          switch (l) {
            case 39:
              D = $s;
              break;
            case 0:
              mt.push(65533);
              break;
            case 62:
              ge(), (D = he), _e();
              break;
            case -1:
              ge(), _e(), ae();
              break;
            default:
              mt.push(l);
              break;
          }
        }
        function $s(l) {
          switch (l) {
            case 9:
            case 10:
            case 12:
            case 32:
              D = Bo;
              break;
            case 62:
              (D = he), _e();
              break;
            case 34:
              bt(), (D = qr);
              break;
            case 39:
              bt(), (D = Fr);
              break;
            case -1:
              ge(), _e(), ae();
              break;
            default:
              ge(), (D = Nt);
              break;
          }
        }
        function Bo(l) {
          switch (l) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 62:
              (D = he), _e();
              break;
            case 34:
              bt(), (D = qr);
              break;
            case 39:
              bt(), (D = Fr);
              break;
            case -1:
              ge(), _e(), ae();
              break;
            default:
              ge(), (D = Nt);
              break;
          }
        }
        function Uo(l) {
          switch (l) {
            case 9:
            case 10:
            case 12:
            case 32:
              D = jo;
              break;
            case 34:
              bt(), (D = qr);
              break;
            case 39:
              bt(), (D = Fr);
              break;
            case 62:
              ge(), (D = he), _e();
              break;
            case -1:
              ge(), _e(), ae();
              break;
            default:
              ge(), (D = Nt);
              break;
          }
        }
        function jo(l) {
          switch (l) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 34:
              bt(), (D = qr);
              break;
            case 39:
              bt(), (D = Fr);
              break;
            case 62:
              ge(), (D = he), _e();
              break;
            case -1:
              ge(), _e(), ae();
              break;
            default:
              ge(), (D = Nt);
              break;
          }
        }
        function qr(l) {
          switch (l) {
            case 34:
              D = Xs;
              break;
            case 0:
              gt.push(65533);
              break;
            case 62:
              ge(), (D = he), _e();
              break;
            case -1:
              ge(), _e(), ae();
              break;
            default:
              gt.push(l);
              break;
          }
        }
        function Fr(l) {
          switch (l) {
            case 39:
              D = Xs;
              break;
            case 0:
              gt.push(65533);
              break;
            case 62:
              ge(), (D = he), _e();
              break;
            case -1:
              ge(), _e(), ae();
              break;
            default:
              gt.push(l);
              break;
          }
        }
        function Xs(l) {
          switch (l) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 62:
              (D = he), _e();
              break;
            case -1:
              ge(), _e(), ae();
              break;
            default:
              D = Nt;
              break;
          }
        }
        function Nt(l) {
          switch (l) {
            case 62:
              (D = he), _e();
              break;
            case -1:
              _e(), ae();
              break;
            default:
              break;
          }
        }
        function Rn(l) {
          switch (l) {
            case 93:
              D = Vo;
              break;
            case -1:
              ae();
              break;
            case 0:
              _t = !0;
            default:
              nr(Wa) || z.push(l);
              break;
          }
        }
        function Vo(l) {
          switch (l) {
            case 93:
              D = zo;
              break;
            default:
              z.push(93), Y(l, Rn);
              break;
          }
        }
        function zo(l) {
          switch (l) {
            case 93:
              z.push(93);
              break;
            case 62:
              Wt(), (D = he);
              break;
            default:
              z.push(93), z.push(93), Y(l, Rn);
              break;
          }
        }
        function or(l) {
          switch ((at(), Ee.push(38), l)) {
            case 9:
            case 10:
            case 12:
            case 32:
            case 60:
            case 38:
            case -1:
              Y(l, Ht);
              break;
            case 35:
              Ee.push(l), (D = Go);
              break;
            default:
              Y(l, Ys);
              break;
          }
        }
        function Ys(l) {
          Ie.lastIndex = X;
          var u = Ie.exec($);
          if (!u) throw new Error("should never happen");
          var E = u[1];
          if (!E) {
            D = Ht;
            return;
          }
          switch (((X += E.length), h(Ee, Ya(E)), dt)) {
            case Ir:
            case Or:
            case xr:
              if (E[E.length - 1] !== ";" && /[=A-Za-z0-9]/.test($[X])) {
                D = Ht;
                return;
              }
              break;
            default:
              break;
          }
          at();
          var O = ue[E];
          typeof O == "number" ? Ee.push(O) : h(Ee, O), (D = Ht);
        }
        Ys.lookahead = -Ce;
        function Go(l) {
          switch (((we = 0), l)) {
            case 120:
            case 88:
              Ee.push(l), (D = Ko);
              break;
            default:
              Y(l, Wo);
              break;
          }
        }
        function Ko(l) {
          switch (l) {
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
              Y(l, Qo);
              break;
            default:
              Y(l, Ht);
              break;
          }
        }
        function Wo(l) {
          switch (l) {
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
              Y(l, $o);
              break;
            default:
              Y(l, Ht);
              break;
          }
        }
        function Qo(l) {
          switch (l) {
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
              (we *= 16), (we += l - 55);
              break;
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
              (we *= 16), (we += l - 87);
              break;
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
              (we *= 16), (we += l - 48);
              break;
            case 59:
              D = Br;
              break;
            default:
              Y(l, Br);
              break;
          }
        }
        function $o(l) {
          switch (l) {
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57:
              (we *= 10), (we += l - 48);
              break;
            case 59:
              D = Br;
              break;
            default:
              Y(l, Br);
              break;
          }
        }
        function Br(l) {
          we in j
            ? (we = j[we])
            : (we > 1114111 || (we >= 55296 && we < 57344)) && (we = 65533),
            at(),
            we <= 65535
              ? Ee.push(we)
              : ((we = we - 65536),
                Ee.push(55296 + (we >> 10)),
                Ee.push(56320 + (we & 1023))),
            Y(l, Ht);
        }
        function Ht(l) {
          switch (dt) {
            case Ir:
            case Or:
            case xr:
              He += Me(Ee);
              break;
            default:
              h(z, Ee);
              break;
          }
          Y(l, dt);
        }
        function Xo(l, u, E, O) {
          switch (l) {
            case 1:
              if (((u = u.replace(Ct, "")), u.length === 0)) return;
              break;
            case 4:
              me._appendChild(me.createComment(u));
              return;
            case 5:
              var x = u,
                K = E,
                re = O;
              me.appendChild(new r(me, x, K, re)),
                bn ||
                x.toLowerCase() !== "html" ||
                G.test(K) ||
                (re && re.toLowerCase() === P) ||
                (re === void 0 && w.test(K))
                  ? (me._quirks = !0)
                  : (v.test(K) || (re !== void 0 && w.test(K))) &&
                    (me._limitedQuirks = !0),
                (F = Zs);
              return;
          }
          (me._quirks = !0), (F = Zs), F(l, u, E, O);
        }
        function Zs(l, u, E, O) {
          var x;
          switch (l) {
            case 1:
              if (((u = u.replace(Ct, "")), u.length === 0)) return;
              break;
            case 5:
              return;
            case 4:
              me._appendChild(me.createComment(u));
              return;
            case 2:
              if (u === "html") {
                (x = sr(me, u, E)), A.push(x), me.appendChild(x), (F = Ur);
                return;
              }
              break;
            case 3:
              switch (u) {
                case "html":
                case "head":
                case "body":
                case "br":
                  break;
                default:
                  return;
              }
          }
          (x = sr(me, "html", null)),
            A.push(x),
            me.appendChild(x),
            (F = Ur),
            F(l, u, E, O);
        }
        function Ur(l, u, E, O) {
          switch (l) {
            case 1:
              if (((u = u.replace(Ct, "")), u.length === 0)) return;
              break;
            case 5:
              return;
            case 4:
              Qe(u);
              return;
            case 2:
              switch (u) {
                case "html":
                  te(l, u, E, O);
                  return;
                case "head":
                  var x = se(u, E);
                  (wr = x), (F = Ae);
                  return;
              }
              break;
            case 3:
              switch (u) {
                case "html":
                case "head":
                case "body":
                case "br":
                  break;
                default:
                  return;
              }
          }
          Ur(g, "head", null), F(l, u, E, O);
        }
        function Ae(l, u, E, O) {
          switch (l) {
            case 1:
              var x = u.match(Ct);
              if (
                (x && ($e(x[0]), (u = u.substring(x[0].length))),
                u.length === 0)
              )
                return;
              break;
            case 4:
              Qe(u);
              return;
            case 5:
              return;
            case 2:
              switch (u) {
                case "html":
                  te(l, u, E, O);
                  return;
                case "meta":
                case "base":
                case "basefont":
                case "bgsound":
                case "link":
                  se(u, E), A.pop();
                  return;
                case "title":
                  io(u, E);
                  return;
                case "noscript":
                  if (!Nr) {
                    se(u, E), (F = Js);
                    return;
                  }
                case "noframes":
                case "style":
                  Mr(u, E);
                  return;
                case "script":
                  Cr(function (K) {
                    var re = sr(K, u, E);
                    return (
                      (re._parser_inserted = !0),
                      (re._force_async = !1),
                      It && (re._already_started = !0),
                      Wt(),
                      re
                    );
                  }),
                    (D = Tt),
                    (nt = F),
                    (F = jr);
                  return;
                case "template":
                  se(u, E), le.insertMarker(), (Ne = !1), (F = xn), st.push(F);
                  return;
                case "head":
                  return;
              }
              break;
            case 3:
              switch (u) {
                case "head":
                  A.pop(), (F = In);
                  return;
                case "body":
                case "html":
                case "br":
                  break;
                case "template":
                  if (!A.contains("template")) return;
                  A.generateImpliedEndTags(null, "thorough"),
                    A.popTag("template"),
                    le.clearToMarker(),
                    st.pop(),
                    ir();
                  return;
                default:
                  return;
              }
              break;
          }
          Ae(b, "head", null), F(l, u, E, O);
        }
        function Js(l, u, E, O) {
          switch (l) {
            case 5:
              return;
            case 4:
              Ae(l, u);
              return;
            case 1:
              var x = u.match(Ct);
              if (
                (x && (Ae(l, x[0]), (u = u.substring(x[0].length))),
                u.length === 0)
              )
                return;
              break;
            case 2:
              switch (u) {
                case "html":
                  te(l, u, E, O);
                  return;
                case "basefont":
                case "bgsound":
                case "link":
                case "meta":
                case "noframes":
                case "style":
                  Ae(l, u, E);
                  return;
                case "head":
                case "noscript":
                  return;
              }
              break;
            case 3:
              switch (u) {
                case "noscript":
                  A.pop(), (F = Ae);
                  return;
                case "br":
                  break;
                default:
                  return;
              }
              break;
          }
          Js(b, "noscript", null), F(l, u, E, O);
        }
        function In(l, u, E, O) {
          switch (l) {
            case 1:
              var x = u.match(Ct);
              if (
                (x && ($e(x[0]), (u = u.substring(x[0].length))),
                u.length === 0)
              )
                return;
              break;
            case 4:
              Qe(u);
              return;
            case 5:
              return;
            case 2:
              switch (u) {
                case "html":
                  te(l, u, E, O);
                  return;
                case "body":
                  se(u, E), (Ne = !1), (F = te);
                  return;
                case "frameset":
                  se(u, E), (F = Pn);
                  return;
                case "base":
                case "basefont":
                case "bgsound":
                case "link":
                case "meta":
                case "noframes":
                case "script":
                case "style":
                case "template":
                case "title":
                  A.push(wr), Ae(g, u, E), A.removeElement(wr);
                  return;
                case "head":
                  return;
              }
              break;
            case 3:
              switch (u) {
                case "template":
                  return Ae(l, u, E, O);
                case "body":
                case "html":
                case "br":
                  break;
                default:
                  return;
              }
              break;
          }
          In(g, "body", null), (Ne = !0), F(l, u, E, O);
        }
        function te(l, u, E, O) {
          var x, K, re, fe;
          switch (l) {
            case 1:
              if (_t && ((u = u.replace(Er, "")), u.length === 0)) return;
              Ne && br.test(u) && (Ne = !1), Oe(), $e(u);
              return;
            case 5:
              return;
            case 4:
              Qe(u);
              return;
            case -1:
              if (st.length) return xn(l);
              xt();
              return;
            case 2:
              switch (u) {
                case "html":
                  if (A.contains("template")) return;
                  Ps(E, A.elements[0]);
                  return;
                case "base":
                case "basefont":
                case "bgsound":
                case "link":
                case "meta":
                case "noframes":
                case "script":
                case "style":
                case "template":
                case "title":
                  Ae(g, u, E);
                  return;
                case "body":
                  if (
                    ((x = A.elements[1]),
                    !x ||
                      !(x instanceof o.HTMLBodyElement) ||
                      A.contains("template"))
                  )
                    return;
                  (Ne = !1), Ps(E, x);
                  return;
                case "frameset":
                  if (
                    !Ne ||
                    ((x = A.elements[1]),
                    !x || !(x instanceof o.HTMLBodyElement))
                  )
                    return;
                  for (
                    x.parentNode && x.parentNode.removeChild(x);
                    !(A.top instanceof o.HTMLHtmlElement);

                  )
                    A.pop();
                  se(u, E), (F = Pn);
                  return;
                case "address":
                case "article":
                case "aside":
                case "blockquote":
                case "center":
                case "details":
                case "dialog":
                case "dir":
                case "div":
                case "dl":
                case "fieldset":
                case "figcaption":
                case "figure":
                case "footer":
                case "header":
                case "hgroup":
                case "main":
                case "nav":
                case "ol":
                case "p":
                case "section":
                case "summary":
                case "ul":
                  A.inButtonScope("p") && te(b, "p"), se(u, E);
                  return;
                case "menu":
                  A.inButtonScope("p") && te(b, "p"),
                    ye(A.top, "menuitem") && A.pop(),
                    se(u, E);
                  return;
                case "h1":
                case "h2":
                case "h3":
                case "h4":
                case "h5":
                case "h6":
                  A.inButtonScope("p") && te(b, "p"),
                    A.top instanceof o.HTMLHeadingElement && A.pop(),
                    se(u, E);
                  return;
                case "pre":
                case "listing":
                  A.inButtonScope("p") && te(b, "p"),
                    se(u, E),
                    (Ot = !0),
                    (Ne = !1);
                  return;
                case "form":
                  if (it && !A.contains("template")) return;
                  A.inButtonScope("p") && te(b, "p"),
                    (fe = se(u, E)),
                    A.contains("template") || (it = fe);
                  return;
                case "li":
                  for (Ne = !1, K = A.elements.length - 1; K >= 0; K--) {
                    if (((re = A.elements[K]), re instanceof o.HTMLLIElement)) {
                      te(b, "li");
                      break;
                    }
                    if (ye(re, N) && !ye(re, y)) break;
                  }
                  A.inButtonScope("p") && te(b, "p"), se(u, E);
                  return;
                case "dd":
                case "dt":
                  for (Ne = !1, K = A.elements.length - 1; K >= 0; K--) {
                    if (((re = A.elements[K]), ye(re, ne))) {
                      te(b, re.localName);
                      break;
                    }
                    if (ye(re, N) && !ye(re, y)) break;
                  }
                  A.inButtonScope("p") && te(b, "p"), se(u, E);
                  return;
                case "plaintext":
                  A.inButtonScope("p") && te(b, "p"), se(u, E), (D = Nn);
                  return;
                case "button":
                  A.inScope("button")
                    ? (te(b, "button"), F(l, u, E, O))
                    : (Oe(), se(u, E), (Ne = !1));
                  return;
                case "a":
                  var Se = le.findElementByTag("a");
                  Se && (te(b, u), le.remove(Se), A.removeElement(Se));
                case "b":
                case "big":
                case "code":
                case "em":
                case "font":
                case "i":
                case "s":
                case "small":
                case "strike":
                case "strong":
                case "tt":
                case "u":
                  Oe(), le.push(se(u, E), E);
                  return;
                case "nobr":
                  Oe(), A.inScope(u) && (te(b, u), Oe()), le.push(se(u, E), E);
                  return;
                case "applet":
                case "marquee":
                case "object":
                  Oe(), se(u, E), le.insertMarker(), (Ne = !1);
                  return;
                case "table":
                  !me._quirks && A.inButtonScope("p") && te(b, "p"),
                    se(u, E),
                    (Ne = !1),
                    (F = je);
                  return;
                case "area":
                case "br":
                case "embed":
                case "img":
                case "keygen":
                case "wbr":
                  Oe(), se(u, E), A.pop(), (Ne = !1);
                  return;
                case "input":
                  Oe(), (fe = se(u, E)), A.pop();
                  var Le = fe.getAttribute("type");
                  (!Le || Le.toLowerCase() !== "hidden") && (Ne = !1);
                  return;
                case "param":
                case "source":
                case "track":
                  se(u, E), A.pop();
                  return;
                case "hr":
                  A.inButtonScope("p") && te(b, "p"),
                    ye(A.top, "menuitem") && A.pop(),
                    se(u, E),
                    A.pop(),
                    (Ne = !1);
                  return;
                case "image":
                  te(g, "img", E, O);
                  return;
                case "textarea":
                  se(u, E), (Ot = !0), (Ne = !1), (D = vt), (nt = F), (F = jr);
                  return;
                case "xmp":
                  A.inButtonScope("p") && te(b, "p"), Oe(), (Ne = !1), Mr(u, E);
                  return;
                case "iframe":
                  (Ne = !1), Mr(u, E);
                  return;
                case "noembed":
                  Mr(u, E);
                  return;
                case "select":
                  Oe(),
                    se(u, E),
                    (Ne = !1),
                    F === je || F === On || F === qt || F === lr || F === Qt
                      ? (F = zr)
                      : (F = lt);
                  return;
                case "optgroup":
                case "option":
                  A.top instanceof o.HTMLOptionElement && te(b, "option"),
                    Oe(),
                    se(u, E);
                  return;
                case "menuitem":
                  ye(A.top, "menuitem") && A.pop(), Oe(), se(u, E);
                  return;
                case "rb":
                case "rtc":
                  A.inScope("ruby") && A.generateImpliedEndTags(), se(u, E);
                  return;
                case "rp":
                case "rt":
                  A.inScope("ruby") && A.generateImpliedEndTags("rtc"),
                    se(u, E);
                  return;
                case "math":
                  Oe(), xs(E), yn(E), Sn(u, E, s.MATHML), O && A.pop();
                  return;
                case "svg":
                  Oe(), Os(E), yn(E), Sn(u, E, s.SVG), O && A.pop();
                  return;
                case "caption":
                case "col":
                case "colgroup":
                case "frame":
                case "head":
                case "tbody":
                case "td":
                case "tfoot":
                case "th":
                case "thead":
                case "tr":
                  return;
              }
              Oe(), se(u, E);
              return;
            case 3:
              switch (u) {
                case "template":
                  Ae(b, u, E);
                  return;
                case "body":
                  if (!A.inScope("body")) return;
                  F = ei;
                  return;
                case "html":
                  if (!A.inScope("body")) return;
                  (F = ei), F(l, u, E);
                  return;
                case "address":
                case "article":
                case "aside":
                case "blockquote":
                case "button":
                case "center":
                case "details":
                case "dialog":
                case "dir":
                case "div":
                case "dl":
                case "fieldset":
                case "figcaption":
                case "figure":
                case "footer":
                case "header":
                case "hgroup":
                case "listing":
                case "main":
                case "menu":
                case "nav":
                case "ol":
                case "pre":
                case "section":
                case "summary":
                case "ul":
                  if (!A.inScope(u)) return;
                  A.generateImpliedEndTags(), A.popTag(u);
                  return;
                case "form":
                  if (A.contains("template")) {
                    if (!A.inScope("form")) return;
                    A.generateImpliedEndTags(), A.popTag("form");
                  } else {
                    var Ve = it;
                    if (((it = null), !Ve || !A.elementInScope(Ve))) return;
                    A.generateImpliedEndTags(), A.removeElement(Ve);
                  }
                  return;
                case "p":
                  A.inButtonScope(u)
                    ? (A.generateImpliedEndTags(u), A.popTag(u))
                    : (te(g, u, null), F(l, u, E, O));
                  return;
                case "li":
                  if (!A.inListItemScope(u)) return;
                  A.generateImpliedEndTags(u), A.popTag(u);
                  return;
                case "dd":
                case "dt":
                  if (!A.inScope(u)) return;
                  A.generateImpliedEndTags(u), A.popTag(u);
                  return;
                case "h1":
                case "h2":
                case "h3":
                case "h4":
                case "h5":
                case "h6":
                  if (!A.elementTypeInScope(o.HTMLHeadingElement)) return;
                  A.generateImpliedEndTags(),
                    A.popElementType(o.HTMLHeadingElement);
                  return;
                case "sarcasm":
                  break;
                case "a":
                case "b":
                case "big":
                case "code":
                case "em":
                case "font":
                case "i":
                case "nobr":
                case "s":
                case "small":
                case "strike":
                case "strong":
                case "tt":
                case "u":
                  var Ke = ao(u);
                  if (Ke) return;
                  break;
                case "applet":
                case "marquee":
                case "object":
                  if (!A.inScope(u)) return;
                  A.generateImpliedEndTags(), A.popTag(u), le.clearToMarker();
                  return;
                case "br":
                  te(g, u, null);
                  return;
              }
              for (K = A.elements.length - 1; K >= 0; K--)
                if (((re = A.elements[K]), ye(re, u))) {
                  A.generateImpliedEndTags(u), A.popElement(re);
                  break;
                } else if (ye(re, N)) return;
              return;
          }
        }
        function jr(l, u, E, O) {
          switch (l) {
            case 1:
              $e(u);
              return;
            case -1:
              A.top instanceof o.HTMLScriptElement &&
                (A.top._already_started = !0),
                A.pop(),
                (F = nt),
                F(l);
              return;
            case 3:
              u === "script" ? oo() : (A.pop(), (F = nt));
              return;
            default:
              return;
          }
        }
        function je(l, u, E, O) {
          function x(re) {
            for (var fe = 0, Se = re.length; fe < Se; fe++)
              if (re[fe][0] === "type") return re[fe][1].toLowerCase();
            return null;
          }
          switch (l) {
            case 1:
              if (En) {
                te(l, u, E, O);
                return;
              } else if (ye(A.top, ee)) {
                (Ar = []), (nt = F), (F = Yo), F(l, u, E, O);
                return;
              }
              break;
            case 4:
              Qe(u);
              return;
            case 5:
              return;
            case 2:
              switch (u) {
                case "caption":
                  A.clearToContext(L), le.insertMarker(), se(u, E), (F = On);
                  return;
                case "colgroup":
                  A.clearToContext(L), se(u, E), (F = Vr);
                  return;
                case "col":
                  je(g, "colgroup", null), F(l, u, E, O);
                  return;
                case "tbody":
                case "tfoot":
                case "thead":
                  A.clearToContext(L), se(u, E), (F = qt);
                  return;
                case "td":
                case "th":
                case "tr":
                  je(g, "tbody", null), F(l, u, E, O);
                  return;
                case "table":
                  if (!A.inTableScope(u)) return;
                  je(b, u), F(l, u, E, O);
                  return;
                case "style":
                case "script":
                case "template":
                  Ae(l, u, E, O);
                  return;
                case "input":
                  var K = x(E);
                  if (K !== "hidden") break;
                  se(u, E), A.pop();
                  return;
                case "form":
                  if (it || A.contains("template")) return;
                  (it = se(u, E)), A.popElement(it);
                  return;
              }
              break;
            case 3:
              switch (u) {
                case "table":
                  if (!A.inTableScope(u)) return;
                  A.popTag(u), ir();
                  return;
                case "body":
                case "caption":
                case "col":
                case "colgroup":
                case "html":
                case "tbody":
                case "td":
                case "tfoot":
                case "th":
                case "thead":
                case "tr":
                  return;
                case "template":
                  Ae(l, u, E, O);
                  return;
              }
              break;
            case -1:
              te(l, u, E, O);
              return;
          }
          (Et = !0), te(l, u, E, O), (Et = !1);
        }
        function Yo(l, u, E, O) {
          if (l === _) {
            if (_t && ((u = u.replace(Er, "")), u.length === 0)) return;
            Ar.push(u);
          } else {
            var x = Ar.join("");
            (Ar.length = 0),
              br.test(x) ? ((Et = !0), te(_, x), (Et = !1)) : $e(x),
              (F = nt),
              F(l, u, E, O);
          }
        }
        function On(l, u, E, O) {
          function x() {
            return A.inTableScope("caption")
              ? (A.generateImpliedEndTags(),
                A.popTag("caption"),
                le.clearToMarker(),
                (F = je),
                !0)
              : !1;
          }
          switch (l) {
            case 2:
              switch (u) {
                case "caption":
                case "col":
                case "colgroup":
                case "tbody":
                case "td":
                case "tfoot":
                case "th":
                case "thead":
                case "tr":
                  x() && F(l, u, E, O);
                  return;
              }
              break;
            case 3:
              switch (u) {
                case "caption":
                  x();
                  return;
                case "table":
                  x() && F(l, u, E, O);
                  return;
                case "body":
                case "col":
                case "colgroup":
                case "html":
                case "tbody":
                case "td":
                case "tfoot":
                case "th":
                case "thead":
                case "tr":
                  return;
              }
              break;
          }
          te(l, u, E, O);
        }
        function Vr(l, u, E, O) {
          switch (l) {
            case 1:
              var x = u.match(Ct);
              if (
                (x && ($e(x[0]), (u = u.substring(x[0].length))),
                u.length === 0)
              )
                return;
              break;
            case 4:
              Qe(u);
              return;
            case 5:
              return;
            case 2:
              switch (u) {
                case "html":
                  te(l, u, E, O);
                  return;
                case "col":
                  se(u, E), A.pop();
                  return;
                case "template":
                  Ae(l, u, E, O);
                  return;
              }
              break;
            case 3:
              switch (u) {
                case "colgroup":
                  if (!ye(A.top, "colgroup")) return;
                  A.pop(), (F = je);
                  return;
                case "col":
                  return;
                case "template":
                  Ae(l, u, E, O);
                  return;
              }
              break;
            case -1:
              te(l, u, E, O);
              return;
          }
          ye(A.top, "colgroup") && (Vr(b, "colgroup"), F(l, u, E, O));
        }
        function qt(l, u, E, O) {
          function x() {
            (!A.inTableScope("tbody") &&
              !A.inTableScope("thead") &&
              !A.inTableScope("tfoot")) ||
              (A.clearToContext(H),
              qt(b, A.top.localName, null),
              F(l, u, E, O));
          }
          switch (l) {
            case 2:
              switch (u) {
                case "tr":
                  A.clearToContext(H), se(u, E), (F = lr);
                  return;
                case "th":
                case "td":
                  qt(g, "tr", null), F(l, u, E, O);
                  return;
                case "caption":
                case "col":
                case "colgroup":
                case "tbody":
                case "tfoot":
                case "thead":
                  x();
                  return;
              }
              break;
            case 3:
              switch (u) {
                case "table":
                  x();
                  return;
                case "tbody":
                case "tfoot":
                case "thead":
                  A.inTableScope(u) && (A.clearToContext(H), A.pop(), (F = je));
                  return;
                case "body":
                case "caption":
                case "col":
                case "colgroup":
                case "html":
                case "td":
                case "th":
                case "tr":
                  return;
              }
              break;
          }
          je(l, u, E, O);
        }
        function lr(l, u, E, O) {
          function x() {
            return A.inTableScope("tr")
              ? (A.clearToContext(Q), A.pop(), (F = qt), !0)
              : !1;
          }
          switch (l) {
            case 2:
              switch (u) {
                case "th":
                case "td":
                  A.clearToContext(Q), se(u, E), (F = Qt), le.insertMarker();
                  return;
                case "caption":
                case "col":
                case "colgroup":
                case "tbody":
                case "tfoot":
                case "thead":
                case "tr":
                  x() && F(l, u, E, O);
                  return;
              }
              break;
            case 3:
              switch (u) {
                case "tr":
                  x();
                  return;
                case "table":
                  x() && F(l, u, E, O);
                  return;
                case "tbody":
                case "tfoot":
                case "thead":
                  A.inTableScope(u) && x() && F(l, u, E, O);
                  return;
                case "body":
                case "caption":
                case "col":
                case "colgroup":
                case "html":
                case "td":
                case "th":
                  return;
              }
              break;
          }
          je(l, u, E, O);
        }
        function Qt(l, u, E, O) {
          switch (l) {
            case 2:
              switch (u) {
                case "caption":
                case "col":
                case "colgroup":
                case "tbody":
                case "td":
                case "tfoot":
                case "th":
                case "thead":
                case "tr":
                  A.inTableScope("td")
                    ? (Qt(b, "td"), F(l, u, E, O))
                    : A.inTableScope("th") && (Qt(b, "th"), F(l, u, E, O));
                  return;
              }
              break;
            case 3:
              switch (u) {
                case "td":
                case "th":
                  if (!A.inTableScope(u)) return;
                  A.generateImpliedEndTags(),
                    A.popTag(u),
                    le.clearToMarker(),
                    (F = lr);
                  return;
                case "body":
                case "caption":
                case "col":
                case "colgroup":
                case "html":
                  return;
                case "table":
                case "tbody":
                case "tfoot":
                case "thead":
                case "tr":
                  if (!A.inTableScope(u)) return;
                  Qt(b, A.inTableScope("td") ? "td" : "th"), F(l, u, E, O);
                  return;
              }
              break;
          }
          te(l, u, E, O);
        }
        function lt(l, u, E, O) {
          switch (l) {
            case 1:
              if (_t && ((u = u.replace(Er, "")), u.length === 0)) return;
              $e(u);
              return;
            case 4:
              Qe(u);
              return;
            case 5:
              return;
            case -1:
              te(l, u, E, O);
              return;
            case 2:
              switch (u) {
                case "html":
                  te(l, u, E, O);
                  return;
                case "option":
                  A.top instanceof o.HTMLOptionElement && lt(b, u), se(u, E);
                  return;
                case "optgroup":
                  A.top instanceof o.HTMLOptionElement && lt(b, "option"),
                    A.top instanceof o.HTMLOptGroupElement && lt(b, u),
                    se(u, E);
                  return;
                case "select":
                  lt(b, u);
                  return;
                case "input":
                case "keygen":
                case "textarea":
                  if (!A.inSelectScope("select")) return;
                  lt(b, "select"), F(l, u, E, O);
                  return;
                case "script":
                case "template":
                  Ae(l, u, E, O);
                  return;
              }
              break;
            case 3:
              switch (u) {
                case "optgroup":
                  A.top instanceof o.HTMLOptionElement &&
                    A.elements[A.elements.length - 2] instanceof
                      o.HTMLOptGroupElement &&
                    lt(b, "option"),
                    A.top instanceof o.HTMLOptGroupElement && A.pop();
                  return;
                case "option":
                  A.top instanceof o.HTMLOptionElement && A.pop();
                  return;
                case "select":
                  if (!A.inSelectScope(u)) return;
                  A.popTag(u), ir();
                  return;
                case "template":
                  Ae(l, u, E, O);
                  return;
              }
              break;
          }
        }
        function zr(l, u, E, O) {
          switch (u) {
            case "caption":
            case "table":
            case "tbody":
            case "tfoot":
            case "thead":
            case "tr":
            case "td":
            case "th":
              switch (l) {
                case 2:
                  zr(b, "select"), F(l, u, E, O);
                  return;
                case 3:
                  A.inTableScope(u) && (zr(b, "select"), F(l, u, E, O));
                  return;
              }
          }
          lt(l, u, E, O);
        }
        function xn(l, u, E, O) {
          function x(K) {
            (F = K), (st[st.length - 1] = F), F(l, u, E, O);
          }
          switch (l) {
            case 1:
            case 4:
            case 5:
              te(l, u, E, O);
              return;
            case -1:
              A.contains("template")
                ? (A.popTag("template"),
                  le.clearToMarker(),
                  st.pop(),
                  ir(),
                  F(l, u, E, O))
                : xt();
              return;
            case 2:
              switch (u) {
                case "base":
                case "basefont":
                case "bgsound":
                case "link":
                case "meta":
                case "noframes":
                case "script":
                case "style":
                case "template":
                case "title":
                  Ae(l, u, E, O);
                  return;
                case "caption":
                case "colgroup":
                case "tbody":
                case "tfoot":
                case "thead":
                  x(je);
                  return;
                case "col":
                  x(Vr);
                  return;
                case "tr":
                  x(qt);
                  return;
                case "td":
                case "th":
                  x(lr);
                  return;
              }
              x(te);
              return;
            case 3:
              switch (u) {
                case "template":
                  Ae(l, u, E, O);
                  return;
                default:
                  return;
              }
          }
        }
        function ei(l, u, E, O) {
          switch (l) {
            case 1:
              if (br.test(u)) break;
              te(l, u);
              return;
            case 4:
              A.elements[0]._appendChild(me.createComment(u));
              return;
            case 5:
              return;
            case -1:
              xt();
              return;
            case 2:
              if (u === "html") {
                te(l, u, E, O);
                return;
              }
              break;
            case 3:
              if (u === "html") {
                if (It) return;
                F = Jo;
                return;
              }
              break;
          }
          (F = te), F(l, u, E, O);
        }
        function Pn(l, u, E, O) {
          switch (l) {
            case 1:
              (u = u.replace(_n, "")), u.length > 0 && $e(u);
              return;
            case 4:
              Qe(u);
              return;
            case 5:
              return;
            case -1:
              xt();
              return;
            case 2:
              switch (u) {
                case "html":
                  te(l, u, E, O);
                  return;
                case "frameset":
                  se(u, E);
                  return;
                case "frame":
                  se(u, E), A.pop();
                  return;
                case "noframes":
                  Ae(l, u, E, O);
                  return;
              }
              break;
            case 3:
              if (u === "frameset") {
                if (It && A.top instanceof o.HTMLHtmlElement) return;
                A.pop(),
                  !It && !(A.top instanceof o.HTMLFrameSetElement) && (F = Zo);
                return;
              }
              break;
          }
        }
        function Zo(l, u, E, O) {
          switch (l) {
            case 1:
              (u = u.replace(_n, "")), u.length > 0 && $e(u);
              return;
            case 4:
              Qe(u);
              return;
            case 5:
              return;
            case -1:
              xt();
              return;
            case 2:
              switch (u) {
                case "html":
                  te(l, u, E, O);
                  return;
                case "noframes":
                  Ae(l, u, E, O);
                  return;
              }
              break;
            case 3:
              if (u === "html") {
                F = el;
                return;
              }
              break;
          }
        }
        function Jo(l, u, E, O) {
          switch (l) {
            case 1:
              if (br.test(u)) break;
              te(l, u, E, O);
              return;
            case 4:
              me._appendChild(me.createComment(u));
              return;
            case 5:
              te(l, u, E, O);
              return;
            case -1:
              xt();
              return;
            case 2:
              if (u === "html") {
                te(l, u, E, O);
                return;
              }
              break;
          }
          (F = te), F(l, u, E, O);
        }
        function el(l, u, E, O) {
          switch (l) {
            case 1:
              (u = u.replace(_n, "")), u.length > 0 && te(l, u, E, O);
              return;
            case 4:
              me._appendChild(me.createComment(u));
              return;
            case 5:
              te(l, u, E, O);
              return;
            case -1:
              xt();
              return;
            case 2:
              switch (u) {
                case "html":
                  te(l, u, E, O);
                  return;
                case "noframes":
                  Ae(l, u, E, O);
                  return;
              }
              break;
          }
        }
        function ti(l, u, E, O) {
          function x(Se) {
            for (var Le = 0, Ve = Se.length; Le < Ve; Le++)
              switch (Se[Le][0]) {
                case "color":
                case "face":
                case "size":
                  return !0;
              }
            return !1;
          }
          var K;
          switch (l) {
            case 1:
              Ne && Xa.test(u) && (Ne = !1),
                _t && (u = u.replace(Er, "\uFFFD")),
                $e(u);
              return;
            case 4:
              Qe(u);
              return;
            case 5:
              return;
            case 2:
              switch (u) {
                case "font":
                  if (!x(E)) break;
                case "b":
                case "big":
                case "blockquote":
                case "body":
                case "br":
                case "center":
                case "code":
                case "dd":
                case "div":
                case "dl":
                case "dt":
                case "em":
                case "embed":
                case "h1":
                case "h2":
                case "h3":
                case "h4":
                case "h5":
                case "h6":
                case "head":
                case "hr":
                case "i":
                case "img":
                case "li":
                case "listing":
                case "menu":
                case "meta":
                case "nobr":
                case "ol":
                case "p":
                case "pre":
                case "ruby":
                case "s":
                case "small":
                case "span":
                case "strong":
                case "strike":
                case "sub":
                case "sup":
                case "table":
                case "tt":
                case "u":
                case "ul":
                case "var":
                  if (It) break;
                  do A.pop(), (K = A.top);
                  while (K.namespaceURI !== s.HTML && !Rs(K) && !Is(K));
                  De(l, u, E, O);
                  return;
              }
              (K = A.elements.length === 1 && It ? B : A.top),
                K.namespaceURI === s.MATHML
                  ? xs(E)
                  : K.namespaceURI === s.SVG && ((u = Za(u)), Os(E)),
                yn(E),
                Sn(u, E, K.namespaceURI),
                O && (u === "script" && (K.namespaceURI, s.SVG), A.pop());
              return;
            case 3:
              if (
                ((K = A.top),
                u === "script" &&
                  K.namespaceURI === s.SVG &&
                  K.localName === "script")
              )
                A.pop();
              else
                for (var re = A.elements.length - 1, fe = A.elements[re]; ; ) {
                  if (fe.localName.toLowerCase() === u) {
                    A.popElement(fe);
                    break;
                  }
                  if (((fe = A.elements[--re]), fe.namespaceURI === s.HTML)) {
                    F(l, u, E, O);
                    break;
                  }
                }
              return;
          }
        }
        return (
          (Dr.testTokenizer = function (l, u, E, O) {
            var x = [];
            switch (u) {
              case "PCDATA state":
                D = he;
                break;
              case "RCDATA state":
                D = vt;
                break;
              case "RAWTEXT state":
                D = ar;
                break;
              case "PLAINTEXT state":
                D = Nn;
                break;
            }
            if (
              (E && (Tr = E),
              (De = function (re, fe, Se, Le) {
                switch ((Wt(), re)) {
                  case 1:
                    x.length > 0 && x[x.length - 1][0] === "Character"
                      ? (x[x.length - 1][1] += fe)
                      : x.push(["Character", fe]);
                    break;
                  case 4:
                    x.push(["Comment", fe]);
                    break;
                  case 5:
                    x.push([
                      "DOCTYPE",
                      fe,
                      Se === void 0 ? null : Se,
                      Le === void 0 ? null : Le,
                      !bn,
                    ]);
                    break;
                  case 2:
                    for (
                      var Ve = Object.create(null), Ke = 0;
                      Ke < Se.length;
                      Ke++
                    ) {
                      var Ft = Se[Ke];
                      Ft.length === 1 ? (Ve[Ft[0]] = "") : (Ve[Ft[0]] = Ft[1]);
                    }
                    var At = ["StartTag", fe, Ve];
                    Le && At.push(!0), x.push(At);
                    break;
                  case 3:
                    x.push(["EndTag", fe]);
                    break;
                  case -1:
                    break;
                }
              }),
              !O)
            )
              this.parse(l, !0);
            else {
              for (var K = 0; K < l.length; K++) this.parse(l[K]);
              this.parse("", !0);
            }
            return x;
          }),
          Dr
        );
      }
    },
  }),
  mn = J({
    "external/npm/node_modules/domino/lib/DOMImplementation.js"(a, e) {
      "use strict";
      e.exports = o;
      var t = As(),
        r = Ds(),
        n = ks(),
        s = ke(),
        i = Es();
      function o(c) {
        this.contextObject = c;
      }
      var h = {
        xml: { "": !0, "1.0": !0, "2.0": !0 },
        core: { "": !0, "2.0": !0 },
        html: { "": !0, "1.0": !0, "2.0": !0 },
        xhtml: { "": !0, "1.0": !0, "2.0": !0 },
      };
      o.prototype = {
        hasFeature: function (_, g) {
          var b = h[(_ || "").toLowerCase()];
          return (b && b[g || ""]) || !1;
        },
        createDocumentType: function (_, g, b) {
          return (
            i.isValidQName(_) || s.InvalidCharacterError(),
            new r(this.contextObject, _, g, b)
          );
        },
        createDocument: function (_, g, b) {
          var C = new t(!1, null),
            I;
          return (
            g ? (I = C.createElementNS(_, g)) : (I = null),
            b && C.appendChild(b),
            I && C.appendChild(I),
            _ === s.NAMESPACE.HTML
              ? (C._contentType = "application/xhtml+xml")
              : _ === s.NAMESPACE.SVG
                ? (C._contentType = "image/svg+xml")
                : (C._contentType = "application/xml"),
            C
          );
        },
        createHTMLDocument: function (_) {
          var g = new t(!0, null);
          g.appendChild(new r(g, "html"));
          var b = g.createElement("html");
          g.appendChild(b);
          var C = g.createElement("head");
          if ((b.appendChild(C), _ !== void 0)) {
            var I = g.createElement("title");
            C.appendChild(I), I.appendChild(g.createTextNode(_));
          }
          return b.appendChild(g.createElement("body")), (g.modclock = 1), g;
        },
        mozSetOutputMutationHandler: function (c, _) {
          c.mutationHandler = _;
        },
        mozGetInputMutationHandler: function (c) {
          s.nyi();
        },
        mozHTMLParser: n,
      };
    },
  }),
  Vc = J({
    "external/npm/node_modules/domino/lib/Location.js"(a, e) {
      "use strict";
      var t = Ss(),
        r = Ra();
      e.exports = n;
      function n(s, i) {
        (this._window = s), (this._href = i);
      }
      n.prototype = Object.create(r.prototype, {
        constructor: { value: n },
        href: {
          get: function () {
            return this._href;
          },
          set: function (s) {
            this.assign(s);
          },
        },
        assign: {
          value: function (s) {
            var i = new t(this._href),
              o = i.resolve(s);
            this._href = o;
          },
        },
        replace: {
          value: function (s) {
            this.assign(s);
          },
        },
        reload: {
          value: function () {
            this.assign(this.href);
          },
        },
        toString: {
          value: function () {
            return this.href;
          },
        },
      });
    },
  }),
  zc = J({
    "external/npm/node_modules/domino/lib/NavigatorID.js"(a, e) {
      "use strict";
      var t = Object.create(null, {
        appCodeName: { value: "Mozilla" },
        appName: { value: "Netscape" },
        appVersion: { value: "4.0" },
        platform: { value: "" },
        product: { value: "Gecko" },
        productSub: { value: "20100101" },
        userAgent: { value: "" },
        vendor: { value: "" },
        vendorSub: { value: "" },
        taintEnabled: {
          value: function () {
            return !1;
          },
        },
      });
      e.exports = t;
    },
  }),
  Gc = J({
    "external/npm/node_modules/domino/lib/WindowTimers.js"(a, e) {
      "use strict";
      var t = { setTimeout, clearTimeout, setInterval, clearInterval };
      e.exports = t;
    },
  }),
  xa = J({
    "external/npm/node_modules/domino/lib/impl.js"(a, e) {
      "use strict";
      var t = ke();
      (a = e.exports =
        {
          CSSStyleDeclaration: ws(),
          CharacterData: dn(),
          Comment: Da(),
          DOMException: _s(),
          DOMImplementation: mn(),
          DOMTokenList: Ta(),
          Document: As(),
          DocumentFragment: ka(),
          DocumentType: Ds(),
          Element: yr(),
          HTMLParser: ks(),
          NamedNodeMap: wa(),
          Node: Re(),
          NodeList: Zt(),
          NodeFilter: pn(),
          ProcessingInstruction: Ca(),
          Text: Aa(),
          Window: Pa(),
        }),
        t.merge(a, Ma()),
        t.merge(a, Ns().elements),
        t.merge(a, Oa().elements);
    },
  }),
  Pa = J({
    "external/npm/node_modules/domino/lib/Window.js"(a, e) {
      "use strict";
      var t = mn(),
        r = ya(),
        n = Vc(),
        s = ke();
      e.exports = i;
      function i(o) {
        (this.document = o || new t(null).createHTMLDocument("")),
          (this.document._scripting_enabled = !0),
          (this.document.defaultView = this),
          (this.location = new n(
            this,
            this.document._address || "about:blank"
          ));
      }
      (i.prototype = Object.create(r.prototype, {
        console: { value: console },
        history: { value: { back: s.nyi, forward: s.nyi, go: s.nyi } },
        navigator: { value: zc() },
        window: {
          get: function () {
            return this;
          },
        },
        self: {
          get: function () {
            return this;
          },
        },
        frames: {
          get: function () {
            return this;
          },
        },
        parent: {
          get: function () {
            return this;
          },
        },
        top: {
          get: function () {
            return this;
          },
        },
        length: { value: 0 },
        frameElement: { value: null },
        opener: { value: null },
        onload: {
          get: function () {
            return this._getEventHandler("load");
          },
          set: function (o) {
            this._setEventHandler("load", o);
          },
        },
        getComputedStyle: {
          value: function (h) {
            return h.style;
          },
        },
      })),
        s.expose(Gc(), i),
        s.expose(xa(), i);
    },
  }),
  Kc = J({
    "external/npm/node_modules/domino/lib/index.js"(a) {
      var e = mn(),
        t = ks(),
        r = Pa(),
        n = xa();
      (a.createDOMImplementation = function () {
        return new e(null);
      }),
        (a.createDocument = function (s, i) {
          if (s || i) {
            var o = new t();
            return o.parse(s || "", !0), o.document();
          }
          return new e(null).createHTMLDocument("");
        }),
        (a.createIncrementalHTMLParser = function () {
          var s = new t();
          return {
            write: function (i) {
              i.length > 0 &&
                s.parse(i, !1, function () {
                  return !0;
                });
            },
            end: function (i) {
              s.parse(i || "", !0, function () {
                return !0;
              });
            },
            process: function (i) {
              return s.parse("", !1, i);
            },
            document: function () {
              return s.document();
            },
          };
        }),
        (a.createWindow = function (s, i) {
          var o = a.createDocument(s);
          return i !== void 0 && (o._address = i), new n.Window(o);
        }),
        (a.impl = n);
    },
  }),
  fn = Kc();
function Wc() {
  Object.assign(globalThis, fn.impl),
    (globalThis.KeyboardEvent = fn.impl.Event);
}
function Ha(a, e = "/") {
  return fn.createWindow(a, e).document;
}
function Qc(a) {
  return a.serialize();
}
var gs = class a extends Ri {
    constructor() {
      super(...arguments), (this.supportsDOMEvents = !1);
    }
    static makeCurrent() {
      Wc(), Ai(new a());
    }
    createHtmlDocument() {
      return Ha(
        "<html><head><title>fakeTitle</title></head><body></body></html>"
      );
    }
    getDefaultDocument() {
      return a.defaultDoc || (a.defaultDoc = fn.createDocument()), a.defaultDoc;
    }
    isElementNode(e) {
      return e ? e.nodeType === a.defaultDoc.ELEMENT_NODE : !1;
    }
    isShadowRoot(e) {
      return e.shadowRoot == e;
    }
    getGlobalEventTarget(e, t) {
      return t === "window"
        ? e.defaultView
        : t === "document"
          ? e
          : t === "body"
            ? e.body
            : null;
    }
    getBaseHref(e) {
      return (
        e.documentElement.querySelector("base")?.getAttribute("href") || ""
      );
    }
    dispatchEvent(e, t) {
      e.dispatchEvent(t);
      let n = (e.ownerDocument || e).defaultView;
      n && n.dispatchEvent(t);
    }
    getUserAgent() {
      return "Fake user agent";
    }
    getCookie(e) {
      throw new Error("getCookie has not been implemented");
    }
  },
  qa = (() => {
    class a {
      constructor(t) {
        this._doc = t;
      }
      renderToString() {
        return Qc(this._doc);
      }
      getDocument() {
        return this._doc;
      }
      static {
        this.ɵfac = function (r) {
          return new (r || a)(ut(Ze));
        };
      }
      static {
        this.ɵprov = ct({ token: a, factory: a.ɵfac });
      }
    }
    return a;
  })(),
  $c = (() => {
    class a {
      ɵloadImpl() {
        return $t(this, null, function* () {
          if (!this.xhrImpl) {
            let { default: t } = yield import("./chunk-VCVCHJZV.mjs");
            this.xhrImpl = t;
          }
        });
      }
      build() {
        let t = this.xhrImpl;
        if (!t)
          throw new Error(
            "Unexpected state in ServerXhr: XHR implementation is not loaded."
          );
        return new t.XMLHttpRequest();
      }
      static {
        this.ɵfac = function (r) {
          return new (r || a)();
        };
      }
      static {
        this.ɵprov = ct({ token: a, factory: a.ɵfac });
      }
    }
    return a;
  })();
function Xc(a, e) {
  let t = si(Fn),
    { href: r, protocol: n, hostname: s, port: i } = t;
  if (!n.startsWith("http")) return e(a);
  let o = `${n}//${s}`;
  i && (o += `:${i}`);
  let h = t.getBaseHrefFromDOM() || r,
    c = new URL(h, o),
    _ = new URL(a.url, c).toString();
  return e(a.clone({ url: _ }));
}
var Yc = [
    { provide: Li, useClass: $c },
    { provide: Mi, useValue: Xc, multi: !0 },
  ],
  gn = new Kr("Server.INITIAL_CONFIG"),
  Fa = new Kr("Server.RENDER_MODULE_HOOK"),
  da = "resolve:";
function pa(a) {
  let {
    hostname: e,
    protocol: t,
    port: r,
    pathname: n,
    search: s,
    hash: i,
  } = new URL(a, da + "//");
  return {
    hostname: e,
    protocol: t === da ? "" : t,
    port: r,
    pathname: n,
    search: s,
    hash: i,
  };
}
var Zc = (() => {
    class a {
      constructor(t, r) {
        (this._doc = t),
          (this.href = "/"),
          (this.hostname = "/"),
          (this.protocol = "/"),
          (this.port = "/"),
          (this.pathname = "/"),
          (this.search = ""),
          (this.hash = ""),
          (this._hashUpdate = new ni());
        let n = r;
        if (n && n.url) {
          let s = pa(n.url);
          (this.protocol = s.protocol),
            (this.hostname = s.hostname),
            (this.port = s.port),
            (this.pathname = s.pathname),
            (this.search = s.search),
            (this.hash = s.hash),
            (this.href = t.location.href);
        }
      }
      getBaseHrefFromDOM() {
        return Wr().getBaseHref(this._doc);
      }
      onPopState(t) {
        return () => {};
      }
      onHashChange(t) {
        let r = this._hashUpdate.subscribe(t);
        return () => r.unsubscribe();
      }
      get url() {
        return `${this.pathname}${this.search}${this.hash}`;
      }
      setHash(t, r) {
        if (this.hash === t) return;
        this.hash = t;
        let n = this.url;
        queueMicrotask(() =>
          this._hashUpdate.next({
            type: "hashchange",
            state: null,
            oldUrl: r,
            newUrl: n,
          })
        );
      }
      replaceState(t, r, n) {
        let s = this.url,
          i = pa(n);
        (this.pathname = i.pathname),
          (this.search = i.search),
          this.setHash(i.hash, s);
      }
      pushState(t, r, n) {
        this.replaceState(t, r, n);
      }
      forward() {
        throw new Error("Not implemented");
      }
      back() {
        throw new Error("Not implemented");
      }
      getState() {}
      static {
        this.ɵfac = function (r) {
          return new (r || a)(ut(Ze), ut(gn, 8));
        };
      }
      static {
        this.ɵprov = ct({ token: a, factory: a.ɵfac });
      }
    }
    return a;
  })(),
  Jc = (() => {
    class a extends Oi {
      constructor(t) {
        super(t), (this.doc = t);
      }
      supports(t) {
        return !0;
      }
      addEventListener(t, r, n) {
        return Wr().onAndCancel(t, r, n);
      }
      static {
        this.ɵfac = function (r) {
          return new (r || a)(ut(Ze));
        };
      }
      static {
        this.ɵprov = ct({ token: a, factory: a.ɵfac });
      }
    }
    return a;
  })(),
  eu = [{ provide: Fa, useFactory: tu, deps: [Ze, Hn, di], multi: !0 }];
function Ba(a, e, t) {
  let r = a.createElement("script");
  return (r.textContent = e), t && r.setAttribute("nonce", t), r;
}
function tu(a, e, t) {
  return () => {
    let r = t.toJson();
    if (t.isEmpty) return;
    let n = Ba(a, r, null);
    (n.id = e + "-state"),
      n.setAttribute("type", "application/json"),
      a.body.appendChild(n);
  };
}
var ru = [
  { provide: Ze, useFactory: au, deps: [oi] },
  { provide: hi, useValue: Di },
  { provide: ui, useFactory: nu, multi: !0 },
  { provide: Fn, useClass: Zc, deps: [Ze, [ii, gn]] },
  { provide: qa, deps: [Ze] },
  { provide: Ti, useValue: !0 },
];
function nu() {
  return () => {
    gs.makeCurrent();
  };
}
var su = [{ provide: Ii, multi: !0, useClass: Jc }],
  iu = [
    eu,
    su,
    Yc,
    { provide: bi, useValue: null },
    { provide: yi, useValue: null },
    { provide: ki, useClass: Ci },
  ];
function au(a) {
  let e = a.get(gn, null),
    t;
  return (
    e && e.document
      ? (t = typeof e.document == "string" ? Ha(e.document, e.url) : e.document)
      : (t = Wr().createHtmlDocument()),
    ci(t),
    t
  );
}
var ou = Si(wi, "server", ru);
function Ku() {
  return ai([fa(), ...iu]);
}
var lu = "\u{1F170}\uFE0F",
  cu = !1;
function uu(a, e) {
  if (!cu) return e();
  let t = `${lu}:${a}`,
    r = `start:${t}`,
    n = `end:${t}`,
    s = () => {
      performance.mark(n),
        performance.measure(t, r, n),
        performance.clearMarks(r),
        performance.clearMarks(n);
    };
  performance.mark(r);
  let i = e();
  return i instanceof Promise ? i.finally(() => s()) : (s(), i);
}
var hu = "ng-event-dispatch-contract";
function Ua(a) {
  let e = a.platformProviders ?? [];
  return ou([
    { provide: gn, useValue: { document: a.document, url: a.url } },
    e,
  ]);
}
function ja(a) {
  return a.getElementById(hu);
}
function ma(a) {
  ja(a)?.remove();
}
function fu(a, e) {
  let t = e.injector,
    r = a.getDocument();
  if (!t.get(mi, !1)) {
    ma(r);
    return;
  }
  du(r);
  let n = Ni(e, r);
  n.regular.size || n.capture.size
    ? mu(t.get(Hn), r, n, t.get(fi, null))
    : ma(r);
}
function du(a) {
  let e = a.createComment(pi);
  a.body.firstChild
    ? a.body.insertBefore(e, a.body.firstChild)
    : a.body.append(e);
}
function pu(a) {
  let e = a.injector,
    t = _u(e.get(gu, Ga));
  a.components.forEach((r) => {
    let n = r.injector.get(_i),
      s = r.location.nativeElement;
    s && n.setAttribute(s, "ng-server-context", t);
  });
}
function mu(a, e, t, r) {
  let { regular: n, capture: s } = t,
    i = ja(e);
  if (i) {
    let o = `window.__jsaction_bootstrap(document.body,"${a}",${JSON.stringify(Array.from(n))},${JSON.stringify(Array.from(s))});`,
      h = Ba(e, o, r);
    i.after(h);
  }
}
function Va(a, e) {
  return $t(this, null, function* () {
    yield vi(e);
    let t = a.injector.get(qa);
    fu(t, e);
    let n = e.injector.get(Fa, null);
    if (n) {
      let s = [];
      for (let i of n)
        try {
          let o = i();
          o && s.push(o);
        } catch (o) {
          console.warn("Ignoring BEFORE_APP_SERIALIZED Exception: ", o);
        }
      if (s.length)
        for (let i of yield Promise.allSettled(s))
          i.status === "rejected" &&
            console.warn(
              "Ignoring BEFORE_APP_SERIALIZED Exception: ",
              i.reason
            );
    }
    return pu(e), t.renderToString();
  });
}
function za(a) {
  return new Promise((e) => {
    setTimeout(() => {
      a.destroy(), e();
    }, 0);
  });
}
var Ga = "other",
  gu = new Kr("SERVER_CONTEXT");
function _u(a) {
  let e = a.replace(/[^a-zA-Z0-9\-]/g, "");
  return e.length > 0 ? e : Ga;
}
function Wu(a, e) {
  return $t(this, null, function* () {
    let { document: t, url: r, extraProviders: n } = e,
      s = Ua({ document: t, url: r, platformProviders: n });
    try {
      let o = (yield s.bootstrapModule(a)).injector.get(Ei);
      return yield Va(s, o);
    } finally {
      yield za(s);
    }
  });
}
function Qu(a, e) {
  return $t(this, null, function* () {
    return uu("renderApplication", () =>
      $t(this, null, function* () {
        let t = Ua(e);
        try {
          let r = yield a();
          return yield Va(t, r);
        } finally {
          yield za(t);
        }
      })
    );
  });
}
export { gn as a, ru as b, Ku as c, gu as d, Wu as e, Qu as f };
