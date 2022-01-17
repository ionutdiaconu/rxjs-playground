
const { timer } = require('rxjs');
const { windowCount, switchMap, take, toArray } = require('rxjs/operators');
//#region example 1
const source = timer(0, 1000).pipe(take(9));
console.log('# buffer 2 items');
source
    .pipe(
        windowCount(2),
        switchMap(w => w.pipe(toArray()))
    )
    .subscribe(v => console.log(v));
// Output:
// [0, 1]
// [2, 3]
// [4, 5]
// [6, 7]
// [8]
//#endregion

