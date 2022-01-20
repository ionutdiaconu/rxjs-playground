// find
// emit the first value that matches a given condition

const { of } = require('rxjs');
const { find } = require('rxjs/operators');

console.log('# first matching value: ');
of(1, 2, 3, 4, 5, 6, 7, 8)
    .pipe(find(x => x > 2 && x % 2 === 0))
    .subscribe(x => console.log(x));
// Output:
// 4
