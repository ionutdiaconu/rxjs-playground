// repeat source each time inner observable emits
// end when inner Observable completes or errors

const { of, interval } = require('rxjs');
const { repeatWhen, take, tap, startWith } = require('rxjs/operators');

console.log('# repeat the sequence twice (for 3 total)');
of(1, 2)
    .pipe(
        startWith('source starting'),
        repeatWhen(() =>
            interval(1000).pipe(
                tap(() => console.log(`internal emitted`)),
                take(2)
            )
        )
    )
    .subscribe(x => console.log(x), null, () => console.log('complete'));
// Output:
// source starting
// 1
// 2
// internal emitted
// source starting
// 1
// 2
// internal emitted
// source starting
// 1
// 2
// complete
