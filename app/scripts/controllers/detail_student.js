'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:DetailSudentCtrl
 * @description});
 * # DetailStudentCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('DetailStudentCtrl', function ($http,$scope, $routeParams,$location) {

  $http({
    method: 'GET',
    url: 'http://localhost:8080/StudentById/' + $routeParams.id_student
  }).success(function (data) {
    $scope.student = data;   
  }).error(function () {
    alert("error");
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

  $scope.go = function (path) {
    $location.path(path);
  };

  $scope.enableStudent = function (id) {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/ValidateStudent/' + id,
    }).success(function (response) {
          if (response.response === "success") {
            console.log("OK");
            $scope.student.isValidated = true;
          } else {
            console.log("KO");
          }
        })
        .error(function errorCallback(response) {
          console.log("Error");
          $scope.etatDemande = "Error " + response
        });
  };

  $scope.deleteStudent = function (id) {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/DeleteStudent/' + id,
    }).success(function (response) {
          if (response.response === "success") {
            console.log("OK");
            go('/students');
          } else {
            console.log("KO");
          }
        })
        .error(function errorCallback(response) {
          console.log("Error");
          $scope.etatDemande = "Error " + response
        });
  };

  $scope.modifyStudent = function () {
    $http({
          url: "http://localhost:8080/SaveStudent",
          method: "POST",
          dataType: "json",
          data: $scope.student,
          headers: {
            "Content-Type": "application/json"
          }
        }).success(function successCallback(response) {
            if (response.response == "success") {
              console.log("OK");
              $scope.go('/students/'+$routeParams.id_student+'/show');
            } else {
              console.log("KO");
            }
          })
          .error(function errorCallback(response) {
            console.log("Error");
          });
 }

});

