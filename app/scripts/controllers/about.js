'use strict';

/**
 * @ngdoc function
 * @name boardApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the boardApp
 */
angular.module('boardApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
