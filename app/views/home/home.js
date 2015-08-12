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

		$scope.getAllBook = function(){
			$http.get($appConfig.API_URL+'/book?sort=updatedAt DESC')
			.success(function(data){
				if (!data.error){
					$scope.books = data.content;
				}
			})
		}

		$scope.getAllUser = function(){
			$http.get($appConfig.API_URL+'/user?sort=updatedAt DESC')
			.success(function(data){
				if (!data.error){
					$scope.users = data.content;
				}
			})
		}

		$scope.hasOwner = function(book){
			if(book.owners.length > 0){
				return book;
			}
		}

		$scope.getAllBook();
		$scope.getAllUser();
}]);