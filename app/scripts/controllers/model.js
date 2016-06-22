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
    if ($scope.sexe == "Homme") {
      postObjectModel.gender = "1";
    } else {
      postObjectModel.gender = "2";
    }  
      
    var postObjectUser = new Object();
    postObjectUser.password = $scope.password;
    postObjectUser.mail = $scope.mail;
    postObjectUser.isValidated = "true";
    postObjectUser.role = "model";  
      
    postObjectModel.modelPhoto = [];
      if ($scope.i0){
      var photo0 = {file:$scope.i0};
      console.log(photo0);
      postObjectModel.modelPhoto.push(photo0);
       }
      if ($scope.i1){
      var photo1 = {file:$scope.i1};
      postObjectModel.modelPhoto.push(photo1);
      console.log(photo1);
      }
      if ($scope.i2!= null){
      var photo2 = {file:$scope.i2};
      postObjectModel.modelPhoto.push(photo2);
      console.log(photo2);
      }
      
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
          $scope.go('/login');
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
<<<<<<< HEAD
        } else {
            $scope.confirmationMdp = "Veuillez saisir 2 mots de passe identiques";
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
=======
>>>>>>> e2439d29b29e4e3988ee56dd487fc130a98a2585
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
    
    
    
    
});    

