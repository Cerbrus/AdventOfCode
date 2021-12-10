const testdata = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

// Setup
const lines = document.getElementsByTagName('pre')[0].innerText.split(/\n/)
  .filter(Boolean);
const open = '([{<';
const close = ')]}>';
const map = [...open].reduce((acc, c) => (acc[c] = close[open.indexOf(c)], acc), {});
const scores = [3,57,1197,25137];
const values = [1,2,3,4];

// 10.1
let score = 0;
const missing = lines.map(line => {
  let expected = '';
  const hasError = [...line].some((c, i) => {
    if(open.includes(c))
      expected += map[c];
    else if(close.includes(c))
      if(expected.at(-1) !== c) {
        console.log(`Expected ${expected.at(-1)}, but found ${c} instead at position ${i} in line ${line}. Penalty: ${scores[close.indexOf(c)]}.`)
        score += scores[close.indexOf(c)];
        return true;
      } else {
        expected = expected.slice(0, -1);
      }
  });
  return hasError ? '' : expected;
});

console.log(score);
// 299793

// 10.2
const replacements = missing.filter(Boolean)
  .map(line => ({
    line, 
    score: [...line]
      .reverse()
      .reduce((score, c) => score * 5 + values[close.indexOf(c)], 0)
    })
  )
  .sort((a, b) => a.score - b.score);
// 3654963618
  
console.log(replacements);
console.log(replacements[Math.floor(replacements.length / 2)]);