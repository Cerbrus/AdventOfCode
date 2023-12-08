import * as console from 'console';
import { ChallengeBase, IAnswer } from '../challenge.base';

interface IMap {
    start: number;
    end: number;
    change: number;
}

interface ICategoryMap {
    from: string;
    to: string;
    map: Array<IMap>;
}

interface IParseResult {
    seeds: Array<number>;
    seedRanges: Array<Array<number>>;
    maps: Record<string, ICategoryMap>;
}

class Challenge extends ChallengeBase<IParseResult> {

    protected parseInput(_: Array<string>, inputString: string): IParseResult {
        const inputs = inputString.split(/[\r\n]{4}/);
        const seedsString = inputs.shift()!;
        const seeds = seedsString.match(/\d+/g)!.map(Number);
        const seedRanges = seedsString.match(/\d+ \d+/g)!.map(s => s.split(' ').map(Number));

        const maps: Record<string, ICategoryMap> = inputs.reduce((acc, current) => {
            const result = this.mapMap(current);
            return {
                ...acc, [result.from]: {
                    map: result.maps,
                    from: result.from,
                    to: result.to
                }
            };
        }, {});

        return { seeds, maps, seedRanges };
    }

    protected processInput(data: IParseResult): IAnswer {
        const answerOne = Math.min(...data.seeds.map(s => this.applyMap(s, 'seed', data.maps)));

        let answerTwo = Number.MAX_SAFE_INTEGER;
        data.seedRanges.forEach(([start, length], index) => {
            console.log(`Calculating range #${index}: ${start}-${start + length}`);
            for (let i = start; i < start + length; i++) {
                answerTwo = Math.min(answerTwo, this.applyMap(i, 'seed', data.maps));
            }
            console.log(`Result: ${answerTwo}`);
        });

        return {
            one: answerOne,
            two: answerTwo
        };
    }

    private mapMap(mapStr: string) {
        const lines = mapStr.split(/[\r\n]+/);
        const [from, to] = lines.shift()!.replace(' map:', '').split('-to-');

        const maps: Array<IMap> = lines
            .map((current) => {
                const [destination, source, length] = current.split(' ').map(Number);
                return {
                    start: source,
                    end: source + length - 1,
                    change: Math.abs(destination - source) * (destination > source ? 1 : -1)
                };
            });

        return { maps, from, to };
    }

    private applyMap(s: number, from: string, maps: Record<string, ICategoryMap>): number {
        const categoryMap = maps[from];

        if (!categoryMap)
            return s;
        const map = categoryMap.map?.filter(m => m.start <= s && m.end >= s)[0];
        return this.applyMap(s + (map?.change ?? 0), categoryMap.to, maps);
    }
}

new Challenge();