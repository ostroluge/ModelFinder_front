'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:ModifyAnnonceCtrl
 * @description});
 * # ModifyAnnonceCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('ModifyAnnonceCtrl', function ($scope, $http, $location, $routeParams) {

  $scope.getDetailAnnonce = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/detailAnnonce/' + $routeParams.idAnnonce,
    }).success(function (data) {

      $scope.id = data.id;
      $scope.etudiant_id = data.idStudent;
      $scope.accessoriesAnnonce = data.idAccessories;
      $scope.titleAnnonce = data.title;
      $scope.dateBeginAnnonce = new Date(data.dateBegin);
      $scope.durationAnnonce = data.dateEnd;
      $scope.categoryAnnonce = data.categoryService;
      $scope.themeAnnonce = data.themeService;
      $scope.skinToneAnnonce = data.skinTone;
      $scope.eyeColorAnnonce = data.eyeColor;
      $scope.hairColorAnnonce = data.hairColor;
      $scope.lengthHairAnnonce = data.lengthHair;
      $scope.heightMinAnnonce = data.heightMin;
      $scope.heightMaxAnnonce = data.heightMax;
      $scope.comment = data.comment;

    }).error(function () {
      alert("error");
    });
  };

  $scope.updateAnnonce = function () {

    var postObject = new Object();
    postObject.id= $routeParams.idAnnonce;
    postObject.title = $scope.titleAnnonce;
    postObject.themeService = $scope.themeAnnonce;
    postObject.categoryService = $scope.categoryAnnonce;
    postObject.dateBegin = $scope.dateBeginAnnonce;
    postObject.duration = $scope.durationAnnonce;
    postObject.accessories = $scope.accessoriesAnnonce;
    postObject.hairColor = $scope.hairColorAnnonce;
    postObject.lengthHair = $scope.lengthHairAnnonce;
    postObject.skinTone = $scope.skinToneAnnonce;
    postObject.heightMin = $scope.heightMinAnnonce;
    postObject.heightMax = $scope.heightMaxAnnonce;
    postObject.eyeColor = $scope.eyeColorAnnonce;
    postObject.comment = $scope.comment;

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
          $location.path("/annonces");
        } else {
          $scope.messageUpdate = "Erreur d'édition"
        }
      })
      .error(function errorCallback(response) {
        $scope.messageUpdate= "Error " + response
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
