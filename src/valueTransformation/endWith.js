// append values to the end of the sequence

const { of } = require('rxjs');
const { endWith } = require('rxjs/operators');

console.log('# append weekends at the end of working days');
const workingDays = ['Monday', 'Tuesday', 'Wednesday', 'Thurday', 'Friday'];
const weekends = ['Saturday', 'Sunday'];

of(...workingDays)
    .pipe(endWith(...weekends))
    .subscribe(x => console.log(x));

// Output:
// Monday
// Tuesday
// Wednesday
// Thurday
// Friday
// Saturday
// Sunday
