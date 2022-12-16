const rps = {A:'R',B:'P',C:'S',X:'R',Y:'P',Z:'S'};
const beats = {P:'R',R:'S',S:'P'};
const val = {R:1,P:2,S:3};

// 2.1
document.body.textContent.trim().split('\n')
    .map(round => {
        const [opponent, self] = round.split(' ').map(x => rps[x]);
        const score = opponent === self ? 3 : beats[opponent] === self ? 0 : 6;
        return val[self] + score;
    })
    .reduce((a,b)=> a + b);
// 12645

// 2.2
document.body.textContent.trim().split('\n')
    .map(round => {
        let [opponent, outcome] = round.split(' ');

        let self = opponent = rps[opponent];
        if(outcome === 'X') self = beats[opponent];
        else if(outcome === 'Z') self = beats[beats[opponent]];

        const score = opponent === self ? 3 : beats[opponent] === self ? 0 : 6;
        return val[self] + score;
    })
    .reduce((a,b)=> a + b);
// 11756
