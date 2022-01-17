/*
 * 
 Author: David Mann 
 (c) 2018, Mann Software: MIT License
 
 */

// windowWhen
//    buffer values
//    on receiving signals from the notifier
//      send the buffer as an observable
//    when the source complete
//      send the last buffer as an observable

const { timer } = require('rxjs');
const { windowWhen, take, tap, mergeAll } = require('rxjs/operators');

const source = timer(0, 100).pipe(take(9));
const notifier = () => timer(200);

console.log('# emit buffer after 200 ms');

source
    .pipe(
        windowWhen(notifier),
        tap(() => console.log('new buffer')),
        mergeAll()
    )
    .subscribe(v => console.log(v));
// Output:
// new buffer
// 0
// 1
// new buffer
// 2
// 3
// new buffer
// 4
// 5
// new buffer
// 6
// 7
// new buffer
