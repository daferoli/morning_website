var csv = require('csv');
var fs = require('fs');

var lightrail = {};

var date;
var day;
var hours;
var minutes;

var outArray = [];

lightrail.getTrainTimes = function(next_times, stop_number, cb){
  date = new Date();
  day = date.getDay();
  hours = date.getHours();
  minutes = date.getMinutes();

  //setting up defaults
  next_times = next_times || 3;
  stop_number = stop_number || 8;



  if(day === 0){ //sunday table
    console.log("it's Sunday!");
    readTrainTimesFromCSV(next_times, stop_number, './data/charlotte_rail_in_sat.csv', function(nextTrains){
      cb(nextTrains);
    });
  }
  else if(day === 6){ //saturday table
    console.log("It's Saturday!");
    readTrainTimesFromCSV(next_times, stop_number, './data/charlotte_rail_in_sun.csv', function(nextTrains){
      cb(nextTrains);
    });
  }
  else{ //weekday
    console.log("It's a weekday");
    readTrainTimesFromCSV(next_times, stop_number, './data/charlotte_rail_in.csv', function(nextTrains){
      cb(nextTrains);
    });
  }
};

//allows a read from the csv file and returns the requested numver of subsequent
//train times.
//next_times is the number of subsequent stops at that particular station
//stop_number is the number of the stop that the times will be returned for.
//file_string is what file will be read from(weekday,saturday,sunday)
function readTrainTimesFromCSV(next_times, stop_number, file_string, cb){
  fs.readFile(file_string, function(err, file){
    if(err){
      console.log(err);
      cb(null);
      return;
    }
    csv.parse(file,null,function(err,train_times){
      if(err){
        console.log(err);
        cb(null);
        return;
      }
      var outArray = [];
      var go = true;
      var i = 0;
      var train_time;
      while(go)
      {
        train_time = train_times[i][stop_number];
        if(train_time == '-----') {
          i++;
          continue;
        }
        train_time = timeParser(train_time);
        if(hours < train_time.hours || (hours == train_time.hours && minutes < train_time.minutes))
        {
          go = false;
        }
        else{
          i++;
        }
      }
      for(var j = 0; j < next_times; j++)
      {
        outArray.push(train_times[i + j][stop_number]);
      }
      cb(outArray);
    });
  });
}

//parses out a time in format HH:mm(a/p) to a more usable object
//ex input: 10:15a for 10:15 am
//returns an onject that contains hours and minutes in 24 hour time.
function timeParser(time_string)
{
  time_string = time_string.split(':');
  var out_var = {};
  out_var.hours = time_string[0];
  if(time_string[1].indexOf('p') !== -1){
    out_var.minutes = time_string[1].split('p')[0];
    //transform to 24 hour time
    if(out_var.hours != 12)
    {
      out_var.hours = parseInt(out_var.hours) + 12;
    }
  }
  else{
    out_var.minutes = time_string[1].split('a')[0];
    //transform to 24 hour time
    if(out_var.hours === 12){
      out_var.hours = 0;
    }
  }
  return out_var;
}

module.exports = lightrail;
