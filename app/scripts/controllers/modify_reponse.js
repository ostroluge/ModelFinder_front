'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:ModifyReponseCtrl
 * @description});
 * # ApplyCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('ModifyReponseCtrl', function ($scope, $http, $location, $routeParams) {

  $scope.getReponseDetailAnnonce = function () {

    $http({
      method: 'GET',
      url: 'http://localhost:8080/OneReponse/' + $routeParams.id_reponse,
    }).success(function (rep) {
        $scope.laReponse = rep;

      $http({
        method: 'GET',
        url: 'http://localhost:8080/detailAnnonce/' + $scope.laReponse.annonce.id,
      }).success(function (data) {

        $scope.titre = data.annonce.title;
        $scope.statusAnnonce = data.annonce.status;
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
            idDeLaReponse: $scope.laReponse.id,
            checkedNonTraite: $scope.laReponse.statusAccessory1,
            checked: statusAccesToCheck($scope.laReponse.statusAccessory1)
          };
          $scope.checkList.push(element1);
        }
        if (data.accessories.accessory2 != null) {
          var element2 = {
            name: data.accessories.accessory2,
            idDeLaReponse: $scope.laReponse,
            checkedNonTraite: $scope.laReponse.statusAccessory2,
            checked: statusAccesToCheck($scope.laReponse.statusAccessory2),
          };
          $scope.checkList.push(element2);
        }
        if (data.accessories.accessory3 != null) {
          var element3 = {
            name: data.accessories.accessory3,
            idDeLaReponse: $scope.laReponse.id,
            checkedNonTraite: $scope.laReponse.statusAccessory3,
            checked: statusAccesToCheck($scope.laReponse.statusAccessory3)
          };
          $scope.checkList.push(element3);
        }
        if (data.accessories.accessory4 != null) {
          var element4 = {
            name: data.accessories.accessory4,
            idDeLaReponse: $scope.laReponse.id,
            checkedNonTraite: $scope.laReponse.statusAccessory4,
            checked: statusAccesToCheck($scope.laReponse.statusAccessory4)
          };
          $scope.checkList.push(element4);
        }
        if (data.accessories.accessory5 != null) {
          var element5 = {
            name: data.accessories.accessory5,
            idDeLaReponse: $scope.laReponse.id,
            checkedNonTraite: $scope.laReponse.statusAccessory5,
            checked: statusAccesToCheck($scope.laReponse.statusAccessory5)
          };
          $scope.checkList.push(element5);
        }

      }).error(function () {
        alert("Error Annonce");
      });
    }).error(function () {
        alert("Error Reponse");
    });

  };

  function statusAccesToCheck(statusAccess) {
    if (statusAccess == "Ok") {
      return 1;
    }
    else if (statusAccess == "Ko"){
      return 0;
    }
    else {
      return 'erreur';
    }
  };  

  $scope.go = function (path) {
    $location.path(path);
  };

  $scope.modifyReponse = function () {

 //   $scope.reponse.comment = $scope.comment;

    if ($scope.checkList[0] != null) {
      if ($scope.checkList[0].checked == 0) {
        $scope.laReponse.statusAccessory1 = "Ko";
      } else if ($scope.checkList[0].checked == 1) {
        $scope.laReponse.statusAccessory1 = "Ok";
      }
    }

    if ($scope.checkList[1] != null) {
      if ($scope.checkList[1].checked == 0) {
        $scope.laReponse.statusAccessory2 = "Ko";
      } else if ($scope.checkList[1].checked == 1) {
        $scope.laReponse.statusAccessory2 = "Ok";
      }
    }

    if ($scope.checkList[2] != null) {
      if ($scope.checkList[2].checked == 0) {
        $scope.laReponse.statusAccessory3 = "Ko";
      } else if ($scope.checkList[2].checked == 1) {
        $scope.laReponse.statusAccessory3 = "Ok";
      }
    }

    if ($scope.checkList[3] != null) {
      if ($scope.checkList[3].checked == 0) {
        $scope.laReponse.statusAccessory4 = "Ko";
      } else if ($scope.checkList[3].checked == 1) {
        $scope.laReponse.statusAccessory4 = "Ok";
      }
    }

    if ($scope.checkList[4] != null) {
      if ($scope.checkList[4].checked == 0) {
        $scope.laReponse.statusAccessory5 = "Ko";
      } else if ($scope.checkList[0].checked == 1) {
        $scope.laReponse.statusAccessory5 = "Ok";
      }
    }

    
      $http({
        url: "http://localhost:8080/modifyReponse",
        method: "POST",
        dataType: "json",
        data: $scope.laReponse,
        headers: {
          "Content-Type": "application/json"
        }
      }).success(function successCallback(response) {
          if (response.response == "success") {
            console.log("OK");
            $scope.go('/monitoring/proposals');
          } else {
            console.log("KO");
          }
        })
        .error(function errorCallback(response) {
          console.log("Error");
        });
    
  };

});
