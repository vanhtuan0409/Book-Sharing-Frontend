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
			// console.log($('.dropdown-button'));
		}
	}
})
.factory('$appConfig', function(){
	return {
		API_URL: 'http://localhost:1337/api'
	}
})
.factory('$auth', ['$appConfig', '$http', '$cookieStore', function($appConfig, $http, $cookieStore){
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
			$http.get($appConfig.API_URL + "/auth/logout")
			window.location.reload();
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
					currentUser = data.content;
					cb();
				} else {
					currentUser = null;
					cb();
				}
			}).error(function(err){
				currentUser = null;
				cb();
			})
		}
	}
}]);