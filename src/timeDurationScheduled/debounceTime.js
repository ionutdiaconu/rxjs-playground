// debounceTime
// if within a given period of time, the source does not emit anything new, emit the current value

const { Observable } = require('rxjs');
const { debounceTime } = require('rxjs/operators');

const events = Observable.create(observer => {
    // emit 1 at t0
    observer.next(1);
    // emit 2 at t0 + 550
    setTimeout(() => observer.next(2), 550);
    // emit 3 at t0 + 1000
    setTimeout(() => observer.next(3), 1000);
});

// specify milliseconds
events.pipe(debounceTime(500)).subscribe(x => console.log(x));
// Output
// 1
//       <-- 2 dropped because it's interval doesn't elapse before 3
// 3
