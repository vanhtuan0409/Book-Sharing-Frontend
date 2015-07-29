'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngRoute',
	'myApp.header',
	'myApp.home',
	'myApp.profile',
	'myApp.book_detail',
	'myApp.message',
	'myApp.comment',
	'myApp.search',
	'myApp.borrow_request',
	'myApp.lend_request',
	'myApp.footer',
	'myApp.version',
	'myApp.services'
]).

config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({redirectTo: '/'});
}]);
