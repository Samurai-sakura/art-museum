import { createRequire } from "node:module";
globalThis["require"] ??= createRequire(import.meta.url);
var zr = ((b) =>
  typeof require < "u"
    ? require
    : typeof Proxy < "u"
      ? new Proxy(b, { get: (v, h) => (typeof require < "u" ? require : v)[h] })
      : b)(function (b) {
  if (typeof require < "u") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + b + '" is not supported');
});
var ct = globalThis;
function lt(b) {
  return (ct.__Zone_symbol_prefix || "__zone_symbol__") + b;
}
function Ui() {
  let b = ct.performance;
  function v(p) {
    b && b.mark && b.mark(p);
  }
  function h(p, d) {
    b && b.measure && b.measure(p, d);
  }
  v("Zone");
  class s {
    static {
      this.__symbol__ = lt;
    }
    static assertZonePatched() {
      if (ct.Promise !== D.ZoneAwarePromise)
        throw new Error(
          "Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)"
        );
    }
    static get root() {
      let d = s.current;
      for (; d.parent; ) d = d.parent;
      return d;
    }
    static get current() {
      return Z.zone;
    }
    static get currentTask() {
      return u;
    }
    static __load_patch(d, T, C = !1) {
      if (D.hasOwnProperty(d)) {
        let j = ct[lt("forceDuplicateZoneCheck")] === !0;
        if (!C && j) throw Error("Already loaded patch: " + d);
      } else if (!ct["__Zone_disable_" + d]) {
        let j = "Zone:" + d;
        v(j), (D[d] = T(ct, s, P)), h(j, j);
      }
    }
    get parent() {
      return this._parent;
    }
    get name() {
      return this._name;
    }
    constructor(d, T) {
      (this._parent = d),
        (this._name = T ? T.name || "unnamed" : "<root>"),
        (this._properties = (T && T.properties) || {}),
        (this._zoneDelegate = new a(
          this,
          this._parent && this._parent._zoneDelegate,
          T
        ));
    }
    get(d) {
      let T = this.getZoneWith(d);
      if (T) return T._properties[d];
    }
    getZoneWith(d) {
      let T = this;
      for (; T; ) {
        if (T._properties.hasOwnProperty(d)) return T;
        T = T._parent;
      }
      return null;
    }
    fork(d) {
      if (!d) throw new Error("ZoneSpec required!");
      return this._zoneDelegate.fork(this, d);
    }
    wrap(d, T) {
      if (typeof d != "function")
        throw new Error("Expecting function got: " + d);
      let C = this._zoneDelegate.intercept(this, d, T),
        j = this;
      return function () {
        return j.runGuarded(C, this, arguments, T);
      };
    }
    run(d, T, C, j) {
      Z = { parent: Z, zone: this };
      try {
        return this._zoneDelegate.invoke(this, d, T, C, j);
      } finally {
        Z = Z.parent;
      }
    }
    runGuarded(d, T = null, C, j) {
      Z = { parent: Z, zone: this };
      try {
        try {
          return this._zoneDelegate.invoke(this, d, T, C, j);
        } catch (re) {
          if (this._zoneDelegate.handleError(this, re)) throw re;
        }
      } finally {
        Z = Z.parent;
      }
    }
    runTask(d, T, C) {
      if (d.zone != this)
        throw new Error(
          "A task can only be run in the zone of creation! (Creation: " +
            (d.zone || J).name +
            "; Execution: " +
            this.name +
            ")"
        );
      let j = d,
        { type: re, data: { isPeriodic: S = !1, isRefreshable: A = !1 } = {} } =
          d;
      if (d.state === B && (re === G || re === Y)) return;
      let K = d.state != k;
      K && j._transitionTo(k, g);
      let ge = u;
      (u = j), (Z = { parent: Z, zone: this });
      try {
        re == Y && d.data && !S && !A && (d.cancelFn = void 0);
        try {
          return this._zoneDelegate.invokeTask(this, j, T, C);
        } catch (Me) {
          if (this._zoneDelegate.handleError(this, Me)) throw Me;
        }
      } finally {
        let Me = d.state;
        if (Me !== B && Me !== ae)
          if (re == G || S || (A && Me === y)) K && j._transitionTo(g, k, y);
          else {
            let bt = j._zoneDelegates;
            this._updateTaskCount(j, -1),
              K && j._transitionTo(B, k, B),
              A && (j._zoneDelegates = bt);
          }
        (Z = Z.parent), (u = ge);
      }
    }
    scheduleTask(d) {
      if (d.zone && d.zone !== this) {
        let C = this;
        for (; C; ) {
          if (C === d.zone)
            throw Error(
              `can not reschedule task to ${this.name} which is descendants of the original zone ${d.zone.name}`
            );
          C = C.parent;
        }
      }
      d._transitionTo(y, B);
      let T = [];
      (d._zoneDelegates = T), (d._zone = this);
      try {
        d = this._zoneDelegate.scheduleTask(this, d);
      } catch (C) {
        throw (
          (d._transitionTo(ae, y, B),
          this._zoneDelegate.handleError(this, C),
          C)
        );
      }
      return (
        d._zoneDelegates === T && this._updateTaskCount(d, 1),
        d.state == y && d._transitionTo(g, y),
        d
      );
    }
    scheduleMicroTask(d, T, C, j) {
      return this.scheduleTask(new c(ne, d, T, C, j, void 0));
    }
    scheduleMacroTask(d, T, C, j, re) {
      return this.scheduleTask(new c(Y, d, T, C, j, re));
    }
    scheduleEventTask(d, T, C, j, re) {
      return this.scheduleTask(new c(G, d, T, C, j, re));
    }
    cancelTask(d) {
      if (d.zone != this)
        throw new Error(
          "A task can only be cancelled in the zone of creation! (Creation: " +
            (d.zone || J).name +
            "; Execution: " +
            this.name +
            ")"
        );
      if (!(d.state !== g && d.state !== k)) {
        d._transitionTo(_, g, k);
        try {
          this._zoneDelegate.cancelTask(this, d);
        } catch (T) {
          throw (
            (d._transitionTo(ae, _), this._zoneDelegate.handleError(this, T), T)
          );
        }
        return (
          this._updateTaskCount(d, -1),
          d._transitionTo(B, _),
          (d.runCount = -1),
          d
        );
      }
    }
    _updateTaskCount(d, T) {
      let C = d._zoneDelegates;
      T == -1 && (d._zoneDelegates = null);
      for (let j = 0; j < C.length; j++) C[j]._updateTaskCount(d.type, T);
    }
  }
  let t = {
    name: "",
    onHasTask: (p, d, T, C) => p.hasTask(T, C),
    onScheduleTask: (p, d, T, C) => p.scheduleTask(T, C),
    onInvokeTask: (p, d, T, C, j, re) => p.invokeTask(T, C, j, re),
    onCancelTask: (p, d, T, C) => p.cancelTask(T, C),
  };
  class a {
    get zone() {
      return this._zone;
    }
    constructor(d, T, C) {
      (this._taskCounts = { microTask: 0, macroTask: 0, eventTask: 0 }),
        (this._zone = d),
        (this._parentDelegate = T),
        (this._forkZS = C && (C && C.onFork ? C : T._forkZS)),
        (this._forkDlgt = C && (C.onFork ? T : T._forkDlgt)),
        (this._forkCurrZone = C && (C.onFork ? this._zone : T._forkCurrZone)),
        (this._interceptZS = C && (C.onIntercept ? C : T._interceptZS)),
        (this._interceptDlgt = C && (C.onIntercept ? T : T._interceptDlgt)),
        (this._interceptCurrZone =
          C && (C.onIntercept ? this._zone : T._interceptCurrZone)),
        (this._invokeZS = C && (C.onInvoke ? C : T._invokeZS)),
        (this._invokeDlgt = C && (C.onInvoke ? T : T._invokeDlgt)),
        (this._invokeCurrZone =
          C && (C.onInvoke ? this._zone : T._invokeCurrZone)),
        (this._handleErrorZS = C && (C.onHandleError ? C : T._handleErrorZS)),
        (this._handleErrorDlgt =
          C && (C.onHandleError ? T : T._handleErrorDlgt)),
        (this._handleErrorCurrZone =
          C && (C.onHandleError ? this._zone : T._handleErrorCurrZone)),
        (this._scheduleTaskZS =
          C && (C.onScheduleTask ? C : T._scheduleTaskZS)),
        (this._scheduleTaskDlgt =
          C && (C.onScheduleTask ? T : T._scheduleTaskDlgt)),
        (this._scheduleTaskCurrZone =
          C && (C.onScheduleTask ? this._zone : T._scheduleTaskCurrZone)),
        (this._invokeTaskZS = C && (C.onInvokeTask ? C : T._invokeTaskZS)),
        (this._invokeTaskDlgt = C && (C.onInvokeTask ? T : T._invokeTaskDlgt)),
        (this._invokeTaskCurrZone =
          C && (C.onInvokeTask ? this._zone : T._invokeTaskCurrZone)),
        (this._cancelTaskZS = C && (C.onCancelTask ? C : T._cancelTaskZS)),
        (this._cancelTaskDlgt = C && (C.onCancelTask ? T : T._cancelTaskDlgt)),
        (this._cancelTaskCurrZone =
          C && (C.onCancelTask ? this._zone : T._cancelTaskCurrZone)),
        (this._hasTaskZS = null),
        (this._hasTaskDlgt = null),
        (this._hasTaskDlgtOwner = null),
        (this._hasTaskCurrZone = null);
      let j = C && C.onHasTask,
        re = T && T._hasTaskZS;
      (j || re) &&
        ((this._hasTaskZS = j ? C : t),
        (this._hasTaskDlgt = T),
        (this._hasTaskDlgtOwner = this),
        (this._hasTaskCurrZone = this._zone),
        C.onScheduleTask ||
          ((this._scheduleTaskZS = t),
          (this._scheduleTaskDlgt = T),
          (this._scheduleTaskCurrZone = this._zone)),
        C.onInvokeTask ||
          ((this._invokeTaskZS = t),
          (this._invokeTaskDlgt = T),
          (this._invokeTaskCurrZone = this._zone)),
        C.onCancelTask ||
          ((this._cancelTaskZS = t),
          (this._cancelTaskDlgt = T),
          (this._cancelTaskCurrZone = this._zone)));
    }
    fork(d, T) {
      return this._forkZS
        ? this._forkZS.onFork(this._forkDlgt, this.zone, d, T)
        : new s(d, T);
    }
    intercept(d, T, C) {
      return this._interceptZS
        ? this._interceptZS.onIntercept(
            this._interceptDlgt,
            this._interceptCurrZone,
            d,
            T,
            C
          )
        : T;
    }
    invoke(d, T, C, j, re) {
      return this._invokeZS
        ? this._invokeZS.onInvoke(
            this._invokeDlgt,
            this._invokeCurrZone,
            d,
            T,
            C,
            j,
            re
          )
        : T.apply(C, j);
    }
    handleError(d, T) {
      return this._handleErrorZS
        ? this._handleErrorZS.onHandleError(
            this._handleErrorDlgt,
            this._handleErrorCurrZone,
            d,
            T
          )
        : !0;
    }
    scheduleTask(d, T) {
      let C = T;
      if (this._scheduleTaskZS)
        this._hasTaskZS && C._zoneDelegates.push(this._hasTaskDlgtOwner),
          (C = this._scheduleTaskZS.onScheduleTask(
            this._scheduleTaskDlgt,
            this._scheduleTaskCurrZone,
            d,
            T
          )),
          C || (C = T);
      else if (T.scheduleFn) T.scheduleFn(T);
      else if (T.type == ne) H(T);
      else throw new Error("Task is missing scheduleFn.");
      return C;
    }
    invokeTask(d, T, C, j) {
      return this._invokeTaskZS
        ? this._invokeTaskZS.onInvokeTask(
            this._invokeTaskDlgt,
            this._invokeTaskCurrZone,
            d,
            T,
            C,
            j
          )
        : T.callback.apply(C, j);
    }
    cancelTask(d, T) {
      let C;
      if (this._cancelTaskZS)
        C = this._cancelTaskZS.onCancelTask(
          this._cancelTaskDlgt,
          this._cancelTaskCurrZone,
          d,
          T
        );
      else {
        if (!T.cancelFn) throw Error("Task is not cancelable");
        C = T.cancelFn(T);
      }
      return C;
    }
    hasTask(d, T) {
      try {
        this._hasTaskZS &&
          this._hasTaskZS.onHasTask(
            this._hasTaskDlgt,
            this._hasTaskCurrZone,
            d,
            T
          );
      } catch (C) {
        this.handleError(d, C);
      }
    }
    _updateTaskCount(d, T) {
      let C = this._taskCounts,
        j = C[d],
        re = (C[d] = j + T);
      if (re < 0) throw new Error("More tasks executed then were scheduled.");
      if (j == 0 || re == 0) {
        let S = {
          microTask: C.microTask > 0,
          macroTask: C.macroTask > 0,
          eventTask: C.eventTask > 0,
          change: d,
        };
        this.hasTask(this._zone, S);
      }
    }
  }
  class c {
    constructor(d, T, C, j, re, S) {
      if (
        ((this._zone = null),
        (this.runCount = 0),
        (this._zoneDelegates = null),
        (this._state = "notScheduled"),
        (this.type = d),
        (this.source = T),
        (this.data = j),
        (this.scheduleFn = re),
        (this.cancelFn = S),
        !C)
      )
        throw new Error("callback is not defined");
      this.callback = C;
      let A = this;
      d === G && j && j.useG
        ? (this.invoke = c.invokeTask)
        : (this.invoke = function () {
            return c.invokeTask.call(ct, A, this, arguments);
          });
    }
    static invokeTask(d, T, C) {
      d || (d = this), o++;
      try {
        return d.runCount++, d.zone.runTask(d, T, C);
      } finally {
        o == 1 && R(), o--;
      }
    }
    get zone() {
      return this._zone;
    }
    get state() {
      return this._state;
    }
    cancelScheduleRequest() {
      this._transitionTo(B, y);
    }
    _transitionTo(d, T, C) {
      if (this._state === T || this._state === C)
        (this._state = d), d == B && (this._zoneDelegates = null);
      else
        throw new Error(
          `${this.type} '${this.source}': can not transition to '${d}', expecting state '${T}'${C ? " or '" + C + "'" : ""}, was '${this._state}'.`
        );
    }
    toString() {
      return this.data && typeof this.data.handleId < "u"
        ? this.data.handleId.toString()
        : Object.prototype.toString.call(this);
    }
    toJSON() {
      return {
        type: this.type,
        state: this.state,
        source: this.source,
        zone: this.zone.name,
        runCount: this.runCount,
      };
    }
  }
  let l = lt("setTimeout"),
    f = lt("Promise"),
    i = lt("then"),
    E = [],
    m = !1,
    w;
  function I(p) {
    if ((w || (ct[f] && (w = ct[f].resolve(0))), w)) {
      let d = w[i];
      d || (d = w.then), d.call(w, p);
    } else ct[l](p, 0);
  }
  function H(p) {
    o === 0 && E.length === 0 && I(R), p && E.push(p);
  }
  function R() {
    if (!m) {
      for (m = !0; E.length; ) {
        let p = E;
        E = [];
        for (let d = 0; d < p.length; d++) {
          let T = p[d];
          try {
            T.zone.runTask(T, null, null);
          } catch (C) {
            P.onUnhandledError(C);
          }
        }
      }
      P.microtaskDrainDone(), (m = !1);
    }
  }
  let J = { name: "NO ZONE" },
    B = "notScheduled",
    y = "scheduling",
    g = "scheduled",
    k = "running",
    _ = "canceling",
    ae = "unknown",
    ne = "microTask",
    Y = "macroTask",
    G = "eventTask",
    D = {},
    P = {
      symbol: lt,
      currentZoneFrame: () => Z,
      onUnhandledError: n,
      microtaskDrainDone: n,
      scheduleMicroTask: H,
      showUncaughtError: () => !s[lt("ignoreConsoleErrorUncaughtError")],
      patchEventTarget: () => [],
      patchOnProperties: n,
      patchMethod: () => n,
      bindArguments: () => [],
      patchThen: () => n,
      patchMacroTask: () => n,
      patchEventPrototype: () => n,
      isIEOrEdge: () => !1,
      getGlobalObjects: () => {},
      ObjectDefineProperty: () => n,
      ObjectGetOwnPropertyDescriptor: () => {},
      ObjectCreate: () => {},
      ArraySlice: () => [],
      patchClass: () => n,
      wrapWithCurrentZone: () => n,
      filterProperties: () => [],
      attachOriginToPatched: () => n,
      _redefineProperty: () => n,
      patchCallbacks: () => n,
      nativeScheduleMicroTask: I,
    },
    Z = { parent: null, zone: new s(null, null) },
    u = null,
    o = 0;
  function n() {}
  return h("Zone", "Zone"), s;
}
var yn = Object.getOwnPropertyDescriptor,
  Fi = Object.defineProperty,
  sa = Object.getPrototypeOf,
  ji = Array.prototype.slice,
  Vi = "addEventListener",
  Gi = "removeEventListener",
  Ht = "true",
  qt = "false",
  Wr = lt("");
function zi(b, v) {
  return Zone.current.wrap(b, v);
}
function oa(b, v, h, s, t) {
  return Zone.current.scheduleMacroTask(b, v, h, s, t);
}
var Fe = lt,
  Xr = typeof window < "u",
  Yr = Xr ? window : void 0,
  et = (Xr && Yr) || globalThis,
  Zi = "removeAttribute";
function Wi(b, v) {
  for (let h = b.length - 1; h >= 0; h--)
    typeof b[h] == "function" && (b[h] = zi(b[h], v + "_" + h));
  return b;
}
function $i(b) {
  return b
    ? b.writable === !1
      ? !1
      : !(typeof b.get == "function" && typeof b.set > "u")
    : !0;
}
var ca = typeof WorkerGlobalScope < "u" && self instanceof WorkerGlobalScope,
  la =
    !("nw" in et) &&
    typeof et.process < "u" &&
    et.process.toString() === "[object process]",
  Ki = !la && !ca && !!(Xr && Yr.HTMLElement),
  ta =
    typeof et.process < "u" &&
    et.process.toString() === "[object process]" &&
    !ca &&
    !!(Xr && Yr.HTMLElement),
  $r = {},
  Xi = Fe("enable_beforeunload"),
  ra = function (b) {
    if (((b = b || et.event), !b)) return;
    let v = $r[b.type];
    v || (v = $r[b.type] = Fe("ON_PROPERTY" + b.type));
    let h = this || b.target || et,
      s = h[v],
      t;
    if (Ki && h === Yr && b.type === "error") {
      let a = b;
      (t =
        s && s.call(this, a.message, a.filename, a.lineno, a.colno, a.error)),
        t === !0 && b.preventDefault();
    } else
      (t = s && s.apply(this, arguments)),
        b.type === "beforeunload" && et[Xi] && typeof t == "string"
          ? (b.returnValue = t)
          : t != null && !t && b.preventDefault();
    return t;
  };
function na(b, v, h) {
  let s = yn(b, v);
  if (
    (!s && h && yn(h, v) && (s = { enumerable: !0, configurable: !0 }),
    !s || !s.configurable)
  )
    return;
  let t = Fe("on" + v + "patched");
  if (b.hasOwnProperty(t) && b[t]) return;
  delete s.writable, delete s.value;
  let a = s.get,
    c = s.set,
    l = v.slice(2),
    f = $r[l];
  f || (f = $r[l] = Fe("ON_PROPERTY" + l)),
    (s.set = function (i) {
      let E = this;
      if ((!E && b === et && (E = et), !E)) return;
      typeof E[f] == "function" && E.removeEventListener(l, ra),
        c && c.call(E, null),
        (E[f] = i),
        typeof i == "function" && E.addEventListener(l, ra, !1);
    }),
    (s.get = function () {
      let i = this;
      if ((!i && b === et && (i = et), !i)) return null;
      let E = i[f];
      if (E) return E;
      if (a) {
        let m = a.call(this);
        if (m)
          return (
            s.set.call(this, m),
            typeof i[Zi] == "function" && i.removeAttribute(v),
            m
          );
      }
      return null;
    }),
    Fi(b, v, s),
    (b[t] = !0);
}
function Yi(b, v, h) {
  if (v) for (let s = 0; s < v.length; s++) na(b, "on" + v[s], h);
  else {
    let s = [];
    for (let t in b) t.slice(0, 2) == "on" && s.push(t);
    for (let t = 0; t < s.length; t++) na(b, s[t], h);
  }
}
function Qi(b, v) {
  if (typeof Object.getOwnPropertySymbols != "function") return;
  Object.getOwnPropertySymbols(b).forEach((s) => {
    let t = Object.getOwnPropertyDescriptor(b, s);
    Object.defineProperty(v, s, {
      get: function () {
        return b[s];
      },
      set: function (a) {
        (t && (!t.writable || typeof t.set != "function")) || (b[s] = a);
      },
      enumerable: t ? t.enumerable : !0,
      configurable: t ? t.configurable : !0,
    });
  });
}
var ua = !1;
function Ji(b) {
  ua = b;
}
function nr(b, v, h) {
  let s = b;
  for (; s && !s.hasOwnProperty(v); ) s = sa(s);
  !s && b[v] && (s = b);
  let t = Fe(v),
    a = null;
  if (s && (!(a = s[t]) || !s.hasOwnProperty(t))) {
    a = s[t] = s[v];
    let c = s && yn(s, v);
    if ($i(c)) {
      let l = h(a, t, v);
      (s[v] = function () {
        return l(this, arguments);
      }),
        _r(s[v], a),
        ua && Qi(a, s[v]);
    }
  }
  return a;
}
function Kr(b, v, h) {
  let s = null;
  function t(a) {
    let c = a.data;
    return (
      (c.args[c.cbIdx] = function () {
        a.invoke.apply(this, arguments);
      }),
      s.apply(c.target, c.args),
      a
    );
  }
  s = nr(
    b,
    v,
    (a) =>
      function (c, l) {
        let f = h(c, l);
        return f.cbIdx >= 0 && typeof l[f.cbIdx] == "function"
          ? oa(f.name, l[f.cbIdx], f, t)
          : a.apply(c, l);
      }
  );
}
function es(b, v, h) {
  let s = null;
  function t(a) {
    let c = a.data;
    return (
      (c.args[c.cbIdx] = function () {
        a.invoke.apply(this, arguments);
      }),
      s.apply(c.target, c.args),
      a
    );
  }
  s = nr(
    b,
    v,
    (a) =>
      function (c, l) {
        let f = h(c, l);
        return f.cbIdx >= 0 && typeof l[f.cbIdx] == "function"
          ? Zone.current.scheduleMicroTask(f.name, l[f.cbIdx], f, t)
          : a.apply(c, l);
      }
  );
}
function _r(b, v) {
  b[Fe("OriginalDelegate")] = v;
}
function aa(b) {
  return typeof b == "function";
}
function ia(b) {
  return typeof b == "number";
}
function ts(b) {
  b.__load_patch("ZoneAwarePromise", (v, h, s) => {
    let t = Object.getOwnPropertyDescriptor,
      a = Object.defineProperty;
    function c(X) {
      if (X && X.toString === Object.prototype.toString) {
        let z = X.constructor && X.constructor.name;
        return (z || "") + ": " + JSON.stringify(X);
      }
      return X ? X.toString() : Object.prototype.toString.call(X);
    }
    let l = s.symbol,
      f = [],
      i = v[l("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")] !== !1,
      E = l("Promise"),
      m = l("then"),
      w = "__creationTrace__";
    (s.onUnhandledError = (X) => {
      if (s.showUncaughtError()) {
        let z = X && X.rejection;
        z
          ? console.error(
              "Unhandled Promise rejection:",
              z instanceof Error ? z.message : z,
              "; Zone:",
              X.zone.name,
              "; Task:",
              X.task && X.task.source,
              "; Value:",
              z,
              z instanceof Error ? z.stack : void 0
            )
          : console.error(X);
      }
    }),
      (s.microtaskDrainDone = () => {
        for (; f.length; ) {
          let X = f.shift();
          try {
            X.zone.runGuarded(() => {
              throw X.throwOriginal ? X.rejection : X;
            });
          } catch (z) {
            H(z);
          }
        }
      });
    let I = l("unhandledPromiseRejectionHandler");
    function H(X) {
      s.onUnhandledError(X);
      try {
        let z = h[I];
        typeof z == "function" && z.call(this, X);
      } catch {}
    }
    function R(X) {
      return X && X.then;
    }
    function J(X) {
      return X;
    }
    function B(X) {
      return A.reject(X);
    }
    let y = l("state"),
      g = l("value"),
      k = l("finally"),
      _ = l("parentPromiseValue"),
      ae = l("parentPromiseState"),
      ne = "Promise.then",
      Y = null,
      G = !0,
      D = !1,
      P = 0;
    function Z(X, z) {
      return (O) => {
        try {
          p(X, z, O);
        } catch (W) {
          p(X, !1, W);
        }
      };
    }
    let u = function () {
        let X = !1;
        return function (O) {
          return function () {
            X || ((X = !0), O.apply(null, arguments));
          };
        };
      },
      o = "Promise resolved with itself",
      n = l("currentTaskTrace");
    function p(X, z, O) {
      let W = u();
      if (X === O) throw new TypeError(o);
      if (X[y] === Y) {
        let ce = null;
        try {
          (typeof O == "object" || typeof O == "function") &&
            (ce = O && O.then);
        } catch (he) {
          return (
            W(() => {
              p(X, !1, he);
            })(),
            X
          );
        }
        if (
          z !== D &&
          O instanceof A &&
          O.hasOwnProperty(y) &&
          O.hasOwnProperty(g) &&
          O[y] !== Y
        )
          T(O), p(X, O[y], O[g]);
        else if (z !== D && typeof ce == "function")
          try {
            ce.call(O, W(Z(X, z)), W(Z(X, !1)));
          } catch (he) {
            W(() => {
              p(X, !1, he);
            })();
          }
        else {
          X[y] = z;
          let he = X[g];
          if (
            ((X[g] = O),
            X[k] === k && z === G && ((X[y] = X[ae]), (X[g] = X[_])),
            z === D && O instanceof Error)
          ) {
            let ie =
              h.currentTask && h.currentTask.data && h.currentTask.data[w];
            ie &&
              a(O, n, {
                configurable: !0,
                enumerable: !1,
                writable: !0,
                value: ie,
              });
          }
          for (let ie = 0; ie < he.length; )
            C(X, he[ie++], he[ie++], he[ie++], he[ie++]);
          if (he.length == 0 && z == D) {
            X[y] = P;
            let ie = O;
            try {
              throw new Error(
                "Uncaught (in promise): " +
                  c(O) +
                  (O && O.stack
                    ? `
` + O.stack
                    : "")
              );
            } catch (me) {
              ie = me;
            }
            i && (ie.throwOriginal = !0),
              (ie.rejection = O),
              (ie.promise = X),
              (ie.zone = h.current),
              (ie.task = h.currentTask),
              f.push(ie),
              s.scheduleMicroTask();
          }
        }
      }
      return X;
    }
    let d = l("rejectionHandledHandler");
    function T(X) {
      if (X[y] === P) {
        try {
          let z = h[d];
          z &&
            typeof z == "function" &&
            z.call(this, { rejection: X[g], promise: X });
        } catch {}
        X[y] = D;
        for (let z = 0; z < f.length; z++) X === f[z].promise && f.splice(z, 1);
      }
    }
    function C(X, z, O, W, ce) {
      T(X);
      let he = X[y],
        ie = he
          ? typeof W == "function"
            ? W
            : J
          : typeof ce == "function"
            ? ce
            : B;
      z.scheduleMicroTask(
        ne,
        () => {
          try {
            let me = X[g],
              be = !!O && k === O[k];
            be && ((O[_] = me), (O[ae] = he));
            let _e = z.run(ie, void 0, be && ie !== B && ie !== J ? [] : [me]);
            p(O, !0, _e);
          } catch (me) {
            p(O, !1, me);
          }
        },
        O
      );
    }
    let j = "function ZoneAwarePromise() { [native code] }",
      re = function () {},
      S = v.AggregateError;
    class A {
      static toString() {
        return j;
      }
      static resolve(z) {
        return z instanceof A ? z : p(new this(null), G, z);
      }
      static reject(z) {
        return p(new this(null), D, z);
      }
      static withResolvers() {
        let z = {};
        return (
          (z.promise = new A((O, W) => {
            (z.resolve = O), (z.reject = W);
          })),
          z
        );
      }
      static any(z) {
        if (!z || typeof z[Symbol.iterator] != "function")
          return Promise.reject(new S([], "All promises were rejected"));
        let O = [],
          W = 0;
        try {
          for (let ie of z) W++, O.push(A.resolve(ie));
        } catch {
          return Promise.reject(new S([], "All promises were rejected"));
        }
        if (W === 0)
          return Promise.reject(new S([], "All promises were rejected"));
        let ce = !1,
          he = [];
        return new A((ie, me) => {
          for (let be = 0; be < O.length; be++)
            O[be].then(
              (_e) => {
                ce || ((ce = !0), ie(_e));
              },
              (_e) => {
                he.push(_e),
                  W--,
                  W === 0 &&
                    ((ce = !0), me(new S(he, "All promises were rejected")));
              }
            );
        });
      }
      static race(z) {
        let O,
          W,
          ce = new this((me, be) => {
            (O = me), (W = be);
          });
        function he(me) {
          O(me);
        }
        function ie(me) {
          W(me);
        }
        for (let me of z) R(me) || (me = this.resolve(me)), me.then(he, ie);
        return ce;
      }
      static all(z) {
        return A.allWithCallback(z);
      }
      static allSettled(z) {
        return (this && this.prototype instanceof A ? this : A).allWithCallback(
          z,
          {
            thenCallback: (W) => ({ status: "fulfilled", value: W }),
            errorCallback: (W) => ({ status: "rejected", reason: W }),
          }
        );
      }
      static allWithCallback(z, O) {
        let W,
          ce,
          he = new this((_e, Ae) => {
            (W = _e), (ce = Ae);
          }),
          ie = 2,
          me = 0,
          be = [];
        for (let _e of z) {
          R(_e) || (_e = this.resolve(_e));
          let Ae = me;
          try {
            _e.then(
              (Se) => {
                (be[Ae] = O ? O.thenCallback(Se) : Se), ie--, ie === 0 && W(be);
              },
              (Se) => {
                O
                  ? ((be[Ae] = O.errorCallback(Se)), ie--, ie === 0 && W(be))
                  : ce(Se);
              }
            );
          } catch (Se) {
            ce(Se);
          }
          ie++, me++;
        }
        return (ie -= 2), ie === 0 && W(be), he;
      }
      constructor(z) {
        let O = this;
        if (!(O instanceof A))
          throw new Error("Must be an instanceof Promise.");
        (O[y] = Y), (O[g] = []);
        try {
          let W = u();
          z && z(W(Z(O, G)), W(Z(O, D)));
        } catch (W) {
          p(O, !1, W);
        }
      }
      get [Symbol.toStringTag]() {
        return "Promise";
      }
      get [Symbol.species]() {
        return A;
      }
      then(z, O) {
        let W = this.constructor?.[Symbol.species];
        (!W || typeof W != "function") && (W = this.constructor || A);
        let ce = new W(re),
          he = h.current;
        return (
          this[y] == Y ? this[g].push(he, ce, z, O) : C(this, he, ce, z, O), ce
        );
      }
      catch(z) {
        return this.then(null, z);
      }
      finally(z) {
        let O = this.constructor?.[Symbol.species];
        (!O || typeof O != "function") && (O = A);
        let W = new O(re);
        W[k] = k;
        let ce = h.current;
        return (
          this[y] == Y ? this[g].push(ce, W, z, z) : C(this, ce, W, z, z), W
        );
      }
    }
    (A.resolve = A.resolve),
      (A.reject = A.reject),
      (A.race = A.race),
      (A.all = A.all);
    let K = (v[E] = v.Promise);
    v.Promise = A;
    let ge = l("thenPatched");
    function Me(X) {
      let z = X.prototype,
        O = t(z, "then");
      if (O && (O.writable === !1 || !O.configurable)) return;
      let W = z.then;
      (z[m] = W),
        (X.prototype.then = function (ce, he) {
          return new A((me, be) => {
            W.call(this, me, be);
          }).then(ce, he);
        }),
        (X[ge] = !0);
    }
    s.patchThen = Me;
    function bt(X) {
      return function (z, O) {
        let W = X.apply(z, O);
        if (W instanceof A) return W;
        let ce = W.constructor;
        return ce[ge] || Me(ce), W;
      };
    }
    return (
      K && (Me(K), nr(v, "fetch", (X) => bt(X))),
      (Promise[h.__symbol__("uncaughtPromiseErrors")] = f),
      A
    );
  });
}
function rs(b) {
  b.__load_patch("toString", (v) => {
    let h = Function.prototype.toString,
      s = Fe("OriginalDelegate"),
      t = Fe("Promise"),
      a = Fe("Error"),
      c = function () {
        if (typeof this == "function") {
          let E = this[s];
          if (E)
            return typeof E == "function"
              ? h.call(E)
              : Object.prototype.toString.call(E);
          if (this === Promise) {
            let m = v[t];
            if (m) return h.call(m);
          }
          if (this === Error) {
            let m = v[a];
            if (m) return h.call(m);
          }
        }
        return h.call(this);
      };
    (c[s] = h), (Function.prototype.toString = c);
    let l = Object.prototype.toString,
      f = "[object Promise]";
    Object.prototype.toString = function () {
      return typeof Promise == "function" && this instanceof Promise
        ? f
        : l.call(this);
    };
  });
}
function ns() {
  let b = globalThis,
    v = b[lt("forceDuplicateZoneCheck")] === !0;
  if (b.Zone && (v || typeof b.Zone.__symbol__ != "function"))
    throw new Error("Zone already loaded.");
  return (b.Zone ??= Ui()), b.Zone;
}
var rr = !1;
if (typeof window < "u")
  try {
    let b = Object.defineProperty({}, "passive", {
      get: function () {
        rr = !0;
      },
    });
    window.addEventListener("test", b, b),
      window.removeEventListener("test", b, b);
  } catch {
    rr = !1;
  }
var as = { useG: !0 },
  nt = {},
  is = {},
  fa = new RegExp("^" + Wr + "(\\w+)(true|false)$"),
  ss = Fe("propagationStopped");
function ha(b, v) {
  let h = (v ? v(b) : b) + qt,
    s = (v ? v(b) : b) + Ht,
    t = Wr + h,
    a = Wr + s;
  (nt[b] = {}), (nt[b][qt] = t), (nt[b][Ht] = a);
}
function os(b, v, h, s) {
  let t = (s && s.add) || Vi,
    a = (s && s.rm) || Gi,
    c = (s && s.listeners) || "eventListeners",
    l = (s && s.rmAll) || "removeAllListeners",
    f = Fe(t),
    i = "." + t + ":",
    E = "prependListener",
    m = "." + E + ":",
    w = function (y, g, k) {
      if (y.isRemoved) return;
      let _ = y.callback;
      typeof _ == "object" &&
        _.handleEvent &&
        ((y.callback = (Y) => _.handleEvent(Y)), (y.originalDelegate = _));
      let ae;
      try {
        y.invoke(y, g, [k]);
      } catch (Y) {
        ae = Y;
      }
      let ne = y.options;
      if (ne && typeof ne == "object" && ne.once) {
        let Y = y.originalDelegate ? y.originalDelegate : y.callback;
        g[a].call(g, k.type, Y, ne);
      }
      return ae;
    };
  function I(y, g, k) {
    if (((g = g || b.event), !g)) return;
    let _ = y || g.target || b,
      ae = _[nt[g.type][k ? Ht : qt]];
    if (ae) {
      let ne = [];
      if (ae.length === 1) {
        let Y = w(ae[0], _, g);
        Y && ne.push(Y);
      } else {
        let Y = ae.slice();
        for (let G = 0; G < Y.length && !(g && g[ss] === !0); G++) {
          let D = w(Y[G], _, g);
          D && ne.push(D);
        }
      }
      if (ne.length === 1) throw ne[0];
      for (let Y = 0; Y < ne.length; Y++) {
        let G = ne[Y];
        v.nativeScheduleMicroTask(() => {
          throw G;
        });
      }
    }
  }
  let H = function (y) {
      return I(this, y, !1);
    },
    R = function (y) {
      return I(this, y, !0);
    };
  function J(y, g) {
    if (!y) return !1;
    let k = !0;
    g && g.useG !== void 0 && (k = g.useG);
    let _ = g && g.vh,
      ae = !0;
    g && g.chkDup !== void 0 && (ae = g.chkDup);
    let ne = !1;
    g && g.rt !== void 0 && (ne = g.rt);
    let Y = y;
    for (; Y && !Y.hasOwnProperty(t); ) Y = sa(Y);
    if ((!Y && y[t] && (Y = y), !Y || Y[f])) return !1;
    let G = g && g.eventNameToString,
      D = {},
      P = (Y[f] = Y[t]),
      Z = (Y[Fe(a)] = Y[a]),
      u = (Y[Fe(c)] = Y[c]),
      o = (Y[Fe(l)] = Y[l]),
      n;
    g && g.prepend && (n = Y[Fe(g.prepend)] = Y[g.prepend]);
    function p(O, W) {
      return !rr && typeof O == "object" && O
        ? !!O.capture
        : !rr || !W
          ? O
          : typeof O == "boolean"
            ? { capture: O, passive: !0 }
            : O
              ? typeof O == "object" && O.passive !== !1
                ? { ...O, passive: !0 }
                : O
              : { passive: !0 };
    }
    let d = function (O) {
        if (!D.isExisting)
          return P.call(D.target, D.eventName, D.capture ? R : H, D.options);
      },
      T = function (O) {
        if (!O.isRemoved) {
          let W = nt[O.eventName],
            ce;
          W && (ce = W[O.capture ? Ht : qt]);
          let he = ce && O.target[ce];
          if (he) {
            for (let ie = 0; ie < he.length; ie++)
              if (he[ie] === O) {
                he.splice(ie, 1),
                  (O.isRemoved = !0),
                  O.removeAbortListener &&
                    (O.removeAbortListener(), (O.removeAbortListener = null)),
                  he.length === 0 &&
                    ((O.allRemoved = !0), (O.target[ce] = null));
                break;
              }
          }
        }
        if (O.allRemoved)
          return Z.call(O.target, O.eventName, O.capture ? R : H, O.options);
      },
      C = function (O) {
        return P.call(D.target, D.eventName, O.invoke, D.options);
      },
      j = function (O) {
        return n.call(D.target, D.eventName, O.invoke, D.options);
      },
      re = function (O) {
        return Z.call(O.target, O.eventName, O.invoke, O.options);
      },
      S = k ? d : C,
      A = k ? T : re,
      K = function (O, W) {
        let ce = typeof W;
        return (
          (ce === "function" && O.callback === W) ||
          (ce === "object" && O.originalDelegate === W)
        );
      },
      ge = g && g.diff ? g.diff : K,
      Me = Zone[Fe("UNPATCHED_EVENTS")],
      bt = b[Fe("PASSIVE_EVENTS")];
    function X(O) {
      if (typeof O == "object" && O !== null) {
        let W = { ...O };
        return O.signal && (W.signal = O.signal), W;
      }
      return O;
    }
    let z = function (O, W, ce, he, ie = !1, me = !1) {
      return function () {
        let be = this || b,
          _e = arguments[0];
        g && g.transferEventName && (_e = g.transferEventName(_e));
        let Ae = arguments[1];
        if (!Ae) return O.apply(this, arguments);
        if (la && _e === "uncaughtException") return O.apply(this, arguments);
        let Se = !1;
        if (typeof Ae != "function") {
          if (!Ae.handleEvent) return O.apply(this, arguments);
          Se = !0;
        }
        if (_ && !_(O, Ae, be, arguments)) return;
        let Ke = rr && !!bt && bt.indexOf(_e) !== -1,
          Xe = X(p(arguments[2], Ke)),
          ze = Xe?.signal;
        if (ze?.aborted) return;
        if (Me) {
          for (let U = 0; U < Me.length; U++)
            if (_e === Me[U])
              return Ke ? O.call(be, _e, Ae, Xe) : O.apply(this, arguments);
        }
        let Et = Xe ? (typeof Xe == "boolean" ? !0 : Xe.capture) : !1,
          Ue = Xe && typeof Xe == "object" ? Xe.once : !1,
          rn = Zone.current,
          Ne = nt[_e];
        Ne || (ha(_e, G), (Ne = nt[_e]));
        let ir = Ne[Et ? Ht : qt],
          ut = be[ir],
          vr = !1;
        if (ut) {
          if (((vr = !0), ae)) {
            for (let U = 0; U < ut.length; U++) if (ge(ut[U], Ae)) return;
          }
        } else ut = be[ir] = [];
        let Pt,
          sr = be.constructor.name,
          Kt = is[sr];
        Kt && (Pt = Kt[_e]),
          Pt || (Pt = sr + W + (G ? G(_e) : _e)),
          (D.options = Xe),
          Ue && (D.options.once = !1),
          (D.target = be),
          (D.capture = Et),
          (D.eventName = _e),
          (D.isExisting = vr);
        let vt = k ? as : void 0;
        vt && (vt.taskData = D), ze && (D.options.signal = void 0);
        let de = rn.scheduleEventTask(Pt, Ae, vt, ce, he);
        if (ze) {
          D.options.signal = ze;
          let U = () => de.zone.cancelTask(de);
          O.call(ze, "abort", U, { once: !0 }),
            (de.removeAbortListener = () => ze.removeEventListener("abort", U));
        }
        if (
          ((D.target = null),
          vt && (vt.taskData = null),
          Ue && (D.options.once = !0),
          (!rr && typeof de.options == "boolean") || (de.options = Xe),
          (de.target = be),
          (de.capture = Et),
          (de.eventName = _e),
          Se && (de.originalDelegate = Ae),
          me ? ut.unshift(de) : ut.push(de),
          ie)
        )
          return be;
      };
    };
    return (
      (Y[t] = z(P, i, S, A, ne)),
      n && (Y[E] = z(n, m, j, A, ne, !0)),
      (Y[a] = function () {
        let O = this || b,
          W = arguments[0];
        g && g.transferEventName && (W = g.transferEventName(W));
        let ce = arguments[2],
          he = ce ? (typeof ce == "boolean" ? !0 : ce.capture) : !1,
          ie = arguments[1];
        if (!ie) return Z.apply(this, arguments);
        if (_ && !_(Z, ie, O, arguments)) return;
        let me = nt[W],
          be;
        me && (be = me[he ? Ht : qt]);
        let _e = be && O[be];
        if (_e)
          for (let Ae = 0; Ae < _e.length; Ae++) {
            let Se = _e[Ae];
            if (ge(Se, ie)) {
              if (
                (_e.splice(Ae, 1),
                (Se.isRemoved = !0),
                _e.length === 0 &&
                  ((Se.allRemoved = !0),
                  (O[be] = null),
                  !he && typeof W == "string"))
              ) {
                let Ke = Wr + "ON_PROPERTY" + W;
                O[Ke] = null;
              }
              return Se.zone.cancelTask(Se), ne ? O : void 0;
            }
          }
        return Z.apply(this, arguments);
      }),
      (Y[c] = function () {
        let O = this || b,
          W = arguments[0];
        g && g.transferEventName && (W = g.transferEventName(W));
        let ce = [],
          he = da(O, G ? G(W) : W);
        for (let ie = 0; ie < he.length; ie++) {
          let me = he[ie],
            be = me.originalDelegate ? me.originalDelegate : me.callback;
          ce.push(be);
        }
        return ce;
      }),
      (Y[l] = function () {
        let O = this || b,
          W = arguments[0];
        if (W) {
          g && g.transferEventName && (W = g.transferEventName(W));
          let ce = nt[W];
          if (ce) {
            let he = ce[qt],
              ie = ce[Ht],
              me = O[he],
              be = O[ie];
            if (me) {
              let _e = me.slice();
              for (let Ae = 0; Ae < _e.length; Ae++) {
                let Se = _e[Ae],
                  Ke = Se.originalDelegate ? Se.originalDelegate : Se.callback;
                this[a].call(this, W, Ke, Se.options);
              }
            }
            if (be) {
              let _e = be.slice();
              for (let Ae = 0; Ae < _e.length; Ae++) {
                let Se = _e[Ae],
                  Ke = Se.originalDelegate ? Se.originalDelegate : Se.callback;
                this[a].call(this, W, Ke, Se.options);
              }
            }
          }
        } else {
          let ce = Object.keys(O);
          for (let he = 0; he < ce.length; he++) {
            let ie = ce[he],
              me = fa.exec(ie),
              be = me && me[1];
            be && be !== "removeListener" && this[l].call(this, be);
          }
          this[l].call(this, "removeListener");
        }
        if (ne) return this;
      }),
      _r(Y[t], P),
      _r(Y[a], Z),
      o && _r(Y[l], o),
      u && _r(Y[c], u),
      !0
    );
  }
  let B = [];
  for (let y = 0; y < h.length; y++) B[y] = J(h[y], s);
  return B;
}
function da(b, v) {
  if (!v) {
    let a = [];
    for (let c in b) {
      let l = fa.exec(c),
        f = l && l[1];
      if (f && (!v || f === v)) {
        let i = b[c];
        if (i) for (let E = 0; E < i.length; E++) a.push(i[E]);
      }
    }
    return a;
  }
  let h = nt[v];
  h || (ha(v), (h = nt[v]));
  let s = b[h[qt]],
    t = b[h[Ht]];
  return s ? (t ? s.concat(t) : s.slice()) : t ? t.slice() : [];
}
function cs(b, v) {
  v.patchMethod(
    b,
    "queueMicrotask",
    (h) =>
      function (s, t) {
        Zone.current.scheduleMicroTask("queueMicrotask", t[0]);
      }
  );
}
var Zr = Fe("zoneTask");
function Jt(b, v, h, s) {
  let t = null,
    a = null;
  (v += s), (h += s);
  let c = {};
  function l(i) {
    let E = i.data;
    E.args[0] = function () {
      return i.invoke.apply(this, arguments);
    };
    let m = t.apply(b, E.args);
    return (
      ia(m)
        ? (E.handleId = m)
        : ((E.handle = m), (E.isRefreshable = aa(m.refresh))),
      i
    );
  }
  function f(i) {
    let { handle: E, handleId: m } = i.data;
    return a.call(b, E ?? m);
  }
  (t = nr(
    b,
    v,
    (i) =>
      function (E, m) {
        if (aa(m[0])) {
          let w = {
              isRefreshable: !1,
              isPeriodic: s === "Interval",
              delay: s === "Timeout" || s === "Interval" ? m[1] || 0 : void 0,
              args: m,
            },
            I = m[0];
          m[0] = function () {
            try {
              return I.apply(this, arguments);
            } finally {
              let {
                handle: k,
                handleId: _,
                isPeriodic: ae,
                isRefreshable: ne,
              } = w;
              !ae && !ne && (_ ? delete c[_] : k && (k[Zr] = null));
            }
          };
          let H = oa(v, m[0], w, l, f);
          if (!H) return H;
          let {
            handleId: R,
            handle: J,
            isRefreshable: B,
            isPeriodic: y,
          } = H.data;
          if (R) c[R] = H;
          else if (J && ((J[Zr] = H), B && !y)) {
            let g = J.refresh;
            J.refresh = function () {
              let { zone: k, state: _ } = H;
              return (
                _ === "notScheduled"
                  ? ((H._state = "scheduled"), k._updateTaskCount(H, 1))
                  : _ === "running" && (H._state = "scheduling"),
                g.call(this)
              );
            };
          }
          return J ?? R ?? H;
        } else return i.apply(b, m);
      }
  )),
    (a = nr(
      b,
      h,
      (i) =>
        function (E, m) {
          let w = m[0],
            I;
          ia(w)
            ? ((I = c[w]), delete c[w])
            : ((I = w?.[Zr]), I ? (w[Zr] = null) : (I = w)),
            I?.type ? I.cancelFn && I.zone.cancelTask(I) : i.apply(b, m);
        }
    ));
}
function ls(b) {
  b.__load_patch("EventEmitter", (v, h, s) => {
    let t = "addListener",
      a = "prependListener",
      c = "removeListener",
      l = "removeAllListeners",
      f = "listeners",
      i = "on",
      E = "off",
      m = function (R, J) {
        return R.callback === J || R.callback.listener === J;
      },
      w = function (R) {
        return typeof R == "string"
          ? R
          : R
            ? R.toString().replace("(", "_").replace(")", "_")
            : "";
      };
    function I(R) {
      let J = os(v, s, [R], {
        useG: !1,
        add: t,
        rm: c,
        prepend: a,
        rmAll: l,
        listeners: f,
        chkDup: !1,
        rt: !0,
        diff: m,
        eventNameToString: w,
      });
      J && J[0] && ((R[i] = R[t]), (R[E] = R[c]));
    }
    let H;
    try {
      H = zr("events");
    } catch {}
    H && H.EventEmitter && I(H.EventEmitter.prototype);
  });
}
function us(b) {
  b.__load_patch("fs", (v, h, s) => {
    let t;
    try {
      t = zr("fs");
    } catch {}
    if (!t) return;
    [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "exists",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "lchmod",
      "lchown",
      "lutimes",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "read",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rmdir",
      "stat",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "write",
      "writeFile",
      "writev",
    ]
      .filter((l) => !!t[l] && typeof t[l] == "function")
      .forEach((l) => {
        Kr(t, l, (f, i) => ({
          name: "fs." + l,
          args: i,
          cbIdx: i.length > 0 ? i.length - 1 : -1,
          target: f,
        }));
      });
    let c = t.realpath?.[s.symbol("OriginalDelegate")];
    c?.native &&
      ((t.realpath.native = c.native),
      Kr(t.realpath, "native", (l, f) => ({
        args: f,
        target: l,
        cbIdx: f.length > 0 ? f.length - 1 : -1,
        name: "fs.realpath.native",
      })));
  });
}
function fs(b) {
  b.__load_patch("node_util", (v, h, s) => {
    (s.patchOnProperties = Yi),
      (s.patchMethod = nr),
      (s.bindArguments = Wi),
      (s.patchMacroTask = Kr),
      Ji(!0);
  });
}
var er = "set",
  tr = "clear";
function hs(b) {
  fs(b),
    ls(b),
    us(b),
    b.__load_patch("node_timers", (v, h) => {
      let s = !1;
      try {
        let t = zr("timers");
        if (!(v.setTimeout === t.setTimeout) && !ta) {
          let c = t.setTimeout;
          t.setTimeout = function () {
            return (s = !0), c.apply(this, arguments);
          };
          let l = v.setTimeout(() => {}, 100);
          clearTimeout(l), (t.setTimeout = c);
        }
        Jt(t, er, tr, "Timeout"),
          Jt(t, er, tr, "Interval"),
          Jt(t, er, tr, "Immediate");
      } catch {}
      ta ||
        (s
          ? ((v[h.__symbol__("setTimeout")] = v.setTimeout),
            (v[h.__symbol__("setInterval")] = v.setInterval),
            (v[h.__symbol__("setImmediate")] = v.setImmediate))
          : (Jt(v, er, tr, "Timeout"),
            Jt(v, er, tr, "Interval"),
            Jt(v, er, tr, "Immediate")));
    }),
    b.__load_patch("nextTick", () => {
      es(process, "nextTick", (v, h) => ({
        name: "process.nextTick",
        args: h,
        cbIdx: h.length > 0 && typeof h[0] == "function" ? 0 : -1,
        target: process,
      }));
    }),
    b.__load_patch("handleUnhandledPromiseRejection", (v, h, s) => {
      (h[s.symbol("unhandledPromiseRejectionHandler")] =
        t("unhandledRejection")),
        (h[s.symbol("rejectionHandledHandler")] = t("rejectionHandled"));
      function t(a) {
        return function (c) {
          da(process, a).forEach((f) => {
            a === "unhandledRejection"
              ? f.invoke(c.rejection, c.promise)
              : a === "rejectionHandled" && f.invoke(c.promise);
          });
        };
      }
    }),
    b.__load_patch("crypto", () => {
      let v;
      try {
        v = zr("crypto");
      } catch {}
      v &&
        ["randomBytes", "pbkdf2"].forEach((s) => {
          Kr(v, s, (t, a) => ({
            name: "crypto." + s,
            args: a,
            cbIdx:
              a.length > 0 && typeof a[a.length - 1] == "function"
                ? a.length - 1
                : -1,
            target: v,
          }));
        });
    }),
    b.__load_patch("console", (v, h) => {
      [
        "dir",
        "log",
        "info",
        "error",
        "warn",
        "assert",
        "debug",
        "timeEnd",
        "trace",
      ].forEach((t) => {
        let a = (console[h.__symbol__(t)] = console[t]);
        a &&
          (console[t] = function () {
            let c = ji.call(arguments);
            return h.current === h.root
              ? a.apply(this, c)
              : h.root.run(a, this, c);
          });
      });
    }),
    b.__load_patch("queueMicrotask", (v, h, s) => {
      cs(v, s);
    });
}
function ds() {
  let b = ns();
  return hs(b), ts(b), rs(b), b;
}
ds();
var ps = ":";
var Nn = class {
    visitText(v, h) {
      return v.value;
    }
    visitContainer(v, h) {
      return `[${v.children.map((s) => s.visit(this)).join(", ")}]`;
    }
    visitIcu(v, h) {
      let s = Object.keys(v.cases).map(
        (t) => `${t} {${v.cases[t].visit(this)}}`
      );
      return `{${v.expression}, ${v.type}, ${s.join(", ")}}`;
    }
    visitTagPlaceholder(v, h) {
      return v.isVoid
        ? `<ph tag name="${v.startName}"/>`
        : `<ph tag name="${v.startName}">${v.children.map((s) => s.visit(this)).join(", ")}</ph name="${v.closeName}">`;
    }
    visitPlaceholder(v, h) {
      return v.value
        ? `<ph name="${v.name}">${v.value}</ph>`
        : `<ph name="${v.name}"/>`;
    }
    visitIcuPlaceholder(v, h) {
      return `<ph icu name="${v.name}">${v.value.visit(this)}</ph>`;
    }
    visitBlockPlaceholder(v, h) {
      return `<ph block name="${v.startName}">${v.children.map((s) => s.visit(this)).join(", ")}</ph name="${v.closeName}">`;
    }
  },
  xs = new Nn();
var pa;
(function (b) {
  (b[(b.Little = 0)] = "Little"), (b[(b.Big = 1)] = "Big");
})(pa || (pa = {}));
function ms(b, v) {
  for (let h = 1, s = 1; h < b.length; h++, s++)
    if (v[s] === "\\") s++;
    else if (b[h] === ps) return h;
  throw new Error(`Unterminated $localize metadata block in "${v}".`);
}
var Qr = function (b, ...v) {
    if (Qr.translate) {
      let s = Qr.translate(b, v);
      (b = s[0]), (v = s[1]);
    }
    let h = ma(b[0], b.raw[0]);
    for (let s = 1; s < b.length; s++) h += v[s - 1] + ma(b[s], b.raw[s]);
    return h;
  },
  gs = ":";
function ma(b, v) {
  return v.charAt(0) === gs ? b.substring(ms(b, v) + 1) : b;
}
globalThis.$localize = Qr;
var _s = Object.getOwnPropertyNames,
  le = (b, v) =>
    function () {
      return v || (0, b[_s(b)[0]])((v = { exports: {} }).exports, v), v.exports;
    },
  br = le({
    "external/npm/node_modules/domino/lib/Event.js"(b, v) {
      "use strict";
      (v.exports = h),
        (h.CAPTURING_PHASE = 1),
        (h.AT_TARGET = 2),
        (h.BUBBLING_PHASE = 3);
      function h(s, t) {
        if (
          ((this.type = ""),
          (this.target = null),
          (this.currentTarget = null),
          (this.eventPhase = h.AT_TARGET),
          (this.bubbles = !1),
          (this.cancelable = !1),
          (this.isTrusted = !1),
          (this.defaultPrevented = !1),
          (this.timeStamp = Date.now()),
          (this._propagationStopped = !1),
          (this._immediatePropagationStopped = !1),
          (this._initialized = !0),
          (this._dispatching = !1),
          s && (this.type = s),
          t)
        )
          for (var a in t) this[a] = t[a];
      }
      h.prototype = Object.create(Object.prototype, {
        constructor: { value: h },
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
          value: function (t, a, c) {
            (this._initialized = !0),
              !this._dispatching &&
                ((this._propagationStopped = !1),
                (this._immediatePropagationStopped = !1),
                (this.defaultPrevented = !1),
                (this.isTrusted = !1),
                (this.target = null),
                (this.type = t),
                (this.bubbles = a),
                (this.cancelable = c));
          },
        },
      });
    },
  }),
  _a = le({
    "external/npm/node_modules/domino/lib/UIEvent.js"(b, v) {
      "use strict";
      var h = br();
      v.exports = s;
      function s() {
        h.call(this), (this.view = null), (this.detail = 0);
      }
      s.prototype = Object.create(h.prototype, {
        constructor: { value: s },
        initUIEvent: {
          value: function (t, a, c, l, f) {
            this.initEvent(t, a, c), (this.view = l), (this.detail = f);
          },
        },
      });
    },
  }),
  ba = le({
    "external/npm/node_modules/domino/lib/MouseEvent.js"(b, v) {
      "use strict";
      var h = _a();
      v.exports = s;
      function s() {
        h.call(this),
          (this.screenX = this.screenY = this.clientX = this.clientY = 0),
          (this.ctrlKey = this.altKey = this.shiftKey = this.metaKey = !1),
          (this.button = 0),
          (this.buttons = 1),
          (this.relatedTarget = null);
      }
      s.prototype = Object.create(h.prototype, {
        constructor: { value: s },
        initMouseEvent: {
          value: function (t, a, c, l, f, i, E, m, w, I, H, R, J, B, y) {
            switch (
              (this.initEvent(t, a, c, l, f),
              (this.screenX = i),
              (this.screenY = E),
              (this.clientX = m),
              (this.clientY = w),
              (this.ctrlKey = I),
              (this.altKey = H),
              (this.shiftKey = R),
              (this.metaKey = J),
              (this.button = B),
              B)
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
            this.relatedTarget = y;
          },
        },
        getModifierState: {
          value: function (t) {
            switch (t) {
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
  wn = le({
    "external/npm/node_modules/domino/lib/DOMException.js"(b, v) {
      "use strict";
      v.exports = D;
      var h = 1,
        s = 3,
        t = 4,
        a = 5,
        c = 7,
        l = 8,
        f = 9,
        i = 11,
        E = 12,
        m = 13,
        w = 14,
        I = 15,
        H = 17,
        R = 18,
        J = 19,
        B = 20,
        y = 21,
        g = 22,
        k = 23,
        _ = 24,
        ae = 25,
        ne = [
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
        Y = [
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
        G = {
          INDEX_SIZE_ERR: h,
          DOMSTRING_SIZE_ERR: 2,
          HIERARCHY_REQUEST_ERR: s,
          WRONG_DOCUMENT_ERR: t,
          INVALID_CHARACTER_ERR: a,
          NO_DATA_ALLOWED_ERR: 6,
          NO_MODIFICATION_ALLOWED_ERR: c,
          NOT_FOUND_ERR: l,
          NOT_SUPPORTED_ERR: f,
          INUSE_ATTRIBUTE_ERR: 10,
          INVALID_STATE_ERR: i,
          SYNTAX_ERR: E,
          INVALID_MODIFICATION_ERR: m,
          NAMESPACE_ERR: w,
          INVALID_ACCESS_ERR: I,
          VALIDATION_ERR: 16,
          TYPE_MISMATCH_ERR: H,
          SECURITY_ERR: R,
          NETWORK_ERR: J,
          ABORT_ERR: B,
          URL_MISMATCH_ERR: y,
          QUOTA_EXCEEDED_ERR: g,
          TIMEOUT_ERR: k,
          INVALID_NODE_TYPE_ERR: _,
          DATA_CLONE_ERR: ae,
        };
      function D(u) {
        Error.call(this),
          Error.captureStackTrace(this, this.constructor),
          (this.code = u),
          (this.message = Y[u]),
          (this.name = ne[u]);
      }
      D.prototype.__proto__ = Error.prototype;
      for (Z in G)
        (P = { value: G[Z] }),
          Object.defineProperty(D, Z, P),
          Object.defineProperty(D.prototype, Z, P);
      var P, Z;
    },
  }),
  Sn = le({
    "external/npm/node_modules/domino/lib/config.js"(b) {
      b.isApiWritable = !globalThis.__domino_frozen__;
    },
  }),
  Be = le({
    "external/npm/node_modules/domino/lib/utils.js"(b) {
      "use strict";
      var v = wn(),
        h = v,
        s = Sn().isApiWritable;
      (b.NAMESPACE = {
        HTML: "http://www.w3.org/1999/xhtml",
        XML: "http://www.w3.org/XML/1998/namespace",
        XMLNS: "http://www.w3.org/2000/xmlns/",
        MATHML: "http://www.w3.org/1998/Math/MathML",
        SVG: "http://www.w3.org/2000/svg",
        XLINK: "http://www.w3.org/1999/xlink",
      }),
        (b.IndexSizeError = function () {
          throw new v(h.INDEX_SIZE_ERR);
        }),
        (b.HierarchyRequestError = function () {
          throw new v(h.HIERARCHY_REQUEST_ERR);
        }),
        (b.WrongDocumentError = function () {
          throw new v(h.WRONG_DOCUMENT_ERR);
        }),
        (b.InvalidCharacterError = function () {
          throw new v(h.INVALID_CHARACTER_ERR);
        }),
        (b.NoModificationAllowedError = function () {
          throw new v(h.NO_MODIFICATION_ALLOWED_ERR);
        }),
        (b.NotFoundError = function () {
          throw new v(h.NOT_FOUND_ERR);
        }),
        (b.NotSupportedError = function () {
          throw new v(h.NOT_SUPPORTED_ERR);
        }),
        (b.InvalidStateError = function () {
          throw new v(h.INVALID_STATE_ERR);
        }),
        (b.SyntaxError = function () {
          throw new v(h.SYNTAX_ERR);
        }),
        (b.InvalidModificationError = function () {
          throw new v(h.INVALID_MODIFICATION_ERR);
        }),
        (b.NamespaceError = function () {
          throw new v(h.NAMESPACE_ERR);
        }),
        (b.InvalidAccessError = function () {
          throw new v(h.INVALID_ACCESS_ERR);
        }),
        (b.TypeMismatchError = function () {
          throw new v(h.TYPE_MISMATCH_ERR);
        }),
        (b.SecurityError = function () {
          throw new v(h.SECURITY_ERR);
        }),
        (b.NetworkError = function () {
          throw new v(h.NETWORK_ERR);
        }),
        (b.AbortError = function () {
          throw new v(h.ABORT_ERR);
        }),
        (b.UrlMismatchError = function () {
          throw new v(h.URL_MISMATCH_ERR);
        }),
        (b.QuotaExceededError = function () {
          throw new v(h.QUOTA_EXCEEDED_ERR);
        }),
        (b.TimeoutError = function () {
          throw new v(h.TIMEOUT_ERR);
        }),
        (b.InvalidNodeTypeError = function () {
          throw new v(h.INVALID_NODE_TYPE_ERR);
        }),
        (b.DataCloneError = function () {
          throw new v(h.DATA_CLONE_ERR);
        }),
        (b.nyi = function () {
          throw new Error("NotYetImplemented");
        }),
        (b.shouldOverride = function () {
          throw new Error(
            "Abstract function; should be overriding in subclass."
          );
        }),
        (b.assert = function (t, a) {
          if (!t)
            throw new Error(
              "Assertion failed: " +
                (a || "") +
                `
` +
                new Error().stack
            );
        }),
        (b.expose = function (t, a) {
          for (var c in t)
            Object.defineProperty(a.prototype, c, { value: t[c], writable: s });
        }),
        (b.merge = function (t, a) {
          for (var c in a) t[c] = a[c];
        }),
        (b.documentOrder = function (t, a) {
          return 3 - (t.compareDocumentPosition(a) & 6);
        }),
        (b.toASCIILowerCase = function (t) {
          return t.replace(/[A-Z]+/g, function (a) {
            return a.toLowerCase();
          });
        }),
        (b.toASCIIUpperCase = function (t) {
          return t.replace(/[a-z]+/g, function (a) {
            return a.toUpperCase();
          });
        });
    },
  }),
  Ea = le({
    "external/npm/node_modules/domino/lib/EventTarget.js"(b, v) {
      "use strict";
      var h = br(),
        s = ba(),
        t = Be();
      v.exports = a;
      function a() {}
      a.prototype = {
        addEventListener: function (l, f, i) {
          if (f) {
            i === void 0 && (i = !1),
              this._listeners || (this._listeners = Object.create(null)),
              this._listeners[l] || (this._listeners[l] = []);
            for (var E = this._listeners[l], m = 0, w = E.length; m < w; m++) {
              var I = E[m];
              if (I.listener === f && I.capture === i) return;
            }
            var H = { listener: f, capture: i };
            typeof f == "function" && (H.f = f), E.push(H);
          }
        },
        removeEventListener: function (l, f, i) {
          if ((i === void 0 && (i = !1), this._listeners)) {
            var E = this._listeners[l];
            if (E)
              for (var m = 0, w = E.length; m < w; m++) {
                var I = E[m];
                if (I.listener === f && I.capture === i) {
                  E.length === 1
                    ? (this._listeners[l] = void 0)
                    : E.splice(m, 1);
                  return;
                }
              }
          }
        },
        dispatchEvent: function (l) {
          return this._dispatchEvent(l, !1);
        },
        _dispatchEvent: function (l, f) {
          typeof f != "boolean" && (f = !1);
          function i(R, J) {
            var B = J.type,
              y = J.eventPhase;
            if (
              ((J.currentTarget = R),
              y !== h.CAPTURING_PHASE && R._handlers && R._handlers[B])
            ) {
              var g = R._handlers[B],
                k;
              if (typeof g == "function") k = g.call(J.currentTarget, J);
              else {
                var _ = g.handleEvent;
                if (typeof _ != "function")
                  throw new TypeError(
                    "handleEvent property of event handler object isnot a function."
                  );
                k = _.call(g, J);
              }
              switch (J.type) {
                case "mouseover":
                  k === !0 && J.preventDefault();
                  break;
                case "beforeunload":
                default:
                  k === !1 && J.preventDefault();
                  break;
              }
            }
            var ae = R._listeners && R._listeners[B];
            if (ae) {
              ae = ae.slice();
              for (var ne = 0, Y = ae.length; ne < Y; ne++) {
                if (J._immediatePropagationStopped) return;
                var G = ae[ne];
                if (
                  !(
                    (y === h.CAPTURING_PHASE && !G.capture) ||
                    (y === h.BUBBLING_PHASE && G.capture)
                  )
                )
                  if (G.f) G.f.call(J.currentTarget, J);
                  else {
                    var D = G.listener.handleEvent;
                    if (typeof D != "function")
                      throw new TypeError(
                        "handleEvent property of event listener object is not a function."
                      );
                    D.call(G.listener, J);
                  }
              }
            }
          }
          (!l._initialized || l._dispatching) && t.InvalidStateError(),
            (l.isTrusted = f),
            (l._dispatching = !0),
            (l.target = this);
          for (var E = [], m = this.parentNode; m; m = m.parentNode) E.push(m);
          l.eventPhase = h.CAPTURING_PHASE;
          for (
            var w = E.length - 1;
            w >= 0 && (i(E[w], l), !l._propagationStopped);
            w--
          );
          if (
            (l._propagationStopped ||
              ((l.eventPhase = h.AT_TARGET), i(this, l)),
            l.bubbles && !l._propagationStopped)
          ) {
            l.eventPhase = h.BUBBLING_PHASE;
            for (
              var I = 0, H = E.length;
              I < H && (i(E[I], l), !l._propagationStopped);
              I++
            );
          }
          if (
            ((l._dispatching = !1),
            (l.eventPhase = h.AT_TARGET),
            (l.currentTarget = null),
            f && !l.defaultPrevented && l instanceof s)
          )
            switch (l.type) {
              case "mousedown":
                this._armed = { x: l.clientX, y: l.clientY, t: l.timeStamp };
                break;
              case "mouseout":
              case "mouseover":
                this._armed = null;
                break;
              case "mouseup":
                this._isClick(l) && this._doClick(l), (this._armed = null);
                break;
            }
          return !l.defaultPrevented;
        },
        _isClick: function (c) {
          return (
            this._armed !== null &&
            c.type === "mouseup" &&
            c.isTrusted &&
            c.button === 0 &&
            c.timeStamp - this._armed.t < 1e3 &&
            Math.abs(c.clientX - this._armed.x) < 10 &&
            Math.abs(c.clientY - this._armed.Y) < 10
          );
        },
        _doClick: function (c) {
          if (!this._click_in_progress) {
            this._click_in_progress = !0;
            for (var l = this; l && !l._post_click_activation_steps; )
              l = l.parentNode;
            l &&
              l._pre_click_activation_steps &&
              l._pre_click_activation_steps();
            var f = this.ownerDocument.createEvent("MouseEvent");
            f.initMouseEvent(
              "click",
              !0,
              !0,
              this.ownerDocument.defaultView,
              1,
              c.screenX,
              c.screenY,
              c.clientX,
              c.clientY,
              c.ctrlKey,
              c.altKey,
              c.shiftKey,
              c.metaKey,
              c.button,
              null
            );
            var i = this._dispatchEvent(f, !0);
            l &&
              (i
                ? l._post_click_activation_steps &&
                  l._post_click_activation_steps(f)
                : l._cancelled_activation_steps &&
                  l._cancelled_activation_steps());
          }
        },
        _setEventHandler: function (l, f) {
          this._handlers || (this._handlers = Object.create(null)),
            (this._handlers[l] = f);
        },
        _getEventHandler: function (l) {
          return (this._handlers && this._handlers[l]) || null;
        },
      };
    },
  }),
  va = le({
    "external/npm/node_modules/domino/lib/LinkedList.js"(b, v) {
      "use strict";
      var h = Be(),
        s = (v.exports = {
          valid: function (t) {
            return (
              h.assert(t, "list falsy"),
              h.assert(t._previousSibling, "previous falsy"),
              h.assert(t._nextSibling, "next falsy"),
              !0
            );
          },
          insertBefore: function (t, a) {
            h.assert(s.valid(t) && s.valid(a));
            var c = t,
              l = t._previousSibling,
              f = a,
              i = a._previousSibling;
            (c._previousSibling = i),
              (l._nextSibling = f),
              (i._nextSibling = c),
              (f._previousSibling = l),
              h.assert(s.valid(t) && s.valid(a));
          },
          replace: function (t, a) {
            h.assert(s.valid(t) && (a === null || s.valid(a))),
              a !== null && s.insertBefore(a, t),
              s.remove(t),
              h.assert(s.valid(t) && (a === null || s.valid(a)));
          },
          remove: function (t) {
            h.assert(s.valid(t));
            var a = t._previousSibling;
            if (a !== t) {
              var c = t._nextSibling;
              (a._nextSibling = c),
                (c._previousSibling = a),
                (t._previousSibling = t._nextSibling = t),
                h.assert(s.valid(t));
            }
          },
        });
    },
  }),
  Ta = le({
    "external/npm/node_modules/domino/lib/NodeUtils.js"(b, v) {
      "use strict";
      v.exports = {
        serializeOne: J,
        ɵescapeMatchingClosingTag: w,
        ɵescapeClosingCommentTag: H,
        ɵescapeProcessingInstructionContent: R,
      };
      var h = Be(),
        s = h.NAMESPACE,
        t = {
          STYLE: !0,
          SCRIPT: !0,
          XMP: !0,
          IFRAME: !0,
          NOEMBED: !0,
          NOFRAMES: !0,
          PLAINTEXT: !0,
        },
        a = {
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
        c = {},
        l = /[&<>\u00A0]/g,
        f = /[&"<>\u00A0]/g;
      function i(B) {
        return l.test(B)
          ? B.replace(l, (y) => {
              switch (y) {
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
          : B;
      }
      function E(B) {
        return f.test(B)
          ? B.replace(f, (y) => {
              switch (y) {
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
          : B;
      }
      function m(B) {
        var y = B.namespaceURI;
        return y
          ? y === s.XML
            ? "xml:" + B.localName
            : y === s.XLINK
              ? "xlink:" + B.localName
              : y === s.XMLNS
                ? B.localName === "xmlns"
                  ? "xmlns"
                  : "xmlns:" + B.localName
                : B.name
          : B.localName;
      }
      function w(B, y) {
        let g = "</" + y;
        if (!B.toLowerCase().includes(g)) return B;
        let k = [...B],
          _ = B.matchAll(new RegExp(g, "ig"));
        for (let ae of _) k[ae.index] = "&lt;";
        return k.join("");
      }
      var I = /--!?>/;
      function H(B) {
        return I.test(B) ? B.replace(/(--\!?)>/g, "$1&gt;") : B;
      }
      function R(B) {
        return B.includes(">") ? B.replaceAll(">", "&gt;") : B;
      }
      function J(B, y) {
        var g = "";
        switch (B.nodeType) {
          case 1:
            var k = B.namespaceURI,
              _ = k === s.HTML,
              ae = _ || k === s.SVG || k === s.MATHML ? B.localName : B.tagName;
            g += "<" + ae;
            for (var ne = 0, Y = B._numattrs; ne < Y; ne++) {
              var G = B._attr(ne);
              (g += " " + m(G)),
                G.value !== void 0 && (g += '="' + E(G.value) + '"');
            }
            if (((g += ">"), !(_ && a[ae]))) {
              var D = B.serialize();
              t[ae.toUpperCase()] && (D = w(D, ae)),
                _ &&
                  c[ae] &&
                  D.charAt(0) ===
                    `
` &&
                  (g += `
`),
                (g += D),
                (g += "</" + ae + ">");
            }
            break;
          case 3:
          case 4:
            var P;
            y.nodeType === 1 && y.namespaceURI === s.HTML
              ? (P = y.tagName)
              : (P = ""),
              t[P] || (P === "NOSCRIPT" && y.ownerDocument._scripting_enabled)
                ? (g += B.data)
                : (g += i(B.data));
            break;
          case 8:
            g += "<!--" + H(B.data) + "-->";
            break;
          case 7:
            let Z = R(B.data);
            g += "<?" + B.target + " " + Z + "?>";
            break;
          case 10:
            (g += "<!DOCTYPE " + B.name), (g += ">");
            break;
          default:
            h.InvalidStateError();
        }
        return g;
      }
    },
  }),
  Ve = le({
    "external/npm/node_modules/domino/lib/Node.js"(b, v) {
      "use strict";
      v.exports = c;
      var h = Ea(),
        s = va(),
        t = Ta(),
        a = Be();
      function c() {
        h.call(this),
          (this.parentNode = null),
          (this._nextSibling = this._previousSibling = this),
          (this._index = void 0);
      }
      var l = (c.ELEMENT_NODE = 1),
        f = (c.ATTRIBUTE_NODE = 2),
        i = (c.TEXT_NODE = 3),
        E = (c.CDATA_SECTION_NODE = 4),
        m = (c.ENTITY_REFERENCE_NODE = 5),
        w = (c.ENTITY_NODE = 6),
        I = (c.PROCESSING_INSTRUCTION_NODE = 7),
        H = (c.COMMENT_NODE = 8),
        R = (c.DOCUMENT_NODE = 9),
        J = (c.DOCUMENT_TYPE_NODE = 10),
        B = (c.DOCUMENT_FRAGMENT_NODE = 11),
        y = (c.NOTATION_NODE = 12),
        g = (c.DOCUMENT_POSITION_DISCONNECTED = 1),
        k = (c.DOCUMENT_POSITION_PRECEDING = 2),
        _ = (c.DOCUMENT_POSITION_FOLLOWING = 4),
        ae = (c.DOCUMENT_POSITION_CONTAINS = 8),
        ne = (c.DOCUMENT_POSITION_CONTAINED_BY = 16),
        Y = (c.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC = 32);
      c.prototype = Object.create(h.prototype, {
        baseURI: { get: a.nyi },
        parentElement: {
          get: function () {
            return this.parentNode && this.parentNode.nodeType === l
              ? this.parentNode
              : null;
          },
        },
        hasChildNodes: { value: a.shouldOverride },
        firstChild: { get: a.shouldOverride },
        lastChild: { get: a.shouldOverride },
        isConnected: {
          get: function () {
            let G = this;
            for (; G != null; ) {
              if (G.nodeType === c.DOCUMENT_NODE) return !0;
              (G = G.parentNode),
                G != null &&
                  G.nodeType === c.DOCUMENT_FRAGMENT_NODE &&
                  (G = G.host);
            }
            return !1;
          },
        },
        previousSibling: {
          get: function () {
            var G = this.parentNode;
            return !G || this === G.firstChild ? null : this._previousSibling;
          },
        },
        nextSibling: {
          get: function () {
            var G = this.parentNode,
              D = this._nextSibling;
            return !G || D === G.firstChild ? null : D;
          },
        },
        textContent: {
          get: function () {
            return null;
          },
          set: function (G) {},
        },
        innerText: {
          get: function () {
            return null;
          },
          set: function (G) {},
        },
        _countChildrenOfType: {
          value: function (G) {
            for (var D = 0, P = this.firstChild; P !== null; P = P.nextSibling)
              P.nodeType === G && D++;
            return D;
          },
        },
        _ensureInsertValid: {
          value: function (D, P, Z) {
            var u = this,
              o,
              n;
            if (!D.nodeType) throw new TypeError("not a node");
            switch (u.nodeType) {
              case R:
              case B:
              case l:
                break;
              default:
                a.HierarchyRequestError();
            }
            switch (
              (D.isAncestor(u) && a.HierarchyRequestError(),
              (P !== null || !Z) && P.parentNode !== u && a.NotFoundError(),
              D.nodeType)
            ) {
              case B:
              case J:
              case l:
              case i:
              case I:
              case H:
                break;
              default:
                a.HierarchyRequestError();
            }
            if (u.nodeType === R)
              switch (D.nodeType) {
                case i:
                  a.HierarchyRequestError();
                  break;
                case B:
                  switch (
                    (D._countChildrenOfType(i) > 0 && a.HierarchyRequestError(),
                    D._countChildrenOfType(l))
                  ) {
                    case 0:
                      break;
                    case 1:
                      if (P !== null)
                        for (
                          Z && P.nodeType === J && a.HierarchyRequestError(),
                            n = P.nextSibling;
                          n !== null;
                          n = n.nextSibling
                        )
                          n.nodeType === J && a.HierarchyRequestError();
                      (o = u._countChildrenOfType(l)),
                        Z
                          ? o > 0 && a.HierarchyRequestError()
                          : (o > 1 || (o === 1 && P.nodeType !== l)) &&
                            a.HierarchyRequestError();
                      break;
                    default:
                      a.HierarchyRequestError();
                  }
                  break;
                case l:
                  if (P !== null)
                    for (
                      Z && P.nodeType === J && a.HierarchyRequestError(),
                        n = P.nextSibling;
                      n !== null;
                      n = n.nextSibling
                    )
                      n.nodeType === J && a.HierarchyRequestError();
                  (o = u._countChildrenOfType(l)),
                    Z
                      ? o > 0 && a.HierarchyRequestError()
                      : (o > 1 || (o === 1 && P.nodeType !== l)) &&
                        a.HierarchyRequestError();
                  break;
                case J:
                  if (P === null)
                    u._countChildrenOfType(l) && a.HierarchyRequestError();
                  else
                    for (
                      n = u.firstChild;
                      n !== null && n !== P;
                      n = n.nextSibling
                    )
                      n.nodeType === l && a.HierarchyRequestError();
                  (o = u._countChildrenOfType(J)),
                    Z
                      ? o > 0 && a.HierarchyRequestError()
                      : (o > 1 || (o === 1 && P.nodeType !== J)) &&
                        a.HierarchyRequestError();
                  break;
              }
            else D.nodeType === J && a.HierarchyRequestError();
          },
        },
        insertBefore: {
          value: function (D, P) {
            var Z = this;
            Z._ensureInsertValid(D, P, !0);
            var u = P;
            return (
              u === D && (u = D.nextSibling),
              Z.doc.adoptNode(D),
              D._insertOrReplace(Z, u, !1),
              D
            );
          },
        },
        appendChild: {
          value: function (G) {
            return this.insertBefore(G, null);
          },
        },
        _appendChild: {
          value: function (G) {
            G._insertOrReplace(this, null, !1);
          },
        },
        removeChild: {
          value: function (D) {
            var P = this;
            if (!D.nodeType) throw new TypeError("not a node");
            return D.parentNode !== P && a.NotFoundError(), D.remove(), D;
          },
        },
        replaceChild: {
          value: function (D, P) {
            var Z = this;
            return (
              Z._ensureInsertValid(D, P, !1),
              D.doc !== Z.doc && Z.doc.adoptNode(D),
              D._insertOrReplace(Z, P, !0),
              P
            );
          },
        },
        contains: {
          value: function (D) {
            return D === null
              ? !1
              : this === D
                ? !0
                : (this.compareDocumentPosition(D) & ne) !== 0;
          },
        },
        compareDocumentPosition: {
          value: function (D) {
            if (this === D) return 0;
            if (this.doc !== D.doc || this.rooted !== D.rooted) return g + Y;
            for (var P = [], Z = [], u = this; u !== null; u = u.parentNode)
              P.push(u);
            for (u = D; u !== null; u = u.parentNode) Z.push(u);
            if ((P.reverse(), Z.reverse(), P[0] !== Z[0])) return g + Y;
            u = Math.min(P.length, Z.length);
            for (var o = 1; o < u; o++)
              if (P[o] !== Z[o]) return P[o].index < Z[o].index ? _ : k;
            return P.length < Z.length ? _ + ne : k + ae;
          },
        },
        isSameNode: {
          value: function (D) {
            return this === D;
          },
        },
        isEqualNode: {
          value: function (D) {
            if (!D || D.nodeType !== this.nodeType || !this.isEqual(D))
              return !1;
            for (
              var P = this.firstChild, Z = D.firstChild;
              P && Z;
              P = P.nextSibling, Z = Z.nextSibling
            )
              if (!P.isEqualNode(Z)) return !1;
            return P === null && Z === null;
          },
        },
        cloneNode: {
          value: function (G) {
            var D = this.clone();
            if (G)
              for (var P = this.firstChild; P !== null; P = P.nextSibling)
                D._appendChild(P.cloneNode(!0));
            return D;
          },
        },
        lookupPrefix: {
          value: function (D) {
            var P;
            if (D === "" || D === null || D === void 0) return null;
            switch (this.nodeType) {
              case l:
                return this._lookupNamespacePrefix(D, this);
              case R:
                return (P = this.documentElement), P ? P.lookupPrefix(D) : null;
              case w:
              case y:
              case B:
              case J:
                return null;
              case f:
                return (P = this.ownerElement), P ? P.lookupPrefix(D) : null;
              default:
                return (P = this.parentElement), P ? P.lookupPrefix(D) : null;
            }
          },
        },
        lookupNamespaceURI: {
          value: function (D) {
            (D === "" || D === void 0) && (D = null);
            var P;
            switch (this.nodeType) {
              case l:
                return a.shouldOverride();
              case R:
                return (
                  (P = this.documentElement), P ? P.lookupNamespaceURI(D) : null
                );
              case w:
              case y:
              case J:
              case B:
                return null;
              case f:
                return (
                  (P = this.ownerElement), P ? P.lookupNamespaceURI(D) : null
                );
              default:
                return (
                  (P = this.parentElement), P ? P.lookupNamespaceURI(D) : null
                );
            }
          },
        },
        isDefaultNamespace: {
          value: function (D) {
            (D === "" || D === void 0) && (D = null);
            var P = this.lookupNamespaceURI(null);
            return P === D;
          },
        },
        index: {
          get: function () {
            var G = this.parentNode;
            if (this === G.firstChild) return 0;
            var D = G.childNodes;
            if (this._index === void 0 || D[this._index] !== this) {
              for (var P = 0; P < D.length; P++) D[P]._index = P;
              a.assert(D[this._index] === this);
            }
            return this._index;
          },
        },
        isAncestor: {
          value: function (G) {
            if (this.doc !== G.doc || this.rooted !== G.rooted) return !1;
            for (var D = G; D; D = D.parentNode) if (D === this) return !0;
            return !1;
          },
        },
        ensureSameDoc: {
          value: function (G) {
            G.ownerDocument === null
              ? (G.ownerDocument = this.doc)
              : G.ownerDocument !== this.doc && a.WrongDocumentError();
          },
        },
        removeChildren: { value: a.shouldOverride },
        _insertOrReplace: {
          value: function (D, P, Z) {
            var u = this,
              o,
              n;
            if (
              (u.nodeType === B && u.rooted && a.HierarchyRequestError(),
              D._childNodes &&
                ((o = P === null ? D._childNodes.length : P.index),
                u.parentNode === D))
            ) {
              var p = u.index;
              p < o && o--;
            }
            Z && (P.rooted && P.doc.mutateRemove(P), (P.parentNode = null));
            var d = P;
            d === null && (d = D.firstChild);
            var T = u.rooted && D.rooted;
            if (u.nodeType === B) {
              for (
                var C = [0, Z ? 1 : 0], j, re = u.firstChild;
                re !== null;
                re = j
              )
                (j = re.nextSibling), C.push(re), (re.parentNode = D);
              var S = C.length;
              if (
                (Z
                  ? s.replace(d, S > 2 ? C[2] : null)
                  : S > 2 && d !== null && s.insertBefore(C[2], d),
                D._childNodes)
              )
                for (
                  C[0] = P === null ? D._childNodes.length : P._index,
                    D._childNodes.splice.apply(D._childNodes, C),
                    n = 2;
                  n < S;
                  n++
                )
                  C[n]._index = C[0] + (n - 2);
              else
                D._firstChild === P &&
                  (S > 2
                    ? (D._firstChild = C[2])
                    : Z && (D._firstChild = null));
              if (
                (u._childNodes
                  ? (u._childNodes.length = 0)
                  : (u._firstChild = null),
                D.rooted)
              )
                for (D.modify(), n = 2; n < S; n++) D.doc.mutateInsert(C[n]);
            } else {
              if (P === u) return;
              T ? u._remove() : u.parentNode && u.remove(),
                (u.parentNode = D),
                Z
                  ? (s.replace(d, u),
                    D._childNodes
                      ? ((u._index = o), (D._childNodes[o] = u))
                      : D._firstChild === P && (D._firstChild = u))
                  : (d !== null && s.insertBefore(u, d),
                    D._childNodes
                      ? ((u._index = o), D._childNodes.splice(o, 0, u))
                      : D._firstChild === P && (D._firstChild = u)),
                T
                  ? (D.modify(), D.doc.mutateMove(u))
                  : D.rooted && (D.modify(), D.doc.mutateInsert(u));
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
                var G = ++this.doc.modclock, D = this;
                D;
                D = D.parentElement
              )
                D._lastModTime && (D._lastModTime = G);
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
            for (var G, D = this.firstChild; D !== null; D = G)
              if (
                ((G = D.nextSibling),
                D.normalize && D.normalize(),
                D.nodeType === c.TEXT_NODE)
              ) {
                if (D.nodeValue === "") {
                  this.removeChild(D);
                  continue;
                }
                var P = D.previousSibling;
                P !== null &&
                  P.nodeType === c.TEXT_NODE &&
                  (P.appendData(D.nodeValue), this.removeChild(D));
              }
          },
        },
        serialize: {
          value: function () {
            if (this._innerHTML) return this._innerHTML;
            for (var G = "", D = this.firstChild; D !== null; D = D.nextSibling)
              G += t.serializeOne(D, this);
            return G;
          },
        },
        outerHTML: {
          get: function () {
            return t.serializeOne(this, { nodeType: 0 });
          },
          set: a.nyi,
        },
        ELEMENT_NODE: { value: l },
        ATTRIBUTE_NODE: { value: f },
        TEXT_NODE: { value: i },
        CDATA_SECTION_NODE: { value: E },
        ENTITY_REFERENCE_NODE: { value: m },
        ENTITY_NODE: { value: w },
        PROCESSING_INSTRUCTION_NODE: { value: I },
        COMMENT_NODE: { value: H },
        DOCUMENT_NODE: { value: R },
        DOCUMENT_TYPE_NODE: { value: J },
        DOCUMENT_FRAGMENT_NODE: { value: B },
        NOTATION_NODE: { value: y },
        DOCUMENT_POSITION_DISCONNECTED: { value: g },
        DOCUMENT_POSITION_PRECEDING: { value: k },
        DOCUMENT_POSITION_FOLLOWING: { value: _ },
        DOCUMENT_POSITION_CONTAINS: { value: ae },
        DOCUMENT_POSITION_CONTAINED_BY: { value: ne },
        DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: { value: Y },
      });
    },
  }),
  bs = le({
    "external/npm/node_modules/domino/lib/NodeList.es6.js"(b, v) {
      "use strict";
      v.exports = class extends Array {
        constructor(s) {
          if ((super((s && s.length) || 0), s)) for (var t in s) this[t] = s[t];
        }
        item(s) {
          return this[s] || null;
        }
      };
    },
  }),
  Es = le({
    "external/npm/node_modules/domino/lib/NodeList.es5.js"(b, v) {
      "use strict";
      function h(t) {
        return this[t] || null;
      }
      function s(t) {
        return t || (t = []), (t.item = h), t;
      }
      v.exports = s;
    },
  }),
  ar = le({
    "external/npm/node_modules/domino/lib/NodeList.js"(b, v) {
      "use strict";
      var h;
      try {
        h = bs();
      } catch {
        h = Es();
      }
      v.exports = h;
    },
  }),
  kn = le({
    "external/npm/node_modules/domino/lib/ContainerNode.js"(b, v) {
      "use strict";
      v.exports = t;
      var h = Ve(),
        s = ar();
      function t() {
        h.call(this), (this._firstChild = this._childNodes = null);
      }
      t.prototype = Object.create(h.prototype, {
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
            var a = this._childNodes,
              c;
            return a
              ? a.length === 0
                ? null
                : a[a.length - 1]
              : ((c = this._firstChild),
                c === null ? null : c._previousSibling);
          },
        },
        _ensureChildNodes: {
          value: function () {
            if (!this._childNodes) {
              var a = this._firstChild,
                c = a,
                l = (this._childNodes = new s());
              if (a)
                do l.push(c), (c = c._nextSibling);
                while (c !== a);
              this._firstChild = null;
            }
          },
        },
        removeChildren: {
          value: function () {
            for (
              var c = this.rooted ? this.ownerDocument : null,
                l = this.firstChild,
                f;
              l !== null;

            )
              (f = l),
                (l = f.nextSibling),
                c && c.mutateRemove(f),
                (f.parentNode = null);
            this._childNodes
              ? (this._childNodes.length = 0)
              : (this._firstChild = null),
              this.modify();
          },
        },
      });
    },
  }),
  Ln = le({
    "external/npm/node_modules/domino/lib/xmlnames.js"(b) {
      "use strict";
      (b.isValidName = R), (b.isValidQName = J);
      var v = /^[_:A-Za-z][-.:\w]+$/,
        h = /^([_A-Za-z][-.\w]+|[_A-Za-z][-.\w]+:[_A-Za-z][-.\w]+)$/,
        s =
          "_A-Za-z\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD",
        t =
          "-._A-Za-z0-9\xB7\xC0-\xD6\xD8-\xF6\xF8-\u02FF\u0300-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD",
        a = "[" + s + "][" + t + "]*",
        c = s + ":",
        l = t + ":",
        f = new RegExp("^[" + c + "][" + l + "]*$"),
        i = new RegExp("^(" + a + "|" + a + ":" + a + ")$"),
        E = /[\uD800-\uDB7F\uDC00-\uDFFF]/,
        m = /[\uD800-\uDB7F\uDC00-\uDFFF]/g,
        w = /[\uD800-\uDB7F][\uDC00-\uDFFF]/g;
      (s += "\uD800-\u{EFC00}-\uDFFF"),
        (t += "\uD800-\u{EFC00}-\uDFFF"),
        (a = "[" + s + "][" + t + "]*"),
        (c = s + ":"),
        (l = t + ":");
      var I = new RegExp("^[" + c + "][" + l + "]*$"),
        H = new RegExp("^(" + a + "|" + a + ":" + a + ")$");
      function R(B) {
        if (v.test(B) || f.test(B)) return !0;
        if (!E.test(B) || !I.test(B)) return !1;
        var y = B.match(m),
          g = B.match(w);
        return g !== null && 2 * g.length === y.length;
      }
      function J(B) {
        if (h.test(B) || i.test(B)) return !0;
        if (!E.test(B) || !H.test(B)) return !1;
        var y = B.match(m),
          g = B.match(w);
        return g !== null && 2 * g.length === y.length;
      }
    },
  }),
  ya = le({
    "external/npm/node_modules/domino/lib/attributes.js"(b) {
      "use strict";
      var v = Be();
      b.property = function (s) {
        if (Array.isArray(s.type)) {
          var t = Object.create(null);
          s.type.forEach(function (l) {
            t[l.value || l] = l.alias || l;
          });
          var a = s.missing;
          a === void 0 && (a = null);
          var c = s.invalid;
          return (
            c === void 0 && (c = a),
            {
              get: function () {
                var l = this._getattr(s.name);
                return l === null
                  ? a
                  : ((l = t[l.toLowerCase()]),
                    l !== void 0 ? l : c !== null ? c : l);
              },
              set: function (l) {
                this._setattr(s.name, l);
              },
            }
          );
        } else {
          if (s.type === Boolean)
            return {
              get: function () {
                return this.hasAttribute(s.name);
              },
              set: function (l) {
                l ? this._setattr(s.name, "") : this.removeAttribute(s.name);
              },
            };
          if (
            s.type === Number ||
            s.type === "long" ||
            s.type === "unsigned long" ||
            s.type === "limited unsigned long with fallback"
          )
            return h(s);
          if (!s.type || s.type === String)
            return {
              get: function () {
                return this._getattr(s.name) || "";
              },
              set: function (l) {
                s.treatNullAsEmptyString && l === null && (l = ""),
                  this._setattr(s.name, l);
              },
            };
          if (typeof s.type == "function") return s.type(s.name, s);
        }
        throw new Error("Invalid attribute definition");
      };
      function h(s) {
        var t;
        typeof s.default == "function"
          ? (t = s.default)
          : typeof s.default == "number"
            ? (t = function () {
                return s.default;
              })
            : (t = function () {
                v.assert(!1, typeof s.default);
              });
        var a = s.type === "unsigned long",
          c = s.type === "long",
          l = s.type === "limited unsigned long with fallback",
          f = s.min,
          i = s.max,
          E = s.setmin;
        return (
          f === void 0 && (a && (f = 0), c && (f = -2147483648), l && (f = 1)),
          i === void 0 && (a || c || l) && (i = 2147483647),
          {
            get: function () {
              var m = this._getattr(s.name),
                w = s.float ? parseFloat(m) : parseInt(m, 10);
              if (
                m === null ||
                !isFinite(w) ||
                (f !== void 0 && w < f) ||
                (i !== void 0 && w > i)
              )
                return t.call(this);
              if (a || c || l) {
                if (!/^[ \t\n\f\r]*[-+]?[0-9]/.test(m)) return t.call(this);
                w = w | 0;
              }
              return w;
            },
            set: function (m) {
              s.float || (m = Math.floor(m)),
                E !== void 0 &&
                  m < E &&
                  v.IndexSizeError(s.name + " set to " + m),
                a
                  ? (m = m < 0 || m > 2147483647 ? t.call(this) : m | 0)
                  : l
                    ? (m = m < 1 || m > 2147483647 ? t.call(this) : m | 0)
                    : c &&
                      (m =
                        m < -2147483648 || m > 2147483647
                          ? t.call(this)
                          : m | 0),
                this._setattr(s.name, String(m));
            },
          }
        );
      }
      b.registerChangeHandler = function (s, t, a) {
        var c = s.prototype;
        Object.prototype.hasOwnProperty.call(c, "_attributeChangeHandlers") ||
          (c._attributeChangeHandlers = Object.create(
            c._attributeChangeHandlers || null
          )),
          (c._attributeChangeHandlers[t] = a);
      };
    },
  }),
  vs = le({
    "external/npm/node_modules/domino/lib/FilteredElementList.js"(b, v) {
      "use strict";
      v.exports = s;
      var h = Ve();
      function s(t, a) {
        (this.root = t),
          (this.filter = a),
          (this.lastModTime = t.lastModTime),
          (this.done = !1),
          (this.cache = []),
          this.traverse();
      }
      s.prototype = Object.create(Object.prototype, {
        length: {
          get: function () {
            return (
              this.checkcache(), this.done || this.traverse(), this.cache.length
            );
          },
        },
        item: {
          value: function (t) {
            return (
              this.checkcache(),
              !this.done && t >= this.cache.length && this.traverse(),
              this.cache[t]
            );
          },
        },
        checkcache: {
          value: function () {
            if (this.lastModTime !== this.root.lastModTime) {
              for (var t = this.cache.length - 1; t >= 0; t--) this[t] = void 0;
              (this.cache.length = 0),
                (this.done = !1),
                (this.lastModTime = this.root.lastModTime);
            }
          },
        },
        traverse: {
          value: function (t) {
            t !== void 0 && t++;
            for (var a; (a = this.next()) !== null; )
              if (
                ((this[this.cache.length] = a),
                this.cache.push(a),
                t && this.cache.length === t)
              )
                return;
            this.done = !0;
          },
        },
        next: {
          value: function () {
            var t =
                this.cache.length === 0
                  ? this.root
                  : this.cache[this.cache.length - 1],
              a;
            for (
              t.nodeType === h.DOCUMENT_NODE
                ? (a = t.documentElement)
                : (a = t.nextElement(this.root));
              a;

            ) {
              if (this.filter(a)) return a;
              a = a.nextElement(this.root);
            }
            return null;
          },
        },
      });
    },
  }),
  Na = le({
    "external/npm/node_modules/domino/lib/DOMTokenList.js"(b, v) {
      "use strict";
      var h = Be();
      v.exports = s;
      function s(f, i) {
        (this._getString = f),
          (this._setString = i),
          (this._length = 0),
          (this._lastStringValue = ""),
          this._update();
      }
      Object.defineProperties(s.prototype, {
        length: {
          get: function () {
            return this._length;
          },
        },
        item: {
          value: function (f) {
            var i = l(this);
            return f < 0 || f >= i.length ? null : i[f];
          },
        },
        contains: {
          value: function (f) {
            f = String(f);
            var i = l(this);
            return i.indexOf(f) > -1;
          },
        },
        add: {
          value: function () {
            for (var f = l(this), i = 0, E = arguments.length; i < E; i++) {
              var m = a(arguments[i]);
              f.indexOf(m) < 0 && f.push(m);
            }
            this._update(f);
          },
        },
        remove: {
          value: function () {
            for (var f = l(this), i = 0, E = arguments.length; i < E; i++) {
              var m = a(arguments[i]),
                w = f.indexOf(m);
              w > -1 && f.splice(w, 1);
            }
            this._update(f);
          },
        },
        toggle: {
          value: function (i, E) {
            return (
              (i = a(i)),
              this.contains(i)
                ? E === void 0 || E === !1
                  ? (this.remove(i), !1)
                  : !0
                : E === void 0 || E === !0
                  ? (this.add(i), !0)
                  : !1
            );
          },
        },
        replace: {
          value: function (i, E) {
            String(E) === "" && h.SyntaxError(), (i = a(i)), (E = a(E));
            var m = l(this),
              w = m.indexOf(i);
            if (w < 0) return !1;
            var I = m.indexOf(E);
            return (
              I < 0
                ? (m[w] = E)
                : w < I
                  ? ((m[w] = E), m.splice(I, 1))
                  : m.splice(w, 1),
              this._update(m),
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
          set: function (f) {
            this._setString(f), this._update();
          },
        },
        _update: {
          value: function (f) {
            f
              ? (t(this, f), this._setString(f.join(" ").trim()))
              : t(this, l(this)),
              (this._lastStringValue = this._getString());
          },
        },
      });
      function t(f, i) {
        var E = f._length,
          m;
        for (f._length = i.length, m = 0; m < i.length; m++) f[m] = i[m];
        for (; m < E; m++) f[m] = void 0;
      }
      function a(f) {
        return (
          (f = String(f)),
          f === "" && h.SyntaxError(),
          /[ \t\r\n\f]/.test(f) && h.InvalidCharacterError(),
          f
        );
      }
      function c(f) {
        for (var i = f._length, E = Array(i), m = 0; m < i; m++) E[m] = f[m];
        return E;
      }
      function l(f) {
        var i = f._getString();
        if (i === f._lastStringValue) return c(f);
        var E = i.replace(/(^[ \t\r\n\f]+)|([ \t\r\n\f]+$)/g, "");
        if (E === "") return [];
        var m = Object.create(null);
        return E.split(/[ \t\r\n\f]+/g).filter(function (w) {
          var I = "$" + w;
          return m[I] ? !1 : ((m[I] = !0), !0);
        });
      }
    },
  }),
  Cn = le({
    "external/npm/node_modules/domino/lib/select.js"(b, v) {
      "use strict";
      var h = Object.create(null, {
          location: {
            get: function () {
              throw new Error("window.location is not supported.");
            },
          },
        }),
        s = function (u, o) {
          return u.compareDocumentPosition(o);
        },
        t = function (u, o) {
          return s(u, o) & 2 ? 1 : -1;
        },
        a = function (u) {
          for (; (u = u.nextSibling) && u.nodeType !== 1; );
          return u;
        },
        c = function (u) {
          for (; (u = u.previousSibling) && u.nodeType !== 1; );
          return u;
        },
        l = function (u) {
          if ((u = u.firstChild))
            for (; u.nodeType !== 1 && (u = u.nextSibling); );
          return u;
        },
        f = function (u) {
          if ((u = u.lastChild))
            for (; u.nodeType !== 1 && (u = u.previousSibling); );
          return u;
        },
        i = function (u) {
          if (!u.parentNode) return !1;
          var o = u.parentNode.nodeType;
          return o === 1 || o === 9;
        },
        E = function (u) {
          if (!u) return u;
          var o = u[0];
          return o === '"' || o === "'"
            ? (u[u.length - 1] === o ? (u = u.slice(1, -1)) : (u = u.slice(1)),
              u.replace(_.str_escape, function (n) {
                var p = /^\\(?:([0-9A-Fa-f]+)|([\r\n\f]+))/.exec(n);
                if (!p) return n.slice(1);
                if (p[2]) return "";
                var d = parseInt(p[1], 16);
                return String.fromCodePoint
                  ? String.fromCodePoint(d)
                  : String.fromCharCode(d);
              }))
            : _.ident.test(u)
              ? m(u)
              : u;
        },
        m = function (u) {
          return u.replace(_.escape, function (o) {
            var n = /^\\([0-9A-Fa-f]+)/.exec(o);
            if (!n) return o[1];
            var p = parseInt(n[1], 16);
            return String.fromCodePoint
              ? String.fromCodePoint(p)
              : String.fromCharCode(p);
          });
        },
        w = (function () {
          return Array.prototype.indexOf
            ? Array.prototype.indexOf
            : function (u, o) {
                for (var n = this.length; n--; ) if (this[n] === o) return n;
                return -1;
              };
        })(),
        I = function (u, o) {
          var n = _.inside.source.replace(/</g, u).replace(/>/g, o);
          return new RegExp(n);
        },
        H = function (u, o, n) {
          return (
            (u = u.source), (u = u.replace(o, n.source || n)), new RegExp(u)
          );
        },
        R = function (u, o) {
          return u
            .replace(/^(?:\w+:\/\/|\/+)/, "")
            .replace(/(?:\/+|\/*#.*?)$/, "")
            .split("/", o)
            .join("/");
        },
        J = function (u, o) {
          var n = u.replace(/\s+/g, ""),
            p;
          return (
            n === "even"
              ? (n = "2n+0")
              : n === "odd"
                ? (n = "2n+1")
                : n.indexOf("n") === -1 && (n = "0n" + n),
            (p = /^([+-])?(\d+)?n([+-])?(\d+)?$/.exec(n)),
            {
              group: p[1] === "-" ? -(p[2] || 1) : +(p[2] || 1),
              offset: p[4] ? (p[3] === "-" ? -p[4] : +p[4]) : 0,
            }
          );
        },
        B = function (u, o, n) {
          var p = J(u),
            d = p.group,
            T = p.offset,
            C = n ? f : l,
            j = n ? c : a;
          return function (re) {
            if (i(re))
              for (var S = C(re.parentNode), A = 0; S; ) {
                if ((o(S, re) && A++, S === re))
                  return (A -= T), d && A ? A % d === 0 && A < 0 == d < 0 : !A;
                S = j(S);
              }
          };
        },
        y = {
          "*": (function () {
            return function () {
              return !0;
            };
          })(),
          type: function (u) {
            return (
              (u = u.toLowerCase()),
              function (o) {
                return o.nodeName.toLowerCase() === u;
              }
            );
          },
          attr: function (u, o, n, p) {
            return (
              (o = g[o]),
              function (d) {
                var T;
                switch (u) {
                  case "for":
                    T = d.htmlFor;
                    break;
                  case "class":
                    (T = d.className),
                      T === "" && d.getAttribute("class") == null && (T = null);
                    break;
                  case "href":
                  case "src":
                    T = d.getAttribute(u, 2);
                    break;
                  case "title":
                    T = d.getAttribute("title") || null;
                    break;
                  case "id":
                  case "lang":
                  case "dir":
                  case "accessKey":
                  case "hidden":
                  case "tabIndex":
                  case "style":
                    if (d.getAttribute) {
                      T = d.getAttribute(u);
                      break;
                    }
                  default:
                    if (d.hasAttribute && !d.hasAttribute(u)) break;
                    T =
                      d[u] != null ? d[u] : d.getAttribute && d.getAttribute(u);
                    break;
                }
                if (T != null)
                  return (
                    (T = T + ""),
                    p && ((T = T.toLowerCase()), (n = n.toLowerCase())),
                    o(T, n)
                  );
              }
            );
          },
          ":first-child": function (u) {
            return !c(u) && i(u);
          },
          ":last-child": function (u) {
            return !a(u) && i(u);
          },
          ":only-child": function (u) {
            return !c(u) && !a(u) && i(u);
          },
          ":nth-child": function (u, o) {
            return B(
              u,
              function () {
                return !0;
              },
              o
            );
          },
          ":nth-last-child": function (u) {
            return y[":nth-child"](u, !0);
          },
          ":root": function (u) {
            return u.ownerDocument.documentElement === u;
          },
          ":empty": function (u) {
            return !u.firstChild;
          },
          ":not": function (u) {
            var o = P(u);
            return function (n) {
              return !o(n);
            };
          },
          ":first-of-type": function (u) {
            if (i(u)) {
              for (var o = u.nodeName; (u = c(u)); )
                if (u.nodeName === o) return;
              return !0;
            }
          },
          ":last-of-type": function (u) {
            if (i(u)) {
              for (var o = u.nodeName; (u = a(u)); )
                if (u.nodeName === o) return;
              return !0;
            }
          },
          ":only-of-type": function (u) {
            return y[":first-of-type"](u) && y[":last-of-type"](u);
          },
          ":nth-of-type": function (u, o) {
            return B(
              u,
              function (n, p) {
                return n.nodeName === p.nodeName;
              },
              o
            );
          },
          ":nth-last-of-type": function (u) {
            return y[":nth-of-type"](u, !0);
          },
          ":checked": function (u) {
            return !!(u.checked || u.selected);
          },
          ":indeterminate": function (u) {
            return !y[":checked"](u);
          },
          ":enabled": function (u) {
            return !u.disabled && u.type !== "hidden";
          },
          ":disabled": function (u) {
            return !!u.disabled;
          },
          ":target": function (u) {
            return u.id === h.location.hash.substring(1);
          },
          ":focus": function (u) {
            return u === u.ownerDocument.activeElement;
          },
          ":is": function (u) {
            return P(u);
          },
          ":matches": function (u) {
            return y[":is"](u);
          },
          ":nth-match": function (u, o) {
            var n = u.split(/\s*,\s*/),
              p = n.shift(),
              d = P(n.join(","));
            return B(p, d, o);
          },
          ":nth-last-match": function (u) {
            return y[":nth-match"](u, !0);
          },
          ":links-here": function (u) {
            return u + "" == h.location + "";
          },
          ":lang": function (u) {
            return function (o) {
              for (; o; ) {
                if (o.lang) return o.lang.indexOf(u) === 0;
                o = o.parentNode;
              }
            };
          },
          ":dir": function (u) {
            return function (o) {
              for (; o; ) {
                if (o.dir) return o.dir === u;
                o = o.parentNode;
              }
            };
          },
          ":scope": function (u, o) {
            var n = o || u.ownerDocument;
            return n.nodeType === 9 ? u === n.documentElement : u === n;
          },
          ":any-link": function (u) {
            return typeof u.href == "string";
          },
          ":local-link": function (u) {
            if (u.nodeName) return u.href && u.host === h.location.host;
            var o = +u + 1;
            return function (n) {
              if (n.href) {
                var p = h.location + "",
                  d = n + "";
                return R(p, o) === R(d, o);
              }
            };
          },
          ":default": function (u) {
            return !!u.defaultSelected;
          },
          ":valid": function (u) {
            return u.willValidate || (u.validity && u.validity.valid);
          },
          ":invalid": function (u) {
            return !y[":valid"](u);
          },
          ":in-range": function (u) {
            return u.value > u.min && u.value <= u.max;
          },
          ":out-of-range": function (u) {
            return !y[":in-range"](u);
          },
          ":required": function (u) {
            return !!u.required;
          },
          ":optional": function (u) {
            return !u.required;
          },
          ":read-only": function (u) {
            if (u.readOnly) return !0;
            var o = u.getAttribute("contenteditable"),
              n = u.contentEditable,
              p = u.nodeName.toLowerCase();
            return (
              (p = p !== "input" && p !== "textarea"),
              (p || u.disabled) && o == null && n !== "true"
            );
          },
          ":read-write": function (u) {
            return !y[":read-only"](u);
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
          ":contains": function (u) {
            return function (o) {
              var n = o.innerText || o.textContent || o.value || "";
              return n.indexOf(u) !== -1;
            };
          },
          ":has": function (u) {
            return function (o) {
              return Z(u, o).length > 0;
            };
          },
        },
        g = {
          "-": function () {
            return !0;
          },
          "=": function (u, o) {
            return u === o;
          },
          "*=": function (u, o) {
            return u.indexOf(o) !== -1;
          },
          "~=": function (u, o) {
            var n, p, d, T;
            for (p = 0; ; p = n + 1) {
              if (((n = u.indexOf(o, p)), n === -1)) return !1;
              if (
                ((d = u[n - 1]),
                (T = u[n + o.length]),
                (!d || d === " ") && (!T || T === " "))
              )
                return !0;
            }
          },
          "|=": function (u, o) {
            var n = u.indexOf(o),
              p;
            if (n === 0) return (p = u[n + o.length]), p === "-" || !p;
          },
          "^=": function (u, o) {
            return u.indexOf(o) === 0;
          },
          "$=": function (u, o) {
            var n = u.lastIndexOf(o);
            return n !== -1 && n + o.length === u.length;
          },
          "!=": function (u, o) {
            return u !== o;
          },
        },
        k = {
          " ": function (u) {
            return function (o) {
              for (; (o = o.parentNode); ) if (u(o)) return o;
            };
          },
          ">": function (u) {
            return function (o) {
              if ((o = o.parentNode)) return u(o) && o;
            };
          },
          "+": function (u) {
            return function (o) {
              if ((o = c(o))) return u(o) && o;
            };
          },
          "~": function (u) {
            return function (o) {
              for (; (o = c(o)); ) if (u(o)) return o;
            };
          },
          noop: function (u) {
            return function (o) {
              return u(o) && o;
            };
          },
          ref: function (u, o) {
            var n;
            function p(d) {
              for (
                var T = d.ownerDocument,
                  C = T.getElementsByTagName("*"),
                  j = C.length;
                j--;

              )
                if (((n = C[j]), p.test(d))) return (n = null), !0;
              n = null;
            }
            return (
              (p.combinator = function (d) {
                if (!(!n || !n.getAttribute)) {
                  var T = n.getAttribute(o) || "";
                  if (
                    (T[0] === "#" && (T = T.substring(1)), T === d.id && u(n))
                  )
                    return n;
                }
              }),
              p
            );
          },
        },
        _ = {
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
      (_.cssid = H(_.cssid, "nonascii", _.nonascii)),
        (_.cssid = H(_.cssid, "escape", _.escape)),
        (_.qname = H(_.qname, "cssid", _.cssid)),
        (_.simple = H(_.simple, "cssid", _.cssid)),
        (_.ref = H(_.ref, "cssid", _.cssid)),
        (_.attr = H(_.attr, "cssid", _.cssid)),
        (_.pseudo = H(_.pseudo, "cssid", _.cssid)),
        (_.inside = H(_.inside, `[^"'>]*`, _.inside)),
        (_.attr = H(_.attr, "inside", I("\\[", "\\]"))),
        (_.pseudo = H(_.pseudo, "inside", I("\\(", "\\)"))),
        (_.simple = H(_.simple, "pseudo", _.pseudo)),
        (_.simple = H(_.simple, "attr", _.attr)),
        (_.ident = H(_.ident, "cssid", _.cssid)),
        (_.str_escape = H(_.str_escape, "escape", _.escape));
      var ae = function (u) {
          for (
            var o = u.replace(/^\s+|\s+$/g, ""),
              n,
              p = [],
              d = [],
              T,
              C,
              j,
              re,
              S;
            o;

          ) {
            if ((j = _.qname.exec(o)))
              (o = o.substring(j[0].length)), (C = m(j[1])), d.push(ne(C, !0));
            else if ((j = _.simple.exec(o)))
              (o = o.substring(j[0].length)),
                (C = "*"),
                d.push(ne(C, !0)),
                d.push(ne(j));
            else throw new SyntaxError("Invalid selector.");
            for (; (j = _.simple.exec(o)); )
              (o = o.substring(j[0].length)), d.push(ne(j));
            if (
              (o[0] === "!" &&
                ((o = o.substring(1)),
                (T = D()),
                (T.qname = C),
                d.push(T.simple)),
              (j = _.ref.exec(o)))
            ) {
              (o = o.substring(j[0].length)),
                (S = k.ref(Y(d), m(j[1]))),
                p.push(S.combinator),
                (d = []);
              continue;
            }
            if ((j = _.combinator.exec(o))) {
              if (
                ((o = o.substring(j[0].length)),
                (re = j[1] || j[2] || j[3]),
                re === ",")
              ) {
                p.push(k.noop(Y(d)));
                break;
              }
            } else re = "noop";
            if (!k[re]) throw new SyntaxError("Bad combinator.");
            p.push(k[re](Y(d))), (d = []);
          }
          return (
            (n = G(p)),
            (n.qname = C),
            (n.sel = o),
            T &&
              ((T.lname = n.qname),
              (T.test = n),
              (T.qname = T.qname),
              (T.sel = n.sel),
              (n = T)),
            S && ((S.test = n), (S.qname = n.qname), (S.sel = n.sel), (n = S)),
            n
          );
        },
        ne = function (u, o) {
          if (o) return u === "*" ? y["*"] : y.type(u);
          if (u[1])
            return u[1][0] === "."
              ? y.attr("class", "~=", m(u[1].substring(1)), !1)
              : y.attr("id", "=", m(u[1].substring(1)), !1);
          if (u[2]) return u[3] ? y[m(u[2])](E(u[3])) : y[m(u[2])];
          if (u[4]) {
            var n = u[6],
              p = /["'\s]\s*I$/i.test(n);
            return (
              p && (n = n.replace(/\s*I$/i, "")),
              y.attr(m(u[4]), u[5] || "-", E(n), p)
            );
          }
          throw new SyntaxError("Unknown Selector.");
        },
        Y = function (u) {
          var o = u.length,
            n;
          return o < 2
            ? u[0]
            : function (p) {
                if (p) {
                  for (n = 0; n < o; n++) if (!u[n](p)) return;
                  return !0;
                }
              };
        },
        G = function (u) {
          return u.length < 2
            ? function (o) {
                return !!u[0](o);
              }
            : function (o) {
                for (var n = u.length; n--; ) if (!(o = u[n](o))) return;
                return !0;
              };
        },
        D = function () {
          var u;
          function o(n) {
            for (
              var p = n.ownerDocument,
                d = p.getElementsByTagName(o.lname),
                T = d.length;
              T--;

            )
              if (o.test(d[T]) && u === n) return (u = null), !0;
            u = null;
          }
          return (
            (o.simple = function (n) {
              return (u = n), !0;
            }),
            o
          );
        },
        P = function (u) {
          for (var o = ae(u), n = [o]; o.sel; ) (o = ae(o.sel)), n.push(o);
          return n.length < 2
            ? o
            : function (p) {
                for (var d = n.length, T = 0; T < d; T++)
                  if (n[T](p)) return !0;
              };
        },
        Z = function (u, o) {
          for (
            var n = [],
              p = ae(u),
              d = o.getElementsByTagName(p.qname),
              T = 0,
              C;
            (C = d[T++]);

          )
            p(C) && n.push(C);
          if (p.sel) {
            for (; p.sel; )
              for (
                p = ae(p.sel), d = o.getElementsByTagName(p.qname), T = 0;
                (C = d[T++]);

              )
                p(C) && w.call(n, C) === -1 && n.push(C);
            n.sort(t);
          }
          return n;
        };
      (v.exports = b =
        function (u, o) {
          var n, p;
          if (o.nodeType !== 11 && u.indexOf(" ") === -1) {
            if (
              u[0] === "#" &&
              o.rooted &&
              /^#[A-Z_][-A-Z0-9_]*$/i.test(u) &&
              o.doc._hasMultipleElementsWithId &&
              ((n = u.substring(1)), !o.doc._hasMultipleElementsWithId(n))
            )
              return (p = o.doc.getElementById(n)), p ? [p] : [];
            if (u[0] === "." && /^\.\w+$/.test(u))
              return o.getElementsByClassName(u.substring(1));
            if (/^\w+$/.test(u)) return o.getElementsByTagName(u);
          }
          return Z(u, o);
        }),
        (b.selectors = y),
        (b.operators = g),
        (b.combinators = k),
        (b.matches = function (u, o) {
          var n = { sel: o };
          do if (((n = ae(n.sel)), n(u))) return !0;
          while (n.sel);
          return !1;
        });
    },
  }),
  Dn = le({
    "external/npm/node_modules/domino/lib/ChildNode.js"(b, v) {
      "use strict";
      var h = Ve(),
        s = va(),
        t = function (c, l) {
          for (var f = c.createDocumentFragment(), i = 0; i < l.length; i++) {
            var E = l[i],
              m = E instanceof h;
            f.appendChild(m ? E : c.createTextNode(String(E)));
          }
          return f;
        },
        a = {
          after: {
            value: function () {
              var l = Array.prototype.slice.call(arguments),
                f = this.parentNode,
                i = this.nextSibling;
              if (f !== null) {
                for (
                  ;
                  i &&
                  l.some(function (m) {
                    return m === i;
                  });

                )
                  i = i.nextSibling;
                var E = t(this.doc, l);
                f.insertBefore(E, i);
              }
            },
          },
          before: {
            value: function () {
              var l = Array.prototype.slice.call(arguments),
                f = this.parentNode,
                i = this.previousSibling;
              if (f !== null) {
                for (
                  ;
                  i &&
                  l.some(function (w) {
                    return w === i;
                  });

                )
                  i = i.previousSibling;
                var E = t(this.doc, l),
                  m = i ? i.nextSibling : f.firstChild;
                f.insertBefore(E, m);
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
              var l = this.parentNode;
              l !== null &&
                (l._childNodes
                  ? l._childNodes.splice(this.index, 1)
                  : l._firstChild === this &&
                    (this._nextSibling === this
                      ? (l._firstChild = null)
                      : (l._firstChild = this._nextSibling)),
                s.remove(this),
                l.modify());
            },
          },
          replaceWith: {
            value: function () {
              var l = Array.prototype.slice.call(arguments),
                f = this.parentNode,
                i = this.nextSibling;
              if (f !== null) {
                for (
                  ;
                  i &&
                  l.some(function (m) {
                    return m === i;
                  });

                )
                  i = i.nextSibling;
                var E = t(this.doc, l);
                this.parentNode === f
                  ? f.replaceChild(E, this)
                  : f.insertBefore(E, i);
              }
            },
          },
        };
      v.exports = a;
    },
  }),
  wa = le({
    "external/npm/node_modules/domino/lib/NonDocumentTypeChildNode.js"(b, v) {
      "use strict";
      var h = Ve(),
        s = {
          nextElementSibling: {
            get: function () {
              if (this.parentNode) {
                for (var t = this.nextSibling; t !== null; t = t.nextSibling)
                  if (t.nodeType === h.ELEMENT_NODE) return t;
              }
              return null;
            },
          },
          previousElementSibling: {
            get: function () {
              if (this.parentNode) {
                for (
                  var t = this.previousSibling;
                  t !== null;
                  t = t.previousSibling
                )
                  if (t.nodeType === h.ELEMENT_NODE) return t;
              }
              return null;
            },
          },
        };
      v.exports = s;
    },
  }),
  Sa = le({
    "external/npm/node_modules/domino/lib/NamedNodeMap.js"(b, v) {
      "use strict";
      v.exports = s;
      var h = Be();
      function s(t) {
        this.element = t;
      }
      Object.defineProperties(s.prototype, {
        length: { get: h.shouldOverride },
        item: { value: h.shouldOverride },
        getNamedItem: {
          value: function (a) {
            return this.element.getAttributeNode(a);
          },
        },
        getNamedItemNS: {
          value: function (a, c) {
            return this.element.getAttributeNodeNS(a, c);
          },
        },
        setNamedItem: { value: h.nyi },
        setNamedItemNS: { value: h.nyi },
        removeNamedItem: {
          value: function (a) {
            var c = this.element.getAttributeNode(a);
            if (c) return this.element.removeAttribute(a), c;
            h.NotFoundError();
          },
        },
        removeNamedItemNS: {
          value: function (a, c) {
            var l = this.element.getAttributeNodeNS(a, c);
            if (l) return this.element.removeAttributeNS(a, c), l;
            h.NotFoundError();
          },
        },
      });
    },
  }),
  Er = le({
    "external/npm/node_modules/domino/lib/Element.js"(b, v) {
      "use strict";
      v.exports = y;
      var h = Ln(),
        s = Be(),
        t = s.NAMESPACE,
        a = ya(),
        c = Ve(),
        l = ar(),
        f = Ta(),
        i = vs(),
        E = wn(),
        m = Na(),
        w = Cn(),
        I = kn(),
        H = Dn(),
        R = wa(),
        J = Sa(),
        B = Object.create(null);
      function y(o, n, p, d) {
        I.call(this),
          (this.nodeType = c.ELEMENT_NODE),
          (this.ownerDocument = o),
          (this.localName = n),
          (this.namespaceURI = p),
          (this.prefix = d),
          (this._tagName = void 0),
          (this._attrsByQName = Object.create(null)),
          (this._attrsByLName = Object.create(null)),
          (this._attrKeys = []);
      }
      function g(o, n) {
        if (o.nodeType === c.TEXT_NODE) n.push(o._data);
        else
          for (var p = 0, d = o.childNodes.length; p < d; p++)
            g(o.childNodes[p], n);
      }
      (y.prototype = Object.create(I.prototype, {
        isHTML: {
          get: function () {
            return this.namespaceURI === t.HTML && this.ownerDocument.isHTML;
          },
        },
        tagName: {
          get: function () {
            if (this._tagName === void 0) {
              var n;
              if (
                (this.prefix === null
                  ? (n = this.localName)
                  : (n = this.prefix + ":" + this.localName),
                this.isHTML)
              ) {
                var p = B[n];
                p || (B[n] = p = s.toASCIIUpperCase(n)), (n = p);
              }
              this._tagName = n;
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
            var o = [];
            return g(this, o), o.join("");
          },
          set: function (o) {
            this.removeChildren(),
              o != null &&
                o !== "" &&
                this._appendChild(this.ownerDocument.createTextNode(o));
          },
        },
        innerText: {
          get: function () {
            var o = [];
            return (
              g(this, o),
              o
                .join("")
                .replace(/[ \t\n\f\r]+/g, " ")
                .trim()
            );
          },
          set: function (o) {
            this.removeChildren(),
              o != null &&
                o !== "" &&
                this._appendChild(this.ownerDocument.createTextNode(o));
          },
        },
        innerHTML: {
          get: function () {
            return this.serialize();
          },
          set: s.nyi,
        },
        outerHTML: {
          get: function () {
            return f.serializeOne(this, { nodeType: 0 });
          },
          set: function (o) {
            var n = this.ownerDocument,
              p = this.parentNode;
            if (p !== null) {
              p.nodeType === c.DOCUMENT_NODE && s.NoModificationAllowedError(),
                p.nodeType === c.DOCUMENT_FRAGMENT_NODE &&
                  (p = p.ownerDocument.createElement("body"));
              var d = n.implementation.mozHTMLParser(n._address, p);
              d.parse(o === null ? "" : String(o), !0),
                this.replaceWith(d._asDocumentFragment());
            }
          },
        },
        _insertAdjacent: {
          value: function (n, p) {
            var d = !1;
            switch (n) {
              case "beforebegin":
                d = !0;
              case "afterend":
                var T = this.parentNode;
                return T === null
                  ? null
                  : T.insertBefore(p, d ? this : this.nextSibling);
              case "afterbegin":
                d = !0;
              case "beforeend":
                return this.insertBefore(p, d ? this.firstChild : null);
              default:
                return s.SyntaxError();
            }
          },
        },
        insertAdjacentElement: {
          value: function (n, p) {
            if (p.nodeType !== c.ELEMENT_NODE)
              throw new TypeError("not an element");
            return (
              (n = s.toASCIILowerCase(String(n))), this._insertAdjacent(n, p)
            );
          },
        },
        insertAdjacentText: {
          value: function (n, p) {
            var d = this.ownerDocument.createTextNode(p);
            (n = s.toASCIILowerCase(String(n))), this._insertAdjacent(n, d);
          },
        },
        insertAdjacentHTML: {
          value: function (n, p) {
            (n = s.toASCIILowerCase(String(n))), (p = String(p));
            var d;
            switch (n) {
              case "beforebegin":
              case "afterend":
                (d = this.parentNode),
                  (d === null || d.nodeType === c.DOCUMENT_NODE) &&
                    s.NoModificationAllowedError();
                break;
              case "afterbegin":
              case "beforeend":
                d = this;
                break;
              default:
                s.SyntaxError();
            }
            (!(d instanceof y) ||
              (d.ownerDocument.isHTML &&
                d.localName === "html" &&
                d.namespaceURI === t.HTML)) &&
              (d = d.ownerDocument.createElementNS(t.HTML, "body"));
            var T = this.ownerDocument.implementation.mozHTMLParser(
              this.ownerDocument._address,
              d
            );
            T.parse(p, !0), this._insertAdjacent(n, T._asDocumentFragment());
          },
        },
        children: {
          get: function () {
            return (
              this._children || (this._children = new ne(this)), this._children
            );
          },
        },
        attributes: {
          get: function () {
            return (
              this._attributes || (this._attributes = new _(this)),
              this._attributes
            );
          },
        },
        firstElementChild: {
          get: function () {
            for (var o = this.firstChild; o !== null; o = o.nextSibling)
              if (o.nodeType === c.ELEMENT_NODE) return o;
            return null;
          },
        },
        lastElementChild: {
          get: function () {
            for (var o = this.lastChild; o !== null; o = o.previousSibling)
              if (o.nodeType === c.ELEMENT_NODE) return o;
            return null;
          },
        },
        childElementCount: {
          get: function () {
            return this.children.length;
          },
        },
        nextElement: {
          value: function (o) {
            o || (o = this.ownerDocument.documentElement);
            var n = this.firstElementChild;
            if (!n) {
              if (this === o) return null;
              n = this.nextElementSibling;
            }
            if (n) return n;
            for (var p = this.parentElement; p && p !== o; p = p.parentElement)
              if (((n = p.nextElementSibling), n)) return n;
            return null;
          },
        },
        getElementsByTagName: {
          value: function (n) {
            var p;
            return n
              ? (n === "*"
                  ? (p = function () {
                      return !0;
                    })
                  : this.isHTML
                    ? (p = G(n))
                    : (p = Y(n)),
                new i(this, p))
              : new l();
          },
        },
        getElementsByTagNameNS: {
          value: function (n, p) {
            var d;
            return (
              n === "*" && p === "*"
                ? (d = function () {
                    return !0;
                  })
                : n === "*"
                  ? (d = Y(p))
                  : p === "*"
                    ? (d = D(n))
                    : (d = P(n, p)),
              new i(this, d)
            );
          },
        },
        getElementsByClassName: {
          value: function (n) {
            if (((n = String(n).trim()), n === "")) {
              var p = new l();
              return p;
            }
            return (n = n.split(/[ \t\r\n\f]+/)), new i(this, Z(n));
          },
        },
        getElementsByName: {
          value: function (n) {
            return new i(this, u(String(n)));
          },
        },
        clone: {
          value: function () {
            var n;
            this.namespaceURI !== t.HTML ||
            this.prefix ||
            !this.ownerDocument.isHTML
              ? (n = this.ownerDocument.createElementNS(
                  this.namespaceURI,
                  this.prefix !== null
                    ? this.prefix + ":" + this.localName
                    : this.localName
                ))
              : (n = this.ownerDocument.createElement(this.localName));
            for (var p = 0, d = this._attrKeys.length; p < d; p++) {
              var T = this._attrKeys[p],
                C = this._attrsByLName[T],
                j = C.cloneNode();
              j._setOwnerElement(n), (n._attrsByLName[T] = j), n._addQName(j);
            }
            return (n._attrKeys = this._attrKeys.concat()), n;
          },
        },
        isEqual: {
          value: function (n) {
            if (
              this.localName !== n.localName ||
              this.namespaceURI !== n.namespaceURI ||
              this.prefix !== n.prefix ||
              this._numattrs !== n._numattrs
            )
              return !1;
            for (var p = 0, d = this._numattrs; p < d; p++) {
              var T = this._attr(p);
              if (
                !n.hasAttributeNS(T.namespaceURI, T.localName) ||
                n.getAttributeNS(T.namespaceURI, T.localName) !== T.value
              )
                return !1;
            }
            return !0;
          },
        },
        _lookupNamespacePrefix: {
          value: function (n, p) {
            if (
              this.namespaceURI &&
              this.namespaceURI === n &&
              this.prefix !== null &&
              p.lookupNamespaceURI(this.prefix) === n
            )
              return this.prefix;
            for (var d = 0, T = this._numattrs; d < T; d++) {
              var C = this._attr(d);
              if (
                C.prefix === "xmlns" &&
                C.value === n &&
                p.lookupNamespaceURI(C.localName) === n
              )
                return C.localName;
            }
            var j = this.parentElement;
            return j ? j._lookupNamespacePrefix(n, p) : null;
          },
        },
        lookupNamespaceURI: {
          value: function (n) {
            if (
              ((n === "" || n === void 0) && (n = null),
              this.namespaceURI !== null && this.prefix === n)
            )
              return this.namespaceURI;
            for (var p = 0, d = this._numattrs; p < d; p++) {
              var T = this._attr(p);
              if (
                T.namespaceURI === t.XMLNS &&
                ((T.prefix === "xmlns" && T.localName === n) ||
                  (n === null && T.prefix === null && T.localName === "xmlns"))
              )
                return T.value || null;
            }
            var C = this.parentElement;
            return C ? C.lookupNamespaceURI(n) : null;
          },
        },
        getAttribute: {
          value: function (n) {
            var p = this.getAttributeNode(n);
            return p ? p.value : null;
          },
        },
        getAttributeNS: {
          value: function (n, p) {
            var d = this.getAttributeNodeNS(n, p);
            return d ? d.value : null;
          },
        },
        getAttributeNode: {
          value: function (n) {
            (n = String(n)),
              /[A-Z]/.test(n) && this.isHTML && (n = s.toASCIILowerCase(n));
            var p = this._attrsByQName[n];
            return p ? (Array.isArray(p) && (p = p[0]), p) : null;
          },
        },
        getAttributeNodeNS: {
          value: function (n, p) {
            (n = n == null ? "" : String(n)), (p = String(p));
            var d = this._attrsByLName[n + "|" + p];
            return d || null;
          },
        },
        hasAttribute: {
          value: function (n) {
            return (
              (n = String(n)),
              /[A-Z]/.test(n) && this.isHTML && (n = s.toASCIILowerCase(n)),
              this._attrsByQName[n] !== void 0
            );
          },
        },
        hasAttributeNS: {
          value: function (n, p) {
            (n = n == null ? "" : String(n)), (p = String(p));
            var d = n + "|" + p;
            return this._attrsByLName[d] !== void 0;
          },
        },
        hasAttributes: {
          value: function () {
            return this._numattrs > 0;
          },
        },
        toggleAttribute: {
          value: function (n, p) {
            (n = String(n)),
              h.isValidName(n) || s.InvalidCharacterError(),
              /[A-Z]/.test(n) && this.isHTML && (n = s.toASCIILowerCase(n));
            var d = this._attrsByQName[n];
            return d === void 0
              ? p === void 0 || p === !0
                ? (this._setAttribute(n, ""), !0)
                : !1
              : p === void 0 || p === !1
                ? (this.removeAttribute(n), !1)
                : !0;
          },
        },
        _setAttribute: {
          value: function (n, p) {
            var d = this._attrsByQName[n],
              T;
            d
              ? Array.isArray(d) && (d = d[0])
              : ((d = this._newattr(n)), (T = !0)),
              (d.value = p),
              this._attributes && (this._attributes[n] = d),
              T && this._newattrhook && this._newattrhook(n, p);
          },
        },
        setAttribute: {
          value: function (n, p) {
            (n = String(n)),
              h.isValidName(n) || s.InvalidCharacterError(),
              /[A-Z]/.test(n) && this.isHTML && (n = s.toASCIILowerCase(n)),
              this._setAttribute(n, String(p));
          },
        },
        _setAttributeNS: {
          value: function (n, p, d) {
            var T = p.indexOf(":"),
              C,
              j;
            T < 0
              ? ((C = null), (j = p))
              : ((C = p.substring(0, T)), (j = p.substring(T + 1))),
              (n === "" || n === void 0) && (n = null);
            var re = (n === null ? "" : n) + "|" + j,
              S = this._attrsByLName[re],
              A;
            S ||
              ((S = new k(this, j, C, n)),
              (A = !0),
              (this._attrsByLName[re] = S),
              this._attributes && (this._attributes[this._attrKeys.length] = S),
              this._attrKeys.push(re),
              this._addQName(S)),
              (S.value = d),
              A && this._newattrhook && this._newattrhook(p, d);
          },
        },
        setAttributeNS: {
          value: function (n, p, d) {
            (n = n == null || n === "" ? null : String(n)),
              (p = String(p)),
              h.isValidQName(p) || s.InvalidCharacterError();
            var T = p.indexOf(":"),
              C = T < 0 ? null : p.substring(0, T);
            ((C !== null && n === null) ||
              (C === "xml" && n !== t.XML) ||
              ((p === "xmlns" || C === "xmlns") && n !== t.XMLNS) ||
              (n === t.XMLNS && !(p === "xmlns" || C === "xmlns"))) &&
              s.NamespaceError(),
              this._setAttributeNS(n, p, String(d));
          },
        },
        setAttributeNode: {
          value: function (n) {
            if (n.ownerElement !== null && n.ownerElement !== this)
              throw new E(E.INUSE_ATTRIBUTE_ERR);
            var p = null,
              d = this._attrsByQName[n.name];
            if (d) {
              if (
                (Array.isArray(d) || (d = [d]),
                d.some(function (T) {
                  return T === n;
                }))
              )
                return n;
              if (n.ownerElement !== null) throw new E(E.INUSE_ATTRIBUTE_ERR);
              d.forEach(function (T) {
                this.removeAttributeNode(T);
              }, this),
                (p = d[0]);
            }
            return this.setAttributeNodeNS(n), p;
          },
        },
        setAttributeNodeNS: {
          value: function (n) {
            if (n.ownerElement !== null) throw new E(E.INUSE_ATTRIBUTE_ERR);
            var p = n.namespaceURI,
              d = (p === null ? "" : p) + "|" + n.localName,
              T = this._attrsByLName[d];
            return (
              T && this.removeAttributeNode(T),
              n._setOwnerElement(this),
              (this._attrsByLName[d] = n),
              this._attributes && (this._attributes[this._attrKeys.length] = n),
              this._attrKeys.push(d),
              this._addQName(n),
              this._newattrhook && this._newattrhook(n.name, n.value),
              T || null
            );
          },
        },
        removeAttribute: {
          value: function (n) {
            (n = String(n)),
              /[A-Z]/.test(n) && this.isHTML && (n = s.toASCIILowerCase(n));
            var p = this._attrsByQName[n];
            if (p) {
              Array.isArray(p)
                ? p.length > 2
                  ? (p = p.shift())
                  : ((this._attrsByQName[n] = p[1]), (p = p[0]))
                : (this._attrsByQName[n] = void 0);
              var d = p.namespaceURI,
                T = (d === null ? "" : d) + "|" + p.localName;
              this._attrsByLName[T] = void 0;
              var C = this._attrKeys.indexOf(T);
              this._attributes &&
                (Array.prototype.splice.call(this._attributes, C, 1),
                (this._attributes[n] = void 0)),
                this._attrKeys.splice(C, 1);
              var j = p.onchange;
              p._setOwnerElement(null),
                j && j.call(p, this, p.localName, p.value, null),
                this.rooted && this.ownerDocument.mutateRemoveAttr(p);
            }
          },
        },
        removeAttributeNS: {
          value: function (n, p) {
            (n = n == null ? "" : String(n)), (p = String(p));
            var d = n + "|" + p,
              T = this._attrsByLName[d];
            if (T) {
              this._attrsByLName[d] = void 0;
              var C = this._attrKeys.indexOf(d);
              this._attributes &&
                Array.prototype.splice.call(this._attributes, C, 1),
                this._attrKeys.splice(C, 1),
                this._removeQName(T);
              var j = T.onchange;
              T._setOwnerElement(null),
                j && j.call(T, this, T.localName, T.value, null),
                this.rooted && this.ownerDocument.mutateRemoveAttr(T);
            }
          },
        },
        removeAttributeNode: {
          value: function (n) {
            var p = n.namespaceURI,
              d = (p === null ? "" : p) + "|" + n.localName;
            return (
              this._attrsByLName[d] !== n && s.NotFoundError(),
              this.removeAttributeNS(p, n.localName),
              n
            );
          },
        },
        getAttributeNames: {
          value: function () {
            var n = this;
            return this._attrKeys.map(function (p) {
              return n._attrsByLName[p].name;
            });
          },
        },
        _getattr: {
          value: function (n) {
            var p = this._attrsByQName[n];
            return p ? p.value : null;
          },
        },
        _setattr: {
          value: function (n, p) {
            var d = this._attrsByQName[n],
              T;
            d || ((d = this._newattr(n)), (T = !0)),
              (d.value = String(p)),
              this._attributes && (this._attributes[n] = d),
              T && this._newattrhook && this._newattrhook(n, p);
          },
        },
        _newattr: {
          value: function (n) {
            var p = new k(this, n, null, null),
              d = "|" + n;
            return (
              (this._attrsByQName[n] = p),
              (this._attrsByLName[d] = p),
              this._attributes && (this._attributes[this._attrKeys.length] = p),
              this._attrKeys.push(d),
              p
            );
          },
        },
        _addQName: {
          value: function (o) {
            var n = o.name,
              p = this._attrsByQName[n];
            p
              ? Array.isArray(p)
                ? p.push(o)
                : (this._attrsByQName[n] = [p, o])
              : (this._attrsByQName[n] = o),
              this._attributes && (this._attributes[n] = o);
          },
        },
        _removeQName: {
          value: function (o) {
            var n = o.name,
              p = this._attrsByQName[n];
            if (Array.isArray(p)) {
              var d = p.indexOf(o);
              s.assert(d !== -1),
                p.length === 2
                  ? ((this._attrsByQName[n] = p[1 - d]),
                    this._attributes &&
                      (this._attributes[n] = this._attrsByQName[n]))
                  : (p.splice(d, 1),
                    this._attributes &&
                      this._attributes[n] === o &&
                      (this._attributes[n] = p[0]));
            } else
              s.assert(p === o),
                (this._attrsByQName[n] = void 0),
                this._attributes && (this._attributes[n] = void 0);
          },
        },
        _numattrs: {
          get: function () {
            return this._attrKeys.length;
          },
        },
        _attr: {
          value: function (o) {
            return this._attrsByLName[this._attrKeys[o]];
          },
        },
        id: a.property({ name: "id" }),
        className: a.property({ name: "class" }),
        classList: {
          get: function () {
            var o = this;
            if (this._classList) return this._classList;
            var n = new m(
              function () {
                return o.className || "";
              },
              function (p) {
                o.className = p;
              }
            );
            return (this._classList = n), n;
          },
          set: function (o) {
            this.className = o;
          },
        },
        matches: {
          value: function (o) {
            return w.matches(this, o);
          },
        },
        closest: {
          value: function (o) {
            var n = this;
            do {
              if (n.matches && n.matches(o)) return n;
              n = n.parentElement || n.parentNode;
            } while (n !== null && n.nodeType === c.ELEMENT_NODE);
            return null;
          },
        },
        querySelector: {
          value: function (o) {
            return w(o, this)[0];
          },
        },
        querySelectorAll: {
          value: function (o) {
            var n = w(o, this);
            return n.item ? n : new l(n);
          },
        },
      })),
        Object.defineProperties(y.prototype, H),
        Object.defineProperties(y.prototype, R),
        a.registerChangeHandler(y, "id", function (o, n, p, d) {
          o.rooted &&
            (p && o.ownerDocument.delId(p, o),
            d && o.ownerDocument.addId(d, o));
        }),
        a.registerChangeHandler(y, "class", function (o, n, p, d) {
          o._classList && o._classList._update();
        });
      function k(o, n, p, d, T) {
        (this.localName = n),
          (this.prefix = p === null || p === "" ? null : "" + p),
          (this.namespaceURI = d === null || d === "" ? null : "" + d),
          (this.data = T),
          this._setOwnerElement(o);
      }
      (k.prototype = Object.create(Object.prototype, {
        ownerElement: {
          get: function () {
            return this._ownerElement;
          },
        },
        _setOwnerElement: {
          value: function (n) {
            (this._ownerElement = n),
              this.prefix === null && this.namespaceURI === null && n
                ? (this.onchange = n._attributeChangeHandlers[this.localName])
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
          set: function (o) {
            var n = this.data;
            (o = o === void 0 ? "" : o + ""),
              o !== n &&
                ((this.data = o),
                this.ownerElement &&
                  (this.onchange &&
                    this.onchange(this.ownerElement, this.localName, n, o),
                  this.ownerElement.rooted &&
                    this.ownerElement.ownerDocument.mutateAttr(this, n)));
          },
        },
        cloneNode: {
          value: function (n) {
            return new k(
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
            return c.ATTRIBUTE_NODE;
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
          set: function (o) {
            this.value = o;
          },
        },
        textContent: {
          get: function () {
            return this.value;
          },
          set: function (o) {
            o == null && (o = ""), (this.value = o);
          },
        },
        innerText: {
          get: function () {
            return this.value;
          },
          set: function (o) {
            o == null && (o = ""), (this.value = o);
          },
        },
      })),
        (y._Attr = k);
      function _(o) {
        J.call(this, o);
        for (var n in o._attrsByQName) this[n] = o._attrsByQName[n];
        for (var p = 0; p < o._attrKeys.length; p++)
          this[p] = o._attrsByLName[o._attrKeys[p]];
      }
      _.prototype = Object.create(J.prototype, {
        length: {
          get: function () {
            return this.element._attrKeys.length;
          },
          set: function () {},
        },
        item: {
          value: function (o) {
            return (
              (o = o >>> 0),
              o >= this.length
                ? null
                : this.element._attrsByLName[this.element._attrKeys[o]]
            );
          },
        },
      });
      var ae;
      (ae = globalThis.Symbol) != null &&
        ae.iterator &&
        (_.prototype[globalThis.Symbol.iterator] = function () {
          var o = 0,
            n = this.length,
            p = this;
          return {
            next: function () {
              return o < n ? { value: p.item(o++) } : { done: !0 };
            },
          };
        });
      function ne(o) {
        (this.element = o), this.updateCache();
      }
      ne.prototype = Object.create(Object.prototype, {
        length: {
          get: function () {
            return this.updateCache(), this.childrenByNumber.length;
          },
        },
        item: {
          value: function (n) {
            return this.updateCache(), this.childrenByNumber[n] || null;
          },
        },
        namedItem: {
          value: function (n) {
            return this.updateCache(), this.childrenByName[n] || null;
          },
        },
        namedItems: {
          get: function () {
            return this.updateCache(), this.childrenByName;
          },
        },
        updateCache: {
          value: function () {
            var n =
              /^(a|applet|area|embed|form|frame|frameset|iframe|img|object)$/;
            if (this.lastModTime !== this.element.lastModTime) {
              this.lastModTime = this.element.lastModTime;
              for (
                var p =
                    (this.childrenByNumber && this.childrenByNumber.length) ||
                    0,
                  d = 0;
                d < p;
                d++
              )
                this[d] = void 0;
              (this.childrenByNumber = []),
                (this.childrenByName = Object.create(null));
              for (
                var T = this.element.firstChild;
                T !== null;
                T = T.nextSibling
              )
                if (T.nodeType === c.ELEMENT_NODE) {
                  (this[this.childrenByNumber.length] = T),
                    this.childrenByNumber.push(T);
                  var C = T.getAttribute("id");
                  C && !this.childrenByName[C] && (this.childrenByName[C] = T);
                  var j = T.getAttribute("name");
                  j &&
                    this.element.namespaceURI === t.HTML &&
                    n.test(this.element.localName) &&
                    !this.childrenByName[j] &&
                    (this.childrenByName[C] = T);
                }
            }
          },
        },
      });
      function Y(o) {
        return function (n) {
          return n.localName === o;
        };
      }
      function G(o) {
        var n = s.toASCIILowerCase(o);
        return n === o
          ? Y(o)
          : function (p) {
              return p.isHTML ? p.localName === n : p.localName === o;
            };
      }
      function D(o) {
        return function (n) {
          return n.namespaceURI === o;
        };
      }
      function P(o, n) {
        return function (p) {
          return p.namespaceURI === o && p.localName === n;
        };
      }
      function Z(o) {
        return function (n) {
          return o.every(function (p) {
            return n.classList.contains(p);
          });
        };
      }
      function u(o) {
        return function (n) {
          return n.namespaceURI !== t.HTML ? !1 : n.getAttribute("name") === o;
        };
      }
    },
  }),
  ka = le({
    "external/npm/node_modules/domino/lib/Leaf.js"(b, v) {
      "use strict";
      v.exports = l;
      var h = Ve(),
        s = ar(),
        t = Be(),
        a = t.HierarchyRequestError,
        c = t.NotFoundError;
      function l() {
        h.call(this);
      }
      l.prototype = Object.create(h.prototype, {
        hasChildNodes: {
          value: function () {
            return !1;
          },
        },
        firstChild: { value: null },
        lastChild: { value: null },
        insertBefore: {
          value: function (f, i) {
            if (!f.nodeType) throw new TypeError("not a node");
            a();
          },
        },
        replaceChild: {
          value: function (f, i) {
            if (!f.nodeType) throw new TypeError("not a node");
            a();
          },
        },
        removeChild: {
          value: function (f) {
            if (!f.nodeType) throw new TypeError("not a node");
            c();
          },
        },
        removeChildren: { value: function () {} },
        childNodes: {
          get: function () {
            return (
              this._childNodes || (this._childNodes = new s()), this._childNodes
            );
          },
        },
      });
    },
  }),
  Jr = le({
    "external/npm/node_modules/domino/lib/CharacterData.js"(b, v) {
      "use strict";
      v.exports = c;
      var h = ka(),
        s = Be(),
        t = Dn(),
        a = wa();
      function c() {
        h.call(this);
      }
      (c.prototype = Object.create(h.prototype, {
        substringData: {
          value: function (f, i) {
            if (arguments.length < 2)
              throw new TypeError("Not enough arguments");
            return (
              (f = f >>> 0),
              (i = i >>> 0),
              (f > this.data.length || f < 0 || i < 0) && s.IndexSizeError(),
              this.data.substring(f, f + i)
            );
          },
        },
        appendData: {
          value: function (f) {
            if (arguments.length < 1)
              throw new TypeError("Not enough arguments");
            this.data += String(f);
          },
        },
        insertData: {
          value: function (f, i) {
            return this.replaceData(f, 0, i);
          },
        },
        deleteData: {
          value: function (f, i) {
            return this.replaceData(f, i, "");
          },
        },
        replaceData: {
          value: function (f, i, E) {
            var m = this.data,
              w = m.length;
            (f = f >>> 0),
              (i = i >>> 0),
              (E = String(E)),
              (f > w || f < 0) && s.IndexSizeError(),
              f + i > w && (i = w - f);
            var I = m.substring(0, f),
              H = m.substring(f + i);
            this.data = I + E + H;
          },
        },
        isEqual: {
          value: function (f) {
            return this._data === f._data;
          },
        },
        length: {
          get: function () {
            return this.data.length;
          },
        },
      })),
        Object.defineProperties(c.prototype, t),
        Object.defineProperties(c.prototype, a);
    },
  }),
  La = le({
    "external/npm/node_modules/domino/lib/Text.js"(b, v) {
      "use strict";
      v.exports = a;
      var h = Be(),
        s = Ve(),
        t = Jr();
      function a(l, f) {
        t.call(this),
          (this.nodeType = s.TEXT_NODE),
          (this.ownerDocument = l),
          (this._data = f),
          (this._index = void 0);
      }
      var c = {
        get: function () {
          return this._data;
        },
        set: function (l) {
          l == null ? (l = "") : (l = String(l)),
            l !== this._data &&
              ((this._data = l),
              this.rooted && this.ownerDocument.mutateValue(this),
              this.parentNode &&
                this.parentNode._textchangehook &&
                this.parentNode._textchangehook(this));
        },
      };
      a.prototype = Object.create(t.prototype, {
        nodeName: { value: "#text" },
        nodeValue: c,
        textContent: c,
        innerText: c,
        data: {
          get: c.get,
          set: function (l) {
            c.set.call(this, l === null ? "" : String(l));
          },
        },
        splitText: {
          value: function (f) {
            (f > this._data.length || f < 0) && h.IndexSizeError();
            var i = this._data.substring(f),
              E = this.ownerDocument.createTextNode(i);
            this.data = this.data.substring(0, f);
            var m = this.parentNode;
            return m !== null && m.insertBefore(E, this.nextSibling), E;
          },
        },
        wholeText: {
          get: function () {
            for (
              var f = this.textContent, i = this.nextSibling;
              i && i.nodeType === s.TEXT_NODE;
              i = i.nextSibling
            )
              f += i.textContent;
            return f;
          },
        },
        replaceWholeText: { value: h.nyi },
        clone: {
          value: function () {
            return new a(this.ownerDocument, this._data);
          },
        },
      });
    },
  }),
  Ca = le({
    "external/npm/node_modules/domino/lib/Comment.js"(b, v) {
      "use strict";
      v.exports = t;
      var h = Ve(),
        s = Jr();
      function t(c, l) {
        s.call(this),
          (this.nodeType = h.COMMENT_NODE),
          (this.ownerDocument = c),
          (this._data = l);
      }
      var a = {
        get: function () {
          return this._data;
        },
        set: function (c) {
          c == null ? (c = "") : (c = String(c)),
            (this._data = c),
            this.rooted && this.ownerDocument.mutateValue(this);
        },
      };
      t.prototype = Object.create(s.prototype, {
        nodeName: { value: "#comment" },
        nodeValue: a,
        textContent: a,
        innerText: a,
        data: {
          get: a.get,
          set: function (c) {
            a.set.call(this, c === null ? "" : String(c));
          },
        },
        clone: {
          value: function () {
            return new t(this.ownerDocument, this._data);
          },
        },
      });
    },
  }),
  Da = le({
    "external/npm/node_modules/domino/lib/DocumentFragment.js"(b, v) {
      "use strict";
      v.exports = f;
      var h = Ve(),
        s = ar(),
        t = kn(),
        a = Er(),
        c = Cn(),
        l = Be();
      function f(i) {
        t.call(this),
          (this.nodeType = h.DOCUMENT_FRAGMENT_NODE),
          (this.ownerDocument = i);
      }
      f.prototype = Object.create(t.prototype, {
        nodeName: { value: "#document-fragment" },
        nodeValue: {
          get: function () {
            return null;
          },
          set: function () {},
        },
        textContent: Object.getOwnPropertyDescriptor(
          a.prototype,
          "textContent"
        ),
        innerText: Object.getOwnPropertyDescriptor(a.prototype, "innerText"),
        querySelector: {
          value: function (i) {
            var E = this.querySelectorAll(i);
            return E.length ? E[0] : null;
          },
        },
        querySelectorAll: {
          value: function (i) {
            var E = Object.create(this);
            (E.isHTML = !0),
              (E.getElementsByTagName = a.prototype.getElementsByTagName),
              (E.nextElement = Object.getOwnPropertyDescriptor(
                a.prototype,
                "firstElementChild"
              ).get);
            var m = c(i, E);
            return m.item ? m : new s(m);
          },
        },
        clone: {
          value: function () {
            return new f(this.ownerDocument);
          },
        },
        isEqual: {
          value: function (E) {
            return !0;
          },
        },
        innerHTML: {
          get: function () {
            return this.serialize();
          },
          set: l.nyi,
        },
        outerHTML: {
          get: function () {
            return this.serialize();
          },
          set: l.nyi,
        },
      });
    },
  }),
  Aa = le({
    "external/npm/node_modules/domino/lib/ProcessingInstruction.js"(b, v) {
      "use strict";
      v.exports = t;
      var h = Ve(),
        s = Jr();
      function t(c, l, f) {
        s.call(this),
          (this.nodeType = h.PROCESSING_INSTRUCTION_NODE),
          (this.ownerDocument = c),
          (this.target = l),
          (this._data = f);
      }
      var a = {
        get: function () {
          return this._data;
        },
        set: function (c) {
          c == null ? (c = "") : (c = String(c)),
            (this._data = c),
            this.rooted && this.ownerDocument.mutateValue(this);
        },
      };
      t.prototype = Object.create(s.prototype, {
        nodeName: {
          get: function () {
            return this.target;
          },
        },
        nodeValue: a,
        textContent: a,
        innerText: a,
        data: {
          get: a.get,
          set: function (c) {
            a.set.call(this, c === null ? "" : String(c));
          },
        },
        clone: {
          value: function () {
            return new t(this.ownerDocument, this.target, this._data);
          },
        },
        isEqual: {
          value: function (l) {
            return this.target === l.target && this._data === l._data;
          },
        },
      });
    },
  }),
  en = le({
    "external/npm/node_modules/domino/lib/NodeFilter.js"(b, v) {
      "use strict";
      var h = {
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
      v.exports = h.constructor = h.prototype = h;
    },
  }),
  Ma = le({
    "external/npm/node_modules/domino/lib/NodeTraversal.js"(b, v) {
      "use strict";
      var h = (v.exports = {
        nextSkippingChildren: s,
        nextAncestorSibling: t,
        next: a,
        previous: l,
        deepLastChild: c,
      });
      function s(f, i) {
        return f === i
          ? null
          : f.nextSibling !== null
            ? f.nextSibling
            : t(f, i);
      }
      function t(f, i) {
        for (f = f.parentNode; f !== null; f = f.parentNode) {
          if (f === i) return null;
          if (f.nextSibling !== null) return f.nextSibling;
        }
        return null;
      }
      function a(f, i) {
        var E;
        return (
          (E = f.firstChild),
          E !== null
            ? E
            : f === i
              ? null
              : ((E = f.nextSibling), E !== null ? E : t(f, i))
        );
      }
      function c(f) {
        for (; f.lastChild; ) f = f.lastChild;
        return f;
      }
      function l(f, i) {
        var E;
        return (
          (E = f.previousSibling),
          E !== null ? c(E) : ((E = f.parentNode), E === i ? null : E)
        );
      }
    },
  }),
  Ts = le({
    "external/npm/node_modules/domino/lib/TreeWalker.js"(b, v) {
      "use strict";
      v.exports = E;
      var h = Ve(),
        s = en(),
        t = Ma(),
        a = Be(),
        c = {
          first: "firstChild",
          last: "lastChild",
          next: "firstChild",
          previous: "lastChild",
        },
        l = {
          first: "nextSibling",
          last: "previousSibling",
          next: "nextSibling",
          previous: "previousSibling",
        };
      function f(m, w) {
        var I, H, R, J, B;
        for (H = m._currentNode[c[w]]; H !== null; ) {
          if (((J = m._internalFilter(H)), J === s.FILTER_ACCEPT))
            return (m._currentNode = H), H;
          if (J === s.FILTER_SKIP && ((I = H[c[w]]), I !== null)) {
            H = I;
            continue;
          }
          for (; H !== null; ) {
            if (((B = H[l[w]]), B !== null)) {
              H = B;
              break;
            }
            if (
              ((R = H.parentNode),
              R === null || R === m.root || R === m._currentNode)
            )
              return null;
            H = R;
          }
        }
        return null;
      }
      function i(m, w) {
        var I, H, R;
        if (((I = m._currentNode), I === m.root)) return null;
        for (;;) {
          for (R = I[l[w]]; R !== null; ) {
            if (((I = R), (H = m._internalFilter(I)), H === s.FILTER_ACCEPT))
              return (m._currentNode = I), I;
            (R = I[c[w]]),
              (H === s.FILTER_REJECT || R === null) && (R = I[l[w]]);
          }
          if (
            ((I = I.parentNode),
            I === null ||
              I === m.root ||
              m._internalFilter(I) === s.FILTER_ACCEPT)
          )
            return null;
        }
      }
      function E(m, w, I) {
        (!m || !m.nodeType) && a.NotSupportedError(),
          (this._root = m),
          (this._whatToShow = Number(w) || 0),
          (this._filter = I || null),
          (this._active = !1),
          (this._currentNode = m);
      }
      Object.defineProperties(E.prototype, {
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
          set: function (w) {
            if (!(w instanceof h)) throw new TypeError("Not a Node");
            this._currentNode = w;
          },
        },
        _internalFilter: {
          value: function (w) {
            var I, H;
            if (
              (this._active && a.InvalidStateError(),
              !((1 << (w.nodeType - 1)) & this._whatToShow))
            )
              return s.FILTER_SKIP;
            if (((H = this._filter), H === null)) I = s.FILTER_ACCEPT;
            else {
              this._active = !0;
              try {
                typeof H == "function" ? (I = H(w)) : (I = H.acceptNode(w));
              } finally {
                this._active = !1;
              }
            }
            return +I;
          },
        },
        parentNode: {
          value: function () {
            for (var w = this._currentNode; w !== this.root; ) {
              if (((w = w.parentNode), w === null)) return null;
              if (this._internalFilter(w) === s.FILTER_ACCEPT)
                return (this._currentNode = w), w;
            }
            return null;
          },
        },
        firstChild: {
          value: function () {
            return f(this, "first");
          },
        },
        lastChild: {
          value: function () {
            return f(this, "last");
          },
        },
        previousSibling: {
          value: function () {
            return i(this, "previous");
          },
        },
        nextSibling: {
          value: function () {
            return i(this, "next");
          },
        },
        previousNode: {
          value: function () {
            var w, I, H, R;
            for (w = this._currentNode; w !== this._root; ) {
              for (H = w.previousSibling; H; H = w.previousSibling)
                if (
                  ((w = H),
                  (I = this._internalFilter(w)),
                  I !== s.FILTER_REJECT)
                ) {
                  for (
                    R = w.lastChild;
                    R &&
                    ((w = R),
                    (I = this._internalFilter(w)),
                    I !== s.FILTER_REJECT);
                    R = w.lastChild
                  );
                  if (I === s.FILTER_ACCEPT) return (this._currentNode = w), w;
                }
              if (w === this.root || w.parentNode === null) return null;
              if (
                ((w = w.parentNode),
                this._internalFilter(w) === s.FILTER_ACCEPT)
              )
                return (this._currentNode = w), w;
            }
            return null;
          },
        },
        nextNode: {
          value: function () {
            var w, I, H, R;
            (w = this._currentNode), (I = s.FILTER_ACCEPT);
            e: for (;;) {
              for (H = w.firstChild; H; H = w.firstChild) {
                if (
                  ((w = H),
                  (I = this._internalFilter(w)),
                  I === s.FILTER_ACCEPT)
                )
                  return (this._currentNode = w), w;
                if (I === s.FILTER_REJECT) break;
              }
              for (
                R = t.nextSkippingChildren(w, this.root);
                R;
                R = t.nextSkippingChildren(w, this.root)
              ) {
                if (
                  ((w = R),
                  (I = this._internalFilter(w)),
                  I === s.FILTER_ACCEPT)
                )
                  return (this._currentNode = w), w;
                if (I === s.FILTER_SKIP) continue e;
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
  ys = le({
    "external/npm/node_modules/domino/lib/NodeIterator.js"(b, v) {
      "use strict";
      v.exports = f;
      var h = en(),
        s = Ma(),
        t = Be();
      function a(i, E, m) {
        return m ? s.next(i, E) : i === E ? null : s.previous(i, null);
      }
      function c(i, E) {
        for (; E; E = E.parentNode) if (i === E) return !0;
        return !1;
      }
      function l(i, E) {
        var m, w;
        for (m = i._referenceNode, w = i._pointerBeforeReferenceNode; ; ) {
          if (w === E) w = !w;
          else if (((m = a(m, i._root, E)), m === null)) return null;
          var I = i._internalFilter(m);
          if (I === h.FILTER_ACCEPT) break;
        }
        return (i._referenceNode = m), (i._pointerBeforeReferenceNode = w), m;
      }
      function f(i, E, m) {
        (!i || !i.nodeType) && t.NotSupportedError(),
          (this._root = i),
          (this._referenceNode = i),
          (this._pointerBeforeReferenceNode = !0),
          (this._whatToShow = Number(E) || 0),
          (this._filter = m || null),
          (this._active = !1),
          i.doc._attachNodeIterator(this);
      }
      Object.defineProperties(f.prototype, {
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
          value: function (E) {
            var m, w;
            if (
              (this._active && t.InvalidStateError(),
              !((1 << (E.nodeType - 1)) & this._whatToShow))
            )
              return h.FILTER_SKIP;
            if (((w = this._filter), w === null)) m = h.FILTER_ACCEPT;
            else {
              this._active = !0;
              try {
                typeof w == "function" ? (m = w(E)) : (m = w.acceptNode(E));
              } finally {
                this._active = !1;
              }
            }
            return +m;
          },
        },
        _preremove: {
          value: function (E) {
            if (!c(E, this._root) && c(E, this._referenceNode)) {
              if (this._pointerBeforeReferenceNode) {
                for (var m = E; m.lastChild; ) m = m.lastChild;
                if (((m = s.next(m, this.root)), m)) {
                  this._referenceNode = m;
                  return;
                }
                this._pointerBeforeReferenceNode = !1;
              }
              if (E.previousSibling === null)
                this._referenceNode = E.parentNode;
              else {
                this._referenceNode = E.previousSibling;
                var w;
                for (
                  w = this._referenceNode.lastChild;
                  w;
                  w = this._referenceNode.lastChild
                )
                  this._referenceNode = w;
              }
            }
          },
        },
        nextNode: {
          value: function () {
            return l(this, !0);
          },
        },
        previousNode: {
          value: function () {
            return l(this, !1);
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
  An = le({
    "external/npm/node_modules/domino/lib/URL.js"(b, v) {
      "use strict";
      v.exports = h;
      function h(s) {
        if (!s) return Object.create(h.prototype);
        this.url = s.replace(/^[ \t\n\r\f]+|[ \t\n\r\f]+$/g, "");
        var t = h.pattern.exec(this.url);
        if (t) {
          if ((t[2] && (this.scheme = t[2]), t[4])) {
            var a = t[4].match(h.userinfoPattern);
            if (
              (a &&
                ((this.username = a[1]),
                (this.password = a[3]),
                (t[4] = t[4].substring(a[0].length))),
              t[4].match(h.portPattern))
            ) {
              var c = t[4].lastIndexOf(":");
              (this.host = t[4].substring(0, c)),
                (this.port = t[4].substring(c + 1));
            } else this.host = t[4];
          }
          t[5] && (this.path = t[5]),
            t[6] && (this.query = t[7]),
            t[8] && (this.fragment = t[9]);
        }
      }
      (h.pattern =
        /^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/),
        (h.userinfoPattern = /^([^@:]*)(:([^@]*))?@/),
        (h.portPattern = /:\d+$/),
        (h.authorityPattern = /^[^:\/?#]+:\/\//),
        (h.hierarchyPattern = /^[^:\/?#]+:\//),
        (h.percentEncode = function (t) {
          var a = t.charCodeAt(0);
          if (a < 256) return "%" + a.toString(16);
          throw Error("can't percent-encode codepoints > 255 yet");
        }),
        (h.prototype = {
          constructor: h,
          isAbsolute: function () {
            return !!this.scheme;
          },
          isAuthorityBased: function () {
            return h.authorityPattern.test(this.url);
          },
          isHierarchical: function () {
            return h.hierarchyPattern.test(this.url);
          },
          toString: function () {
            var s = "";
            return (
              this.scheme !== void 0 && (s += this.scheme + ":"),
              this.isAbsolute() &&
                ((s += "//"),
                (this.username || this.password) &&
                  ((s += this.username || ""),
                  this.password && (s += ":" + this.password),
                  (s += "@")),
                this.host && (s += this.host)),
              this.port !== void 0 && (s += ":" + this.port),
              this.path !== void 0 && (s += this.path),
              this.query !== void 0 && (s += "?" + this.query),
              this.fragment !== void 0 && (s += "#" + this.fragment),
              s
            );
          },
          resolve: function (s) {
            var t = this,
              a = new h(s),
              c = new h();
            return (
              a.scheme !== void 0
                ? ((c.scheme = a.scheme),
                  (c.username = a.username),
                  (c.password = a.password),
                  (c.host = a.host),
                  (c.port = a.port),
                  (c.path = f(a.path)),
                  (c.query = a.query))
                : ((c.scheme = t.scheme),
                  a.host !== void 0
                    ? ((c.username = a.username),
                      (c.password = a.password),
                      (c.host = a.host),
                      (c.port = a.port),
                      (c.path = f(a.path)),
                      (c.query = a.query))
                    : ((c.username = t.username),
                      (c.password = t.password),
                      (c.host = t.host),
                      (c.port = t.port),
                      a.path
                        ? (a.path.charAt(0) === "/"
                            ? (c.path = f(a.path))
                            : ((c.path = l(t.path, a.path)),
                              (c.path = f(c.path))),
                          (c.query = a.query))
                        : ((c.path = t.path),
                          a.query !== void 0
                            ? (c.query = a.query)
                            : (c.query = t.query)))),
              (c.fragment = a.fragment),
              c.toString()
            );
            function l(i, E) {
              if (t.host !== void 0 && !t.path) return "/" + E;
              var m = i.lastIndexOf("/");
              return m === -1 ? E : i.substring(0, m + 1) + E;
            }
            function f(i) {
              if (!i) return i;
              for (var E = ""; i.length > 0; ) {
                if (i === "." || i === "..") {
                  i = "";
                  break;
                }
                var m = i.substring(0, 2),
                  w = i.substring(0, 3),
                  I = i.substring(0, 4);
                if (w === "../") i = i.substring(3);
                else if (m === "./") i = i.substring(2);
                else if (w === "/./") i = "/" + i.substring(3);
                else if (m === "/." && i.length === 2) i = "/";
                else if (I === "/../" || (w === "/.." && i.length === 3))
                  (i = "/" + i.substring(4)), (E = E.replace(/\/?[^\/]*$/, ""));
                else {
                  var H = i.match(/(\/?([^\/]*))/)[0];
                  (E += H), (i = i.substring(H.length));
                }
              }
              return E;
            }
          },
        });
    },
  }),
  Ns = le({
    "external/npm/node_modules/domino/lib/CustomEvent.js"(b, v) {
      "use strict";
      v.exports = s;
      var h = br();
      function s(t, a) {
        h.call(this, t, a);
      }
      s.prototype = Object.create(h.prototype, { constructor: { value: s } });
    },
  }),
  xa = le({
    "external/npm/node_modules/domino/lib/events.js"(b, v) {
      "use strict";
      v.exports = {
        Event: br(),
        UIEvent: _a(),
        MouseEvent: ba(),
        CustomEvent: Ns(),
      };
    },
  }),
  ws = le({
    "external/npm/node_modules/domino/lib/style_parser.js"(b) {
      "use strict";
      Object.defineProperty(b, "__esModule", { value: !0 }),
        (b.hyphenate = b.parse = void 0);
      function v(s) {
        let t = [],
          a = 0,
          c = 0,
          l = 0,
          f = 0,
          i = 0,
          E = null;
        for (; a < s.length; )
          switch (s.charCodeAt(a++)) {
            case 40:
              c++;
              break;
            case 41:
              c--;
              break;
            case 39:
              l === 0
                ? (l = 39)
                : l === 39 && s.charCodeAt(a - 1) !== 92 && (l = 0);
              break;
            case 34:
              l === 0
                ? (l = 34)
                : l === 34 && s.charCodeAt(a - 1) !== 92 && (l = 0);
              break;
            case 58:
              !E &&
                c === 0 &&
                l === 0 &&
                ((E = h(s.substring(i, a - 1).trim())), (f = a));
              break;
            case 59:
              if (E && f > 0 && c === 0 && l === 0) {
                let w = s.substring(f, a - 1).trim();
                t.push(E, w), (i = a), (f = 0), (E = null);
              }
              break;
          }
        if (E && f) {
          let m = s.slice(f).trim();
          t.push(E, m);
        }
        return t;
      }
      b.parse = v;
      function h(s) {
        return s
          .replace(/[a-z][A-Z]/g, (t) => t.charAt(0) + "-" + t.charAt(1))
          .toLowerCase();
      }
      b.hyphenate = h;
    },
  }),
  Mn = le({
    "external/npm/node_modules/domino/lib/CSSStyleDeclaration.js"(b, v) {
      "use strict";
      var { parse: h } = ws();
      v.exports = function (f) {
        let i = new t(f),
          E = {
            get: function (m, w) {
              return w in m ? m[w] : m.getPropertyValue(s(w));
            },
            has: function (m, w) {
              return !0;
            },
            set: function (m, w, I) {
              return w in m ? (m[w] = I) : m.setProperty(s(w), I ?? void 0), !0;
            },
          };
        return new Proxy(i, E);
      };
      function s(f) {
        return f.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      }
      function t(f) {
        this._element = f;
      }
      var a = "!important";
      function c(f) {
        let i = { property: {}, priority: {} };
        if (!f) return i;
        let E = h(f);
        if (E.length < 2) return i;
        for (let m = 0; m < E.length; m += 2) {
          let w = E[m],
            I = E[m + 1];
          I.endsWith(a) &&
            ((i.priority[w] = "important"), (I = I.slice(0, -a.length).trim())),
            (i.property[w] = I);
        }
        return i;
      }
      var l = {};
      t.prototype = Object.create(Object.prototype, {
        _parsed: {
          get: function () {
            if (!this._parsedStyles || this.cssText !== this._lastParsedText) {
              var f = this.cssText;
              (this._parsedStyles = c(f)),
                (this._lastParsedText = f),
                delete this._names;
            }
            return this._parsedStyles;
          },
        },
        _serialize: {
          value: function () {
            var f = this._parsed,
              i = "";
            for (var E in f.property)
              i && (i += " "),
                (i += E + ": " + f.property[E]),
                f.priority[E] && (i += " !" + f.priority[E]),
                (i += ";");
            (this.cssText = i), (this._lastParsedText = i), delete this._names;
          },
        },
        cssText: {
          get: function () {
            return this._element.getAttribute("style");
          },
          set: function (f) {
            this._element.setAttribute("style", f);
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
          value: function (f) {
            return (
              this._names ||
                (this._names = Object.getOwnPropertyNames(
                  this._parsed.property
                )),
              this._names[f]
            );
          },
        },
        getPropertyValue: {
          value: function (f) {
            return (f = f.toLowerCase()), this._parsed.property[f] || "";
          },
        },
        getPropertyPriority: {
          value: function (f) {
            return (f = f.toLowerCase()), this._parsed.priority[f] || "";
          },
        },
        setProperty: {
          value: function (f, i, E) {
            if (
              ((f = f.toLowerCase()),
              i == null && (i = ""),
              E == null && (E = ""),
              i !== l && (i = "" + i),
              (i = i.trim()),
              i === "")
            ) {
              this.removeProperty(f);
              return;
            }
            if (!(E !== "" && E !== l && !/^important$/i.test(E))) {
              var m = this._parsed;
              if (i === l) {
                if (!m.property[f]) return;
                E !== "" ? (m.priority[f] = "important") : delete m.priority[f];
              } else {
                if (i.includes(";") && !i.includes("data:")) return;
                var w = c(f + ":" + i);
                if (
                  Object.getOwnPropertyNames(w.property).length === 0 ||
                  Object.getOwnPropertyNames(w.priority).length !== 0
                )
                  return;
                for (var I in w.property)
                  (m.property[I] = w.property[I]),
                    E !== l &&
                      (E !== ""
                        ? (m.priority[I] = "important")
                        : m.priority[I] && delete m.priority[I]);
              }
              this._serialize();
            }
          },
        },
        setPropertyValue: {
          value: function (f, i) {
            return this.setProperty(f, i, l);
          },
        },
        setPropertyPriority: {
          value: function (f, i) {
            return this.setProperty(f, l, i);
          },
        },
        removeProperty: {
          value: function (f) {
            f = f.toLowerCase();
            var i = this._parsed;
            f in i.property &&
              (delete i.property[f], delete i.priority[f], this._serialize());
          },
        },
      });
    },
  }),
  Ia = le({
    "external/npm/node_modules/domino/lib/URLUtils.js"(b, v) {
      "use strict";
      var h = An();
      v.exports = s;
      function s() {}
      (s.prototype = Object.create(Object.prototype, {
        _url: {
          get: function () {
            return new h(this.href);
          },
        },
        protocol: {
          get: function () {
            var t = this._url;
            return t && t.scheme ? t.scheme + ":" : ":";
          },
          set: function (t) {
            var a = this.href,
              c = new h(a);
            c.isAbsolute() &&
              ((t = t.replace(/:+$/, "")),
              (t = t.replace(/[^-+\.a-zA-Z0-9]/g, h.percentEncode)),
              t.length > 0 && ((c.scheme = t), (a = c.toString()))),
              (this.href = a);
          },
        },
        host: {
          get: function () {
            var t = this._url;
            return t.isAbsolute() && t.isAuthorityBased()
              ? t.host + (t.port ? ":" + t.port : "")
              : "";
          },
          set: function (t) {
            var a = this.href,
              c = new h(a);
            c.isAbsolute() &&
              c.isAuthorityBased() &&
              ((t = t.replace(
                /[^-+\._~!$&'()*,;:=a-zA-Z0-9]/g,
                h.percentEncode
              )),
              t.length > 0 &&
                ((c.host = t), delete c.port, (a = c.toString()))),
              (this.href = a);
          },
        },
        hostname: {
          get: function () {
            var t = this._url;
            return t.isAbsolute() && t.isAuthorityBased() ? t.host : "";
          },
          set: function (t) {
            var a = this.href,
              c = new h(a);
            c.isAbsolute() &&
              c.isAuthorityBased() &&
              ((t = t.replace(/^\/+/, "")),
              (t = t.replace(
                /[^-+\._~!$&'()*,;:=a-zA-Z0-9]/g,
                h.percentEncode
              )),
              t.length > 0 && ((c.host = t), (a = c.toString()))),
              (this.href = a);
          },
        },
        port: {
          get: function () {
            var t = this._url;
            return t.isAbsolute() && t.isAuthorityBased() && t.port !== void 0
              ? t.port
              : "";
          },
          set: function (t) {
            var a = this.href,
              c = new h(a);
            c.isAbsolute() &&
              c.isAuthorityBased() &&
              ((t = "" + t),
              (t = t.replace(/[^0-9].*$/, "")),
              (t = t.replace(/^0+/, "")),
              t.length === 0 && (t = "0"),
              parseInt(t, 10) <= 65535 && ((c.port = t), (a = c.toString()))),
              (this.href = a);
          },
        },
        pathname: {
          get: function () {
            var t = this._url;
            return t.isAbsolute() && t.isHierarchical() ? t.path : "";
          },
          set: function (t) {
            var a = this.href,
              c = new h(a);
            c.isAbsolute() &&
              c.isHierarchical() &&
              (t.charAt(0) !== "/" && (t = "/" + t),
              (t = t.replace(
                /[^-+\._~!$&'()*,;:=@\/a-zA-Z0-9]/g,
                h.percentEncode
              )),
              (c.path = t),
              (a = c.toString())),
              (this.href = a);
          },
        },
        search: {
          get: function () {
            var t = this._url;
            return t.isAbsolute() && t.isHierarchical() && t.query !== void 0
              ? "?" + t.query
              : "";
          },
          set: function (t) {
            var a = this.href,
              c = new h(a);
            c.isAbsolute() &&
              c.isHierarchical() &&
              (t.charAt(0) === "?" && (t = t.substring(1)),
              (t = t.replace(
                /[^-+\._~!$&'()*,;:=@\/?a-zA-Z0-9]/g,
                h.percentEncode
              )),
              (c.query = t),
              (a = c.toString())),
              (this.href = a);
          },
        },
        hash: {
          get: function () {
            var t = this._url;
            return t == null || t.fragment == null || t.fragment === ""
              ? ""
              : "#" + t.fragment;
          },
          set: function (t) {
            var a = this.href,
              c = new h(a);
            t.charAt(0) === "#" && (t = t.substring(1)),
              (t = t.replace(
                /[^-+\._~!$&'()*,;:=@\/?a-zA-Z0-9]/g,
                h.percentEncode
              )),
              (c.fragment = t),
              (a = c.toString()),
              (this.href = a);
          },
        },
        username: {
          get: function () {
            var t = this._url;
            return t.username || "";
          },
          set: function (t) {
            var a = this.href,
              c = new h(a);
            c.isAbsolute() &&
              ((t = t.replace(
                /[\x00-\x1F\x7F-\uFFFF "#<>?`\/@\\:]/g,
                h.percentEncode
              )),
              (c.username = t),
              (a = c.toString())),
              (this.href = a);
          },
        },
        password: {
          get: function () {
            var t = this._url;
            return t.password || "";
          },
          set: function (t) {
            var a = this.href,
              c = new h(a);
            c.isAbsolute() &&
              (t === ""
                ? (c.password = null)
                : ((t = t.replace(
                    /[\x00-\x1F\x7F-\uFFFF "#<>?`\/@\\]/g,
                    h.percentEncode
                  )),
                  (c.password = t)),
              (a = c.toString())),
              (this.href = a);
          },
        },
        origin: {
          get: function () {
            var t = this._url;
            if (t == null) return "";
            var a = function (c) {
              var l = [t.scheme, t.host, +t.port || c];
              return l[0] + "://" + l[1] + (l[2] === c ? "" : ":" + l[2]);
            };
            switch (t.scheme) {
              case "ftp":
                return a(21);
              case "gopher":
                return a(70);
              case "http":
              case "ws":
                return a(80);
              case "https":
              case "wss":
                return a(443);
              default:
                return t.scheme + "://";
            }
          },
        },
      })),
        (s._inherit = function (t) {
          Object.getOwnPropertyNames(s.prototype).forEach(function (a) {
            if (!(a === "constructor" || a === "href")) {
              var c = Object.getOwnPropertyDescriptor(s.prototype, a);
              Object.defineProperty(t, a, c);
            }
          });
        });
    },
  }),
  Ra = le({
    "external/npm/node_modules/domino/lib/defineElement.js"(b, v) {
      "use strict";
      var h = ya(),
        s = Sn().isApiWritable;
      v.exports = function (l, f, i, E) {
        var m = l.ctor;
        if (m) {
          var w = l.props || {};
          if (l.attributes)
            for (var I in l.attributes) {
              var H = l.attributes[I];
              (typeof H != "object" || Array.isArray(H)) && (H = { type: H }),
                H.name || (H.name = I.toLowerCase()),
                (w[I] = h.property(H));
            }
          (w.constructor = { value: m, writable: s }),
            (m.prototype = Object.create((l.superclass || f).prototype, w)),
            l.events && c(m, l.events),
            (i[l.name] = m);
        } else m = f;
        return (
          (l.tags || (l.tag && [l.tag]) || []).forEach(function (R) {
            E[R] = m;
          }),
          m
        );
      };
      function t(l, f, i, E) {
        (this.body = l),
          (this.document = f),
          (this.form = i),
          (this.element = E);
      }
      t.prototype.build = function () {
        return () => {};
      };
      function a(l, f, i, E) {
        var m = l.ownerDocument || Object.create(null),
          w = l.form || Object.create(null);
        l[f] = new t(E, m, w, l).build();
      }
      function c(l, f) {
        var i = l.prototype;
        f.forEach(function (E) {
          Object.defineProperty(i, "on" + E, {
            get: function () {
              return this._getEventHandler(E);
            },
            set: function (m) {
              this._setEventHandler(E, m);
            },
          }),
            h.registerChangeHandler(l, "on" + E, a);
        });
      }
    },
  }),
  xn = le({
    "external/npm/node_modules/domino/lib/htmlelts.js"(b) {
      "use strict";
      var v = Ve(),
        h = Er(),
        s = Mn(),
        t = Be(),
        a = Ia(),
        c = Ra(),
        l = (b.elements = {}),
        f = Object.create(null);
      b.createElement = function (y, g, k) {
        var _ = f[g] || J;
        return new _(y, g, k);
      };
      function i(y) {
        return c(y, R, l, f);
      }
      function E(y) {
        return {
          get: function () {
            var g = this._getattr(y);
            if (g === null) return "";
            var k = this.doc._resolve(g);
            return k === null ? g : k;
          },
          set: function (g) {
            this._setattr(y, g);
          },
        };
      }
      function m(y) {
        return {
          get: function () {
            var g = this._getattr(y);
            return g === null
              ? null
              : g.toLowerCase() === "use-credentials"
                ? "use-credentials"
                : "anonymous";
          },
          set: function (g) {
            g == null ? this.removeAttribute(y) : this._setattr(y, g);
          },
        };
      }
      var w = {
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
        I = {
          A: !0,
          LINK: !0,
          BUTTON: !0,
          INPUT: !0,
          SELECT: !0,
          TEXTAREA: !0,
          COMMAND: !0,
        },
        H = function (y, g, k) {
          R.call(this, y, g, k), (this._form = null);
        },
        R = (b.HTMLElement = i({
          superclass: h,
          name: "HTMLElement",
          ctor: function (g, k, _) {
            h.call(this, g, k, t.NAMESPACE.HTML, _);
          },
          props: {
            dangerouslySetInnerHTML: {
              set: function (y) {
                this._innerHTML = y;
              },
            },
            innerHTML: {
              get: function () {
                return this.serialize();
              },
              set: function (y) {
                var g = this.ownerDocument.implementation.mozHTMLParser(
                  this.ownerDocument._address,
                  this
                );
                g.parse(y === null ? "" : String(y), !0);
                for (
                  var k = this instanceof f.template ? this.content : this;
                  k.hasChildNodes();

                )
                  k.removeChild(k.firstChild);
                k.appendChild(g._asDocumentFragment());
              },
            },
            style: {
              get: function () {
                return this._style || (this._style = new s(this)), this._style;
              },
              set: function (y) {
                y == null && (y = ""), this._setattr("style", String(y));
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
                    var y = this.ownerDocument.createEvent("MouseEvent");
                    y.initMouseEvent(
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
                    var g = this.dispatchEvent(y);
                    g
                      ? this._post_click_activation_steps &&
                        this._post_click_activation_steps(y)
                      : this._cancelled_activation_steps &&
                        this._cancelled_activation_steps();
                  } finally {
                    this._click_in_progress = !1;
                  }
                }
              },
            },
            submit: { value: t.nyi },
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
                return this.tagName in I || this.contentEditable ? 0 : -1;
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
        J = i({
          name: "HTMLUnknownElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
        }),
        B = {
          form: {
            get: function () {
              return this._form;
            },
          },
        };
      i({
        tag: "a",
        name: "HTMLAnchorElement",
        ctor: function (g, k, _) {
          R.call(this, g, k, _);
        },
        props: {
          _post_click_activation_steps: {
            value: function (y) {
              this.href &&
                (this.ownerDocument.defaultView.location = this.href);
            },
          },
        },
        attributes: {
          href: E,
          ping: String,
          download: String,
          target: String,
          rel: String,
          media: String,
          hreflang: String,
          type: String,
          referrerPolicy: w,
          coords: String,
          charset: String,
          name: String,
          rev: String,
          shape: String,
        },
      }),
        a._inherit(f.a.prototype),
        i({
          tag: "area",
          name: "HTMLAreaElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: {
            alt: String,
            target: String,
            download: String,
            rel: String,
            media: String,
            href: E,
            hreflang: String,
            type: String,
            shape: String,
            coords: String,
            ping: String,
            referrerPolicy: w,
            noHref: Boolean,
          },
        }),
        a._inherit(f.area.prototype),
        i({
          tag: "br",
          name: "HTMLBRElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: { clear: String },
        }),
        i({
          tag: "base",
          name: "HTMLBaseElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: { target: String },
        }),
        i({
          tag: "body",
          name: "HTMLBodyElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
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
        i({
          tag: "button",
          name: "HTMLButtonElement",
          ctor: function (g, k, _) {
            H.call(this, g, k, _);
          },
          props: B,
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
            formAction: E,
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
        i({
          tag: "dl",
          name: "HTMLDListElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: { compact: Boolean },
        }),
        i({
          tag: "data",
          name: "HTMLDataElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: { value: String },
        }),
        i({
          tag: "datalist",
          name: "HTMLDataListElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
        }),
        i({
          tag: "details",
          name: "HTMLDetailsElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: { open: Boolean },
        }),
        i({
          tag: "div",
          name: "HTMLDivElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: { align: String },
        }),
        i({
          tag: "embed",
          name: "HTMLEmbedElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: {
            src: E,
            type: String,
            width: String,
            height: String,
            align: String,
            name: String,
          },
        }),
        i({
          tag: "fieldset",
          name: "HTMLFieldSetElement",
          ctor: function (g, k, _) {
            H.call(this, g, k, _);
          },
          props: B,
          attributes: { disabled: Boolean, name: String },
        }),
        i({
          tag: "form",
          name: "HTMLFormElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
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
        i({
          tag: "hr",
          name: "HTMLHRElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: {
            align: String,
            color: String,
            noShade: Boolean,
            size: String,
            width: String,
          },
        }),
        i({
          tag: "head",
          name: "HTMLHeadElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
        }),
        i({
          tags: ["h1", "h2", "h3", "h4", "h5", "h6"],
          name: "HTMLHeadingElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: { align: String },
        }),
        i({
          tag: "html",
          name: "HTMLHtmlElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: { xmlns: E, version: String },
        }),
        i({
          tag: "iframe",
          name: "HTMLIFrameElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: {
            src: E,
            srcdoc: String,
            name: String,
            width: String,
            height: String,
            seamless: Boolean,
            allow: Boolean,
            allowFullscreen: Boolean,
            allowUserMedia: Boolean,
            allowPaymentRequest: Boolean,
            referrerPolicy: w,
            loading: { type: ["eager", "lazy"], treatNullAsEmptyString: !0 },
            align: String,
            scrolling: String,
            frameBorder: String,
            longDesc: E,
            marginHeight: { type: String, treatNullAsEmptyString: !0 },
            marginWidth: { type: String, treatNullAsEmptyString: !0 },
          },
        }),
        i({
          tag: "img",
          name: "HTMLImageElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: {
            alt: String,
            src: E,
            srcset: String,
            crossOrigin: m,
            useMap: String,
            isMap: Boolean,
            sizes: String,
            height: { type: "unsigned long", default: 0 },
            width: { type: "unsigned long", default: 0 },
            referrerPolicy: w,
            loading: { type: ["eager", "lazy"], missing: "" },
            name: String,
            lowsrc: E,
            align: String,
            hspace: { type: "unsigned long", default: 0 },
            vspace: { type: "unsigned long", default: 0 },
            longDesc: E,
            border: { type: String, treatNullAsEmptyString: !0 },
          },
        }),
        i({
          tag: "input",
          name: "HTMLInputElement",
          ctor: function (g, k, _) {
            H.call(this, g, k, _);
          },
          props: {
            form: B.form,
            _post_click_activation_steps: {
              value: function (y) {
                if (this.type === "checkbox") this.checked = !this.checked;
                else if (this.type === "radio")
                  for (
                    var g = this.form.getElementsByName(this.name),
                      k = g.length - 1;
                    k >= 0;
                    k--
                  ) {
                    var _ = g[k];
                    _.checked = _ === this;
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
            src: E,
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
        i({
          tag: "keygen",
          name: "HTMLKeygenElement",
          ctor: function (g, k, _) {
            H.call(this, g, k, _);
          },
          props: B,
          attributes: {
            name: String,
            disabled: Boolean,
            autofocus: Boolean,
            challenge: String,
            keytype: { type: ["rsa"], missing: "" },
          },
        }),
        i({
          tag: "li",
          name: "HTMLLIElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: { value: { type: "long", default: 0 }, type: String },
        }),
        i({
          tag: "label",
          name: "HTMLLabelElement",
          ctor: function (g, k, _) {
            H.call(this, g, k, _);
          },
          props: B,
          attributes: { htmlFor: { name: "for", type: String } },
        }),
        i({
          tag: "legend",
          name: "HTMLLegendElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: { align: String },
        }),
        i({
          tag: "link",
          name: "HTMLLinkElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: {
            href: E,
            rel: String,
            media: String,
            hreflang: String,
            type: String,
            crossOrigin: m,
            nonce: String,
            integrity: String,
            referrerPolicy: w,
            imageSizes: String,
            imageSrcset: String,
            charset: String,
            rev: String,
            target: String,
          },
        }),
        i({
          tag: "map",
          name: "HTMLMapElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: { name: String },
        }),
        i({
          tag: "menu",
          name: "HTMLMenuElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: {
            type: { type: ["context", "popup", "toolbar"], missing: "toolbar" },
            label: String,
            compact: Boolean,
          },
        }),
        i({
          tag: "meta",
          name: "HTMLMetaElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: {
            name: String,
            content: String,
            httpEquiv: { name: "http-equiv", type: String },
            scheme: String,
          },
        }),
        i({
          tag: "meter",
          name: "HTMLMeterElement",
          ctor: function (g, k, _) {
            H.call(this, g, k, _);
          },
          props: B,
        }),
        i({
          tags: ["ins", "del"],
          name: "HTMLModElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: { cite: E, dateTime: String },
        }),
        i({
          tag: "ol",
          name: "HTMLOListElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          props: {
            _numitems: {
              get: function () {
                var y = 0;
                return (
                  this.childNodes.forEach(function (g) {
                    g.nodeType === v.ELEMENT_NODE && g.tagName === "LI" && y++;
                  }),
                  y
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
        i({
          tag: "object",
          name: "HTMLObjectElement",
          ctor: function (g, k, _) {
            H.call(this, g, k, _);
          },
          props: B,
          attributes: {
            data: E,
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
            codeBase: E,
            codeType: String,
            border: { type: String, treatNullAsEmptyString: !0 },
          },
        }),
        i({
          tag: "optgroup",
          name: "HTMLOptGroupElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: { disabled: Boolean, label: String },
        }),
        i({
          tag: "option",
          name: "HTMLOptionElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          props: {
            form: {
              get: function () {
                for (
                  var y = this.parentNode;
                  y && y.nodeType === v.ELEMENT_NODE;

                ) {
                  if (y.localName === "select") return y.form;
                  y = y.parentNode;
                }
              },
            },
            value: {
              get: function () {
                return this._getattr("value") || this.text;
              },
              set: function (y) {
                this._setattr("value", y);
              },
            },
            text: {
              get: function () {
                return this.textContent.replace(/[ \t\n\f\r]+/g, " ").trim();
              },
              set: function (y) {
                this.textContent = y;
              },
            },
          },
          attributes: {
            disabled: Boolean,
            defaultSelected: { name: "selected", type: Boolean },
            label: String,
          },
        }),
        i({
          tag: "output",
          name: "HTMLOutputElement",
          ctor: function (g, k, _) {
            H.call(this, g, k, _);
          },
          props: B,
          attributes: { name: String },
        }),
        i({
          tag: "p",
          name: "HTMLParagraphElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: { align: String },
        }),
        i({
          tag: "param",
          name: "HTMLParamElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: {
            name: String,
            value: String,
            type: String,
            valueType: String,
          },
        }),
        i({
          tags: ["pre", "listing", "xmp"],
          name: "HTMLPreElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: { width: { type: "long", default: 0 } },
        }),
        i({
          tag: "progress",
          name: "HTMLProgressElement",
          ctor: function (g, k, _) {
            H.call(this, g, k, _);
          },
          props: B,
          attributes: { max: { type: Number, float: !0, default: 1, min: 0 } },
        }),
        i({
          tags: ["q", "blockquote"],
          name: "HTMLQuoteElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: { cite: E },
        }),
        i({
          tag: "script",
          name: "HTMLScriptElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          props: {
            text: {
              get: function () {
                for (
                  var y = "", g = 0, k = this.childNodes.length;
                  g < k;
                  g++
                ) {
                  var _ = this.childNodes[g];
                  _.nodeType === v.TEXT_NODE && (y += _._data);
                }
                return y;
              },
              set: function (y) {
                this.removeChildren(),
                  y !== null &&
                    y !== "" &&
                    this.appendChild(this.ownerDocument.createTextNode(y));
              },
            },
          },
          attributes: {
            src: E,
            type: String,
            charset: String,
            referrerPolicy: w,
            defer: Boolean,
            async: Boolean,
            nomodule: Boolean,
            crossOrigin: m,
            nonce: String,
            integrity: String,
          },
        }),
        i({
          tag: "select",
          name: "HTMLSelectElement",
          ctor: function (g, k, _) {
            H.call(this, g, k, _);
          },
          props: {
            form: B.form,
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
        i({
          tag: "span",
          name: "HTMLSpanElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
        }),
        i({
          tag: "style",
          name: "HTMLStyleElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: { media: String, type: String, scoped: Boolean },
        }),
        i({
          tag: "caption",
          name: "HTMLTableCaptionElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: { align: String },
        }),
        i({
          name: "HTMLTableCellElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
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
        i({
          tags: ["col", "colgroup"],
          name: "HTMLTableColElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
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
        i({
          tag: "table",
          name: "HTMLTableElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
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
        i({
          tag: "template",
          name: "HTMLTemplateElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _),
              (this._contentFragment = g._templateDoc.createDocumentFragment());
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
        i({
          tag: "tr",
          name: "HTMLTableRowElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
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
        i({
          tags: ["thead", "tfoot", "tbody"],
          name: "HTMLTableSectionElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
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
        i({
          tag: "textarea",
          name: "HTMLTextAreaElement",
          ctor: function (g, k, _) {
            H.call(this, g, k, _);
          },
          props: {
            form: B.form,
            type: {
              get: function () {
                return "textarea";
              },
            },
            defaultValue: {
              get: function () {
                return this.textContent;
              },
              set: function (y) {
                this.textContent = y;
              },
            },
            value: {
              get: function () {
                return this.defaultValue;
              },
              set: function (y) {
                this.defaultValue = y;
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
        i({
          tag: "time",
          name: "HTMLTimeElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: { dateTime: String, pubDate: Boolean },
        }),
        i({
          tag: "title",
          name: "HTMLTitleElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          props: {
            text: {
              get: function () {
                return this.textContent;
              },
            },
          },
        }),
        i({
          tag: "ul",
          name: "HTMLUListElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: { type: String, compact: Boolean },
        }),
        i({
          name: "HTMLMediaElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: {
            src: E,
            crossOrigin: m,
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
        i({
          name: "HTMLAudioElement",
          tag: "audio",
          superclass: l.HTMLMediaElement,
          ctor: function (g, k, _) {
            l.HTMLMediaElement.call(this, g, k, _);
          },
        }),
        i({
          name: "HTMLVideoElement",
          tag: "video",
          superclass: l.HTMLMediaElement,
          ctor: function (g, k, _) {
            l.HTMLMediaElement.call(this, g, k, _);
          },
          attributes: {
            poster: E,
            width: { type: "unsigned long", min: 0, default: 0 },
            height: { type: "unsigned long", min: 0, default: 0 },
          },
        }),
        i({
          tag: "td",
          name: "HTMLTableDataCellElement",
          superclass: l.HTMLTableCellElement,
          ctor: function (g, k, _) {
            l.HTMLTableCellElement.call(this, g, k, _);
          },
        }),
        i({
          tag: "th",
          name: "HTMLTableHeaderCellElement",
          superclass: l.HTMLTableCellElement,
          ctor: function (g, k, _) {
            l.HTMLTableCellElement.call(this, g, k, _);
          },
        }),
        i({
          tag: "frameset",
          name: "HTMLFrameSetElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
        }),
        i({
          tag: "frame",
          name: "HTMLFrameElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
        }),
        i({
          tag: "canvas",
          name: "HTMLCanvasElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          props: {
            getContext: { value: t.nyi },
            probablySupportsContext: { value: t.nyi },
            setContext: { value: t.nyi },
            transferControlToProxy: { value: t.nyi },
            toDataURL: { value: t.nyi },
            toBlob: { value: t.nyi },
          },
          attributes: {
            width: { type: "unsigned long", default: 300 },
            height: { type: "unsigned long", default: 150 },
          },
        }),
        i({
          tag: "dialog",
          name: "HTMLDialogElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          props: {
            show: { value: t.nyi },
            showModal: { value: t.nyi },
            close: { value: t.nyi },
          },
          attributes: { open: Boolean, returnValue: String },
        }),
        i({
          tag: "menuitem",
          name: "HTMLMenuItemElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          props: {
            _label: {
              get: function () {
                var y = this._getattr("label");
                return y !== null && y !== ""
                  ? y
                  : ((y = this.textContent),
                    y.replace(/[ \t\n\f\r]+/g, " ").trim());
              },
            },
            label: {
              get: function () {
                var y = this._getattr("label");
                return y !== null ? y : this._label;
              },
              set: function (y) {
                this._setattr("label", y);
              },
            },
          },
          attributes: {
            type: {
              type: ["command", "checkbox", "radio"],
              missing: "command",
            },
            icon: E,
            disabled: Boolean,
            checked: Boolean,
            radiogroup: String,
            default: Boolean,
          },
        }),
        i({
          tag: "source",
          name: "HTMLSourceElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: {
            srcset: String,
            sizes: String,
            media: String,
            src: E,
            type: String,
            width: String,
            height: String,
          },
        }),
        i({
          tag: "track",
          name: "HTMLTrackElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: {
            src: E,
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
            readyState: { get: t.nyi },
            track: { get: t.nyi },
          },
        }),
        i({
          tag: "font",
          name: "HTMLFontElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: {
            color: { type: String, treatNullAsEmptyString: !0 },
            face: { type: String },
            size: { type: String },
          },
        }),
        i({
          tag: "dir",
          name: "HTMLDirectoryElement",
          ctor: function (g, k, _) {
            R.call(this, g, k, _);
          },
          attributes: { compact: Boolean },
        }),
        i({
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
  Oa = le({
    "external/npm/node_modules/domino/lib/svg.js"(b) {
      "use strict";
      var v = Er(),
        h = Ra(),
        s = Be(),
        t = Mn(),
        a = (b.elements = {}),
        c = Object.create(null);
      b.createElement = function (i, E, m) {
        var w = c[E] || f;
        return new w(i, E, m);
      };
      function l(i) {
        return h(i, f, a, c);
      }
      var f = l({
        superclass: v,
        name: "SVGElement",
        ctor: function (E, m, w) {
          v.call(this, E, m, s.NAMESPACE.SVG, w);
        },
        props: {
          style: {
            get: function () {
              return this._style || (this._style = new t(this)), this._style;
            },
          },
        },
      });
      l({
        name: "SVGSVGElement",
        ctor: function (E, m, w) {
          f.call(this, E, m, w);
        },
        tag: "svg",
        props: {
          createSVGRect: {
            value: function () {
              return b.createElement(this.ownerDocument, "rect", null);
            },
          },
        },
      }),
        l({
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
  Ss = le({
    "external/npm/node_modules/domino/lib/MutationConstants.js"(b, v) {
      "use strict";
      v.exports = {
        VALUE: 1,
        ATTR: 2,
        REMOVE_ATTR: 3,
        REMOVE: 4,
        MOVE: 5,
        INSERT: 6,
      };
    },
  }),
  In = le({
    "external/npm/node_modules/domino/lib/Document.js"(b, v) {
      "use strict";
      v.exports = G;
      var h = Ve(),
        s = ar(),
        t = kn(),
        a = Er(),
        c = La(),
        l = Ca(),
        f = br(),
        i = Da(),
        E = Aa(),
        m = tn(),
        w = Ts(),
        I = ys(),
        H = en(),
        R = An(),
        J = Cn(),
        B = xa(),
        y = Ln(),
        g = xn(),
        k = Oa(),
        _ = Be(),
        ae = Ss(),
        ne = _.NAMESPACE,
        Y = Sn().isApiWritable;
      function G(S, A) {
        t.call(this),
          (this.nodeType = h.DOCUMENT_NODE),
          (this.isHTML = S),
          (this._address = A || "about:blank"),
          (this.readyState = "loading"),
          (this.implementation = new m(this)),
          (this.ownerDocument = null),
          (this._contentType = S ? "text/html" : "application/xml"),
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
      var D = {
          event: "Event",
          customevent: "CustomEvent",
          uievent: "UIEvent",
          mouseevent: "MouseEvent",
        },
        P = {
          events: "event",
          htmlevents: "event",
          mouseevents: "mouseevent",
          mutationevents: "mutationevent",
          uievents: "uievent",
        },
        Z = function (S, A, K) {
          return {
            get: function () {
              var ge = S.call(this);
              return ge ? ge[A] : K;
            },
            set: function (ge) {
              var Me = S.call(this);
              Me && (Me[A] = ge);
            },
          };
        };
      function u(S, A) {
        var K, ge, Me;
        return (
          S === "" && (S = null),
          y.isValidQName(A) || _.InvalidCharacterError(),
          (K = null),
          (ge = A),
          (Me = A.indexOf(":")),
          Me >= 0 && ((K = A.substring(0, Me)), (ge = A.substring(Me + 1))),
          K !== null && S === null && _.NamespaceError(),
          K === "xml" && S !== ne.XML && _.NamespaceError(),
          (K === "xmlns" || A === "xmlns") &&
            S !== ne.XMLNS &&
            _.NamespaceError(),
          S === ne.XMLNS &&
            !(K === "xmlns" || A === "xmlns") &&
            _.NamespaceError(),
          { namespace: S, prefix: K, localName: ge }
        );
      }
      G.prototype = Object.create(t.prototype, {
        _setMutationHandler: {
          value: function (S) {
            this.mutationHandler = S;
          },
        },
        _dispatchRendererEvent: {
          value: function (S, A, K) {
            var ge = this._nodes[S];
            ge && ge._dispatchEvent(new f(A, K), !0);
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
          set: _.nyi,
        },
        compatMode: {
          get: function () {
            return this._quirks ? "BackCompat" : "CSS1Compat";
          },
        },
        createTextNode: {
          value: function (S) {
            return new c(this, String(S));
          },
        },
        createComment: {
          value: function (S) {
            return new l(this, S);
          },
        },
        createDocumentFragment: {
          value: function () {
            return new i(this);
          },
        },
        createProcessingInstruction: {
          value: function (S, A) {
            return (
              (!y.isValidName(S) || A.indexOf("?>") !== -1) &&
                _.InvalidCharacterError(),
              new E(this, S, A)
            );
          },
        },
        createAttribute: {
          value: function (S) {
            return (
              (S = String(S)),
              y.isValidName(S) || _.InvalidCharacterError(),
              this.isHTML && (S = _.toASCIILowerCase(S)),
              new a._Attr(null, S, null, null, "")
            );
          },
        },
        createAttributeNS: {
          value: function (S, A) {
            (S = S == null || S === "" ? null : String(S)), (A = String(A));
            var K = u(S, A);
            return new a._Attr(null, K.localName, K.prefix, K.namespace, "");
          },
        },
        createElement: {
          value: function (S) {
            return (
              (S = String(S)),
              y.isValidName(S) || _.InvalidCharacterError(),
              this.isHTML
                ? (/[A-Z]/.test(S) && (S = _.toASCIILowerCase(S)),
                  g.createElement(this, S, null))
                : this.contentType === "application/xhtml+xml"
                  ? g.createElement(this, S, null)
                  : new a(this, S, null, null)
            );
          },
          writable: Y,
        },
        createElementNS: {
          value: function (S, A) {
            (S = S == null || S === "" ? null : String(S)), (A = String(A));
            var K = u(S, A);
            return this._createElementNS(K.localName, K.namespace, K.prefix);
          },
          writable: Y,
        },
        _createElementNS: {
          value: function (S, A, K) {
            return A === ne.HTML
              ? g.createElement(this, S, K)
              : A === ne.SVG
                ? k.createElement(this, S, K)
                : new a(this, S, A, K);
          },
        },
        createEvent: {
          value: function (A) {
            A = A.toLowerCase();
            var K = P[A] || A,
              ge = B[D[K]];
            if (ge) {
              var Me = new ge();
              return (Me._initialized = !1), Me;
            } else _.NotSupportedError();
          },
        },
        createTreeWalker: {
          value: function (S, A, K) {
            if (!S) throw new TypeError("root argument is required");
            if (!(S instanceof h)) throw new TypeError("root not a node");
            return (
              (A = A === void 0 ? H.SHOW_ALL : +A),
              (K = K === void 0 ? null : K),
              new w(S, A, K)
            );
          },
        },
        createNodeIterator: {
          value: function (S, A, K) {
            if (!S) throw new TypeError("root argument is required");
            if (!(S instanceof h)) throw new TypeError("root not a node");
            return (
              (A = A === void 0 ? H.SHOW_ALL : +A),
              (K = K === void 0 ? null : K),
              new I(S, A, K)
            );
          },
        },
        _attachNodeIterator: {
          value: function (S) {
            this._nodeIterators || (this._nodeIterators = []),
              this._nodeIterators.push(S);
          },
        },
        _detachNodeIterator: {
          value: function (S) {
            var A = this._nodeIterators.indexOf(S);
            this._nodeIterators.splice(A, 1);
          },
        },
        _preremoveNodeIterators: {
          value: function (S) {
            this._nodeIterators &&
              this._nodeIterators.forEach(function (A) {
                A._preremove(S);
              });
          },
        },
        _updateDocTypeElement: {
          value: function () {
            this.doctype = this.documentElement = null;
            for (var A = this.firstChild; A !== null; A = A.nextSibling)
              A.nodeType === h.DOCUMENT_TYPE_NODE
                ? (this.doctype = A)
                : A.nodeType === h.ELEMENT_NODE && (this.documentElement = A);
          },
        },
        insertBefore: {
          value: function (A, K) {
            return (
              h.prototype.insertBefore.call(this, A, K),
              this._updateDocTypeElement(),
              A
            );
          },
        },
        replaceChild: {
          value: function (A, K) {
            return (
              h.prototype.replaceChild.call(this, A, K),
              this._updateDocTypeElement(),
              K
            );
          },
        },
        removeChild: {
          value: function (A) {
            return (
              h.prototype.removeChild.call(this, A),
              this._updateDocTypeElement(),
              A
            );
          },
        },
        getElementById: {
          value: function (S) {
            var A = this.byId[S];
            return A ? (A instanceof re ? A.getFirst() : A) : null;
          },
        },
        _hasMultipleElementsWithId: {
          value: function (S) {
            return this.byId[S] instanceof re;
          },
        },
        getElementsByName: { value: a.prototype.getElementsByName },
        getElementsByTagName: { value: a.prototype.getElementsByTagName },
        getElementsByTagNameNS: { value: a.prototype.getElementsByTagNameNS },
        getElementsByClassName: { value: a.prototype.getElementsByClassName },
        adoptNode: {
          value: function (A) {
            return (
              A.nodeType === h.DOCUMENT_NODE && _.NotSupportedError(),
              A.nodeType === h.ATTRIBUTE_NODE ||
                (A.parentNode && A.parentNode.removeChild(A),
                A.ownerDocument !== this && j(A, this)),
              A
            );
          },
        },
        importNode: {
          value: function (A, K) {
            return this.adoptNode(A.cloneNode(K));
          },
          writable: Y,
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
        domain: { get: _.nyi, set: _.nyi },
        referrer: { get: _.nyi },
        cookie: { get: _.nyi, set: _.nyi },
        lastModified: { get: _.nyi },
        location: {
          get: function () {
            return this.defaultView ? this.defaultView.location : null;
          },
          set: _.nyi,
        },
        _titleElement: {
          get: function () {
            return this.getElementsByTagName("title").item(0) || null;
          },
        },
        title: {
          get: function () {
            var S = this._titleElement,
              A = S ? S.textContent : "";
            return A.replace(/[ \t\n\r\f]+/g, " ").replace(/(^ )|( $)/g, "");
          },
          set: function (S) {
            var A = this._titleElement,
              K = this.head;
            (!A && !K) ||
              (A || ((A = this.createElement("title")), K.appendChild(A)),
              (A.textContent = S));
          },
        },
        dir: Z(
          function () {
            var S = this.documentElement;
            if (S && S.tagName === "HTML") return S;
          },
          "dir",
          ""
        ),
        fgColor: Z(
          function () {
            return this.body;
          },
          "text",
          ""
        ),
        linkColor: Z(
          function () {
            return this.body;
          },
          "link",
          ""
        ),
        vlinkColor: Z(
          function () {
            return this.body;
          },
          "vLink",
          ""
        ),
        alinkColor: Z(
          function () {
            return this.body;
          },
          "aLink",
          ""
        ),
        bgColor: Z(
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
            return n(this.documentElement, "body");
          },
          set: _.nyi,
        },
        head: {
          get: function () {
            return n(this.documentElement, "head");
          },
        },
        images: { get: _.nyi },
        embeds: { get: _.nyi },
        plugins: { get: _.nyi },
        links: { get: _.nyi },
        forms: { get: _.nyi },
        scripts: { get: _.nyi },
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
          set: _.nyi,
        },
        outerHTML: {
          get: function () {
            return this.serialize();
          },
          set: _.nyi,
        },
        write: {
          value: function (S) {
            if ((this.isHTML || _.InvalidStateError(), !!this._parser)) {
              this._parser;
              var A = arguments.join("");
              this._parser.parse(A);
            }
          },
        },
        writeln: {
          value: function (A) {
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
              this._dispatchEvent(new f("readystatechange"), !0),
              this._dispatchEvent(new f("DOMContentLoaded"), !0),
              (this.readyState = "complete"),
              this._dispatchEvent(new f("readystatechange"), !0),
              this.defaultView &&
                this.defaultView._dispatchEvent(new f("load"), !0);
          },
        },
        clone: {
          value: function () {
            var A = new G(this.isHTML, this._address);
            return (
              (A._quirks = this._quirks),
              (A._contentType = this._contentType),
              A
            );
          },
        },
        cloneNode: {
          value: function (A) {
            var K = h.prototype.cloneNode.call(this, !1);
            if (A)
              for (var ge = this.firstChild; ge !== null; ge = ge.nextSibling)
                K._appendChild(K.importNode(ge, !0));
            return K._updateDocTypeElement(), K;
          },
        },
        isEqual: {
          value: function (A) {
            return !0;
          },
        },
        mutateValue: {
          value: function (S) {
            this.mutationHandler &&
              this.mutationHandler({ type: ae.VALUE, target: S, data: S.data });
          },
        },
        mutateAttr: {
          value: function (S, A) {
            this.mutationHandler &&
              this.mutationHandler({
                type: ae.ATTR,
                target: S.ownerElement,
                attr: S,
              });
          },
        },
        mutateRemoveAttr: {
          value: function (S) {
            this.mutationHandler &&
              this.mutationHandler({
                type: ae.REMOVE_ATTR,
                target: S.ownerElement,
                attr: S,
              });
          },
        },
        mutateRemove: {
          value: function (S) {
            this.mutationHandler &&
              this.mutationHandler({
                type: ae.REMOVE,
                target: S.parentNode,
                node: S,
              }),
              C(S);
          },
        },
        mutateInsert: {
          value: function (S) {
            T(S),
              this.mutationHandler &&
                this.mutationHandler({
                  type: ae.INSERT,
                  target: S.parentNode,
                  node: S,
                });
          },
        },
        mutateMove: {
          value: function (S) {
            this.mutationHandler &&
              this.mutationHandler({ type: ae.MOVE, target: S });
          },
        },
        addId: {
          value: function (A, K) {
            var ge = this.byId[A];
            ge
              ? (ge instanceof re || ((ge = new re(ge)), (this.byId[A] = ge)),
                ge.add(K))
              : (this.byId[A] = K);
          },
        },
        delId: {
          value: function (A, K) {
            var ge = this.byId[A];
            _.assert(ge),
              ge instanceof re
                ? (ge.del(K),
                  ge.length === 1 && (this.byId[A] = ge.downgrade()))
                : (this.byId[A] = void 0);
          },
        },
        _resolve: {
          value: function (S) {
            return new R(this._documentBaseURL).resolve(S);
          },
        },
        _documentBaseURL: {
          get: function () {
            var S = this._address;
            S === "about:blank" && (S = "/");
            var A = this.querySelector("base[href]");
            return A ? new R(S).resolve(A.getAttribute("href")) : S;
          },
        },
        _templateDoc: {
          get: function () {
            if (!this._templateDocCache) {
              var S = new G(this.isHTML, this._address);
              this._templateDocCache = S._templateDocCache = S;
            }
            return this._templateDocCache;
          },
        },
        querySelector: {
          value: function (S) {
            return J(S, this)[0];
          },
        },
        querySelectorAll: {
          value: function (S) {
            var A = J(S, this);
            return A.item ? A : new s(A);
          },
        },
      });
      var o = [
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
      o.forEach(function (S) {
        Object.defineProperty(G.prototype, "on" + S, {
          get: function () {
            return this._getEventHandler(S);
          },
          set: function (A) {
            this._setEventHandler(S, A);
          },
        });
      });
      function n(S, A) {
        if (S && S.isHTML) {
          for (var K = S.firstChild; K !== null; K = K.nextSibling)
            if (
              K.nodeType === h.ELEMENT_NODE &&
              K.localName === A &&
              K.namespaceURI === ne.HTML
            )
              return K;
        }
        return null;
      }
      function p(S) {
        if (
          ((S._nid = S.ownerDocument._nextnid++),
          (S.ownerDocument._nodes[S._nid] = S),
          S.nodeType === h.ELEMENT_NODE)
        ) {
          var A = S.getAttribute("id");
          A && S.ownerDocument.addId(A, S), S._roothook && S._roothook();
        }
      }
      function d(S) {
        if (S.nodeType === h.ELEMENT_NODE) {
          var A = S.getAttribute("id");
          A && S.ownerDocument.delId(A, S);
        }
        (S.ownerDocument._nodes[S._nid] = void 0), (S._nid = void 0);
      }
      function T(S) {
        if ((p(S), S.nodeType === h.ELEMENT_NODE))
          for (var A = S.firstChild; A !== null; A = A.nextSibling) T(A);
      }
      function C(S) {
        d(S);
        for (var A = S.firstChild; A !== null; A = A.nextSibling) C(A);
      }
      function j(S, A) {
        (S.ownerDocument = A),
          (S._lastModTime = void 0),
          Object.prototype.hasOwnProperty.call(S, "_tagName") &&
            (S._tagName = void 0);
        for (var K = S.firstChild; K !== null; K = K.nextSibling) j(K, A);
      }
      function re(S) {
        (this.nodes = Object.create(null)),
          (this.nodes[S._nid] = S),
          (this.length = 1),
          (this.firstNode = void 0);
      }
      (re.prototype.add = function (S) {
        this.nodes[S._nid] ||
          ((this.nodes[S._nid] = S), this.length++, (this.firstNode = void 0));
      }),
        (re.prototype.del = function (S) {
          this.nodes[S._nid] &&
            (delete this.nodes[S._nid],
            this.length--,
            (this.firstNode = void 0));
        }),
        (re.prototype.getFirst = function () {
          if (!this.firstNode) {
            var S;
            for (S in this.nodes)
              (this.firstNode === void 0 ||
                this.firstNode.compareDocumentPosition(this.nodes[S]) &
                  h.DOCUMENT_POSITION_PRECEDING) &&
                (this.firstNode = this.nodes[S]);
          }
          return this.firstNode;
        }),
        (re.prototype.downgrade = function () {
          if (this.length === 1) {
            var S;
            for (S in this.nodes) return this.nodes[S];
          }
          return this;
        });
    },
  }),
  Rn = le({
    "external/npm/node_modules/domino/lib/DocumentType.js"(b, v) {
      "use strict";
      v.exports = a;
      var h = Ve(),
        s = ka(),
        t = Dn();
      function a(c, l, f, i) {
        s.call(this),
          (this.nodeType = h.DOCUMENT_TYPE_NODE),
          (this.ownerDocument = c || null),
          (this.name = l),
          (this.publicId = f || ""),
          (this.systemId = i || "");
      }
      (a.prototype = Object.create(s.prototype, {
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
            return new a(
              this.ownerDocument,
              this.name,
              this.publicId,
              this.systemId
            );
          },
        },
        isEqual: {
          value: function (l) {
            return (
              this.name === l.name &&
              this.publicId === l.publicId &&
              this.systemId === l.systemId
            );
          },
        },
      })),
        Object.defineProperties(a.prototype, t);
    },
  }),
  On = le({
    "external/npm/node_modules/domino/lib/HTMLParser.js"(b, v) {
      "use strict";
      v.exports = de;
      var h = In(),
        s = Rn(),
        t = Ve(),
        a = Be().NAMESPACE,
        c = xn(),
        l = c.elements,
        f = Function.prototype.apply.bind(Array.prototype.push),
        i = -1,
        E = 1,
        m = 2,
        w = 3,
        I = 4,
        H = 5,
        R = [],
        J =
          /^HTML$|^-\/\/W3O\/\/DTD W3 HTML Strict 3\.0\/\/EN\/\/$|^-\/W3C\/DTD HTML 4\.0 Transitional\/EN$|^\+\/\/Silmaril\/\/dtd html Pro v0r11 19970101\/\/|^-\/\/AdvaSoft Ltd\/\/DTD HTML 3\.0 asWedit \+ extensions\/\/|^-\/\/AS\/\/DTD HTML 3\.0 asWedit \+ extensions\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Level 1\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Level 2\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Strict Level 1\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Strict Level 2\/\/|^-\/\/IETF\/\/DTD HTML 2\.0 Strict\/\/|^-\/\/IETF\/\/DTD HTML 2\.0\/\/|^-\/\/IETF\/\/DTD HTML 2\.1E\/\/|^-\/\/IETF\/\/DTD HTML 3\.0\/\/|^-\/\/IETF\/\/DTD HTML 3\.2 Final\/\/|^-\/\/IETF\/\/DTD HTML 3\.2\/\/|^-\/\/IETF\/\/DTD HTML 3\/\/|^-\/\/IETF\/\/DTD HTML Level 0\/\/|^-\/\/IETF\/\/DTD HTML Level 1\/\/|^-\/\/IETF\/\/DTD HTML Level 2\/\/|^-\/\/IETF\/\/DTD HTML Level 3\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 0\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 1\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 2\/\/|^-\/\/IETF\/\/DTD HTML Strict Level 3\/\/|^-\/\/IETF\/\/DTD HTML Strict\/\/|^-\/\/IETF\/\/DTD HTML\/\/|^-\/\/Metrius\/\/DTD Metrius Presentational\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 2\.0 HTML Strict\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 2\.0 HTML\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 2\.0 Tables\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 3\.0 HTML Strict\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 3\.0 HTML\/\/|^-\/\/Microsoft\/\/DTD Internet Explorer 3\.0 Tables\/\/|^-\/\/Netscape Comm\. Corp\.\/\/DTD HTML\/\/|^-\/\/Netscape Comm\. Corp\.\/\/DTD Strict HTML\/\/|^-\/\/O'Reilly and Associates\/\/DTD HTML 2\.0\/\/|^-\/\/O'Reilly and Associates\/\/DTD HTML Extended 1\.0\/\/|^-\/\/O'Reilly and Associates\/\/DTD HTML Extended Relaxed 1\.0\/\/|^-\/\/SoftQuad Software\/\/DTD HoTMetaL PRO 6\.0::19990601::extensions to HTML 4\.0\/\/|^-\/\/SoftQuad\/\/DTD HoTMetaL PRO 4\.0::19971010::extensions to HTML 4\.0\/\/|^-\/\/Spyglass\/\/DTD HTML 2\.0 Extended\/\/|^-\/\/SQ\/\/DTD HTML 2\.0 HoTMetaL \+ extensions\/\/|^-\/\/Sun Microsystems Corp\.\/\/DTD HotJava HTML\/\/|^-\/\/Sun Microsystems Corp\.\/\/DTD HotJava Strict HTML\/\/|^-\/\/W3C\/\/DTD HTML 3 1995-03-24\/\/|^-\/\/W3C\/\/DTD HTML 3\.2 Draft\/\/|^-\/\/W3C\/\/DTD HTML 3\.2 Final\/\/|^-\/\/W3C\/\/DTD HTML 3\.2\/\/|^-\/\/W3C\/\/DTD HTML 3\.2S Draft\/\/|^-\/\/W3C\/\/DTD HTML 4\.0 Frameset\/\/|^-\/\/W3C\/\/DTD HTML 4\.0 Transitional\/\/|^-\/\/W3C\/\/DTD HTML Experimental 19960712\/\/|^-\/\/W3C\/\/DTD HTML Experimental 970421\/\/|^-\/\/W3C\/\/DTD W3 HTML\/\/|^-\/\/W3O\/\/DTD W3 HTML 3\.0\/\/|^-\/\/WebTechs\/\/DTD Mozilla HTML 2\.0\/\/|^-\/\/WebTechs\/\/DTD Mozilla HTML\/\//i,
        B = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd",
        y =
          /^-\/\/W3C\/\/DTD HTML 4\.01 Frameset\/\/|^-\/\/W3C\/\/DTD HTML 4\.01 Transitional\/\//i,
        g =
          /^-\/\/W3C\/\/DTD XHTML 1\.0 Frameset\/\/|^-\/\/W3C\/\/DTD XHTML 1\.0 Transitional\/\//i,
        k = Object.create(null);
      (k[a.HTML] = {
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
        (k[a.SVG] = {
          __proto__: null,
          foreignObject: !0,
          desc: !0,
          title: !0,
        }),
        (k[a.MATHML] = {
          __proto__: null,
          mi: !0,
          mo: !0,
          mn: !0,
          ms: !0,
          mtext: !0,
          "annotation-xml": !0,
        });
      var _ = Object.create(null);
      _[a.HTML] = { __proto__: null, address: !0, div: !0, p: !0 };
      var ae = Object.create(null);
      ae[a.HTML] = { __proto__: null, dd: !0, dt: !0 };
      var ne = Object.create(null);
      ne[a.HTML] = {
        __proto__: null,
        table: !0,
        thead: !0,
        tbody: !0,
        tfoot: !0,
        tr: !0,
      };
      var Y = Object.create(null);
      Y[a.HTML] = {
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
      var G = Object.create(null);
      G[a.HTML] = {
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
      var D = Object.create(null);
      D[a.HTML] = { __proto__: null, table: !0, template: !0, html: !0 };
      var P = Object.create(null);
      P[a.HTML] = {
        __proto__: null,
        tbody: !0,
        tfoot: !0,
        thead: !0,
        template: !0,
        html: !0,
      };
      var Z = Object.create(null);
      Z[a.HTML] = { __proto__: null, tr: !0, template: !0, html: !0 };
      var u = Object.create(null);
      u[a.HTML] = {
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
      var o = Object.create(null);
      (o[a.HTML] = {
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
        (o[a.MATHML] = {
          __proto__: null,
          mi: !0,
          mo: !0,
          mn: !0,
          ms: !0,
          mtext: !0,
          "annotation-xml": !0,
        }),
        (o[a.SVG] = {
          __proto__: null,
          foreignObject: !0,
          desc: !0,
          title: !0,
        });
      var n = Object.create(o);
      (n[a.HTML] = Object.create(o[a.HTML])),
        (n[a.HTML].ol = !0),
        (n[a.HTML].ul = !0);
      var p = Object.create(o);
      (p[a.HTML] = Object.create(o[a.HTML])), (p[a.HTML].button = !0);
      var d = Object.create(null);
      d[a.HTML] = { __proto__: null, html: !0, table: !0, template: !0 };
      var T = Object.create(null);
      T[a.HTML] = { __proto__: null, optgroup: !0, option: !0 };
      var C = Object.create(null);
      C[a.MATHML] = {
        __proto__: null,
        mi: !0,
        mo: !0,
        mn: !0,
        ms: !0,
        mtext: !0,
      };
      var j = Object.create(null);
      j[a.SVG] = { __proto__: null, foreignObject: !0, desc: !0, title: !0 };
      var re = {
          __proto__: null,
          "xlink:actuate": a.XLINK,
          "xlink:arcrole": a.XLINK,
          "xlink:href": a.XLINK,
          "xlink:role": a.XLINK,
          "xlink:show": a.XLINK,
          "xlink:title": a.XLINK,
          "xlink:type": a.XLINK,
          "xml:base": a.XML,
          "xml:lang": a.XML,
          "xml:space": a.XML,
          xmlns: a.XMLNS,
          "xmlns:xlink": a.XMLNS,
        },
        S = {
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
        A = {
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
        K = {
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
        ge = {
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
        Me =
          /(A(?:Elig;?|MP;?|acute;?|breve;|c(?:irc;?|y;)|fr;|grave;?|lpha;|macr;|nd;|o(?:gon;|pf;)|pplyFunction;|ring;?|s(?:cr;|sign;)|tilde;?|uml;?)|B(?:a(?:ckslash;|r(?:v;|wed;))|cy;|e(?:cause;|rnoullis;|ta;)|fr;|opf;|reve;|scr;|umpeq;)|C(?:Hcy;|OPY;?|a(?:cute;|p(?:;|italDifferentialD;)|yleys;)|c(?:aron;|edil;?|irc;|onint;)|dot;|e(?:dilla;|nterDot;)|fr;|hi;|ircle(?:Dot;|Minus;|Plus;|Times;)|lo(?:ckwiseContourIntegral;|seCurly(?:DoubleQuote;|Quote;))|o(?:lon(?:;|e;)|n(?:gruent;|int;|tourIntegral;)|p(?:f;|roduct;)|unterClockwiseContourIntegral;)|ross;|scr;|up(?:;|Cap;))|D(?:D(?:;|otrahd;)|Jcy;|Scy;|Zcy;|a(?:gger;|rr;|shv;)|c(?:aron;|y;)|el(?:;|ta;)|fr;|i(?:a(?:critical(?:Acute;|Do(?:t;|ubleAcute;)|Grave;|Tilde;)|mond;)|fferentialD;)|o(?:pf;|t(?:;|Dot;|Equal;)|uble(?:ContourIntegral;|Do(?:t;|wnArrow;)|L(?:eft(?:Arrow;|RightArrow;|Tee;)|ong(?:Left(?:Arrow;|RightArrow;)|RightArrow;))|Right(?:Arrow;|Tee;)|Up(?:Arrow;|DownArrow;)|VerticalBar;)|wn(?:Arrow(?:;|Bar;|UpArrow;)|Breve;|Left(?:RightVector;|TeeVector;|Vector(?:;|Bar;))|Right(?:TeeVector;|Vector(?:;|Bar;))|Tee(?:;|Arrow;)|arrow;))|s(?:cr;|trok;))|E(?:NG;|TH;?|acute;?|c(?:aron;|irc;?|y;)|dot;|fr;|grave;?|lement;|m(?:acr;|pty(?:SmallSquare;|VerySmallSquare;))|o(?:gon;|pf;)|psilon;|qu(?:al(?:;|Tilde;)|ilibrium;)|s(?:cr;|im;)|ta;|uml;?|x(?:ists;|ponentialE;))|F(?:cy;|fr;|illed(?:SmallSquare;|VerySmallSquare;)|o(?:pf;|rAll;|uriertrf;)|scr;)|G(?:Jcy;|T;?|amma(?:;|d;)|breve;|c(?:edil;|irc;|y;)|dot;|fr;|g;|opf;|reater(?:Equal(?:;|Less;)|FullEqual;|Greater;|Less;|SlantEqual;|Tilde;)|scr;|t;)|H(?:ARDcy;|a(?:cek;|t;)|circ;|fr;|ilbertSpace;|o(?:pf;|rizontalLine;)|s(?:cr;|trok;)|ump(?:DownHump;|Equal;))|I(?:Ecy;|Jlig;|Ocy;|acute;?|c(?:irc;?|y;)|dot;|fr;|grave;?|m(?:;|a(?:cr;|ginaryI;)|plies;)|n(?:t(?:;|e(?:gral;|rsection;))|visible(?:Comma;|Times;))|o(?:gon;|pf;|ta;)|scr;|tilde;|u(?:kcy;|ml;?))|J(?:c(?:irc;|y;)|fr;|opf;|s(?:cr;|ercy;)|ukcy;)|K(?:Hcy;|Jcy;|appa;|c(?:edil;|y;)|fr;|opf;|scr;)|L(?:Jcy;|T;?|a(?:cute;|mbda;|ng;|placetrf;|rr;)|c(?:aron;|edil;|y;)|e(?:ft(?:A(?:ngleBracket;|rrow(?:;|Bar;|RightArrow;))|Ceiling;|Do(?:ubleBracket;|wn(?:TeeVector;|Vector(?:;|Bar;)))|Floor;|Right(?:Arrow;|Vector;)|T(?:ee(?:;|Arrow;|Vector;)|riangle(?:;|Bar;|Equal;))|Up(?:DownVector;|TeeVector;|Vector(?:;|Bar;))|Vector(?:;|Bar;)|arrow;|rightarrow;)|ss(?:EqualGreater;|FullEqual;|Greater;|Less;|SlantEqual;|Tilde;))|fr;|l(?:;|eftarrow;)|midot;|o(?:ng(?:Left(?:Arrow;|RightArrow;)|RightArrow;|left(?:arrow;|rightarrow;)|rightarrow;)|pf;|wer(?:LeftArrow;|RightArrow;))|s(?:cr;|h;|trok;)|t;)|M(?:ap;|cy;|e(?:diumSpace;|llintrf;)|fr;|inusPlus;|opf;|scr;|u;)|N(?:Jcy;|acute;|c(?:aron;|edil;|y;)|e(?:gative(?:MediumSpace;|Thi(?:ckSpace;|nSpace;)|VeryThinSpace;)|sted(?:GreaterGreater;|LessLess;)|wLine;)|fr;|o(?:Break;|nBreakingSpace;|pf;|t(?:;|C(?:ongruent;|upCap;)|DoubleVerticalBar;|E(?:lement;|qual(?:;|Tilde;)|xists;)|Greater(?:;|Equal;|FullEqual;|Greater;|Less;|SlantEqual;|Tilde;)|Hump(?:DownHump;|Equal;)|Le(?:ftTriangle(?:;|Bar;|Equal;)|ss(?:;|Equal;|Greater;|Less;|SlantEqual;|Tilde;))|Nested(?:GreaterGreater;|LessLess;)|Precedes(?:;|Equal;|SlantEqual;)|R(?:everseElement;|ightTriangle(?:;|Bar;|Equal;))|S(?:quareSu(?:bset(?:;|Equal;)|perset(?:;|Equal;))|u(?:bset(?:;|Equal;)|cceeds(?:;|Equal;|SlantEqual;|Tilde;)|perset(?:;|Equal;)))|Tilde(?:;|Equal;|FullEqual;|Tilde;)|VerticalBar;))|scr;|tilde;?|u;)|O(?:Elig;|acute;?|c(?:irc;?|y;)|dblac;|fr;|grave;?|m(?:acr;|ega;|icron;)|opf;|penCurly(?:DoubleQuote;|Quote;)|r;|s(?:cr;|lash;?)|ti(?:lde;?|mes;)|uml;?|ver(?:B(?:ar;|rac(?:e;|ket;))|Parenthesis;))|P(?:artialD;|cy;|fr;|hi;|i;|lusMinus;|o(?:incareplane;|pf;)|r(?:;|ecedes(?:;|Equal;|SlantEqual;|Tilde;)|ime;|o(?:duct;|portion(?:;|al;)))|s(?:cr;|i;))|Q(?:UOT;?|fr;|opf;|scr;)|R(?:Barr;|EG;?|a(?:cute;|ng;|rr(?:;|tl;))|c(?:aron;|edil;|y;)|e(?:;|verse(?:E(?:lement;|quilibrium;)|UpEquilibrium;))|fr;|ho;|ight(?:A(?:ngleBracket;|rrow(?:;|Bar;|LeftArrow;))|Ceiling;|Do(?:ubleBracket;|wn(?:TeeVector;|Vector(?:;|Bar;)))|Floor;|T(?:ee(?:;|Arrow;|Vector;)|riangle(?:;|Bar;|Equal;))|Up(?:DownVector;|TeeVector;|Vector(?:;|Bar;))|Vector(?:;|Bar;)|arrow;)|o(?:pf;|undImplies;)|rightarrow;|s(?:cr;|h;)|uleDelayed;)|S(?:H(?:CHcy;|cy;)|OFTcy;|acute;|c(?:;|aron;|edil;|irc;|y;)|fr;|hort(?:DownArrow;|LeftArrow;|RightArrow;|UpArrow;)|igma;|mallCircle;|opf;|q(?:rt;|uare(?:;|Intersection;|Su(?:bset(?:;|Equal;)|perset(?:;|Equal;))|Union;))|scr;|tar;|u(?:b(?:;|set(?:;|Equal;))|c(?:ceeds(?:;|Equal;|SlantEqual;|Tilde;)|hThat;)|m;|p(?:;|erset(?:;|Equal;)|set;)))|T(?:HORN;?|RADE;|S(?:Hcy;|cy;)|a(?:b;|u;)|c(?:aron;|edil;|y;)|fr;|h(?:e(?:refore;|ta;)|i(?:ckSpace;|nSpace;))|ilde(?:;|Equal;|FullEqual;|Tilde;)|opf;|ripleDot;|s(?:cr;|trok;))|U(?:a(?:cute;?|rr(?:;|ocir;))|br(?:cy;|eve;)|c(?:irc;?|y;)|dblac;|fr;|grave;?|macr;|n(?:der(?:B(?:ar;|rac(?:e;|ket;))|Parenthesis;)|ion(?:;|Plus;))|o(?:gon;|pf;)|p(?:Arrow(?:;|Bar;|DownArrow;)|DownArrow;|Equilibrium;|Tee(?:;|Arrow;)|arrow;|downarrow;|per(?:LeftArrow;|RightArrow;)|si(?:;|lon;))|ring;|scr;|tilde;|uml;?)|V(?:Dash;|bar;|cy;|dash(?:;|l;)|e(?:e;|r(?:bar;|t(?:;|ical(?:Bar;|Line;|Separator;|Tilde;))|yThinSpace;))|fr;|opf;|scr;|vdash;)|W(?:circ;|edge;|fr;|opf;|scr;)|X(?:fr;|i;|opf;|scr;)|Y(?:Acy;|Icy;|Ucy;|acute;?|c(?:irc;|y;)|fr;|opf;|scr;|uml;)|Z(?:Hcy;|acute;|c(?:aron;|y;)|dot;|e(?:roWidthSpace;|ta;)|fr;|opf;|scr;)|a(?:acute;?|breve;|c(?:;|E;|d;|irc;?|ute;?|y;)|elig;?|f(?:;|r;)|grave;?|l(?:e(?:fsym;|ph;)|pha;)|m(?:a(?:cr;|lg;)|p;?)|n(?:d(?:;|and;|d;|slope;|v;)|g(?:;|e;|le;|msd(?:;|a(?:a;|b;|c;|d;|e;|f;|g;|h;))|rt(?:;|vb(?:;|d;))|s(?:ph;|t;)|zarr;))|o(?:gon;|pf;)|p(?:;|E;|acir;|e;|id;|os;|prox(?:;|eq;))|ring;?|s(?:cr;|t;|ymp(?:;|eq;))|tilde;?|uml;?|w(?:conint;|int;))|b(?:Not;|a(?:ck(?:cong;|epsilon;|prime;|sim(?:;|eq;))|r(?:vee;|wed(?:;|ge;)))|brk(?:;|tbrk;)|c(?:ong;|y;)|dquo;|e(?:caus(?:;|e;)|mptyv;|psi;|rnou;|t(?:a;|h;|ween;))|fr;|ig(?:c(?:ap;|irc;|up;)|o(?:dot;|plus;|times;)|s(?:qcup;|tar;)|triangle(?:down;|up;)|uplus;|vee;|wedge;)|karow;|l(?:a(?:ck(?:lozenge;|square;|triangle(?:;|down;|left;|right;))|nk;)|k(?:1(?:2;|4;)|34;)|ock;)|n(?:e(?:;|quiv;)|ot;)|o(?:pf;|t(?:;|tom;)|wtie;|x(?:D(?:L;|R;|l;|r;)|H(?:;|D;|U;|d;|u;)|U(?:L;|R;|l;|r;)|V(?:;|H;|L;|R;|h;|l;|r;)|box;|d(?:L;|R;|l;|r;)|h(?:;|D;|U;|d;|u;)|minus;|plus;|times;|u(?:L;|R;|l;|r;)|v(?:;|H;|L;|R;|h;|l;|r;)))|prime;|r(?:eve;|vbar;?)|s(?:cr;|emi;|im(?:;|e;)|ol(?:;|b;|hsub;))|u(?:ll(?:;|et;)|mp(?:;|E;|e(?:;|q;))))|c(?:a(?:cute;|p(?:;|and;|brcup;|c(?:ap;|up;)|dot;|s;)|r(?:et;|on;))|c(?:a(?:ps;|ron;)|edil;?|irc;|ups(?:;|sm;))|dot;|e(?:dil;?|mptyv;|nt(?:;|erdot;|))|fr;|h(?:cy;|eck(?:;|mark;)|i;)|ir(?:;|E;|c(?:;|eq;|le(?:arrow(?:left;|right;)|d(?:R;|S;|ast;|circ;|dash;)))|e;|fnint;|mid;|scir;)|lubs(?:;|uit;)|o(?:lon(?:;|e(?:;|q;))|m(?:ma(?:;|t;)|p(?:;|fn;|le(?:ment;|xes;)))|n(?:g(?:;|dot;)|int;)|p(?:f;|rod;|y(?:;|sr;|)))|r(?:arr;|oss;)|s(?:cr;|u(?:b(?:;|e;)|p(?:;|e;)))|tdot;|u(?:darr(?:l;|r;)|e(?:pr;|sc;)|larr(?:;|p;)|p(?:;|brcap;|c(?:ap;|up;)|dot;|or;|s;)|r(?:arr(?:;|m;)|ly(?:eq(?:prec;|succ;)|vee;|wedge;)|ren;?|vearrow(?:left;|right;))|vee;|wed;)|w(?:conint;|int;)|ylcty;)|d(?:Arr;|Har;|a(?:gger;|leth;|rr;|sh(?:;|v;))|b(?:karow;|lac;)|c(?:aron;|y;)|d(?:;|a(?:gger;|rr;)|otseq;)|e(?:g;?|lta;|mptyv;)|f(?:isht;|r;)|har(?:l;|r;)|i(?:am(?:;|ond(?:;|suit;)|s;)|e;|gamma;|sin;|v(?:;|ide(?:;|ontimes;|)|onx;))|jcy;|lc(?:orn;|rop;)|o(?:llar;|pf;|t(?:;|eq(?:;|dot;)|minus;|plus;|square;)|ublebarwedge;|wn(?:arrow;|downarrows;|harpoon(?:left;|right;)))|r(?:bkarow;|c(?:orn;|rop;))|s(?:c(?:r;|y;)|ol;|trok;)|t(?:dot;|ri(?:;|f;))|u(?:arr;|har;)|wangle;|z(?:cy;|igrarr;))|e(?:D(?:Dot;|ot;)|a(?:cute;?|ster;)|c(?:aron;|ir(?:;|c;?)|olon;|y;)|dot;|e;|f(?:Dot;|r;)|g(?:;|rave;?|s(?:;|dot;))|l(?:;|inters;|l;|s(?:;|dot;))|m(?:acr;|pty(?:;|set;|v;)|sp(?:1(?:3;|4;)|;))|n(?:g;|sp;)|o(?:gon;|pf;)|p(?:ar(?:;|sl;)|lus;|si(?:;|lon;|v;))|q(?:c(?:irc;|olon;)|s(?:im;|lant(?:gtr;|less;))|u(?:als;|est;|iv(?:;|DD;))|vparsl;)|r(?:Dot;|arr;)|s(?:cr;|dot;|im;)|t(?:a;|h;?)|u(?:ml;?|ro;)|x(?:cl;|ist;|p(?:ectation;|onentiale;)))|f(?:allingdotseq;|cy;|emale;|f(?:ilig;|l(?:ig;|lig;)|r;)|ilig;|jlig;|l(?:at;|lig;|tns;)|nof;|o(?:pf;|r(?:all;|k(?:;|v;)))|partint;|r(?:a(?:c(?:1(?:2;?|3;|4;?|5;|6;|8;)|2(?:3;|5;)|3(?:4;?|5;|8;)|45;|5(?:6;|8;)|78;)|sl;)|own;)|scr;)|g(?:E(?:;|l;)|a(?:cute;|mma(?:;|d;)|p;)|breve;|c(?:irc;|y;)|dot;|e(?:;|l;|q(?:;|q;|slant;)|s(?:;|cc;|dot(?:;|o(?:;|l;))|l(?:;|es;)))|fr;|g(?:;|g;)|imel;|jcy;|l(?:;|E;|a;|j;)|n(?:E;|ap(?:;|prox;)|e(?:;|q(?:;|q;))|sim;)|opf;|rave;|s(?:cr;|im(?:;|e;|l;))|t(?:;|c(?:c;|ir;)|dot;|lPar;|quest;|r(?:a(?:pprox;|rr;)|dot;|eq(?:less;|qless;)|less;|sim;)|)|v(?:ertneqq;|nE;))|h(?:Arr;|a(?:irsp;|lf;|milt;|r(?:dcy;|r(?:;|cir;|w;)))|bar;|circ;|e(?:arts(?:;|uit;)|llip;|rcon;)|fr;|ks(?:earow;|warow;)|o(?:arr;|mtht;|ok(?:leftarrow;|rightarrow;)|pf;|rbar;)|s(?:cr;|lash;|trok;)|y(?:bull;|phen;))|i(?:acute;?|c(?:;|irc;?|y;)|e(?:cy;|xcl;?)|f(?:f;|r;)|grave;?|i(?:;|i(?:int;|nt;)|nfin;|ota;)|jlig;|m(?:a(?:cr;|g(?:e;|line;|part;)|th;)|of;|ped;)|n(?:;|care;|fin(?:;|tie;)|odot;|t(?:;|cal;|e(?:gers;|rcal;)|larhk;|prod;))|o(?:cy;|gon;|pf;|ta;)|prod;|quest;?|s(?:cr;|in(?:;|E;|dot;|s(?:;|v;)|v;))|t(?:;|ilde;)|u(?:kcy;|ml;?))|j(?:c(?:irc;|y;)|fr;|math;|opf;|s(?:cr;|ercy;)|ukcy;)|k(?:appa(?:;|v;)|c(?:edil;|y;)|fr;|green;|hcy;|jcy;|opf;|scr;)|l(?:A(?:arr;|rr;|tail;)|Barr;|E(?:;|g;)|Har;|a(?:cute;|emptyv;|gran;|mbda;|ng(?:;|d;|le;)|p;|quo;?|rr(?:;|b(?:;|fs;)|fs;|hk;|lp;|pl;|sim;|tl;)|t(?:;|ail;|e(?:;|s;)))|b(?:arr;|brk;|r(?:ac(?:e;|k;)|k(?:e;|sl(?:d;|u;))))|c(?:aron;|e(?:dil;|il;)|ub;|y;)|d(?:ca;|quo(?:;|r;)|r(?:dhar;|ushar;)|sh;)|e(?:;|ft(?:arrow(?:;|tail;)|harpoon(?:down;|up;)|leftarrows;|right(?:arrow(?:;|s;)|harpoons;|squigarrow;)|threetimes;)|g;|q(?:;|q;|slant;)|s(?:;|cc;|dot(?:;|o(?:;|r;))|g(?:;|es;)|s(?:approx;|dot;|eq(?:gtr;|qgtr;)|gtr;|sim;)))|f(?:isht;|loor;|r;)|g(?:;|E;)|h(?:ar(?:d;|u(?:;|l;))|blk;)|jcy;|l(?:;|arr;|corner;|hard;|tri;)|m(?:idot;|oust(?:;|ache;))|n(?:E;|ap(?:;|prox;)|e(?:;|q(?:;|q;))|sim;)|o(?:a(?:ng;|rr;)|brk;|ng(?:left(?:arrow;|rightarrow;)|mapsto;|rightarrow;)|oparrow(?:left;|right;)|p(?:ar;|f;|lus;)|times;|w(?:ast;|bar;)|z(?:;|enge;|f;))|par(?:;|lt;)|r(?:arr;|corner;|har(?:;|d;)|m;|tri;)|s(?:aquo;|cr;|h;|im(?:;|e;|g;)|q(?:b;|uo(?:;|r;))|trok;)|t(?:;|c(?:c;|ir;)|dot;|hree;|imes;|larr;|quest;|r(?:Par;|i(?:;|e;|f;))|)|ur(?:dshar;|uhar;)|v(?:ertneqq;|nE;))|m(?:DDot;|a(?:cr;?|l(?:e;|t(?:;|ese;))|p(?:;|sto(?:;|down;|left;|up;))|rker;)|c(?:omma;|y;)|dash;|easuredangle;|fr;|ho;|i(?:cro;?|d(?:;|ast;|cir;|dot;?)|nus(?:;|b;|d(?:;|u;)))|l(?:cp;|dr;)|nplus;|o(?:dels;|pf;)|p;|s(?:cr;|tpos;)|u(?:;|ltimap;|map;))|n(?:G(?:g;|t(?:;|v;))|L(?:eft(?:arrow;|rightarrow;)|l;|t(?:;|v;))|Rightarrow;|V(?:Dash;|dash;)|a(?:bla;|cute;|ng;|p(?:;|E;|id;|os;|prox;)|tur(?:;|al(?:;|s;)))|b(?:sp;?|ump(?:;|e;))|c(?:a(?:p;|ron;)|edil;|ong(?:;|dot;)|up;|y;)|dash;|e(?:;|Arr;|ar(?:hk;|r(?:;|ow;))|dot;|quiv;|s(?:ear;|im;)|xist(?:;|s;))|fr;|g(?:E;|e(?:;|q(?:;|q;|slant;)|s;)|sim;|t(?:;|r;))|h(?:Arr;|arr;|par;)|i(?:;|s(?:;|d;)|v;)|jcy;|l(?:Arr;|E;|arr;|dr;|e(?:;|ft(?:arrow;|rightarrow;)|q(?:;|q;|slant;)|s(?:;|s;))|sim;|t(?:;|ri(?:;|e;)))|mid;|o(?:pf;|t(?:;|in(?:;|E;|dot;|v(?:a;|b;|c;))|ni(?:;|v(?:a;|b;|c;))|))|p(?:ar(?:;|allel;|sl;|t;)|olint;|r(?:;|cue;|e(?:;|c(?:;|eq;))))|r(?:Arr;|arr(?:;|c;|w;)|ightarrow;|tri(?:;|e;))|s(?:c(?:;|cue;|e;|r;)|hort(?:mid;|parallel;)|im(?:;|e(?:;|q;))|mid;|par;|qsu(?:be;|pe;)|u(?:b(?:;|E;|e;|set(?:;|eq(?:;|q;)))|cc(?:;|eq;)|p(?:;|E;|e;|set(?:;|eq(?:;|q;)))))|t(?:gl;|ilde;?|lg;|riangle(?:left(?:;|eq;)|right(?:;|eq;)))|u(?:;|m(?:;|ero;|sp;))|v(?:Dash;|Harr;|ap;|dash;|g(?:e;|t;)|infin;|l(?:Arr;|e;|t(?:;|rie;))|r(?:Arr;|trie;)|sim;)|w(?:Arr;|ar(?:hk;|r(?:;|ow;))|near;))|o(?:S;|a(?:cute;?|st;)|c(?:ir(?:;|c;?)|y;)|d(?:ash;|blac;|iv;|ot;|sold;)|elig;|f(?:cir;|r;)|g(?:on;|rave;?|t;)|h(?:bar;|m;)|int;|l(?:arr;|c(?:ir;|ross;)|ine;|t;)|m(?:acr;|ega;|i(?:cron;|d;|nus;))|opf;|p(?:ar;|erp;|lus;)|r(?:;|arr;|d(?:;|er(?:;|of;)|f;?|m;?)|igof;|or;|slope;|v;)|s(?:cr;|lash;?|ol;)|ti(?:lde;?|mes(?:;|as;))|uml;?|vbar;)|p(?:ar(?:;|a(?:;|llel;|)|s(?:im;|l;)|t;)|cy;|er(?:cnt;|iod;|mil;|p;|tenk;)|fr;|h(?:i(?:;|v;)|mmat;|one;)|i(?:;|tchfork;|v;)|l(?:an(?:ck(?:;|h;)|kv;)|us(?:;|acir;|b;|cir;|d(?:o;|u;)|e;|mn;?|sim;|two;))|m;|o(?:intint;|pf;|und;?)|r(?:;|E;|ap;|cue;|e(?:;|c(?:;|approx;|curlyeq;|eq;|n(?:approx;|eqq;|sim;)|sim;))|ime(?:;|s;)|n(?:E;|ap;|sim;)|o(?:d;|f(?:alar;|line;|surf;)|p(?:;|to;))|sim;|urel;)|s(?:cr;|i;)|uncsp;)|q(?:fr;|int;|opf;|prime;|scr;|u(?:at(?:ernions;|int;)|est(?:;|eq;)|ot;?))|r(?:A(?:arr;|rr;|tail;)|Barr;|Har;|a(?:c(?:e;|ute;)|dic;|emptyv;|ng(?:;|d;|e;|le;)|quo;?|rr(?:;|ap;|b(?:;|fs;)|c;|fs;|hk;|lp;|pl;|sim;|tl;|w;)|t(?:ail;|io(?:;|nals;)))|b(?:arr;|brk;|r(?:ac(?:e;|k;)|k(?:e;|sl(?:d;|u;))))|c(?:aron;|e(?:dil;|il;)|ub;|y;)|d(?:ca;|ldhar;|quo(?:;|r;)|sh;)|e(?:al(?:;|ine;|part;|s;)|ct;|g;?)|f(?:isht;|loor;|r;)|h(?:ar(?:d;|u(?:;|l;))|o(?:;|v;))|i(?:ght(?:arrow(?:;|tail;)|harpoon(?:down;|up;)|left(?:arrows;|harpoons;)|rightarrows;|squigarrow;|threetimes;)|ng;|singdotseq;)|l(?:arr;|har;|m;)|moust(?:;|ache;)|nmid;|o(?:a(?:ng;|rr;)|brk;|p(?:ar;|f;|lus;)|times;)|p(?:ar(?:;|gt;)|polint;)|rarr;|s(?:aquo;|cr;|h;|q(?:b;|uo(?:;|r;)))|t(?:hree;|imes;|ri(?:;|e;|f;|ltri;))|uluhar;|x;)|s(?:acute;|bquo;|c(?:;|E;|a(?:p;|ron;)|cue;|e(?:;|dil;)|irc;|n(?:E;|ap;|sim;)|polint;|sim;|y;)|dot(?:;|b;|e;)|e(?:Arr;|ar(?:hk;|r(?:;|ow;))|ct;?|mi;|swar;|tm(?:inus;|n;)|xt;)|fr(?:;|own;)|h(?:arp;|c(?:hcy;|y;)|ort(?:mid;|parallel;)|y;?)|i(?:gma(?:;|f;|v;)|m(?:;|dot;|e(?:;|q;)|g(?:;|E;)|l(?:;|E;)|ne;|plus;|rarr;))|larr;|m(?:a(?:llsetminus;|shp;)|eparsl;|i(?:d;|le;)|t(?:;|e(?:;|s;)))|o(?:ftcy;|l(?:;|b(?:;|ar;))|pf;)|pa(?:des(?:;|uit;)|r;)|q(?:c(?:ap(?:;|s;)|up(?:;|s;))|su(?:b(?:;|e;|set(?:;|eq;))|p(?:;|e;|set(?:;|eq;)))|u(?:;|ar(?:e;|f;)|f;))|rarr;|s(?:cr;|etmn;|mile;|tarf;)|t(?:ar(?:;|f;)|r(?:aight(?:epsilon;|phi;)|ns;))|u(?:b(?:;|E;|dot;|e(?:;|dot;)|mult;|n(?:E;|e;)|plus;|rarr;|s(?:et(?:;|eq(?:;|q;)|neq(?:;|q;))|im;|u(?:b;|p;)))|cc(?:;|approx;|curlyeq;|eq;|n(?:approx;|eqq;|sim;)|sim;)|m;|ng;|p(?:1;?|2;?|3;?|;|E;|d(?:ot;|sub;)|e(?:;|dot;)|hs(?:ol;|ub;)|larr;|mult;|n(?:E;|e;)|plus;|s(?:et(?:;|eq(?:;|q;)|neq(?:;|q;))|im;|u(?:b;|p;))))|w(?:Arr;|ar(?:hk;|r(?:;|ow;))|nwar;)|zlig;?)|t(?:a(?:rget;|u;)|brk;|c(?:aron;|edil;|y;)|dot;|elrec;|fr;|h(?:e(?:re(?:4;|fore;)|ta(?:;|sym;|v;))|i(?:ck(?:approx;|sim;)|nsp;)|k(?:ap;|sim;)|orn;?)|i(?:lde;|mes(?:;|b(?:;|ar;)|d;|)|nt;)|o(?:ea;|p(?:;|bot;|cir;|f(?:;|ork;))|sa;)|prime;|r(?:ade;|i(?:angle(?:;|down;|left(?:;|eq;)|q;|right(?:;|eq;))|dot;|e;|minus;|plus;|sb;|time;)|pezium;)|s(?:c(?:r;|y;)|hcy;|trok;)|w(?:ixt;|ohead(?:leftarrow;|rightarrow;)))|u(?:Arr;|Har;|a(?:cute;?|rr;)|br(?:cy;|eve;)|c(?:irc;?|y;)|d(?:arr;|blac;|har;)|f(?:isht;|r;)|grave;?|h(?:ar(?:l;|r;)|blk;)|l(?:c(?:orn(?:;|er;)|rop;)|tri;)|m(?:acr;|l;?)|o(?:gon;|pf;)|p(?:arrow;|downarrow;|harpoon(?:left;|right;)|lus;|si(?:;|h;|lon;)|uparrows;)|r(?:c(?:orn(?:;|er;)|rop;)|ing;|tri;)|scr;|t(?:dot;|ilde;|ri(?:;|f;))|u(?:arr;|ml;?)|wangle;)|v(?:Arr;|Bar(?:;|v;)|Dash;|a(?:ngrt;|r(?:epsilon;|kappa;|nothing;|p(?:hi;|i;|ropto;)|r(?:;|ho;)|s(?:igma;|u(?:bsetneq(?:;|q;)|psetneq(?:;|q;)))|t(?:heta;|riangle(?:left;|right;))))|cy;|dash;|e(?:e(?:;|bar;|eq;)|llip;|r(?:bar;|t;))|fr;|ltri;|nsu(?:b;|p;)|opf;|prop;|rtri;|s(?:cr;|u(?:bn(?:E;|e;)|pn(?:E;|e;)))|zigzag;)|w(?:circ;|e(?:d(?:bar;|ge(?:;|q;))|ierp;)|fr;|opf;|p;|r(?:;|eath;)|scr;)|x(?:c(?:ap;|irc;|up;)|dtri;|fr;|h(?:Arr;|arr;)|i;|l(?:Arr;|arr;)|map;|nis;|o(?:dot;|p(?:f;|lus;)|time;)|r(?:Arr;|arr;)|s(?:cr;|qcup;)|u(?:plus;|tri;)|vee;|wedge;)|y(?:ac(?:ute;?|y;)|c(?:irc;|y;)|en;?|fr;|icy;|opf;|scr;|u(?:cy;|ml;?))|z(?:acute;|c(?:aron;|y;)|dot;|e(?:etrf;|ta;)|fr;|hcy;|igrarr;|opf;|scr;|w(?:j;|nj;)))|[\s\S]/g,
        bt = 32,
        X = /[^\r"&\u0000]+/g,
        z = /[^\r'&\u0000]+/g,
        O = /[^\r\t\n\f &>\u0000]+/g,
        W = /[^\r\t\n\f \/>A-Z\u0000]+/g,
        ce = /[^\r\t\n\f \/=>A-Z\u0000]+/g,
        he = /[^\]\r\u0000\uffff]*/g,
        ie = /[^&<\r\u0000\uffff]*/g,
        me = /[^<\r\u0000\uffff]*/g,
        be = /[^\r\u0000\uffff]*/g,
        _e = /(?:(\/)?([a-z]+)>)|[\s\S]/g,
        Ae =
          /(?:([-a-z]+)[ \t\n\f]*=[ \t\n\f]*('[^'&\r\u0000]*'|"[^"&\r\u0000]*"|[^\t\n\r\f "&'\u0000>][^&> \t\n\r\f\u0000]*[ \t\n\f]))|[\s\S]/g,
        Se = /[^\x09\x0A\x0C\x0D\x20]/,
        Ke = /[^\x09\x0A\x0C\x0D\x20]/g,
        Xe = /[^\x00\x09\x0A\x0C\x0D\x20]/,
        ze = /^[\x09\x0A\x0C\x0D\x20]+/,
        Et = /\x00/g;
      function Ue(U) {
        var V = 16384;
        if (U.length < V) return String.fromCharCode.apply(String, U);
        for (var oe = "", ee = 0; ee < U.length; ee += V)
          oe += String.fromCharCode.apply(String, U.slice(ee, ee + V));
        return oe;
      }
      function rn(U) {
        for (var V = [], oe = 0; oe < U.length; oe++) V[oe] = U.charCodeAt(oe);
        return V;
      }
      function Ne(U, V) {
        if (typeof V == "string")
          return U.namespaceURI === a.HTML && U.localName === V;
        var oe = V[U.namespaceURI];
        return oe && oe[U.localName];
      }
      function ir(U) {
        return Ne(U, C);
      }
      function ut(U) {
        if (Ne(U, j)) return !0;
        if (U.namespaceURI === a.MATHML && U.localName === "annotation-xml") {
          var V = U.getAttribute("encoding");
          if (
            (V && (V = V.toLowerCase()),
            V === "text/html" || V === "application/xhtml+xml")
          )
            return !0;
        }
        return !1;
      }
      function vr(U) {
        return U in A ? A[U] : U;
      }
      function Pt(U) {
        for (var V = 0, oe = U.length; V < oe; V++)
          U[V][0] in S && (U[V][0] = S[U[V][0]]);
      }
      function sr(U) {
        for (var V = 0, oe = U.length; V < oe; V++)
          if (U[V][0] === "definitionurl") {
            U[V][0] = "definitionURL";
            break;
          }
      }
      function Kt(U) {
        for (var V = 0, oe = U.length; V < oe; V++)
          U[V][0] in re && U[V].push(re[U[V][0]]);
      }
      function vt(U, V) {
        for (var oe = 0, ee = U.length; oe < ee; oe++) {
          var Ie = U[oe][0],
            te = U[oe][1];
          V.hasAttribute(Ie) || V._setAttribute(Ie, te);
        }
      }
      (de.ElementStack = function () {
        (this.elements = []), (this.top = null);
      }),
        (de.ElementStack.prototype.push = function (U) {
          this.elements.push(U), (this.top = U);
        }),
        (de.ElementStack.prototype.pop = function (U) {
          this.elements.pop(),
            (this.top = this.elements[this.elements.length - 1]);
        }),
        (de.ElementStack.prototype.popTag = function (U) {
          for (var V = this.elements.length - 1; V > 0; V--) {
            var oe = this.elements[V];
            if (Ne(oe, U)) break;
          }
          (this.elements.length = V), (this.top = this.elements[V - 1]);
        }),
        (de.ElementStack.prototype.popElementType = function (U) {
          for (
            var V = this.elements.length - 1;
            V > 0 && !(this.elements[V] instanceof U);
            V--
          );
          (this.elements.length = V), (this.top = this.elements[V - 1]);
        }),
        (de.ElementStack.prototype.popElement = function (U) {
          for (
            var V = this.elements.length - 1;
            V > 0 && this.elements[V] !== U;
            V--
          );
          (this.elements.length = V), (this.top = this.elements[V - 1]);
        }),
        (de.ElementStack.prototype.removeElement = function (U) {
          if (this.top === U) this.pop();
          else {
            var V = this.elements.lastIndexOf(U);
            V !== -1 && this.elements.splice(V, 1);
          }
        }),
        (de.ElementStack.prototype.clearToContext = function (U) {
          for (
            var V = this.elements.length - 1;
            V > 0 && !Ne(this.elements[V], U);
            V--
          );
          (this.elements.length = V + 1), (this.top = this.elements[V]);
        }),
        (de.ElementStack.prototype.contains = function (U) {
          return this.inSpecificScope(U, Object.create(null));
        }),
        (de.ElementStack.prototype.inSpecificScope = function (U, V) {
          for (var oe = this.elements.length - 1; oe >= 0; oe--) {
            var ee = this.elements[oe];
            if (Ne(ee, U)) return !0;
            if (Ne(ee, V)) return !1;
          }
          return !1;
        }),
        (de.ElementStack.prototype.elementInSpecificScope = function (U, V) {
          for (var oe = this.elements.length - 1; oe >= 0; oe--) {
            var ee = this.elements[oe];
            if (ee === U) return !0;
            if (Ne(ee, V)) return !1;
          }
          return !1;
        }),
        (de.ElementStack.prototype.elementTypeInSpecificScope = function (
          U,
          V
        ) {
          for (var oe = this.elements.length - 1; oe >= 0; oe--) {
            var ee = this.elements[oe];
            if (ee instanceof U) return !0;
            if (Ne(ee, V)) return !1;
          }
          return !1;
        }),
        (de.ElementStack.prototype.inScope = function (U) {
          return this.inSpecificScope(U, o);
        }),
        (de.ElementStack.prototype.elementInScope = function (U) {
          return this.elementInSpecificScope(U, o);
        }),
        (de.ElementStack.prototype.elementTypeInScope = function (U) {
          return this.elementTypeInSpecificScope(U, o);
        }),
        (de.ElementStack.prototype.inButtonScope = function (U) {
          return this.inSpecificScope(U, p);
        }),
        (de.ElementStack.prototype.inListItemScope = function (U) {
          return this.inSpecificScope(U, n);
        }),
        (de.ElementStack.prototype.inTableScope = function (U) {
          return this.inSpecificScope(U, d);
        }),
        (de.ElementStack.prototype.inSelectScope = function (U) {
          for (var V = this.elements.length - 1; V >= 0; V--) {
            var oe = this.elements[V];
            if (oe.namespaceURI !== a.HTML) return !1;
            var ee = oe.localName;
            if (ee === U) return !0;
            if (ee !== "optgroup" && ee !== "option") return !1;
          }
          return !1;
        }),
        (de.ElementStack.prototype.generateImpliedEndTags = function (U, V) {
          for (
            var oe = V ? G : Y, ee = this.elements.length - 1;
            ee >= 0;
            ee--
          ) {
            var Ie = this.elements[ee];
            if ((U && Ne(Ie, U)) || !Ne(this.elements[ee], oe)) break;
          }
          (this.elements.length = ee + 1), (this.top = this.elements[ee]);
        }),
        (de.ActiveFormattingElements = function () {
          (this.list = []), (this.attrs = []);
        }),
        (de.ActiveFormattingElements.prototype.MARKER = { localName: "|" }),
        (de.ActiveFormattingElements.prototype.insertMarker = function () {
          this.list.push(this.MARKER), this.attrs.push(this.MARKER);
        }),
        (de.ActiveFormattingElements.prototype.push = function (U, V) {
          for (
            var oe = 0, ee = this.list.length - 1;
            ee >= 0 && this.list[ee] !== this.MARKER;
            ee--
          )
            if (Bt(U, this.list[ee], this.attrs[ee]) && (oe++, oe === 3)) {
              this.list.splice(ee, 1), this.attrs.splice(ee, 1);
              break;
            }
          this.list.push(U);
          for (var Ie = [], te = 0; te < V.length; te++) Ie[te] = V[te];
          this.attrs.push(Ie);
          function Bt(Tt, Ut, ft) {
            if (Tt.localName !== Ut.localName || Tt._numattrs !== ft.length)
              return !1;
            for (var Ze = 0, Tr = ft.length; Ze < Tr; Ze++) {
              var Ft = ft[Ze][0],
                M = ft[Ze][1];
              if (!Tt.hasAttribute(Ft) || Tt.getAttribute(Ft) !== M) return !1;
            }
            return !0;
          }
        }),
        (de.ActiveFormattingElements.prototype.clearToMarker = function () {
          for (
            var U = this.list.length - 1;
            U >= 0 && this.list[U] !== this.MARKER;
            U--
          );
          U < 0 && (U = 0), (this.list.length = U), (this.attrs.length = U);
        }),
        (de.ActiveFormattingElements.prototype.findElementByTag = function (U) {
          for (var V = this.list.length - 1; V >= 0; V--) {
            var oe = this.list[V];
            if (oe === this.MARKER) break;
            if (oe.localName === U) return oe;
          }
          return null;
        }),
        (de.ActiveFormattingElements.prototype.indexOf = function (U) {
          return this.list.lastIndexOf(U);
        }),
        (de.ActiveFormattingElements.prototype.remove = function (U) {
          var V = this.list.lastIndexOf(U);
          V !== -1 && (this.list.splice(V, 1), this.attrs.splice(V, 1));
        }),
        (de.ActiveFormattingElements.prototype.replace = function (U, V, oe) {
          var ee = this.list.lastIndexOf(U);
          ee !== -1 && ((this.list[ee] = V), (this.attrs[ee] = oe));
        }),
        (de.ActiveFormattingElements.prototype.insertAfter = function (U, V) {
          var oe = this.list.lastIndexOf(U);
          oe !== -1 &&
            (this.list.splice(oe, 0, V), this.attrs.splice(oe, 0, V));
        });
      function de(U, V, oe) {
        var ee = null,
          Ie = 0,
          te = 0,
          Bt = !1,
          Tt = !1,
          Ut = 0,
          ft = [],
          Ze = "",
          Tr = !0,
          Ft = 0,
          M = Te,
          yt,
          Oe,
          Ce = "",
          yr = "",
          De = [],
          $e = "",
          We = "",
          xe = [],
          Nt = [],
          wt = [],
          St = [],
          tt = [],
          Nr = !1,
          F = Ri,
          ht = null,
          dt = [],
          L = new de.ElementStack(),
          ve = new de.ActiveFormattingElements(),
          jt = V !== void 0,
          wr = null,
          pt = null,
          Sr = !0;
        V && (Sr = V.ownerDocument._scripting_enabled),
          oe && oe.scripting_enabled === !1 && (Sr = !1);
        var He = !0,
          nn = !1,
          kr,
          an,
          $ = [],
          kt = !1,
          Vt = !1,
          Lr = {
            document: function () {
              return we;
            },
            _asDocumentFragment: function () {
              for (
                var e = we.createDocumentFragment(), r = we.firstChild;
                r.hasChildNodes();

              )
                e.appendChild(r.firstChild);
              return e;
            },
            pause: function () {
              Ft++;
            },
            resume: function () {
              Ft--, this.parse("");
            },
            parse: function (e, r, N) {
              var x;
              return Ft > 0
                ? ((Ze += e), !0)
                : (Ut === 0
                    ? (Ze && ((e = Ze + e), (Ze = "")),
                      r && ((e += "\uFFFF"), (Bt = !0)),
                      (ee = e),
                      (Ie = e.length),
                      (te = 0),
                      Tr && ((Tr = !1), ee.charCodeAt(0) === 65279 && (te = 1)),
                      Ut++,
                      (x = qn(N)),
                      (Ze = ee.substring(te, Ie)),
                      Ut--)
                    : (Ut++,
                      ft.push(ee, Ie, te),
                      (ee = e),
                      (Ie = e.length),
                      (te = 0),
                      qn(),
                      (x = !1),
                      (Ze = ee.substring(te, Ie)),
                      (te = ft.pop()),
                      (Ie = ft.pop()),
                      (ee = ft.pop()),
                      Ze &&
                        ((ee = Ze + ee.substring(te)),
                        (Ie = ee.length),
                        (te = 0),
                        (Ze = "")),
                      Ut--),
                  x);
            },
          },
          we = new h(!0, U);
        if (((we._parser = Lr), (we._scripting_enabled = Sr), V)) {
          if (
            (V.ownerDocument._quirks && (we._quirks = !0),
            V.ownerDocument._limitedQuirks && (we._limitedQuirks = !0),
            V.namespaceURI === a.HTML)
          )
            switch (V.localName) {
              case "title":
              case "textarea":
                M = At;
                break;
              case "style":
              case "xmp":
              case "iframe":
              case "noembed":
              case "noframes":
              case "script":
              case "plaintext":
                M = un;
                break;
            }
          var Hn = we.createElement("html");
          we._appendChild(Hn),
            L.push(Hn),
            V instanceof l.HTMLTemplateElement && dt.push(vn),
            hr();
          for (var or = V; or !== null; or = or.parentElement)
            if (or instanceof l.HTMLFormElement) {
              pt = or;
              break;
            }
        }
        function qn(e) {
          for (var r, N, x, q; te < Ie; ) {
            if (Ft > 0 || (e && e())) return !0;
            switch (typeof M.lookahead) {
              case "undefined":
                if (((r = ee.charCodeAt(te++)), Tt && ((Tt = !1), r === 10))) {
                  te++;
                  continue;
                }
                switch (r) {
                  case 13:
                    te < Ie ? ee.charCodeAt(te) === 10 && te++ : (Tt = !0),
                      M(10);
                    break;
                  case 65535:
                    if (Bt && te === Ie) {
                      M(i);
                      break;
                    }
                  default:
                    M(r);
                    break;
                }
                break;
              case "number":
                r = ee.charCodeAt(te);
                var Q = M.lookahead,
                  fe = !0;
                if ((Q < 0 && ((fe = !1), (Q = -Q)), Q < Ie - te))
                  (N = fe ? ee.substring(te, te + Q) : null), (q = !1);
                else if (Bt)
                  (N = fe ? ee.substring(te, Ie) : null),
                    (q = !0),
                    r === 65535 && te === Ie - 1 && (r = i);
                else return !0;
                M(r, N, q);
                break;
              case "string":
                (r = ee.charCodeAt(te)), (x = M.lookahead);
                var ye = ee.indexOf(x, te);
                if (ye !== -1) (N = ee.substring(te, ye + x.length)), (q = !1);
                else {
                  if (!Bt) return !0;
                  (N = ee.substring(te, Ie)),
                    r === 65535 && te === Ie - 1 && (r = i),
                    (q = !0);
                }
                M(r, N, q);
                break;
            }
          }
          return !1;
        }
        function Lt(e, r) {
          for (var N = 0; N < tt.length; N++) if (tt[N][0] === e) return;
          r !== void 0 ? tt.push([e, r]) : tt.push([e]);
        }
        function Pa() {
          Ae.lastIndex = te - 1;
          var e = Ae.exec(ee);
          if (!e) throw new Error("should never happen");
          var r = e[1];
          if (!r) return !1;
          var N = e[2],
            x = N.length;
          switch (N[0]) {
            case '"':
            case "'":
              (N = N.substring(1, x - 1)), (te += e[0].length - 1), (M = pn);
              break;
            default:
              (M = ot), (te += e[0].length - 1), (N = N.substring(0, x - 1));
              break;
          }
          for (var q = 0; q < tt.length; q++) if (tt[q][0] === r) return !0;
          return tt.push([r, N]), !0;
        }
        function Ba() {
          (Nr = !1), (Ce = ""), (tt.length = 0);
        }
        function cr() {
          (Nr = !0), (Ce = ""), (tt.length = 0);
        }
        function mt() {
          De.length = 0;
        }
        function sn() {
          $e = "";
        }
        function on() {
          We = "";
        }
        function Pn() {
          xe.length = 0;
        }
        function Xt() {
          (Nt.length = 0), (wt = null), (St = null);
        }
        function Cr() {
          wt = [];
        }
        function Ct() {
          St = [];
        }
        function ke() {
          nn = !0;
        }
        function Ua() {
          return L.top && L.top.namespaceURI !== "http://www.w3.org/1999/xhtml";
        }
        function Ye(e) {
          return yr === e;
        }
        function Yt() {
          if ($.length > 0) {
            var e = Ue($);
            if (
              (($.length = 0),
              Vt &&
                ((Vt = !1),
                e[0] ===
                  `
` && (e = e.substring(1)),
                e.length === 0))
            )
              return;
            Pe(E, e), (kt = !1);
          }
          Vt = !1;
        }
        function lr(e) {
          e.lastIndex = te - 1;
          var r = e.exec(ee);
          if (r && r.index === te - 1)
            return (
              (r = r[0]),
              (te += r.length - 1),
              Bt && te === Ie && ((r = r.slice(0, -1)), te--),
              r
            );
          throw new Error("should never happen");
        }
        function ur(e) {
          e.lastIndex = te - 1;
          var r = e.exec(ee)[0];
          return r ? (Fa(r), (te += r.length - 1), !0) : !1;
        }
        function Fa(e) {
          $.length > 0 && Yt(),
            !(
              Vt &&
              ((Vt = !1),
              e[0] ===
                `
` && (e = e.substring(1)),
              e.length === 0)
            ) && Pe(E, e);
        }
        function gt() {
          if (Nr) Pe(w, Ce);
          else {
            var e = Ce;
            (Ce = ""), (yr = e), Pe(m, e, tt);
          }
        }
        function ja() {
          if (te === Ie) return !1;
          _e.lastIndex = te;
          var e = _e.exec(ee);
          if (!e) throw new Error("should never happen");
          var r = e[2];
          if (!r) return !1;
          var N = e[1];
          return (
            N
              ? ((te += r.length + 2), Pe(w, r))
              : ((te += r.length + 1), (yr = r), Pe(m, r, R)),
            !0
          );
        }
        function Va() {
          Nr ? Pe(w, Ce, null, !0) : Pe(m, Ce, tt, !0);
        }
        function Le() {
          Pe(H, Ue(Nt), wt ? Ue(wt) : void 0, St ? Ue(St) : void 0);
        }
        function Ee() {
          Yt(), F(i), (we.modclock = 1);
        }
        var Pe = (Lr.insertToken = function (r, N, x, q) {
          Yt();
          var Q = L.top;
          !Q || Q.namespaceURI === a.HTML
            ? F(r, N, x, q)
            : r !== m && r !== E
              ? ea(r, N, x, q)
              : (ir(Q) &&
                    (r === E ||
                      (r === m && N !== "mglyph" && N !== "malignmark"))) ||
                  (r === m &&
                    N === "svg" &&
                    Q.namespaceURI === a.MATHML &&
                    Q.localName === "annotation-xml") ||
                  ut(Q)
                ? ((an = !0), F(r, N, x, q), (an = !1))
                : ea(r, N, x, q);
        });
        function at(e) {
          var r = L.top;
          Dt && Ne(r, ne)
            ? Ar(function (N) {
                return N.createComment(e);
              })
            : (r instanceof l.HTMLTemplateElement && (r = r.content),
              r._appendChild(r.ownerDocument.createComment(e)));
        }
        function it(e) {
          var r = L.top;
          if (Dt && Ne(r, ne))
            Ar(function (x) {
              return x.createTextNode(e);
            });
          else {
            r instanceof l.HTMLTemplateElement && (r = r.content);
            var N = r.lastChild;
            N && N.nodeType === t.TEXT_NODE
              ? N.appendData(e)
              : r._appendChild(r.ownerDocument.createTextNode(e));
          }
        }
        function fr(e, r, N) {
          var x = c.createElement(e, r, null);
          if (N)
            for (var q = 0, Q = N.length; q < Q; q++)
              x._setAttribute(N[q][0], N[q][1]);
          return x;
        }
        var Dt = !1;
        function pe(e, r) {
          var N = Dr(function (x) {
            return fr(x, e, r);
          });
          return Ne(N, u) && (N._form = pt), N;
        }
        function Dr(e) {
          var r;
          return (
            Dt && Ne(L.top, ne)
              ? (r = Ar(e))
              : L.top instanceof l.HTMLTemplateElement
                ? ((r = e(L.top.content.ownerDocument)),
                  L.top.content._appendChild(r))
                : ((r = e(L.top.ownerDocument)), L.top._appendChild(r)),
            L.push(r),
            r
          );
        }
        function cn(e, r, N) {
          return Dr(function (x) {
            var q = x._createElementNS(e, N, null);
            if (r)
              for (var Q = 0, fe = r.length; Q < fe; Q++) {
                var ye = r[Q];
                ye.length === 2
                  ? q._setAttribute(ye[0], ye[1])
                  : q._setAttributeNS(ye[2], ye[0], ye[1]);
              }
            return q;
          });
        }
        function Bn(e) {
          for (var r = L.elements.length - 1; r >= 0; r--)
            if (L.elements[r] instanceof e) return r;
          return -1;
        }
        function Ar(e) {
          var r,
            N,
            x = -1,
            q = -1,
            Q;
          if (
            ((x = Bn(l.HTMLTableElement)),
            (q = Bn(l.HTMLTemplateElement)),
            q >= 0 && (x < 0 || q > x)
              ? (r = L.elements[q])
              : x >= 0 &&
                ((r = L.elements[x].parentNode),
                r ? (N = L.elements[x]) : (r = L.elements[x - 1])),
            r || (r = L.elements[0]),
            r instanceof l.HTMLTemplateElement && (r = r.content),
            (Q = e(r.ownerDocument)),
            Q.nodeType === t.TEXT_NODE)
          ) {
            var fe;
            if (
              (N ? (fe = N.previousSibling) : (fe = r.lastChild),
              fe && fe.nodeType === t.TEXT_NODE)
            )
              return fe.appendData(Q.data), Q;
          }
          return N ? r.insertBefore(Q, N) : r._appendChild(Q), Q;
        }
        function hr() {
          for (var e = !1, r = L.elements.length - 1; r >= 0; r--) {
            var N = L.elements[r];
            if (
              (r === 0 && ((e = !0), jt && (N = V)), N.namespaceURI === a.HTML)
            ) {
              var x = N.localName;
              switch (x) {
                case "select":
                  for (var q = r; q > 0; ) {
                    var Q = L.elements[--q];
                    if (Q instanceof l.HTMLTemplateElement) break;
                    if (Q instanceof l.HTMLTableElement) {
                      F = Gr;
                      return;
                    }
                  }
                  F = _t;
                  return;
                case "tr":
                  F = mr;
                  return;
                case "tbody":
                case "tfoot":
                case "thead":
                  F = Wt;
                  return;
                case "caption":
                  F = En;
                  return;
                case "colgroup":
                  F = Vr;
                  return;
                case "table":
                  F = Qe;
                  return;
                case "template":
                  F = dt[dt.length - 1];
                  return;
                case "body":
                  F = ue;
                  return;
                case "frameset":
                  F = Tn;
                  return;
                case "html":
                  wr === null ? (F = Fr) : (F = bn);
                  return;
                default:
                  if (!e) {
                    if (x === "head") {
                      F = qe;
                      return;
                    }
                    if (x === "td" || x === "th") {
                      F = Qt;
                      return;
                    }
                  }
              }
            }
            if (e) {
              F = ue;
              return;
            }
          }
        }
        function Mr(e, r) {
          pe(e, r), (M = dr), (ht = F), (F = jr);
        }
        function Ga(e, r) {
          pe(e, r), (M = At), (ht = F), (F = jr);
        }
        function ln(e, r) {
          return {
            elt: fr(e, ve.list[r].localName, ve.attrs[r]),
            attrs: ve.attrs[r],
          };
        }
        function Ge() {
          if (ve.list.length !== 0) {
            var e = ve.list[ve.list.length - 1];
            if (e !== ve.MARKER && L.elements.lastIndexOf(e) === -1) {
              for (
                var r = ve.list.length - 2;
                r >= 0 &&
                ((e = ve.list[r]),
                !(e === ve.MARKER || L.elements.lastIndexOf(e) !== -1));
                r--
              );
              for (r = r + 1; r < ve.list.length; r++) {
                var N = Dr(function (x) {
                  return ln(x, r).elt;
                });
                ve.list[r] = N;
              }
            }
          }
        }
        var xr = { localName: "BM" };
        function za(e) {
          if (Ne(L.top, e) && ve.indexOf(L.top) === -1) return L.pop(), !0;
          for (var r = 0; r < 8; ) {
            r++;
            var N = ve.findElementByTag(e);
            if (!N) return !1;
            var x = L.elements.lastIndexOf(N);
            if (x === -1) return ve.remove(N), !0;
            if (!L.elementInScope(N)) return !0;
            for (var q = null, Q, fe = x + 1; fe < L.elements.length; fe++)
              if (Ne(L.elements[fe], k)) {
                (q = L.elements[fe]), (Q = fe);
                break;
              }
            if (q) {
              var ye = L.elements[x - 1];
              ve.insertAfter(N, xr);
              for (
                var Re = q, je = q, Je = Q, rt, $t = 0;
                $t++, (Re = L.elements[--Je]), Re !== N;

              ) {
                if (
                  ((rt = ve.indexOf(Re)),
                  $t > 3 && rt !== -1 && (ve.remove(Re), (rt = -1)),
                  rt === -1)
                ) {
                  L.removeElement(Re);
                  continue;
                }
                var Ot = ln(ye.ownerDocument, rt);
                ve.replace(Re, Ot.elt, Ot.attrs),
                  (L.elements[Je] = Ot.elt),
                  (Re = Ot.elt),
                  je === q && (ve.remove(xr), ve.insertAfter(Ot.elt, xr)),
                  Re._appendChild(je),
                  (je = Re);
              }
              Dt && Ne(ye, ne)
                ? Ar(function () {
                    return je;
                  })
                : ye instanceof l.HTMLTemplateElement
                  ? ye.content._appendChild(je)
                  : ye._appendChild(je);
              for (
                var gr = ln(q.ownerDocument, ve.indexOf(N));
                q.hasChildNodes();

              )
                gr.elt._appendChild(q.firstChild);
              q._appendChild(gr.elt),
                ve.remove(N),
                ve.replace(xr, gr.elt, gr.attrs),
                L.removeElement(N);
              var Bi = L.elements.lastIndexOf(q);
              L.elements.splice(Bi + 1, 0, gr.elt);
            } else return L.popElement(N), ve.remove(N), !0;
          }
          return !0;
        }
        function Za() {
          L.pop(), (F = ht);
        }
        function Gt() {
          delete we._parser,
            (L.elements.length = 0),
            we.defaultView &&
              we.defaultView.dispatchEvent(new l.Event("load", {}));
        }
        function se(e, r) {
          (M = r), te--;
        }
        function Te(e) {
          switch (e) {
            case 38:
              (yt = Te), (M = pr);
              break;
            case 60:
              if (ja()) break;
              M = Wa;
              break;
            case 0:
              $.push(e), (kt = !0);
              break;
            case -1:
              Ee();
              break;
            default:
              ur(ie) || $.push(e);
              break;
          }
        }
        function At(e) {
          switch (e) {
            case 38:
              (yt = At), (M = pr);
              break;
            case 60:
              M = Ka;
              break;
            case 0:
              $.push(65533), (kt = !0);
              break;
            case -1:
              Ee();
              break;
            default:
              $.push(e);
              break;
          }
        }
        function dr(e) {
          switch (e) {
            case 60:
              M = Qa;
              break;
            case 0:
              $.push(65533);
              break;
            case -1:
              Ee();
              break;
            default:
              ur(me) || $.push(e);
              break;
          }
        }
        function Mt(e) {
          switch (e) {
            case 60:
              M = ti;
              break;
            case 0:
              $.push(65533);
              break;
            case -1:
              Ee();
              break;
            default:
              ur(me) || $.push(e);
              break;
          }
        }
        function un(e) {
          switch (e) {
            case 0:
              $.push(65533);
              break;
            case -1:
              Ee();
              break;
            default:
              ur(be) || $.push(e);
              break;
          }
        }
        function Wa(e) {
          switch (e) {
            case 33:
              M = Vn;
              break;
            case 47:
              M = $a;
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
              Ba(), se(e, Un);
              break;
            case 63:
              se(e, Hr);
              break;
            default:
              $.push(60), se(e, Te);
              break;
          }
        }
        function $a(e) {
          switch (e) {
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
              cr(), se(e, Un);
              break;
            case 62:
              M = Te;
              break;
            case -1:
              $.push(60), $.push(47), Ee();
              break;
            default:
              se(e, Hr);
              break;
          }
        }
        function Un(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              M = ot;
              break;
            case 47:
              M = It;
              break;
            case 62:
              (M = Te), gt();
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
              Ce += String.fromCharCode(e + 32);
              break;
            case 0:
              Ce += "\uFFFD";
              break;
            case -1:
              Ee();
              break;
            default:
              Ce += lr(W);
              break;
          }
        }
        function Ka(e) {
          e === 47 ? (mt(), (M = Xa)) : ($.push(60), se(e, At));
        }
        function Xa(e) {
          switch (e) {
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
              cr(), se(e, Ya);
              break;
            default:
              $.push(60), $.push(47), se(e, At);
              break;
          }
        }
        function Ya(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              if (Ye(Ce)) {
                M = ot;
                return;
              }
              break;
            case 47:
              if (Ye(Ce)) {
                M = It;
                return;
              }
              break;
            case 62:
              if (Ye(Ce)) {
                (M = Te), gt();
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
              (Ce += String.fromCharCode(e + 32)), De.push(e);
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
              (Ce += String.fromCharCode(e)), De.push(e);
              return;
            default:
              break;
          }
          $.push(60), $.push(47), f($, De), se(e, At);
        }
        function Qa(e) {
          e === 47 ? (mt(), (M = Ja)) : ($.push(60), se(e, dr));
        }
        function Ja(e) {
          switch (e) {
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
              cr(), se(e, ei);
              break;
            default:
              $.push(60), $.push(47), se(e, dr);
              break;
          }
        }
        function ei(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              if (Ye(Ce)) {
                M = ot;
                return;
              }
              break;
            case 47:
              if (Ye(Ce)) {
                M = It;
                return;
              }
              break;
            case 62:
              if (Ye(Ce)) {
                (M = Te), gt();
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
              (Ce += String.fromCharCode(e + 32)), De.push(e);
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
              (Ce += String.fromCharCode(e)), De.push(e);
              return;
            default:
              break;
          }
          $.push(60), $.push(47), f($, De), se(e, dr);
        }
        function ti(e) {
          switch (e) {
            case 47:
              mt(), (M = ri);
              break;
            case 33:
              (M = ai), $.push(60), $.push(33);
              break;
            default:
              $.push(60), se(e, Mt);
              break;
          }
        }
        function ri(e) {
          switch (e) {
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
              cr(), se(e, ni);
              break;
            default:
              $.push(60), $.push(47), se(e, Mt);
              break;
          }
        }
        function ni(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              if (Ye(Ce)) {
                M = ot;
                return;
              }
              break;
            case 47:
              if (Ye(Ce)) {
                M = It;
                return;
              }
              break;
            case 62:
              if (Ye(Ce)) {
                (M = Te), gt();
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
              (Ce += String.fromCharCode(e + 32)), De.push(e);
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
              (Ce += String.fromCharCode(e)), De.push(e);
              return;
            default:
              break;
          }
          $.push(60), $.push(47), f($, De), se(e, Mt);
        }
        function ai(e) {
          e === 45 ? ((M = ii), $.push(45)) : se(e, Mt);
        }
        function ii(e) {
          e === 45 ? ((M = Fn), $.push(45)) : se(e, Mt);
        }
        function st(e) {
          switch (e) {
            case 45:
              (M = si), $.push(45);
              break;
            case 60:
              M = fn;
              break;
            case 0:
              $.push(65533);
              break;
            case -1:
              Ee();
              break;
            default:
              $.push(e);
              break;
          }
        }
        function si(e) {
          switch (e) {
            case 45:
              (M = Fn), $.push(45);
              break;
            case 60:
              M = fn;
              break;
            case 0:
              (M = st), $.push(65533);
              break;
            case -1:
              Ee();
              break;
            default:
              (M = st), $.push(e);
              break;
          }
        }
        function Fn(e) {
          switch (e) {
            case 45:
              $.push(45);
              break;
            case 60:
              M = fn;
              break;
            case 62:
              (M = Mt), $.push(62);
              break;
            case 0:
              (M = st), $.push(65533);
              break;
            case -1:
              Ee();
              break;
            default:
              (M = st), $.push(e);
              break;
          }
        }
        function fn(e) {
          switch (e) {
            case 47:
              mt(), (M = oi);
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
              mt(), $.push(60), se(e, li);
              break;
            default:
              $.push(60), se(e, st);
              break;
          }
        }
        function oi(e) {
          switch (e) {
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
              cr(), se(e, ci);
              break;
            default:
              $.push(60), $.push(47), se(e, st);
              break;
          }
        }
        function ci(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              if (Ye(Ce)) {
                M = ot;
                return;
              }
              break;
            case 47:
              if (Ye(Ce)) {
                M = It;
                return;
              }
              break;
            case 62:
              if (Ye(Ce)) {
                (M = Te), gt();
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
              (Ce += String.fromCharCode(e + 32)), De.push(e);
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
              (Ce += String.fromCharCode(e)), De.push(e);
              return;
            default:
              break;
          }
          $.push(60), $.push(47), f($, De), se(e, st);
        }
        function li(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
            case 47:
            case 62:
              Ue(De) === "script" ? (M = xt) : (M = st), $.push(e);
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
              De.push(e + 32), $.push(e);
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
              De.push(e), $.push(e);
              break;
            default:
              se(e, st);
              break;
          }
        }
        function xt(e) {
          switch (e) {
            case 45:
              (M = ui), $.push(45);
              break;
            case 60:
              (M = hn), $.push(60);
              break;
            case 0:
              $.push(65533);
              break;
            case -1:
              Ee();
              break;
            default:
              $.push(e);
              break;
          }
        }
        function ui(e) {
          switch (e) {
            case 45:
              (M = fi), $.push(45);
              break;
            case 60:
              (M = hn), $.push(60);
              break;
            case 0:
              (M = xt), $.push(65533);
              break;
            case -1:
              Ee();
              break;
            default:
              (M = xt), $.push(e);
              break;
          }
        }
        function fi(e) {
          switch (e) {
            case 45:
              $.push(45);
              break;
            case 60:
              (M = hn), $.push(60);
              break;
            case 62:
              (M = Mt), $.push(62);
              break;
            case 0:
              (M = xt), $.push(65533);
              break;
            case -1:
              Ee();
              break;
            default:
              (M = xt), $.push(e);
              break;
          }
        }
        function hn(e) {
          e === 47 ? (mt(), (M = hi), $.push(47)) : se(e, xt);
        }
        function hi(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
            case 47:
            case 62:
              Ue(De) === "script" ? (M = st) : (M = xt), $.push(e);
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
              De.push(e + 32), $.push(e);
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
              De.push(e), $.push(e);
              break;
            default:
              se(e, xt);
              break;
          }
        }
        function ot(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 47:
              M = It;
              break;
            case 62:
              (M = Te), gt();
              break;
            case -1:
              Ee();
              break;
            case 61:
              sn(), ($e += String.fromCharCode(e)), (M = dn);
              break;
            default:
              if (Pa()) break;
              sn(), se(e, dn);
              break;
          }
        }
        function dn(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
            case 47:
            case 62:
            case -1:
              se(e, di);
              break;
            case 61:
              M = jn;
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
              $e += String.fromCharCode(e + 32);
              break;
            case 0:
              $e += "\uFFFD";
              break;
            case 34:
            case 39:
            case 60:
            default:
              $e += lr(ce);
              break;
          }
        }
        function di(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 47:
              Lt($e), (M = It);
              break;
            case 61:
              M = jn;
              break;
            case 62:
              (M = Te), Lt($e), gt();
              break;
            case -1:
              Lt($e), Ee();
              break;
            default:
              Lt($e), sn(), se(e, dn);
              break;
          }
        }
        function jn(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 34:
              on(), (M = Ir);
              break;
            case 39:
              on(), (M = Rr);
              break;
            case 62:
            default:
              on(), se(e, Or);
              break;
          }
        }
        function Ir(e) {
          switch (e) {
            case 34:
              Lt($e, We), (M = pn);
              break;
            case 38:
              (yt = Ir), (M = pr);
              break;
            case 0:
              We += "\uFFFD";
              break;
            case -1:
              Ee();
              break;
            case 10:
              We += String.fromCharCode(e);
              break;
            default:
              We += lr(X);
              break;
          }
        }
        function Rr(e) {
          switch (e) {
            case 39:
              Lt($e, We), (M = pn);
              break;
            case 38:
              (yt = Rr), (M = pr);
              break;
            case 0:
              We += "\uFFFD";
              break;
            case -1:
              Ee();
              break;
            case 10:
              We += String.fromCharCode(e);
              break;
            default:
              We += lr(z);
              break;
          }
        }
        function Or(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              Lt($e, We), (M = ot);
              break;
            case 38:
              (yt = Or), (M = pr);
              break;
            case 62:
              Lt($e, We), (M = Te), gt();
              break;
            case 0:
              We += "\uFFFD";
              break;
            case -1:
              te--, (M = Te);
              break;
            case 34:
            case 39:
            case 60:
            case 61:
            case 96:
            default:
              We += lr(O);
              break;
          }
        }
        function pn(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              M = ot;
              break;
            case 47:
              M = It;
              break;
            case 62:
              (M = Te), gt();
              break;
            case -1:
              Ee();
              break;
            default:
              se(e, ot);
              break;
          }
        }
        function It(e) {
          switch (e) {
            case 62:
              (M = Te), Va(!0);
              break;
            case -1:
              Ee();
              break;
            default:
              se(e, ot);
              break;
          }
        }
        function Hr(e, r, N) {
          var x = r.length;
          N ? (te += x - 1) : (te += x);
          var q = r.substring(0, x - 1);
          (q = q.replace(/\u0000/g, "\uFFFD")),
            (q = q.replace(
              /\u000D\u000A/g,
              `
`
            )),
            (q = q.replace(
              /\u000D/g,
              `
`
            )),
            Pe(I, q),
            (M = Te);
        }
        Hr.lookahead = ">";
        function Vn(e, r, N) {
          if (r[0] === "-" && r[1] === "-") {
            (te += 2), Pn(), (M = pi);
            return;
          }
          r.toUpperCase() === "DOCTYPE"
            ? ((te += 7), (M = Ti))
            : r === "[CDATA[" && Ua()
              ? ((te += 7), (M = _n))
              : (M = Hr);
        }
        Vn.lookahead = 7;
        function pi(e) {
          switch ((Pn(), e)) {
            case 45:
              M = mi;
              break;
            case 62:
              (M = Te), Pe(I, Ue(xe));
              break;
            default:
              se(e, zt);
              break;
          }
        }
        function mi(e) {
          switch (e) {
            case 45:
              M = qr;
              break;
            case 62:
              (M = Te), Pe(I, Ue(xe));
              break;
            case -1:
              Pe(I, Ue(xe)), Ee();
              break;
            default:
              xe.push(45), se(e, zt);
              break;
          }
        }
        function zt(e) {
          switch (e) {
            case 60:
              xe.push(e), (M = gi);
              break;
            case 45:
              M = mn;
              break;
            case 0:
              xe.push(65533);
              break;
            case -1:
              Pe(I, Ue(xe)), Ee();
              break;
            default:
              xe.push(e);
              break;
          }
        }
        function gi(e) {
          switch (e) {
            case 33:
              xe.push(e), (M = _i);
              break;
            case 60:
              xe.push(e);
              break;
            default:
              se(e, zt);
              break;
          }
        }
        function _i(e) {
          switch (e) {
            case 45:
              M = bi;
              break;
            default:
              se(e, zt);
              break;
          }
        }
        function bi(e) {
          switch (e) {
            case 45:
              M = Ei;
              break;
            default:
              se(e, mn);
              break;
          }
        }
        function Ei(e) {
          switch (e) {
            case 62:
            case -1:
              se(e, qr);
              break;
            default:
              se(e, qr);
              break;
          }
        }
        function mn(e) {
          switch (e) {
            case 45:
              M = qr;
              break;
            case -1:
              Pe(I, Ue(xe)), Ee();
              break;
            default:
              xe.push(45), se(e, zt);
              break;
          }
        }
        function qr(e) {
          switch (e) {
            case 62:
              (M = Te), Pe(I, Ue(xe));
              break;
            case 33:
              M = vi;
              break;
            case 45:
              xe.push(45);
              break;
            case -1:
              Pe(I, Ue(xe)), Ee();
              break;
            default:
              xe.push(45), xe.push(45), se(e, zt);
              break;
          }
        }
        function vi(e) {
          switch (e) {
            case 45:
              xe.push(45), xe.push(45), xe.push(33), (M = mn);
              break;
            case 62:
              (M = Te), Pe(I, Ue(xe));
              break;
            case -1:
              Pe(I, Ue(xe)), Ee();
              break;
            default:
              xe.push(45), xe.push(45), xe.push(33), se(e, zt);
              break;
          }
        }
        function Ti(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              M = Gn;
              break;
            case -1:
              Xt(), ke(), Le(), Ee();
              break;
            default:
              se(e, Gn);
              break;
          }
        }
        function Gn(e) {
          switch (e) {
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
              Xt(), Nt.push(e + 32), (M = gn);
              break;
            case 0:
              Xt(), Nt.push(65533), (M = gn);
              break;
            case 62:
              Xt(), ke(), (M = Te), Le();
              break;
            case -1:
              Xt(), ke(), Le(), Ee();
              break;
            default:
              Xt(), Nt.push(e), (M = gn);
              break;
          }
        }
        function gn(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              M = zn;
              break;
            case 62:
              (M = Te), Le();
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
              Nt.push(e + 32);
              break;
            case 0:
              Nt.push(65533);
              break;
            case -1:
              ke(), Le(), Ee();
              break;
            default:
              Nt.push(e);
              break;
          }
        }
        function zn(e, r, N) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              te += 1;
              break;
            case 62:
              (M = Te), (te += 1), Le();
              break;
            case -1:
              ke(), Le(), Ee();
              break;
            default:
              (r = r.toUpperCase()),
                r === "PUBLIC"
                  ? ((te += 6), (M = yi))
                  : r === "SYSTEM"
                    ? ((te += 6), (M = Si))
                    : (ke(), (M = Rt));
              break;
          }
        }
        zn.lookahead = 6;
        function yi(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              M = Ni;
              break;
            case 34:
              Cr(), (M = Zn);
              break;
            case 39:
              Cr(), (M = Wn);
              break;
            case 62:
              ke(), (M = Te), Le();
              break;
            case -1:
              ke(), Le(), Ee();
              break;
            default:
              ke(), (M = Rt);
              break;
          }
        }
        function Ni(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 34:
              Cr(), (M = Zn);
              break;
            case 39:
              Cr(), (M = Wn);
              break;
            case 62:
              ke(), (M = Te), Le();
              break;
            case -1:
              ke(), Le(), Ee();
              break;
            default:
              ke(), (M = Rt);
              break;
          }
        }
        function Zn(e) {
          switch (e) {
            case 34:
              M = $n;
              break;
            case 0:
              wt.push(65533);
              break;
            case 62:
              ke(), (M = Te), Le();
              break;
            case -1:
              ke(), Le(), Ee();
              break;
            default:
              wt.push(e);
              break;
          }
        }
        function Wn(e) {
          switch (e) {
            case 39:
              M = $n;
              break;
            case 0:
              wt.push(65533);
              break;
            case 62:
              ke(), (M = Te), Le();
              break;
            case -1:
              ke(), Le(), Ee();
              break;
            default:
              wt.push(e);
              break;
          }
        }
        function $n(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              M = wi;
              break;
            case 62:
              (M = Te), Le();
              break;
            case 34:
              Ct(), (M = Pr);
              break;
            case 39:
              Ct(), (M = Br);
              break;
            case -1:
              ke(), Le(), Ee();
              break;
            default:
              ke(), (M = Rt);
              break;
          }
        }
        function wi(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 62:
              (M = Te), Le();
              break;
            case 34:
              Ct(), (M = Pr);
              break;
            case 39:
              Ct(), (M = Br);
              break;
            case -1:
              ke(), Le(), Ee();
              break;
            default:
              ke(), (M = Rt);
              break;
          }
        }
        function Si(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              M = ki;
              break;
            case 34:
              Ct(), (M = Pr);
              break;
            case 39:
              Ct(), (M = Br);
              break;
            case 62:
              ke(), (M = Te), Le();
              break;
            case -1:
              ke(), Le(), Ee();
              break;
            default:
              ke(), (M = Rt);
              break;
          }
        }
        function ki(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 34:
              Ct(), (M = Pr);
              break;
            case 39:
              Ct(), (M = Br);
              break;
            case 62:
              ke(), (M = Te), Le();
              break;
            case -1:
              ke(), Le(), Ee();
              break;
            default:
              ke(), (M = Rt);
              break;
          }
        }
        function Pr(e) {
          switch (e) {
            case 34:
              M = Kn;
              break;
            case 0:
              St.push(65533);
              break;
            case 62:
              ke(), (M = Te), Le();
              break;
            case -1:
              ke(), Le(), Ee();
              break;
            default:
              St.push(e);
              break;
          }
        }
        function Br(e) {
          switch (e) {
            case 39:
              M = Kn;
              break;
            case 0:
              St.push(65533);
              break;
            case 62:
              ke(), (M = Te), Le();
              break;
            case -1:
              ke(), Le(), Ee();
              break;
            default:
              St.push(e);
              break;
          }
        }
        function Kn(e) {
          switch (e) {
            case 9:
            case 10:
            case 12:
            case 32:
              break;
            case 62:
              (M = Te), Le();
              break;
            case -1:
              ke(), Le(), Ee();
              break;
            default:
              M = Rt;
              break;
          }
        }
        function Rt(e) {
          switch (e) {
            case 62:
              (M = Te), Le();
              break;
            case -1:
              Le(), Ee();
              break;
            default:
              break;
          }
        }
        function _n(e) {
          switch (e) {
            case 93:
              M = Li;
              break;
            case -1:
              Ee();
              break;
            case 0:
              kt = !0;
            default:
              ur(he) || $.push(e);
              break;
          }
        }
        function Li(e) {
          switch (e) {
            case 93:
              M = Ci;
              break;
            default:
              $.push(93), se(e, _n);
              break;
          }
        }
        function Ci(e) {
          switch (e) {
            case 93:
              $.push(93);
              break;
            case 62:
              Yt(), (M = Te);
              break;
            default:
              $.push(93), $.push(93), se(e, _n);
              break;
          }
        }
        function pr(e) {
          switch ((mt(), De.push(38), e)) {
            case 9:
            case 10:
            case 12:
            case 32:
            case 60:
            case 38:
            case -1:
              se(e, Zt);
              break;
            case 35:
              De.push(e), (M = Di);
              break;
            default:
              se(e, Xn);
              break;
          }
        }
        function Xn(e) {
          Me.lastIndex = te;
          var r = Me.exec(ee);
          if (!r) throw new Error("should never happen");
          var N = r[1];
          if (!N) {
            M = Zt;
            return;
          }
          switch (((te += N.length), f(De, rn(N)), yt)) {
            case Ir:
            case Rr:
            case Or:
              if (N[N.length - 1] !== ";" && /[=A-Za-z0-9]/.test(ee[te])) {
                M = Zt;
                return;
              }
              break;
            default:
              break;
          }
          mt();
          var x = ge[N];
          typeof x == "number" ? De.push(x) : f(De, x), (M = Zt);
        }
        Xn.lookahead = -bt;
        function Di(e) {
          switch (((Oe = 0), e)) {
            case 120:
            case 88:
              De.push(e), (M = Ai);
              break;
            default:
              se(e, Mi);
              break;
          }
        }
        function Ai(e) {
          switch (e) {
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
              se(e, xi);
              break;
            default:
              se(e, Zt);
              break;
          }
        }
        function Mi(e) {
          switch (e) {
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
              se(e, Ii);
              break;
            default:
              se(e, Zt);
              break;
          }
        }
        function xi(e) {
          switch (e) {
            case 65:
            case 66:
            case 67:
            case 68:
            case 69:
            case 70:
              (Oe *= 16), (Oe += e - 55);
              break;
            case 97:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
              (Oe *= 16), (Oe += e - 87);
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
              (Oe *= 16), (Oe += e - 48);
              break;
            case 59:
              M = Ur;
              break;
            default:
              se(e, Ur);
              break;
          }
        }
        function Ii(e) {
          switch (e) {
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
              (Oe *= 10), (Oe += e - 48);
              break;
            case 59:
              M = Ur;
              break;
            default:
              se(e, Ur);
              break;
          }
        }
        function Ur(e) {
          Oe in K
            ? (Oe = K[Oe])
            : (Oe > 1114111 || (Oe >= 55296 && Oe < 57344)) && (Oe = 65533),
            mt(),
            Oe <= 65535
              ? De.push(Oe)
              : ((Oe = Oe - 65536),
                De.push(55296 + (Oe >> 10)),
                De.push(56320 + (Oe & 1023))),
            se(e, Zt);
        }
        function Zt(e) {
          switch (yt) {
            case Ir:
            case Rr:
            case Or:
              We += Ue(De);
              break;
            default:
              f($, De);
              break;
          }
          se(e, yt);
        }
        function Ri(e, r, N, x) {
          switch (e) {
            case 1:
              if (((r = r.replace(ze, "")), r.length === 0)) return;
              break;
            case 4:
              we._appendChild(we.createComment(r));
              return;
            case 5:
              var q = r,
                Q = N,
                fe = x;
              we.appendChild(new s(we, q, Q, fe)),
                nn ||
                q.toLowerCase() !== "html" ||
                J.test(Q) ||
                (fe && fe.toLowerCase() === B) ||
                (fe === void 0 && y.test(Q))
                  ? (we._quirks = !0)
                  : (g.test(Q) || (fe !== void 0 && y.test(Q))) &&
                    (we._limitedQuirks = !0),
                (F = Yn);
              return;
          }
          (we._quirks = !0), (F = Yn), F(e, r, N, x);
        }
        function Yn(e, r, N, x) {
          var q;
          switch (e) {
            case 1:
              if (((r = r.replace(ze, "")), r.length === 0)) return;
              break;
            case 5:
              return;
            case 4:
              we._appendChild(we.createComment(r));
              return;
            case 2:
              if (r === "html") {
                (q = fr(we, r, N)), L.push(q), we.appendChild(q), (F = Fr);
                return;
              }
              break;
            case 3:
              switch (r) {
                case "html":
                case "head":
                case "body":
                case "br":
                  break;
                default:
                  return;
              }
          }
          (q = fr(we, "html", null)),
            L.push(q),
            we.appendChild(q),
            (F = Fr),
            F(e, r, N, x);
        }
        function Fr(e, r, N, x) {
          switch (e) {
            case 1:
              if (((r = r.replace(ze, "")), r.length === 0)) return;
              break;
            case 5:
              return;
            case 4:
              at(r);
              return;
            case 2:
              switch (r) {
                case "html":
                  ue(e, r, N, x);
                  return;
                case "head":
                  var q = pe(r, N);
                  (wr = q), (F = qe);
                  return;
              }
              break;
            case 3:
              switch (r) {
                case "html":
                case "head":
                case "body":
                case "br":
                  break;
                default:
                  return;
              }
          }
          Fr(m, "head", null), F(e, r, N, x);
        }
        function qe(e, r, N, x) {
          switch (e) {
            case 1:
              var q = r.match(ze);
              if (
                (q && (it(q[0]), (r = r.substring(q[0].length))),
                r.length === 0)
              )
                return;
              break;
            case 4:
              at(r);
              return;
            case 5:
              return;
            case 2:
              switch (r) {
                case "html":
                  ue(e, r, N, x);
                  return;
                case "meta":
                case "base":
                case "basefont":
                case "bgsound":
                case "link":
                  pe(r, N), L.pop();
                  return;
                case "title":
                  Ga(r, N);
                  return;
                case "noscript":
                  if (!Sr) {
                    pe(r, N), (F = Qn);
                    return;
                  }
                case "noframes":
                case "style":
                  Mr(r, N);
                  return;
                case "script":
                  Dr(function (Q) {
                    var fe = fr(Q, r, N);
                    return (
                      (fe._parser_inserted = !0),
                      (fe._force_async = !1),
                      jt && (fe._already_started = !0),
                      Yt(),
                      fe
                    );
                  }),
                    (M = Mt),
                    (ht = F),
                    (F = jr);
                  return;
                case "template":
                  pe(r, N), ve.insertMarker(), (He = !1), (F = vn), dt.push(F);
                  return;
                case "head":
                  return;
              }
              break;
            case 3:
              switch (r) {
                case "head":
                  L.pop(), (F = bn);
                  return;
                case "body":
                case "html":
                case "br":
                  break;
                case "template":
                  if (!L.contains("template")) return;
                  L.generateImpliedEndTags(null, "thorough"),
                    L.popTag("template"),
                    ve.clearToMarker(),
                    dt.pop(),
                    hr();
                  return;
                default:
                  return;
              }
              break;
          }
          qe(w, "head", null), F(e, r, N, x);
        }
        function Qn(e, r, N, x) {
          switch (e) {
            case 5:
              return;
            case 4:
              qe(e, r);
              return;
            case 1:
              var q = r.match(ze);
              if (
                (q && (qe(e, q[0]), (r = r.substring(q[0].length))),
                r.length === 0)
              )
                return;
              break;
            case 2:
              switch (r) {
                case "html":
                  ue(e, r, N, x);
                  return;
                case "basefont":
                case "bgsound":
                case "link":
                case "meta":
                case "noframes":
                case "style":
                  qe(e, r, N);
                  return;
                case "head":
                case "noscript":
                  return;
              }
              break;
            case 3:
              switch (r) {
                case "noscript":
                  L.pop(), (F = qe);
                  return;
                case "br":
                  break;
                default:
                  return;
              }
              break;
          }
          Qn(w, "noscript", null), F(e, r, N, x);
        }
        function bn(e, r, N, x) {
          switch (e) {
            case 1:
              var q = r.match(ze);
              if (
                (q && (it(q[0]), (r = r.substring(q[0].length))),
                r.length === 0)
              )
                return;
              break;
            case 4:
              at(r);
              return;
            case 5:
              return;
            case 2:
              switch (r) {
                case "html":
                  ue(e, r, N, x);
                  return;
                case "body":
                  pe(r, N), (He = !1), (F = ue);
                  return;
                case "frameset":
                  pe(r, N), (F = Tn);
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
                  L.push(wr), qe(m, r, N), L.removeElement(wr);
                  return;
                case "head":
                  return;
              }
              break;
            case 3:
              switch (r) {
                case "template":
                  return qe(e, r, N, x);
                case "body":
                case "html":
                case "br":
                  break;
                default:
                  return;
              }
              break;
          }
          bn(m, "body", null), (He = !0), F(e, r, N, x);
        }
        function ue(e, r, N, x) {
          var q, Q, fe, ye;
          switch (e) {
            case 1:
              if (kt && ((r = r.replace(Et, "")), r.length === 0)) return;
              He && Se.test(r) && (He = !1), Ge(), it(r);
              return;
            case 5:
              return;
            case 4:
              at(r);
              return;
            case -1:
              if (dt.length) return vn(e);
              Gt();
              return;
            case 2:
              switch (r) {
                case "html":
                  if (L.contains("template")) return;
                  vt(N, L.elements[0]);
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
                  qe(m, r, N);
                  return;
                case "body":
                  if (
                    ((q = L.elements[1]),
                    !q ||
                      !(q instanceof l.HTMLBodyElement) ||
                      L.contains("template"))
                  )
                    return;
                  (He = !1), vt(N, q);
                  return;
                case "frameset":
                  if (
                    !He ||
                    ((q = L.elements[1]),
                    !q || !(q instanceof l.HTMLBodyElement))
                  )
                    return;
                  for (
                    q.parentNode && q.parentNode.removeChild(q);
                    !(L.top instanceof l.HTMLHtmlElement);

                  )
                    L.pop();
                  pe(r, N), (F = Tn);
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
                  L.inButtonScope("p") && ue(w, "p"), pe(r, N);
                  return;
                case "menu":
                  L.inButtonScope("p") && ue(w, "p"),
                    Ne(L.top, "menuitem") && L.pop(),
                    pe(r, N);
                  return;
                case "h1":
                case "h2":
                case "h3":
                case "h4":
                case "h5":
                case "h6":
                  L.inButtonScope("p") && ue(w, "p"),
                    L.top instanceof l.HTMLHeadingElement && L.pop(),
                    pe(r, N);
                  return;
                case "pre":
                case "listing":
                  L.inButtonScope("p") && ue(w, "p"),
                    pe(r, N),
                    (Vt = !0),
                    (He = !1);
                  return;
                case "form":
                  if (pt && !L.contains("template")) return;
                  L.inButtonScope("p") && ue(w, "p"),
                    (ye = pe(r, N)),
                    L.contains("template") || (pt = ye);
                  return;
                case "li":
                  for (He = !1, Q = L.elements.length - 1; Q >= 0; Q--) {
                    if (((fe = L.elements[Q]), fe instanceof l.HTMLLIElement)) {
                      ue(w, "li");
                      break;
                    }
                    if (Ne(fe, k) && !Ne(fe, _)) break;
                  }
                  L.inButtonScope("p") && ue(w, "p"), pe(r, N);
                  return;
                case "dd":
                case "dt":
                  for (He = !1, Q = L.elements.length - 1; Q >= 0; Q--) {
                    if (((fe = L.elements[Q]), Ne(fe, ae))) {
                      ue(w, fe.localName);
                      break;
                    }
                    if (Ne(fe, k) && !Ne(fe, _)) break;
                  }
                  L.inButtonScope("p") && ue(w, "p"), pe(r, N);
                  return;
                case "plaintext":
                  L.inButtonScope("p") && ue(w, "p"), pe(r, N), (M = un);
                  return;
                case "button":
                  L.inScope("button")
                    ? (ue(w, "button"), F(e, r, N, x))
                    : (Ge(), pe(r, N), (He = !1));
                  return;
                case "a":
                  var Re = ve.findElementByTag("a");
                  Re && (ue(w, r), ve.remove(Re), L.removeElement(Re));
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
                  Ge(), ve.push(pe(r, N), N);
                  return;
                case "nobr":
                  Ge(), L.inScope(r) && (ue(w, r), Ge()), ve.push(pe(r, N), N);
                  return;
                case "applet":
                case "marquee":
                case "object":
                  Ge(), pe(r, N), ve.insertMarker(), (He = !1);
                  return;
                case "table":
                  !we._quirks && L.inButtonScope("p") && ue(w, "p"),
                    pe(r, N),
                    (He = !1),
                    (F = Qe);
                  return;
                case "area":
                case "br":
                case "embed":
                case "img":
                case "keygen":
                case "wbr":
                  Ge(), pe(r, N), L.pop(), (He = !1);
                  return;
                case "input":
                  Ge(), (ye = pe(r, N)), L.pop();
                  var je = ye.getAttribute("type");
                  (!je || je.toLowerCase() !== "hidden") && (He = !1);
                  return;
                case "param":
                case "source":
                case "track":
                  pe(r, N), L.pop();
                  return;
                case "hr":
                  L.inButtonScope("p") && ue(w, "p"),
                    Ne(L.top, "menuitem") && L.pop(),
                    pe(r, N),
                    L.pop(),
                    (He = !1);
                  return;
                case "image":
                  ue(m, "img", N, x);
                  return;
                case "textarea":
                  pe(r, N), (Vt = !0), (He = !1), (M = At), (ht = F), (F = jr);
                  return;
                case "xmp":
                  L.inButtonScope("p") && ue(w, "p"), Ge(), (He = !1), Mr(r, N);
                  return;
                case "iframe":
                  (He = !1), Mr(r, N);
                  return;
                case "noembed":
                  Mr(r, N);
                  return;
                case "select":
                  Ge(),
                    pe(r, N),
                    (He = !1),
                    F === Qe || F === En || F === Wt || F === mr || F === Qt
                      ? (F = Gr)
                      : (F = _t);
                  return;
                case "optgroup":
                case "option":
                  L.top instanceof l.HTMLOptionElement && ue(w, "option"),
                    Ge(),
                    pe(r, N);
                  return;
                case "menuitem":
                  Ne(L.top, "menuitem") && L.pop(), Ge(), pe(r, N);
                  return;
                case "rb":
                case "rtc":
                  L.inScope("ruby") && L.generateImpliedEndTags(), pe(r, N);
                  return;
                case "rp":
                case "rt":
                  L.inScope("ruby") && L.generateImpliedEndTags("rtc"),
                    pe(r, N);
                  return;
                case "math":
                  Ge(), sr(N), Kt(N), cn(r, N, a.MATHML), x && L.pop();
                  return;
                case "svg":
                  Ge(), Pt(N), Kt(N), cn(r, N, a.SVG), x && L.pop();
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
              Ge(), pe(r, N);
              return;
            case 3:
              switch (r) {
                case "template":
                  qe(w, r, N);
                  return;
                case "body":
                  if (!L.inScope("body")) return;
                  F = Jn;
                  return;
                case "html":
                  if (!L.inScope("body")) return;
                  (F = Jn), F(e, r, N);
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
                  if (!L.inScope(r)) return;
                  L.generateImpliedEndTags(), L.popTag(r);
                  return;
                case "form":
                  if (L.contains("template")) {
                    if (!L.inScope("form")) return;
                    L.generateImpliedEndTags(), L.popTag("form");
                  } else {
                    var Je = pt;
                    if (((pt = null), !Je || !L.elementInScope(Je))) return;
                    L.generateImpliedEndTags(), L.removeElement(Je);
                  }
                  return;
                case "p":
                  L.inButtonScope(r)
                    ? (L.generateImpliedEndTags(r), L.popTag(r))
                    : (ue(m, r, null), F(e, r, N, x));
                  return;
                case "li":
                  if (!L.inListItemScope(r)) return;
                  L.generateImpliedEndTags(r), L.popTag(r);
                  return;
                case "dd":
                case "dt":
                  if (!L.inScope(r)) return;
                  L.generateImpliedEndTags(r), L.popTag(r);
                  return;
                case "h1":
                case "h2":
                case "h3":
                case "h4":
                case "h5":
                case "h6":
                  if (!L.elementTypeInScope(l.HTMLHeadingElement)) return;
                  L.generateImpliedEndTags(),
                    L.popElementType(l.HTMLHeadingElement);
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
                  var rt = za(r);
                  if (rt) return;
                  break;
                case "applet":
                case "marquee":
                case "object":
                  if (!L.inScope(r)) return;
                  L.generateImpliedEndTags(), L.popTag(r), ve.clearToMarker();
                  return;
                case "br":
                  ue(m, r, null);
                  return;
              }
              for (Q = L.elements.length - 1; Q >= 0; Q--)
                if (((fe = L.elements[Q]), Ne(fe, r))) {
                  L.generateImpliedEndTags(r), L.popElement(fe);
                  break;
                } else if (Ne(fe, k)) return;
              return;
          }
        }
        function jr(e, r, N, x) {
          switch (e) {
            case 1:
              it(r);
              return;
            case -1:
              L.top instanceof l.HTMLScriptElement &&
                (L.top._already_started = !0),
                L.pop(),
                (F = ht),
                F(e);
              return;
            case 3:
              r === "script" ? Za() : (L.pop(), (F = ht));
              return;
            default:
              return;
          }
        }
        function Qe(e, r, N, x) {
          function q(fe) {
            for (var ye = 0, Re = fe.length; ye < Re; ye++)
              if (fe[ye][0] === "type") return fe[ye][1].toLowerCase();
            return null;
          }
          switch (e) {
            case 1:
              if (an) {
                ue(e, r, N, x);
                return;
              } else if (Ne(L.top, ne)) {
                (kr = []), (ht = F), (F = Oi), F(e, r, N, x);
                return;
              }
              break;
            case 4:
              at(r);
              return;
            case 5:
              return;
            case 2:
              switch (r) {
                case "caption":
                  L.clearToContext(D), ve.insertMarker(), pe(r, N), (F = En);
                  return;
                case "colgroup":
                  L.clearToContext(D), pe(r, N), (F = Vr);
                  return;
                case "col":
                  Qe(m, "colgroup", null), F(e, r, N, x);
                  return;
                case "tbody":
                case "tfoot":
                case "thead":
                  L.clearToContext(D), pe(r, N), (F = Wt);
                  return;
                case "td":
                case "th":
                case "tr":
                  Qe(m, "tbody", null), F(e, r, N, x);
                  return;
                case "table":
                  if (!L.inTableScope(r)) return;
                  Qe(w, r), F(e, r, N, x);
                  return;
                case "style":
                case "script":
                case "template":
                  qe(e, r, N, x);
                  return;
                case "input":
                  var Q = q(N);
                  if (Q !== "hidden") break;
                  pe(r, N), L.pop();
                  return;
                case "form":
                  if (pt || L.contains("template")) return;
                  (pt = pe(r, N)), L.popElement(pt);
                  return;
              }
              break;
            case 3:
              switch (r) {
                case "table":
                  if (!L.inTableScope(r)) return;
                  L.popTag(r), hr();
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
                  qe(e, r, N, x);
                  return;
              }
              break;
            case -1:
              ue(e, r, N, x);
              return;
          }
          (Dt = !0), ue(e, r, N, x), (Dt = !1);
        }
        function Oi(e, r, N, x) {
          if (e === E) {
            if (kt && ((r = r.replace(Et, "")), r.length === 0)) return;
            kr.push(r);
          } else {
            var q = kr.join("");
            (kr.length = 0),
              Se.test(q) ? ((Dt = !0), ue(E, q), (Dt = !1)) : it(q),
              (F = ht),
              F(e, r, N, x);
          }
        }
        function En(e, r, N, x) {
          function q() {
            return L.inTableScope("caption")
              ? (L.generateImpliedEndTags(),
                L.popTag("caption"),
                ve.clearToMarker(),
                (F = Qe),
                !0)
              : !1;
          }
          switch (e) {
            case 2:
              switch (r) {
                case "caption":
                case "col":
                case "colgroup":
                case "tbody":
                case "td":
                case "tfoot":
                case "th":
                case "thead":
                case "tr":
                  q() && F(e, r, N, x);
                  return;
              }
              break;
            case 3:
              switch (r) {
                case "caption":
                  q();
                  return;
                case "table":
                  q() && F(e, r, N, x);
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
          ue(e, r, N, x);
        }
        function Vr(e, r, N, x) {
          switch (e) {
            case 1:
              var q = r.match(ze);
              if (
                (q && (it(q[0]), (r = r.substring(q[0].length))),
                r.length === 0)
              )
                return;
              break;
            case 4:
              at(r);
              return;
            case 5:
              return;
            case 2:
              switch (r) {
                case "html":
                  ue(e, r, N, x);
                  return;
                case "col":
                  pe(r, N), L.pop();
                  return;
                case "template":
                  qe(e, r, N, x);
                  return;
              }
              break;
            case 3:
              switch (r) {
                case "colgroup":
                  if (!Ne(L.top, "colgroup")) return;
                  L.pop(), (F = Qe);
                  return;
                case "col":
                  return;
                case "template":
                  qe(e, r, N, x);
                  return;
              }
              break;
            case -1:
              ue(e, r, N, x);
              return;
          }
          Ne(L.top, "colgroup") && (Vr(w, "colgroup"), F(e, r, N, x));
        }
        function Wt(e, r, N, x) {
          function q() {
            (!L.inTableScope("tbody") &&
              !L.inTableScope("thead") &&
              !L.inTableScope("tfoot")) ||
              (L.clearToContext(P),
              Wt(w, L.top.localName, null),
              F(e, r, N, x));
          }
          switch (e) {
            case 2:
              switch (r) {
                case "tr":
                  L.clearToContext(P), pe(r, N), (F = mr);
                  return;
                case "th":
                case "td":
                  Wt(m, "tr", null), F(e, r, N, x);
                  return;
                case "caption":
                case "col":
                case "colgroup":
                case "tbody":
                case "tfoot":
                case "thead":
                  q();
                  return;
              }
              break;
            case 3:
              switch (r) {
                case "table":
                  q();
                  return;
                case "tbody":
                case "tfoot":
                case "thead":
                  L.inTableScope(r) && (L.clearToContext(P), L.pop(), (F = Qe));
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
          Qe(e, r, N, x);
        }
        function mr(e, r, N, x) {
          function q() {
            return L.inTableScope("tr")
              ? (L.clearToContext(Z), L.pop(), (F = Wt), !0)
              : !1;
          }
          switch (e) {
            case 2:
              switch (r) {
                case "th":
                case "td":
                  L.clearToContext(Z), pe(r, N), (F = Qt), ve.insertMarker();
                  return;
                case "caption":
                case "col":
                case "colgroup":
                case "tbody":
                case "tfoot":
                case "thead":
                case "tr":
                  q() && F(e, r, N, x);
                  return;
              }
              break;
            case 3:
              switch (r) {
                case "tr":
                  q();
                  return;
                case "table":
                  q() && F(e, r, N, x);
                  return;
                case "tbody":
                case "tfoot":
                case "thead":
                  L.inTableScope(r) && q() && F(e, r, N, x);
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
          Qe(e, r, N, x);
        }
        function Qt(e, r, N, x) {
          switch (e) {
            case 2:
              switch (r) {
                case "caption":
                case "col":
                case "colgroup":
                case "tbody":
                case "td":
                case "tfoot":
                case "th":
                case "thead":
                case "tr":
                  L.inTableScope("td")
                    ? (Qt(w, "td"), F(e, r, N, x))
                    : L.inTableScope("th") && (Qt(w, "th"), F(e, r, N, x));
                  return;
              }
              break;
            case 3:
              switch (r) {
                case "td":
                case "th":
                  if (!L.inTableScope(r)) return;
                  L.generateImpliedEndTags(),
                    L.popTag(r),
                    ve.clearToMarker(),
                    (F = mr);
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
                  if (!L.inTableScope(r)) return;
                  Qt(w, L.inTableScope("td") ? "td" : "th"), F(e, r, N, x);
                  return;
              }
              break;
          }
          ue(e, r, N, x);
        }
        function _t(e, r, N, x) {
          switch (e) {
            case 1:
              if (kt && ((r = r.replace(Et, "")), r.length === 0)) return;
              it(r);
              return;
            case 4:
              at(r);
              return;
            case 5:
              return;
            case -1:
              ue(e, r, N, x);
              return;
            case 2:
              switch (r) {
                case "html":
                  ue(e, r, N, x);
                  return;
                case "option":
                  L.top instanceof l.HTMLOptionElement && _t(w, r), pe(r, N);
                  return;
                case "optgroup":
                  L.top instanceof l.HTMLOptionElement && _t(w, "option"),
                    L.top instanceof l.HTMLOptGroupElement && _t(w, r),
                    pe(r, N);
                  return;
                case "select":
                  _t(w, r);
                  return;
                case "input":
                case "keygen":
                case "textarea":
                  if (!L.inSelectScope("select")) return;
                  _t(w, "select"), F(e, r, N, x);
                  return;
                case "script":
                case "template":
                  qe(e, r, N, x);
                  return;
              }
              break;
            case 3:
              switch (r) {
                case "optgroup":
                  L.top instanceof l.HTMLOptionElement &&
                    L.elements[L.elements.length - 2] instanceof
                      l.HTMLOptGroupElement &&
                    _t(w, "option"),
                    L.top instanceof l.HTMLOptGroupElement && L.pop();
                  return;
                case "option":
                  L.top instanceof l.HTMLOptionElement && L.pop();
                  return;
                case "select":
                  if (!L.inSelectScope(r)) return;
                  L.popTag(r), hr();
                  return;
                case "template":
                  qe(e, r, N, x);
                  return;
              }
              break;
          }
        }
        function Gr(e, r, N, x) {
          switch (r) {
            case "caption":
            case "table":
            case "tbody":
            case "tfoot":
            case "thead":
            case "tr":
            case "td":
            case "th":
              switch (e) {
                case 2:
                  Gr(w, "select"), F(e, r, N, x);
                  return;
                case 3:
                  L.inTableScope(r) && (Gr(w, "select"), F(e, r, N, x));
                  return;
              }
          }
          _t(e, r, N, x);
        }
        function vn(e, r, N, x) {
          function q(Q) {
            (F = Q), (dt[dt.length - 1] = F), F(e, r, N, x);
          }
          switch (e) {
            case 1:
            case 4:
            case 5:
              ue(e, r, N, x);
              return;
            case -1:
              L.contains("template")
                ? (L.popTag("template"),
                  ve.clearToMarker(),
                  dt.pop(),
                  hr(),
                  F(e, r, N, x))
                : Gt();
              return;
            case 2:
              switch (r) {
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
                  qe(e, r, N, x);
                  return;
                case "caption":
                case "colgroup":
                case "tbody":
                case "tfoot":
                case "thead":
                  q(Qe);
                  return;
                case "col":
                  q(Vr);
                  return;
                case "tr":
                  q(Wt);
                  return;
                case "td":
                case "th":
                  q(mr);
                  return;
              }
              q(ue);
              return;
            case 3:
              switch (r) {
                case "template":
                  qe(e, r, N, x);
                  return;
                default:
                  return;
              }
          }
        }
        function Jn(e, r, N, x) {
          switch (e) {
            case 1:
              if (Se.test(r)) break;
              ue(e, r);
              return;
            case 4:
              L.elements[0]._appendChild(we.createComment(r));
              return;
            case 5:
              return;
            case -1:
              Gt();
              return;
            case 2:
              if (r === "html") {
                ue(e, r, N, x);
                return;
              }
              break;
            case 3:
              if (r === "html") {
                if (jt) return;
                F = qi;
                return;
              }
              break;
          }
          (F = ue), F(e, r, N, x);
        }
        function Tn(e, r, N, x) {
          switch (e) {
            case 1:
              (r = r.replace(Ke, "")), r.length > 0 && it(r);
              return;
            case 4:
              at(r);
              return;
            case 5:
              return;
            case -1:
              Gt();
              return;
            case 2:
              switch (r) {
                case "html":
                  ue(e, r, N, x);
                  return;
                case "frameset":
                  pe(r, N);
                  return;
                case "frame":
                  pe(r, N), L.pop();
                  return;
                case "noframes":
                  qe(e, r, N, x);
                  return;
              }
              break;
            case 3:
              if (r === "frameset") {
                if (jt && L.top instanceof l.HTMLHtmlElement) return;
                L.pop(),
                  !jt && !(L.top instanceof l.HTMLFrameSetElement) && (F = Hi);
                return;
              }
              break;
          }
        }
        function Hi(e, r, N, x) {
          switch (e) {
            case 1:
              (r = r.replace(Ke, "")), r.length > 0 && it(r);
              return;
            case 4:
              at(r);
              return;
            case 5:
              return;
            case -1:
              Gt();
              return;
            case 2:
              switch (r) {
                case "html":
                  ue(e, r, N, x);
                  return;
                case "noframes":
                  qe(e, r, N, x);
                  return;
              }
              break;
            case 3:
              if (r === "html") {
                F = Pi;
                return;
              }
              break;
          }
        }
        function qi(e, r, N, x) {
          switch (e) {
            case 1:
              if (Se.test(r)) break;
              ue(e, r, N, x);
              return;
            case 4:
              we._appendChild(we.createComment(r));
              return;
            case 5:
              ue(e, r, N, x);
              return;
            case -1:
              Gt();
              return;
            case 2:
              if (r === "html") {
                ue(e, r, N, x);
                return;
              }
              break;
          }
          (F = ue), F(e, r, N, x);
        }
        function Pi(e, r, N, x) {
          switch (e) {
            case 1:
              (r = r.replace(Ke, "")), r.length > 0 && ue(e, r, N, x);
              return;
            case 4:
              we._appendChild(we.createComment(r));
              return;
            case 5:
              ue(e, r, N, x);
              return;
            case -1:
              Gt();
              return;
            case 2:
              switch (r) {
                case "html":
                  ue(e, r, N, x);
                  return;
                case "noframes":
                  qe(e, r, N, x);
                  return;
              }
              break;
          }
        }
        function ea(e, r, N, x) {
          function q(Re) {
            for (var je = 0, Je = Re.length; je < Je; je++)
              switch (Re[je][0]) {
                case "color":
                case "face":
                case "size":
                  return !0;
              }
            return !1;
          }
          var Q;
          switch (e) {
            case 1:
              He && Xe.test(r) && (He = !1),
                kt && (r = r.replace(Et, "\uFFFD")),
                it(r);
              return;
            case 4:
              at(r);
              return;
            case 5:
              return;
            case 2:
              switch (r) {
                case "font":
                  if (!q(N)) break;
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
                  if (jt) break;
                  do L.pop(), (Q = L.top);
                  while (Q.namespaceURI !== a.HTML && !ir(Q) && !ut(Q));
                  Pe(e, r, N, x);
                  return;
              }
              (Q = L.elements.length === 1 && jt ? V : L.top),
                Q.namespaceURI === a.MATHML
                  ? sr(N)
                  : Q.namespaceURI === a.SVG && ((r = vr(r)), Pt(N)),
                Kt(N),
                cn(r, N, Q.namespaceURI),
                x && (r === "script" && (Q.namespaceURI, a.SVG), L.pop());
              return;
            case 3:
              if (
                ((Q = L.top),
                r === "script" &&
                  Q.namespaceURI === a.SVG &&
                  Q.localName === "script")
              )
                L.pop();
              else
                for (var fe = L.elements.length - 1, ye = L.elements[fe]; ; ) {
                  if (ye.localName.toLowerCase() === r) {
                    L.popElement(ye);
                    break;
                  }
                  if (((ye = L.elements[--fe]), ye.namespaceURI === a.HTML)) {
                    F(e, r, N, x);
                    break;
                  }
                }
              return;
          }
        }
        return (
          (Lr.testTokenizer = function (e, r, N, x) {
            var q = [];
            switch (r) {
              case "PCDATA state":
                M = Te;
                break;
              case "RCDATA state":
                M = At;
                break;
              case "RAWTEXT state":
                M = dr;
                break;
              case "PLAINTEXT state":
                M = un;
                break;
            }
            if (
              (N && (yr = N),
              (Pe = function (fe, ye, Re, je) {
                switch ((Yt(), fe)) {
                  case 1:
                    q.length > 0 && q[q.length - 1][0] === "Character"
                      ? (q[q.length - 1][1] += ye)
                      : q.push(["Character", ye]);
                    break;
                  case 4:
                    q.push(["Comment", ye]);
                    break;
                  case 5:
                    q.push([
                      "DOCTYPE",
                      ye,
                      Re === void 0 ? null : Re,
                      je === void 0 ? null : je,
                      !nn,
                    ]);
                    break;
                  case 2:
                    for (
                      var Je = Object.create(null), rt = 0;
                      rt < Re.length;
                      rt++
                    ) {
                      var $t = Re[rt];
                      $t.length === 1 ? (Je[$t[0]] = "") : (Je[$t[0]] = $t[1]);
                    }
                    var Ot = ["StartTag", ye, Je];
                    je && Ot.push(!0), q.push(Ot);
                    break;
                  case 3:
                    q.push(["EndTag", ye]);
                    break;
                  case -1:
                    break;
                }
              }),
              !x)
            )
              this.parse(e, !0);
            else {
              for (var Q = 0; Q < e.length; Q++) this.parse(e[Q]);
              this.parse("", !0);
            }
            return q;
          }),
          Lr
        );
      }
    },
  }),
  tn = le({
    "external/npm/node_modules/domino/lib/DOMImplementation.js"(b, v) {
      "use strict";
      v.exports = l;
      var h = In(),
        s = Rn(),
        t = On(),
        a = Be(),
        c = Ln();
      function l(i) {
        this.contextObject = i;
      }
      var f = {
        xml: { "": !0, "1.0": !0, "2.0": !0 },
        core: { "": !0, "2.0": !0 },
        html: { "": !0, "1.0": !0, "2.0": !0 },
        xhtml: { "": !0, "1.0": !0, "2.0": !0 },
      };
      l.prototype = {
        hasFeature: function (E, m) {
          var w = f[(E || "").toLowerCase()];
          return (w && w[m || ""]) || !1;
        },
        createDocumentType: function (E, m, w) {
          return (
            c.isValidQName(E) || a.InvalidCharacterError(),
            new s(this.contextObject, E, m, w)
          );
        },
        createDocument: function (E, m, w) {
          var I = new h(!1, null),
            H;
          return (
            m ? (H = I.createElementNS(E, m)) : (H = null),
            w && I.appendChild(w),
            H && I.appendChild(H),
            E === a.NAMESPACE.HTML
              ? (I._contentType = "application/xhtml+xml")
              : E === a.NAMESPACE.SVG
                ? (I._contentType = "image/svg+xml")
                : (I._contentType = "application/xml"),
            I
          );
        },
        createHTMLDocument: function (E) {
          var m = new h(!0, null);
          m.appendChild(new s(m, "html"));
          var w = m.createElement("html");
          m.appendChild(w);
          var I = m.createElement("head");
          if ((w.appendChild(I), E !== void 0)) {
            var H = m.createElement("title");
            I.appendChild(H), H.appendChild(m.createTextNode(E));
          }
          return w.appendChild(m.createElement("body")), (m.modclock = 1), m;
        },
        mozSetOutputMutationHandler: function (i, E) {
          i.mutationHandler = E;
        },
        mozGetInputMutationHandler: function (i) {
          a.nyi();
        },
        mozHTMLParser: t,
      };
    },
  }),
  ks = le({
    "external/npm/node_modules/domino/lib/Location.js"(b, v) {
      "use strict";
      var h = An(),
        s = Ia();
      v.exports = t;
      function t(a, c) {
        (this._window = a), (this._href = c);
      }
      t.prototype = Object.create(s.prototype, {
        constructor: { value: t },
        href: {
          get: function () {
            return this._href;
          },
          set: function (a) {
            this.assign(a);
          },
        },
        assign: {
          value: function (a) {
            var c = new h(this._href),
              l = c.resolve(a);
            this._href = l;
          },
        },
        replace: {
          value: function (a) {
            this.assign(a);
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
  Ls = le({
    "external/npm/node_modules/domino/lib/NavigatorID.js"(b, v) {
      "use strict";
      var h = Object.create(null, {
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
      v.exports = h;
    },
  }),
  Cs = le({
    "external/npm/node_modules/domino/lib/WindowTimers.js"(b, v) {
      "use strict";
      var h = { setTimeout, clearTimeout, setInterval, clearInterval };
      v.exports = h;
    },
  }),
  Ha = le({
    "external/npm/node_modules/domino/lib/impl.js"(b, v) {
      "use strict";
      var h = Be();
      (b = v.exports =
        {
          CSSStyleDeclaration: Mn(),
          CharacterData: Jr(),
          Comment: Ca(),
          DOMException: wn(),
          DOMImplementation: tn(),
          DOMTokenList: Na(),
          Document: In(),
          DocumentFragment: Da(),
          DocumentType: Rn(),
          Element: Er(),
          HTMLParser: On(),
          NamedNodeMap: Sa(),
          Node: Ve(),
          NodeList: ar(),
          NodeFilter: en(),
          ProcessingInstruction: Aa(),
          Text: La(),
          Window: qa(),
        }),
        h.merge(b, xa()),
        h.merge(b, xn().elements),
        h.merge(b, Oa().elements);
    },
  }),
  qa = le({
    "external/npm/node_modules/domino/lib/Window.js"(b, v) {
      "use strict";
      var h = tn(),
        s = Ea(),
        t = ks(),
        a = Be();
      v.exports = c;
      function c(l) {
        (this.document = l || new h(null).createHTMLDocument("")),
          (this.document._scripting_enabled = !0),
          (this.document.defaultView = this),
          (this.location = new t(
            this,
            this.document._address || "about:blank"
          ));
      }
      (c.prototype = Object.create(s.prototype, {
        console: { value: console },
        history: { value: { back: a.nyi, forward: a.nyi, go: a.nyi } },
        navigator: { value: Ls() },
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
          set: function (l) {
            this._setEventHandler("load", l);
          },
        },
        getComputedStyle: {
          value: function (f) {
            return f.style;
          },
        },
      })),
        a.expose(Cs(), c),
        a.expose(Ha(), c);
    },
  }),
  Ds = le({
    "external/npm/node_modules/domino/lib/index.js"(b) {
      var v = tn(),
        h = On(),
        s = qa(),
        t = Ha();
      (b.createDOMImplementation = function () {
        return new v(null);
      }),
        (b.createDocument = function (a, c) {
          if (a || c) {
            var l = new h();
            return l.parse(a || "", !0), l.document();
          }
          return new v(null).createHTMLDocument("");
        }),
        (b.createIncrementalHTMLParser = function () {
          var a = new h();
          return {
            write: function (c) {
              c.length > 0 &&
                a.parse(c, !1, function () {
                  return !0;
                });
            },
            end: function (c) {
              a.parse(c || "", !0, function () {
                return !0;
              });
            },
            process: function (c) {
              return a.parse("", !1, c);
            },
            document: function () {
              return a.document();
            },
          };
        }),
        (b.createWindow = function (a, c) {
          var l = b.createDocument(a);
          return c !== void 0 && (l._address = c), new t.Window(l);
        }),
        (b.impl = t);
    },
  }),
  ga = Ds();
function As() {
  Object.assign(globalThis, ga.impl),
    (globalThis.KeyboardEvent = ga.impl.Event);
}
As();
