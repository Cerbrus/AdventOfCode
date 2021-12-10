// Setup
document.getElementsByTagName('pre')[0].innerText.split(/\n\n/)

class Board {
  static row = [0,1,2,3,4];
  
  win = false;
  score = 0;

  constructor(input) {
    this.input = input;
    this.cells = input.match(/\d+/g).map(Number);
  }
  
  getScore(draw) {
    this.win = false;
    for(let i = 0; i < 5; i++) {
      if(Board.row.every(c => draw.includes(this.cells[c + i * 5]))) {
         // console.log(`Winning board:\n${this.input}\nRow ${i}`);
         this.win = true;
      }
      if(Board.row.every(c => draw.includes(this.cells[c * 5 + i]))) {
         // console.log(`Winning board:\n${this.input}\nColumn ${i}`);
         this.win = true;
      }

      if(this.win) {
        this.score = this.cells.filter(cell => !draw.includes(cell));
        return this.score;
      }
    }
  }
}

var [drawn, ...boards] = document.getElementsByTagName('pre')[0].innerText.split(/\n\n/).filter(Boolean);
drawn = drawn.split(',').map(Number);
boards = boards.map(b => new Board(b));

// 4.1
for(let n = 5; n < drawn.length; n++) {
  const draw = drawn.slice(0, n);
  const scores = boards.map(b => b.getScore(draw)).filter(Boolean);
  if(scores.length) {
    const score = scores[0].reduce((a,b)=>a+b) * draw.at(-1);
    console.log('score: ', score);
    break;
  }
}
// 33462

// 4.2
for(let n = 5; n < drawn.length; n++) {
  const draw = drawn.slice(0, n);
  boards.forEach(b => b.getScore(draw))
  if(boards.length > 1) {
    boards = boards.filter(board => !board.win);
  }
  if(boards.length === 1 && boards[0].win) {
    boards[0].getScore(drawn.slice(0, n + 1));
    const score = boards[0].score.reduce((a,b)=>a+b) * draw.at(-1);
    console.log(n, 'score: ', score);
    break;
  }
}
// 30070

//  0  1  2  3  4
//  5  6  7  8  9
// 10 11 12 13 14
// 15 16 17 18 19
// 20 21 22 23 24