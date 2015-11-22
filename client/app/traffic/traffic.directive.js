'use strict';

app.directive('traffic', ['TrafficFactory', function (TrafficFactory) {
  return {
    templateUrl: 'app/traffic/traffic.html',
    restrict: 'EA',
    link: function ($scope, element, attrs) {

      $scope.currentStation = false;

      TrafficFactory.stations({'station': 'Gullmarsplan', 'stationsOnly': true, 'maxResults': 5}).success(function(promise){
        $scope.stations = promise.ResponseData;
      });


      $scope.checkTimetable = function(station) {
        $scope.currentStation = station;
        TrafficFactory.timetableForStation(station.SiteId)
        .success(function(promise){
          $scope.currentStation.info = promise.ResponseData;
        });
      };

      $scope.clearStation = function() {
        $scope.currentStation = false;
      }
    }
  };
}]);
