#! /usr/bin/env node
const fs = require("fs");
const LFSR = require("./generator");

const generator = new LFSR(2502002, 7);
console.log(generator.getSequenceLength());
