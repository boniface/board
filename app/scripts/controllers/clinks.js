'use strict';

/**
 * @ngdoc function
 * @name boardApp.controller:ClinksCtrl
 * @description
 * # ClinksCtrl
 * Controller of the boardApp
 */
angular.module('boardApp')
  .controller('ClinksCtrl', function ($scope, $http, baseURL, $location)  {


    $scope.listZones = function () {
      var url = baseURL + 'zones';
      $http.get(url).success(function (data) {
        $scope.zones = data;
      });
    };
    $scope.listZones();

    $scope.customLinks = function (zone) {
      var url = baseURL + 'stats/clinks/'+zone;
      $http.get(url).success(function (data) {
        $scope.clinks = data;
      });
    };

    $scope.listZones();

    $scope.updatedClinks = function(code) {
      $scope.zone=code;
      $scope.customLinks(code);
      $location.path('/hash/clinks');
    };


    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


  });
