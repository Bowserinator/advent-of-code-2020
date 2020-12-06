const data = require('./data.js');

function part1(data, slopex=3, slopey=1) {
    let [x, y] = [0, 0];
    let trees = 0;

    while (y < data.length) { // Not reached bottom
        if (data[y][x] === '#')
            trees++;

        x = (x + slopex) % data[0].length;
        y += slopey;
    }
    return trees;
}

// Part 1
console.log(part1(data));

// Part 2
let slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
];
let total = 1;

for (let slope of slopes) {
    total *= part1(data, slope[0], slope[1]);
}
console.log(total);