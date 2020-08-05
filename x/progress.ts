class XProgress extends HTMLElement {
  #shadow!: ShadowRoot;
  static get observedAttributes() {
    return ["percent", "height", "color"];
  }
  static get defaults() {
    return {
      height: "8px",
      color: "#1890ff",
    };
  }
  constructor() {
    super();

    this.#shadow = this.attachShadow({ mode: "open" });

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

    this.#shadow.appendChild(style);
    this.#shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const shadow = this.#shadow;
    const percent = this.getAttribute("percent");
    const height = this.getAttribute("height") || XProgress.defaults.height;
    const color = this.getAttribute("color") || XProgress.defaults.color;

    console.log("color", color);

    (shadow.getElementById("percent-text") as HTMLElement).textContent =
      percent + "%";
    (shadow.getElementById("container") as HTMLElement).style.height = height;
    (shadow.getElementById("progress-inner") as HTMLElement).style.width =
      percent + "%";
    (shadow.getElementById(
      "progress-inner"
    ) as HTMLElement).style.backgroundColor = color;
  }

  disconnectedCallback() {}

  attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {
    const shadow = this.#shadow;

    switch (attrName) {
      case "percent":
        (shadow.getElementById("percent-text") as HTMLElement).textContent =
          newVal + "%";
        (shadow.getElementById("progress-inner") as HTMLElement).style.width =
          newVal + "%";
        break;
      case "height":
        (shadow.getElementById(
          "container"
        ) as HTMLElement).style.height = newVal;
      case "color":
        (shadow.getElementById(
          "progress-inner"
        ) as HTMLElement).style.backgroundColor = newVal;
        break;
    }
  }

  adoptedCallback() {}
}

customElements.define("x-progress", XProgress);
