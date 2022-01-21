// source acts as a signal. for each source emmit, we concatenate the inner observable to the output
const { of, interval } = require('rxjs');
const { concatMapTo, take, endWith, startWith } = require('rxjs/operators');

interval(1000)
    .pipe(
        take(5),
        concatMapTo(of('a', 'b')),
        endWith("------")
    )
    .subscribe(x => console.log(x));
//Output:
// a
// b
// a
// b
