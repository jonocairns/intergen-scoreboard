module app.leaderboard {
	'use strict';

	class LeaderboardController {
		public leaderboard: AngularFireArray;

		/* @ngInject */
		constructor(private leaderboardService: app.services.ILeaderboardService) {
			this.leaderboard = leaderboardService.getByDay('monday');
		}

	}

	angular
		.module('app.leaderboard')
		.controller('leaderboardController', LeaderboardController);
}
