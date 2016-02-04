var csv = require('csv');
var fs = require('fs');

var lightrail = {};

lightrail.getTrainTimes = function(n, cb){
  var date = new Date();
  var day = date.getDay();
  var time = (date.getTime()/1000/60)%(24*60);
  console.log(time);
  var outArray = [];

  if(day === 0){ //sunday table
    console.log("it's Sunday!");
  }
  else if(day === 6){ //saturday table
    console.log("It's Saturday!");
  }
  else{ //weekday
    console.log("It's a weekday");
    /*csv.parse(fs.readFile('../data/charlotte_rail_in.csv'),null,function(train_listings){
      console.log(train_listings);
    });*/
  }
  cb(outArray);
};

module.exports = lightrail;
