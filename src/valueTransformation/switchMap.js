//    turn a value into a stream
//    use that stream as the new source
//    until the original source emit another value

const { Observable, timer, interval } = require('rxjs');
const { switchMap, take, tap } = require('rxjs/operators');

const character = Observable.create(observer => {
    observer.next('A');
    setTimeout(() => observer.next('B'), 200);
    setTimeout(() => observer.complete(), 300);
});

const number = interval(50).pipe(take(5));
// switch to new inner observable when source emits
console.log('# switch to a new source');
character
    .pipe(
        tap(x => console.log(`value from source: ${x}`)),
        switchMap(() => number) // <-- here we subscribe to number
    )
    .subscribe(val => console.log(`emitted value: ${val}`), null, () => console.log('complete'));
// Output:
// value from source: A
// emitted value: 0
// emitted value: 1
// emitted value: 2
// value from source: B
// emitted value: 0
// emitted value: 1
// emitted value: 2
// emitted value: 3
// emitted value: 4
// complete

setTimeout(() => {
    //  ^^^ just to delay this example until after the previous example
    console.log('\r\n______________________________\r\n');
    console.log('# switch and combine values from two sources');
    console.log('# A is emitted from source.  switchMap then subscribes');
    console.log('# to the timer.  Timer emits values at 0 and 150');
    console.log('# which are combined with A and emitted');
    console.log('# Source emits B at 200ms, so the timer set up by A stops,');
    console.log('# and the B value emission kicks off a new timer');
    character
        .pipe(switchMap(() => timer(0, 150).pipe(take(3)), (char, num) => `${char}${num}`))
        .subscribe(v => console.log(v), null, () => console.log('complete'));
}, 1000);

// Output:
// A0
// A1
// B0
// B1
// B2
// complete
