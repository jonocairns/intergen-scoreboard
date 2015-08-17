module app.services {
	'use strict';

	export interface IScoreService {
		add(entry: app.leaderboard.Leaderboard, successAction: Function): void;
	}

	class ScoreService implements IScoreService {
		/* @ngInject */
		constructor(private endpointService: app.utils.IEndpointService, private $firebaseArray: any) {
		}

		public add(entry: app.leaderboard.Leaderboard, successAction: Function): void {
			var ref = this.endpointService.getLeaderboard();
			var leaderboard = this.$firebaseArray(ref);
			
			leaderboard.$add(entry).then(() => {
				successAction();
			});
		}
	}

	angular
		.module('app.services')
		.service('scoreService', ScoreService);
}