const fs = require("fs");
const CombinedGenerator = require("./generator/combined-generator");

const seeds = [121532, 421541, 556334];
const patterns = [3, 4, 3];

function performAction(params) {
	const generator = new CombinedGenerator(seeds, patterns);
	
	switch (params.action) {
		case 'generate': {
			const sequence = generator.generate(params.length);
			fs.writeFileSync('./tests/data/generated-sequence.txt', sequence);
			break;
		};
		case 'getLength': {
			console.log(generator.length);
			break;
		}
	}
}

module.exports = performAction;