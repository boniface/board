'use strict';

/**
 * @ngdoc function
 * @name boardApp.controller:SocialsCtrl
 * @description
 * # SocialsCtrl
 * Controller of the boardApp
 */
angular.module('boardApp')
  .controller('SocialsCtrl', function ($scope, $http, baseURL, $resource) {
        $scope.submitButtonMode = 'Save Feed';
        $scope.submitFeed = $resource(baseURL + 'smfeed' + ':id', { id: '@id' });

        $scope.listFeeds = function () {
            var url = baseURL + 'smfeeds';
            $http.get(url).success(function (data) {
                $scope.feeds = data;
            });
        };

//        $scope.listZoneFeeds = function(zone){
//            var url = baseURL+'feeds/'+zone;
//            $http.get(url).success(function(data){
//                $scope.zoneFeeds = data;
//            });
//        };

        $scope.createFeed = function (feed) {
//            var file = $scope.feed.file;
            var URL = baseURL + 'smfeed/create/';
            $scope.fform = feed;
            $scope.fform.siteLogo = 'none';
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
            var URL = baseURL + 'smfeed/update/';
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
            var URL = baseURL + 'smfeed/delete/';
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
            $scope.feedForm.$setPristine();
            $scope.submitButtonMode = 'Save Feed';

        };
        $scope.listFeeds();
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

    });
