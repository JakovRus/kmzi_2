const patterns = [
	"111", //x^2 + x + 1, length: 3
	"1101", //x^3 + x^2 + 1, length: 7
	"11001", //x^4 + x^3 + 1, length: 15
	"11000001", //x^7 + x^6 + 1, length: 127
	"11010000000010001", //x^16 + x^15 + x^13 + x^4 + 1, length: 65535
	"11100100000000000001", //x^19 + x^18 + x^17 + x^14 + 1, length: 524287
	"100100000000000000001", //x^20 + x^17 + 1, length: 1048575
	"1110000100000000000000001", //x^24 + x^23 + x^22 + x^17 + 1, length: 16777215
]

function generateMask(length) {
	const mask = Array.from({length}, () => 1).join('');
	return parseInt(mask, 2);
}

function getCusum(register, pattern) {
	const bit = register & pattern;
	const cusum = bit.toString(2).split('').reduce((result, current) => {
		result += parseInt(current, 2);
		return result % 2;
	}, 0);

	return cusum;
	
}

module.exports = {
	patterns,
	generateMask,
	getCusum
}