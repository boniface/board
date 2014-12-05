'use strict';

/**
 * @ngdoc function
 * @name boardApp.controller:SitesCtrl
 * @description
 * # SitesCtrl
 * Controller of the boardApp
 */
angular.module('boardApp')
  .controller('SitesCtrl', function ($scope,$http,baseURL) {
    $scope.submitButtonMode = 'Save Site';


    $scope.listSites = function(){
      var url = baseURL+'sites/all/0';
      $http.get(url).success(function(data){
        $scope.sites = data;
      });
    };

    $scope.createSite = function (site) {
//            var file = $scope.feed.file;
      var URL = baseURL + 'site/create/';
      $scope.sform = site;
      $scope.sform.logo = 'none';
      $http.post(
        URL + site.zone,   site)
        .success(function (newSite) {
          $scope.sites.push(newSite);
          $scope.site = {};
          $scope.siteForm.$setPristine();

        });
    };



    // /api/site/update/:zone/:id
    $scope.updateSite = function(site){
      var URL = baseURL+'site/update/'+site.zone+'/';
      $http({
        url: URL + site.id,
        method: 'PUT',
        data: site
      }).success(function (updateSite) {
        for (var i = 0; i < $scope.sites.length; i++) {
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

    // /api/site/delete/:zone/:id
    $scope.deleteSite = function(site){
      var URL = baseURL+'site/delete/'+site.zone+'/';
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
