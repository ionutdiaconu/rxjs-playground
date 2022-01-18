//  ignore the first n values 

const { of } = require('rxjs');
const { skip } = require('rxjs/operators');

console.log('# skip the first 2 values');

of(1, 2, 3).pipe(
    skip(2)
).subscribe(val => console.log(val));

// Output: 
// 3

