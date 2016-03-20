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

    //var data = JSON.stringify({
    //  email: $scope.userName,
    //  password: $scope.userPassword
    //});
    //
    //$scope.send = data

    var postObject = new Object();
    postObject.mail = $scope.userName;
    postObject.password = $scope.userPassword;

    var jsonString = "Hello";
    var jsonLol = JSON.stringify(jsonString);
    jsonLol = JSON.parse(jsonLol);

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
