//  - on error, skip the current stream
//  - use a new stream as a replacement
const { of } = require('rxjs');
const { onErrorResumeNext, map } = require('rxjs/operators');

console.log('# on error, use another stream');
const source = of('feed1', 'feed2', 'feed3');
const backup = of(
    'handle error',
    "but don't complete original",
    "and don't get any info about thrown error",
    'Oh, **also called on COMPLETE!**'
);
source
    .pipe(
        map(feed => {
            if (feed === 'feed2') {
                throw new Error(`oops - but we'll never see this!`);
            }
            return feed;
        }),
        onErrorResumeNext(backup)
    )
    .subscribe(v => console.log(v));
