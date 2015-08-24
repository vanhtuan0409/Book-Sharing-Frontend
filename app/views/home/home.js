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

		$scope.recommendation = [];
		$scope.getAllUser = function(){
			$http.get($appConfig.API_URL+'/user?sort=updatedAt DESC')
			.success(function(data){
				if (!data.error){
					$scope.users = data.content;
					for(var i = 0; i<data.content.length; i++){
						$scope.recommendation = $scope.recommendation.concat(data.content[i].recommendation);
						shuffle($scope.recommendation);
					}
				}
			})
		}
		function shuffle(o) {
			for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
		}

		$scope.hasOwner = function(book){
			if(book.owners.length > 0){
				return book;
			}
		}

		$scope.getAllBook();
		$scope.getAllUser();
}]);