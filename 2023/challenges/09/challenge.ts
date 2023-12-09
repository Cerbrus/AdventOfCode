import { ChallengeBase, IAnswer } from '../challenge.base';
import { IDifference } from './models';

interface IParseResult extends Array<IDifference> {
}

class Challenge extends ChallengeBase<IParseResult> {
    protected parseInput(lines: Array<string>): IParseResult {
        return lines.map(line => this.getDifferences(line.split(' ').map(Number)));
    }

    private getDifferences(values: Array<number>): IDifference {
        const differences = Array.from({ length: values.length - 1 }, (_, i) => values[i + 1] - values[i]);

        return {
            values,
            differences: differences.every(d => d === 0)
                ? null
                : this.getDifferences(differences)

        };
    }

    protected processInput(values: IParseResult): IAnswer {
        values.forEach(v => {
            // Down the tree
            while (v.differences) {
                v.differences.parent = v;
                v = v.differences;
            }

            // And back up again
            while (v.parent) {
                const { values: p } = v.parent;
                p.unshift(p.at(0) - v.values.at(0));
                p.push(p.at(-1) + v.values.at(-1));
                v = v.parent;
            }
        });

        return values.reduce(
            ({ one, two }, { values: v }) =>
                ({ one: one + v.at(-1), two: two + v.at(0) }),
            { one: 0, two: 0 });
    }
}

new Challenge();