'use strict';

angular.module('myApp.book_detail', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/book/:id', {
		templateUrl: 'views/book_detail/book_detail.html',
		controller: 'BookDetailCtrl'
	});
}])

.controller('BookDetailCtrl', [
	'$http',
	'$scope',
	'$jQueryLoader',
	'$appConfig',
	'$routeParams',
	function($http, $scope, $jQueryLoader, $appConfig, $routeParams) {

		$scope.jLoader = $jQueryLoader;
		$scope.loadJquery = function(){
			$jQueryLoader.loadModal();
		}
		$scope.loadJquery();

		$scope.setBorrow = function(user, book){
			$scope.borrowUser = user;
			$scope.borrowBook = book;
		}

		$scope.getBook = function(){
			$http.get($appConfig.API_URL + "/book/" + $routeParams.id)
			.success(function(data){
				if(!data.error){
					$scope.book = data.content;
				}
			})
		}
		$scope.getBook();

		$scope.commentUrl = $appConfig.API_URL + "/book_comment?book=" + $routeParams.id;
	}]);