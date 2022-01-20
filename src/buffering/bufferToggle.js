const { interval } = require('rxjs');
const { bufferToggle, take, tap } = require('rxjs/operators');

//define our open/close signals
const opening = interval(400).pipe(tap(() => console.log('open')));
const closing = () => interval(300).pipe(tap(() => console.log('close')));
// each buffer closes 300 ms after opening
interval(100)
    .pipe(
        tap(x => console.log(x)),
        bufferToggle(opening, closing),
        take(3) // <-- just to limit the life of the source Observable
    )
    .subscribe(sequence => {
        console.log(sequence);
    });

/*
 Output:
      0
      1
      2
      open
      3
      4
      5
      close
      [ 3, 4, 5 ]
      6
      open
      7
      8
      9
      close
      [ 7, 8, 9 ]
      10
      open
      11
      12
      13
      close
      [ 11, 12, 13 ]

*/
