// emit only first value then complete

const { of } = require('rxjs');
const { first } = require('rxjs/operators');

//#region Example 1
console.log('# just the first...');
of(0, 1, 2, 3, 4)
    .pipe(first())
    .subscribe(x => console.log(x), null, () => console.log('complete'));
// Output:
// 0
// complete
//#endregion

console.log('\r\n_______________________\r\n');

//#region Example 2
of(1, 3, 5, 7, 9, 10)
    .pipe(first(v => v % 2 === 0))
    .subscribe(x => console.log(x), null, () => console.log('complete'));
// Output:
// first: 10
//#endregion

console.log('\r\n_______________________\r\n');

//#region Example 3
of(1, 3, 5, 7, 9)
    .pipe(first(v => v % 2 === 0))
    .subscribe(x => console.log(x), err => console.log('error:' + err.message));
// Output:
// error: no elements in sequence
//#endregion
