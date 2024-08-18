// const client = require('./client')

// async function init(){
//     const res1 = await client.json.set("bike", "$", '"Hyperion"');
//     console.log(res1); // OK
    
// }

// init()

const client = require('./client');

async function init() { 
    const res1 = await client.json.set("bike", "$", '"Hyperion"');
    console.log(res1); // OK
}

init();