'use strict';

/**
 * @ngdoc function
 * @name boardApp.controller:ClinksCtrl
 * @description
 * # ClinksCtrl
 * Controller of the boardApp
 */
angular.module('boardApp')
  .controller('ClinksCtrl', function ($scope, $http, baseURL)  {

    $scope.listZones = function () {
      var url = baseURL + 'zones';
      $http.get(url).success(function (data) {
        $scope.zones = data;
      });
    };

    $scope.customLinks = function (zone) {
      var url = baseURL + 'stats/clinks/'+zone;
      $http.get(url).success(function (data) {
        $scope.clinks = data;
      });
    };


    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


  });
