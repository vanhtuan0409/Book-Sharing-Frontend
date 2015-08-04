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

	$scope.getUser = function(){
		$http.get($appConfig.API_URL + "/user/" + $routeParams.id)
		.success(function(data){
			if(!data.error){
				$scope.user = data.content;
			}
		})
	}
	$scope.getUser();

	$scope.ratingUrl = $appConfig.API_URL + "/user_rating?toUser=" + $routeParams.id;

	$scope.loadJquery();
}]);