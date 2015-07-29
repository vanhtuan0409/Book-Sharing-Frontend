'use strict';

angular.module('myApp.profile', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/profile', {
		templateUrl: 'views/profile/profile.html',
		controller: 'ProfileCtrl'
	});
}])

.controller('ProfileCtrl', [
		'$scope',
		'$routeParams',
		'$http',
		'$jQueryLoader',
		function($scope, $routeParams, $http, $jQueryLoader) {

	$scope.jLoader = $jQueryLoader;

	$scope.loadJquery = function(){
		$(".book-list tr td:not(:has(button))").click(function(){
			document.location = "#/book";
		})
		$jQueryLoader.loadModal();
		$jQueryLoader.loadTab();
	}
	
	$scope.user = {
		name: "Shiro",
		email: "shiro.atWare@gmail.com",
		dob: "04/09/1993",
		location: "Yokohama",
		point: 100,
		placeToTrade: ["Minatomirai Center Building", "Koganecho Station"],
		timeToTrade: ["12:30"]
	}

	$scope.comments = [
		{
			avatar: 'img/avatar/huy.jpg',
			name: 'Huy Nguyen',
			msg: 'Good person, return the book on time and keep it clean'
		},
		{
			avatar: 'img/avatar/jack.jpg',
			name: 'Jack',
			msg: 'Nice guy !!!'
		}
	];
	// var userId = $routeParams.id;
	// $http.get('http://localhost:1337/api/user/'+userId).success(function(data){
	// 	$scope.user = data;
	// 	var d = new Date(data.dob);
	// 	console.log(d);
	// 	$scope.user.dob = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
	// }).error(function(err){
	// 	console.log(err);
	// })
	$scope.loadJquery();
}]);