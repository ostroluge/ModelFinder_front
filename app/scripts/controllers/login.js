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

    $scope.go = function (path) {
      $location.path(path);
    };

    if ($scope.isAuthenticated()) {
      $scope.go('/services');
    }

    $scope.authenticate = function () {

      var postObject = new Object();
      postObject.mail = $scope.userName;
      postObject.password = $scope.userPassword;

      var f = function() {
        $http.get('http://localhost:8080/user').success(function successCallback(response) {
          console.log("Reponse login user : "  + response.response);
          $scope.go('/services');
        }).error(function() {
          console.log('error');
        })
      };

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
            f();
            var user = new Object();
            user.id = response.id;
            user.mail = response.mail;
            user.role = response.role;
            user.isValidated = response.isValidated;

            $cookies.putObject('authenticatedUser', user);
          }
        })
        .error(function errorCallback(error, status) {
          if (status == 401) {
            $scope.messageAuth = "Mauvaise combinaison login/mot de passe";
          } else if (status == 412) {
            $scope.messageAuth = "Compte en attente de validation";
          } else {
            $scope.messageAuth = "Error " + response;
          }
        });
    };
  }]);
