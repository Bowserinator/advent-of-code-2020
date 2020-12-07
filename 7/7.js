const data = require('./data.js');

function parseData(data) {
    let r = {};
    for (let line of data) {
        let tmp = line.split(' bags contain ');
        r[tmp[0]] = tmp[1].split(', ').map(x => {
            return {
                count: x.includes('no other ') ? 0 : +x.split(' ')[0],
                color: x.substring(x.indexOf(' ') + 1)
                    .replace(' bags.', '')
                    .replace(' bag.', '')
                    .replace(' bags', '')
                    .replace(' bag', '')
            }
        });
    }
    return r;
}

function findBagsThatContain(parsed_data, colors_to_search=['shiny gold']) {
    let result = [];
    for (let key of Object.keys(parsed_data)) {
        if (parsed_data[key].some(x => colors_to_search.includes(x.color)))
            result.push(key);
    }
    return result;
}

function part1(parsed_data) {
    let result = findBagsThatContain(parsed_data, 'shiny gold');
    let all_bags = result;

    while (result.length) {
        let tmp = [];
        for (let color of result) {
            let new_colors = findBagsThatContain(parsed_data, color);
            tmp = tmp.concat(new_colors);
            all_bags = all_bags.concat(new_colors);
        }
        result = tmp;
    }
    return [...new Set(all_bags)].length;
}


function part2(parsed_data, color='shiny gold') {
    if (color === 'other')
        return 0;

    let counts = parsed_data[color];
    let total = 0;

    for (let bag_type of counts) {
        if (bag_type.color === 'other')
            continue;
        total += bag_type.count * (part2(parsed_data, bag_type.color) + 1);
    }

    return total;
}

// Part 1
const parsed = parseData(data);
console.log(part1(parsed));

// Part 2
console.log(part2(parsed));

