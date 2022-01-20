// emit the most recent value within a given period

const { interval } = require('rxjs');
const { take, auditTime, tap } = require('rxjs/operators');

console.log('# emit the last value emitted every second');
interval(500)
    .pipe(
        tap(x => console.log('emitted: ' + x)),
        auditTime(1000),
        take(3)
    )
    .subscribe(d => console.log('received by subscriber: ' + d));
// Output:
// emitted: 0
// emitted: 1
// received by subscribers: 1
// emitted: 2
// emitted: 3
// received by subscribers: 3
// emitted: 4
// emitted: 5
// received by subscribers: 5
