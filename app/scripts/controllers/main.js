'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('MainCtrl', function ($scope, $cookies) {

  $scope.cookieValue = $cookies.getObject('authenticatedUser');

});
