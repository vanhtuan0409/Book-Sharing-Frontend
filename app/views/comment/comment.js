'use strict';

angular.module('myApp.comment', [])

.directive('ngComment', ['$jQueryLoader', function($jQueryLoader) {
	return {
		restrict: 'E',
		scope: {
            url: '=',
            borrowId: '=',
            toUser: '=',
            book: '='
        },
		trasclude: true,
		replace: true,
		templateUrl: 'views/comment/comment.html',
		link: function($scope,element,attrs){
		},
		controller: ['$scope', '$http', '$auth', '$appConfig', function($scope, $http, $auth, $appConfig){
			$scope.commentMsg = '';
			$scope.getMessage = function(){
				$http.get($scope.url)
				.success(function(data){
					if(!data.error){
						$scope.comments = data.content;
					}
				})
			}
			$scope.getMessage();

			$scope.sendMsg = function(){
				if($scope.borrowId && $scope.commentMsg.length>0 && $scope.toUser){
					$http.post(
						$scope.url,
						{
							'fromUser': $auth.getUser().id,
							'toUser': $scope.toUser,
							'borrow': $scope.borrowId,
							'message': $scope.commentMsg
						}
					).success(function(data){
						$scope.commentMsg = '';
						$scope.getMessage();
					})
				}

				if($scope.toUser && $scope.commentMsg.length>0 && !$scope.borrowId){
					$http.post(
						$scope.url,
						{
							'fromUser': $auth.getUser().id,
							'toUser': $scope.toUser,
							'message': $scope.commentMsg
						}
					).success(function(data){
						$scope.commentMsg = '';
						$scope.getMessage();
					})
				}

				if($scope.book && $scope.commentMsg.length>0){
					$http.post(
						$scope.url,
						{
							'fromUser': $auth.getUser().id,
							'book': $scope.book,
							'message': $scope.commentMsg
						}
					).success(function(data){
						$scope.commentMsg = '';
						$scope.getMessage();
					})
				}
			}
		}]
	}
}]);