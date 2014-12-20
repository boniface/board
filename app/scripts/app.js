'use strict';

/**
 * @ngdoc overview
 * @name boardApp
 * @description
 * # boardApp
 *
 * Main module of the application.
 */
angular
  .module('boardApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .constant('baseURL', 'http://localhost:8080/api/')
  .config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(false);
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/hash/feeds', {
        templateUrl: 'views/feeds.html',
        controller: 'FeedsCtrl'
      })
      .when('/hash/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl'
      })
      .when('/hash/zones', {
        templateUrl: 'views/zones.html',
        controller: 'ZonesCtrl'
      })
      .when('/hash/socials', {
        templateUrl: 'views/socials.html',
        controller: 'SocialsCtrl'
      })
      .when('/hash/sites', {
        templateUrl: 'views/sites.html',
        controller: 'SitesCtrl'
      })
      .when('/hash/customfeeds', {
        templateUrl: 'views/customfeeds.html',
        controller: 'CustomfeedsCtrl'
      })
      .when('/hash/links', {
        templateUrl: 'views/links.html',
        controller: 'LinksCtrl'
      })
      .when('/hash/clinks', {
        templateUrl: 'views/clinks.html',
        controller: 'ClinksCtrl'
      })
      .when('/hash/posts', {
        templateUrl: 'views/posts.html',
        controller: 'PostsCtrl'
      })
      .when('/hash/errors', {
        templateUrl: 'views/errors.html',
        controller: 'ErrorsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
