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
			console.log('current', currentId);
			console.log('profile', $scope.user);
			console.log('user', user);
			console.log('bool', currentId == $scope.user.id)
			if(currentId == $scope.user.id){
				$scope.isMyself = true;
			} else {
				$scope.isMyself = false;
			}
		}]
	}
}]);