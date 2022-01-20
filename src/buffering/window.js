const { interval } = require('rxjs');
const { window, take, switchMap, toArray } = require('rxjs/operators');

console.log('# emit the buffer after 1000 ms');
interval(100)
    .pipe(
        window(interval(1000)),
        take(3), // <-- just to limit the life of the source Observable
        switchMap(w => w.pipe(toArray()))
    )
    .subscribe(d => {
        console.log(d);
    });
