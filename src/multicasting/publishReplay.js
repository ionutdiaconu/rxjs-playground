/*
 * 
 Author: David Mann 
 (c) 2018, Mann Software: MIT License
 
 */

// publishReplay
// convert an observable into a ConnectableObservable
// provide past values as specified

const { interval } = require('rxjs');
const { publishReplay, take } = require('rxjs/operators');

const source = interval(100).pipe(take(3));
const connectable = source.pipe(publishReplay(2));

connectable.subscribe(v => console.log(`subscriber 1 received: ${v}`), null, () => console.log('subscriber 1 completed'));
connectable.connect(); // <-- trigger Observable to start

setTimeout(() => {
    connectable.subscribe(v => console.log(`subscriber 2 received: ${v}`), null, () => console.log('subscriber 2 completed'));
}, 3000);
