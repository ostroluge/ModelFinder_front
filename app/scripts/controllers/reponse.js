'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:ReponseCtrl
 * @description
 * # ReponseCtrl
 * Controller of the modelFinderApp
 */


modelFinderApp.controller('ReponseCtrl', function ($scope, $http,$location,$route) {

  $scope.getAllResponses = function () {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/reponseList',
    }).success(function (data) {
      $scope.reponses = data;
      $scope.annonces = [];
      angular.forEach($scope.reponses,function(reponse,key){
        if(!annonceInCollection(reponse.annonce)){
          $scope.annonces.push(reponse.annonce);
        }
        if (reponse.statut=="En attente"){
            reponse.statutOrder=1;
          }
            else if (reponse.statut=="Validée"){
              reponse.statutOrder=2;
            }
              else{
                reponse.statutOrder=3;
              };
      });
    }).error(function () {
      alert("error");
    });
  };

  function annonceInCollection(annonce) {
  for (var i = 0; i < $scope.annonces.length; i++) {
    if ($scope.annonces[i].id == annonce.id) {
      return true;
    }
  }
  return false;
};

  function indexReponseInResponses(id) {
  for (var i = 0; i < $scope.reponses.length; i++) {
    if ($scope.reponses[i].id == id) {
      return i;
    }
  }
  return -1;
};

  function indexAnnonceInAnnonces(id) {
  for (var i = 0; i < $scope.annonces.length; i++) {
    if ($scope.annonces[i].id == id) {
      return i;
    }
  }
  return -1;
};


  $scope.validerReponse = function (id) {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/OneReponse/' + id,
    }).success(function (data) {

      var postObject = new Object();
      postObject = data;
      postObject.statut = "Validée";

      $scope.updateStatusAnnonce(postObject.annonce.id, "Inactive");

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
            $scope.reponses[indexReponseInResponses(id)].statut="Validée";
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



$scope.refuserReponse = function (id) {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/OneReponse/' + id,
    }).success(function (data) {

      var postObject = new Object();
      postObject = data;
      postObject.statut = "Refusée";

    $http({
        url: "http://localhost:8080/modifyReponse",
        method: "POST",
        dataType: "json",
        data: postObject,
        headers: {
          "Content-Type": "application/json"
        }
      }).success(function successCallback(response) {
          if (response.response === "success") {
            console.log("OK");
            $scope.etatDemande = "La demande a été envoyée avec succès.";
            $scope.reponses[indexReponseInResponses(id)].statut="Refusée";
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




    $scope.deleteReponse = function (id) {
        $http({
        url: "http://localhost:8080/supprimerReponse",
        method: "POST",
        dataType: "json",
        data: id,
        headers: {
          "Content-Type": "application/json"
        }
      }).success(function successCallback(response) {
          if (response.response == "success") {
            console.log("OK");
            $scope.etatDemande = "La demande a été envoyée avec succès.";
            $scope.getAllResponses();
            } else {
            console.log("KO");
            $scope.etatDemande = "Échec de la demande, veuillez réessayer."
          }
        })
        .error(function errorCallback(response) {
          console.log("Error");
          $scope.etatDemande = "Error " + response
        });
    };


    $scope.updateStatusAnnonce = function (id, new_status) {
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
            if (new_status=="Inactive"){
              $http({
                method: 'GET',
                url: 'http://localhost:8080/ReponsesByAnnonceAndStatut/' + id +'/En attente',
                 }).success(function (data) {
                  var reponsesaRefuser = new Object();
                  reponsesaRefuser = data;
                  angular.forEach(reponsesaRefuser,function(reponse,key){
                    $scope.refuserReponse(reponse.id);
                  });
                  $scope.annonces[indexAnnonceInAnnonces(id)].status="Inactive";
                 });
              }
            if (new_status=="Active"){
              $http({
                method: 'GET',
                url: 'http://localhost:8080/ReponsesByAnnonce/' + id,
                 }).success(function (data) {
                  var reponsesaSupprimer = new Object();
                  reponsesaSupprimer = data;
                  angular.forEach(reponsesaSupprimer,function(reponse,key){
                    $scope.deleteReponse(reponse.id);
                  });
                  $scope.annonces[indexAnnonceInAnnonces(id)].status="Active";
                 });
              }
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
