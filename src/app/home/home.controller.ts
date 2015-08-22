module app.home {
	'use strict';

	export class HomeController {
		/* @ngInject */
		constructor () { }
	}

	angular
		.module('app.home')
		.controller('homeController', HomeController);
}