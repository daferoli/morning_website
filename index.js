var weather = require('./services/forecast_service');
var trains = require('./services/lightrail_service');
var traffic = require('./services/traffic_service');
var express = require('express');
var fs = require('fs');

var index = fs.readFileSync('./app/index.html');
var app = express();

app.get('/temps',function(req,res){
  weather.getTemp(function(temps){
    res.send(JSON.stringify(temps));
  });
});

app.get('/trains', function(req,res){
  trains.getTrainTimes(5,8,function(timesArray){
    res.send(timesArray);
  });
});

app.get('/traffic', function(req,res){
  traffic.getMap(function(result){
    res.end();
  });
});

app.use(express.static(__dirname + '/app'));

app.get('/', function(req,res){
  res.sendFile(req.path, {root: __dirname });
});

app.listen(8081, function(){
  console.log('server is up and running! port 8081');
});
