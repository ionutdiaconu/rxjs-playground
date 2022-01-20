// emit only the (n+1)-th emitted value

const { of } = require('rxjs');
const { elementAt } = require('rxjs/operators');

console.log('# emit only the third value');
of(1, 2, 3)
    .pipe(elementAt(2))
    .subscribe(x => console.log(x));
// Output:
// 3
