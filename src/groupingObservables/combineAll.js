// combine latest values from multiple observables
// once all sources have emitted

const { of, interval } = require('rxjs');
const { combineAll, take, delay, tap } = require('rxjs/operators');

console.log('# one source completes without emitting values');
console.log('# the combined source complete without any values');
const source5 = of();
const source6 = of(1, 2, 3);
of(source6, source5)
    .pipe(combineAll())
    .subscribe(([val1, val2]) => {
        console.log(val1 + val2);
    });
// Output:
// (none)

console.log('\r\n___________________________\r\n');

console.log('# latest values from all sources');
const source1 = of(1, 2, 3);
const source2 = interval(2000).pipe(take(3));
const source3 = of(4, 5, 6).pipe(delay(5000));
const source4 = of('a', 'b', 'c');

of(source1, source2, source3, source4)
    .pipe(combineAll())
    .subscribe(([val1, val2, val3, val4]) => {
        console.log(val1 + ' - ' + val2 + ' - ' + val3 + ' - ' + val4);
    });
// Output:
// 3 - 1 - 4 - c
// 3 - 1 - 5 - c
// 3 - 1 - 6 - c
// 3 - 2 - 6 - c


of(1, 2, 3)
    .pipe(
        tap(sourceVal => console.log("Source val: " + sourceVal + " " + new Date().toTimeString())),
        delay(7000))
    .subscribe(val => console.log("Result val:" + val + " " + new Date().toTimeString()));


interval(3000)
    .subscribe(val => console.log(val + " " + new Date().toTimeString()))