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
		controller: ['$scope', '$appConfig', '$http', function($scope, $appConfig, $http){
			$scope.$watch("user", function(newValue, oldValue){
				$http.get($appConfig.API_URL + "/user/"+$scope.user.id+"/stat")
				.success(function(data){
					if(!data.error){
						$scope.stat = data.content;
					}
				})
			});
		}]
	}
}]);