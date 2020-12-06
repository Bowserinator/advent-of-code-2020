const data = require('./data.js');
const util = require('../util.js');

const REQUIRED_FIELDS = 'byr iyr eyr hgt hcl ecl pid'.split(' ');

function countValidPassports(data, stricter=false) {
    let valid_count = 0;
    for (let passport of data) {
        // Check all required fields exist
        let valid_field_count = 0;
        for (let field of REQUIRED_FIELDS) {
            if (passport.includes(field + ':'))
                valid_field_count++;
        }
        let valid = valid_field_count == REQUIRED_FIELDS.length;

        // Checks for individual fields
        if (stricter && valid) {
            let field_data = {};
            for (let field of REQUIRED_FIELDS)
                field_data[field] = passport.match(RegExp(field + '\\:[#a-zA-Z0-9]+', 'g'))[0].split(':')[1];

            if (!util.isBetweenIncludes(field_data['byr'], 1920, 2002))
                valid = false;
            else if (!util.isBetweenIncludes(field_data['iyr'], 2010, 2020))
                valid = false;
            else if (!util.isBetweenIncludes(field_data['eyr'], 2020, 2030))
                valid = false;
            else if (!/^#[a-z0-9]{6}$/gi.test(field_data['hcl']))
                valid = false;
            else if (!'amb blu brn gry grn hzl oth'.split(' ').includes(field_data['ecl']))
                valid = false;
            else if (!/^\d{9}$/g.test(field_data['pid']))
                valid = false;
            else {
                let inches = field_data['hgt'].includes('in');
                let height = field_data['hgt'].replace('cm', '').replace('in', '');
                valid = inches ?
                    util.isBetweenIncludes(height, 59, 76) :
                    util.isBetweenIncludes(height, 150, 193);
            }
        }
        valid_count += valid;
    }
    return valid_count;
}


// Part 1
console.log(countValidPassports(data));

// Part 2
console.log(countValidPassports(data, true));

