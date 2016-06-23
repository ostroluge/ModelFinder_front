'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:ReponseCtrl
 * @description
 * # ReponseCtrl
 * Controller of the modelFinderApp
 */


modelFinderApp.controller('ReponseCtrl', function ($scope, $http,$location,$route) {

  $scope.getModelResponses = function () {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/modelProposals',
    }).success(function (data) {
      $scope.reponses = data;
      angular.forEach($scope.reponses,function(reponse,key){
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
      $http({
      method: 'GET',
      url: 'http://localhost:8080/accessoireList',
      }).success(function (accessL) {
        $scope.accessoires=accessL;
      })
    }).error(function (data, status) {
      if(data.message == "Accès refusé"){
        $location.path("/accessDenied");
      }else{
        $location.path("/error");
      }
    });
  };

  $scope.getStudentAnnonces = function () {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/studentServices',
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
      $http({
        method: 'GET',
        url: 'http://localhost:8080/accessoireList',
      }).success(function (accessL) {
        $scope.accessoires=accessL;
      })
    }).error(function (data, status) {
      if(data.message == "Accès refusé"){
        $location.path("/accessDenied");
      }else{
        $location.path("/error");
      }
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

  $scope.go = function (path) {
    $location.path(path);
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
      url: 'http://localhost:8080/detailReponse/' + id,
    }).success(function (data) {

      var postObject = new Object();
      postObject = data;
      postObject.statut = "Validée";

      $scope.updateStatusAnnonce(postObject.annonce.id, "Inactive");

      $http({
        url: "http://localhost:8080/modifyReponseStatus",
        method: "POST",
        dataType: "json",
        data: postObject,
        headers: {
          "Content-Type": "application/json"
        }
      }).success(function successCallback(response) {
          if (response.response == "success") {
            $location.path("/monitoring/services");
            console.log("OK");
            $scope.etatDemande = "La demande a été envoyée avec succès.";
            $scope.reponses[indexReponseInResponses(id)].statut="Validée";
          } else {
            console.log("KO");
            $scope.etatDemande = "Échec de la demande, veuillez réessayer."
          }
        }).error(function (data, status) {
        $scope.etatDemande = "Error " + response
          if(data.message == "Accès refusé"){
            $location.path("/accessDenied");
          }else{
            $location.path("/error");
          }
        });


    });
  };



$scope.refuserReponse = function (id) {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/detailReponse/' + id,
    }).success(function (data) {

      var postObject = new Object();
      postObject = data;
      postObject.statut = "Refusée";

    $http({
        url: "http://localhost:8080/modifyReponseStatus",
        method: "POST",
        dataType: "json",
        data: postObject,
        headers: {
          "Content-Type": "application/json"
        }
      }).success(function successCallback(response) {
          if (response.response === "success") {
            $location.path("/monitoring/services");
            console.log("OK");
            $scope.etatDemande = "La demande a été envoyée avec succès.";
            $scope.reponses[indexReponseInResponses(id)].statut="Refusée";
          } else {
            console.log("KO");
            $scope.etatDemande = "Échec de la demande, veuillez réessayer."
          }
        }).error(function (data, status) {
            if(data.message == "Accès refusé"){
              $location.path("/accessDenied");
            }else{
              $location.path("/error");
            }
          });
    }).error(function (data, status) {
          if(data.message == "Accès refusé"){
            $location.path("/accessDenied");
          }else{
            $location.path("/error");
          }
        });

    };




    $scope.deleteReponseByModel = function (id) {
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
            $scope.getModelResponses();
            } else {
            console.log("KO");
            $scope.etatDemande = "Échec de la demande, veuillez réessayer."
          }
        }).error(function (data, status) {
          if(data.message == "Accès refusé"){
            $location.path("/accessDenied");
          }else{
            $location.path("/error");
          }
        });
    };

  $scope.deleteReponseByStudent = function (id) {
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
            } else {
            console.log("KO");
            $scope.etatDemande = "Échec de la demande, veuillez réessayer."
          }
        }).error(function (data, status) {
          if(data.message == "Accès refusé"){
            $location.path("/accessDenied");
          }else{
            $location.path("/error");
          }
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
        $http({
          url: 'http://localhost:8080/deleteAllReponse/' + id,
          method: "GET"
        }).success(function successCallback(response) {
          $route.reload();
        });
      }).error(function (data, status) {
        if(data.message == "Accès refusé"){
          $location.path("/accessDenied");
        }else{
          $location.path("/error");
        }
        });
    });

    };


});
