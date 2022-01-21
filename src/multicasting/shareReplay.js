//  make Observable hot, but also provide some past values

const { interval } = require('rxjs');
const { shareReplay, take, tap } = require('rxjs/operators');

const source$ = interval(100).pipe(take(3));

console.log('# without shareReplay');
source$.subscribe(v => console.log(`subscriber 1 received: ${v}`));
setTimeout(() => {
    source$.subscribe(v => console.log(`subscriber 2 received: ${v}`));
}, 300);

setTimeout(() => {
    // ^^^ just to let first example finish before starting this one
    console.log('\r\n_____________________\r\n');

    console.log('# with shareReplay');
    const source2$ = source$.pipe(shareReplay(2));
    source2$.subscribe(v => console.log(`subscriber 1 received: ${v}`));
    setTimeout(() => {
        console.log('*******subscriber 2 *********');
        source2$.subscribe(v => console.log(`subscriber 2 received: ${v}`));
    }, 1000); // <-- after source is complete
    //     but subscriber 2 still receives last 2 values
}, 2000);
