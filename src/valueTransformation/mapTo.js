// - transform every value to the same output

const { of } = require('rxjs');
const { mapTo } = require('rxjs/operators');

console.log('# map to const string');
of(1, 2, 3)
    .pipe(
        mapTo('number') // same as map(x => 'number')
    )
    .subscribe(v => console.log(v));

// Output:
// number
// number
// number
