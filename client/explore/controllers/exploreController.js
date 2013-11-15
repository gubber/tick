'use strict';

var explore = angular.module('explore.controllers', []);

explore.controller('ExploreController',  function ($scope, $http) {

	$scope.fetch = function(fieldDescriptor) {
		var urlPart = encodeURIComponent($scope.dataUrl);
		if (fieldDescriptor) {
			urlPart += '/' + fieldDescriptor
		}
		$http({
    		method: 'GET',
    		url: 'data/' + urlPart
  		}).success(function(data, status) {
  			console.log(data)
    		$scope.structure = data
  		}).error(function(data, status) {
    		console.log("Eeek")
  		});
	}

})