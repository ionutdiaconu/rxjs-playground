// convert an observable into a ConnectableObservable
// emit initial value before the observable is connected

const { interval } = require('rxjs');
const { publishBehavior, take, tap } = require('rxjs/operators');

const source = interval(100).pipe(
    tap(x => console.log(` -- ${x}`)),
    take(3)
);
const connectable = source.pipe(publishBehavior('Hello World!'));

connectable.subscribe(v => console.log(`subscriber 1 received: ${v}`));
connectable.subscribe(v => console.log(`subscriber 2 received: ${v}`));

setTimeout(() => {
    connectable.connect(); // <-- trigger Observable to start
}, 2000);
// Output:
// subscriber 1 received: Hello World!
// subscriber 2 received: Hello World!
//  -- 0
// subscriber 1 received: 0
// subscriber 2 received: 0
//  -- 1
// subscriber 1 received: 1subscriber 2 received: 1
//  -- 2
// subscriber 1 received: 2
// subscriber 2 received: 2
