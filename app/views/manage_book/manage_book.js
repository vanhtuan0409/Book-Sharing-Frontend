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