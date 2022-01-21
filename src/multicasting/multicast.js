//   create a new ConnectableObservable

const { Subject, Observable } = require('rxjs');
const { multicast, tap } = require('rxjs/operators');

const obs$ = Observable.create(observer => {
    console.log('--- Observable subscribed');
    let counter = 0;
    const int = setInterval(() => {
        console.log(`- value from source: ${counter}`);
        observer.next(counter++);
        if (counter > 1) {
            clearInterval(int);
        }
    }, 100);
});

const source$ = obs$.pipe(tap(v => console.log(`this is a side effect: ${v}`)));

console.log('starting without multicast');
source$.subscribe(v => console.log(`subscriber 1 received: ${v}`));
source$.subscribe(v => console.log(`subscriber 2 received: ${v}`));

setTimeout(() => {
    // ^^^ just to delay this example until previous example completes
    console.log('\r\n______________________\r\n');

    console.log('starting with multicast');
    const proxy$ = new Subject();
    const connectable$ = source$.pipe(multicast(proxy$));

    proxy$.subscribe(v => console.log(`subscriber 1 received: ${v}`));
    proxy$.subscribe(v => console.log(`subscriber 2 received: ${v}`));
    connectable$.connect();
}, 1000);
