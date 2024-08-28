const client = require('./client');

async function init() {
    let res1 = await client.bitfield('bus:1:stats', 'SET', 'u32', 0, 1000);
    // let res1 = await client.bitfield("bus:1:stats", [{
    //     operation: 'SET',
    //     encoding: 'u32',
    //     offset: '#0',
    //     value: 1000
    //   }]);
    console.log(res1);

    let res2 = await client.bitfield('bus:1:stats', 'INCRBY','u32','#0', 100);
    console.log(res2);

    let res3 = await client.bitfield('bus:1:stats', 'INCRBY', 'u32', '#0', -500);
    console.log(res3);

    let res4 = await client.bitfield('bus:1:stats', 'GET', 'u32', '#0');
    console.log(res4);
}

init();



// O(n) time complexity