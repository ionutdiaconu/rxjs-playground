// group the values into array of observables
//   for each value
//   call function with the value as parameters
//   the result is used as the group id
//   each group works as an observable

const { of } = require('rxjs');
const { groupBy, mergeMap, reduce, toArray } = require('rxjs/operators');

const posts = [
    { id: 1, likes: 2, comments: 0 },
    { id: 1, likes: 1, comments: 1 },
    { id: 2, likes: 2, comments: 1 },
    { id: 3, likes: 1, comments: 0 },
    { id: 2, likes: 0, comments: 1 },
    { id: 2, likes: 3, comments: 1 },
    { id: 1, likes: 0, comments: 1 },
    { id: 1, likes: 1, comments: 1 },
    { id: 1, likes: 1, comments: 1 },
    { id: 3, likes: 4, comments: 5 },
    { id: 1, likes: 1, comments: 1 }
];

const arr = of(...posts).pipe(
    groupBy(post => post.id),
    mergeMap(group$ => group$.pipe(toArray()))
);
const out = [];
arr.subscribe(a => out.push(a));
console.log(out[1]);

//Output:
// [ { id: 2, likes: 2, comments: 1 },
//   { id: 2, likes: 0, comments: 1 },
//   { id: 2, likes: 3, comments: 1 } ]

console.log('\r\n__________________________________\r\n');

setTimeout(() => {
    of(...posts)
        .pipe(
            groupBy(p => p.id),
            mergeMap(post =>
                post.pipe(
                    reduce(
                        (acc, curr) => {
                            acc.id = acc.id || curr.id;
                            acc.likes += curr.likes;
                            acc.comments += curr.comments;
                            return acc;
                        },
                        { id: null, likes: 0, comments: 0 }
                    )
                )
            )
        )
        .subscribe(x => console.log(x));
}, 1000);

// Output:
// { id: 1, likes: 6, comments: 5 }
// { id: 2, likes: 5, comments: 3 }
// { id: 3, likes: 5, comments: 5 }


