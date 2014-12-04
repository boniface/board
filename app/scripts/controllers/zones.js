'use strict';

/**
 * @ngdoc function
 * @name boardApp.controller:ZonesCtrl
 * @description
 * # ZonesCtrl
 * Controller of the boardApp
 */
angular.module('boardApp')
  .controller('ZonesCtrl', function ($scope,$http,baseURL,$resource) {
        $scope.submitButtonMode = 'Save Zone';
        $scope.submitZone = $resource(baseURL+'zone' + ':id',{ id: '@id' });

        $scope.listZones = function(){
            var url = baseURL+'zones';
            $http.get(url).success(function(data){
                $scope.zones = data;
            });
        };

        $scope.createZone = function(zone){
//            var file = $scope.zone.file;
            $scope.zform = zone;
            $scope.zform.flag='none';
            new $scope.submitZone(zone).$save().then(function (zone){
                $scope.zones.push(zone);
                $scope.zone ={};
                $scope.zoneForm.$setPristine();
            } );
        };

        $scope.updateZone = function(zone){
            var URL = baseURL+'zone/';
            $http({
                url: URL + zone.id,
                method: 'PUT',
                data: zone
            }).success(function (updateZone) {
                for (var i = 0; i < $scope.zones.length; i++) {
                    if ($scope.zones[i].id === updateZone.id) {
                        $scope.zones[i] = updateZone;
                        break;
                    }
                }
                $scope.displayMode = 'list';
                $scope.zone ={};
                $scope.zoneForm.$setPristine();
            });

        };

        $scope.deleteZone = function(zone){
            var URL = baseURL+'zone/delete/';
            $http({
                method: 'DELETE',
                url: URL + zone.id
            }).success(function () {
                $scope.zones.splice($scope.zones.indexOf(zone), 1);
            });
        };

        $scope.editZone = function(zone){
            $scope.zone =
                zone ? angular.copy(zone) : {};
            $scope.submitButtonMode = 'Edit Zone';

        };

        $scope.saveEditZone = function(zone){
            if (angular.isDefined(zone.id)) {
                $scope.updateZone(zone);
            } else {
                $scope.createZone(zone);
            }
            $scope.submitButtonMode = 'Save Zone';

        };

       $scope.cancelZone = function(){
           $scope.zone ={};
           $scope.zoneForm.$setPristine();
           $scope.submitButtonMode = 'Save Zone';
       };

        $scope.resetZone = function(){
            $scope.zone ={};
            $scope.zoneForm.$setPristine();
            $scope.submitButtonMode = 'Save Zone';

        };

        $scope.listZones();

        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];

  });
