const data = require('./data.js');

function findSum(data, target=2020) {
    let seen = {};
    for (let num of data)
        seen[num] = true;
    for (let num of data) {
        if (seen[target - num])
            return (target - num) * num;
    }
    return false;
}

// Part 1
console.log(findSum(data));

// Part 2
for (let num of data) {
    let sub_sum = findSum(data, 2020 - num);
    if (sub_sum) {
        console.log(num * sub_sum);
        break;
    }
}
