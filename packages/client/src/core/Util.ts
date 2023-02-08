import { Canvas } from './Canvas/helpers/Canvas';
import { BoardItemSize, Sizes } from './types';

const baseSize = 0.14 as const;
export const boardCount = 9 as const;

// сюда засовываем различные помощники для работы с канвас
export const Util = {
    createCanvasElement() {
        return document.createElement('canvas');
    },

    getCornerItemSize(canvas: Canvas): BoardItemSize {
        return {
            x: Math.round(canvas.width - canvas.width * baseSize),
            y: Math.round(canvas.height - canvas.height * baseSize),
            width: Math.round(canvas.width * baseSize),
            height: Math.round(canvas.height * baseSize),
        };
    },

    getHorizontalItemSize(
        canvas: Canvas,
    ): Pick<BoardItemSize, Sizes.width | Sizes.height> {
        const size = this.getCornerItemSize(canvas);
        const itemWidth = Math.round((canvas.width - size.width * 2) / boardCount);
        return { width: itemWidth, height: size.height };
    },

    getVerticalItemSize(canvas: Canvas): Pick<BoardItemSize, Sizes.width | Sizes.height> {
        const size = this.getCornerItemSize(canvas);
        const itemHeight = Math.round((canvas.height - size.height * 2) / boardCount);
        return { width: size.width, height: itemHeight };
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

    playerColors() {
        return [
            '#D8D050',
            '#00FF00',
            '#4B89D6',
            '#FE0000',
            '#FF00FF',
            '#0000FF',
            '#FFFFFF',

        ];
    },

};
