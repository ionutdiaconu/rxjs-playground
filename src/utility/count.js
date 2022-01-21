// emit the total number of emissions
const { of } = require('rxjs');
const { count } = require('rxjs/operators');

console.log('# count the times of emissions');
of(-3, -2, -1, 0, 1, 2, 3)
    .pipe(count())
    .subscribe(x => console.log(x));
// Output:
// 7

console.log('# count the values matching a predicate');
of(-3, -2, -1, 0, 1, 2, 3)
    .pipe(count(x => x < 0))
    .subscribe(x => console.log(x));
// Output:
// 3
