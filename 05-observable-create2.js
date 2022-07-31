import {Observable} from "rxjs";

function getData() {
    const beers = [
        {name: "Stella", country: "Belgium", price: 9.50},
        {name: "Sam Adams", country: "USA", price: 8.50},
        {name: "Bud Light", country: "USA", price: 6.50},
        {name: "Brooklyn Lager", country: "USA", price: 8.00},
        {name: "Sapporo", country: "Japan", price: 7.50}
    ];

    return new Observable( observer => {
        let i=0;
        const fn = ()=>{
            if(i<beers.length){
                observer.next(beers[i])
                setTimeout(fn, 1000);
                i++;
            } else {
                observer.complete();
            }
        }
        fn();
    });
}

getData()
    .subscribe({
        next: beer => console.log(`Subscriber got ${beer.name}`),
        error: console.error,
        complete: () => console.log('The stream is over')
    });
