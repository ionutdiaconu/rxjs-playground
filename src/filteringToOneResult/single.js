//  check that a single value matches the specified condition
//  if a single value matches, emit the value
//  if no value matches, emit undefined
//  if more than one value match, emit an error

const { of } = require('rxjs');
const { find, single } = require('rxjs/operators');

console.log('# the one match');
of(1, 2, 3)
    .pipe(single(x => x % 2 === 0))
    .subscribe(v => console.log(v), err => console.log(err), () => console.log('complete'));
// Output:
// 2
// complete

console.log('\r\n_______________________________\r\n');
console.log('# no value matches');
of(1, 2, 3)
    .pipe(single(x => x < 0))
    .subscribe(v => console.log(v), err => console.log(err), () => console.log('complete'));
// Output:
// undefined
// complete

console.log('\r\n_______________________________\r\n');
console.log('# throw error if more than one value matches');
of(1, 2, 3, 4)
    .pipe(single(x => x % 2 === 0))
    .subscribe(v => console.log(v), err => console.log(err), () => console.log('complete'));
// Output:
// Sequence contains more than one element
