import * as console from 'console';
import { ChallengeBase, IAnswer } from '../challenge.base';

interface IParseResult {
    races: Array<IRace>;
    race_2: IRace;
}

interface IRace {
    time: number;
    distance: number;
}

interface IInput {
    hold: number;
    distance: number;
}

class Challenge extends ChallengeBase<IParseResult> {
    protected parseInput(lines: Array<string>, inputString: string): IParseResult {
        const raceLines = lines.map(l => {
            const times = l.split(/\s+/);
            times.shift();
            return times.map(Number);
        });

        const races = raceLines[0].map((time, index) => ({
            time,
            distance: raceLines[1][index]
        }));

        const [time, distance] = inputString
            .replace(/\s+/g, '')
            .match(/\d+/g)
            .map(Number);

        const race_2 = { time, distance };

        return { races, race_2 };
    }

    protected processInput(data: IParseResult): IAnswer {
        const answerOne = data.races.map(this.calculateRaceOptions).product(c => c.length);

        const answerTwo = this.calculateRaceOptions(data.race_2).length;

        return {
            one: answerOne,
            two: answerTwo
        };
    }

    private calculateRaceOptions(race: IRace): Array<IInput> {
        const distanceToBeat = race.distance;
        const maxTime = race.time;

        const options: Array<IInput> = [];

        for (let hold = 1; hold < maxTime; hold++) {
            const distance = (maxTime - hold) * hold;
            if (distance > distanceToBeat)
                options.push({ hold, distance });
        }

        return options;
    }
}

new Challenge();