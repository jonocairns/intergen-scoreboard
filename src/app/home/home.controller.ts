module app.home {
	'use strict';

	export class HomeController {

		public isAngularRunning: boolean;

		/* @ngInject */
		constructor (private leaderboardService: app.services.ILeaderboardService) {
			leaderboardService.getByDay('Monday');
		}
	}

	angular
		.module('app.home')
		.controller('app.home.HomeController', HomeController);
}
