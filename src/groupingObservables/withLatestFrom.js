//    when the original source emit a value
//    combine the value with the latest values from the new sources

const { timer, of } = require('rxjs');
const { withLatestFrom, map, take, delay } = require('rxjs/operators');

const source = timer(0, 300).pipe(
    take(3),
    map(i => `A${i}`)
);
const internal1 = timer(0, 100).pipe(
    take(10),
    map(i => `B${i}`)
);

const internal2 = of('C').pipe(delay(10));

console.log('# at 0, source emit 0, internal1 emits 0');
console.log('# at 10, internal2 emits C');
console.log('# at 300, source emits 1 and internal1 emits 2');
console.log('# at 600, source emits 2 and internal1 emits 5');
console.log('# then source completes, ending the subscription');
console.log('');
source.pipe(withLatestFrom(internal1, internal2)).subscribe(d => {
    console.log(d);
});
// Output:
//                        <-- nothing emitted here because of delay on C
// [ 'A1', 'B2', 'C' ]
// [ 'A2', 'B5', 'C' ]
//                        <-- source only emits 3 values so ends here
