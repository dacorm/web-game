import { Canvas } from './Canvas/helpers/Canvas';

type BoardItemSize = { x: number; y: number; width: number; height: number }

const myNum = 0.06 as const;
export const boardSize = 9 as const;

// сюда засовываем различные помощники для работы с канвас
export const Util = {
    createCanvasElement() {
        return document.createElement('canvas');
    },

    getCornerItemSize(canvas: Canvas): BoardItemSize {
        return {
            x: canvas.width - canvas.width * Math.PI * myNum,
            y: canvas.height - canvas.height * Math.PI * myNum,
            width: canvas.width * Math.PI * myNum,
            height: canvas.height * Math.PI * myNum,
        };
    },

    getHorizontalItemSize(
        canvas: Canvas,
    ): Pick<BoardItemSize, 'width' | 'height'> {
        const size = this.getCornerItemSize(canvas);
        const itemWidth = (canvas.width - size.width * 2) / boardSize;
        return {
            width: itemWidth,
            height: size.height,
        };
    },

    getVerticalItemSize(canvas: Canvas): Pick<BoardItemSize, 'width' | 'height'> {
        const size = this.getCornerItemSize(canvas);
        const itemHeight = (canvas.height - size.height * 2) / boardSize;
        return {
            width: size.width,
            height: itemHeight,
        };
    },

    randomColor() {
        return `#${(((1 << 24) * Math.random()) | 0).toString(16)}`;
    },

    randomNumber() {
        const random = Math.random() * 5 + 1;
        return Math.floor(random);
    },

    hexToRGB(hex: string, alpha = 1) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    },
};
