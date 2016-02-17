var fs = require('fs');
var request = require('request');

var traffic = {};
var strings = JSON.parse(fs.readFileSync('./strings.json', 'utf8'));

//This should return a map of Charlotte with traffic and save it to the data folder as a temperary file.
traffic.getMap = function(cb){
  var uri = "http://www.mapquestapi.com/staticmap/v4/getmap?key=" + strings.trafficKey+
   "&center=35.2637260585537,-80.83066397264406&zoom=10&size=400,400&type=map&imagetype=gif&traffic=4";
   request.head(uri,function(err, res, body){
    if(err){
      console.log(err);
      cb("I died");
      return;
    }

    request(uri).pipe(fs.createWriteStream('./app/data/charlotte.gif')).on('close', cb);
  });
};

module.exports = traffic;
