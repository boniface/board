'use strict';

/**
 * @ngdoc function
 * @name boardApp.controller:ErrorsCtrl
 * @description
 * # ErrorsCtrl
 * Controller of the boardApp
 */
angular.module('boardApp')
  .controller('ErrorsCtrl', function ($scope, $http, baseURL)  {

    $scope.listZones = function () {
      var url = baseURL + 'zones';
      $http.get(url).success(function (data) {
        $scope.zones = data;
      });
    };


    $scope.zoneRrrors = function (zone) {
      var url = baseURL + 'stats/errors/'+zone;
      $http.get(url).success(function (data) {
        $scope.errors = data;
      });
    };

    $scope.zoneRrrors('ZM');

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


  });
