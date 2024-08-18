const client = require('./client');

async function init() {
    // Function to add element only if it doesn't exist
    async function addIfNotExists(key, value) {
        const exists = await client.lpos(key, value);
        if (exists === null) {
            const res = await client.rpush(key, value);
            console.log(`${value} added to ${key}: ${res}`);
        } else {
            console.log(`${value} already exists in ${key}`);
        }
    }

    // Adding multiple elements
    async function addMultipleIfNotExists(key, values) {
        for (const value of values) {
            await addIfNotExists(key, value);
        }
    }

    await addIfNotExists('snacks:chips', 'Doritos:1');
    await addIfNotExists('snacks:chips', 'Lays:2');

    // Right pop
    const res1 = await client.rpop('snacks:chips');
    console.log(res1);

    // Stack first in last out
    await addIfNotExists('msg:client', 'hello:1');
    await addIfNotExists('msg:client', 'success');

    // Left pop
    const res2 = await client.lpop('msg:client');
    console.log(res2);

    // Length of the list
    const res3 = await client.llen('msg:client');
    console.log(res3);

    await addIfNotExists('snacks:chips', 'Bingo:3');
    await addIfNotExists('snacks:chips', 'Snickers:4');

    // Pop an element from one list and push to another
    const res4 = await client.lmove('snacks:chips', 'snacks:drinks', 'LEFT', 'LEFT');
    console.log(res4);

    // Get elements in a list with the range
    const res5 = await client.lrange('snacks:chips', 0, -1);
    console.log(res5);

    const res6 = await client.lrange('snacks:drinks', 0, -1);
    console.log(res6);

    // Add multiple elements and trim the list
    await addMultipleIfNotExists('snacks:chips', ['Cheetos:5', 'Pringles:6', 'Ruffles:7', 'Tostitos:8', 'Takis:9', 'Fritos:10']);

    const res7 = await client.ltrim('snacks:chips', 0, 4);
    console.log(`trimmed result: ${res7}`);

    const res8 = await client.lrange('snacks:chips', 0, -1);
    console.log(`trimmed list: ${res8}`);
}

init();
