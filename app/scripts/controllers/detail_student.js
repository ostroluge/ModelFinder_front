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
    url: 'http://localhost:8080/studentById/' + $routeParams.id_student
  }).success(function (data) {
    $scope.student = data.student;
    $scope.user = data.user;
    $scope.password = '';
    $scope.passwordConf = '';
    $scope.student.birthDate = new Date($scope.student.birthDate);
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

  $scope.go = function (path) {
    $location.path(path);
  };

  $scope.enableStudent = function (id) {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/validateStudent/' + id,
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
      url: 'http://localhost:8080/deleteStudent/' + id,
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

    $scope.checkPwdModify = function(pwd1, pwd2) {
    if(pwd1==pwd2){ //Mots de passe identique
      if(pwd1==''){ //Si aucune modif : mot de passe deja renseigné et crypté
        $scope.modifyStudent();
      } else {//Si modif du mdp
        $scope.user.password=pwd1;
        $scope.modifyStudentPassword();
      }

    }
    else{
      $scope.passwordError = "Veuillez entrer deux mots de passe identiques";
    }
  }

  $scope.modifyStudent = function () {
    $http({
          url: "http://localhost:8080/modifyStudent",
          method: "POST",
          dataType: "json",
          data: {student:$scope.student, user:$scope.user},
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

   $scope.modifyStudentPassword = function () {
    $http({
          url: "http://localhost:8080/modifyStudentAndPassword",
          method: "POST",
          dataType: "json",
          data: {student:$scope.student, user:$scope.user},
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

