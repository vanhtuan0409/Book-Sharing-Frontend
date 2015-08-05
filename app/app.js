'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngRoute',
	'ngCookies',
	'facebook',
	'myApp.header',
	'myApp.home',
	'myApp.profile',
	'myApp.book_detail',
	'myApp.message',
	'myApp.comment',
	'myApp.search',
	'myApp.borrow_request',
	'myApp.lend_request',
	'myApp.borrow_form',
	'myApp.profile_banner',
	'myApp.manage_book',
	'myApp.footer',
	'myApp.version',
	'myApp.services'
])

.config(['$routeProvider', 'FacebookProvider', function($routeProvider, FacebookProvider) {
	$routeProvider.otherwise({redirectTo: '/'});
	FacebookProvider.init('869003383193808');
}]);
