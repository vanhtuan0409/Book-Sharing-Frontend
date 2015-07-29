'use strict';

angular.module('myApp.home', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'views/home/home.html',
		controller: 'HomeCtrl'
	});
}])

.controller('HomeCtrl', ['$scope', '$jQueryLoader', function($scope, $jQueryLoader) {
	$scope.jLoader = $jQueryLoader;

	$scope.loadJquery = function(){
		$jQueryLoader.loadTab();
	}

	$scope.loadJquery();
}]);