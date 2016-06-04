'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:StudentCtrl
 * @description
 * # StudentCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('StudentCtrl', function ($scope, $http) {
  $http({
    method: 'GET',
    url: 'http://localhost:8080/studentList',
  }).success(function(data){
    $scope.message = data;
  }).error(function (data, status) {
    if(data.message == "Accès refusé"){
      $location.path("/accessDenied");
    }else{
      $location.path("/error");
    }
  });
});
