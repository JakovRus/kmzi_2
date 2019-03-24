#! /usr/bin/env node
const fs = require("fs");
const LFSR = require("./generator/generator");


const [,, ...args] = process.argv;

const params = {
	action: 'generate',
	pattern: 2,
	seed: 2502002,
	length: 1000000
} 

args.forEach((arg, index, array) => {
  switch (arg) {
    case 'action': {
      params.action = array[index + 1];
      break;
    };
    case 'pattern': {
      params.pattern = array[index + 1];
      break;
    };
    case 'seed': {
      params.seed = array[index + 1];
      break;
    }
    case 'length': {
      params.length = array[index + 1];
      break;
    }
  }
})

const generator = new LFSR(params.seed, params.pattern);

function generate() {
	const sequence = generator.generate(params.length);
	fs.writeFileSync('./tests/data/generated_sequence.txt', sequence);
}

switch (params.action) {
	case 'generate': {
		generate();
		break;
	};
	case 'computeLength': {
		console.log(generator.getSequenceLength());
		break;
	}
}