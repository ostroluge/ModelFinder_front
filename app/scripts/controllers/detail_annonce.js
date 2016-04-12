'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:DetailAnnonceCtrl
 * @description});
 * # DetailAnnonceCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('DetailAnnonceCtrl', function ($scope, $http, $location, $routeParams) {

$http({
    method: 'GET',
    url: 'http://localhost:8080/detailAnnonce/'+$routeParams.id_annonce,
  }).success(function(data){

$scope.id = data.id;
$scope.etudiant_id = data.idStudent;
$scope.groupe_accessoire_id = data.idAccessories;
$scope.titre = data.title;
$scope.date_debut = data.dateBegin;
$scope.duree = data.duration;
$scope.categorie_prestation = data.categoryService;
$scope.theme_prestation = data.themeService;
$scope.carnation_peau = data.skinTone;
$scope.couleur_yeux = data.eyeColor;
$scope.couleur_cheveux = data.hairColor;
$scope.longueur_cheveux = data.lengthHair;
$scope.taille_min = data.heightMin;
$scope.taille_max = data.heightMax;
$scope.commentaire = data.comment;

  }).error(function(){
    alert("error");
  });

  $scope.go = function (path) {
    $location.path(path);
  };

});
