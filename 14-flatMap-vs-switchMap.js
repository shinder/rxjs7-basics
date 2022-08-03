import { mergeMap, interval, take, map} from "rxjs";

const beginTime = Date.now();

let outer = interval(1000).pipe(
    take(2)
);

let combined = outer.pipe(
    mergeMap( x => {
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
result: outer 0; inner 0; t 1408
result: outer 0; inner 1; t 1814
result: outer 0; inner 2; t 2218
result: outer 1; inner 0; t 2418
result: outer 0; inner 3; t 2623
result: outer 1; inner 1; t 2822
result: outer 0; inner 4; t 3029
result: outer 1; inner 2; t 3228
result: outer 1; inner 3; t 3634
result: outer 1; inner 4; t 4039
 */
