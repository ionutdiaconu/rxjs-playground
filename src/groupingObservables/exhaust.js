// handle a sequence of observables (not a sequence of values)
// If next observable emits before prior is completed, drop second observable entirely

const { of } = require('rxjs');
const { exhaust, delay } = require('rxjs/operators');

const source1 = of('A', 'B', 'C').pipe(delay(100));
const source2 = of('D');
of(source1, source2)
    .pipe(exhaust())
    .subscribe(x => console.log(x));
// Output:
// A
// B
// C
