function getCustomers() {
    return new Promise((resolve, reject) => {
        console.log("Getting customers");
        // Emulate an async server call here
        setTimeout(function () {
            let success = true;
            if (success) {
                resolve("John Smith"); // got the customer
            } else {
                reject("Can't get customers");
            }
        }, 1000);
    });
}

function getOrders(customer) {
    return new Promise((resolve, reject) => {
        // Emulate an async server call here
        setTimeout(function () {
            let success = true;
            if (success) {
                resolve(`Found the order 123 for ${customer}`); // got the order
            } else {
                reject("Can't get orders");
            }
        }, 1000);
    });
}

getCustomers()
    .then(cust => {
        console.log(cust);
        return getOrders(cust);
    })
    .then(order => console.log(order))
    .catch(err => console.error(err));

console.log("Chained getCustomers and getOrders. Waiting for results");  