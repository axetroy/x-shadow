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
/******/ 	return __webpack_require__(__webpack_require__.s = 36);
/******/ })
/************************************************************************/
/******/ ({

/***/ 36:
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

/******/ });