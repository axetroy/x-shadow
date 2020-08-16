/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 50:
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
var _shadow;
class XProgress extends HTMLElement {
    constructor() {
        super();
        _shadow.set(this, void 0);
        __classPrivateFieldSet(this, _shadow, this.attachShadow({ mode: "open" }));
        const template = document.createElement("template");
        const style = document.createElement("style");
        style.textContent = `
#container{
  height: ${XProgress.defaults.height};
  display: flex;
  align-items: center;
}

#progress{
  height: 100%;
  background-color: #f5f5f5;
  flex: 1;
}

#progress-inner{
  height: 100%;
  background-color: ${XProgress.defaults.color};
  border-radius: 0 5px 5px 0;
  transition: all 0.5s ease-in-out;
}

#percent-text{
  color: rgba(0,0,0,.45);
  margin-left: 8px;
  font-size: 0.8em;
}
    `;
        template.innerHTML = `
    <div id="container">
      <div id="progress">
        <div id="progress-inner"></div>
      </div>
      <span id="percent-text">0%</span>
    </div>
    `;
        __classPrivateFieldGet(this, _shadow).appendChild(style);
        __classPrivateFieldGet(this, _shadow).appendChild(template.content.cloneNode(true));
    }
    static get observedAttributes() {
        return ["percent", "height", "color"];
    }
    static get defaults() {
        return {
            height: "8px",
            color: "#1890ff",
        };
    }
    connectedCallback() {
        const shadow = __classPrivateFieldGet(this, _shadow);
        const percent = this.getAttribute("percent");
        const height = this.getAttribute("height") || XProgress.defaults.height;
        const color = this.getAttribute("color") || XProgress.defaults.color;
        shadow.getElementById("percent-text").textContent =
            percent + "%";
        shadow.getElementById("container").style.height = height;
        shadow.getElementById("progress-inner").style.width =
            percent + "%";
        shadow.getElementById("progress-inner").style.backgroundColor = color;
    }
    disconnectedCallback() { }
    attributeChangedCallback(attrName, oldVal, newVal) {
        const shadow = __classPrivateFieldGet(this, _shadow);
        switch (attrName) {
            case "percent":
                shadow.getElementById("percent-text").textContent =
                    newVal + "%";
                shadow.getElementById("progress-inner").style.width =
                    newVal + "%";
                break;
            case "height":
                shadow.getElementById("container").style.height = newVal;
            case "color":
                shadow.getElementById("progress-inner").style.backgroundColor = newVal;
                break;
        }
    }
    adoptedCallback() { }
}
_shadow = new WeakMap();
customElements.define("x-progress", XProgress);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_modules__[50]();
/******/ })()
;
//# sourceMappingURL=progress.js.map