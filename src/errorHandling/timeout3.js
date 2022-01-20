// The timeout is a Date object:
//    The source must complete before the Date
//    Otherwise, a timeout error occurs

const { Observable } = require('rxjs');
const { timeout } = require('rxjs/operators');

const source = Observable.create(observer => {
    observer.next('A');
    setTimeout(() => observer.next('B'), 100); // emitted at 100 ms
    setTimeout(() => observer.next('C'), 300); // emitted at 300 ms
    setTimeout(() => observer.complete(), 600); // emitted at 600 ms
});

const timeoutAt = new Date(Date.now() + 500); // date is 500 ms from now
console.log('# Set the date at which the source should complete');
source.pipe(timeout(timeoutAt)).subscribe(d => console.log(d), e => console.log(e.message));
// Output:
// A
// B
// C
// Timeout has occured
