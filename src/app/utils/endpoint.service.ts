module app.utils {
	'use strict';

	export interface IEndpointService {
		getLeaderboards(): any;
	}

	class EndpointService implements IEndpointService {
		public getLeaderboards(): any {
			return new Firebase('https://intergen-scoreboard.firebaseio.com/leaderboard');
		}
	}
	
	angular
		.module('app.utils')
		.service('endpointService', EndpointService);
}