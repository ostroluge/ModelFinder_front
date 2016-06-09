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
	    url: 'http://localhost:8080/studentList',
		  }).success(function(data){
		    $scope.students = data;
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

	function indexStudentInStudents(id) {
	  for (var i = 0; i < $scope.students.length; i++) {
	    if ($scope.students[i].id == id) {
	      return i;
	    }
	  }
	  return -1;
	};

  $scope.enableStudent = function (id) {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/ValidateStudent/' + id,
    }).success(function (response) {
          if (response.response === "success") {
            console.log("OK");
            $scope.students[indexStudentInStudents(id)].isValidated=true;
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
    $http({
      method: 'GET',
      url: 'http://localhost:8080/DeleteStudent/' + id,
    }).success(function (response) {
          if (response.response === "success") {
            console.log("OK");
            $scope.getAllStudents();
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

    $scope.createStudent = function () {


    var postObjectStudent = new Object();
    postObjectStudent.password = $scope.password;
    postObjectStudent.lastName = $scope.lastName;
    postObjectStudent.firstName = $scope.firstName;
    postObjectStudent.mail = $scope.mail;
    postObjectStudent.birthDate = $scope.birthDate;
    postObjectStudent.isValidated = "false";
    $http({
      url: "http://localhost:8080/SaveStudent",
      method: "POST",
      dataType: "json",
      data: postObjectStudent,
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
  
});
