// emit value after inner Observable completes or emits
// if no new values from source

// debounce(aka rate limiting) delays notifications emitted by the source Observable, but drops previous pending delayed emissions if a new notification arrives on the source Observable

const { timer, interval } = require('rxjs');
const { debounce, take, tap } = require('rxjs/operators');

timer(0, 1000)
    .pipe(
        tap(x => console.log(`Source: ${x} at ${x * 1000} ms.  Interval${x} subscribed.`)),
        debounce(x => {
            let time = 900;
            let totalTime = x * 1000 + 900;
            if (x === 1) {
                time = 1500; // after next value emitted from source
            }
            return interval(time).pipe(tap(() => console.log(`*Interval${x} emits at ${totalTime} ms`)));
        })
    )
    .pipe(take(3))
    .subscribe(x => console.log(`-- received by subscribers: ${x}`));

// Output
// Source: 0 at 0 ms.  Interval0 subscribed.
// *Interval0 emits at 900 ms
// --- received by subscribers: 0
// Source: 1 at 1000 ms.  Interval1 subscribed.
// Source: 2 at 2000 ms.  Interval2 subscribed.
// *Interval2 emits at 2900 ms
// --- received by subscribers: 2
// Source: 3 at 3000 ms.  Interval3 subscribed.
// *Interval3 emits at 3900 ms
// --- received by subscribers: 3
