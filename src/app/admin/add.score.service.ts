module app.services {
	'use strict';

	export interface IScoreService {
		add(entry: app.leaderboard.Leaderboard): void;
	} 

	class ScoreService implements IScoreService {
		/* @ngInject */
		constructor(private endpointService: app.utils.IEndpointService, private $firebaseArray: any) {
		}

		public add(entry: app.leaderboard.Leaderboard): void {
			var ref = this.endpointService.getLeaderboard();
			var leaderboard = this.$firebaseArray(ref);
			
			leaderboard.$add(entry);
		}
	}

		angular
		.module('app.services')
		.service('scoreService', ScoreService);
}