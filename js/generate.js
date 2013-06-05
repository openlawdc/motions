var glob = require('glob'),
    fs = require('fs');

var legislativeMotions = glob.sync('motions/*LEG*.json').map(function(f) {
    console.log('processing ', f);
    return JSON.parse(fs.readFileSync(f));
});

fs.writeFileSync('data/legislative.json', JSON.stringify(legislativeMotions));
