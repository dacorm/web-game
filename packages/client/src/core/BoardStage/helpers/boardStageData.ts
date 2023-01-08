import { Rect } from '../../Shapes/Rect';

export enum BoardCellAxis {
  top,
  right,
  bottom,
  left,
}
export enum BoardCellGroup {
  brown,
  red,
  blue,
  green,
  violet,
  orange,
  pink,
  white,
}
export enum BoardCellType {
  '???',
  department,
  property,
  tax,
  chance,
  prison,
  station,
  stage,
}

export type CellType = {
  name: string
  type?: BoardCellType
  group?: BoardCellGroup
  axis?: BoardCellAxis
  shape?: Rect
}

export const boardStageData = () => {
    function createDepartment(name: string, axis: BoardCellAxis, type?: BoardCellType): CellType {
        return { type: type ?? BoardCellType.department, name, axis };
    }
    function createProperty(name: string, group: BoardCellGroup, axis: BoardCellAxis): CellType {
        return {
            type: BoardCellType.property, group, name, axis,
        };
    }
    // когда не знаешь что это и какой должен быть функционал
    function createQuestion(name: string, axis: BoardCellAxis): CellType {
        return { type: BoardCellType['???'], name, axis };
    }
    function createTax(axis: BoardCellAxis): CellType {
        return { type: BoardCellType.tax, name: 'Подоходный налог', axis };
    }
    function createStation(axis: BoardCellAxis): CellType {
        return { type: BoardCellType.station, name: 'Железная дорога', axis };
    }
    function createChance(axis: BoardCellAxis): CellType {
        return { type: BoardCellType.chance, name: 'Шанс', axis };
    }

    return {
        cells: [
            createDepartment('Старт', BoardCellAxis.top),
            createProperty('Житная улица', BoardCellGroup.brown, BoardCellAxis.top),
            createQuestion('Общественная казана', BoardCellAxis.top),
            createProperty('Нагатинская улица', BoardCellGroup.brown, BoardCellAxis.top),
            createTax(BoardCellAxis.top),
            createStation(BoardCellAxis.top),
            createProperty('Варшавское шоссе', BoardCellGroup.violet, BoardCellAxis.top),
            createChance(BoardCellAxis.top),
            createProperty('улица Сухарева', BoardCellGroup.violet, BoardCellAxis.top),
            createProperty('Первая портовая улица', BoardCellGroup.violet, BoardCellAxis.top),

            createDepartment('Тюрьма', BoardCellAxis.right, BoardCellType.prison),
            createProperty('Полянка улица', BoardCellGroup.pink, BoardCellAxis.right),
            createQuestion('Электростанция', BoardCellAxis.right),
            createProperty('Средняя улица', BoardCellGroup.pink, BoardCellAxis.right),
            createProperty('Ростовская набережная', BoardCellGroup.pink, BoardCellAxis.right),
            createStation(BoardCellAxis.right),
            createProperty('Рязанский проспект', BoardCellGroup.orange, BoardCellAxis.right),
            createQuestion('Общественная казана', BoardCellAxis.right),
            createProperty('улица Вавилова', BoardCellGroup.orange, BoardCellAxis.right),
            createProperty('Рублевское шоссе', BoardCellGroup.orange, BoardCellAxis.right),

            createDepartment('Бесплатная стоянка', BoardCellAxis.bottom, BoardCellType.stage),
            createProperty('Нарвская улица', BoardCellGroup.red, BoardCellAxis.bottom),
            createChance(BoardCellAxis.bottom),
            createProperty('Пискаревский проспект', BoardCellGroup.red, BoardCellAxis.bottom),
            createProperty('Площадь Маяковского', BoardCellGroup.red, BoardCellAxis.bottom),
            createStation(BoardCellAxis.bottom),
            createProperty('Невский проспект', BoardCellGroup.white, BoardCellAxis.bottom),
            createProperty('Улица Чайковского', BoardCellGroup.white, BoardCellAxis.bottom),
            createQuestion('Водопровод', BoardCellAxis.bottom),
            createProperty('Смоленская площадь', BoardCellGroup.white, BoardCellAxis.bottom),

            createDepartment('Тюрьма', BoardCellAxis.left, BoardCellType.prison),
            createProperty('Улица Гусева', BoardCellGroup.green, BoardCellAxis.left),
            createProperty('Гоголевский бульвар', BoardCellGroup.green, BoardCellAxis.left),
            createQuestion('Общественная казана', BoardCellAxis.left),
            createProperty('Кутузовский проспект', BoardCellGroup.green, BoardCellAxis.left),
            createStation(BoardCellAxis.left),
            createChance(BoardCellAxis.left),
            createProperty('Улица Малая Бронная', BoardCellGroup.blue, BoardCellAxis.left),
            createQuestion('Сверхналог', BoardCellAxis.left),
            createProperty('Улица Арбат', BoardCellGroup.blue, BoardCellAxis.left),

        ],
    };
};
