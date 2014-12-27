'use strict';

/**
 * @ngdoc function
 * @name boardApp.controller:LinksCtrl
 * @description
 * # LinksCtrl
 * Controller of the boardApp
 */
angular.module('boardApp')
  .controller('LinksCtrl', function ($scope, $http, baseURL)  {

    $scope.listZones = function () {
      var url = baseURL + 'zones';
      $http.get(url).success(function (data) {
        $scope.zones = data;
      });
    };
    $scope.listZones();

    $scope.feedLinks = function (zone) {
      var url = baseURL + 'stats/links/'+zone;
      $http.get(url).success(function (data) {
        $scope.links = data;
      });
    };

    $scope.feedLinks('ZM');

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


  });
