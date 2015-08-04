'use strict';

angular.module('myApp.lend_request', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/lend', {
		templateUrl: 'views/request/lend_request.html',
		controller: 'LendRequestCtrl'
	});
}])

.controller('LendRequestCtrl', ['$scope','$http', '$appConfig', '$auth', '$jQueryLoader',
	function($scope, $http, $config, $auth, $jQueryLoader) {
		$jQueryLoader.loadTab();
		$scope.user = $auth.getUser();

		$scope.getRequest = function(){
			$http.get($config.API_URL + "/borrow?toUser=" + $scope.user.id)
			.success(function(data){
				if(!data.error){
					$scope.requests = data.content;
				}
			})
			.error(function(data){
				console.log(data);
			})
		}
		$scope.getRequest();

		$scope.acceptRequest = function(requestId){
			$http({
				method: 'PUT',
				url: $config.API_URL + "/borrow/" + requestId,
				data:{
					status: 'ongoing'
				}
			}).success(function(data){
				if(!data.error){
					$scope.getRequest();
				}
			}).error(function(data){
				console.log(data);
			})
		}

		$scope.deleteRequest = function(requestId){
			$http({
				method: 'PUT',
				url: $config.API_URL + "/borrow/" + requestId,
				data:{
					status: 'closed'
				}
			}).success(function(data){
				if(!data.error){
					$scope.getRequest();
				}
			}).error(function(data){
				console.log(data);
			})
		}
	}
]);