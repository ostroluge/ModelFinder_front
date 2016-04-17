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

      console.log(data);
      $scope.id = data.annonce.id;
      $scope.etudiant_id = data.annonce.idStudent;
      $scope.accessoriesAnnonce = data.annonce.idAccessories;
      $scope.titleAnnonce = data.annonce.title;
      $scope.dateBeginAnnonce = new Date(data.annonce.dateBegin);
      $scope.dateEndAnnonce = new Date(data.annonce.dateEnd);
      $scope.accessories = data.annonce.accessories;
      $scope.categoryAnnonce = data.annonce.categoryService;
      $scope.themeAnnonce = data.annonce.themeService;
      $scope.skinToneAnnonce = data.annonce.skinTone;
      $scope.eyeColorAnnonce = data.annonce.eyeColor;
      $scope.hairColorAnnonce = data.annonce.hairColor;
      $scope.lengthHairAnnonce = data.annonce.lengthHair;
      $scope.heightMinAnnonce = data.annonce.heightMin;
      $scope.heightMaxAnnonce = data.annonce.heightMax;
      $scope.comment = data.annonce.comment;

      $scope.idAccessories = data.accessories.idAccessories;

      if(data.accessories.accessory1 != null) {
        $scope.accessorie1 = data.accessories.accessory1;
        angular.element(document.querySelector('#accessorie1')).removeClass('visually-hidden');
      } if(data.accessories.accessory2 != null){
        $scope.accessorie2 = data.accessories.accessory2;
        angular.element(document.querySelector('#accessorie2')).removeClass('visually-hidden');
      } if(data.accessories.accessory3 != null){
        $scope.accessorie3 = data.accessories.accessory3;
        angular.element(document.querySelector('#accessorie3')).removeClass('visually-hidden');
      } if(data.accessories.accessory4 != null){
        $scope.accessorie4 = data.accessories.accessory4;
        angular.element(document.querySelector('#accessorie4')).removeClass('visually-hidden');
      } if(data.accessories.accessory5 != null){
        $scope.accessorie5 = data.accessories.accessory5;
        angular.element(document.querySelector('#accessorie5')).removeClass('visually-hidden');
      }

    }).error(function () {
      alert("error");
    });
  };

  $scope.updateAnnonce = function () {

    var postObjectAnnonce = new Object();
    postObjectAnnonce.id= $routeParams.idAnnonce;
    postObjectAnnonce.title = $scope.titleAnnonce;
    postObjectAnnonce.themeService = $scope.themeAnnonce;
    postObjectAnnonce.categoryService = $scope.categoryAnnonce;
    postObjectAnnonce.accessories = $scope.accessories;
    postObjectAnnonce.dateBegin = $scope.dateBeginAnnonce;
    postObjectAnnonce.dateEnd = $scope.dateEndAnnonce;
    postObjectAnnonce.hairColor = $scope.hairColorAnnonce;
    postObjectAnnonce.lengthHair = $scope.lengthHairAnnonce;
    postObjectAnnonce.skinTone = $scope.skinToneAnnonce;
    postObjectAnnonce.heightMin = $scope.heightMinAnnonce;
    postObjectAnnonce.heightMax = $scope.heightMaxAnnonce;
    postObjectAnnonce.eyeColor = $scope.eyeColorAnnonce;
    postObjectAnnonce.comment = $scope.comment;

    var postObjectAccessories = new Object();
    postObjectAccessories.idAccessories = $scope.idAccessories;
    postObjectAccessories.accessory1 = $scope.accessorie1;
    postObjectAccessories.accessory2 = $scope.accessorie2;
    postObjectAccessories.accessory3 = $scope.accessorie3;
    postObjectAccessories.accessory4 = $scope.accessorie4;
    postObjectAccessories.accessory5 = $scope.accessorie5;

    $http({
      url: "http://localhost:8080/updateAnnonce",
      method: "POST",
      dataType: "json",
      data: {annonce: postObjectAnnonce,accessories: postObjectAccessories},
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
      $scope.accessorie1 = "";
      angular.element(document.querySelector('#accessorie1')).addClass('visually-hidden');
    } else if(accessorie == 'accessorie2'){
      $scope.accessorie2 = "";
      angular.element(document.querySelector('#accessorie2')).addClass('visually-hidden');
    } else if(accessorie == 'accessorie3'){
      $scope.accessorie3 = "";
      angular.element(document.querySelector('#accessorie3')).addClass('visually-hidden');
    } else if(accessorie == 'accessorie4'){
      $scope.accessorie4 = "";
      angular.element(document.querySelector('#accessorie4')).addClass('visually-hidden');
    } else if(accessorie == 'accessorie5'){
      $scope.accessorie5 = "";
      angular.element(document.querySelector('#accessorie5')).addClass('visually-hidden');
    }
  };
});
