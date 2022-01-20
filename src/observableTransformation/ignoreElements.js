// ignore all emitted values
// only emit the error or complete event

const { of } = require('rxjs');
const { ignoreElements } = require('rxjs/operators');

of(1, 2)
    .pipe(ignoreElements())
    .subscribe(v => console.log('next', v), e => console.log('error', e), () => console.log('complete'));

// Output:
// complete
