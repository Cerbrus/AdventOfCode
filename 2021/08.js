const testData = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;
//document.getElementsByTagName('pre')[0].innerText
// Setup
class Digit {
  constructor(segments, inputs) {
    this.segments = segments;
    this.inputs = inputs;
    this.value = { 2: 1, 3: 7, 4: 4, 5: [2, 3, 5], 6: [0, 6, 9], 7: 8 }[segments.length];

    if(inputs && typeof this.value === 'number') {
      this.input = inputs.find(i => i.length === segments.length);
    }
  }
}

const lines = testData.split(/\n/)
  .filter(Boolean)
  .map(l => {
    const [input, output] = l.split(' | ')
      .map((digits, _, [i, o]) => { 
        //console.log(i, '|', o)
        return digits.split(' ')
          .map(d => new Digit(d, i.split(' ')))
      });

    const map = output.filter(d => d.input)
      .reduce((acc, d) => {
        acc[d.value] = d;
        return acc;
      }, {});

    return {input, output, map};
  });

// 8.1
console.log(
  [...lines]
    .map(line => line.output)
    .flat()
    .filter(d => [1, 4, 7, 8].includes(d.value))
    .length);
// 318

// 8.2
/*
lines.map(line => {
  map = {};
  
  line.output
    .filter(d => d.input)
    .forEach(d => [...d.input].forEach((c, i) => {
      map[c] = d.segments[i];
    }));
  return {
    map,
    ...line
  };
});
*/



/*
1 from count
4 from count
7 from count
8 from count

2 must be 5 segments and not 5
3 must be 5 segments and contain 7 & 1
5 must be 5 segments and miss the same letter as 9

6 must be 6 segments and not contain 1, 4 & 7
9 must be 6 segments and contain 1, 4 & 7
0 must be 6 segments and contain 1 & 7 but not 4
*/ 