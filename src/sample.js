// emit the most recent value when the notifier sends signal
// parameter is an Observable

const { Observable, interval } = require('rxjs');
const { sample, take } = require('rxjs/operators');

const source = interval(100);
const notifier = new Observable(observer => {
    setTimeout(() => observer.next(), 150);
    setTimeout(() => observer.next(), 350);
    setTimeout(() => observer.complete(), 750);
});

console.log('# the source emit values every 100 ms');
console.log('# the notifier signals at 150 ms, 350 ms and 750 ms');
console.log('# at 150ms, the latest value is 0');
console.log('# at 350ms, the latest value is 2');
console.log('# at 750ms, the latest value is 6');
source
    .pipe(
        sample(notifier),
        take(3)
    )
    .subscribe(d => console.log(d));
// Output:
// 0
// 2
// 6
