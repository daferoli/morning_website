var weather = require('./lib/forecast_service');
var trains = require('./lib/lightrail_service');
var express = require('express');
var fs = require('fs');

var welcome = fs.readFileSync('welcome.html');
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

app.get('/', function(req,res){
  res.end(welcome);
});

app.listen(8081, function(){
  console.log('server is up and running! port 8081');
});
