const client = require('./client');

async function init() {
    const res1 = await client.setbit('ping:2024:01:01', 123, 1);
    console.log(`new item res1: ${res1}`);

    const res2 = await client.setbit('ping:2024:01:01', 456, 1);
    console.log(`new item res2: ${res2}`);

    const res3 = await client.setbit('ping:2024:01:01', 789, 1);
    console.log(`new item res3: ${res3}`);

    const res4 = await client.bitcount('ping:2024:01:01');
    console.log(`bit count res4: ${res4}`);

    const res5 = await client.getbit('ping:2024:01:01', 123);
    console.log(`get bit res5: ${res5}`);
}

init();