var myApp = angular.module('morning-site', []);

myApp.controller('MainController',function($scope,$http,$interval){
  function getData(){
    $http.get('http://localhost:8081/trains').success(function(data){
      console.log("Executed trains");
      $scope.trainTimes = data;
    });

    $http.get('http://localhost:8081/temps').success(function(data){
      console.log("Executed temperature");
      $scope.temperature = data;
    });

    var currTime = new Date();
    var currMin = currTime.getMinutes < 10 ? "0" + currTime.getMinutes() : currTime.getMinutes();
    var currHours = currTime.getHours() > 13 ? currTime.getHours() - 12 : currTime.getHours();
    $scope.updateTime = currHours + ":"  + currMin;
  }
  $scope.setup = function(){
    getData();
  }();
  $interval(getData,300000);

});
