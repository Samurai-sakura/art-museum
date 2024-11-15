var Cd = Object.defineProperty,
  xd = Object.defineProperties;
var Md = Object.getOwnPropertyDescriptors;
var hn = Object.getOwnPropertySymbols;
var Us = Object.prototype.hasOwnProperty,
  qs = Object.prototype.propertyIsEnumerable;
var Bs = (e, t, n) =>
    t in e
      ? Cd(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  _e = (e, t) => {
    for (var n in (t ||= {})) Us.call(t, n) && Bs(e, n, t[n]);
    if (hn) for (var n of hn(t)) qs.call(t, n) && Bs(e, n, t[n]);
    return e;
  },
  Te = (e, t) => xd(e, Md(t));
var SI = (e, t) => {
  var n = {};
  for (var r in e) Us.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && hn)
    for (var r of hn(e)) t.indexOf(r) < 0 && qs.call(e, r) && (n[r] = e[r]);
  return n;
};
var OI = (e, t, n) =>
  new Promise((r, o) => {
    var i = (c) => {
        try {
          a(n.next(c));
        } catch (l) {
          o(l);
        }
      },
      s = (c) => {
        try {
          a(n.throw(c));
        } catch (l) {
          o(l);
        }
      },
      a = (c) => (c.done ? r(c.value) : Promise.resolve(c.value).then(i, s));
    a((n = n.apply(e, t)).next());
  });
function Ws(e, t) {
  return Object.is(e, t);
}
var L = null,
  gn = !1,
  mn = 1,
  we = Symbol("SIGNAL");
function E(e) {
  let t = L;
  return (L = e), t;
}
function zs() {
  return L;
}
var Pt = {
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
function so(e) {
  if (gn) throw new Error("");
  if (L === null) return;
  L.consumerOnSignalRead(e);
  let t = L.nextProducerIndex++;
  if ((wn(L), t < L.producerNode.length && L.producerNode[t] !== e && Rt(L))) {
    let n = L.producerNode[t];
    In(n, L.producerIndexOfThis[t]);
  }
  L.producerNode[t] !== e &&
    ((L.producerNode[t] = e),
    (L.producerIndexOfThis[t] = Rt(L) ? Ys(e, L, t) : 0)),
    (L.producerLastReadVersion[t] = e.version);
}
function _d() {
  mn++;
}
function Gs(e) {
  if (!(Rt(e) && !e.dirty) && !(!e.dirty && e.lastCleanEpoch === mn)) {
    if (!e.producerMustRecompute(e) && !co(e)) {
      (e.dirty = !1), (e.lastCleanEpoch = mn);
      return;
    }
    e.producerRecomputeValue(e), (e.dirty = !1), (e.lastCleanEpoch = mn);
  }
}
function Zs(e) {
  if (e.liveConsumerNode === void 0) return;
  let t = gn;
  gn = !0;
  try {
    for (let n of e.liveConsumerNode) n.dirty || Td(n);
  } finally {
    gn = t;
  }
}
function Qs() {
  return L?.consumerAllowSignalWrites !== !1;
}
function Td(e) {
  (e.dirty = !0), Zs(e), e.consumerMarkedDirty?.(e);
}
function vn(e) {
  return e && (e.nextProducerIndex = 0), E(e);
}
function ao(e, t) {
  if (
    (E(t),
    !(
      !e ||
      e.producerNode === void 0 ||
      e.producerIndexOfThis === void 0 ||
      e.producerLastReadVersion === void 0
    ))
  ) {
    if (Rt(e))
      for (let n = e.nextProducerIndex; n < e.producerNode.length; n++)
        In(e.producerNode[n], e.producerIndexOfThis[n]);
    for (; e.producerNode.length > e.nextProducerIndex; )
      e.producerNode.pop(),
        e.producerLastReadVersion.pop(),
        e.producerIndexOfThis.pop();
  }
}
function co(e) {
  wn(e);
  for (let t = 0; t < e.producerNode.length; t++) {
    let n = e.producerNode[t],
      r = e.producerLastReadVersion[t];
    if (r !== n.version || (Gs(n), r !== n.version)) return !0;
  }
  return !1;
}
function lo(e) {
  if ((wn(e), Rt(e)))
    for (let t = 0; t < e.producerNode.length; t++)
      In(e.producerNode[t], e.producerIndexOfThis[t]);
  (e.producerNode.length =
    e.producerLastReadVersion.length =
    e.producerIndexOfThis.length =
      0),
    e.liveConsumerNode &&
      (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0);
}
function Ys(e, t, n) {
  if ((Js(e), e.liveConsumerNode.length === 0 && Ks(e)))
    for (let r = 0; r < e.producerNode.length; r++)
      e.producerIndexOfThis[r] = Ys(e.producerNode[r], e, r);
  return e.liveConsumerIndexOfThis.push(n), e.liveConsumerNode.push(t) - 1;
}
function In(e, t) {
  if ((Js(e), e.liveConsumerNode.length === 1 && Ks(e)))
    for (let r = 0; r < e.producerNode.length; r++)
      In(e.producerNode[r], e.producerIndexOfThis[r]);
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
    wn(o), (o.producerIndexOfThis[r] = t);
  }
}
function Rt(e) {
  return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0;
}
function wn(e) {
  (e.producerNode ??= []),
    (e.producerIndexOfThis ??= []),
    (e.producerLastReadVersion ??= []);
}
function Js(e) {
  (e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= []);
}
function Ks(e) {
  return e.producerNode !== void 0;
}
function Xs(e) {
  let t = Object.create(Nd);
  t.computation = e;
  let n = () => {
    if ((Gs(t), so(t), t.value === yn)) throw t.error;
    return t.value;
  };
  return (n[we] = t), n;
}
var oo = Symbol("UNSET"),
  io = Symbol("COMPUTING"),
  yn = Symbol("ERRORED"),
  Nd = Te(_e({}, Pt), {
    value: oo,
    dirty: !0,
    error: null,
    equal: Ws,
    producerMustRecompute(e) {
      return e.value === oo || e.value === io;
    },
    producerRecomputeValue(e) {
      if (e.value === io) throw new Error("Detected cycle in computations.");
      let t = e.value;
      e.value = io;
      let n = vn(e),
        r;
      try {
        r = e.computation();
      } catch (o) {
        (r = yn), (e.error = o);
      } finally {
        ao(e, n);
      }
      if (t !== oo && t !== yn && r !== yn && e.equal(t, r)) {
        e.value = t;
        return;
      }
      (e.value = r), e.version++;
    },
  });
function Sd() {
  throw new Error();
}
var ea = Sd;
function ta() {
  ea();
}
function na(e) {
  ea = e;
}
var Od = null;
function ra(e) {
  let t = Object.create(ia);
  t.value = e;
  let n = () => (so(t), t.value);
  return (n[we] = t), n;
}
function uo(e, t) {
  Qs() || ta(), e.equal(e.value, t) || ((e.value = t), Ad(e));
}
function oa(e, t) {
  Qs() || ta(), uo(e, t(e.value));
}
var ia = Te(_e({}, Pt), { equal: Ws, value: void 0 });
function Ad(e) {
  e.version++, _d(), Zs(e), Od?.();
}
function I(e) {
  return typeof e == "function";
}
function ct(e) {
  let n = e((r) => {
    Error.call(r), (r.stack = new Error().stack);
  });
  return (
    (n.prototype = Object.create(Error.prototype)),
    (n.prototype.constructor = n),
    n
  );
}
var Dn = ct(
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
function kt(e, t) {
  if (e) {
    let n = e.indexOf(t);
    0 <= n && e.splice(n, 1);
  }
}
var F = class e {
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
      if (I(r))
        try {
          r();
        } catch (i) {
          t = i instanceof Dn ? i.errors : [i];
        }
      let { _finalizers: o } = this;
      if (o) {
        this._finalizers = null;
        for (let i of o)
          try {
            sa(i);
          } catch (s) {
            (t = t ?? []),
              s instanceof Dn ? (t = [...t, ...s.errors]) : t.push(s);
          }
      }
      if (t) throw new Dn(t);
    }
  }
  add(t) {
    var n;
    if (t && t !== this)
      if (this.closed) sa(t);
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
    n === t ? (this._parentage = null) : Array.isArray(n) && kt(n, t);
  }
  remove(t) {
    let { _finalizers: n } = this;
    n && kt(n, t), t instanceof e && t._removeParent(this);
  }
};
F.EMPTY = (() => {
  let e = new F();
  return (e.closed = !0), e;
})();
var fo = F.EMPTY;
function En(e) {
  return (
    e instanceof F ||
    (e && "closed" in e && I(e.remove) && I(e.add) && I(e.unsubscribe))
  );
}
function sa(e) {
  I(e) ? e() : e.unsubscribe();
}
var le = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1,
};
var lt = {
  setTimeout(e, t, ...n) {
    let { delegate: r } = lt;
    return r?.setTimeout ? r.setTimeout(e, t, ...n) : setTimeout(e, t, ...n);
  },
  clearTimeout(e) {
    let { delegate: t } = lt;
    return (t?.clearTimeout || clearTimeout)(e);
  },
  delegate: void 0,
};
function bn(e) {
  lt.setTimeout(() => {
    let { onUnhandledError: t } = le;
    if (t) t(e);
    else throw e;
  });
}
function Lt() {}
var aa = po("C", void 0, void 0);
function ca(e) {
  return po("E", void 0, e);
}
function la(e) {
  return po("N", e, void 0);
}
function po(e, t, n) {
  return { kind: e, value: t, error: n };
}
var qe = null;
function ut(e) {
  if (le.useDeprecatedSynchronousErrorHandling) {
    let t = !qe;
    if ((t && (qe = { errorThrown: !1, error: null }), e(), t)) {
      let { errorThrown: n, error: r } = qe;
      if (((qe = null), n)) throw r;
    }
  } else e();
}
function ua(e) {
  le.useDeprecatedSynchronousErrorHandling &&
    qe &&
    ((qe.errorThrown = !0), (qe.error = e));
}
var We = class extends F {
    constructor(t) {
      super(),
        (this.isStopped = !1),
        t
          ? ((this.destination = t), En(t) && t.add(this))
          : (this.destination = kd);
    }
    static create(t, n, r) {
      return new dt(t, n, r);
    }
    next(t) {
      this.isStopped ? go(la(t), this) : this._next(t);
    }
    error(t) {
      this.isStopped
        ? go(ca(t), this)
        : ((this.isStopped = !0), this._error(t));
    }
    complete() {
      this.isStopped ? go(aa, this) : ((this.isStopped = !0), this._complete());
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
  Rd = Function.prototype.bind;
function ho(e, t) {
  return Rd.call(e, t);
}
var mo = class {
    constructor(t) {
      this.partialObserver = t;
    }
    next(t) {
      let { partialObserver: n } = this;
      if (n.next)
        try {
          n.next(t);
        } catch (r) {
          Cn(r);
        }
    }
    error(t) {
      let { partialObserver: n } = this;
      if (n.error)
        try {
          n.error(t);
        } catch (r) {
          Cn(r);
        }
      else Cn(t);
    }
    complete() {
      let { partialObserver: t } = this;
      if (t.complete)
        try {
          t.complete();
        } catch (n) {
          Cn(n);
        }
    }
  },
  dt = class extends We {
    constructor(t, n, r) {
      super();
      let o;
      if (I(t) || !t)
        o = { next: t ?? void 0, error: n ?? void 0, complete: r ?? void 0 };
      else {
        let i;
        this && le.useDeprecatedNextContext
          ? ((i = Object.create(t)),
            (i.unsubscribe = () => this.unsubscribe()),
            (o = {
              next: t.next && ho(t.next, i),
              error: t.error && ho(t.error, i),
              complete: t.complete && ho(t.complete, i),
            }))
          : (o = t);
      }
      this.destination = new mo(o);
    }
  };
function Cn(e) {
  le.useDeprecatedSynchronousErrorHandling ? ua(e) : bn(e);
}
function Pd(e) {
  throw e;
}
function go(e, t) {
  let { onStoppedNotification: n } = le;
  n && lt.setTimeout(() => n(e, t));
}
var kd = { closed: !0, next: Lt, error: Pd, complete: Lt };
var ft = (typeof Symbol == "function" && Symbol.observable) || "@@observable";
function K(e) {
  return e;
}
function Ld(...e) {
  return yo(e);
}
function yo(e) {
  return e.length === 0
    ? K
    : e.length === 1
      ? e[0]
      : function (n) {
          return e.reduce((r, o) => o(r), n);
        };
}
var T = (() => {
  class e {
    constructor(n) {
      n && (this._subscribe = n);
    }
    lift(n) {
      let r = new e();
      return (r.source = this), (r.operator = n), r;
    }
    subscribe(n, r, o) {
      let i = jd(n) ? n : new dt(n, r, o);
      return (
        ut(() => {
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
        (r = da(r)),
        new r((o, i) => {
          let s = new dt({
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
    [ft]() {
      return this;
    }
    pipe(...n) {
      return yo(n)(this);
    }
    toPromise(n) {
      return (
        (n = da(n)),
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
function da(e) {
  var t;
  return (t = e ?? le.Promise) !== null && t !== void 0 ? t : Promise;
}
function Fd(e) {
  return e && I(e.next) && I(e.error) && I(e.complete);
}
function jd(e) {
  return (e && e instanceof We) || (Fd(e) && En(e));
}
function vo(e) {
  return I(e?.lift);
}
function _(e) {
  return (t) => {
    if (vo(t))
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
function x(e, t, n, r, o) {
  return new Io(e, t, n, r, o);
}
var Io = class extends We {
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
function wo() {
  return _((e, t) => {
    let n = null;
    e._refCount++;
    let r = x(t, void 0, void 0, void 0, () => {
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
var Do = class extends T {
  constructor(t, n) {
    super(),
      (this.source = t),
      (this.subjectFactory = n),
      (this._subject = null),
      (this._refCount = 0),
      (this._connection = null),
      vo(t) && (this.lift = t.lift);
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
      t = this._connection = new F();
      let n = this.getSubject();
      t.add(
        this.source.subscribe(
          x(
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
        t.closed && ((this._connection = null), (t = F.EMPTY));
    }
    return t;
  }
  refCount() {
    return wo()(this);
  }
};
var fa = ct(
  (e) =>
    function () {
      e(this),
        (this.name = "ObjectUnsubscribedError"),
        (this.message = "object unsubscribed");
    }
);
var Ne = (() => {
    class e extends T {
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
        let r = new xn(this, this);
        return (r.operator = n), r;
      }
      _throwIfClosed() {
        if (this.closed) throw new fa();
      }
      next(n) {
        ut(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.currentObservers ||
              (this.currentObservers = Array.from(this.observers));
            for (let r of this.currentObservers) r.next(n);
          }
        });
      }
      error(n) {
        ut(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            (this.hasError = this.isStopped = !0), (this.thrownError = n);
            let { observers: r } = this;
            for (; r.length; ) r.shift().error(n);
          }
        });
      }
      complete() {
        ut(() => {
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
          ? fo
          : ((this.currentObservers = null),
            i.push(n),
            new F(() => {
              (this.currentObservers = null), kt(i, n);
            }));
      }
      _checkFinalizedStatuses(n) {
        let { hasError: r, thrownError: o, isStopped: i } = this;
        r ? n.error(o) : i && n.complete();
      }
      asObservable() {
        let n = new T();
        return (n.source = this), n;
      }
    }
    return (e.create = (t, n) => new xn(t, n)), e;
  })(),
  xn = class extends Ne {
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
        : fo;
    }
  };
var Ft = class extends Ne {
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
var jt = new T((e) => e.complete());
function pa(e) {
  return e && I(e.schedule);
}
function ha(e) {
  return e[e.length - 1];
}
function Mn(e) {
  return I(ha(e)) ? e.pop() : void 0;
}
function Se(e) {
  return pa(ha(e)) ? e.pop() : void 0;
}
function ma(e, t, n, r) {
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
function ga(e) {
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
function ze(e) {
  return this instanceof ze ? ((this.v = e), this) : new ze(e);
}
function ya(e, t, n) {
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
        return new Promise(function (C, v) {
          i.push([f, g, C, v]) > 1 || c(f, g);
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
    f.value instanceof ze
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
function va(e) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator],
    n;
  return t
    ? t.call(e)
    : ((e = typeof ga == "function" ? ga(e) : e[Symbol.iterator]()),
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
var _n = (e) => e && typeof e.length == "number" && typeof e != "function";
function Tn(e) {
  return I(e?.then);
}
function Nn(e) {
  return I(e[ft]);
}
function Sn(e) {
  return Symbol.asyncIterator && I(e?.[Symbol.asyncIterator]);
}
function On(e) {
  return new TypeError(
    `You provided ${e !== null && typeof e == "object" ? "an invalid object" : `'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
  );
}
function Vd() {
  return typeof Symbol != "function" || !Symbol.iterator
    ? "@@iterator"
    : Symbol.iterator;
}
var An = Vd();
function Rn(e) {
  return I(e?.[An]);
}
function Pn(e) {
  return ya(this, arguments, function* () {
    let n = e.getReader();
    try {
      for (;;) {
        let { value: r, done: o } = yield ze(n.read());
        if (o) return yield ze(void 0);
        yield yield ze(r);
      }
    } finally {
      n.releaseLock();
    }
  });
}
function kn(e) {
  return I(e?.getReader);
}
function P(e) {
  if (e instanceof T) return e;
  if (e != null) {
    if (Nn(e)) return Hd(e);
    if (_n(e)) return $d(e);
    if (Tn(e)) return Bd(e);
    if (Sn(e)) return Ia(e);
    if (Rn(e)) return Ud(e);
    if (kn(e)) return qd(e);
  }
  throw On(e);
}
function Hd(e) {
  return new T((t) => {
    let n = e[ft]();
    if (I(n.subscribe)) return n.subscribe(t);
    throw new TypeError(
      "Provided object does not correctly implement Symbol.observable"
    );
  });
}
function $d(e) {
  return new T((t) => {
    for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
    t.complete();
  });
}
function Bd(e) {
  return new T((t) => {
    e.then(
      (n) => {
        t.closed || (t.next(n), t.complete());
      },
      (n) => t.error(n)
    ).then(null, bn);
  });
}
function Ud(e) {
  return new T((t) => {
    for (let n of e) if ((t.next(n), t.closed)) return;
    t.complete();
  });
}
function Ia(e) {
  return new T((t) => {
    Wd(e, t).catch((n) => t.error(n));
  });
}
function qd(e) {
  return Ia(Pn(e));
}
function Wd(e, t) {
  var n, r, o, i;
  return ma(this, void 0, void 0, function* () {
    try {
      for (n = va(e); (r = yield n.next()), !r.done; ) {
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
function Y(e, t, n, r = 0, o = !1) {
  let i = t.schedule(function () {
    n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
  }, r);
  if ((e.add(i), !o)) return i;
}
function Ln(e, t = 0) {
  return _((n, r) => {
    n.subscribe(
      x(
        r,
        (o) => Y(r, e, () => r.next(o), t),
        () => Y(r, e, () => r.complete(), t),
        (o) => Y(r, e, () => r.error(o), t)
      )
    );
  });
}
function Fn(e, t = 0) {
  return _((n, r) => {
    r.add(e.schedule(() => n.subscribe(r), t));
  });
}
function wa(e, t) {
  return P(e).pipe(Fn(t), Ln(t));
}
function Da(e, t) {
  return P(e).pipe(Fn(t), Ln(t));
}
function Ea(e, t) {
  return new T((n) => {
    let r = 0;
    return t.schedule(function () {
      r === e.length
        ? n.complete()
        : (n.next(e[r++]), n.closed || this.schedule());
    });
  });
}
function ba(e, t) {
  return new T((n) => {
    let r;
    return (
      Y(n, t, () => {
        (r = e[An]()),
          Y(
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
      () => I(r?.return) && r.return()
    );
  });
}
function jn(e, t) {
  if (!e) throw new Error("Iterable cannot be null");
  return new T((n) => {
    Y(n, t, () => {
      let r = e[Symbol.asyncIterator]();
      Y(
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
function Ca(e, t) {
  return jn(Pn(e), t);
}
function xa(e, t) {
  if (e != null) {
    if (Nn(e)) return wa(e, t);
    if (_n(e)) return Ea(e, t);
    if (Tn(e)) return Da(e, t);
    if (Sn(e)) return jn(e, t);
    if (Rn(e)) return ba(e, t);
    if (kn(e)) return Ca(e, t);
  }
  throw On(e);
}
function Oe(e, t) {
  return t ? xa(e, t) : P(e);
}
function zd(...e) {
  let t = Se(e);
  return Oe(e, t);
}
function Gd(e, t) {
  let n = I(e) ? e : () => e,
    r = (o) => o.error(n());
  return new T(t ? (o) => t.schedule(r, 0, o) : r);
}
function Zd(e) {
  return !!e && (e instanceof T || (I(e.lift) && I(e.subscribe)));
}
var Ge = ct(
  (e) =>
    function () {
      e(this),
        (this.name = "EmptyError"),
        (this.message = "no elements in sequence");
    }
);
function De(e, t) {
  return _((n, r) => {
    let o = 0;
    n.subscribe(
      x(r, (i) => {
        r.next(e.call(t, i, o++));
      })
    );
  });
}
var { isArray: Qd } = Array;
function Yd(e, t) {
  return Qd(t) ? e(...t) : e(t);
}
function Vn(e) {
  return De((t) => Yd(e, t));
}
var { isArray: Jd } = Array,
  { getPrototypeOf: Kd, prototype: Xd, keys: ef } = Object;
function Hn(e) {
  if (e.length === 1) {
    let t = e[0];
    if (Jd(t)) return { args: t, keys: null };
    if (tf(t)) {
      let n = ef(t);
      return { args: n.map((r) => t[r]), keys: n };
    }
  }
  return { args: e, keys: null };
}
function tf(e) {
  return e && typeof e == "object" && Kd(e) === Xd;
}
function $n(e, t) {
  return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
}
function nf(...e) {
  let t = Se(e),
    n = Mn(e),
    { args: r, keys: o } = Hn(e);
  if (r.length === 0) return Oe([], t);
  let i = new T(rf(r, t, o ? (s) => $n(o, s) : K));
  return n ? i.pipe(Vn(n)) : i;
}
function rf(e, t, n = K) {
  return (r) => {
    Ma(
      t,
      () => {
        let { length: o } = e,
          i = new Array(o),
          s = o,
          a = o;
        for (let c = 0; c < o; c++)
          Ma(
            t,
            () => {
              let l = Oe(e[c], t),
                u = !1;
              l.subscribe(
                x(
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
function Ma(e, t, n) {
  e ? Y(n, e, t) : t();
}
function _a(e, t, n, r, o, i, s, a) {
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
      let C = !1;
      P(n(g, u++)).subscribe(
        x(
          t,
          (v) => {
            o?.(v), i ? f(v) : t.next(v);
          },
          () => {
            C = !0;
          },
          void 0,
          () => {
            if (C)
              try {
                for (l--; c.length && l < r; ) {
                  let v = c.shift();
                  s ? Y(t, s, () => h(v)) : h(v);
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
      x(t, f, () => {
        (d = !0), p();
      })
    ),
    () => {
      a?.();
    }
  );
}
function Ze(e, t, n = 1 / 0) {
  return I(t)
    ? Ze((r, o) => De((i, s) => t(r, i, o, s))(P(e(r, o))), n)
    : (typeof t == "number" && (n = t), _((r, o) => _a(r, o, e, n)));
}
function Eo(e = 1 / 0) {
  return Ze(K, e);
}
function Ta() {
  return Eo(1);
}
function Bn(...e) {
  return Ta()(Oe(e, Se(e)));
}
function of(e) {
  return new T((t) => {
    P(e()).subscribe(t);
  });
}
function sf(...e) {
  let t = Mn(e),
    { args: n, keys: r } = Hn(e),
    o = new T((i) => {
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
        P(n[u]).subscribe(
          x(
            i,
            (p) => {
              d || ((d = !0), l--), (a[u] = p);
            },
            () => c--,
            void 0,
            () => {
              (!c || !d) && (l || i.next(r ? $n(r, a) : a), i.complete());
            }
          )
        );
      }
    });
  return t ? o.pipe(Vn(t)) : o;
}
function Vt(e, t) {
  return _((n, r) => {
    let o = 0;
    n.subscribe(x(r, (i) => e.call(t, i, o++) && r.next(i)));
  });
}
function Na(e) {
  return _((t, n) => {
    let r = null,
      o = !1,
      i;
    (r = t.subscribe(
      x(n, void 0, void 0, (s) => {
        (i = P(e(s, Na(e)(t)))),
          r ? (r.unsubscribe(), (r = null), i.subscribe(n)) : (o = !0);
      })
    )),
      o && (r.unsubscribe(), (r = null), i.subscribe(n));
  });
}
function Sa(e, t, n, r, o) {
  return (i, s) => {
    let a = n,
      c = t,
      l = 0;
    i.subscribe(
      x(
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
function af(e, t) {
  return I(t) ? Ze(e, t, 1) : Ze(e, 1);
}
function Ht(e) {
  return _((t, n) => {
    let r = !1;
    t.subscribe(
      x(
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
function bo(e) {
  return e <= 0
    ? () => jt
    : _((t, n) => {
        let r = 0;
        t.subscribe(
          x(n, (o) => {
            ++r <= e && (n.next(o), e <= r && n.complete());
          })
        );
      });
}
function cf(e) {
  return De(() => e);
}
function Un(e = lf) {
  return _((t, n) => {
    let r = !1;
    t.subscribe(
      x(
        n,
        (o) => {
          (r = !0), n.next(o);
        },
        () => (r ? n.complete() : n.error(e()))
      )
    );
  });
}
function lf() {
  return new Ge();
}
function uf(e) {
  return _((t, n) => {
    try {
      t.subscribe(n);
    } finally {
      n.add(e);
    }
  });
}
function Co(e, t) {
  let n = arguments.length >= 2;
  return (r) =>
    r.pipe(
      e ? Vt((o, i) => e(o, i, r)) : K,
      bo(1),
      n ? Ht(t) : Un(() => new Ge())
    );
}
function xo(e) {
  return e <= 0
    ? () => jt
    : _((t, n) => {
        let r = [];
        t.subscribe(
          x(
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
function df(e, t) {
  let n = arguments.length >= 2;
  return (r) =>
    r.pipe(
      e ? Vt((o, i) => e(o, i, r)) : K,
      xo(1),
      n ? Ht(t) : Un(() => new Ge())
    );
}
function ff(e, t) {
  return _(Sa(e, t, arguments.length >= 2, !0));
}
function pf(...e) {
  let t = Se(e);
  return _((n, r) => {
    (t ? Bn(e, n, t) : Bn(e, n)).subscribe(r);
  });
}
function hf(e, t) {
  return _((n, r) => {
    let o = null,
      i = 0,
      s = !1,
      a = () => s && !o && r.complete();
    n.subscribe(
      x(
        r,
        (c) => {
          o?.unsubscribe();
          let l = 0,
            u = i++;
          P(e(c, u)).subscribe(
            (o = x(
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
function gf(e) {
  return _((t, n) => {
    P(e).subscribe(x(n, () => n.complete(), Lt)), !n.closed && t.subscribe(n);
  });
}
function mf(e, t, n) {
  let r = I(e) || t || n ? { next: e, error: t, complete: n } : e;
  return r
    ? _((o, i) => {
        var s;
        (s = r.subscribe) === null || s === void 0 || s.call(r);
        let a = !0;
        o.subscribe(
          x(
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
    : K;
}
var hc = "https://g.co/ng/security#xss",
  N = class extends Error {
    constructor(t, n) {
      super(yf(t, n)), (this.code = t);
    }
  };
function yf(e, t) {
  return `${`NG0${Math.abs(e)}`}${t ? ": " + t : ""}`;
}
function rn(e) {
  return { toString: e }.toString();
}
var qn = "__parameters__";
function vf(e) {
  return function (...n) {
    if (e) {
      let r = e(...n);
      for (let o in r) this[o] = r[o];
    }
  };
}
function gc(e, t, n) {
  return rn(() => {
    let r = vf(t);
    function o(...i) {
      if (this instanceof o) return r.apply(this, i), this;
      let s = new o(...i);
      return (a.annotation = s), a;
      function a(c, l, u) {
        let d = c.hasOwnProperty(qn)
          ? c[qn]
          : Object.defineProperty(c, qn, { value: [] })[qn];
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
var ir = globalThis;
function S(e) {
  for (let t in e) if (e[t] === S) return t;
  throw Error("Could not find renamed property on target object.");
}
function If(e, t) {
  for (let n in t) t.hasOwnProperty(n) && !e.hasOwnProperty(n) && (e[n] = t[n]);
}
function X(e) {
  if (typeof e == "string") return e;
  if (Array.isArray(e)) return "[" + e.map(X).join(", ") + "]";
  if (e == null) return "" + e;
  if (e.overriddenName) return `${e.overriddenName}`;
  if (e.name) return `${e.name}`;
  let t = e.toString();
  if (t == null) return "" + t;
  let n = t.indexOf(`
`);
  return n === -1 ? t : t.substring(0, n);
}
function Uo(e, t) {
  return e == null || e === ""
    ? t === null
      ? ""
      : t
    : t == null || t === ""
      ? e
      : e + " " + t;
}
var wf = S({ __forward_ref__: S });
function mc(e) {
  return (
    (e.__forward_ref__ = mc),
    (e.toString = function () {
      return X(this());
    }),
    e
  );
}
function z(e) {
  return yc(e) ? e() : e;
}
function yc(e) {
  return (
    typeof e == "function" && e.hasOwnProperty(wf) && e.__forward_ref__ === mc
  );
}
function Df(e, t, n) {
  e != t && Ef(n, e, t, "==");
}
function Ef(e, t, n, r) {
  throw new Error(
    `ASSERTION ERROR: ${e}` +
      (r == null ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
  );
}
function G(e) {
  return {
    token: e.token,
    providedIn: e.providedIn || null,
    factory: e.factory,
    value: void 0,
  };
}
function Dx(e) {
  return { providers: e.providers || [], imports: e.imports || [] };
}
function Pr(e) {
  return Oa(e, vc) || Oa(e, Ic);
}
function Ex(e) {
  return Pr(e) !== null;
}
function Oa(e, t) {
  return e.hasOwnProperty(t) ? e[t] : null;
}
function bf(e) {
  let t = e && (e[vc] || e[Ic]);
  return t || null;
}
function Aa(e) {
  return e && (e.hasOwnProperty(Ra) || e.hasOwnProperty(Cf)) ? e[Ra] : null;
}
var vc = S({ ɵprov: S }),
  Ra = S({ ɵinj: S }),
  Ic = S({ ngInjectableDef: S }),
  Cf = S({ ngInjectorDef: S }),
  R = class {
    constructor(t, n) {
      (this._desc = t),
        (this.ngMetadataName = "InjectionToken"),
        (this.ɵprov = void 0),
        typeof n == "number"
          ? (this.__NG_ELEMENT_ID__ = n)
          : n !== void 0 &&
            (this.ɵprov = G({
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
function wc(e) {
  return e && !!e.ɵproviders;
}
var xf = S({ ɵcmp: S }),
  Mf = S({ ɵdir: S }),
  _f = S({ ɵpipe: S }),
  Tf = S({ ɵmod: S }),
  sr = S({ ɵfac: S }),
  Ut = S({ __NG_ELEMENT_ID__: S }),
  Pa = S({ __NG_ENV_ID__: S });
function kr(e) {
  return typeof e == "string" ? e : e == null ? "" : String(e);
}
function Nf(e) {
  return typeof e == "function"
    ? e.name || e.toString()
    : typeof e == "object" && e != null && typeof e.type == "function"
      ? e.type.name || e.type.toString()
      : kr(e);
}
function Sf(e, t) {
  let n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
  throw new N(-200, e);
}
function Xi(e, t) {
  throw new N(-201, !1);
}
var M = (function (e) {
    return (
      (e[(e.Default = 0)] = "Default"),
      (e[(e.Host = 1)] = "Host"),
      (e[(e.Self = 2)] = "Self"),
      (e[(e.SkipSelf = 4)] = "SkipSelf"),
      (e[(e.Optional = 8)] = "Optional"),
      e
    );
  })(M || {}),
  qo;
function Dc() {
  return qo;
}
function re(e) {
  let t = qo;
  return (qo = e), t;
}
function Ec(e, t, n) {
  let r = Pr(e);
  if (r && r.providedIn == "root")
    return r.value === void 0 ? (r.value = r.factory()) : r.value;
  if (n & M.Optional) return null;
  if (t !== void 0) return t;
  Xi(e, "Injector");
}
var Of = {},
  Wt = Of,
  Wo = "__NG_DI_FLAG__",
  ar = "ngTempTokenPath",
  Af = "ngTokenPath",
  Rf = /\n/gm,
  Pf = "\u0275",
  ka = "__source",
  yt;
function kf() {
  return yt;
}
function Ae(e) {
  let t = yt;
  return (yt = e), t;
}
function Lf(e, t = M.Default) {
  if (yt === void 0) throw new N(-203, !1);
  return yt === null
    ? Ec(e, void 0, t)
    : yt.get(e, t & M.Optional ? null : void 0, t);
}
function Pe(e, t = M.Default) {
  return (Dc() || Lf)(z(e), t);
}
function b(e, t = M.Default) {
  return Pe(e, Lr(t));
}
function Lr(e) {
  return typeof e > "u" || typeof e == "number"
    ? e
    : 0 | (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4);
}
function zo(e) {
  let t = [];
  for (let n = 0; n < e.length; n++) {
    let r = z(e[n]);
    if (Array.isArray(r)) {
      if (r.length === 0) throw new N(900, !1);
      let o,
        i = M.Default;
      for (let s = 0; s < r.length; s++) {
        let a = r[s],
          c = Ff(a);
        typeof c == "number" ? (c === -1 ? (o = a.token) : (i |= c)) : (o = a);
      }
      t.push(Pe(o, i));
    } else t.push(Pe(r));
  }
  return t;
}
function bc(e, t) {
  return (e[Wo] = t), (e.prototype[Wo] = t), e;
}
function Ff(e) {
  return e[Wo];
}
function jf(e, t, n, r) {
  let o = e[ar];
  throw (
    (t[ka] && o.unshift(t[ka]),
    (e.message = Vf(
      `
` + e.message,
      o,
      n,
      r
    )),
    (e[Af] = o),
    (e[ar] = null),
    e)
  );
}
function Vf(e, t, n, r = null) {
  e =
    e &&
    e.charAt(0) ===
      `
` &&
    e.charAt(1) == Pf
      ? e.slice(2)
      : e;
  let o = X(t);
  if (Array.isArray(t)) o = t.map(X).join(" -> ");
  else if (typeof t == "object") {
    let i = [];
    for (let s in t)
      if (t.hasOwnProperty(s)) {
        let a = t[s];
        i.push(s + ":" + (typeof a == "string" ? JSON.stringify(a) : X(a)));
      }
    o = `{${i.join(", ")}}`;
  }
  return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
    Rf,
    `
  `
  )}`;
}
var bx = bc(gc("Optional"), 8);
var Cx = bc(gc("SkipSelf"), 4);
function It(e, t) {
  let n = e.hasOwnProperty(sr);
  return n ? e[sr] : null;
}
function Hf(e, t, n) {
  if (e.length !== t.length) return !1;
  for (let r = 0; r < e.length; r++) {
    let o = e[r],
      i = t[r];
    if ((n && ((o = n(o)), (i = n(i))), i !== o)) return !1;
  }
  return !0;
}
function $f(e) {
  return e.flat(Number.POSITIVE_INFINITY);
}
function es(e, t) {
  e.forEach((n) => (Array.isArray(n) ? es(n, t) : t(n)));
}
function Cc(e, t, n) {
  t >= e.length ? e.push(n) : e.splice(t, 0, n);
}
function cr(e, t) {
  return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
}
function Bf(e, t, n, r) {
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
function ts(e, t, n) {
  let r = on(e, t);
  return r >= 0 ? (e[r | 1] = n) : ((r = ~r), Bf(e, r, t, n)), r;
}
function Mo(e, t) {
  let n = on(e, t);
  if (n >= 0) return e[n | 1];
}
function on(e, t) {
  return Uf(e, t, 1);
}
function Uf(e, t, n) {
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
var wt = {},
  U = [],
  zt = new R(""),
  xc = new R("", -1),
  Mc = new R(""),
  lr = class {
    get(t, n = Wt) {
      if (n === Wt) {
        let r = new Error(`NullInjectorError: No provider for ${X(t)}!`);
        throw ((r.name = "NullInjectorError"), r);
      }
      return n;
    }
  },
  _c = (function (e) {
    return (e[(e.OnPush = 0)] = "OnPush"), (e[(e.Default = 1)] = "Default"), e;
  })(_c || {}),
  Gt = (function (e) {
    return (
      (e[(e.Emulated = 0)] = "Emulated"),
      (e[(e.None = 2)] = "None"),
      (e[(e.ShadowDom = 3)] = "ShadowDom"),
      e
    );
  })(Gt || {}),
  ke = (function (e) {
    return (
      (e[(e.None = 0)] = "None"),
      (e[(e.SignalBased = 1)] = "SignalBased"),
      (e[(e.HasDecoratorInputTransform = 2)] = "HasDecoratorInputTransform"),
      e
    );
  })(ke || {});
function qf(e, t, n) {
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
function Go(e, t, n) {
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
      Wf(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
    }
  }
  return r;
}
function Tc(e) {
  return e === 3 || e === 4 || e === 6;
}
function Wf(e) {
  return e.charCodeAt(0) === 64;
}
function Zt(e, t) {
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
              ? La(e, n, o, null, t[++r])
              : La(e, n, o, null, null));
      }
    }
  return e;
}
function La(e, t, n, r, o) {
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
var Nc = "ng-template";
function zf(e, t, n, r) {
  let o = 0;
  if (r) {
    for (; o < t.length && typeof t[o] == "string"; o += 2)
      if (t[o] === "class" && qf(t[o + 1].toLowerCase(), n, 0) !== -1)
        return !0;
  } else if (ns(e)) return !1;
  if (((o = t.indexOf(1, o)), o > -1)) {
    let i;
    for (; ++o < t.length && typeof (i = t[o]) == "string"; )
      if (i.toLowerCase() === n) return !0;
  }
  return !1;
}
function ns(e) {
  return e.type === 4 && e.value !== Nc;
}
function Gf(e, t, n) {
  let r = e.type === 4 && !n ? Nc : e.value;
  return t === r;
}
function Zf(e, t, n) {
  let r = 4,
    o = e.attrs,
    i = o !== null ? Jf(o) : 0,
    s = !1;
  for (let a = 0; a < t.length; a++) {
    let c = t[a];
    if (typeof c == "number") {
      if (!s && !ue(r) && !ue(c)) return !1;
      if (s && ue(c)) continue;
      (s = !1), (r = c | (r & 1));
      continue;
    }
    if (!s)
      if (r & 4) {
        if (
          ((r = 2 | (r & 1)),
          (c !== "" && !Gf(e, c, n)) || (c === "" && t.length === 1))
        ) {
          if (ue(r)) return !1;
          s = !0;
        }
      } else if (r & 8) {
        if (o === null || !zf(e, o, c, n)) {
          if (ue(r)) return !1;
          s = !0;
        }
      } else {
        let l = t[++a],
          u = Qf(c, o, ns(e), n);
        if (u === -1) {
          if (ue(r)) return !1;
          s = !0;
          continue;
        }
        if (l !== "") {
          let d;
          if (
            (u > i ? (d = "") : (d = o[u + 1].toLowerCase()), r & 2 && l !== d)
          ) {
            if (ue(r)) return !1;
            s = !0;
          }
        }
      }
  }
  return ue(r) || s;
}
function ue(e) {
  return (e & 1) === 0;
}
function Qf(e, t, n, r) {
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
  } else return Kf(t, e);
}
function Yf(e, t, n = !1) {
  for (let r = 0; r < t.length; r++) if (Zf(e, t[r], n)) return !0;
  return !1;
}
function Jf(e) {
  for (let t = 0; t < e.length; t++) {
    let n = e[t];
    if (Tc(n)) return t;
  }
  return e.length;
}
function Kf(e, t) {
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
function Fa(e, t) {
  return e ? ":not(" + t.trim() + ")" : t;
}
function Xf(e) {
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
      o !== "" && !ue(s) && ((t += Fa(i, o)), (o = "")),
        (r = s),
        (i = i || !ue(r));
    n++;
  }
  return o !== "" && (t += Fa(i, o)), t;
}
function ep(e) {
  return e.map(Xf).join(",");
}
function tp(e) {
  let t = [],
    n = [],
    r = 1,
    o = 2;
  for (; r < e.length; ) {
    let i = e[r];
    if (typeof i == "string")
      o === 2 ? i !== "" && t.push(i, e[++r]) : o === 8 && n.push(i);
    else {
      if (!ue(o)) break;
      o = i;
    }
    r++;
  }
  return { attrs: t, classes: n };
}
function xx(e) {
  return rn(() => {
    let t = Rc(e),
      n = Te(_e({}, t), {
        decls: e.decls,
        vars: e.vars,
        template: e.template,
        consts: e.consts || null,
        ngContentSelectors: e.ngContentSelectors,
        onPush: e.changeDetection === _c.OnPush,
        directiveDefs: null,
        pipeDefs: null,
        dependencies: (t.standalone && e.dependencies) || null,
        getStandaloneInjector: null,
        signals: e.signals ?? !1,
        data: e.data || {},
        encapsulation: e.encapsulation || Gt.Emulated,
        styles: e.styles || U,
        _: null,
        schemas: e.schemas || null,
        tView: null,
        id: "",
      });
    Pc(n);
    let r = e.dependencies;
    return (
      (n.directiveDefs = Va(r, !1)), (n.pipeDefs = Va(r, !0)), (n.id = ip(n)), n
    );
  });
}
function np(e) {
  return Le(e) || Sc(e);
}
function rp(e) {
  return e !== null;
}
function Mx(e) {
  return rn(() => ({
    type: e.type,
    bootstrap: e.bootstrap || U,
    declarations: e.declarations || U,
    imports: e.imports || U,
    exports: e.exports || U,
    transitiveCompileScopes: null,
    schemas: e.schemas || null,
    id: e.id || null,
  }));
}
function ja(e, t) {
  if (e == null) return wt;
  let n = {};
  for (let r in e)
    if (e.hasOwnProperty(r)) {
      let o = e[r],
        i,
        s,
        a = ke.None;
      Array.isArray(o)
        ? ((a = o[0]), (i = o[1]), (s = o[2] ?? i))
        : ((i = o), (s = o)),
        t ? ((n[i] = a !== ke.None ? [r, a] : r), (t[i] = s)) : (n[i] = r);
    }
  return n;
}
function _x(e) {
  return rn(() => {
    let t = Rc(e);
    return Pc(t), t;
  });
}
function Le(e) {
  return e[xf] || null;
}
function Sc(e) {
  return e[Mf] || null;
}
function Oc(e) {
  return e[_f] || null;
}
function op(e) {
  let t = Le(e) || Sc(e) || Oc(e);
  return t !== null ? t.standalone : !1;
}
function Ac(e, t) {
  let n = e[Tf] || null;
  if (!n && t === !0)
    throw new Error(`Type ${X(e)} does not have '\u0275mod' property.`);
  return n;
}
function Rc(e) {
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
    inputConfig: e.inputs || wt,
    exportAs: e.exportAs || null,
    standalone: e.standalone === !0,
    signals: e.signals === !0,
    selectors: e.selectors || U,
    viewQuery: e.viewQuery || null,
    features: e.features || null,
    setInput: null,
    findHostDirectiveDefs: null,
    hostDirectives: null,
    inputs: ja(e.inputs, t),
    outputs: ja(e.outputs),
    debugInfo: null,
  };
}
function Pc(e) {
  e.features?.forEach((t) => t(e));
}
function Va(e, t) {
  if (!e) return null;
  let n = t ? Oc : np;
  return () => (typeof e == "function" ? e() : e).map((r) => n(r)).filter(rp);
}
function ip(e) {
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
function kc(e) {
  return { ɵproviders: e };
}
function sp(...e) {
  return { ɵproviders: Lc(!0, e), ɵfromNgModule: !0 };
}
function Lc(e, ...t) {
  let n = [],
    r = new Set(),
    o,
    i = (s) => {
      n.push(s);
    };
  return (
    es(t, (s) => {
      let a = s;
      Zo(a, i, [], r) && ((o ||= []), o.push(a));
    }),
    o !== void 0 && Fc(o, i),
    n
  );
}
function Fc(e, t) {
  for (let n = 0; n < e.length; n++) {
    let { ngModule: r, providers: o } = e[n];
    rs(o, (i) => {
      t(i, r);
    });
  }
}
function Zo(e, t, n, r) {
  if (((e = z(e)), !e)) return !1;
  let o = null,
    i = Aa(e),
    s = !i && Le(e);
  if (!i && !s) {
    let c = e.ngModule;
    if (((i = Aa(c)), i)) o = c;
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
      for (let l of c) Zo(l, t, n, r);
    }
  } else if (i) {
    if (i.imports != null && !a) {
      r.add(o);
      let l;
      try {
        es(i.imports, (u) => {
          Zo(u, t, n, r) && ((l ||= []), l.push(u));
        });
      } finally {
      }
      l !== void 0 && Fc(l, t);
    }
    if (!a) {
      let l = It(o) || (() => new o());
      t({ provide: o, useFactory: l, deps: U }, o),
        t({ provide: Mc, useValue: o, multi: !0 }, o),
        t({ provide: zt, useValue: () => Pe(o), multi: !0 }, o);
    }
    let c = i.providers;
    if (c != null && !a) {
      let l = e;
      rs(c, (u) => {
        t(u, l);
      });
    }
  } else return !1;
  return o !== e && e.providers !== void 0;
}
function rs(e, t) {
  for (let n of e)
    wc(n) && (n = n.ɵproviders), Array.isArray(n) ? rs(n, t) : t(n);
}
var ap = S({ provide: String, useValue: S });
function jc(e) {
  return e !== null && typeof e == "object" && ap in e;
}
function cp(e) {
  return !!(e && e.useExisting);
}
function lp(e) {
  return !!(e && e.useFactory);
}
function Dt(e) {
  return typeof e == "function";
}
function up(e) {
  return !!e.useClass;
}
var Vc = new R(""),
  Kn = {},
  dp = {},
  _o;
function os() {
  return _o === void 0 && (_o = new lr()), _o;
}
var Fe = class {},
  Qt = class extends Fe {
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
        Yo(t, (s) => this.processProvider(s)),
        this.records.set(xc, pt(void 0, this)),
        o.has("environment") && this.records.set(Fe, pt(void 0, this));
      let i = this.records.get(Vc);
      i != null && typeof i.value == "string" && this.scopes.add(i.value),
        (this.injectorDefTypes = new Set(this.get(Mc, U, M.Self)));
    }
    destroy() {
      this.assertNotDestroyed(), (this._destroyed = !0);
      let t = E(null);
      try {
        for (let r of this._ngOnDestroyHooks) r.ngOnDestroy();
        let n = this._onDestroyHooks;
        this._onDestroyHooks = [];
        for (let r of n) r();
      } finally {
        this.records.clear(),
          this._ngOnDestroyHooks.clear(),
          this.injectorDefTypes.clear(),
          E(t);
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
      let n = Ae(this),
        r = re(void 0),
        o;
      try {
        return t();
      } finally {
        Ae(n), re(r);
      }
    }
    get(t, n = Wt, r = M.Default) {
      if ((this.assertNotDestroyed(), t.hasOwnProperty(Pa))) return t[Pa](this);
      r = Lr(r);
      let o,
        i = Ae(this),
        s = re(void 0);
      try {
        if (!(r & M.SkipSelf)) {
          let c = this.records.get(t);
          if (c === void 0) {
            let l = mp(t) && Pr(t);
            l && this.injectableDefInScope(l)
              ? (c = pt(Qo(t), Kn))
              : (c = null),
              this.records.set(t, c);
          }
          if (c != null) return this.hydrate(t, c);
        }
        let a = r & M.Self ? os() : this.parent;
        return (n = r & M.Optional && n === Wt ? null : n), a.get(t, n);
      } catch (a) {
        if (a.name === "NullInjectorError") {
          if (((a[ar] = a[ar] || []).unshift(X(t)), i)) throw a;
          return jf(a, t, "R3InjectorError", this.source);
        } else throw a;
      } finally {
        re(s), Ae(i);
      }
    }
    resolveInjectorInitializers() {
      let t = E(null),
        n = Ae(this),
        r = re(void 0),
        o;
      try {
        let i = this.get(zt, U, M.Self);
        for (let s of i) s();
      } finally {
        Ae(n), re(r), E(t);
      }
    }
    toString() {
      let t = [],
        n = this.records;
      for (let r of n.keys()) t.push(X(r));
      return `R3Injector[${t.join(", ")}]`;
    }
    assertNotDestroyed() {
      if (this._destroyed) throw new N(205, !1);
    }
    processProvider(t) {
      t = z(t);
      let n = Dt(t) ? t : z(t && t.provide),
        r = pp(t);
      if (!Dt(t) && t.multi === !0) {
        let o = this.records.get(n);
        o ||
          ((o = pt(void 0, Kn, !0)),
          (o.factory = () => zo(o.multi)),
          this.records.set(n, o)),
          (n = t),
          o.multi.push(t);
      }
      this.records.set(n, r);
    }
    hydrate(t, n) {
      let r = E(null);
      try {
        return (
          n.value === Kn && ((n.value = dp), (n.value = n.factory())),
          typeof n.value == "object" &&
            n.value &&
            gp(n.value) &&
            this._ngOnDestroyHooks.add(n.value),
          n.value
        );
      } finally {
        E(r);
      }
    }
    injectableDefInScope(t) {
      if (!t.providedIn) return !1;
      let n = z(t.providedIn);
      return typeof n == "string"
        ? n === "any" || this.scopes.has(n)
        : this.injectorDefTypes.has(n);
    }
    removeOnDestroy(t) {
      let n = this._onDestroyHooks.indexOf(t);
      n !== -1 && this._onDestroyHooks.splice(n, 1);
    }
  };
function Qo(e) {
  let t = Pr(e),
    n = t !== null ? t.factory : It(e);
  if (n !== null) return n;
  if (e instanceof R) throw new N(204, !1);
  if (e instanceof Function) return fp(e);
  throw new N(204, !1);
}
function fp(e) {
  if (e.length > 0) throw new N(204, !1);
  let n = bf(e);
  return n !== null ? () => n.factory(e) : () => new e();
}
function pp(e) {
  if (jc(e)) return pt(void 0, e.useValue);
  {
    let t = Hc(e);
    return pt(t, Kn);
  }
}
function Hc(e, t, n) {
  let r;
  if (Dt(e)) {
    let o = z(e);
    return It(o) || Qo(o);
  } else if (jc(e)) r = () => z(e.useValue);
  else if (lp(e)) r = () => e.useFactory(...zo(e.deps || []));
  else if (cp(e)) r = () => Pe(z(e.useExisting));
  else {
    let o = z(e && (e.useClass || e.provide));
    if (hp(e)) r = () => new o(...zo(e.deps));
    else return It(o) || Qo(o);
  }
  return r;
}
function pt(e, t, n = !1) {
  return { factory: e, value: t, multi: n ? [] : void 0 };
}
function hp(e) {
  return !!e.deps;
}
function gp(e) {
  return (
    e !== null && typeof e == "object" && typeof e.ngOnDestroy == "function"
  );
}
function mp(e) {
  return typeof e == "function" || (typeof e == "object" && e instanceof R);
}
function Yo(e, t) {
  for (let n of e)
    Array.isArray(n) ? Yo(n, t) : n && wc(n) ? Yo(n.ɵproviders, t) : t(n);
}
function Tx(e, t) {
  e instanceof Qt && e.assertNotDestroyed();
  let n,
    r = Ae(e),
    o = re(void 0);
  try {
    return t();
  } finally {
    Ae(r), re(o);
  }
}
function $c() {
  return Dc() !== void 0 || kf() != null;
}
function yp(e) {
  if (!$c()) throw new N(-203, !1);
}
function vp(e) {
  return typeof e == "function";
}
var te = 0,
  y = 1,
  m = 2,
  $ = 3,
  fe = 4,
  ae = 5,
  he = 6,
  ur = 7,
  q = 8,
  Et = 9,
  ve = 10,
  O = 11,
  Yt = 12,
  Ha = 13,
  St = 14,
  J = 15,
  Ye = 16,
  ht = 17,
  Ce = 18,
  Fr = 19,
  Bc = 20,
  Re = 21,
  To = 22,
  oe = 23,
  k = 25,
  Uc = 1,
  Jt = 6,
  xe = 7,
  dr = 8,
  bt = 9,
  H = 10,
  fr = (function (e) {
    return (
      (e[(e.None = 0)] = "None"),
      (e[(e.HasTransplantedViews = 2)] = "HasTransplantedViews"),
      e
    );
  })(fr || {});
function pe(e) {
  return Array.isArray(e) && typeof e[Uc] == "object";
}
function Ie(e) {
  return Array.isArray(e) && e[Uc] === !0;
}
function qc(e) {
  return (e.flags & 4) !== 0;
}
function sn(e) {
  return e.componentOffset > -1;
}
function is(e) {
  return (e.flags & 1) === 1;
}
function je(e) {
  return !!e.template;
}
function pr(e) {
  return (e[m] & 512) !== 0;
}
var Jo = class {
  constructor(t, n, r) {
    (this.previousValue = t), (this.currentValue = n), (this.firstChange = r);
  }
  isFirstChange() {
    return this.firstChange;
  }
};
function Wc(e, t, n, r) {
  t !== null ? t.applyValueToInputSignal(t, r) : (e[n] = r);
}
function Ip() {
  return zc;
}
function zc(e) {
  return e.type.prototype.ngOnChanges && (e.setInput = Dp), wp;
}
Ip.ngInherit = !0;
function wp() {
  let e = Zc(this),
    t = e?.current;
  if (t) {
    let n = e.previous;
    if (n === wt) e.previous = t;
    else for (let r in t) n[r] = t[r];
    (e.current = null), this.ngOnChanges(t);
  }
}
function Dp(e, t, n, r, o) {
  let i = this.declaredInputs[r],
    s = Zc(e) || Ep(e, { previous: wt, current: null }),
    a = s.current || (s.current = {}),
    c = s.previous,
    l = c[i];
  (a[i] = new Jo(l && l.currentValue, n, c === wt)), Wc(e, t, o, n);
}
var Gc = "__ngSimpleChanges__";
function Zc(e) {
  return e[Gc] || null;
}
function Ep(e, t) {
  return (e[Gc] = t);
}
var $a = null;
var me = function (e, t, n) {
    $a?.(e, t, n);
  },
  bp = "svg",
  Cp = "math";
function ie(e) {
  for (; Array.isArray(e); ) e = e[te];
  return e;
}
function Qc(e, t) {
  return ie(t[e]);
}
function ne(e, t) {
  return ie(t[e.index]);
}
function ss(e, t) {
  return e.data[t];
}
function xp(e, t) {
  return e[t];
}
function He(e, t) {
  let n = t[e];
  return pe(n) ? n : n[te];
}
function Mp(e) {
  return (e[m] & 4) === 4;
}
function as(e) {
  return (e[m] & 128) === 128;
}
function _p(e) {
  return Ie(e[$]);
}
function Je(e, t) {
  return t == null ? null : e[t];
}
function Yc(e) {
  e[ht] = 0;
}
function Jc(e) {
  e[m] & 1024 || ((e[m] |= 1024), as(e) && Vr(e));
}
function Tp(e, t) {
  for (; e > 0; ) (t = t[St]), e--;
  return t;
}
function jr(e) {
  return !!(e[m] & 9216 || e[oe]?.dirty);
}
function Ko(e) {
  e[ve].changeDetectionScheduler?.notify(8),
    e[m] & 64 && (e[m] |= 1024),
    jr(e) && Vr(e);
}
function Vr(e) {
  e[ve].changeDetectionScheduler?.notify(0);
  let t = Ke(e);
  for (; t !== null && !(t[m] & 8192 || ((t[m] |= 8192), !as(t))); ) t = Ke(t);
}
function Kc(e, t) {
  if ((e[m] & 256) === 256) throw new N(911, !1);
  e[Re] === null && (e[Re] = []), e[Re].push(t);
}
function Np(e, t) {
  if (e[Re] === null) return;
  let n = e[Re].indexOf(t);
  n !== -1 && e[Re].splice(n, 1);
}
function Ke(e) {
  let t = e[$];
  return Ie(t) ? t[$] : t;
}
var w = { lFrame: ll(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
var Xc = !1;
function Sp() {
  return w.lFrame.elementDepthCount;
}
function Op() {
  w.lFrame.elementDepthCount++;
}
function Ap() {
  w.lFrame.elementDepthCount--;
}
function el() {
  return w.bindingsEnabled;
}
function an() {
  return w.skipHydrationRootTNode !== null;
}
function Rp(e) {
  return w.skipHydrationRootTNode === e;
}
function Pp(e) {
  w.skipHydrationRootTNode = e;
}
function kp() {
  w.skipHydrationRootTNode = null;
}
function D() {
  return w.lFrame.lView;
}
function j() {
  return w.lFrame.tView;
}
function Nx(e) {
  return (w.lFrame.contextLView = e), e[q];
}
function Sx(e) {
  return (w.lFrame.contextLView = null), e;
}
function W() {
  let e = tl();
  for (; e !== null && e.type === 64; ) e = e.parent;
  return e;
}
function tl() {
  return w.lFrame.currentTNode;
}
function Kt() {
  let e = w.lFrame,
    t = e.currentTNode;
  return e.isParent ? t : t.parent;
}
function Ve(e, t) {
  let n = w.lFrame;
  (n.currentTNode = e), (n.isParent = t);
}
function nl() {
  return w.lFrame.isParent;
}
function Lp() {
  w.lFrame.isParent = !1;
}
function Fp() {
  return w.lFrame.contextLView;
}
function rl() {
  return Xc;
}
function Ba(e) {
  Xc = e;
}
function Hr() {
  let e = w.lFrame,
    t = e.bindingRootIndex;
  return t === -1 && (t = e.bindingRootIndex = e.tView.bindingStartIndex), t;
}
function jp(e) {
  return (w.lFrame.bindingIndex = e);
}
function Ot() {
  return w.lFrame.bindingIndex++;
}
function ol(e) {
  let t = w.lFrame,
    n = t.bindingIndex;
  return (t.bindingIndex = t.bindingIndex + e), n;
}
function Vp() {
  return w.lFrame.inI18n;
}
function il(e) {
  w.lFrame.inI18n = e;
}
function Hp(e, t) {
  let n = w.lFrame;
  (n.bindingIndex = n.bindingRootIndex = e), Xo(t);
}
function $p() {
  return w.lFrame.currentDirectiveIndex;
}
function Xo(e) {
  w.lFrame.currentDirectiveIndex = e;
}
function Bp(e) {
  let t = w.lFrame.currentDirectiveIndex;
  return t === -1 ? null : e[t];
}
function sl() {
  return w.lFrame.currentQueryIndex;
}
function cs(e) {
  w.lFrame.currentQueryIndex = e;
}
function Up(e) {
  let t = e[y];
  return t.type === 2 ? t.declTNode : t.type === 1 ? e[ae] : null;
}
function al(e, t, n) {
  if (n & M.SkipSelf) {
    let o = t,
      i = e;
    for (; (o = o.parent), o === null && !(n & M.Host); )
      if (((o = Up(i)), o === null || ((i = i[St]), o.type & 10))) break;
    if (o === null) return !1;
    (t = o), (e = i);
  }
  let r = (w.lFrame = cl());
  return (r.currentTNode = t), (r.lView = e), !0;
}
function ls(e) {
  let t = cl(),
    n = e[y];
  (w.lFrame = t),
    (t.currentTNode = n.firstChild),
    (t.lView = e),
    (t.tView = n),
    (t.contextLView = e),
    (t.bindingIndex = n.bindingStartIndex),
    (t.inI18n = !1);
}
function cl() {
  let e = w.lFrame,
    t = e === null ? null : e.child;
  return t === null ? ll(e) : t;
}
function ll(e) {
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
function ul() {
  let e = w.lFrame;
  return (w.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e;
}
var dl = ul;
function us() {
  let e = ul();
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
function qp(e) {
  return (w.lFrame.contextLView = Tp(e, w.lFrame.contextLView))[q];
}
function $e() {
  return w.lFrame.selectedIndex;
}
function Xe(e) {
  w.lFrame.selectedIndex = e;
}
function ds() {
  let e = w.lFrame;
  return ss(e.tView, e.selectedIndex);
}
function fl() {
  return w.lFrame.currentNamespace;
}
var pl = !0;
function $r() {
  return pl;
}
function Me(e) {
  pl = e;
}
function Wp(e, t, n) {
  let { ngOnChanges: r, ngOnInit: o, ngDoCheck: i } = t.type.prototype;
  if (r) {
    let s = zc(t);
    (n.preOrderHooks ??= []).push(e, s),
      (n.preOrderCheckHooks ??= []).push(e, s);
  }
  o && (n.preOrderHooks ??= []).push(0 - e, o),
    i &&
      ((n.preOrderHooks ??= []).push(e, i),
      (n.preOrderCheckHooks ??= []).push(e, i));
}
function fs(e, t) {
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
function Xn(e, t, n) {
  hl(e, t, 3, n);
}
function er(e, t, n, r) {
  (e[m] & 3) === n && hl(e, t, n, r);
}
function No(e, t) {
  let n = e[m];
  (n & 3) === t && ((n &= 16383), (n += 1), (e[m] = n));
}
function hl(e, t, n, r) {
  let o = r !== void 0 ? e[ht] & 65535 : 0,
    i = r ?? -1,
    s = t.length - 1,
    a = 0;
  for (let c = o; c < s; c++)
    if (typeof t[c + 1] == "number") {
      if (((a = t[c]), r != null && a >= r)) break;
    } else
      t[c] < 0 && (e[ht] += 65536),
        (a < i || i == -1) &&
          (zp(e, n, t, c), (e[ht] = (e[ht] & 4294901760) + c + 2)),
        c++;
}
function Ua(e, t) {
  me(4, e, t);
  let n = E(null);
  try {
    t.call(e);
  } finally {
    E(n), me(5, e, t);
  }
}
function zp(e, t, n, r) {
  let o = n[r] < 0,
    i = n[r + 1],
    s = o ? -n[r] : n[r],
    a = e[s];
  o
    ? e[m] >> 14 < e[ht] >> 16 &&
      (e[m] & 3) === t &&
      ((e[m] += 16384), Ua(a, i))
    : Ua(a, i);
}
var vt = -1,
  et = class {
    constructor(t, n, r) {
      (this.factory = t),
        (this.resolving = !1),
        (this.canSeeViewProviders = n),
        (this.injectImpl = r);
    }
  };
function Gp(e) {
  return e instanceof et;
}
function Zp(e) {
  return (e.flags & 8) !== 0;
}
function Qp(e) {
  return (e.flags & 16) !== 0;
}
var So = {},
  ei = class {
    constructor(t, n) {
      (this.injector = t), (this.parentInjector = n);
    }
    get(t, n, r) {
      r = Lr(r);
      let o = this.injector.get(t, So, r);
      return o !== So || n === So ? o : this.parentInjector.get(t, n, r);
    }
  };
function gl(e) {
  return e !== vt;
}
function hr(e) {
  return e & 32767;
}
function Yp(e) {
  return e >> 16;
}
function gr(e, t) {
  let n = Yp(e),
    r = t;
  for (; n > 0; ) (r = r[St]), n--;
  return r;
}
var ti = !0;
function qa(e) {
  let t = ti;
  return (ti = e), t;
}
var Jp = 256,
  ml = Jp - 1,
  yl = 5,
  Kp = 0,
  ye = {};
function Xp(e, t, n) {
  let r;
  typeof n == "string"
    ? (r = n.charCodeAt(0) || 0)
    : n.hasOwnProperty(Ut) && (r = n[Ut]),
    r == null && (r = n[Ut] = Kp++);
  let o = r & ml,
    i = 1 << o;
  t.data[e + (o >> yl)] |= i;
}
function mr(e, t) {
  let n = vl(e, t);
  if (n !== -1) return n;
  let r = t[y];
  r.firstCreatePass &&
    ((e.injectorIndex = t.length),
    Oo(r.data, e),
    Oo(t, null),
    Oo(r.blueprint, null));
  let o = ps(e, t),
    i = e.injectorIndex;
  if (gl(o)) {
    let s = hr(o),
      a = gr(o, t),
      c = a[y].data;
    for (let l = 0; l < 8; l++) t[i + l] = a[s + l] | c[s + l];
  }
  return (t[i + 8] = o), i;
}
function Oo(e, t) {
  e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
}
function vl(e, t) {
  return e.injectorIndex === -1 ||
    (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
    t[e.injectorIndex + 8] === null
    ? -1
    : e.injectorIndex;
}
function ps(e, t) {
  if (e.parent && e.parent.injectorIndex !== -1) return e.parent.injectorIndex;
  let n = 0,
    r = null,
    o = t;
  for (; o !== null; ) {
    if (((r = bl(o)), r === null)) return vt;
    if ((n++, (o = o[St]), r.injectorIndex !== -1))
      return r.injectorIndex | (n << 16);
  }
  return vt;
}
function ni(e, t, n) {
  Xp(e, t, n);
}
function eh(e, t) {
  if (t === "class") return e.classes;
  if (t === "style") return e.styles;
  let n = e.attrs;
  if (n) {
    let r = n.length,
      o = 0;
    for (; o < r; ) {
      let i = n[o];
      if (Tc(i)) break;
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
function Il(e, t, n) {
  if (n & M.Optional || e !== void 0) return e;
  Xi(t, "NodeInjector");
}
function wl(e, t, n, r) {
  if (
    (n & M.Optional && r === void 0 && (r = null), !(n & (M.Self | M.Host)))
  ) {
    let o = e[Et],
      i = re(void 0);
    try {
      return o ? o.get(t, r, n & M.Optional) : Ec(t, r, n & M.Optional);
    } finally {
      re(i);
    }
  }
  return Il(r, t, n);
}
function Dl(e, t, n, r = M.Default, o) {
  if (e !== null) {
    if (t[m] & 2048 && !(r & M.Self)) {
      let s = oh(e, t, n, r, ye);
      if (s !== ye) return s;
    }
    let i = El(e, t, n, r, ye);
    if (i !== ye) return i;
  }
  return wl(t, n, r, o);
}
function El(e, t, n, r, o) {
  let i = nh(n);
  if (typeof i == "function") {
    if (!al(t, e, r)) return r & M.Host ? Il(o, n, r) : wl(t, n, r, o);
    try {
      let s;
      if (((s = i(r)), s == null && !(r & M.Optional))) Xi(n);
      else return s;
    } finally {
      dl();
    }
  } else if (typeof i == "number") {
    let s = null,
      a = vl(e, t),
      c = vt,
      l = r & M.Host ? t[J][ae] : null;
    for (
      (a === -1 || r & M.SkipSelf) &&
      ((c = a === -1 ? ps(e, t) : t[a + 8]),
      c === vt || !za(r, !1)
        ? (a = -1)
        : ((s = t[y]), (a = hr(c)), (t = gr(c, t))));
      a !== -1;

    ) {
      let u = t[y];
      if (Wa(i, a, u.data)) {
        let d = th(a, t, n, s, r, l);
        if (d !== ye) return d;
      }
      (c = t[a + 8]),
        c !== vt && za(r, t[y].data[a + 8] === l) && Wa(i, a, t)
          ? ((s = u), (a = hr(c)), (t = gr(c, t)))
          : (a = -1);
    }
  }
  return o;
}
function th(e, t, n, r, o, i) {
  let s = t[y],
    a = s.data[e + 8],
    c = r == null ? sn(a) && ti : r != s && (a.type & 3) !== 0,
    l = o & M.Host && i === a,
    u = tr(a, s, n, c, l);
  return u !== null ? tt(t, s, u, a) : ye;
}
function tr(e, t, n, r, o) {
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
    if (f && je(f) && f.type === n) return c;
  }
  return null;
}
function tt(e, t, n, r) {
  let o = e[n],
    i = t.data;
  if (Gp(o)) {
    let s = o;
    s.resolving && Sf(Nf(i[n]));
    let a = qa(s.canSeeViewProviders);
    s.resolving = !0;
    let c,
      l = s.injectImpl ? re(s.injectImpl) : null,
      u = al(e, r, M.Default);
    try {
      (o = e[n] = s.factory(void 0, i, e, r)),
        t.firstCreatePass && n >= r.directiveStart && Wp(n, i[n], t);
    } finally {
      l !== null && re(l), qa(a), (s.resolving = !1), dl();
    }
  }
  return o;
}
function nh(e) {
  if (typeof e == "string") return e.charCodeAt(0) || 0;
  let t = e.hasOwnProperty(Ut) ? e[Ut] : void 0;
  return typeof t == "number" ? (t >= 0 ? t & ml : rh) : t;
}
function Wa(e, t, n) {
  let r = 1 << e;
  return !!(n[t + (e >> yl)] & r);
}
function za(e, t) {
  return !(e & M.Self) && !(e & M.Host && t);
}
var Qe = class {
  constructor(t, n) {
    (this._tNode = t), (this._lView = n);
  }
  get(t, n, r) {
    return Dl(this._tNode, this._lView, t, Lr(r), n);
  }
};
function rh() {
  return new Qe(W(), D());
}
function Ox(e) {
  return rn(() => {
    let t = e.prototype.constructor,
      n = t[sr] || ri(t),
      r = Object.prototype,
      o = Object.getPrototypeOf(e.prototype).constructor;
    for (; o && o !== r; ) {
      let i = o[sr] || ri(o);
      if (i && i !== n) return i;
      o = Object.getPrototypeOf(o);
    }
    return (i) => new i();
  });
}
function ri(e) {
  return yc(e)
    ? () => {
        let t = ri(z(e));
        return t && t();
      }
    : It(e);
}
function oh(e, t, n, r, o) {
  let i = e,
    s = t;
  for (; i !== null && s !== null && s[m] & 2048 && !(s[m] & 512); ) {
    let a = El(i, s, n, r | M.Self, ye);
    if (a !== ye) return a;
    let c = i.parent;
    if (!c) {
      let l = s[Bc];
      if (l) {
        let u = l.get(n, ye, r);
        if (u !== ye) return u;
      }
      (c = bl(s)), (s = s[St]);
    }
    i = c;
  }
  return o;
}
function bl(e) {
  let t = e[y],
    n = t.type;
  return n === 2 ? t.declTNode : n === 1 ? e[ae] : null;
}
function Ax(e) {
  return eh(W(), e);
}
function Ga(e, t = null, n = null, r) {
  let o = Cl(e, t, n, r);
  return o.resolveInjectorInitializers(), o;
}
function Cl(e, t = null, n = null, r, o = new Set()) {
  let i = [n || U, sp(e)];
  return (
    (r = r || (typeof e == "object" ? void 0 : X(e))),
    new Qt(i, t || os(), r || null, o)
  );
}
var nt = class e {
  static {
    this.THROW_IF_NOT_FOUND = Wt;
  }
  static {
    this.NULL = new lr();
  }
  static create(t, n) {
    if (Array.isArray(t)) return Ga({ name: "" }, n, t, "");
    {
      let r = t.name ?? "";
      return Ga({ name: r }, t.parent, t.providers, r);
    }
  }
  static {
    this.ɵprov = G({ token: e, providedIn: "any", factory: () => Pe(xc) });
  }
  static {
    this.__NG_ELEMENT_ID__ = -1;
  }
};
var ih = new R("");
ih.__NG_ELEMENT_ID__ = (e) => {
  let t = W();
  if (t === null) throw new N(204, !1);
  if (t.type & 2) return t.value;
  if (e & M.Optional) return null;
  throw new N(204, !1);
};
var sh = "ngOriginalError";
function Ao(e) {
  return e[sh];
}
var xl = !0,
  hs = (() => {
    class e {
      static {
        this.__NG_ELEMENT_ID__ = ah;
      }
      static {
        this.__NG_ENV_ID__ = (n) => n;
      }
    }
    return e;
  })(),
  oi = class extends hs {
    constructor(t) {
      super(), (this._lView = t);
    }
    onDestroy(t) {
      return Kc(this._lView, t), () => Np(this._lView, t);
    }
  };
function ah() {
  return new oi(D());
}
var Br = (() => {
  class e {
    constructor() {
      (this.taskId = 0),
        (this.pendingTasks = new Set()),
        (this.hasPendingTasks = new Ft(!1));
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
      this.ɵprov = G({ token: e, providedIn: "root", factory: () => new e() });
    }
  }
  return e;
})();
var ii = class extends Ne {
    constructor(t = !1) {
      super(),
        (this.destroyRef = void 0),
        (this.pendingTasks = void 0),
        (this.__isAsync = t),
        $c() &&
          ((this.destroyRef = b(hs, { optional: !0 }) ?? void 0),
          (this.pendingTasks = b(Br, { optional: !0 }) ?? void 0));
    }
    emit(t) {
      let n = E(null);
      try {
        super.next(t);
      } finally {
        E(n);
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
      return t instanceof F && t.add(a), a;
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
  be = ii;
function yr(...e) {}
function Ml(e) {
  let t, n;
  function r() {
    e = yr;
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
function Za(e) {
  return (
    queueMicrotask(() => e()),
    () => {
      e = yr;
    }
  );
}
var gs = "isAngularZone",
  vr = gs + "_ID",
  ch = 0,
  ee = class e {
    constructor(t) {
      (this.hasPendingMacrotasks = !1),
        (this.hasPendingMicrotasks = !1),
        (this.isStable = !0),
        (this.onUnstable = new be(!1)),
        (this.onMicrotaskEmpty = new be(!1)),
        (this.onStable = new be(!1)),
        (this.onError = new be(!1));
      let {
        enableLongStackTrace: n = !1,
        shouldCoalesceEventChangeDetection: r = !1,
        shouldCoalesceRunChangeDetection: o = !1,
        scheduleInRootZone: i = xl,
      } = t;
      if (typeof Zone > "u") throw new N(908, !1);
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
        dh(s);
    }
    static isInAngularZone() {
      return typeof Zone < "u" && Zone.current.get(gs) === !0;
    }
    static assertInAngularZone() {
      if (!e.isInAngularZone()) throw new N(909, !1);
    }
    static assertNotInAngularZone() {
      if (e.isInAngularZone()) throw new N(909, !1);
    }
    run(t, n, r) {
      return this._inner.run(t, n, r);
    }
    runTask(t, n, r, o) {
      let i = this._inner,
        s = i.scheduleEventTask("NgZoneEvent: " + o, t, lh, yr, yr);
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
  lh = {};
function ms(e) {
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
function uh(e) {
  if (e.isCheckStableRunning || e.callbackScheduled) return;
  e.callbackScheduled = !0;
  function t() {
    Ml(() => {
      (e.callbackScheduled = !1),
        si(e),
        (e.isCheckStableRunning = !0),
        ms(e),
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
    si(e);
}
function dh(e) {
  let t = () => {
      uh(e);
    },
    n = ch++;
  e._inner = e._inner.fork({
    name: "angular",
    properties: { [gs]: !0, [vr]: n, [vr + n]: !0 },
    onInvokeTask: (r, o, i, s, a, c) => {
      if (fh(c)) return r.invokeTask(i, s, a, c);
      try {
        return Qa(e), r.invokeTask(i, s, a, c);
      } finally {
        ((e.shouldCoalesceEventChangeDetection && s.type === "eventTask") ||
          e.shouldCoalesceRunChangeDetection) &&
          t(),
          Ya(e);
      }
    },
    onInvoke: (r, o, i, s, a, c, l) => {
      try {
        return Qa(e), r.invoke(i, s, a, c, l);
      } finally {
        e.shouldCoalesceRunChangeDetection &&
          !e.callbackScheduled &&
          !ph(c) &&
          t(),
          Ya(e);
      }
    },
    onHasTask: (r, o, i, s) => {
      r.hasTask(i, s),
        o === i &&
          (s.change == "microTask"
            ? ((e._hasPendingMicrotasks = s.microTask), si(e), ms(e))
            : s.change == "macroTask" &&
              (e.hasPendingMacrotasks = s.macroTask));
    },
    onHandleError: (r, o, i, s) => (
      r.handleError(i, s), e.runOutsideAngular(() => e.onError.emit(s)), !1
    ),
  });
}
function si(e) {
  e._hasPendingMicrotasks ||
  ((e.shouldCoalesceEventChangeDetection ||
    e.shouldCoalesceRunChangeDetection) &&
    e.callbackScheduled === !0)
    ? (e.hasPendingMicrotasks = !0)
    : (e.hasPendingMicrotasks = !1);
}
function Qa(e) {
  e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
}
function Ya(e) {
  e._nesting--, ms(e);
}
var ai = class {
  constructor() {
    (this.hasPendingMicrotasks = !1),
      (this.hasPendingMacrotasks = !1),
      (this.isStable = !0),
      (this.onUnstable = new be()),
      (this.onMicrotaskEmpty = new be()),
      (this.onStable = new be()),
      (this.onError = new be());
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
function fh(e) {
  return _l(e, "__ignore_ng_zone__");
}
function ph(e) {
  return _l(e, "__scheduler_tick__");
}
function _l(e, t) {
  return !Array.isArray(e) || e.length !== 1 ? !1 : e[0]?.data?.[t] === !0;
}
var Ct = class {
    constructor() {
      this._console = console;
    }
    handleError(t) {
      let n = this._findOriginalError(t);
      this._console.error("ERROR", t),
        n && this._console.error("ORIGINAL ERROR", n);
    }
    _findOriginalError(t) {
      let n = t && Ao(t);
      for (; n && Ao(n); ) n = Ao(n);
      return n || null;
    }
  },
  hh = new R("", {
    providedIn: "root",
    factory: () => {
      let e = b(ee),
        t = b(Ct);
      return (n) => e.runOutsideAngular(() => t.handleError(n));
    },
  });
function gh() {
  return At(W(), D());
}
function At(e, t) {
  return new Ur(ne(e, t));
}
var Ur = (() => {
  class e {
    constructor(n) {
      this.nativeElement = n;
    }
    static {
      this.__NG_ELEMENT_ID__ = gh;
    }
  }
  return e;
})();
function mh(e) {
  return e instanceof Ur ? e.nativeElement : e;
}
function yh() {
  return this._results[Symbol.iterator]();
}
var ci = class e {
    get changes() {
      return (this._changes ??= new be());
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
      n[Symbol.iterator] || (n[Symbol.iterator] = yh);
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
      let r = $f(t);
      (this._changesDetected = !Hf(this._results, r, n)) &&
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
  vh = "ngSkipHydration",
  Ih = "ngskiphydration";
function Tl(e) {
  let t = e.mergedAttrs;
  if (t === null) return !1;
  for (let n = 0; n < t.length; n += 2) {
    let r = t[n];
    if (typeof r == "number") return !1;
    if (typeof r == "string" && r.toLowerCase() === Ih) return !0;
  }
  return !1;
}
function Nl(e) {
  return e.hasAttribute(vh);
}
function Ir(e) {
  return (e.flags & 128) === 128;
}
function wh(e) {
  if (Ir(e)) return !0;
  let t = e.parent;
  for (; t; ) {
    if (Ir(e) || Tl(t)) return !0;
    t = t.parent;
  }
  return !1;
}
var Sl = new Map(),
  Dh = 0;
function Eh() {
  return Dh++;
}
function bh(e) {
  Sl.set(e[Fr], e);
}
function li(e) {
  Sl.delete(e[Fr]);
}
var Ja = "__ngContext__";
function rt(e, t) {
  pe(t) ? ((e[Ja] = t[Fr]), bh(t)) : (e[Ja] = t);
}
function Ol(e) {
  return Rl(e[Yt]);
}
function Al(e) {
  return Rl(e[fe]);
}
function Rl(e) {
  for (; e !== null && !Ie(e); ) e = e[fe];
  return e;
}
var ui;
function Rx(e) {
  ui = e;
}
function cn() {
  if (ui !== void 0) return ui;
  if (typeof document < "u") return document;
  throw new N(210, !1);
}
var Ch = new R("", { providedIn: "root", factory: () => xh }),
  xh = "ng",
  Mh = new R(""),
  Pl = new R("", { providedIn: "platform", factory: () => "unknown" });
var Px = new R("", {
  providedIn: "root",
  factory: () =>
    cn().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") ||
    null,
});
function _h() {
  let e = new ys();
  return b(Pl) === "browser" && (e.store = Th(cn(), b(Ch))), e;
}
var ys = (() => {
  class e {
    constructor() {
      (this.store = {}), (this.onSerializeCallbacks = {});
    }
    static {
      this.ɵprov = G({ token: e, providedIn: "root", factory: _h });
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
function Th(e, t) {
  let n = e.getElementById(t + "-state");
  if (n?.textContent)
    try {
      return JSON.parse(n.textContent);
    } catch (r) {
      console.warn("Exception while restoring TransferState for app " + t, r);
    }
  return {};
}
var kl = "h",
  Ll = "b",
  di = (function (e) {
    return (e.FirstChild = "f"), (e.NextSibling = "n"), e;
  })(di || {}),
  Nh = "e",
  Sh = "t",
  vs = "c",
  Fl = "x",
  wr = "r",
  Oh = "i",
  Ah = "n",
  jl = "d";
var Rh = "__nghData__",
  Vl = Rh,
  Ro = "ngh",
  Ph = "nghm",
  Hl = () => null;
function kh(e, t, n = !1) {
  let r = e.getAttribute(Ro);
  if (r == null) return null;
  let [o, i] = r.split("|");
  if (((r = n ? i : o), !r)) return null;
  let s = i ? `|${i}` : "",
    a = n ? o : s,
    c = {};
  if (r !== "") {
    let u = t.get(ys, null, { optional: !0 });
    u !== null && (c = u.get(Vl, [])[Number(r)]);
  }
  let l = { data: c, firstChild: e.firstChild ?? null };
  return (
    n && ((l.firstChild = e), qr(l, 0, e.nextSibling)),
    a ? e.setAttribute(Ro, a) : e.removeAttribute(Ro),
    l
  );
}
function Lh() {
  Hl = kh;
}
function Is(e, t, n = !1) {
  return Hl(e, t, n);
}
function Fh(e) {
  let t = e._lView;
  return t[y].type === 2 ? null : (pr(t) && (t = t[k]), t);
}
function jh(e) {
  return e.textContent?.replace(/\s/gm, "");
}
function Vh(e) {
  let t = cn(),
    n = t.createNodeIterator(e, NodeFilter.SHOW_COMMENT, {
      acceptNode(i) {
        let s = jh(i);
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
function qr(e, t, n) {
  (e.segmentHeads ??= {}), (e.segmentHeads[t] = n);
}
function fi(e, t) {
  return e.segmentHeads?.[t] ?? null;
}
function Hh(e, t) {
  let n = e.data,
    r = n[Nh]?.[t] ?? null;
  return r === null && n[vs]?.[t] && (r = ws(e, t)), r;
}
function $l(e, t) {
  return e.data[vs]?.[t] ?? null;
}
function ws(e, t) {
  let n = $l(e, t) ?? [],
    r = 0;
  for (let o of n) r += o[wr] * (o[Fl] ?? 1);
  return r;
}
function $h(e) {
  if (typeof e.disconnectedNodes > "u") {
    let t = e.data[jl];
    e.disconnectedNodes = t ? new Set(t) : null;
  }
  return e.disconnectedNodes;
}
function ln(e, t) {
  if (typeof e.disconnectedNodes > "u") {
    let n = e.data[jl];
    e.disconnectedNodes = n ? new Set(n) : null;
  }
  return !!$h(e)?.has(t);
}
var Wn = new R(""),
  Bl = !1,
  Ul = new R("", { providedIn: "root", factory: () => Bl });
var zn;
function Bh() {
  if (zn === void 0 && ((zn = null), ir.trustedTypes))
    try {
      zn = ir.trustedTypes.createPolicy("angular", {
        createHTML: (e) => e,
        createScript: (e) => e,
        createScriptURL: (e) => e,
      });
    } catch {}
  return zn;
}
function Ds(e) {
  return Bh()?.createHTML(e) || e;
}
var Gn;
function Uh() {
  if (Gn === void 0 && ((Gn = null), ir.trustedTypes))
    try {
      Gn = ir.trustedTypes.createPolicy("angular#unsafe-bypass", {
        createHTML: (e) => e,
        createScript: (e) => e,
        createScriptURL: (e) => e,
      });
    } catch {}
  return Gn;
}
function Ka(e) {
  return Uh()?.createScriptURL(e) || e;
}
var Dr = class {
  constructor(t) {
    this.changingThisBreaksApplicationSecurity = t;
  }
  toString() {
    return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${hc})`;
  }
};
function Wr(e) {
  return e instanceof Dr ? e.changingThisBreaksApplicationSecurity : e;
}
function ql(e, t) {
  let n = qh(e);
  if (n != null && n !== t) {
    if (n === "ResourceURL" && t === "URL") return !0;
    throw new Error(`Required a safe ${t}, got a ${n} (see ${hc})`);
  }
  return n === t;
}
function qh(e) {
  return (e instanceof Dr && e.getTypeName()) || null;
}
function Wh(e) {
  let t = new hi(e);
  return zh() ? new pi(t) : t;
}
var pi = class {
    constructor(t) {
      this.inertDocumentHelper = t;
    }
    getInertBodyElement(t) {
      t = "<body><remove></remove>" + t;
      try {
        let n = new window.DOMParser().parseFromString(Ds(t), "text/html").body;
        return n === null
          ? this.inertDocumentHelper.getInertBodyElement(t)
          : (n.firstChild?.remove(), n);
      } catch {
        return null;
      }
    }
  },
  hi = class {
    constructor(t) {
      (this.defaultDoc = t),
        (this.inertDocument =
          this.defaultDoc.implementation.createHTMLDocument(
            "sanitization-inert"
          ));
    }
    getInertBodyElement(t) {
      let n = this.inertDocument.createElement("template");
      return (n.innerHTML = Ds(t)), n;
    }
  };
function zh() {
  try {
    return !!new window.DOMParser().parseFromString(Ds(""), "text/html");
  } catch {
    return !1;
  }
}
var Gh = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function Wl(e) {
  return (e = String(e)), e.match(Gh) ? e : "unsafe:" + e;
}
function Be(e) {
  let t = {};
  for (let n of e.split(",")) t[n] = !0;
  return t;
}
function un(...e) {
  let t = {};
  for (let n of e) for (let r in n) n.hasOwnProperty(r) && (t[r] = !0);
  return t;
}
var Zh = Be("area,br,col,hr,img,wbr"),
  zl = Be("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
  Gl = Be("rp,rt"),
  Qh = un(Gl, zl),
  Yh = un(
    zl,
    Be(
      "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
    )
  ),
  Jh = un(
    Gl,
    Be(
      "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
    )
  ),
  Kh = un(Zh, Yh, Jh, Qh),
  Zl = Be("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
  Xh = Be(
    "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
  ),
  eg = Be(
    "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
  ),
  tg = un(Zl, Xh, eg);
function ng(e) {
  return "content" in e && rg(e) ? e.content : null;
}
function rg(e) {
  return e.nodeType === Node.ELEMENT_NODE && e.nodeName === "TEMPLATE";
}
var Es = (function (e) {
  return (
    (e[(e.NONE = 0)] = "NONE"),
    (e[(e.HTML = 1)] = "HTML"),
    (e[(e.STYLE = 2)] = "STYLE"),
    (e[(e.SCRIPT = 3)] = "SCRIPT"),
    (e[(e.URL = 4)] = "URL"),
    (e[(e.RESOURCE_URL = 5)] = "RESOURCE_URL"),
    e
  );
})(Es || {});
function og(e) {
  let t = Ql();
  return t ? t.sanitize(Es.URL, e) || "" : ql(e, "URL") ? Wr(e) : Wl(kr(e));
}
function ig(e) {
  let t = Ql();
  if (t) return Ka(t.sanitize(Es.RESOURCE_URL, e) || "");
  if (ql(e, "ResourceURL")) return Ka(Wr(e));
  throw new N(904, !1);
}
function sg(e, t) {
  return (t === "src" &&
    (e === "embed" ||
      e === "frame" ||
      e === "iframe" ||
      e === "media" ||
      e === "script")) ||
    (t === "href" && (e === "base" || e === "link"))
    ? ig
    : og;
}
function kx(e, t, n) {
  return sg(t, n)(e);
}
function Ql() {
  let e = D();
  return e && e[ve].sanitizer;
}
var ag = /^>|^->|<!--|-->|--!>|<!-$/g,
  cg = /(<|>)/g,
  lg = "\u200B$1\u200B";
function ug(e) {
  return e.replace(ag, (t) => t.replace(cg, lg));
}
function dg(e) {
  return e.ownerDocument.body;
}
function Yl(e) {
  return e instanceof Function ? e() : e;
}
function $t(e) {
  return (e ?? b(nt)).get(Pl) === "browser";
}
var gi = (function (e) {
    return (
      (e[(e.Important = 1)] = "Important"),
      (e[(e.DashCase = 2)] = "DashCase"),
      e
    );
  })(gi || {}),
  mi;
function bs(e, t) {
  return mi(e, t);
}
function fg(e) {
  mi === void 0 && (mi = e());
}
function gt(e, t, n, r, o) {
  if (r != null) {
    let i,
      s = !1;
    Ie(r) ? (i = r) : pe(r) && ((s = !0), (r = r[te]));
    let a = ie(r);
    e === 0 && n !== null
      ? o == null
        ? eu(t, n, a)
        : xt(t, n, a, o || null, !0)
      : e === 1 && n !== null
        ? xt(t, n, a, o || null, !0)
        : e === 2
          ? Ts(t, a, s)
          : e === 3 && t.destroyNode(a),
      i != null && Cg(t, e, i, n, o);
  }
}
function Cs(e, t) {
  return e.createText(t);
}
function pg(e, t, n) {
  e.setValue(t, n);
}
function xs(e, t) {
  return e.createComment(ug(t));
}
function zr(e, t, n) {
  return e.createElement(t, n);
}
function hg(e, t) {
  Jl(e, t), (t[te] = null), (t[ae] = null);
}
function gg(e, t, n, r, o, i) {
  (r[te] = o), (r[ae] = t), Zr(e, r, n, 1, o, i);
}
function Jl(e, t) {
  t[ve].changeDetectionScheduler?.notify(9), Zr(e, t, t[O], 2, null, null);
}
function mg(e) {
  let t = e[Yt];
  if (!t) return Po(e[y], e);
  for (; t; ) {
    let n = null;
    if (pe(t)) n = t[Yt];
    else {
      let r = t[H];
      r && (n = r);
    }
    if (!n) {
      for (; t && !t[fe] && t !== e; ) pe(t) && Po(t[y], t), (t = t[$]);
      t === null && (t = e), pe(t) && Po(t[y], t), (n = t && t[fe]);
    }
    t = n;
  }
}
function yg(e, t, n, r) {
  let o = H + r,
    i = n.length;
  r > 0 && (n[o - 1][fe] = t),
    r < i - H ? ((t[fe] = n[o]), Cc(n, H + r, t)) : (n.push(t), (t[fe] = null)),
    (t[$] = n);
  let s = t[Ye];
  s !== null && n !== s && Kl(s, t);
  let a = t[Ce];
  a !== null && a.insertView(e), Ko(t), (t[m] |= 128);
}
function Kl(e, t) {
  let n = e[bt],
    r = t[$];
  if (pe(r)) e[m] |= fr.HasTransplantedViews;
  else {
    let o = r[$][J];
    t[J] !== o && (e[m] |= fr.HasTransplantedViews);
  }
  n === null ? (e[bt] = [t]) : n.push(t);
}
function Ms(e, t) {
  let n = e[bt],
    r = n.indexOf(t);
  n.splice(r, 1);
}
function Xt(e, t) {
  if (e.length <= H) return;
  let n = H + t,
    r = e[n];
  if (r) {
    let o = r[Ye];
    o !== null && o !== e && Ms(o, r), t > 0 && (e[n - 1][fe] = r[fe]);
    let i = cr(e, H + t);
    hg(r[y], r);
    let s = i[Ce];
    s !== null && s.detachView(i[y]),
      (r[$] = null),
      (r[fe] = null),
      (r[m] &= -129);
  }
  return r;
}
function Gr(e, t) {
  if (!(t[m] & 256)) {
    let n = t[O];
    n.destroyNode && Zr(e, t, n, 3, null, null), mg(t);
  }
}
function Po(e, t) {
  if (t[m] & 256) return;
  let n = E(null);
  try {
    (t[m] &= -129),
      (t[m] |= 256),
      t[oe] && lo(t[oe]),
      Ig(e, t),
      vg(e, t),
      t[y].type === 1 && t[O].destroy();
    let r = t[Ye];
    if (r !== null && Ie(t[$])) {
      r !== t[$] && Ms(r, t);
      let o = t[Ce];
      o !== null && o.detachView(e);
    }
    li(t);
  } finally {
    E(n);
  }
}
function vg(e, t) {
  let n = e.cleanup,
    r = t[ur];
  if (n !== null)
    for (let i = 0; i < n.length - 1; i += 2)
      if (typeof n[i] == "string") {
        let s = n[i + 3];
        s >= 0 ? r[s]() : r[-s].unsubscribe(), (i += 2);
      } else {
        let s = r[n[i + 1]];
        n[i].call(s);
      }
  r !== null && (t[ur] = null);
  let o = t[Re];
  if (o !== null) {
    t[Re] = null;
    for (let i = 0; i < o.length; i++) {
      let s = o[i];
      s();
    }
  }
}
function Ig(e, t) {
  let n;
  if (e != null && (n = e.destroyHooks) != null)
    for (let r = 0; r < n.length; r += 2) {
      let o = t[n[r]];
      if (!(o instanceof et)) {
        let i = n[r + 1];
        if (Array.isArray(i))
          for (let s = 0; s < i.length; s += 2) {
            let a = o[i[s]],
              c = i[s + 1];
            me(4, a, c);
            try {
              c.call(a);
            } finally {
              me(5, a, c);
            }
          }
        else {
          me(4, o, i);
          try {
            i.call(o);
          } finally {
            me(5, o, i);
          }
        }
      }
    }
}
function wg(e, t, n) {
  return Xl(e, t.parent, n);
}
function Xl(e, t, n) {
  let r = t;
  for (; r !== null && r.type & 168; ) (t = r), (r = t.parent);
  if (r === null) return n[te];
  {
    let { componentOffset: o } = r;
    if (o > -1) {
      let { encapsulation: i } = e.data[r.directiveStart + o];
      if (i === Gt.None || i === Gt.Emulated) return null;
    }
    return ne(r, n);
  }
}
function xt(e, t, n, r, o) {
  e.insertBefore(t, n, r, o);
}
function eu(e, t, n) {
  e.appendChild(t, n);
}
function Xa(e, t, n, r, o) {
  r !== null ? xt(e, t, n, r, o) : eu(e, t, n);
}
function tu(e, t) {
  return e.parentNode(t);
}
function Dg(e, t) {
  return e.nextSibling(t);
}
function Eg(e, t, n) {
  return ru(e, t, n);
}
function nu(e, t, n) {
  return e.type & 40 ? ne(e, n) : null;
}
var ru = nu,
  yi;
function ou(e, t) {
  (ru = e), (yi = t);
}
function _s(e, t, n, r) {
  let o = wg(e, r, t),
    i = t[O],
    s = r.parent || t[ae],
    a = Eg(s, r, t);
  if (o != null)
    if (Array.isArray(n))
      for (let c = 0; c < n.length; c++) Xa(i, o, n[c], a, !1);
    else Xa(i, o, n, a, !1);
  yi !== void 0 && yi(i, r, t, n, o);
}
function Bt(e, t) {
  if (t !== null) {
    let n = t.type;
    if (n & 3) return ne(t, e);
    if (n & 4) return vi(-1, e[t.index]);
    if (n & 8) {
      let r = t.child;
      if (r !== null) return Bt(e, r);
      {
        let o = e[t.index];
        return Ie(o) ? vi(-1, o) : ie(o);
      }
    } else {
      if (n & 128) return Bt(e, t.next);
      if (n & 32) return bs(t, e)() || ie(e[t.index]);
      {
        let r = iu(e, t);
        if (r !== null) {
          if (Array.isArray(r)) return r[0];
          let o = Ke(e[J]);
          return Bt(o, r);
        } else return Bt(e, t.next);
      }
    }
  }
  return null;
}
function iu(e, t) {
  if (t !== null) {
    let r = e[J][ae],
      o = t.projection;
    return r.projection[o];
  }
  return null;
}
function vi(e, t) {
  let n = H + e + 1;
  if (n < t.length) {
    let r = t[n],
      o = r[y].firstChild;
    if (o !== null) return Bt(r, o);
  }
  return t[xe];
}
function Ts(e, t, n) {
  e.removeChild(null, t, n);
}
function su(e) {
  e.textContent = "";
}
function Ns(e, t, n, r, o, i, s) {
  for (; n != null; ) {
    if (n.type === 128) {
      n = n.next;
      continue;
    }
    let a = r[n.index],
      c = n.type;
    if (
      (s && t === 0 && (a && rt(ie(a), r), (n.flags |= 2)),
      (n.flags & 32) !== 32)
    )
      if (c & 8) Ns(e, t, n.child, r, o, i, !1), gt(t, e, o, a, i);
      else if (c & 32) {
        let l = bs(n, r),
          u;
        for (; (u = l()); ) gt(t, e, o, u, i);
        gt(t, e, o, a, i);
      } else c & 16 ? bg(e, t, r, n, o, i) : gt(t, e, o, a, i);
    n = s ? n.projectionNext : n.next;
  }
}
function Zr(e, t, n, r, o, i) {
  Ns(n, r, e.firstChild, t, o, i, !1);
}
function bg(e, t, n, r, o, i) {
  let s = n[J],
    c = s[ae].projection[r.projection];
  if (Array.isArray(c))
    for (let l = 0; l < c.length; l++) {
      let u = c[l];
      gt(t, e, o, u, i);
    }
  else {
    let l = c,
      u = s[$];
    Ir(r) && (l.flags |= 128), Ns(e, t, l, u, o, i, !0);
  }
}
function Cg(e, t, n, r, o) {
  let i = n[xe],
    s = ie(n);
  i !== s && gt(t, e, r, i, o);
  for (let a = H; a < n.length; a++) {
    let c = n[a];
    Zr(c[y], c, e, t, r, i);
  }
}
function xg(e, t, n, r, o) {
  if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
  else {
    let i = r.indexOf("-") === -1 ? void 0 : gi.DashCase;
    o == null
      ? e.removeStyle(n, r, i)
      : (typeof o == "string" &&
          o.endsWith("!important") &&
          ((o = o.slice(0, -10)), (i |= gi.Important)),
        e.setStyle(n, r, o, i));
  }
}
function Mg(e, t, n) {
  e.setAttribute(t, "style", n);
}
function au(e, t, n) {
  n === "" ? e.removeAttribute(t, "class") : e.setAttribute(t, "class", n);
}
function cu(e, t, n) {
  let { mergedAttrs: r, classes: o, styles: i } = n;
  r !== null && Go(e, t, r),
    o !== null && au(e, t, o),
    i !== null && Mg(e, t, i);
}
var ge = {};
function Lx(e = 1) {
  lu(j(), D(), $e() + e, !1);
}
function lu(e, t, n, r) {
  if (!r)
    if ((t[m] & 3) === 3) {
      let i = e.preOrderCheckHooks;
      i !== null && Xn(t, i, n);
    } else {
      let i = e.preOrderHooks;
      i !== null && er(t, i, 0, n);
    }
  Xe(n);
}
function Ss(e, t = M.Default) {
  let n = D();
  if (n === null) return Pe(e, t);
  let r = W();
  return Dl(r, n, z(e), t);
}
function Fx() {
  let e = "invalid";
  throw new Error(e);
}
function uu(e, t, n, r, o, i) {
  let s = E(null);
  try {
    let a = null;
    o & ke.SignalBased && (a = t[r][we]),
      a !== null && a.transformFn !== void 0 && (i = a.transformFn(i)),
      o & ke.HasDecoratorInputTransform &&
        (i = e.inputTransforms[r].call(t, i)),
      e.setInput !== null ? e.setInput(t, a, i, n, r) : Wc(t, a, r, i);
  } finally {
    E(s);
  }
}
function _g(e, t) {
  let n = e.hostBindingOpCodes;
  if (n !== null)
    try {
      for (let r = 0; r < n.length; r++) {
        let o = n[r];
        if (o < 0) Xe(~o);
        else {
          let i = o,
            s = n[++r],
            a = n[++r];
          Hp(s, i);
          let c = t[i];
          a(2, c);
        }
      }
    } finally {
      Xe(-1);
    }
}
function Qr(e, t, n, r, o, i, s, a, c, l, u) {
  let d = t.blueprint.slice();
  return (
    (d[te] = o),
    (d[m] = r | 4 | 128 | 8 | 64),
    (l !== null || (e && e[m] & 2048)) && (d[m] |= 2048),
    Yc(d),
    (d[$] = d[St] = e),
    (d[q] = n),
    (d[ve] = s || (e && e[ve])),
    (d[O] = a || (e && e[O])),
    (d[Et] = c || (e && e[Et]) || null),
    (d[ae] = i),
    (d[Fr] = Eh()),
    (d[he] = u),
    (d[Bc] = l),
    (d[J] = t.type == 2 ? e[J] : d),
    d
  );
}
function Yr(e, t, n, r, o) {
  let i = e.data[t];
  if (i === null) (i = Os(e, t, n, r, o)), Vp() && (i.flags |= 32);
  else if (i.type & 64) {
    (i.type = n), (i.value = r), (i.attrs = o);
    let s = Kt();
    i.injectorIndex = s === null ? -1 : s.injectorIndex;
  }
  return Ve(i, !0), i;
}
function Os(e, t, n, r, o) {
  let i = tl(),
    s = nl(),
    a = s ? i : i && i.parent,
    c = (e.data[t] = Pg(e, a, n, t, r, o));
  return (
    e.firstChild === null && (e.firstChild = c),
    i !== null &&
      (s
        ? i.child == null && c.parent !== null && (i.child = c)
        : i.next === null && ((i.next = c), (c.prev = i))),
    c
  );
}
function dn(e, t, n, r) {
  if (n === 0) return -1;
  let o = t.length;
  for (let i = 0; i < n; i++) t.push(r), e.blueprint.push(r), e.data.push(null);
  return o;
}
function du(e, t, n, r, o) {
  let i = $e(),
    s = r & 2;
  try {
    Xe(-1), s && t.length > k && lu(e, t, k, !1), me(s ? 2 : 0, o), n(r, o);
  } finally {
    Xe(i), me(s ? 3 : 1, o);
  }
}
function fu(e, t, n) {
  if (qc(t)) {
    let r = E(null);
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
      E(r);
    }
  }
}
function pu(e, t, n) {
  el() && (Hg(e, t, n, ne(n, t)), (n.flags & 64) === 64 && wu(e, t, n));
}
function hu(e, t, n = ne) {
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
function gu(e) {
  let t = e.tView;
  return t === null || t.incompleteFirstPass
    ? (e.tView = As(
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
function As(e, t, n, r, o, i, s, a, c, l, u) {
  let d = k + r,
    p = d + o,
    f = Tg(d, p),
    h = typeof l == "function" ? l() : l;
  return (f[y] = {
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
function Tg(e, t) {
  let n = [];
  for (let r = 0; r < t; r++) n.push(r < e ? null : ge);
  return n;
}
function Ng(e, t, n, r) {
  let i = r.get(Ul, Bl) || n === Gt.ShadowDom,
    s = e.selectRootElement(t, i);
  return Sg(s), s;
}
function Sg(e) {
  mu(e);
}
var mu = () => null;
function Og(e) {
  Nl(e) ? su(e) : Vh(e);
}
function Ag() {
  mu = Og;
}
function Rg(e, t, n, r) {
  let o = bu(t);
  o.push(n), e.firstCreatePass && Cu(e).push(r, o.length - 1);
}
function Pg(e, t, n, r, o, i) {
  let s = t ? t.injectorIndex : -1,
    a = 0;
  return (
    an() && (a |= 128),
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
function ec(e, t, n, r, o) {
  for (let i in t) {
    if (!t.hasOwnProperty(i)) continue;
    let s = t[i];
    if (s === void 0) continue;
    r ??= {};
    let a,
      c = ke.None;
    Array.isArray(s) ? ((a = s[0]), (c = s[1])) : (a = s);
    let l = i;
    if (o !== null) {
      if (!o.hasOwnProperty(i)) continue;
      l = o[i];
    }
    e === 0 ? tc(r, n, l, a, c) : tc(r, n, l, a);
  }
  return r;
}
function tc(e, t, n, r, o) {
  let i;
  e.hasOwnProperty(n) ? (i = e[n]).push(t, r) : (i = e[n] = [t, r]),
    o !== void 0 && i.push(o);
}
function kg(e, t, n) {
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
    (c = ec(0, d.inputs, u, c, f)), (l = ec(1, d.outputs, u, l, h));
    let g = c !== null && s !== null && !ns(t) ? Jg(c, u, s) : null;
    a.push(g);
  }
  c !== null &&
    (c.hasOwnProperty("class") && (t.flags |= 8),
    c.hasOwnProperty("style") && (t.flags |= 16)),
    (t.initialInputs = a),
    (t.inputs = c),
    (t.outputs = l);
}
function Lg(e) {
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
function yu(e, t, n, r, o, i, s, a) {
  let c = ne(t, n),
    l = t.inputs,
    u;
  !a && l != null && (u = l[r])
    ? (Rs(e, n, u, r, o), sn(t) && Fg(n, t.index))
    : t.type & 3
      ? ((r = Lg(r)),
        (o = s != null ? s(o, t.value || "", r) : o),
        i.setProperty(c, r, o))
      : t.type & 12;
}
function Fg(e, t) {
  let n = He(t, e);
  n[m] & 16 || (n[m] |= 64);
}
function vu(e, t, n, r) {
  if (el()) {
    let o = r === null ? null : { "": -1 },
      i = Bg(e, n),
      s,
      a;
    i === null ? (s = a = null) : ([s, a] = i),
      s !== null && Iu(e, t, n, s, o, a),
      o && Ug(n, r, o);
  }
  n.mergedAttrs = Zt(n.mergedAttrs, n.attrs);
}
function Iu(e, t, n, r, o, i) {
  for (let l = 0; l < r.length; l++) ni(mr(n, t), e, r[l].type);
  Wg(n, e.data.length, r.length);
  for (let l = 0; l < r.length; l++) {
    let u = r[l];
    u.providersResolver && u.providersResolver(u);
  }
  let s = !1,
    a = !1,
    c = dn(e, t, r.length, null);
  for (let l = 0; l < r.length; l++) {
    let u = r[l];
    (n.mergedAttrs = Zt(n.mergedAttrs, u.hostAttrs)),
      zg(e, n, t, c, u),
      qg(c, u, o),
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
  kg(e, n, i);
}
function jg(e, t, n, r, o) {
  let i = o.hostBindings;
  if (i) {
    let s = e.hostBindingOpCodes;
    s === null && (s = e.hostBindingOpCodes = []);
    let a = ~t.index;
    Vg(s) != a && s.push(a), s.push(n, r, i);
  }
}
function Vg(e) {
  let t = e.length;
  for (; t > 0; ) {
    let n = e[--t];
    if (typeof n == "number" && n < 0) return n;
  }
  return 0;
}
function Hg(e, t, n, r) {
  let o = n.directiveStart,
    i = n.directiveEnd;
  sn(n) && Gg(t, n, e.data[o + n.componentOffset]),
    e.firstCreatePass || mr(n, t),
    rt(r, t);
  let s = n.initialInputs;
  for (let a = o; a < i; a++) {
    let c = e.data[a],
      l = tt(t, e, a, n);
    if ((rt(l, t), s !== null && Yg(t, a - o, l, c, n, s), je(c))) {
      let u = He(n.index, t);
      u[q] = tt(t, e, a, n);
    }
  }
}
function wu(e, t, n) {
  let r = n.directiveStart,
    o = n.directiveEnd,
    i = n.index,
    s = $p();
  try {
    Xe(i);
    for (let a = r; a < o; a++) {
      let c = e.data[a],
        l = t[a];
      Xo(a),
        (c.hostBindings !== null || c.hostVars !== 0 || c.hostAttrs !== null) &&
          $g(c, l);
    }
  } finally {
    Xe(-1), Xo(s);
  }
}
function $g(e, t) {
  e.hostBindings !== null && e.hostBindings(1, t);
}
function Bg(e, t) {
  let n = e.directiveRegistry,
    r = null,
    o = null;
  if (n)
    for (let i = 0; i < n.length; i++) {
      let s = n[i];
      if (Yf(t, s.selectors, !1))
        if ((r || (r = []), je(s)))
          if (s.findHostDirectiveDefs !== null) {
            let a = [];
            (o = o || new Map()),
              s.findHostDirectiveDefs(s, a, o),
              r.unshift(...a, s);
            let c = a.length;
            Ii(e, t, c);
          } else r.unshift(s), Ii(e, t, 0);
        else
          (o = o || new Map()), s.findHostDirectiveDefs?.(s, r, o), r.push(s);
    }
  return r === null ? null : [r, o];
}
function Ii(e, t, n) {
  (t.componentOffset = n), (e.components ??= []).push(t.index);
}
function Ug(e, t, n) {
  if (t) {
    let r = (e.localNames = []);
    for (let o = 0; o < t.length; o += 2) {
      let i = n[t[o + 1]];
      if (i == null) throw new N(-301, !1);
      r.push(t[o], i);
    }
  }
}
function qg(e, t, n) {
  if (n) {
    if (t.exportAs)
      for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
    je(t) && (n[""] = e);
  }
}
function Wg(e, t, n) {
  (e.flags |= 1),
    (e.directiveStart = t),
    (e.directiveEnd = t + n),
    (e.providerIndexes = t);
}
function zg(e, t, n, r, o) {
  e.data[r] = o;
  let i = o.factory || (o.factory = It(o.type, !0)),
    s = new et(i, je(o), Ss);
  (e.blueprint[r] = s), (n[r] = s), jg(e, t, r, dn(e, n, o.hostVars, ge), o);
}
function Gg(e, t, n) {
  let r = ne(t, e),
    o = gu(n),
    i = e[ve].rendererFactory,
    s = 16;
  n.signals ? (s = 4096) : n.onPush && (s = 64);
  let a = Jr(
    e,
    Qr(e, o, null, s, r, t, null, i.createRenderer(r, n), null, null, null)
  );
  e[t.index] = a;
}
function Zg(e, t, n, r, o, i) {
  let s = ne(e, t);
  Qg(t[O], s, i, e.value, n, r, o);
}
function Qg(e, t, n, r, o, i, s) {
  if (i == null) e.removeAttribute(t, o, n);
  else {
    let a = s == null ? kr(i) : s(i, r || "", o);
    e.setAttribute(t, o, a, n);
  }
}
function Yg(e, t, n, r, o, i) {
  let s = i[t];
  if (s !== null)
    for (let a = 0; a < s.length; ) {
      let c = s[a++],
        l = s[a++],
        u = s[a++],
        d = s[a++];
      uu(r, n, c, l, u, d);
    }
}
function Jg(e, t, n) {
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
function Du(e, t, n, r) {
  return [e, !0, 0, t, null, r, null, n, null, null];
}
function Eu(e, t) {
  let n = e.contentQueries;
  if (n !== null) {
    let r = E(null);
    try {
      for (let o = 0; o < n.length; o += 2) {
        let i = n[o],
          s = n[o + 1];
        if (s !== -1) {
          let a = e.data[s];
          cs(i), a.contentQueries(2, t[s], s);
        }
      }
    } finally {
      E(r);
    }
  }
}
function Jr(e, t) {
  return e[Yt] ? (e[Ha][fe] = t) : (e[Yt] = t), (e[Ha] = t), t;
}
function wi(e, t, n) {
  cs(0);
  let r = E(null);
  try {
    t(e, n);
  } finally {
    E(r);
  }
}
function bu(e) {
  return (e[ur] ??= []);
}
function Cu(e) {
  return (e.cleanup ??= []);
}
function xu(e, t) {
  let n = e[Et],
    r = n ? n.get(Ct, null) : null;
  r && r.handleError(t);
}
function Rs(e, t, n, r, o) {
  for (let i = 0; i < n.length; ) {
    let s = n[i++],
      a = n[i++],
      c = n[i++],
      l = t[s],
      u = e.data[s];
    uu(u, l, r, a, c, o);
  }
}
function Kg(e, t, n) {
  let r = Qc(t, e);
  pg(e[O], r, n);
}
function Xg(e, t) {
  let n = He(t, e),
    r = n[y];
  em(r, n);
  let o = n[te];
  o !== null && n[he] === null && (n[he] = Is(o, n[Et])), Ps(r, n, n[q]);
}
function em(e, t) {
  for (let n = t.length; n < e.blueprint.length; n++) t.push(e.blueprint[n]);
}
function Ps(e, t, n) {
  ls(t);
  try {
    let r = e.viewQuery;
    r !== null && wi(1, r, n);
    let o = e.template;
    o !== null && du(e, t, o, 1, n),
      e.firstCreatePass && (e.firstCreatePass = !1),
      t[Ce]?.finishViewCreation(e),
      e.staticContentQueries && Eu(e, t),
      e.staticViewQueries && wi(2, e.viewQuery, n);
    let i = e.components;
    i !== null && tm(t, i);
  } catch (r) {
    throw (
      (e.firstCreatePass &&
        ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
      r)
    );
  } finally {
    (t[m] &= -5), us();
  }
}
function tm(e, t) {
  for (let n = 0; n < t.length; n++) Xg(e, t[n]);
}
function Kr(e, t, n, r) {
  let o = E(null);
  try {
    let i = t.tView,
      a = e[m] & 4096 ? 4096 : 16,
      c = Qr(
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
    c[Ye] = l;
    let u = e[Ce];
    return u !== null && (c[Ce] = u.createEmbeddedView(i)), Ps(i, c, n), c;
  } finally {
    E(o);
  }
}
function Mu(e, t) {
  let n = H + t;
  if (n < e.length) return e[n];
}
function en(e, t) {
  return !t || t.firstChild === null || Ir(e);
}
function Xr(e, t, n, r = !0) {
  let o = t[y];
  if ((yg(o, t, e, n), r)) {
    let s = vi(n, e),
      a = t[O],
      c = tu(a, e[xe]);
    c !== null && gg(o, e[ae], a, t, c, s);
  }
  let i = t[he];
  i !== null && i.firstChild !== null && (i.firstChild = null);
}
function _u(e, t) {
  let n = Xt(e, t);
  return n !== void 0 && Gr(n[y], n), n;
}
function Er(e, t, n, r, o = !1) {
  for (; n !== null; ) {
    if (n.type === 128) {
      n = o ? n.projectionNext : n.next;
      continue;
    }
    let i = t[n.index];
    i !== null && r.push(ie(i)), Ie(i) && nm(i, r);
    let s = n.type;
    if (s & 8) Er(e, t, n.child, r);
    else if (s & 32) {
      let a = bs(n, t),
        c;
      for (; (c = a()); ) r.push(c);
    } else if (s & 16) {
      let a = iu(t, n);
      if (Array.isArray(a)) r.push(...a);
      else {
        let c = Ke(t[J]);
        Er(c[y], c, a, r, !0);
      }
    }
    n = o ? n.projectionNext : n.next;
  }
  return r;
}
function nm(e, t) {
  for (let n = H; n < e.length; n++) {
    let r = e[n],
      o = r[y].firstChild;
    o !== null && Er(r[y], r, o, t);
  }
  e[xe] !== e[te] && t.push(e[xe]);
}
var Tu = [];
function rm(e) {
  return e[oe] ?? om(e);
}
function om(e) {
  let t = Tu.pop() ?? Object.create(sm);
  return (t.lView = e), t;
}
function im(e) {
  e.lView[oe] !== e && ((e.lView = null), Tu.push(e));
}
var sm = Te(_e({}, Pt), {
  consumerIsAlwaysLive: !0,
  consumerMarkedDirty: (e) => {
    Vr(e.lView);
  },
  consumerOnSignalRead() {
    this.lView[oe] = this;
  },
});
function am(e) {
  let t = e[oe] ?? Object.create(cm);
  return (t.lView = e), t;
}
var cm = Te(_e({}, Pt), {
  consumerIsAlwaysLive: !0,
  consumerMarkedDirty: (e) => {
    let t = Ke(e.lView);
    for (; t && !Nu(t[y]); ) t = Ke(t);
    t && Jc(t);
  },
  consumerOnSignalRead() {
    this.lView[oe] = this;
  },
});
function Nu(e) {
  return e.type !== 2;
}
var lm = 100;
function Su(e, t = !0, n = 0) {
  let r = e[ve],
    o = r.rendererFactory,
    i = !1;
  i || o.begin?.();
  try {
    um(e, n);
  } catch (s) {
    throw (t && xu(e, s), s);
  } finally {
    i || (o.end?.(), r.inlineEffectRunner?.flush());
  }
}
function um(e, t) {
  let n = rl();
  try {
    Ba(!0), Di(e, t);
    let r = 0;
    for (; jr(e); ) {
      if (r === lm) throw new N(103, !1);
      r++, Di(e, 1);
    }
  } finally {
    Ba(n);
  }
}
function dm(e, t, n, r) {
  let o = t[m];
  if ((o & 256) === 256) return;
  let i = !1,
    s = !1;
  !i && t[ve].inlineEffectRunner?.flush(), ls(t);
  let a = !0,
    c = null,
    l = null;
  i ||
    (Nu(e)
      ? ((l = rm(t)), (c = vn(l)))
      : zs() === null
        ? ((a = !1), (l = am(t)), (c = vn(l)))
        : t[oe] && (lo(t[oe]), (t[oe] = null)));
  try {
    Yc(t), jp(e.bindingStartIndex), n !== null && du(e, t, n, 2, r);
    let u = (o & 3) === 3;
    if (!i)
      if (u) {
        let f = e.preOrderCheckHooks;
        f !== null && Xn(t, f, null);
      } else {
        let f = e.preOrderHooks;
        f !== null && er(t, f, 0, null), No(t, 0);
      }
    if ((s || fm(t), Ou(t, 0), e.contentQueries !== null && Eu(e, t), !i))
      if (u) {
        let f = e.contentCheckHooks;
        f !== null && Xn(t, f);
      } else {
        let f = e.contentHooks;
        f !== null && er(t, f, 1), No(t, 1);
      }
    _g(e, t);
    let d = e.components;
    d !== null && Ru(t, d, 0);
    let p = e.viewQuery;
    if ((p !== null && wi(2, p, r), !i))
      if (u) {
        let f = e.viewCheckHooks;
        f !== null && Xn(t, f);
      } else {
        let f = e.viewHooks;
        f !== null && er(t, f, 2), No(t, 2);
      }
    if ((e.firstUpdatePass === !0 && (e.firstUpdatePass = !1), t[To])) {
      for (let f of t[To]) f();
      t[To] = null;
    }
    i || (t[m] &= -73);
  } catch (u) {
    throw (i || Vr(t), u);
  } finally {
    l !== null && (ao(l, c), a && im(l)), us();
  }
}
function Ou(e, t) {
  for (let n = Ol(e); n !== null; n = Al(n))
    for (let r = H; r < n.length; r++) {
      let o = n[r];
      Au(o, t);
    }
}
function fm(e) {
  for (let t = Ol(e); t !== null; t = Al(t)) {
    if (!(t[m] & fr.HasTransplantedViews)) continue;
    let n = t[bt];
    for (let r = 0; r < n.length; r++) {
      let o = n[r];
      Jc(o);
    }
  }
}
function pm(e, t, n) {
  let r = He(t, e);
  Au(r, n);
}
function Au(e, t) {
  as(e) && Di(e, t);
}
function Di(e, t) {
  let r = e[y],
    o = e[m],
    i = e[oe],
    s = !!(t === 0 && o & 16);
  if (
    ((s ||= !!(o & 64 && t === 0)),
    (s ||= !!(o & 1024)),
    (s ||= !!(i?.dirty && co(i))),
    (s ||= !1),
    i && (i.dirty = !1),
    (e[m] &= -9217),
    s)
  )
    dm(r, e, r.template, e[q]);
  else if (o & 8192) {
    Ou(e, 1);
    let a = r.components;
    a !== null && Ru(e, a, 1);
  }
}
function Ru(e, t, n) {
  for (let r = 0; r < t.length; r++) pm(e, t[r], n);
}
function ks(e, t) {
  let n = rl() ? 64 : 1088;
  for (e[ve].changeDetectionScheduler?.notify(t); e; ) {
    e[m] |= n;
    let r = Ke(e);
    if (pr(e) && !r) return e;
    e = r;
  }
  return null;
}
var ot = class {
    get rootNodes() {
      let t = this._lView,
        n = t[y];
      return Er(n, t, n.firstChild, []);
    }
    constructor(t, n, r = !0) {
      (this._lView = t),
        (this._cdRefInjectingView = n),
        (this.notifyErrorHandler = r),
        (this._appRef = null),
        (this._attachedToViewContainer = !1);
    }
    get context() {
      return this._lView[q];
    }
    set context(t) {
      this._lView[q] = t;
    }
    get destroyed() {
      return (this._lView[m] & 256) === 256;
    }
    destroy() {
      if (this._appRef) this._appRef.detachView(this);
      else if (this._attachedToViewContainer) {
        let t = this._lView[$];
        if (Ie(t)) {
          let n = t[dr],
            r = n ? n.indexOf(this) : -1;
          r > -1 && (Xt(t, r), cr(n, r));
        }
        this._attachedToViewContainer = !1;
      }
      Gr(this._lView[y], this._lView);
    }
    onDestroy(t) {
      Kc(this._lView, t);
    }
    markForCheck() {
      ks(this._cdRefInjectingView || this._lView, 4);
    }
    detach() {
      this._lView[m] &= -129;
    }
    reattach() {
      Ko(this._lView), (this._lView[m] |= 128);
    }
    detectChanges() {
      (this._lView[m] |= 1024), Su(this._lView, this.notifyErrorHandler);
    }
    checkNoChanges() {}
    attachToViewContainerRef() {
      if (this._appRef) throw new N(902, !1);
      this._attachedToViewContainer = !0;
    }
    detachFromAppRef() {
      this._appRef = null;
      let t = pr(this._lView),
        n = this._lView[Ye];
      n !== null && !t && Ms(n, this._lView), Jl(this._lView[y], this._lView);
    }
    attachToAppRef(t) {
      if (this._attachedToViewContainer) throw new N(902, !1);
      this._appRef = t;
      let n = pr(this._lView),
        r = this._lView[Ye];
      r !== null && !n && Kl(r, this._lView), Ko(this._lView);
    }
  },
  br = (() => {
    class e {
      static {
        this.__NG_ELEMENT_ID__ = mm;
      }
    }
    return e;
  })(),
  hm = br,
  gm = class extends hm {
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
      let o = Kr(this._declarationLView, this._declarationTContainer, t, {
        embeddedViewInjector: n,
        dehydratedView: r,
      });
      return new ot(o);
    }
  };
function mm() {
  return eo(W(), D());
}
function eo(e, t) {
  return e.type & 4 ? new gm(t, e, At(e, t)) : null;
}
function Pu(e, t, n) {
  let r = t.insertBeforeIndex,
    o = Array.isArray(r) ? r[0] : r;
  return o === null ? nu(e, t, n) : ie(n[o]);
}
function ku(e, t, n, r, o) {
  let i = t.insertBeforeIndex;
  if (Array.isArray(i)) {
    let s = r,
      a = null;
    if (
      (t.type & 3 || ((a = s), (s = o)), s !== null && t.componentOffset === -1)
    )
      for (let c = 1; c < i.length; c++) {
        let l = n[i[c]];
        xt(e, s, l, a, !1);
      }
  }
}
function Lu(e, t) {
  if ((e.push(t), e.length > 1))
    for (let n = e.length - 2; n >= 0; n--) {
      let r = e[n];
      Fu(r) || (ym(r, t) && vm(r) === null && Im(r, t.index));
    }
}
function Fu(e) {
  return !(e.type & 64);
}
function ym(e, t) {
  return Fu(t) || e.index > t.index;
}
function vm(e) {
  let t = e.insertBeforeIndex;
  return Array.isArray(t) ? t[0] : t;
}
function Im(e, t) {
  let n = e.insertBeforeIndex;
  Array.isArray(n) ? (n[0] = t) : (ou(Pu, ku), (e.insertBeforeIndex = t));
}
function wm(e, t, n) {
  let r = e.data[t];
  r === null ? (e.data[t] = n) : (r.value = n);
}
function Dm(e, t) {
  let n = e.insertBeforeIndex;
  n === null
    ? (ou(Pu, ku), (n = e.insertBeforeIndex = [null, t]))
    : (Df(Array.isArray(n), !0, "Expecting array here"), n.push(t));
}
function Em(e, t, n) {
  let r = Os(e, n, 64, null, null);
  return Lu(t, r), r;
}
function bm(e, t) {
  let n = t[e.currentCaseLViewIndex];
  return n === null ? n : n < 0 ? ~n : n;
}
function Cm(e, t, n) {
  return e | (t << 17) | (n << 1);
}
function xm(e) {
  return e === -1;
}
function ju(e, t, n) {
  e.index = 0;
  let r = bm(t, n);
  r !== null ? (e.removes = t.remove[r]) : (e.removes = U);
}
function Ei(e) {
  if (e.index < e.removes.length) {
    let t = e.removes[e.index++];
    if (t > 0) return e.lView[t];
    {
      e.stack.push(e.index, e.removes);
      let n = ~t,
        r = e.lView[y].data[n];
      return ju(e, r, e.lView), Ei(e);
    }
  } else
    return e.stack.length === 0
      ? null
      : ((e.removes = e.stack.pop()), (e.index = e.stack.pop()), Ei(e));
}
function Mm() {
  let e = { stack: [], index: -1 };
  function t(n, r) {
    for (e.lView = r; e.stack.length; ) e.stack.pop();
    return ju(e, n.value, r), Ei.bind(null, e);
  }
  return t;
}
var _m = new RegExp(`^(\\d+)*(${Ll}|${kl})*(.*)`);
function Tm(e) {
  let t = e.match(_m),
    [n, r, o, i] = t,
    s = r ? parseInt(r, 10) : o,
    a = [];
  for (let [c, l, u] of i.matchAll(/(f|n)(\d*)/g)) {
    let d = parseInt(u, 10) || 1;
    a.push(l, d);
  }
  return [s, ...a];
}
function Nm(e) {
  return !e.prev && e.parent?.type === 8;
}
function ko(e) {
  return e.index - k;
}
function Sm(e, t) {
  let n = e.i18nNodes;
  if (n) return n.get(t);
}
function to(e, t, n, r) {
  let o = ko(r),
    i = Sm(e, o);
  if (i === void 0) {
    let s = e.data[Ah];
    if (s?.[o]) i = Am(s[o], n);
    else if (t.firstChild === r) i = e.firstChild;
    else {
      let a = r.prev === null,
        c = r.prev ?? r.parent;
      if (Nm(r)) {
        let l = ko(r.parent);
        i = fi(e, l);
      } else {
        let l = ne(c, n);
        if (a) i = l.firstChild;
        else {
          let u = ko(c),
            d = fi(e, u);
          if (c.type === 2 && d) {
            let f = ws(e, u) + 1;
            i = no(f, d);
          } else i = l.nextSibling;
        }
      }
    }
  }
  return i;
}
function no(e, t) {
  let n = t;
  for (let r = 0; r < e; r++) n = n.nextSibling;
  return n;
}
function Om(e, t) {
  let n = e;
  for (let r = 0; r < t.length; r += 2) {
    let o = t[r],
      i = t[r + 1];
    for (let s = 0; s < i; s++)
      switch (o) {
        case di.FirstChild:
          n = n.firstChild;
          break;
        case di.NextSibling:
          n = n.nextSibling;
          break;
      }
  }
  return n;
}
function Am(e, t) {
  let [n, ...r] = Tm(e),
    o;
  if (n === kl) o = t[J][te];
  else if (n === Ll) o = dg(t[J][te]);
  else {
    let i = Number(n);
    o = ie(t[i + k]);
  }
  return Om(o, r);
}
var Rm = !1,
  Pm = () => {};
function km(e) {
  Rm = e;
}
function Lm(e, t, n, r) {
  Pm(e, t, n, r);
}
function Fm(e) {
  let t = e[he];
  if (t) {
    let { i18nNodes: n, dehydratedIcuData: r } = t;
    if (n && r) {
      let o = e[O];
      for (let i of r.values()) jm(o, n, i);
    }
    (t.i18nNodes = void 0), (t.dehydratedIcuData = void 0);
  }
}
function jm(e, t, n) {
  for (let r of n.node.cases[n.case]) {
    let o = t.get(r.index - k);
    o && Ts(e, o, !1);
  }
}
function Vu(e) {
  let t = e[Jt] ?? [],
    r = e[$][O];
  for (let o of t) Vm(o, r);
  e[Jt] = U;
}
function Vm(e, t) {
  let n = 0,
    r = e.firstChild;
  if (r) {
    let o = e.data[wr];
    for (; n < o; ) {
      let i = r.nextSibling;
      Ts(t, r, !1), (r = i), n++;
    }
  }
}
function Hu(e) {
  Vu(e);
  let t = e[te];
  pe(t) && Cr(t);
  for (let n = H; n < e.length; n++) Cr(e[n]);
}
function Cr(e) {
  Fm(e);
  let t = e[y];
  for (let n = k; n < t.bindingStartIndex; n++)
    if (Ie(e[n])) {
      let r = e[n];
      Hu(r);
    } else pe(e[n]) && Cr(e[n]);
}
function Hm(e) {
  let t = e._views;
  for (let n of t) {
    let r = Fh(n);
    r !== null && r[te] !== null && (pe(r) ? Cr(r) : Hu(r));
  }
}
function $m(e, t) {
  let n = [];
  for (let r of t)
    for (let o = 0; o < (r[Fl] ?? 1); o++) {
      let i = { data: r, firstChild: null };
      r[wr] > 0 && ((i.firstChild = e), (e = no(r[wr], e))), n.push(i);
    }
  return [e, n];
}
var $u = () => null;
function Bm(e, t) {
  let n = e[Jt];
  return !t || n === null || n.length === 0
    ? null
    : n[0].data[Oh] === t
      ? n.shift()
      : (Vu(e), null);
}
function Um() {
  $u = Bm;
}
function tn(e, t) {
  return $u(e, t);
}
var Mt = class {},
  Ls = new R("", { providedIn: "root", factory: () => !1 });
var Bu = new R(""),
  Uu = new R(""),
  bi = class {},
  xr = class {};
function qm(e) {
  let t = Error(`No component factory found for ${X(e)}.`);
  return (t[Wm] = e), t;
}
var Wm = "ngComponent";
var Ci = class {
    resolveComponentFactory(t) {
      throw qm(t);
    }
  },
  _t = class {
    static {
      this.NULL = new Ci();
    }
  },
  Mr = class {},
  Vx = (() => {
    class e {
      constructor() {
        this.destroyNode = null;
      }
      static {
        this.__NG_ELEMENT_ID__ = () => zm();
      }
    }
    return e;
  })();
function zm() {
  let e = D(),
    t = W(),
    n = He(t.index, e);
  return (pe(n) ? n : e)[O];
}
var Gm = (() => {
  class e {
    static {
      this.ɵprov = G({ token: e, providedIn: "root", factory: () => null });
    }
  }
  return e;
})();
function xi(e, t, n) {
  let r = n ? e.styles : null,
    o = n ? e.classes : null,
    i = 0;
  if (t !== null)
    for (let s = 0; s < t.length; s++) {
      let a = t[s];
      if (typeof a == "number") i = a;
      else if (i == 1) o = Uo(o, a);
      else if (i == 2) {
        let c = a,
          l = t[++s];
        r = Uo(r, c + ": " + l + ";");
      }
    }
  n ? (e.styles = r) : (e.stylesWithoutHost = r),
    n ? (e.classes = o) : (e.classesWithoutHost = o);
}
var _r = class extends _t {
  constructor(t) {
    super(), (this.ngModule = t);
  }
  resolveComponentFactory(t) {
    let n = Le(t);
    return new Tt(n, this.ngModule);
  }
};
function nc(e, t) {
  let n = [];
  for (let r in e) {
    if (!e.hasOwnProperty(r)) continue;
    let o = e[r];
    if (o === void 0) continue;
    let i = Array.isArray(o),
      s = i ? o[0] : o,
      a = i ? o[1] : ke.None;
    t
      ? n.push({
          propName: s,
          templateName: r,
          isSignal: (a & ke.SignalBased) !== 0,
        })
      : n.push({ propName: s, templateName: r });
  }
  return n;
}
function Zm(e) {
  let t = e.toLowerCase();
  return t === "svg" ? bp : t === "math" ? Cp : null;
}
var Tt = class extends xr {
    get inputs() {
      let t = this.componentDef,
        n = t.inputTransforms,
        r = nc(t.inputs, !0);
      if (n !== null)
        for (let o of r)
          n.hasOwnProperty(o.propName) && (o.transform = n[o.propName]);
      return r;
    }
    get outputs() {
      return nc(this.componentDef.outputs, !1);
    }
    constructor(t, n) {
      super(),
        (this.componentDef = t),
        (this.ngModule = n),
        (this.componentType = t.type),
        (this.selector = ep(t.selectors)),
        (this.ngContentSelectors = t.ngContentSelectors
          ? t.ngContentSelectors
          : []),
        (this.isBoundToModule = !!n);
    }
    create(t, n, r, o) {
      let i = E(null);
      try {
        o = o || this.ngModule;
        let s = o instanceof Fe ? o : o?.injector;
        s &&
          this.componentDef.getStandaloneInjector !== null &&
          (s = this.componentDef.getStandaloneInjector(s) || s);
        let a = s ? new ei(t, s) : t,
          c = a.get(Mr, null);
        if (c === null) throw new N(407, !1);
        let l = a.get(Gm, null),
          u = a.get(Mt, null),
          d = {
            rendererFactory: c,
            sanitizer: l,
            inlineEffectRunner: null,
            changeDetectionScheduler: u,
          },
          p = c.createRenderer(null, this.componentDef),
          f = this.componentDef.selectors[0][0] || "div",
          h = r
            ? Ng(p, r, this.componentDef.encapsulation, a)
            : zr(p, f, Zm(f)),
          g = 512;
        this.componentDef.signals
          ? (g |= 4096)
          : this.componentDef.onPush || (g |= 16);
        let C = null;
        h !== null && (C = Is(h, a, !0));
        let v = As(0, null, null, 1, 0, null, null, null, null, null, null),
          A = Qr(null, v, null, g, null, null, d, p, a, null, C);
        ls(A);
        let Z,
          B,
          ce = null;
        try {
          let V = this.componentDef,
            Q,
            at = null;
          V.findHostDirectiveDefs
            ? ((Q = []),
              (at = new Map()),
              V.findHostDirectiveDefs(V, Q, at),
              Q.push(V))
            : (Q = [V]);
          let $s = Qm(A, h);
          (ce = Ym($s, h, V, Q, A, d, p)),
            (B = ss(v, k)),
            h && Xm(p, V, h, r),
            n !== void 0 && ey(B, this.ngContentSelectors, n),
            (Z = Km(ce, V, Q, at, A, [ty])),
            Ps(v, A, null);
        } catch (V) {
          throw (ce !== null && li(ce), li(A), V);
        } finally {
          us();
        }
        return new Mi(this.componentType, Z, At(B, A), A, B);
      } finally {
        E(i);
      }
    }
  },
  Mi = class extends bi {
    constructor(t, n, r, o, i) {
      super(),
        (this.location = r),
        (this._rootLView = o),
        (this._tNode = i),
        (this.previousInputValues = null),
        (this.instance = n),
        (this.hostView = this.changeDetectorRef = new ot(o, void 0, !1)),
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
        Rs(i[y], i, o, t, n), this.previousInputValues.set(t, n);
        let s = He(this._tNode.index, i);
        ks(s, 1);
      }
    }
    get injector() {
      return new Qe(this._tNode, this._rootLView);
    }
    destroy() {
      this.hostView.destroy();
    }
    onDestroy(t) {
      this.hostView.onDestroy(t);
    }
  };
function Qm(e, t) {
  let n = e[y],
    r = k;
  return (e[r] = t), Yr(n, r, 2, "#host", null);
}
function Ym(e, t, n, r, o, i, s) {
  let a = o[y];
  Jm(r, e, t, s);
  let c = null;
  t !== null && (c = Is(t, o[Et]));
  let l = i.rendererFactory.createRenderer(t, n),
    u = 16;
  n.signals ? (u = 4096) : n.onPush && (u = 64);
  let d = Qr(o, gu(n), null, u, o[e.index], e, i, l, null, null, c);
  return (
    a.firstCreatePass && Ii(a, e, r.length - 1), Jr(o, d), (o[e.index] = d)
  );
}
function Jm(e, t, n, r) {
  for (let o of e) t.mergedAttrs = Zt(t.mergedAttrs, o.hostAttrs);
  t.mergedAttrs !== null &&
    (xi(t, t.mergedAttrs, !0), n !== null && cu(r, n, t));
}
function Km(e, t, n, r, o, i) {
  let s = W(),
    a = o[y],
    c = ne(s, o);
  Iu(a, o, s, n, null, r);
  for (let u = 0; u < n.length; u++) {
    let d = s.directiveStart + u,
      p = tt(o, a, d, s);
    rt(p, o);
  }
  wu(a, o, s), c && rt(c, o);
  let l = tt(o, a, s.directiveStart + s.componentOffset, s);
  if (((e[q] = o[q] = l), i !== null)) for (let u of i) u(l, t);
  return fu(a, s, o), l;
}
function Xm(e, t, n, r) {
  if (r) Go(e, n, ["ng-version", "18.2.10"]);
  else {
    let { attrs: o, classes: i } = tp(t.selectors[0]);
    o && Go(e, n, o), i && i.length > 0 && au(e, n, i.join(" "));
  }
}
function ey(e, t, n) {
  let r = (e.projection = []);
  for (let o = 0; o < t.length; o++) {
    let i = n[o];
    r.push(i != null ? Array.from(i) : null);
  }
}
function ty() {
  let e = W();
  fs(D()[y], e);
}
var Fs = (() => {
  class e {
    static {
      this.__NG_ELEMENT_ID__ = ny;
    }
  }
  return e;
})();
function ny() {
  let e = W();
  return Wu(e, D());
}
var ry = Fs,
  qu = class extends ry {
    constructor(t, n, r) {
      super(),
        (this._lContainer = t),
        (this._hostTNode = n),
        (this._hostLView = r);
    }
    get element() {
      return At(this._hostTNode, this._hostLView);
    }
    get injector() {
      return new Qe(this._hostTNode, this._hostLView);
    }
    get parentInjector() {
      let t = ps(this._hostTNode, this._hostLView);
      if (gl(t)) {
        let n = gr(t, this._hostLView),
          r = hr(t),
          o = n[y].data[r + 8];
        return new Qe(o, n);
      } else return new Qe(null, this._hostLView);
    }
    clear() {
      for (; this.length > 0; ) this.remove(this.length - 1);
    }
    get(t) {
      let n = rc(this._lContainer);
      return (n !== null && n[t]) || null;
    }
    get length() {
      return this._lContainer.length - H;
    }
    createEmbeddedView(t, n, r) {
      let o, i;
      typeof r == "number"
        ? (o = r)
        : r != null && ((o = r.index), (i = r.injector));
      let s = tn(this._lContainer, t.ssrId),
        a = t.createEmbeddedViewImpl(n || {}, i, s);
      return this.insertImpl(a, o, en(this._hostTNode, s)), a;
    }
    createComponent(t, n, r, o, i) {
      let s = t && !vp(t),
        a;
      if (s) a = n;
      else {
        let h = n || {};
        (a = h.index),
          (r = h.injector),
          (o = h.projectableNodes),
          (i = h.environmentInjector || h.ngModuleRef);
      }
      let c = s ? t : new Tt(Le(t)),
        l = r || this.parentInjector;
      if (!i && c.ngModule == null) {
        let g = (s ? l : this.parentInjector).get(Fe, null);
        g && (i = g);
      }
      let u = Le(c.componentType ?? {}),
        d = tn(this._lContainer, u?.id ?? null),
        p = d?.firstChild ?? null,
        f = c.create(l, o, p, i);
      return this.insertImpl(f.hostView, a, en(this._hostTNode, d)), f;
    }
    insert(t, n) {
      return this.insertImpl(t, n, !0);
    }
    insertImpl(t, n, r) {
      let o = t._lView;
      if (_p(o)) {
        let a = this.indexOf(t);
        if (a !== -1) this.detach(a);
        else {
          let c = o[$],
            l = new qu(c, c[ae], c[$]);
          l.detach(l.indexOf(t));
        }
      }
      let i = this._adjustIndex(n),
        s = this._lContainer;
      return Xr(s, o, i, r), t.attachToViewContainerRef(), Cc(Lo(s), i, t), t;
    }
    move(t, n) {
      return this.insert(t, n);
    }
    indexOf(t) {
      let n = rc(this._lContainer);
      return n !== null ? n.indexOf(t) : -1;
    }
    remove(t) {
      let n = this._adjustIndex(t, -1),
        r = Xt(this._lContainer, n);
      r && (cr(Lo(this._lContainer), n), Gr(r[y], r));
    }
    detach(t) {
      let n = this._adjustIndex(t, -1),
        r = Xt(this._lContainer, n);
      return r && cr(Lo(this._lContainer), n) != null ? new ot(r) : null;
    }
    _adjustIndex(t, n = 0) {
      return t ?? this.length + n;
    }
  };
function rc(e) {
  return e[dr];
}
function Lo(e) {
  return e[dr] || (e[dr] = []);
}
function Wu(e, t) {
  let n,
    r = t[e.index];
  return (
    Ie(r) ? (n = r) : ((n = Du(r, t, null, e)), (t[e.index] = n), Jr(t, n)),
    zu(n, t, e, r),
    new qu(n, e, t)
  );
}
function oy(e, t) {
  let n = e[O],
    r = n.createComment(""),
    o = ne(t, e),
    i = tu(n, o);
  return xt(n, i, r, Dg(n, o), !1), r;
}
var zu = Gu,
  js = () => !1;
function iy(e, t, n) {
  return js(e, t, n);
}
function Gu(e, t, n, r) {
  if (e[xe]) return;
  let o;
  n.type & 8 ? (o = ie(r)) : (o = oy(t, n)), (e[xe] = o);
}
function sy(e, t, n) {
  if (e[xe] && e[Jt]) return !0;
  let r = n[he],
    o = t.index - k;
  if (!r || wh(t) || ln(r, o)) return !1;
  let s = fi(r, o),
    a = r.data[vs]?.[o],
    [c, l] = $m(s, a);
  return (e[xe] = c), (e[Jt] = l), !0;
}
function ay(e, t, n, r) {
  js(e, n, t) || Gu(e, t, n, r);
}
function cy() {
  (zu = ay), (js = sy);
}
var _i = class e {
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
  Ti = class e {
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
        Vs(t, n).matches !== null && this.queries[n].setDirty();
    }
  },
  Ni = class {
    constructor(t, n, r = null) {
      (this.flags = n),
        (this.read = r),
        typeof t == "string" ? (this.predicate = my(t)) : (this.predicate = t);
    }
  },
  Si = class e {
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
  Oi = class e {
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
          this.matchTNodeWithReadOption(t, n, ly(n, i)),
            this.matchTNodeWithReadOption(t, n, tr(n, t, i, !1, !1));
        }
      else
        r === br
          ? n.type & 4 && this.matchTNodeWithReadOption(t, n, -1)
          : this.matchTNodeWithReadOption(t, n, tr(n, t, r, !1, !1));
    }
    matchTNodeWithReadOption(t, n, r) {
      if (r !== null) {
        let o = this.metadata.read;
        if (o !== null)
          if (o === Ur || o === Fs || (o === br && n.type & 4))
            this.addMatch(n.index, -2);
          else {
            let i = tr(n, t, o, !1, !1);
            i !== null && this.addMatch(n.index, i);
          }
        else this.addMatch(n.index, r);
      }
    }
    addMatch(t, n) {
      this.matches === null ? (this.matches = [t, n]) : this.matches.push(t, n);
    }
  };
function ly(e, t) {
  let n = e.localNames;
  if (n !== null) {
    for (let r = 0; r < n.length; r += 2) if (n[r] === t) return n[r + 1];
  }
  return null;
}
function uy(e, t) {
  return e.type & 11 ? At(e, t) : e.type & 4 ? eo(e, t) : null;
}
function dy(e, t, n, r) {
  return n === -1 ? uy(t, e) : n === -2 ? fy(e, t, r) : tt(e, e[y], n, t);
}
function fy(e, t, n) {
  if (n === Ur) return At(t, e);
  if (n === br) return eo(t, e);
  if (n === Fs) return Wu(t, e);
}
function Zu(e, t, n, r) {
  let o = t[Ce].queries[r];
  if (o.matches === null) {
    let i = e.data,
      s = n.matches,
      a = [];
    for (let c = 0; s !== null && c < s.length; c += 2) {
      let l = s[c];
      if (l < 0) a.push(null);
      else {
        let u = i[l];
        a.push(dy(t, u, s[c + 1], n.metadata.read));
      }
    }
    o.matches = a;
  }
  return o.matches;
}
function Ai(e, t, n, r) {
  let o = e.queries.getByIndex(n),
    i = o.matches;
  if (i !== null) {
    let s = Zu(e, t, o, n);
    for (let a = 0; a < i.length; a += 2) {
      let c = i[a];
      if (c > 0) r.push(s[a / 2]);
      else {
        let l = i[a + 1],
          u = t[-c];
        for (let d = H; d < u.length; d++) {
          let p = u[d];
          p[Ye] === p[$] && Ai(p[y], p, l, r);
        }
        if (u[bt] !== null) {
          let d = u[bt];
          for (let p = 0; p < d.length; p++) {
            let f = d[p];
            Ai(f[y], f, l, r);
          }
        }
      }
    }
  }
  return r;
}
function py(e, t) {
  return e[Ce].queries[t].queryList;
}
function hy(e, t, n) {
  let r = new ci((n & 4) === 4);
  return (
    Rg(e, t, r, r.destroy), (t[Ce] ??= new Ti()).queries.push(new _i(r)) - 1
  );
}
function gy(e, t, n, r) {
  let o = j();
  if (o.firstCreatePass) {
    let i = W();
    yy(o, new Ni(t, n, r), i.index),
      vy(o, e),
      (n & 2) === 2 && (o.staticContentQueries = !0);
  }
  return hy(o, D(), n);
}
function my(e) {
  return e.split(",").map((t) => t.trim());
}
function yy(e, t, n) {
  e.queries === null && (e.queries = new Si()), e.queries.track(new Oi(t, n));
}
function vy(e, t) {
  let n = e.contentQueries || (e.contentQueries = []),
    r = n.length ? n[n.length - 1] : -1;
  t !== r && n.push(e.queries.length - 1, t);
}
function Vs(e, t) {
  return e.queries.getByIndex(t);
}
function Iy(e, t) {
  let n = e[y],
    r = Vs(n, t);
  return r.crossesNgTemplate ? Ai(n, e, t, []) : Zu(n, e, r, t);
}
var oc = new Set();
function Ue(e) {
  oc.has(e) ||
    (oc.add(e),
    performance?.mark?.("mark_feature_usage", { detail: { feature: e } }));
}
function wy(e) {
  return typeof e == "function" && e[we] !== void 0;
}
function $x(e, t) {
  Ue("NgSignals");
  let n = ra(e),
    r = n[we];
  return (
    t?.equal && (r.equal = t.equal),
    (n.set = (o) => uo(r, o)),
    (n.update = (o) => oa(r, o)),
    (n.asReadonly = Dy.bind(n)),
    n
  );
}
function Dy() {
  let e = this[we];
  if (e.readonlyFn === void 0) {
    let t = () => this();
    (t[we] = e), (e.readonlyFn = t);
  }
  return e.readonlyFn;
}
function Qu(e) {
  return wy(e) && typeof e.set == "function";
}
function Ey(e) {
  return Object.getPrototypeOf(e.prototype).constructor;
}
function by(e) {
  let t = Ey(e.type),
    n = !0,
    r = [e];
  for (; t; ) {
    let o;
    if (je(e)) o = t.ɵcmp || t.ɵdir;
    else {
      if (t.ɵcmp) throw new N(903, !1);
      o = t.ɵdir;
    }
    if (o) {
      if (n) {
        r.push(o);
        let s = e;
        (s.inputs = Zn(e.inputs)),
          (s.inputTransforms = Zn(e.inputTransforms)),
          (s.declaredInputs = Zn(e.declaredInputs)),
          (s.outputs = Zn(e.outputs));
        let a = o.hostBindings;
        a && Ty(e, a);
        let c = o.viewQuery,
          l = o.contentQueries;
        if (
          (c && My(e, c),
          l && _y(e, l),
          Cy(e, o),
          If(e.outputs, o.outputs),
          je(o) && o.data.animation)
        ) {
          let u = e.data;
          u.animation = (u.animation || []).concat(o.data.animation);
        }
      }
      let i = o.features;
      if (i)
        for (let s = 0; s < i.length; s++) {
          let a = i[s];
          a && a.ngInherit && a(e), a === by && (n = !1);
        }
    }
    t = Object.getPrototypeOf(t);
  }
  xy(r);
}
function Cy(e, t) {
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
function xy(e) {
  let t = 0,
    n = null;
  for (let r = e.length - 1; r >= 0; r--) {
    let o = e[r];
    (o.hostVars = t += o.hostVars),
      (o.hostAttrs = Zt(o.hostAttrs, (n = Zt(n, o.hostAttrs))));
  }
}
function Zn(e) {
  return e === wt ? {} : e === U ? [] : e;
}
function My(e, t) {
  let n = e.viewQuery;
  n
    ? (e.viewQuery = (r, o) => {
        t(r, o), n(r, o);
      })
    : (e.viewQuery = t);
}
function _y(e, t) {
  let n = e.contentQueries;
  n
    ? (e.contentQueries = (r, o, i) => {
        t(r, o, i), n(r, o, i);
      })
    : (e.contentQueries = t);
}
function Ty(e, t) {
  let n = e.hostBindings;
  n
    ? (e.hostBindings = (r, o) => {
        t(r, o), n(r, o);
      })
    : (e.hostBindings = t);
}
function Bx(e) {
  let t = e.inputConfig,
    n = {};
  for (let r in t)
    if (t.hasOwnProperty(r)) {
      let o = t[r];
      Array.isArray(o) && o[3] && (n[r] = o[3]);
    }
  e.inputTransforms = n;
}
var it = class {},
  Ri = class {};
var Pi = class extends it {
    constructor(t, n, r, o = !0) {
      super(),
        (this.ngModuleType = t),
        (this._parent = n),
        (this._bootstrapComponents = []),
        (this.destroyCbs = []),
        (this.componentFactoryResolver = new _r(this));
      let i = Ac(t);
      (this._bootstrapComponents = Yl(i.bootstrap)),
        (this._r3Injector = Cl(
          t,
          n,
          [
            { provide: it, useValue: this },
            { provide: _t, useValue: this.componentFactoryResolver },
            ...r,
          ],
          X(t),
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
  ki = class extends Ri {
    constructor(t) {
      super(), (this.moduleType = t);
    }
    create(t) {
      return new Pi(this.moduleType, t, []);
    }
  };
var Tr = class extends it {
  constructor(t) {
    super(),
      (this.componentFactoryResolver = new _r(this)),
      (this.instance = null);
    let n = new Qt(
      [
        ...t.providers,
        { provide: it, useValue: this },
        { provide: _t, useValue: this.componentFactoryResolver },
      ],
      t.parent || os(),
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
function Ny(e, t, n = null) {
  return new Tr({
    providers: e,
    parent: t,
    debugName: n,
    runEnvironmentInitializers: !0,
  }).injector;
}
function ro(e, t, n) {
  return (e[t] = n);
}
function Sy(e, t) {
  return e[t];
}
function se(e, t, n) {
  let r = e[t];
  return Object.is(r, n) ? !1 : ((e[t] = n), !0);
}
function Yu(e, t, n, r) {
  let o = se(e, t, n);
  return se(e, t + 1, r) || o;
}
function Oy(e, t, n, r, o) {
  let i = Yu(e, t, n, r);
  return se(e, t + 2, o) || i;
}
function fn(e) {
  return (e.flags & 32) === 32;
}
function Ay(e, t, n, r, o, i, s, a, c) {
  let l = t.consts,
    u = Yr(t, e, 4, s || null, a || null);
  vu(t, n, u, Je(l, c)), fs(t, u);
  let d = (u.tView = As(
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
function Li(e, t, n, r, o, i, s, a, c, l) {
  let u = n + k,
    d = t.firstCreatePass ? Ay(u, t, e, r, o, i, s, a, c) : t.data[u];
  Ve(d, !1);
  let p = Ju(t, e, d, n);
  $r() && _s(t, e, p, d), rt(p, e);
  let f = Du(p, e, p, d);
  return (
    (e[u] = f),
    Jr(e, f),
    iy(f, d, e),
    is(d) && pu(t, e, d),
    c != null && hu(e, d, l),
    d
  );
}
function Ry(e, t, n, r, o, i, s, a) {
  let c = D(),
    l = j(),
    u = Je(l.consts, i);
  return Li(c, l, e, t, n, r, o, u, s, a), Ry;
}
var Ju = Ku;
function Ku(e, t, n, r) {
  return Me(!0), t[O].createComment("");
}
function Py(e, t, n, r) {
  let o = t[he],
    i = !o || an() || fn(n) || ln(o, r);
  if ((Me(i), i)) return Ku(e, t, n, r);
  let s = o.data[Sh]?.[r] ?? null;
  s !== null &&
    n.tView !== null &&
    n.tView.ssrId === null &&
    (n.tView.ssrId = s);
  let a = to(o, e, t, n);
  qr(o, r, a);
  let c = ws(o, r);
  return no(c, a);
}
function ky() {
  Ju = Py;
}
var mt = (function (e) {
    return (
      (e[(e.EarlyRead = 0)] = "EarlyRead"),
      (e[(e.Write = 1)] = "Write"),
      (e[(e.MixedReadWrite = 2)] = "MixedReadWrite"),
      (e[(e.Read = 3)] = "Read"),
      e
    );
  })(mt || {}),
  Xu = (() => {
    class e {
      constructor() {
        this.impl = null;
      }
      execute() {
        this.impl?.execute();
      }
      static {
        this.ɵprov = G({
          token: e,
          providedIn: "root",
          factory: () => new e(),
        });
      }
    }
    return e;
  })(),
  Fi = class e {
    constructor() {
      (this.ngZone = b(ee)),
        (this.scheduler = b(Mt)),
        (this.errorHandler = b(Ct, { optional: !0 })),
        (this.sequences = new Set()),
        (this.deferredRegistrations = new Set()),
        (this.executing = !1);
    }
    static {
      this.PHASES = [mt.EarlyRead, mt.Write, mt.MixedReadWrite, mt.Read];
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
      this.ɵprov = G({ token: e, providedIn: "root", factory: () => new e() });
    }
  },
  ji = class {
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
function Ly(e, t) {
  !t?.injector && yp(Ly);
  let n = t?.injector ?? b(nt);
  return $t(n) ? (Ue("NgAfterNextRender"), jy(e, n, t, !0)) : Vy;
}
function Fy(e, t) {
  if (e instanceof Function) {
    let n = [void 0, void 0, void 0, void 0];
    return (n[t] = e), n;
  } else return [e.earlyRead, e.write, e.mixedReadWrite, e.read];
}
function jy(e, t, n, r) {
  let o = t.get(Xu);
  o.impl ??= t.get(Fi);
  let i = n?.phase ?? mt.MixedReadWrite,
    s = n?.manualCleanup !== !0 ? t.get(hs) : null,
    a = new ji(o.impl, Fy(e, i), r, s);
  return o.impl.register(a), a;
}
var Vy = { destroy() {} };
function Hy(e, t, n, r) {
  let o = D(),
    i = Ot();
  if (se(o, i, t)) {
    let s = j(),
      a = ds();
    Zg(a, o, e, t, n, r);
  }
  return Hy;
}
function $y(e, t, n, r) {
  return se(e, Ot(), n) ? t + kr(n) + r : ge;
}
function Qn(e, t) {
  return (e << 17) | (t << 2);
}
function st(e) {
  return (e >> 17) & 32767;
}
function By(e) {
  return (e & 2) == 2;
}
function Uy(e, t) {
  return (e & 131071) | (t << 17);
}
function Vi(e) {
  return e | 2;
}
function Nt(e) {
  return (e & 131068) >> 2;
}
function Fo(e, t) {
  return (e & -131069) | (t << 2);
}
function qy(e) {
  return (e & 1) === 1;
}
function Hi(e) {
  return e | 1;
}
function Wy(e, t, n, r, o, i) {
  let s = i ? t.classBindings : t.styleBindings,
    a = st(s),
    c = Nt(s);
  e[r] = n;
  let l = !1,
    u;
  if (Array.isArray(n)) {
    let d = n;
    (u = d[1]), (u === null || on(d, u) > 0) && (l = !0);
  } else u = n;
  if (o)
    if (c !== 0) {
      let p = st(e[a + 1]);
      (e[r + 1] = Qn(p, a)),
        p !== 0 && (e[p + 1] = Fo(e[p + 1], r)),
        (e[a + 1] = Uy(e[a + 1], r));
    } else
      (e[r + 1] = Qn(a, 0)), a !== 0 && (e[a + 1] = Fo(e[a + 1], r)), (a = r);
  else
    (e[r + 1] = Qn(c, 0)),
      a === 0 ? (a = r) : (e[c + 1] = Fo(e[c + 1], r)),
      (c = r);
  l && (e[r + 1] = Vi(e[r + 1])),
    ic(e, u, r, !0),
    ic(e, u, r, !1),
    zy(t, u, e, r, i),
    (s = Qn(a, c)),
    i ? (t.classBindings = s) : (t.styleBindings = s);
}
function zy(e, t, n, r, o) {
  let i = o ? e.residualClasses : e.residualStyles;
  i != null &&
    typeof t == "string" &&
    on(i, t) >= 0 &&
    (n[r + 1] = Hi(n[r + 1]));
}
function ic(e, t, n, r) {
  let o = e[n + 1],
    i = t === null,
    s = r ? st(o) : Nt(o),
    a = !1;
  for (; s !== 0 && (a === !1 || i); ) {
    let c = e[s],
      l = e[s + 1];
    Gy(c, t) && ((a = !0), (e[s + 1] = r ? Hi(l) : Vi(l))),
      (s = r ? st(l) : Nt(l));
  }
  a && (e[n + 1] = r ? Vi(o) : Hi(o));
}
function Gy(e, t) {
  return e === null || t == null || (Array.isArray(e) ? e[1] : e) === t
    ? !0
    : Array.isArray(e) && typeof t == "string"
      ? on(e, t) >= 0
      : !1;
}
var de = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
function Zy(e) {
  return e.substring(de.key, de.keyEnd);
}
function Qy(e) {
  return Yy(e), ed(e, td(e, 0, de.textEnd));
}
function ed(e, t) {
  let n = de.textEnd;
  return n === t ? -1 : ((t = de.keyEnd = Jy(e, (de.key = t), n)), td(e, t, n));
}
function Yy(e) {
  (de.key = 0),
    (de.keyEnd = 0),
    (de.value = 0),
    (de.valueEnd = 0),
    (de.textEnd = e.length);
}
function td(e, t, n) {
  for (; t < n && e.charCodeAt(t) <= 32; ) t++;
  return t;
}
function Jy(e, t, n) {
  for (; t < n && e.charCodeAt(t) > 32; ) t++;
  return t;
}
function Ky(e, t, n) {
  let r = D(),
    o = Ot();
  if (se(r, o, t)) {
    let i = j(),
      s = ds();
    yu(i, s, r, e, t, r[O], n, !1);
  }
  return Ky;
}
function $i(e, t, n, r, o) {
  let i = t.inputs,
    s = o ? "class" : "style";
  Rs(e, n, i[s], s, r);
}
function Xy(e, t) {
  return tv(e, t, null, !0), Xy;
}
function Ux(e) {
  nv(cv, ev, e, !0);
}
function ev(e, t) {
  for (let n = Qy(t); n >= 0; n = ed(t, n)) ts(e, Zy(t), !0);
}
function tv(e, t, n, r) {
  let o = D(),
    i = j(),
    s = ol(2);
  if ((i.firstUpdatePass && rd(i, e, s, r), t !== ge && se(o, s, t))) {
    let a = i.data[$e()];
    od(i, a, o, o[O], e, (o[s + 1] = uv(t, n)), r, s);
  }
}
function nv(e, t, n, r) {
  let o = j(),
    i = ol(2);
  o.firstUpdatePass && rd(o, null, i, r);
  let s = D();
  if (n !== ge && se(s, i, n)) {
    let a = o.data[$e()];
    if (id(a, r) && !nd(o, i)) {
      let c = r ? a.classesWithoutHost : a.stylesWithoutHost;
      c !== null && (n = Uo(c, n || "")), $i(o, a, s, n, r);
    } else lv(o, a, s, s[O], s[i + 1], (s[i + 1] = av(e, t, n)), r, i);
  }
}
function nd(e, t) {
  return t >= e.expandoStartIndex;
}
function rd(e, t, n, r) {
  let o = e.data;
  if (o[n + 1] === null) {
    let i = o[$e()],
      s = nd(e, n);
    id(i, r) && t === null && !s && (t = !1),
      (t = rv(o, i, t, r)),
      Wy(o, i, t, n, s, r);
  }
}
function rv(e, t, n, r) {
  let o = Bp(e),
    i = r ? t.residualClasses : t.residualStyles;
  if (o === null)
    (r ? t.classBindings : t.styleBindings) === 0 &&
      ((n = jo(null, e, t, n, r)), (n = nn(n, t.attrs, r)), (i = null));
  else {
    let s = t.directiveStylingLast;
    if (s === -1 || e[s] !== o)
      if (((n = jo(o, e, t, n, r)), i === null)) {
        let c = ov(e, t, r);
        c !== void 0 &&
          Array.isArray(c) &&
          ((c = jo(null, e, t, c[1], r)),
          (c = nn(c, t.attrs, r)),
          iv(e, t, r, c));
      } else i = sv(e, t, r);
  }
  return (
    i !== void 0 && (r ? (t.residualClasses = i) : (t.residualStyles = i)), n
  );
}
function ov(e, t, n) {
  let r = n ? t.classBindings : t.styleBindings;
  if (Nt(r) !== 0) return e[st(r)];
}
function iv(e, t, n, r) {
  let o = n ? t.classBindings : t.styleBindings;
  e[st(o)] = r;
}
function sv(e, t, n) {
  let r,
    o = t.directiveEnd;
  for (let i = 1 + t.directiveStylingLast; i < o; i++) {
    let s = e[i].hostAttrs;
    r = nn(r, s, n);
  }
  return nn(r, t.attrs, n);
}
function jo(e, t, n, r, o) {
  let i = null,
    s = n.directiveEnd,
    a = n.directiveStylingLast;
  for (
    a === -1 ? (a = n.directiveStart) : a++;
    a < s && ((i = t[a]), (r = nn(r, i.hostAttrs, o)), i !== e);

  )
    a++;
  return e !== null && (n.directiveStylingLast = a), r;
}
function nn(e, t, n) {
  let r = n ? 1 : 2,
    o = -1;
  if (t !== null)
    for (let i = 0; i < t.length; i++) {
      let s = t[i];
      typeof s == "number"
        ? (o = s)
        : o === r &&
          (Array.isArray(e) || (e = e === void 0 ? [] : ["", e]),
          ts(e, s, n ? !0 : t[++i]));
    }
  return e === void 0 ? null : e;
}
function av(e, t, n) {
  if (n == null || n === "") return U;
  let r = [],
    o = Wr(n);
  if (Array.isArray(o)) for (let i = 0; i < o.length; i++) e(r, o[i], !0);
  else if (typeof o == "object")
    for (let i in o) o.hasOwnProperty(i) && e(r, i, o[i]);
  else typeof o == "string" && t(r, o);
  return r;
}
function cv(e, t, n) {
  let r = String(t);
  r !== "" && !r.includes(" ") && ts(e, r, n);
}
function lv(e, t, n, r, o, i, s, a) {
  o === ge && (o = U);
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
      h !== null && od(e, t, n, r, h, g, s, a),
      (u = c < o.length ? o[c] : null),
      (d = l < i.length ? i[l] : null);
  }
}
function od(e, t, n, r, o, i, s, a) {
  if (!(t.type & 3)) return;
  let c = e.data,
    l = c[a + 1],
    u = qy(l) ? sc(c, t, n, o, Nt(l), s) : void 0;
  if (!Nr(u)) {
    Nr(i) || (By(l) && (i = sc(c, null, n, o, a, s)));
    let d = Qc($e(), n);
    xg(r, s, d, o, i);
  }
}
function sc(e, t, n, r, o, i) {
  let s = t === null,
    a;
  for (; o > 0; ) {
    let c = e[o],
      l = Array.isArray(c),
      u = l ? c[1] : c,
      d = u === null,
      p = n[o + 1];
    p === ge && (p = d ? U : void 0);
    let f = d ? Mo(p, r) : u === r ? p : void 0;
    if ((l && !Nr(f) && (f = Mo(c, r)), Nr(f) && ((a = f), s))) return a;
    let h = e[o + 1];
    o = s ? st(h) : Nt(h);
  }
  if (t !== null) {
    let c = i ? t.residualClasses : t.residualStyles;
    c != null && (a = Mo(c, r));
  }
  return a;
}
function Nr(e) {
  return e !== void 0;
}
function uv(e, t) {
  return (
    e == null ||
      e === "" ||
      (typeof t == "string"
        ? (e = e + t)
        : typeof e == "object" && (e = X(Wr(e)))),
    e
  );
}
function id(e, t) {
  return (e.flags & (t ? 8 : 16)) !== 0;
}
var Bi = class {
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
function Vo(e, t, n, r, o) {
  return e === n && Object.is(t, r) ? 1 : Object.is(o(e, t), o(n, r)) ? -1 : 0;
}
function dv(e, t, n) {
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
        d = Vo(i, l, i, u, n);
      if (d !== 0) {
        d < 0 && e.updateValue(i, u), i++;
        continue;
      }
      let p = e.at(s),
        f = t[c],
        h = Vo(s, p, c, f, n);
      if (h !== 0) {
        h < 0 && e.updateValue(s, f), s--, c--;
        continue;
      }
      let g = n(i, l),
        C = n(s, p),
        v = n(i, u);
      if (Object.is(v, C)) {
        let A = n(c, f);
        Object.is(A, g)
          ? (e.swap(i, s), e.updateValue(s, f), c--, s--)
          : e.move(s, i),
          e.updateValue(i, u),
          i++;
        continue;
      }
      if (((r ??= new Sr()), (o ??= cc(e, i, s, n)), Ui(e, r, i, v)))
        e.updateValue(i, u), i++, s++;
      else if (o.has(v)) r.set(g, e.detach(i)), s--;
      else {
        let A = e.create(i, t[i]);
        e.attach(i, A), i++, s++;
      }
    }
    for (; i <= c; ) ac(e, r, n, i, t[i]), i++;
  } else if (t != null) {
    let c = t[Symbol.iterator](),
      l = c.next();
    for (; !l.done && i <= s; ) {
      let u = e.at(i),
        d = l.value,
        p = Vo(i, u, i, d, n);
      if (p !== 0) p < 0 && e.updateValue(i, d), i++, (l = c.next());
      else {
        (r ??= new Sr()), (o ??= cc(e, i, s, n));
        let f = n(i, d);
        if (Ui(e, r, i, f)) e.updateValue(i, d), i++, s++, (l = c.next());
        else if (!o.has(f))
          e.attach(i, e.create(i, d)), i++, s++, (l = c.next());
        else {
          let h = n(i, u);
          r.set(h, e.detach(i)), s--;
        }
      }
    }
    for (; !l.done; ) ac(e, r, n, e.length, l.value), (l = c.next());
  }
  for (; i <= s; ) e.destroy(e.detach(s--));
  r?.forEach((c) => {
    e.destroy(c);
  });
}
function Ui(e, t, n, r) {
  return t !== void 0 && t.has(r)
    ? (e.attach(n, t.get(r)), t.delete(r), !0)
    : !1;
}
function ac(e, t, n, r, o) {
  if (Ui(e, t, r, n(r, o))) e.updateValue(r, o);
  else {
    let i = e.create(r, o);
    e.attach(r, i);
  }
}
function cc(e, t, n, r) {
  let o = new Set();
  for (let i = t; i <= n; i++) o.add(r(i, e.at(i)));
  return o;
}
var Sr = class {
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
function qx(e, t) {
  Ue("NgControlFlow");
  let n = D(),
    r = Ot(),
    o = n[r] !== ge ? n[r] : -1,
    i = o !== -1 ? Or(n, k + o) : void 0,
    s = 0;
  if (se(n, r, e)) {
    let a = E(null);
    try {
      if ((i !== void 0 && _u(i, s), e !== -1)) {
        let c = k + e,
          l = Or(n, c),
          u = Gi(n[y], c),
          d = tn(l, u.tView.ssrId),
          p = Kr(n, u, t, { dehydratedView: d });
        Xr(l, p, s, en(u, d));
      }
    } finally {
      E(a);
    }
  } else if (i !== void 0) {
    let a = Mu(i, s);
    a !== void 0 && (a[q] = t);
  }
}
var qi = class {
  constructor(t, n, r) {
    (this.lContainer = t), (this.$implicit = n), (this.$index = r);
  }
  get $count() {
    return this.lContainer.length - H;
  }
};
function Wx(e) {
  return e;
}
var Wi = class {
  constructor(t, n, r) {
    (this.hasEmptyBlock = t), (this.trackByFn = n), (this.liveCollection = r);
  }
};
function zx(e, t, n, r, o, i, s, a, c, l, u, d, p) {
  Ue("NgControlFlow");
  let f = D(),
    h = j(),
    g = c !== void 0,
    C = D(),
    v = a ? s.bind(C[J][q]) : s,
    A = new Wi(g, v);
  (C[k + e] = A),
    Li(f, h, e + 1, t, n, r, o, Je(h.consts, i)),
    g && Li(f, h, e + 2, c, l, u, d, Je(h.consts, p));
}
var zi = class extends Bi {
  constructor(t, n, r) {
    super(),
      (this.lContainer = t),
      (this.hostLView = n),
      (this.templateTNode = r),
      (this.operationsCounter = void 0),
      (this.needsIndexUpdate = !1);
  }
  get length() {
    return this.lContainer.length - H;
  }
  at(t) {
    return this.getLView(t)[q].$implicit;
  }
  attach(t, n) {
    let r = n[he];
    (this.needsIndexUpdate ||= t !== this.length),
      Xr(this.lContainer, n, t, en(this.templateTNode, r));
  }
  detach(t) {
    return (
      (this.needsIndexUpdate ||= t !== this.length - 1), fv(this.lContainer, t)
    );
  }
  create(t, n) {
    let r = tn(this.lContainer, this.templateTNode.tView.ssrId),
      o = Kr(
        this.hostLView,
        this.templateTNode,
        new qi(this.lContainer, n, t),
        { dehydratedView: r }
      );
    return this.operationsCounter?.recordCreate(), o;
  }
  destroy(t) {
    Gr(t[y], t), this.operationsCounter?.recordDestroy();
  }
  updateValue(t, n) {
    this.getLView(t)[q].$implicit = n;
  }
  reset() {
    (this.needsIndexUpdate = !1), this.operationsCounter?.reset();
  }
  updateIndexes() {
    if (this.needsIndexUpdate)
      for (let t = 0; t < this.length; t++) this.getLView(t)[q].$index = t;
  }
  getLView(t) {
    return pv(this.lContainer, t);
  }
};
function Gx(e) {
  let t = E(null),
    n = $e();
  try {
    let r = D(),
      o = r[y],
      i = r[n],
      s = n + 1,
      a = Or(r, s);
    if (i.liveCollection === void 0) {
      let l = Gi(o, s);
      i.liveCollection = new zi(a, r, l);
    } else i.liveCollection.reset();
    let c = i.liveCollection;
    if ((dv(c, e, i.trackByFn), c.updateIndexes(), i.hasEmptyBlock)) {
      let l = Ot(),
        u = c.length === 0;
      if (se(r, l, u)) {
        let d = n + 2,
          p = Or(r, d);
        if (u) {
          let f = Gi(o, d),
            h = tn(p, f.tView.ssrId),
            g = Kr(r, f, void 0, { dehydratedView: h });
          Xr(p, g, 0, en(f, h));
        } else _u(p, 0);
      }
    }
  } finally {
    E(t);
  }
}
function Or(e, t) {
  return e[t];
}
function fv(e, t) {
  return Xt(e, t);
}
function pv(e, t) {
  return Mu(e, t);
}
function Gi(e, t) {
  return ss(e, t);
}
function hv(e, t, n, r, o, i) {
  let s = t.consts,
    a = Je(s, o),
    c = Yr(t, e, 2, r, a);
  return (
    vu(t, n, c, Je(s, i)),
    c.attrs !== null && xi(c, c.attrs, !1),
    c.mergedAttrs !== null && xi(c, c.mergedAttrs, !0),
    t.queries !== null && t.queries.elementStart(t, c),
    c
  );
}
function sd(e, t, n, r) {
  let o = D(),
    i = j(),
    s = k + e,
    a = o[O],
    c = i.firstCreatePass ? hv(s, i, o, t, n, r) : i.data[s],
    l = cd(i, o, c, a, t, e);
  o[s] = l;
  let u = is(c);
  return (
    Ve(c, !0),
    cu(a, l, c),
    !fn(c) && $r() && _s(i, o, l, c),
    Sp() === 0 && rt(l, o),
    Op(),
    u && (pu(i, o, c), fu(i, c, o)),
    r !== null && hu(o, c),
    sd
  );
}
function ad() {
  let e = W();
  nl() ? Lp() : ((e = e.parent), Ve(e, !1));
  let t = e;
  Rp(t) && kp(), Ap();
  let n = j();
  return (
    n.firstCreatePass && (fs(n, e), qc(e) && n.queries.elementEnd(e)),
    t.classesWithoutHost != null &&
      Zp(t) &&
      $i(n, t, D(), t.classesWithoutHost, !0),
    t.stylesWithoutHost != null &&
      Qp(t) &&
      $i(n, t, D(), t.stylesWithoutHost, !1),
    ad
  );
}
function gv(e, t, n, r) {
  return sd(e, t, n, r), ad(), gv;
}
var cd = (e, t, n, r, o, i) => (Me(!0), zr(r, o, fl()));
function mv(e, t, n, r, o, i) {
  let s = t[he],
    a = !s || an() || fn(n) || ln(s, i);
  if ((Me(a), a)) return zr(r, o, fl());
  let c = to(s, e, t, n);
  return (
    $l(s, i) && qr(s, i, c.nextSibling),
    s && (Tl(n) || Nl(c)) && sn(n) && (Pp(n), su(c)),
    c
  );
}
function yv() {
  cd = mv;
}
var vv = (e, t, n, r) => (Me(!0), xs(t[O], ""));
function Iv(e, t, n, r) {
  let o,
    i = t[he],
    s = !i || an() || ln(i, r) || fn(n);
  if ((Me(s), s)) return xs(t[O], "");
  let a = to(i, e, t, n),
    c = Hh(i, r);
  return qr(i, r, a), (o = no(c, a)), o;
}
function wv() {
  vv = Iv;
}
function Zx() {
  return D();
}
var Ar = "en-US";
var Dv = { marker: "element" },
  Ev = { marker: "ICU" },
  Ee = (function (e) {
    return (
      (e[(e.SHIFT = 2)] = "SHIFT"),
      (e[(e.APPEND_EAGERLY = 1)] = "APPEND_EAGERLY"),
      (e[(e.COMMENT = 2)] = "COMMENT"),
      e
    );
  })(Ee || {}),
  bv = Ar;
function Cv(e) {
  typeof e == "string" && (bv = e.toLowerCase().replace(/_/g, "-"));
}
function xv(e, t, n) {
  let r = e[O];
  switch (n) {
    case Node.COMMENT_NODE:
      return xs(r, t);
    case Node.TEXT_NODE:
      return Cs(r, t);
    case Node.ELEMENT_NODE:
      return zr(r, t, null);
  }
}
var Mv = (e, t, n, r) => (Me(!0), xv(e, n, r));
function _v(e, t, n, r) {
  let o = e[O];
  for (let i = 0; i < t.length; i++) {
    let s = t[i++],
      a = t[i],
      c = (s & Ee.COMMENT) === Ee.COMMENT,
      l = (s & Ee.APPEND_EAGERLY) === Ee.APPEND_EAGERLY,
      u = s >>> Ee.SHIFT,
      d = e[u],
      p = !1;
    d === null &&
      ((d = e[u] = Mv(e, u, a, c ? Node.COMMENT_NODE : Node.TEXT_NODE)),
      (p = $r())),
      l && n !== null && p && xt(o, n, d, r, !1);
  }
}
var Rr = /�(\d+):?\d*�/gi;
var Tv = /�(\d+)�/,
  ld = /^\s*(�\d+:?\d*�)\s*,\s*(select|plural)\s*,/,
  qt = "\uFFFD",
  Nv = /�\/?\*(\d+:\d+)�/gi,
  Sv = /�(\/?[#*]\d+):?\d*�/gi,
  Ov = /\uE500/g;
function Av(e) {
  return e.replace(Ov, " ");
}
function Rv(e, t, n, r, o, i) {
  let s = Kt(),
    a = [],
    c = [],
    l = [[]],
    u = [[]];
  o = kv(o, i);
  let d = Av(o).split(Sv);
  for (let p = 0; p < d.length; p++) {
    let f = d[p];
    if (p & 1) {
      let h = f.charCodeAt(0) === 47,
        g = f.charCodeAt(h ? 1 : 0),
        C = k + Number.parseInt(f.substring(h ? 2 : 1));
      if (h) l.shift(), u.shift(), Ve(Kt(), !1);
      else {
        let v = Em(e, l[0], C);
        l.unshift([]), Ve(v, !0);
        let A = { kind: 2, index: C, children: [], type: g === 35 ? 0 : 1 };
        u[0].push(A), u.unshift(A.children);
      }
    } else {
      let h = Zi(f);
      for (let g = 0; g < h.length; g++) {
        let C = h[g];
        if (g & 1) {
          let v = C;
          if (typeof v != "object")
            throw new Error(
              `Unable to parse ICU expression in "${o}" message.`
            );
          let Z = ud(e, s, l[0], n, a, "", !0).index;
          fd(u[0], e, n, c, t, v, Z);
        } else {
          let v = C;
          v !== "" && Pv(u[0], e, s, l[0], a, c, n, v);
        }
      }
    }
  }
  e.data[r] = { create: a, update: c, ast: u[0], parentTNodeIndex: t };
}
function ud(e, t, n, r, o, i, s) {
  let a = dn(e, r, 1, null),
    c = a << Ee.SHIFT,
    l = Kt();
  t === l && (l = null),
    l === null && (c |= Ee.APPEND_EAGERLY),
    s && ((c |= Ee.COMMENT), fg(Mm)),
    o.push(c, i === null ? "" : i);
  let u = Os(e, a, s ? 32 : 1, i === null ? "" : i, null);
  Lu(n, u);
  let d = u.index;
  return Ve(u, !1), l !== null && t !== l && Dm(l, d), u;
}
function Pv(e, t, n, r, o, i, s, a) {
  let c = a.match(Rr),
    u = ud(t, n, r, s, o, c ? null : a, !1).index;
  c && nr(i, a, u, null, 0, null), e.push({ kind: 0, index: u });
}
function nr(e, t, n, r, o, i) {
  let s = e.length,
    a = s + 1;
  e.push(null, null);
  let c = s + 2,
    l = t.split(Rr),
    u = 0;
  for (let d = 0; d < l.length; d++) {
    let p = l[d];
    if (d & 1) {
      let f = o + parseInt(p, 10);
      e.push(-1 - f), (u = u | dd(f));
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
function dd(e) {
  return 1 << Math.min(e, 31);
}
function lc(e) {
  let t,
    n = "",
    r = 0,
    o = !1,
    i;
  for (; (t = Nv.exec(e)) !== null; )
    o
      ? t[0] === `${qt}/*${i}${qt}` && ((r = t.index), (o = !1))
      : ((n += e.substring(r, t.index + t[0].length)), (i = t[1]), (o = !0));
  return (n += e.slice(r)), n;
}
function kv(e, t) {
  if (xm(t)) return lc(e);
  {
    let n = e.indexOf(`:${t}${qt}`) + 2 + t.toString().length,
      r = e.search(new RegExp(`${qt}\\/\\*\\d+:${t}${qt}`));
    return lc(e.substring(n, r));
  }
}
function fd(e, t, n, r, o, i, s) {
  let a = 0,
    c = {
      type: i.type,
      currentCaseLViewIndex: dn(t, n, 1, null),
      anchorIdx: s,
      cases: [],
      create: [],
      remove: [],
      update: [],
    };
  Vv(r, i, s), wm(t, s, c);
  let l = i.values,
    u = [];
  for (let d = 0; d < l.length; d++) {
    let p = l[d],
      f = [];
    for (let g = 0; g < p.length; g++) {
      let C = p[g];
      if (typeof C != "string") {
        let v = f.push(C) - 1;
        p[g] = `<!--\uFFFD${v}\uFFFD-->`;
      }
    }
    let h = [];
    u.push(h), (a = Fv(h, t, c, n, r, o, i.cases[d], p.join(""), f) | a);
  }
  a && Hv(r, a, s),
    e.push({
      kind: 3,
      index: s,
      cases: u,
      currentCaseLViewIndex: c.currentCaseLViewIndex,
    });
}
function Lv(e) {
  let t = [],
    n = [],
    r = 1,
    o = 0;
  e = e.replace(ld, function (s, a, c) {
    return (
      c === "select" ? (r = 0) : (r = 1), (o = parseInt(a.slice(1), 10)), ""
    );
  });
  let i = Zi(e);
  for (let s = 0; s < i.length; ) {
    let a = i[s++].trim();
    r === 1 && (a = a.replace(/\s*(?:=)?(\w+)\s*/, "$1")),
      a.length && t.push(a);
    let c = Zi(i[s++]);
    t.length > n.length && n.push(c);
  }
  return { type: r, mainBinding: o, cases: t, values: n };
}
function Zi(e) {
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
        ld.test(c) ? r.push(Lv(c)) : r.push(c), (t = a + 1);
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
function Fv(e, t, n, r, o, i, s, a, c) {
  let l = [],
    u = [],
    d = [];
  n.cases.push(s), n.create.push(l), n.remove.push(u), n.update.push(d);
  let f = Wh(cn()).getInertBodyElement(a),
    h = ng(f) || f;
  return h ? pd(e, t, n, r, o, l, u, d, h, i, c, 0) : 0;
}
function pd(e, t, n, r, o, i, s, a, c, l, u, d) {
  let p = 0,
    f = c.firstChild;
  for (; f; ) {
    let h = dn(t, r, 1, null);
    switch (f.nodeType) {
      case Node.ELEMENT_NODE:
        let g = f,
          C = g.tagName.toLowerCase();
        if (Kh.hasOwnProperty(C)) {
          Ho(i, Dv, C, l, h), (t.data[h] = C);
          let B = g.attributes;
          for (let V = 0; V < B.length; V++) {
            let Q = B.item(V),
              at = Q.name.toLowerCase();
            !!Q.value.match(Rr)
              ? tg.hasOwnProperty(at) &&
                (Zl[at]
                  ? nr(a, Q.value, h, Q.name, 0, Wl)
                  : nr(a, Q.value, h, Q.name, 0, null))
              : $v(i, h, Q);
          }
          let ce = { kind: 1, index: h, children: [] };
          e.push(ce),
            (p = pd(ce.children, t, n, r, o, i, s, a, f, h, u, d + 1) | p),
            uc(s, h, d);
        }
        break;
      case Node.TEXT_NODE:
        let v = f.textContent || "",
          A = v.match(Rr);
        Ho(i, null, A ? "" : v, l, h),
          uc(s, h, d),
          A && (p = nr(a, v, h, null, 0, null) | p),
          e.push({ kind: 0, index: h });
        break;
      case Node.COMMENT_NODE:
        let Z = Tv.exec(f.textContent || "");
        if (Z) {
          let B = parseInt(Z[1], 10),
            ce = u[B];
          Ho(i, Ev, "", l, h), fd(e, t, r, o, l, ce, h), jv(s, h, d);
        }
        break;
    }
    f = f.nextSibling;
  }
  return p;
}
function uc(e, t, n) {
  n === 0 && e.push(t);
}
function jv(e, t, n) {
  n === 0 && (e.push(~t), e.push(t));
}
function Vv(e, t, n) {
  e.push(dd(t.mainBinding), 2, -1 - t.mainBinding, (n << 2) | 2);
}
function Hv(e, t, n) {
  e.push(t, 1, (n << 2) | 3);
}
function Ho(e, t, n, r, o) {
  t !== null && e.push(t), e.push(n, o, Cm(0, r, o));
}
function $v(e, t, n) {
  e.push((t << 1) | 1, n.name, n.value);
}
function Bv(e, t, n = -1) {
  let r = j(),
    o = D(),
    i = k + e,
    s = Je(r.consts, t),
    a = Kt();
  if (
    (r.firstCreatePass && Rv(r, a === null ? 0 : a.index, o, i, s, n),
    r.type === 2)
  ) {
    let p = o[J];
    p[m] |= 32;
  } else o[m] |= 32;
  let c = r.data[i],
    l = a === o[ae] ? null : a,
    u = Xl(r, l, o),
    d = a && a.type & 8 ? o[a.index] : null;
  Lm(o, i, a, n), _v(o, c.create, u, d), il(!0);
}
function Uv() {
  il(!1);
}
function Qx(e, t, n) {
  Bv(e, t, n), Uv();
}
var qv = (e, t, n) => {};
function Wv(e, t, n, r) {
  let o = D(),
    i = j(),
    s = W();
  return hd(i, o, o[O], s, e, t, r), Wv;
}
function zv(e, t, n, r) {
  let o = e.cleanup;
  if (o != null)
    for (let i = 0; i < o.length - 1; i += 2) {
      let s = o[i];
      if (s === n && o[i + 1] === r) {
        let a = t[ur],
          c = o[i + 2];
        return a.length > c ? a[c] : null;
      }
      typeof s == "string" && (i += 2);
    }
  return null;
}
function hd(e, t, n, r, o, i, s) {
  let a = is(r),
    l = e.firstCreatePass && Cu(e),
    u = t[q],
    d = bu(t),
    p = !0;
  if (r.type & 3 || s) {
    let g = ne(r, t),
      C = s ? s(g) : g,
      v = d.length,
      A = s ? (B) => s(ie(B[r.index])) : r.index,
      Z = null;
    if ((!s && a && (Z = zv(e, t, o, r.index)), Z !== null)) {
      let B = Z.__ngLastListenerFn__ || Z;
      (B.__ngNextListenerFn__ = i), (Z.__ngLastListenerFn__ = i), (p = !1);
    } else {
      (i = fc(r, t, u, i)), qv(g, o, i);
      let B = n.listen(C, o, i);
      d.push(i, B), l && l.push(o, A, v, v + 1);
    }
  } else i = fc(r, t, u, i);
  let f = r.outputs,
    h;
  if (p && f !== null && (h = f[o])) {
    let g = h.length;
    if (g)
      for (let C = 0; C < g; C += 2) {
        let v = h[C],
          A = h[C + 1],
          ce = t[v][A].subscribe(i),
          V = d.length;
        d.push(i, ce), l && l.push(o, r.index, V, -(V + 1));
      }
  }
}
function dc(e, t, n, r) {
  let o = E(null);
  try {
    return me(6, t, n), n(r) !== !1;
  } catch (i) {
    return xu(e, i), !1;
  } finally {
    me(7, t, n), E(o);
  }
}
function fc(e, t, n, r) {
  return function o(i) {
    if (i === Function) return r;
    let s = e.componentOffset > -1 ? He(e.index, t) : t;
    ks(s, 5);
    let a = dc(t, n, r, i),
      c = o.__ngNextListenerFn__;
    for (; c; ) (a = dc(t, n, c, i) && a), (c = c.__ngNextListenerFn__);
    return a;
  };
}
function Yx(e = 1) {
  return qp(e);
}
function Jx(e, t, n, r) {
  gy(e, t, n, r);
}
function Kx(e) {
  let t = D(),
    n = j(),
    r = sl();
  cs(r + 1);
  let o = Vs(n, r);
  if (e.dirty && Mp(t) === ((o.metadata.flags & 2) === 2)) {
    if (o.matches === null) e.reset([]);
    else {
      let i = Iy(t, r);
      e.reset(i, mh), e.notifyOnChanges();
    }
    return !0;
  }
  return !1;
}
function Xx() {
  return py(D(), sl());
}
function eM(e) {
  let t = Fp();
  return xp(t, k + e);
}
function tM(e, t = "") {
  let n = D(),
    r = j(),
    o = e + k,
    i = r.firstCreatePass ? Yr(r, o, 1, t, null) : r.data[o],
    s = gd(r, n, i, t, e);
  (n[o] = s), $r() && _s(r, n, s, i), Ve(i, !1);
}
var gd = (e, t, n, r, o) => (Me(!0), Cs(t[O], r));
function Gv(e, t, n, r, o) {
  let i = t[he],
    s = !i || an() || fn(n) || ln(i, o);
  return Me(s), s ? Cs(t[O], r) : to(i, e, t, n);
}
function Zv() {
  gd = Gv;
}
function Qv(e) {
  return md("", e, ""), Qv;
}
function md(e, t, n) {
  let r = D(),
    o = $y(r, e, t, n);
  return o !== ge && Kg(r, $e(), o), md;
}
function Yv(e, t, n) {
  Qu(t) && (t = t());
  let r = D(),
    o = Ot();
  if (se(r, o, t)) {
    let i = j(),
      s = ds();
    yu(i, s, r, e, t, r[O], n, !1);
  }
  return Yv;
}
function nM(e, t) {
  let n = Qu(e);
  return n && e.set(t), n;
}
function Jv(e, t) {
  let n = D(),
    r = j(),
    o = W();
  return hd(r, n, n[O], o, e, t), Jv;
}
function Kv(e, t, n) {
  let r = j();
  if (r.firstCreatePass) {
    let o = je(e);
    Qi(n, r.data, r.blueprint, o, !0), Qi(t, r.data, r.blueprint, o, !1);
  }
}
function Qi(e, t, n, r, o) {
  if (((e = z(e)), Array.isArray(e)))
    for (let i = 0; i < e.length; i++) Qi(e[i], t, n, r, o);
  else {
    let i = j(),
      s = D(),
      a = W(),
      c = Dt(e) ? e : z(e.provide),
      l = Hc(e),
      u = a.providerIndexes & 1048575,
      d = a.directiveStart,
      p = a.providerIndexes >> 20;
    if (Dt(e) || !e.multi) {
      let f = new et(l, o, Ss),
        h = Bo(c, t, o ? u : u + p, d);
      h === -1
        ? (ni(mr(a, s), i, c),
          $o(i, e, t.length),
          t.push(c),
          a.directiveStart++,
          a.directiveEnd++,
          o && (a.providerIndexes += 1048576),
          n.push(f),
          s.push(f))
        : ((n[h] = f), (s[h] = f));
    } else {
      let f = Bo(c, t, u + p, d),
        h = Bo(c, t, u, u + p),
        g = f >= 0 && n[f],
        C = h >= 0 && n[h];
      if ((o && !C) || (!o && !g)) {
        ni(mr(a, s), i, c);
        let v = tI(o ? eI : Xv, n.length, o, r, l);
        !o && C && (n[h].providerFactory = v),
          $o(i, e, t.length, 0),
          t.push(c),
          a.directiveStart++,
          a.directiveEnd++,
          o && (a.providerIndexes += 1048576),
          n.push(v),
          s.push(v);
      } else {
        let v = yd(n[o ? h : f], l, !o && r);
        $o(i, e, f > -1 ? f : h, v);
      }
      !o && r && C && n[h].componentProviders++;
    }
  }
}
function $o(e, t, n, r) {
  let o = Dt(t),
    i = up(t);
  if (o || i) {
    let c = (i ? z(t.useClass) : t).prototype.ngOnDestroy;
    if (c) {
      let l = e.destroyHooks || (e.destroyHooks = []);
      if (!o && t.multi) {
        let u = l.indexOf(n);
        u === -1 ? l.push(n, [r, c]) : l[u + 1].push(r, c);
      } else l.push(n, c);
    }
  }
}
function yd(e, t, n) {
  return n && e.componentProviders++, e.multi.push(t) - 1;
}
function Bo(e, t, n, r) {
  for (let o = n; o < r; o++) if (t[o] === e) return o;
  return -1;
}
function Xv(e, t, n, r) {
  return Yi(this.multi, []);
}
function eI(e, t, n, r) {
  let o = this.multi,
    i;
  if (this.providerFactory) {
    let s = this.providerFactory.componentProviders,
      a = tt(n, n[y], this.providerFactory.index, r);
    (i = a.slice(0, s)), Yi(o, i);
    for (let c = s; c < a.length; c++) i.push(a[c]);
  } else (i = []), Yi(o, i);
  return i;
}
function Yi(e, t) {
  for (let n = 0; n < e.length; n++) {
    let r = e[n];
    t.push(r());
  }
  return t;
}
function tI(e, t, n, r, o) {
  let i = new et(e, n, Ss);
  return (
    (i.multi = []),
    (i.index = t),
    (i.componentProviders = 0),
    yd(i, o, r && !n),
    i
  );
}
function rM(e, t = []) {
  return (n) => {
    n.providersResolver = (r, o) => Kv(r, o ? o(e) : e, t);
  };
}
var nI = (() => {
  class e {
    constructor(n) {
      (this._injector = n), (this.cachedInjectors = new Map());
    }
    getOrCreateStandaloneInjector(n) {
      if (!n.standalone) return null;
      if (!this.cachedInjectors.has(n)) {
        let r = Lc(!1, n.type),
          o =
            r.length > 0
              ? Ny([r], this._injector, `Standalone[${n.type.name}]`)
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
      this.ɵprov = G({
        token: e,
        providedIn: "environment",
        factory: () => new e(Pe(Fe)),
      });
    }
  }
  return e;
})();
function oM(e) {
  Ue("NgStandalone"),
    (e.getStandaloneInjector = (t) =>
      t.get(nI).getOrCreateStandaloneInjector(e));
}
function iM(e, t, n) {
  let r = Hr() + e,
    o = D();
  return o[r] === ge ? ro(o, r, n ? t.call(n) : t()) : Sy(o, r);
}
function sM(e, t, n, r) {
  return rI(D(), Hr(), e, t, n, r);
}
function aM(e, t, n, r, o) {
  return oI(D(), Hr(), e, t, n, r, o);
}
function cM(e, t, n, r, o, i) {
  return iI(D(), Hr(), e, t, n, r, o, i);
}
function Hs(e, t) {
  let n = e[t];
  return n === ge ? void 0 : n;
}
function rI(e, t, n, r, o, i) {
  let s = t + n;
  return se(e, s, o) ? ro(e, s + 1, i ? r.call(i, o) : r(o)) : Hs(e, s + 1);
}
function oI(e, t, n, r, o, i, s) {
  let a = t + n;
  return Yu(e, a, o, i)
    ? ro(e, a + 2, s ? r.call(s, o, i) : r(o, i))
    : Hs(e, a + 2);
}
function iI(e, t, n, r, o, i, s, a) {
  let c = t + n;
  return Oy(e, c, o, i, s)
    ? ro(e, c + 3, a ? r.call(a, o, i, s) : r(o, i, s))
    : Hs(e, c + 3);
}
function lM(e, t) {
  return eo(e, t);
}
var uM = (() => {
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
      this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "platform" });
    }
  }
  return e;
})();
var sI = new R("");
function vd(e) {
  return !!e && typeof e.then == "function";
}
function aI(e) {
  return !!e && typeof e.subscribe == "function";
}
var cI = new R(""),
  Id = (() => {
    class e {
      constructor() {
        (this.initialized = !1),
          (this.done = !1),
          (this.donePromise = new Promise((n, r) => {
            (this.resolve = n), (this.reject = r);
          })),
          (this.appInits = b(cI, { optional: !0 }) ?? []);
      }
      runInitializers() {
        if (this.initialized) return;
        let n = [];
        for (let o of this.appInits) {
          let i = o();
          if (vd(i)) n.push(i);
          else if (aI(i)) {
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
        this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  wd = new R("");
function lI() {
  na(() => {
    throw new N(600, !1);
  });
}
function uI(e) {
  return e.isBoundToModule;
}
var dI = 10;
function fI(e, t, n) {
  try {
    let r = n();
    return vd(r)
      ? r.catch((o) => {
          throw (t.runOutsideAngular(() => e.handleError(o)), o);
        })
      : r;
  } catch (r) {
    throw (t.runOutsideAngular(() => e.handleError(r)), r);
  }
}
var pn = (() => {
  class e {
    constructor() {
      (this._bootstrapListeners = []),
        (this._runningTick = !1),
        (this._destroyed = !1),
        (this._destroyListeners = []),
        (this._views = []),
        (this.internalErrorHandler = b(hh)),
        (this.afterRenderManager = b(Xu)),
        (this.zonelessEnabled = b(Ls)),
        (this.dirtyFlags = 0),
        (this.deferredDirtyFlags = 0),
        (this.externalTestViews = new Set()),
        (this.beforeRender = new Ne()),
        (this.afterTick = new Ne()),
        (this.componentTypes = []),
        (this.components = []),
        (this.isStable = b(Br).hasPendingTasks.pipe(De((n) => !n))),
        (this._injector = b(Fe));
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
      let o = n instanceof xr;
      if (!this._injector.get(Id).done) {
        let p = !o && op(n),
          f = !1;
        throw new N(405, f);
      }
      let s;
      o ? (s = n) : (s = this._injector.get(_t).resolveComponentFactory(n)),
        this.componentTypes.push(s.componentType);
      let a = uI(s) ? void 0 : this._injector.get(it),
        c = r || s.selector,
        l = s.create(nt.NULL, [], c, a),
        u = l.location.nativeElement,
        d = l.injector.get(sI, null);
      return (
        d?.registerApplication(u),
        l.onDestroy(() => {
          this.detachView(l.hostView),
            rr(this.components, l),
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
      if (this._runningTick) throw new N(101, !1);
      let n = E(null);
      try {
        (this._runningTick = !0), this.synchronize();
      } catch (r) {
        this.internalErrorHandler(r);
      } finally {
        (this._runningTick = !1), E(n), this.afterTick.next();
      }
    }
    synchronize() {
      let n = null;
      this._injector.destroyed ||
        (n = this._injector.get(Mr, null, { optional: !0 })),
        (this.dirtyFlags |= this.deferredDirtyFlags),
        (this.deferredDirtyFlags = 0);
      let r = 0;
      for (; this.dirtyFlags !== 0 && r++ < dI; ) this.synchronizeOnce(n);
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
          hI(o, i, r, this.zonelessEnabled);
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
      if (this.allViews.some(({ _lView: n }) => jr(n))) {
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
      rr(this._views, r), r.detachFromAppRef();
    }
    _loadComponent(n) {
      this.attachView(n.hostView), this.tick(), this.components.push(n);
      let r = this._injector.get(wd, []);
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
        this._destroyListeners.push(n), () => rr(this._destroyListeners, n)
      );
    }
    destroy() {
      if (this._destroyed) throw new N(406, !1);
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
      this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
  }
  return e;
})();
function rr(e, t) {
  let n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
var Yn;
function pI(e) {
  Yn ??= new WeakMap();
  let t = Yn.get(e);
  if (t) return t;
  let n = e.isStable
    .pipe(Co((r) => r))
    .toPromise()
    .then(() => {});
  return Yn.set(e, n), e.onDestroy(() => Yn?.delete(e)), n;
}
function hI(e, t, n, r) {
  if (!n && !jr(e)) return;
  Su(e, t, n && !r ? 0 : 1);
}
var Ji = class {
    constructor(t, n) {
      (this.ngModuleFactory = t), (this.componentFactories = n);
    }
  },
  dM = (() => {
    class e {
      compileModuleSync(n) {
        return new ki(n);
      }
      compileModuleAsync(n) {
        return Promise.resolve(this.compileModuleSync(n));
      }
      compileModuleAndAllComponentsSync(n) {
        let r = this.compileModuleSync(n),
          o = Ac(n),
          i = Yl(o.declarations).reduce((s, a) => {
            let c = Le(a);
            return c && s.push(new Tt(c)), s;
          }, []);
        return new Ji(r, i);
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
        this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })();
var gI = (() => {
    class e {
      constructor() {
        (this.zone = b(ee)),
          (this.changeDetectionScheduler = b(Mt)),
          (this.applicationRef = b(pn));
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
        this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
      }
    }
    return e;
  })(),
  mI = new R("", { factory: () => !1 });
function Dd({
  ngZoneFactory: e,
  ignoreChangesOutsideZone: t,
  scheduleInRootZone: n,
}) {
  return (
    (e ??= () => new ee(Te(_e({}, Ed()), { scheduleInRootZone: n }))),
    [
      { provide: ee, useFactory: e },
      {
        provide: zt,
        multi: !0,
        useFactory: () => {
          let r = b(gI, { optional: !0 });
          return () => r.initialize();
        },
      },
      {
        provide: zt,
        multi: !0,
        useFactory: () => {
          let r = b(yI);
          return () => {
            r.initialize();
          };
        },
      },
      t === !0 ? { provide: Bu, useValue: !0 } : [],
      { provide: Uu, useValue: n ?? xl },
    ]
  );
}
function fM(e) {
  let t = e?.ignoreChangesOutsideZone,
    n = e?.scheduleInRootZone,
    r = Dd({
      ngZoneFactory: () => {
        let o = Ed(e);
        return (
          (o.scheduleInRootZone = n),
          o.shouldCoalesceEventChangeDetection && Ue("NgZone_CoalesceEvent"),
          new ee(o)
        );
      },
      ignoreChangesOutsideZone: t,
      scheduleInRootZone: n,
    });
  return kc([{ provide: mI, useValue: !0 }, { provide: Ls, useValue: !1 }, r]);
}
function Ed(e) {
  return {
    enableLongStackTrace: !1,
    shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
    shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
  };
}
var yI = (() => {
  class e {
    constructor() {
      (this.subscription = new F()),
        (this.initialized = !1),
        (this.zone = b(ee)),
        (this.pendingTasks = b(Br));
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
              ee.assertNotInAngularZone(),
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
            ee.assertInAngularZone(), (n ??= this.pendingTasks.add());
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
      this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
  }
  return e;
})();
var vI = (() => {
  class e {
    constructor() {
      (this.appRef = b(pn)),
        (this.taskService = b(Br)),
        (this.ngZone = b(ee)),
        (this.zonelessEnabled = b(Ls)),
        (this.disableScheduling = b(Bu, { optional: !0 }) ?? !1),
        (this.zoneIsDefined = typeof Zone < "u" && !!Zone.root.run),
        (this.schedulerTickApplyArgs = [{ data: { __scheduler_tick__: !0 } }]),
        (this.subscriptions = new F()),
        (this.angularZoneId = this.zoneIsDefined
          ? this.ngZone._inner?.get(vr)
          : null),
        (this.scheduleInRootZone =
          !this.zonelessEnabled &&
          this.zoneIsDefined &&
          (b(Uu, { optional: !0 }) ?? !1)),
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
          (this.ngZone instanceof ai || !this.zoneIsDefined));
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
      let r = this.useMicrotaskScheduler ? Za : Ml;
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
          Zone.current.get(vr + this.angularZoneId))
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
        Za(() => {
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
      this.ɵprov = G({ token: e, factory: e.ɵfac, providedIn: "root" });
    }
  }
  return e;
})();
function II() {
  return (typeof $localize < "u" && $localize.locale) || Ar;
}
var bd = new R("", {
  providedIn: "root",
  factory: () => b(bd, M.Optional | M.SkipSelf) || II(),
});
var Ki = new R("");
function Jn(e) {
  return !e.moduleRef;
}
function wI(e) {
  let t = Jn(e) ? e.r3Injector : e.moduleRef.injector,
    n = t.get(ee);
  return n.run(() => {
    Jn(e)
      ? e.r3Injector.resolveInjectorInitializers()
      : e.moduleRef.resolveInjectorInitializers();
    let r = t.get(Ct, null),
      o;
    if (
      (n.runOutsideAngular(() => {
        o = n.onError.subscribe({
          next: (i) => {
            r.handleError(i);
          },
        });
      }),
      Jn(e))
    ) {
      let i = () => t.destroy(),
        s = e.platformInjector.get(Ki);
      s.add(i),
        t.onDestroy(() => {
          o.unsubscribe(), s.delete(i);
        });
    } else {
      let i = () => e.moduleRef.destroy(),
        s = e.platformInjector.get(Ki);
      s.add(i),
        e.moduleRef.onDestroy(() => {
          rr(e.allPlatformModules, e.moduleRef), o.unsubscribe(), s.delete(i);
        });
    }
    return fI(r, n, () => {
      let i = t.get(Id);
      return (
        i.runInitializers(),
        i.donePromise.then(() => {
          let s = t.get(bd, Ar);
          if ((Cv(s || Ar), Jn(e))) {
            let a = t.get(pn);
            return (
              e.rootComponent !== void 0 && a.bootstrap(e.rootComponent), a
            );
          } else return DI(e.moduleRef, e.allPlatformModules), e.moduleRef;
        })
      );
    });
  });
}
function DI(e, t) {
  let n = e.injector.get(pn);
  if (e._bootstrapComponents.length > 0)
    e._bootstrapComponents.forEach((r) => n.bootstrap(r));
  else if (e.instance.ngDoBootstrap) e.instance.ngDoBootstrap(n);
  else throw new N(-403, !1);
  t.push(e);
}
var or = null;
function EI(e = [], t) {
  return nt.create({
    name: t,
    providers: [
      { provide: Vc, useValue: "platform" },
      { provide: Ki, useValue: new Set([() => (or = null)]) },
      ...e,
    ],
  });
}
function bI(e = []) {
  if (or) return or;
  let t = EI(e);
  return (or = t), lI(), CI(t), t;
}
function CI(e) {
  e.get(Mh, null)?.forEach((n) => n());
}
var pM = (() => {
  class e {
    static {
      this.__NG_ELEMENT_ID__ = xI;
    }
  }
  return e;
})();
function xI(e) {
  return MI(W(), D(), (e & 16) === 16);
}
function MI(e, t, n) {
  if (sn(e) && !n) {
    let r = He(e.index, t);
    return new ot(r, r);
  } else if (e.type & 175) {
    let r = t[J];
    return new ot(r, t);
  }
  return null;
}
function hM(e) {
  try {
    let { rootComponent: t, appProviders: n, platformProviders: r } = e,
      o = bI(r),
      i = [Dd({}), { provide: Mt, useExisting: vI }, ...(n || [])],
      s = new Tr({
        providers: i,
        parent: o,
        debugName: "",
        runEnvironmentInitializers: !1,
      });
    return wI({
      r3Injector: s.injector,
      platformInjector: o,
      rootComponent: t,
    });
  } catch (t) {
    return Promise.reject(t);
  }
}
var pc = !1;
function _I() {
  pc || ((pc = !0), Lh(), yv(), Zv(), wv(), ky(), cy(), Um(), Ag());
}
function TI(e, t) {
  return pI(e);
}
function gM() {
  return kc([
    {
      provide: Wn,
      useFactory: () => {
        let e = !0;
        return (
          $t() && (e = !!b(ys, { optional: !0 })?.get(Vl, null)),
          e && Ue("NgHydration"),
          e
        );
      },
    },
    {
      provide: zt,
      useValue: () => {
        km(!1), $t() && b(Wn) && (NI(), _I());
      },
      multi: !0,
    },
    { provide: Ul, useFactory: () => $t() && b(Wn) },
    {
      provide: wd,
      useFactory: () => {
        if ($t() && b(Wn)) {
          let e = b(pn),
            t = b(nt);
          return () => {
            TI(e, t).then(() => {
              Hm(e);
            });
          };
        }
        return () => {};
      },
      multi: !0,
    },
  ]);
}
function NI() {
  let e = cn(),
    t;
  for (let n of e.body.childNodes)
    if (n.nodeType === Node.COMMENT_NODE && n.textContent?.trim() === Ph) {
      t = n;
      break;
    }
  if (!t) throw new N(-507, !1);
}
function mM(e) {
  return typeof e == "boolean" ? e : e != null && e !== "false";
}
function yM(e, t) {
  Ue("NgSignals");
  let n = Xs(e);
  return t?.equal && (n[we].equal = t.equal), n;
}
function vM(e) {
  let t = E(null);
  try {
    return e();
  } finally {
    E(t);
  }
}
function IM(e) {
  let t = Le(e);
  if (!t) return null;
  let n = new Tt(t);
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
export {
  _e as a,
  Te as b,
  SI as c,
  OI as d,
  F as e,
  Ld as f,
  T as g,
  wo as h,
  Do as i,
  Ne as j,
  Ft as k,
  jt as l,
  Oe as m,
  zd as n,
  Gd as o,
  Zd as p,
  Ge as q,
  De as r,
  nf as s,
  Ze as t,
  Eo as u,
  Bn as v,
  of as w,
  sf as x,
  Vt as y,
  Na as z,
  af as A,
  Ht as B,
  bo as C,
  cf as D,
  uf as E,
  Co as F,
  xo as G,
  df as H,
  ff as I,
  pf as J,
  hf as K,
  gf as L,
  mf as M,
  N,
  X as O,
  mc as P,
  G as Q,
  Dx as R,
  Ex as S,
  R as T,
  M as U,
  Pe as V,
  b as W,
  bx as X,
  Cx as Y,
  Gt as Z,
  xx as _,
  Mx as $,
  _x as aa,
  kc as ba,
  Vc as ca,
  Fe as da,
  Tx as ea,
  Ip as fa,
  Nx as ga,
  Sx as ha,
  Ox as ia,
  Ax as ja,
  nt as ka,
  Br as la,
  be as ma,
  ee as na,
  Ct as oa,
  Ur as pa,
  Rx as qa,
  Ch as ra,
  Mh as sa,
  Pl as ta,
  Px as ua,
  ys as va,
  og as wa,
  kx as xa,
  gi as ya,
  Lx as za,
  Ss as Aa,
  Fx as Ba,
  br as Ca,
  Mr as Da,
  Vx as Ea,
  Fs as Fa,
  Ue as Ga,
  $x as Ha,
  by as Ia,
  Bx as Ja,
  Ri as Ka,
  Ny as La,
  Ry as Ma,
  Ly as Na,
  Hy as Oa,
  Ky as Pa,
  Xy as Qa,
  Ux as Ra,
  qx as Sa,
  Wx as Ta,
  zx as Ua,
  Gx as Va,
  sd as Wa,
  ad as Xa,
  gv as Ya,
  Zx as Za,
  Qx as _a,
  Wv as $a,
  Yx as ab,
  Jx as bb,
  Kx as cb,
  Xx as db,
  eM as eb,
  tM as fb,
  Qv as gb,
  md as hb,
  Yv as ib,
  nM as jb,
  Jv as kb,
  rM as lb,
  oM as mb,
  iM as nb,
  sM as ob,
  aM as pb,
  cM as qb,
  lM as rb,
  uM as sb,
  vd as tb,
  cI as ub,
  wd as vb,
  pn as wb,
  pI as xb,
  dM as yb,
  fM as zb,
  pM as Ab,
  hM as Bb,
  gM as Cb,
  mM as Db,
  yM as Eb,
  vM as Fb,
  IM as Gb,
};
