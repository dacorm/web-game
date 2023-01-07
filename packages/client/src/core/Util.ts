import { Canvas } from './Canvas/helpers/Canvas';

type BoardItemSize = { x: number; y: number; width: number; height: number }

const myNum = 0.05 as const;
export const boardSize = 9 as const;

// сюда засовываем различные помощники для работы с канвас
export const Util = {
    createCanvasElement() {
        return document.createElement('canvas');
    },

    getCornerItemSize(canvas: Canvas): BoardItemSize {
        return {
            x: Math.trunc(canvas.width - canvas.width * Math.PI * myNum),
            y: Math.trunc(canvas.height - canvas.height * Math.PI * myNum),
            width: Math.trunc(canvas.width * Math.PI * myNum),
            height: Math.trunc(canvas.height * Math.PI * myNum),
        };
    },

    getHorizontalItemSize(
        canvas: Canvas,
    ): Pick<BoardItemSize, 'width' | 'height'> {
        const size = this.getCornerItemSize(canvas);
        const itemWidth = (canvas.width - size.width * 2) / boardSize;
        return {
            width: Math.trunc(itemWidth),
            height: Math.trunc(size.height),
        };
    },

    getVerticalItemSize(canvas: Canvas): Pick<BoardItemSize, 'width' | 'height'> {
        const size = this.getCornerItemSize(canvas);
        const itemHeight = (canvas.height - size.height * 2) / boardSize;
        return {
            width: Math.trunc(size.width),
            height: Math.trunc(itemHeight),
        };
    },

    randomColor() {
        // eslint-disable-next-line
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
