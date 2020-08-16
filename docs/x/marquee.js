/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 16:
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
var _timer, _shadow, _scroll;
class XMarquee extends HTMLElement {
    constructor() {
        super();
        _timer.set(this, undefined); // the internal timer
        _shadow.set(this, void 0);
        _scroll.set(this, () => {
            const $box = __classPrivateFieldGet(this, _shadow).getElementById("box");
            const $text = __classPrivateFieldGet(this, _shadow).getElementById("text");
            const [textWidth] = [$text.offsetWidth, $box.offsetWidth];
            const m = ($text.style.transform || "").match(/-?\d+/);
            const offset = m ? +m[0] : 0;
            const style = $text.style;
            // if scroll all content. Then reset position to the right
            if (offset < 0 && textWidth < -offset) {
                style.transform = `translateX(${$box.offsetWidth + 1}px)`;
                __classPrivateFieldSet(this, _timer, requestAnimationFrame(() => {
                    cancelAnimationFrame(__classPrivateFieldGet(this, _timer));
                    __classPrivateFieldGet(this, _scroll).call(this);
                }));
            }
            else {
                style.transform = `translateX(${offset - 1}px)`;
                __classPrivateFieldSet(this, _timer, requestAnimationFrame(() => {
                    cancelAnimationFrame(__classPrivateFieldGet(this, _timer));
                    __classPrivateFieldGet(this, _scroll).call(this);
                }));
            }
        });
        __classPrivateFieldSet(this, _shadow, this.attachShadow({ mode: "open" }));
        const template = document.createElement("template");
        const style = document.createElement("style");
        style.textContent = `
#box {
  white-space: nowrap;
  overflow: hidden;
}

#text {
  display: inline-block;
}
    `;
        template.innerHTML = `
    <div id="box">
      <span id="text">
        <slot></slot>
      </span>
    </div>
    `;
        __classPrivateFieldGet(this, _shadow).appendChild(style);
        __classPrivateFieldGet(this, _shadow).appendChild(template.content.cloneNode(true));
    }
    static get observedAttributes() {
        return ["width"];
    }
    connectedCallback() {
        if (__classPrivateFieldGet(this, _timer) === undefined) {
            const width = this.getAttribute("width");
            if (width) {
                __classPrivateFieldGet(this, _shadow).getElementById("box").style.width = width;
            }
            this.start();
        }
    }
    disconnectedCallback() {
        if (__classPrivateFieldGet(this, _timer)) {
            cancelAnimationFrame(__classPrivateFieldGet(this, _timer));
        }
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        if (attrName === "width") {
            __classPrivateFieldGet(this, _shadow).getElementById("box").style.width = newVal;
        }
    }
    adoptedCallback() { }
    reset() {
        const $box = __classPrivateFieldGet(this, _shadow).getElementById("box");
        const $text = __classPrivateFieldGet(this, _shadow).getElementById("text");
        const style = $text.style;
        style.transform = `none`;
    }
    stop() {
        if (__classPrivateFieldGet(this, _timer) !== undefined) {
            cancelAnimationFrame(__classPrivateFieldGet(this, _timer));
        }
    }
    start() {
        if (__classPrivateFieldGet(this, _timer) !== undefined) {
            cancelAnimationFrame(__classPrivateFieldGet(this, _timer));
        }
        __classPrivateFieldGet(this, _scroll).call(this);
    }
}
_timer = new WeakMap(), _shadow = new WeakMap(), _scroll = new WeakMap();
customElements.define("x-marquee", XMarquee);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_modules__[16]();
/******/ })()
;
//# sourceMappingURL=marquee.js.map