import { ChallengeBase, IAnswer } from '../challenge.base';

type TCoordinates = [number, number];

interface INumber {
    value: number;
    stringValue: string;
    isPartNumber: boolean;
    gear: `${number}|${number}`;
    coordinates: Array<TCoordinates>;
}

interface IParseResult {
    numbers: Array<INumber>;
}

class Challenge extends ChallengeBase<IParseResult> {
    protected parseInput(lines: Array<string>): IParseResult {
        const numbers = [];
        let currentNumber: INumber = null;
        for (let y = 0; y < lines.length; y++) {
            for (let x = 0; x < lines[0].length; x++) {
                const char = lines[y][x];
                if (/\d/.test(char)) {
                    if (!currentNumber) {
                        currentNumber = {
                            value: 0,
                            stringValue: '',
                            isPartNumber: false,
                            gear: null,
                            coordinates: []
                        };
                        numbers.push(currentNumber);
                    }

                    currentNumber.stringValue += char;
                    currentNumber.coordinates.push([x, y]);
                    currentNumber.isPartNumber ||= !!this.checkNeighbours(currentNumber, lines, this.isSymbol);

                    const gearCoordinates = this.checkNeighbours(currentNumber, lines, this.isGear);
                    if (gearCoordinates) {
                        currentNumber.gear = `${gearCoordinates[0]}|${gearCoordinates[1]}`;
                    }
                } else if (currentNumber) {
                    currentNumber.value = Number(currentNumber.stringValue);
                    currentNumber = null;
                }
            }
        }

        return { numbers };
    }

    protected processInput(data: IParseResult): IAnswer {
        const answerOne = data.numbers.filter(n => n.isPartNumber).reduce((total, number) => total + number.value, 0);

        const gearParts = data.numbers.filter(n => n.gear);
        const grouped = gearParts.groupBy('gear');

        const answerTwo = Object.entries(grouped)
            .filter(([_, numbers]) => numbers.length > 1)
            .map(([_, [a, b]]) => a.value * b.value)
            .reduce((a, b) => a + b);

        return {
            one: answerOne,
            two: answerTwo
        };
    }

    private checkNeighbours(number: INumber, lines: Array<string>, checkFunction: (x: number, y: number, lines: Array<string>) => TCoordinates): TCoordinates | null {
        const [x, y] = number.coordinates[number.coordinates.length - 1];
        return checkFunction(x - 1, y - 1, lines) ||
            checkFunction(x - 1, y, lines) ||
            checkFunction(x - 1, y + 1, lines) ||
            checkFunction(x, y - 1, lines) ||
            checkFunction(x, y + 1, lines) ||
            checkFunction(x + 1, y - 1, lines) ||
            checkFunction(x + 1, y, lines) ||
            checkFunction(x + 1, y + 1, lines);
    }

    private isSymbol(x: number, y: number, lines: Array<string>): TCoordinates | null {
        return (
            y >= 0 && y < lines.length &&
            x >= 0 && x < lines[0].length &&
            !/[\d.]/.test(lines[y][x])
        ) ? [x, y] : null;
    }

    private isGear(x: number, y: number, lines: Array<string>): TCoordinates | null {
        return (
            y >= 0 && y < lines.length &&
            x >= 0 && x < lines[0].length &&
            lines[y][x] === '*'
        ) ? [x, y] : null;
    }
}

new Challenge();