const { interval, timer } = require('rxjs');
const { throttle, tap, take } = require('rxjs/operators');

source = interval(100);

source
    .pipe(
        take(10),
        tap(x => console.log('emitted from source: ' + x)),
        throttle(y => {
            console.log('used to calculate next Observable: ' + y);
            return timer(500);
        })
    )
    .subscribe(x => console.log('received by subscribers:' + x));
//Output:
// emitted from source: 0
// received by subscribers:0
// used to calculate next Observable: 0
// emitted from source: 1
// emitted from source: 2
// emitted from source: 3
// emitted from source: 4
// emitted from source: 5
// received by subscribers:5
// used to calculate next Observable: 5
// emitted from source: 6
// emitted from source: 7
// emitted from source: 8
// emitted from source: 9
