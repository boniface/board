'use strict';

/**
 * @ngdoc function
 * @name boardApp.controller:FeedsCtrl
 * @description
 * # FeedsCtrl
 * Controller of the boardApp
 */
angular.module('boardApp')
  .controller('FeedsCtrl', function ($scope, $http, baseURL, $location) {
    $scope.submitButtonMode = 'Save Feed';
    $scope.sitecode='';
    $scope.siteurl ='';
    $scope.feedtype ='';
    $scope.sitezone ='';


    $scope.feedTypes = [
      {name:'RSS FEED', value:'RSS'},
      {name:'ATOM FEED', value:'ATOM'}
    ];



    $scope.sitedata = function(site){
      $scope.sitecode=site.code;
      $scope.siteurl=site.url;
      $scope.sitezone=site.zone;

    };

    $scope.feeddata = function(feed){
      $scope.feedtype=feed.value;

    };

    $scope.listFeeds = function (zone) {
      var url = baseURL + 'feeds/'+zone;
      $http.get(url).success(function (data) {
        $scope.feeds = data;
      });
    };


    $scope.listZones = function () {
      var url = baseURL + 'zones';
      $http.get(url).success(function (data) {
        $scope.zones = data;
      });
    };
    $scope.listZones();

    $scope.listSites = function(zone){
      var url = baseURL+'sites/'+zone;
      $http.get(url).success(function(data){
        $scope.sites = data;
      });
    };

    $scope.update = function(code) {
      $scope.zone=code;
      $scope.listFeeds(code);
      $scope.listSites(code);
      $location.path('/hash/feeds');
    };

    $scope.createFeed = function (feed) {
//            var file = $scope.feed.file;
      var URL = baseURL + 'feed/create/';
      $scope.fform = feed;
      $scope.fform.siteLogo = 'none';
      $scope.fform.zone = $scope.sitezone;
      $scope.fform.feedType = $scope.feedtype;
      $scope.fform.siteCode = $scope.sitecode;
      $scope.fform.feedSite = $scope.siteurl;
      $http.post(
        URL + feed.zone,
        feed)
        .success(function (newFeed) {
          $scope.feeds.push(newFeed);
          $scope.feed = {};
          $scope.feedForm.$setPristine();

        });
    };

    $scope.updateFeed = function (feed) {
      var URL = baseURL + 'feed/update/';
      $http({
        url: URL + feed.zone + '/' + feed.id,
        method: 'PUT',
        data: feed
      }).success(function (updateFeed) {
        for (var i = 0; i < $scope.feeds.length; i++) {
          if ($scope.feeds[i].id === updateFeed.id) {
            $scope.feeds[i] = updateFeed;
            break;
          }
        }
        $scope.displayMode = 'list';
        $scope.feed = {};
        $scope.feedForm.$setPristine();
      });

    };

    $scope.deleteFeed = function (feed) {
      var URL = baseURL + 'feed/delete/';
      $http({
        method: 'DELETE',
        url: URL + feed.zone + '/' + feed.id
      }).success(function () {
        $scope.feeds.splice($scope.feeds.indexOf(feed), 1);
      });
    };

    $scope.editFeed = function (feed) {
      $scope.feed =
        feed ? angular.copy(feed) : {};
      $scope.submitButtonMode = 'Edit Feed';

    };

    $scope.saveEditFeed = function (feed) {
      if (angular.isDefined(feed.id)) {
        $scope.updateFeed(feed);
      } else {
        $scope.createFeed(feed);
      }

      $scope.submitButtonMode = 'Save Feed';

    };

    $scope.cancelFeed = function () {
      $scope.feed = {};
      $scope.feedForm.$setPristine();
      $scope.submitButtonMode = 'Save Feed';
    };

    $scope.resetFeed = function () {

      $scope.feed = {};
      //$scope.feedForm.$setPristine();
      $scope.feedForm = angular.copy($scope.feed);
      $scope.submitButtonMode = 'Save Feed';

    };
    $scope.listFeeds();
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  });
