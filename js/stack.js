var out = [],out1= [];

var fs = require('fs')
var readline = require('readline')
var lineReader = readline.createInterface({
    input: require('fs').createReadStream('../Production-Department_of_Agriculture_and_Cooperation_1.csv', 'UTF-8')
});
var writableFormat = require('fs').createWriteStream('../json/Part-3.json')
lineReader.on('line', function(line) {
    var jsondata
    var lineSplit = line.split(',')
    if(lineSplit[0].includes("Agricultural Production Foodgrains Rice Area")){
        jsondata={State:lineSplit[0],year2004:parseFloat(lineSplit[15]),year2005:parseFloat(lineSplit[16]),year2006:parseFloat(lineSplit[17]),year2007:parseFloat(lineSplit[18]),year2008:parseFloat(lineSplit[19]),year2009:parseFloat(lineSplit[20]),year2010:parseFloat(lineSplit[21]),year2011:parseFloat(lineSplit[22]),year2012:parseFloat(lineSplit[23]),year2013:parseFloat(lineSplit[24])}
     out.push(jsondata)
    }
   });
lineReader.on('close', function(line) {
    out1 = out.filter(function(data) {
        switch(data.State){
            case 'Agricultural Production Foodgrains Rice Area Andhra Pradesh': return data;
            break;
            case 'Agricultural Production Foodgrains Rice Area Kerala': return data;
            break;
            case 'Agricultural Production Foodgrains Rice Area Karnataka': return data;
            break;
            case 'Agricultural Production Foodgrains Rice Area Tamil Nadu': return data;
            break;
        }
    });
    console.log(out1)
    writableFormat.write(JSON.stringify(out1, null, 2))
});
