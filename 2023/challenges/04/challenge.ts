import * as console from 'console';
import { ChallengeBase, IAnswer } from '../challenge.base';

interface ICard {
    number: number;
    winning: Array<number>;
    scratched: Array<number>;
}

interface IParseResult {
    cards: Array<ICard>;
}

class Challenge extends ChallengeBase<IParseResult> {
    protected parseInput(lines: Array<string>): IParseResult {
        return {
            cards: lines
                .map(line => {
                    let [card, numbers] = line.split(/: +/);
                    const number = Number(card.match(/\d+/));
                    const [winning, scratched] = numbers.split(' | ').map(line => line.split(/ +/).map(Number));
                    return { number, winning, scratched };
                })
        };
    }

    protected processInput(data: IParseResult): IAnswer {
        const answerOne = data.cards.sum( card => this.calculatePoints(card));

        const cards = [...data.cards];
        for (let i = 0; i < cards.length; i++) {
            // console.log(`checking card ${cards[i].number}`)
            const card = cards[i];
            const winningNumbers = this.countWinningNumbers(card);
            if (winningNumbers > 0) {
                for (let j = 1; j <= winningNumbers; j++) {
                    // console.log(`Card ${card.number} won ${winningNumbers}. copying card ${card.number + j}`)
                    cards.push(data.cards[card.number + j - 1]);
                }
            }
        }

        const answerTwo = cards.length;

        return {
            one: answerOne,
            two: answerTwo
        };
    }

    private countWinningNumbers(card: ICard): number {
        return card.scratched.filter(n => card.winning.includes(n)).length;
    }

    private calculatePoints(card: ICard): number {
        const count = this.countWinningNumbers(card);
        return count > 0 ? Math.pow(2, count - 1) : 0;
    }
}

new Challenge();