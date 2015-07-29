'use strict';

angular.module('myApp.message', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/message', {
		templateUrl: 'views/message/message.html',
		controller: 'MessageCtrl'
	});
}])

.controller('MessageCtrl', ['$scope', function($scope) {
	$scope.loadJquery = function(){
		$('.datepicker').pickadate({
		    selectMonths: true
		});
	}
	$scope.loadJquery();

	$scope.comments = [
		{
			avatar: 'img/avatar/tue.jpg',
			name: 'Kenji',
			msg: 'Can I borrow your book?',
		},
		{
			avatar: 'img/avatar/the.jpg',
			name: 'Shiro',
			msg: 'Okay, what time do you want to meet',
		},
		{
			avatar: 'img/avatar/tue.jpg',
			name: 'Kenji',
			msg: 'Maybe 12am on 06/28 at Yokohama Station. Is it ok?',
		},
		{
			avatar: 'img/avatar/the.jpg',
			name: 'Shiro',
			msg: 'Ok see you there',
		},
	]
}]);