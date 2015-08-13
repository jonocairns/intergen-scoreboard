module app.utils {
	'use strict';

	export interface IEndpointService {
		getLeaderboards(): Firebase;
		getUsers(): Firebase;
	}

	class EndpointService implements IEndpointService {

		public getLeaderboards(): Firebase {
			return new Firebase('https://intergen-scoreboard.firebaseio.com/leaderboard');
		}

		public getUsers(): Firebase {
			return new Firebase('https://intergen-scoreboard.firebaseio.com/users');
		}
	}
	
	angular
		.module('app.utils')
		.service('endpointService', EndpointService);
}