// prevent the error from stopping the stream
// replace the error with a new source

const { throwError, of } = require('rxjs');
const { catchError, map } = require('rxjs/operators');

console.log('# catch then rethrow the error');
throwError('error')
    .pipe(
        catchError(err => {
            console.log(`caught an error: ${err}`);
            return throwError(`rethrown: ${err}!`);
        }),
        catchError(err => {
            console.log(err);
            return of(undefined);
        })
    )
    .subscribe(
        d => {
            if (d) {
                console.log(d);
            }
        },
        err => console.log('oops'),
        () => console.log('complete')
    );

// Output:
// caught an error: error
// rethrown: error!
// complete

console.log('\r\n******************************\r\n');
console.log('# catch something unexpected');
of('a', 1)
    .pipe(
        map(v => v.toUpperCase()),
        catchError(err => {
            return of(undefined);
        })
    )
    .subscribe(
        d => {
            if (d) {
                console.log(d);
            }
        },
        err => console.log('oops'),
        () => console.log('complete')
    );
// Output:
// A
// complete
