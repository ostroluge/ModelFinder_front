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
		  }).error(function(){
		    alert("error");
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
  
});