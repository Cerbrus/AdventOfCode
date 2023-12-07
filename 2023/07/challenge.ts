import { ChallengeBase, IAnswer } from '../challenge.base';

interface IParseResult {
    hands: Array<IHand>;
}

interface IHand {
    cards: string;
    bid: number;
    score: ICardScore;
}

interface ICardScore {
    isFiveOfAKind: boolean;
    isFourOfAKind: boolean;
    isFullHouse: boolean;
    isThreeOfAKind: boolean;
    isTwoPair: boolean;
    isOnePair: boolean;
    isHighCard: boolean;
    highCard: string;
    restCards: string;
}

const Cards = 'AKQJT98765432J'.split('').reverse();

class Challenge extends ChallengeBase<IParseResult> {

    protected parseInput(inputString: string): IParseResult {
        const hands = this.sortPokerHands(inputString.split(/[\r\n]+/).map(s => {
            const [cards, bid] = s.split(' ');

            // FML: We're not actually using poker rules.
            // cards = cards.split('').sort((a, b) => Cards.indexOf(b) - Cards.indexOf(a)).join(''),

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

        if (hasJoker) {
            const possibleScores = this.sortPokerHands(Cards.filter(c => c !== 'J').map(c => {
                const newCards = cards.replace('J', c);
                return { cards: newCards, score: this.calculatePokerScore(newCards), bid: null };
            }));
            return possibleScores.pop().score;
        }

        const cardCounts = [...cards].reduce((acc, current) => ({
            ...acc,
            [current]: (acc[current] ?? 0) + 1
        }), {} as Record<number, number>);
        const cardCountValues = Object.values(cardCounts);
        const cardCountsEntries = Object.entries(cardCounts);

        let highCard = '';
        let restCards = '';

        const isFiveOfAKind = cardCountValues.includes(5);
        const isFourOfAKind = cardCountValues.includes(4);
        const isFullHouse = cardCountValues.includes(3) && cardCountValues.includes(2);
        const isThreeOfAKind = cardCountValues.includes(3) && !isFullHouse;

        const isTwoPair = cardCountValues.filter(v => v === 2).length === 2;
        const isOnePair = cardCountValues.includes(2) && !isTwoPair && !isThreeOfAKind && !isFullHouse;
        const isHighCard = !isFiveOfAKind && !isFourOfAKind && !isFullHouse && !isThreeOfAKind && !isTwoPair && !isOnePair;

        if (isFiveOfAKind) {
            highCard = cards[0];
        } else if (isFourOfAKind) {
            highCard = this.getHighCard(cardCountsEntries, 4);
            restCards = this.getSingles(cardCountsEntries);
        } else if (isFullHouse) {
            highCard = this.getHighCard(cardCountsEntries, 3);
            restCards = this.getSets(cardCountsEntries, 2).map(([card, _]) => card).join('');
        } else if (isThreeOfAKind) {
            highCard = this.getHighCard(cardCountsEntries, 3);
            restCards = this.getSingles(cardCountsEntries);
        } else if (isTwoPair) {
            const pairs = this.getSets(cardCountsEntries, 2);
            highCard = pairs[0][0];
            restCards = this.getSingles(cardCountsEntries);
        } else if (isOnePair) {
            highCard = this.getHighCard(cardCountsEntries, 2);
            restCards = this.getSingles(cardCountsEntries);
        } else if (isHighCard) {
            let rest: Array<string>;
            [highCard, ...rest] = this.getSets(cardCountsEntries, 1).map(([card, _]) => card);
            restCards = rest.join('');
        }

        return {
            isFiveOfAKind,
            isFourOfAKind,
            isFullHouse,
            isThreeOfAKind,
            isTwoPair,
            isOnePair,
            isHighCard,
            highCard,
            restCards
        };
    }

    private getHighCard(counts: Array<[string, number]>, cardsInRow: number): string {
        return counts.find(([_, count]) => count === cardsInRow)![0];
    }

    private getSets(counts: Array<[string, number]>, cardsInRow: number): Array<[string, number]> {
        return counts.filter(([_, count]) => count === cardsInRow)
            .sort((a, b) => Cards.indexOf(b[0]) - Cards.indexOf(a[0]));
    }

    private getSingles(counts: Array<[string, number]>): string {
        return this.getSets(counts, 1).map(([card, _]) => card).join('');
    }

    private sortPokerHands(hands: Array<IHand>): Array<IHand> {
        return hands.sort((a, b) => this.compareCards(a, b));
    }

    private compareCards(a: IHand, b: IHand): number {
        const valueA = this.cardSetValue(a.score);
        const valueB = this.cardSetValue(b.score);

        if (valueA !== valueB)
            return valueA - valueB;

        for (let i = 0; i < a.cards.length; i++) {
            const restCardA = Cards.indexOf(a.cards[i]);
            const restCardB = Cards.indexOf(b.cards[i]);

            if (restCardA !== restCardB)
                return restCardA - restCardB;
        }

        // FML: We're not actually using poker rules.
        // const highCardA = Cards.indexOf(a.score.highCard);
        // const highCardB = Cards.indexOf(b.score.highCard);
        //
        // if (highCardA !== highCardB)
        //     return highCardA - highCardB;
        //
        // for (let i = 0; i < a.score.restCards.length; i++) {
        //     const restCardA = Cards.indexOf(a.score.restCards[i]);
        //     const restCardB = Cards.indexOf(b.score.restCards[i]);
        //
        //     if (restCardA !== restCardB)
        //         return restCardA - restCardB;
        // }
        //
        // return 0;
    }

    private cardSetValue(score: ICardScore): number {
        // Five of a kind, where all five cards have the same label: AAAAA
        // Four of a kind, where four cards have the same label and one card has a different label: AA8AA
        // Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
        // Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
        // Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
        // One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
        // High card, where all cards' labels are distinct: 23456
        return score.isFiveOfAKind ? 7 :
            score.isFourOfAKind ? 6 :
                score.isFullHouse ? 5 :
                    score.isThreeOfAKind ? 4 :
                        score.isTwoPair ? 3 :
                            score.isOnePair ? 2 :
                                score.isHighCard ? 1 : 0;
    }
}

new Challenge();