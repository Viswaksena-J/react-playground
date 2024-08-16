const client = require('./client');

async function init() { 
    // await client.set("user:4","ANONYMOUS")
    // await client.expire("user:4", 5); // the key will be deleted after 5 seconds
    const result = await client.get("user:3");
    console.log('Result -->',result);

    // Multiple set
    const bikes = await client.mset(
        ["bike:1", "Yamaha"],
        ["bike:2", "Honda"],
        ["bike:3", "Suzuki"],
        ["bike:4", "Kawasaki"]
    )
    console.log('Bikes -->',bikes);

    // Multiple get
    const bikeResult = await client.mget(["bike:1", "bike:2", "bike:3", "bike:4"]);
    console.log('Bike Result -->',bikeResult);

    // Increment
    const count = await client.set('count',0)
    const getCount = await client.incr('count')
    console.log('Count -->',getCount);
    // Increment by 5
    const newCount = await client.incrby('count', 5)
    console.log('Count -->',newCount);
}

init();