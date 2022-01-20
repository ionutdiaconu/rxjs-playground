//   group two consecutive values

const { of } = require('rxjs');
const { pairwise, filter, first } = require('rxjs/operators');

const vals = [1, 2, 3, 4, 5, 6, 7, 8, 9];

console.log('# pairs of values');
of(...vals)
    .pipe(pairwise())
    .subscribe(val => console.log(val));

// Output:
// [ 1, 2 ]
// [ 2, 3 ]
// [ 3, 4 ]
// [ 4, 5 ]
// [ 5, 6 ]
// [ 6, 7 ]
// [ 7, 8 ]
// [ 8, 9 ]

console.log();
console.log('# find first number decrease');
const nums = [10, 12, 10, 16, 20];
of(...nums)
    .pipe(
        pairwise(),
        filter(([p1, p2]) => p2 - p1 < 0),
        first()
    )
    .subscribe(([p1, p2]) => console.log(`decrease found: ${p1} to ${p2}`));
// Output:
// decrease found: 12 to 10
