'use strict';

/**
 * @ngdoc function
 * @name boardApp.controller:CustomfeedsCtrl
 * @description
 * # CustomfeedsCtrl
 * Controller of the boardApp
 */
angular.module('boardApp')
  .controller('CustomfeedsCtrl', function ($scope, $http, baseURL) {
    $scope.submitButtonMode = 'Save Feed';

//    /api/cfeeds
    $scope.listFeeds = function () {
      var url = baseURL + 'cfeeds';
      $http.get(url).success(function (data) {
        $scope.cfeeds = data;
      });
    };

    // /api/cfeed/create/:zone

    $scope.createFeed = function (customFeed) {
//            var file = $scope.feed.file;
      var URL = baseURL + 'cfeed/create/';
      $scope.customFeed = customFeed;
      $scope.customFeed.siteLogo = 'none';
      $http.post(URL + customFeed.zone,customFeed)
        .success(function (newFeed) {
          $scope.cfeeds.push(newFeed);
          $scope.customFeed = {};
          $scope.customFeedForm.$setPristine();

        });
    };

    ///api/cfeed/update/:zone/:id
    $scope.updateFeed = function (customFeed) {
      var URL = baseURL + 'cfeed/update/';
      $http({
        url: URL + customFeed.zone + '/' + customFeed.id,
        method: 'PUT',
        data: customFeed
      }).success(function (updateFeed) {
        for (var i = 0; i < $scope.cfeeds.length; i++) {
          if ($scope.cfeeds[i].id === updateFeed.id) {
            $scope.cfeeds[i] = updateFeed;
            break;
          }
        }
        $scope.displayMode = 'list';
        $scope.customFeed = {};
        $scope.customFeedForm.$setPristine();
      });

    };
// /api/cfeed/delete/:zone/:id
    $scope.deleteFeed = function (customFeed) {
      var URL = baseURL + 'cfeed/delete/';
      $http({
        method: 'DELETE',
        url: URL + customFeed.zone + '/' + customFeed.id
      }).success(function () {
        $scope.cfeeds.splice($scope.cfeeds.indexOf(customFeed), 1);
      });
    };

    $scope.editFeed = function (customFeed) {

      console.log(" Data to be Edited is ", customFeed)
      $scope.customFeed = customFeed ? angular.copy(customFeed) : {};
      $scope.submitButtonMode = 'Edit Feed';

    };

    $scope.saveEditFeed = function (customFeed) {
      if (angular.isDefined(customFeed.id)) {
        $scope.updateFeed(customFeed);
      } else {
        $scope.createFeed(customFeed);
      }

      $scope.submitButtonMode = 'Save Feed';

    };

    $scope.cancelFeed = function () {
      $scope.cfeed = {};
      $scope.customFeedForm.$setPristine();
      $scope.submitButtonMode = 'Save Feed';
    };

    $scope.resetFeed = function () {
      $scope.cfeed = {};
      $scope.customFeedForm.$setPristine();
      $scope.submitButtonMode = 'Save Feed';

    };
    $scope.listFeeds();
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  });
