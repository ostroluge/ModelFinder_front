'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:DetailModelCtrl
 * @description});
 * # DetailModelCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('DetailModelCtrl', function ($scope, $http, $location, $routeParams) {

  $http({
    method: 'GET',
    url: 'http://localhost:8080/detailModel/' + $routeParams.id_model
  }).success(function (data) {
    $scope.model = data.model;
    $scope.user = data.user;
  
    $scope.model.id = data.model.id;
    $scope.model.lastName = data.model.lastName;
    $scope.model.dateOfBirth = new Date(data.model.dateOfBirth);
    $scope.model.name = data.model.name;
    $scope.model.mail=data.model.mail;    
    $scope.model.phoneNumber=data.model.phoneNumber;
    $scope.model.skinTone=data.model.skinTone;
    $scope.model.hairColor=data.model.hairColor;
    $scope.model.eyeColor=data.model.eyeColor;
    $scope.model.lengthHair=data.model.lengthHair;
    $scope.model.height=data.model.height;
    $scope.model.shoeSize=data.model.shoeSize;
    $scope.model.highHeight=data.model.highHeight;
    $scope.model.lowHeight=data.model.lowHeight;
    $scope.model.description=data.model.description;
    $scope.model.comment=data.model.comment
    
     if (data.model.gender == 1) {
      $scope.sexe = "Homme";
    } else {
      $scope.sexe = "Femme";
    }
    $scope.sexes=['Femme','Homme'];

    if(data.model.modelPhoto[0]){
    $scope.file1 = data.model.modelPhoto[0].file;
     }
    if(data.model.modelPhoto[1]){
    $scope.file2 = data.model.modelPhoto[1].file;
    }
    if(data.model.modelPhoto[2]){
    $scope.file3 = data.model.modelPhoto[2].file;
    }
  }).error(function (data, status) {
    if(data.message == "Accès refusé"){
      $location.path("/accessDenied");
    }else{
      $location.path("/error");
    }
  });

  $scope.go = function (path) {
    $location.path(path);
  };

  $scope.calculerAge = function (dateOfBirth) {
    var maintenant = new Date();
    var birth = new Date(dateOfBirth);
    var age = dateDiff(birth, maintenant);
    return age;
  };

  $scope.intToSexe = function (int) {
    if (int==1){
      return "Homme"
    }
    else{
      return "Femme"
    }
  };

  function dateDiff(d1, d2) {
    return new Number((d2.getTime() - d1.getTime()) / 31536000000).toFixed(0);
  };

  $scope.checkPwdModify = function(pwd1, pwd2) {
    if(pwd1==pwd2){ //Mots de passe identique
      if(pwd1==''){ //Si aucune modif : mot de passe deja renseigné et crypté
        $scope.modifyModel();
      } else {//Si modif du mdp
        $scope.user.password=pwd1;
        $scope.modifyModelPassword();
      }

    }
    else{
      $scope.passwordError = "Veuillez entrer deux mots de passe identiques";
    }
  }

  $scope.modifyModel = function () {
    if ($scope.sexe == "Homme") {
      $scope.model.gender = 1;
    } else {
      $scope.model.gender = 2;
    }
      
      if ($scope.i0!=null){
      var photo0 = {file:$scope.i0};
      console.log($scope.i0);
      $scope.model.modelPhoto[0]=photo0;
       }
      if ($scope.i1!=null){
      var photo1 = {file:$scope.i1};
      $scope.model.modelPhoto[1]=photo1;
      console.log($scope.i1);
      }
      if ($scope.i2!= null){
      var photo2 = {file:$scope.i2};
      $scope.model.modelPhoto[2]=photo2;
      console.log($scope.i2);
      }
      
      console.log($scope.model);
    $http({
          url: "http://localhost:8080/modifyModel",
          method: "POST",
          dataType: "json",
          data: {model:$scope.model, user:$scope.user},
          headers: {
            "Content-Type": "application/json"
          }
        }).success(function successCallback(response) {
            if (response.response == "success") {
              console.log("OK");
              $scope.go('/models/'+$routeParams.id_model+'/show');
            } else {
              console.log("KO");
            }
          })
          .error(function errorCallback(response) {
            console.log("Error");
          });
 }

   $scope.modifyModelPassword = function () {
    if ($scope.sexe == "Homme") {
      $scope.model.gender = 1;
    } else {
      $scope.model.gender = 2;
    }
    $http({
          url: "http://localhost:8080/modifyModelAndPassword",
          method: "POST",
          dataType: "json",
          data: {model:$scope.model, user:$scope.user},
          headers: {
            "Content-Type": "application/json"
          }
        }).success(function successCallback(response) {
            if (response.response == "success") {
              console.log("OK");
              $scope.go('/models/'+$routeParams.id_model+'/show');
            } else {
              console.log("KO");
            }
          })
          .error(function errorCallback(response) {
            console.log("Error");
          });
 }

   $scope.getLengthHairEnum = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/getLengthHairEnum',
    }).success(function(length){
      $scope.lengthHairEnum = length;
    })
  };

  $scope.getSkinToneEnum = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/getSkinToneEnum',
    }).success(function(skinTone){
      $scope.skinToneEnum = skinTone;
    })
  };

  $scope.getEyeColorEnum = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/getEyeColorEnum',
    }).success(function(eyeColor){
      $scope.eyeColorEnum = eyeColor;
    })
  };

    $scope.deleteModel = function (id) {
      if (confirm("Voulez vous vraiment supprimer ce modèle ?")) {
        $http({
        method: 'GET',
        url: 'http://localhost:8080/deleteModel/' + id,
      }).success(function (response) {
            if (response.response === "success") {
              console.log("OK");
              $scope.getAllModels();
            } else {
              console.log("KO");
            }
          })
          .error(function errorCallback(response) {
            console.log("Error");
            $scope.etatDemande = "Error " + response
          });
      }
    };

    $scope.deleteLogoutModel = function (id) {
      if (confirm("Voulez vous vraiment supprimer votre compte ?")) {
        $http({
        method: 'GET',
        url: 'http://localhost:8080/deleteModel/' + id,
      }).success(function (response) {
            if (response.response === "success") {
              console.log("OK");
              $scope.go('/logout');
            } else {
              console.log("KO");
            }
          })
          .error(function errorCallback(response) {
            console.log("Error");
            $scope.etatDemande = "Error " + response
          });
      }
    };


         $("#file0").change(function () {
         var reader = new FileReader();
        reader.onload = function (e) {
            $('#img0').attr('src', e.target.result);
            $scope.i0 = e.target.result;
        }
        if (this.files.length > 0) {
            reader.readAsDataURL(this.files[0]);
        }
});
    
  $("#file1").change(function () {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#img1').attr('src', e.target.result);
            $scope.i1 = e.target.result;
        }
        if (this.files.length > 0) {
            reader.readAsDataURL(this.files[0]);
        }
});
     $("#file2").change(function () {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#img2').attr('src', e.target.result);
            $scope.i2 = e.target.result;
        }
        if (this.files.length > 0) {
            reader.readAsDataURL(this.files[0]);
        }
});
     $scope.myReset = function (num) {
            if(num==0)
                {
                    $scope.file1 = null;
                    $scope.i0 = null;
                    $scope.model.modelPhoto[0].file =null;
                }else if(num==1)
                    {
                        $scope.file2 = null;
                        $scope.i1 = null;
                        $scope.model.modelPhoto[1].file=null;
                    }else if(num==2)
                        {
                            $scope.file3 = null;
                            $scope.i2 = null;
                            $scope.model.modelPhoto[2].file=null;
                        }
};

});

