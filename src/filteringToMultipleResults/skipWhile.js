//    skip the value while the condition held true
//    once the condition becomes false, emit the coming values as
//    normal

const { of } = require('rxjs');
const { skipWhile } = require('rxjs/operators');

console.log('# skip while the condition is true');
of(1, 2, 3, 1, 2, 3, 4)
    //   ^ condition false
    .pipe(skipWhile(val => val < 3))
    .subscribe(val => console.log(val));
// Output:
// 3
// 1
// 2
// 3
// 4
