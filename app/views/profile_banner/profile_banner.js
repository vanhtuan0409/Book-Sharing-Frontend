'use strict';

angular.module('myApp.profile_banner', [])

.directive('profileBanner', ['$jQueryLoader', '$auth', function($jQueryLoader, $auth) {
	return {
		restrict: 'E',
		scope:{
			user: "=",
		},
		replace: true,
		templateUrl: 'views/profile_banner/profile_banner.html',
	}
}]);