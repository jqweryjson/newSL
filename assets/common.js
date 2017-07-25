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
			'descr':'ActiveCampaignProvider - Список всех акции',
			'method':['GET'],
			'action':['rest/ActiveCampaignProvider'],
		},
		{
			'descr':'Address - ',
			'method':{'GET','GET','GET','GET','GET'},
			'action':['rest/Address',
			'rest/Address?cityCode={cityCode}',
			'rest/Address?cityCode={cityCode}&discrictCode={discrictCode}',
			'rest/Address?cityCode={cityCode}&discrictCode={discrictCode}&countyCode={countyCode}&roadOrStreet={roadOrStreet}',
			'rest/Address?cityCode={cityCode}&countyCode={countyCode}&tmp1={tmp1}&tmp2={tmp2}'],
		},
	];




}]);


