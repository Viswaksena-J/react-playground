const client = require('./client');

async function init() {
    const res1 = await client.pfadd('hyperloglog:1', 'foo', 'bar', 'baz');
    console.log(`new item res1: ${res1}`);
}