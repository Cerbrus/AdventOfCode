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

// Setup
function sort(segments) {
  return [...segments].sort((a,b) => a.localeCompare(b)).join('');
}

class Digit {
  constructor(segments, inputs) {
    this.segments = sort(segments);
    this.inputs = inputs;
    this.value = { 2: 1, 3: 7, 4: 4, 5: [2, 3, 5], 6: [0, 6, 9], 7: 8 }[segments.length];

    if(inputs && typeof this.value === 'number') {
      this.input = sort(inputs.find(i => i.length === segments.length));
    }
  }
}

const lines = document.getElementsByTagName('pre')[0].innerText.split(/\n/)
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
function hasAll(digit, segmentDigit) {
   return [...segmentDigit.segments].every(s => digit.segments.includes(s));
}

lines.forEach(l => {
  // 1,4,7,8
  const map = l.input.filter(d => d.input)
    .reduce((acc, d) => {
      acc[d.value] = d;
      return acc;
    }, {});
    
  // 6,9,0
  const sixSegments = l.input.filter(d => d.segments.length === 6);
  
  map[9] = sixSegments.find(d =>  hasAll(d, map[1]) &&  hasAll(d, map[4]) &&  hasAll(d, map[7]));
  map[6] = sixSegments.find(d => !hasAll(d, map[1]) && !hasAll(d, map[4]) && !hasAll(d, map[7]));
  map[0] = sixSegments.find(d =>  hasAll(d, map[1]) && !hasAll(d, map[4]) &&  hasAll(d, map[7]));
  
  // 2,3,5
  const fiveSegments = l.input.filter(d => d.segments.length === 5);   
  
  const missingFromNine = [...map[8].segments].find(s => !map[9].segments.includes(s));
  map[3] = fiveSegments.find(d => hasAll(d, map[1]) && hasAll(d, map[7]));
  map[5] = fiveSegments.find(d => d !== map[3] && !d.segments.includes(missingFromNine));
  map[2] = fiveSegments.find(d => d !== map[3] && d !== map[5]);
  
  for(let i = 0; i < 10; i++) {
    map[i].value = i;
    map[map[i].segments] = map[i].value;
  }
  
  l.result = Number(l.output.reduce((result, d) => result + map[d.segments], ''));
  l.map = map;
});

console.log(lines.reduce((total, d) => total + d.result, 0));
// 996280

/*
1 from segment count
4 from segment count
7 from segment count
8 from segment count

9 must be 6 segments and contain 1, 4 & 7
6 must be 6 segments and not contain 1, 4 & 7
0 must be 6 segments and contain 1 & 7 but not 4

5 must be 5 segments and miss the same segment as 9
2 must be 5 segments and not 5
3 must be 5 segments and contain 7 & 1
*/ 