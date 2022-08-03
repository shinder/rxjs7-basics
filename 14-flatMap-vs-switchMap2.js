import {interval, switchMap, take, map} from "rxjs";

const beginTime = Date.now();

let outer = interval(1000).pipe(
    take(2)
);

let combined = outer.pipe(
    switchMap( x => {
        return interval(400).pipe(
            take(5),
            map( y => {
                const t = Date.now() - beginTime;
                return  `outer ${x}; inner ${y}; t ${t}`;
            })
        )
    })
)

combined.subscribe({
    next: result => console.log(`result: ${result} `)
});

/*
result: outer 0; inner 0; t 1411
result: outer 0; inner 1; t 1817
result: outer 1; inner 0; t 2415
result: outer 1; inner 1; t 2821
result: outer 1; inner 2; t 3226
result: outer 1; inner 3; t 3632
result: outer 1; inner 4; t 4038
 */
