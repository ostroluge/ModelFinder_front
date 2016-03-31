'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:AnnonceCtrl
 * @description});
 * # AnnonceCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('AnnonceCtrl', function ($scope, $http, $location) {

  $scope.getAllAnnonces = function () {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/annonceList',
    }).success(function (data) {
      $scope.message = data;
    }).error(function () {
      alert("error");
    });
  };


  $scope.go = function (path) {
    $location.path(path);
  };

  $scope.getIndex = function (annonce) {
    return $scope.message.indexOf(annonce);
  };

  $scope.createAnnonce = function () {

    var postObject = new Object();
    postObject.title = $scope.titleAnnonce;
    postObject.themeService = $scope.themeAnnonce;
    postObject.categoryService = $scope.categoryAnnonce;
    postObject.dateBegin = $scope.dateBeginAnnonce;
    postObject.dateEnd = $scope.dateEndAnnonce;
    postObject.accessories = $scope.accessoriesAnnonce;
    postObject.hairColor = $scope.hairColorAnnonce;
    postObject.lengthHair = $scope.lengthHairAnnonce;
    postObject.skinTone = $scope.skinToneAnnonce;
    postObject.heightMin = $scope.heightMinAnnonce;
    postObject.heightMax = $scope.heightMaxAnnonce;
    postObject.eyeColor = $scope.eyeColorAnnonce;

    $http({
      url: "http://localhost:8080/createAnnonce",
      method: "POST",
      dataType: "json",
      data: postObject,
      headers: {
        "Content-Type": "application/json"
      }
    }).success(function successCallback(response) {
        if (response.response == "success") {
          $scope.messageCreation = "Annonce créée"
        } else {
          $scope.messageCreation = "Erreur de création"
        }
      })
      .error(function errorCallback(response) {
        $scope.messageCreation = "Error " + response
      });
  };

  $scope.getCategoriesEnum = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/getCategoriesEnum',
    }).success(function(categories){
      $scope.categoriesEnum = categories;
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

});


