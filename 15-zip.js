import {interval, zip, map, combineLatest} from "rxjs";

/*
let a1 = 2;
let b1 = 4;

let c1 = a1 + b1;  // c1 = 6

a1 = 55;           // c1 = 6;
b1 = 20;           // c1 = 6;
*/

const a1$ = zip([2, 55], interval(1200)).pipe(
    map(([a]) => a)
);
const b1$ = zip([4, 20], interval(2000)).pipe(
    map(([a]) => a)
);

zip(a1$, b1$).subscribe({
    next: ([a, b])=>console.log(a + b)
});

// combineLatest([a1$, b1$]).subscribe({
//     next: x => console.log(x)
// })

/*
zip() 可以結合 observables，以一個對應一個的方式結合
 */