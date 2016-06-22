'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:RoleCtrl
 * @description});
 * # RoleCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('RoleCtrl', function ($scope, $cookies) {

  $scope.isAuthenticated = function () {
    return ($cookies.getObject('authenticatedUser') != null);
  };

  $scope.getMail = function () {
    if ($scope.isAuthenticated()) {
      return ($cookies.getObject('authenticatedUser').mail);
    }
  };

  $scope.getId = function () {
    if ($scope.isAuthenticated()) {
      return ($cookies.getObject('authenticatedUser').id);
    }
  };

  $scope.isAdmin = function () {
    if ($scope.isAuthenticated()) {
      return ($cookies.getObject('authenticatedUser').role === 'admin');
    }
    return false;
  };

  $scope.isModel = function () {
    if ($scope.isAuthenticated()) {
      return ($cookies.getObject('authenticatedUser').role === 'model');
    }
    return false;
  };

  $scope.isStudent = function () {
    if ($scope.isAuthenticated()) {
      return ($cookies.getObject('authenticatedUser').role === 'student');
    }
    return false;
  };

  $scope.isStudentWithId = function (id) {
    if ($scope.isAuthenticated()) {
      return ($cookies.getObject('authenticatedUser').role === 'student') &&
        ($cookies.getObject('authenticatedUser').id === id);
    }
    return false;
  }

});
