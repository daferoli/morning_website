// Require the module
var Forecast = require('forecast');

var weather;

// Initialize
  var forecast = new Forecast({
    service: 'forecast.io',
    key: '3a5bda17ecb40bc67bb41b912d5cfa3b',
    units: 'F', // Only the first letter is parsed
    cache: true,      // Cache API requests?
    ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
      minutes: 15
      }
  });

var get_temp = function(){
  forecast.get([35.2269, -80.8433], function(err, weather) {
    if(err) return console.dir(err);
    console.dir(weather.daily.data);
  });
};

get_temp();
