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
		templateUrl: 'views/profile_banner/profile_banner.html',
		controller: ['$scope','$auth', function($scope, $auth){
			var currentId = $auth.getUser().id;
			if(currentId == $scope.user.id){
				$scope.isMyself = true;
			} else {
				$scope.isMyself = false;
			}
		}]
	}
}]);