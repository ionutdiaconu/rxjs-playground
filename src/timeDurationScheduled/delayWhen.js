/*
 * 
 Author: David Mann 
 (c) 2018, Mann Software: MIT License
 
 */

// delayWhen
// delay emission based on newly created observable
const { of, interval } = require('rxjs');
const { delayWhen } = require('rxjs/operators');

console.log('# At t0: all three events are emitted from source');
console.log('# The first item will be delayed until t0 + 1000');
console.log('# The second item will be delayed until t0 + 2000');
console.log('# The third item will be delayed until t0 + 3000');
of(1, 2, 3)
    .pipe(
        delayWhen(x => {
            const t = x * 1000;
            console.log(`delay  by t= ${t}`);
            return interval(t);
        })
    )
    .subscribe(x => console.log(x + " " + new Date().toTimeString()));
// Output:
// 1
// 2
// 3
