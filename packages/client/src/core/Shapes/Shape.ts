export type ShapeProps = {
  fill?: string
  stroke?: string
  strokeWidth?: number
}

export interface Shape {
  fill: string
  stroke: string
  strokeWidth: number
  context: CanvasRenderingContext2D
  drawShape(context: CanvasRenderingContext2D): void
  fillStrokeShape(): void
  fillShape(): void
  strokeShape(): void
  setAttr(attr: string, val: string | number): void
}

export class Shape {
    constructor(props: ShapeProps) {
        this.fill = props.fill || 'transparent';
        this.stroke = props.stroke || '#333';
        this.strokeWidth = props.strokeWidth || 2;
    }

    fillStrokeShape() {
        this.fillShape();
        this.strokeShape();

        this.context.fill();
        this.context.stroke();
    }

    fillShape() {
        this.setAttr('fillStyle', this.fill);
    }

    strokeShape() {
        this.setAttr('lineWidth', this.strokeWidth);
        this.setAttr('strokeStyle', this.stroke);
    }

    setAttr(attr: keyof CanvasRenderingContext2D, val: string | number) {
        (this.context[attr] as string | number) = val;
    }
}
