module app.services {
	'use strict';

	export interface ILeaderboardService {
		getByDay(day: string): Array<any>;
	} 

	class LeaderboardService implements ILeaderboardService {
		/* @ngInject */
		constructor(private endpointService: app.utils.IEndpointService, private $firebaseArray: any) {
		}

		public getByDay(day: string): Array<any> {
			var ref = this.endpointService.getLeaderboards();
			var blah = this.$firebaseArray(ref);

			console.log(blah);
			return [];
		}
	}

		angular
		.module('app.services')
		.service('leaderboardService', LeaderboardService);
}