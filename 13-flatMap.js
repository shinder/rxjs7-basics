/*
    flatMap 運算器，就是 mergeMap
    flapMap 未來會移除，只保留 mergeMap 這個名稱

    此例子為巢狀的 Observable，經過 mergeMap 運算器之後，鋪平
    另一個和時間相關的例子為 14-flatMap-vs-switchMap.js
 */


import {from, mergeMap, Observable} from "rxjs";

function getDrinks() {
    let beers = from([
        {name: "Stella", country: "Belgium", price: 9.50},
        {name: "Sam Adams", country: "USA", price: 8.50},
        {name: "Bud Light", country: "USA", price: 6.50}
    ]);

    let softDrinks = from([
        {name: "Coca Cola", country: "USA", price: 1.50},
        {name: "Fanta", country: "USA", price: 1.50},
        {name: "Lemonade", country: "France", price: 2.50}
    ]);

    return new Observable( observer => {
            observer.next(beers);        // pushing the beer pallet (observable)
            observer.next(softDrinks);   // pushing the soft drinks pallet (observable)
            observer.complete();
        }
    );
}

getDrinks()
    .pipe(
        mergeMap(drinks => drinks)
    )
    .subscribe({
        next: drink => console.log("Subscriber got " + drink.name + ": " + drink.price ),
        error: console.error,
        complete: ()=> console.log('The stream of observables is over')
    });

/*
// AN alternative (bad) solution with nested subscribtions
getDrinks()
    .subscribe({
        next: obs => {
            obs.subscribe({
                next: drink => console.log("Subscriber got " + drink.name + ": " + drink.price )
            })
        },
        complete: ()=>console.log('The stream of observables is over')
    })
*/


