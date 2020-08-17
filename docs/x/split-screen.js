/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 52:
/***/ (function() {


var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _shadow;
class XSplitScreen extends HTMLElement {
    constructor() {
        super();
        _shadow.set(this, void 0);
        const shadow = (__classPrivateFieldSet(this, _shadow, this.attachShadow({ mode: "open" })));
        const template = document.createElement("template");
        const style = document.createElement("style");
        style.textContent = `
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
    connectedCallback() { }
    disconnectedCallback() { }
    attributeChangedCallback(attrName, oldVal, newVal) { }
    adoptedCallback() { }
}
_shadow = new WeakMap();
customElements.define("x-split-screen", XSplitScreen);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_modules__[52]();
/******/ })()
;
//# sourceMappingURL=split-screen.js.map