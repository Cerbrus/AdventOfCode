import { HandType } from '../enums';

export interface ICardScore {
    type: HandType;
    highCard: string;
    rest: string;
}