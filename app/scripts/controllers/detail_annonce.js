'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:DetailAnnonceCtrl
 * @description});
 * # DetailAnnonceCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('DetailAnnonceCtrl', function ($scope, $http, $location, $routeParams, $route) {

$http({
    method: 'GET',
    url: 'http://localhost:8080/detailAnnonce/'+$routeParams.id_annonce
  }).success(function(data){

  $scope.id = data.annonce.id;
  $scope.etudiant = data.annonce.student;
  $scope.titre = data.annonce.title;
  $scope.date_debut = data.annonce.dateBegin;
  $scope.date_fin = data.annonce.dateEnd;
  $scope.categorie_prestation = data.annonce.categoryService;
  $scope.theme_prestation = data.annonce.themeService;
  $scope.carnation_peau = data.annonce.skinTone;
  $scope.couleur_yeux = data.annonce.eyeColor;
  $scope.couleur_cheveux = data.annonce.hairColor;
  $scope.longueur_cheveux = data.annonce.lengthHair;
  $scope.taille_min = data.annonce.heightMin;
  $scope.taille_max = data.annonce.heightMax;
  $scope.commentaire = data.annonce.comment;
  $scope.status=data.annonce.status;
  $scope.accessories = {accessory1 : data.accessories.accessory1,accessory2 : data.accessories.accessory2,
    accessory3 : data.accessories.accessory3,accessory4 : data.accessories.accessory4,accessory5 : data.accessories.accessory5};

  }).error(function(){
    alert("error");
  });

  $scope.go = function (path) {
    $location.path(path);
  };

  $scope.updateStatus = function (id, new_status) {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/detailAnnonce/' + id,
    }).success(function (data) {


      var postObject = new Object();
      postObject = data;
      postObject.annonce.status = new_status;


      $http({
        url: "http://localhost:8080/updateAnnonce",
        method: "POST",
        dataType: "json",
        data: postObject,
        headers: {
          "Content-Type": "application/json"
        }
      }).success(function successCallback(response) {
          if (response.response == "success") {
            console.log("OK");
            $scope.etatDemande = "La demande a été envoyée avec succès.";
            $route.reload();
          } else {
            console.log("KO");
            $scope.etatDemande = "Échec de la demande, veuillez réessayer."
          }
        })
        .error(function errorCallback(response) {
          console.log("Error");
          $scope.etatDemande = "Error " + response
        });
    });

    };

});
