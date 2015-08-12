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
	'$auth',
	function($http, $scope, $jQueryLoader, $appConfig, $routeParams, $auth) {

		$scope.jLoader = $jQueryLoader;
		$scope.loadJquery = function(){
			$jQueryLoader.loadModal();
		}
		$scope.loadJquery();

		$scope.filterOwner = function(owner){
			if(owner.id != $auth.getUser().id){
				return owner;
			}
		}

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

		$scope.getMessage = function(){
			$http.get($appConfig.API_URL + "/book_comment?book=" + $routeParams.id)
			.success(function(data){
				if(!data.error){
					$scope.commentList = data.content
				}
			})
			.error(function(error){
				console.log(error);
			})
		}
		$scope.addMessage = function(message){
			$http.post(
				$appConfig.API_URL + "/book_comment",
				{
					'fromUser': $auth.getUser().id,
					'book': $scope.book.id,
					'message': message
				}
			).success(function(data){
				if(!data.error){
					$scope.getMessage();
				}
			})
		}
		$scope.getMessage();
	}]);