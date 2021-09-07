const fs = require('fs');

const jsonBuffer = fs.readFileSync('./1-json.json');
const jsonString = jsonBuffer.toString();
const data = JSON.parse(jsonString)
data.name = 'Leo';

fs.writeFileSync('./1-json.json', JSON.stringify(data));

console.log(data);