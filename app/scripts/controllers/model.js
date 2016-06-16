'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:ModelCtrl
 * @description});
 * # ModelCtrl
 * Controller of the modelFinderApp
*/

modelFinderApp.controller('ModelCtrl', function ($scope, $http, $location) {


  $scope.go = function (path) {
    $location.path(path);
  };

  $scope.getIndex = function (model) {
    return $scope.message.indexOf(model);
  };

  $scope.createModel = function () {

    var postObjectModel = new Object();
    postObjectModel.password = $scope.password;
    postObjectModel.lastName = $scope.lastName;
    postObjectModel.name = $scope.name;
    postObjectModel.mail = $scope.mail;
    postObjectModel.dateOfBirth = $scope.dateOfBirth;
    postObjectModel.phoneNumber = $scope.phoneNumber;
    postObjectModel.lengthHair = $scope.lengthHairModel;
    postObjectModel.hairColor = $scope.hairColor;
    postObjectModel.skinTone = $scope.skinToneModel;
    postObjectModel.eyeColor = $scope.eyeColorModel;
    postObjectModel.height = $scope.height;
    postObjectModel.highHeight = $scope.highHeight;
    postObjectModel.lowHeight = $scope.lowHeight;
    postObjectModel.shoeSize = $scope.shoeSize;
    postObjectModel.comment = $scope.comment;
    postObjectModel.description = $scope.description;
    if ($scope.gender == "Homme") {
      postObjectModel.gender = "1";
    } else {
      postObjectModel.gender = "2";
    }
      
    var postObjectUser = new Object();
    postObjectUser.password = $scope.password;
    postObjectUser.mail = $scope.mail;
    postObjectUser.isValidated = "true";  
    postObjectUser.role = "model";

      
    $http({
      url: "http://localhost:8080/createModel",
      method: "POST",
      dataType: "json",
      data: {model:postObjectModel, user:postObjectUser},
      headers: {
        "Content-Type": "application/json"
      }
    }).success(function successCallback(response) {
        if (response.response == "success") {
            $scope.messageCreation = "création OK"
        } else {
          $scope.messageCreation = "Erreur de création"
        }
      })
      .error(function errorCallback(response) {
        $scope.messageCreation = "Error " + response
      });
    };


  $scope.getEyeColorEnum = function() {
    $http({
      method: 'GET',
      url: 'http://localhost:8080/getEyeColorEnum',
    }).success(function(eyeColor){
      $scope.eyeColorEnum = eyeColor;
    })
  }

   $scope.getAllModels = function () {
	    $http({
	    method: 'GET',
	    url: 'http://localhost:8080/usermodelList',
		  }).success(function(data){
		    $scope.models = data;
		    $scope.lowerAge = null;
        $scope.higherAge = null;
		    $scope.lowerHeight = null;
        $scope.higherHeight = null;
        $scope.sexes=['','Femme','Homme'];
        $scope.sexeSelectionne='';
		  }).error(function(){
		    alert("error");
		  });
  };

  $scope.go = function (path) {
    $location.path(path);

  };

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

    $scope.add = function(){
      var f = document.getElementById('file').files[0],
          r = new FileReader();
      r.onloadend = function(e){
        $scope.aa = e.target.result;
      }
      r.readAsArrayBuffer(f);
    }




  $scope.calculerAge = function (dateOfBirth) {
    var maintenant = new Date();
    var birth = new Date(dateOfBirth);
    var age = dateDiff(birth, maintenant);
    return age;
  };

  function dateDiff(d1, d2) {
    return new Number((d2.getTime() - d1.getTime()) / 31536000000).toFixed(0);
  };


    $scope.ageBetween = function (item) {
    	if ($scope.lowerAge!=null){
    		if ($scope.higherAge!=null){
    			if ($scope.lowerAge <= $scope.calculerAge(item.model.dateOfBirth) && $scope.calculerAge(item.model.dateOfBirth) <= $scope.higherAge)
        			return item;
    		}else{
    			if ($scope.lowerAge <= $scope.calculerAge(item.model.dateOfBirth))
        			return item;
    		}
    	}else{
    		if ($scope.higherAge!=null){
    			if ($scope.calculerAge(item.model.dateOfBirth) <= $scope.higherAge)
        			return item;
    		}else{
    			return item;
    		}
    	}
    };

    $scope.heightBetween = function (item) {
    	if ($scope.lowerHeight!=null){
    		if ($scope.higherHeight!=null){
    			if ($scope.lowerHeight <= item.model.height && item.model.height <= $scope.higherHeight)
        			return item;
    		}else{
    			if ($scope.lowerHeight <= item.model.height)
        			return item;
    		}
    	}else{
    		if ($scope.higherHeight!=null){
    			if (item.model.height <= $scope.higherHeight)
        			return item;
    		}else{
    			return item;
    		}
    	}
    };

    $scope.getSexes = function() {
        $scope.sexes=['Femme','Homme'];
    };
    
     $scope.sexeIn = function (item) {
    	if ($scope.sexeSelectionne==''){
    		return item;
    	}else{
    		if ($scope.sexeSelectionne=='Homme'){
    			if (item.model.gender == 1)
        			return item;
    		}else{
    			if (item.model.gender != 1)
        			return item;
    		}
    	}
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
    else{
      $scope.getAllModels();
    }
      
    };
    
    $scope.checkPwd = function(pwd1, pwd2) {
        if(pwd1==pwd2){
            $scope.createModel();
        }
    }

});
