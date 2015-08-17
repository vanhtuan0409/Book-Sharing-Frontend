'use strict';

angular.module('myApp.header', ['facebook'])
.config(function(FacebookProvider){
	FacebookProvider.init('868507116576768');
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
			// $scope.user = {name: 'asdasdas'};

			if($auth.getUser()){
				$scope.user = $auth.getUser();
			} else {
				$http.get($appConfig.API_URL + "/auth")
				.success(function(data){
					if(!data.error){
						$auth.setUser(data.content);
						$scope.user = data.content;
					}
				})
				.error(function(err){
					console.log(err);
				})
			}

			$scope.logout = function(){
				$auth.logout();
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

			$scope.search = function(){
				window.location = "#/search?q="+$scope.query;
			}
		}]
	}
}]);