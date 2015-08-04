'use strict';

angular.module('myApp.profile_banner', [])

.directive('profileBanner', ['$jQueryLoader', function($jQueryLoader) {
	return {
		restrict: 'E',
		scope:{
			user: "="
		},
		trasclude: true,
		replace: false,
		templateUrl: 'views/profile_banner/profile_banner.html'
	}
}]);