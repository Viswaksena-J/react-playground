const client = require('./client');

async function init() {
    const res1 = await client.hset('laptop:1',{
        'brand': 'Dell',
        'model': 'Inspiron',
        'price': '50000'
    })
    console.log(`new item ${res1}`);

    const res2 = await client.hset('laptop:2',{
        'brand': 'Macbook',
        'model': 'Pro',
        'price': '100000'
    })
    console.log(`new item ${res2}`);

    const res3 = await client.hget('laptop:1','brand');
    console.log(`brand ${res3}`);

    const res4 = await client.hget('laptop:1','model');
    console.log(`model ${res4}`);

    const res5 = await client.hgetall('laptop:1');
    console.log(`all ${res5}`);

    // similar to hget but it returns in array format
    const res6 = await client.hmget('laptop:1',['model','price'])
    console.log(`Response6 ${res6}`)

    const res7 = await client.hincrby('laptop:1', 'price', 500)
    console.log(`Incremented price ${res7}`)

    // field expiration examples
    event = {
        'air-quality': 256,
        'battery': 89
    }
    client.hset('sensor:sensor:1', mapping=event)

    // client.hexpire('sensor:sensor:1',10,'air-quality','battery')
    // ttl = client.httl('sensor:sensor:1','air-quality','battery')

    await client.set('sensor:sensor:1:air-quality:expire', '', 'EX', 10);
    await client.set('sensor:sensor:1:battery:expire', '', 'EX', 10);

    // Periodically check if fields have expired
    setTimeout(async ()=> {
        const airQualityExpire = await client.get('sensor:sensor:1:air-quality:expire');
        if (airQualityExpire === null){
            await client.hdel('sensor:sensor:1','air-quality');
            console.log('air-quality field expired and deleted');
        }

        const batteryExpire = await client.get('sensor:sensor:1:battery:expire');
        if (batteryExpire === null){
            await client.hdel('sensor:sensor:1','battery');
            console.log('battery field expired and deleted');
        }
    },11000) // expire after 11 seconds
}

init();