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
	function($http, $scope, $jQueryLoader, $appConfig, $routeParams) {

		$scope.jLoader = $jQueryLoader;
		$scope.loadJquery = function(){
			$jQueryLoader.loadModal();
		}
		$scope.loadJquery();

		$scope.setBorrow = function(user, book){
			$scope.borrowUser = user;
			$scope.borrowBook = book;
		}

		$scope.getBook = function(){
			$http.get($appConfig.API_URL + "/book/" + $routeParams.id)
			.success(function(data){
				if(!data.error){
					$scope.book = data.content;
				}
			})
		}
		$scope.getBook();

		$scope.commentUrl = $appConfig.API_URL + "/book_comment?book=" + $routeParams.id;
	}]);
'use strict';

angular.module('myApp.borrow_form', [])

.directive('borrowForm', ['$jQueryLoader', function($jQueryLoader) {
	return {
		restrict: 'A',
		trasclude: true,
		replace: false,
		templateUrl: 'views/borrow_form/borrow_form.html',
		link: function($scope,element,attrs){
			$jQueryLoader.loadDatePicker();
		},
		controller: ['$scope', '$http',  '$auth', '$appConfig', function($scope, $http, $auth, $config){
			$scope.dateMeet = '';
			$scope.dateReturn = '';
			$scope.borrowMessage = '';

			$scope.submit = function(){
				var dateMeet = $scope.dateMeet || "";
				var dateReturn = $scope.dateReturn || "";
				var msg = $scope.borrowMessage || "";
				var bookId = $scope.borrowBook.id || "";
				var toId = $scope.borrowUser.id || "";
				var fromId = $auth.getUser().id || "";
				$http.post(
					$config.API_URL + "/user/" + fromId + "/borrow",
					{
						"requestToUser": toId,
						"requestBook": bookId,
						"startDate": dateMeet,
						"returnDate": dateReturn,
						"message": msg
					}
				).success(function(data){
					window.location = "#/borrow";
				}).error(function(data){
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
			$scope.user = $auth.getUser();

			$scope.logout = function(){
				$auth.logout();
				window.location.reload();
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

	$scope.random = function(){
		return Math.random();
	}

	$scope.getAllBook = function(){
		$http.get($appConfig.API_URL+'/book')
		.success(function(data){
			if (!data.error){
				$scope.books = data.content;
			}
		})
	}
	$scope.getAllBook();
}]);
'use strict';

angular.module('myApp.manage_book', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/manage-book', {
		templateUrl: 'views/manage_book/manage_book.html',
		controller: 'ManageBookCtrl'
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
			var bookApi = "https://www.googleapis.com/books/v1/volumes?q="+$scope.searchString+"&printType=books&projection=lite&maxResults=10&key=AIzaSyBTV6vCk7Ns6PQ0BT_BhaqorBlf253YwHs";
			$http.get(bookApi)
			.success(function(data){
				$scope.results = data.items;
			})
			.error(function(data){
				console.log(data);
			})
		}

		$scope.addBook = function(bookObj){
			var book = {
				'bookname': bookObj.volumeInfo.title,
				'author': bookObj.volumeInfo.authors,
				'url': bookObj.volumeInfo.imageLinks.thumbnail,
				'description': bookObj.volumeInfo.description,
				'type': bookObj.volumeInfo.mainCategory,
				'isBook': mode
			};

			console.log(mode);

			var url = $config.API_URL + "/user/" + $scope.user.id + "/addBook";
			$http.post(url, book)
			.success(function(data){
				$("#addPopup").closeModal();
				mode ? getBooks() : getRecommendation();
			}).error(function(data){
				console.log(data);
			})
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
				console.log(data);
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
				var query = "where={or:[{fromUser:"+currentUser.id+"},{toUser:"+currentUser.id+"}]}";
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

		$scope.getMessageList = function(){
			var query = "where={or:[{fromUser="+$auth.getUser().id+"},{toUser="+$auth.getUser().id+"}]}";
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

	$scope.getUser = function(){
		$http.get($appConfig.API_URL + "/user/" + $routeParams.id)
		.success(function(data){
			if(!data.error){
				$scope.user = data.content;
			}
		})
	}
	$scope.getUser();

	$scope.ratingUrl = $appConfig.API_URL + "/user_rating?toUser=" + $routeParams.id;

	$scope.loadJquery();
}]);
'use strict';

angular.module('myApp.profile_banner', [])

.directive('profileBanner', ['$jQueryLoader', '$auth', function($jQueryLoader, $auth) {
	return {
		restrict: 'E',
		scope:{
			user: "="
		},
		trasclude: true,
		replace: false,
		templateUrl: 'views/profile_banner/profile_banner.html'
	}
}]);
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
'use strict';

angular.module('myApp.lend_request', [])

.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/lend', {
		templateUrl: 'views/request/lend_request.html',
		controller: 'LendRequestCtrl'
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

.controller('SearchCtrl', ['$scope', function($scope) {
	$scope.loadJquery = function(){
		$('ul.tabs').tabs();

		$(".search-list tr td").click(function(){
			document.location = "#/book";
		})
	}
	$scope.loadJquery();
}]);