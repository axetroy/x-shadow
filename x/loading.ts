class XLoading extends HTMLElement {
  #animationTimer?: number = undefined;
  #timeoutTimer?: number | NodeJS.Timeout = undefined;
  #shadow!: ShadowRoot;
  static get observedAttributes() {
    return ["loading"];
  }
  static get defaults() {
    return {
      loading: false,
    };
  }
  constructor() {
    super();

    const shadow = (this.#shadow = this.attachShadow({ mode: "open" }));

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

  connectedCallback() {
    this.style.height = "auto";
    this.style.width = "auto";
    this.style.display = "inline-block";

    const loading = this.getAttribute("loading") === "true" ? true : false;

    this.#toggle(loading);
  }

  #toggle = (display: boolean) => {
    const shadow = this.#shadow;
    const $mask = shadow.getElementById("mask") as HTMLElement;

    if (display) {
      $mask.style.display = "initial";
      if (this.#animationTimer !== undefined) {
        cancelAnimationFrame(this.#animationTimer);
        this.#animationTimer = undefined;
      }
      this.#animationTimer = requestAnimationFrame(() => {
        $mask.style.opacity = "1";
      });
    } else {
      $mask.style.opacity = "0";
      if (this.#timeoutTimer !== undefined) {
        clearTimeout(this.#timeoutTimer as number);
        this.#timeoutTimer = undefined;
      }
      this.#timeoutTimer = setTimeout(() => {
        $mask.style.display = "none";
      }, 300);
    }
  };

  disconnectedCallback() {
    if (this.#animationTimer !== undefined) {
      cancelAnimationFrame(this.#animationTimer);
      this.#animationTimer = undefined;
    }

    if (this.#timeoutTimer !== undefined) {
      clearTimeout(this.#timeoutTimer as number);
    }
  }

  attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {
    const shadow = this.#shadow;

    switch (attrName) {
      case "loading":
        this.#toggle(newVal === "true");
        break;
    }
  }

  adoptedCallback() {}
}

customElements.define("x-loading", XLoading);
