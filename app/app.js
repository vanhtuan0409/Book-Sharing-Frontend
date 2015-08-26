'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
	'ngRoute',
	'ngCookies',
	'facebook',
	'pascalprecht.translate',
	'myApp.header',
	'myApp.home',
	'myApp.profile',
	'myApp.book_detail',
	'myApp.message',
	'myApp.comment',
	'myApp.search',
	'myApp.borrow_request',
	'myApp.lend_request',
	'myApp.borrow_form',
	'myApp.profile_banner',
	'myApp.manage_book',
	'myApp.footer',
	'myApp.version',
	'myApp.services'
])

.config(['$routeProvider', 'FacebookProvider', '$translateProvider', '$httpProvider', function($routeProvider, FacebookProvider, $translateProvider, $httpProvider) {
	$routeProvider.otherwise({
		redirectTo: '/'
	});

	$httpProvider.defaults.withCredentials = true;

	FacebookProvider.init('868507116576768');

	$translateProvider.translations('en', {
		'HEADER_SEARCH_PLACEHOLDER': 'Explore Book Sharing',
		'LOGIN': 'Login via FB',
		'PROFILE': 'Profile',
		'MANGE_BOOK': 'Manage your book',
		'LOGOUT': 'Logout',
		'POPULAR': 'Most Popular',
		'AROUND': 'Book Around You',
		'NEW_RELEASE': 'New Release',
		'INFORMATION': 'Information',
		'NAME': 'Name',
		'LOCATION': 'Location',
		'REPUTATION': 'Reputation',
		'BOOK': 'Books',
		'RECOMMENDATION': 'Recommendation',
		'USER_RATING': 'User rating',
		'BOOK_COVER': 'Book Cover',
		'BOOK_AUTHOR': 'Author',
		'BOOK_NAME': 'Book Name',
		'DESCRIPTION': 'Description',
		'BOOK_TYPE': 'Type',
		'BOOK_OWNED': 'Book Owned',
		'BOOK_BORROW': 'Book Borrow',
		'BOOK_LEND': 'Book Lend',
		'BOOK_MANAGE': 'Book Manage',
		'BORROW_REQUEST': 'Borrow Request',
		'LEND_REQUEST': 'Lend Request',
		'ADD_BOOK': 'Add New Book',
		'SEARCH_BOOK': 'Search for book title',
		'RESULT': 'Result',
		'ALL': 'All',
		'ACTIVE': 'Active',
		'COMPLETE': 'Complete',
		'VIEW_MORE': 'View more...',
		'MESSAGE': 'Message',
		'MEET_UP_DATE': 'Meet up date',
		'RETURN_DATE': 'Return date',
		'BORROW_MESSAGE': 'You want to borrow from <b>{{toUser}}</b> the book <b>{{book}}</b>',
		'LEND_MESSAGE': '<b>{{fromUser}}</b> want to borrow your book <b>{{book}}</b>',
		'SEND': 'Send',
		'ACCEPT': 'Accept',
		'ACCEPTED': 'Accepted',
		'CLOSED': 'Closed',
		'DELETE': 'Delete',
		'REMOVE': 'Remove',
		'CANCEL': 'Cancel',
		'ADD': 'Add',
		'REQUEST_TO_BORROW': 'Request to borrow',
		'REQUEST_FROM': 'Request form',
		'SEND_YOUR_REQUEST': 'Send your request',
		'BORROW': 'Borrow',
		'LEND': 'Lend',
		'POST_YOUR_COMMENT': 'Post your comment',
		'CHOOSE_MEETUP': 'Choose your meet up date',
		'CHOOSE_RETURN': 'Choose your return date',
		'PEOPLE': 'People',
		'ALL_BOOK': 'All Book',
		'NO_MESSAGE': 'YOU HAVE NO MESSAGE YET!',
		'BOOK_REVIEWS': 'Book Reviews',
	});

	$translateProvider.translations('ja', {
		'HEADER_SEARCH_PLACEHOLDER': '本を検索',
		'LOGIN': 'FBでログイン',
		'PROFILE': 'プロフィール',
		'MANGE_BOOK': '本の管理',
		'LOGOUT': 'ログアウト',
		'POPULAR': '一番人気',
		'AROUND': 'あなたの周りの本',
		'NEW_RELEASE': '新書',
		'INFORMATION': '情報',
		'NAME': '名前',
		'LOCATION': '場所',
		'REPUTATION': '評判',
		'BOOK': '本',
		'RECOMMENDATION': 'おすすめの本',
		'USER_RATING': 'おすすめ度',
		'BOOK_COVER': '本の表紙',
		'BOOK_AUTHOR': '作者',
		'BOOK_NAME': '本の名前',
		'DESCRIPTION': '説明',
		'BOOK_TYPE': 'タイプ',
		'BOOK_OWNED': '登録している本',
		'BOOK_BORROW': '今までに借りた本',
		'BOOK_LEND': '今までに貸した本',
		'BOOK_MANAGE': '本の管理',
		'BORROW_REQUEST': 'あなたの本リクエスト',
		'LEND_REQUEST': 'あなたの本へのリクエスト',
		'ADD_BOOK': '新しい本を追加する',
		'SEARCH_BOOK': '本のタイトルを検索する',
		'RESULT': '結果',
		'ALL': '全',
		'ACTIVE': '貸出中',
		'COMPLETE': '完了',
		'VIEW_MORE': 'もっと見る...',
		'MESSAGE': 'メッセージ',
		'MEET_UP_DATE': '待ち合わせ日',
		'RETURN_DATE': '返却日',
		'BORROW_MESSAGE': '<a href="{{userUrl}}" style="color:black;"><b>{{toUser}}</b></a>から<a href="{{bookUrl}}" style="color:black;"><b>{{book}}</b></a>を借りたいです',
		'LEND_MESSAGE': '<a href="{{userUrl}}" style="color:black;"><b>{{fromUser}}</b></a>はあなたの<a href="{{bookUrl}}" style="color:black;"><b>{{book}}</b></a>を借りたいです',
		'SEND': '送る',
		'ACCEPT': '同意',
		'ACCEPTED': '同意された',
		'CLOSED': '閉めた',
		'DELETE': '消す',
		'REMOVE': '消す',
		'CANCEL': 'キャンセル',
		'ADD': '加える',
		'REQUEST_TO_BORROW': '借りる為に連絡をします',
		'REQUEST_FROM': 'からのリクエスト',
		'SEND_YOUR_REQUEST': 'リクエストを送信します',
		'BORROW': '借りる',
		'LEND': '貸しる',
		'POST_YOUR_COMMENT': 'コメントを投稿する',
		'CHOOSE_MEETUP': '待ち合わせ日を選ぶ',
		'CHOOSE_RETURN': '返却日を選ぶ',
		'PEOPLE': '人',
		'ALL_BOOK': '全ての本',
		'NO_MESSAGE': 'メッセージがまだありません!',
		'BOOK_REVIEWS': '本のレビュー',
	});

	$translateProvider.preferredLanguage('ja');
}])

.run(['$rootScope', '$auth', '$cookieStore', '$translate', function($rootScope, $auth, $cookieStore, $translate) {
	if($cookieStore.get('lang')){
		$translate.use($cookieStore.get('lang'));
	}

	$rootScope.$on('$routeChangeStart', function(event, next) {
		if (next.access !== undefined) {
			if (next.access.requiresLogin && !$auth.getUser()) {
				window.location = "#/";
			}
		}
	})
}]);