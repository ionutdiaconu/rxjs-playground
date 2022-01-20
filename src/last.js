// isEmpty
// - emit the last value

const { of, interval } = require('rxjs');
const { last } = require('rxjs/operators');

//#region Example 1
of(1, 2, 3)
    .pipe(last())
    .subscribe(v => console.log('last:', v));
// Output:
// last: 3
//#endregion

console.log('\r\n_______________________\r\n');

//#region Example 2
of(1, 2, 3)
    .pipe(last(v => v % 2 === 0))
    .subscribe(v => console.log('last even:', v));
// Output:
// last: 2
//#endregion

console.log('\r\n_______________________\r\n');

//#region Example 3
console.log('# call last on empty sequence causes error');
of()
    .pipe(last())
    .subscribe(v => console.log('last:', v), e => console.log('error:', e.message));
// Output:
// error: no elements in sequence
//#endregion

console.log('\r\n_______________________\r\n');

//#region Example 4
console.log('# call last on infinite sequence never emits');
interval()
    .pipe(last())
    .subscribe(v => console.log('last:', v), e => console.log('error', e.message));
// Output:
//  (none)
//#endregion
