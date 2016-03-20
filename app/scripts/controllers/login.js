'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('LoginCtrl', function ($scope, $http) {
  $scope.user = {};
  $scope.userName = "";
  $scope.userPassword = "";

  $scope.authenticate = function () {

    var postObject = new Object();
    postObject.mail = $scope.userName;
    postObject.password = $scope.userPassword;

    $http({
      url: "http://localhost:8080/login",
      method: "POST",
      dataType: "json",
      data: postObject,
      headers: {
        "Content-Type": "application/json"
      }
    }).success(function successCallback(response) {
        if (response.response == "success") {
          $scope.messageAuth = "Login successful"
        } else {
          $scope.messageAuth = "Login failed"
        }
      })
      .error(function errorCallback(response) {
        $scope.messageAuth = "Error " + response
      });
  };
});
