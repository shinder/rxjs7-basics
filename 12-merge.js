import { map, timer, merge } from "rxjs";

// Emulate first HTTP request that take 3 sec
let threeSecHTTPRequest = timer(3000).pipe(
    map(v=>'First response')
);

// Emulate second HTTP request that takes 1 sec
let oneSecHTTPRequest = timer(1000).pipe(
    map(v=>'Second response')
);

merge(threeSecHTTPRequest, oneSecHTTPRequest)
    .subscribe({
        next: res => console.log(res)
    });