import * as console from 'console';
import { ChallengeBase, IAnswer } from '../challenge.base';

interface IParseResult {
    instructions: string;
    nodes: Record<string, INode>;
}

interface INode {
    from: string;
    L: string;
    R: string;
}

class Challenge extends ChallengeBase<IParseResult> {
    constructor() {
        super(false, 1);
    }

    protected parseInput(lines: Array<string>): IParseResult {
        const [instructions, ...nodeStrings] = lines;

        const nodes = nodeStrings.reduce((map, nodeString) => {
            const [_, from, L, R] = nodeString.match(/(\w+) = \((\w+), (\w+)\)/);
            return { ...map, [from]: { from, L, R } };
        }, {});

        return { instructions, nodes };
    }

    protected processInput(data: IParseResult): IAnswer {
        // const answerOne = this.navigateMapRecursive('AAA', data, 0);
        const answerOne = this.navigateMapWhile(data);

        const answerTwo = this.navigateMapWhileGhost(data);

        return {
            one: answerOne,
            two: answerTwo
        };
    }

    /**
     * Don't use: Max call stack exceeded.
     * @param {string} location
     * @param {IParseResult} data
     * @param {number} step
     * @returns {number}
     * @private
     */
    private navigateMapRecursive(location: string, data: IParseResult, step: number): number {
        const currentNode = data.nodes[location];
        const direction = data.instructions[step % data.instructions.length];
        const nextNode = currentNode[direction];

        step++;
        if (nextNode === 'ZZZ') {
            return step;
        } else {
            return this.navigateMapRecursive(nextNode, data, step);
        }
    }

    /**
     * This works, and is much faster than the recursive version.
     * @param {IParseResult} data
     * @param startNode
     * @param endsWithZ
     * @returns {number}
     * @private
     */
    private navigateMapWhile(data: IParseResult, startNode = 'AAA', endsWithZ = false): number {
        let step = 0;
        let nextNode = startNode;

        while (endsWithZ ? nextNode[2] !== 'Z' : nextNode !== 'ZZZ') {
            const currentNode = data.nodes[nextNode];
            const direction = data.instructions[step % data.instructions.length];
            nextNode = currentNode[direction];

            step++;
        }

        return step;
    }

    private navigateMapWhileGhost(data: IParseResult): number {
        const distances = Object
            .values(data.nodes)
            .map(n => n.from)
            .filter(n => n.endsWith('A'))
            .map(n => this.navigateMapWhile(data, n, true));

        return distances.reduce((result, current) => this.lowestCommonMultiplier(result, current));
    }

    private greatestCommonDivider(a: number, b: number): number {
        for (let temp = b; b !== 0;) {
            b = a % b;
            a = temp;
            temp = b;
        }
        return a;
    }

    private lowestCommonMultiplier(a: number, b: number): number {
        return (a * b) / this.greatestCommonDivider(a, b);
    }
}

new Challenge();