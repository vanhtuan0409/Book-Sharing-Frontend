'use strict';

angular.module('myApp.book_detail', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/book', {
		templateUrl: 'views/book_detail/book_detail.html',
		controller: 'BookDetailCtrl'
	});
}])

.controller('BookDetailCtrl', [
		'$scope',
		'$jQueryLoader',
		function($scope, $jQueryLoader) {

	$scope.jLoader = $jQueryLoader;

	$scope.comments = [
		{
			avatar: 'img/avatar/huy.jpg',
			name: 'Huy Nguyen',
			msg: 'Do you think this book is good?'
		},
		{
			avatar: 'img/avatar/the.jpg',
			name: 'Shiro',
			msg: "Yes it's very good. The ending is so surprising"
		},
		{
			avatar: 'img/avatar/tue.jpg',
			name: 'Kenji',
			msg: 'I think it can have a sequence'
		},
	];

	$scope.loadJquery = function(){
		$jQueryLoader.loadModal();
	}
	$scope.loadJquery();
}]);