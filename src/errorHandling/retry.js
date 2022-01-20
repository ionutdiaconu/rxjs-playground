// resubscribe on error

const { of } = require('rxjs');
const { retry, map } = require('rxjs/operators');

console.log('# retry two times');
of('a', 1)
    .pipe(
        map(x => x.toUpperCase()),
        retry(2)
    )
    .subscribe(x => console.log(x), e => console.log('error:', e.message));
// Output:
// A     <-- original attempt
// A     <-- retry #1
// A     <-- retry #2
// error: x.toUpperCase is not a function
