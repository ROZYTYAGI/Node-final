const fs = require('fs');

var lineReader = require('readline').createInterface({

    input: fs.createReadStream('../Production-Department_of_Agriculture_and_Cooperation_1.csv')
});
var out = [];
var result = [];
lineReader.on('line', function(line) {
    var jasonData = {};

    var lineSplit = line.split(',');
    jasonData.Particulars = lineSplit[0];
    jasonData.production = lineSplit[24];

    out.push(jasonData);
});

lineReader.on('close', function(line) {
    result = out.filter(function(data) {
        if(data.Particulars.includes("Agricultural Production Foodgrains")){
            if(!data.Particulars.includes("Rice")&& !data.Particulars.includes("Wheat")&& 
                !data.Particulars.includes("Area")&& !data.Particulars.includes("Volume")&& 
                !data.Particulars.includes("Yield")&& !data.Particulars.includes("Coarse Cereals")){
                return data.Particulars
            }
        }
    });
    result.sort((a, b) =>
        (b.production - a.production));
    console.log(result);
});
lineReader.on('close', function() {

    var json = JSON.stringify(result, null, 2);
    fs.writeFileSync('../json/part_b.json', json);

});
