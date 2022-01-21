// - emit true if the observable complete without any next events
// - emit false otherwise

const { of } = require('rxjs');
const { isEmpty, delay } = require('rxjs/operators');

of()
    .pipe(isEmpty())
    .subscribe(v => console.log('isEmpty:', v));
// Output:
// isEmpty: true

of(1)
    .pipe(
        delay(2000),
        isEmpty()
    )
    .subscribe(v => console.log('isEmpty:', v));
// Output:
// isEmpty: false
