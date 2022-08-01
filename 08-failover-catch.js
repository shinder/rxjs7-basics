import { Observable, map, catchError } from "rxjs";

function getData(){
    const beers = [
        {name: "Stella", country: "Belgium", price: 9.50},
        {name: "Sam Adams", country: "USA", price: 8.50},
        {name: "Bud Light", country: "USA", price: 6.50},
        {name: "Brooklyn Lager", country: "USA", price: 8.00},
        {name: "Sapporo", country: "Japan", price: 7.50}
    ];

    return new Observable( observer => {
        let counter = 0;
        beers.forEach( beer => {
                observer.next(beer);
                counter++;
                if (counter > Math.random()*5) {    // Randomly generate an error
                    observer.error(
                        {
                            status: 500,
                            description: "Beer stream error"
                        }
                    );
                } else{
                    emulateDelayInSeconds(1);
                }
            }
        );
        observer.complete();
    });
}

// Subscribing to data from the primary source
getData()
    .pipe( catchError(error=>{
        if(error.status === 500){
            console.error(">>> Switching to retrieving cached data");
            return getCachedData();
        } else{
            console.error(">>>>> Switching to another data source");
            return getDataFromAnotherService();
        }
    }))
    .pipe( map(beer=>`${beer.name}, ${beer.country}`))

    .subscribe({
        next: beer=>console.log(`Subscriber got ${beer}`),
        error: console.error,
        complete: ()=>console.log('The stream is over')
    });

function getCachedData(){
    const beers = [
        {name: "Leffe Blonde", country: "Belgium", price: 9.50},
        {name: "Miller Lite", country: "USA", price: 8.50},
        {name: "Corona", country: "Mexico", price: 8.00},
        {name: "Asahi", country: "Japan", price: 7.50}
    ];
    return new Observable( observer => {
        beers.forEach( beer => {
                observer.next(beer);
                emulateDelayInSeconds(1);
            }
        );
        observer.complete();
    });
}

function getDataFromAnotherService(){
    const beers = [
        {name: "Peroni", country: "Italy", price: 9.50},
        {name: "Heineken", country: "Holland", price: 8.50},
        {name: "Beck", country: "Germany", price: 8.00},
        {name: "Kingfisher", country: "India", price: 7.50}
    ];
    return new Observable( observer => {
        beers.forEach( beer => {
                observer.next(beer);
                emulateDelayInSeconds(1);
            }
        );
        observer.complete();
    });
}

function emulateDelayInSeconds(seconds) {
    let e = new Date().getTime() + (seconds * 1000);
    while (new Date().getTime() <= e) {} // just to keep the CPU busy
}