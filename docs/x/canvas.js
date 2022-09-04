/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
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
var _canvas, _ctx, _shadow, _lineHeight, _ob;
class XCanvas extends HTMLElement {
    constructor() {
        var _a;
        super();
        _canvas.set(this, void 0);
        _ctx.set(this, void 0);
        _shadow.set(this, void 0);
        _lineHeight.set(this, 4); // 行间距
        _ob.set(this, void 0);
        __classPrivateFieldSet(this, _shadow, this.attachShadow({ mode: "closed" }));
        const canvas = document.createElement("canvas");
        __classPrivateFieldSet(this, _canvas, canvas);
        __classPrivateFieldGet(this, _shadow).append(canvas);
        let containerWidth = ((_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().width) || 0;
        __classPrivateFieldSet(this, _ob, new ResizeObserver((entries) => {
            const entry = entries.find((v) => v.target === this.parentElement);
            if (!entry)
                return;
            // container width not change
            if (entry.contentRect.width === containerWidth)
                return;
            containerWidth = entry.contentRect.width;
            this.render();
        }));
    }
    get fontSize() {
        return parseInt(window.getComputedStyle(this).fontSize);
    }
    get fontFamily() {
        return window.getComputedStyle(this).fontFamily;
    }
    privateParse(text) {
        const lines = text.split("\n");
        const paragraph = [];
        for (const line of lines) {
            if (!line.length) {
                paragraph.push(" ");
            }
            let start = 0;
            let end = 1;
            loop: while (start < line.length - 1) {
                const char = line.slice(start, end);
                const textWidth = __classPrivateFieldGet(this, _ctx).measureText(char).width;
                if (textWidth > __classPrivateFieldGet(this, _canvas).width) {
                    paragraph.push(line.slice(start, end - 1));
                    start = end - 1;
                }
                else if (end === line.length) {
                    paragraph.push(char);
                    break loop;
                }
                end++;
            }
        }
        return paragraph;
    }
    setCanvasStyle() {
        // 渲染整行
        __classPrivateFieldGet(this, _ctx).font = `${this.fontSize}px ${this.fontFamily}`;
        __classPrivateFieldGet(this, _ctx).fillStyle = "#000";
        __classPrivateFieldGet(this, _ctx).textAlign = "left";
        __classPrivateFieldGet(this, _ctx).textBaseline = "top";
    }
    render() {
        var _a, _b;
        __classPrivateFieldGet(this, _canvas).width = (_b = (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().width) !== null && _b !== void 0 ? _b : 100;
        this.setCanvasStyle();
        const text = this.textContent || "";
        const indents = text
            .split("\n")
            .filter((v) => /^\s*$/.test(v) === false)
            .map((v) => {
            const match = /^\s+/.exec(v);
            if (!match || !match.length)
                return 0;
            return match[0].length;
        });
        const indent = Math.min(...indents);
        const source = text
            .trim()
            .split("\n")
            .map((v) => v.replace(new RegExp(`^\\s{${indent}}`), ""))
            .join("\n");
        const paragraphs = this.privateParse(source);
        const height = paragraphs.length * this.fontSize + (paragraphs.length - 1) * __classPrivateFieldGet(this, _lineHeight);
        __classPrivateFieldGet(this, _canvas).height = height;
        this.style.width = __classPrivateFieldGet(this, _canvas).width + "px";
        this.style.height = __classPrivateFieldGet(this, _canvas).height + "px";
        this.style.display = "inline-block";
        this.setCanvasStyle();
        paragraphs.forEach((p, index) => {
            const x = 0;
            const y = index * this.fontSize + (index === 0 ? 0 : index * __classPrivateFieldGet(this, _lineHeight));
            __classPrivateFieldGet(this, _ctx).fillText(p, x, y);
        });
    }
    connectedCallback() {
        const canvas = __classPrivateFieldGet(this, _canvas);
        __classPrivateFieldGet(this, _ob).observe(this.parentElement);
        const ctx = canvas.getContext("2d");
        __classPrivateFieldSet(this, _ctx, ctx);
        requestAnimationFrame(() => {
            this.render();
        });
    }
    disconnectedCallback() {
        __classPrivateFieldGet(this, _ob).disconnect();
    }
    attributeChangedCallback(attrName, oldVal, newVal) { }
    adoptedCallback() { }
}
_canvas = new WeakMap(), _ctx = new WeakMap(), _shadow = new WeakMap(), _lineHeight = new WeakMap(), _ob = new WeakMap();
customElements.define("x-canvas", XCanvas);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	__webpack_modules__[0]();
/******/ })()
;
//# sourceMappingURL=canvas.js.map