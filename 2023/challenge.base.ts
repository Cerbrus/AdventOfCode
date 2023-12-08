const fs = require('node:fs');

export interface IAnswer {
    one: number;
    two: number;
}

export abstract class ChallengeBase<TParsedInput> {
    constructor(exampleOnly = false, private readonly exampleVersion = null) {
        this.processFile(true);

        if (!exampleOnly)
            this.processFile(false);
    }

    private processFile(isExample = true): void {
        const file = isExample ? `./input.example${this.exampleVersion ? `.${this.exampleVersion}` : ''}.txt` : './input.txt';
        fs.readFile(file, 'utf8', (err: any, data: string): void => {
            if (err) {
                console.error(err);
                return;
            }
            const parsedInput = this.timeFunction(() => this.parseInput(data.split(/[\r\n]+/), data));
            const result = this.timeFunction(() => this.processInput(parsedInput.answer));

            const totalDuration = parsedInput.duration + result.duration;

            console.log(`
Processed input in ${Math.floor(totalDuration / 60000)} minutes and ${((totalDuration / 1000) % 60).toFixed(5)} seconds (${totalDuration.toFixed(5)}ms).
The answer to the ${isExample ? 'example ' : ''}input is:
 - Part one: ${result.answer.one}
 - Part two: ${result.answer.two}
`);
        });
    }

    protected abstract parseInput(inputLines: Array<string>, inputString: string): TParsedInput;

    protected abstract processInput(data: TParsedInput): IAnswer;

    private timeFunction<TResult>(fn: () => TResult): { answer: TResult, duration: number } {
        const start = performance.now();
        const answer = fn();
        const end = performance.now();
        return { answer, duration: end - start };
    }
}