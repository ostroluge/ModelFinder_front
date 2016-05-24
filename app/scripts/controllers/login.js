'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('LoginCtrl', ['$scope', '$http', '$cookies', '$location',
  function ($scope, $http, $cookies, $location) {
    $scope.user = {};
    $scope.userName = "";
    $scope.userPassword = "";

    $scope.isAuthenticated = ($cookies.getObject('authenticatedUser') != null);

    if ($scope.isAuthenticated) {
      $scope.userToShow = $cookies.getObject('authenticatedUser');
    }

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
      }).success(function successCallback(response, status) {
          if (status == 200) {
            $scope.messageAuth = "Login successful"

            var user = new Object();
            user.mail = response.mail;
            user.role = response.role;
            user.isValidated = response.isValidated;

            $cookies.putObject('authenticatedUser', user);

            $scope.go('/services');
          }
        })
        .error(function errorCallback(error, status) {
          if (status == 401) {
            $scope.messageAuth = "Mauvaise combinaison login/mot de passe";
          } else {
            $scope.messageAuth = "Error " + response;
          }
        });
    };

    $scope.go = function (path) {
      $location.path(path);
    };
  }]);
