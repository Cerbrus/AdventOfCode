// 1.1
document.body.textContent.split('\n\n')
  .map(elf=>elf.split('\n').map(Number).reduce((a,b)=>a+b)).sort().pop()
// 74394

// 1.2
document.body.textContent.split('\n\n')
  .map(elf=>elf.split('\n').map(Number).reduce((a,b)=>a+b)).sort().slice(-3).reduce((a,b)=>a+b)
// 212836
