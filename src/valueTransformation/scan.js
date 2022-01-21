//   apply accumulative functions to values from a sequence
// Comparision:
//   reduce() emit the final result
//   scan() emit every accumulative results
//      which helps track the history of those results

const { of } = require('rxjs');
const { scan } = require('rxjs/operators');

console.log('# scan emits cumulative sums');
of(1, 2, 3)
    .pipe(scan((acc, val) => acc + val, 0))
    .subscribe(x => console.log(x));
// Output:
// 1
// 3
// 6
