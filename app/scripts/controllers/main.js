'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('MainCtrl', function ($scope, $cookies) {
  //$http({
  //  method: 'GET',
  //  url: 'http://localhost:8080/adminList',
  //}).success(function(data){
  //  $scope.message = data;
  //}).error(function(){
  //  alert("error");
  //});

  $scope.cookieValue = $cookies.getObject('authenticatedUser');

});
