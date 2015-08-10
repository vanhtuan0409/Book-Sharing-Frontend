'use strict';

angular.module('myApp.search', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/search', {
		templateUrl: 'views/search/search.html',
		controller: 'SearchCtrl'
	});
}])

.controller('SearchCtrl', ['$scope', '$routeParams', '$http', '$appConfig', function($scope, $routeParams, $http, $config) {
	$scope.loadJquery = function(){
		$('ul.tabs').tabs();

		$(".search-list tr td").click(function(){
			document.location = "#/book";
		})
	}
	$scope.loadJquery();

	var query = $routeParams.q;
	console.log($config.API_URL + '/book?where={"bookname":{"contains":"'+query+'"}}');


	$http.get($config.API_URL + '/book?where={"bookname":{"contains":"'+query+'"}}')
	.success(function(data){
		if(!data.error){
			$scope.books = data.content;
		}
	})

	$http.get($config.API_URL + '/user?where={"name":{"contains":"'+query+'"}}')
	.success(function(data){
		if(!data.error){
			$scope.peoples = data.content;
		}
	})
}]);