'use strict';

angular.module('myApp.book_detail', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/book', {
		templateUrl: 'views/book_detail/book_detail.html',
		controller: 'BookDetailCtrl'
	});
}])

.controller('BookDetailCtrl', [
		'$scope',
		'$jQueryLoader',
		function($scope, $jQueryLoader) {

	$scope.jLoader = $jQueryLoader;

	$scope.comments = [
		{
			avatar: 'img/avatar/huy.jpg',
			name: 'Huy Nguyen',
			msg: 'Do you think this book is good?'
		},
		{
			avatar: 'img/avatar/the.jpg',
			name: 'Shiro',
			msg: "Yes it's very good. The ending is so surprising"
		},
		{
			avatar: 'img/avatar/tue.jpg',
			name: 'Kenji',
			msg: 'I think it can have a sequence'
		},
	];

	$scope.loadJquery = function(){
		$jQueryLoader.loadModal();
	}
	$scope.loadJquery();
}]);
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
'use strict';

angular.module('myApp.footer', [])

.directive('ngFooter', function() {
	return {
		restrict: 'E',
		trasclude: true,
		templateUrl: 'views/footer/footer.html'
	}
});
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
'use strict';

angular.module('myApp.home', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'views/home/home.html',
		controller: 'HomeCtrl'
	});
}])

.controller('HomeCtrl', ['$scope', '$jQueryLoader', function($scope, $jQueryLoader) {
	$scope.jLoader = $jQueryLoader;

	$scope.loadJquery = function(){
		$jQueryLoader.loadTab();
	}

	$scope.loadJquery();
}]);
'use strict';

angular.module('myApp.message', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/message', {
		templateUrl: 'views/message/message.html',
		controller: 'MessageCtrl'
	});
}])

.controller('MessageCtrl', ['$scope', function($scope) {
	$scope.loadJquery = function(){
		$('.datepicker').pickadate({
		    selectMonths: true
		});
	}
	$scope.loadJquery();

	$scope.comments = [
		{
			avatar: 'img/avatar/tue.jpg',
			name: 'Kenji',
			msg: 'Can I borrow your book?',
		},
		{
			avatar: 'img/avatar/the.jpg',
			name: 'Shiro',
			msg: 'Okay, what time do you want to meet',
		},
		{
			avatar: 'img/avatar/tue.jpg',
			name: 'Kenji',
			msg: 'Maybe 12am on 06/28 at Yokohama Station. Is it ok?',
		},
		{
			avatar: 'img/avatar/the.jpg',
			name: 'Shiro',
			msg: 'Ok see you there',
		},
	]
}]);
'use strict';

angular.module('myApp.profile', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/profile', {
		templateUrl: 'views/profile/profile.html',
		controller: 'ProfileCtrl'
	});
}])

.controller('ProfileCtrl', [
		'$scope',
		'$routeParams',
		'$http',
		'$jQueryLoader',
		function($scope, $routeParams, $http, $jQueryLoader) {

	$scope.jLoader = $jQueryLoader;

	$scope.loadJquery = function(){
		$(".book-list tr td:not(:has(button))").click(function(){
			document.location = "#/book";
		})
		$jQueryLoader.loadModal();
		$jQueryLoader.loadTab();
	}
	
	$scope.user = {
		name: "Shiro",
		email: "shiro.atWare@gmail.com",
		dob: "04/09/1993",
		location: "Yokohama",
		point: 100,
		placeToTrade: ["Minatomirai Center Building", "Koganecho Station"],
		timeToTrade: ["12:30"]
	}

	$scope.comments = [
		{
			avatar: 'img/avatar/huy.jpg',
			name: 'Huy Nguyen',
			msg: 'Good person, return the book on time and keep it clean'
		},
		{
			avatar: 'img/avatar/jack.jpg',
			name: 'Jack',
			msg: 'Nice guy !!!'
		}
	];
	// var userId = $routeParams.id;
	// $http.get('http://localhost:1337/api/user/'+userId).success(function(data){
	// 	$scope.user = data;
	// 	var d = new Date(data.dob);
	// 	console.log(d);
	// 	$scope.user.dob = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
	// }).error(function(err){
	// 	console.log(err);
	// })
	$scope.loadJquery();
}]);
'use strict';

angular.module('myApp.borrow_request', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/borrow', {
		templateUrl: 'views/request/borrow_request.html',
		controller: 'BorrowRequestCtrl'
	});
}])

.controller('BorrowRequestCtrl', ['$scope','$routeParams','$http', function($scope, $routeParams, $http) {
	$scope.loadJquery = function(){
		$(".book-list tr td:not(:has(button))").click(function(){
			document.location = "#/book";
		})
		$('.modal-trigger').leanModal();
		$('.datepicker').pickadate({
		    selectMonths: true, // Creates a dropdown to control month
		    container: 'body'
		});
		$('ul.tabs').tabs();
	}

	$scope.user = {
		name: "Shiro",
		email: "shiro.atWare@gmail.com",
		dob: "04/09/1993",
		location: "Yokohama",
		point: 100,
		placeToTrade: ["Minatomirai Center Building", "Koganecho Station"],
		timeToTrade: ["12:30"]
	}
	// var userId = $routeParams.id;
	// $http.get('http://localhost:1337/api/user/'+userId).success(function(data){
	// 	$scope.user = data;
	// 	var d = new Date(data.dob);
	// 	console.log(d);
	// 	$scope.user.dob = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
	// }).error(function(err){
	// 	console.log(err);
	// })
	$scope.loadJquery();
}]);
'use strict';

angular.module('myApp.lend_request', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/lend', {
		templateUrl: 'views/request/lend_request.html',
		controller: 'LendRequestCtrl'
	});
}])

.controller('LendRequestCtrl', ['$scope','$routeParams','$http', function($scope, $routeParams, $http) {
	$scope.loadJquery = function(){
		$(".book-list tr td:not(:has(button))").click(function(){
			document.location = "#/book";
		})
		$('.modal-trigger').leanModal();
		$('.datepicker').pickadate({
		    selectMonths: true, // Creates a dropdown to control month
		    container: 'body'
		});
		$('ul.tabs').tabs();
	}

	$scope.user = {
		name: "Shiro",
		email: "shiro.atWare@gmail.com",
		dob: "04/09/1993",
		location: "Yokohama",
		point: 100,
		placeToTrade: ["Minatomirai Center Building", "Koganecho Station"],
		timeToTrade: ["12:30"]
	}
	// var userId = $routeParams.id;
	// $http.get('http://localhost:1337/api/user/'+userId).success(function(data){
	// 	$scope.user = data;
	// 	var d = new Date(data.dob);
	// 	console.log(d);
	// 	$scope.user.dob = d.getDate() + "/" + (d.getMonth()+1) + "/" + d.getFullYear();
	// }).error(function(err){
	// 	console.log(err);
	// })
	$scope.loadJquery();
}]);
'use strict';

angular.module('myApp.search', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/search', {
		templateUrl: 'views/search/search.html',
		controller: 'SearchCtrl'
	});
}])

.controller('SearchCtrl', ['$scope', function($scope) {
	$scope.loadJquery = function(){
		$('ul.tabs').tabs();

		$(".search-list tr td").click(function(){
			document.location = "#/book";
		})
	}
	$scope.loadJquery();
}]);