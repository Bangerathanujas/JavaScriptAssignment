var fs=require('fs');
const readline=require('readline');
//creating json flie1
 var res1=fs.createWriteStream('result1.json');
 res1.readable=true;
 res1.writable=true;
//creating json flie2
 var res2=fs.createWriteStream('result2.json');
 res2.readable=true;
 res2.writable=true;

 //creating json flie3
  var res3=fs.createWriteStream('result3.json');
  res3.readable=true;
  res3.writable=true;

//crating a interface to read each line
const readl=readline.createInterface({
  input:fs.createReadStream('Indicators.csv')
});
//All global variables
var a1=[];
var a2=[];
var headers=[];
var urbanPlusRural=[];
var sum=0;
var india={};
var asia={};
var sumurban=0;
var sumrural=0;
var a3=[];
var countries = ["Afghanistan", "Bahrain", "Bangladesh", "Bhutan", "Myanmar", "Cambodia", "China", "India", "Indonesia", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Lebanon", "Malaysia", "Maldives", "Mongolia", "Nepal",
  "Oman", "Pakistan", "Philippines", "Qatar", "Saudi Arabia", "Singapore", "Sri Lanka", "Syrian Arab Republic", "Tajikistan", "Thailand", "Timor-Leste", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"];
var i=0;//for collect only headers from given data

readl.on('line',function(line){//reading  each line
/* collecting headers*/

if(i===0){
var headers=line.split(",");
// var cnindex=lines.indexOf(lines[0]);
// var ccindex=lines.indexOf(lines[1]);
// var inindex=lines.indexOf(lines[2]);
// var icindex=lines.indexOf(lines[3]);
// var yindex=lines.indexOf(lines[4]);
// var vindex=lines.indexOf(lines[5]);
//
// var cnvalue=lines[0];
// var ccvalue=lines[1];
// var invalue=lines[2];
// var icvalue=lines[3];
// var yvalue=lines[4];
// var vvalue=lines[5];
//
// console.log(lines[cnindex]);
// console.log(lines[1]);
// console.log(lines[2]);
// console.log(lines[3]);
// console.log(lines[4]);
// console.log(lines[5]);

i++;
}
/*collecting other data */

else{

var lines=line.split(",");//spliting the line

if((lines[0]=="India") && (lines[4]>=1960 && lines[4]<=2015) && (lines[2]=="Urban population (% of total)" || lines[2]=="Rural population (% of total population)"))
{
  a1.push({IndicatorName:lines[2],Year:lines[4],Value:lines[5]});
}//end of required condition for extracting India's information

for (var i = 0; i < countries.length; i++) {
if((lines[0]==countries[i]) && (lines[4]>=1960 && lines[4]<=2015) && (lines[2]=="Urban population" || lines[2]=="Rural population"))
{
  a2.push({CountryName:lines[0],IndicatorName:lines[2],Year:lines[4],Value:lines[5]});
}
}//end of extracting Asia's information
}//end of main else
});//end of readl.on('line',----)

readl.on('close',()=>{
  /* for each year and for countries in Asia   getting sum of urban population and  rural population */
  for (var y = 1960; y <= 2015; y++) {
    for (var c = 0; c <countries.length; c++) {
      for (var i = 0; i < a2.length-1; i++) {
        if(a2[i].CountryName == countries[c]){
            if(a2[i].Year == y){
              //console.log(a2[i].Value);
        sum=sum+(parseFloat(a2[i].Value))+(parseFloat(a2[i+1].Value));
        sumurban=sumurban+parseFloat(a2[i].Value);
        sumrural=sumrural+parseFloat(a2[i+1].Value);
        console.log(sumurban);
        urbanPlusRural.push({CountryName:a2[i].CountryName,Value:sum});
        urbanPlusRural.sort(function(a,b){
   return b.Value-a.Value;
});
      asia[a2[i].Year]=urbanPlusRural;
        sum=0;
      }
    }
    i++;
  }

  }
  urbanPlusRural=[];
  a3.push({"year":y,"urban":sumurban,"rural":sumrural});

  sumurban=0;
  sumrural=0;
}
/* putting the india and asia json objects into  a json file*/




res1.write(JSON.stringify(a1));
res2.write(JSON.stringify(asia[1960]));
res3.write(JSON.stringify(a3));

});
