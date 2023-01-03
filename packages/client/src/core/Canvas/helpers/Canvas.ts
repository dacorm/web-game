import { Util } from '../../Util';

interface CanvasConfig {
  width: number
  height: number
  pixelRatio: number
}

export interface Canvas {
  pixelRatio: number
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  width: number
  height: number
  getContext(): CanvasRenderingContext2D
  setWidth(width: number): void
  setHeight(height: number): void
  setSize(width: number, height: number): void
  getWidth(): number
  getHeight(): number
}
/* eslint-disable-next-line */
export class Canvas {
    constructor(config: Partial<CanvasConfig>) {
        this.pixelRatio = config.pixelRatio ?? 2;
        this.width = config.width ?? 0;
        this.height = config.height ?? 0;
        this.canvas = Util.createCanvasElement();
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        this.canvas.style.padding = '0';
        this.canvas.style.margin = '0';
        this.canvas.style.border = '0';
        this.canvas.style.background = 'transparent';
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
    }

    getContext() {
        return this.context;
    }

    getPixelRatio() {
        return this.pixelRatio;
    }

    setWidth(width: number) {
        this.width = width * this.pixelRatio;
        this.canvas.width = this.width;
        this.canvas.style.width = `${width}px`;
    }

    setHeight(height: number) {
        this.height = height * this.pixelRatio;
        this.canvas.height = this.height;
        this.canvas.style.height = `${height}px`;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    setSize(width: number, height: number) {
        this.setWidth(width || 0);
        this.setHeight(height || 0);
    }
}
