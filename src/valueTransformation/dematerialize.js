// convert Notification back to value

const { of, Notification } = require('rxjs');
const { dematerialize, tap } = require('rxjs/operators');

console.log('# dematerialize a stream');
of(Notification.createNext(0), Notification.createNext(1))
    .pipe(
        tap(x => console.log(x)),
        dematerialize()
    )
    .subscribe(x => console.log(x), e => console.error(e));

// Output
// Notification { kind: 'N', value: 0, error: undefined, hasValue: true }
// 0
// Notification { kind: 'N', value: 1, error: undefined, hasValue: true }
// 1
