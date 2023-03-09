import { Cell } from '../../../models/Cell/Cell';
import imgStart from '../../../assets/img/sprites/start.png';
import imgGoJail from '../../../assets/img/sprites/go-jail.png';
import imgJail from '../../../assets/img/sprites/jail.png';
import imgParking from '../../../assets/img/sprites/parking.png';
import imgChance from '../../../assets/img/sprites/chance.png';
import imgRailwayStation from '../../../assets/img/sprites/railway-station.png';
import imgTax from '../../../assets/img/sprites/tax.png';
import imgTreasury from '../../../assets/img/sprites/treasury.png';
import { BoardCellAxis, BoardCellGroup, BoardCellType } from '../../types';
import PropertyCard from '../../../models/Cards/PropertyCard/PropertyCard';
import StationCard from '../../../models/Cards/StationCard';
import BoxCard from '../../../models/Cards/BonusCard/BoxCard/BoxCard';
import ChanceCard from '../../../models/Cards/BonusCard/ChanceCard';
import TaxCard from '../../../models/Cards/TaxCard';

function createDepartment(name: string, axis: BoardCellAxis, image: string, type?: BoardCellType): Cell {
    return new Cell({
        type: type ?? BoardCellType.department, name, axis, image, department: true,
    });
}

export type TPricesProperty = {
    buyCard: number,
    sellCard: number
    buyHouse: number
    rentWithoutBuildings: number,
    rentWithOneHouse : number
    rentWithTwoHouse : number
    rentWithThreeHouse : number
    rentWithFourHouse : number
    rentWithHotel: number
}

export type TPricesStation = {
    buyCard: number
    sellCard: number
    rentWithOnePort: number
    rentWithTwoPort: number
    rentWithThreePort: number
    rentWithFourPort: number
}
function createProperty(name: string, group: BoardCellGroup, axis: BoardCellAxis, prices: TPricesProperty): Cell {
    return new Cell({
        type: BoardCellType.property,
        group,
        name,
        axis,
        card: new PropertyCard({
            name, group, prices, type: BoardCellType.property,
        }), // нужно будет везде передавать это поле, пока данные карты захардкожены
    });
}
// // когда не знаешь что это и какой должен быть функционал
// function createQuestion(name: string, axis: BoardCellAxis, image?: string): Cell {
//     return new Cell({
//         type: BoardCellType['???'], name, axis, image,
//     });
// }
function createTax(axis: BoardCellAxis): Cell {
    return new Cell({
        type: BoardCellType.tax,
        name: 'Подоходный налог',
        axis,
        image: imgTax,
        card: new TaxCard({
            name: 'Подоходный налог',
            type: BoardCellType.tax,
        }),
    });
}

function createBox(axis: BoardCellAxis): Cell {
    return new Cell({
        type: BoardCellType.box,
        name: 'Общественная казна',
        axis,
        image: imgTreasury,
        card: BoxCard.getInstance(),
    });
}
function createStation(axis: BoardCellAxis): Cell {
    return new Cell({
        type: BoardCellType.station,
        name: 'Железная дорога',
        axis,
        image: imgRailwayStation,
        card: new StationCard({
            prices: {
                buyCard: 200,
                sellCard: 100,
                rentWithOnePort: 25,
                rentWithTwoPort: 50,
                rentWithThreePort: 100,
                rentWithFourPort: 200,
            },
            type: BoardCellType.station,
            name: 'Железная дорога',
        }),
    });
}
function createChance(axis: BoardCellAxis): Cell {
    return new Cell({
        type: BoardCellType.chance,
        name: 'Шанс',
        axis,
        image: imgChance,
        card: ChanceCard.getInstance(),
    });
}

export const boardStageData = () => ({
    cells: [
        createDepartment('Старт', BoardCellAxis.top, imgStart),
        createProperty(
            'Житная улица',
            BoardCellGroup.goldenrod,
            BoardCellAxis.top,
            {
                buyCard: 60,
                sellCard: 30,
                buyHouse: 50,
                rentWithoutBuildings: 2,
                rentWithOneHouse: 10,
                rentWithTwoHouse: 30,
                rentWithThreeHouse: 90,
                rentWithFourHouse: 160,
                rentWithHotel: 250,
            },
        ),
        createBox(BoardCellAxis.top),
        createProperty(
            'Нагатинская улица',
            BoardCellGroup.goldenrod,
            BoardCellAxis.top,
            {
                buyCard: 60,
                sellCard: 30,
                buyHouse: 50,
                rentWithoutBuildings: 4,
                rentWithOneHouse: 20,
                rentWithTwoHouse: 60,
                rentWithThreeHouse: 180,
                rentWithFourHouse: 320,
                rentWithHotel: 450,
            },
        ),
        createTax(BoardCellAxis.top),
        createStation(BoardCellAxis.top),
        createProperty(
            'Варшавское шоссе',
            BoardCellGroup.limeGreen,
            BoardCellAxis.top,
            {
                buyCard: 100,
                sellCard: 50,
                buyHouse: 50,
                rentWithoutBuildings: 6,
                rentWithOneHouse: 30,
                rentWithTwoHouse: 90,
                rentWithThreeHouse: 270,
                rentWithFourHouse: 400,
                rentWithHotel: 550,
            },
        ),
        createChance(BoardCellAxis.top),
        createProperty(
            'улица Сухарева',
            BoardCellGroup.limeGreen,
            BoardCellAxis.top,
            {
                buyCard: 100,
                sellCard: 50,
                buyHouse: 50,
                rentWithoutBuildings: 6,
                rentWithOneHouse: 30,
                rentWithTwoHouse: 90,
                rentWithThreeHouse: 270,
                rentWithFourHouse: 400,
                rentWithHotel: 550,
            },
        ),
        createProperty(
            'Первая портовая улица',
            BoardCellGroup.limeGreen,
            BoardCellAxis.top,
            {
                buyCard: 120,
                sellCard: 60,
                buyHouse: 50,
                rentWithoutBuildings: 8,
                rentWithOneHouse: 40,
                rentWithTwoHouse: 100,
                rentWithThreeHouse: 300,
                rentWithFourHouse: 450,
                rentWithHotel: 600,
            },
        ),

        createDepartment(
            'Тюрьма',
            BoardCellAxis.right,
            imgJail,
            BoardCellType.prison,
        ),
        createProperty(
            'Полянка улица',
            BoardCellGroup.deepPink,
            BoardCellAxis.right,
            {
                buyCard: 140,
                sellCard: 70,
                buyHouse: 100,
                rentWithoutBuildings: 10,
                rentWithOneHouse: 50,
                rentWithTwoHouse: 150,
                rentWithThreeHouse: 450,
                rentWithFourHouse: 625,
                rentWithHotel: 750,
            },
        ),
        createTax(BoardCellAxis.right),

        createProperty(
            'Средняя улица',
            BoardCellGroup.deepPink,
            BoardCellAxis.right,
            {
                buyCard: 140,
                sellCard: 70,
                buyHouse: 100,
                rentWithoutBuildings: 10,
                rentWithOneHouse: 50,
                rentWithTwoHouse: 150,
                rentWithThreeHouse: 450,
                rentWithFourHouse: 625,
                rentWithHotel: 750,
            },
        ),
        createProperty(
            'Ростовская набережная',
            BoardCellGroup.deepPink,
            BoardCellAxis.right,
            {
                buyCard: 160,
                sellCard: 80,
                buyHouse: 100,
                rentWithoutBuildings: 12,
                rentWithOneHouse: 60,
                rentWithTwoHouse: 180,
                rentWithThreeHouse: 500,
                rentWithFourHouse: 700,
                rentWithHotel: 900,
            },
        ),
        createStation(BoardCellAxis.right),
        createProperty(
            'Рязанский проспект',
            BoardCellGroup.darkOrange,
            BoardCellAxis.right,
            {
                buyCard: 180,
                sellCard: 90,
                buyHouse: 100,
                rentWithoutBuildings: 14,
                rentWithOneHouse: 70,
                rentWithTwoHouse: 200,
                rentWithThreeHouse: 550,
                rentWithFourHouse: 750,
                rentWithHotel: 950,
            },
        ),
        createBox(BoardCellAxis.right),
        createProperty(
            'улица Вавилова',
            BoardCellGroup.darkOrange,
            BoardCellAxis.right,
            {
                buyCard: 180,
                sellCard: 90,
                buyHouse: 100,
                rentWithoutBuildings: 14,
                rentWithOneHouse: 70,
                rentWithTwoHouse: 200,
                rentWithThreeHouse: 550,
                rentWithFourHouse: 750,
                rentWithHotel: 950,
            },
        ),
        createProperty(
            'Рублевское шоссе',
            BoardCellGroup.darkOrange,
            BoardCellAxis.right,
            {
                buyCard: 200,
                sellCard: 100,
                buyHouse: 100,
                rentWithoutBuildings: 16,
                rentWithOneHouse: 80,
                rentWithTwoHouse: 220,
                rentWithThreeHouse: 600,
                rentWithFourHouse: 800,
                rentWithHotel: 1000,
            },
        ),

        createDepartment(
            'Бесплатная стоянка',
            BoardCellAxis.bottom,
            imgParking,
            BoardCellType.stage,
        ),
        createProperty(
            'Нарвская улица',
            BoardCellGroup.salmon,
            BoardCellAxis.bottom,
            {
                buyCard: 220,
                sellCard: 110,
                buyHouse: 150,
                rentWithoutBuildings: 18,
                rentWithOneHouse: 90,
                rentWithTwoHouse: 250,
                rentWithThreeHouse: 700,
                rentWithFourHouse: 875,
                rentWithHotel: 1050,
            },
        ),
        createChance(BoardCellAxis.bottom),
        createProperty(
            'Пискаревский проспект',
            BoardCellGroup.salmon,
            BoardCellAxis.bottom,
            {
                buyCard: 220,
                sellCard: 110,
                buyHouse: 150,
                rentWithoutBuildings: 18,
                rentWithOneHouse: 90,
                rentWithTwoHouse: 250,
                rentWithThreeHouse: 700,
                rentWithFourHouse: 875,
                rentWithHotel: 1050,
            },
        ),
        createProperty(
            'Площадь Маяковского',
            BoardCellGroup.salmon,
            BoardCellAxis.bottom,
            {
                buyCard: 240,
                sellCard: 120,
                buyHouse: 150,
                rentWithoutBuildings: 20,
                rentWithOneHouse: 100,
                rentWithTwoHouse: 300,
                rentWithThreeHouse: 750,
                rentWithFourHouse: 925,
                rentWithHotel: 1100,
            },
        ),
        createStation(BoardCellAxis.bottom),
        createProperty(
            'Невский проспект',
            BoardCellGroup.linen,
            BoardCellAxis.bottom,
            {
                buyCard: 260,
                sellCard: 130,
                buyHouse: 150,
                rentWithoutBuildings: 22,
                rentWithOneHouse: 110,
                rentWithTwoHouse: 330,
                rentWithThreeHouse: 800,
                rentWithFourHouse: 975,
                rentWithHotel: 1150,
            },
        ),
        createProperty(
            'Улица Чайковского',
            BoardCellGroup.linen,
            BoardCellAxis.bottom,
            {
                buyCard: 260,
                sellCard: 130,
                buyHouse: 150,
                rentWithoutBuildings: 22,
                rentWithOneHouse: 110,
                rentWithTwoHouse: 330,
                rentWithThreeHouse: 800,
                rentWithFourHouse: 975,
                rentWithHotel: 1150,
            },
        ),
        createTax(BoardCellAxis.bottom),
        createProperty(
            'Смоленская площадь',
            BoardCellGroup.linen,
            BoardCellAxis.bottom,
            {
                buyCard: 280,
                sellCard: 140,
                buyHouse: 150,
                rentWithoutBuildings: 24,
                rentWithOneHouse: 120,
                rentWithTwoHouse: 360,
                rentWithThreeHouse: 850,
                rentWithFourHouse: 1025,
                rentWithHotel: 1200,
            },
        ),

        createDepartment(
            'Тюрьма',
            BoardCellAxis.left,
            imgGoJail,
            BoardCellType.prison,
        ),
        createProperty('Улица Гусева', BoardCellGroup.indigo, BoardCellAxis.left, {
            buyCard: 300,
            sellCard: 150,
            buyHouse: 200,
            rentWithoutBuildings: 26,
            rentWithOneHouse: 130,
            rentWithTwoHouse: 390,
            rentWithThreeHouse: 900,
            rentWithFourHouse: 1100,
            rentWithHotel: 1275,
        }),
        createProperty(
            'Гоголевский бульвар',
            BoardCellGroup.indigo,
            BoardCellAxis.left,
            {
                buyCard: 300,
                sellCard: 150,
                buyHouse: 200,
                rentWithoutBuildings: 26,
                rentWithOneHouse: 130,
                rentWithTwoHouse: 390,
                rentWithThreeHouse: 900,
                rentWithFourHouse: 1100,
                rentWithHotel: 1275,
            },
        ),
        createBox(BoardCellAxis.left),
        createProperty(
            'Кутузовский проспект',
            BoardCellGroup.indigo,
            BoardCellAxis.left,
            {
                buyCard: 320,
                sellCard: 160,
                buyHouse: 200,
                rentWithoutBuildings: 28,
                rentWithOneHouse: 150,
                rentWithTwoHouse: 450,
                rentWithThreeHouse: 1000,
                rentWithFourHouse: 1200,
                rentWithHotel: 1400,
            },
        ),
        createStation(BoardCellAxis.left),
        createChance(BoardCellAxis.left),
        createProperty(
            'Улица Малая Бронная',
            BoardCellGroup.royalBlue,
            BoardCellAxis.left,
            {
                buyCard: 350,
                sellCard: 175,
                buyHouse: 200,
                rentWithoutBuildings: 35,
                rentWithOneHouse: 175,
                rentWithTwoHouse: 500,
                rentWithThreeHouse: 1100,
                rentWithFourHouse: 1300,
                rentWithHotel: 1500,
            },
        ),
        createTax(BoardCellAxis.left),
        createProperty(
            'Улица Арбат',
            BoardCellGroup.royalBlue,
            BoardCellAxis.left,
            {
                buyCard: 400,
                sellCard: 200,
                buyHouse: 200,
                rentWithoutBuildings: 50,
                rentWithOneHouse: 200,
                rentWithTwoHouse: 600,
                rentWithThreeHouse: 1400,
                rentWithFourHouse: 1700,
                rentWithHotel: 2000,
            },
        ),
    ],
});
