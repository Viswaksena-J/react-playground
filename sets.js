const client = require('./client');

async function init() {
    const res1 = await client.sadd('cars:racing:india', 'Ferrari:1');
    console.log(`new item ${res1}`);

    // returns 0 if the item already exists
    const res2 = await client.sadd('cars:racing:india', 'Ferrari:1');
    console.log(`existed item ${res2}`);

    const res3 = await client.sadd('cars:racing:india', ['BMW:2', 'Audi:3', 'Mercedes:4', 'Bugatti:5']);
    console.log(`multiple items ${res3}`);

    const res4 = await client.sadd('cars:racing:usa',['Ferrari:1', 'BMW:2', 'Audi:3', 'Mercedes:4']);
    console.log(`res4 ${res4}`)

    //To check whether the item exists in the set
    const res5 = await client.sismember('cars:racing:india', 'Ferrari:1');
    console.log(`is member ${res5}`);

    const res6 = await client.sismember('cars:racing:india', 'Ferrari:2');
    console.log(`is member ${res6}`);

    // Intersection
    const res7 = await client.sinter('cars:racing:india', 'cars:racing:usa');
    console.log(`intersection ${res7}`);

    // Union
    const res8 = await client.sunion('cars:racing:india', 'cars:racing:usa');
    console.log(`union ${res8}`);

    // Difference
    const res9 = await client.sdiff('cars:racing:india', 'cars:racing:usa');
    console.log(`difference ${res9}`);

    // size of the set
    const res10 = await client.scard('cars:racing:india');
    console.log(`size of the set ${res10}`);

    // Deletion of entire set
    const res11 = await client.del('cars:racing:usa')
    console.log(`deleted set ${res11}`);

    const res12 = await client.sadd('cars:racing:usa',['Ferrari:1', 'BMW:2', 'Audi:3', 'Mercedes:4']);
    console.log(`res4 ${res12}`)

    // Deletion of one element
    const res13 = await client.srem('cars:racing:usa','Ferrari:1');
    console.log(`deleted item ${res13}`);

    // Pop element in the set
    const res14 = await client.spop('cars:racing:usa');
    console.log(`popped item ${res14}`);
}

init()