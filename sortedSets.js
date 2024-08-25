const client = require('./client');

// Function to serialize an object to a string
function serializeMember(member) {
    return JSON.stringify(member);
}

async function init(){
    // Adding a single member with a score
    const res1 = await client.zadd('member', 20, serializeMember({age: 20, name: 'John'}));
    console.log(`new item res1: ${res1}`);

    const res2 = await client.zadd('member', 11, serializeMember({age: 11, name: 'Mariam'}));
    console.log(`new item res2: ${res2}`);

    // Adding multiple members with their scores
    const res3 = await client.zadd('member', 
        30, serializeMember({age: 30, name: 'Jane'}), 
        40, serializeMember({age: 40, name: 'Doe'}), 
        50, serializeMember({age: 50, name: 'Sacy'})
    );
    console.log(`new items res3: ${res3}`);

    const res4 = await client.zrange('member', 0, -1);
    console.log(`all members res4: ${res4}`);

    // Get members with score less than 40
    const res5 = await client.zrangebyscore('member', '-inf', 40);
    console.log(`members with score less than 40 res5: ${res5}`);

    // Remove a member
    const res6 = await client.zrem('member', serializeMember({age: 11, name: 'Mariam'}));
    console.log(`removed item res6: ${res6}`);

    // Get the rank of a member
    const res7 = await client.zrank('member', serializeMember({age: 40, name: 'Doe'}));
    console.log(`rank of member res7: ${res7}`);

    // Get the reverse rank of a member
    const res8 = await client.zrevrank('member', serializeMember({age: 40, name: 'Doe'}));
    console.log(`reverse rank of member res8: ${res8}`);

    // get elements by lexicographical range
    const res9 = await client.zrangebylex('member', '-', '+');
    console.log(`all members res9: ${res9}`);
}

init();
