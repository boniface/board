'use strict';

/**
 * @ngdoc function
 * @name boardApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the boardApp
 */
angular.module('boardApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
