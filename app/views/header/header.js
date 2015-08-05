'use strict';

angular.module('myApp.header', ['facebook'])
.config(function(FacebookProvider){
	FacebookProvider.init('869003383193808');
})
.directive('ngHeader', ['$jQueryLoader', '$timeout', function($jQueryLoader, $timeout) {
	return {
		restrict: 'E',
		trasclude: true,
		replace: true,
		templateUrl: 'views/header/header.html',
		link: function(scope,element,attrs){
			$timeout(function(){
				$jQueryLoader.loadDropdown(false);
			})
		},
		controller: ['$scope', '$http', '$auth', '$appConfig', '$cookieStore', 'Facebook', function($scope, $http, $auth, $appConfig, $cookies, Facebook){
			$scope.user = $auth.getUser();

			$scope.logout = function(){
				$auth.logout();
				window.location.reload();
			}

			$scope.login = function() {
				Facebook.login(function(response) {
					if (response.authResponse) {
						var access_token = response.authResponse.accessToken;
						var id = response.authResponse.userID;
						$auth.login(access_token, id, function(){
							window.location.reload();
						});
					}
				}, {
			    	scope: ['email', 'public_profile', 'user_friends']
			    });
			};
		}]
	}
}]);