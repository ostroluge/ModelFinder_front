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
  
});