'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:SuggestionModelCtrl
 * @description});
 * # SuggestionModelCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('SuggestionModelCtrl', function ($scope, $http, $location, $routeParams) {

$http({
    method: 'GET',
    url: 'http://localhost:8080/modelList',
    //suggestionModele/'+$routeParams.id_annonce,
  }).success(function(data){
    $scope.message = data;
  }).error(function(){
    alert("error");
  });

  $scope.go = function (path) {
    $location.path(path);
  };

});
