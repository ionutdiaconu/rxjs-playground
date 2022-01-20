//   change scheduler used by Observable

const { of, asapScheduler, asyncScheduler } = require('rxjs');
const { subscribeOn, tap } = require('rxjs/operators');

of('asap')
    .pipe(
        tap(val => console.log(`${val} queued`)),
        subscribeOn(asapScheduler)
    )
    .subscribe(val => {
        console.log(`${val} emitted`);
    });
of('async')
    .pipe(
        tap(val => console.log(`${val} queued`)),
        subscribeOn(asyncScheduler)
    )
    .subscribe(val => {
        console.log(`${val} emitted`);
    });
of('immediate').subscribe(val => console.log(`${val} emitted`));

// Output (without subscribeOn):
// asap queued
// asap emitted
// async queued
// async emitted
// immediate emitted

// Output (with subscribeOn):
// immediate emitted
// asap queued
// asap emitted
// async queued
// async emitted
