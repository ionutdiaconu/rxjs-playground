// accumulate past values

const { of } = require('rxjs');
const { reduce } = require('rxjs/operators');

console.log('# sum of sequence');
console.log('# like scan, but only emits the final value');
of(1, 2, 3)
    .pipe(reduce((acc, val) => acc + val, 0))
    .subscribe(x => console.log(x));
// Output:
// 6
