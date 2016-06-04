'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:DetailSudentCtrl
 * @description});
 * # DetailStudentCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('DetailStudentCtrl', function ($http,$scope, $routeParams) {

  $http({
    method: 'GET',
    url: 'http://localhost:8080/StudentById/' + $routeParams.id_student
  }).success(function (data) {
    $scope.message = data;
    $scope.lastName = data.lastName;
    $scope.firstName = data.firstName;
    if (data.isValidated == false) {
      $scope.etat = "Compte en attente de validation";
    } else {
      $scope.etat = "Compte validé";
    }
    $scope.idStudent = data.idStudent;
    $scope.mail = data.mail;
    $scope.birthDate = data.birthDate;
  }).error(function (data, status) {
    if(data.message == "Accès refusé"){
      $location.path("/accessDenied");
    }else{
      $location.path("/error");
    }
  });

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

