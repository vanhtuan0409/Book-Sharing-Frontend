'use strict';

angular.module('myApp.profile_banner', [])

.directive('profileBanner', ['$jQueryLoader', '$auth', function($jQueryLoader, $auth) {
	return {
		restrict: 'E',
		scope:{
			user: "="
		},
		trasclude: true,
		replace: false,
		templateUrl: 'views/profile_banner/profile_banner.html',
		link: function(scope,element,attrs){
			var currentId = $auth.getUser().id;
			console.log(scope.user);
			if(currentId == scope.user.id){
				scope.isMyself = true;
			} else {
				scope.isMyself = false;
			}
		}
	}
}]);