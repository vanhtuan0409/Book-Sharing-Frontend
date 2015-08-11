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
			var bookApi = "https://www.googleapis.com/books/v1/volumes?q="+$scope.searchString+"&projection=lite&zoom=0&maxResults=10&key=AIzaSyBTV6vCk7Ns6PQ0BT_BhaqorBlf253YwHs";
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

				var book = {
					'bookname': data.volumeInfo.title,
					'author': data.volumeInfo.authors,
					'url': imgUrl,
					'description': data.volumeInfo.description,
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