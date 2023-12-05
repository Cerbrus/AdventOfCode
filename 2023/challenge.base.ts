const fs = require('node:fs');

export interface IAnswer {
    one: number;
    two: number;
}

export abstract class ChallengeBase<TParsedInput> {
    constructor(exampleOnly = false) {
        this.processFile(true);

        if (!exampleOnly)
            this.processFile(false);
    }

    private processFile(isExample = true): void {
        const file = isExample ? './input.example.txt' : './input.txt';
        fs.readFile(file, 'utf8', (err: any, data: string): void => {
            if (err) {
                console.error(err);
                return;
            }
            const parsedInput = this.parseInput(data);
            const result = this.timeFunction(() => this.processInput(parsedInput));

            console.log(`
Processed input in ${Math.floor(result.duration / 60000)} minutes and ${((result.duration / 1000) % 60).toFixed(5)} seconds.
The answer to the ${isExample ? 'example ' : ''}input is:
 - Part one: ${result.answer.one}
 - Part two: ${result.answer.two}
`);
        });
    }

    protected abstract parseInput(inputString: string): TParsedInput;

    protected abstract processInput(data: TParsedInput): IAnswer;

    private timeFunction<TResult>(fn: () => TResult): { answer: TResult, duration: number } {
        const start = performance.now();
        const answer = fn();
        const end = performance.now();
        return { answer, duration: end - start };
    }
}