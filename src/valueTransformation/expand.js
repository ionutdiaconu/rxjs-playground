// recursively expand a given observable

const { of, empty } = require('rxjs');
const { expand } = require('rxjs/operators');

console.log('# expand will do two things');
console.log('# emit the value');
console.log('# use the value as input for another expand');
console.log('# recursion stops at an empty observable, or some other end signal (take(x), etc) ');
of(1)
    .pipe(expand(x => (x < 5 ? of(x + 1) : empty())))
    .subscribe(x => console.log(x));
// Output:
// 1
// 2
// 3
// 4
// 5
