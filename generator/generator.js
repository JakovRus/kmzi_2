const utils = require("./generator-utils");

class LFSR {
	constructor(seed, patternNumber) {
		this.pattern = parseInt(utils.patterns[patternNumber], 2);
		this.patternLength = utils.patterns[patternNumber].length - 1;
  	this.register = seed & utils.generateMask(this.patternLength);
	}

  shift() {
		let cusum = utils.getCusum(this.register, this.pattern);
		const mask = utils.generateMask(this.patternLength);
		this.register =	(this.register >> 1 | cusum << this.patternLength - 1);
		return cusum;
	};

	generate(length) {
		let sequence = '';
		while(sequence.length < length) {
			sequence += this.shift();
		}

		return sequence;
	};	

	getSequenceLength() {
		const initialReister = this.register;
		let length = 0;

		do {
			this.shift();
			length++;
			if(length > 16777215) {
				console.log('return');	
				return length;
			}
		} while(initialReister !== this.register);

		return length;
	}
}

module.exports = LFSR;