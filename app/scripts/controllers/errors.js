'use strict';

/**
 * @ngdoc function
 * @name boardApp.controller:ErrorsCtrl
 * @description
 * # ErrorsCtrl
 * Controller of the boardApp
 */
angular.module('boardApp')
  .controller('ErrorsCtrl', function ($scope, $http, baseURL,$location)  {

    $scope.listZones = function () {
      var url = baseURL + 'zones';
      $http.get(url).success(function (data) {
        $scope.zones = data;
      });
    };

    $scope.listZones();


    $scope.zoneRrrors = function (zone) {
      var url = baseURL + 'stats/errors/'+zone;
      $http.get(url).success(function (data) {
        $scope.errors = data;
      });
    };

    $scope.updatedErrors = function(code) {
      $scope.zone=code;
      $scope.zoneRrrors(code);
      $location.path('/hash/errors');
    };



    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


  });
