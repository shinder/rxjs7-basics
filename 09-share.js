import { Observable, interval, take, share } from "rxjs";

let numbers = interval(1000)
    .pipe(take(5))
    .pipe(share());

function subscribeToNumbers(name) {
    numbers
        .subscribe({
            next: x => console.log(`${name} got ${x}`)
        });
}

subscribeToNumbers('Subscriber 1');
setTimeout(() =>subscribeToNumbers('Subscriber 2'), 2500); // Second subscriber joins in 2.5 sec