//  emit the first value
//  drop all coming next events
//  after a given time
//  remove the block and wait for the next value

const { timer } = require('rxjs');
const { take, throttleTime } = require('rxjs/operators');
const { performance } = require('perf_hooks');

console.log('# emit one value every 10 ms');
console.log('# but only pass to subscribers every 1000 ms');
timer(0, 10)
    .pipe(
        take(300),
        throttleTime(1000)
    )
    .subscribe(d => console.log(`${d} at ${Math.trunc(performance.now() / 1000)} seconds`));
// Output:  (values will vary slightly, times will be different)
// 0 at 180648 seconds
// 72 at 180649 seconds
// 143 at 180650 seconds
// 213 at 180651 seconds
// 282 at 180652 seconds
