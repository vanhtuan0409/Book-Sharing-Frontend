'use strict';

angular.module('myApp.message', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/message', {
		templateUrl: 'views/message/message.html',
		controller: 'MessageCtrl'
	});
}])

.controller('MessageCtrl', ['$http', '$scope', '$routeParams', '$auth', '$appConfig', '$jQueryLoader',
	function($http, $scope, $routeParams, $auth, $config, $jQueryLoader) {
		$jQueryLoader.loadDatePicker();

		var borrowId = $routeParams.borrow || '';
		var currentUser = $auth.getUser();

		$scope.user = currentUser;

		$scope.redirect = function(borrowId){
			window.location = "#/message?borrow=" + borrowId;
		}

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

		$scope.getRequest = function(){
			if (borrowId == ''){
				var query = "fromUser="+currentUser.id+"||toUser="+currentUser.id;
				$http.get($config.API_URL + "/borrow?limit=1&sort=updatedAt Desc&"+query)
				.success(function(data){
					if(!data.error){
						$scope.request = data.content[0];
						$scope.startDate = data.content[0].startDate.substring(0,10);
						$scope.returnDate = data.content[0].returnDate.substring(0,10);

						if(data.content[0].fromUser.id == currentUser.id){
							$scope.borrowFlag = true;
						} else {
							$scope.borrowFlag = false;
						}
					}
				})
				.error(function(error){

				})
				return;
			}
			$http.get($config.API_URL + "/borrow/" + borrowId)
			.success(function(data){
				if(!data.error){
					$scope.request = data.content;
					$scope.startDate = data.content.startDate.substring(0,10);
					$scope.returnDate = data.content.returnDate.substring(0,10);

					if(data.content.fromUser.id == currentUser.id){
						$scope.borrowFlag = true;
					} else {
						$scope.borrowFlag = false;
					}
				}
			})
			.error(function(error){

			})
		}
		$scope.getRequest();

		$scope.messageUrl = $config.API_URL + "/message?borrow=" + borrowId;
		$scope.getComment = function(){
			$http.get($scope.messageUrl = $config.API_URL + "/message?borrow=" + borrowId)
			.success(function(data){
				if(!data.error){
					$scope.commentList = data.content
				}
			})
			.error(function(error){
				console.log(error);
			})
		}
		$scope.getComment();
		$scope.addComment = function(message){
			$http.post(
				$config.API_URL + "/message",
				{
					'fromUser': $auth.getUser().id,
					'toUser': $auth.getUser().id == $scope.request.fromUser.id ? $scope.request.toUser.id : $scope.request.fromUser.id,
					'borrow': $scope.request.id,
					'message': message
				}
			).success(function(data){
				if(!data.error){
					$scope.getComment();
				}
			}).error(function(err){
				console.log(err);
			})
		}

		$scope.getMessageList = function(){
			var query = "fromUser="+currentUser.id+"||toUser="+currentUser.id;
			$http.get($config.API_URL + "/borrow?" + query)
			.success(function(data){
				if(!data.error){
					$scope.msgList = data.content;
				}
			})
			.error(function(data){
				console.log(data);
			})
		}
		$scope.getMessageList();

		$scope.deleteRequest = function(requestId){
			$http({
				method: 'PUT',
				url: $config.API_URL + "/borrow/" + requestId,
				data:{
					status: 'closed'
				}
			}).success(function(data){
				if(!data.error){
					if($scope.borrowFlag){
						window.location="#/borrow";
					} else {
						window.location="#/lend";
					}
				}
			}).error(function(data){
				console.log(data);
			})
		}
	}
	]);