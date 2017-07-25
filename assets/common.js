'use strict'
//es6 imports   

import jQuery from "jquery";
window.$ = window.jQuery = jQuery;
window.Tether = require('tether');
require('bootstrap');


//console.log(Slider);

var angular = require('angular');//подключим ангуляр 1.5



angular.module('app', [])
.controller('cntrl',["$scope", "$http", function (s,$http) {

	const sup = 'loh';
	s.test = sup;

	s.data = [
		{
			'descr':'ShoppingCart - Вернуть корзину',
			'method':['GET'],
			'action':['http://localhost:10020/rest/ShoppingCart'],
		},
	];



	s.sendResp = function(resp){
		$http.get(resp)
			.success(function(d){
				s.respond = d;
			});
	};

}]);


