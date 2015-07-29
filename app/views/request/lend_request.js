'use strict';

angular.module('myApp.lend_request', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/lend', {
		templateUrl: 'views/request/lend_request.html',
		controller: 'LendRequestCtrl'
	});
}])

.controller('LendRequestCtrl', ['$scope','$routeParams','$http', function($scope, $routeParams, $http) {
	$scope.loadJquery = function(){
		$(".book-list tr td:not(:has(button))").click(function(){
			document.location = "#/book";
		})
		$('.modal-trigger').leanModal();
		$('.datepicker').pickadate({
		    selectMonths: true, // Creates a dropdown to control month
		    container: 'body'
		});
		$('ul.tabs').tabs();
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