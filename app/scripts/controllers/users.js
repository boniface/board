'use strict';

/**
 * @ngdoc function
 * @name boardApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the boardApp
 */
angular.module('boardApp')
  .controller('UsersCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
