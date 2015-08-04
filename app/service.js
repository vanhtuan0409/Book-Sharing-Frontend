angular.module('myApp.services', ['ngCookies'])
.factory('$jQueryLoader', function() {
	return {
		loadModal: function(){
			$('.modal-trigger').leanModal();
		},
		openModal: function(eleId){
			$("#"+eleId).openModal();
		},
		loadDatePicker: function(){
			$('.datepicker').pickadate({
				selectMonths: true,
				format: 'yyyy-mm-dd',
				container: 'body',
				onOpen: function () {
					this.clear();
				},
				onSet: function () {
					if(this.get('value').length > 0){
						this.close();
					}
				}
			});
		},
		loadTab: function(){
			$('ul.tabs').tabs();
		},
		loadDropdown: function(hover){
			$('.dropdown-button').dropdown({
				hover: hover,
				belowOrigin: false
			});
		}
	}
})
.factory('$appConfig', function(){
	return {
		API_URL: 'http://localhost:1337/api'
	}
})
.factory('$auth', ['$appConfig', '$http', '$cookieStore', function($appConfig, $http, $cookieStore){
	// var currentUser = {
	// 	"books": [
	// 	{
	// 		"id": 1,
	// 		"bookname": "Harry Potter",
	// 		"author": [
	// 		"J.K.Rowling"
	// 		],
	// 		"url": "img/book/book9.jpg",
	// 		"description": "Adaptation of the first of J.K. Rowling's popular children's novels about Harry Potter, a boy who learns on his eleventh birthday that he is the orphaned son of two powerful wizards and possesses unique magical powers of his own. He is summoned from his l",
	// 		"type": "Fiction",
	// 		"createdAt": null,
	// 		"updatedAt": null
	// 	},
	// 	{
	// 		"id": 3,
	// 		"bookname": "Running Lean",
	// 		"author": [
	// 		"Ash Maurya"
	// 		],
	// 		"url": "img/book/book11.jpg",
	// 		"description": "We live in an age of unparalleled opportunity for innovation. We're building more products than ever before, but most of them fail--not because we can't complete what we set out to build, but because we waste time, money, and effort building the wrong pro",
	// 		"type": "Entrepreneurship",
	// 		"createdAt": null,
	// 		"updatedAt": null
	// 	},
	// 	{
	// 		"id": 7,
	// 		"bookname": "One Piece",
	// 		"author": [
	// 		"Eiichiro Oda"
	// 		],
	// 		"url": "img/book/book15.png",
	// 		"description": "ONE PIECE (ワンピース Wan Pīsu?) is a pirate adventure manga written and drawn by Eiichiro Oda, created in July 1997. The manga is known to employ colorful and creative motifs that are taken from classic mythology, politics and musical aspects. It is also mixe",
	// 		"type": "Manga",
	// 		"createdAt": null,
	// 		"updatedAt": null
	// 	},
	// 	{
	// 		"id": 8,
	// 		"bookname": "Rain Reign",
	// 		"author": [
	// 		"Ann M. Martin"
	// 		],
	// 		"url": "img/book/book4.jpg",
	// 		"description": "Rose Howard is obsessed with homonyms. She’s thrilled that her own name is a homonym, and she purposely gave her dog Rain a name with two homonyms (Reign, Rein), which, according to Rose’s rules of homonyms, is very special. ...",
	// 		"type": "Fiction",
	// 		"createdAt": null,
	// 		"updatedAt": null
	// 	},
	// 	{
	// 		"id": 9,
	// 		"bookname": "Pixar",
	// 		"author": [
	// 		"A. M. Buckley"
	// 		],
	// 		"url": "http://books.google.co.jp/books/content?id=YenH2ahvGvcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
	// 		"description": "Examines the lives of Steve Jobs, Ed Catmull, and Alvin Ray Smith and the company they founded, Pixar.",
	// 		"type": null,
	// 		"createdAt": "2015-07-31T09:39:07.000Z",
	// 		"updatedAt": "2015-07-31T09:39:07.000Z"
	// 	}
	// 	],
	// 	"recommendation": [
	// 	{
	// 		"id": 2,
	// 		"bookname": "The Lean Startup",
	// 		"author": [
	// 		"Eric Ries"
	// 		],
	// 		"url": "img/book/book10.jpg",
	// 		"description": "The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses is a New York Times best seller by Eric Ries",
	// 		"type": "Entrepreneurship",
	// 		"createdAt": null,
	// 		"updatedAt": null
	// 	}
	// 	],
	// 	"userRating": [],
	// 	"groups": [],
	// 	"id": 1,
	// 	"name": "Shiro",
	// 	"email": "shiro.atware@gmail.com",
	// 	"location": "Yokohama",
	// 	"placeToTrade": [
	// 	"Kogane Cho Station"
	// 	],
	// 	"timeToTrade": [
	// 	12
	// 	],
	// 	"point": 100,
	// 	"url": "img/avatar/the.jpg",
	// 	"createdAt": null,
	// 	"updatedAt": "2015-07-31T09:39:08.000Z"
	// };
	var currentUser = $cookieStore.get('user');
	return {
		isLoggedIn: function(){
			if(currentUser !== null){
				return true;
			}
			return false;
		},
		getUser: function(){
			return currentUser;
		},
		setUser: function(user){
			currentUser = user;
		},
		logout: function(){
			$cookieStore.remove('user');
			currentUser = null;
		},
		login: function(token, id, cb){
			$http.post(
				$appConfig.API_URL + "/auth",
				{
					token: token,
					facebookId: id
				}
			).success(function(data){
				if(!data.error){
					$cookieStore.put('user', data.content);
					currentUser = data.content;
					cb();
				} else {
					$cookieStore.put('user', null);
					currentUser = null;
					cb();
				}
			}).error(function(err){
				$cookieStore.put('user', null);
				currentUser = null;
				cb();
			})
		}
	}
}]);