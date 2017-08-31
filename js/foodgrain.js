const fs = require('fs');//import fs

//import readline and create interface
var lineReader = require('readline').createInterface({
    input: fs.createReadStream('../Production-Department_of_Agriculture_and_Cooperation_1.csv')
});
var out = [];
var result = [];

//select column 0 for crop types and 24 for production of 2013  
lineReader.on('line', function(line) {
    var jasonData = {};
    var lineSplit = line.split(',');
    jasonData.Particulars = lineSplit[0];
    jasonData.production = lineSplit[24];
    out.push(jasonData);//push data into out variable
});

lineReader.on('close', function(line) {

    //filter column 0 and select particular raws
    result = out.filter(function(data) {
        if (data.Particulars.includes("Agricultural Production Foodgrains")) {
            if (!data.Particulars.includes("Rice") && !data.Particulars.includes("Wheat") &&
                !data.Particulars.includes("Area") && !data.Particulars.includes("Volume") &&
                !data.Particulars.includes("Yield") && !data.Particulars.includes("Coarse Cereals")) {
                return data.Particulars
            }
        }
    });

    //sort production in descending order
    result.sort((a, b) =>
        (b.production - a.production));

    //convert csv to json string
    var json = JSON.stringify(result, null, 2);
    fs.writeFileSync('../json/part_b.json', json);
});
