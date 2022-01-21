//   prepend the stream with given values

const { of } = require('rxjs');
const { startWith } = require('rxjs/operators');

console.log('# prepend two values');
of(3)
    .pipe(startWith(1, 2))
    .subscribe(val => console.log(val));
// Output:
// 1
// 2
// 3
