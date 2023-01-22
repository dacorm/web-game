import { Cell } from '../../../models/Cell/Cell';
import imgStart from '../../../assets/img/sprites/start.png';
import imgGoJail from '../../../assets/img/sprites/go-jail.png';
import imgJail from '../../../assets/img/sprites/jail.png';
import imgParking from '../../../assets/img/sprites/parking.png';
import imgPowerPlant from '../../../assets/img/sprites/power-plant.png';
import imgChance from '../../../assets/img/sprites/chance.png';
import imgRailwayStation from '../../../assets/img/sprites/railway-station.png';
import imgSuperTax from '../../../assets/img/sprites/super-tax.png';
import imgTax from '../../../assets/img/sprites/tax.png';
import imgTreasury from '../../../assets/img/sprites/treasury.png';
import imgWaterSupply from '../../../assets/img/sprites/water-supply.png';
import { BoardCellAxis, BoardCellGroup, BoardCellType } from '../../types';
import Property from '../../../models/Cards/Card/PropertyCard/PropertyCard';

function createDepartment(name: string, axis: BoardCellAxis, image: string, type?: BoardCellType): Cell {
    return new Cell({
        type: type ?? BoardCellType.department, name, axis, image, department: true,
    });
}
function createProperty(name: string, group: BoardCellGroup, axis: BoardCellAxis): Cell {
    return new Cell({
        type: BoardCellType.property,
        group,
        name,
        axis,
        card: new Property(1000, name), // нужно будет везде передавать это поле, пока данные карты захардкожены
    });
}
// когда не знаешь что это и какой должен быть функционал
function createQuestion(name: string, axis: BoardCellAxis, image?: string): Cell {
    return new Cell({
        type: BoardCellType['???'], name, axis, image,
    });
}
function createTax(axis: BoardCellAxis): Cell {
    return new Cell({
        type: BoardCellType.tax, name: 'Подоходный налог', axis, image: imgTax,
    });
}
function createStation(axis: BoardCellAxis): Cell {
    return new Cell({
        type: BoardCellType.station, name: 'Железная дорога', axis, image: imgRailwayStation,
    });
}
function createChance(axis: BoardCellAxis): Cell {
    return new Cell({
        type: BoardCellType.chance, name: 'Шанс', axis, image: imgChance,
    });
}

export const boardStageData = () => ({
    cells: [
        createDepartment('Старт', BoardCellAxis.top, imgStart),
        createProperty('Житная улица', BoardCellGroup.goldenrod, BoardCellAxis.top),
        createQuestion('Общественная казана', BoardCellAxis.top, imgTreasury),
        createProperty('Нагатинская улица', BoardCellGroup.goldenrod, BoardCellAxis.top),
        createTax(BoardCellAxis.top),
        createStation(BoardCellAxis.top),
        createProperty('Варшавское шоссе', BoardCellGroup.limeGreen, BoardCellAxis.top),
        createChance(BoardCellAxis.top),
        createProperty('улица Сухарева', BoardCellGroup.limeGreen, BoardCellAxis.top),
        createProperty('Первая портовая улица', BoardCellGroup.limeGreen, BoardCellAxis.top),

        createDepartment('Тюрьма', BoardCellAxis.right, imgJail, BoardCellType.prison),
        createProperty('Полянка улица', BoardCellGroup.deepPink, BoardCellAxis.right),
        createQuestion('Электростанция', BoardCellAxis.right, imgPowerPlant),
        createProperty('Средняя улица', BoardCellGroup.deepPink, BoardCellAxis.right),
        createProperty('Ростовская набережная', BoardCellGroup.deepPink, BoardCellAxis.right),
        createStation(BoardCellAxis.right),
        createProperty('Рязанский проспект', BoardCellGroup.darkOrange, BoardCellAxis.right),
        createQuestion('Общественная казана', BoardCellAxis.right, imgTreasury),
        createProperty('улица Вавилова', BoardCellGroup.darkOrange, BoardCellAxis.right),
        createProperty('Рублевское шоссе', BoardCellGroup.darkOrange, BoardCellAxis.right),

        createDepartment('Бесплатная стоянка', BoardCellAxis.bottom, imgParking, BoardCellType.stage),
        createProperty('Нарвская улица', BoardCellGroup.salmon, BoardCellAxis.bottom),
        createChance(BoardCellAxis.bottom),
        createProperty('Пискаревский проспект', BoardCellGroup.salmon, BoardCellAxis.bottom),
        createProperty('Площадь Маяковского', BoardCellGroup.salmon, BoardCellAxis.bottom),
        createStation(BoardCellAxis.bottom),
        createProperty('Невский проспект', BoardCellGroup.linen, BoardCellAxis.bottom),
        createProperty('Улица Чайковского', BoardCellGroup.linen, BoardCellAxis.bottom),
        createQuestion('Водопровод', BoardCellAxis.bottom, imgWaterSupply),
        createProperty('Смоленская площадь', BoardCellGroup.linen, BoardCellAxis.bottom),

        createDepartment('Тюрьма', BoardCellAxis.left, imgGoJail, BoardCellType.prison),
        createProperty('Улица Гусева', BoardCellGroup.indigo, BoardCellAxis.left),
        createProperty('Гоголевский бульвар', BoardCellGroup.indigo, BoardCellAxis.left),
        createQuestion('Общественная казана', BoardCellAxis.left, imgTreasury),
        createProperty('Кутузовский проспект', BoardCellGroup.indigo, BoardCellAxis.left),
        createStation(BoardCellAxis.left),
        createChance(BoardCellAxis.left),
        createProperty('Улица Малая Бронная', BoardCellGroup.royalBlue, BoardCellAxis.left),
        createQuestion('Сверхналог', BoardCellAxis.left, imgSuperTax),
        createProperty('Улица Арбат', BoardCellGroup.royalBlue, BoardCellAxis.left),
    ],
});
