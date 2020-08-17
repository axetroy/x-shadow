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
var _shadow, _canvas, _context, _width_1, _height_1, _color_1, _start, _move, _end;
class XDrawingBoard extends HTMLElement {
    constructor() {
        super();
        _shadow.set(this, void 0);
        _canvas.set(this, void 0);
        _context.set(this, void 0);
        _width_1.set(this, 300);
        _height_1.set(this, 150);
        _color_1.set(this, "#000");
        _start.set(this, (event) => {
            let point;
            // safari: PC mode is not have `TouchEvent` in global object
            if (typeof TouchEvent !== "undefined" && event instanceof TouchEvent) {
                point = event.changedTouches[0];
            }
            else {
                point = event;
            }
            const stroke_info = __classPrivateFieldGet(this, _canvas).getBoundingClientRect();
            __classPrivateFieldGet(this, _context).beginPath(); // clear path
            __classPrivateFieldGet(this, _context).moveTo(point.clientX - stroke_info.left, point.clientY - stroke_info.top);
            __classPrivateFieldGet(this, _canvas).addEventListener("mousemove", __classPrivateFieldGet(this, _move), { passive: false });
            __classPrivateFieldGet(this, _canvas).addEventListener("touchmove", __classPrivateFieldGet(this, _move), { passive: false });
            __classPrivateFieldGet(this, _canvas).addEventListener("mouseup", __classPrivateFieldGet(this, _end), { passive: false });
            __classPrivateFieldGet(this, _canvas).addEventListener("touchend", __classPrivateFieldGet(this, _end), { passive: false });
            event.preventDefault();
        });
        _move.set(this, (event) => {
            let point;
            // safari: PC mode is not have `TouchEvent` in global object
            if (typeof TouchEvent !== "undefined" && event instanceof TouchEvent) {
                point = event.changedTouches[0];
            }
            else {
                point = event;
            }
            const stroke_info = __classPrivateFieldGet(this, _canvas).getBoundingClientRect();
            __classPrivateFieldGet(this, _context).lineTo(point.clientX - stroke_info.left, point.clientY - stroke_info.top);
            __classPrivateFieldGet(this, _context).stroke();
            event.preventDefault();
        });
        _end.set(this, (event) => {
            __classPrivateFieldGet(this, _canvas).removeEventListener("mousemove", __classPrivateFieldGet(this, _move));
            __classPrivateFieldGet(this, _canvas).removeEventListener("touchmove", __classPrivateFieldGet(this, _move));
            event.preventDefault();
        });
        __classPrivateFieldSet(this, _shadow, this.attachShadow({ mode: "open" }));
        const canvas = document.createElement("canvas");
        __classPrivateFieldSet(this, _canvas, canvas);
        __classPrivateFieldGet(this, _shadow).append(canvas);
    }
    static get observedAttributes() {
        return ["width", "height", "color"];
    }
    get width() {
        return __classPrivateFieldGet(this, _width_1);
    }
    get height() {
        return __classPrivateFieldGet(this, _height_1);
    }
    connectedCallback() {
        const _width = this.getAttribute("width");
        const _height = this.getAttribute("height");
        const _color = this.getAttribute("color");
        if (_width && !isNaN(+_width)) {
            __classPrivateFieldSet(this, _width_1, +_width);
        }
        if (_height && !isNaN(+_height)) {
            __classPrivateFieldSet(this, _height_1, +_height);
        }
        if (_color) {
            __classPrivateFieldSet(this, _color_1, _color);
        }
        const canvas = __classPrivateFieldGet(this, _canvas);
        canvas.width = this.width;
        canvas.height = this.height;
        this.style.width = this.width + "px";
        this.style.height = this.height + "px";
        this.style.display = "inline-block";
        const ctx = canvas.getContext("2d");
        __classPrivateFieldSet(this, _context, ctx);
        __classPrivateFieldGet(this, _context).fillStyle = __classPrivateFieldGet(this, _color_1);
        __classPrivateFieldGet(this, _context).strokeStyle = __classPrivateFieldGet(this, _color_1);
        window.document.documentElement.addEventListener("mouseup", __classPrivateFieldGet(this, _end), {
            passive: false,
        });
        canvas.addEventListener("mousedown", __classPrivateFieldGet(this, _start), { passive: false });
        canvas.addEventListener("touchstart", __classPrivateFieldGet(this, _start), { passive: false });
    }
    disconnectedCallback() {
        window.document.documentElement.removeEventListener("mouseup", __classPrivateFieldGet(this, _end));
        __classPrivateFieldGet(this, _canvas).removeEventListener("mousedown", __classPrivateFieldGet(this, _start));
        __classPrivateFieldGet(this, _canvas).removeEventListener("touchstart", __classPrivateFieldGet(this, _start));
        __classPrivateFieldGet(this, _canvas).removeEventListener("mousemove", __classPrivateFieldGet(this, _move));
        __classPrivateFieldGet(this, _canvas).removeEventListener("touchmove", __classPrivateFieldGet(this, _move));
        __classPrivateFieldGet(this, _canvas).removeEventListener("mouseup", __classPrivateFieldGet(this, _end));
        __classPrivateFieldGet(this, _canvas).removeEventListener("touchend", __classPrivateFieldGet(this, _end));
    }
    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
            case "color":
                __classPrivateFieldSet(this, _color_1, newVal);
                break;
            case "width":
                __classPrivateFieldSet(this, _width_1, +newVal);
                break;
            case "height":
                __classPrivateFieldSet(this, _height_1, +newVal);
                break;
        }
    }
    adoptedCallback() { }
    clear() {
        __classPrivateFieldGet(this, _context).clearRect(0, 0, this.width, this.height);
    }
    toBase64(type = "image/jpg") {
        return __classPrivateFieldGet(this, _canvas).toDataURL(type);
    }
    download(filename = "image.jpg") {
        const link = document.createElement("a");
        link.download = filename;
        link.href = this.toBase64();
        link.click();
    }
}
_shadow = new WeakMap(), _canvas = new WeakMap(), _context = new WeakMap(), _width_1 = new WeakMap(), _height_1 = new WeakMap(), _color_1 = new WeakMap(), _start = new WeakMap(), _move = new WeakMap(), _end = new WeakMap();
customElements.define("x-drawing-board", XDrawingBoard);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_modules__[2]();
/******/ })()
;
//# sourceMappingURL=drawing-board.js.map