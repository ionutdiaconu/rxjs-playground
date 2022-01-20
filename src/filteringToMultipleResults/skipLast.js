//  ignore the last n values

const { of, interval } = require('rxjs');
const { skipLast } = require('rxjs/operators');

console.log('# skip the last 2 values');
of(1, 2, 3)
    .pipe(skipLast(2))
    .subscribe(val => console.log(val));
// Output:
// 1

setTimeout(() => {
    // ^^^ delay until previous examples complete
    console.log('# Observable must complete');
    interval(100)
        .pipe(skipLast(1))
        .subscribe(val => console.log(val));
}, 3000);
// Output:
// (nothing skipped - runs forever))
