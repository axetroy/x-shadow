class XDrawingBoard extends HTMLElement {
  #shadow!: ShadowRoot;
  #canvas!: HTMLCanvasElement;
  #context!: CanvasRenderingContext2D;
  #width: number = 300;
  #height: number = 150;
  #color: string = "#000";
  static get observedAttributes() {
    return ["width", "height", "color"];
  }
  constructor() {
    super();

    this.#shadow = this.attachShadow({ mode: "open" });

    const canvas = document.createElement("canvas");
    this.#canvas = canvas;

    this.#shadow.append(canvas);
  }

  public get width(): number {
    return this.#width;
  }

  public get height(): number {
    return this.#height;
  }

  public connectedCallback() {
    const _width = this.getAttribute("width");
    const _height = this.getAttribute("height");
    const _color = this.getAttribute("color");

    if (_width && !isNaN(+_width)) {
      this.#width = +_width;
    }

    if (_height && !isNaN(+_height)) {
      this.#height = +_height;
    }

    if (_color) {
      this.#color = _color;
    }

    const canvas = this.#canvas;

    canvas.width = this.width;
    canvas.height = this.height;

    this.style.width = this.width + "px";
    this.style.height = this.height + "px";
    this.style.display = "inline-block";

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.#context = ctx;
    this.#context.fillStyle = this.#color;
    this.#context.strokeStyle = this.#color;

    window.document.documentElement.addEventListener("mouseup", this.#end, {
      passive: false,
    });
    canvas.addEventListener("mousedown", this.#start, { passive: false });
    canvas.addEventListener("touchstart", this.#start, { passive: false });
  }

  public disconnectedCallback() {
    window.document.documentElement.removeEventListener("mouseup", this.#end);
    this.#canvas.removeEventListener("mousedown", this.#start);
    this.#canvas.removeEventListener("touchstart", this.#start);
    this.#canvas.removeEventListener("mousemove", this.#move);
    this.#canvas.removeEventListener("touchmove", this.#move);
    this.#canvas.removeEventListener("mouseup", this.#end);
    this.#canvas.removeEventListener("touchend", this.#end);
  }

  public attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {
    switch (attrName) {
      case "color":
        this.#color = newVal;
        break;
      case "width":
        this.#width = +newVal;
        this.#canvas.setAttribute("width", newVal);
        break;
      case "height":
        this.#height = +newVal;
        this.#canvas.setAttribute("height", newVal);
        break;
    }
  }

  public adoptedCallback() {}

  public clear() {
    this.#context.clearRect(0, 0, this.width, this.height);
  }

  public rotate(deg: number) {
    deg = deg % 360;

    const base64 = this.#canvas.toDataURL();

    if (base64) {
      const img = new Image();
      img.onload = () => {
        let cw = img.width, // canvas 宽度
          ch = img.height, // canvas 图片高度
          cx = 0, // canvas x 轴偏移量
          cy = 0; // canvas y 轴偏移量
        switch (deg) {
          case 90:
            cw = img.height;
            ch = img.width;
            cy = img.height * -1;
            break;
          case 180:
            cx = img.width * -1;
            cy = img.height * -1;
            break;
          case 270:
            cw = img.height;
            ch = img.width;
            cx = img.width * -1;
            break;
        }

        // 重新设置 canvas 的宽高
        this.setAttribute("width", cw + "");
        this.setAttribute("height", ch + "");

        // 旋转角度
        this.#context.rotate((deg * Math.PI) / 180);

        // 擦拭画布
        this.#context.clearRect(0, 0, cw, ch);

        // 绘制图片，旋转之后，偏移量不同
        this.#context.drawImage(img, cx, cy);
      };
      img.src = base64;
    }
  }

  public toBase64(type: string = "image/jpg"): string {
    return this.#canvas.toDataURL(type);
  }

  public download(filename: string = "image.jpg") {
    const link = document.createElement("a");
    link.download = filename;
    link.href = this.toBase64();
    link.click();
  }

  #start = (event: TouchEvent | MouseEvent | Event) => {
    let point!: { clientX: number; clientY: number };
    // safari: PC mode is not have `TouchEvent` in global object
    if (typeof TouchEvent !== "undefined" && event instanceof TouchEvent) {
      point = event.changedTouches[0];
    } else {
      point = event as MouseEvent;
    }
    const stroke_info = this.#canvas.getBoundingClientRect();
    this.#context.beginPath(); // clear path
    this.#context.moveTo(point.clientX - stroke_info.left, point.clientY - stroke_info.top);

    this.#canvas.addEventListener("mousemove", this.#move, { passive: false });
    this.#canvas.addEventListener("touchmove", this.#move, { passive: false });

    this.#canvas.addEventListener("mouseup", this.#end, { passive: false });
    this.#canvas.addEventListener("touchend", this.#end, { passive: false });
    event.preventDefault();
  };

  #move = (event: TouchEvent | MouseEvent | Event) => {
    let point!: { clientX: number; clientY: number };
    // safari: PC mode is not have `TouchEvent` in global object
    if (typeof TouchEvent !== "undefined" && event instanceof TouchEvent) {
      point = event.changedTouches[0];
    } else {
      point = event as MouseEvent;
    }
    const stroke_info = this.#canvas.getBoundingClientRect();
    this.#context.lineTo(point.clientX - stroke_info.left, point.clientY - stroke_info.top);
    this.#context.stroke();
    event.preventDefault();
  };

  #end = (event: TouchEvent | MouseEvent | Event) => {
    this.#canvas.removeEventListener("mousemove", this.#move);
    this.#canvas.removeEventListener("touchmove", this.#move);
    event.preventDefault();
  };
}

customElements.define("x-drawing-board", XDrawingBoard);
