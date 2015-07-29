'use strict';

angular.module('myApp.header', [])

.directive('ngHeader', ['$jQueryLoader', function($jQueryLoader) {
	return {
		restrict: 'E',
		trasclude: true,
		replace: true,
		templateUrl: 'views/header/header.html',
		link: function(scope,element,attrs){
			$jQueryLoader.loadDropdown(false);
			$jQueryLoader.loadDatePicker();
		}
	}
}]);