var weatherV2 = angular.module('weatherV2', [])
.factory('Weather', ['$http', function($http){

  // Request the current weather
  var requestCurrentWeather = function(location){
    return $http({
      method: 'GET',
      url: '//api.openweathermap.org/data/2.5/weather?q='+ location +'&APPID=d7a5647d43b5ad5674d970ea251dd80a'
    });
  }

  var requestWeeksWeather = function(location){
    return $http({
      method: 'GET',
      url: '//api.openweathermap.org/data/2.5/forecast?q='+ location +'&APPID=d7a5647d43b5ad5674d970ea251dd80a'
    });
  }
  return{
    current: requestCurrentWeather,
    forecast: requestWeeksWeather
  }
}])
.controller('weatherCtrl', ['Weather', function(Weather){
  var weatherData = this;

  weatherData.current = function(){
    Weather.current(weatherData.location).then(function(data){
      console.log('current weather requested');
      weatherData.now = data;
    }, function(){
      console.log('failure');
    })
  }

  weatherData.forecast = function(){
    Weather.forecast(weatherData.location).then(function(data){
      console.log('weather forecast requested');
      weatherData.forecast = data;
    }, function(){
      console.log('failure');
    })
  }

}]);
