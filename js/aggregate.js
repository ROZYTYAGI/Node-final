var out = [],
    result = [];
var fs = require('fs')
var readline = require('readline')
var lineReader = readline.createInterface({
    input: require('fs').createReadStream('../Production-Department_of_Agriculture_and_Cooperation_1.csv', 'UTF-8')
});
lineReader.on('line', function(line) {
    var jsonFromLine
    var lineSplit = line.split(',')
    if (lineSplit[0].includes("Agricultural Production Commercial Crops")) {
        for (var x = 4; x < 26; x++) {
            if (lineSplit[x] == "NA")
                lineSplit[x] = 0
            jsonFromLine = {
                value: lineSplit[x],
                Year: parseInt(1989 + x)
            }
            out.push(jsonFromLine)
        }
    }
});
var arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var arr2 = lineReader.on('close', function(line) {
    var t = 0
    for (var j = 0; j < 22; j++) {
        for (var i = 0; i < out.length; i += 22) {
            arr[t] += parseFloat(out[j].value)
        }
        var obj = { Year: parseInt(1993 + j), value: arr[t] }
        result.push(obj)
        t++
    }
    writableFormat.write(JSON.stringify(result, null, 2))
    var writableFormat = require('fs').createWriteStream('../json/Part-2.json')

});