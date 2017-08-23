var a = [];
var b = [];
var fs = require('fs')
var readline = require('readline')
var lineReader = readline.createInterface({
    input: require('fs').createReadStream('../Production-Department_of_Agriculture_and_Cooperation_1.csv', 'UTF-8')
});
var writableFormat = require('fs').createWriteStream('../json/Part-2.json')
lineReader.on('line', function(line) {
    var jsonFromLine
    var lineSplit = line.split(',')
    if(lineSplit[0].includes("Agricultural Production Commercial Crops"))
    {
    for(var x=4;x<26;x++)
    {
        if(lineSplit[x]=="NA")
            lineSplit[x]=0
        jsonFromLine = {
            value: lineSplit[x],Year:parseInt(1989+x)
        }
      a.push(jsonFromLine)
          }
}
    });
var i=0
var ss=[]
var y = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var ay=  lineReader.on('close', function(line) {
        var t=0
        for(var e=0;e<22;e++)
        {
        for (i=0;i<a.length;i+=22)
        {
            y[t]+=parseFloat(a[e].value)
        }
        var obj={Year:parseInt(1993+e),value:y[t]}
        b.push(obj)
        t++
        }
        writableFormat.write(JSON.stringify(b, null, 2))
   });
