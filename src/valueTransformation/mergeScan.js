// emit the cumulative result of combining past values

const { of } = require('rxjs');
const { mergeScan } = require('rxjs/operators');

console.log('# emit cumulative sum');
of(1, 2, 3)
    .pipe(mergeScan((acc, val) => of(acc + val), 0))
    .subscribe(x => console.log(x));
// Output:
// 1   <-- 0 + 1
// 3   <-- + 2
// 6   <-- + 3

console.log('\r\n______________________\r\n');

console.log('# for instruction only, show progress');
of(1, 2, 3)
    .pipe(
        mergeScan((acc, val) => {
            console.log(`mergeScan called with acc: ${acc}, val:${val}`);
            return of('a', 'b', acc + val);
        }, 0)
    )
    .subscribe(x => console.log(`sent to subscribers: ${x}`));
// Output:
// mergeScan called with acc: 0, val:1
// sent to subscribers: a
// sent to subscribers: b
// sent to subscribers: 1
// mergeScan called with acc: 1, val:2
// sent to subscribers: a
// sent to subscribers: b
// sent to subscribers: 3
// mergeScan called with acc: 3, val:3
// sent to subscribers: a
// sent to subscribers: b
// sent to subscribers: 6
