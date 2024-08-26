const client = require('./client');

async function init() {
    function flattenObject(obj){
        return Object.entries(obj).flat()
    }

    async function isDuplicate(key, field, value){
        const entries = await client.xrange(key,'-','+')
        for(const entry of entries){
            const [,fields] = entry;
            for(let i = 0; i<fields.length; i+=2){
                if(fields[i] === field && fields[i+1] === value){
                    return true
                }
            }
        }
        return false
    }

    async function addIfNotDuplicate(key,obj) {
        const isDup = await isDuplicate(key,'name',obj.name)
        if(!isDup){
            const res = await client.xadd(key,'*',...flattenObject(obj))
            console.log(`Added new item: ${res}`)
        }
        else{
            console.log(`Duplicate entry for name: ${obj.name}, not added.`)
        }
    }

    await addIfNotDuplicate('coding:java',{
            'name': 'John',
            'age': 25,
            'experience': '2 years',
            'salary': '50000'
        }
    )

    await addIfNotDuplicate(
        'coding:java',{
            'name': 'Jane',
            'age': 30,
            'experience': '5 years',
            'salary': '80000'
        }
    )

    await addIfNotDuplicate(
        'coding:java',{
            'name': 'Doe',
            'age': 35,
            'experience': '10 years',
            'salary': '120000'
        }
    )

    // Get all items
    const res2 = await client.xrange('coding:java','1724675670490-0','+','COUNT',2)
    console.log(`First item: ${res2}`)
    
    // Read up to 100 new stream entries, starting at the end of the stream, and block for up to 300 ms if no entries are being written
    const res3 = await client.xread(
        'COUNT', 100,
        'BLOCK', 300,
        'STREAMS', 'coding:java', '0-0'
    )
    
    if (res3 && res3.length > 0) {
        res3.forEach(([stream, entries]) => {
            console.log(`\nStream: ${stream}`);
            entries.forEach(([id, fields]) => {
                console.log(`  ID: ${id}`);
                for (let i = 0; i < fields.length; i += 2) {
                    console.log(`    ${fields[i]}: ${fields[i + 1]}`);
                }
            });
        });
    } else {
        console.log('No entries found');
    }

    // Get the length of the stream
    const res4 = await client.xlen('coding:java')
    console.log(`Stream length: ${res4}`)
    
}

init();