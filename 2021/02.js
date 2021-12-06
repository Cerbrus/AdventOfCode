// 2.1
let depth = 0;
let position = 0;

document.getElementsByTagName('pre')[0].innerText.split(/\n/).filter(Boolean)
	.map(line => {
		const split = line.split(' ');
		return {
			direction: split[0],
			amount: Number(split[1])
		}
	}).forEach(step => {
		switch(step.direction){
			case 'up': depth -= step.amount; break;
			case 'down': depth += step.amount; break;
			case 'forward': position += step.amount; break;
		}
	});

console.log(depth * position);
// 1670340

// 2.2
let depth = 0;
let position = 0;
let aim = 0;

document.getElementsByTagName('pre')[0].innerText.split(/\n/).filter(Boolean)
	.map(line => {
		const split = line.split(' ');
		return {
			direction: split[0],
			amount: Number(split[1])
		}
	}).forEach(step => {
		switch(step.direction){
			case 'up': aim -= step.amount; break;
			case 'down': aim += step.amount; break;
			case 'forward': 
			  position += step.amount;
			  depth += aim * step.amount;
			break;
		}
	});

console.log(depth * position);
// 1954293920