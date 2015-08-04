'use strict';

angular.module('myApp.header', [])

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
		controller: ['$scope', '$http', '$auth', '$appConfig', '$cookieStore', function($scope, $http, $auth, $appConfig, $cookies){
			$scope.user = $auth.getUser();

			function fb_login(){
				FB.login(function (response) {
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
			}

			function statusChangeCallback(response) {
				if (response.status === 'connected') {
					var access_token = response.authResponse.accessToken;
					var id = response.authResponse.userID;
					$auth.login(access_token, id, function(){
						window.location.reload();
					});
				} else if (response.status === 'not_authorized') {
					fb_login();
				} else {
					fb_login();
				}
			}

			$scope.checkLoginState =function() {
				FB.getLoginStatus(function(response) {
					if (response.status === 'connected') {
						var access_token = response.authResponse.accessToken;
						var id = response.authResponse.userID;
						$auth.login(access_token, id, function(){
							window.location.reload();
						});
					} else if (response.status === 'not_authorized') {
						FB.login(function (response) {
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
					} else {
						FB.login(function (response) {
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
					}
				});
}

$scope.logout = function(){
	$auth.logout();
	window.location.reload();
}
}]
}
}]);