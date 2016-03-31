'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:AnnonceCtrl
 * @description});
 * # AnnonceCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('AnnonceCtrl', function ($scope, $http, $location) {
  $http({
    method: 'GET',
    url: 'http://localhost:8080/annonceList',
  }).success(function(data){
      $scope.message = data;

  }).error(function(){
    alert("error");
  });

  $scope.go = function (path) {
    $location.path(path);
  };
    
    $scope.getIndex = function(annonce){
	return $scope.message.indexOf(annonce);
};
});
