//  - reschedule to different scheduler

const { of, asapScheduler, asyncScheduler } = require('rxjs');
const { observeOn, tap } = require('rxjs/operators');

of('asap')
    .pipe(
        tap(val => console.log(`${val} queued`)),
        observeOn(asapScheduler)
    )
    .subscribe(val => {
        console.log(`${val} emitted`);
    });
of('async')
    .pipe(
        tap(val => console.log(`${val} queued`)),
        observeOn(asyncScheduler)
    )
    .subscribe(val => {
        console.log(`${val} emitted`);
    });
of('immediate').subscribe(val => console.log(`${val} emitted`));

// Output (without observeOn):
// asap queued
// asap emitted
// async queued
// async emitted
// immediate emitted

// Output (with observeOn):
// asap queued
// async queued
// immediate emitted
// asap emitted
// async emitted
