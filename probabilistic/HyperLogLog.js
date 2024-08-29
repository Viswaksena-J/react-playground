const client = require('../client');

async function init() {
    const res1 = await client.pfadd('hyperloglog',[ 'foo', 'bar', 'baz']);
    console.log(`new item res1: ${res1}`);

    const res2 = await client.pfcount('hyperloglog');
    console.log(`count res2: ${res2}`);

    const res3 = await client.pfadd('duplicateHyperLogLog', ['zoom', 'zoomIn', 'zoomOut']);
    console.log(`new item res3: ${res3}`);

    const res4 = await client.pfmerge('allHyperLogLog', ['hyperloglog', 'duplicateHyperLogLog']);
    console.log(`merged res4: ${res4}`);

    const res5 = await client.pfcount('allHyperLogLog');
    console.log(`count res5: ${res5}`);
}

init();