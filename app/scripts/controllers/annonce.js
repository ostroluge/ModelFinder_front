'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:AnnonceCtrl
 * @description});
 * # AnnonceCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('AnnonceCtrl', function ($scope, $http) {
  $http({
    method: 'GET',
    url: 'http://localhost:8080/annonceList',
  }).success(function(data){
    $scope.message = data;
  }).error(function(){
    alert("error");
  });
});