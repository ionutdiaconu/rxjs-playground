//  get a property of each value
//  to access nested fields use an array of properties in proper order

const { of } = require('rxjs');
const { pluck } = require('rxjs/operators');

const friends = [
    { name: 'Alice', birthday: '02/03', address: { state: 'MA' } },
    { name: 'Bob', birthday: '07/04', address: { state: 'PA' } },
    { name: 'Jane', birthday: '10/12', address: { state: 'VA' } }
];

console.log('# friends: birthday');
of(...friends)
    .pipe(pluck('birthday'))
    .subscribe(d => console.log(d));
// Output:
// 02/03
// 07/04
// 10/12

console.log('# friends: states');
of(...friends)
    .pipe(pluck('address', 'state'))
    .subscribe(d => console.log(d));
// Output:
// MA
// PA
// VA
