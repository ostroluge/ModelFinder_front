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

  $scope.updateStatus = function (id,new_statut) {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/OneReponse/' + id,
    }).success(function (data) {

    var postObject = new Object();
    postObject = data;
    postObject.statut = new_statut;
    
    $http({
      url: "http://localhost:8080/modifyReponse",
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
