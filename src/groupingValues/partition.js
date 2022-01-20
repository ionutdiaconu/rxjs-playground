//  based on the returned value of a condition function
//  divide one sequence into two sequences

const { of } = require('rxjs');
const { partition } = require('rxjs/operators');

console.log('# from a schedule, partition busy and free days');
const timetable = [
    { day: 'MON', status: 'busy' },
    { day: 'TUE', status: 'busy' },
    { day: 'WED', status: 'busy' },
    { day: 'THU', status: 'busy' },
    { day: 'FRI', status: 'free' },
    { day: 'SAT', status: 'free' },
    { day: 'SUN', status: 'free' }
];

const [free, busy] = of(...timetable).pipe(partition(v => v.status === 'free'));

console.log('# busy on:');
busy.subscribe(v => console.log(v.day));
// Output:
// busy on:
// MON
// TUE
// WED
// THU

console.log('# free on:');
free.subscribe(v => console.log(v.day));
// Output:
// free on:
// FRI
// SAT
// SUN
