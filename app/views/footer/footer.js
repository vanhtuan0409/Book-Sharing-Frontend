'use strict';

angular.module('myApp.footer', [])

.directive('ngFooter', function() {
	return {
		restrict: 'E',
		trasclude: true,
		templateUrl: 'views/footer/footer.html'
	}
});