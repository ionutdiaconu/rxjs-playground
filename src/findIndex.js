// emit the index of the first value that matches a given condition

const { of } = require('rxjs');
const { findIndex } = require('rxjs/operators');

console.log('# the index of the first match: ');
of(1, 2, 3, 4, 5, 6, 7, 8)
    .pipe(findIndex(x => x > 2 && x % 2 === 0))
    .subscribe(x => console.log(x));
// Output:
// 3
