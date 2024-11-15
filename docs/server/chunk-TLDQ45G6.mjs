import "./polyfills.server.mjs";
import { a as rt, b as at, c as De } from "./chunk-5E2SF5JW.mjs";
import {
  a as ke,
  f as tt,
  g as it,
  h as nt,
  m as ye,
  o as st,
  z as ot,
} from "./chunk-FIQ4B6TP.mjs";
import { a as be } from "./chunk-B3LEBR2I.mjs";
import {
  $a as d,
  Ba as O,
  Da as ne,
  Db as me,
  Ga as _e,
  Ha as E,
  Ib as et,
  Jb as ve,
  Kb as j,
  L,
  La as m,
  M as G,
  N as ee,
  Na as N,
  Oa as h,
  P as T,
  Pa as x,
  Qa as Ke,
  R as de,
  Ra as z,
  S as M,
  Sa as Ze,
  Ta as Q,
  Ua as J,
  Va as r,
  W as ue,
  Wa as a,
  X as te,
  Xa as C,
  Y as _,
  Ya as D,
  Za as se,
  _a as f,
  ab as A,
  ba as he,
  bb as F,
  ca as y,
  cb as R,
  da as b,
  db as I,
  ea as ie,
  eb as p,
  f as Qe,
  fb as S,
  hb as Ae,
  i as Je,
  ia as $,
  ib as Fe,
  jb as Re,
  kb as k,
  la as W,
  lb as fe,
  n as qe,
  nb as H,
  ob as ge,
  pb as Ie,
  qb as P,
  t as Ye,
  ub as Xe,
  va as pe,
  ya as c,
  za as u,
} from "./chunk-INGTML2I.mjs";
import { a as v, b as w } from "./chunk-5XUXGTUW.mjs";
var gt = (() => {
    class t {
      constructor(e, n) {
        (this._renderer = e),
          (this._elementRef = n),
          (this.onChange = (s) => {}),
          (this.onTouched = () => {});
      }
      setProperty(e, n) {
        this._renderer.setProperty(this._elementRef.nativeElement, e, n);
      }
      registerOnTouched(e) {
        this.onTouched = e;
      }
      registerOnChange(e) {
        this.onChange = e;
      }
      setDisabledState(e) {
        this.setProperty("disabled", e);
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)(u(ne), u(W));
        };
      }
      static {
        this.ɵdir = _({ type: t });
      }
    }
    return t;
  })(),
  He = (() => {
    class t extends gt {
      static {
        this.ɵfac = (() => {
          let e;
          return function (s) {
            return (e || (e = ie(t)))(s || t);
          };
        })();
      }
      static {
        this.ɵdir = _({ type: t, features: [E] });
      }
    }
    return t;
  })(),
  Oe = new T("");
var Bt = { provide: Oe, useExisting: L(() => Ee), multi: !0 };
function Gt() {
  let t = ke() ? ke().getUserAgent() : "";
  return /android (\d+)/.test(t.toLowerCase());
}
var Ht = new T(""),
  Ee = (() => {
    class t extends gt {
      constructor(e, n, s) {
        super(e, n),
          (this._compositionMode = s),
          (this._composing = !1),
          this._compositionMode == null && (this._compositionMode = !Gt());
      }
      writeValue(e) {
        let n = e ?? "";
        this.setProperty("value", n);
      }
      _handleInput(e) {
        (!this._compositionMode ||
          (this._compositionMode && !this._composing)) &&
          this.onChange(e);
      }
      _compositionStart() {
        this._composing = !0;
      }
      _compositionEnd(e) {
        (this._composing = !1), this._compositionMode && this.onChange(e);
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)(u(ne), u(W), u(Ht, 8));
        };
      }
      static {
        this.ɵdir = _({
          type: t,
          selectors: [
            ["input", "formControlName", "", 3, "type", "checkbox"],
            ["textarea", "formControlName", ""],
            ["input", "formControl", "", 3, "type", "checkbox"],
            ["textarea", "formControl", ""],
            ["input", "ngModel", "", 3, "type", "checkbox"],
            ["textarea", "ngModel", ""],
            ["", "ngDefaultControl", ""],
          ],
          hostBindings: function (n, s) {
            n & 1 &&
              f("input", function (l) {
                return s._handleInput(l.target.value);
              })("blur", function () {
                return s.onTouched();
              })("compositionstart", function () {
                return s._compositionStart();
              })("compositionend", function (l) {
                return s._compositionEnd(l.target.value);
              });
          },
          features: [k([Bt]), E],
        });
      }
    }
    return t;
  })();
var jt = new T(""),
  Ut = new T("");
function mt(t) {
  return t != null;
}
function vt(t) {
  return Xe(t) ? Je(t) : t;
}
function yt(t) {
  let i = {};
  return (
    t.forEach((e) => {
      i = e != null ? v(v({}, i), e) : i;
    }),
    Object.keys(i).length === 0 ? null : i
  );
}
function bt(t, i) {
  return i.map((e) => e(t));
}
function Lt(t) {
  return !t.validate;
}
function Dt(t) {
  return t.map((i) => (Lt(i) ? i : (e) => i.validate(e)));
}
function $t(t) {
  if (!t) return null;
  let i = t.filter(mt);
  return i.length == 0
    ? null
    : function (e) {
        return yt(bt(e, i));
      };
}
function wt(t) {
  return t != null ? $t(Dt(t)) : null;
}
function Wt(t) {
  if (!t) return null;
  let i = t.filter(mt);
  return i.length == 0
    ? null
    : function (e) {
        let n = bt(e, i).map(vt);
        return Ye(n).pipe(qe(yt));
      };
}
function Ct(t) {
  return t != null ? Wt(Dt(t)) : null;
}
function lt(t, i) {
  return t === null ? [i] : Array.isArray(t) ? [...t, i] : [t, i];
}
function zt(t) {
  return t._rawValidators;
}
function Qt(t) {
  return t._rawAsyncValidators;
}
function Pe(t) {
  return t ? (Array.isArray(t) ? t : [t]) : [];
}
function Ce(t, i) {
  return Array.isArray(t) ? t.includes(i) : t === i;
}
function ct(t, i) {
  let e = Pe(i);
  return (
    Pe(t).forEach((s) => {
      Ce(e, s) || e.push(s);
    }),
    e
  );
}
function dt(t, i) {
  return Pe(i).filter((e) => !Ce(t, e));
}
var Me = class {
    constructor() {
      (this._rawValidators = []),
        (this._rawAsyncValidators = []),
        (this._onDestroyCallbacks = []);
    }
    get value() {
      return this.control ? this.control.value : null;
    }
    get valid() {
      return this.control ? this.control.valid : null;
    }
    get invalid() {
      return this.control ? this.control.invalid : null;
    }
    get pending() {
      return this.control ? this.control.pending : null;
    }
    get disabled() {
      return this.control ? this.control.disabled : null;
    }
    get enabled() {
      return this.control ? this.control.enabled : null;
    }
    get errors() {
      return this.control ? this.control.errors : null;
    }
    get pristine() {
      return this.control ? this.control.pristine : null;
    }
    get dirty() {
      return this.control ? this.control.dirty : null;
    }
    get touched() {
      return this.control ? this.control.touched : null;
    }
    get status() {
      return this.control ? this.control.status : null;
    }
    get untouched() {
      return this.control ? this.control.untouched : null;
    }
    get statusChanges() {
      return this.control ? this.control.statusChanges : null;
    }
    get valueChanges() {
      return this.control ? this.control.valueChanges : null;
    }
    get path() {
      return null;
    }
    _setValidators(i) {
      (this._rawValidators = i || []),
        (this._composedValidatorFn = wt(this._rawValidators));
    }
    _setAsyncValidators(i) {
      (this._rawAsyncValidators = i || []),
        (this._composedAsyncValidatorFn = Ct(this._rawAsyncValidators));
    }
    get validator() {
      return this._composedValidatorFn || null;
    }
    get asyncValidator() {
      return this._composedAsyncValidatorFn || null;
    }
    _registerOnDestroy(i) {
      this._onDestroyCallbacks.push(i);
    }
    _invokeOnDestroyCallbacks() {
      this._onDestroyCallbacks.forEach((i) => i()),
        (this._onDestroyCallbacks = []);
    }
    reset(i = void 0) {
      this.control && this.control.reset(i);
    }
    hasError(i, e) {
      return this.control ? this.control.hasError(i, e) : !1;
    }
    getError(i, e) {
      return this.control ? this.control.getError(i, e) : null;
    }
  },
  Ve = class extends Me {
    get formDirective() {
      return null;
    }
    get path() {
      return null;
    }
  },
  ce = class extends Me {
    constructor() {
      super(...arguments),
        (this._parent = null),
        (this.name = null),
        (this.valueAccessor = null);
    }
  },
  Be = class {
    constructor(i) {
      this._cd = i;
    }
    get isTouched() {
      return this._cd?.control?._touched?.(), !!this._cd?.control?.touched;
    }
    get isUntouched() {
      return !!this._cd?.control?.untouched;
    }
    get isPristine() {
      return this._cd?.control?._pristine?.(), !!this._cd?.control?.pristine;
    }
    get isDirty() {
      return !!this._cd?.control?.dirty;
    }
    get isValid() {
      return this._cd?.control?._status?.(), !!this._cd?.control?.valid;
    }
    get isInvalid() {
      return !!this._cd?.control?.invalid;
    }
    get isPending() {
      return !!this._cd?.control?.pending;
    }
    get isSubmitted() {
      return this._cd?._submitted?.(), !!this._cd?.submitted;
    }
  },
  Jt = {
    "[class.ng-untouched]": "isUntouched",
    "[class.ng-touched]": "isTouched",
    "[class.ng-pristine]": "isPristine",
    "[class.ng-dirty]": "isDirty",
    "[class.ng-valid]": "isValid",
    "[class.ng-invalid]": "isInvalid",
    "[class.ng-pending]": "isPending",
  },
  Fn = w(v({}, Jt), { "[class.ng-submitted]": "isSubmitted" }),
  Mt = (() => {
    class t extends Be {
      constructor(e) {
        super(e);
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)(u(ce, 2));
        };
      }
      static {
        this.ɵdir = _({
          type: t,
          selectors: [
            ["", "formControlName", ""],
            ["", "ngModel", ""],
            ["", "formControl", ""],
          ],
          hostVars: 14,
          hostBindings: function (n, s) {
            n & 2 &&
              x("ng-untouched", s.isUntouched)("ng-touched", s.isTouched)(
                "ng-pristine",
                s.isPristine
              )("ng-dirty", s.isDirty)("ng-valid", s.isValid)(
                "ng-invalid",
                s.isInvalid
              )("ng-pending", s.isPending);
          },
          features: [E],
        });
      }
    }
    return t;
  })();
var oe = "VALID",
  we = "INVALID",
  q = "PENDING",
  re = "DISABLED",
  K = class {},
  Se = class extends K {
    constructor(i, e) {
      super(), (this.value = i), (this.source = e);
    }
  },
  ae = class extends K {
    constructor(i, e) {
      super(), (this.pristine = i), (this.source = e);
    }
  },
  le = class extends K {
    constructor(i, e) {
      super(), (this.touched = i), (this.source = e);
    }
  },
  Y = class extends K {
    constructor(i, e) {
      super(), (this.status = i), (this.source = e);
    }
  };
function qt(t) {
  return (Ne(t) ? t.validators : t) || null;
}
function Yt(t) {
  return Array.isArray(t) ? wt(t) : t || null;
}
function Kt(t, i) {
  return (Ne(i) ? i.asyncValidators : t) || null;
}
function Zt(t) {
  return Array.isArray(t) ? Ct(t) : t || null;
}
function Ne(t) {
  return t != null && !Array.isArray(t) && typeof t == "object";
}
var Ge = class {
  constructor(i, e) {
    (this._pendingDirty = !1),
      (this._hasOwnPendingAsyncValidator = null),
      (this._pendingTouched = !1),
      (this._onCollectionChange = () => {}),
      (this._parent = null),
      (this._status = ve(() => this.statusReactive())),
      (this.statusReactive = _e(void 0)),
      (this._pristine = ve(() => this.pristineReactive())),
      (this.pristineReactive = _e(!0)),
      (this._touched = ve(() => this.touchedReactive())),
      (this.touchedReactive = _e(!1)),
      (this._events = new Qe()),
      (this.events = this._events.asObservable()),
      (this._onDisabledChange = []),
      this._assignValidators(i),
      this._assignAsyncValidators(e);
  }
  get validator() {
    return this._composedValidatorFn;
  }
  set validator(i) {
    this._rawValidators = this._composedValidatorFn = i;
  }
  get asyncValidator() {
    return this._composedAsyncValidatorFn;
  }
  set asyncValidator(i) {
    this._rawAsyncValidators = this._composedAsyncValidatorFn = i;
  }
  get parent() {
    return this._parent;
  }
  get status() {
    return j(this.statusReactive);
  }
  set status(i) {
    j(() => this.statusReactive.set(i));
  }
  get valid() {
    return this.status === oe;
  }
  get invalid() {
    return this.status === we;
  }
  get pending() {
    return this.status == q;
  }
  get disabled() {
    return this.status === re;
  }
  get enabled() {
    return this.status !== re;
  }
  get pristine() {
    return j(this.pristineReactive);
  }
  set pristine(i) {
    j(() => this.pristineReactive.set(i));
  }
  get dirty() {
    return !this.pristine;
  }
  get touched() {
    return j(this.touchedReactive);
  }
  set touched(i) {
    j(() => this.touchedReactive.set(i));
  }
  get untouched() {
    return !this.touched;
  }
  get updateOn() {
    return this._updateOn
      ? this._updateOn
      : this.parent
        ? this.parent.updateOn
        : "change";
  }
  setValidators(i) {
    this._assignValidators(i);
  }
  setAsyncValidators(i) {
    this._assignAsyncValidators(i);
  }
  addValidators(i) {
    this.setValidators(ct(i, this._rawValidators));
  }
  addAsyncValidators(i) {
    this.setAsyncValidators(ct(i, this._rawAsyncValidators));
  }
  removeValidators(i) {
    this.setValidators(dt(i, this._rawValidators));
  }
  removeAsyncValidators(i) {
    this.setAsyncValidators(dt(i, this._rawAsyncValidators));
  }
  hasValidator(i) {
    return Ce(this._rawValidators, i);
  }
  hasAsyncValidator(i) {
    return Ce(this._rawAsyncValidators, i);
  }
  clearValidators() {
    this.validator = null;
  }
  clearAsyncValidators() {
    this.asyncValidator = null;
  }
  markAsTouched(i = {}) {
    let e = this.touched === !1;
    this.touched = !0;
    let n = i.sourceControl ?? this;
    this._parent &&
      !i.onlySelf &&
      this._parent.markAsTouched(w(v({}, i), { sourceControl: n })),
      e && i.emitEvent !== !1 && this._events.next(new le(!0, n));
  }
  markAllAsTouched(i = {}) {
    this.markAsTouched({
      onlySelf: !0,
      emitEvent: i.emitEvent,
      sourceControl: this,
    }),
      this._forEachChild((e) => e.markAllAsTouched(i));
  }
  markAsUntouched(i = {}) {
    let e = this.touched === !0;
    (this.touched = !1), (this._pendingTouched = !1);
    let n = i.sourceControl ?? this;
    this._forEachChild((s) => {
      s.markAsUntouched({
        onlySelf: !0,
        emitEvent: i.emitEvent,
        sourceControl: n,
      });
    }),
      this._parent && !i.onlySelf && this._parent._updateTouched(i, n),
      e && i.emitEvent !== !1 && this._events.next(new le(!1, n));
  }
  markAsDirty(i = {}) {
    let e = this.pristine === !0;
    this.pristine = !1;
    let n = i.sourceControl ?? this;
    this._parent &&
      !i.onlySelf &&
      this._parent.markAsDirty(w(v({}, i), { sourceControl: n })),
      e && i.emitEvent !== !1 && this._events.next(new ae(!1, n));
  }
  markAsPristine(i = {}) {
    let e = this.pristine === !1;
    (this.pristine = !0), (this._pendingDirty = !1);
    let n = i.sourceControl ?? this;
    this._forEachChild((s) => {
      s.markAsPristine({ onlySelf: !0, emitEvent: i.emitEvent });
    }),
      this._parent && !i.onlySelf && this._parent._updatePristine(i, n),
      e && i.emitEvent !== !1 && this._events.next(new ae(!0, n));
  }
  markAsPending(i = {}) {
    this.status = q;
    let e = i.sourceControl ?? this;
    i.emitEvent !== !1 &&
      (this._events.next(new Y(this.status, e)),
      this.statusChanges.emit(this.status)),
      this._parent &&
        !i.onlySelf &&
        this._parent.markAsPending(w(v({}, i), { sourceControl: e }));
  }
  disable(i = {}) {
    let e = this._parentMarkedDirty(i.onlySelf);
    (this.status = re),
      (this.errors = null),
      this._forEachChild((s) => {
        s.disable(w(v({}, i), { onlySelf: !0 }));
      }),
      this._updateValue();
    let n = i.sourceControl ?? this;
    i.emitEvent !== !1 &&
      (this._events.next(new Se(this.value, n)),
      this._events.next(new Y(this.status, n)),
      this.valueChanges.emit(this.value),
      this.statusChanges.emit(this.status)),
      this._updateAncestors(w(v({}, i), { skipPristineCheck: e }), this),
      this._onDisabledChange.forEach((s) => s(!0));
  }
  enable(i = {}) {
    let e = this._parentMarkedDirty(i.onlySelf);
    (this.status = oe),
      this._forEachChild((n) => {
        n.enable(w(v({}, i), { onlySelf: !0 }));
      }),
      this.updateValueAndValidity({ onlySelf: !0, emitEvent: i.emitEvent }),
      this._updateAncestors(w(v({}, i), { skipPristineCheck: e }), this),
      this._onDisabledChange.forEach((n) => n(!1));
  }
  _updateAncestors(i, e) {
    this._parent &&
      !i.onlySelf &&
      (this._parent.updateValueAndValidity(i),
      i.skipPristineCheck || this._parent._updatePristine({}, e),
      this._parent._updateTouched({}, e));
  }
  setParent(i) {
    this._parent = i;
  }
  getRawValue() {
    return this.value;
  }
  updateValueAndValidity(i = {}) {
    if ((this._setInitialStatus(), this._updateValue(), this.enabled)) {
      let n = this._cancelExistingSubscription();
      (this.errors = this._runValidator()),
        (this.status = this._calculateStatus()),
        (this.status === oe || this.status === q) &&
          this._runAsyncValidator(n, i.emitEvent);
    }
    let e = i.sourceControl ?? this;
    i.emitEvent !== !1 &&
      (this._events.next(new Se(this.value, e)),
      this._events.next(new Y(this.status, e)),
      this.valueChanges.emit(this.value),
      this.statusChanges.emit(this.status)),
      this._parent &&
        !i.onlySelf &&
        this._parent.updateValueAndValidity(w(v({}, i), { sourceControl: e }));
  }
  _updateTreeValidity(i = { emitEvent: !0 }) {
    this._forEachChild((e) => e._updateTreeValidity(i)),
      this.updateValueAndValidity({ onlySelf: !0, emitEvent: i.emitEvent });
  }
  _setInitialStatus() {
    this.status = this._allControlsDisabled() ? re : oe;
  }
  _runValidator() {
    return this.validator ? this.validator(this) : null;
  }
  _runAsyncValidator(i, e) {
    if (this.asyncValidator) {
      (this.status = q),
        (this._hasOwnPendingAsyncValidator = { emitEvent: e !== !1 });
      let n = vt(this.asyncValidator(this));
      this._asyncValidationSubscription = n.subscribe((s) => {
        (this._hasOwnPendingAsyncValidator = null),
          this.setErrors(s, { emitEvent: e, shouldHaveEmitted: i });
      });
    }
  }
  _cancelExistingSubscription() {
    if (this._asyncValidationSubscription) {
      this._asyncValidationSubscription.unsubscribe();
      let i = this._hasOwnPendingAsyncValidator?.emitEvent ?? !1;
      return (this._hasOwnPendingAsyncValidator = null), i;
    }
    return !1;
  }
  setErrors(i, e = {}) {
    (this.errors = i),
      this._updateControlsErrors(e.emitEvent !== !1, this, e.shouldHaveEmitted);
  }
  get(i) {
    let e = i;
    return e == null || (Array.isArray(e) || (e = e.split(".")), e.length === 0)
      ? null
      : e.reduce((n, s) => n && n._find(s), this);
  }
  getError(i, e) {
    let n = e ? this.get(e) : this;
    return n && n.errors ? n.errors[i] : null;
  }
  hasError(i, e) {
    return !!this.getError(i, e);
  }
  get root() {
    let i = this;
    for (; i._parent; ) i = i._parent;
    return i;
  }
  _updateControlsErrors(i, e, n) {
    (this.status = this._calculateStatus()),
      i && this.statusChanges.emit(this.status),
      (i || n) && this._events.next(new Y(this.status, e)),
      this._parent && this._parent._updateControlsErrors(i, e, n);
  }
  _initObservables() {
    (this.valueChanges = new $()), (this.statusChanges = new $());
  }
  _calculateStatus() {
    return this._allControlsDisabled()
      ? re
      : this.errors
        ? we
        : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(q)
          ? q
          : this._anyControlsHaveStatus(we)
            ? we
            : oe;
  }
  _anyControlsHaveStatus(i) {
    return this._anyControls((e) => e.status === i);
  }
  _anyControlsDirty() {
    return this._anyControls((i) => i.dirty);
  }
  _anyControlsTouched() {
    return this._anyControls((i) => i.touched);
  }
  _updatePristine(i, e) {
    let n = !this._anyControlsDirty(),
      s = this.pristine !== n;
    (this.pristine = n),
      this._parent && !i.onlySelf && this._parent._updatePristine(i, e),
      s && this._events.next(new ae(this.pristine, e));
  }
  _updateTouched(i = {}, e) {
    (this.touched = this._anyControlsTouched()),
      this._events.next(new le(this.touched, e)),
      this._parent && !i.onlySelf && this._parent._updateTouched(i, e);
  }
  _registerOnCollectionChange(i) {
    this._onCollectionChange = i;
  }
  _setUpdateStrategy(i) {
    Ne(i) && i.updateOn != null && (this._updateOn = i.updateOn);
  }
  _parentMarkedDirty(i) {
    let e = this._parent && this._parent.dirty;
    return !i && !!e && !this._parent._anyControlsDirty();
  }
  _find(i) {
    return null;
  }
  _assignValidators(i) {
    (this._rawValidators = Array.isArray(i) ? i.slice() : i),
      (this._composedValidatorFn = Yt(this._rawValidators));
  }
  _assignAsyncValidators(i) {
    (this._rawAsyncValidators = Array.isArray(i) ? i.slice() : i),
      (this._composedAsyncValidatorFn = Zt(this._rawAsyncValidators));
  }
};
var St = new T("CallSetDisabledState", {
    providedIn: "root",
    factory: () => je,
  }),
  je = "always";
function Xt(t, i) {
  return [...i.path, t];
}
function ei(t, i, e = je) {
  ii(t, i),
    i.valueAccessor.writeValue(t.value),
    (t.disabled || e === "always") &&
      i.valueAccessor.setDisabledState?.(t.disabled),
    ni(t, i),
    oi(t, i),
    si(t, i),
    ti(t, i);
}
function ut(t, i) {
  t.forEach((e) => {
    e.registerOnValidatorChange && e.registerOnValidatorChange(i);
  });
}
function ti(t, i) {
  if (i.valueAccessor.setDisabledState) {
    let e = (n) => {
      i.valueAccessor.setDisabledState(n);
    };
    t.registerOnDisabledChange(e),
      i._registerOnDestroy(() => {
        t._unregisterOnDisabledChange(e);
      });
  }
}
function ii(t, i) {
  let e = zt(t);
  i.validator !== null
    ? t.setValidators(lt(e, i.validator))
    : typeof e == "function" && t.setValidators([e]);
  let n = Qt(t);
  i.asyncValidator !== null
    ? t.setAsyncValidators(lt(n, i.asyncValidator))
    : typeof n == "function" && t.setAsyncValidators([n]);
  let s = () => t.updateValueAndValidity();
  ut(i._rawValidators, s), ut(i._rawAsyncValidators, s);
}
function ni(t, i) {
  i.valueAccessor.registerOnChange((e) => {
    (t._pendingValue = e),
      (t._pendingChange = !0),
      (t._pendingDirty = !0),
      t.updateOn === "change" && Tt(t, i);
  });
}
function si(t, i) {
  i.valueAccessor.registerOnTouched(() => {
    (t._pendingTouched = !0),
      t.updateOn === "blur" && t._pendingChange && Tt(t, i),
      t.updateOn !== "submit" && t.markAsTouched();
  });
}
function Tt(t, i) {
  t._pendingDirty && t.markAsDirty(),
    t.setValue(t._pendingValue, { emitModelToViewChange: !1 }),
    i.viewToModelUpdate(t._pendingValue),
    (t._pendingChange = !1);
}
function oi(t, i) {
  let e = (n, s) => {
    i.valueAccessor.writeValue(n), s && i.viewToModelUpdate(n);
  };
  t.registerOnChange(e),
    i._registerOnDestroy(() => {
      t._unregisterOnChange(e);
    });
}
function ri(t, i) {
  if (!t.hasOwnProperty("model")) return !1;
  let e = t.model;
  return e.isFirstChange() ? !0 : !Object.is(i, e.currentValue);
}
function ai(t) {
  return Object.getPrototypeOf(t.constructor) === He;
}
function li(t, i) {
  if (!i) return null;
  Array.isArray(i);
  let e, n, s;
  return (
    i.forEach((o) => {
      o.constructor === Ee ? (e = o) : ai(o) ? (n = o) : (s = o);
    }),
    s || n || e || null
  );
}
function ht(t, i) {
  let e = t.indexOf(i);
  e > -1 && t.splice(e, 1);
}
function pt(t) {
  return (
    typeof t == "object" &&
    t !== null &&
    Object.keys(t).length === 2 &&
    "value" in t &&
    "disabled" in t
  );
}
var ci = class extends Ge {
  constructor(i = null, e, n) {
    super(qt(e), Kt(n, e)),
      (this.defaultValue = null),
      (this._onChange = []),
      (this._pendingChange = !1),
      this._applyFormState(i),
      this._setUpdateStrategy(e),
      this._initObservables(),
      this.updateValueAndValidity({
        onlySelf: !0,
        emitEvent: !!this.asyncValidator,
      }),
      Ne(e) &&
        (e.nonNullable || e.initialValueIsDefault) &&
        (pt(i) ? (this.defaultValue = i.value) : (this.defaultValue = i));
  }
  setValue(i, e = {}) {
    (this.value = this._pendingValue = i),
      this._onChange.length &&
        e.emitModelToViewChange !== !1 &&
        this._onChange.forEach((n) =>
          n(this.value, e.emitViewToModelChange !== !1)
        ),
      this.updateValueAndValidity(e);
  }
  patchValue(i, e = {}) {
    this.setValue(i, e);
  }
  reset(i = this.defaultValue, e = {}) {
    this._applyFormState(i),
      this.markAsPristine(e),
      this.markAsUntouched(e),
      this.setValue(this.value, e),
      (this._pendingChange = !1);
  }
  _updateValue() {}
  _anyControls(i) {
    return !1;
  }
  _allControlsDisabled() {
    return this.disabled;
  }
  registerOnChange(i) {
    this._onChange.push(i);
  }
  _unregisterOnChange(i) {
    ht(this._onChange, i);
  }
  registerOnDisabledChange(i) {
    this._onDisabledChange.push(i);
  }
  _unregisterOnDisabledChange(i) {
    ht(this._onDisabledChange, i);
  }
  _forEachChild(i) {}
  _syncPendingControls() {
    return this.updateOn === "submit" &&
      (this._pendingDirty && this.markAsDirty(),
      this._pendingTouched && this.markAsTouched(),
      this._pendingChange)
      ? (this.setValue(this._pendingValue, {
          onlySelf: !0,
          emitModelToViewChange: !1,
        }),
        !0)
      : !1;
  }
  _applyFormState(i) {
    pt(i)
      ? ((this.value = this._pendingValue = i.value),
        i.disabled
          ? this.disable({ onlySelf: !0, emitEvent: !1 })
          : this.enable({ onlySelf: !0, emitEvent: !1 }))
      : (this.value = this._pendingValue = i);
  }
};
var di = { provide: ce, useExisting: L(() => Ue) },
  _t = Promise.resolve(),
  Ue = (() => {
    class t extends ce {
      constructor(e, n, s, o, l, g) {
        super(),
          (this._changeDetectorRef = l),
          (this.callSetDisabledState = g),
          (this.control = new ci()),
          (this._registered = !1),
          (this.name = ""),
          (this.update = new $()),
          (this._parent = e),
          this._setValidators(n),
          this._setAsyncValidators(s),
          (this.valueAccessor = li(this, o));
      }
      ngOnChanges(e) {
        if ((this._checkForErrors(), !this._registered || "name" in e)) {
          if (this._registered && (this._checkName(), this.formDirective)) {
            let n = e.name.previousValue;
            this.formDirective.removeControl({
              name: n,
              path: this._getPath(n),
            });
          }
          this._setUpControl();
        }
        "isDisabled" in e && this._updateDisabled(e),
          ri(e, this.viewModel) &&
            (this._updateValue(this.model), (this.viewModel = this.model));
      }
      ngOnDestroy() {
        this.formDirective && this.formDirective.removeControl(this);
      }
      get path() {
        return this._getPath(this.name);
      }
      get formDirective() {
        return this._parent ? this._parent.formDirective : null;
      }
      viewToModelUpdate(e) {
        (this.viewModel = e), this.update.emit(e);
      }
      _setUpControl() {
        this._setUpdateStrategy(),
          this._isStandalone()
            ? this._setUpStandalone()
            : this.formDirective.addControl(this),
          (this._registered = !0);
      }
      _setUpdateStrategy() {
        this.options &&
          this.options.updateOn != null &&
          (this.control._updateOn = this.options.updateOn);
      }
      _isStandalone() {
        return !this._parent || !!(this.options && this.options.standalone);
      }
      _setUpStandalone() {
        ei(this.control, this, this.callSetDisabledState),
          this.control.updateValueAndValidity({ emitEvent: !1 });
      }
      _checkForErrors() {
        this._isStandalone() || this._checkParentType(), this._checkName();
      }
      _checkParentType() {}
      _checkName() {
        this.options && this.options.name && (this.name = this.options.name),
          !this._isStandalone() && this.name;
      }
      _updateValue(e) {
        _t.then(() => {
          this.control.setValue(e, { emitViewToModelChange: !1 }),
            this._changeDetectorRef?.markForCheck();
        });
      }
      _updateDisabled(e) {
        let n = e.isDisabled.currentValue,
          s = n !== 0 && et(n);
        _t.then(() => {
          s && !this.control.disabled
            ? this.control.disable()
            : !s && this.control.disabled && this.control.enable(),
            this._changeDetectorRef?.markForCheck();
        });
      }
      _getPath(e) {
        return this._parent ? Xt(e, this._parent) : [e];
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)(
            u(Ve, 9),
            u(jt, 10),
            u(Ut, 10),
            u(Oe, 10),
            u(me, 8),
            u(St, 8)
          );
        };
      }
      static {
        this.ɵdir = _({
          type: t,
          selectors: [
            ["", "ngModel", "", 3, "formControlName", "", 3, "formControl", ""],
          ],
          inputs: {
            name: "name",
            isDisabled: [0, "disabled", "isDisabled"],
            model: [0, "ngModel", "model"],
            options: [0, "ngModelOptions", "options"],
          },
          outputs: { update: "ngModelChange" },
          exportAs: ["ngModel"],
          features: [k([di]), E, he],
        });
      }
    }
    return t;
  })();
var ui = { provide: Oe, useExisting: L(() => Et), multi: !0 };
function Ot(t, i) {
  return t == null
    ? `${i}`
    : (i && typeof i == "object" && (i = "Object"), `${t}: ${i}`.slice(0, 50));
}
function hi(t) {
  return t.split(":")[0];
}
var Et = (() => {
    class t extends He {
      constructor() {
        super(...arguments),
          (this._optionMap = new Map()),
          (this._idCounter = 0),
          (this._compareWith = Object.is);
      }
      set compareWith(e) {
        this._compareWith = e;
      }
      writeValue(e) {
        this.value = e;
        let n = this._getOptionId(e),
          s = Ot(n, e);
        this.setProperty("value", s);
      }
      registerOnChange(e) {
        this.onChange = (n) => {
          (this.value = this._getOptionValue(n)), e(this.value);
        };
      }
      _registerOption() {
        return (this._idCounter++).toString();
      }
      _getOptionId(e) {
        for (let n of this._optionMap.keys())
          if (this._compareWith(this._optionMap.get(n), e)) return n;
        return null;
      }
      _getOptionValue(e) {
        let n = hi(e);
        return this._optionMap.has(n) ? this._optionMap.get(n) : e;
      }
      static {
        this.ɵfac = (() => {
          let e;
          return function (s) {
            return (e || (e = ie(t)))(s || t);
          };
        })();
      }
      static {
        this.ɵdir = _({
          type: t,
          selectors: [
            ["select", "formControlName", "", 3, "multiple", ""],
            ["select", "formControl", "", 3, "multiple", ""],
            ["select", "ngModel", "", 3, "multiple", ""],
          ],
          hostBindings: function (n, s) {
            n & 1 &&
              f("change", function (l) {
                return s.onChange(l.target.value);
              })("blur", function () {
                return s.onTouched();
              });
          },
          inputs: { compareWith: "compareWith" },
          features: [k([ui]), E],
        });
      }
    }
    return t;
  })(),
  Nt = (() => {
    class t {
      constructor(e, n, s) {
        (this._element = e),
          (this._renderer = n),
          (this._select = s),
          this._select && (this.id = this._select._registerOption());
      }
      set ngValue(e) {
        this._select != null &&
          (this._select._optionMap.set(this.id, e),
          this._setElementValue(Ot(this.id, e)),
          this._select.writeValue(this._select.value));
      }
      set value(e) {
        this._setElementValue(e),
          this._select && this._select.writeValue(this._select.value);
      }
      _setElementValue(e) {
        this._renderer.setProperty(this._element.nativeElement, "value", e);
      }
      ngOnDestroy() {
        this._select &&
          (this._select._optionMap.delete(this.id),
          this._select.writeValue(this._select.value));
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)(u(W), u(ne), u(Et, 9));
        };
      }
      static {
        this.ɵdir = _({
          type: t,
          selectors: [["option"]],
          inputs: { ngValue: "ngValue", value: "value" },
        });
      }
    }
    return t;
  })(),
  pi = { provide: Oe, useExisting: L(() => xt), multi: !0 };
function ft(t, i) {
  return t == null
    ? `${i}`
    : (typeof i == "string" && (i = `'${i}'`),
      i && typeof i == "object" && (i = "Object"),
      `${t}: ${i}`.slice(0, 50));
}
function _i(t) {
  return t.split(":")[0];
}
var xt = (() => {
    class t extends He {
      constructor() {
        super(...arguments),
          (this._optionMap = new Map()),
          (this._idCounter = 0),
          (this._compareWith = Object.is);
      }
      set compareWith(e) {
        this._compareWith = e;
      }
      writeValue(e) {
        this.value = e;
        let n;
        if (Array.isArray(e)) {
          let s = e.map((o) => this._getOptionId(o));
          n = (o, l) => {
            o._setSelected(s.indexOf(l.toString()) > -1);
          };
        } else
          n = (s, o) => {
            s._setSelected(!1);
          };
        this._optionMap.forEach(n);
      }
      registerOnChange(e) {
        this.onChange = (n) => {
          let s = [],
            o = n.selectedOptions;
          if (o !== void 0) {
            let l = o;
            for (let g = 0; g < l.length; g++) {
              let V = l[g],
                U = this._getOptionValue(V.value);
              s.push(U);
            }
          } else {
            let l = n.options;
            for (let g = 0; g < l.length; g++) {
              let V = l[g];
              if (V.selected) {
                let U = this._getOptionValue(V.value);
                s.push(U);
              }
            }
          }
          (this.value = s), e(s);
        };
      }
      _registerOption(e) {
        let n = (this._idCounter++).toString();
        return this._optionMap.set(n, e), n;
      }
      _getOptionId(e) {
        for (let n of this._optionMap.keys())
          if (this._compareWith(this._optionMap.get(n)._value, e)) return n;
        return null;
      }
      _getOptionValue(e) {
        let n = _i(e);
        return this._optionMap.has(n) ? this._optionMap.get(n)._value : e;
      }
      static {
        this.ɵfac = (() => {
          let e;
          return function (s) {
            return (e || (e = ie(t)))(s || t);
          };
        })();
      }
      static {
        this.ɵdir = _({
          type: t,
          selectors: [
            ["select", "multiple", "", "formControlName", ""],
            ["select", "multiple", "", "formControl", ""],
            ["select", "multiple", "", "ngModel", ""],
          ],
          hostBindings: function (n, s) {
            n & 1 &&
              f("change", function (l) {
                return s.onChange(l.target);
              })("blur", function () {
                return s.onTouched();
              });
          },
          inputs: { compareWith: "compareWith" },
          features: [k([pi]), E],
        });
      }
    }
    return t;
  })(),
  At = (() => {
    class t {
      constructor(e, n, s) {
        (this._element = e),
          (this._renderer = n),
          (this._select = s),
          this._select && (this.id = this._select._registerOption(this));
      }
      set ngValue(e) {
        this._select != null &&
          ((this._value = e),
          this._setElementValue(ft(this.id, e)),
          this._select.writeValue(this._select.value));
      }
      set value(e) {
        this._select
          ? ((this._value = e),
            this._setElementValue(ft(this.id, e)),
            this._select.writeValue(this._select.value))
          : this._setElementValue(e);
      }
      _setElementValue(e) {
        this._renderer.setProperty(this._element.nativeElement, "value", e);
      }
      _setSelected(e) {
        this._renderer.setProperty(this._element.nativeElement, "selected", e);
      }
      ngOnDestroy() {
        this._select &&
          (this._select._optionMap.delete(this.id),
          this._select.writeValue(this._select.value));
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)(u(W), u(ne), u(xt, 9));
        };
      }
      static {
        this.ɵdir = _({
          type: t,
          selectors: [["option"]],
          inputs: { ngValue: "ngValue", value: "value" },
        });
      }
    }
    return t;
  })();
var fi = (() => {
  class t {
    static {
      this.ɵfac = function (n) {
        return new (n || t)();
      };
    }
    static {
      this.ɵmod = te({ type: t });
    }
    static {
      this.ɵinj = ee({});
    }
  }
  return t;
})();
var Ft = (() => {
  class t {
    static withConfig(e) {
      return {
        ngModule: t,
        providers: [{ provide: St, useValue: e.callSetDisabledState ?? je }],
      };
    }
    static {
      this.ɵfac = function (n) {
        return new (n || t)();
      };
    }
    static {
      this.ɵmod = te({ type: t });
    }
    static {
      this.ɵinj = ee({ imports: [fi] });
    }
  }
  return t;
})();
var mi = (t, i, e) => ({ $implicit: t, pages: i, disabled: e }),
  vi = (t) => ({ disabled: !0, currentPage: t }),
  yi = (t, i, e) => ({ disabled: t, $implicit: i, currentPage: e }),
  Le = (t, i) => ({ disabled: t, currentPage: i }),
  bi = (t) => ({ disabled: t });
function Di(t, i) {
  t & 1 && (r(0, "span", 13), se(1, 7), a());
}
function wi(t, i) {
  t & 1 && (r(0, "span", 13), se(1, 8), a());
}
function Ci(t, i) {
  t & 1 && (r(0, "span", 13), se(1, 9), a());
}
function Mi(t, i) {
  t & 1 && (r(0, "span", 13), se(1, 10), a());
}
function Si(t, i) {
  t & 1 && p(0, "...");
}
function Ti(t, i) {
  if ((t & 1 && p(0), t & 2)) {
    let e = i.$implicit;
    S(e);
  }
}
function Oi(t, i) {}
function Ei(t, i) {
  if (
    (t & 1 && (r(0, "a", 16), m(1, Oi, 0, 0, "ng-template", 12), a()), t & 2)
  ) {
    let e = d(2).$implicit,
      n = d(),
      s = I(9);
    c(),
      h(
        "ngTemplateOutlet",
        (n.tplEllipsis == null ? null : n.tplEllipsis.templateRef) || s
      )("ngTemplateOutletContext", H(2, vi, e));
  }
}
function Ni(t, i) {}
function xi(t, i) {
  if (t & 1) {
    let e = D();
    r(0, "a", 18),
      f("click", function (s) {
        y(e);
        let o = d().$implicit;
        return d(2).selectPage(o), b(s.preventDefault());
      }),
      m(1, Ni, 0, 0, "ng-template", 12),
      a();
  }
  if (t & 2) {
    let e = d().$implicit,
      n = d(),
      s = n.$implicit,
      o = n.disabled,
      l = d(),
      g = I(11);
    N("tabindex", o ? "-1" : null)("aria-disabled", o ? "true" : null),
      c(),
      h(
        "ngTemplateOutlet",
        (l.tplNumber == null ? null : l.tplNumber.templateRef) || g
      )("ngTemplateOutletContext", Ie(4, yi, o, e, s));
  }
}
function Ai(t, i) {
  if (
    (t & 1 &&
      (r(0, "li", 15), m(1, Ei, 2, 4, "a", 16)(2, xi, 2, 8, "a", 17), a()),
    t & 2)
  ) {
    let e = i.$implicit,
      n = d(),
      s = n.$implicit,
      o = n.disabled,
      l = d();
    x("active", e === s)("disabled", l.isEllipsis(e) || o),
      N("aria-current", e === s ? "page" : null),
      c(),
      z(l.isEllipsis(e) ? 1 : 2);
  }
}
function Fi(t, i) {
  if ((t & 1 && Q(0, Ai, 3, 6, "li", 14, Ze), t & 2)) {
    let e = i.pages;
    J(e);
  }
}
function Ri(t, i) {}
function Ii(t, i) {
  if (t & 1) {
    let e = D();
    r(0, "li", 15)(1, "a", 19),
      f("click", function (s) {
        return y(e), d().selectPage(1), b(s.preventDefault());
      }),
      m(2, Ri, 0, 0, "ng-template", 12),
      a()();
  }
  if (t & 2) {
    let e = d(),
      n = I(1);
    x("disabled", e.previousDisabled()),
      c(),
      N("tabindex", e.previousDisabled() ? "-1" : null)(
        "aria-disabled",
        e.previousDisabled() ? "true" : null
      ),
      c(),
      h(
        "ngTemplateOutlet",
        (e.tplFirst == null ? null : e.tplFirst.templateRef) || n
      )("ngTemplateOutletContext", ge(6, Le, e.previousDisabled(), e.page));
  }
}
function ki(t, i) {}
function Pi(t, i) {
  if (t & 1) {
    let e = D();
    r(0, "li", 15)(1, "a", 20),
      f("click", function (s) {
        y(e);
        let o = d();
        return o.selectPage(o.page - 1), b(s.preventDefault());
      }),
      m(2, ki, 0, 0, "ng-template", 12),
      a()();
  }
  if (t & 2) {
    let e = d(),
      n = I(3);
    x("disabled", e.previousDisabled()),
      c(),
      N("tabindex", e.previousDisabled() ? "-1" : null)(
        "aria-disabled",
        e.previousDisabled() ? "true" : null
      ),
      c(),
      h(
        "ngTemplateOutlet",
        (e.tplPrevious == null ? null : e.tplPrevious.templateRef) || n
      )("ngTemplateOutletContext", H(6, bi, e.previousDisabled()));
  }
}
function Vi(t, i) {}
function Bi(t, i) {}
function Gi(t, i) {
  if (t & 1) {
    let e = D();
    r(0, "li", 15)(1, "a", 21),
      f("click", function (s) {
        y(e);
        let o = d();
        return o.selectPage(o.page + 1), b(s.preventDefault());
      }),
      m(2, Bi, 0, 0, "ng-template", 12),
      a()();
  }
  if (t & 2) {
    let e = d(),
      n = I(5);
    x("disabled", e.nextDisabled()),
      c(),
      N("tabindex", e.nextDisabled() ? "-1" : null)(
        "aria-disabled",
        e.nextDisabled() ? "true" : null
      ),
      c(),
      h(
        "ngTemplateOutlet",
        (e.tplNext == null ? null : e.tplNext.templateRef) || n
      )("ngTemplateOutletContext", ge(6, Le, e.nextDisabled(), e.page));
  }
}
function Hi(t, i) {}
function ji(t, i) {
  if (t & 1) {
    let e = D();
    r(0, "li", 15)(1, "a", 22),
      f("click", function (s) {
        y(e);
        let o = d();
        return o.selectPage(o.pageCount), b(s.preventDefault());
      }),
      m(2, Hi, 0, 0, "ng-template", 12),
      a()();
  }
  if (t & 2) {
    let e = d(),
      n = I(7);
    x("disabled", e.nextDisabled()),
      c(),
      N("tabindex", e.nextDisabled() ? "-1" : null)(
        "aria-disabled",
        e.nextDisabled() ? "true" : null
      ),
      c(),
      h(
        "ngTemplateOutlet",
        (e.tplLast == null ? null : e.tplLast.templateRef) || n
      )("ngTemplateOutletContext", ge(6, Le, e.nextDisabled(), e.page));
  }
}
var Ui = { animation: !0, transitionTimerDelayMs: 5 };
function Li(t) {
  return parseInt(`${t}`, 10);
}
function $i(t, i, e = 0) {
  return Math.max(Math.min(t, i), e);
}
function Rt(t) {
  return !isNaN(Li(t));
}
var { transitionTimerDelayMs: Os } = Ui;
var Es = (() => {
  let t = () =>
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (/Macintosh/.test(navigator.userAgent) &&
        navigator.maxTouchPoints &&
        navigator.maxTouchPoints > 2),
    i = () => /Android/.test(navigator.userAgent);
  return typeof navigator < "u" ? !!navigator.userAgent && (t() || i()) : !1;
})();
var Ns = [
  "a[href]",
  "button:not([disabled])",
  'input:not([disabled]):not([type="hidden"])',
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[contenteditable]",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");
var xs = new Date(1882, 10, 12),
  As = new Date(2174, 10, 25);
var Fs = 1e3 * 60 * 60 * 24;
var $e = 1080,
  Wi = 24 * $e,
  zi = 12 * $e + 793,
  Rs = 29 * Wi + zi,
  Is = 11 * $e + 204;
var Qi = (() => {
    class t {
      constructor() {
        (this.disabled = !1),
          (this.boundaryLinks = !1),
          (this.directionLinks = !0),
          (this.ellipses = !0),
          (this.maxSize = 0),
          (this.pageSize = 10),
          (this.rotate = !1);
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵprov = G({ token: t, factory: t.ɵfac, providedIn: "root" });
      }
    }
    return t;
  })(),
  Ji = (() => {
    class t {
      constructor() {
        this.templateRef = M(O);
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵdir = _({
          type: t,
          selectors: [["ng-template", "ngbPaginationEllipsis", ""]],
          standalone: !0,
        });
      }
    }
    return t;
  })(),
  qi = (() => {
    class t {
      constructor() {
        this.templateRef = M(O);
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵdir = _({
          type: t,
          selectors: [["ng-template", "ngbPaginationFirst", ""]],
          standalone: !0,
        });
      }
    }
    return t;
  })(),
  Yi = (() => {
    class t {
      constructor() {
        this.templateRef = M(O);
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵdir = _({
          type: t,
          selectors: [["ng-template", "ngbPaginationLast", ""]],
          standalone: !0,
        });
      }
    }
    return t;
  })(),
  Ki = (() => {
    class t {
      constructor() {
        this.templateRef = M(O);
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵdir = _({
          type: t,
          selectors: [["ng-template", "ngbPaginationNext", ""]],
          standalone: !0,
        });
      }
    }
    return t;
  })(),
  Zi = (() => {
    class t {
      constructor() {
        this.templateRef = M(O);
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵdir = _({
          type: t,
          selectors: [["ng-template", "ngbPaginationNumber", ""]],
          standalone: !0,
        });
      }
    }
    return t;
  })(),
  Xi = (() => {
    class t {
      constructor() {
        this.templateRef = M(O);
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵdir = _({
          type: t,
          selectors: [["ng-template", "ngbPaginationPrevious", ""]],
          standalone: !0,
        });
      }
    }
    return t;
  })(),
  en = (() => {
    class t {
      constructor() {
        this.templateRef = M(O);
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵdir = _({
          type: t,
          selectors: [["ng-template", "ngbPaginationPages", ""]],
          standalone: !0,
        });
      }
    }
    return t;
  })(),
  It = (() => {
    class t {
      constructor() {
        (this._config = M(Qi)),
          (this.pageCount = 0),
          (this.pages = []),
          (this.disabled = this._config.disabled),
          (this.boundaryLinks = this._config.boundaryLinks),
          (this.directionLinks = this._config.directionLinks),
          (this.ellipses = this._config.ellipses),
          (this.rotate = this._config.rotate),
          (this.maxSize = this._config.maxSize),
          (this.page = 1),
          (this.pageSize = this._config.pageSize),
          (this.pageChange = new $(!0)),
          (this.size = this._config.size);
      }
      hasPrevious() {
        return this.page > 1;
      }
      hasNext() {
        return this.page < this.pageCount;
      }
      nextDisabled() {
        return !this.hasNext() || this.disabled;
      }
      previousDisabled() {
        return !this.hasPrevious() || this.disabled;
      }
      selectPage(e) {
        this._updatePages(e);
      }
      ngOnChanges(e) {
        this._updatePages(this.page);
      }
      isEllipsis(e) {
        return e === -1;
      }
      _applyEllipses(e, n) {
        this.ellipses &&
          (e > 0 &&
            (e > 2 ? this.pages.unshift(-1) : e === 2 && this.pages.unshift(2),
            this.pages.unshift(1)),
          n < this.pageCount &&
            (n < this.pageCount - 2
              ? this.pages.push(-1)
              : n === this.pageCount - 2 && this.pages.push(this.pageCount - 1),
            this.pages.push(this.pageCount)));
      }
      _applyRotation() {
        let e = 0,
          n = this.pageCount,
          s = Math.floor(this.maxSize / 2),
          o = this.maxSize % 2 === 0 ? s - 1 : s;
        return (
          this.page <= s
            ? (n = this.maxSize)
            : this.pageCount - this.page < s
              ? (e = this.pageCount - this.maxSize)
              : ((e = this.page - s - 1), (n = this.page + o)),
          [e, n]
        );
      }
      _applyPagination() {
        let n = (Math.ceil(this.page / this.maxSize) - 1) * this.maxSize,
          s = n + this.maxSize;
        return [n, s];
      }
      _setPageInRange(e) {
        let n = this.page;
        (this.page = $i(e, this.pageCount, 1)),
          this.page !== n &&
            Rt(this.collectionSize) &&
            this.pageChange.emit(this.page);
      }
      _updatePages(e) {
        (this.pageCount = Math.ceil(this.collectionSize / this.pageSize)),
          Rt(this.pageCount) || (this.pageCount = 0),
          (this.pages.length = 0);
        for (let n = 1; n <= this.pageCount; n++) this.pages.push(n);
        if (
          (this._setPageInRange(e),
          this.maxSize > 0 && this.pageCount > this.maxSize)
        ) {
          let n = 0,
            s = this.pageCount;
          this.rotate
            ? ([n, s] = this._applyRotation())
            : ([n, s] = this._applyPagination()),
            (this.pages = this.pages.slice(n, s)),
            this._applyEllipses(n, s);
        }
      }
      static {
        this.ɵfac = function (n) {
          return new (n || t)();
        };
      }
      static {
        this.ɵcmp = ue({
          type: t,
          selectors: [["ngb-pagination"]],
          contentQueries: function (n, s, o) {
            if (
              (n & 1 &&
                (A(o, Ji, 5),
                A(o, qi, 5),
                A(o, Yi, 5),
                A(o, Ki, 5),
                A(o, Zi, 5),
                A(o, Xi, 5),
                A(o, en, 5)),
              n & 2)
            ) {
              let l;
              F((l = R())) && (s.tplEllipsis = l.first),
                F((l = R())) && (s.tplFirst = l.first),
                F((l = R())) && (s.tplLast = l.first),
                F((l = R())) && (s.tplNext = l.first),
                F((l = R())) && (s.tplNumber = l.first),
                F((l = R())) && (s.tplPrevious = l.first),
                F((l = R())) && (s.tplPages = l.first);
            }
          },
          hostAttrs: ["role", "navigation"],
          inputs: {
            disabled: "disabled",
            boundaryLinks: "boundaryLinks",
            directionLinks: "directionLinks",
            ellipses: "ellipses",
            rotate: "rotate",
            collectionSize: "collectionSize",
            maxSize: "maxSize",
            page: "page",
            pageSize: "pageSize",
            size: "size",
          },
          outputs: { pageChange: "pageChange" },
          standalone: !0,
          features: [he, fe],
          decls: 20,
          vars: 12,
          consts: () => {
            let e;
            e = $localize`:@@ngb.pagination.first:««`;
            let n;
            n = $localize`:@@ngb.pagination.previous:«`;
            let s;
            s = $localize`:@@ngb.pagination.next:»`;
            let o;
            o = $localize`:@@ngb.pagination.last:»»`;
            let l;
            l = $localize`:@@ngb.pagination.first-aria:First`;
            let g;
            g = $localize`:@@ngb.pagination.previous-aria:Previous`;
            let V;
            V = $localize`:@@ngb.pagination.next-aria:Next`;
            let U;
            return (
              (U = $localize`:@@ngb.pagination.last-aria:Last`),
              [
                ["first", ""],
                ["previous", ""],
                ["next", ""],
                ["last", ""],
                ["ellipsis", ""],
                ["defaultNumber", ""],
                ["defaultPages", ""],
                e,
                n,
                s,
                o,
                [1, "page-item", 3, "disabled"],
                [3, "ngTemplateOutlet", "ngTemplateOutletContext"],
                ["aria-hidden", "true"],
                [1, "page-item", 3, "active", "disabled"],
                [1, "page-item"],
                ["tabindex", "-1", "aria-disabled", "true", 1, "page-link"],
                ["href", "", 1, "page-link"],
                ["href", "", 1, "page-link", 3, "click"],
                ["aria-label", l, "href", "", 1, "page-link", 3, "click"],
                ["aria-label", g, "href", "", 1, "page-link", 3, "click"],
                ["aria-label", V, "href", "", 1, "page-link", 3, "click"],
                ["aria-label", U, "href", "", 1, "page-link", 3, "click"],
              ]
            );
          },
          template: function (n, s) {
            if (
              (n & 1 &&
                (m(0, Di, 2, 0, "ng-template", null, 0, P)(
                  2,
                  wi,
                  2,
                  0,
                  "ng-template",
                  null,
                  1,
                  P
                )(4, Ci, 2, 0, "ng-template", null, 2, P)(
                  6,
                  Mi,
                  2,
                  0,
                  "ng-template",
                  null,
                  3,
                  P
                )(8, Si, 1, 0, "ng-template", null, 4, P)(
                  10,
                  Ti,
                  1,
                  1,
                  "ng-template",
                  null,
                  5,
                  P
                )(12, Fi, 2, 0, "ng-template", null, 6, P),
                r(14, "ul"),
                m(15, Ii, 3, 9, "li", 11)(16, Pi, 3, 8, "li", 11)(
                  17,
                  Vi,
                  0,
                  0,
                  "ng-template",
                  12
                )(18, Gi, 3, 9, "li", 11)(19, ji, 3, 9, "li", 11),
                a()),
              n & 2)
            ) {
              let o = I(13);
              c(14),
                Ke("pagination" + (s.size ? " pagination-" + s.size : "")),
                c(),
                z(s.boundaryLinks ? 15 : -1),
                c(),
                z(s.directionLinks ? 16 : -1),
                c(),
                h(
                  "ngTemplateOutlet",
                  (s.tplPages == null ? null : s.tplPages.templateRef) || o
                )(
                  "ngTemplateOutletContext",
                  Ie(8, mi, s.page, s.pages, s.disabled)
                ),
                c(),
                z(s.directionLinks ? 18 : -1),
                c(),
                z(s.boundaryLinks ? 19 : -1);
            }
          },
          dependencies: [it],
          encapsulation: 2,
          changeDetection: 0,
        });
      }
    }
    return t;
  })();
var kt = (() => {
  class t {
    static {
      this.ɵfac = function (n) {
        return new (n || t)();
      };
    }
    static {
      this.ɵmod = te({ type: t });
    }
    static {
      this.ɵinj = ee({});
    }
  }
  return t;
})();
var ks = new T("live announcer delay", {
  providedIn: "root",
  factory: () => 100,
});
function xe(t, i) {
  return (
    t.map((e) => {
      e.image_id
        ? (e.image_url = i.iiif_url + "/" + e.image_id + rt)
        : (e.image_url = "icons/image 2.png");
    }),
    t
  );
}
var Z = class t {
  constructor(i) {
    this.httpClient = i;
  }
  getData(i) {
    return this.httpClient.get(De.apiUrl + `?page=${i}&limit=10`);
  }
  static ɵfac = function (e) {
    return new (e || t)(de(ye));
  };
  static ɵprov = G({ token: t, factory: t.ɵfac, providedIn: "root" });
};
var X = class t {
  constructor(i) {
    this.httpClient = i;
  }
  getData() {
    return this.httpClient.get(De.apiUrl);
  }
  static ɵfac = function (e) {
    return new (e || t)(de(ye));
  };
  static ɵprov = G({ token: t, factory: t.ɵfac, providedIn: "root" });
};
var We = (t, i) => i.id,
  ze = (t) => ["details", t];
function rn(t, i) {
  if (t & 1) {
    let e = D();
    r(0, "div", 17)(1, "a", 22),
      C(2, "img", 23),
      a(),
      r(3, "div", 24)(4, "div", 25),
      p(5),
      a(),
      r(6, "span", 26),
      p(7),
      a(),
      r(8, "span", 27),
      p(9, "Public"),
      a()(),
      r(10, "div", 28)(11, "button", 29),
      f("click", function () {
        let s = y(e).$implicit,
          o = d(2);
        return b(o.setToFavorites(s));
      }),
      C(12, "img", 30),
      a()()();
  }
  if (t & 2) {
    let e = i.$implicit;
    c(),
      h("routerLink", H(4, ze, e.id)),
      c(),
      h("src", e.image_url, pe),
      c(3),
      S(e.title),
      c(2),
      S(e.artist_title);
  }
}
function an(t, i) {
  if (t & 1) {
    let e = D();
    r(0, "div", 16),
      Q(1, rn, 13, 6, "div", 17, We),
      r(3, "select", 18),
      f("change", function (s) {
        y(e);
        let o = d();
        return b(o.selectChanged(s));
      }),
      r(4, "option", 19),
      p(
        5,
        "\u041E\u0442\u0441\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044E"
      ),
      a(),
      r(6, "option", 20),
      p(
        7,
        "\u041E\u0442\u0441\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E \u0430\u0432\u0442\u043E\u0440\u0443"
      ),
      a(),
      r(8, "option", 21),
      p(
        9,
        "\u041E\u0442\u0441\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043F\u043E \u0441\u0442\u0440\u0430\u043D\u0435"
      ),
      a()()();
  }
  if (t & 2) {
    let e = d();
    c(), J(e.searchPictures);
  }
}
function ln(t, i) {
  if (t & 1) {
    let e = D();
    r(0, "div", 32)(1, "a", 33)(2, "div", 34),
      C(3, "img", 35),
      a()(),
      r(4, "div", 36)(5, "div", 24)(6, "div", 25),
      p(7),
      a(),
      r(8, "span", 26),
      p(9),
      a(),
      r(10, "span", 37),
      p(11, "Public"),
      a()(),
      r(12, "div", 38)(13, "button", 29),
      f("click", function () {
        let s = y(e).$implicit,
          o = d(2);
        return b(o.setToFavorites(s));
      }),
      C(14, "img", 30),
      a()()()();
  }
  if (t & 2) {
    let e = i.$implicit;
    c(),
      h("routerLink", H(4, ze, e.id)),
      c(2),
      h("src", e.image_url, pe),
      c(4),
      S(e.title),
      c(2),
      S(e.artist_title);
  }
}
function cn(t, i) {
  if (
    (t & 1 && (r(0, "div", 31), Q(1, ln, 15, 6, "div", 32, We), a()), t & 2)
  ) {
    let e = d();
    c(), J(e.paginationPictures);
  }
}
function dn(t, i) {
  t & 1 && C(0, "app-loading-spiner");
}
function un(t, i) {
  if (t & 1) {
    let e = D();
    r(0, "div", 39)(1, "ngb-pagination", 40),
      Re("pageChange", function (s) {
        y(e);
        let o = d();
        return (
          Fe(o.paginationParameters.current_page, s) ||
            (o.paginationParameters.current_page = s),
          b(s)
        );
      }),
      f("pageChange", function (s) {
        y(e);
        let o = d();
        return b(o.onPageChanged(s));
      }),
      a()();
  }
  if (t & 2) {
    let e = d();
    c(),
      h("collectionSize", e.paginationParameters.total),
      Ae("page", e.paginationParameters.current_page),
      h("maxSize", 3)("rotate", !0)("boundaryLinks", !0);
  }
}
function hn(t, i) {
  t & 1 && C(0, "app-loading-spiner");
}
function pn(t, i) {
  if (t & 1) {
    let e = D();
    r(0, "div", 17)(1, "a", 22),
      C(2, "img", 23),
      a(),
      r(3, "div", 24)(4, "div", 25),
      p(5),
      a(),
      r(6, "span", 26),
      p(7),
      a(),
      r(8, "span", 27),
      p(9, "Public"),
      a()(),
      r(10, "div", 28)(11, "button", 29),
      f("click", function () {
        let s = y(e).$implicit,
          o = d(2);
        return b(o.setToFavorites(s));
      }),
      C(12, "img", 30),
      a()()();
  }
  if (t & 2) {
    let e = i.$implicit;
    c(),
      h("routerLink", H(4, ze, e.id)),
      c(),
      h("src", e.image_url, pe),
      c(3),
      S(e.title),
      c(2),
      S(e.artist_title);
  }
}
function _n(t, i) {
  if (
    (t & 1 && (r(0, "div", 41), Q(1, pn, 13, 6, "div", 17, We), a()), t & 2)
  ) {
    let e = d();
    c(), J(e.pictures);
  }
}
var Pt = class t {
  constructor(i, e, n) {
    this.responseService = i;
    this.paginationService = e;
    this.localStorageService = n;
  }
  pictures = [];
  paginationParameters = {
    total: 0,
    limit: 0,
    next_url: "",
    prev_url: "",
    current_page: 0,
  };
  searchPictures = [];
  isPagination = !1;
  isPicture = !0;
  config = { iiif_url: "", website_url: "" };
  searchString = "";
  loading = !1;
  pageNumber = 1;
  paginationPictures = [];
  ngOnInit() {
    (this.loading = !0),
      this.responseService.getData().subscribe((i) => {
        (this.paginationParameters = i.pagination),
          (this.config = i.config),
          (this.pictures = xe(i.data, this.config)),
          (this.searchPictures = this.pictures),
          (this.loading = !1);
      }),
      (this.loading = !0),
      this.paginationService.getData(this.pageNumber).subscribe((i) => {
        (this.paginationPictures = i.data),
          (this.paginationPictures = this.paginationPictures.slice(0, 3)),
          (this.paginationPictures = xe(this.paginationPictures, this.config)),
          (this.loading = !1);
      });
  }
  searchArts() {
    this.searchString &&
      ((this.searchPictures = this.pictures.filter((i) =>
        i.title.toLowerCase().includes(this.searchString.toLowerCase())
      )),
      (this.searchPictures = this.searchPictures.concat(
        this.paginationPictures.filter((i) =>
          i.title.toLowerCase().includes(this.searchString.toLowerCase())
        )
      )),
      (this.searchPictures = this.searchPictures.concat(
        this.pictures.filter((i) =>
          i.artist_title.toLowerCase().includes(this.searchString.toLowerCase())
        )
      )),
      (this.searchPictures = this.searchPictures.concat(
        this.paginationPictures.filter((i) =>
          i.artist_title.toLowerCase().includes(this.searchString.toLowerCase())
        )
      )),
      (this.searchPictures = this.searchPictures.filter(
        (i, e, n) => e === n.findIndex((s) => s.id === i.id)
      )));
  }
  selectChanged(i) {
    let e = i.target;
    e.value === "title"
      ? this.searchPictures.sort((n, s) =>
          n.title < s.title ? -1 : n.title > s.title ? 1 : 0
        )
      : e.value === "author"
        ? this.searchPictures.sort((n, s) =>
            n.artist_title < s.artist_title
              ? -1
              : n.artist_title > s.artist_title
                ? 1
                : 0
          )
        : this.searchPictures.sort((n, s) =>
            n.place_of_origin < s.place_of_origin
              ? -1
              : n.place_of_origin > s.place_of_origin
                ? 1
                : 0
          );
  }
  onPageChanged(i) {
    this.paginationService.getData(i).subscribe((e) => {
      (this.paginationPictures = e.data.splice(0, 3)),
        (this.pageNumber = e.pagination.current_page),
        (this.paginationPictures = xe(this.paginationPictures, this.config));
    });
  }
  setToFavorites(i) {
    this.localStorageService.addToLocalStorage(i);
  }
  static ɵfac = function (e) {
    return new (e || t)(u(X), u(Z), u(be));
  };
  static ɵcmp = ue({
    type: t,
    selectors: [["app-home"]],
    standalone: !0,
    features: [k([X, Z, be]), fe],
    decls: 27,
    vars: 7,
    consts: [
      [1, "home__container"],
      [1, "text__container"],
      [1, "home__title"],
      [1, "orange__text"],
      [1, "home__container__input"],
      [1, "input__container"],
      [
        "type",
        "text",
        "placeholder",
        "Search Art, Artist, Work...",
        1,
        "home__input",
        3,
        "ngModelChange",
        "input",
        "ngModel",
      ],
      [
        "src",
        "icons/search.png",
        "alt",
        "\u041F\u043E\u0438\u0441\u043A",
        1,
        "home__input__image",
      ],
      ["class", "pictures__container__input", 4, "ngIf"],
      [1, "home__container__text"],
      [1, "little__text"],
      [1, "big__text"],
      ["class", "pagination__pictures", 4, "ngIf"],
      [4, "ngIf"],
      ["class", "navigation", 4, "ngIf"],
      ["class", "pictures__container", 4, "ngIf"],
      [1, "pictures__container__input"],
      [1, "picture__item"],
      ["name", "sort", 1, "input__select", 3, "change"],
      ["value", "title"],
      ["value", "author"],
      ["value", "place"],
      ["routerLinkActive", "active", 1, "link__menu", 3, "routerLink"],
      ["alt", "No image", 1, "image__item", 3, "src"],
      [1, "picture__text__container"],
      [1, "picture__text__title"],
      [1, "picture__text__artist"],
      [1, "picture__text_public"],
      [1, "picture__favorites"],
      [1, "button__favorites", 3, "click"],
      ["src", "icons/Vector.png", "alt", ""],
      [1, "pagination__pictures"],
      [1, "pagination__item"],
      ["routerLinkActive", "active", 1, "link", 3, "routerLink"],
      [1, "image__container"],
      ["alt", "", 1, "image__item", 3, "src"],
      [1, "pagination__text__container"],
      [1, "pagination__text__public"],
      [1, "pagination__button"],
      [1, "navigation"],
      [
        3,
        "pageChange",
        "collectionSize",
        "page",
        "maxSize",
        "rotate",
        "boundaryLinks",
      ],
      [1, "pictures__container"],
    ],
    template: function (e, n) {
      e & 1 &&
        (r(0, "div", 0)(1, "div", 1)(2, "span", 2),
        p(3, "Let's Find Some "),
        r(4, "span", 3),
        p(5, "Arts"),
        a(),
        p(6, " Here!"),
        a()()(),
        r(7, "div", 4)(8, "div", 5)(9, "input", 6),
        Re("ngModelChange", function (o) {
          return Fe(n.searchString, o) || (n.searchString = o), o;
        }),
        f("input", function () {
          return n.searchArts();
        }),
        a(),
        C(10, "img", 7),
        a()(),
        m(11, an, 10, 0, "div", 8),
        r(12, "div", 9)(13, "span", 10),
        p(14, "Topics for you"),
        a(),
        r(15, "span", 11),
        p(16, "Our special gallery"),
        a()(),
        m(17, cn, 3, 0, "div", 12)(18, dn, 1, 0, "app-loading-spiner", 13)(
          19,
          un,
          2,
          5,
          "div",
          14
        ),
        r(20, "div", 9)(21, "span", 10),
        p(22, "Here some more"),
        a(),
        r(23, "span", 11),
        p(24, "Other works for you"),
        a()(),
        m(25, hn, 1, 0, "app-loading-spiner", 13)(26, _n, 3, 0, "div", 15)),
        e & 2 &&
          (c(9),
          Ae("ngModel", n.searchString),
          c(2),
          h(
            "ngIf",
            n.searchString &&
              n.searchString !== " " &&
              n.searchString.length > 1
          ),
          c(6),
          h("ngIf", !n.loading),
          c(),
          h("ngIf", n.loading),
          c(),
          h("ngIf", !n.loading),
          c(6),
          h("ngIf", n.loading),
          c(),
          h("ngIf", !n.loading));
    },
    dependencies: [st, kt, It, at, nt, tt, ot, Ft, Nt, At, Ee, Mt, Ue],
    styles: [
      '@charset "UTF-8";.home__container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;margin-top:100px}.home__container__input[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;margin-top:100px;margin-bottom:50px}.text__container[_ngcontent-%COMP%]{width:684px;display:flex;align-items:center}.orange__text[_ngcontent-%COMP%]{color:#f17900}.home__title[_ngcontent-%COMP%]{font-family:Lexend Deca;font-size:64px;font-weight:700;line-height:80px;text-align:center}.home__input[_ngcontent-%COMP%]{width:762px;height:64px;border-radius:16px;border:none;background:#3939390d;padding:16px;font-family:Inter;font-size:14px;font-weight:400;line-height:16.94px}.input__container[_ngcontent-%COMP%]{position:relative;display:inline-block}.home__input__image[_ngcontent-%COMP%]{position:absolute;top:25%;right:4%}.little__text[_ngcontent-%COMP%]{font-family:Lexend Deca;font-size:16px;font-weight:400;line-height:20px;text-align:left;color:#e0a449}.big__text[_ngcontent-%COMP%]{font-family:Lexend Deca;font-size:32px;font-weight:400;line-height:40px;text-align:left;margin-bottom:60px}.home__container__text[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;margin-top:100px;flex-direction:column}.pictures__container[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:center;justify-content:space-between;padding:0 30px;gap:16px;margin-bottom:100px}.pictures__container__input[_ngcontent-%COMP%]{display:flex;justify-content:center;flex-direction:column;align-items:center;padding:0 30px;gap:16px;margin-bottom:100px}.input__select[_ngcontent-%COMP%]{padding:10px;border-radius:50px;font-family:Inter;font-size:17.54px;font-weight:500;line-height:26.32px;letter-spacing:-.03em}.picture__item[_ngcontent-%COMP%]{display:flex;width:416px;height:130px;border:2px solid #f0f1f1;background-color:#fff;margin-bottom:10px;padding:16px;gap:10px}.picture__text__title[_ngcontent-%COMP%]{display:block;font-family:Inter;font-size:17.54px;font-weight:500;line-height:26.32px;letter-spacing:-.03em;text-align:left;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.picture__text__artist[_ngcontent-%COMP%]{display:block;font-family:Inter;font-size:17.54px;font-weight:400;line-height:26.32px;letter-spacing:-.03em;text-align:left;color:#e0a449}.picture__text__public[_ngcontent-%COMP%]{font-family:Inter;font-size:15.35px;font-weight:700;line-height:26.32px;letter-spacing:-.01em;text-align:left;display:block;margin-top:9px}.button__favorites[_ngcontent-%COMP%]{border:none;background-color:#f9f9f9;width:90%;height:90%;border-radius:30%}.picture__text__container[_ngcontent-%COMP%]{display:inline-block;width:219px;margin-left:5px;overflow:hidden;white-space:nowrap}.picture__favorites[_ngcontent-%COMP%]{width:59px;height:59px;padding-top:5px;padding-left:5px;border-radius:50%;background-color:#f9f9f9;margin-top:15px}  .pagination{background-color:#f8f9fa;font-family:Lexend Deca;font-size:18px;font-weight:300;line-height:24px;text-align:left}  .pagination .page-item.active .page-link{background-color:#f17900;color:#fff;border:none;border-radius:.25rem;box-shadow:none}  .pagination .page-link{color:#393939}  .pagination .page-link:hover{background-color:#e9ecef;box-shadow:none}.pagination__pictures[_ngcontent-%COMP%]{display:flex;height:494px;flex-direction:row;justify-content:center;padding:0 30px;gap:100px}.navigation[_ngcontent-%COMP%]{display:flex;justify-content:right;align-items:center;margin-right:50px}.pagination__item[_ngcontent-%COMP%]{display:flex;flex-direction:column;justify-content:center;align-items:center;width:416px;height:444px;margin-bottom:10px;gap:10px}.image__container[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:387px;height:444px}.image__item[_ngcontent-%COMP%]{border-radius:inherit;object-fit:cover;width:100%;height:100%}.pagination__text__container[_ngcontent-%COMP%]{position:relative;top:-50px;display:flex;height:132px;width:334px;background-color:#fff;padding:10px 20px 0;border:1px solid #f0f1f1}.pagination__text_public[_ngcontent-%COMP%]{font-family:Inter;font-size:15.35px;font-weight:700;line-height:26.32px;letter-spacing:-.01em;text-align:left;display:block;margin-top:10px}.pagination__button[_ngcontent-%COMP%]{width:59px;height:59px;padding-top:5px;padding-left:5px;border-radius:50%;background-color:#f9f9f9;margin-top:15px}.link__menu[_ngcontent-%COMP%]{cursor:pointer;display:block;width:90px;height:90px}@media (max-width: 1300px){.pagination__item[_ngcontent-%COMP%]{width:300px}.image__container[_ngcontent-%COMP%]{width:300px;height:300px}.pagination__pictures[_ngcontent-%COMP%]{gap:100px}}@media (max-width: 1250px){.pagination__item[_ngcontent-%COMP%]{width:300px}.pagination__pictures[_ngcontent-%COMP%]{gap:100px}}@media (max-width: 1200px){.home__input[_ngcontent-%COMP%]{width:600px;height:50px}.home__input__image[_ngcontent-%COMP%]{top:19%}}@media (max-width: 1165px){.home__input[_ngcontent-%COMP%]{width:600px;height:50px}.home__input__image[_ngcontent-%COMP%]{top:19%}.image__container[_ngcontent-%COMP%]{width:250px;height:250px}.pagination__item[_ngcontent-%COMP%]{width:300px}.pagination__pictures[_ngcontent-%COMP%]{gap:90px}.pagination__text__container[_ngcontent-%COMP%]{width:200px;height:100px}.pagination__button[_ngcontent-%COMP%]{margin-left:10px}}@media (max-width: 970px){.image__container[_ngcontent-%COMP%]{width:250px;height:250px}.pagination__item[_ngcontent-%COMP%]{width:200px}.pagination__pictures[_ngcontent-%COMP%]{gap:70px}.pagination__text__container[_ngcontent-%COMP%]{width:200px;height:100px}.pagination__button[_ngcontent-%COMP%]{margin-left:10px}}@media (max-width: 825px){.image__container[_ngcontent-%COMP%]{width:350px;height:350px}.pagination__text__container[_ngcontent-%COMP%]{width:300px;height:132px}.pagination__pictures[_ngcontent-%COMP%]{flex-direction:column;height:1500px;justify-content:center}.pagination__pictures[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}.navigation[_ngcontent-%COMP%]{justify-content:center;align-items:center;margin:0}}.link[_ngcontent-%COMP%]{cursor:pointer}@media (max-width: 950px){.picture__item[_ngcontent-%COMP%]{width:350px}.picture__favorites[_ngcontent-%COMP%]{padding-left:4px}}@media (max-width: 790px){.home__input[_ngcontent-%COMP%]{width:500px;height:50px}.picture__item[_ngcontent-%COMP%]{width:300px}}@media (max-width: 695px){.picture__item[_ngcontent-%COMP%]{width:280px}}@media (max-width: 650px){.home__input[_ngcontent-%COMP%]{width:400px;height:40px}.home__input__image[_ngcontent-%COMP%]{top:12%}.home__title[_ngcontent-%COMP%]{font-size:50px}.pictures__container[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}.picture__item[_ngcontent-%COMP%]{width:400px}}@media (max-width: 490px){.picture__item[_ngcontent-%COMP%]{width:350px}.picture__favorites[_ngcontent-%COMP%]{padding-left:4px}}@media (max-width: 435px){.home__input[_ngcontent-%COMP%]{width:250px;height:30px}.home__input__image[_ngcontent-%COMP%]{top:4%}}@media (max-width: 410px){.picture__item[_ngcontent-%COMP%]{width:310px}.picture__favorites[_ngcontent-%COMP%]{padding-left:3px}}',
    ],
    changeDetection: 0,
  });
};
export { Pt as HomeComponent };
