class XCountDown extends HTMLElement {
  #timer?: number | NodeJS.Timeout = undefined; // the internal timer
  #shadow!: ShadowRoot;
  #count?: number = undefined;
  #internal?: number = undefined;
  constructor() {
    super();

    this.#shadow = this.attachShadow({ mode: "open" });
  }

  #render = () => {
    if (this.#count !== undefined && !isNaN(+this.#count)) {
      this.#count = this.#count - 1;
      this.#shadow.textContent = this.#count + "";

      const event = new Event("onchange", {
        bubbles: false,
        composed: false,
      });
      // @ts-expect-error
      event.detail = {
        count: this.#count,
      };
      this.dispatchEvent(event);

      if (this.#count === 0) {
        const event = new Event("onfinish", {
          bubbles: false,
          composed: false,
        });
        this.dispatchEvent(event);
      }
    }
  };

  start() {
    if (this.#timer !== undefined) {
      clearInterval(this.#timer as number);
    }

    this.#render();

    this.#timer = setInterval(() => {
      if (this.#count === 0) {
        clearInterval(this.#timer as number);
      } else {
        this.#render();
      }
    }, this.#internal);
  }

  stop() {
    if (this.#timer !== undefined) {
      clearInterval(this.#timer as number);
    }
  }

  connectedCallback() {
    if (this.#timer === undefined) {
      const interval = this.getAttribute("interval");
      this.#internal = interval ? +interval : 10;
      const count = this.getAttribute("count");
      this.#count = count ? +count : undefined;

      this.start();
    }
  }

  disconnectedCallback() {}

  attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {}

  adoptedCallback() {}
}

customElements.define("x-count-down", XCountDown);
