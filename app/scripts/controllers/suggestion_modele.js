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
    url: 'http://localhost:8080/detailAnnonce/' + $routeParams.id_annonce,
  }).success(function(data) {
    $scope.findSuggestions(data.annonce.skinTone, data.annonce.eyeColor,
      data.annonce.lengthHair, data.annonce.heightMin, data.annonce.heightMax);
  }).error(function (data, status) {
    if(data.message == "Accès refusé"){
      $location.path("/accessDenied");
    }else{
      $location.path("/error");
    }
  });

  $scope.findSuggestions = function (carnation_peau, couleur_yeux, longueur_cheveux, taille_min, taille_max) {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/suggestionModel/'+carnation_peau+'/'+couleur_yeux+'/'+longueur_cheveux+'/'+taille_min+'/'+taille_max,
      ///modelList
    }).success(function(data){
      console.log(data.length == 0);
      console.log(eval(data));
      if (data.length == 0) {
        $scope.noSuggestion = "Il n'y a pas de modèle correspondant au critères de l'annonce";
        $scope.message = "";
      } else {
        $scope.message = data;
      }

    }).error(function (data, status) {
      if(data.message == "Accès refusé"){
        $location.path("/accessDenied");  
      }else{
        $location.path("/error");
      }
    });
  };

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
