'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('LogoutCtrl', ['$scope', '$cookies', '$location',
  function($scope, $cookies, $location) {
    if ($cookies.getObject('authenticatedUser') != null) {
      $cookies.remove('authenticatedUser');
    }

    $scope.messageLogout = "La déconnexion a fonctionné";

    $scope.go = function (path) {
      $location.path(path);
    };
  }]);
