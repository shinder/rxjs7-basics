import { from, map, filter } from "rxjs";

let beers = [
    {name: "Stella", country: "Belgium", price: 9.50},
    {name: "Sam Adams", country: "USA", price: 8.50},
    {name: "Bud Light", country: "USA", price: 6.50},
    {name: "Brooklyn Lager", country: "USA", price: 8.00},
    {name: "Sapporo", country: "Japan", price: 7.50}
];

from(beers)
    .pipe( filter(beer=>beer.price<8) )
    .pipe( map(beer => `${beer.name}: \$${beer.price}`) )
    .subscribe({
        next: console.log,
        error: console.error,
        complete: ()=>console.log('completed!')
    });
