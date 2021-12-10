const testData = `2199943210
3987894921
9856789892
8767896789
9899965678`;

// Setup
const map = document.getElementsByTagName('pre')[0].innerText.split(/\n/)
  .filter(Boolean)
  .map(l => l.split('').map(Number));

const lowSpots = [];
const basinMap = []

const maxY = map.length - 1;
const maxX = map[0].length - 1;

// 9.1
for(let y = 0; y < map.length; y++){
  for(let x = 0; x < map[y].length; x++){
    const h = map[y][x];
    let isLow = false;
    if((x == maxX || map[y][x+1] > h) &&
       (x == 0    || map[y][x-1] > h) &&
       (y == maxY || map[y+1][x] > h) &&
       (y == 0    || map[y-1][x] > h)) {
      lowSpots.push(h);
      isLow = true;
    }
    const cell = { x, y, isLow, height: h, locations: [] };
    cell.locations.push(cell);
    basinMap.push(cell);
  }
}

console.log(lowSpots.reduce((a, b) => a + b + 1, 0));
// 506

// 9.2
function getCell(x, y){
  return basinMap.find(c => c.x === x && c.y === y);
}

function getBasin(lowPoint, cell) {
  if(cell.x > 0)    addIfHigher(lowPoint, getCell(cell.x - 1, cell.y));
  if(cell.x < maxX) addIfHigher(lowPoint, getCell(cell.x + 1, cell.y));
  if(cell.y > 0)    addIfHigher(lowPoint, getCell(cell.x, cell.y - 1));
  if(cell.y < maxY) addIfHigher(lowPoint, getCell(cell.x, cell.y + 1));
}

function addIfHigher(lowPoint, cell) {
  if(cell && 
     cell.height < 9 && 
     lowPoint.height < cell.height &&
     !lowPoint.locations.includes(cell)) {
    lowPoint.locations.push(cell);
    getBasin(lowPoint, cell);
  }
}

const cells = basinMap.filter(b => b.isLow);
cells.forEach(c => getBasin(c, c));

console.log(
  cells.sort((a, b) => b.locations.length - a.locations.length)
    .slice(0, 3)
    .reduce((acc, cell) => acc * cell.locations.length, 1)
);
// 931200