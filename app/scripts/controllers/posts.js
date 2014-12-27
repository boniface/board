'use strict';

/**
 * @ngdoc function
 * @name boardApp.controller:PostsCtrl
 * @description
 * # PostsCtrl
 * Controller of the boardApp
 */
angular.module('boardApp')
  .controller('PostsCtrl',function ($scope, $http, baseURL,$location)  {


    $scope.listZones = function () {
      var url = baseURL + 'zones';
      $http.get(url).success(function (data) {
        $scope.zones = data;
      });
    };
    $scope.listZones();

    $scope.zonePosts = function (zone) {
      var url = baseURL + 'stats/posts/'+zone;
      $http.get(url).success(function (data) {
        $scope.posts = data;
      });
    };

    $scope.updatedPosts = function(code) {
      $scope.zone=code;
      $scope.zonePosts(code);
      $location.path('/hash/links');
    };

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


  });
