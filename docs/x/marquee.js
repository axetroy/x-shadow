/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
/******/ })
/************************************************************************/
/******/ ({

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
    connectedCallback() {
        if (__classPrivateFieldGet(this, _timer) === undefined) {
            const width = this.getAttribute("width");
            if (width) {
                __classPrivateFieldGet(this, _shadow).getElementById("box").style.width = width;
            }
            this.start();
        }
    }
    disconnectedCallback() { }
    attributeChangedCallback(attrName, oldVal, newVal) { }
    adoptedCallback() { }
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

/******/ });