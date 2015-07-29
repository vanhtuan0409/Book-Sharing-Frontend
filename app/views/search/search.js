'use strict';

angular.module('myApp.search', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/search', {
		templateUrl: 'views/search/search.html',
		controller: 'SearchCtrl'
	});
}])

.controller('SearchCtrl', ['$scope', function($scope) {
	$scope.loadJquery = function(){
		$('ul.tabs').tabs();

		$(".search-list tr td").click(function(){
			document.location = "#/book";
		})
	}
	$scope.loadJquery();
}]);