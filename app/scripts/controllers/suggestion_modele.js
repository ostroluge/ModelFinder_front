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
    url: 'http://localhost:8080/suggestionModel/' + $routeParams.id_annonce,
  }).success(function(data){
    if (data.length == 0) {
      $scope.noSuggestion = "Il n'y a pas de modèle correspondant aux critères de l'annonce";
      $scope.message = "";
    } else {
      $scope.message = data;
        console.log(data);
    }

  }).error(function (data, status) {
    if(data.message == "Accès refusé"){
      $location.path("/accessDenied");
    }else{
      $location.path("/error");
    }
  });

  $scope.go = function (path) {
    $location.path(path);
  };

    $scope.calculerAge = function (dateOfBirth) {
        var maintenant = new Date();
        var birth = new Date(dateOfBirth);
        var age = dateDiff(birth,maintenant);
        return age;
    };

function dateDiff(d1, d2)
{
	return new Number((d2.getTime() - d1.getTime()) / 31536000000).toFixed(0);
};


});
