const fs = require("fs");
const LFSR = require("./generator/generator");

function performAction(params) {
	const generator = new LFSR(params.seed, params.pattern);
	
	switch (params.action) {
		case 'generate': {
			const sequence = generator.generate(params.length);
			fs.writeFileSync('./tests/data/generated_sequence.txt', sequence);
			break;
		};
		case 'computeLength': {
			console.log(generator.getSequenceLength());
			break;
		}
	}
}

module.exports = performAction;