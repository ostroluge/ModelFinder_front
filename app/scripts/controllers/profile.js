'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:ProfileCtrl
 * @description});
 * # ProfileCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('ProfileCtrl', function ($scope, $cookies) {

  $scope.isAuthenticated = ($cookies.getObject('authenticatedUser') != null);

  if ($scope.isAuthenticated) {
    $scope.userToShow = $cookies.getObject('authenticatedUser');
  }
});
