'use strict';

app.directive('traffic', ['TrafficFactory', function (TrafficFactory) {
  return {
    templateUrl: 'app/traffic/traffic.html',
    restrict: 'EA',
    link: function ($scope, element, attrs) {
      $scope.currentStation = {};
      $scope.currentStation.Name = 'Gullmarsplan';



      $scope.searchForStation = function() {
        TrafficFactory.stations({'station': $scope.currentStation.Name, 'stationsOnly': true, 'maxResults': 5}).success(function(promise){
          $scope.stations = promise.ResponseData;
          $scope.checkTimetable($scope.stations[0]);

        });
      };

      $scope.checkTimetable = function(station) {
        if(station === undefined) {
          return;
        }

        $scope.currentStation = station;
        TrafficFactory.timetableForStation(station.SiteId)
        .success(function(promise){
          $scope.currentStation.info = promise.ResponseData;
        });
      };

      $scope.clearStation = function() {
        $scope.currentStation = false;
      }

      $scope.searchForStation();
    }
  };
}]);
