// - transform every value

const { of } = require('rxjs');
const { map, filter } = require('rxjs/operators');

console.log('# square every number');
of(1, 2, 3)
    .pipe(map(x => x * x))
    .subscribe(v => console.log(v));
// Output:
// 1
// 4
// 9

console.log('\r\n______________________\r\n');
console.log('# square every even number');
of(1, 2, 3, 4)
    .pipe(
        filter(x => x % 2 === 0),
        map(x => x * x)
    )
    .subscribe(v => console.log(v));
//Output:
// 4
// 16
