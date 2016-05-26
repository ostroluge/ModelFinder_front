'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:ModelCtrl
 * @description});
 * # ModelCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('ModelCtrl', function ($scope, $http, $location) {

  $scope.go = function (path) {
    $location.path(path);
  };

  $scope.getIndex = function (model) {
    return $scope.message.indexOf(model);
  };

  $scope.createModel = function () {

    var postObjectModel = new Object();
    postObjectModel.password = $scope.password;
    postObjectModel.lastName = $scope.lastName;
    postObjectModel.name = $scope.name;
    postObjectModel.mail = $scope.mail;
    postObjectModel.dateOfBirth = $scope.dateOfBirth;
    postObjectModel.phoneNumber = $scope.phoneNumber;
    postObjectModel.lengthHair = $scope.lengthHairModel;
    postObjectModel.hairColor = $scope.hairColor;
    postObjectModel.skinTone = $scope.skinToneModel;
    postObjectModel.eyeColor = $scope.eyeColorModel;
    postObjectModel.height = $scope.height;
    postObjectModel.highHeight = $scope.highHeight;
    postObjectModel.lowHeight = $scope.lowHeight;
    postObjectModel.shoeSize = $scope.shoeSize;  
    postObjectModel.comment = $scope.comment;
    postObjectModel.description = $scope.description;   
    if ($scope.gender = "Homme") {
      postObjectModel.gender = "1";
    } else {
      postObjectModel.gender = "2";
    }
    
    
    $http({
      url: "http://localhost:8080/createModel",
      method: "POST",
      dataType: "json",
      data: postObjectModel,
      headers: {
        "Content-Type": "application/json"
      }
    }).success(function successCallback(response) {
        if (response.response == "success") {
            $scope.messageCreation = "création OK"
        } else {
          $scope.messageCreation = "Erreur de création"
        }
      })
      .error(function errorCallback(response) {
        $scope.messageCreation = "Error " + response
      });
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

    $scope.add = function(){
      var f = document.getElementById('file').files[0],
          r = new FileReader();
      r.onloadend = function(e){
        $scope.aa = e.target.result;
      }
      r.readAsArrayBuffer(f);
    }
});


