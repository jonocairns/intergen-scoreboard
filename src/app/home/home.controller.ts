module app.home {
	'use strict';

	export class HomeController {

		public isAngularRunning: boolean;

		/* @ngInject */
		constructor ($scope: ng.IScope) {
			this.isAngularRunning = true;
		}
	}

	angular
		.module('app.home')
		.controller('app.home.HomeController', HomeController);
}
