//    collect n-th items from all sources into an array

const { timer, of } = require('rxjs');
const { map, zipAll, take } = require('rxjs/operators');

console.log('# collect pairs');
const source1 = of('A', '1', 'a');
const source2 = of('B', '2', 'b');
of(source1, source2)
    .pipe(zipAll())
    .subscribe(d => console.log(d));
// Output:
// [ 'A', 'B' ]
// [ '1', '2' ]
// [ 'a', 'b' ]

console.log('\r\n_________________________\r\n');

const sources = of(
    timer(0, 100).pipe(
        take(3),
        map(i => 'a' + i)
    ),
    timer(0, 300).pipe(
        take(3),
        map(i => 'b' + i)
    ),
    timer(0, 3000).pipe(
        take(3),
        map(i => 'c' + i)
    )
);

console.log('# values from different sources emit at different times');
sources.pipe(zipAll()).subscribe(d => console.log(d));
// Output:
// [ 'a0', 'b0', 'c0' ]
// [ 'a1', 'b1', 'c1' ]
// [ 'a2', 'b2', 'c2' ]
