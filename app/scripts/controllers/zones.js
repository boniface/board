'use strict';

/**
 * @ngdoc function
 * @name boardApp.controller:ZonesCtrl
 * @description
 * # ZonesCtrl
 * Controller of the boardApp
 */
angular.module('boardApp')
  .controller('ZonesCtrl', function ($scope, $http, baseURL) {
    $scope.submitButtonMode = 'Save Zone';


    $scope.listZones = function () {
      var url = baseURL + 'zones';
      $http.get(url).success(function (data) {
        $scope.zones = data;
      });
    };


    $scope.createZone = function (zone) {
//            var file = $scope.feed.file;
      var URL = baseURL + 'zone';
      $scope.zform = zone;
      $scope.zform.flag = 'none';
      $http.post(
        URL, zone)
        .success(function (newZone) {
          $scope.zones.push(newZone);
          $scope.zone = {};
          $scope.zoneForm.$setPristine();

        });
    };

    $scope.updateZone = function (zone) {
      var URL = baseURL + 'zone/';
      $http({
        url: URL + zone.code,
        method: 'PUT',
        data: zone
      }).success(function (updateZone) {
        for (var i = 0; i < $scope.zones.length; i++) {
          if ($scope.zones[i].code === updateZone.code) {
            $scope.zones[i] = updateZone;
            break;
          }
        }
        $scope.displayMode = 'list';
        $scope.zone = {};
        $scope.zoneForm.$setPristine();
      });

    };

    $scope.deleteZone = function (zone) {
      var URL = baseURL + 'zone/delete/';
      $http({
        method: 'DELETE',
        url: URL + zone.code
      }).success(function () {
        $scope.zones.splice($scope.zones.indexOf(zone), 1);
      });
    };

    $scope.editZone = function (zone) {
      $scope.zone =
        zone ? angular.copy(zone) : {};
      $scope.submitButtonMode = 'Edit Zone';

    };

    $scope.saveEditZone = function (zone) {
      if (angular.isDefined(zone.code)) {
        $scope.createZone(zone);
      } else {
        $scope.createZone(zone);
      }
      $scope.submitButtonMode = 'Save Zone';

    };

    $scope.cancelZone = function () {
      $scope.zone = {};
      $scope.zoneForm.$setPristine();
      $scope.submitButtonMode = 'Save Zone';
    };

    $scope.resetZone = function () {
      $scope.zone = {};
      $scope.zoneForm.$setPristine();
      $scope.submitButtonMode = 'Save Zone';

    };

    $scope.listZones();

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  });
