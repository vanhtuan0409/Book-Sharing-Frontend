'use strict';

angular.module('myApp.comment', [])

.directive('ngComment', ['$jQueryLoader', function($jQueryLoader) {
	return {
		restrict: 'E',
		scope: {
            comments: '='
        },
		trasclude: true,
		replace: true,
		templateUrl: 'views/comment/comment.html',
		link: function($scope,element,attrs){
		}
	}
}]);