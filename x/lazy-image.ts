import debounce from "lodash-es/debounce";

const defaultOffset = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};

export function isInViewport(
  element: HTMLElement,
  options = { offset: defaultOffset, threshold: 0 }
): boolean {
  const {
    top,
    right,
    bottom,
    left,
    width,
    height,
  } = element.getBoundingClientRect();

  const intersection = {
    t: bottom,
    r: window.innerWidth - left,
    b: window.innerHeight - top,
    l: right,
  };

  const threshold = {
    x: options.threshold * width,
    y: options.threshold * height,
  };

  return (
    intersection.t > options.offset.top + threshold.y &&
    intersection.r > options.offset.right + threshold.x &&
    intersection.b > options.offset.bottom + threshold.y &&
    intersection.l > options.offset.left + threshold.x
  );
}

class XLazyImage extends HTMLElement {
  #shadow!: ShadowRoot;
  #src!: string;
  #image = document.createElement("img");

  static get observedAttributes() {
    return [
      "src",
      "srcset",
      "alt",
      "width",
      "height",
      "style",
      "id",
      "class",
      "align",
      "border",
      "ismap",
      "usemap",
      "crossOrigin",
      "referrerPolicy",
      "sizes",
    ];
  }

  constructor() {
    super();

    this.#shadow = this.attachShadow({ mode: "open" });
  }

  #listener = () => {};

  #loadImage = () => {
    if (this.#src) {
      this.#image.src = this.#src;
      this.#image.onload = (res) => {
        this.#shadow.appendChild(this.#image);
      };
    }
  };

  #handle = () => {
    if (isInViewport(this)) {
      this.#loadImage();
    }
  };

  public connectedCallback() {
    const handler = (this.#listener = debounce(this.#handle.bind(this), 100, {
      leading: false,
      trailing: true,
      maxWait: 2000,
    }));

    window.addEventListener("scroll", handler, false);

    this.#handle();
  }

  public disconnectedCallback() {
    window.removeEventListener("scroll", this.#listener);
  }

  public attributeChangedCallback(
    attrName: string,
    oldVal: string,
    newVal: string
  ) {
    switch (attrName) {
      case "src":
        this.#src = newVal;
        if (isInViewport(this)) {
          this.#loadImage();
        }
        break;
      default:
        this.#image.setAttribute(attrName, newVal);
        break;
    }
  }

  public adoptedCallback() {}
}

customElements.define("x-lazy-image", XLazyImage);
