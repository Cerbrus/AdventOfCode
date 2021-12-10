// Setup
const lines = document.getElementsByTagName('pre')[0].innerText.split(/\n/)
  .filter(Boolean)
  .map(l => {
    const [start, end] = l
      .split(' -> ')
      .map(xy => {
        const [x, y] = xy.match(/\d+/g).map(Number);
        return {x, y};
      });
    return {start, end};
  });
let grid = [];

// 5.1
// Cardinal
lines.filter(l => l.start.x === l.end.x || l.start.y === l.end.y)
  .forEach(l => {  
    const dx = l.start.x < l.end.x ? 1 : l.start.x > l.end.x ? -1 : 0;
    const dy = l.start.y < l.end.y ? 1 : l.start.y > l.end.y ? -1 : 0;
    let { x, y } = l.start;

    do {
      do {
        grid[y] = grid[y] || [];  
        grid[y][x] = grid[y][x] || 0;
        grid[y][x]++;
      
        y += dy;
      } while (y != l.end.y + dy);	  
      x += dx;
    } while (x != l.end.x + dx);
  });

console.log(grid.flat().filter(n => n > 1).length);
// 3990

// 5.2
// Diagonal
lines.filter(l => l.start.x !== l.end.x && l.start.y !== l.end.y)
  .forEach(l => {  
    const dx = l.start.x < l.end.x ? 1 : l.start.x > l.end.x ? -1 : 0;
    const dy = l.start.y < l.end.y ? 1 : l.start.y > l.end.y ? -1 : 0;
    let { x, y } = l.start;

    do {
      grid[y] = grid[y] || [];  
      grid[y][x] = grid[y][x] || 0;
      grid[y][x]++;	
      
      y += dy;  
      x += dx;
    } while (x != l.end.x + dx && y != l.end.y + dy);
  });

console.log(grid.flat().filter(n => n > 1).length);
// 21305

// Fill empty cells and display the grid
grid = Array.from(grid, row => Array.from(row || [], cell => cell || ' '));
console.log(grid.map(l => l.join('')).join('\n'));