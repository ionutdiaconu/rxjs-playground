const { interval, timer } = require('rxjs');
const { tap, take, audit } = require('rxjs/operators');

source = interval(100);

source
    .pipe(
        take(10),
        tap(x => console.log('emitted from source: ' + x)),
        audit(y => {
            console.log('used to calculate next Observable: ' + y);
            return timer(500);
        })
    )
    .subscribe(z => console.log('received by subscribers:' + z));
//Output:
// emitted from source: 0
// used to calculate next Observable: 0
// emitted from source: 1
// emitted from source: 2
// emitted from source: 3
// emitted from source: 4
// received by subscribers:4
// emitted from source: 5
// used to calculate next Observable: 5
// emitted from source: 6
// emitted from source: 7
// emitted from source: 8
// emitted from source: 9
