var weather = require('./lib/forecast_service');

weather.getTemp(function(temps){
  console.log("Current: " + temps.currently +
    "\nLow: " + temps.low +
    "\nHigh: " + temps.high);
});
