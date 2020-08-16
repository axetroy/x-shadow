/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 15:
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
var _animationTimer, _timeoutTimer, _shadow, _toggle;
class XLoading extends HTMLElement {
    constructor() {
        super();
        _animationTimer.set(this, undefined);
        _timeoutTimer.set(this, undefined);
        _shadow.set(this, void 0);
        _toggle.set(this, (display) => {
            const shadow = __classPrivateFieldGet(this, _shadow);
            const $mask = shadow.getElementById("mask");
            if (display) {
                $mask.style.display = "initial";
                if (__classPrivateFieldGet(this, _animationTimer) !== undefined) {
                    cancelAnimationFrame(__classPrivateFieldGet(this, _animationTimer));
                    __classPrivateFieldSet(this, _animationTimer, undefined);
                }
                __classPrivateFieldSet(this, _animationTimer, requestAnimationFrame(() => {
                    $mask.style.opacity = "1";
                }));
            }
            else {
                $mask.style.opacity = "0";
                if (__classPrivateFieldGet(this, _timeoutTimer) !== undefined) {
                    clearTimeout(__classPrivateFieldGet(this, _timeoutTimer));
                    __classPrivateFieldSet(this, _timeoutTimer, undefined);
                }
                __classPrivateFieldSet(this, _timeoutTimer, setTimeout(() => {
                    $mask.style.display = "none";
                }, 300));
            }
        });
        const shadow = (__classPrivateFieldSet(this, _shadow, this.attachShadow({ mode: "open" })));
        const template = document.createElement("template");
        const style = document.createElement("style");
        style.textContent = `
#container {
  display: inline-block;
  width: auto;
  position: relative;
}

#mask {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(225,225,225,50%);
  z-index: 10;
  transition: all 0.3s ease-in-out;
}

::slotted([slot="tip"]), #default-tip{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
}
    `;
        template.innerHTML = `
    <div id="container">
      <div id="mask">
        <slot name="tip">
          <span id="default-tip">Loading...</span>
        </slot>
      </div>
      <slot></slot>
    </div>
    `;
        shadow.appendChild(style);
        shadow.appendChild(template.content.cloneNode(true));
    }
    static get observedAttributes() {
        return ["loading"];
    }
    static get defaults() {
        return {
            loading: false,
        };
    }
    connectedCallback() {
        this.style.height = "auto";
        this.style.width = "auto";
        this.style.display = "inline-block";
        const loading = this.getAttribute("loading") === "true" ? true : false;
        __classPrivateFieldGet(this, _toggle).call(this, loading);
    }
    disconnectedCallback() {
        if (__classPrivateFieldGet(this, _animationTimer) !== undefined) {
            cancelAnimationFrame(__classPrivateFieldGet(this, _animationTimer));
            __classPrivateFieldSet(this, _animationTimer, undefined);
        }
        if (__classPrivateFieldGet(this, _timeoutTimer) !== undefined) {
            clearTimeout(__classPrivateFieldGet(this, _timeoutTimer));
        }
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        const shadow = __classPrivateFieldGet(this, _shadow);
        switch (attrName) {
            case "loading":
                __classPrivateFieldGet(this, _toggle).call(this, newVal === "true");
                break;
        }
    }
    adoptedCallback() { }
}
_animationTimer = new WeakMap(), _timeoutTimer = new WeakMap(), _shadow = new WeakMap(), _toggle = new WeakMap();
customElements.define("x-loading", XLoading);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_modules__[15]();
/******/ })()
;
//# sourceMappingURL=loading.js.map