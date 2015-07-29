angular.module('myApp.services', [])
.factory('$jQueryLoader', function() {
	return {
		// load: function(){
		// 	$('.modal-trigger').leanModal();
		// 	$('.datepicker').pickadate({
		// 	    selectMonths: true,
		// 	    container: 'body'
		// 	});
		// 	$('ul.tabs').tabs();
		// }
		loadModal: function(){
			$('.modal-trigger').leanModal();
			
		},
		loadDatePicker: function(){
			$('.datepicker').pickadate({
				selectMonths: true,
				container: 'body',
				onOpen: function () {
					this.clear();
				},
				onSet: function () {
					var x,y,year,date,month;
					x = $('.datepicker1').pickadate().val().toString();
					y = x.split(/[ ,]+/);
					date = y[0];
					month = y[1];
					year = y[2];
					if(date && month && year){
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
});