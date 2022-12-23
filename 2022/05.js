// 5.1
const stacks = `BVSNTCHQ
WDBG
FWRTSQB
LGWSZJDN
MPDVF
FWJ
LNQBJV
GTRCJQSN
JSQCWDM`.split('\n').map(s => [...s])

document.body.textContent.trim().split('\n')
    .slice(10)
    .map(line => line.match(/(\d+)/g).map(Number))
    .forEach(([count, origin, target]) => {
        stacks[target - 1].push(...stacks[origin - 1].splice(-count).reverse());
    });

stacks.map(s => s.pop()).join('');
// 'FJSRQCFTN'

// 5.2
document.body.textContent.trim().split('\n')
    .slice(10)
    .map(line => line.match(/(\d+)/g).map(Number))
    .forEach(([count, origin, target]) => {
        stacks[target - 1].push(...stacks[origin - 1].splice(-count));
    });

stacks.map(s => s.pop()).join('');
// 'CJVLJQPHS'
