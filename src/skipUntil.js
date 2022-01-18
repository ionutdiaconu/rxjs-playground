//  skip the value until the notifier sends signal

const { timer } = require('rxjs');
const { skipUntil, take } = require('rxjs/operators');

console.log('# ignore values before the notifier sends the signal at 3s');
timer(0, 1000)
    .pipe(
        take(6),
        skipUntil(timer(3000))
    )
    .subscribe(val => console.log(val));
// Output:
// Skip emits values until inner observable emits (3s)
// 3
// 4
// 5
