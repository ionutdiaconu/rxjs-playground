//   determine the lifetime of a buffer
//   emit the created buffer after a given period
const { interval } = require('rxjs');
const { bufferTime, take } = require('rxjs/operators');

console.log('# create a new buffer every 1 seconds');
console.log('# and emit it after 2 seconds');
interval(1000)
    .pipe(
        take(6),
        bufferTime(2000, 1000)
    )
    .subscribe(sequence => {
        console.log(sequence);
    });

// Output:
// [ 0 ]
// [ 0, 1 ]
// [ 1, 2 ]
// [ 2, 3 ]
// [ 3, 4 ]
// [ 4, 5 ]
// [ 5 ]
