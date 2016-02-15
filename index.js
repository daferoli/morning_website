var weather = require('./lib/forecast_service');
var trains = require('./lib/lightrail_service');
var express = require('express');
var fs = require('fs');

var index = fs.readFileSync('index.html');
var app = express();

app.get('/temps',function(req,res){
  weather.getTemp(function(temps){
    res.send(JSON.stringify(temps));
  });
});

app.get('/trains', function(req,res){
  trains.getTrainTimes(3,8,function(timesArray){
    res.send(timesArray.toString());
  });
});

app.use(express.static(__dirname + '/app'));

app.get('/', function(req,res){
  res.sendFile(req.path, {root: __dirname });
});

app.listen(8081, function(){
  console.log('server is up and running! port 8081');
});
