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

    var data = JSON.stringify({
      email: $scope.userName,
      password: $scope.userPassword
    });

    $scope.send = data

    var postObject = new Object();
    postObject.email = $scope.userName;
    postObject.password = $scope.userPassword;

    $http({
      url: 'http://localhost:8080/login',
      method: 'POST',
      data: postObject,
      headers: [{'Content-Type': 'application/json'}]
    }).success(function successCallback(response) {
        $scope.messageAuth = "Login successful"
      })
      .error(function errorCallback(response) {
        $scope.messageAuth = "Login failed"
      });

    //$http.post('http://localhost:8080/login', data)
    //  .success(function successCallback(response) {
    //    $scope.messageAuth = "Login successful"
    //  })
    //  .error(function errorCallback(response) {
    //    $scope.messageAuth = "Login failed"
    //  })
  };
});
