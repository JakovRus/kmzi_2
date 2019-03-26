const Generator = require("./generator");
const utils = require("./generator-utils");

class LFSR extends Generator {
	constructor(seed, patternNumber) {
		super();
		
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

	get length() {
		const initialReister = this.register;
		let length = 0;

		do {
			this.shift();
			length++;
		} while(initialReister !== this.register);

		return length;
	}
}

module.exports = LFSR;