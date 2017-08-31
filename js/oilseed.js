const fs = require('fs');//import fs

//import readline and create interface
var lineReader = require('readline').createInterface({

    input: fs.createReadStream('../Production-Department_of_Agriculture_and_Cooperation_1.csv')
});
var out = [];
var result = [];

//select 0 and 24 columns 
lineReader.on('line', function(line) {
    var jasonData = {};

    var lineSplit = line.split(',');
    jasonData.Particulars = lineSplit[0];
    jasonData.production = lineSplit[24];

   //push into out variable
    out.push(jasonData);
});

lineReader.on('close', function(line) {

    //filter raws which includes string Agricultural Production Oilseeds 
    result = out.filter(function(data) {
        return data.Particulars.includes("Agricultural Production Oilseeds")
    });

    //sort production 
    result.sort((a, b) =>
        (b.production - a.production));
    console.log(result);

    //convert csv to json string
    var json = JSON.stringify(result, null, 2);
    fs.writeFileSync('../json/part_a.json', json);

});