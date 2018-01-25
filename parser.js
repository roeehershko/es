const fs = require('fs');
const csv = require('csvtojson');

let data = fs.readFileSync('./contacts.csv',{});
data = data.toString();

data = data.split('\n');
data.shift();
let dataJson = [];
data.forEach(function (val) {
    val = val.split(',');
    dataJson.push({
        name: val[0] + ' ' + val[1],
        phone: val[2],
        email: val[3],
        country: val[4].replace('\r', '')
    });
});

fs.writeFileSync('./contacts.json', JSON.stringify(dataJson, null, 4));
process.exit();