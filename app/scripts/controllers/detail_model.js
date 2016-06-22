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
    $scope.id = data.model.id;
    $scope.lastName = data.model.lastName;  
      $scope.dateOfBirth = new Date($scope.dateOfBirth);
      $scope.name = data.model.name;
      $scope.mail=data.model.mail;
      $scope.dateOfBirth=data.model.dateOfBirth;    
      $scope.phoneNumber=data.model.phoneNumber;
                $scope.skinTone=data.model.skinTone;
                $scope.hairColor=data.model.hairColor;
                $scope.eyeColor=data.model.eyeColor;
                $scope.lengthHair=data.model.lengthHair;
                $scope.height=data.model.height;
                $scope.shoeSize=data.model.shoeSize;
                $scope.highHeight=data.model.highHeight;
                $scope.lowHeight=data.model.lowHeight;
                $scope.description=data.model.description;
                $scope.comment=data.model.comment
     if (data.gender == 1) {
      $scope.sexe = "Homme";
    } else {
      $scope.sexe = "Femme";
    }
    $scope.sexes=['Femme','Homme'];
    $scope.file1=data.model.modelPhoto[0].file;
    $scope.file2=data.model.modelPhoto[1].file;
    $scope.file3=data.model.modelPhoto[2].file;  
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

  $scope.modifyModel = function () {
    if ($scope.sexe = "Homme") {
      $scope.model.gender == 1;
    } else {
      $scope.model.gender == 2;
    }
    $http({
          url: "http://localhost:8080/createModel",
          method: "POST",
          dataType: "json",
          data: $scope.model,
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

