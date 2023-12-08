import { ICardScore } from './card-score.model';

export interface IHand {
    cards: string;
    bid: number;
    score: ICardScore;
}