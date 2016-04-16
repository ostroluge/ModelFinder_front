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
    url: 'http://localhost:8080/suggestionModel/'+$routeParams.carnation_peau+'/'+$routeParams.couleur_yeux+'/'+$routeParams.longueur_cheveux+'/'+$routeParams.taille_min+'/'+$routeParams.taille_max,
    ///modelList
  }).success(function(data){
    $scope.message = data;

  }).error(function(){
    alert("error");
  });

  $scope.go = function (path) {
    $location.path(path);
  };

    $scope.calculerAge = function (dateOfBirth) {
        var maintenant = new Date();
        var birth = new Date(dateOfBirth);
        var age = dateDiff(birth,maintenant);
        console.log(age);
        return age;
    };

function dateDiff(d1, d2)
{
	return new Number((d2.getTime() - d1.getTime()) / 31536000000).toFixed(0);
};


});
