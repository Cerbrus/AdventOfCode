import { ChallengeBase, IAnswer } from '../challenge.base';
import { HandType } from './enums';
import { CardsString, ICardCount, IHand, TCard } from './models';

interface IParseResult {
    hands: Array<IHand>;
}

class Challenge extends ChallengeBase<IParseResult> {
    private _cards = [...CardsString].reverse();
    private _cardValues = this._cards.reduce((acc, card, i) =>
        ({ ...acc, [card]: i }), {} as ICardCount);

    protected parseInput(lines: Array<string>): IParseResult {
        const hands = this.sortPokerHands(lines.map(s => {
            const [cards, bid] = s.split(' ');

            // FML: We're not actually using poker rules.
            // cards = cards.split('').sort((a, b) => _cardValues[b] - _cardValues[a]).join(''),
            return {
                cards,
                bid: Number(bid),
                score: this.calculatePokerScore(cards)
            };
        }));

        return { hands };
    }

    protected processInput(data: IParseResult): IAnswer {
        const answerOne = data.hands
            .reduce((score, hand, index) => score + hand.bid * (index + 1), 0);

        const answerTwo = answerOne;

        return {
            one: answerOne,
            two: answerTwo
        };
    }

    private calculatePokerScore(cards: string) {
        const hasJoker = cards.includes('J');

        if (hasJoker)
            return this.sortPokerHands(this._cards
                    .filter((c: TCard) => c !== 'J')
                    .map((c: TCard) => {
                        const newHand = cards.replace('J', c);
                        return { cards: newHand, score: this.calculatePokerScore(newHand), bid: null };
                    }))
                .pop().score;

        const cardCounts: ICardCount = [...cards]
            .reduce((acc: ICardCount, card: TCard) => ({ ...acc, [card]: (acc[card] ?? 0) + 1 }), {} as ICardCount);
        const cardCountValues = Object.values(cardCounts);
        const entries = Object.entries(cardCounts) as Array<[TCard, number]>;

        if (cardCountValues.includes(5))
            return { type: HandType.FiveOfAKind, highCard: cards[0], rest: '' };

        if (cardCountValues.includes(4))
            return { type: HandType.FourOfAKind, highCard: this.highCard(entries, 4), rest: this.singles(entries) };

        if (cardCountValues.includes(3) && cardCountValues.includes(2))
            return {
                type: HandType.FullHouse,
                highCard: this.highCard(entries, 3),
                rest: this.getSets(entries, 2).map(([card, _]) => card).join('')
            };

        if (cardCountValues.includes(3))
            return { type: HandType.ThreeOfAKind, highCard: this.highCard(entries, 3), rest: this.singles(entries) };

        if (cardCountValues.filter(v => v === 2).length === 2)
            return { type: HandType.TwoPair, highCard: this.getSets(entries, 2)[0][0], rest: this.singles(entries) };

        if (cardCountValues.includes(2))
            return { type: HandType.OnePair, highCard: this.highCard(entries, 2), rest: this.singles(entries) };

        const [highCard, ...rest] = this.getSets(entries, 1).map(([card, _]) => card);
        return { type: HandType.HighCard, highCard, rest: rest.join('') };
    }

    private highCard(counts: Array<[string, number]>, cardsInRow: number): string {
        return counts.find(([_, count]) => count === cardsInRow)![0];
    }

    private getSets(counts: Array<[string, number]>, cardsInRow: number): Array<[string, number]> {
        return counts.filter(([_, count]) => count === cardsInRow)
            .sort((a, b) => this._cardValues[b[0]] - this._cardValues[a[0]]);
    }

    private singles(counts: Array<[string, number]>): string {
        return this.getSets(counts, 1).map(([card, _]) => card).join('');
    }

    private sortPokerHands(hands: Array<IHand>): Array<IHand> {
        return hands.sort((a, b) => this.compareCards(a, b));
    }

    private compareCards(a: IHand, b: IHand): number {
        if (a.score.type !== b.score.type)
            return a.score.type - b.score.type;

        const i = [...a.cards].findIndex((card, index) => {
            return b.cards[index] !== card;
        });

        return this._cardValues[a.cards[i]] - this._cardValues[b.cards[i]];

        // FML: We're not actually using poker rules.
        // const highCardA = _cardValues[a.score.highCard];
        // const highCardB = _cardValues[b.score.highCard];
        //
        // if (highCardA !== highCardB)
        //     return highCardA - highCardB;
        //
        // for (let i = 0; i < a.score.restCards.length; i++) {
        //     const restCardA = _cardValues[a.score.restCards[i]];
        //     const restCardB = _cardValues[b.score.restCards[i]];
        //
        //     if (restCardA !== restCardB)
        //         return restCardA - restCardB;
        // }
        //
        // return 0;
    }
}

new Challenge();