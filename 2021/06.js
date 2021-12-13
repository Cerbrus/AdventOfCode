const testData = '3,4,3,1,2'

// Setup
class LanternFish {  
  constructor(timer) {
    this.timer = Number(timer);
  }
  
  step() {
    if(this.timer === 0) {
      this.timer = 6;
      return new LanternFish(8);
    }
    this.timer--;
  }
}

let fish = document.getElementsByTagName('pre')[0].innerText.split(',')
  .filter(Boolean)
  .map(d => new LanternFish(d));

// 6.1
let days = 80;
for(let i = 0; i < days; i++) {
  const newFish = fish.map(f => f.step()).filter(Boolean);  
  fish.push(...newFish);
}

console.log(fish.length);
// 391671

// 6.2
let timers = document.getElementsByTagName('pre')[0].innerText.split(',')
  .filter(Boolean)
  .map(Number)
  .reduce((acc, t) => {
    acc[t] = acc[t] || 0;
    acc[t]++;

    return acc;
  }, []);

days = 256;
for(let i = 0; i < days; i++) {
  const newTimers = [];
  timers.forEach((t, i) => {
    t = t || 0;
    if(i === 0) {
      newTimers[6] = t;
      newTimers[8] = t;
    } else if(i === 7) {
      newTimers[6] = (newTimers[6] || 0) + t;
    } else {
      newTimers[i - 1] = t;
    }
    timers = [...newTimers];
  });
}

console.log(timers.reduce((a,b) => a + b));
// 1754000560399