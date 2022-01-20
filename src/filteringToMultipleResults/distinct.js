// emit unique values across whole source
const { of } = require('rxjs');
const { distinct } = require('rxjs/operators');

console.log('# select unique values within source');
of(1, 2, 3, 3, 2, 1)
    .pipe(distinct())
    .subscribe(x => console.log(x));
// Output:
// 1
// 2
// 3

console.log('________________________________');
console.log('# select source-unique values as determined by function ');
of(1, -1, 2, 3, 2)
    .pipe(distinct(x => Math.abs(x)))
    .subscribe(x => console.log(x));
// Output:
// 1
// 2
// 3

console.log('________________________________');
console.log('# select distinct objects based on properties');
console.log('see also distinctUntilKeyChanged');
of({ name: 'Dave', isAuthor: true }, { name: 'Mary', isAuthor: true }, { name: 'Dave', isAuthor: false })
    .pipe(distinct(item => item.name))
    .subscribe(x => console.log(x));

//Output:
// { name: 'Dave', isAuthor: true }
// { name: 'Mary', isAuthor: true }
