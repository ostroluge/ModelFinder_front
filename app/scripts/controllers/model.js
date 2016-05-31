'use strict';

/**
 * @ngdoc function
 * @name modelFinderApp.controller:StudentCtrl
 * @description
 * # StudentCtrl
 * Controller of the modelFinderApp
 */

modelFinderApp.controller('ModelCtrl', function ($scope, $http, $location) {

   $scope.getAllModels = function () {
	    $http({
	    method: 'GET',
	    url: 'http://localhost:8080/modelList',
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
    			if ($scope.lowerAge <= $scope.calculerAge(item.dateOfBirth) && $scope.calculerAge(item.dateOfBirth) <= $scope.higherAge)
        			return item;
    		}else{
    			if ($scope.lowerAge <= $scope.calculerAge(item.dateOfBirth))
        			return item;
    		}
    	}else{
    		if ($scope.higherAge!=null){
    			if ($scope.calculerAge(item.dateOfBirth) <= $scope.higherAge)
        			return item;
    		}else{
    			return item;
    		}
    	}
    };

    $scope.heightBetween = function (item) {
    	if ($scope.lowerHeight!=null){
    		if ($scope.higherHeight!=null){
    			if ($scope.lowerHeight <= item.height && item.height <= $scope.higherHeight)
        			return item;
    		}else{
    			if ($scope.lowerHeight <= item.height)
        			return item;
    		}
    	}else{
    		if ($scope.higherHeight!=null){
    			if (item.height <= $scope.higherHeight)
        			return item;
    		}else{
    			return item;
    		}
    	}
    };

     $scope.sexeIn = function (item) {
    	if ($scope.sexeSelectionne==''){
    		return item;
    	}else{
    		if ($scope.sexeSelectionne=='Homme'){
    			if (item.gender == 1)
        			return item;
    		}else{
    			if (item.gender != 1)
        			return item;
    		}
    	}
    };

});