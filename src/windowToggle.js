//    open a new buffers whenever received an operning signal
//    after opened, the buffer stays until a closing signal is received
//    then, send the buffer as a stream

const { timer } = require('rxjs');
const { windowToggle, switchMap, take, toArray } = require('rxjs/operators');

console.log('# open a new buffer every 500ms');
console.log('# close the buffer 200ms after opening');
console.log('# hence, ignore those come between 200ms and 500ms');
const openings = timer(0, 500);
const closing = () => timer(200);

timer(0, 100)
    .pipe(
        take(36),
        windowToggle(openings, closing),
        switchMap(s => s.pipe(toArray()))
    )
    .subscribe(sequence => {
        console.log(sequence);
    });

// Output:
// [ 0, 1 ]
// [ 5, 6 ]
// [ 10, 11 ]
// [ 15, 16 ]
// [ 20, 21 ]
// [ 25, 26 ]
// [ 30, 31 ]
// [ 35 ]
