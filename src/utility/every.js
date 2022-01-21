// determine if every value meets the given condition

const { of } = require('rxjs');
const { every, tap } = require('rxjs/operators');

console.log('# is every number even');
console.log('# [1, 2, 3, 4]');
of(1, 2, 3, 4)
    .pipe(
        tap(x => console.log('evaluating: ' + x)),
        every(x => x % 2 === 0)
    )
    .subscribe(x => console.log(x));
// Output:
// evaluating: 1
// false

console.log('\r\n__________________\r\n');

console.log('# [2, 4, 6, 8]');
of(2, 4, 6, 8)
    .pipe(
        tap(x => console.log('evaluating: ' + x)),
        every(x => x % 2 === 0)
    )
    .subscribe(x => console.log(x));
// Output:
// evaluating: 2
// evaluating: 4
// evaluating: 6
// evaluating: 8
// true
