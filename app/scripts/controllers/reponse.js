'use strict';



modelFinderApp.controller('ReponseCtrl', function ($scope) {

  $scope.getAllReponses = function () {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/reponseList',
    }).success(function (data) {
      $scope.message = data;
    }).error(function () {
      alert("error");
    });
  };
}