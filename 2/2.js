const data = require('./data.js');

function part1(data) {
    let valid_count = 0;
    for (let password of data) {
        let occur = (password.string.match(new RegExp(password.letter, "g")) || []).length;
        if (occur < password.nums[0] || occur > password.nums[1])
            continue;
        valid_count++;
    }
    return valid_count;
}

function part2(data) {
    let valid_count = 0;
    for (let password of data) {
        let valid1 = password.string[password.nums[0] - 1] == password.letter;
        let valid2 = password.string[password.nums[1] - 1] == password.letter;
        valid_count += valid1 ^ valid2;
    }
    return valid_count;
}

// Part 1
console.log(part1(data));

// Part 2
console.log(part2(data));