/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 2:
/***/ (function() {


var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _timer, _shadow, _count, _render;
class XCountDateDown extends HTMLElement {
    constructor() {
        super();
        _timer.set(this, undefined); // the internal timer
        _shadow.set(this, void 0);
        _count.set(this, undefined);
        _render.set(this, () => {
            if (__classPrivateFieldGet(this, _count) !== undefined && !isNaN(+__classPrivateFieldGet(this, _count))) {
                __classPrivateFieldSet(this, _count, __classPrivateFieldGet(this, _count) - 1);
                __classPrivateFieldGet(this, _shadow).textContent = __classPrivateFieldGet(this, _count) + "";
                const event = new Event("onchange", {
                    bubbles: false,
                    composed: false,
                });
                // @ts-expect-error
                event.detail = {
                    count: __classPrivateFieldGet(this, _count),
                };
                this.dispatchEvent(event);
                if (__classPrivateFieldGet(this, _count) === 0) {
                    const event = new Event("onfinish", {
                        bubbles: false,
                        composed: false,
                    });
                    this.dispatchEvent(event);
                }
            }
        });
        __classPrivateFieldSet(this, _shadow, this.attachShadow({ mode: "open" }));
    }
    start() {
        if (__classPrivateFieldGet(this, _timer) !== undefined) {
            clearInterval(__classPrivateFieldGet(this, _timer));
        }
        __classPrivateFieldGet(this, _render).call(this);
        const loop = () => {
            if (__classPrivateFieldGet(this, _count) === 0) {
                cancelAnimationFrame(__classPrivateFieldGet(this, _timer));
            }
            else {
                __classPrivateFieldGet(this, _render).call(this);
                __classPrivateFieldSet(this, _timer, requestAnimationFrame(loop));
            }
        };
        __classPrivateFieldSet(this, _timer, requestAnimationFrame(loop));
    }
    stop() {
        if (__classPrivateFieldGet(this, _timer) !== undefined) {
            clearInterval(__classPrivateFieldGet(this, _timer));
        }
    }
    connectedCallback() {
        if (__classPrivateFieldGet(this, _timer) === undefined) {
            const count = this.getAttribute("count");
            __classPrivateFieldSet(this, _count, count ? +count : undefined);
            this.start();
        }
    }
    disconnectedCallback() { }
    attributeChangedCallback(attrName, oldVal, newVal) { }
    adoptedCallback() { }
}
_timer = new WeakMap(), _shadow = new WeakMap(), _count = new WeakMap(), _render = new WeakMap();
customElements.define("x-date-count-down", XCountDateDown);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_modules__[2]();
/******/ })()
;
//# sourceMappingURL=date-count-down.js.map