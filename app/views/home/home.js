'use strict';

angular.module('myApp.home', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'views/home/home.html',
		controller: 'HomeCtrl'
	});
}])

.controller('HomeCtrl', ['$scope', '$http', '$jQueryLoader', '$appConfig',
	function($scope, $http, $jQueryLoader, $appConfig) {
		$scope.jLoader = $jQueryLoader;

		$scope.loadJquery = function(){
			$jQueryLoader.loadTab();
		}
		$scope.loadJquery();

		$scope.random = function(){
			return Math.random();
		}

		$scope.getAllBook = function(){
			$http.get($appConfig.API_URL+'/book?sort=updatedAt DESC')
			.success(function(data){
				if (!data.error){
					$scope.books = data.content;
				}
			})
		}
		$scope.getAllBook();
}]);