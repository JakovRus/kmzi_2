class Generator {
	shift() {}

	generate(length) {
		let sequence = '';
		while(sequence.length < length) {
			sequence += this.shift();
		}

		return sequence;
	};
	
	get length() {}
}

module.exports = Generator;