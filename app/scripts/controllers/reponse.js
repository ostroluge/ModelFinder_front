'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:ReponseCtrl
 * @description
 * # ReponseCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('ReponseCtrl', function ($scope, $http) {
    
  $http({
      method: 'GET',
      url: 'http://localhost:8080/reponseList',
    }).success(function (data) {
      $scope.reponses = data;
    }).error(function () {
      alert("error");
  });

  });
