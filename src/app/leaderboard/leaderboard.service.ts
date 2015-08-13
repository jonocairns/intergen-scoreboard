module app.services {
	'use strict';

	export interface ILeaderboardService {
		get(): AngularFireArray;
		getByDay(day: string): AngularFireArray;
	} 

	class LeaderboardService implements ILeaderboardService {
		/* @ngInject */
		constructor(private endpointService: app.utils.IEndpointService, private $firebaseArray: any) {
		}

		public get(): AngularFireArray {
			var ref = this.endpointService.getLeaderboard();
			var query = ref.orderByChild('score');

			return this.$firebaseArray(query);
		}

		public getByDay(day: string): AngularFireArray {
			if (!_.isString(day)) { throw new Error('day must be a string.'); }

			var ref = this.endpointService.getLeaderboard();
			var query = ref.orderByChild('conference_day').equalTo(day);

			return this.$firebaseArray(query);
		}
	}

	angular
		.module('app.services')
		.service('leaderboardService', LeaderboardService);
}