'use strict';

angular.module('myApp.borrow_request', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/borrow', {
		templateUrl: 'views/request/borrow_request.html',
		controller: 'BorrowRequestCtrl'
	});
}])

.controller('BorrowRequestCtrl', ['$scope','$http', '$appConfig', '$auth', '$jQueryLoader',
	function($scope, $http, $config, $auth, $jQueryLoader) {
		$jQueryLoader.loadTab();
		$scope.user = $auth.getUser();

		$scope.getRequest = function(){
			$http.get($config.API_URL + "/borrow?fromUser=" + $scope.user.id)
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