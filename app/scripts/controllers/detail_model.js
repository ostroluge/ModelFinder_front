'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:DetailModelCtrl
 * @description});
 * # DetailModelCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('DetailModelCtrl', function ($scope, $http, $location, $routeParams) {

  $http({
    method: 'GET',
    url: 'http://localhost:8080/detailModel/' + $routeParams.id_model
  }).success(function (data) {
    $scope.model = data.model;
    $scope.user = data.user;
    $scope.password = '';
    $scope.passwordConf = '';
      $scope.model.dateOfBirth = new Date($scope.model.dateOfBirth);
     if (data.gender == 1) {
      $scope.sexe = "Homme";
    } else {
      $scope.sexe = "Femme";
    }
    $scope.sexes=['Femme','Homme'];
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
    var age = dateDiff(birth, maintenant);
    console.log(age);
    return age;
  };

  $scope.intToSexe = function (int) {
    if (int==1){
      return "Homme"
    }
    else{
      return "Femme"
    }
  };

  function dateDiff(d1, d2) {
    return new Number((d2.getTime() - d1.getTime()) / 31536000000).toFixed(0);
  };

  $scope.checkPwdModify = function(pwd1, pwd2) {
    if(pwd1==pwd2){ //Mots de passe identique
      if(pwd1==''){ //Si aucune modif : mot de passe deja renseigné et crypté
        $scope.modifyModel();
      } else {//Si modif du mdp
        $scope.user.password=pwd1;
        $scope.modifyModelPassword();
      }

    }
    else{
      $scope.passwordError = "Veuillez entrer deux mots de passe identiques";
    }
  }

  $scope.modifyModel = function () {
    if ($scope.sexe == "Homme") {
      $scope.model.gender = 1;
    } else {
      $scope.model.gender = 2;
    }
    $http({
          url: "http://localhost:8080/modifyModel",
          method: "POST",
          dataType: "json",
          data: {model:$scope.model, user:$scope.user},
          headers: {
            "Content-Type": "application/json"
          }
        }).success(function successCallback(response) {
            if (response.response == "success") {
              console.log("OK");
              $scope.go('/models/'+$routeParams.id_model+'/show');
            } else {
              console.log("KO");
            }
          })
          .error(function errorCallback(response) {
            console.log("Error");
          });
 }

   $scope.modifyModelPassword = function () {
    if ($scope.sexe == "Homme") {
      $scope.model.gender = 1;
    } else {
      $scope.model.gender = 2;
    }
    $http({
          url: "http://localhost:8080/modifyModelAndPassword",
          method: "POST",
          dataType: "json",
          data: {model:$scope.model, user:$scope.user},
          headers: {
            "Content-Type": "application/json"
          }
        }).success(function successCallback(response) {
            if (response.response == "success") {
              console.log("OK");
              $scope.go('/models/'+$routeParams.id_model+'/show');
            } else {
              console.log("KO");
            }
          })
          .error(function errorCallback(response) {
            console.log("Error");
          });
 }

   $scope.getLengthHairEnum = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/getLengthHairEnum',
    }).success(function(length){
      $scope.lengthHairEnum = length;
    })
  };

  $scope.getSkinToneEnum = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/getSkinToneEnum',
    }).success(function(skinTone){
      $scope.skinToneEnum = skinTone;
    })
  };

  $scope.getEyeColorEnum = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/getEyeColorEnum',
    }).success(function(eyeColor){
      $scope.eyeColorEnum = eyeColor;
    })
  };

    $scope.deleteModel = function (id) {
      $http({
        method: 'GET',
        url: 'http://localhost:8080/deleteModel/' + id,
      }).success(function (response) {
            if (response.response === "success") {
              console.log("OK");
              go('/models');
            } else {
              console.log("KO");
            }
          })
          .error(function errorCallback(response) {
            console.log("Error");
            $scope.etatDemande = "Error " + response
          });
    };



});

