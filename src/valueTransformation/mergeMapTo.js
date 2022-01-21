// every value is mapped into an observable
// emit the combined value of the observable and the current value

const { of, interval } = require('rxjs');
const { mergeMapTo, take } = require('rxjs/operators');

console.log('# merge map to a constant');
of(1, 2)
    .pipe(mergeMapTo(of('same', '  inner', '    value')))
    .subscribe(x => console.log(x));
// Output:
// same
//   inner
//     value
// same
//   inner
//     value

console.log('\r\n_____________________________\r\n');

console.log('# merge map with result combinator function');
of('ping')
    .pipe(
        mergeMapTo(interval(100).pipe(take(3)), (sourceVal, internalVal) => {
            sourceVal = internalVal === 1 ? 'pong' : sourceVal;
            return `${sourceVal} ${internalVal * 2}`; // combine results
        })
    )
    .subscribe(x => console.log(x));
// Output:
// ping 0
// pong 2
// ping 4
