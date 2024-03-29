import { ChallengeBase, IAnswer } from '../challenge.base';

interface IParseResult {
}

class Challenge extends ChallengeBase<IParseResult> {
    constructor() {
        super(true);
    }

    protected parseInput(lines: Array<string>): IParseResult {
        return {};
    }

    protected processInput(data: IParseResult): IAnswer {
        const answerOne = 0;

        const answerTwo = 0;

        return {
            one: answerOne,
            two: answerTwo
        };
    }
}

new Challenge();