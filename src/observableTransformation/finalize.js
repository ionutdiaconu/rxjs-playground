// register a callback for complete event

const { of } = require('rxjs');
const { finalize, tap } = require('rxjs/operators');

of(1)
    .pipe(finalize(() => console.log('finalize')))
    .subscribe(
        val => console.log('value: ' + val),
        err => console.log('error: ' + err),
        () => console.log('complete'));
// Output:
// value: 1
// complete
// finalize

console.log('\r\n______________________________\r\n');

of('a', 1)
    .pipe(
        tap(z => z.toUpperCase()),
        finalize(() => console.log('finalize'))
    )
    .subscribe(
        val => console.log('value: ' + val),
        err => console.log('error: ' + err),
        () => console.log('complete'));
// Output:
// value: a
// error: TypeError: z.toUpperCase is not a function
// finalize
