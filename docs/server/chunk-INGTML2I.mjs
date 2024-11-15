import "./polyfills.server.mjs";
import { a as ae, b as Te } from "./chunk-5XUXGTUW.mjs";
function Ia(e, t) {
  return Object.is(e, t);
}
var V = null,
  An = !1,
  Rn = 1,
  be = Symbol("SIGNAL");
function C(e) {
  let t = V;
  return (V = e), t;
}
function wa() {
  return V;
}
var $t = {
  version: 0,
  lastCleanEpoch: 0,
  dirty: !1,
  producerNode: void 0,
  producerLastReadVersion: void 0,
  producerIndexOfThis: void 0,
  nextProducerIndex: 0,
  liveConsumerNode: void 0,
  liveConsumerIndexOfThis: void 0,
  consumerAllowSignalWrites: !1,
  consumerIsAlwaysLive: !1,
  producerMustRecompute: () => !1,
  producerRecomputeValue: () => {},
  consumerMarkedDirty: () => {},
  consumerOnSignalRead: () => {},
};
function _o(e) {
  if (An) throw new Error("");
  if (V === null) return;
  V.consumerOnSignalRead(e);
  let t = V.nextProducerIndex++;
  if ((Fn(V), t < V.producerNode.length && V.producerNode[t] !== e && Ut(V))) {
    let n = V.producerNode[t];
    Ln(n, V.producerIndexOfThis[t]);
  }
  V.producerNode[t] !== e &&
    ((V.producerNode[t] = e),
    (V.producerIndexOfThis[t] = Ut(V) ? Ta(e, V, t) : 0)),
    (V.producerLastReadVersion[t] = e.version);
}
function Ef() {
  Rn++;
}
function Da(e) {
  if (!(Ut(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === Rn)) {
    if (!e.producerMustRecompute(e) && !So(e)) {
      (e.dirty = !1), (e.lastCleanEpoch = Rn);
      return;
    }
    e.producerRecomputeValue(e), (e.dirty = !1), (e.lastCleanEpoch = Rn);
  }
}
function Ca(e) {
  if (e.liveConsumerNode === void 0) return;
  let t = An;
  An = !0;
  try {
    for (let n of e.liveConsumerNode) n.dirty || If(n);
  } finally {
    An = t;
  }
}
function Ma() {
  return V?.consumerAllowSignalWrites !== !1;
}
function If(e) {
  (e.dirty = !0), Ca(e), e.consumerMarkedDirty?.(e);
}
function kn(e) {
  return e && (e.nextProducerIndex = 0), C(e);
}
function No(e, t) {
  if (
    (C(t),
    !(
      !e ||
      e.producerNode === void 0 ||
      e.producerIndexOfThis === void 0 ||
      e.producerLastReadVersion === void 0
    ))
  ) {
    if (Ut(e))
      for (let n = e.nextProducerIndex; n < e.producerNode.length; n++)
        Ln(e.producerNode[n], e.producerIndexOfThis[n]);
    for (; e.producerNode.length > e.nextProducerIndex; )
      e.producerNode.pop(),
        e.producerLastReadVersion.pop(),
        e.producerIndexOfThis.pop();
  }
}
function So(e) {
  Fn(e);
  for (let t = 0; t < e.producerNode.length; t++) {
    let n = e.producerNode[t],
      r = e.producerLastReadVersion[t];
    if (r !== n.version || (Da(n), r !== n.version)) return !0;
  }
  return !1;
}
function Oo(e) {
  if ((Fn(e), Ut(e)))
    for (let t = 0; t < e.producerNode.length; t++)
      Ln(e.producerNode[t], e.producerIndexOfThis[t]);
  (e.producerNode.length =
    e.producerLastReadVersion.length =
    e.producerIndexOfThis.length =
      0),
    e.liveConsumerNode &&
      (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0);
}
function Ta(e, t, n) {
  if ((ba(e), e.liveConsumerNode.length === 0 && xa(e)))
    for (let r = 0; r < e.producerNode.length; r++)
      e.producerIndexOfThis[r] = Ta(e.producerNode[r], e, r);
  return e.liveConsumerIndexOfThis.push(n), e.liveConsumerNode.push(t) - 1;
}
function Ln(e, t) {
  if ((ba(e), e.liveConsumerNode.length === 1 && xa(e)))
    for (let r = 0; r < e.producerNode.length; r++)
      Ln(e.producerNode[r], e.producerIndexOfThis[r]);
  let n = e.liveConsumerNode.length - 1;
  if (
    ((e.liveConsumerNode[t] = e.liveConsumerNode[n]),
    (e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[n]),
    e.liveConsumerNode.length--,
    e.liveConsumerIndexOfThis.length--,
    t < e.liveConsumerNode.length)
  ) {
    let r = e.liveConsumerIndexOfThis[t],
      o = e.liveConsumerNode[t];
    Fn(o), (o.producerIndexOfThis[r] = t);
  }
}
function Ut(e) {
  return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
}
function Fn(e) {
  (e.producerNode ??= []),
    (e.producerIndexOfThis ??= []),
    (e.producerLastReadVersion ??= []);
}
function ba(e) {
  (e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= []);
}
function xa(e) {
  return e.producerNode !== void 0;
}
function _a(e) {
  let t = Object.create(wf);
  t.computation = e;
  let n = () => {
    if ((Da(t), _o(t), t.value === Pn)) throw t.error;
    return t.value;
  };
  return (n[be] = t), n;
}
var bo = Symbol("UNSET"),
  xo = Symbol("COMPUTING"),
  Pn = Symbol("ERRORED"),
  wf = Te(ae({}, $t), {
    value: bo,
    dirty: !0,
    error: null,
    equal: Ia,
    producerMustRecompute(e) {
      return e.value === bo || e.value === xo;
    },
    producerRecomputeValue(e) {
      if (e.value === xo) throw new Error("Detected cycle in computations.");
      let t = e.value;
      e.value = xo;
      let n = kn(e),
        r;
      try {
        r = e.computation();
      } catch (o) {
        (r = Pn), (e.error = o);
      } finally {
        No(e, n);
      }
      if (t !== bo && t !== Pn && r !== Pn && e.equal(t, r)) {
        e.value = t;
        return;
      }
      (e.value = r), e.version++;
    },
  });
function Df() {
  throw new Error();
}
var Na = Df;
function Sa() {
  Na();
}
function Oa(e) {
  Na = e;
}
var Cf = null;
function Aa(e) {
  let t = Object.create(Pa);
  t.value = e;
  let n = () => (_o(t), t.value);
  return (n[be] = t), n;
}
function Ao(e, t) {
  Ma() || Sa(), e.equal(e.value, t) || ((e.value = t), Mf(e));
}
function Ra(e, t) {
  Ma() || Sa(), Ao(e, t(e.value));
}
var Pa = Te(ae({}, $t), { equal: Ia, value: void 0 });
function Mf(e) {
  e.version++, Ef(), Ca(e), Cf?.();
}
function E(e) {
  return typeof e == "function";
}
function pt(e) {
  let n = e((r) => {
    Error.call(r), (r.stack = new Error().stack);
  });
  return (
    (n.prototype = Object.create(Error.prototype)),
    (n.prototype.constructor = n),
    n
  );
}
var jn = pt(
  (e) =>
    function (n) {
      e(this),
        (this.message = n
          ? `${n.length} errors occurred during unsubscription:
${n.map((r, o) => `${o + 1}) ${r.toString()}`).join(`
  `)}`
          : ""),
        (this.name = "UnsubscriptionError"),
        (this.errors = n);
    }
);
function Bt(e, t) {
  if (e) {
    let n = e.indexOf(t);
    0 <= n && e.splice(n, 1);
  }
}
var H = class e {
  constructor(t) {
    (this.initialTeardown = t),
      (this.closed = !1),
      (this._parentage = null),
      (this._finalizers = null);
  }
  unsubscribe() {
    let t;
    if (!this.closed) {
      this.closed = !0;
      let { _parentage: n } = this;
      if (n)
        if (((this._parentage = null), Array.isArray(n)))
          for (let i of n) i.remove(this);
        else n.remove(this);
      let { initialTeardown: r } = this;
      if (E(r))
        try {
          r();
        } catch (i) {
          t = i instanceof jn ? i.errors : [i];
        }
      let { _finalizers: o } = this;
      if (o) {
        this._finalizers = null;
        for (let i of o)
          try {
            ka(i);
          } catch (s) {
            (t = t ?? []),
              s instanceof jn ? (t = [...t, ...s.errors]) : t.push(s);
          }
      }
      if (t) throw new jn(t);
    }
  }
  add(t) {
    var n;
    if (t && t !== this)
      if (this.closed) ka(t);
      else {
        if (t instanceof e) {
          if (t.closed || t._hasParent(this)) return;
          t._addParent(this);
        }
        (this._finalizers =
          (n = this._finalizers) !== null && n !== void 0 ? n : []).push(t);
      }
  }
  _hasParent(t) {
    let { _parentage: n } = this;
    return n === t || (Array.isArray(n) && n.includes(t));
  }
  _addParent(t) {
    let { _parentage: n } = this;
    this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
  }
  _removeParent(t) {
    let { _parentage: n } = this;
    n === t ? (this._parentage = null) : Array.isArray(n) && Bt(n, t);
  }
  remove(t) {
    let { _finalizers: n } = this;
    n && Bt(n, t), t instanceof e && t._removeParent(this);
  }
};
H.EMPTY = (() => {
  let e = new H();
  return (e.closed = !0), e;
})();
var Ro = H.EMPTY;
function Vn(e) {
  return (
    e instanceof H ||
    (e && "closed" in e && E(e.remove) && E(e.add) && E(e.unsubscribe))
  );
}
function ka(e) {
  E(e) ? e() : e.unsubscribe();
}
var he = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1,
};
var ht = {
  setTimeout(e, t, ...n) {
    let { delegate: r } = ht;
    return r?.setTimeout ? r.setTimeout(e, t, ...n) : setTimeout(e, t, ...n);
  },
  clearTimeout(e) {
    let { delegate: t } = ht;
    return (t?.clearTimeout || clearTimeout)(e);
  },
  delegate: void 0,
};
function Hn(e) {
  ht.setTimeout(() => {
    let { onUnhandledError: t } = he;
    if (t) t(e);
    else throw e;
  });
}
function qt() {}
var La = Po("C", void 0, void 0);
function Fa(e) {
  return Po("E", void 0, e);
}
function ja(e) {
  return Po("N", e, void 0);
}
function Po(e, t, n) {
  return { kind: e, value: t, error: n };
}
var Qe = null;
function gt(e) {
  if (he.useDeprecatedSynchronousErrorHandling) {
    let t = !Qe;
    if ((t && (Qe = { errorThrown: !1, error: null }), e(), t)) {
      let { errorThrown: n, error: r } = Qe;
      if (((Qe = null), n)) throw r;
    }
  } else e();
}
function Va(e) {
  he.useDeprecatedSynchronousErrorHandling &&
    Qe &&
    ((Qe.errorThrown = !0), (Qe.error = e));
}
var Ze = class extends H {
    constructor(t) {
      super(),
        (this.isStopped = !1),
        t
          ? ((this.destination = t), Vn(t) && t.add(this))
          : (this.destination = xf);
    }
    static create(t, n, r) {
      return new mt(t, n, r);
    }
    next(t) {
      this.isStopped ? Lo(ja(t), this) : this._next(t);
    }
    error(t) {
      this.isStopped
        ? Lo(Fa(t), this)
        : ((this.isStopped = !0), this._error(t));
    }
    complete() {
      this.isStopped ? Lo(La, this) : ((this.isStopped = !0), this._complete());
    }
    unsubscribe() {
      this.closed ||
        ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
    }
    _next(t) {
      this.destination.next(t);
    }
    _error(t) {
      try {
        this.destination.error(t);
      } finally {
        this.unsubscribe();
      }
    }
    _complete() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    }
  },
  Tf = Function.prototype.bind;
function ko(e, t) {
  return Tf.call(e, t);
}
var Fo = class {
    constructor(t) {
      this.partialObserver = t;
    }
    next(t) {
      let { partialObserver: n } = this;
      if (n.next)
        try {
          n.next(t);
        } catch (r) {
          Un(r);
        }
    }
    error(t) {
      let { partialObserver: n } = this;
      if (n.error)
        try {
          n.error(t);
        } catch (r) {
          Un(r);
        }
      else Un(t);
    }
    complete() {
      let { partialObserver: t } = this;
      if (t.complete)
        try {
          t.complete();
        } catch (n) {
          Un(n);
        }
    }
  },
  mt = class extends Ze {
    constructor(t, n, r) {
      super();
      let o;
      if (E(t) || !t)
        o = { next: t ?? void 0, error: n ?? void 0, complete: r ?? void 0 };
      else {
        let i;
        this && he.useDeprecatedNextContext
          ? ((i = Object.create(t)),
            (i.unsubscribe = () => this.unsubscribe()),
            (o = {
              next: t.next && ko(t.next, i),
              error: t.error && ko(t.error, i),
              complete: t.complete && ko(t.complete, i),
            }))
          : (o = t);
      }
      this.destination = new Fo(o);
    }
  };
function Un(e) {
  he.useDeprecatedSynchronousErrorHandling ? Va(e) : Hn(e);
}
function bf(e) {
  throw e;
}
function Lo(e, t) {
  let { onStoppedNotification: n } = he;
  n && ht.setTimeout(() => n(e, t));
}
var xf = { closed: !0, next: qt, error: bf, complete: qt };
var yt = (typeof Symbol == "function" && Symbol.observable) || "@@observable";
function ne(e) {
  return e;
}
function _f(...e) {
  return jo(e);
}
function jo(e) {
  return e.length === 0
    ? ne
    : e.length === 1
      ? e[0]
      : function (n) {
          return e.reduce((r, o) => o(r), n);
        };
}
var S = (() => {
  class e {
    constructor(n) {
      n && (this._subscribe = n);
    }
    lift(n) {
      let r = new e();
      return (r.source = this), (r.operator = n), r;
    }
    subscribe(n, r, o) {
      let i = Sf(n) ? n : new mt(n, r, o);
      return (
        gt(() => {
          let { operator: s, source: a } = this;
          i.add(
            s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i)
          );
        }),
        i
      );
    }
    _trySubscribe(n) {
      try {
        return this._subscribe(n);
      } catch (r) {
        n.error(r);
      }
    }
    forEach(n, r) {
      return (
        (r = Ha(r)),
        new r((o, i) => {
          let s = new mt({
            next: (a) => {
              try {
                n(a);
              } catch (c) {
                i(c), s.unsubscribe();
              }
            },
            error: i,
            complete: o,
          });
          this.subscribe(s);
        })
      );
    }
    _subscribe(n) {
      var r;
      return (r = this.source) === null || r === void 0
        ? void 0
        : r.subscribe(n);
    }
    [yt]() {
      return this;
    }
    pipe(...n) {
      return jo(n)(this);
    }
    toPromise(n) {
      return (
        (n = Ha(n)),
        new n((r, o) => {
          let i;
          this.subscribe(
            (s) => (i = s),
            (s) => o(s),
            () => r(i)
          );
        })
      );
    }
  }
  return (e.create = (t) => new e(t)), e;
})();
function Ha(e) {
  var t;
  return (t = e ?? he.Promise) !== null && t !== void 0 ? t : Promise;
}
function Nf(e) {
  return e && E(e.next) && E(e.error) && E(e.complete);
}
function Sf(e) {
  return (e && e instanceof Ze) || (Nf(e) && Vn(e));
}
function Vo(e) {
  return E(e?.lift);
}
function _(e) {
  return (t) => {
    if (Vo(t))
      return t.lift(function (n) {
        try {
          return e(n, this);
        } catch (r) {
          this.error(r);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function T(e, t, n, r, o) {
  return new Ho(e, t, n, r, o);
}
var Ho = class extends Ze {
  constructor(t, n, r, o, i, s) {
    super(t),
      (this.onFinalize = i),
      (this.shouldUnsubscribe = s),
      (this._next = n
        ? function (a) {
            try {
              n(a);
            } catch (c) {
              t.error(c);
            }
          }
        : super._next),
      (this._error = o
        ? function (a) {
            try {
              o(a);
            } catch (c) {
              t.error(c);
            } finally {
              this.unsubscribe();
            }
          }
        : super._error),
      (this._complete = r
        ? function () {
            try {
              r();
            } catch (a) {
              t.error(a);
            } finally {
              this.unsubscribe();
            }
          }
        : super._complete);
  }
  unsubscribe() {
    var t;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      let { closed: n } = this;
      super.unsubscribe(),
        !n && ((t = this.onFinalize) === null || t === void 0 || t.call(this));
    }
  }
};
function Uo() {
  return _((e, t) => {
    let n = null;
    e._refCount++;
    let r = T(t, void 0, void 0, void 0, () => {
      if (!e || e._refCount <= 0 || 0 < --e._refCount) {
        n = null;
        return;
      }
      let o = e._connection,
        i = n;
      (n = null), o && (!i || o === i) && o.unsubscribe(), t.unsubscribe();
    });
    e.subscribe(r), r.closed || (n = e.connect());
  });
}
var $o = class extends S {
  constructor(t, n) {
    super(),
      (this.source = t),
      (this.subjectFactory = n),
      (this._subject = null),
      (this._refCount = 0),
      (this._connection = null),
      Vo(t) && (this.lift = t.lift);
  }
  _subscribe(t) {
    return this.getSubject().subscribe(t);
  }
  getSubject() {
    let t = this._subject;
    return (
      (!t || t.isStopped) && (this._subject = this.subjectFactory()),
      this._subject
    );
  }
  _teardown() {
    this._refCount = 0;
    let { _connection: t } = this;
    (this._subject = this._connection = null), t?.unsubscribe();
  }
  connect() {
    let t = this._connection;
    if (!t) {
      t = this._connection = new H();
      let n = this.getSubject();
      t.add(
        this.source.subscribe(
          T(
            n,
            void 0,
            () => {
              this._teardown(), n.complete();
            },
            (r) => {
              this._teardown(), n.error(r);
            },
            () => this._teardown()
          )
        )
      ),
        t.closed && ((this._connection = null), (t = H.EMPTY));
    }
    return t;
  }
  refCount() {
    return Uo()(this);
  }
};
var Ua = pt(
  (e) =>
    function () {
      e(this),
        (this.name = "ObjectUnsubscribedError"),
        (this.message = "object unsubscribed");
    }
);
var Pe = (() => {
    class e extends S {
      constructor() {
        super(),
          (this.closed = !1),
          (this.currentObservers = null),
          (this.observers = []),
          (this.isStopped = !1),
          (this.hasError = !1),
          (this.thrownError = null);
      }
      lift(n) {
        let r = new $n(this, this);
        return (r.operator = n), r;
      }
      _throwIfClosed() {
        if (this.closed) throw new Ua();
      }
      next(n) {
        gt(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.currentObservers ||
              (this.currentObservers = Array.from(this.observers));
            for (let r of this.currentObservers) r.next(n);
          }
        });
      }
      error(n) {
        gt(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            (this.hasError = this.isStopped = !0), (this.thrownError = n);
            let { observers: r } = this;
            for (; r.length; ) r.shift().error(n);
          }
        });
      }
      complete() {
        gt(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.isStopped = !0;
            let { observers: n } = this;
            for (; n.length; ) n.shift().complete();
          }
        });
      }
      unsubscribe() {
        (this.isStopped = this.closed = !0),
          (this.observers = this.currentObservers = null);
      }
      get observed() {
        var n;
        return (
          ((n = this.observers) === null || n === void 0 ? void 0 : n.length) >
          0
        );
      }
      _trySubscribe(n) {
        return this._throwIfClosed(), super._trySubscribe(n);
      }
      _subscribe(n) {
        return (
          this._throwIfClosed(),
          this._checkFinalizedStatuses(n),
          this._innerSubscribe(n)
        );
      }
      _innerSubscribe(n) {
        let { hasError: r, isStopped: o, observers: i } = this;
        return r || o
          ? Ro
          : ((this.currentObservers = null),
            i.push(n),
            new H(() => {
              (this.currentObservers = null), Bt(i, n);
            }));
      }
      _checkFinalizedStatuses(n) {
        let { hasError: r, thrownError: o, isStopped: i } = this;
        r ? n.error(o) : i && n.complete();
      }
      asObservable() {
        let n = new S();
        return (n.source = this), n;
      }
    }
    return (e.create = (t, n) => new $n(t, n)), e;
  })(),
  $n = class extends Pe {
    constructor(t, n) {
      super(), (this.destination = t), (this.source = n);
    }
    next(t) {
      var n, r;
      (r =
        (n = this.destination) === null || n === void 0 ? void 0 : n.next) ===
        null ||
        r === void 0 ||
        r.call(n, t);
    }
    error(t) {
      var n, r;
      (r =
        (n = this.destination) === null || n === void 0 ? void 0 : n.error) ===
        null ||
        r === void 0 ||
        r.call(n, t);
    }
    complete() {
      var t, n;
      (n =
        (t = this.destination) === null || t === void 0
          ? void 0
          : t.complete) === null ||
        n === void 0 ||
        n.call(t);
    }
    _subscribe(t) {
      var n, r;
      return (r =
        (n = this.source) === null || n === void 0
          ? void 0
          : n.subscribe(t)) !== null && r !== void 0
        ? r
        : Ro;
    }
  };
var Wt = class extends Pe {
  constructor(t) {
    super(), (this._value = t);
  }
  get value() {
    return this.getValue();
  }
  _subscribe(t) {
    let n = super._subscribe(t);
    return !n.closed && t.next(this._value), n;
  }
  getValue() {
    let { hasError: t, thrownError: n, _value: r } = this;
    if (t) throw n;
    return this._throwIfClosed(), r;
  }
  next(t) {
    super.next((this._value = t));
  }
};
var Gt = new S((e) => e.complete());
function $a(e) {
  return e && E(e.schedule);
}
function Ba(e) {
  return e[e.length - 1];
}
function Bn(e) {
  return E(Ba(e)) ? e.pop() : void 0;
}
function ke(e) {
  return $a(Ba(e)) ? e.pop() : void 0;
}
function Wa(e, t, n, r) {
  function o(i) {
    return i instanceof n
      ? i
      : new n(function (s) {
          s(i);
        });
  }
  return new (n || (n = Promise))(function (i, s) {
    function a(u) {
      try {
        l(r.next(u));
      } catch (d) {
        s(d);
      }
    }
    function c(u) {
      try {
        l(r.throw(u));
      } catch (d) {
        s(d);
      }
    }
    function l(u) {
      u.done ? i(u.value) : o(u.value).then(a, c);
    }
    l((r = r.apply(e, t || [])).next());
  });
}
function qa(e) {
  var t = typeof Symbol == "function" && Symbol.iterator,
    n = t && e[t],
    r = 0;
  if (n) return n.call(e);
  if (e && typeof e.length == "number")
    return {
      next: function () {
        return (
          e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }
        );
      },
    };
  throw new TypeError(
    t ? "Object is not iterable." : "Symbol.iterator is not defined."
  );
}
function Ye(e) {
  return this instanceof Ye ? ((this.v = e), this) : new Ye(e);
}
function Ga(e, t, n) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = n.apply(e, t || []),
    o,
    i = [];
  return (
    (o = Object.create(
      (typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype
    )),
    a("next"),
    a("throw"),
    a("return", s),
    (o[Symbol.asyncIterator] = function () {
      return this;
    }),
    o
  );
  function s(f) {
    return function (h) {
      return Promise.resolve(h).then(f, d);
    };
  }
  function a(f, h) {
    r[f] &&
      ((o[f] = function (g) {
        return new Promise(function (M, v) {
          i.push([f, g, M, v]) > 1 || c(f, g);
        });
      }),
      h && (o[f] = h(o[f])));
  }
  function c(f, h) {
    try {
      l(r[f](h));
    } catch (g) {
      p(i[0][3], g);
    }
  }
  function l(f) {
    f.value instanceof Ye
      ? Promise.resolve(f.value.v).then(u, d)
      : p(i[0][2], f);
  }
  function u(f) {
    c("next", f);
  }
  function d(f) {
    c("throw", f);
  }
  function p(f, h) {
    f(h), i.shift(), i.length && c(i[0][0], i[0][1]);
  }
}
function za(e) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator],
    n;
  return t
    ? t.call(e)
    : ((e = typeof qa == "function" ? qa(e) : e[Symbol.iterator]()),
      (n = {}),
      r("next"),
      r("throw"),
      r("return"),
      (n[Symbol.asyncIterator] = function () {
        return this;
      }),
      n);
  function r(i) {
    n[i] =
      e[i] &&
      function (s) {
        return new Promise(function (a, c) {
          (s = e[i](s)), o(a, c, s.done, s.value);
        });
      };
  }
  function o(i, s, a, c) {
    Promise.resolve(c).then(function (l) {
      i({ value: l, done: a });
    }, s);
  }
}
var qn = (e) => e && typeof e.length == "number" && typeof e != "function";
function Wn(e) {
  return E(e?.then);
}
function Gn(e) {
  return E(e[yt]);
}
function zn(e) {
  return Symbol.asyncIterator && E(e?.[Symbol.asyncIterator]);
}
function Qn(e) {
  return new TypeError(
    `You provided ${e !== null && typeof e == "object" ? "an invalid object" : `'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
  );
}
function Of() {
  return typeof Symbol != "function" || !Symbol.iterator
    ? "@@iterator"
    : Symbol.iterator;
}
var Zn = Of();
function Yn(e) {
  return E(e?.[Zn]);
}
function Kn(e) {
  return Ga(this, arguments, function* () {
    let n = e.getReader();
    try {
      for (;;) {
        let { value: r, done: o } = yield Ye(n.read());
        if (o) return yield Ye(void 0);
        yield yield Ye(r);
      }
    } finally {
      n.releaseLock();
    }
  });
}
function Jn(e) {
  return E(e?.getReader);
}
function j(e) {
  if (e instanceof S) return e;
  if (e != null) {
    if (Gn(e)) return Af(e);
    if (qn(e)) return Rf(e);
    if (Wn(e)) return Pf(e);
    if (zn(e)) return Qa(e);
    if (Yn(e)) return kf(e);
    if (Jn(e)) return Lf(e);
  }
  throw Qn(e);
}
function Af(e) {
  return new S((t) => {
    let n = e[yt]();
    if (E(n.subscribe)) return n.subscribe(t);
    throw new TypeError(
      "Provided object does not correctly implement Symbol.observable"
    );
  });
}
function Rf(e) {
  return new S((t) => {
    for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
    t.complete();
  });
}
function Pf(e) {
  return new S((t) => {
    e.then(
      (n) => {
        t.closed || (t.next(n), t.complete());
      },
      (n) => t.error(n)
    ).then(null, Hn);
  });
}
function kf(e) {
  return new S((t) => {
    for (let n of e) if ((t.next(n), t.closed)) return;
    t.complete();
  });
}
function Qa(e) {
  return new S((t) => {
    Ff(e, t).catch((n) => t.error(n));
  });
}
function Lf(e) {
  return Qa(Kn(e));
}
function Ff(e, t) {
  var n, r, o, i;
  return Wa(this, void 0, void 0, function* () {
    try {
      for (n = za(e); (r = yield n.next()), !r.done; ) {
        let s = r.value;
        if ((t.next(s), t.closed)) return;
      }
    } catch (s) {
      o = { error: s };
    } finally {
      try {
        r && !r.done && (i = n.return) && (yield i.call(n));
      } finally {
        if (o) throw o.error;
      }
    }
    t.complete();
  });
}
function te(e, t, n, r = 0, o = !1) {
  let i = t.schedule(function () {
    n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
  }, r);
  if ((e.add(i), !o)) return i;
}
function Xn(e, t = 0) {
  return _((n, r) => {
    n.subscribe(
      T(
        r,
        (o) => te(r, e, () => r.next(o), t),
        () => te(r, e, () => r.complete(), t),
        (o) => te(r, e, () => r.error(o), t)
      )
    );
  });
}
function er(e, t = 0) {
  return _((n, r) => {
    r.add(e.schedule(() => n.subscribe(r), t));
  });
}
function Za(e, t) {
  return j(e).pipe(er(t), Xn(t));
}
function Ya(e, t) {
  return j(e).pipe(er(t), Xn(t));
}
function Ka(e, t) {
  return new S((n) => {
    let r = 0;
    return t.schedule(function () {
      r === e.length
        ? n.complete()
        : (n.next(e[r++]), n.closed || this.schedule());
    });
  });
}
function Ja(e, t) {
  return new S((n) => {
    let r;
    return (
      te(n, t, () => {
        (r = e[Zn]()),
          te(
            n,
            t,
            () => {
              let o, i;
              try {
                ({ value: o, done: i } = r.next());
              } catch (s) {
                n.error(s);
                return;
              }
              i ? n.complete() : n.next(o);
            },
            0,
            !0
          );
      }),
      () => E(r?.return) && r.return()
    );
  });
}
function tr(e, t) {
  if (!e) throw new Error("Iterable cannot be null");
  return new S((n) => {
    te(n, t, () => {
      let r = e[Symbol.asyncIterator]();
      te(
        n,
        t,
        () => {
          r.next().then((o) => {
            o.done ? n.complete() : n.next(o.value);
          });
        },
        0,
        !0
      );
    });
  });
}
function Xa(e, t) {
  return tr(Kn(e), t);
}
function ec(e, t) {
  if (e != null) {
    if (Gn(e)) return Za(e, t);
    if (qn(e)) return Ka(e, t);
    if (Wn(e)) return Ya(e, t);
    if (zn(e)) return tr(e, t);
    if (Yn(e)) return Ja(e, t);
    if (Jn(e)) return Xa(e, t);
  }
  throw Qn(e);
}
function Le(e, t) {
  return t ? ec(e, t) : j(e);
}
function jf(...e) {
  let t = ke(e);
  return Le(e, t);
}
function Vf(e, t) {
  let n = E(e) ? e : () => e,
    r = (o) => o.error(n());
  return new S(t ? (o) => t.schedule(r, 0, o) : r);
}
function Hf(e) {
  return !!e && (e instanceof S || (E(e.lift) && E(e.subscribe)));
}
var Ke = pt(
  (e) =>
    function () {
      e(this),
        (this.name = "EmptyError"),
        (this.message = "no elements in sequence");
    }
);
function xe(e, t) {
  return _((n, r) => {
    let o = 0;
    n.subscribe(
      T(r, (i) => {
        r.next(e.call(t, i, o++));
      })
    );
  });
}
var { isArray: Uf } = Array;
function $f(e, t) {
  return Uf(t) ? e(...t) : e(t);
}
function nr(e) {
  return xe((t) => $f(e, t));
}
var { isArray: Bf } = Array,
  { getPrototypeOf: qf, prototype: Wf, keys: Gf } = Object;
function rr(e) {
  if (e.length === 1) {
    let t = e[0];
    if (Bf(t)) return { args: t, keys: null };
    if (zf(t)) {
      let n = Gf(t);
      return { args: n.map((r) => t[r]), keys: n };
    }
  }
  return { args: e, keys: null };
}
function zf(e) {
  return e && typeof e == "object" && qf(e) === Wf;
}
function or(e, t) {
  return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
}
function Qf(...e) {
  let t = ke(e),
    n = Bn(e),
    { args: r, keys: o } = rr(e);
  if (r.length === 0) return Le([], t);
  let i = new S(Zf(r, t, o ? (s) => or(o, s) : ne));
  return n ? i.pipe(nr(n)) : i;
}
function Zf(e, t, n = ne) {
  return (r) => {
    tc(
      t,
      () => {
        let { length: o } = e,
          i = new Array(o),
          s = o,
          a = o;
        for (let c = 0; c < o; c++)
          tc(
            t,
            () => {
              let l = Le(e[c], t),
                u = !1;
              l.subscribe(
                T(
                  r,
                  (d) => {
                    (i[c] = d), u || ((u = !0), a--), a || r.next(n(i.slice()));
                  },
                  () => {
                    --s || r.complete();
                  }
                )
              );
            },
            r
          );
      },
      r
    );
  };
}
function tc(e, t, n) {
  e ? te(n, e, t) : t();
}
function nc(e, t, n, r, o, i, s, a) {
  let c = [],
    l = 0,
    u = 0,
    d = !1,
    p = () => {
      d && !c.length && !l && t.complete();
    },
    f = (g) => (l < r ? h(g) : c.push(g)),
    h = (g) => {
      i && t.next(g), l++;
      let M = !1;
      j(n(g, u++)).subscribe(
        T(
          t,
          (v) => {
            o?.(v), i ? f(v) : t.next(v);
          },
          () => {
            M = !0;
          },
          void 0,
          () => {
            if (M)
              try {
                for (l--; c.length && l < r; ) {
                  let v = c.shift();
                  s ? te(t, s, () => h(v)) : h(v);
                }
                p();
              } catch (v) {
                t.error(v);
              }
          }
        )
      );
    };
  return (
    e.subscribe(
      T(t, f, () => {
        (d = !0), p();
      })
    ),
    () => {
      a?.();
    }
  );
}
function Je(e, t, n = 1 / 0) {
  return E(t)
    ? Je((r, o) => xe((i, s) => t(r, i, o, s))(j(e(r, o))), n)
    : (typeof t == "number" && (n = t), _((r, o) => nc(r, o, e, n)));
}
function Bo(e = 1 / 0) {
  return Je(ne, e);
}
function rc() {
  return Bo(1);
}
function ir(...e) {
  return rc()(Le(e, ke(e)));
}
function Yf(e) {
  return new S((t) => {
    j(e()).subscribe(t);
  });
}
function Kf(...e) {
  let t = Bn(e),
    { args: n, keys: r } = rr(e),
    o = new S((i) => {
      let { length: s } = n;
      if (!s) {
        i.complete();
        return;
      }
      let a = new Array(s),
        c = s,
        l = s;
      for (let u = 0; u < s; u++) {
        let d = !1;
        j(n[u]).subscribe(
          T(
            i,
            (p) => {
              d || ((d = !0), l--), (a[u] = p);
            },
            () => c--,
            void 0,
            () => {
              (!c || !d) && (l || i.next(r ? or(r, a) : a), i.complete());
            }
          )
        );
      }
    });
  return t ? o.pipe(nr(t)) : o;
}
function zt(e, t) {
  return _((n, r) => {
    let o = 0;
    n.subscribe(T(r, (i) => e.call(t, i, o++) && r.next(i)));
  });
}
function oc(e) {
  return _((t, n) => {
    let r = null,
      o = !1,
      i;
    (r = t.subscribe(
      T(n, void 0, void 0, (s) => {
        (i = j(e(s, oc(e)(t)))),
          r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
      })
    )),
      o && (r.unsubscribe(), (r = null), i.subscribe(n));
  });
}
function ic(e, t, n, r, o) {
  return (i, s) => {
    let a = n,
      c = t,
      l = 0;
    i.subscribe(
      T(
        s,
        (u) => {
          let d = l++;
          (c = a ? e(c, u, d) : ((a = !0), u)), r && s.next(c);
        },
        o &&
          (() => {
            a && s.next(c), s.complete();
          })
      )
    );
  };
}
function Jf(e, t) {
  return E(t) ? Je(e, t, 1) : Je(e, 1);
}
function Qt(e) {
  return _((t, n) => {
    let r = !1;
    t.subscribe(
      T(
        n,
        (o) => {
          (r = !0), n.next(o);
        },
        () => {
          r || n.next(e), n.complete();
        }
      )
    );
  });
}
function qo(e) {
  return e <= 0
    ? () => Gt
    : _((t, n) => {
        let r = 0;
        t.subscribe(
          T(n, (o) => {
            ++r <= e && (n.next(o), e <= r && n.complete());
          })
        );
      });
}
function Xf(e) {
  return xe(() => e);
}
function sr(e = ep) {
  return _((t, n) => {
    let r = !1;
    t.subscribe(
      T(
        n,
        (o) => {
          (r = !0), n.next(o);
        },
        () => (r ? n.complete() : n.error(e()))
      )
    );
  });
}
function ep() {
  return new Ke();
}
function tp(e) {
  return _((t, n) => {
    try {
      t.subscribe(n);
    } finally {
      n.add(e);
    }
  });
}
function Wo(e, t) {
  let n = arguments.length >= 2;
  return (r) =>
    r.pipe(
      e ? zt((o, i) => e(o, i, r)) : ne,
      qo(1),
      n ? Qt(t) : sr(() => new Ke())
    );
}
function Go(e) {
  return e <= 0
    ? () => Gt
    : _((t, n) => {
        let r = [];
        t.subscribe(
          T(
            n,
            (o) => {
              r.push(o), e < r.length && r.shift();
            },
            () => {
              for (let o of r) n.next(o);
              n.complete();
            },
            void 0,
            () => {
              r = null;
            }
          )
        );
      });
}
function np(e, t) {
  let n = arguments.length >= 2;
  return (r) =>
    r.pipe(
      e ? zt((o, i) => e(o, i, r)) : ne,
      Go(1),
      n ? Qt(t) : sr(() => new Ke())
    );
}
function rp(e, t) {
  return _(ic(e, t, arguments.length >= 2, !0));
}
function op(...e) {
  let t = ke(e);
  return _((n, r) => {
    (t ? ir(e, n, t) : ir(e, n)).subscribe(r);
  });
}
function ip(e, t) {
  return _((n, r) => {
    let o = null,
      i = 0,
      s = !1,
      a = () => s && !o && r.complete();
    n.subscribe(
      T(
        r,
        (c) => {
          o?.unsubscribe();
          let l = 0,
            u = i++;
          j(e(c, u)).subscribe(
            (o = T(
              r,
              (d) => r.next(t ? t(c, d, u, l++) : d),
              () => {
                (o = null), a();
              }
            ))
          );
        },
        () => {
          (s = !0), a();
        }
      )
    );
  });
}
function sp(e) {
  return _((t, n) => {
    j(e).subscribe(T(n, () => n.complete(), qt)), !n.closed && t.subscribe(n);
  });
}
function ap(e, t, n) {
  let r = E(e) || t || n ? { next: e, error: t, complete: n } : e;
  return r
    ? _((o, i) => {
        var s;
        (s = r.subscribe) === null || s === void 0 || s.call(r);
        let a = !0;
        o.subscribe(
          T(
            i,
            (c) => {
              var l;
              (l = r.next) === null || l === void 0 || l.call(r, c), i.next(c);
            },
            () => {
              var c;
              (a = !1),
                (c = r.complete) === null || c === void 0 || c.call(r),
                i.complete();
            },
            (c) => {
              var l;
              (a = !1),
                (l = r.error) === null || l === void 0 || l.call(r, c),
                i.error(c);
            },
            () => {
              var c, l;
              a && ((c = r.unsubscribe) === null || c === void 0 || c.call(r)),
                (l = r.finalize) === null || l === void 0 || l.call(r);
            }
          )
        );
      })
    : ne;
}
var zo = { JSACTION: "jsaction" };
var L = {
    AUXCLICK: "auxclick",
    CHANGE: "change",
    CLICK: "click",
    CLICKMOD: "clickmod",
    CLICKONLY: "clickonly",
    DBLCLICK: "dblclick",
    FOCUS: "focus",
    FOCUSIN: "focusin",
    BLUR: "blur",
    FOCUSOUT: "focusout",
    SUBMIT: "submit",
    KEYDOWN: "keydown",
    KEYPRESS: "keypress",
    KEYUP: "keyup",
    MOUSEUP: "mouseup",
    MOUSEDOWN: "mousedown",
    MOUSEOVER: "mouseover",
    MOUSEOUT: "mouseout",
    MOUSEENTER: "mouseenter",
    MOUSELEAVE: "mouseleave",
    MOUSEMOVE: "mousemove",
    POINTERUP: "pointerup",
    POINTERDOWN: "pointerdown",
    POINTEROVER: "pointerover",
    POINTEROUT: "pointerout",
    POINTERENTER: "pointerenter",
    POINTERLEAVE: "pointerleave",
    POINTERMOVE: "pointermove",
    POINTERCANCEL: "pointercancel",
    GOTPOINTERCAPTURE: "gotpointercapture",
    LOSTPOINTERCAPTURE: "lostpointercapture",
    ERROR: "error",
    LOAD: "load",
    UNLOAD: "unload",
    TOUCHSTART: "touchstart",
    TOUCHEND: "touchend",
    TOUCHMOVE: "touchmove",
    INPUT: "input",
    SCROLL: "scroll",
    TOGGLE: "toggle",
    CUSTOM: "_custom",
  },
  Kb = [L.MOUSEENTER, L.MOUSELEAVE, "pointerenter", "pointerleave"],
  cp = [
    L.CLICK,
    L.DBLCLICK,
    L.FOCUSIN,
    L.FOCUSOUT,
    L.KEYDOWN,
    L.KEYUP,
    L.KEYPRESS,
    L.MOUSEOVER,
    L.MOUSEOUT,
    L.SUBMIT,
    L.TOUCHSTART,
    L.TOUCHEND,
    L.TOUCHMOVE,
    "touchcancel",
    "auxclick",
    "change",
    "compositionstart",
    "compositionupdate",
    "compositionend",
    "beforeinput",
    "input",
    "select",
    "copy",
    "cut",
    "paste",
    "mousedown",
    "mouseup",
    "wheel",
    "contextmenu",
    "dragover",
    "dragenter",
    "dragleave",
    "drop",
    "dragstart",
    "dragend",
    "pointerdown",
    "pointermove",
    "pointerup",
    "pointercancel",
    "pointerover",
    "pointerout",
    "gotpointercapture",
    "lostpointercapture",
    "ended",
    "loadedmetadata",
    "pagehide",
    "pageshow",
    "visibilitychange",
    "beforematch",
  ],
  sc = [L.FOCUS, L.BLUR, L.ERROR, L.LOAD, L.TOGGLE],
  ac = (e) => sc.indexOf(e) >= 0,
  lp = cp.concat(sc),
  cc = (e) => lp.indexOf(e) >= 0,
  up = 3,
  dp = 13,
  fp = 32,
  re = { MAC_ENTER: up, ENTER: dp, SPACE: fp };
var Jb = typeof navigator < "u" && /Macintosh/.test(navigator.userAgent);
var Xb =
    typeof navigator < "u" &&
    !/Opera/.test(navigator.userAgent) &&
    /WebKit/.test(navigator.userAgent),
  ex =
    typeof navigator < "u" &&
    (/MSIE/.test(navigator.userAgent) || /Trident/.test(navigator.userAgent)),
  tx =
    typeof navigator < "u" &&
    !/Opera|WebKit/.test(navigator.userAgent) &&
    /Gecko/.test(navigator.product);
var nx = { Enter: re.ENTER, " ": re.SPACE },
  rx = {
    A: re.ENTER,
    BUTTON: 0,
    CHECKBOX: re.SPACE,
    COMBOBOX: re.ENTER,
    FILE: 0,
    GRIDCELL: re.ENTER,
    LINK: re.ENTER,
    LISTBOX: re.ENTER,
    MENU: 0,
    MENUBAR: 0,
    MENUITEM: 0,
    MENUITEMCHECKBOX: 0,
    MENUITEMRADIO: 0,
    OPTION: 0,
    RADIO: re.SPACE,
    RADIOGROUP: re.SPACE,
    RESET: 0,
    SUBMIT: 0,
    SWITCH: re.SPACE,
    TAB: 0,
    TREE: re.ENTER,
    TREEITEM: re.ENTER,
  };
var ox = typeof navigator < "u" && /iPhone|iPad|iPod/.test(navigator.userAgent);
var ix = L.CLICK;
var Zc = "https://g.co/ng/security#xss",
  x = class extends Error {
    constructor(t, n) {
      super(pp(t, n)), (this.code = t);
    }
  };
function pp(e, t) {
  return `${`NG0${Math.abs(e)}`}${t ? ": " + t : ""}`;
}
function Cn(e) {
  return { toString: e }.toString();
}
var ar = "__parameters__";
function hp(e) {
  return function (...n) {
    if (e) {
      let r = e(...n);
      for (let o in r) this[o] = r[o];
    }
  };
}
function Yc(e, t, n) {
  return Cn(() => {
    let r = hp(t);
    function o(...i) {
      if (this instanceof o) return r.apply(this, i), this;
      let s = new o(...i);
      return (a.annotation = s), a;
      function a(c, l, u) {
        let d = c.hasOwnProperty(ar)
          ? c[ar]
          : Object.defineProperty(c, ar, { value: [] })[ar];
        for (; d.length <= u; ) d.push(null);
        return (d[u] = d[u] || []).push(s), c;
      }
    }
    return (
      n && (o.prototype = Object.create(n.prototype)),
      (o.prototype.ngMetadataName = e),
      (o.annotationCls = o),
      o
    );
  });
}
var tn = globalThis;
function R(e) {
  for (let t in e) if (e[t] === R) return t;
  throw Error("Could not find renamed property on target object.");
}
function gp(e, t) {
  for (let n in t) t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
}
function oe(e) {
  if (typeof e == "string") return e;
  if (Array.isArray(e)) return "[" + e.map(oe).join(", ") + "]";
  if (e == null) return "" + e;
  if (e.overriddenName) return `${e.overriddenName}`;
  if (e.name) return `${e.name}`;
  let t = e.toString();
  if (t == null) return "" + t;
  let n = t.indexOf(`
`);
  return n === -1 ? t : t.substring(0, n);
}
function fi(e, t) {
  return e == null || e === ""
    ? t === null
      ? ""
      : t
    : t == null || t === ""
      ? e
      : e + " " + t;
}
var mp = R({ __forward_ref__: R });
function Kc(e) {
  return (
    (e.__forward_ref__ = Kc),
    (e.toString = function () {
      return oe(this());
    }),
    e
  );
}
function K(e) {
  return Jc(e) ? e() : e;
}
function Jc(e) {
  return (
    typeof e == "function" && e.hasOwnProperty(mp) && e.__forward_ref__ === Kc
  );
}
function yp(e, t, n) {
  e != t && vp(n, e, t, "==");
}
function vp(e, t, n, r) {
  throw new Error(
    `ASSERTION ERROR: ${e}` +
      (r == null ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
  );
}
function B(e) {
  return {
    token: e.token,
    providedIn: e.providedIn || null,
    factory: e.factory,
    value: void 0,
  };
}
function vx(e) {
  return { providers: e.providers || [], imports: e.imports || [] };
}
function to(e) {
  return lc(e, Xc) || lc(e, el);
}
function Ex(e) {
  return to(e) !== null;
}
function lc(e, t) {
  return e.hasOwnProperty(t) ? e[t] : null;
}
function Ep(e) {
  let t = e && (e[Xc] || e[el]);
  return t || null;
}
function uc(e) {
  return e && (e.hasOwnProperty(dc) || e.hasOwnProperty(Ip)) ? e[dc] : null;
}
var Xc = R({ ɵprov: R }),
  dc = R({ ɵinj: R }),
  el = R({ ngInjectableDef: R }),
  Ip = R({ ngInjectorDef: R }),
  N = class {
    constructor(t, n) {
      (this._desc = t),
        (this.ngMetadataName = "InjectionToken"),
        (this.ɵprov = void 0),
        typeof n == "number"
          ? (this.__NG_ELEMENT_ID__ = n)
          : n !== void 0 &&
            (this.ɵprov = B({
              token: this,
              providedIn: n.providedIn || "root",
              factory: n.factory,
            }));
    }
    get multi() {
      return this;
    }
    toString() {
      return `InjectionToken ${this._desc}`;
    }
  };
function tl(e) {
  return e && !!e.ɵproviders;
}
var wp = R({ ɵcmp: R }),
  Dp = R({ ɵdir: R }),
  Cp = R({ ɵpipe: R }),
  Mp = R({ ɵmod: R }),
  Cr = R({ ɵfac: R }),
  Yt = R({ __NG_ELEMENT_ID__: R }),
  fc = R({ __NG_ENV_ID__: R });
function Mn(e) {
  return typeof e == "string" ? e : e == null ? "" : String(e);
}
function Tp(e) {
  return typeof e == "function"
    ? e.name || e.toString()
    : typeof e == "object" && e != null && typeof e.type == "function"
      ? e.type.name || e.type.toString()
      : Mn(e);
}
function bp(e, t) {
  let n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
  throw new x(-200, e);
}
function Ms(e, t) {
  throw new x(-201, !1);
}
var b = (function (e) {
    return (
      (e[(e.Default = 0)] = "Default"),
      (e[(e.Host = 1)] = "Host"),
      (e[(e.Self = 2)] = "Self"),
      (e[(e.SkipSelf = 4)] = "SkipSelf"),
      (e[(e.Optional = 8)] = "Optional"),
      e
    );
  })(b || {}),
  pi;
function nl() {
  return pi;
}
function ce(e) {
  let t = pi;
  return (pi = e), t;
}
function rl(e, t, n) {
  let r = to(e);
  if (r && r.providedIn == "root")
    return r.value === void 0 ? (r.value = r.factory()) : r.value;
  if (n & b.Optional) return null;
  if (t !== void 0) return t;
  Ms(e, "Injector");
}
var xp = {},
  nn = xp,
  hi = "__NG_DI_FLAG__",
  Mr = "ngTempTokenPath",
  _p = "ngTokenPath",
  Np = /\n/gm,
  Sp = "\u0275",
  pc = "__source",
  Dt;
function Op() {
  return Dt;
}
function Fe(e) {
  let t = Dt;
  return (Dt = e), t;
}
function Ap(e, t = b.Default) {
  if (Dt === void 0) throw new x(-203, !1);
  return Dt === null
    ? rl(e, void 0, t)
    : Dt.get(e, t & b.Optional ? null : void 0, t);
}
function le(e, t = b.Default) {
  return (nl() || Ap)(K(e), t);
}
function w(e, t = b.Default) {
  return le(e, no(t));
}
function no(e) {
  return typeof e > "u" || typeof e == "number"
    ? e
    : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4);
}
function gi(e) {
  let t = [];
  for (let n = 0; n < e.length; n++) {
    let r = K(e[n]);
    if (Array.isArray(r)) {
      if (r.length === 0) throw new x(900, !1);
      let o,
        i = b.Default;
      for (let s = 0; s < r.length; s++) {
        let a = r[s],
          c = Rp(a);
        typeof c == "number" ? (c === -1 ? (o = a.token) : (i |= c)) : (o = a);
      }
      t.push(le(o, i));
    } else t.push(le(r));
  }
  return t;
}
function ol(e, t) {
  return (e[hi] = t), (e.prototype[hi] = t), e;
}
function Rp(e) {
  return e[hi];
}
function Pp(e, t, n, r) {
  let o = e[Mr];
  throw (
    (t[pc] && o.unshift(t[pc]),
    (e.message = kp(
      `
` + e.message,
      o,
      n,
      r
    )),
    (e[_p] = o),
    (e[Mr] = null),
    e)
  );
}
function kp(e, t, n, r = null) {
  e =
    e &&
    e.charAt(0) ===
      `
` &&
    e.charAt(1) == Sp
      ? e.slice(2)
      : e;
  let o = oe(t);
  if (Array.isArray(t)) o = t.map(oe).join(" -> ");
  else if (typeof t == "object") {
    let i = [];
    for (let s in t)
      if (t.hasOwnProperty(s)) {
        let a = t[s];
        i.push(s + ":" + (typeof a == "string" ? JSON.stringify(a) : oe(a)));
      }
    o = `{${i.join(", ")}}`;
  }
  return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
    Np,
    `
  `
  )}`;
}
var Ix = ol(Yc("Optional"), 8);
var wx = ol(Yc("SkipSelf"), 4);
function Mt(e, t) {
  let n = e.hasOwnProperty(Cr);
  return n ? e[Cr] : null;
}
function Lp(e, t, n) {
  if (e.length !== t.length) return !1;
  for (let r = 0; r < e.length; r++) {
    let o = e[r],
      i = t[r];
    if ((n && ((o = n(o)), (i = n(i))), i !== o)) return !1;
  }
  return !0;
}
function Fp(e) {
  return e.flat(Number.POSITIVE_INFINITY);
}
function Ts(e, t) {
  e.forEach((n) => (Array.isArray(n) ? Ts(n, t) : t(n)));
}
function il(e, t, n) {
  t >= e.length ? e.push(n) : e.splice(t, 0, n);
}
function Tr(e, t) {
  return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
}
function jp(e, t, n, r) {
  let o = e.length;
  if (o == t) e.push(n, r);
  else if (o === 1) e.push(r, e[0]), (e[0] = n);
  else {
    for (o--, e.push(e[o - 1], e[o]); o > t; ) {
      let i = o - 2;
      (e[o] = e[i]), o--;
    }
    (e[t] = n), (e[t + 1] = r);
  }
}
function bs(e, t, n) {
  let r = Tn(e, t);
  return r >= 0 ? (e[r | 1] = n) : ((r = ~r), jp(e, r, t, n)), r;
}
function Qo(e, t) {
  let n = Tn(e, t);
  if (n >= 0) return e[n | 1];
}
function Tn(e, t) {
  return Vp(e, t, 1);
}
function Vp(e, t, n) {
  let r = 0,
    o = e.length >> n;
  for (; o !== r; ) {
    let i = r + ((o - r) >> 1),
      s = e[i << n];
    if (t === s) return i << n;
    s > t ? (o = i) : (r = i + 1);
  }
  return ~(o << n);
}
var Tt = {},
  Q = [],
  rn = new N(""),
  sl = new N("", -1),
  al = new N(""),
  br = class {
    get(t, n = nn) {
      if (n === nn) {
        let r = new Error(`NullInjectorError: No provider for ${oe(t)}!`);
        throw ((r.name = "NullInjectorError"), r);
      }
      return n;
    }
  },
  cl = (function (e) {
    return (e[(e.OnPush = 0)] = "OnPush"), (e[(e.Default = 1)] = "Default"), e;
  })(cl || {}),
  bt = (function (e) {
    return (
      (e[(e.Emulated = 0)] = "Emulated"),
      (e[(e.None = 2)] = "None"),
      (e[(e.ShadowDom = 3)] = "ShadowDom"),
      e
    );
  })(bt || {}),
  He = (function (e) {
    return (
      (e[(e.None = 0)] = "None"),
      (e[(e.SignalBased = 1)] = "SignalBased"),
      (e[(e.HasDecoratorInputTransform = 2)] = "HasDecoratorInputTransform"),
      e
    );
  })(He || {});
function Hp(e, t, n) {
  let r = e.length;
  for (;;) {
    let o = e.indexOf(t, n);
    if (o === -1) return o;
    if (o === 0 || e.charCodeAt(o - 1) <= 32) {
      let i = t.length;
      if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
    }
    n = o + 1;
  }
}
function mi(e, t, n) {
  let r = 0;
  for (; r < n.length; ) {
    let o = n[r];
    if (typeof o == "number") {
      if (o !== 0) break;
      r++;
      let i = n[r++],
        s = n[r++],
        a = n[r++];
      e.setAttribute(t, s, a, i);
    } else {
      let i = o,
        s = n[++r];
      Up(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
    }
  }
  return r;
}
function ll(e) {
  return e === 3 || e === 4 || e === 6;
}
function Up(e) {
  return e.charCodeAt(0) === 64;
}
function on(e, t) {
  if (!(t === null || t.length === 0))
    if (e === null || e.length === 0) e = t.slice();
    else {
      let n = -1;
      for (let r = 0; r < t.length; r++) {
        let o = t[r];
        typeof o == "number"
          ? (n = o)
          : n === 0 ||
            (n === -1 || n === 2
              ? hc(e, n, o, null, t[++r])
              : hc(e, n, o, null, null));
      }
    }
  return e;
}
function hc(e, t, n, r, o) {
  let i = 0,
    s = e.length;
  if (t === -1) s = -1;
  else
    for (; i < e.length; ) {
      let a = e[i++];
      if (typeof a == "number") {
        if (a === t) {
          s = -1;
          break;
        } else if (a > t) {
          s = i - 1;
          break;
        }
      }
    }
  for (; i < e.length; ) {
    let a = e[i];
    if (typeof a == "number") break;
    if (a === n) {
      if (r === null) {
        o !== null && (e[i + 1] = o);
        return;
      } else if (r === e[i + 1]) {
        e[i + 2] = o;
        return;
      }
    }
    i++, r !== null && i++, o !== null && i++;
  }
  s !== -1 && (e.splice(s, 0, t), (i = s + 1)),
    e.splice(i++, 0, n),
    r !== null && e.splice(i++, 0, r),
    o !== null && e.splice(i++, 0, o);
}
var ul = "ng-template";
function $p(e, t, n, r) {
  let o = 0;
  if (r) {
    for (; o < t.length && typeof t[o] == "string"; o += 2)
      if (t[o] === "class" && Hp(t[o + 1].toLowerCase(), n, 0) !== -1)
        return !0;
  } else if (xs(e)) return !1;
  if (((o = t.indexOf(1, o)), o > -1)) {
    let i;
    for (; ++o < t.length && typeof (i = t[o]) == "string"; )
      if (i.toLowerCase() === n) return !0;
  }
  return !1;
}
function xs(e) {
  return e.type === 4 && e.value !== ul;
}
function Bp(e, t, n) {
  let r = e.type === 4 && !n ? ul : e.value;
  return t === r;
}
function qp(e, t, n) {
  let r = 4,
    o = e.attrs,
    i = o !== null ? zp(o) : 0,
    s = !1;
  for (let a = 0; a < t.length; a++) {
    let c = t[a];
    if (typeof c == "number") {
      if (!s && !ge(r) && !ge(c)) return !1;
      if (s && ge(c)) continue;
      (s = !1), (r = c | (r & 1));
      continue;
    }
    if (!s)
      if (r & 4) {
        if (
          ((r = 2 | (r & 1)),
          (c !== "" && !Bp(e, c, n)) || (c === "" && t.length === 1))
        ) {
          if (ge(r)) return !1;
          s = !0;
        }
      } else if (r & 8) {
        if (o === null || !$p(e, o, c, n)) {
          if (ge(r)) return !1;
          s = !0;
        }
      } else {
        let l = t[++a],
          u = Wp(c, o, xs(e), n);
        if (u === -1) {
          if (ge(r)) return !1;
          s = !0;
          continue;
        }
        if (l !== "") {
          let d;
          if (
            (u > i ? (d = "") : (d = o[u + 1].toLowerCase()), r & 2 && l !== d)
          ) {
            if (ge(r)) return !1;
            s = !0;
          }
        }
      }
  }
  return ge(r) || s;
}
function ge(e) {
  return (e & 1) === 0;
}
function Wp(e, t, n, r) {
  if (t === null) return -1;
  let o = 0;
  if (r || !n) {
    let i = !1;
    for (; o < t.length; ) {
      let s = t[o];
      if (s === e) return o;
      if (s === 3 || s === 6) i = !0;
      else if (s === 1 || s === 2) {
        let a = t[++o];
        for (; typeof a == "string"; ) a = t[++o];
        continue;
      } else {
        if (s === 4) break;
        if (s === 0) {
          o += 4;
          continue;
        }
      }
      o += i ? 1 : 2;
    }
    return -1;
  } else return Qp(t, e);
}
function Gp(e, t, n = !1) {
  for (let r = 0; r < t.length; r++) if (qp(e, t[r], n)) return !0;
  return !1;
}
function zp(e) {
  for (let t = 0; t < e.length; t++) {
    let n = e[t];
    if (ll(n)) return t;
  }
  return e.length;
}
function Qp(e, t) {
  let n = e.indexOf(4);
  if (n > -1)
    for (n++; n < e.length; ) {
      let r = e[n];
      if (typeof r == "number") return -1;
      if (r === t) return n;
      n++;
    }
  return -1;
}
function gc(e, t) {
  return e ? ":not(" + t.trim() + ")" : t;
}
function Zp(e) {
  let t = e[0],
    n = 1,
    r = 2,
    o = "",
    i = !1;
  for (; n < e.length; ) {
    let s = e[n];
    if (typeof s == "string")
      if (r & 2) {
        let a = e[++n];
        o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
      } else r & 8 ? (o += "." + s) : r & 4 && (o += " " + s);
    else
      o !== "" && !ge(s) && ((t += gc(i, o)), (o = "")),
        (r = s),
        (i = i || !ge(r));
    n++;
  }
  return o !== "" && (t += gc(i, o)), t;
}
function Yp(e) {
  return e.map(Zp).join(",");
}
function Kp(e) {
  let t = [],
    n = [],
    r = 1,
    o = 2;
  for (; r < e.length; ) {
    let i = e[r];
    if (typeof i == "string")
      o === 2 ? i !== "" && t.push(i, e[++r]) : o === 8 && n.push(i);
    else {
      if (!ge(o)) break;
      o = i;
    }
    r++;
  }
  return { attrs: t, classes: n };
}
function Dx(e) {
  return Cn(() => {
    let t = hl(e),
      n = Te(ae({}, t), {
        decls: e.decls,
        vars: e.vars,
        template: e.template,
        consts: e.consts || null,
        ngContentSelectors: e.ngContentSelectors,
        onPush: e.changeDetection === cl.OnPush,
        directiveDefs: null,
        pipeDefs: null,
        dependencies: (t.standalone && e.dependencies) || null,
        getStandaloneInjector: null,
        signals: e.signals ?? !1,
        data: e.data || {},
        encapsulation: e.encapsulation || bt.Emulated,
        styles: e.styles || Q,
        _: null,
        schemas: e.schemas || null,
        tView: null,
        id: "",
      });
    gl(n);
    let r = e.dependencies;
    return (
      (n.directiveDefs = yc(r, !1)), (n.pipeDefs = yc(r, !0)), (n.id = th(n)), n
    );
  });
}
function Jp(e) {
  return Se(e) || dl(e);
}
function Xp(e) {
  return e !== null;
}
function Cx(e) {
  return Cn(() => ({
    type: e.type,
    bootstrap: e.bootstrap || Q,
    declarations: e.declarations || Q,
    imports: e.imports || Q,
    exports: e.exports || Q,
    transitiveCompileScopes: null,
    schemas: e.schemas || null,
    id: e.id || null,
  }));
}
function mc(e, t) {
  if (e == null) return Tt;
  let n = {};
  for (let r in e)
    if (e.hasOwnProperty(r)) {
      let o = e[r],
        i,
        s,
        a = He.None;
      Array.isArray(o)
        ? ((a = o[0]), (i = o[1]), (s = o[2] ?? i))
        : ((i = o), (s = o)),
        t ? ((n[i] = a !== He.None ? [r, a] : r), (t[i] = s)) : (n[i] = r);
    }
  return n;
}
function Mx(e) {
  return Cn(() => {
    let t = hl(e);
    return gl(t), t;
  });
}
function Se(e) {
  return e[wp] || null;
}
function dl(e) {
  return e[Dp] || null;
}
function fl(e) {
  return e[Cp] || null;
}
function eh(e) {
  let t = Se(e) || dl(e) || fl(e);
  return t !== null ? t.standalone : !1;
}
function pl(e, t) {
  let n = e[Mp] || null;
  if (!n && t === !0)
    throw new Error(`Type ${oe(e)} does not have '\u0275mod' property.`);
  return n;
}
function hl(e) {
  let t = {};
  return {
    type: e.type,
    providersResolver: null,
    factory: null,
    hostBindings: e.hostBindings || null,
    hostVars: e.hostVars || 0,
    hostAttrs: e.hostAttrs || null,
    contentQueries: e.contentQueries || null,
    declaredInputs: t,
    inputTransforms: null,
    inputConfig: e.inputs || Tt,
    exportAs: e.exportAs || null,
    standalone: e.standalone === !0,
    signals: e.signals === !0,
    selectors: e.selectors || Q,
    viewQuery: e.viewQuery || null,
    features: e.features || null,
    setInput: null,
    findHostDirectiveDefs: null,
    hostDirectives: null,
    inputs: mc(e.inputs, t),
    outputs: mc(e.outputs),
    debugInfo: null,
  };
}
function gl(e) {
  e.features?.forEach((t) => t(e));
}
function yc(e, t) {
  if (!e) return null;
  let n = t ? fl : Jp;
  return () => (typeof e == "function" ? e() : e).map((r) => n(r)).filter(Xp);
}
function th(e) {
  let t = 0,
    n = [
      e.selectors,
      e.ngContentSelectors,
      e.hostVars,
      e.hostAttrs,
      e.consts,
      e.vars,
      e.decls,
      e.encapsulation,
      e.standalone,
      e.signals,
      e.exportAs,
      JSON.stringify(e.inputs),
      JSON.stringify(e.outputs),
      Object.getOwnPropertyNames(e.type.prototype),
      !!e.contentQueries,
      !!e.viewQuery,
    ].join("|");
  for (let o of n) t = (Math.imul(31, t) + o.charCodeAt(0)) << 0;
  return (t += 2147483648), "c" + t;
}
function ml(e) {
  return { ɵproviders: e };
}
function nh(...e) {
  return { ɵproviders: yl(!0, e), ɵfromNgModule: !0 };
}
function yl(e, ...t) {
  let n = [],
    r = new Set(),
    o,
    i = (s) => {
      n.push(s);
    };
  return (
    Ts(t, (s) => {
      let a = s;
      yi(a, i, [], r) && ((o ||= []), o.push(a));
    }),
    o !== void 0 && vl(o, i),
    n
  );
}
function vl(e, t) {
  for (let n = 0; n < e.length; n++) {
    let { ngModule: r, providers: o } = e[n];
    _s(o, (i) => {
      t(i, r);
    });
  }
}
function yi(e, t, n, r) {
  if (((e = K(e)), !e)) return !1;
  let o = null,
    i = uc(e),
    s = !i && Se(e);
  if (!i && !s) {
    let c = e.ngModule;
    if (((i = uc(c)), i)) o = c;
    else return !1;
  } else {
    if (s && !s.standalone) return !1;
    o = e;
  }
  let a = r.has(o);
  if (s) {
    if (a) return !1;
    if ((r.add(o), s.dependencies)) {
      let c =
        typeof s.dependencies == "function" ? s.dependencies() : s.dependencies;
      for (let l of c) yi(l, t, n, r);
    }
  } else if (i) {
    if (i.imports != null && !a) {
      r.add(o);
      let l;
      try {
        Ts(i.imports, (u) => {
          yi(u, t, n, r) && ((l ||= []), l.push(u));
        });
      } finally {
      }
      l !== void 0 && vl(l, t);
    }
    if (!a) {
      let l = Mt(o) || (() => new o());
      t({ provide: o, useFactory: l, deps: Q }, o),
        t({ provide: al, useValue: o, multi: !0 }, o),
        t({ provide: rn, useValue: () => le(o), multi: !0 }, o);
    }
    let c = i.providers;
    if (c != null && !a) {
      let l = e;
      _s(c, (u) => {
        t(u, l);
      });
    }
  } else return !1;
  return o !== e && e.providers !== void 0;
}
function _s(e, t) {
  for (let n of e)
    tl(n) && (n = n.ɵproviders), Array.isArray(n) ? _s(n, t) : t(n);
}
var rh = R({ provide: String, useValue: R });
function El(e) {
  return e !== null && typeof e == "object" && rh in e;
}
function oh(e) {
  return !!(e && e.useExisting);
}
function ih(e) {
  return !!(e && e.useFactory);
}
function xt(e) {
  return typeof e == "function";
}
function sh(e) {
  return !!e.useClass;
}
var Il = new N(""),
  mr = {},
  ah = {},
  Zo;
function Ns() {
  return Zo === void 0 && (Zo = new br()), Zo;
}
var Ue = class {},
  sn = class extends Ue {
    get destroyed() {
      return this._destroyed;
    }
    constructor(t, n, r, o) {
      super(),
        (this.parent = n),
        (this.source = r),
        (this.scopes = o),
        (this.records = new Map()),
        (this._ngOnDestroyHooks = new Set()),
        (this._onDestroyHooks = []),
        (this._destroyed = !1),
        Ei(t, (s) => this.processProvider(s)),
        this.records.set(sl, vt(void 0, this)),
        o.has("environment") && this.records.set(Ue, vt(void 0, this));
      let i = this.records.get(Il);
      i != null && typeof i.value == "string" && this.scopes.add(i.value),
        (this.injectorDefTypes = new Set(this.get(al, Q, b.Self)));
    }
    destroy() {
      this.assertNotDestroyed(), (this._destroyed = !0);
      let t = C(null);
      try {
        for (let r of this._ngOnDestroyHooks) r.ngOnDestroy();
        let n = this._onDestroyHooks;
        this._onDestroyHooks = [];
        for (let r of n) r();
      } finally {
        this.records.clear(),
          this._ngOnDestroyHooks.clear(),
          this.injectorDefTypes.clear(),
          C(t);
      }
    }
    onDestroy(t) {
      return (
        this.assertNotDestroyed(),
        this._onDestroyHooks.push(t),
        () => this.removeOnDestroy(t)
      );
    }
    runInContext(t) {
      this.assertNotDestroyed();
      let n = Fe(this),
        r = ce(void 0),
        o;
      try {
        return t();
      } finally {
        Fe(n), ce(r);
      }
    }
    get(t, n = nn, r = b.Default) {
      if ((this.assertNotDestroyed(), t.hasOwnProperty(fc))) return t[fc](this);
      r = no(r);
      let o,
        i = Fe(this),
        s = ce(void 0);
      try {
        if (!(r & b.SkipSelf)) {
          let c = this.records.get(t);
          if (c === void 0) {
            let l = fh(t) && to(t);
            l && this.injectableDefInScope(l)
              ? (c = vt(vi(t), mr))
              : (c = null),
              this.records.set(t, c);
          }
          if (c != null) return this.hydrate(t, c);
        }
        let a = r & b.Self ? Ns() : this.parent;
        return (n = r & b.Optional && n === nn ? null : n), a.get(t, n);
      } catch (a) {
        if (a.name === "NullInjectorError") {
          if (((a[Mr] = a[Mr] || []).unshift(oe(t)), i)) throw a;
          return Pp(a, t, "R3InjectorError", this.source);
        } else throw a;
      } finally {
        ce(s), Fe(i);
      }
    }
    resolveInjectorInitializers() {
      let t = C(null),
        n = Fe(this),
        r = ce(void 0),
        o;
      try {
        let i = this.get(rn, Q, b.Self);
        for (let s of i) s();
      } finally {
        Fe(n), ce(r), C(t);
      }
    }
    toString() {
      let t = [],
        n = this.records;
      for (let r of n.keys()) t.push(oe(r));
      return `R3Injector[${t.join(", ")}]`;
    }
    assertNotDestroyed() {
      if (this._destroyed) throw new x(205, !1);
    }
    processProvider(t) {
      t = K(t);
      let n = xt(t) ? t : K(t && t.provide),
        r = lh(t);
      if (!xt(t) && t.multi === !0) {
        let o = this.records.get(n);
        o ||
          ((o = vt(void 0, mr, !0)),
          (o.factory = () => gi(o.multi)),
          this.records.set(n, o)),
          (n = t),
          o.multi.push(t);
      }
      this.records.set(n, r);
    }
    hydrate(t, n) {
      let r = C(null);
      try {
        return (
          n.value === mr && ((n.value = ah), (n.value = n.factory())),
          typeof n.value == "object" &&
            n.value &&
            dh(n.value) &&
            this._ngOnDestroyHooks.add(n.value),
          n.value
        );
      } finally {
        C(r);
      }
    }
    injectableDefInScope(t) {
      if (!t.providedIn) return !1;
      let n = K(t.providedIn);
      return typeof n == "string"
        ? n === "any" || this.scopes.has(n)
        : this.injectorDefTypes.has(n);
    }
    removeOnDestroy(t) {
      let n = this._onDestroyHooks.indexOf(t);
      n !== -1 && this._onDestroyHooks.splice(n, 1);
    }
  };
function vi(e) {
  let t = to(e),
    n = t !== null ? t.factory : Mt(e);
  if (n !== null) return n;
  if (e instanceof N) throw new x(204, !1);
  if (e instanceof Function) return ch(e);
  throw new x(204, !1);
}
function ch(e) {
  if (e.length > 0) throw new x(204, !1);
  let n = Ep(e);
  return n !== null ? () => n.factory(e) : () => new e();
}
function lh(e) {
  if (El(e)) return vt(void 0, e.useValue);
  {
    let t = wl(e);
    return vt(t, mr);
  }
}
function wl(e, t, n) {
  let r;
  if (xt(e)) {
    let o = K(e);
    return Mt(o) || vi(o);
  } else if (El(e)) r = () => K(e.useValue);
  else if (ih(e)) r = () => e.useFactory(...gi(e.deps || []));
  else if (oh(e)) r = () => le(K(e.useExisting));
  else {
    let o = K(e && (e.useClass || e.provide));
    if (uh(e)) r = () => new o(...gi(e.deps));
    else return Mt(o) || vi(o);
  }
  return r;
}
function vt(e, t, n = !1) {
  return { factory: e, value: t, multi: n ? [] : void 0 };
}
function uh(e) {
  return !!e.deps;
}
function dh(e) {
  return (
    e !== null && typeof e == "object" && typeof e.ngOnDestroy == "function"
  );
}
function fh(e) {
  return typeof e == "function" || (typeof e == "object" && e instanceof N);
}
function Ei(e, t) {
  for (let n of e)
    Array.isArray(n) ? Ei(n, t) : n && tl(n) ? Ei(n.ɵproviders, t) : t(n);
}
function Tx(e, t) {
  e instanceof sn && e.assertNotDestroyed();
  let n,
    r = Fe(e),
    o = ce(void 0);
  try {
    return t();
  } finally {
    Fe(r), ce(o);
  }
}
function Dl() {
  return nl() !== void 0 || Op() != null;
}
function ph(e) {
  if (!Dl()) throw new x(-203, !1);
}
function hh(e) {
  let t = tn.ng;
  if (t && t.ɵcompilerFacade) return t.ɵcompilerFacade;
  throw new Error("JIT compiler unavailable");
}
function gh(e) {
  return typeof e == "function";
}
var F = 0,
  m = 1,
  y = 2,
  $ = 3,
  ye = 4,
  fe = 5,
  Ee = 6,
  an = 7,
  G = 8,
  _t = 9,
  Ce = 10,
  A = 11,
  cn = 12,
  vc = 13,
  Lt = 14,
  J = 15,
  tt = 16,
  Et = 17,
  Oe = 18,
  ro = 19,
  Cl = 20,
  je = 21,
  Yo = 22,
  ue = 23,
  O = 25,
  Ss = 1,
  ln = 6,
  Ae = 7,
  xr = 8,
  Nt = 9,
  U = 10,
  _r = (function (e) {
    return (
      (e[(e.None = 0)] = "None"),
      (e[(e.HasTransplantedViews = 2)] = "HasTransplantedViews"),
      e
    );
  })(_r || {});
function ve(e) {
  return Array.isArray(e) && typeof e[Ss] == "object";
}
function ie(e) {
  return Array.isArray(e) && e[Ss] === !0;
}
function Ml(e) {
  return (e.flags & 4) !== 0;
}
function Ft(e) {
  return e.componentOffset > -1;
}
function Os(e) {
  return (e.flags & 1) === 1;
}
function $e(e) {
  return !!e.template;
}
function un(e) {
  return (e[y] & 512) !== 0;
}
function Tl(e) {
  return (e.type & 16) === 16;
}
function mh(e) {
  return (e[y] & 32) === 32;
}
var Ii = class {
  constructor(t, n, r) {
    (this.previousValue = t), (this.currentValue = n), (this.firstChange = r);
  }
  isFirstChange() {
    return this.firstChange;
  }
};
function bl(e, t, n, r) {
  t !== null ? t.applyValueToInputSignal(t, r) : (e[n] = r);
}
function yh() {
  return xl;
}
function xl(e) {
  return e.type.prototype.ngOnChanges && (e.setInput = Eh), vh;
}
yh.ngInherit = !0;
function vh() {
  let e = Nl(this),
    t = e?.current;
  if (t) {
    let n = e.previous;
    if (n === Tt) e.previous = t;
    else for (let r in t) n[r] = t[r];
    (e.current = null), this.ngOnChanges(t);
  }
}
function Eh(e, t, n, r, o) {
  let i = this.declaredInputs[r],
    s = Nl(e) || Ih(e, { previous: Tt, current: null }),
    a = s.current || (s.current = {}),
    c = s.previous,
    l = c[i];
  (a[i] = new Ii(l && l.currentValue, n, c === Tt)), bl(e, t, o, n);
}
var _l = "__ngSimpleChanges__";
function Nl(e) {
  return e[_l] || null;
}
function Ih(e, t) {
  return (e[_l] = t);
}
var Ec = null;
var we = function (e, t, n) {
    Ec?.(e, t, n);
  },
  wh = "svg",
  Dh = "math";
function k(e) {
  for (; Array.isArray(e); ) e = e[F];
  return e;
}
function Sl(e) {
  for (; Array.isArray(e); ) {
    if (typeof e[Ss] == "object") return e;
    e = e[F];
  }
  return null;
}
function Ol(e, t) {
  return k(t[e]);
}
function se(e, t) {
  return k(t[e.index]);
}
function As(e, t) {
  return e.data[t];
}
function Ch(e, t) {
  return e[t];
}
function qe(e, t) {
  let n = t[e];
  return ve(n) ? n : n[F];
}
function Mh(e) {
  return (e[y] & 4) === 4;
}
function Rs(e) {
  return (e[y] & 128) === 128;
}
function Th(e) {
  return ie(e[$]);
}
function nt(e, t) {
  return t == null ? null : e[t];
}
function Al(e) {
  e[Et] = 0;
}
function Rl(e) {
  e[y] & 1024 || ((e[y] |= 1024), Rs(e) && io(e));
}
function bh(e, t) {
  for (; e > 0; ) (t = t[Lt]), e--;
  return t;
}
function oo(e) {
  return !!(e[y] & 9216 || e[ue]?.dirty);
}
function wi(e) {
  e[Ce].changeDetectionScheduler?.notify(8),
    e[y] & 64 && (e[y] |= 1024),
    oo(e) && io(e);
}
function io(e) {
  e[Ce].changeDetectionScheduler?.notify(0);
  let t = rt(e);
  for (; t !== null && !(t[y] & 8192 || ((t[y] |= 8192), !Rs(t))); ) t = rt(t);
}
function Pl(e, t) {
  if ((e[y] & 256) === 256) throw new x(911, !1);
  e[je] === null && (e[je] = []), e[je].push(t);
}
function xh(e, t) {
  if (e[je] === null) return;
  let n = e[je].indexOf(t);
  n !== -1 && e[je].splice(n, 1);
}
function rt(e) {
  let t = e[$];
  return ie(t) ? t[$] : t;
}
var I = { lFrame: Wl(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
var kl = !1;
function _h() {
  return I.lFrame.elementDepthCount;
}
function Nh() {
  I.lFrame.elementDepthCount++;
}
function Sh() {
  I.lFrame.elementDepthCount--;
}
function Ll() {
  return I.bindingsEnabled;
}
function bn() {
  return I.skipHydrationRootTNode !== null;
}
function Oh(e) {
  return I.skipHydrationRootTNode === e;
}
function Ah(e) {
  I.skipHydrationRootTNode = e;
}
function Rh() {
  I.skipHydrationRootTNode = null;
}
function D() {
  return I.lFrame.lView;
}
function q() {
  return I.lFrame.tView;
}
function bx(e) {
  return (I.lFrame.contextLView = e), e[G];
}
function xx(e) {
  return (I.lFrame.contextLView = null), e;
}
function Y() {
  let e = Fl();
  for (; e !== null && e.type === 64; ) e = e.parent;
  return e;
}
function Fl() {
  return I.lFrame.currentTNode;
}
function dn() {
  let e = I.lFrame,
    t = e.currentTNode;
  return e.isParent ? t : t.parent;
}
function Be(e, t) {
  let n = I.lFrame;
  (n.currentTNode = e), (n.isParent = t);
}
function jl() {
  return I.lFrame.isParent;
}
function Ph() {
  I.lFrame.isParent = !1;
}
function kh() {
  return I.lFrame.contextLView;
}
function Vl() {
  return kl;
}
function Ic(e) {
  kl = e;
}
function so() {
  let e = I.lFrame,
    t = e.bindingRootIndex;
  return t === -1 && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t;
}
function Lh(e) {
  return (I.lFrame.bindingIndex = e);
}
function jt() {
  return I.lFrame.bindingIndex++;
}
function Hl(e) {
  let t = I.lFrame,
    n = t.bindingIndex;
  return (t.bindingIndex = t.bindingIndex + e), n;
}
function Fh() {
  return I.lFrame.inI18n;
}
function Ul(e) {
  I.lFrame.inI18n = e;
}
function jh(e, t) {
  let n = I.lFrame;
  (n.bindingIndex = n.bindingRootIndex = e), Di(t);
}
function Vh() {
  return I.lFrame.currentDirectiveIndex;
}
function Di(e) {
  I.lFrame.currentDirectiveIndex = e;
}
function Hh(e) {
  let t = I.lFrame.currentDirectiveIndex;
  return t === -1 ? null : e[t];
}
function $l() {
  return I.lFrame.currentQueryIndex;
}
function Ps(e) {
  I.lFrame.currentQueryIndex = e;
}
function Uh(e) {
  let t = e[m];
  return t.type === 2 ? t.declTNode : t.type === 1 ? e[fe] : null;
}
function Bl(e, t, n) {
  if (n & b.SkipSelf) {
    let o = t,
      i = e;
    for (; (o = o.parent), o === null && !(n & b.Host); )
      if (((o = Uh(i)), o === null || ((i = i[Lt]), o.type & 10))) break;
    if (o === null) return !1;
    (t = o), (e = i);
  }
  let r = (I.lFrame = ql());
  return (r.currentTNode = t), (r.lView = e), !0;
}
function ks(e) {
  let t = ql(),
    n = e[m];
  (I.lFrame = t),
    (t.currentTNode = n.firstChild),
    (t.lView = e),
    (t.tView = n),
    (t.contextLView = e),
    (t.bindingIndex = n.bindingStartIndex),
    (t.inI18n = !1);
}
function ql() {
  let e = I.lFrame,
    t = e === null ? null : e.child;
  return t === null ? Wl(e) : t;
}
function Wl(e) {
  let t = {
    currentTNode: null,
    isParent: !0,
    lView: null,
    tView: null,
    selectedIndex: -1,
    contextLView: null,
    elementDepthCount: 0,
    currentNamespace: null,
    currentDirectiveIndex: -1,
    bindingRootIndex: -1,
    bindingIndex: -1,
    currentQueryIndex: 0,
    parent: e,
    child: null,
    inI18n: !1,
  };
  return e !== null && (e.child = t), t;
}
function Gl() {
  let e = I.lFrame;
  return (I.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e;
}
var zl = Gl;
function Ls() {
  let e = Gl();
  (e.isParent = !0),
    (e.tView = null),
    (e.selectedIndex = -1),
    (e.contextLView = null),
    (e.elementDepthCount = 0),
    (e.currentDirectiveIndex = -1),
    (e.currentNamespace = null),
    (e.bindingRootIndex = -1),
    (e.bindingIndex = -1),
    (e.currentQueryIndex = 0);
}
function $h(e) {
  return (I.lFrame.contextLView = bh(e, I.lFrame.contextLView))[G];
}
function We() {
  return I.lFrame.selectedIndex;
}
function ot(e) {
  I.lFrame.selectedIndex = e;
}
function Fs() {
  let e = I.lFrame;
  return As(e.tView, e.selectedIndex);
}
function Ql() {
  return I.lFrame.currentNamespace;
}
var Zl = !0;
function ao() {
  return Zl;
}
function Re(e) {
  Zl = e;
}
function Bh(e, t, n) {
  let { ngOnChanges: r, ngOnInit: o, ngDoCheck: i } = t.type.prototype;
  if (r) {
    let s = xl(t);
    (n.preOrderHooks ??= []).push(e, s),
      (n.preOrderCheckHooks ??= []).push(e, s);
  }
  o && (n.preOrderHooks ??= []).push(0 - e, o),
    i &&
      ((n.preOrderHooks ??= []).push(e, i),
      (n.preOrderCheckHooks ??= []).push(e, i));
}
function js(e, t) {
  for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
    let i = e.data[n].type.prototype,
      {
        ngAfterContentInit: s,
        ngAfterContentChecked: a,
        ngAfterViewInit: c,
        ngAfterViewChecked: l,
        ngOnDestroy: u,
      } = i;
    s && (e.contentHooks ??= []).push(-n, s),
      a &&
        ((e.contentHooks ??= []).push(n, a),
        (e.contentCheckHooks ??= []).push(n, a)),
      c && (e.viewHooks ??= []).push(-n, c),
      l &&
        ((e.viewHooks ??= []).push(n, l), (e.viewCheckHooks ??= []).push(n, l)),
      u != null && (e.destroyHooks ??= []).push(n, u);
  }
}
function yr(e, t, n) {
  Yl(e, t, 3, n);
}
function vr(e, t, n, r) {
  (e[y] & 3) === n && Yl(e, t, n, r);
}
function Ko(e, t) {
  let n = e[y];
  (n & 3) === t && ((n &= 16383), (n += 1), (e[y] = n));
}
function Yl(e, t, n, r) {
  let o = r !== void 0 ? e[Et] & 65535 : 0,
    i = r ?? -1,
    s = t.length - 1,
    a = 0;
  for (let c = o; c < s; c++)
    if (typeof t[c + 1] == "number") {
      if (((a = t[c]), r != null && a >= r)) break;
    } else
      t[c] < 0 && (e[Et] += 65536),
        (a < i || i == -1) &&
          (qh(e, n, t, c), (e[Et] = (e[Et] & 4294901760) + c + 2)),
        c++;
}
function wc(e, t) {
  we(4, e, t);
  let n = C(null);
  try {
    t.call(e);
  } finally {
    C(n), we(5, e, t);
  }
}
function qh(e, t, n, r) {
  let o = n[r] < 0,
    i = n[r + 1],
    s = o ? -n[r] : n[r],
    a = e[s];
  o
    ? e[y] >> 14 < e[Et] >> 16 &&
      (e[y] & 3) === t &&
      ((e[y] += 16384), wc(a, i))
    : wc(a, i);
}
var Ct = -1,
  it = class {
    constructor(t, n, r) {
      (this.factory = t),
        (this.resolving = !1),
        (this.canSeeViewProviders = n),
        (this.injectImpl = r);
    }
  };
function Wh(e) {
  return e instanceof it;
}
function Kl(e) {
  return (
    e != null &&
    typeof e == "object" &&
    (e.insertBeforeIndex === null ||
      typeof e.insertBeforeIndex == "number" ||
      Array.isArray(e.insertBeforeIndex))
  );
}
function Gh(e) {
  return !!(e.type & 128);
}
function zh(e) {
  return (e.flags & 8) !== 0;
}
function Qh(e) {
  return (e.flags & 16) !== 0;
}
var Jo = {},
  Ci = class {
    constructor(t, n) {
      (this.injector = t), (this.parentInjector = n);
    }
    get(t, n, r) {
      r = no(r);
      let o = this.injector.get(t, Jo, r);
      return o !== Jo || n === Jo ? o : this.parentInjector.get(t, n, r);
    }
  };
function Jl(e) {
  return e !== Ct;
}
function Nr(e) {
  return e & 32767;
}
function Zh(e) {
  return e >> 16;
}
function Sr(e, t) {
  let n = Zh(e),
    r = t;
  for (; n > 0; ) (r = r[Lt]), n--;
  return r;
}
var Mi = !0;
function Dc(e) {
  let t = Mi;
  return (Mi = e), t;
}
var Yh = 256,
  Xl = Yh - 1,
  eu = 5,
  Kh = 0,
  De = {};
function Jh(e, t, n) {
  let r;
  typeof n == "string"
    ? (r = n.charCodeAt(0) || 0)
    : n.hasOwnProperty(Yt) && (r = n[Yt]),
    r == null && (r = n[Yt] = Kh++);
  let o = r & Xl,
    i = 1 << o;
  t.data[e + (o >> eu)] |= i;
}
function Or(e, t) {
  let n = tu(e, t);
  if (n !== -1) return n;
  let r = t[m];
  r.firstCreatePass &&
    ((e.injectorIndex = t.length),
    Xo(r.data, e),
    Xo(t, null),
    Xo(r.blueprint, null));
  let o = Vs(e, t),
    i = e.injectorIndex;
  if (Jl(o)) {
    let s = Nr(o),
      a = Sr(o, t),
      c = a[m].data;
    for (let l = 0; l < 8; l++) t[i + l] = a[s + l] | c[s + l];
  }
  return (t[i + 8] = o), i;
}
function Xo(e, t) {
  e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
}
function tu(e, t) {
  return e.injectorIndex === -1 ||
    (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
    t[e.injectorIndex + 8] === null
    ? -1
    : e.injectorIndex;
}
function Vs(e, t) {
  if (e.parent && e.parent.injectorIndex !== -1) return e.parent.injectorIndex;
  let n = 0,
    r = null,
    o = t;
  for (; o !== null; ) {
    if (((r = su(o)), r === null)) return Ct;
    if ((n++, (o = o[Lt]), r.injectorIndex !== -1))
      return r.injectorIndex | (n << 16);
  }
  return Ct;
}
function Ti(e, t, n) {
  Jh(e, t, n);
}
function Xh(e, t) {
  if (t === "class") return e.classes;
  if (t === "style") return e.styles;
  let n = e.attrs;
  if (n) {
    let r = n.length,
      o = 0;
    for (; o < r; ) {
      let i = n[o];
      if (ll(i)) break;
      if (i === 0) o = o + 2;
      else if (typeof i == "number")
        for (o++; o < r && typeof n[o] == "string"; ) o++;
      else {
        if (i === t) return n[o + 1];
        o = o + 2;
      }
    }
  }
  return null;
}
function nu(e, t, n) {
  if (n & b.Optional || e !== void 0) return e;
  Ms(t, "NodeInjector");
}
function ru(e, t, n, r) {
  if (
    (n & b.Optional && r === void 0 && (r = null), !(n & (b.Self | b.Host)))
  ) {
    let o = e[_t],
      i = ce(void 0);
    try {
      return o ? o.get(t, r, n & b.Optional) : rl(t, r, n & b.Optional);
    } finally {
      ce(i);
    }
  }
  return nu(r, t, n);
}
function ou(e, t, n, r = b.Default, o) {
  if (e !== null) {
    if (t[y] & 2048 && !(r & b.Self)) {
      let s = rg(e, t, n, r, De);
      if (s !== De) return s;
    }
    let i = iu(e, t, n, r, De);
    if (i !== De) return i;
  }
  return ru(t, n, r, o);
}
function iu(e, t, n, r, o) {
  let i = tg(n);
  if (typeof i == "function") {
    if (!Bl(t, e, r)) return r & b.Host ? nu(o, n, r) : ru(t, n, r, o);
    try {
      let s;
      if (((s = i(r)), s == null && !(r & b.Optional))) Ms(n);
      else return s;
    } finally {
      zl();
    }
  } else if (typeof i == "number") {
    let s = null,
      a = tu(e, t),
      c = Ct,
      l = r & b.Host ? t[J][fe] : null;
    for (
      (a === -1 || r & b.SkipSelf) &&
      ((c = a === -1 ? Vs(e, t) : t[a + 8]),
      c === Ct || !Mc(r, !1)
        ? (a = -1)
        : ((s = t[m]), (a = Nr(c)), (t = Sr(c, t))));
      a !== -1;

    ) {
      let u = t[m];
      if (Cc(i, a, u.data)) {
        let d = eg(a, t, n, s, r, l);
        if (d !== De) return d;
      }
      (c = t[a + 8]),
        c !== Ct && Mc(r, t[m].data[a + 8] === l) && Cc(i, a, t)
          ? ((s = u), (a = Nr(c)), (t = Sr(c, t)))
          : (a = -1);
    }
  }
  return o;
}
function eg(e, t, n, r, o, i) {
  let s = t[m],
    a = s.data[e + 8],
    c = r == null ? Ft(a) && Mi : r != s && (a.type & 3) !== 0,
    l = o & b.Host && i === a,
    u = Er(a, s, n, c, l);
  return u !== null ? st(t, s, u, a) : De;
}
function Er(e, t, n, r, o) {
  let i = e.providerIndexes,
    s = t.data,
    a = i & 1048575,
    c = e.directiveStart,
    l = e.directiveEnd,
    u = i >> 20,
    d = r ? a : a + u,
    p = o ? a + u : l;
  for (let f = d; f < p; f++) {
    let h = s[f];
    if ((f < c && n === h) || (f >= c && h.type === n)) return f;
  }
  if (o) {
    let f = s[c];
    if (f && $e(f) && f.type === n) return c;
  }
  return null;
}
function st(e, t, n, r) {
  let o = e[n],
    i = t.data;
  if (Wh(o)) {
    let s = o;
    s.resolving && bp(Tp(i[n]));
    let a = Dc(s.canSeeViewProviders);
    s.resolving = !0;
    let c,
      l = s.injectImpl ? ce(s.injectImpl) : null,
      u = Bl(e, r, b.Default);
    try {
      (o = e[n] = s.factory(void 0, i, e, r)),
        t.firstCreatePass && n >= r.directiveStart && Bh(n, i[n], t);
    } finally {
      l !== null && ce(l), Dc(a), (s.resolving = !1), zl();
    }
  }
  return o;
}
function tg(e) {
  if (typeof e == "string") return e.charCodeAt(0) || 0;
  let t = e.hasOwnProperty(Yt) ? e[Yt] : void 0;
  return typeof t == "number" ? (t >= 0 ? t & Xl : ng) : t;
}
function Cc(e, t, n) {
  let r = 1 << e;
  return !!(n[t + (e >> eu)] & r);
}
function Mc(e, t) {
  return !(e & b.Self) && !(e & b.Host && t);
}
var et = class {
  constructor(t, n) {
    (this._tNode = t), (this._lView = n);
  }
  get(t, n, r) {
    return ou(this._tNode, this._lView, t, no(r), n);
  }
};
function ng() {
  return new et(Y(), D());
}
function _x(e) {
  return Cn(() => {
    let t = e.prototype.constructor,
      n = t[Cr] || bi(t),
      r = Object.prototype,
      o = Object.getPrototypeOf(e.prototype).constructor;
    for (; o && o !== r; ) {
      let i = o[Cr] || bi(o);
      if (i && i !== n) return i;
      o = Object.getPrototypeOf(o);
    }
    return (i) => new i();
  });
}
function bi(e) {
  return Jc(e)
    ? () => {
        let t = bi(K(e));
        return t && t();
      }
    : Mt(e);
}
function rg(e, t, n, r, o) {
  let i = e,
    s = t;
  for (; i !== null && s !== null && s[y] & 2048 && !(s[y] & 512); ) {
    let a = iu(i, s, n, r | b.Self, De);
    if (a !== De) return a;
    let c = i.parent;
    if (!c) {
      let l = s[Cl];
      if (l) {
        let u = l.get(n, De, r);
        if (u !== De) return u;
      }
      (c = su(s)), (s = s[Lt]);
    }
    i = c;
  }
  return o;
}
function su(e) {
  let t = e[m],
    n = t.type;
  return n === 2 ? t.declTNode : n === 1 ? e[fe] : null;
}
function Nx(e) {
  return Xh(Y(), e);
}
function Tc(e, t = null, n = null, r) {
  let o = au(e, t, n, r);
  return o.resolveInjectorInitializers(), o;
}
function au(e, t = null, n = null, r, o = new Set()) {
  let i = [n || Q, nh(e)];
  return (
    (r = r || (typeof e == "object" ? void 0 : oe(e))),
    new sn(i, t || Ns(), r || null, o)
  );
}
var Me = class e {
  static {
    this.THROW_IF_NOT_FOUND = nn;
  }
  static {
    this.NULL = new br();
  }
  static create(t, n) {
    if (Array.isArray(t)) return Tc({ name: "" }, n, t, "");
    {
      let r = t.name ?? "";
      return Tc({ name: r }, t.parent, t.providers, r);
    }
  }
  static {
    this.ɵprov = B({ token: e, providedIn: "any", factory: () => le(sl) });
  }
  static {
    this.__NG_ELEMENT_ID__ = -1;
  }
};
var og = new N("");
og.__NG_ELEMENT_ID__ = (e) => {
  let t = Y();
  if (t === null) throw new x(204, !1);
  if (t.type & 2) return t.value;
  if (e & b.Optional) return null;
  throw new x(204, !1);
};
var ig = "ngOriginalError";
function ei(e) {
  return e[ig];
}
var cu = !0,
  Hs = (() => {
    class e {
      static {
        this.__NG_ELEMENT_ID__ = sg;
      }
      static {
        this.__NG_ENV_ID__ = (n) => n;
      }
    }
    return e;
  })(),
  xi = class extends Hs {
    constructor(t) {
      super(), (this._lView = t);
    }
    onDestroy(t) {
      return Pl(this._lView, t), () => xh(this._lView, t);
    }
  };
function sg() {
  return new xi(D());
}
var co = (() => {
  class e {
    constructor() {
      (this.taskId = 0),
        (this.pendingTasks = new Set()),
        (this.hasPendingTasks = new Wt(!1));
    }
    get _hasPendingTasks() {
      return this.hasPendingTasks.value;
    }
    add() {
      this._hasPendingTasks || this.hasPendingTasks.next(!0);
      let n = this.taskId++;
      return this.pendingTasks.add(n), n;
    }
    remove(n) {
      this.pendingTasks.delete(n),
        this.pendingTasks.size === 0 &&
          this._hasPendingTasks &&
          this.hasPendingTasks.next(!1);
    }
    ngOnDestroy() {
      this.pendingTasks.clear(),
        this._hasPendingTasks && this.hasPendingTasks.next(!1);
    }
    static {
      this.ɵprov = B({ token: e, providedIn: "root", factory: () => new e() });
    }
  }
  return e;
})();
var _i = class extends Pe {
    constructor(t = !1) {
      super(),
        (this.destroyRef = void 0),
        (this.pendingTasks = void 0),
        (this.__isAsync = t),
        Dl() &&
          ((this.destroyRef = w(Hs, { optional: !0 }) ?? void 0),
          (this.pendingTasks = w(co, { optional: !0 }) ?? void 0));
    }
    emit(t) {
      let n = C(null);
      try {
        super.next(t);
      } finally {
        C(n);
      }
    }
    subscribe(t, n, r) {
      let o = t,
        i = n || (() => null),
        s = r;
      if (t && typeof t == "object") {
        let c = t;
        (o = c.next?.bind(c)),
          (i = c.error?.bind(c)),
          (s = c.complete?.bind(c));
      }
      this.__isAsync &&
        ((i = this.wrapInTimeout(i)),
        o && (o = this.wrapInTimeout(o)),
        s && (s = this.wrapInTimeout(s)));
      let a = super.subscribe({ next: o, error: i, complete: s });
      return t instanceof H && t.add(a), a;
    }
    wrapInTimeout(t) {
      return (n) => {
        let r = this.pendingTasks?.add();
        setTimeout(() => {
          t(n), r !== void 0 && this.pendingTasks?.remove(r);
        });
      };
    }
  },
  Ne = _i;
function Ar(...e) {}
function lu(e) {
  let t, n;
  function r() {
    e = Ar;
    try {
      n !== void 0 &&
        typeof cancelAnimationFrame == "function" &&
        cancelAnimationFrame(n),
        t !== void 0 && clearTimeout(t);
    } catch {}
  }
  return (
    (t = setTimeout(() => {
      e(), r();
    })),
    typeof requestAnimationFrame == "function" &&
      (n = requestAnimationFrame(() => {
        e(), r();
      })),
    () => r()
  );
}
function bc(e) {
  return (
    queueMicrotask(() => e()),
    () => {
      e = Ar;
    }
  );
}
var Us = "isAngularZone",
  Rr = Us + "_ID",
  ag = 0,
  Z = class e {
    constructor(t) {
      (this.hasPendingMacrotasks = !1),
        (this.hasPendingMicrotasks = !1),
        (this.isStable = !0),
        (this.onUnstable = new Ne(!1)),
        (this.onMicrotaskEmpty = new Ne(!1)),
        (this.onStable = new Ne(!1)),
        (this.onError = new Ne(!1));
      let {
        enableLongStackTrace: n = !1,
        shouldCoalesceEventChangeDetection: r = !1,
        shouldCoalesceRunChangeDetection: o = !1,
        scheduleInRootZone: i = cu,
      } = t;
      if (typeof Zone > "u") throw new x(908, !1);
      Zone.assertZonePatched();
      let s = this;
      (s._nesting = 0),
        (s._outer = s._inner = Zone.current),
        Zone.TaskTrackingZoneSpec &&
          (s._inner = s._inner.fork(new Zone.TaskTrackingZoneSpec())),
        n &&
          Zone.longStackTraceZoneSpec &&
          (s._inner = s._inner.fork(Zone.longStackTraceZoneSpec)),
        (s.shouldCoalesceEventChangeDetection = !o && r),
        (s.shouldCoalesceRunChangeDetection = o),
        (s.callbackScheduled = !1),
        (s.scheduleInRootZone = i),
        ug(s);
    }
    static isInAngularZone() {
      return typeof Zone < "u" && Zone.current.get(Us) === !0;
    }
    static assertInAngularZone() {
      if (!e.isInAngularZone()) throw new x(909, !1);
    }
    static assertNotInAngularZone() {
      if (e.isInAngularZone()) throw new x(909, !1);
    }
    run(t, n, r) {
      return this._inner.run(t, n, r);
    }
    runTask(t, n, r, o) {
      let i = this._inner,
        s = i.scheduleEventTask("NgZoneEvent: " + o, t, cg, Ar, Ar);
      try {
        return i.runTask(s, n, r);
      } finally {
        i.cancelTask(s);
      }
    }
    runGuarded(t, n, r) {
      return this._inner.runGuarded(t, n, r);
    }
    runOutsideAngular(t) {
      return this._outer.run(t);
    }
  },
  cg = {};
function $s(e) {
  if (e._nesting == 0 && !e.hasPendingMicrotasks && !e.isStable)
    try {
      e._nesting++, e.onMicrotaskEmpty.emit(null);
    } finally {
      if ((e._nesting--, !e.hasPendingMicrotasks))
        try {
          e.runOutsideAngular(() => e.onStable.emit(null));
        } finally {
          e.isStable = !0;
        }
    }
}
function lg(e) {
  if (e.isCheckStableRunning || e.callbackScheduled) return;
  e.callbackScheduled = !0;
  function t() {
    lu(() => {
      (e.callbackScheduled = !1),
        Ni(e),
        (e.isCheckStableRunning = !0),
        $s(e),
        (e.isCheckStableRunning = !1);
    });
  }
  e.scheduleInRootZone
    ? Zone.root.run(() => {
        t();
      })
    : e._outer.run(() => {
        t();
      }),
    Ni(e);
}
function ug(e) {
  let t = () => {
      lg(e);
    },
    n = ag++;
  e._inner = e._inner.fork({
    name: "angular",
    properties: { [Us]: !0, [Rr]: n, [Rr + n]: !0 },
    onInvokeTask: (r, o, i, s, a, c) => {
      if (dg(c)) return r.invokeTask(i, s, a, c);
      try {
        return xc(e), r.invokeTask(i, s, a, c);
      } finally {
        ((e.shouldCoalesceEventChangeDetection && s.type === "eventTask") ||
          e.shouldCoalesceRunChangeDetection) &&
          t(),
          _c(e);
      }
    },
    onInvoke: (r, o, i, s, a, c, l) => {
      try {
        return xc(e), r.invoke(i, s, a, c, l);
      } finally {
        e.shouldCoalesceRunChangeDetection &&
          !e.callbackScheduled &&
          !fg(c) &&
          t(),
          _c(e);
      }
    },
    onHasTask: (r, o, i, s) => {
      r.hasTask(i, s),
        o === i &&
          (s.change == "microTask"
            ? ((e._hasPendingMicrotasks = s.microTask), Ni(e), $s(e))
            : s.change == "macroTask" &&
              (e.hasPendingMacrotasks = s.macroTask));
    },
    onHandleError: (r, o, i, s) => (
      r.handleError(i, s), e.runOutsideAngular(() => e.onError.emit(s)), !1
    ),
  });
}
function Ni(e) {
  e._hasPendingMicrotasks ||
  ((e.shouldCoalesceEventChangeDetection ||
    e.shouldCoalesceRunChangeDetection) &&
    e.callbackScheduled === !0)
    ? (e.hasPendingMicrotasks = !0)
    : (e.hasPendingMicrotasks = !1);
}
function xc(e) {
  e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
}
function _c(e) {
  e._nesting--, $s(e);
}
var Pr = class {
  constructor() {
    (this.hasPendingMicrotasks = !1),
      (this.hasPendingMacrotasks = !1),
      (this.isStable = !0),
      (this.onUnstable = new Ne()),
      (this.onMicrotaskEmpty = new Ne()),
      (this.onStable = new Ne()),
      (this.onError = new Ne());
  }
  run(t, n, r) {
    return t.apply(n, r);
  }
  runGuarded(t, n, r) {
    return t.apply(n, r);
  }
  runOutsideAngular(t) {
    return t();
  }
  runTask(t, n, r, o) {
    return t.apply(n, r);
  }
};
function dg(e) {
  return uu(e, "__ignore_ng_zone__");
}
function fg(e) {
  return uu(e, "__scheduler_tick__");
}
function uu(e, t) {
  return !Array.isArray(e) || e.length !== 1 ? !1 : e[0]?.data?.[t] === !0;
}
function pg(e = "zone.js", t) {
  return e === "noop" ? new Pr() : e === "zone.js" ? new Z(t) : e;
}
var St = class {
    constructor() {
      this._console = console;
    }
    handleError(t) {
      let n = this._findOriginalError(t);
      this._console.error("ERROR", t),
        n && this._console.error("ORIGINAL ERROR", n);
    }
    _findOriginalError(t) {
      let n = t && ei(t);
      for (; n && ei(n); ) n = ei(n);
      return n || null;
    }
  },
  hg = new N("", {
    providedIn: "root",
    factory: () => {
      let e = w(Z),
        t = w(St);
      return (n) => e.runOutsideAngular(() => t.handleError(n));
    },
  });
function gg() {
  return Vt(Y(), D());
}
function Vt(e, t) {
  return new lo(se(e, t));
}
var lo = (() => {
  class e {
    constructor(n) {
      this.nativeElement = n;
    }
    static {
      this.__NG_ELEMENT_ID__ = gg;
    }
  }
  return e;
})();
function mg(e) {
  return e instanceof lo ? e.nativeElement : e;
}
function yg() {
  return this._results[Symbol.iterator]();
}
var Si = class e {
    get changes() {
      return (this._changes ??= new Ne());
    }
    constructor(t = !1) {
      (this._emitDistinctChangesOnly = t),
        (this.dirty = !0),
        (this._onDirty = void 0),
        (this._results = []),
        (this._changesDetected = !1),
        (this._changes = void 0),
        (this.length = 0),
        (this.first = void 0),
        (this.last = void 0);
      let n = e.prototype;
      n[Symbol.iterator] || (n[Symbol.iterator] = yg);
    }
    get(t) {
      return this._results[t];
    }
    map(t) {
      return this._results.map(t);
    }
    filter(t) {
      return this._results.filter(t);
    }
    find(t) {
      return this._results.find(t);
    }
    reduce(t, n) {
      return this._results.reduce(t, n);
    }
    forEach(t) {
      this._results.forEach(t);
    }
    some(t) {
      return this._results.some(t);
    }
    toArray() {
      return this._results.slice();
    }
    toString() {
      return this._results.toString();
    }
    reset(t, n) {
      this.dirty = !1;
      let r = Fp(t);
      (this._changesDetected = !Lp(this._results, r, n)) &&
        ((this._results = r),
        (this.length = r.length),
        (this.last = r[this.length - 1]),
        (this.first = r[0]));
    }
    notifyOnChanges() {
      this._changes !== void 0 &&
        (this._changesDetected || !this._emitDistinctChangesOnly) &&
        this._changes.emit(this);
    }
    onDirty(t) {
      this._onDirty = t;
    }
    setDirty() {
      (this.dirty = !0), this._onDirty?.();
    }
    destroy() {
      this._changes !== void 0 &&
        (this._changes.complete(), this._changes.unsubscribe());
    }
  },
  fn = "ngSkipHydration",
  vg = "ngskiphydration";
function Bs(e) {
  let t = e.mergedAttrs;
  if (t === null) return !1;
  for (let n = 0; n < t.length; n += 2) {
    let r = t[n];
    if (typeof r == "number") return !1;
    if (typeof r == "string" && r.toLowerCase() === vg) return !0;
  }
  return !1;
}
function du(e) {
  return e.hasAttribute(fn);
}
function pn(e) {
  return (e.flags & 128) === 128;
}
function hn(e) {
  if (pn(e)) return !0;
  let t = e.parent;
  for (; t; ) {
    if (pn(e) || Bs(t)) return !0;
    t = t.parent;
  }
  return !1;
}
function Eg(e) {
  return pn(e) || Bs(e) || hn(e);
}
var fu = new Map(),
  Ig = 0;
function wg() {
  return Ig++;
}
function Dg(e) {
  fu.set(e[ro], e);
}
function Oi(e) {
  fu.delete(e[ro]);
}
var Nc = "__ngContext__";
function at(e, t) {
  ve(t) ? ((e[Nc] = t[ro]), Dg(t)) : (e[Nc] = t);
}
function pu(e) {
  return gu(e[cn]);
}
function hu(e) {
  return gu(e[ye]);
}
function gu(e) {
  for (; e !== null && !ie(e); ) e = e[ye];
  return e;
}
var Ai;
function Sx(e) {
  Ai = e;
}
function xn() {
  if (Ai !== void 0) return Ai;
  if (typeof document < "u") return document;
  throw new x(210, !1);
}
var Cg = new N("", { providedIn: "root", factory: () => Mg }),
  Mg = "ng",
  Tg = new N(""),
  mu = new N("", { providedIn: "platform", factory: () => "unknown" });
var Ox = new N(""),
  Ax = new N("", {
    providedIn: "root",
    factory: () =>
      xn().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") ||
      null,
  });
function bg() {
  let e = new uo();
  return w(mu) === "browser" && (e.store = xg(xn(), w(Cg))), e;
}
var uo = (() => {
  class e {
    constructor() {
      (this.store = {}), (this.onSerializeCallbacks = {});
    }
    static {
      this.ɵprov = B({ token: e, providedIn: "root", factory: bg });
    }
    get(n, r) {
      return this.store[n] !== void 0 ? this.store[n] : r;
    }
    set(n, r) {
      this.store[n] = r;
    }
    remove(n) {
      delete this.store[n];
    }
    hasKey(n) {
      return this.store.hasOwnProperty(n);
    }
    get isEmpty() {
      return Object.keys(this.store).length === 0;
    }
    onSerialize(n, r) {
      this.onSerializeCallbacks[n] = r;
    }
    toJson() {
      for (let n in this.onSerializeCallbacks)
        if (this.onSerializeCallbacks.hasOwnProperty(n))
          try {
            this.store[n] = this.onSerializeCallbacks[n]();
          } catch (r) {
            console.warn("Exception in onSerialize callback: ", r);
          }
      return JSON.stringify(this.store).replace(/</g, "\\u003C");
    }
  }
  return e;
})();
function xg(e, t) {
  let n = e.getElementById(t + "-state");
  if (n?.textContent)
    try {
      return JSON.parse(n.textContent);
    } catch (r) {
      console.warn("Exception while restoring TransferState for app " + t, r);
    }
  return {};
}
var qs = "h",
  Ws = "b",
  gn = (function (e) {
    return (e.FirstChild = "f"), (e.NextSibling = "n"), e;
  })(gn || {}),
  Ri = "e",
  Pi = "t",
  mn = "c",
  kr = "x",
  Ot = "r",
  ki = "i",
  Li = "n",
  Kt = "d",
  Sc = "l",
  _g = "__nghData__",
  Gs = _g,
  Jt = "ngh",
  Ng = "nghm",
  yu = () => null;
function Sg(e, t, n = !1) {
  let r = e.getAttribute(Jt);
  if (r == null) return null;
  let [o, i] = r.split("|");
  if (((r = n ? i : o), !r)) return null;
  let s = i ? `|${i}` : "",
    a = n ? o : s,
    c = {};
  if (r !== "") {
    let u = t.get(uo, null, { optional: !0 });
    u !== null && (c = u.get(Gs, [])[Number(r)]);
  }
  let l = { data: c, firstChild: e.firstChild ?? null };
  return (
    n && ((l.firstChild = e), fo(l, 0, e.nextSibling)),
    a ? e.setAttribute(Jt, a) : e.removeAttribute(Jt),
    l
  );
}
function Og() {
  yu = Sg;
}
function zs(e, t, n = !1) {
  return yu(e, t, n);
}
function vu(e) {
  let t = e._lView;
  return t[m].type === 2 ? null : (un(t) && (t = t[O]), t);
}
function Ag(e) {
  return e.textContent?.replace(/\s/gm, "");
}
function Rg(e) {
  let t = xn(),
    n = t.createNodeIterator(e, NodeFilter.SHOW_COMMENT, {
      acceptNode(i) {
        let s = Ag(i);
        return s === "ngetn" || s === "ngtns"
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    }),
    r,
    o = [];
  for (; (r = n.nextNode()); ) o.push(r);
  for (let i of o)
    i.textContent === "ngetn"
      ? i.replaceWith(t.createTextNode(""))
      : i.remove();
}
function fo(e, t, n) {
  (e.segmentHeads ??= {}), (e.segmentHeads[t] = n);
}
function Fi(e, t) {
  return e.segmentHeads?.[t] ?? null;
}
function Pg(e, t) {
  let n = e.data,
    r = n[Ri]?.[t] ?? null;
  return r === null && n[mn]?.[t] && (r = Qs(e, t)), r;
}
function Eu(e, t) {
  return e.data[mn]?.[t] ?? null;
}
function Qs(e, t) {
  let n = Eu(e, t) ?? [],
    r = 0;
  for (let o of n) r += o[Ot] * (o[kr] ?? 1);
  return r;
}
function kg(e) {
  if (typeof e.disconnectedNodes > "u") {
    let t = e.data[Kt];
    e.disconnectedNodes = t ? new Set(t) : null;
  }
  return e.disconnectedNodes;
}
function _n(e, t) {
  if (typeof e.disconnectedNodes > "u") {
    let n = e.data[Kt];
    e.disconnectedNodes = n ? new Set(n) : null;
  }
  return !!kg(e)?.has(t);
}
function Iu(e, t) {
  let n = t,
    r = e.corruptedTextNodes;
  n.textContent === ""
    ? r.set(n, "ngetn")
    : n.nextSibling?.nodeType === Node.TEXT_NODE && r.set(n, "ngtns");
}
var cr = new N(""),
  wu = !1,
  Du = new N("", { providedIn: "root", factory: () => wu }),
  Lg = new N(""),
  Fg = new N(""),
  jg = !1,
  lr;
function Vg() {
  if (lr === void 0 && ((lr = null), tn.trustedTypes))
    try {
      lr = tn.trustedTypes.createPolicy("angular", {
        createHTML: (e) => e,
        createScript: (e) => e,
        createScriptURL: (e) => e,
      });
    } catch {}
  return lr;
}
function Zs(e) {
  return Vg()?.createHTML(e) || e;
}
var ur;
function Hg() {
  if (ur === void 0 && ((ur = null), tn.trustedTypes))
    try {
      ur = tn.trustedTypes.createPolicy("angular#unsafe-bypass", {
        createHTML: (e) => e,
        createScript: (e) => e,
        createScriptURL: (e) => e,
      });
    } catch {}
  return ur;
}
function Oc(e) {
  return Hg()?.createScriptURL(e) || e;
}
var Lr = class {
  constructor(t) {
    this.changingThisBreaksApplicationSecurity = t;
  }
  toString() {
    return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${Zc})`;
  }
};
function po(e) {
  return e instanceof Lr ? e.changingThisBreaksApplicationSecurity : e;
}
function Cu(e, t) {
  let n = Ug(e);
  if (n != null && n !== t) {
    if (n === "ResourceURL" && t === "URL") return !0;
    throw new Error(`Required a safe ${t}, got a ${n} (see ${Zc})`);
  }
  return n === t;
}
function Ug(e) {
  return (e instanceof Lr && e.getTypeName()) || null;
}
function $g(e) {
  let t = new Vi(e);
  return Bg() ? new ji(t) : t;
}
var ji = class {
    constructor(t) {
      this.inertDocumentHelper = t;
    }
    getInertBodyElement(t) {
      t = "<body><remove></remove>" + t;
      try {
        let n = new window.DOMParser().parseFromString(Zs(t), "text/html").body;
        return n === null
          ? this.inertDocumentHelper.getInertBodyElement(t)
          : (n.firstChild?.remove(), n);
      } catch {
        return null;
      }
    }
  },
  Vi = class {
    constructor(t) {
      (this.defaultDoc = t),
        (this.inertDocument =
          this.defaultDoc.implementation.createHTMLDocument(
            "sanitization-inert"
          ));
    }
    getInertBodyElement(t) {
      let n = this.inertDocument.createElement("template");
      return (n.innerHTML = Zs(t)), n;
    }
  };
function Bg() {
  try {
    return !!new window.DOMParser().parseFromString(Zs(""), "text/html");
  } catch {
    return !1;
  }
}
var qg = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function Mu(e) {
  return (e = String(e)), e.match(qg) ? e : "unsafe:" + e;
}
function Ge(e) {
  let t = {};
  for (let n of e.split(",")) t[n] = !0;
  return t;
}
function Nn(...e) {
  let t = {};
  for (let n of e) for (let r in n) n.hasOwnProperty(r) && (t[r] = !0);
  return t;
}
var Wg = Ge("area,br,col,hr,img,wbr"),
  Tu = Ge("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
  bu = Ge("rp,rt"),
  Gg = Nn(bu, Tu),
  zg = Nn(
    Tu,
    Ge(
      "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
    )
  ),
  Qg = Nn(
    bu,
    Ge(
      "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
    )
  ),
  Zg = Nn(Wg, zg, Qg, Gg),
  xu = Ge("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
  Yg = Ge(
    "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
  ),
  Kg = Ge(
    "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
  ),
  Jg = Nn(xu, Yg, Kg);
function Xg(e) {
  return "content" in e && em(e) ? e.content : null;
}
function em(e) {
  return e.nodeType === Node.ELEMENT_NODE && e.nodeName === "TEMPLATE";
}
var Ys = (function (e) {
  return (
    (e[(e.NONE = 0)] = "NONE"),
    (e[(e.HTML = 1)] = "HTML"),
    (e[(e.STYLE = 2)] = "STYLE"),
    (e[(e.SCRIPT = 3)] = "SCRIPT"),
    (e[(e.URL = 4)] = "URL"),
    (e[(e.RESOURCE_URL = 5)] = "RESOURCE_URL"),
    e
  );
})(Ys || {});
function tm(e) {
  let t = _u();
  return t ? t.sanitize(Ys.URL, e) || "" : Cu(e, "URL") ? po(e) : Mu(Mn(e));
}
function nm(e) {
  let t = _u();
  if (t) return Oc(t.sanitize(Ys.RESOURCE_URL, e) || "");
  if (Cu(e, "ResourceURL")) return Oc(po(e));
  throw new x(904, !1);
}
function rm(e, t) {
  return (t === "src" &&
    (e === "embed" ||
      e === "frame" ||
      e === "iframe" ||
      e === "media" ||
      e === "script")) ||
    (t === "href" && (e === "base" || e === "link"))
    ? nm
    : tm;
}
function Rx(e, t, n) {
  return rm(t, n)(e);
}
function _u() {
  let e = D();
  return e && e[Ce].sanitizer;
}
var om = /^>|^->|<!--|-->|--!>|<!-$/g,
  im = /(<|>)/g,
  sm = "\u200B$1\u200B";
function am(e) {
  return e.replace(om, (t) => t.replace(im, sm));
}
function cm(e) {
  return e.ownerDocument.body;
}
function Nu(e) {
  return e instanceof Function ? e() : e;
}
function Zt(e) {
  return (e ?? w(Me)).get(mu) === "browser";
}
var Hi = (function (e) {
    return (
      (e[(e.Important = 1)] = "Important"),
      (e[(e.DashCase = 2)] = "DashCase"),
      e
    );
  })(Hi || {}),
  Ui;
function Ks(e, t) {
  return Ui(e, t);
}
function lm(e) {
  Ui === void 0 && (Ui = e());
}
function It(e, t, n, r, o) {
  if (r != null) {
    let i,
      s = !1;
    ie(r) ? (i = r) : ve(r) && ((s = !0), (r = r[F]));
    let a = k(r);
    e === 0 && n !== null
      ? o == null
        ? Pu(t, n, a)
        : At(t, n, a, o || null, !0)
      : e === 1 && n !== null
        ? At(t, n, a, o || null, !0)
        : e === 2
          ? na(t, a, s)
          : e === 3 && t.destroyNode(a),
      i != null && Im(t, e, i, n, o);
  }
}
function Js(e, t) {
  return e.createText(t);
}
function um(e, t, n) {
  e.setValue(t, n);
}
function Xs(e, t) {
  return e.createComment(am(t));
}
function ho(e, t, n) {
  return e.createElement(t, n);
}
function dm(e, t) {
  Su(e, t), (t[F] = null), (t[fe] = null);
}
function fm(e, t, n, r, o, i) {
  (r[F] = o), (r[fe] = t), mo(e, r, n, 1, o, i);
}
function Su(e, t) {
  t[Ce].changeDetectionScheduler?.notify(9), mo(e, t, t[A], 2, null, null);
}
function pm(e) {
  let t = e[cn];
  if (!t) return ti(e[m], e);
  for (; t; ) {
    let n = null;
    if (ve(t)) n = t[cn];
    else {
      let r = t[U];
      r && (n = r);
    }
    if (!n) {
      for (; t && !t[ye] && t !== e; ) ve(t) && ti(t[m], t), (t = t[$]);
      t === null && (t = e), ve(t) && ti(t[m], t), (n = t && t[ye]);
    }
    t = n;
  }
}
function hm(e, t, n, r) {
  let o = U + r,
    i = n.length;
  r > 0 && (n[o - 1][ye] = t),
    r < i - U ? ((t[ye] = n[o]), il(n, U + r, t)) : (n.push(t), (t[ye] = null)),
    (t[$] = n);
  let s = t[tt];
  s !== null && n !== s && Ou(s, t);
  let a = t[Oe];
  a !== null && a.insertView(e), wi(t), (t[y] |= 128);
}
function Ou(e, t) {
  let n = e[Nt],
    r = t[$];
  if (ve(r)) e[y] |= _r.HasTransplantedViews;
  else {
    let o = r[$][J];
    t[J] !== o && (e[y] |= _r.HasTransplantedViews);
  }
  n === null ? (e[Nt] = [t]) : n.push(t);
}
function ea(e, t) {
  let n = e[Nt],
    r = n.indexOf(t);
  n.splice(r, 1);
}
function yn(e, t) {
  if (e.length <= U) return;
  let n = U + t,
    r = e[n];
  if (r) {
    let o = r[tt];
    o !== null && o !== e && ea(o, r), t > 0 && (e[n - 1][ye] = r[ye]);
    let i = Tr(e, U + t);
    dm(r[m], r);
    let s = i[Oe];
    s !== null && s.detachView(i[m]),
      (r[$] = null),
      (r[ye] = null),
      (r[y] &= -129);
  }
  return r;
}
function go(e, t) {
  if (!(t[y] & 256)) {
    let n = t[A];
    n.destroyNode && mo(e, t, n, 3, null, null), pm(t);
  }
}
function ti(e, t) {
  if (t[y] & 256) return;
  let n = C(null);
  try {
    (t[y] &= -129),
      (t[y] |= 256),
      t[ue] && Oo(t[ue]),
      mm(e, t),
      gm(e, t),
      t[m].type === 1 && t[A].destroy();
    let r = t[tt];
    if (r !== null && ie(t[$])) {
      r !== t[$] && ea(r, t);
      let o = t[Oe];
      o !== null && o.detachView(e);
    }
    Oi(t);
  } finally {
    C(n);
  }
}
function gm(e, t) {
  let n = e.cleanup,
    r = t[an];
  if (n !== null)
    for (let i = 0; i < n.length - 1; i += 2)
      if (typeof n[i] == "string") {
        let s = n[i + 3];
        s >= 0 ? r[s]() : r[-s].unsubscribe(), (i += 2);
      } else {
        let s = r[n[i + 1]];
        n[i].call(s);
      }
  r !== null && (t[an] = null);
  let o = t[je];
  if (o !== null) {
    t[je] = null;
    for (let i = 0; i < o.length; i++) {
      let s = o[i];
      s();
    }
  }
}
function mm(e, t) {
  let n;
  if (e != null && (n = e.destroyHooks) != null)
    for (let r = 0; r < n.length; r += 2) {
      let o = t[n[r]];
      if (!(o instanceof it)) {
        let i = n[r + 1];
        if (Array.isArray(i))
          for (let s = 0; s < i.length; s += 2) {
            let a = o[i[s]],
              c = i[s + 1];
            we(4, a, c);
            try {
              c.call(a);
            } finally {
              we(5, a, c);
            }
          }
        else {
          we(4, o, i);
          try {
            i.call(o);
          } finally {
            we(5, o, i);
          }
        }
      }
    }
}
function Au(e, t, n) {
  return Ru(e, t.parent, n);
}
function Ru(e, t, n) {
  let r = t;
  for (; r !== null && r.type & 168; ) (t = r), (r = t.parent);
  if (r === null) return n[F];
  {
    let { componentOffset: o } = r;
    if (o > -1) {
      let { encapsulation: i } = e.data[r.directiveStart + o];
      if (i === bt.None || i === bt.Emulated) return null;
    }
    return se(r, n);
  }
}
function At(e, t, n, r, o) {
  e.insertBefore(t, n, r, o);
}
function Pu(e, t, n) {
  e.appendChild(t, n);
}
function Ac(e, t, n, r, o) {
  r !== null ? At(e, t, n, r, o) : Pu(e, t, n);
}
function ku(e, t) {
  return e.parentNode(t);
}
function ym(e, t) {
  return e.nextSibling(t);
}
function vm(e, t, n) {
  return Fu(e, t, n);
}
function Lu(e, t, n) {
  return e.type & 40 ? se(e, n) : null;
}
var Fu = Lu,
  $i;
function ju(e, t) {
  (Fu = e), ($i = t);
}
function ta(e, t, n, r) {
  let o = Au(e, r, t),
    i = t[A],
    s = r.parent || t[fe],
    a = vm(s, r, t);
  if (o != null)
    if (Array.isArray(n))
      for (let c = 0; c < n.length; c++) Ac(i, o, n[c], a, !1);
    else Ac(i, o, n, a, !1);
  $i !== void 0 && $i(i, r, t, n, o);
}
function Xe(e, t) {
  if (t !== null) {
    let n = t.type;
    if (n & 3) return se(t, e);
    if (n & 4) return Bi(-1, e[t.index]);
    if (n & 8) {
      let r = t.child;
      if (r !== null) return Xe(e, r);
      {
        let o = e[t.index];
        return ie(o) ? Bi(-1, o) : k(o);
      }
    } else {
      if (n & 128) return Xe(e, t.next);
      if (n & 32) return Ks(t, e)() || k(e[t.index]);
      {
        let r = Vu(e, t);
        if (r !== null) {
          if (Array.isArray(r)) return r[0];
          let o = rt(e[J]);
          return Xe(o, r);
        } else return Xe(e, t.next);
      }
    }
  }
  return null;
}
function Vu(e, t) {
  if (t !== null) {
    let r = e[J][fe],
      o = t.projection;
    return r.projection[o];
  }
  return null;
}
function Bi(e, t) {
  let n = U + e + 1;
  if (n < t.length) {
    let r = t[n],
      o = r[m].firstChild;
    if (o !== null) return Xe(r, o);
  }
  return t[Ae];
}
function na(e, t, n) {
  e.removeChild(null, t, n);
}
function Hu(e) {
  e.textContent = "";
}
function ra(e, t, n, r, o, i, s) {
  for (; n != null; ) {
    if (n.type === 128) {
      n = n.next;
      continue;
    }
    let a = r[n.index],
      c = n.type;
    if (
      (s && t === 0 && (a && at(k(a), r), (n.flags |= 2)),
      (n.flags & 32) !== 32)
    )
      if (c & 8) ra(e, t, n.child, r, o, i, !1), It(t, e, o, a, i);
      else if (c & 32) {
        let l = Ks(n, r),
          u;
        for (; (u = l()); ) It(t, e, o, u, i);
        It(t, e, o, a, i);
      } else c & 16 ? Em(e, t, r, n, o, i) : It(t, e, o, a, i);
    n = s ? n.projectionNext : n.next;
  }
}
function mo(e, t, n, r, o, i) {
  ra(n, r, e.firstChild, t, o, i, !1);
}
function Em(e, t, n, r, o, i) {
  let s = n[J],
    c = s[fe].projection[r.projection];
  if (Array.isArray(c))
    for (let l = 0; l < c.length; l++) {
      let u = c[l];
      It(t, e, o, u, i);
    }
  else {
    let l = c,
      u = s[$];
    pn(r) && (l.flags |= 128), ra(e, t, l, u, o, i, !0);
  }
}
function Im(e, t, n, r, o) {
  let i = n[Ae],
    s = k(n);
  i !== s && It(t, e, r, i, o);
  for (let a = U; a < n.length; a++) {
    let c = n[a];
    mo(c[m], c, e, t, r, i);
  }
}
function wm(e, t, n, r, o) {
  if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
  else {
    let i = r.indexOf("-") === -1 ? void 0 : Hi.DashCase;
    o == null
      ? e.removeStyle(n, r, i)
      : (typeof o == "string" &&
          o.endsWith("!important") &&
          ((o = o.slice(0, -10)), (i |= Hi.Important)),
        e.setStyle(n, r, o, i));
  }
}
function Dm(e, t, n) {
  e.setAttribute(t, "style", n);
}
function Uu(e, t, n) {
  n === "" ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", n);
}
function $u(e, t, n) {
  let { mergedAttrs: r, classes: o, styles: i } = n;
  r !== null && mi(e, t, r),
    o !== null && Uu(e, t, o),
    i !== null && Dm(e, t, i);
}
var Ie = {};
function Px(e = 1) {
  Bu(q(), D(), We() + e, !1);
}
function Bu(e, t, n, r) {
  if (!r)
    if ((t[y] & 3) === 3) {
      let i = e.preOrderCheckHooks;
      i !== null && yr(t, i, n);
    } else {
      let i = e.preOrderHooks;
      i !== null && vr(t, i, 0, n);
    }
  ot(n);
}
function oa(e, t = b.Default) {
  let n = D();
  if (n === null) return le(e, t);
  let r = Y();
  return ou(r, n, K(e), t);
}
function kx() {
  let e = "invalid";
  throw new Error(e);
}
function qu(e, t, n, r, o, i) {
  let s = C(null);
  try {
    let a = null;
    o & He.SignalBased && (a = t[r][be]),
      a !== null && a.transformFn !== void 0 && (i = a.transformFn(i)),
      o & He.HasDecoratorInputTransform &&
        (i = e.inputTransforms[r].call(t, i)),
      e.setInput !== null ? e.setInput(t, a, i, n, r) : bl(t, a, r, i);
  } finally {
    C(s);
  }
}
function Cm(e, t) {
  let n = e.hostBindingOpCodes;
  if (n !== null)
    try {
      for (let r = 0; r < n.length; r++) {
        let o = n[r];
        if (o < 0) ot(~o);
        else {
          let i = o,
            s = n[++r],
            a = n[++r];
          jh(s, i);
          let c = t[i];
          a(2, c);
        }
      }
    } finally {
      ot(-1);
    }
}
function yo(e, t, n, r, o, i, s, a, c, l, u) {
  let d = t.blueprint.slice();
  return (
    (d[F] = o),
    (d[y] = r | 4 | 128 | 8 | 64),
    (l !== null || (e && e[y] & 2048)) && (d[y] |= 2048),
    Al(d),
    (d[$] = d[Lt] = e),
    (d[G] = n),
    (d[Ce] = s || (e && e[Ce])),
    (d[A] = a || (e && e[A])),
    (d[_t] = c || (e && e[_t]) || null),
    (d[fe] = i),
    (d[ro] = wg()),
    (d[Ee] = u),
    (d[Cl] = l),
    (d[J] = t.type == 2 ? e[J] : d),
    d
  );
}
function vo(e, t, n, r, o) {
  let i = e.data[t];
  if (i === null) (i = ia(e, t, n, r, o)), Fh() && (i.flags |= 32);
  else if (i.type & 64) {
    (i.type = n), (i.value = r), (i.attrs = o);
    let s = dn();
    i.injectorIndex = s === null ? -1 : s.injectorIndex;
  }
  return Be(i, !0), i;
}
function ia(e, t, n, r, o) {
  let i = Fl(),
    s = jl(),
    a = s ? i : i && i.parent,
    c = (e.data[t] = Sm(e, a, n, t, r, o));
  return (
    e.firstChild === null && (e.firstChild = c),
    i !== null &&
      (s
        ? i.child == null && c.parent !== null && (i.child = c)
        : i.next === null && ((i.next = c), (c.prev = i))),
    c
  );
}
function Sn(e, t, n, r) {
  if (n === 0) return -1;
  let o = t.length;
  for (let i = 0; i < n; i++) t.push(r), e.blueprint.push(r), e.data.push(null);
  return o;
}
function Wu(e, t, n, r, o) {
  let i = We(),
    s = r & 2;
  try {
    ot(-1), s && t.length > O && Bu(e, t, O, !1), we(s ? 2 : 0, o), n(r, o);
  } finally {
    ot(i), we(s ? 3 : 1, o);
  }
}
function Gu(e, t, n) {
  if (Ml(t)) {
    let r = C(null);
    try {
      let o = t.directiveStart,
        i = t.directiveEnd;
      for (let s = o; s < i; s++) {
        let a = e.data[s];
        if (a.contentQueries) {
          let c = n[s];
          a.contentQueries(1, c, s);
        }
      }
    } finally {
      C(r);
    }
  }
}
function zu(e, t, n) {
  Ll() && (Lm(e, t, n, se(n, t)), (n.flags & 64) === 64 && ed(e, t, n));
}
function Qu(e, t, n = se) {
  let r = t.localNames;
  if (r !== null) {
    let o = t.index + 1;
    for (let i = 0; i < r.length; i += 2) {
      let s = r[i + 1],
        a = s === -1 ? n(t, e) : e[s];
      e[o++] = a;
    }
  }
}
function Zu(e) {
  let t = e.tView;
  return t === null || t.incompleteFirstPass
    ? (e.tView = sa(
        1,
        null,
        e.template,
        e.decls,
        e.vars,
        e.directiveDefs,
        e.pipeDefs,
        e.viewQuery,
        e.schemas,
        e.consts,
        e.id
      ))
    : t;
}
function sa(e, t, n, r, o, i, s, a, c, l, u) {
  let d = O + r,
    p = d + o,
    f = Mm(d, p),
    h = typeof l == "function" ? l() : l;
  return (f[m] = {
    type: e,
    blueprint: f,
    template: n,
    queries: null,
    viewQuery: a,
    declTNode: t,
    data: f.slice().fill(null, d),
    bindingStartIndex: d,
    expandoStartIndex: p,
    hostBindingOpCodes: null,
    firstCreatePass: !0,
    firstUpdatePass: !0,
    staticViewQueries: !1,
    staticContentQueries: !1,
    preOrderHooks: null,
    preOrderCheckHooks: null,
    contentHooks: null,
    contentCheckHooks: null,
    viewHooks: null,
    viewCheckHooks: null,
    destroyHooks: null,
    cleanup: null,
    contentQueries: null,
    components: null,
    directiveRegistry: typeof i == "function" ? i() : i,
    pipeRegistry: typeof s == "function" ? s() : s,
    firstChild: null,
    schemas: c,
    consts: h,
    incompleteFirstPass: !1,
    ssrId: u,
  });
}
function Mm(e, t) {
  let n = [];
  for (let r = 0; r < t; r++) n.push(r < e ? null : Ie);
  return n;
}
function Tm(e, t, n, r) {
  let i = r.get(Du, wu) || n === bt.ShadowDom,
    s = e.selectRootElement(t, i);
  return bm(s), s;
}
function bm(e) {
  Yu(e);
}
var Yu = () => null;
function xm(e) {
  du(e) ? Hu(e) : Rg(e);
}
function _m() {
  Yu = xm;
}
function Nm(e, t, n, r) {
  let o = rd(t);
  o.push(n), e.firstCreatePass && od(e).push(r, o.length - 1);
}
function Sm(e, t, n, r, o, i) {
  let s = t ? t.injectorIndex : -1,
    a = 0;
  return (
    bn() && (a |= 128),
    {
      type: n,
      index: r,
      insertBeforeIndex: null,
      injectorIndex: s,
      directiveStart: -1,
      directiveEnd: -1,
      directiveStylingLast: -1,
      componentOffset: -1,
      propertyBindings: null,
      flags: a,
      providerIndexes: 0,
      value: o,
      attrs: i,
      mergedAttrs: null,
      localNames: null,
      initialInputs: void 0,
      inputs: null,
      outputs: null,
      tView: null,
      next: null,
      prev: null,
      projectionNext: null,
      child: null,
      parent: t,
      projection: null,
      styles: null,
      stylesWithoutHost: null,
      residualStyles: void 0,
      classes: null,
      classesWithoutHost: null,
      residualClasses: void 0,
      classBindings: 0,
      styleBindings: 0,
    }
  );
}
function Rc(e, t, n, r, o) {
  for (let i in t) {
    if (!t.hasOwnProperty(i)) continue;
    let s = t[i];
    if (s === void 0) continue;
    r ??= {};
    let a,
      c = He.None;
    Array.isArray(s) ? ((a = s[0]), (c = s[1])) : (a = s);
    let l = i;
    if (o !== null) {
      if (!o.hasOwnProperty(i)) continue;
      l = o[i];
    }
    e === 0 ? Pc(r, n, l, a, c) : Pc(r, n, l, a);
  }
  return r;
}
function Pc(e, t, n, r, o) {
  let i;
  e.hasOwnProperty(n) ? (i = e[n]).push(t, r) : (i = e[n] = [t, r]),
    o !== void 0 && i.push(o);
}
function Om(e, t, n) {
  let r = t.directiveStart,
    o = t.directiveEnd,
    i = e.data,
    s = t.attrs,
    a = [],
    c = null,
    l = null;
  for (let u = r; u < o; u++) {
    let d = i[u],
      p = n ? n.get(d) : null,
      f = p ? p.inputs : null,
      h = p ? p.outputs : null;
    (c = Rc(0, d.inputs, u, c, f)), (l = Rc(1, d.outputs, u, l, h));
    let g = c !== null && s !== null && !xs(t) ? zm(c, u, s) : null;
    a.push(g);
  }
  c !== null &&
    (c.hasOwnProperty("class") && (t.flags |= 8),
    c.hasOwnProperty("style") && (t.flags |= 16)),
    (t.initialInputs = a),
    (t.inputs = c),
    (t.outputs = l);
}
function Am(e) {
  return e === "class"
    ? "className"
    : e === "for"
      ? "htmlFor"
      : e === "formaction"
        ? "formAction"
        : e === "innerHtml"
          ? "innerHTML"
          : e === "readonly"
            ? "readOnly"
            : e === "tabindex"
              ? "tabIndex"
              : e;
}
function Ku(e, t, n, r, o, i, s, a) {
  let c = se(t, n),
    l = t.inputs,
    u;
  !a && l != null && (u = l[r])
    ? (aa(e, n, u, r, o), Ft(t) && Rm(n, t.index))
    : t.type & 3
      ? ((r = Am(r)),
        (o = s != null ? s(o, t.value || "", r) : o),
        i.setProperty(c, r, o))
      : t.type & 12;
}
function Rm(e, t) {
  let n = qe(t, e);
  n[y] & 16 || (n[y] |= 64);
}
function Ju(e, t, n, r) {
  if (Ll()) {
    let o = r === null ? null : { "": -1 },
      i = jm(e, n),
      s,
      a;
    i === null ? (s = a = null) : ([s, a] = i),
      s !== null && Xu(e, t, n, s, o, a),
      o && Vm(n, r, o);
  }
  n.mergedAttrs = on(n.mergedAttrs, n.attrs);
}
function Xu(e, t, n, r, o, i) {
  for (let l = 0; l < r.length; l++) Ti(Or(n, t), e, r[l].type);
  Um(n, e.data.length, r.length);
  for (let l = 0; l < r.length; l++) {
    let u = r[l];
    u.providersResolver && u.providersResolver(u);
  }
  let s = !1,
    a = !1,
    c = Sn(e, t, r.length, null);
  for (let l = 0; l < r.length; l++) {
    let u = r[l];
    (n.mergedAttrs = on(n.mergedAttrs, u.hostAttrs)),
      $m(e, n, t, c, u),
      Hm(c, u, o),
      u.contentQueries !== null && (n.flags |= 4),
      (u.hostBindings !== null || u.hostAttrs !== null || u.hostVars !== 0) &&
        (n.flags |= 64);
    let d = u.type.prototype;
    !s &&
      (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
      ((e.preOrderHooks ??= []).push(n.index), (s = !0)),
      !a &&
        (d.ngOnChanges || d.ngDoCheck) &&
        ((e.preOrderCheckHooks ??= []).push(n.index), (a = !0)),
      c++;
  }
  Om(e, n, i);
}
function Pm(e, t, n, r, o) {
  let i = o.hostBindings;
  if (i) {
    let s = e.hostBindingOpCodes;
    s === null && (s = e.hostBindingOpCodes = []);
    let a = ~t.index;
    km(s) != a && s.push(a), s.push(n, r, i);
  }
}
function km(e) {
  let t = e.length;
  for (; t > 0; ) {
    let n = e[--t];
    if (typeof n == "number" && n < 0) return n;
  }
  return 0;
}
function Lm(e, t, n, r) {
  let o = n.directiveStart,
    i = n.directiveEnd;
  Ft(n) && Bm(t, n, e.data[o + n.componentOffset]),
    e.firstCreatePass || Or(n, t),
    at(r, t);
  let s = n.initialInputs;
  for (let a = o; a < i; a++) {
    let c = e.data[a],
      l = st(t, e, a, n);
    if ((at(l, t), s !== null && Gm(t, a - o, l, c, n, s), $e(c))) {
      let u = qe(n.index, t);
      u[G] = st(t, e, a, n);
    }
  }
}
function ed(e, t, n) {
  let r = n.directiveStart,
    o = n.directiveEnd,
    i = n.index,
    s = Vh();
  try {
    ot(i);
    for (let a = r; a < o; a++) {
      let c = e.data[a],
        l = t[a];
      Di(a),
        (c.hostBindings !== null || c.hostVars !== 0 || c.hostAttrs !== null) &&
          Fm(c, l);
    }
  } finally {
    ot(-1), Di(s);
  }
}
function Fm(e, t) {
  e.hostBindings !== null && e.hostBindings(1, t);
}
function jm(e, t) {
  let n = e.directiveRegistry,
    r = null,
    o = null;
  if (n)
    for (let i = 0; i < n.length; i++) {
      let s = n[i];
      if (Gp(t, s.selectors, !1))
        if ((r || (r = []), $e(s)))
          if (s.findHostDirectiveDefs !== null) {
            let a = [];
            (o = o || new Map()),
              s.findHostDirectiveDefs(s, a, o),
              r.unshift(...a, s);
            let c = a.length;
            qi(e, t, c);
          } else r.unshift(s), qi(e, t, 0);
        else
          (o = o || new Map()), s.findHostDirectiveDefs?.(s, r, o), r.push(s);
    }
  return r === null ? null : [r, o];
}
function qi(e, t, n) {
  (t.componentOffset = n), (e.components ??= []).push(t.index);
}
function Vm(e, t, n) {
  if (t) {
    let r = (e.localNames = []);
    for (let o = 0; o < t.length; o += 2) {
      let i = n[t[o + 1]];
      if (i == null) throw new x(-301, !1);
      r.push(t[o], i);
    }
  }
}
function Hm(e, t, n) {
  if (n) {
    if (t.exportAs)
      for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
    $e(t) && (n[""] = e);
  }
}
function Um(e, t, n) {
  (e.flags |= 1),
    (e.directiveStart = t),
    (e.directiveEnd = t + n),
    (e.providerIndexes = t);
}
function $m(e, t, n, r, o) {
  e.data[r] = o;
  let i = o.factory || (o.factory = Mt(o.type, !0)),
    s = new it(i, $e(o), oa);
  (e.blueprint[r] = s), (n[r] = s), Pm(e, t, r, Sn(e, n, o.hostVars, Ie), o);
}
function Bm(e, t, n) {
  let r = se(t, e),
    o = Zu(n),
    i = e[Ce].rendererFactory,
    s = 16;
  n.signals ? (s = 4096) : n.onPush && (s = 64);
  let a = Eo(
    e,
    yo(e, o, null, s, r, t, null, i.createRenderer(r, n), null, null, null)
  );
  e[t.index] = a;
}
function qm(e, t, n, r, o, i) {
  let s = se(e, t);
  Wm(t[A], s, i, e.value, n, r, o);
}
function Wm(e, t, n, r, o, i, s) {
  if (i == null) e.removeAttribute(t, o, n);
  else {
    let a = s == null ? Mn(i) : s(i, r || "", o);
    e.setAttribute(t, o, a, n);
  }
}
function Gm(e, t, n, r, o, i) {
  let s = i[t];
  if (s !== null)
    for (let a = 0; a < s.length; ) {
      let c = s[a++],
        l = s[a++],
        u = s[a++],
        d = s[a++];
      qu(r, n, c, l, u, d);
    }
}
function zm(e, t, n) {
  let r = null,
    o = 0;
  for (; o < n.length; ) {
    let i = n[o];
    if (i === 0) {
      o += 4;
      continue;
    } else if (i === 5) {
      o += 2;
      continue;
    }
    if (typeof i == "number") break;
    if (e.hasOwnProperty(i)) {
      r === null && (r = []);
      let s = e[i];
      for (let a = 0; a < s.length; a += 3)
        if (s[a] === t) {
          r.push(i, s[a + 1], s[a + 2], n[o + 1]);
          break;
        }
    }
    o += 2;
  }
  return r;
}
function td(e, t, n, r) {
  return [e, !0, 0, t, null, r, null, n, null, null];
}
function nd(e, t) {
  let n = e.contentQueries;
  if (n !== null) {
    let r = C(null);
    try {
      for (let o = 0; o < n.length; o += 2) {
        let i = n[o],
          s = n[o + 1];
        if (s !== -1) {
          let a = e.data[s];
          Ps(i), a.contentQueries(2, t[s], s);
        }
      }
    } finally {
      C(r);
    }
  }
}
function Eo(e, t) {
  return e[cn] ? (e[vc][ye] = t) : (e[cn] = t), (e[vc] = t), t;
}
function Wi(e, t, n) {
  Ps(0);
  let r = C(null);
  try {
    t(e, n);
  } finally {
    C(r);
  }
}
function rd(e) {
  return (e[an] ??= []);
}
function od(e) {
  return (e.cleanup ??= []);
}
function id(e, t) {
  let n = e[_t],
    r = n ? n.get(St, null) : null;
  r && r.handleError(t);
}
function aa(e, t, n, r, o) {
  for (let i = 0; i < n.length; ) {
    let s = n[i++],
      a = n[i++],
      c = n[i++],
      l = t[s],
      u = e.data[s];
    qu(u, l, r, a, c, o);
  }
}
function Qm(e, t, n) {
  let r = Ol(t, e);
  um(e[A], r, n);
}
function Zm(e, t) {
  let n = qe(t, e),
    r = n[m];
  Ym(r, n);
  let o = n[F];
  o !== null && n[Ee] === null && (n[Ee] = zs(o, n[_t])), ca(r, n, n[G]);
}
function Ym(e, t) {
  for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n]);
}
function ca(e, t, n) {
  ks(t);
  try {
    let r = e.viewQuery;
    r !== null && Wi(1, r, n);
    let o = e.template;
    o !== null && Wu(e, t, o, 1, n),
      e.firstCreatePass && (e.firstCreatePass = !1),
      t[Oe]?.finishViewCreation(e),
      e.staticContentQueries && nd(e, t),
      e.staticViewQueries && Wi(2, e.viewQuery, n);
    let i = e.components;
    i !== null && Km(t, i);
  } catch (r) {
    throw (
      (e.firstCreatePass &&
        ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
      r)
    );
  } finally {
    (t[y] &= -5), Ls();
  }
}
function Km(e, t) {
  for (let n = 0; n < t.length; n++) Zm(e, t[n]);
}
function Io(e, t, n, r) {
  let o = C(null);
  try {
    let i = t.tView,
      a = e[y] & 4096 ? 4096 : 16,
      c = yo(
        e,
        i,
        n,
        a,
        null,
        t,
        null,
        null,
        r?.injector ?? null,
        r?.embeddedViewInjector ?? null,
        r?.dehydratedView ?? null
      ),
      l = e[t.index];
    c[tt] = l;
    let u = e[Oe];
    return u !== null && (c[Oe] = u.createEmbeddedView(i)), ca(i, c, n), c;
  } finally {
    C(o);
  }
}
function sd(e, t) {
  let n = U + t;
  if (n < e.length) return e[n];
}
function vn(e, t) {
  return !t || t.firstChild === null || pn(e);
}
function wo(e, t, n, r = !0) {
  let o = t[m];
  if ((hm(o, t, e, n), r)) {
    let s = Bi(n, e),
      a = t[A],
      c = ku(a, e[Ae]);
    c !== null && fm(o, e[fe], a, t, c, s);
  }
  let i = t[Ee];
  i !== null && i.firstChild !== null && (i.firstChild = null);
}
function ad(e, t) {
  let n = yn(e, t);
  return n !== void 0 && go(n[m], n), n;
}
function En(e, t, n, r, o = !1) {
  for (; n !== null; ) {
    if (n.type === 128) {
      n = o ? n.projectionNext : n.next;
      continue;
    }
    let i = t[n.index];
    i !== null && r.push(k(i)), ie(i) && cd(i, r);
    let s = n.type;
    if (s & 8) En(e, t, n.child, r);
    else if (s & 32) {
      let a = Ks(n, t),
        c;
      for (; (c = a()); ) r.push(c);
    } else if (s & 16) {
      let a = Vu(t, n);
      if (Array.isArray(a)) r.push(...a);
      else {
        let c = rt(t[J]);
        En(c[m], c, a, r, !0);
      }
    }
    n = o ? n.projectionNext : n.next;
  }
  return r;
}
function cd(e, t) {
  for (let n = U; n < e.length; n++) {
    let r = e[n],
      o = r[m].firstChild;
    o !== null && En(r[m], r, o, t);
  }
  e[Ae] !== e[F] && t.push(e[Ae]);
}
var ld = [];
function Jm(e) {
  return e[ue] ?? Xm(e);
}
function Xm(e) {
  let t = ld.pop() ?? Object.create(ty);
  return (t.lView = e), t;
}
function ey(e) {
  e.lView[ue] !== e && ((e.lView = null), ld.push(e));
}
var ty = Te(ae({}, $t), {
  consumerIsAlwaysLive: !0,
  consumerMarkedDirty: (e) => {
    io(e.lView);
  },
  consumerOnSignalRead() {
    this.lView[ue] = this;
  },
});
function ny(e) {
  let t = e[ue] ?? Object.create(ry);
  return (t.lView = e), t;
}
var ry = Te(ae({}, $t), {
  consumerIsAlwaysLive: !0,
  consumerMarkedDirty: (e) => {
    let t = rt(e.lView);
    for (; t && !ud(t[m]); ) t = rt(t);
    t && Rl(t);
  },
  consumerOnSignalRead() {
    this.lView[ue] = this;
  },
});
function ud(e) {
  return e.type !== 2;
}
var oy = 100;
function dd(e, t = !0, n = 0) {
  let r = e[Ce],
    o = r.rendererFactory,
    i = !1;
  i || o.begin?.();
  try {
    iy(e, n);
  } catch (s) {
    throw (t && id(e, s), s);
  } finally {
    i || (o.end?.(), r.inlineEffectRunner?.flush());
  }
}
function iy(e, t) {
  let n = Vl();
  try {
    Ic(!0), Gi(e, t);
    let r = 0;
    for (; oo(e); ) {
      if (r === oy) throw new x(103, !1);
      r++, Gi(e, 1);
    }
  } finally {
    Ic(n);
  }
}
function sy(e, t, n, r) {
  let o = t[y];
  if ((o & 256) === 256) return;
  let i = !1,
    s = !1;
  !i && t[Ce].inlineEffectRunner?.flush(), ks(t);
  let a = !0,
    c = null,
    l = null;
  i ||
    (ud(e)
      ? ((l = Jm(t)), (c = kn(l)))
      : wa() === null
        ? ((a = !1), (l = ny(t)), (c = kn(l)))
        : t[ue] && (Oo(t[ue]), (t[ue] = null)));
  try {
    Al(t), Lh(e.bindingStartIndex), n !== null && Wu(e, t, n, 2, r);
    let u = (o & 3) === 3;
    if (!i)
      if (u) {
        let f = e.preOrderCheckHooks;
        f !== null && yr(t, f, null);
      } else {
        let f = e.preOrderHooks;
        f !== null && vr(t, f, 0, null), Ko(t, 0);
      }
    if ((s || ay(t), fd(t, 0), e.contentQueries !== null && nd(e, t), !i))
      if (u) {
        let f = e.contentCheckHooks;
        f !== null && yr(t, f);
      } else {
        let f = e.contentHooks;
        f !== null && vr(t, f, 1), Ko(t, 1);
      }
    Cm(e, t);
    let d = e.components;
    d !== null && hd(t, d, 0);
    let p = e.viewQuery;
    if ((p !== null && Wi(2, p, r), !i))
      if (u) {
        let f = e.viewCheckHooks;
        f !== null && yr(t, f);
      } else {
        let f = e.viewHooks;
        f !== null && vr(t, f, 2), Ko(t, 2);
      }
    if ((e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), t[Yo])) {
      for (let f of t[Yo]) f();
      t[Yo] = null;
    }
    i || (t[y] &= -73);
  } catch (u) {
    throw (i || io(t), u);
  } finally {
    l !== null && (No(l, c), a && ey(l)), Ls();
  }
}
function fd(e, t) {
  for (let n = pu(e); n !== null; n = hu(n))
    for (let r = U; r < n.length; r++) {
      let o = n[r];
      pd(o, t);
    }
}
function ay(e) {
  for (let t = pu(e); t !== null; t = hu(t)) {
    if (!(t[y] & _r.HasTransplantedViews)) continue;
    let n = t[Nt];
    for (let r = 0; r < n.length; r++) {
      let o = n[r];
      Rl(o);
    }
  }
}
function cy(e, t, n) {
  let r = qe(t, e);
  pd(r, n);
}
function pd(e, t) {
  Rs(e) && Gi(e, t);
}
function Gi(e, t) {
  let r = e[m],
    o = e[y],
    i = e[ue],
    s = !!(t === 0 && o & 16);
  if (
    ((s ||= !!(o & 64 && t === 0)),
    (s ||= !!(o & 1024)),
    (s ||= !!(i?.dirty && So(i))),
    (s ||= !1),
    i && (i.dirty = !1),
    (e[y] &= -9217),
    s)
  )
    sy(r, e, r.template, e[G]);
  else if (o & 8192) {
    fd(e, 1);
    let a = r.components;
    a !== null && hd(e, a, 1);
  }
}
function hd(e, t, n) {
  for (let r = 0; r < t.length; r++) cy(e, t[r], n);
}
function la(e, t) {
  let n = Vl() ? 64 : 1088;
  for (e[Ce].changeDetectionScheduler?.notify(t); e; ) {
    e[y] |= n;
    let r = rt(e);
    if (un(e) && !r) return e;
    e = r;
  }
  return null;
}
var ct = class {
    get rootNodes() {
      let t = this._lView,
        n = t[m];
      return En(n, t, n.firstChild, []);
    }
    constructor(t, n, r = !0) {
      (this._lView = t),
        (this._cdRefInjectingView = n),
        (this.notifyErrorHandler = r),
        (this._appRef = null),
        (this._attachedToViewContainer = !1);
    }
    get context() {
      return this._lView[G];
    }
    set context(t) {
      this._lView[G] = t;
    }
    get destroyed() {
      return (this._lView[y] & 256) === 256;
    }
    destroy() {
      if (this._appRef) this._appRef.detachView(this);
      else if (this._attachedToViewContainer) {
        let t = this._lView[$];
        if (ie(t)) {
          let n = t[xr],
            r = n ? n.indexOf(this) : -1;
          r > -1 && (yn(t, r), Tr(n, r));
        }
        this._attachedToViewContainer = !1;
      }
      go(this._lView[m], this._lView);
    }
    onDestroy(t) {
      Pl(this._lView, t);
    }
    markForCheck() {
      la(this._cdRefInjectingView || this._lView, 4);
    }
    detach() {
      this._lView[y] &= -129;
    }
    reattach() {
      wi(this._lView), (this._lView[y] |= 128);
    }
    detectChanges() {
      (this._lView[y] |= 1024), dd(this._lView, this.notifyErrorHandler);
    }
    checkNoChanges() {}
    attachToViewContainerRef() {
      if (this._appRef) throw new x(902, !1);
      this._attachedToViewContainer = !0;
    }
    detachFromAppRef() {
      this._appRef = null;
      let t = un(this._lView),
        n = this._lView[tt];
      n !== null && !t && ea(n, this._lView), Su(this._lView[m], this._lView);
    }
    attachToAppRef(t) {
      if (this._attachedToViewContainer) throw new x(902, !1);
      this._appRef = t;
      let n = un(this._lView),
        r = this._lView[tt];
      r !== null && !n && Ou(r, this._lView), wi(this._lView);
    }
  },
  Fr = (() => {
    class e {
      static {
        this.__NG_ELEMENT_ID__ = dy;
      }
    }
    return e;
  })(),
  ly = Fr,
  uy = class extends ly {
    constructor(t, n, r) {
      super(),
        (this._declarationLView = t),
        (this._declarationTContainer = n),
        (this.elementRef = r);
    }
    get ssrId() {
      return this._declarationTContainer.tView?.ssrId || null;
    }
    createEmbeddedView(t, n) {
      return this.createEmbeddedViewImpl(t, n);
    }
    createEmbeddedViewImpl(t, n, r) {
      let o = Io(this._declarationLView, this._declarationTContainer, t, {
        embeddedViewInjector: n,
        dehydratedView: r,
      });
      return new ct(o);
    }
  };
function dy() {
  return Do(Y(), D());
}
function Do(e, t) {
  return e.type & 4 ? new uy(t, e, Vt(e, t)) : null;
}
var zi = "<-- AT THIS LOCATION";
function fy(e) {
  switch (e) {
    case 4:
      return "view container";
    case 2:
      return "element";
    case 8:
      return "ng-container";
    case 32:
      return "icu";
    case 64:
      return "i18n";
    case 16:
      return "projection";
    case 1:
      return "text";
    case 128:
      return "@let";
    default:
      return "<unknown>";
  }
}
function py(e, t) {
  let n = `During serialization, Angular was unable to find an element in the DOM:

`,
    r = `${vy(e, t, !1)}

`,
    o = Iy();
  throw new x(-502, n + r + o);
}
function hy(e) {
  let t =
      "During serialization, Angular detected DOM nodes that were created outside of Angular context and provided as projectable nodes (likely via `ViewContainerRef.createComponent` or `createComponent` APIs). Hydration is not supported for such cases, consider refactoring the code to avoid this pattern or using `ngSkipHydration` on the host element of the component.\n\n",
    n = `${Ey(e)}

`,
    r = t + n + wy();
  return new x(-503, r);
}
function gy(e) {
  let t = [];
  if (e.attrs)
    for (let n = 0; n < e.attrs.length; ) {
      let r = e.attrs[n++];
      if (typeof r == "number") break;
      let o = e.attrs[n++];
      t.push(`${r}="${jr(o)}"`);
    }
  return t.join(" ");
}
var my = new Set(["ngh", "ng-version", "ng-server-context"]);
function yy(e) {
  let t = [];
  for (let n = 0; n < e.attributes.length; n++) {
    let r = e.attributes[n];
    my.has(r.name) || t.push(`${r.name}="${jr(r.value)}"`);
  }
  return t.join(" ");
}
function ni(e, t = "\u2026") {
  switch (e.type) {
    case 1:
      return `#text${e.value ? `(${e.value})` : ""}`;
    case 2:
      let r = gy(e),
        o = e.value.toLowerCase();
      return `<${o}${r ? " " + r : ""}>${t}</${o}>`;
    case 8:
      return "<!-- ng-container -->";
    case 4:
      return "<!-- container -->";
    default:
      return `#node(${fy(e.type)})`;
  }
}
function Ir(e, t = "\u2026") {
  let n = e;
  switch (n.nodeType) {
    case Node.ELEMENT_NODE:
      let r = n.tagName.toLowerCase(),
        o = yy(n);
      return `<${r}${o ? " " + o : ""}>${t}</${r}>`;
    case Node.TEXT_NODE:
      let i = n.textContent ? jr(n.textContent) : "";
      return `#text${i ? `(${i})` : ""}`;
    case Node.COMMENT_NODE:
      return `<!-- ${jr(n.textContent ?? "")} -->`;
    default:
      return `#node(${n.nodeType})`;
  }
}
function vy(e, t, n) {
  let r = "  ",
    o = "";
  t.prev
    ? ((o +=
        r +
        `\u2026
`),
      (o +=
        r +
        ni(t.prev) +
        `
`))
    : t.type &&
      t.type & 12 &&
      (o +=
        r +
        `\u2026
`),
    n
      ? ((o +=
          r +
          ni(t) +
          `
`),
        (o +=
          r +
          `<!-- container -->  ${zi}
`))
      : (o +=
          r +
          ni(t) +
          `  ${zi}
`),
    (o +=
      r +
      `\u2026
`);
  let i = t.type ? Au(e[m], t, e) : null;
  return (
    i &&
      (o = Ir(
        i,
        `
` + o
      )),
    o
  );
}
function Ey(e) {
  let t = "  ",
    n = "",
    r = e;
  return (
    r.previousSibling &&
      ((n +=
        t +
        `\u2026
`),
      (n +=
        t +
        Ir(r.previousSibling) +
        `
`)),
    (n +=
      t +
      Ir(r) +
      `  ${zi}
`),
    e.nextSibling &&
      (n +=
        t +
        `\u2026
`),
    e.parentNode &&
      (n = Ir(
        r.parentNode,
        `
` + n
      )),
    n
  );
}
function Iy(e) {
  return `To fix this problem:
  * check ${e ? `the "${e}"` : "corresponding"} component for hydration-related issues
  * check to see if your template has valid HTML structure
  * or skip hydration by adding the \`ngSkipHydration\` attribute to its host node in a template

`;
}
function wy() {
  return `Note: attributes are only displayed to better represent the DOM but have no effect on hydration mismatches.

`;
}
function Dy(e) {
  return e.replace(/\s+/gm, "");
}
function jr(e, t = 50) {
  return e
    ? ((e = Dy(e)), e.length > t ? `${e.substring(0, t - 1)}\u2026` : e)
    : "";
}
function gd(e, t, n) {
  let r = t.insertBeforeIndex,
    o = Array.isArray(r) ? r[0] : r;
  return o === null ? Lu(e, t, n) : k(n[o]);
}
function md(e, t, n, r, o) {
  let i = t.insertBeforeIndex;
  if (Array.isArray(i)) {
    let s = r,
      a = null;
    if (
      (t.type & 3 || ((a = s), (s = o)), s !== null && t.componentOffset === -1)
    )
      for (let c = 1; c < i.length; c++) {
        let l = n[i[c]];
        At(e, s, l, a, !1);
      }
  }
}
function yd(e, t) {
  if ((e.push(t), e.length > 1))
    for (let n = e.length - 2; n >= 0; n--) {
      let r = e[n];
      vd(r) || (Cy(r, t) && My(r) === null && Ty(r, t.index));
    }
}
function vd(e) {
  return !(e.type & 64);
}
function Cy(e, t) {
  return vd(t) || e.index > t.index;
}
function My(e) {
  let t = e.insertBeforeIndex;
  return Array.isArray(t) ? t[0] : t;
}
function Ty(e, t) {
  let n = e.insertBeforeIndex;
  Array.isArray(n) ? (n[0] = t) : (ju(gd, md), (e.insertBeforeIndex = t));
}
function by(e, t, n) {
  let r = e.data[t];
  r === null ? (e.data[t] = n) : (r.value = n);
}
function xy(e, t) {
  let n = e.insertBeforeIndex;
  n === null
    ? (ju(gd, md), (n = e.insertBeforeIndex = [null, t]))
    : (yp(Array.isArray(n), !0, "Expecting array here"), n.push(t));
}
function _y(e, t, n) {
  let r = ia(e, n, 64, null, null);
  return yd(t, r), r;
}
function Ny(e, t) {
  let n = t[e.currentCaseLViewIndex];
  return n === null ? n : n < 0 ? ~n : n;
}
function Sy(e, t, n) {
  return e | (t << 17) | (n << 1);
}
function Oy(e) {
  return e === -1;
}
function ua(e, t, n) {
  e.index = 0;
  let r = Ny(t, n);
  r !== null ? (e.removes = t.remove[r]) : (e.removes = Q);
}
function Vr(e) {
  if (e.index < e.removes.length) {
    let t = e.removes[e.index++];
    if (t > 0) return e.lView[t];
    {
      e.stack.push(e.index, e.removes);
      let n = ~t,
        r = e.lView[m].data[n];
      return ua(e, r, e.lView), Vr(e);
    }
  } else
    return e.stack.length === 0
      ? null
      : ((e.removes = e.stack.pop()), (e.index = e.stack.pop()), Vr(e));
}
function Ay() {
  let e = { stack: [], index: -1 };
  function t(n, r) {
    for (e.lView = r; e.stack.length; ) e.stack.pop();
    return ua(e, n.value, r), Vr.bind(null, e);
  }
  return t;
}
function Ry(e, t) {
  let n = { stack: [], index: -1, lView: t };
  return ua(n, e, t), Vr.bind(null, n);
}
var Py = new RegExp(`^(\\d+)*(${Ws}|${qs})*(.*)`);
function ky(e, t) {
  let n = [e];
  for (let r of t) {
    let o = n.length - 1;
    if (o > 0 && n[o - 1] === r) {
      let i = n[o] || 1;
      n[o] = i + 1;
    } else n.push(r, "");
  }
  return n.join("");
}
function Ly(e) {
  let t = e.match(Py),
    [n, r, o, i] = t,
    s = r ? parseInt(r, 10) : o,
    a = [];
  for (let [c, l, u] of i.matchAll(/(f|n)(\d*)/g)) {
    let d = parseInt(u, 10) || 1;
    a.push(l, d);
  }
  return [s, ...a];
}
function Fy(e) {
  return !e.prev && e.parent?.type === 8;
}
function ri(e) {
  return e.index - O;
}
function In(e, t) {
  return !(e.type & 144) && !!t[e.index] && Ed(k(t[e.index]));
}
function Ed(e) {
  return !!e && !e.isConnected;
}
function jy(e, t) {
  let n = e.i18nNodes;
  if (n) return n.get(t);
}
function Co(e, t, n, r) {
  let o = ri(r),
    i = jy(e, o);
  if (i === void 0) {
    let s = e.data[Li];
    if (s?.[o]) i = Hy(s[o], n);
    else if (t.firstChild === r) i = e.firstChild;
    else {
      let a = r.prev === null,
        c = r.prev ?? r.parent;
      if (Fy(r)) {
        let l = ri(r.parent);
        i = Fi(e, l);
      } else {
        let l = se(c, n);
        if (a) i = l.firstChild;
        else {
          let u = ri(c),
            d = Fi(e, u);
          if (c.type === 2 && d) {
            let f = Qs(e, u) + 1;
            i = Mo(f, d);
          } else i = l.nextSibling;
        }
      }
    }
  }
  return i;
}
function Mo(e, t) {
  let n = t;
  for (let r = 0; r < e; r++) n = n.nextSibling;
  return n;
}
function Vy(e, t) {
  let n = e;
  for (let r = 0; r < t.length; r += 2) {
    let o = t[r],
      i = t[r + 1];
    for (let s = 0; s < i; s++)
      switch (o) {
        case gn.FirstChild:
          n = n.firstChild;
          break;
        case gn.NextSibling:
          n = n.nextSibling;
          break;
      }
  }
  return n;
}
function Hy(e, t) {
  let [n, ...r] = Ly(e),
    o;
  if (n === qs) o = t[J][F];
  else if (n === Ws) o = cm(t[J][F]);
  else {
    let i = Number(n);
    o = k(t[i + O]);
  }
  return Vy(o, r);
}
function Qi(e, t) {
  if (e === t) return [];
  if (e.parentElement == null || t.parentElement == null) return null;
  if (e.parentElement === t.parentElement) return Uy(e, t);
  {
    let n = t.parentElement,
      r = Qi(e, n),
      o = Qi(n.firstChild, t);
    return !r || !o ? null : [...r, gn.FirstChild, ...o];
  }
}
function Uy(e, t) {
  let n = [],
    r = null;
  for (r = e; r != null && r !== t; r = r.nextSibling) n.push(gn.NextSibling);
  return r == null ? null : n;
}
function kc(e, t, n) {
  let r = Qi(e, t);
  return r === null ? null : ky(n, r);
}
function $y(e, t, n) {
  let r = e.parent,
    o,
    i,
    s;
  for (; r !== null && (In(r, t) || n?.has(r.index)); ) r = r.parent;
  r === null || !(r.type & 3)
    ? ((o = s = qs), (i = t[J][F]))
    : ((o = r.index), (i = k(t[o])), (s = Mn(o - O)));
  let a = k(t[e.index]);
  if (e.type & 44) {
    let l = Xe(t, e);
    l && (a = l);
  }
  let c = kc(i, a, s);
  if (c === null && i !== a) {
    let l = i.ownerDocument.body;
    if (((c = kc(l, a, Ws)), c === null)) throw py(t, e);
  }
  return c;
}
var Id = !1,
  By = () => {};
function qy(e) {
  Id = e;
}
function Wy() {
  return Id;
}
function Gy(e, t, n, r) {
  By(e, t, n, r);
}
function zy(e) {
  return (e = e ?? w(Me)), e.get(Lg, !1);
}
function Qy(e, t) {
  let n = t.i18nChildren.get(e);
  return n === void 0 && ((n = Zy(e)), t.i18nChildren.set(e, n)), n;
}
function Zy(e) {
  let t = new Set();
  function n(r) {
    switch ((t.add(r.index), r.kind)) {
      case 1:
      case 2: {
        for (let o of r.children) n(o);
        break;
      }
      case 3: {
        for (let o of r.cases) for (let i of o) n(i);
        break;
      }
    }
  }
  for (let r = O; r < e.bindingStartIndex; r++) {
    let o = e.data[r];
    if (!(!o || !o.ast)) for (let i of o.ast) n(i);
  }
  return t.size === 0 ? null : t;
}
function Yy(e, t, n) {
  if (!n.isI18nHydrationEnabled) return null;
  let r = e[m],
    o = r.data[t];
  if (!o || !o.ast) return null;
  let i = r.data[o.parentTNodeIndex];
  if (i && Eg(i)) return null;
  let s = {
    caseQueue: [],
    disconnectedNodes: new Set(),
    disjointNodes: new Set(),
  };
  return (
    Zi(e, s, n, o.ast),
    s.caseQueue.length === 0 &&
    s.disconnectedNodes.size === 0 &&
    s.disjointNodes.size === 0
      ? null
      : s
  );
}
function Zi(e, t, n, r) {
  let o = null;
  for (let i of r) {
    let s = Jy(e, t, n, i);
    s && (Ky(o, s) && t.disjointNodes.add(i.index - O), (o = s));
  }
  return o;
}
function Ky(e, t) {
  return e && e.nextSibling !== t;
}
function Jy(e, t, n, r) {
  let o = k(e[r.index]);
  if (!o || Ed(o)) return t.disconnectedNodes.add(r.index - O), null;
  let i = o;
  switch (r.kind) {
    case 0: {
      Iu(n, i);
      break;
    }
    case 1:
    case 2: {
      Zi(e, t, n, r.children);
      break;
    }
    case 3: {
      let s = e[r.currentCaseLViewIndex];
      if (s != null) {
        let a = s < 0 ? ~s : s;
        t.caseQueue.push(a), Zi(e, t, n, r.cases[a]);
      }
      break;
    }
  }
  return Xy(e, r);
}
function Xy(e, t) {
  let r = e[m].data[t.index];
  return Kl(r)
    ? Xe(e, r)
    : t.kind === 3
      ? (Ry(r, e)() ?? k(e[t.index]))
      : (k(e[t.index]) ?? null);
}
function ev(e) {
  let t = e[Ee];
  if (t) {
    let { i18nNodes: n, dehydratedIcuData: r } = t;
    if (n && r) {
      let o = e[A];
      for (let i of r.values()) tv(o, n, i);
    }
    (t.i18nNodes = void 0), (t.dehydratedIcuData = void 0);
  }
}
function tv(e, t, n) {
  for (let r of n.node.cases[n.case]) {
    let o = t.get(r.index - O);
    o && na(e, o, !1);
  }
}
function wd(e) {
  let t = e[ln] ?? [],
    r = e[$][A];
  for (let o of t) nv(o, r);
  e[ln] = Q;
}
function nv(e, t) {
  let n = 0,
    r = e.firstChild;
  if (r) {
    let o = e.data[Ot];
    for (; n < o; ) {
      let i = r.nextSibling;
      na(t, r, !1), (r = i), n++;
    }
  }
}
function Dd(e) {
  wd(e);
  let t = e[F];
  ve(t) && Hr(t);
  for (let n = U; n < e.length; n++) Hr(e[n]);
}
function Hr(e) {
  ev(e);
  let t = e[m];
  for (let n = O; n < t.bindingStartIndex; n++)
    if (ie(e[n])) {
      let r = e[n];
      Dd(r);
    } else ve(e[n]) && Hr(e[n]);
}
function rv(e) {
  let t = e._views;
  for (let n of t) {
    let r = vu(n);
    r !== null && r[F] !== null && (ve(r) ? Hr(r) : Dd(r));
  }
}
function ov(e, t) {
  let n = [];
  for (let r of t)
    for (let o = 0; o < (r[kr] ?? 1); o++) {
      let i = { data: r, firstChild: null };
      r[Ot] > 0 && ((i.firstChild = e), (e = Mo(r[Ot], e))), n.push(i);
    }
  return [e, n];
}
var Cd = () => null;
function iv(e, t) {
  let n = e[ln];
  return !t || n === null || n.length === 0
    ? null
    : n[0].data[ki] === t
      ? n.shift()
      : (wd(e), null);
}
function sv() {
  Cd = iv;
}
function wn(e, t) {
  return Cd(e, t);
}
var lt = class {},
  da = new N("", { providedIn: "root", factory: () => !1 });
var Md = new N(""),
  Td = new N(""),
  Yi = class {},
  Ur = class {};
function av(e) {
  let t = Error(`No component factory found for ${oe(e)}.`);
  return (t[cv] = e), t;
}
var cv = "ngComponent";
var Ki = class {
    resolveComponentFactory(t) {
      throw av(t);
    }
  },
  Rt = class {
    static {
      this.NULL = new Ki();
    }
  },
  $r = class {},
  Fx = (() => {
    class e {
      constructor() {
        this.destroyNode = null;
      }
      static {
        this.__NG_ELEMENT_ID__ = () => lv();
      }
    }
    return e;
  })();
function lv() {
  let e = D(),
    t = Y(),
    n = qe(t.index, e);
  return (ve(n) ? n : e)[A];
}
var uv = (() => {
  class e {
    static {
      this.ɵprov = B({ token: e, providedIn: "root", factory: () => null });
    }
  }
  return e;
})();
function Ji(e, t, n) {
  let r = n ? e.styles : null,
    o = n ? e.classes : null,
    i = 0;
  if (t !== null)
    for (let s = 0; s < t.length; s++) {
      let a = t[s];
      if (typeof a == "number") i = a;
      else if (i == 1) o = fi(o, a);
      else if (i == 2) {
        let c = a,
          l = t[++s];
        r = fi(r, c + ": " + l + ";");
      }
    }
  n ? (e.styles = r) : (e.stylesWithoutHost = r),
    n ? (e.classes = o) : (e.classesWithoutHost = o);
}
var Br = class extends Rt {
  constructor(t) {
    super(), (this.ngModule = t);
  }
  resolveComponentFactory(t) {
    let n = Se(t);
    return new Pt(n, this.ngModule);
  }
};
function Lc(e, t) {
  let n = [];
  for (let r in e) {
    if (!e.hasOwnProperty(r)) continue;
    let o = e[r];
    if (o === void 0) continue;
    let i = Array.isArray(o),
      s = i ? o[0] : o,
      a = i ? o[1] : He.None;
    t
      ? n.push({
          propName: s,
          templateName: r,
          isSignal: (a & He.SignalBased) !== 0,
        })
      : n.push({ propName: s, templateName: r });
  }
  return n;
}
function dv(e) {
  let t = e.toLowerCase();
  return t === "svg" ? wh : t === "math" ? Dh : null;
}
var Pt = class extends Ur {
    get inputs() {
      let t = this.componentDef,
        n = t.inputTransforms,
        r = Lc(t.inputs, !0);
      if (n !== null)
        for (let o of r)
          n.hasOwnProperty(o.propName) && (o.transform = n[o.propName]);
      return r;
    }
    get outputs() {
      return Lc(this.componentDef.outputs, !1);
    }
    constructor(t, n) {
      super(),
        (this.componentDef = t),
        (this.ngModule = n),
        (this.componentType = t.type),
        (this.selector = Yp(t.selectors)),
        (this.ngContentSelectors = t.ngContentSelectors
          ? t.ngContentSelectors
          : []),
        (this.isBoundToModule = !!n);
    }
    create(t, n, r, o) {
      let i = C(null);
      try {
        o = o || this.ngModule;
        let s = o instanceof Ue ? o : o?.injector;
        s &&
          this.componentDef.getStandaloneInjector !== null &&
          (s = this.componentDef.getStandaloneInjector(s) || s);
        let a = s ? new Ci(t, s) : t,
          c = a.get($r, null);
        if (c === null) throw new x(407, !1);
        let l = a.get(uv, null),
          u = a.get(lt, null),
          d = {
            rendererFactory: c,
            sanitizer: l,
            inlineEffectRunner: null,
            changeDetectionScheduler: u,
          },
          p = c.createRenderer(null, this.componentDef),
          f = this.componentDef.selectors[0][0] || "div",
          h = r
            ? Tm(p, r, this.componentDef.encapsulation, a)
            : ho(p, f, dv(f)),
          g = 512;
        this.componentDef.signals
          ? (g |= 4096)
          : this.componentDef.onPush || (g |= 16);
        let M = null;
        h !== null && (M = zs(h, a, !0));
        let v = sa(0, null, null, 1, 0, null, null, null, null, null, null),
          P = yo(null, v, null, g, null, null, d, p, a, null, M);
        ks(P);
        let X,
          z,
          pe = null;
        try {
          let W = this.componentDef,
            ee,
            ft = null;
          W.findHostDirectiveDefs
            ? ((ee = []),
              (ft = new Map()),
              W.findHostDirectiveDefs(W, ee, ft),
              ee.push(W))
            : (ee = [W]);
          let Ea = fv(P, h);
          (pe = pv(Ea, h, W, ee, P, d, p)),
            (z = As(v, O)),
            h && mv(p, W, h, r),
            n !== void 0 && yv(z, this.ngContentSelectors, n),
            (X = gv(pe, W, ee, ft, P, [vv])),
            ca(v, P, null);
        } catch (W) {
          throw (pe !== null && Oi(pe), Oi(P), W);
        } finally {
          Ls();
        }
        return new Xi(this.componentType, X, Vt(z, P), P, z);
      } finally {
        C(i);
      }
    }
  },
  Xi = class extends Yi {
    constructor(t, n, r, o, i) {
      super(),
        (this.location = r),
        (this._rootLView = o),
        (this._tNode = i),
        (this.previousInputValues = null),
        (this.instance = n),
        (this.hostView = this.changeDetectorRef = new ct(o, void 0, !1)),
        (this.componentType = t);
    }
    setInput(t, n) {
      let r = this._tNode.inputs,
        o;
      if (r !== null && (o = r[t])) {
        if (
          ((this.previousInputValues ??= new Map()),
          this.previousInputValues.has(t) &&
            Object.is(this.previousInputValues.get(t), n))
        )
          return;
        let i = this._rootLView;
        aa(i[m], i, o, t, n), this.previousInputValues.set(t, n);
        let s = qe(this._tNode.index, i);
        la(s, 1);
      }
    }
    get injector() {
      return new et(this._tNode, this._rootLView);
    }
    destroy() {
      this.hostView.destroy();
    }
    onDestroy(t) {
      this.hostView.onDestroy(t);
    }
  };
function fv(e, t) {
  let n = e[m],
    r = O;
  return (e[r] = t), vo(n, r, 2, "#host", null);
}
function pv(e, t, n, r, o, i, s) {
  let a = o[m];
  hv(r, e, t, s);
  let c = null;
  t !== null && (c = zs(t, o[_t]));
  let l = i.rendererFactory.createRenderer(t, n),
    u = 16;
  n.signals ? (u = 4096) : n.onPush && (u = 64);
  let d = yo(o, Zu(n), null, u, o[e.index], e, i, l, null, null, c);
  return (
    a.firstCreatePass && qi(a, e, r.length - 1), Eo(o, d), (o[e.index] = d)
  );
}
function hv(e, t, n, r) {
  for (let o of e) t.mergedAttrs = on(t.mergedAttrs, o.hostAttrs);
  t.mergedAttrs !== null &&
    (Ji(t, t.mergedAttrs, !0), n !== null && $u(r, n, t));
}
function gv(e, t, n, r, o, i) {
  let s = Y(),
    a = o[m],
    c = se(s, o);
  Xu(a, o, s, n, null, r);
  for (let u = 0; u < n.length; u++) {
    let d = s.directiveStart + u,
      p = st(o, a, d, s);
    at(p, o);
  }
  ed(a, o, s), c && at(c, o);
  let l = st(o, a, s.directiveStart + s.componentOffset, s);
  if (((e[G] = o[G] = l), i !== null)) for (let u of i) u(l, t);
  return Gu(a, s, o), l;
}
function mv(e, t, n, r) {
  if (r) mi(e, n, ["ng-version", "18.2.10"]);
  else {
    let { attrs: o, classes: i } = Kp(t.selectors[0]);
    o && mi(e, n, o), i && i.length > 0 && Uu(e, n, i.join(" "));
  }
}
function yv(e, t, n) {
  let r = (e.projection = []);
  for (let o = 0; o < t.length; o++) {
    let i = n[o];
    r.push(i != null ? Array.from(i) : null);
  }
}
function vv() {
  let e = Y();
  js(D()[m], e);
}
var fa = (() => {
  class e {
    static {
      this.__NG_ELEMENT_ID__ = Ev;
    }
  }
  return e;
})();
function Ev() {
  let e = Y();
  return xd(e, D());
}
var Iv = fa,
  bd = class extends Iv {
    constructor(t, n, r) {
      super(),
        (this._lContainer = t),
        (this._hostTNode = n),
        (this._hostLView = r);
    }
    get element() {
      return Vt(this._hostTNode, this._hostLView);
    }
    get injector() {
      return new et(this._hostTNode, this._hostLView);
    }
    get parentInjector() {
      let t = Vs(this._hostTNode, this._hostLView);
      if (Jl(t)) {
        let n = Sr(t, this._hostLView),
          r = Nr(t),
          o = n[m].data[r + 8];
        return new et(o, n);
      } else return new et(null, this._hostLView);
    }
    clear() {
      for (; this.length > 0; ) this.remove(this.length - 1);
    }
    get(t) {
      let n = Fc(this._lContainer);
      return (n !== null && n[t]) || null;
    }
    get length() {
      return this._lContainer.length - U;
    }
    createEmbeddedView(t, n, r) {
      let o, i;
      typeof r == "number"
        ? (o = r)
        : r != null && ((o = r.index), (i = r.injector));
      let s = wn(this._lContainer, t.ssrId),
        a = t.createEmbeddedViewImpl(n || {}, i, s);
      return this.insertImpl(a, o, vn(this._hostTNode, s)), a;
    }
    createComponent(t, n, r, o, i) {
      let s = t && !gh(t),
        a;
      if (s) a = n;
      else {
        let h = n || {};
        (a = h.index),
          (r = h.injector),
          (o = h.projectableNodes),
          (i = h.environmentInjector || h.ngModuleRef);
      }
      let c = s ? t : new Pt(Se(t)),
        l = r || this.parentInjector;
      if (!i && c.ngModule == null) {
        let g = (s ? l : this.parentInjector).get(Ue, null);
        g && (i = g);
      }
      let u = Se(c.componentType ?? {}),
        d = wn(this._lContainer, u?.id ?? null),
        p = d?.firstChild ?? null,
        f = c.create(l, o, p, i);
      return this.insertImpl(f.hostView, a, vn(this._hostTNode, d)), f;
    }
    insert(t, n) {
      return this.insertImpl(t, n, !0);
    }
    insertImpl(t, n, r) {
      let o = t._lView;
      if (Th(o)) {
        let a = this.indexOf(t);
        if (a !== -1) this.detach(a);
        else {
          let c = o[$],
            l = new bd(c, c[fe], c[$]);
          l.detach(l.indexOf(t));
        }
      }
      let i = this._adjustIndex(n),
        s = this._lContainer;
      return wo(s, o, i, r), t.attachToViewContainerRef(), il(oi(s), i, t), t;
    }
    move(t, n) {
      return this.insert(t, n);
    }
    indexOf(t) {
      let n = Fc(this._lContainer);
      return n !== null ? n.indexOf(t) : -1;
    }
    remove(t) {
      let n = this._adjustIndex(t, -1),
        r = yn(this._lContainer, n);
      r && (Tr(oi(this._lContainer), n), go(r[m], r));
    }
    detach(t) {
      let n = this._adjustIndex(t, -1),
        r = yn(this._lContainer, n);
      return r && Tr(oi(this._lContainer), n) != null ? new ct(r) : null;
    }
    _adjustIndex(t, n = 0) {
      return t ?? this.length + n;
    }
  };
function Fc(e) {
  return e[xr];
}
function oi(e) {
  return e[xr] || (e[xr] = []);
}
function xd(e, t) {
  let n,
    r = t[e.index];
  return (
    ie(r) ? (n = r) : ((n = td(r, t, null, e)), (t[e.index] = n), Eo(t, n)),
    _d(n, t, e, r),
    new bd(n, e, t)
  );
}
function wv(e, t) {
  let n = e[A],
    r = n.createComment(""),
    o = se(t, e),
    i = ku(n, o);
  return At(n, i, r, ym(n, o), !1), r;
}
var _d = Nd,
  pa = () => !1;
function Dv(e, t, n) {
  return pa(e, t, n);
}
function Nd(e, t, n, r) {
  if (e[Ae]) return;
  let o;
  n.type & 8 ? (o = k(r)) : (o = wv(t, n)), (e[Ae] = o);
}
function Cv(e, t, n) {
  if (e[Ae] && e[ln]) return !0;
  let r = n[Ee],
    o = t.index - O;
  if (!r || hn(t) || _n(r, o)) return !1;
  let s = Fi(r, o),
    a = r.data[mn]?.[o],
    [c, l] = ov(s, a);
  return (e[Ae] = c), (e[ln] = l), !0;
}
function Mv(e, t, n, r) {
  pa(e, n, t) || Nd(e, t, n, r);
}
function Tv() {
  (_d = Mv), (pa = Cv);
}
var es = class e {
    constructor(t) {
      (this.queryList = t), (this.matches = null);
    }
    clone() {
      return new e(this.queryList);
    }
    setDirty() {
      this.queryList.setDirty();
    }
  },
  ts = class e {
    constructor(t = []) {
      this.queries = t;
    }
    createEmbeddedView(t) {
      let n = t.queries;
      if (n !== null) {
        let r = t.contentQueries !== null ? t.contentQueries[0] : n.length,
          o = [];
        for (let i = 0; i < r; i++) {
          let s = n.getByIndex(i),
            a = this.queries[s.indexInDeclarationView];
          o.push(a.clone());
        }
        return new e(o);
      }
      return null;
    }
    insertView(t) {
      this.dirtyQueriesWithMatches(t);
    }
    detachView(t) {
      this.dirtyQueriesWithMatches(t);
    }
    finishViewCreation(t) {
      this.dirtyQueriesWithMatches(t);
    }
    dirtyQueriesWithMatches(t) {
      for (let n = 0; n < this.queries.length; n++)
        ha(t, n).matches !== null && this.queries[n].setDirty();
    }
  },
  ns = class {
    constructor(t, n, r = null) {
      (this.flags = n),
        (this.read = r),
        typeof t == "string" ? (this.predicate = Rv(t)) : (this.predicate = t);
    }
  },
  rs = class e {
    constructor(t = []) {
      this.queries = t;
    }
    elementStart(t, n) {
      for (let r = 0; r < this.queries.length; r++)
        this.queries[r].elementStart(t, n);
    }
    elementEnd(t) {
      for (let n = 0; n < this.queries.length; n++)
        this.queries[n].elementEnd(t);
    }
    embeddedTView(t) {
      let n = null;
      for (let r = 0; r < this.length; r++) {
        let o = n !== null ? n.length : 0,
          i = this.getByIndex(r).embeddedTView(t, o);
        i &&
          ((i.indexInDeclarationView = r), n !== null ? n.push(i) : (n = [i]));
      }
      return n !== null ? new e(n) : null;
    }
    template(t, n) {
      for (let r = 0; r < this.queries.length; r++)
        this.queries[r].template(t, n);
    }
    getByIndex(t) {
      return this.queries[t];
    }
    get length() {
      return this.queries.length;
    }
    track(t) {
      this.queries.push(t);
    }
  },
  os = class e {
    constructor(t, n = -1) {
      (this.metadata = t),
        (this.matches = null),
        (this.indexInDeclarationView = -1),
        (this.crossesNgTemplate = !1),
        (this._appliesToNextNode = !0),
        (this._declarationNodeIndex = n);
    }
    elementStart(t, n) {
      this.isApplyingToNode(n) && this.matchTNode(t, n);
    }
    elementEnd(t) {
      this._declarationNodeIndex === t.index && (this._appliesToNextNode = !1);
    }
    template(t, n) {
      this.elementStart(t, n);
    }
    embeddedTView(t, n) {
      return this.isApplyingToNode(t)
        ? ((this.crossesNgTemplate = !0),
          this.addMatch(-t.index, n),
          new e(this.metadata))
        : null;
    }
    isApplyingToNode(t) {
      if (this._appliesToNextNode && (this.metadata.flags & 1) !== 1) {
        let n = this._declarationNodeIndex,
          r = t.parent;
        for (; r !== null && r.type & 8 && r.index !== n; ) r = r.parent;
        return n === (r !== null ? r.index : -1);
      }
      return this._appliesToNextNode;
    }
    matchTNode(t, n) {
      let r = this.metadata.predicate;
      if (Array.isArray(r))
        for (let o = 0; o < r.length; o++) {
          let i = r[o];
          this.matchTNodeWithReadOption(t, n, bv(n, i)),
            this.matchTNodeWithReadOption(t, n, Er(n, t, i, !1, !1));
        }
      else
        r === Fr
          ? n.type & 4 && this.matchTNodeWithReadOption(t, n, -1)
          : this.matchTNodeWithReadOption(t, n, Er(n, t, r, !1, !1));
    }
    matchTNodeWithReadOption(t, n, r) {
      if (r !== null) {
        let o = this.metadata.read;
        if (o !== null)
          if (o === lo || o === fa || (o === Fr && n.type & 4))
            this.addMatch(n.index, -2);
          else {
            let i = Er(n, t, o, !1, !1);
            i !== null && this.addMatch(n.index, i);
          }
        else this.addMatch(n.index, r);
      }
    }
    addMatch(t, n) {
      this.matches === null ? (this.matches = [t, n]) : this.matches.push(t, n);
    }
  };
function bv(e, t) {
  let n = e.localNames;
  if (n !== null) {
    for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1];
  }
  return null;
}
function xv(e, t) {
  return e.type & 11 ? Vt(e, t) : e.type & 4 ? Do(e, t) : null;
}
function _v(e, t, n, r) {
  return n === -1 ? xv(t, e) : n === -2 ? Nv(e, t, r) : st(e, e[m], n, t);
}
function Nv(e, t, n) {
  if (n === lo) return Vt(t, e);
  if (n === Fr) return Do(t, e);
  if (n === fa) return xd(t, e);
}
function Sd(e, t, n, r) {
  let o = t[Oe].queries[r];
  if (o.matches === null) {
    let i = e.data,
      s = n.matches,
      a = [];
    for (let c = 0; s !== null && c < s.length; c += 2) {
      let l = s[c];
      if (l < 0) a.push(null);
      else {
        let u = i[l];
        a.push(_v(t, u, s[c + 1], n.metadata.read));
      }
    }
    o.matches = a;
  }
  return o.matches;
}
function is(e, t, n, r) {
  let o = e.queries.getByIndex(n),
    i = o.matches;
  if (i !== null) {
    let s = Sd(e, t, o, n);
    for (let a = 0; a < i.length; a += 2) {
      let c = i[a];
      if (c > 0) r.push(s[a / 2]);
      else {
        let l = i[a + 1],
          u = t[-c];
        for (let d = U; d < u.length; d++) {
          let p = u[d];
          p[tt] === p[$] && is(p[m], p, l, r);
        }
        if (u[Nt] !== null) {
          let d = u[Nt];
          for (let p = 0; p < d.length; p++) {
            let f = d[p];
            is(f[m], f, l, r);
          }
        }
      }
    }
  }
  return r;
}
function Sv(e, t) {
  return e[Oe].queries[t].queryList;
}
function Ov(e, t, n) {
  let r = new Si((n & 4) === 4);
  return (
    Nm(e, t, r, r.destroy), (t[Oe] ??= new ts()).queries.push(new es(r)) - 1
  );
}
function Av(e, t, n, r) {
  let o = q();
  if (o.firstCreatePass) {
    let i = Y();
    Pv(o, new ns(t, n, r), i.index),
      kv(o, e),
      (n & 2) === 2 && (o.staticContentQueries = !0);
  }
  return Ov(o, D(), n);
}
function Rv(e) {
  return e.split(",").map((t) => t.trim());
}
function Pv(e, t, n) {
  e.queries === null && (e.queries = new rs()), e.queries.track(new os(t, n));
}
function kv(e, t) {
  let n = e.contentQueries || (e.contentQueries = []),
    r = n.length ? n[n.length - 1] : -1;
  t !== r && n.push(e.queries.length - 1, t);
}
function ha(e, t) {
  return e.queries.getByIndex(t);
}
function Lv(e, t) {
  let n = e[m],
    r = ha(n, t);
  return r.crossesNgTemplate ? is(n, e, t, []) : Sd(n, e, r, t);
}
var jc = new Set();
function ze(e) {
  jc.has(e) ||
    (jc.add(e),
    performance?.mark?.("mark_feature_usage", { detail: { feature: e } }));
}
function Fv(e) {
  return typeof e == "function" && e[be] !== void 0;
}
function Vx(e, t) {
  ze("NgSignals");
  let n = Aa(e),
    r = n[be];
  return (
    t?.equal && (r.equal = t.equal),
    (n.set = (o) => Ao(r, o)),
    (n.update = (o) => Ra(r, o)),
    (n.asReadonly = jv.bind(n)),
    n
  );
}
function jv() {
  let e = this[be];
  if (e.readonlyFn === void 0) {
    let t = () => this();
    (t[be] = e), (e.readonlyFn = t);
  }
  return e.readonlyFn;
}
function Od(e) {
  return Fv(e) && typeof e.set == "function";
}
function Vv(e) {
  let t = [],
    n = new Map();
  function r(o) {
    let i = n.get(o);
    if (!i) {
      let s = e(o);
      n.set(o, (i = s.then(Bv)));
    }
    return i;
  }
  return (
    qr.forEach((o, i) => {
      let s = [];
      o.templateUrl &&
        s.push(
          r(o.templateUrl).then((l) => {
            o.template = l;
          })
        );
      let a = typeof o.styles == "string" ? [o.styles] : o.styles || [];
      if (((o.styles = a), o.styleUrl && o.styleUrls?.length))
        throw new Error(
          "@Component cannot define both `styleUrl` and `styleUrls`. Use `styleUrl` if the component has one stylesheet, or `styleUrls` if it has multiple"
        );
      if (o.styleUrls?.length) {
        let l = o.styles.length,
          u = o.styleUrls;
        o.styleUrls.forEach((d, p) => {
          a.push(""),
            s.push(
              r(d).then((f) => {
                (a[l + p] = f),
                  u.splice(u.indexOf(d), 1),
                  u.length == 0 && (o.styleUrls = void 0);
              })
            );
        });
      } else
        o.styleUrl &&
          s.push(
            r(o.styleUrl).then((l) => {
              a.push(l), (o.styleUrl = void 0);
            })
          );
      let c = Promise.all(s).then(() => qv(i));
      t.push(c);
    }),
    Uv(),
    Promise.all(t).then(() => {})
  );
}
var qr = new Map(),
  Hv = new Set();
function Uv() {
  let e = qr;
  return (qr = new Map()), e;
}
function $v() {
  return qr.size === 0;
}
function Bv(e) {
  return typeof e == "string" ? e : e.text();
}
function qv(e) {
  Hv.delete(e);
}
function Wv(e) {
  return Object.getPrototypeOf(e.prototype).constructor;
}
function Gv(e) {
  let t = Wv(e.type),
    n = !0,
    r = [e];
  for (; t; ) {
    let o;
    if ($e(e)) o = t.ɵcmp || t.ɵdir;
    else {
      if (t.ɵcmp) throw new x(903, !1);
      o = t.ɵdir;
    }
    if (o) {
      if (n) {
        r.push(o);
        let s = e;
        (s.inputs = dr(e.inputs)),
          (s.inputTransforms = dr(e.inputTransforms)),
          (s.declaredInputs = dr(e.declaredInputs)),
          (s.outputs = dr(e.outputs));
        let a = o.hostBindings;
        a && Kv(e, a);
        let c = o.viewQuery,
          l = o.contentQueries;
        if (
          (c && Zv(e, c),
          l && Yv(e, l),
          zv(e, o),
          gp(e.outputs, o.outputs),
          $e(o) && o.data.animation)
        ) {
          let u = e.data;
          u.animation = (u.animation || []).concat(o.data.animation);
        }
      }
      let i = o.features;
      if (i)
        for (let s = 0; s < i.length; s++) {
          let a = i[s];
          a && a.ngInherit && a(e), a === Gv && (n = !1);
        }
    }
    t = Object.getPrototypeOf(t);
  }
  Qv(r);
}
function zv(e, t) {
  for (let n in t.inputs) {
    if (!t.inputs.hasOwnProperty(n) || e.inputs.hasOwnProperty(n)) continue;
    let r = t.inputs[n];
    if (
      r !== void 0 &&
      ((e.inputs[n] = r),
      (e.declaredInputs[n] = t.declaredInputs[n]),
      t.inputTransforms !== null)
    ) {
      let o = Array.isArray(r) ? r[0] : r;
      if (!t.inputTransforms.hasOwnProperty(o)) continue;
      (e.inputTransforms ??= {}), (e.inputTransforms[o] = t.inputTransforms[o]);
    }
  }
}
function Qv(e) {
  let t = 0,
    n = null;
  for (let r = e.length - 1; r >= 0; r--) {
    let o = e[r];
    (o.hostVars = t += o.hostVars),
      (o.hostAttrs = on(o.hostAttrs, (n = on(n, o.hostAttrs))));
  }
}
function dr(e) {
  return e === Tt ? {} : e === Q ? [] : e;
}
function Zv(e, t) {
  let n = e.viewQuery;
  n
    ? (e.viewQuery = (r, o) => {
        t(r, o), n(r, o);
      })
    : (e.viewQuery = t);
}
function Yv(e, t) {
  let n = e.contentQueries;
  n
    ? (e.contentQueries = (r, o, i) => {
        t(r, o, i), n(r, o, i);
      })
    : (e.contentQueries = t);
}
function Kv(e, t) {
  let n = e.hostBindings;
  n
    ? (e.hostBindings = (r, o) => {
        t(r, o), n(r, o);
      })
    : (e.hostBindings = t);
}
function Hx(e) {
  let t = e.inputConfig,
    n = {};
  for (let r in t)
    if (t.hasOwnProperty(r)) {
      let o = t[r];
      Array.isArray(o) && o[3] && (n[r] = o[3]);
    }
  e.inputTransforms = n;
}
var ut = class {},
  ss = class {};
var Wr = class extends ut {
    constructor(t, n, r, o = !0) {
      super(),
        (this.ngModuleType = t),
        (this._parent = n),
        (this._bootstrapComponents = []),
        (this.destroyCbs = []),
        (this.componentFactoryResolver = new Br(this));
      let i = pl(t);
      (this._bootstrapComponents = Nu(i.bootstrap)),
        (this._r3Injector = au(
          t,
          n,
          [
            { provide: ut, useValue: this },
            { provide: Rt, useValue: this.componentFactoryResolver },
            ...r,
          ],
          oe(t),
          new Set(["environment"])
        )),
        o && this.resolveInjectorInitializers();
    }
    resolveInjectorInitializers() {
      this._r3Injector.resolveInjectorInitializers(),
        (this.instance = this._r3Injector.get(this.ngModuleType));
    }
    get injector() {
      return this._r3Injector;
    }
    destroy() {
      let t = this._r3Injector;
      !t.destroyed && t.destroy(),
        this.destroyCbs.forEach((n) => n()),
        (this.destroyCbs = null);
    }
    onDestroy(t) {
      this.destroyCbs.push(t);
    }
  },
  Gr = class extends ss {
    constructor(t) {
      super(), (this.moduleType = t);
    }
    create(t) {
      return new Wr(this.moduleType, t, []);
    }
  };
function Jv(e, t, n) {
  return new Wr(e, t, n, !1);
}
var zr = class extends ut {
  constructor(t) {
    super(),
      (this.componentFactoryResolver = new Br(this)),
      (this.instance = null);
    let n = new sn(
      [
        ...t.providers,
        { provide: ut, useValue: this },
        { provide: Rt, useValue: this.componentFactoryResolver },
      ],
      t.parent || Ns(),
      t.debugName,
      new Set(["environment"])
    );
    (this.injector = n),
      t.runEnvironmentInitializers && n.resolveInjectorInitializers();
  }
  destroy() {
    this.injector.destroy();
  }
  onDestroy(t) {
    this.injector.onDestroy(t);
  }
};
function Xv(e, t, n = null) {
  return new zr({
    providers: e,
    parent: t,
    debugName: n,
    runEnvironmentInitializers: !0,
  }).injector;
}
function To(e, t, n) {
  return (e[t] = n);
}
function eE(e, t) {
  return e[t];
}
function de(e, t, n) {
  let r = e[t];
  return Object.is(r, n) ? !1 : ((e[t] = n), !0);
}
function Ad(e, t, n, r) {
  let o = de(e, t, n);
  return de(e, t + 1, r) || o;
}
function tE(e, t, n, r, o) {
  let i = Ad(e, t, n, r);
  return de(e, t + 2, o) || i;
}
function Ht(e) {
  return (e.flags & 32) === 32;
}
function nE(e, t, n, r, o, i, s, a, c) {
  let l = t.consts,
    u = vo(t, e, 4, s || null, a || null);
  Ju(t, n, u, nt(l, c)), js(t, u);
  let d = (u.tView = sa(
    2,
    u,
    r,
    o,
    i,
    t.directiveRegistry,
    t.pipeRegistry,
    null,
    t.schemas,
    l,
    null
  ));
  return (
    t.queries !== null &&
      (t.queries.template(t, u), (d.queries = t.queries.embeddedTView(u))),
    u
  );
}
function as(e, t, n, r, o, i, s, a, c, l) {
  let u = n + O,
    d = t.firstCreatePass ? nE(u, t, e, r, o, i, s, a, c) : t.data[u];
  Be(d, !1);
  let p = Rd(t, e, d, n);
  ao() && ta(t, e, p, d), at(p, e);
  let f = td(p, e, p, d);
  return (
    (e[u] = f),
    Eo(e, f),
    Dv(f, d, e),
    Os(d) && zu(t, e, d),
    c != null && Qu(e, d, l),
    d
  );
}
function rE(e, t, n, r, o, i, s, a) {
  let c = D(),
    l = q(),
    u = nt(l.consts, i);
  return as(c, l, e, t, n, r, o, u, s, a), rE;
}
var Rd = Pd;
function Pd(e, t, n, r) {
  return Re(!0), t[A].createComment("");
}
function oE(e, t, n, r) {
  let o = t[Ee],
    i = !o || bn() || Ht(n) || _n(o, r);
  if ((Re(i), i)) return Pd(e, t, n, r);
  let s = o.data[Pi]?.[r] ?? null;
  s !== null &&
    n.tView !== null &&
    n.tView.ssrId === null &&
    (n.tView.ssrId = s);
  let a = Co(o, e, t, n);
  fo(o, r, a);
  let c = Qs(o, r);
  return Mo(c, a);
}
function iE() {
  Rd = oE;
}
var wt = (function (e) {
    return (
      (e[(e.EarlyRead = 0)] = "EarlyRead"),
      (e[(e.Write = 1)] = "Write"),
      (e[(e.MixedReadWrite = 2)] = "MixedReadWrite"),
      (e[(e.Read = 3)] = "Read"),
      e
    );
  })(wt || {}),
  kd = (() => {
    class e {
      constructor() {
        this.impl = null;
      }
      execute() {
        this.impl?.execute();
      }
      static {
        this.ɵprov = B({
          token: e,
          providedIn: "root",
          factory: () => new e(),
        });
      }
    }
    return e;
  })(),
  cs = class e {
    constructor() {
      (this.ngZone = w(Z)),
        (this.scheduler = w(lt)),
        (this.errorHandler = w(St, { optional: !0 })),
        (this.sequences = new Set()),
        (this.deferredRegistrations = new Set()),
        (this.executing = !1);
    }
    static {
      this.PHASES = [wt.EarlyRead, wt.Write, wt.MixedReadWrite, wt.Read];
    }
    execute() {
      this.executing = !0;
      for (let t of e.PHASES)
        for (let n of this.sequences)
          if (!(n.erroredOrDestroyed || !n.hooks[t]))
            try {
              n.pipelinedValue = this.ngZone.runOutsideAngular(() =>
                n.hooks[t](n.pipelinedValue)
              );
            } catch (r) {
              (n.erroredOrDestroyed = !0), this.errorHandler?.handleError(r);
            }
      this.executing = !1;
      for (let t of this.sequences)
        t.afterRun(), t.once && (this.sequences.delete(t), t.destroy());
      for (let t of this.deferredRegistrations) this.sequences.add(t);
      this.deferredRegistrations.size > 0 && this.scheduler.notify(7),
        this.deferredRegistrations.clear();
    }
    register(t) {
      this.executing
        ? this.deferredRegistrations.add(t)
        : (this.sequences.add(t), this.scheduler.notify(6));
    }
    unregister(t) {
      this.executing && this.sequences.has(t)
        ? ((t.erroredOrDestroyed = !0),
          (t.pipelinedValue = void 0),
          (t.once = !0))
        : (this.sequences.delete(t), this.deferredRegistrations.delete(t));
    }
    static {
      this.ɵprov = B({ token: e, providedIn: "root", factory: () => new e() });
    }
  },
  ls = class {
    constructor(t, n, r, o) {
      (this.impl = t),
        (this.hooks = n),
        (this.once = r),
        (this.erroredOrDestroyed = !1),
        (this.pipelinedValue = void 0),
        (this.unregisterOnDestroy = o?.onDestroy(() => this.destroy()));
    }
    afterRun() {
      (this.erroredOrDestroyed = !1), (this.pipelinedValue = void 0);
    }
    destroy() {
      this.impl.unregister(this), this.unregisterOnDestroy?.();
    }
  };
function sE(e, t) {
  !t?.injector && ph(sE);
  let n = t?.injector ?? w(Me);
  return Zt(n) ? (ze("NgAfterNextRender"), cE(e, n, t, !0)) : lE;
}
function aE(e, t) {
  if (e instanceof Function) {
    let n = [void 0, void 0, void 0, void 0];
    return (n[t] = e), n;
  } else return [e.earlyRead, e.write, e.mixedReadWrite, e.read];
}
function cE(e, t, n, r) {
  let o = t.get(kd);
  o.impl ??= t.get(cs);
  let i = n?.phase ?? wt.MixedReadWrite,
    s = n?.manualCleanup !== !0 ? t.get(Hs) : null,
    a = new ls(o.impl, aE(e, i), r, s);
  return o.impl.register(a), a;
}
var lE = { destroy() {} };
function uE(e, t, n, r) {
  let o = D(),
    i = jt();
  if (de(o, i, t)) {
    let s = q(),
      a = Fs();
    qm(a, o, e, t, n, r);
  }
  return uE;
}
function dE(e, t, n, r) {
  return de(e, jt(), n) ? t + Mn(n) + r : Ie;
}
function fr(e, t) {
  return (e << 17) | (t << 2);
}
function dt(e) {
  return (e >> 17) & 32767;
}
function fE(e) {
  return (e & 2) == 2;
}
function pE(e, t) {
  return (e & 131071) | (t << 17);
}
function us(e) {
  return e | 2;
}
function kt(e) {
  return (e & 131068) >> 2;
}
function ii(e, t) {
  return (e & -131069) | (t << 2);
}
function hE(e) {
  return (e & 1) === 1;
}
function ds(e) {
  return e | 1;
}
function gE(e, t, n, r, o, i) {
  let s = i ? t.classBindings : t.styleBindings,
    a = dt(s),
    c = kt(s);
  e[r] = n;
  let l = !1,
    u;
  if (Array.isArray(n)) {
    let d = n;
    (u = d[1]), (u === null || Tn(d, u) > 0) && (l = !0);
  } else u = n;
  if (o)
    if (c !== 0) {
      let p = dt(e[a + 1]);
      (e[r + 1] = fr(p, a)),
        p !== 0 && (e[p + 1] = ii(e[p + 1], r)),
        (e[a + 1] = pE(e[a + 1], r));
    } else
      (e[r + 1] = fr(a, 0)), a !== 0 && (e[a + 1] = ii(e[a + 1], r)), (a = r);
  else
    (e[r + 1] = fr(c, 0)),
      a === 0 ? (a = r) : (e[c + 1] = ii(e[c + 1], r)),
      (c = r);
  l && (e[r + 1] = us(e[r + 1])),
    Vc(e, u, r, !0),
    Vc(e, u, r, !1),
    mE(t, u, e, r, i),
    (s = fr(a, c)),
    i ? (t.classBindings = s) : (t.styleBindings = s);
}
function mE(e, t, n, r, o) {
  let i = o ? e.residualClasses : e.residualStyles;
  i != null &&
    typeof t == "string" &&
    Tn(i, t) >= 0 &&
    (n[r + 1] = ds(n[r + 1]));
}
function Vc(e, t, n, r) {
  let o = e[n + 1],
    i = t === null,
    s = r ? dt(o) : kt(o),
    a = !1;
  for (; s !== 0 && (a === !1 || i); ) {
    let c = e[s],
      l = e[s + 1];
    yE(c, t) && ((a = !0), (e[s + 1] = r ? ds(l) : us(l))),
      (s = r ? dt(l) : kt(l));
  }
  a && (e[n + 1] = r ? us(o) : ds(o));
}
function yE(e, t) {
  return e === null || t == null || (Array.isArray(e) ? e[1] : e) === t
    ? !0
    : Array.isArray(e) && typeof t == "string"
      ? Tn(e, t) >= 0
      : !1;
}
var me = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
function vE(e) {
  return e.substring(me.key, me.keyEnd);
}
function EE(e) {
  return IE(e), Ld(e, Fd(e, 0, me.textEnd));
}
function Ld(e, t) {
  let n = me.textEnd;
  return n === t ? -1 : ((t = me.keyEnd = wE(e, (me.key = t), n)), Fd(e, t, n));
}
function IE(e) {
  (me.key = 0),
    (me.keyEnd = 0),
    (me.value = 0),
    (me.valueEnd = 0),
    (me.textEnd = e.length);
}
function Fd(e, t, n) {
  for (; t < n && e.charCodeAt(t) <= 32; ) t++;
  return t;
}
function wE(e, t, n) {
  for (; t < n && e.charCodeAt(t) > 32; ) t++;
  return t;
}
function DE(e, t, n) {
  let r = D(),
    o = jt();
  if (de(r, o, t)) {
    let i = q(),
      s = Fs();
    Ku(i, s, r, e, t, r[A], n, !1);
  }
  return DE;
}
function fs(e, t, n, r, o) {
  let i = t.inputs,
    s = o ? "class" : "style";
  aa(e, n, i[s], s, r);
}
function CE(e, t) {
  return TE(e, t, null, !0), CE;
}
function Ux(e) {
  bE(AE, ME, e, !0);
}
function ME(e, t) {
  for (let n = EE(t); n >= 0; n = Ld(t, n)) bs(e, vE(t), !0);
}
function TE(e, t, n, r) {
  let o = D(),
    i = q(),
    s = Hl(2);
  if ((i.firstUpdatePass && Vd(i, e, s, r), t !== Ie && de(o, s, t))) {
    let a = i.data[We()];
    Hd(i, a, o, o[A], e, (o[s + 1] = PE(t, n)), r, s);
  }
}
function bE(e, t, n, r) {
  let o = q(),
    i = Hl(2);
  o.firstUpdatePass && Vd(o, null, i, r);
  let s = D();
  if (n !== Ie && de(s, i, n)) {
    let a = o.data[We()];
    if (Ud(a, r) && !jd(o, i)) {
      let c = r ? a.classesWithoutHost : a.stylesWithoutHost;
      c !== null && (n = fi(c, n || "")), fs(o, a, s, n, r);
    } else RE(o, a, s, s[A], s[i + 1], (s[i + 1] = OE(e, t, n)), r, i);
  }
}
function jd(e, t) {
  return t >= e.expandoStartIndex;
}
function Vd(e, t, n, r) {
  let o = e.data;
  if (o[n + 1] === null) {
    let i = o[We()],
      s = jd(e, n);
    Ud(i, r) && t === null && !s && (t = !1),
      (t = xE(o, i, t, r)),
      gE(o, i, t, n, s, r);
  }
}
function xE(e, t, n, r) {
  let o = Hh(e),
    i = r ? t.residualClasses : t.residualStyles;
  if (o === null)
    (r ? t.classBindings : t.styleBindings) === 0 &&
      ((n = si(null, e, t, n, r)), (n = Dn(n, t.attrs, r)), (i = null));
  else {
    let s = t.directiveStylingLast;
    if (s === -1 || e[s] !== o)
      if (((n = si(o, e, t, n, r)), i === null)) {
        let c = _E(e, t, r);
        c !== void 0 &&
          Array.isArray(c) &&
          ((c = si(null, e, t, c[1], r)),
          (c = Dn(c, t.attrs, r)),
          NE(e, t, r, c));
      } else i = SE(e, t, r);
  }
  return (
    i !== void 0 && (r ? (t.residualClasses = i) : (t.residualStyles = i)), n
  );
}
function _E(e, t, n) {
  let r = n ? t.classBindings : t.styleBindings;
  if (kt(r) !== 0) return e[dt(r)];
}
function NE(e, t, n, r) {
  let o = n ? t.classBindings : t.styleBindings;
  e[dt(o)] = r;
}
function SE(e, t, n) {
  let r,
    o = t.directiveEnd;
  for (let i = 1 + t.directiveStylingLast; i < o; i++) {
    let s = e[i].hostAttrs;
    r = Dn(r, s, n);
  }
  return Dn(r, t.attrs, n);
}
function si(e, t, n, r, o) {
  let i = null,
    s = n.directiveEnd,
    a = n.directiveStylingLast;
  for (
    a === -1 ? (a = n.directiveStart) : a++;
    a < s && ((i = t[a]), (r = Dn(r, i.hostAttrs, o)), i !== e);

  )
    a++;
  return e !== null && (n.directiveStylingLast = a), r;
}
function Dn(e, t, n) {
  let r = n ? 1 : 2,
    o = -1;
  if (t !== null)
    for (let i = 0; i < t.length; i++) {
      let s = t[i];
      typeof s == "number"
        ? (o = s)
        : o === r &&
          (Array.isArray(e) || (e = e === void 0 ? [] : ["", e]),
          bs(e, s, n ? !0 : t[++i]));
    }
  return e === void 0 ? null : e;
}
function OE(e, t, n) {
  if (n == null || n === "") return Q;
  let r = [],
    o = po(n);
  if (Array.isArray(o)) for (let i = 0; i < o.length; i++) e(r, o[i], !0);
  else if (typeof o == "object")
    for (let i in o) o.hasOwnProperty(i) && e(r, i, o[i]);
  else typeof o == "string" && t(r, o);
  return r;
}
function AE(e, t, n) {
  let r = String(t);
  r !== "" && !r.includes(" ") && bs(e, r, n);
}
function RE(e, t, n, r, o, i, s, a) {
  o === Ie && (o = Q);
  let c = 0,
    l = 0,
    u = 0 < o.length ? o[0] : null,
    d = 0 < i.length ? i[0] : null;
  for (; u !== null || d !== null; ) {
    let p = c < o.length ? o[c + 1] : void 0,
      f = l < i.length ? i[l + 1] : void 0,
      h = null,
      g;
    u === d
      ? ((c += 2), (l += 2), p !== f && ((h = d), (g = f)))
      : d === null || (u !== null && u < d)
        ? ((c += 2), (h = u))
        : ((l += 2), (h = d), (g = f)),
      h !== null && Hd(e, t, n, r, h, g, s, a),
      (u = c < o.length ? o[c] : null),
      (d = l < i.length ? i[l] : null);
  }
}
function Hd(e, t, n, r, o, i, s, a) {
  if (!(t.type & 3)) return;
  let c = e.data,
    l = c[a + 1],
    u = hE(l) ? Hc(c, t, n, o, kt(l), s) : void 0;
  if (!Qr(u)) {
    Qr(i) || (fE(l) && (i = Hc(c, null, n, o, a, s)));
    let d = Ol(We(), n);
    wm(r, s, d, o, i);
  }
}
function Hc(e, t, n, r, o, i) {
  let s = t === null,
    a;
  for (; o > 0; ) {
    let c = e[o],
      l = Array.isArray(c),
      u = l ? c[1] : c,
      d = u === null,
      p = n[o + 1];
    p === Ie && (p = d ? Q : void 0);
    let f = d ? Qo(p, r) : u === r ? p : void 0;
    if ((l && !Qr(f) && (f = Qo(c, r)), Qr(f) && ((a = f), s))) return a;
    let h = e[o + 1];
    o = s ? dt(h) : kt(h);
  }
  if (t !== null) {
    let c = i ? t.residualClasses : t.residualStyles;
    c != null && (a = Qo(c, r));
  }
  return a;
}
function Qr(e) {
  return e !== void 0;
}
function PE(e, t) {
  return (
    e == null ||
      e === "" ||
      (typeof t == "string"
        ? (e = e + t)
        : typeof e == "object" && (e = oe(po(e)))),
    e
  );
}
function Ud(e, t) {
  return (e.flags & (t ? 8 : 16)) !== 0;
}
var ps = class {
  destroy(t) {}
  updateValue(t, n) {}
  swap(t, n) {
    let r = Math.min(t, n),
      o = Math.max(t, n),
      i = this.detach(o);
    if (o - r > 1) {
      let s = this.detach(r);
      this.attach(r, i), this.attach(o, s);
    } else this.attach(r, i);
  }
  move(t, n) {
    this.attach(n, this.detach(t));
  }
};
function ai(e, t, n, r, o) {
  return e === n && Object.is(t, r) ? 1 : Object.is(o(e, t), o(n, r)) ? -1 : 0;
}
function kE(e, t, n) {
  let r,
    o,
    i = 0,
    s = e.length - 1,
    a = void 0;
  if (Array.isArray(t)) {
    let c = t.length - 1;
    for (; i <= s && i <= c; ) {
      let l = e.at(i),
        u = t[i],
        d = ai(i, l, i, u, n);
      if (d !== 0) {
        d < 0 && e.updateValue(i, u), i++;
        continue;
      }
      let p = e.at(s),
        f = t[c],
        h = ai(s, p, c, f, n);
      if (h !== 0) {
        h < 0 && e.updateValue(s, f), s--, c--;
        continue;
      }
      let g = n(i, l),
        M = n(s, p),
        v = n(i, u);
      if (Object.is(v, M)) {
        let P = n(c, f);
        Object.is(P, g)
          ? (e.swap(i, s), e.updateValue(s, f), c--, s--)
          : e.move(s, i),
          e.updateValue(i, u),
          i++;
        continue;
      }
      if (((r ??= new Zr()), (o ??= $c(e, i, s, n)), hs(e, r, i, v)))
        e.updateValue(i, u), i++, s++;
      else if (o.has(v)) r.set(g, e.detach(i)), s--;
      else {
        let P = e.create(i, t[i]);
        e.attach(i, P), i++, s++;
      }
    }
    for (; i <= c; ) Uc(e, r, n, i, t[i]), i++;
  } else if (t != null) {
    let c = t[Symbol.iterator](),
      l = c.next();
    for (; !l.done && i <= s; ) {
      let u = e.at(i),
        d = l.value,
        p = ai(i, u, i, d, n);
      if (p !== 0) p < 0 && e.updateValue(i, d), i++, (l = c.next());
      else {
        (r ??= new Zr()), (o ??= $c(e, i, s, n));
        let f = n(i, d);
        if (hs(e, r, i, f)) e.updateValue(i, d), i++, s++, (l = c.next());
        else if (!o.has(f))
          e.attach(i, e.create(i, d)), i++, s++, (l = c.next());
        else {
          let h = n(i, u);
          r.set(h, e.detach(i)), s--;
        }
      }
    }
    for (; !l.done; ) Uc(e, r, n, e.length, l.value), (l = c.next());
  }
  for (; i <= s; ) e.destroy(e.detach(s--));
  r?.forEach((c) => {
    e.destroy(c);
  });
}
function hs(e, t, n, r) {
  return t !== void 0 && t.has(r)
    ? (e.attach(n, t.get(r)), t.delete(r), !0)
    : !1;
}
function Uc(e, t, n, r, o) {
  if (hs(e, t, r, n(r, o))) e.updateValue(r, o);
  else {
    let i = e.create(r, o);
    e.attach(r, i);
  }
}
function $c(e, t, n, r) {
  let o = new Set();
  for (let i = t; i <= n; i++) o.add(r(i, e.at(i)));
  return o;
}
var Zr = class {
  constructor() {
    (this.kvMap = new Map()), (this._vMap = void 0);
  }
  has(t) {
    return this.kvMap.has(t);
  }
  delete(t) {
    if (!this.has(t)) return !1;
    let n = this.kvMap.get(t);
    return (
      this._vMap !== void 0 && this._vMap.has(n)
        ? (this.kvMap.set(t, this._vMap.get(n)), this._vMap.delete(n))
        : this.kvMap.delete(t),
      !0
    );
  }
  get(t) {
    return this.kvMap.get(t);
  }
  set(t, n) {
    if (this.kvMap.has(t)) {
      let r = this.kvMap.get(t);
      this._vMap === void 0 && (this._vMap = new Map());
      let o = this._vMap;
      for (; o.has(r); ) r = o.get(r);
      o.set(r, n);
    } else this.kvMap.set(t, n);
  }
  forEach(t) {
    for (let [n, r] of this.kvMap)
      if ((t(r, n), this._vMap !== void 0)) {
        let o = this._vMap;
        for (; o.has(r); ) (r = o.get(r)), t(r, n);
      }
  }
};
function $x(e, t) {
  ze("NgControlFlow");
  let n = D(),
    r = jt(),
    o = n[r] !== Ie ? n[r] : -1,
    i = o !== -1 ? Yr(n, O + o) : void 0,
    s = 0;
  if (de(n, r, e)) {
    let a = C(null);
    try {
      if ((i !== void 0 && ad(i, s), e !== -1)) {
        let c = O + e,
          l = Yr(n, c),
          u = vs(n[m], c),
          d = wn(l, u.tView.ssrId),
          p = Io(n, u, t, { dehydratedView: d });
        wo(l, p, s, vn(u, d));
      }
    } finally {
      C(a);
    }
  } else if (i !== void 0) {
    let a = sd(i, s);
    a !== void 0 && (a[G] = t);
  }
}
var gs = class {
  constructor(t, n, r) {
    (this.lContainer = t), (this.$implicit = n), (this.$index = r);
  }
  get $count() {
    return this.lContainer.length - U;
  }
};
function Bx(e) {
  return e;
}
var ms = class {
  constructor(t, n, r) {
    (this.hasEmptyBlock = t), (this.trackByFn = n), (this.liveCollection = r);
  }
};
function qx(e, t, n, r, o, i, s, a, c, l, u, d, p) {
  ze("NgControlFlow");
  let f = D(),
    h = q(),
    g = c !== void 0,
    M = D(),
    v = a ? s.bind(M[J][G]) : s,
    P = new ms(g, v);
  (M[O + e] = P),
    as(f, h, e + 1, t, n, r, o, nt(h.consts, i)),
    g && as(f, h, e + 2, c, l, u, d, nt(h.consts, p));
}
var ys = class extends ps {
  constructor(t, n, r) {
    super(),
      (this.lContainer = t),
      (this.hostLView = n),
      (this.templateTNode = r),
      (this.operationsCounter = void 0),
      (this.needsIndexUpdate = !1);
  }
  get length() {
    return this.lContainer.length - U;
  }
  at(t) {
    return this.getLView(t)[G].$implicit;
  }
  attach(t, n) {
    let r = n[Ee];
    (this.needsIndexUpdate ||= t !== this.length),
      wo(this.lContainer, n, t, vn(this.templateTNode, r));
  }
  detach(t) {
    return (
      (this.needsIndexUpdate ||= t !== this.length - 1), LE(this.lContainer, t)
    );
  }
  create(t, n) {
    let r = wn(this.lContainer, this.templateTNode.tView.ssrId),
      o = Io(
        this.hostLView,
        this.templateTNode,
        new gs(this.lContainer, n, t),
        { dehydratedView: r }
      );
    return this.operationsCounter?.recordCreate(), o;
  }
  destroy(t) {
    go(t[m], t), this.operationsCounter?.recordDestroy();
  }
  updateValue(t, n) {
    this.getLView(t)[G].$implicit = n;
  }
  reset() {
    (this.needsIndexUpdate = !1), this.operationsCounter?.reset();
  }
  updateIndexes() {
    if (this.needsIndexUpdate)
      for (let t = 0; t < this.length; t++) this.getLView(t)[G].$index = t;
  }
  getLView(t) {
    return FE(this.lContainer, t);
  }
};
function Wx(e) {
  let t = C(null),
    n = We();
  try {
    let r = D(),
      o = r[m],
      i = r[n],
      s = n + 1,
      a = Yr(r, s);
    if (i.liveCollection === void 0) {
      let l = vs(o, s);
      i.liveCollection = new ys(a, r, l);
    } else i.liveCollection.reset();
    let c = i.liveCollection;
    if ((kE(c, e, i.trackByFn), c.updateIndexes(), i.hasEmptyBlock)) {
      let l = jt(),
        u = c.length === 0;
      if (de(r, l, u)) {
        let d = n + 2,
          p = Yr(r, d);
        if (u) {
          let f = vs(o, d),
            h = wn(p, f.tView.ssrId),
            g = Io(r, f, void 0, { dehydratedView: h });
          wo(p, g, 0, vn(f, h));
        } else ad(p, 0);
      }
    }
  } finally {
    C(t);
  }
}
function Yr(e, t) {
  return e[t];
}
function LE(e, t) {
  return yn(e, t);
}
function FE(e, t) {
  return sd(e, t);
}
function vs(e, t) {
  return As(e, t);
}
function jE(e, t, n, r, o, i) {
  let s = t.consts,
    a = nt(s, o),
    c = vo(t, e, 2, r, a);
  return (
    Ju(t, n, c, nt(s, i)),
    c.attrs !== null && Ji(c, c.attrs, !1),
    c.mergedAttrs !== null && Ji(c, c.mergedAttrs, !0),
    t.queries !== null && t.queries.elementStart(t, c),
    c
  );
}
function $d(e, t, n, r) {
  let o = D(),
    i = q(),
    s = O + e,
    a = o[A],
    c = i.firstCreatePass ? jE(s, i, o, t, n, r) : i.data[s],
    l = qd(i, o, c, a, t, e);
  o[s] = l;
  let u = Os(c);
  return (
    Be(c, !0),
    $u(a, l, c),
    !Ht(c) && ao() && ta(i, o, l, c),
    _h() === 0 && at(l, o),
    Nh(),
    u && (zu(i, o, c), Gu(i, c, o)),
    r !== null && Qu(o, c),
    $d
  );
}
function Bd() {
  let e = Y();
  jl() ? Ph() : ((e = e.parent), Be(e, !1));
  let t = e;
  Oh(t) && Rh(), Sh();
  let n = q();
  return (
    n.firstCreatePass && (js(n, e), Ml(e) && n.queries.elementEnd(e)),
    t.classesWithoutHost != null &&
      zh(t) &&
      fs(n, t, D(), t.classesWithoutHost, !0),
    t.stylesWithoutHost != null &&
      Qh(t) &&
      fs(n, t, D(), t.stylesWithoutHost, !1),
    Bd
  );
}
function VE(e, t, n, r) {
  return $d(e, t, n, r), Bd(), VE;
}
var qd = (e, t, n, r, o, i) => (Re(!0), ho(r, o, Ql()));
function HE(e, t, n, r, o, i) {
  let s = t[Ee],
    a = !s || bn() || Ht(n) || _n(s, i);
  if ((Re(a), a)) return ho(r, o, Ql());
  let c = Co(s, e, t, n);
  return (
    Eu(s, i) && fo(s, i, c.nextSibling),
    s && (Bs(n) || du(c)) && Ft(n) && (Ah(n), Hu(c)),
    c
  );
}
function UE() {
  qd = HE;
}
var $E = (e, t, n, r) => (Re(!0), Xs(t[A], ""));
function BE(e, t, n, r) {
  let o,
    i = t[Ee],
    s = !i || bn() || _n(i, r) || Ht(n);
  if ((Re(s), s)) return Xs(t[A], "");
  let a = Co(i, e, t, n),
    c = Pg(i, r);
  return fo(i, r, a), (o = Mo(c, a)), o;
}
function qE() {
  $E = BE;
}
function Gx() {
  return D();
}
var Kr = "en-US";
var WE = { marker: "element" },
  GE = { marker: "ICU" },
  _e = (function (e) {
    return (
      (e[(e.SHIFT = 2)] = "SHIFT"),
      (e[(e.APPEND_EAGERLY = 1)] = "APPEND_EAGERLY"),
      (e[(e.COMMENT = 2)] = "COMMENT"),
      e
    );
  })(_e || {}),
  zE = Kr;
function QE(e) {
  typeof e == "string" && (zE = e.toLowerCase().replace(/_/g, "-"));
}
function ZE(e, t, n) {
  let r = e[A];
  switch (n) {
    case Node.COMMENT_NODE:
      return Xs(r, t);
    case Node.TEXT_NODE:
      return Js(r, t);
    case Node.ELEMENT_NODE:
      return ho(r, t, null);
  }
}
var YE = (e, t, n, r) => (Re(!0), ZE(e, n, r));
function KE(e, t, n, r) {
  let o = e[A];
  for (let i = 0; i < t.length; i++) {
    let s = t[i++],
      a = t[i],
      c = (s & _e.COMMENT) === _e.COMMENT,
      l = (s & _e.APPEND_EAGERLY) === _e.APPEND_EAGERLY,
      u = s >>> _e.SHIFT,
      d = e[u],
      p = !1;
    d === null &&
      ((d = e[u] = YE(e, u, a, c ? Node.COMMENT_NODE : Node.TEXT_NODE)),
      (p = ao())),
      l && n !== null && p && At(o, n, d, r, !1);
  }
}
var Jr = /�(\d+):?\d*�/gi;
var JE = /�(\d+)�/,
  Wd = /^\s*(�\d+:?\d*�)\s*,\s*(select|plural)\s*,/,
  Xt = "\uFFFD",
  XE = /�\/?\*(\d+:\d+)�/gi,
  eI = /�(\/?[#*]\d+):?\d*�/gi,
  tI = /\uE500/g;
function nI(e) {
  return e.replace(tI, " ");
}
function rI(e, t, n, r, o, i) {
  let s = dn(),
    a = [],
    c = [],
    l = [[]],
    u = [[]];
  o = iI(o, i);
  let d = nI(o).split(eI);
  for (let p = 0; p < d.length; p++) {
    let f = d[p];
    if (p & 1) {
      let h = f.charCodeAt(0) === 47,
        g = f.charCodeAt(h ? 1 : 0),
        M = O + Number.parseInt(f.substring(h ? 2 : 1));
      if (h) l.shift(), u.shift(), Be(dn(), !1);
      else {
        let v = _y(e, l[0], M);
        l.unshift([]), Be(v, !0);
        let P = { kind: 2, index: M, children: [], type: g === 35 ? 0 : 1 };
        u[0].push(P), u.unshift(P.children);
      }
    } else {
      let h = Es(f);
      for (let g = 0; g < h.length; g++) {
        let M = h[g];
        if (g & 1) {
          let v = M;
          if (typeof v != "object")
            throw new Error(
              `Unable to parse ICU expression in "${o}" message.`
            );
          let X = Gd(e, s, l[0], n, a, "", !0).index;
          Qd(u[0], e, n, c, t, v, X);
        } else {
          let v = M;
          v !== "" && oI(u[0], e, s, l[0], a, c, n, v);
        }
      }
    }
  }
  e.data[r] = { create: a, update: c, ast: u[0], parentTNodeIndex: t };
}
function Gd(e, t, n, r, o, i, s) {
  let a = Sn(e, r, 1, null),
    c = a << _e.SHIFT,
    l = dn();
  t === l && (l = null),
    l === null && (c |= _e.APPEND_EAGERLY),
    s && ((c |= _e.COMMENT), lm(Ay)),
    o.push(c, i === null ? "" : i);
  let u = ia(e, a, s ? 32 : 1, i === null ? "" : i, null);
  yd(n, u);
  let d = u.index;
  return Be(u, !1), l !== null && t !== l && xy(l, d), u;
}
function oI(e, t, n, r, o, i, s, a) {
  let c = a.match(Jr),
    u = Gd(t, n, r, s, o, c ? null : a, !1).index;
  c && wr(i, a, u, null, 0, null), e.push({ kind: 0, index: u });
}
function wr(e, t, n, r, o, i) {
  let s = e.length,
    a = s + 1;
  e.push(null, null);
  let c = s + 2,
    l = t.split(Jr),
    u = 0;
  for (let d = 0; d < l.length; d++) {
    let p = l[d];
    if (d & 1) {
      let f = o + parseInt(p, 10);
      e.push(-1 - f), (u = u | zd(f));
    } else p !== "" && e.push(p);
  }
  return (
    e.push((n << 2) | (r ? 1 : 0)),
    r && e.push(r, i),
    (e[s] = u),
    (e[a] = e.length - c),
    u
  );
}
function zd(e) {
  return 1 << Math.min(e, 31);
}
function Bc(e) {
  let t,
    n = "",
    r = 0,
    o = !1,
    i;
  for (; (t = XE.exec(e)) !== null; )
    o
      ? t[0] === `${Xt}/*${i}${Xt}` && ((r = t.index), (o = !1))
      : ((n += e.substring(r, t.index + t[0].length)), (i = t[1]), (o = !0));
  return (n += e.slice(r)), n;
}
function iI(e, t) {
  if (Oy(t)) return Bc(e);
  {
    let n = e.indexOf(`:${t}${Xt}`) + 2 + t.toString().length,
      r = e.search(new RegExp(`${Xt}\\/\\*\\d+:${t}${Xt}`));
    return Bc(e.substring(n, r));
  }
}
function Qd(e, t, n, r, o, i, s) {
  let a = 0,
    c = {
      type: i.type,
      currentCaseLViewIndex: Sn(t, n, 1, null),
      anchorIdx: s,
      cases: [],
      create: [],
      remove: [],
      update: [],
    };
  lI(r, i, s), by(t, s, c);
  let l = i.values,
    u = [];
  for (let d = 0; d < l.length; d++) {
    let p = l[d],
      f = [];
    for (let g = 0; g < p.length; g++) {
      let M = p[g];
      if (typeof M != "string") {
        let v = f.push(M) - 1;
        p[g] = `<!--\uFFFD${v}\uFFFD-->`;
      }
    }
    let h = [];
    u.push(h), (a = aI(h, t, c, n, r, o, i.cases[d], p.join(""), f) | a);
  }
  a && uI(r, a, s),
    e.push({
      kind: 3,
      index: s,
      cases: u,
      currentCaseLViewIndex: c.currentCaseLViewIndex,
    });
}
function sI(e) {
  let t = [],
    n = [],
    r = 1,
    o = 0;
  e = e.replace(Wd, function (s, a, c) {
    return (
      c === "select" ? (r = 0) : (r = 1), (o = parseInt(a.slice(1), 10)), ""
    );
  });
  let i = Es(e);
  for (let s = 0; s < i.length; ) {
    let a = i[s++].trim();
    r === 1 && (a = a.replace(/\s*(?:=)?(\w+)\s*/, "$1")),
      a.length && t.push(a);
    let c = Es(i[s++]);
    t.length > n.length && n.push(c);
  }
  return { type: r, mainBinding: o, cases: t, values: n };
}
function Es(e) {
  if (!e) return [];
  let t = 0,
    n = [],
    r = [],
    o = /[{}]/g;
  o.lastIndex = 0;
  let i;
  for (; (i = o.exec(e)); ) {
    let a = i.index;
    if (i[0] == "}") {
      if ((n.pop(), n.length == 0)) {
        let c = e.substring(t, a);
        Wd.test(c) ? r.push(sI(c)) : r.push(c), (t = a + 1);
      }
    } else {
      if (n.length == 0) {
        let c = e.substring(t, a);
        r.push(c), (t = a + 1);
      }
      n.push("{");
    }
  }
  let s = e.substring(t);
  return r.push(s), r;
}
function aI(e, t, n, r, o, i, s, a, c) {
  let l = [],
    u = [],
    d = [];
  n.cases.push(s), n.create.push(l), n.remove.push(u), n.update.push(d);
  let f = $g(xn()).getInertBodyElement(a),
    h = Xg(f) || f;
  return h ? Zd(e, t, n, r, o, l, u, d, h, i, c, 0) : 0;
}
function Zd(e, t, n, r, o, i, s, a, c, l, u, d) {
  let p = 0,
    f = c.firstChild;
  for (; f; ) {
    let h = Sn(t, r, 1, null);
    switch (f.nodeType) {
      case Node.ELEMENT_NODE:
        let g = f,
          M = g.tagName.toLowerCase();
        if (Zg.hasOwnProperty(M)) {
          ci(i, WE, M, l, h), (t.data[h] = M);
          let z = g.attributes;
          for (let W = 0; W < z.length; W++) {
            let ee = z.item(W),
              ft = ee.name.toLowerCase();
            !!ee.value.match(Jr)
              ? Jg.hasOwnProperty(ft) &&
                (xu[ft]
                  ? wr(a, ee.value, h, ee.name, 0, Mu)
                  : wr(a, ee.value, h, ee.name, 0, null))
              : dI(i, h, ee);
          }
          let pe = { kind: 1, index: h, children: [] };
          e.push(pe),
            (p = Zd(pe.children, t, n, r, o, i, s, a, f, h, u, d + 1) | p),
            qc(s, h, d);
        }
        break;
      case Node.TEXT_NODE:
        let v = f.textContent || "",
          P = v.match(Jr);
        ci(i, null, P ? "" : v, l, h),
          qc(s, h, d),
          P && (p = wr(a, v, h, null, 0, null) | p),
          e.push({ kind: 0, index: h });
        break;
      case Node.COMMENT_NODE:
        let X = JE.exec(f.textContent || "");
        if (X) {
          let z = parseInt(X[1], 10),
            pe = u[z];
          ci(i, GE, "", l, h), Qd(e, t, r, o, l, pe, h), cI(s, h, d);
        }
        break;
    }
    f = f.nextSibling;
  }
  return p;
}
function qc(e, t, n) {
  n === 0 && e.push(t);
}
function cI(e, t, n) {
  n === 0 && (e.push(~t), e.push(t));
}
function lI(e, t, n) {
  e.push(zd(t.mainBinding), 2, -1 - t.mainBinding, (n << 2) | 2);
}
function uI(e, t, n) {
  e.push(t, 1, (n << 2) | 3);
}
function ci(e, t, n, r, o) {
  t !== null && e.push(t), e.push(n, o, Sy(0, r, o));
}
function dI(e, t, n) {
  e.push((t << 1) | 1, n.name, n.value);
}
function fI(e, t, n = -1) {
  let r = q(),
    o = D(),
    i = O + e,
    s = nt(r.consts, t),
    a = dn();
  if (
    (r.firstCreatePass && rI(r, a === null ? 0 : a.index, o, i, s, n),
    r.type === 2)
  ) {
    let p = o[J];
    p[y] |= 32;
  } else o[y] |= 32;
  let c = r.data[i],
    l = a === o[fe] ? null : a,
    u = Ru(r, l, o),
    d = a && a.type & 8 ? o[a.index] : null;
  Gy(o, i, a, n), KE(o, c.create, u, d), Ul(!0);
}
function pI() {
  Ul(!1);
}
function zx(e, t, n) {
  fI(e, t, n), pI();
}
var hI = (e, t, n) => {};
function gI(e, t, n, r) {
  let o = D(),
    i = q(),
    s = Y();
  return Yd(i, o, o[A], s, e, t, r), gI;
}
function mI(e, t, n, r) {
  let o = e.cleanup;
  if (o != null)
    for (let i = 0; i < o.length - 1; i += 2) {
      let s = o[i];
      if (s === n && o[i + 1] === r) {
        let a = t[an],
          c = o[i + 2];
        return a.length > c ? a[c] : null;
      }
      typeof s == "string" && (i += 2);
    }
  return null;
}
function Yd(e, t, n, r, o, i, s) {
  let a = Os(r),
    l = e.firstCreatePass && od(e),
    u = t[G],
    d = rd(t),
    p = !0;
  if (r.type & 3 || s) {
    let g = se(r, t),
      M = s ? s(g) : g,
      v = d.length,
      P = s ? (z) => s(k(z[r.index])) : r.index,
      X = null;
    if ((!s && a && (X = mI(e, t, o, r.index)), X !== null)) {
      let z = X.__ngLastListenerFn__ || X;
      (z.__ngNextListenerFn__ = i), (X.__ngLastListenerFn__ = i), (p = !1);
    } else {
      (i = Gc(r, t, u, i)), hI(g, o, i);
      let z = n.listen(M, o, i);
      d.push(i, z), l && l.push(o, P, v, v + 1);
    }
  } else i = Gc(r, t, u, i);
  let f = r.outputs,
    h;
  if (p && f !== null && (h = f[o])) {
    let g = h.length;
    if (g)
      for (let M = 0; M < g; M += 2) {
        let v = h[M],
          P = h[M + 1],
          pe = t[v][P].subscribe(i),
          W = d.length;
        d.push(i, pe), l && l.push(o, r.index, W, -(W + 1));
      }
  }
}
function Wc(e, t, n, r) {
  let o = C(null);
  try {
    return we(6, t, n), n(r) !== !1;
  } catch (i) {
    return id(e, i), !1;
  } finally {
    we(7, t, n), C(o);
  }
}
function Gc(e, t, n, r) {
  return function o(i) {
    if (i === Function) return r;
    let s = e.componentOffset > -1 ? qe(e.index, t) : t;
    la(s, 5);
    let a = Wc(t, n, r, i),
      c = o.__ngNextListenerFn__;
    for (; c; ) (a = Wc(t, n, c, i) && a), (c = c.__ngNextListenerFn__);
    return a;
  };
}
function Qx(e = 1) {
  return $h(e);
}
function Zx(e, t, n, r) {
  Av(e, t, n, r);
}
function Yx(e) {
  let t = D(),
    n = q(),
    r = $l();
  Ps(r + 1);
  let o = ha(n, r);
  if (e.dirty && Mh(t) === ((o.metadata.flags & 2) === 2)) {
    if (o.matches === null) e.reset([]);
    else {
      let i = Lv(t, r);
      e.reset(i, mg), e.notifyOnChanges();
    }
    return !0;
  }
  return !1;
}
function Kx() {
  return Sv(D(), $l());
}
function Jx(e) {
  let t = kh();
  return Ch(t, O + e);
}
function Xx(e, t = "") {
  let n = D(),
    r = q(),
    o = e + O,
    i = r.firstCreatePass ? vo(r, o, 1, t, null) : r.data[o],
    s = Kd(r, n, i, t, e);
  (n[o] = s), ao() && ta(r, n, s, i), Be(i, !1);
}
var Kd = (e, t, n, r, o) => (Re(!0), Js(t[A], r));
function yI(e, t, n, r, o) {
  let i = t[Ee],
    s = !i || bn() || Ht(n) || _n(i, o);
  return Re(s), s ? Js(t[A], r) : Co(i, e, t, n);
}
function vI() {
  Kd = yI;
}
function EI(e) {
  return Jd("", e, ""), EI;
}
function Jd(e, t, n) {
  let r = D(),
    o = dE(r, e, t, n);
  return o !== Ie && Qm(r, We(), o), Jd;
}
function II(e, t, n) {
  Od(t) && (t = t());
  let r = D(),
    o = jt();
  if (de(r, o, t)) {
    let i = q(),
      s = Fs();
    Ku(i, s, r, e, t, r[A], n, !1);
  }
  return II;
}
function e_(e, t) {
  let n = Od(e);
  return n && e.set(t), n;
}
function wI(e, t) {
  let n = D(),
    r = q(),
    o = Y();
  return Yd(r, n, n[A], o, e, t), wI;
}
function DI(e, t, n) {
  let r = q();
  if (r.firstCreatePass) {
    let o = $e(e);
    Is(n, r.data, r.blueprint, o, !0), Is(t, r.data, r.blueprint, o, !1);
  }
}
function Is(e, t, n, r, o) {
  if (((e = K(e)), Array.isArray(e)))
    for (let i = 0; i < e.length; i++) Is(e[i], t, n, r, o);
  else {
    let i = q(),
      s = D(),
      a = Y(),
      c = xt(e) ? e : K(e.provide),
      l = wl(e),
      u = a.providerIndexes & 1048575,
      d = a.directiveStart,
      p = a.providerIndexes >> 20;
    if (xt(e) || !e.multi) {
      let f = new it(l, o, oa),
        h = ui(c, t, o ? u : u + p, d);
      h === -1
        ? (Ti(Or(a, s), i, c),
          li(i, e, t.length),
          t.push(c),
          a.directiveStart++,
          a.directiveEnd++,
          o && (a.providerIndexes += 1048576),
          n.push(f),
          s.push(f))
        : ((n[h] = f), (s[h] = f));
    } else {
      let f = ui(c, t, u + p, d),
        h = ui(c, t, u, u + p),
        g = f >= 0 && n[f],
        M = h >= 0 && n[h];
      if ((o && !M) || (!o && !g)) {
        Ti(Or(a, s), i, c);
        let v = TI(o ? MI : CI, n.length, o, r, l);
        !o && M && (n[h].providerFactory = v),
          li(i, e, t.length, 0),
          t.push(c),
          a.directiveStart++,
          a.directiveEnd++,
          o && (a.providerIndexes += 1048576),
          n.push(v),
          s.push(v);
      } else {
        let v = Xd(n[o ? h : f], l, !o && r);
        li(i, e, f > -1 ? f : h, v);
      }
      !o && r && M && n[h].componentProviders++;
    }
  }
}
function li(e, t, n, r) {
  let o = xt(t),
    i = sh(t);
  if (o || i) {
    let c = (i ? K(t.useClass) : t).prototype.ngOnDestroy;
    if (c) {
      let l = e.destroyHooks || (e.destroyHooks = []);
      if (!o && t.multi) {
        let u = l.indexOf(n);
        u === -1 ? l.push(n, [r, c]) : l[u + 1].push(r, c);
      } else l.push(n, c);
    }
  }
}
function Xd(e, t, n) {
  return n && e.componentProviders++, e.multi.push(t) - 1;
}
function ui(e, t, n, r) {
  for (let o = n; o < r; o++) if (t[o] === e) return o;
  return -1;
}
function CI(e, t, n, r) {
  return ws(this.multi, []);
}
function MI(e, t, n, r) {
  let o = this.multi,
    i;
  if (this.providerFactory) {
    let s = this.providerFactory.componentProviders,
      a = st(n, n[m], this.providerFactory.index, r);
    (i = a.slice(0, s)), ws(o, i);
    for (let c = s; c < a.length; c++) i.push(a[c]);
  } else (i = []), ws(o, i);
  return i;
}
function ws(e, t) {
  for (let n = 0; n < e.length; n++) {
    let r = e[n];
    t.push(r());
  }
  return t;
}
function TI(e, t, n, r, o) {
  let i = new it(e, n, oa);
  return (
    (i.multi = []),
    (i.index = t),
    (i.componentProviders = 0),
    Xd(i, o, r && !n),
    i
  );
}
function t_(e, t = []) {
  return (n) => {
    n.providersResolver = (r, o) => DI(r, o ? o(e) : e, t);
  };
}
var bI = (() => {
  class e {
    constructor(n) {
      (this._injector = n), (this.cachedInjectors = new Map());
    }
    getOrCreateStandaloneInjector(n) {
      if (!n.standalone) return null;
      if (!this.cachedInjectors.has(n)) {
        let r = yl(!1, n.type),
          o =
            r.length > 0
              ? Xv([r], this._injector, `Standalone[${n.type.name}]`)
              : null;
        this.cachedInjectors.set(n, o);
      }
      return this.cachedInjectors.get(n);
    }
    ngOnDestroy() {
      try {
        for (let n of this.cachedInjectors.values()) n !== null && n.destroy();
      } finally {
        this.cachedInjectors.clear();
      }
    }
    static {
      this.ɵprov = B({
        token: e,
        providedIn: "environment",
        factory: () => new e(le(Ue)),
      });
    }
  }
  return e;
})();
function n_(e) {
  ze("NgStandalone"),
    (e.getStandaloneInjector = (t) =>
      t.get(bI).getOrCreateStandaloneInjector(e));
}
function r_(e, t, n) {
  let r = so() + e,
    o = D();
  return o[r] === Ie ? To(o, r, n ? t.call(n) : t()) : eE(o, r);
}
function o_(e, t, n, r) {
  return xI(D(), so(), e, t, n, r);
}
function i_(e, t, n, r, o) {
  return _I(D(), so(), e, t, n, r, o);
}
function s_(e, t, n, r, o, i) {
  return NI(D(), so(), e, t, n, r, o, i);
}
function ga(e, t) {
  let n = e[t];
  return n === Ie ? void 0 : n;
}
function xI(e, t, n, r, o, i) {
  let s = t + n;
  return de(e, s, o) ? To(e, s + 1, i ? r.call(i, o) : r(o)) : ga(e, s + 1);
}
function _I(e, t, n, r, o, i, s) {
  let a = t + n;
  return Ad(e, a, o, i)
    ? To(e, a + 2, s ? r.call(s, o, i) : r(o, i))
    : ga(e, a + 2);
}
function NI(e, t, n, r, o, i, s, a) {
  let c = t + n;
  return tE(e, c, o, i, s)
    ? To(e, c + 3, a ? r.call(a, o, i, s) : r(o, i, s))
    : ga(e, c + 3);
}
function a_(e, t) {
  return Do(e, t);
}
var pr = null;
function SI(e) {
  (pr !== null &&
    (e.defaultEncapsulation !== pr.defaultEncapsulation ||
      e.preserveWhitespaces !== pr.preserveWhitespaces)) ||
    (pr = e);
}
var c_ = (() => {
  class e {
    log(n) {
      console.log(n);
    }
    warn(n) {
      console.warn(n);
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)();
      };
    }
    static {
      this.ɵprov = B({ token: e, factory: e.ɵfac, providedIn: "platform" });
    }
  }
  return e;
})();
var OI = new N(""),
  AI = new N(""),
  l_ = (() => {
    class e {
      constructor(n, r, o) {
        (this._ngZone = n),
          (this.registry = r),
          (this._isZoneStable = !0),
          (this._callbacks = []),
          (this.taskTrackingZone = null),
          ma || (PI(o), o.addToWindow(r)),
          this._watchAngularEvents(),
          n.run(() => {
            this.taskTrackingZone =
              typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone");
          });
      }
      _watchAngularEvents() {
        this._ngZone.onUnstable.subscribe({
          next: () => {
            this._isZoneStable = !1;
          },
        }),
          this._ngZone.runOutsideAngular(() => {
            this._ngZone.onStable.subscribe({
              next: () => {
                Z.assertNotInAngularZone(),
                  queueMicrotask(() => {
                    (this._isZoneStable = !0), this._runCallbacksIfReady();
                  });
              },
            });
          });
      }
      isStable() {
        return this._isZoneStable && !this._ngZone.hasPendingMacrotasks;
      }
      _runCallbacksIfReady() {
        if (this.isStable())
          queueMicrotask(() => {
            for (; this._callbacks.length !== 0; ) {
              let n = this._callbacks.pop();
              clearTimeout(n.timeoutId), n.doneCb();
            }
          });
        else {
          let n = this.getPendingTasks();
          this._callbacks = this._callbacks.filter((r) =>
            r.updateCb && r.updateCb(n) ? (clearTimeout(r.timeoutId), !1) : !0
          );
        }
      }
      getPendingTasks() {
        return this.taskTrackingZone
          ? this.taskTrackingZone.macroTasks.map((n) => ({
              source: n.source,
              creationLocation: n.creationLocation,
              data: n.data,
            }))
          : [];
      }
      addCallback(n, r, o) {
        let i = -1;
        r &&
          r > 0 &&
          (i = setTimeout(() => {
            (this._callbacks = this._callbacks.filter(
              (s) => s.timeoutId !== i
            )),
              n();
          }, r)),
          this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
      }
      whenStable(n, r, o) {
        if (o && !this.taskTrackingZone)
          throw new Error(
            'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
          );
        this.addCallback(n, r, o), this._runCallbacksIfReady();
      }
      registerApplication(n) {
        this.registry.registerApplication(n, this);
      }
      unregisterApplication(n) {
        this.registry.unregisterApplication(n);
      }
      findProviders(n, r, o) {
        return [];
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(le(Z), le(RI), le(AI));
        };
      }
      static {
        this.ɵprov = B({ token: e, factory: e.ɵfac });
      }
    }
    return e;
  })(),
  RI = (() => {
    class e {
      constructor() {
        this._applications = new Map();
      }
      registerApplication(n, r) {
        this._applications.set(n, r);
      }
      unregisterApplication(n) {
        this._applications.delete(n);
      }
      unregisterAllApplications() {
        this._applications.clear();
      }
      getTestability(n) {
        return this._applications.get(n) || null;
      }
      getAllTestabilities() {
        return Array.from(this._applications.values());
      }
      getAllRootElements() {
        return Array.from(this._applications.keys());
      }
      findTestabilityInTree(n, r = !0) {
        return ma?.findTestabilityInTree(this, n, r) ?? null;
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵprov = B({ token: e, factory: e.ɵfac, providedIn: "platform" });
      }
    }
    return e;
  })();
function PI(e) {
  ma = e;
}
var ma;
function ef(e) {
  return !!e && typeof e.then == "function";
}
function kI(e) {
  return !!e && typeof e.subscribe == "function";
}
var LI = new N(""),
  tf = (() => {
    class e {
      constructor() {
        (this.initialized = !1),
          (this.done = !1),
          (this.donePromise = new Promise((n, r) => {
            (this.resolve = n), (this.reject = r);
          })),
          (this.appInits = w(LI, { optional: !0 }) ?? []);
      }
      runInitializers() {
        if (this.initialized) return;
        let n = [];
        for (let o of this.appInits) {
          let i = o();
          if (ef(i)) n.push(i);
          else if (kI(i)) {
            let s = new Promise((a, c) => {
              i.subscribe({ complete: a, error: c });
            });
            n.push(s);
          }
        }
        let r = () => {
          (this.done = !0), this.resolve();
        };
        Promise.all(n)
          .then(() => {
            r();
          })
          .catch((o) => {
            this.reject(o);
          }),
          n.length === 0 && r(),
          (this.initialized = !0);
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵprov = B({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  nf = new N("");
function rf() {
  Oa(() => {
    throw new x(600, !1);
  });
}
function FI(e) {
  return e.isBoundToModule;
}
var jI = 10;
function VI(e, t, n) {
  try {
    let r = n();
    return ef(r)
      ? r.catch((o) => {
          throw (t.runOutsideAngular(() => e.handleError(o)), o);
        })
      : r;
  } catch (r) {
    throw (t.runOutsideAngular(() => e.handleError(r)), r);
  }
}
function of(e, t) {
  return Array.isArray(t) ? t.reduce(of, e) : ae(ae({}, e), t);
}
var On = (() => {
  class e {
    constructor() {
      (this._bootstrapListeners = []),
        (this._runningTick = !1),
        (this._destroyed = !1),
        (this._destroyListeners = []),
        (this._views = []),
        (this.internalErrorHandler = w(hg)),
        (this.afterRenderManager = w(kd)),
        (this.zonelessEnabled = w(da)),
        (this.dirtyFlags = 0),
        (this.deferredDirtyFlags = 0),
        (this.externalTestViews = new Set()),
        (this.beforeRender = new Pe()),
        (this.afterTick = new Pe()),
        (this.componentTypes = []),
        (this.components = []),
        (this.isStable = w(co).hasPendingTasks.pipe(xe((n) => !n))),
        (this._injector = w(Ue));
    }
    get allViews() {
      return [...this.externalTestViews.keys(), ...this._views];
    }
    get destroyed() {
      return this._destroyed;
    }
    whenStable() {
      let n;
      return new Promise((r) => {
        n = this.isStable.subscribe({
          next: (o) => {
            o && r();
          },
        });
      }).finally(() => {
        n.unsubscribe();
      });
    }
    get injector() {
      return this._injector;
    }
    bootstrap(n, r) {
      let o = n instanceof Ur;
      if (!this._injector.get(tf).done) {
        let p = !o && eh(n),
          f = !1;
        throw new x(405, f);
      }
      let s;
      o ? (s = n) : (s = this._injector.get(Rt).resolveComponentFactory(n)),
        this.componentTypes.push(s.componentType);
      let a = FI(s) ? void 0 : this._injector.get(ut),
        c = r || s.selector,
        l = s.create(Me.NULL, [], c, a),
        u = l.location.nativeElement,
        d = l.injector.get(OI, null);
      return (
        d?.registerApplication(u),
        l.onDestroy(() => {
          this.detachView(l.hostView),
            Dr(this.components, l),
            d?.unregisterApplication(u);
        }),
        this._loadComponent(l),
        l
      );
    }
    tick() {
      this.zonelessEnabled || (this.dirtyFlags |= 1), this._tick();
    }
    _tick() {
      if (this._runningTick) throw new x(101, !1);
      let n = C(null);
      try {
        (this._runningTick = !0), this.synchronize();
      } catch (r) {
        this.internalErrorHandler(r);
      } finally {
        (this._runningTick = !1), C(n), this.afterTick.next();
      }
    }
    synchronize() {
      let n = null;
      this._injector.destroyed ||
        (n = this._injector.get($r, null, { optional: !0 })),
        (this.dirtyFlags |= this.deferredDirtyFlags),
        (this.deferredDirtyFlags = 0);
      let r = 0;
      for (; this.dirtyFlags !== 0 && r++ < jI; ) this.synchronizeOnce(n);
    }
    synchronizeOnce(n) {
      if (
        ((this.dirtyFlags |= this.deferredDirtyFlags),
        (this.deferredDirtyFlags = 0),
        this.dirtyFlags & 7)
      ) {
        let r = !!(this.dirtyFlags & 1);
        (this.dirtyFlags &= -8),
          (this.dirtyFlags |= 8),
          this.beforeRender.next(r);
        for (let { _lView: o, notifyErrorHandler: i } of this._views)
          UI(o, i, r, this.zonelessEnabled);
        if (
          ((this.dirtyFlags &= -5),
          this.syncDirtyFlagsWithViews(),
          this.dirtyFlags & 7)
        )
          return;
      } else n?.begin?.(), n?.end?.();
      this.dirtyFlags & 8 &&
        ((this.dirtyFlags &= -9), this.afterRenderManager.execute()),
        this.syncDirtyFlagsWithViews();
    }
    syncDirtyFlagsWithViews() {
      if (this.allViews.some(({ _lView: n }) => oo(n))) {
        this.dirtyFlags |= 2;
        return;
      } else this.dirtyFlags &= -8;
    }
    attachView(n) {
      let r = n;
      this._views.push(r), r.attachToAppRef(this);
    }
    detachView(n) {
      let r = n;
      Dr(this._views, r), r.detachFromAppRef();
    }
    _loadComponent(n) {
      this.attachView(n.hostView), this.tick(), this.components.push(n);
      let r = this._injector.get(nf, []);
      [...this._bootstrapListeners, ...r].forEach((o) => o(n));
    }
    ngOnDestroy() {
      if (!this._destroyed)
        try {
          this._destroyListeners.forEach((n) => n()),
            this._views.slice().forEach((n) => n.destroy());
        } finally {
          (this._destroyed = !0),
            (this._views = []),
            (this._bootstrapListeners = []),
            (this._destroyListeners = []);
        }
    }
    onDestroy(n) {
      return (
        this._destroyListeners.push(n), () => Dr(this._destroyListeners, n)
      );
    }
    destroy() {
      if (this._destroyed) throw new x(406, !1);
      let n = this._injector;
      n.destroy && !n.destroyed && n.destroy();
    }
    get viewCount() {
      return this._views.length;
    }
    warnIfDestroyed() {}
    static {
      this.ɵfac = function (r) {
        return new (r || e)();
      };
    }
    static {
      this.ɵprov = B({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
  }
  return e;
})();
function Dr(e, t) {
  let n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
var hr;
function HI(e) {
  hr ??= new WeakMap();
  let t = hr.get(e);
  if (t) return t;
  let n = e.isStable
    .pipe(Wo((r) => r))
    .toPromise()
    .then(() => {});
  return hr.set(e, n), e.onDestroy(() => hr?.delete(e)), n;
}
function UI(e, t, n, r) {
  if (!n && !oo(e)) return;
  dd(e, t, n && !r ? 0 : 1);
}
var Ds = class {
    constructor(t, n) {
      (this.ngModuleFactory = t), (this.componentFactories = n);
    }
  },
  u_ = (() => {
    class e {
      compileModuleSync(n) {
        return new Gr(n);
      }
      compileModuleAsync(n) {
        return Promise.resolve(this.compileModuleSync(n));
      }
      compileModuleAndAllComponentsSync(n) {
        let r = this.compileModuleSync(n),
          o = pl(n),
          i = Nu(o.declarations).reduce((s, a) => {
            let c = Se(a);
            return c && s.push(new Pt(c)), s;
          }, []);
        return new Ds(r, i);
      }
      compileModuleAndAllComponentsAsync(n) {
        return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
      }
      clearCache() {}
      clearCacheFor(n) {}
      getModuleId(n) {}
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵprov = B({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  $I = new N("");
function BI(e, t, n) {
  let r = new Gr(n);
  return Promise.resolve(r);
}
function zc(e) {
  for (let t = e.length - 1; t >= 0; t--) if (e[t] !== void 0) return e[t];
}
var qI = (() => {
    class e {
      constructor() {
        (this.zone = w(Z)),
          (this.changeDetectionScheduler = w(lt)),
          (this.applicationRef = w(On));
      }
      initialize() {
        this._onMicrotaskEmptySubscription ||
          (this._onMicrotaskEmptySubscription =
            this.zone.onMicrotaskEmpty.subscribe({
              next: () => {
                this.changeDetectionScheduler.runningTick ||
                  this.zone.run(() => {
                    this.applicationRef.tick();
                  });
              },
            }));
      }
      ngOnDestroy() {
        this._onMicrotaskEmptySubscription?.unsubscribe();
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)();
        };
      }
      static {
        this.ɵprov = B({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  WI = new N("", { factory: () => !1 });
function ya({
  ngZoneFactory: e,
  ignoreChangesOutsideZone: t,
  scheduleInRootZone: n,
}) {
  return (
    (e ??= () => new Z(Te(ae({}, va()), { scheduleInRootZone: n }))),
    [
      { provide: Z, useFactory: e },
      {
        provide: rn,
        multi: !0,
        useFactory: () => {
          let r = w(qI, { optional: !0 });
          return () => r.initialize();
        },
      },
      {
        provide: rn,
        multi: !0,
        useFactory: () => {
          let r = w(GI);
          return () => {
            r.initialize();
          };
        },
      },
      t === !0 ? { provide: Md, useValue: !0 } : [],
      { provide: Td, useValue: n ?? cu },
    ]
  );
}
function d_(e) {
  let t = e?.ignoreChangesOutsideZone,
    n = e?.scheduleInRootZone,
    r = ya({
      ngZoneFactory: () => {
        let o = va(e);
        return (
          (o.scheduleInRootZone = n),
          o.shouldCoalesceEventChangeDetection && ze("NgZone_CoalesceEvent"),
          new Z(o)
        );
      },
      ignoreChangesOutsideZone: t,
      scheduleInRootZone: n,
    });
  return ml([{ provide: WI, useValue: !0 }, { provide: da, useValue: !1 }, r]);
}
function va(e) {
  return {
    enableLongStackTrace: !1,
    shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
    shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
  };
}
var GI = (() => {
  class e {
    constructor() {
      (this.subscription = new H()),
        (this.initialized = !1),
        (this.zone = w(Z)),
        (this.pendingTasks = w(co));
    }
    initialize() {
      if (this.initialized) return;
      this.initialized = !0;
      let n = null;
      !this.zone.isStable &&
        !this.zone.hasPendingMacrotasks &&
        !this.zone.hasPendingMicrotasks &&
        (n = this.pendingTasks.add()),
        this.zone.runOutsideAngular(() => {
          this.subscription.add(
            this.zone.onStable.subscribe(() => {
              Z.assertNotInAngularZone(),
                queueMicrotask(() => {
                  n !== null &&
                    !this.zone.hasPendingMacrotasks &&
                    !this.zone.hasPendingMicrotasks &&
                    (this.pendingTasks.remove(n), (n = null));
                });
            })
          );
        }),
        this.subscription.add(
          this.zone.onUnstable.subscribe(() => {
            Z.assertInAngularZone(), (n ??= this.pendingTasks.add());
          })
        );
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)();
      };
    }
    static {
      this.ɵprov = B({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
  }
  return e;
})();
var sf = (() => {
  class e {
    constructor() {
      (this.appRef = w(On)),
        (this.taskService = w(co)),
        (this.ngZone = w(Z)),
        (this.zonelessEnabled = w(da)),
        (this.disableScheduling = w(Md, { optional: !0 }) ?? !1),
        (this.zoneIsDefined = typeof Zone < "u" && !!Zone.root.run),
        (this.schedulerTickApplyArgs = [{ data: { __scheduler_tick__: !0 } }]),
        (this.subscriptions = new H()),
        (this.angularZoneId = this.zoneIsDefined
          ? this.ngZone._inner?.get(Rr)
          : null),
        (this.scheduleInRootZone =
          !this.zonelessEnabled &&
          this.zoneIsDefined &&
          (w(Td, { optional: !0 }) ?? !1)),
        (this.cancelScheduledCallback = null),
        (this.useMicrotaskScheduler = !1),
        (this.runningTick = !1),
        (this.pendingRenderTaskId = null),
        this.subscriptions.add(
          this.appRef.afterTick.subscribe(() => {
            this.runningTick || this.cleanup();
          })
        ),
        this.subscriptions.add(
          this.ngZone.onUnstable.subscribe(() => {
            this.runningTick || this.cleanup();
          })
        ),
        (this.disableScheduling ||=
          !this.zonelessEnabled &&
          (this.ngZone instanceof Pr || !this.zoneIsDefined));
    }
    notify(n) {
      if (!this.zonelessEnabled && n === 5) return;
      switch (n) {
        case 0: {
          this.appRef.dirtyFlags |= 2;
          break;
        }
        case 3:
        case 2:
        case 4:
        case 5:
        case 1: {
          this.appRef.dirtyFlags |= 4;
          break;
        }
        case 7: {
          this.appRef.deferredDirtyFlags |= 8;
          break;
        }
        case 9:
        case 8:
        case 6:
        case 10:
        default:
          this.appRef.dirtyFlags |= 8;
      }
      if (!this.shouldScheduleTick()) return;
      let r = this.useMicrotaskScheduler ? bc : lu;
      (this.pendingRenderTaskId = this.taskService.add()),
        this.scheduleInRootZone
          ? (this.cancelScheduledCallback = Zone.root.run(() =>
              r(() => this.tick())
            ))
          : (this.cancelScheduledCallback = this.ngZone.runOutsideAngular(() =>
              r(() => this.tick())
            ));
    }
    shouldScheduleTick() {
      return !(
        this.disableScheduling ||
        this.pendingRenderTaskId !== null ||
        this.runningTick ||
        this.appRef._runningTick ||
        (!this.zonelessEnabled &&
          this.zoneIsDefined &&
          Zone.current.get(Rr + this.angularZoneId))
      );
    }
    tick() {
      if (this.runningTick || this.appRef.destroyed) return;
      !this.zonelessEnabled &&
        this.appRef.dirtyFlags & 7 &&
        (this.appRef.dirtyFlags |= 1);
      let n = this.taskService.add();
      try {
        this.ngZone.run(
          () => {
            (this.runningTick = !0), this.appRef._tick();
          },
          void 0,
          this.schedulerTickApplyArgs
        );
      } catch (r) {
        throw (this.taskService.remove(n), r);
      } finally {
        this.cleanup();
      }
      (this.useMicrotaskScheduler = !0),
        bc(() => {
          (this.useMicrotaskScheduler = !1), this.taskService.remove(n);
        });
    }
    ngOnDestroy() {
      this.subscriptions.unsubscribe(), this.cleanup();
    }
    cleanup() {
      if (
        ((this.runningTick = !1),
        this.cancelScheduledCallback?.(),
        (this.cancelScheduledCallback = null),
        this.pendingRenderTaskId !== null)
      ) {
        let n = this.pendingRenderTaskId;
        (this.pendingRenderTaskId = null), this.taskService.remove(n);
      }
    }
    static {
      this.ɵfac = function (r) {
        return new (r || e)();
      };
    }
    static {
      this.ɵprov = B({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
  }
  return e;
})();
function zI() {
  return (typeof $localize < "u" && $localize.locale) || Kr;
}
var af = new N("", {
  providedIn: "root",
  factory: () => w(af, b.Optional | b.SkipSelf) || zI(),
});
var Xr = new N("");
function gr(e) {
  return !e.moduleRef;
}
function cf(e) {
  let t = gr(e) ? e.r3Injector : e.moduleRef.injector,
    n = t.get(Z);
  return n.run(() => {
    gr(e)
      ? e.r3Injector.resolveInjectorInitializers()
      : e.moduleRef.resolveInjectorInitializers();
    let r = t.get(St, null),
      o;
    if (
      (n.runOutsideAngular(() => {
        o = n.onError.subscribe({
          next: (i) => {
            r.handleError(i);
          },
        });
      }),
      gr(e))
    ) {
      let i = () => t.destroy(),
        s = e.platformInjector.get(Xr);
      s.add(i),
        t.onDestroy(() => {
          o.unsubscribe(), s.delete(i);
        });
    } else {
      let i = () => e.moduleRef.destroy(),
        s = e.platformInjector.get(Xr);
      s.add(i),
        e.moduleRef.onDestroy(() => {
          Dr(e.allPlatformModules, e.moduleRef), o.unsubscribe(), s.delete(i);
        });
    }
    return VI(r, n, () => {
      let i = t.get(tf);
      return (
        i.runInitializers(),
        i.donePromise.then(() => {
          let s = t.get(af, Kr);
          if ((QE(s || Kr), gr(e))) {
            let a = t.get(On);
            return (
              e.rootComponent !== void 0 && a.bootstrap(e.rootComponent), a
            );
          } else return QI(e.moduleRef, e.allPlatformModules), e.moduleRef;
        })
      );
    });
  });
}
function QI(e, t) {
  let n = e.injector.get(On);
  if (e._bootstrapComponents.length > 0)
    e._bootstrapComponents.forEach((r) => n.bootstrap(r));
  else if (e.instance.ngDoBootstrap) e.instance.ngDoBootstrap(n);
  else throw new x(-403, !1);
  t.push(e);
}
var lf = (() => {
    class e {
      constructor(n) {
        (this._injector = n),
          (this._modules = []),
          (this._destroyListeners = []),
          (this._destroyed = !1);
      }
      bootstrapModuleFactory(n, r) {
        let o = r?.scheduleInRootZone,
          i = () =>
            pg(
              r?.ngZone,
              Te(
                ae(
                  {},
                  va({
                    eventCoalescing: r?.ngZoneEventCoalescing,
                    runCoalescing: r?.ngZoneRunCoalescing,
                  })
                ),
                { scheduleInRootZone: o }
              )
            ),
          s = r?.ignoreChangesOutsideZone,
          a = [
            ya({ ngZoneFactory: i, ignoreChangesOutsideZone: s }),
            { provide: lt, useExisting: sf },
          ],
          c = Jv(n.moduleType, this.injector, a);
        return cf({
          moduleRef: c,
          allPlatformModules: this._modules,
          platformInjector: this.injector,
        });
      }
      bootstrapModule(n, r = []) {
        let o = of({}, r);
        return BI(this.injector, o, n).then((i) =>
          this.bootstrapModuleFactory(i, o)
        );
      }
      onDestroy(n) {
        this._destroyListeners.push(n);
      }
      get injector() {
        return this._injector;
      }
      destroy() {
        if (this._destroyed) throw new x(404, !1);
        this._modules.slice().forEach((r) => r.destroy()),
          this._destroyListeners.forEach((r) => r());
        let n = this._injector.get(Xr, null);
        n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
      }
      get destroyed() {
        return this._destroyed;
      }
      static {
        this.ɵfac = function (r) {
          return new (r || e)(le(Me));
        };
      }
      static {
        this.ɵprov = B({ token: e, factory: e.ɵfac, providedIn: "platform" });
      }
    }
    return e;
  })(),
  Ve = null,
  uf = new N("");
function ZI(e) {
  if (Ve && !Ve.get(uf, !1)) throw new x(400, !1);
  rf(), (Ve = e);
  let t = e.get(lf);
  return pf(e), t;
}
function YI(e, t, n = []) {
  let r = `Platform: ${t}`,
    o = new N(r);
  return (i = []) => {
    let s = ff();
    if (!s || s.injector.get(uf, !1)) {
      let a = [...n, ...i, { provide: o, useValue: !0 }];
      e ? e(a) : ZI(df(a, r));
    }
    return KI(o);
  };
}
function df(e = [], t) {
  return Me.create({
    name: t,
    providers: [
      { provide: Il, useValue: "platform" },
      { provide: Xr, useValue: new Set([() => (Ve = null)]) },
      ...e,
    ],
  });
}
function KI(e) {
  let t = ff();
  if (!t) throw new x(401, !1);
  return t;
}
function ff() {
  return Ve?.get(lf) ?? null;
}
function JI(e = []) {
  if (Ve) return Ve;
  let t = df(e);
  return (Ve = t), rf(), pf(t), t;
}
function pf(e) {
  e.get(Tg, null)?.forEach((n) => n());
}
var f_ = (() => {
  class e {
    static {
      this.__NG_ELEMENT_ID__ = XI;
    }
  }
  return e;
})();
function XI(e) {
  return ew(Y(), D(), (e & 16) === 16);
}
function ew(e, t, n) {
  if (Ft(e) && !n) {
    let r = qe(e.index, t);
    return new ct(r, r);
  } else if (e.type & 175) {
    let r = t[J];
    return new ct(r, t);
  }
  return null;
}
var p_ = YI(null, "core", []);
function h_(e) {
  try {
    let { rootComponent: t, appProviders: n, platformProviders: r } = e,
      o = JI(r),
      i = [ya({}), { provide: lt, useExisting: sf }, ...(n || [])],
      s = new zr({
        providers: i,
        parent: o,
        debugName: "",
        runEnvironmentInitializers: !1,
      });
    return cf({
      r3Injector: s.injector,
      platformInjector: o,
      rootComponent: t,
    });
  } catch (t) {
    return Promise.reject(t);
  }
}
function tw(e, t) {
  if (!t.length) return;
  let n = t.reduce((o, i) => o + i + ":;", ""),
    r = e.getAttribute(zo.JSACTION);
  e.setAttribute(zo.JSACTION, `${r ?? ""}${n}`);
}
function nw(e, t, n) {
  let r = new Map(),
    o = t[an],
    i = e.cleanup;
  if (!i || !o) return r;
  for (let s = 0; s < i.length; ) {
    let a = i[s++],
      c = i[s++];
    if (typeof a != "string") continue;
    let l = a;
    if (!cc(l)) continue;
    ac(l) ? n.capture.add(l) : n.regular.add(l);
    let u = k(t[c]);
    s++;
    let d = i[s++];
    (typeof d == "boolean" || d >= 0) &&
      (r.has(u) ? r.get(u).push(l) : r.set(u, [l]));
  }
  return r;
}
var Cs = class {
    constructor() {
      (this.views = []), (this.indexByContent = new Map());
    }
    add(t) {
      let n = JSON.stringify(t);
      if (!this.indexByContent.has(n)) {
        let r = this.views.length;
        return this.views.push(t), this.indexByContent.set(n, r), r;
      }
      return this.indexByContent.get(n);
    }
    getAll() {
      return this.views;
    }
  },
  rw = 0;
function hf(e) {
  return e.ssrId || (e.ssrId = `t${rw++}`), e.ssrId;
}
function gf(e, t, n) {
  let r = [];
  return En(e, t, n, r), r.length;
}
function ow(e) {
  let t = [];
  return cd(e, t), t.length;
}
function mf(e, t) {
  let n = e[F];
  return n && !n.hasAttribute(fn) ? eo(n, e, t) : null;
}
function yf(e, t) {
  let n = Sl(e[F]),
    r = mf(n, t);
  if (r === null) return;
  let o = k(n[F]),
    i = e[$],
    s = eo(o, i, t),
    a = n[A],
    c = `${r}|${s}`;
  a.setAttribute(o, Jt, c);
}
function g_(e, t) {
  let n = e.injector,
    r = zy(n),
    o = new Cs(),
    i = new Map(),
    s = e._views,
    a = n.get(Fg, jg),
    c = { regular: new Set(), capture: new Set() };
  for (let d of s) {
    let p = vu(d);
    if (p !== null) {
      let f = {
        serializedViewCollection: o,
        corruptedTextNodes: i,
        isI18nHydrationEnabled: r,
        i18nChildren: new Map(),
        eventTypesToReplay: c,
        shouldReplayEvents: a,
      };
      ie(p) ? yf(p, f) : mf(p, f), cw(i, t);
    }
  }
  let l = o.getAll();
  return n.get(uo).set(Gs, l), c;
}
function iw(e, t) {
  let n = [],
    r = "";
  for (let o = U; o < e.length; o++) {
    let i = e[o],
      s,
      a,
      c;
    if (un(i) && ((i = i[O]), ie(i))) {
      (a = ow(i) + 1), yf(i, t);
      let u = Sl(i[F]);
      c = { [ki]: u[m].ssrId, [Ot]: a };
    }
    if (!c) {
      let u = i[m];
      u.type === 1
        ? ((s = u.ssrId), (a = 1))
        : ((s = hf(u)), (a = gf(u, i, u.firstChild))),
        (c = ae({ [ki]: s, [Ot]: a }, vf(e[o], t)));
    }
    let l = JSON.stringify(c);
    if (n.length > 0 && l === r) {
      let u = n[n.length - 1];
      (u[kr] ??= 1), u[kr]++;
    } else (r = l), n.push(c);
  }
  return n;
}
function en(e, t, n, r) {
  let o = t.index - O;
  (e[Li] ??= {}), (e[Li][o] ??= $y(t, n, r));
}
function di(e, t) {
  let n = typeof t == "number" ? t : t.index - O;
  (e[Kt] ??= []), e[Kt].includes(n) || e[Kt].push(n);
}
function vf(e, t) {
  let n = {},
    r = e[m],
    o = Qy(r, t),
    i = t.shouldReplayEvents ? nw(r, e, t.eventTypesToReplay) : null;
  for (let s = O; s < r.bindingStartIndex; s++) {
    let a = r.data[s],
      c = s - O,
      l = Yy(e, s, t);
    if (l) {
      (n[Sc] ??= {}), (n[Sc][c] = l.caseQueue);
      for (let u of l.disconnectedNodes) di(n, u);
      for (let u of l.disjointNodes) {
        let d = r.data[u + O];
        en(n, d, e, o);
      }
      continue;
    }
    if (Kl(a) && !Ht(a)) {
      if (In(a, e) && lw(a)) {
        di(n, a);
        continue;
      }
      if (i && a.type & 2) {
        let u = k(e[s]);
        i.has(u) && tw(u, i.get(u));
      }
      if (Array.isArray(a.projection)) {
        for (let u of a.projection)
          if (u)
            if (!Array.isArray(u))
              !Tl(u) && !hn(u) && (In(u, e) ? di(n, u) : en(n, u, e, o));
            else throw hy(k(e[s]));
      }
      if ((sw(n, a, e, o), ie(e[s]))) {
        let u = a.tView;
        u !== null && ((n[Pi] ??= {}), (n[Pi][c] = hf(u)));
        let d = e[s][F];
        if (Array.isArray(d)) {
          let p = k(d);
          p.hasAttribute(fn) || eo(p, d, t);
        }
        (n[mn] ??= {}), (n[mn][c] = iw(e[s], t));
      } else if (Array.isArray(e[s]) && !Gh(a)) {
        let u = k(e[s][F]);
        u.hasAttribute(fn) || eo(u, e[s], t);
      } else if (a.type & 8) (n[Ri] ??= {}), (n[Ri][c] = gf(r, e, a.child));
      else if (a.type & 144) {
        let u = a.next;
        for (; u !== null && u.type & 144; ) u = u.next;
        u && !hn(u) && en(n, u, e, o);
      } else if (a.type & 1) {
        let u = k(e[s]);
        Iu(t, u);
      }
    }
  }
  return n;
}
function sw(e, t, n, r) {
  Tl(t) ||
    (t.projectionNext &&
      t.projectionNext !== t.next &&
      !hn(t.projectionNext) &&
      en(e, t.projectionNext, n, r),
    t.prev === null &&
      t.parent !== null &&
      In(t.parent, n) &&
      !In(t, n) &&
      en(e, t, n, r));
}
function aw(e) {
  let t = e[G];
  return t?.constructor
    ? Se(t.constructor)?.encapsulation === bt.ShadowDom
    : !1;
}
function eo(e, t, n) {
  let r = t[A];
  if ((mh(t) && !Wy()) || aw(t)) return r.setAttribute(e, fn, ""), null;
  {
    let o = vf(t, n),
      i = n.serializedViewCollection.add(o);
    return r.setAttribute(e, Jt, i.toString()), i;
  }
}
function cw(e, t) {
  for (let [n, r] of e) n.after(t.createComment(r));
}
function lw(e) {
  let t = e;
  for (; t != null; ) {
    if (Ft(t)) return !0;
    t = t.parent;
  }
  return !1;
}
var Qc = !1;
function uw() {
  Qc || ((Qc = !0), Og(), UE(), vI(), qE(), iE(), Tv(), sv(), _m());
}
function dw(e, t) {
  return HI(e);
}
function m_() {
  return ml([
    {
      provide: cr,
      useFactory: () => {
        let e = !0;
        return (
          Zt() && (e = !!w(uo, { optional: !0 })?.get(Gs, null)),
          e && ze("NgHydration"),
          e
        );
      },
    },
    {
      provide: rn,
      useValue: () => {
        qy(!1), Zt() && w(cr) && (fw(), uw());
      },
      multi: !0,
    },
    { provide: Du, useFactory: () => Zt() && w(cr) },
    {
      provide: nf,
      useFactory: () => {
        if (Zt() && w(cr)) {
          let e = w(On),
            t = w(Me);
          return () => {
            dw(e, t).then(() => {
              rv(e);
            });
          };
        }
        return () => {};
      },
      multi: !0,
    },
  ]);
}
function fw() {
  let e = xn(),
    t;
  for (let n of e.body.childNodes)
    if (n.nodeType === Node.COMMENT_NODE && n.textContent?.trim() === Ng) {
      t = n;
      break;
    }
  if (!t) throw new x(-507, !1);
}
function y_(e) {
  return typeof e == "boolean" ? e : e != null && e !== "false";
}
function v_(e, t) {
  ze("NgSignals");
  let n = _a(e);
  return t?.equal && (n[be].equal = t.equal), n;
}
function E_(e) {
  let t = C(null);
  try {
    return e();
  } finally {
    C(t);
  }
}
function I_(e) {
  let t = Se(e);
  if (!t) return null;
  let n = new Pt(t);
  return {
    get selector() {
      return n.selector;
    },
    get type() {
      return n.componentType;
    },
    get inputs() {
      return n.inputs;
    },
    get outputs() {
      return n.outputs;
    },
    get ngContentSelectors() {
      return n.ngContentSelectors;
    },
    get isStandalone() {
      return t.standalone;
    },
    get isSignal() {
      return t.signals;
    },
  };
}
function w_(...e) {
  return e.reduce(
    (t, n) =>
      Object.assign(t, n, { providers: [...t.providers, ...n.providers] }),
    { providers: [] }
  );
}
export {
  H as a,
  _f as b,
  S as c,
  Uo as d,
  $o as e,
  Pe as f,
  Wt as g,
  Gt as h,
  Le as i,
  jf as j,
  Vf as k,
  Hf as l,
  Ke as m,
  xe as n,
  Qf as o,
  Je as p,
  Bo as q,
  ir as r,
  Yf as s,
  Kf as t,
  zt as u,
  oc as v,
  Jf as w,
  Qt as x,
  qo as y,
  Xf as z,
  tp as A,
  Wo as B,
  Go as C,
  np as D,
  rp as E,
  op as F,
  ip as G,
  sp as H,
  ap as I,
  x as J,
  oe as K,
  Kc as L,
  B as M,
  vx as N,
  Ex as O,
  N as P,
  b as Q,
  le as R,
  w as S,
  Ix as T,
  wx as U,
  bt as V,
  Dx as W,
  Cx as X,
  Mx as Y,
  ml as Z,
  Il as _,
  Ue as $,
  Tx as aa,
  yh as ba,
  bx as ca,
  xx as da,
  _x as ea,
  Nx as fa,
  Me as ga,
  co as ha,
  Ne as ia,
  Z as ja,
  St as ka,
  lo as la,
  Sx as ma,
  Cg as na,
  Tg as oa,
  mu as pa,
  Ox as qa,
  Ax as ra,
  uo as sa,
  Ng as ta,
  cr as ua,
  tm as va,
  Rx as wa,
  Hi as xa,
  Px as ya,
  oa as za,
  kx as Aa,
  Fr as Ba,
  $r as Ca,
  Fx as Da,
  fa as Ea,
  ze as Fa,
  Vx as Ga,
  Gv as Ha,
  Hx as Ia,
  ss as Ja,
  Xv as Ka,
  rE as La,
  sE as Ma,
  uE as Na,
  DE as Oa,
  CE as Pa,
  Ux as Qa,
  $x as Ra,
  Bx as Sa,
  qx as Ta,
  Wx as Ua,
  $d as Va,
  Bd as Wa,
  VE as Xa,
  Gx as Ya,
  zx as Za,
  gI as _a,
  Qx as $a,
  Zx as ab,
  Yx as bb,
  Kx as cb,
  Jx as db,
  Xx as eb,
  EI as fb,
  Jd as gb,
  II as hb,
  e_ as ib,
  wI as jb,
  t_ as kb,
  n_ as lb,
  r_ as mb,
  o_ as nb,
  i_ as ob,
  s_ as pb,
  a_ as qb,
  c_ as rb,
  OI as sb,
  l_ as tb,
  ef as ub,
  LI as vb,
  nf as wb,
  On as xb,
  HI as yb,
  u_ as zb,
  d_ as Ab,
  uf as Bb,
  YI as Cb,
  f_ as Db,
  p_ as Eb,
  h_ as Fb,
  g_ as Gb,
  m_ as Hb,
  y_ as Ib,
  v_ as Jb,
  E_ as Kb,
  I_ as Lb,
  w_ as Mb,
};
