const data = require('./data.js');

function sumCounts(data) {
    let sum = 0;
    for (let group of data) {
        let unique = [...new Set(group.replace(new RegExp('\n', 'g'), ''))].length;
        sum += unique;
    }
    return sum;
}

function sumCounts2(data) {
    let sum = 0;
    for (let group of data) {
        let sets = group.split('\n').map(x => [...new Set(x)]);
        let unique = sets.reduce((a, b) => a.filter(x => b.includes(x))).length;
        sum += unique;
    }
    return sum;
}

// Part 1
console.log(sumCounts(data));

// Part 2
console.log(sumCounts2(data));
