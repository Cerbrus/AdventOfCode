import { ChallengeBase, IAnswer } from '../challenge.base';

interface IParseResult {
    games: Array<IGame>;
}

type TColor = 'red' | 'green' | 'blue';

interface IColorCount extends Record<TColor, number> {
}

interface IGame extends IColorCount {
    id: number;
}

const CUBE_COUNT: IColorCount = {
    red: 12,
    green: 13,
    blue: 14
};

class Challenge extends ChallengeBase<IParseResult> {
    protected parseInput(lines: Array<string>): IParseResult {
        return { games: lines.map(this.parseGame) };
    }

    protected processInput(data: IParseResult): IAnswer {
        const answerOne = this.addPossibleGames(data.games, CUBE_COUNT);
        const answerTwo = this.calculatePower(data.games);

        return {
            one: answerOne,
            two: answerTwo
        };
    }

    private addPossibleGames(games: Array<IGame>, criteria: IColorCount): number {
        return games
            .filter((game) =>
                game.red <= criteria.red &&
                game.green <= criteria.green &&
                game.blue <= criteria.blue
            )
            .reduce((total, game) => total + game.id, 0);
    }

    private parseGame(line: string): IGame {
        const [gameId, subsetString] = line.split(/: +/);
        const id = Number(gameId.match(/\d+/));
        const game: IGame = { id, red: 0, green: 0, blue: 0 };

        subsetString
            .split('; ')
            .forEach((gameString) => {
                gameString.split(', ')
                    .forEach((hand) => {
                        const [count, color] = hand.split(' ');
                        game[color] = Math.max(Number(count), game[color]);
                    });
            }, {});

        return game;
    }

    private calculatePower(games: Array<IGame>): number {
        return games.reduce((result, game) => result + game.red * game.green * game.blue, 0);
    }
}

new Challenge();