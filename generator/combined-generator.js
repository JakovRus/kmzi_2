const Generator = require("./generator");
const LFSR = require("./lfsr");
const generatorUtils = require("./generator-utils");

class CombinedGenerator extends Generator {
	constructor(seeds, patterns) {
		super();

		this.first = new LFSR(seeds[0], patterns[0]);
		this.second = new LFSR(seeds[1], patterns[1]);
		this.selector = new LFSR(seeds[2], patterns[2]);
	}

	shift() {
		const firstValue =  this.first.shift();
		const secondValue = this.second.shift();
		const selectorValue = this.selector.shift();

		return selectorValue ? firstValue : secondValue;
	}

	generate(length) {
		let sequence = '';
		while(sequence.length < length) {
			sequence += this.shift();
		}

		return sequence;
	};
	
	get length() {
		return this.first.length * this.second.length * this.selector.length;
	}
}

module.exports = CombinedGenerator;