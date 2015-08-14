module app.leaderboard {
	'use strict';

	class LeaderboardController {
		public leaderboard: AngularFireArray;
		public dataLoading: boolean = true;

		/* @ngInject */
		constructor(private leaderboardService: app.services.ILeaderboardService, day: string) {
			this.leaderboard = leaderboardService.getByDay(day);

			this.leaderboard.$loaded(() => {
				this.dataLoading = false;
			});
		}

	}

	angular
		.module('app.leaderboard')
		.controller('leaderboardController', LeaderboardController);
}
