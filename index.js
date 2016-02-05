var weather = require('./lib/forecast_service');
var trains = require('./lib/lightrail_service');

weather.getTemp(function(temps){
  console.log("Current: " + temps.currently +
    "\nLow: " + temps.low +
    "\nHigh: " + temps.high);
});

trains.getTrainTimes(3,8,function(timesArrray){console.log(timesArrray)});
