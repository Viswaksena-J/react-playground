const client = require('./client');

async function init() {
    // Adding geospatial data
    const res1 = await client.geoadd(
        'yulu:bike', 
        77.5946, 
        12.9716, 
        'Bike1'
    );
    console.log(`new item res1: ${res1}`);

    const res2 = await client.geoadd(
        'yulu:bike', 
        77.6095, 
        12.9203, 
        'Bike2'
    );
    console.log(`new item res2: ${res2}`);

    const res3 = await client.geoadd(
        'yulu:bike', 
        77.6223, 
        12.9128, 
        'Bike3'
    );
    console.log(`new item res3: ${res3}`);

    // Searching for bikes within a 5 km radius from a specific point
    const nearbyBikes = await client.geosearch(
        'yulu:bike',
        'FROMLONLAT', 77.5946, 12.9716,  // Starting point (longitude, latitude)
        'BYRADIUS', 100, 'km',  // Radius and unit
        'ASC'  // Optional: sort results by distance
    );
    console.log('Nearby Bikes:', nearbyBikes);
}

init();
