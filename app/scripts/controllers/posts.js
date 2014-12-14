'use strict';

/**
 * @ngdoc function
 * @name boardApp.controller:PostsCtrl
 * @description
 * # PostsCtrl
 * Controller of the boardApp
 */
angular.module('boardApp')
  .controller('PostsCtrl',function ($scope, $http, baseURL)  {


    $scope.listZones = function () {
      var url = baseURL + 'zones';
      $http.get(url).success(function (data) {
        $scope.zones = data;
      });
    };

    $scope.zonePosts = function (zone) {
      var url = baseURL + 'stats/posts/'+zone;
      $http.get(url).success(function (data) {
        $scope.posts = data;
      });
    };

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


  });
