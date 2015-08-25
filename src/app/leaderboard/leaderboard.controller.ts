module app.leaderboard {
	'use strict';

	class LeaderboardController {
		public leaderboardRef: any;
		public leaderboard: any;
		public dataLoading: boolean = true;
		public searchQuery: string = '';

		/* @ngInject */
		constructor(private leaderboardService: app.services.ILeaderboardService, day: string) {
			this.leaderboard = leaderboardService.getByDay(day);
			this.leaderboardRef = this.leaderboard;

			this.leaderboard.$loaded(() => {
				this.dataLoading = false;
			});
		}

		public search() {
			this.leaderboard = this.leaderboardRef;

			if(this.searchQuery === '') {
				return;
			}

			var query = this.searchQuery.toLowerCase();
			this.leaderboard = _.filter(this.leaderboard, (entry: any) => {
				return entry.name.toLowerCase().indexOf(query) > -1;
			});
		}
	}

	angular
		.module('app.leaderboard')
		.controller('leaderboardController', LeaderboardController);
}
