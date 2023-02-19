import { BonusCaseType } from '../BonusCard.types';

export type TBoxCardCase = {
    type: BonusCaseType,
    text: string,
    value?: number
    cellIndex?: number
}
export const boxCases:TBoxCardCase[] = [
    { type: BonusCaseType.PAY, text: 'Оплата лечения, заплатите 100$', value: 100 },
    { type: BonusCaseType.PAY, text: 'Оплата услуг доктора, заплатите 50$', value: 50 },
    { type: BonusCaseType.GET, text: 'Выгодная продажа акций, получите  25$', value: 25 },
    { type: BonusCaseType.PAY, text: 'Оплата страховки, заплатите 50$', value: 50 },
    { type: BonusCaseType.PAY, text: 'Заплатите штраф 10$', value: 10 },
    { type: BonusCaseType.GET, text: 'Возмещение налога, получите 25$', value: 25 },
    { type: BonusCaseType.GET, text: 'Выгодня продажа облигаций, получите 50$', value: 50 },
    { type: BonusCaseType.GET, text: 'С днем рождения, получите 50$', value: 50 },
    { type: BonusCaseType.GET, text: 'Банквоская ошибка в вашу пользу, получите 200$', value: 200 },
    { type: BonusCaseType.GET, text: 'Вы получили наследство, получите 100$', value: 100 },
    { type: BonusCaseType.GET, text: 'Вы заняли 2-ое место на конкурсе красоты, получите 10$', value: 10 },
    { type: BonusCaseType.GET, text: 'Сбор ренты, получите 100$', value: 100 },
    { type: BonusCaseType.MOVING_WITHOUT_START, text: 'Отправляйтесь на первую жд дорогу', cellIndex: 5 },
];
export interface IBoxCard {
    cases: TBoxCardCase[]

}
