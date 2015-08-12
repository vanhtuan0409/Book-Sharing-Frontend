'use strict';

angular.module('myApp.profile', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/profile/:id', {
		templateUrl: 'views/profile/profile.html',
		controller: 'ProfileCtrl'
	});
}])

.controller('ProfileCtrl', [
		'$scope',
		'$routeParams',
		'$http',
		'$jQueryLoader',
		'$appConfig',
		'$auth',
		'$rootScope',
		function($scope, $routeParams, $http, $jQueryLoader, $appConfig, $auth) {

	$scope.jLoader = $jQueryLoader;

	$scope.loadJquery = function(){
		$jQueryLoader.loadTab();
	}
	
	$scope.redirect = function(bookId){
		document.location= "#/book/"+bookId;
	}

	$scope.setBorrow = function(user, book){
		$scope.borrowUser = user;
		$scope.borrowBook = book;
	}

	$scope.currentUser = $auth.getUser();
	$scope.user = {};

	$scope.getUser = function(){
		$http.get($appConfig.API_URL + "/user/" + $routeParams.id)
		.success(function(data){
			if(!data.error){
				$scope.user = data.content;
			}
		})
	}
	$scope.getUser();

	$scope.getMessage = function(){
		$http.get($appConfig.API_URL + "/user_rating?toUser=" + $routeParams.id)
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
			$appConfig.API_URL + "/user_rating",
			{
				'fromUser': $auth.getUser().id,
				'toUser': $scope.user.id,
				'message': message
			}
		).success(function(data){
			if(!data.error){
				$scope.getMessage();
			}
		})
	}

	$scope.getMessage();

	$scope.loadJquery();
}]);