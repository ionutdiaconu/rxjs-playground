//   the first n values and complete

const { timer } = require('rxjs');
const { take } = require('rxjs/operators');

const source = timer(0, 100);
console.log('# take the first 5 values');
source.pipe(
    take(5)
).subscribe(
    d => console.log(d), 
    null, 
    () => console.log('complete')
);

// Output: 
// 0
// 1
// 2
// 3
// 4
// complete
