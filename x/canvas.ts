interface Paragraph {
  index: number;
  text: string;
}

class XCanvas extends HTMLElement {
  #canvas!: HTMLCanvasElement;
  #ctx!: CanvasRenderingContext2D;
  #shadow!: ShadowRoot;
  #lineHeight: number = 4; // 行间距
  #ob: ResizeObserver;

  constructor() {
    super();

    this.#shadow = this.attachShadow({ mode: "closed" });

    const canvas = document.createElement("canvas");
    this.#canvas = canvas;

    this.#shadow.append(canvas);

    let containerWidth = this.parentElement?.getBoundingClientRect().width || 0;

    this.#ob = new ResizeObserver((entries) => {
      const entry = entries.find((v) => v.target === this.parentElement);

      if (!entry) return;

      // container width not change
      if (entry.contentRect.width === containerWidth) return;

      containerWidth = entry.contentRect.width;

      this.render();
    });
  }

  private get fontSize() {
    return parseInt(window.getComputedStyle(this).fontSize);
  }

  private get fontFamily() {
    return window.getComputedStyle(this).fontFamily;
  }

  private privateParse(text: string) {
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

        const textWidth = this.#ctx.measureText(char).width;

        if (textWidth > this.#canvas.width) {
          paragraph.push(line.slice(start, end - 1));
          start = end - 1;
        } else if (end === line.length) {
          paragraph.push(char);
          break loop;
        }

        end++;
      }
    }

    return paragraph;
  }

  private setCanvasStyle() {
    // 渲染整行
    this.#ctx.font = `${this.fontSize}px ${this.fontFamily}`;
    this.#ctx.fillStyle = "#000";
    this.#ctx.textAlign = "left";
    this.#ctx.textBaseline = "top";
  }

  private render() {
    this.#canvas.width = this.parentElement?.getBoundingClientRect().width ?? 100;
    this.setCanvasStyle();

    const text = this.textContent || "";

    const indents = text
      .split("\n")
      .filter((v) => /^\s*$/.test(v) === false)
      .map((v) => {
        const match = /^\s+/.exec(v);

        if (!match || !match.length) return 0;

        return match[0].length;
      });

    const indent = Math.min(...indents);

    const source = text
      .trim()
      .split("\n")
      .map((v) => v.replace(new RegExp(`^\\s{${indent}}`), ""))
      .join("\n");

    const paragraphs = this.privateParse(source);

    const height = paragraphs.length * this.fontSize + (paragraphs.length - 1) * this.#lineHeight;

    this.#canvas.height = height;
    this.style.width = this.#canvas.width + "px";
    this.style.height = this.#canvas.height + "px";
    this.style.display = "inline-block";

    this.setCanvasStyle();

    paragraphs.forEach((p, index) => {
      const x = 0;
      const y = index * this.fontSize + (index === 0 ? 0 : index * this.#lineHeight);
      this.#ctx.fillText(p, x, y);
    });
  }

  connectedCallback() {
    const canvas = this.#canvas;

    this.#ob.observe(this.parentElement!);

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.#ctx = ctx;

    requestAnimationFrame(() => {
      this.render();
    });
  }

  disconnectedCallback() {
    this.#ob.disconnect();
  }

  attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {}

  adoptedCallback() {}
}

customElements.define("x-canvas", XCanvas);
