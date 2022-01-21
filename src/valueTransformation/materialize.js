// convert value to Notification object

const { of } = require('rxjs');
const { map, materialize } = require('rxjs/operators');

console.log('# materialize a stream');
of(1, 0)
    .pipe(materialize())
    .subscribe(x => console.log(x));
// Output
// Notification { kind: 'N', value: 1, error: undefined, hasValue: true }
// Notification { kind: 'N', value: 0, error: undefined, hasValue: true }
// Notification { kind: 'C', value: undefined, error: undefined, hasValue:false}

console.log('\r\n_________________________________\r\n');

console.log('# materialize error');
of('a', 0, 'b')
    .pipe(
        map(x => x.toUpperCase()),
        materialize()
    )
    .subscribe(x => console.log(x));
