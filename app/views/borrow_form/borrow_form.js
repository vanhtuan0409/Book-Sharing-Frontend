'use strict';

angular.module('myApp.borrow_form', [])

.directive('borrowForm', ['$jQueryLoader', function($jQueryLoader) {
	return {
		restrict: 'A',
		trasclude: true,
		replace: false,
		templateUrl: 'views/borrow_form/borrow_form.html',
		link: function($scope, element, attrs) {
			$jQueryLoader.loadDatePicker();
		},
		controller: ['$scope', '$http', '$auth', '$appConfig', function($scope, $http, $auth, $config) {
			$scope.dateMeet = new Date();
			$scope.dateReturn = new Date();
			$scope.dateReturn.setDate($scope.dateMeet.getDate() + 7);

			$scope.borrowMessage = '';

			$scope.submit = function() {
				var dateMeet = $scope.dateMeet || "";
				var dateReturn = $scope.dateReturn || "";
				var msg = $scope.borrowMessage || "";
				var bookId = $scope.borrowBook.id || "";
				var toId = $scope.borrowUser.id || "";
				var fromId = $auth.getUser().id || "";
				$http.post(
					$config.API_URL + "/user/" + fromId + "/borrow", {
						"requestToUser": toId,
						"requestBook": bookId,
						"startDate": dateMeet,
						"returnDate": dateReturn,
						"message": msg
					}
				).success(function(data) {
					window.location = "#/borrow";
				}).error(function(data) {
					console.log(data);
				})
			}
		}]
	}
}]);