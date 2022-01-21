// for every emitted value, create a new observable
//  emit all the values from the newly created observable
//  before moving on to next Observable.  Drop overlap Observables

const { of } = require('rxjs');
const { exhaustMap, delay } = require('rxjs/operators');

console.log('# map each emitted value to a generated Observable');
console.log("# and emit each Observable's values");
console.log('# The third value results in an Observable');
console.log("# that doesn't complete before the fourth value is emitted");
console.log('# so the fourth value is dropped \r\n');
of('A', 'B', 'blocker', 'C')
    .pipe(
        exhaustMap(x => {
            switch (x) {
                case 'A':
                    return of(x, x.toLowerCase());
                case 'B':
                    return of(1, 2, 3, 4);
                case 'blocker':
                    return of(x).pipe(delay(10));
                default:
                    return of(x);
            }
        })
    )
    .subscribe(x => console.log(x));
// Output:
// A
// a
// 1
// 2
// 3
// 4
// blocker
//               <-- C never emitted
