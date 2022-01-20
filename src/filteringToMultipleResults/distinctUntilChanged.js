// do not emit value until changed

const { of } = require('rxjs');
const { distinctUntilChanged } = require('rxjs/operators');

console.log('#emit only values if changed from the previous one');
of(1, 1, 1, 2, 1, 2, 3)
    .pipe(distinctUntilChanged())
    .subscribe(x => console.log(x));
// Output:
// 1
// 2
// 1
// 2
// 3

console.log();
console.log('#emit only values if mapper function return value that changes from the previous one');
of(1, -1, 2, -2, 1, 2)
    .pipe(distinctUntilChanged((x, y) => Math.abs(x) === Math.abs(y)))
    .subscribe(x => console.log(x));
// Output:
// 1
// 2
// 1
// 2
