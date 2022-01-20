// emit the most recent value within a given period

const { interval } = require('rxjs');
const { sampleTime, take, tap } = require('rxjs/operators');

console.log('# emit the first value and then last value emitted every second');
interval(500)
    .pipe(
        tap(x => console.log('emitted: ' + x)),
        sampleTime(1000),
        take(3)
    )
    .subscribe(d => console.log('received by subscriber: ' + d));
