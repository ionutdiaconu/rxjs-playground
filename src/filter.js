// emit only values matching a given condition

const { of } = require('rxjs');
const { filter } = require('rxjs/operators');

console.log('# filter even numbers');
of(1, 2, 3, 4, 5, 6, 7, 8)
    .pipe(filter(x => x % 2 === 0))
    .subscribe(x => console.log(x));
// Output:
// 2
// 4
// 6
// 8
