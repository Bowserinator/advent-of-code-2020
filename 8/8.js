const data = require('./data.js');
const ADDR_QUEUE_SIZE = 20;

class AsmRunner {

    constructor (data, flags={}) {
        this.data = data;
        if (this.data.includes('\n'))
            this.data = this.data.split('\n');
        this.flags = flags;
        this.resetRegisters();
    }

    resetRegisters() {
        this.registers = {
            acc: 0
        };
    }

    run(flags={}, pc=0, data=this.data) {
        /* Valid flags:
         * no_duplicate_pc - If runner.flags.notify_on_duplicate will print PC when instr is repeated
         *                   Terminates on finding a same loop
         */

        let visited_instr_addr = {};
        let previous_addrs = [];

        while (data[pc]) {
            // Update previous address queue
            previous_addrs.push(pc);
            while (previous_addrs.length > ADDR_QUEUE_SIZE)
                previous_addrs.shift();

            // Flag handling:
            // Don't duplicate instr addr
            if (visited_instr_addr[pc] && flags.no_duplicate_pc) {
                if (this.flags.notify_on_duplicate) {
                    console.log(`PC ${pc}: ${data[pc]} was duplicated`);
                    console.log(`Previous PC values: ${ previous_addrs.join(', ') }`);
                }
                return {
                    error: 'duplicate_instruction'
                }
            }

            visited_instr_addr[pc] = true;

            // Run the instruction
            let instr = data[pc].split(' ')[0];
            let args = data[pc].split(' ');
            let branch = false;

            if (this.flags.debug)
                console.log(`PC = ${pc}: ${data[pc]}`);

            switch (instr) {
                case 'nop':
                    break;
                case 'acc':
                    this.registers.acc += +args[1];
                    break;
                case 'jmp':
                    branch = true;
                    pc += +args[1];
                    break;
            }

            // Increment PC for non-branching instructions
            if (!branch) pc++;
        }

        return {
            success: true
        }
    }
}


// Part 1
let run = new AsmRunner(data)
run.run({ no_duplicate_pc : true });
console.log(run.registers.acc);

// Part 2
let jmp_and_nops = [];
for (let i = 0; i < data.length; i++) {
    let instr = data[i].split(' ')[0];
    if (['nop', 'jmp'].includes(instr))
        jmp_and_nops.push(i);
}


for (let index of jmp_and_nops) {
    run.resetRegisters();
    let tmp_data = data.slice(0);
    if (tmp_data[index].includes('jmp'))
        tmp_data[index] = tmp_data[index].replace('jmp', 'nop');
    else if (tmp_data[index].includes('nop'))
        tmp_data[index] = tmp_data[index].replace('nop', 'jmp');
   
    let r = run.run({ no_duplicate_pc : true }, 0, tmp_data);
    if (!r.error)
        console.log(run.registers.acc);
}