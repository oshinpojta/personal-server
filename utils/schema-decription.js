const { capitalise } = require("./capitalise");

exports.printSchemaDescription = (obj) => {
    let mongoObjArray = Object.entries(obj);
    // console.log( mongoObjArray );

    let entries = Object.entries(mongoObjArray[2][1]);
    // console.log("Entries : ", entries)


    console.log("Schema : {")
    entries.forEach(item => {
        if(item[0] != "_id"){
            console.log(`${item[0]} : ${capitalise(typeof item[1])},`)
        }
    });
    console.log("}")

}