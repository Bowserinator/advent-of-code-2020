const data = require('./data.js');

function binSearch(lo, hi, lo_char, hi_char, string) {
    let mid = Math.floor((lo + hi) / 2);
    // Lower half includes mid, upper is mid + 1 to hi

    for (let c of string) {
        if (c === lo_char)
            hi = mid;
        else if (c === hi_char)
            lo = mid + 1;
        mid = Math.floor((lo + hi) / 2);
    }
    return mid;
}

function getSeatId(seat_code) {
    let row = binSearch(0, 127, 'F', 'B', seat_code.substring(0, 7));
    let col = binSearch(0, 7, 'L', 'R', seat_code.substring(7));
    return row * 8 + col;
}

// Part 1
const seats = data.map(getSeatId);
console.log(Math.max.apply(null, seats));

// Part 2
const sorted = seats.sort();
for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i + 1] != sorted[i] + 1) {
        console.log(sorted[i] + 1);
        break;
    }
}
