//   find the max value within a stream
//   the definition of bigger can be determined through a comparator function

const { of } = require('rxjs');
const { max } = require('rxjs/operators');

console.log('# max of [1, 6, 2, 8, 3, 4, 7, 5] is: ');
of(1, 6, 2, 8, 3, 4, 7, 5)
    .pipe(max())
    .subscribe(v => console.log(v));
// Output:
// 8

const employees = [{ name: 'Alice', salary: 1000 }, { name: 'Bob', salary: 1200 }, { name: 'Jane', salary: 1100 }];

console.log('# find max using comparator function');
console.log('# employee with the highest salary is: ');
of(...employees)
    .pipe(max((x, y) => (x.salary > y.salary ? 1 : -1)))
    .subscribe(v => console.log(v.name + ' ' + v.salary));
// Output:
// Bob 1200
