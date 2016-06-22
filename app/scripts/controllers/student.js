'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:StudentCtrl
 * @description
 * # StudentCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('StudentCtrl', function ($scope, $http, $location) {

   $scope.getAllStudents = function () {
	    $http({
	    method: 'GET',
	    url: 'http://localhost:8080/userStudentListWaitingVal',
		  }).success(function(data){
		    $scope.studentsWaitingVal = data;
        $http({
        method: 'GET',
        url: 'http://localhost:8080/userStudentListVal',
        }).success(function(data){
          $scope.studentsVal = data;
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

  $scope.go = function (path) {
    $location.path(path);
  };

	function StudentsWaitingValToVal(us) {
	  $scope.studentsWaitingVal.splice($scope.studentsWaitingVal.indexOf(us), 1);
    us.user.isValidated=true;
    $scope.studentsVal.push(us);
	};

  $scope.enableStudent = function (us) {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/validateStudent/' + us.user.id,
    }).success(function (response) {
          if (response.response == "success") {
            console.log("OK");
            StudentsWaitingValToVal(us);
          } else {
            console.log("KO");
          }
        }).error(function (data, status) {
            if(data.message == "Accès refusé"){
              $location.path("/accessDenied");
            }else{
              $location.path("/error");
            }
          });
  };

  $scope.deleteStudent = function (id) {
    if (confirm("Voulez vous vraiment supprimer cet étudiant ?")) { 
        $http({
        method: 'GET',
        url: 'http://localhost:8080/deleteStudent/' + id,
      }).success(function (response) {
            if (response.response === "success") {
              console.log("OK");
              $scope.getAllStudents();
            } else {
              console.log("KO");
            }
          })
          .error(function errorCallback(response) {
            console.log("Error");
            $scope.etatDemande = "Error " + response
          });
      }
    else{
      $scope.getAllStudents();
    }
  };

    $scope.createStudent = function () {


    var postObjectStudent = new Object();
    postObjectStudent.lastName = $scope.lastName;
    postObjectStudent.firstName = $scope.firstName;
    postObjectStudent.birthDate = new Date($scope.birthDate);

    var postObjectUser = new Object();
    postObjectUser.password = $scope.password;
    postObjectUser.role = "student";
    postObjectUser.mail = $scope.mail;
    postObjectUser.isValidated = "false";



    $http({

      url: "http://localhost:8080/saveStudent",
      method: "POST",
      dataType: "json",
      data: {user: postObjectUser, student: postObjectStudent},
      headers: {
        "Content-Type": "application/json"
      }
    }).success(function successCallback(response) {
        if (response.response == "success") {
          $scope.go('/login');
        } else {
          $scope.messageCreation = "Erreur de création"
        }
      })
      .error(function errorCallback(response) {
        $scope.messageCreation = "Error " + response
      });
    };

    $scope.checkPwd = function(pwd1, pwd2) {
        if(pwd1==pwd2){
            $scope.createStudent();
        } else {
            $scope.confirmationMdp = "Veuillez saisir 2 mots de passe identiques";
        }
    };

});
