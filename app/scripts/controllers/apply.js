'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:ApplyCtrl
 * @description});
 * # ApplyCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('ApplyCtrl', function ($scope, $http, $location, $routeParams) {

  $scope.getDetailAnnonce = function () {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/detailAnnonce/' + $routeParams.id_annonce,
    }).success(function (data) {

      $scope.titre = data.annonce.title;
      $scope.status = data.annonce.status;
      $scope.accessories = {
        accessory1: data.accessories.accessory1,
        accessory2: data.accessories.accessory2,
        accessory3: data.accessories.accessory3,
        accessory4: data.accessories.accessory4,
        accessory5: data.accessories.accessory5
      };

      $scope.checkList = [];

      if (data.accessories.accessory1 != null) {
        var element1 = {
          name: data.accessories.accessory1,
          checked: 0
        };
        $scope.checkList.push(element1);
      }
      if (data.accessories.accessory2 != null) {
        var element2 = {
          name: data.accessories.accessory2,
          checked: 0
        };
        $scope.checkList.push(element2);
      }
      if (data.accessories.accessory3 != null) {
        var element3 = {
          name: data.accessories.accessory3,
          checked: 0
        };
        $scope.checkList.push(element3);
      }
      if (data.accessories.accessory4 != null) {
        var element4 = {
          name: data.accessories.accessory4,
          checked: 0
        };
        $scope.checkList.push(element4);
      }
      if (data.accessories.accessory5 != null) {
        var element5 = {
          name: data.accessories.accessory5,
          checked: 0
        };
        $scope.checkList.push(element5);
      }

    }).error(function (data, status) {
      if(data.message == "Accès refusé"){
        $location.path("/accessDenied");
      }else{
        $location.path("/error");
      }
    });
  };

  $scope.go = function (path) {
    $location.path(path);
  };

  $scope.postApplication = function () {

    var postObject = new Object();
    postObject.idModel = $scope.idModel;
    postObject.idAnnonce = $routeParams.id_annonce;
    postObject.comment = $scope.comment;

    if ($scope.checkList[0] != null) {
      if ($scope.checkList[0].checked == 0) {
        postObject.accessory1 = null;
      } else if ($scope.checkList[0].checked == 1) {
        postObject.accessory1 = "Ok";
      }
    }

    if ($scope.checkList[1] != null) {
      if ($scope.checkList[1].checked == 0) {
        postObject.accessory2 = null;
      } else if ($scope.checkList[1].checked == 1) {
        postObject.accessory2 = "Ok";
      }
    }

    if ($scope.checkList[2] != null) {
      if ($scope.checkList[2].checked == 0) {
        postObject.accessory3 = null;
      } else if ($scope.checkList[2].checked == 1) {
        postObject.accessory3 = "Ok";
      }
    }

    if ($scope.checkList[3] != null) {
      if ($scope.checkList[3].checked == 0) {
        postObject.accessory4 = null;
      } else if ($scope.checkList[3].checked == 1) {
        postObject.accessory4 = "Ok";
      }
    }

    if ($scope.checkList[4] != null) {
      if ($scope.checkList[4].checked == 0) {
        postObject.accessory5 = null;
      } else if ($scope.checkList[0].checked == 1) {
        postObject.accessory5 = "Ok";
      }
    }

    if (postObject.idModel != null) {
      $http({
        url: "http://localhost:8080/apply",
        method: "POST",
        dataType: "json",
        data: postObject,
        headers: {
          "Content-Type": "application/json"
        }
      }).success(function successCallback(response) {
          if (response.response == "success") {
            console.log("OK");
            $scope.go('/annonces');
          } else if(response.response == "already apply"){
            $scope.alreadyApply = "Already Apply";
          } else {
            console.log("KO");
          }
        }).error(function (data, status) {
            if(data.message == "Accès refusé"){
              $location.path("/accessDenied");
            }else{
              $location.path("/error");
            }
        });
    }
  };

});
