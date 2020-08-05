class XMarquee extends HTMLElement {
  #timer?: number = undefined; // the internal timer
  #shadow!: ShadowRoot;

  static get observedAttributes() {
    return ["width"];
  }

  constructor() {
    super();

    this.#shadow = this.attachShadow({ mode: "open" });

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

    this.#shadow.appendChild(style);
    this.#shadow.appendChild(template.content.cloneNode(true));
  }

  #scroll = () => {
    const $box = this.#shadow.getElementById("box") as HTMLElement;
    const $text = this.#shadow.getElementById("text") as HTMLElement;
    const [textWidth] = [$text.offsetWidth, $box.offsetWidth];
    const m = ($text.style.transform || "").match(/-?\d+/);
    const offset = m ? +m[0] : 0;
    const style = $text.style;
    // if scroll all content. Then reset position to the right
    if (offset < 0 && textWidth < -offset) {
      style.transform = `translateX(${$box.offsetWidth + 1}px)`;
      this.#timer = requestAnimationFrame(() => {
        cancelAnimationFrame(this.#timer as number);
        this.#scroll();
      });
    } else {
      style.transform = `translateX(${offset - 1}px)`;
      this.#timer = requestAnimationFrame(() => {
        cancelAnimationFrame(this.#timer as number);
        this.#scroll();
      });
    }
  };

  public connectedCallback() {
    if (this.#timer === undefined) {
      const width = this.getAttribute("width");
      if (width) {
        (this.#shadow.getElementById("box") as HTMLElement).style.width = width;
      }
      this.start();
    }
  }

  public disconnectedCallback() {
    if (this.#timer) {
      cancelAnimationFrame(this.#timer);
    }
  }

  public attributeChangedCallback(
    attrName: string,
    oldVal: string,
    newVal: string
  ) {
    if (attrName === "width") {
      (this.#shadow.getElementById("box") as HTMLElement).style.width = newVal;
    }
  }

  public adoptedCallback() {}

  public reset() {
    const $box = this.#shadow.getElementById("box") as HTMLElement;
    const $text = this.#shadow.getElementById("text") as HTMLElement;

    const style = $text.style;

    style.transform = `none`;
  }

  public stop() {
    if (this.#timer !== undefined) {
      cancelAnimationFrame(this.#timer);
    }
  }

  public start() {
    if (this.#timer !== undefined) {
      cancelAnimationFrame(this.#timer);
    }

    this.#scroll();
  }
}

customElements.define("x-marquee", XMarquee);
