// convert an observable into a ConnectableObservable
// skips all events except the last

// a subscriber receives last value even if it subscribes after connect
const { interval } = require('rxjs');
const { publishLast, take } = require('rxjs/operators');

const source = interval(100).pipe(take(3));
const connectable = source.pipe(publishLast());

connectable.subscribe(v => console.log(`subscriber 1 received: ${v}`), null, () => console.log('subscriber 1 completed'));
connectable.subscribe(v => console.log(`subscriber 2 received: ${v}`), null, () => console.log('subscriber 2 completed'));
connectable.connect(); // <-- trigger Observable to start

setTimeout(() => {
    console.log('-------------delay----------------');
    connectable.subscribe(v => console.log(`subscriber 3 received: ${v}`), null, () => console.log('subscriber 3 completed'));
}, 2000);
// Output:
// subscriber 1 received: 2
// subscriber 2 received: 2
// subscriber 1 completed
// subscriber 2 completed
// -------------delay----------------
// subscriber 3 received: 2
// subscriber 3 completed
