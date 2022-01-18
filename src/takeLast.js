//   emit the last n values and complete

const { of, interval } = require('rxjs');
const { takeLast } = require('rxjs/operators');

const source = of(1, 2, 3, 4, 5, 6, 7, 8, 9);
console.log('# take the last 3 values');
source.pipe(takeLast(3)).subscribe(d => console.log(d), null, () => console.log('complete'));

// Output:
// 7
// 8
// 9
// complete

console.log('\r\n____________________\r\n');
console.log('# Only get 3 values, even though take specified 5');
of(1, 2, 3)
    .pipe(takeLast(5))
    .subscribe(x => console.log(x),null, () => console.log('complete'));

const source3 = interval(100);
console.log('\r\n____________________\r\n');
console.log(`this will never emit anything, and never end, because interval doesn't have a 'last' value`);
source3.pipe(takeLast(5)).subscribe(d => console.log(d), null, () => console.log('complete'));
