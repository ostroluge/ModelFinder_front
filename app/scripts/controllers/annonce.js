'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:AnnonceCtrl
 * @description});
 * # AnnonceCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('AnnonceCtrl', function ($scope, $http, $location, $routeParams) {

  $scope.getAllAnnonces = function () {

    $scope.go = function (path) {
      $location.path(path);
    };

    $http({
      method: 'GET',
      url: 'http://localhost:8080/annonceListInactives',
    }).success(function (data) {
      $scope.annoncesInactives = data;
      $http({
      method: 'GET',
      url: 'http://localhost:8080/annonceListActives',
      }).success(function (data) {
        $scope.annoncesActives = data;
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

  $scope.getIndex = function (annonce) {
    return $scope.message.indexOf(annonce);
  };

  $scope.preremplissageDates = function (annonce) {
    var now = new Date((new Date($.now())).toISOString().substr(0,14)+'00:00');
    $scope.dateBeginAnnonce = now;
    $scope.dateEndAnnonce = now;
  };


  $scope.createAnnonce = function () {

    var postObjectAnnonce = new Object();
    postObjectAnnonce.title = $scope.titleAnnonce;
    postObjectAnnonce.themeService = $scope.themeAnnonce;
    postObjectAnnonce.categoryService = $scope.categoryAnnonce;
    postObjectAnnonce.dateBegin = $scope.dateBeginAnnonce;
    postObjectAnnonce.dateEnd = $scope.dateEndAnnonce;
    postObjectAnnonce.hairColor = $scope.hairColorAnnonce;
    postObjectAnnonce.accessories = 1;
    postObjectAnnonce.lengthHair = $scope.lengthHairAnnonce;
    postObjectAnnonce.skinTone = $scope.skinToneAnnonce;
    postObjectAnnonce.heightMin = $scope.heightMinAnnonce;
    postObjectAnnonce.heightMax = $scope.heightMaxAnnonce;
    postObjectAnnonce.eyeColor = $scope.eyeColorAnnonce;
    postObjectAnnonce.comment = $scope.comment;
    postObjectAnnonce.status = "Active"

    var postObjectAccessories = new Object();
    postObjectAccessories.accessory1 = $scope.accessorie1;
    postObjectAccessories.accessory2 = $scope.accessorie2;
    postObjectAccessories.accessory3 = $scope.accessorie3;
    postObjectAccessories.accessory4 = $scope.accessorie4;
    postObjectAccessories.accessory5 = $scope.accessorie5;

    if ($scope.heightMaxAnnonce >= $scope.heightMinAnnonce) {
      $scope.isHeightNotValidated = false;
      $scope.postAnnonce();
    } else {
      $scope.isHeightNotValidated = true;
    }

    $scope.postAnnonce = function() {
      $http({
        url: "http://localhost:8080/createAnnonce",
        method: "POST",
        dataType: "json",
        data: {annonce: postObjectAnnonce,accessories: postObjectAccessories},
        headers: {
          "Content-Type": "application/json"
        }
      }).success(function successCallback(response) {
          if (response.response == "success") {
            $location.path('/services/'+response.id+'/suggestions');
          } else {
            $scope.messageCreation = "Erreur de création"
          }
        })
        .error(function (data, status) {
          if(data.message == "Accès refusé"){
            $location.path("/accessDenied");
          }else{
            $location.path("/error");
          }
        });
    }
  };

  $scope.addAccessorie = function(accessorie){
    if(!angular.isUndefined(accessorie)){
        if(!$scope.accessorie1){
        $scope.accessorie1 = accessorie;
        angular.element(document.querySelector('#accessorie1')).removeClass('visually-hidden');
        }
      else if(!$scope.accessorie2){
        $scope.accessorie2 = accessorie;
        angular.element(document.querySelector('#accessorie2')).removeClass('visually-hidden');
        } else if(!$scope.accessorie3){
        $scope.accessorie3 = accessorie;
        angular.element(document.querySelector('#accessorie3')).removeClass('visually-hidden');
      } else if(!$scope.accessorie4){
        $scope.accessorie4 = accessorie;
        angular.element(document.querySelector('#accessorie4')).removeClass('visually-hidden');
      } else if(!$scope.accessorie5){
        $scope.accessorie5 = accessorie;
        angular.element(document.querySelector('#accessorie5')).removeClass('visually-hidden');
      } else {
        angular.element(document.querySelector('#messageTooManyAccessories')).removeClass('visually-hidden');
      }
    }

  };

  $scope.deleteAccessorie = function(accessorie){
    angular.element(document.querySelector('#messageTooManyAccessories')).addClass('visually-hidden');
    if(accessorie == 'accessorie1'){
          $scope.accessorie1 = null;
          angular.element(document.querySelector('#accessorie1')).addClass('visually-hidden');
      } else if(accessorie == 'accessorie2'){
        $scope.accessorie2 = null;
        angular.element(document.querySelector('#accessorie2')).addClass('visually-hidden');
      } else if(accessorie == 'accessorie3'){
        $scope.accessorie3 = null;
        angular.element(document.querySelector('#accessorie3')).addClass('visually-hidden');
      } else if(accessorie == 'accessorie4'){
        $scope.accessorie4 = null;
        angular.element(document.querySelector('#accessorie4')).addClass('visually-hidden');
      } else if(accessorie == 'accessorie5'){
        $scope.accessorie5 = null;
        angular.element(document.querySelector('#accessorie5')).addClass('visually-hidden');
      }
  };

  $scope.getCategoriesEnum = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/getCategoriesEnum',
    }).success(function(categories){
      $scope.categoriesEnum = categories;
    }).error(function (data, status) {
      if(data.message == "Accès refusé"){
        $location.path("/accessDenied");
      }else{
        $location.path("/error");
      }
    });
  };

  $scope.getEyeColorEnum = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/getEyeColorEnum',
    }).success(function(eyeColor){
      $scope.eyeColorEnum = eyeColor;
    }).error(function (data, status) {
      if(data.message == "Accès refusé"){
        $location.path("/accessDenied");
      }else{
        $location.path("/error");
      }
    });
  };

  $scope.getLengthHairEnum = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/getLengthHairEnum',
    }).success(function(length){
      $scope.lengthHairEnum = length;
    }).error(function (data, status) {
      if(data.message == "Accès refusé"){
        $location.path("/accessDenied");
      }else{
        $location.path("/error");
      }
    });
  };

  $scope.getSkinToneEnum = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/getSkinToneEnum',
    }).success(function(skinTone){
      $scope.skinToneEnum = skinTone;
    }).error(function (data, status) {
      if(data.message == "Accès refusé"){
        $location.path("/accessDenied");
      }else{
        $location.path("/error");
      }
    });
  };



});


