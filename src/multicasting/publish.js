//   convert an Observable into a ConnectableObservable
// ConnectableObservble acts as proxy for subscribers
// The technique is often used to prevent multiple side effects
//   when the source emits values to multiple subscriptions

// ConnectableObservable waits until 'connected' to start emitting values

const { Observable } = require('rxjs');
const { publish } = require('rxjs/operators');

console.log('\r\nstarting without publish...\r\n');

const source = Observable.create(observer => {
    console.log('--- Observable created');
    let counter = 0;
    const int = setInterval(() => {
        console.log(`- value from source: ${counter}`);
        observer.next(counter++);
        if (counter > 1) {
            clearInterval(int);
        }
    }, 100);
});

source.subscribe(v => console.log(`subscriber 1 received: ${v}`));
source.subscribe(v => console.log(`subscriber 2 received: ${v}`));
source.subscribe(v => console.log(`subscriber 3 received: ${v}`));

setTimeout(() => {
    // ^^^ just to delay until previous example finishes
    console.log('\r\n______________________\r\n');
    console.log('starting with publish...\r\n');
    const connectable = source.pipe(publish());
    connectable.subscribe(v => console.log(`subscriber 1 received: ${v}`));
    connectable.subscribe(v => console.log(`subscriber 2 received: ${v}`));
    connectable.subscribe(v => console.log(`subscriber 3 received: ${v}`));
    connectable.connect(); // <-- trigger Observable to start
    setTimeout(() => {
        // connecting after source is complete does nothing!
        //see publishReplay
        connectable.subscribe(v => console.log(`subscriber 4 received: ${v}`));
    }, 1000);
}, 2000);
