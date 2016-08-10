'use strict';

/**
 * @ngdoc overview
 * @name newFolderApp
 * @description
 * # newFolderApp
 *
 * Main module of the application.
 */
angular
  .module('myApp', [
    'ngCookies',
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'index.html',
        controller: 'myCtrl',
        controllerAs: 'index'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
