#! /usr/bin/env node
const performAction = require("./utils");
const [,, ...args] = process.argv;

const params = {
	action: 'generate',
	pattern: 2,
	seed: 2502002,
	length: 1000000
} 

args.forEach((arg, index, array) => {
  if(arg in params) {
  	params[arg] = array[index + 1];
  }
});

performAction(params);