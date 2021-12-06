// 3.1
const binaries = document.getElementsByTagName('pre')[0].innerText.split(/\n/).filter(Boolean);

function countBits(binaries) {
	return binaries.reduce((bitCount, binary) => {
		[...binary].forEach((bit, index) => {
			bitCount[index] = bitCount[index] || [0, 0];
			bitCount[index][bit]++;
		});
		return bitCount;
	}, []);
}

const counts = countBits(binaries);

const gamma   = parseInt(counts.map(c => c[0]>c[1]?1:0).join(''), 2);
const epsilon = parseInt(counts.map(c => c[0]>c[1]?0:1).join(''), 2);
console.log(gamma * epsilon);
// 3009600

// 3.2
const binaries = document.getElementsByTagName('pre')[0].innerText.split(/\n/).filter(Boolean);

function countBits(binaries) {
	return binaries.reduce((bitCount, binary) => {
		[...binary].forEach((bit, index) => {
			bitCount[index] = bitCount[index] || [0, 0];
			bitCount[index][bit]++;
		});
		return bitCount;
	}, []);
}

let oxy = [...binaries];
let co2 = [...binaries];

for(let bit = 0; bit < counts.length; bit++) {
	if(oxy.length > 1) {
		const c = countBits(oxy)[bit];
		oxy = oxy.filter(val => val[bit] === (c[1] > c[0] || c[0] === c[1] ? '1' : '0'));
	}
	if(co2.length > 1) {
		const c = countBits(co2)[bit];
		co2 = co2.filter(val => val[bit] === (c[0] < c[1] || c[0] === c[1] ? '0' : '1'));
	}
}

console.log(parseInt(oxy[0], 2) * parseInt(co2[0], 2));
// 6940518