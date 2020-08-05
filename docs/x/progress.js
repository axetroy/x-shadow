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
/******/ 	return __webpack_require__(__webpack_require__.s = 35);
/******/ })
/************************************************************************/
/******/ ({

/***/ 35:
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
        console.log("color", color);
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

/******/ });