import * as console from 'console';
import { ChallengeBase, IAnswer } from '../challenge.base';

interface IParseResult {
    lines: Array<ILine>;
}

interface ILine {
    line: string;
    calibrationValue: number;
}

class Challenge extends ChallengeBase<IParseResult> {
    private readonly numberMap = {
        oneight: '18', threeight: '38', fiveight: '58', nineight: '98',
        twone: '21',
        sevenine: '79', eightwo: '82', eightree: '83',
        one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9'
    };

    private readonly numberMapRegex = new RegExp(Object.keys(this.numberMap).join('|'), 'g');

    protected parseInput(inputString: string): IParseResult {
        const lines = inputString
            .split(/[\r\n]+/g)
            .map(l => l.replace(this.numberMapRegex, (match) => this.numberMap[match]))
            .map(line => {
                const digits = line.match(/\d/g);
                return {
                    line,
                    calibrationValue: Number(digits[0] + digits[digits.length - 1])
                };
            });

        return { lines };
    }

    protected processInput(data: IParseResult): IAnswer {
        const answerOne = data.lines.reduce((total, line) => total + line.calibrationValue, 0);

        const answerTwo = answerOne;

        return {
            one: answerOne,
            two: answerTwo
        };
    }
}

new Challenge();