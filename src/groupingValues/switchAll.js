//   given an origin of sources, whose values are sources
//   as a new source come, wait for it to complete
//   if it completes before the next source come, send out its values
//   otherwise, drop its values

const { of, Subject } = require('rxjs');
const { switchAll, delay, endWith, tap } = require('rxjs/operators');

const origin = new Subject();
const sourceA = of('A1', 'A2', 'A3', 'A4').pipe(
    tap(x => (x.indexOf('1') > -1 ? console.log('begin A') : '')),
    endWith('end of A')
);
const sourceB = of('B1', 'B2').pipe(
    tap(x => (x.indexOf('1') > -1 ? console.log('begin B') : '')),
    delay(100),
    endWith('end of B')
);
const sourceC = of('C1', 'C2', 'C3').pipe(
    tap(x => (x.indexOf('1') > -1 ? console.log('begin C') : '')),
    endWith('end of C')
);

console.log('# source A completes before source B comes');
console.log('# source B does not complete before source C comes');
console.log('# hence, all values from source B are ignored');

origin.pipe(switchAll()).subscribe(val => console.log(val));

origin.next(sourceA);
setTimeout(() => origin.next(sourceB), 1000);
setTimeout(() => origin.next(sourceC), 1000);

// Output:
// begin A
// A1
// A2
// A3
// A4
// end of A
// begin B
// begin C
// C1
// C2
// C3
// end of C
