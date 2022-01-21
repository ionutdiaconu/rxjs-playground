//   compare values from two different sources
//   return true if every value pairs matches

const { of } = require('rxjs');
const { sequenceEqual, delay, tap } = require('rxjs/operators');

console.log('# two idential sequences');
of(1, 2, 3)
    .pipe(sequenceEqual(of(1, 2, 3)))
    .subscribe(d => console.log(` -- result: ${d}`));
// Output:
// true

console.log('\r\n__________________');

console.log('# two different sequences');
of(1, 2, 3)
    .pipe(sequenceEqual(of(1, 2)))
    .subscribe(d => console.log(` -- result: ${d}`));
// Output:
// false

console.log('\r\n__________________');

console.log('# different sequences, using compare function');
of(1, 2, 3)
    .pipe(sequenceEqual(of(-1, -2, -3), (a, b) => a === -b))
    .subscribe(d => console.log(` -- result: ${d}`));
// Output:
// true

console.log('\r\n__________________');

console.log('# values in different order');
of(1, 2, 4, 2, 5)
    .pipe(
        tap(x => console.log(`source: ${x}`)),
        sequenceEqual(of(1, 2, 2, 4, 5).pipe(tap(x => console.log(`internal: ${x}`))))
    )
    .subscribe(d => console.log(` -- result: ${d}`));
// Output:
// false

console.log('\r\n__________________');

console.log('# same values but delayed');
of(1, 2, 3)
    .pipe(
        tap(x => console.log(`source: ${x}`)),
        sequenceEqual(
            of(1, 2, 3).pipe(
                tap(x => console.log(`internal: ${x}`)),
                delay(1000)
            )
        )
    )
    .subscribe(d => console.log(` -- result: ${d}`));
// Output:
// true
