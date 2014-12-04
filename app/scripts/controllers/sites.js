'use strict';

/**
 * @ngdoc function
 * @name boardApp.controller:SitesCtrl
 * @description
 * # SitesCtrl
 * Controller of the boardApp
 */
angular.module('boardApp')
  .controller('SitesCtrl', function ($scope,$http,baseURL,$resource) {
    $scope.submitButtonMode = 'Save Site';
    $scope.submitSite = $resource(baseURL+'site/create/ZM' + ':id',{ id: '@id' });

    $scope.listSites = function(){
      var url = baseURL+'sites/all/0';
      $http.get(url).success(function(data){
        $scope.sites = data;
      });
    };

    $scope.createSite = function(site){
//            var file = $scope.zone.file;

      $scope.sform = site;
      $scope.sform.logo='none';

      new $scope.submitSite(site).$save().then(function (site){
        $scope.sites.push(site);
        $scope.site ={};
        $scope.siteForm.$setPristine();
      } );
    };

    $scope.updateSite = function(site){
      var URL = baseURL+'zone/';
      $http({
        url: URL + site.id,
        method: 'PUT',
        data: site
      }).success(function (updateSite) {
        for (var i = 0; i < $scope.zones.length; i++) {
          if ($scope.sites[i].id === updateSite.id) {
            $scope.sites[i] = updateSite;
            break;
          }
        }
        $scope.displayMode = 'list';
        $scope.site ={};
        $scope.siteForm.$setPristine();
      });

    };

    $scope.deleteSite = function(site){
      var URL = baseURL+'site/delete/';
      $http({
        method: 'DELETE',
        url: URL + site.id
      }).success(function () {
        $scope.sites.splice($scope.sites.indexOf(site), 1);
      });
    };

    $scope.editSite = function(site){
      $scope.site =
        site ? angular.copy(site) : {};
      $scope.submitButtonMode = 'Edit Site';

    };

    $scope.saveEditSite = function(site){
      if (angular.isDefined(site.id)) {
        $scope.updateSite(site);
      } else {
        $scope.createSite(site);
      }
      $scope.submitButtonMode = 'Save Site';

    };

    $scope.cancelSite = function(){
      $scope.site ={};
      $scope.siteForm.$setPristine();
      $scope.submitButtonMode = 'Save Site';
    };

    $scope.resetSite = function(){
      $scope.site ={};
      $scope.siteForm.$setPristine();
      $scope.submitButtonMode = 'Save Site';

    };

    $scope.listSites();

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

  });
