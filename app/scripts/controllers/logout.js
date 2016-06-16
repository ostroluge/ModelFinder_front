
'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('LogoutCtrl', ['$scope', '$cookies', '$location', '$http',
  function ($scope, $cookies, $location, $http) {
    if ($cookies.getObject('authenticatedUser') != null) {
      $cookies.remove('authenticatedUser');
    }

    $http({
      url: "http://localhost:8080/logout",
      method: "POST",
      dataType: "json",
      headers: {
        "Content-Type": "application/json"
      }}).success(function successCallback(response, status) {
        if (status == 200) {
          $scope.password="";
          $scope.userName="";
          $cookies.remove('authenticatedUser');
          $scope.go('/login');
        }
      })
      .error(function errorCallback(error, status) {
        $scope.messageLogout = error;
      });

    $scope.go = function (path) {
      $location.path(path);
    };

  }]);
