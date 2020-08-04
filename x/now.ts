import format from "date-fns/format";

class XNow extends HTMLElement {
  #timer?: number | NodeJS.Timeout = undefined; // the internal timer
  #format?: string; // the format of time
  #shadow!: ShadowRoot;
  constructor() {
    super();

    this.#shadow = this.attachShadow({ mode: "closed" });
  }

  #render = () => {
    if (this.#format) {
      this.#shadow.textContent = format(new Date(), this.#format);
    } else {
      this.#shadow.textContent = new Date().toString();
    }
  };

  connectedCallback() {
    if (this.#timer === undefined) {
      const interval = this.getAttribute("interval") || 1000;
      this.#format = this.getAttribute("format") || undefined;

      this.#render();

      this.#timer = setInterval(() => {
        this.#render();
      }, +interval);
    }
  }

  disconnectedCallback() {}

  attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {}

  adoptedCallback() {}
}

customElements.define("x-now", XNow);
