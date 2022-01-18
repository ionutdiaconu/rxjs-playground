//  take the value until the notifier sends signal

const { timer } = require('rxjs');
const { takeUntil } = require('rxjs/operators');

console.log('# take the values until the notifier sends the signal at 300ms')
timer(0, 100).pipe(
    takeUntil(timer(300))
).subscribe(
    val => console.log(val),
    null,
    () => console.log('complete')
);

// Output: 
// 0
// 1
// 2
// complate