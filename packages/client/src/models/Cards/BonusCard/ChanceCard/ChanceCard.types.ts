import { BonusCaseType } from '../BonusCard.types';

export type TChanceCardCase = {
    type: BonusCaseType,
    text: string,
    value?: number
    cellIndex?: number
}
export const chanceCases:TChanceCardCase[] = [
    { type: BonusCaseType.PAY, text: 'Вождение в нетрезвом виде, заплатите 20$', value: 20 },
    { type: BonusCaseType.PAY, text: 'Штраф за превышение скорости, заплатите 15$', value: 15 },
    { type: BonusCaseType.PAY, text: 'Оплата курсов водителей, заплатите 150$', value: 150 },
    { type: BonusCaseType.GET, text: 'Возврат займа, получите 150$', value: 150 },
    { type: BonusCaseType.GET, text: 'Банковские дивиденды, получите 50$', value: 50 },
    { type: BonusCaseType.GET, text: 'Вы выиграли чемпионат по шахматам, получите 100$', value: 100 },
    { type: BonusCaseType.MOVING_WITH_START, text: 'Отправляйтесь на улицу Сухарева, если вы проходите "Старт" получите 200$', cellIndex: 8 },
    { type: BonusCaseType.MOVING_WITH_START, text: 'Отправляйтесь на старт', cellIndex: 0 },
    { type: BonusCaseType.MOVING_WITHOUT_START, text: 'Отправляйтесь на улицу Арбат', cellIndex: 39 },
    { type: BonusCaseType.MOVING_WITH_START, text: 'Отправляйтесь на площадь Маяковского, если вы проходите "Старт" получите 200$', cellIndex: 24 },
    { type: BonusCaseType.MOVING_WITH_START, text: 'Отправляйтесь на Невский проспект, если вы проходите "Старт" получите 200$', cellIndex: 26 },

];
export interface IChanceCard {
    cases: TChanceCardCase[]

}
