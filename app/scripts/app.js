'use strict';

/**
 * @ngdoc overview
 * @name modelFinderApp
 * @description
 * # modelFinderApp
 *
 * Main module of the application.
 */

var modelFinderApp = angular.module('modelFinderApp', ['ngRoute']);

modelFinderApp.config(['$routeProvider',
  function($routeProvider) {


    $routeProvider.
    when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }).
    when('/student', {
        controller:'StudentCtrl',
        templateUrl:'views/student.html',
    }).
    when('/annonces', {
        controller:'AnnonceCtrl',
        templateUrl:'views/list_annonces.html',
    }).
    when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
    }).
    when('/detail_annonce/:id_annonce', {
        templateUrl: 'views/detail_annonce.html',
        controller: 'DetailAnnonceCtrl'
    }).
    when('/createAnnonce', {
      controller:'AnnonceCtrl',
      templateUrl:'views/create_annonce.html'
    }).
    otherwise({redirectTo:'/'});

  }
]);
