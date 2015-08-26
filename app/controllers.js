'use strict';

angular.module('myApp.book_detail', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/book/:id', {
		templateUrl: 'views/book_detail/book_detail.html',
		controller: 'BookDetailCtrl'
	});
}])

.controller('BookDetailCtrl', [
	'$http',
	'$scope',
	'$jQueryLoader',
	'$appConfig',
	'$routeParams',
	'$auth',
	function($http, $scope, $jQueryLoader, $appConfig, $routeParams, $auth) {

		$scope.jLoader = $jQueryLoader;
		$scope.loadJquery = function() {
			$jQueryLoader.loadModal();
		}
		$scope.loadJquery();

		$scope.isLoggedIn = $auth.getUser() != null ? true : false;

		$scope.filterOwner = function(owner) {
			if (!$auth.getUser()) {
				return owner;
			}
			if (owner.id != $auth.getUser().id) {
				return owner;
			}
		}

		$scope.setBorrow = function(user, book) {
			$scope.borrowUser = user;
			$scope.borrowBook = book;
		}

		$scope.getBook = function() {
			$http.get($appConfig.API_URL + "/book/" + $routeParams.id)
				.success(function(data) {
					if (!data.error) {
						$scope.book = data.content;
					}
				})
		}
		$scope.getBook();

		$scope.getMessage = function() {
			$http.get($appConfig.API_URL + "/book_comment?book=" + $routeParams.id)
				.success(function(data) {
					if (!data.error) {
						$scope.commentList = data.content
					}
				})
				.error(function(error) {
					console.log(error);
				})
		}
		$scope.addMessage = function(message) {
			$http.post(
				$appConfig.API_URL + "/book_comment", {
					'fromUser': $auth.getUser().id,
					'book': $scope.book.id,
					'message': message
				}
			).success(function(data) {
				if (!data.error) {
					$scope.getMessage();
				}
			})
		}
		$scope.getMessage();
	}
]);
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
					if(!$auth.getUser()){
						alert("Please Login!");
						return;
					}
					$scope.addMessage({msg: $scope.commentMsg});
					$scope.commentMsg = '';
				}
			}
		}]
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

angular.module('myApp.header', ['facebook'])
.config(function(FacebookProvider){
	FacebookProvider.init('868507116576768');
})
.directive('ngHeader', ['$jQueryLoader', '$timeout', function($jQueryLoader, $timeout) {
	return {
		restrict: 'E',
		trasclude: true,
		replace: true,
		templateUrl: 'views/header/header.html',
		link: function(scope,element,attrs){
			$timeout(function(){
				$jQueryLoader.loadDropdown(false);
			})
		},
		controller: ['$scope', '$http', '$auth', '$appConfig', '$cookieStore', 'Facebook', function($scope, $http, $auth, $appConfig, $cookies, Facebook){
			// $scope.user = {name: 'asdasdas'};

			if($auth.getUser()){
				$scope.user = $auth.getUser();
			} else {
				$http.get($appConfig.API_URL + "/auth")
				.success(function(data){
					if(!data.error){
						$auth.setUser(data.content);
						$scope.user = data.content;
					}
				})
				.error(function(err){
					console.log(err);
				})
			}

			$scope.logout = function(){
				$auth.logout();
			}

			$scope.login = function() {
				Facebook.login(function(response) {
					if (response.authResponse) {
						var access_token = response.authResponse.accessToken;
						var id = response.authResponse.userID;
						$auth.login(access_token, id, function(){
							window.location.reload();
						});
					}
				}, {
			    	scope: ['email', 'public_profile', 'user_friends']
			    });
			};

			$scope.search = function(){
				window.location = "#/search?q="+$scope.query;
			}
		}]
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
.controller('HomeCtrl', ['$scope', '$http', '$jQueryLoader', '$appConfig',
	function($scope, $http, $jQueryLoader, $appConfig) {
		$scope.jLoader = $jQueryLoader;

		$scope.loadJquery = function(){
			$jQueryLoader.loadTab();
		}
		$scope.loadJquery();

		$scope.getAllBook = function(){
			$http.get($appConfig.API_URL+'/book?sort=updatedAt DESC')
			.success(function(data){
				if (!data.error){
					$scope.books = data.content;
				}
			})
		}

		$scope.recommendation = [];
		$scope.getAllUser = function(){
			$http.get($appConfig.API_URL+'/user?sort=updatedAt DESC')
			.success(function(data){
				if (!data.error){
					$scope.users = data.content;
					for(var i = 0; i<data.content.length; i++){
						$scope.recommendation = $scope.recommendation.concat(data.content[i].recommendation);
						shuffle($scope.recommendation);
					}
				}
			})
		}
		function shuffle(o) {
			for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
		}

		$scope.hasOwner = function(book){
			if(book.owners.length > 0){
				return book;
			}
		}

		$scope.getAllBook();
		$scope.getAllUser();
}]);
'use strict';

angular.module('myApp.manage_book', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/manage-book', {
		templateUrl: 'views/manage_book/manage_book.html',
		controller: 'ManageBookCtrl',
		access: {
			requiresLogin: true
		}
	});
}])

.controller('ManageBookCtrl', ['$scope','$http', '$appConfig', '$auth', '$jQueryLoader',
	function($scope, $http, $config, $auth, $jQueryLoader) {
		$jQueryLoader.loadTab();
		$jQueryLoader.loadModal();
		$scope.user = $auth.getUser();

		$scope.searchString = '';
		$scope.results = [];

		function getBooks(){
			$http.get($config.API_URL + "/user/" + $scope.user.id + "/books")
			.success(function(data){
				$scope.userBooks = data.content;
			}).error(function(err){
				console.log(err);
			})
		}
		function getRecommendation(){
			$http.get($config.API_URL + "/user/" + $scope.user.id + "/recommendation")
			.success(function(data){
				$scope.userRecommendation = data.content;
			}).error(function(err){
				console.log(err);
			})
		}

		getBooks();
		getRecommendation();

		var mode = true;
		$scope.setMode = function(m){
			mode = m;
		}

		$scope.redirect = function(bookId){
			document.location= "#/book/"+bookId;
		}

		$scope.log = function(){
			var bookApi = "https://www.googleapis.com/books/v1/volumes?q="+$scope.searchString+"&projection=lite&zoom=0&maxResults=10&key=AIzaSyDPbxwPRGpfKSdWNJxu_yp0KR9NNIXfnhw";
			$http.get(bookApi)
			.success(function(data){
				$scope.results = data.items;
			})
			.error(function(data){
				console.log(data);
			})
		}

		$scope.addBook = function(bookId){
			$http.get("https://www.googleapis.com/books/v1/volumes/"+bookId)
			.success(function(data){
				var imgUrl = null;
				if(data.volumeInfo.hasOwnProperty('imageLinks')){
					if(data.volumeInfo.imageLinks.hasOwnProperty('medium')){
						imgUrl = data.volumeInfo.imageLinks.medium;
						console.log(imgUrl);
					} else {
						imgUrl = data.volumeInfo.imageLinks.thumbnail;
						console.log(imgUrl);
					}
				}
				if(!imgUrl) imgUrl= 'img/book/default.jpg';

				var type = null;
				if(data.volumeInfo.hasOwnProperty('categories')){
					type = data.volumeInfo.categories[0];
				}


				var regex = /(<([^>]+)>)/ig;
				var body = data.volumeInfo.description;
				var result = body ? body.replace(regex, "") : body;
				var book = {
					'bookname': data.volumeInfo.title,
					'author': data.volumeInfo.authors,
					'url': imgUrl,
					'description': result,
					'type': type,
					'isBook': mode
				};

				var url = $config.API_URL + "/user/" + $scope.user.id + "/addBook";
				$http.post(url, book)
				.success(function(data){
					$("#addPopup").closeModal();
					mode ? getBooks() : getRecommendation();
				}).error(function(data){
					console.log(data);
				})
			});
		}

		$scope.removeBook = function(bookId){
			var url = '';
			if(mode){
				url = $config.API_URL + "/user/" + $scope.user.id + "/books/" + bookId;
			} else {
				url = $config.API_URL + "/user/" + $scope.user.id + "/recommendation/" + bookId;
			}
			$http.delete(url)
			.success(function(data){
				$("#addPopup").closeModal();
				mode ? getBooks() : getRecommendation();
			})
			.error(function(data){
				console.log(data);
			})
		}
	}
	]);
'use strict';

angular.module('myApp.message', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/message', {
		templateUrl: 'views/message/message.html',
		controller: 'MessageCtrl',
		access: {
			requiresLogin: true
		}
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
						if(data.content.length == 0){
							$scope.no_message = true;
							return;
						}
						
						borrowId = data.content[0].id;
						$scope.request = data.content[0];
						$scope.startDate = data.content[0].startDate.substring(0,10);
						$scope.returnDate = data.content[0].returnDate.substring(0,10);

						if(data.content[0].fromUser.id == currentUser.id){
							$scope.borrowFlag = true;
						} else {
							$scope.borrowFlag = false;
						}
						$scope.getComment();
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

					$scope.getComment();
				}
			})
			.error(function(error){

			})
		}
		$scope.getRequest();

		$scope.getComment = function(){
			$http.get($config.API_URL + "/message?borrow=" + borrowId)
			.success(function(data){
				if(!data.error){
					$scope.commentList = data.content
				}
			})
			.error(function(error){
				console.log(error);
			})
		}


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
'use strict';

angular.module('myApp.profile', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/profile/:id', {
		templateUrl: 'views/profile/profile.html',
		controller: 'ProfileCtrl'
	});
}])

.controller('ProfileCtrl', [
		'$scope',
		'$routeParams',
		'$http',
		'$jQueryLoader',
		'$appConfig',
		'$auth',
		'$rootScope',
		function($scope, $routeParams, $http, $jQueryLoader, $appConfig, $auth) {

	$scope.jLoader = $jQueryLoader;

	$scope.loadJquery = function(){
		$jQueryLoader.loadTab();
	}
	
	$scope.redirect = function(bookId){
		document.location= "#/book/"+bookId;
	}

	$scope.setBorrow = function(user, book){
		$scope.borrowUser = user;
		$scope.borrowBook = book;
	}

	$scope.currentUser = $auth.getUser();
	$scope.user = {};

	$scope.getUser = function(){
		$http.get($appConfig.API_URL + "/user/" + $routeParams.id)
		.success(function(data){
			if(!data.error){
				$scope.user = data.content;
			}
		})
	}
	$scope.getUser();

	$scope.getMessage = function(){
		$http.get($appConfig.API_URL + "/user_rating?toUser=" + $routeParams.id)
		.success(function(data){
			if(!data.error){
				$scope.commentList = data.content
			}
		})
		.error(function(error){
			console.log(error);
		})
	}
	$scope.addMessage = function(message){
		$http.post(
			$appConfig.API_URL + "/user_rating",
			{
				'fromUser': $auth.getUser().id,
				'toUser': $scope.user.id,
				'message': message
			}
		).success(function(data){
			if(!data.error){
				$scope.getMessage();
			}
		})
	}

	$scope.getMessage();

	$scope.loadJquery();
}]);
'use strict';

angular.module('myApp.profile_banner', [])

.directive('profileBanner', ['$jQueryLoader', '$auth', function($jQueryLoader, $auth) {
	return {
		restrict: 'E',
		scope:{
			user: "=",
		},
		replace: true,
		templateUrl: 'views/profile_banner/profile_banner.html',
	}
}]);
'use strict';

angular.module('myApp.borrow_request', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/borrow', {
		templateUrl: 'views/request/borrow_request.html',
		controller: 'BorrowRequestCtrl',
		access: {
			requiresLogin: true
		}
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
'use strict';

angular.module('myApp.lend_request', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/lend', {
		templateUrl: 'views/request/lend_request.html',
		controller: 'LendRequestCtrl',
		access: {
			requiresLogin: true
		}
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
'use strict';

angular.module('myApp.search', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/search', {
		templateUrl: 'views/search/search.html',
		controller: 'SearchCtrl'
	});
}])

.controller('SearchCtrl', ['$scope', '$routeParams', '$http', '$appConfig', function($scope, $routeParams, $http, $config) {
	$scope.loadJquery = function(){
		$('ul.tabs').tabs();

		$(".search-list tr td").click(function(){
			document.location = "#/book";
		})
	}
	$scope.loadJquery();

	var query = $routeParams.q;
	console.log($config.API_URL + '/book?where={"bookname":{"contains":"'+query+'"}}');


	$http.get($config.API_URL + '/book?where={"bookname":{"contains":"'+query+'"}}')
	.success(function(data){
		if(!data.error){
			$scope.books = data.content;
		}
	})

	$http.get($config.API_URL + '/user?where={"name":{"contains":"'+query+'"}}')
	.success(function(data){
		if(!data.error){
			$scope.peoples = data.content;
		}
	})
}]);