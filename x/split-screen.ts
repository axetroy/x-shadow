class XSplitScreen extends HTMLElement {
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

  connectedCallback() {}

  disconnectedCallback() {}

  attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {}

  adoptedCallback() {}
}

customElements.define("x-split-screen", XSplitScreen);
