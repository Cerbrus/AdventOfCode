// 3.1
document.body.textContent.trim().split('\n')
  .map(bags => {
      const left = bags.substr(0, bags.length / 2);
      const right = bags.substr(bags.length / 2);
      const char = [...left].filter(c => right.includes(c))[0].charCodeAt();
      return char - (char > 90 ? 96 : 38)
  })
  .reduce((a, b) => a + b);
// 7831

// 3.2
document.body.textContent.trim()
    .match(/(\w+\n?){3}/g)
    .map(group => {
        const [first, ...rest] = group.trim().split('\n');
        
        const char = [...first].filter(c => rest.every(r => r.includes(c)))[0].charCodeAt();
        return char - (char > 90 ? 96 : 38)
    })
    .reduce((a, b) => a + b);
// 2683
