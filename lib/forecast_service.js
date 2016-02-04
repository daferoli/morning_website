// Require the module
var Forecast = require('forecast');

var forecast;
var weather;

// Initialize
var forecast_service = function(){
  forecast = new Forecast({
    service: 'forecast.io',
    key: '3a5bda17ecb40bc67bb41b912d5cfa3b',
    units: 'F', // Only the first letter is parsed
    cache: true,      // Cache API requests?
    ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
      minutes: 15
      }
  });
}();

forecast.getTemp = function(cb){
  forecast.get([35.2269, -80.8433], function(err, weather) {
    if(err) return console.dir(err);
    var out = {
      currently: weather.currently.temperature,
      low:weather.daily.data[0].temperatureMin,
      high:weather.daily.data[0].temperatureMax
    };
    /*console.log("Current: " + weather.currently.temperature);
    console.log("Low: " + weather.daily.data[0].temperatureMin);
    console.log("High: " + weather.daily.data[0].temperatureMax);*/
    //console.log("hi" + out);
    cb(out);
  });
};

module.exports = forecast;
