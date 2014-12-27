'use strict';

/**
 * @ngdoc function
 * @name boardApp.controller:LinksCtrl
 * @description
 * # LinksCtrl
 * Controller of the boardApp
 */
angular.module('boardApp')
  .controller('LinksCtrl', function ($scope, $http, baseURL, $location)  {
    $scope.sitezone ='';

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

    $scope.updatedFeeds = function(code) {
      $scope.zone=code;
      $scope.feedLinks(code);
      $location.path('/hash/links');
    };



    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


  });
