
const {createClient} = require('redis');

async function init() {
    
    const client = createClient();
    await client.connect();
    
    
    const res1 = await client.cf.reserve('bikes:type', 1000000);
    console.log(res1);  // >>> OK
    
    const res2 = await client.cf.add('bikes:type', 'Smoky Mountain Striker');
    console.log(res2);  // >>> 1
    
    const res3 = await client.cf.exists('bikes:type', 'Smoky Mountain Striker');
    console.log(res3);  // >>> 1
    
    const res4 = await client.cf.exists('bikes:type', 'Terrible Bike Name');
    console.log(res4);  // >>> 0
    
    const res5 = await client.cf.del('bikes:type', 'Smoky Mountain Striker');
    console.log(res5);  // >>> 1
}

init()