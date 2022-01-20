//   put all values into an array
//   once the source completes, emit the whole array

const { interval } = require('rxjs');
const { toArray, take } = require('rxjs/operators');

interval(100)
    .pipe(
        take(9),
        toArray()
    )
    .subscribe(d => console.log(d));
// Output:
// [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]
