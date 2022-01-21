//    intercept the value without modifing it
//    often used to add side effect such as logging

const { timer } = require('rxjs');
const { tap, take } = require('rxjs/operators');

console.log('# tap on every value');
timer(0, 100)
    .pipe(
        take(2),
        tap(ev => {
            console.log('side effect via tap for value ', ev);
            return 'abc';   //<-- this does nothing!
        })
    )
    .subscribe(d => {
        console.log(`value at source: ${d}`);
    });
// Output:
// side effect via tap for value  0
// value at source: 0
// side effect via tap for value  1
// value at source: 1
