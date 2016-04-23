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
    $scope.message = data;
    $scope.lastName = data.lastName;
    $scope.name = data.name;
    $scope.mail = data.mail;
    $scope.dateOfBirth = data.dateOfBirth;
    if (data.gender == 1) {
      $scope.gender = "Homme";
    } else {
      $scope.gender = "Femme";
    }
    $scope.phoneNumber = data.phoneNumber;
    $scope.skinTone = data.skinTone;
    $scope.hairColor = data.hairColor;
    $scope.eyeColor = data.eyeColor;
    $scope.lengthHair = data.lengthHair;
    $scope.height = data.height;
    $scope.shoeSize = data.shoeSize;
    $scope.highHeight = data.highHeight;
    $scope.lowHeight = data.lowHeight;
    $scope.description = data.description;
    $scope.comment = data.comment;

  }).error(function () {
    alert("error");
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

  function dateDiff(d1, d2) {
    return new Number((d2.getTime() - d1.getTime()) / 31536000000).toFixed(0);
  };

});

