'use strict';

/**
 * @ngdoc overview
 * @name modelFinderApp
 * @description
 * # modelFinderApp
 *
 * Main module of the application.
 */

var modelFinderApp = angular.module('modelFinderApp', ['ngRoute', 'ngCookies']);

modelFinderApp.config(function ($routeProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;

    $routeProvider.when('/', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
      .when('/main', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    }).when('/services', {
      controller: 'AnnonceCtrl',
      templateUrl: 'views/list_annonces.html',
    }).when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    }).when('/login?logout', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    }).when('/logout', {
      templateUrl: 'views/logout.html',
      controller: 'LogoutCtrl'
    }).when('/services/:id_annonce/show', {
      templateUrl: 'views/detail_annonce.html',
      controller: 'DetailAnnonceCtrl'
    }).when('/services/:idAnnonce/edit', {
      controller: 'ModifyAnnonceCtrl',
      templateUrl: 'views/modify_annonce.html'
    }).when('/services/new', {
      controller: 'AnnonceCtrl',
      templateUrl: 'views/create_annonce.html'
    }).when('/services/:id_annonce/suggestions', {
      controller: 'SuggestionModelCtrl',
      templateUrl: 'views/suggestion_modele.html'
    }).when('/models/:id_model/show', {
      controller: 'DetailModelCtrl',
      templateUrl: 'views/detail_model.html'
    }).when('/students/:id_student/show', {
      controller: 'DetailStudentCtrl',
      templateUrl: 'views/detail_student.html'
    }).when('/services/:id_annonce/applications/new', {
      controller: 'ApplyCtrl',
      templateUrl: 'views/apply.html'
    }).when('/monitoring/services', {
      controller:'ReponseCtrl',
      templateUrl:'views/follow_annonces.html'
    }).when('/monitoring/proposals', {
      controller:'ReponseCtrl',
      templateUrl:'views/follow_proposals.html'
    }).when('/models/new', {
      controller:'ModelCtrl',
      templateUrl:'views/create_model.html'
    }).when('/proposals/:id_reponse/edit', {
      controller:'ModifyReponseCtrl',
      templateUrl:'views/edit_proposals.html'
    }).when('/students', {
      controller:'StudentCtrl',
      templateUrl:'views/list_student.html'
    }).when('/models', {
      controller:'ModelCtrl',
      templateUrl:'views/list_model.html'
    }).when('/students/:id_student/edit', {
      controller: 'DetailStudentCtrl',
      templateUrl: 'views/modify_student.html'
    }).when('/models/:id_model/edit', {
      controller: 'DetailModelCtrl',
      templateUrl: 'views/modify_model.html'
    }).when('/profile', {
      controller: 'ProfileCtrl',
      templateUrl: 'views/profile.html'
    }).when('/error' , {
      templateUrl : 'views/error.html'
    }).when('/accessDenied', {
       templateUrl: 'views/access_denied.html'
    })
      .otherwise({redirectTo: 'views/error.html'});
  }
);

