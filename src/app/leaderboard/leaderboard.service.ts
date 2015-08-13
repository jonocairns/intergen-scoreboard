module app.services {
	'use strict';

	export interface ILeaderboardService {
		get(): AngularFireArray;
	} 

	class LeaderboardService implements ILeaderboardService {
		/* @ngInject */
		constructor(private endpointService: app.utils.IEndpointService, private $firebaseArray: any) {
		}

		public get(): AngularFireArray {
			var ref = this.endpointService.getLeaderboards();
			var query = ref.orderByChild('score');

			return this.$firebaseArray(query);
		}
	}

	angular
		.module('app.services')
		.service('leaderboardService', LeaderboardService);
}