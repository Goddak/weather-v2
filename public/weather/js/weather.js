// Directive for a day report
  // Element: report
  // Needs to take the day & weather
// Factory to get the weather report
  // Needs to take the location to search
  // retrun a promise
  // Will use $http for the request

angular.module('weatherApp', [])
  .directive('report', function(){
    return {
      restrict: "E",
      scope: {weather: '='},
      controller: ['searchWeather', function(searchWeather){
        this.getDay = searchWeather.getDay;
        this.getTemperature = searchWeather.getTemperature;
      }],
      controllerAs: "weatherDirective",
      template: "<h3>{{::weatherDirective.getDay(weather.dt)}}</h3><p>Temperature: {{weatherDirective.getTemperature(weather.main.temp)}}oC</p><p>Weather: {{weather.weather[0].description}}</p>",

      link: function(scope, element){

      }
    }
  })
  .factory('searchWeather', ['$http', function($http){
    var requestWeather = function(location){
      return $http({
        method: 'GET',
        url: '//api.openweathermap.org/data/2.5/forecast?q='+ location +'&APPID=d7a5647d43b5ad5674d970ea251dd80a'
      });
    }

    var getDay = function(timeStamp){
      var days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      var date = new Date(timeStamp*1000);
      var day = date.getDay();

      return days[day];
    }

    var getTemperature = function(kelvin){
     return Math.round(kelvin - 273.15);
    }

    return {
      request: requestWeather,
      getDay: getDay,
      getTemperature: getTemperature,
    }
  }])
  .controller("weatherCtrl", ['searchWeather', function(searchWeather){
    var self = this;

    self.searchLocation = "";

    self.request = function(){
      searchWeather.request(self.searchLocation).then(function(data){
        console.log('weather forecast requested');
        self.weatherReport = data;
      }, function(){
        console.log('weather forecast request failed');
      })
    }

  }]);
