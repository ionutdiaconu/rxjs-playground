// pick the value of the given field
//   do not emit value until changed

const { of } = require('rxjs');
const { distinctUntilKeyChanged } = require('rxjs/operators');

const posts = [
    { postId: 1, likes: 2, author: { id: 11 } },
    { postId: 2, likes: 6, author: { id: 12 } },
    { postId: 3, likes: 6, author: { id: 12 } }, // <-- dropped
    { postId: 4, likes: 9, author: { id: 14 } },
    { postId: 5, likes: 2, author: { id: 15 } }
];


console.log('#show only changes in "likes" property from previous');
of(...posts)
    .pipe(distinctUntilKeyChanged('likes'))
    .subscribe(x => console.log(x.postId + ', ' + x.likes));
// Output
// 1, 2
// 2, 6
// 4, 9
// 5, 2

console.log();
console.log('____________________________');
console.log();

console.log('#show only changes in nested property from previous');
of(...posts)
    .pipe(distinctUntilKeyChanged('author', (a1, a2) => a1.id === a2.id))
    .subscribe(x => console.log(x.postId + ', ' + x.author.id));
// Output
// 1, 11
// 2, 12
// 4, 14
// 5, 15
