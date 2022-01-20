//    take the value while the condition held true
//    once the condition becomes false, emit complete event

const { of } = require('rxjs');
const { takeWhile } = require('rxjs/operators');

console.log('# take while condition is true');
of(1, 2, 3, 1)
    .pipe(takeWhile(val => val < 3))
    .subscribe(val => console.log(val));
// Output:
// 1
// 2
