'use strict';

angular.module('myApp.comment', [])

.directive('ngComment', ['$jQueryLoader', function($jQueryLoader) {
	return {
		restrict: 'E',
		scope: {
            comments: '=',
            addMessage: '&'
        },
		trasclude: true,
		replace: true,
		templateUrl: 'views/comment/comment.html',
		link: function($scope,element,attrs){
		},
		controller: ['$scope', '$http', '$auth', '$appConfig', function($scope, $http, $auth, $appConfig){
			$scope.commentMsg = '';
			$scope.sendMsg = function(){
				if($scope.commentMsg != ''){
					$scope.addMessage({msg: $scope.commentMsg});
					$scope.commentMsg = '';
				}
			}
		}]
	}
}]);