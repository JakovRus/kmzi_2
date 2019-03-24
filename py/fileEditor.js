const fs = require("fs");

const pi = fs.readFileSync("e.txt", "utf8");
fs.writeFileSync("e.txt", pi.replace(/\r\n|\r|\n| /g, '').slice(0, 1000000));