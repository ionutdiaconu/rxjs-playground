// determine the closing point of a buffer

const { interval } = require('rxjs');
const { bufferWhen, take, tap } = require('rxjs/operators');

console.log('# vary buffer clearing based on value from interval');
let x = 0;
interval(500)
    .pipe(
        take(10), // <-- just to limit the life of the source Observable
        tap(i => (x = i)),
        bufferWhen(() => {
            // vary buffer closing:
            if (x < 5) {
                return interval(1000);
            }
            return interval(500);
        })
    )
    .subscribe(values => {
        console.log(values);
    });
// Output:
// [ 0 ]
// [ 1, 2 ]
// [ 3, 4 ]
// [ 5, 6 ]
// [ 7 ]
// [ 8 ]
// [ 9 ]
