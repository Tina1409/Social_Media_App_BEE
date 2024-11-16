const fs = require("fs");

const readData = (file) => JSON.parse(fs.readFileSync(file, "utf-8") || "[]");
const writeData = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

module.exports = { readData, writeData };
