const testData = '16,1,2,0,4,2,7,1,2,14';

// Setup
const list = document.getElementsByTagName('pre')[0].innerText.split(',').map(Number);

// 7.1
const median = list.sort((a, b) => a - b)[Math.ceil(list.length / 2)];
console.log(list.reduce((a, c) => a + Math.abs(median - c), 0));
// 336131

// 7.2
function fuelCost(distance) {
  return distance > 1 ? fuelCost(distance - 1) + distance : distance;
}

const max = Math.max(...list);
const costs = [];
for(let i = 0; i < max; i++) {
   costs.push(list.reduce((a, c) => a + fuelCost(Math.abs(i - c)), 0));
}
console.log(Math.min(...costs));
// 92676646