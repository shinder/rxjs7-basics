import { from, fromEvent, range } from "rxjs";

let beers = [
    {name: "Stella", country: "Belgium", price: 9.50},
    {name: "Sam Adams", country: "USA", price: 8.50},
    {name: "Bud Light", country: "USA", price: 6.50},
    {name: "Brooklyn Lager", country: "USA", price: 8.00},
    {name: "Sapporo", country: "Japan", price: 7.50}
];

// from() 可以得到 Observable 物件
from(beers)
    .subscribe({
        next: console.log,
        error: console.error,
        complete: ()=>console.log('completed')
    })

/*
Main RxJS players 基本概念

1. Observable:  a producer of sequences of values
2. Observer:    a consumer of observable values
3. Subscriber:  connects observer with observable
4. Operator:    en-route value transformation
5. Subject:     includes both an observable and observer(s)

// 舊版的對應到新版的
from
create  : new Observable()
fromEvent
fromPromise : from()
range
 */