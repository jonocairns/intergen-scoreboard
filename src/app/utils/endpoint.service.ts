module app.utils {
	'use strict';

	export interface IEndpointService {
		getLeaderboard(): Firebase;
		getUsers(): Firebase;
		get(): Firebase;
	}

	class EndpointService implements IEndpointService {

		private baseUrl: string = 'https://intergen-scoreboard.firebaseio.com';

		public getLeaderboard(): Firebase {
			return this.buildFirebase('/leaderboard');
		}

		public getUsers(): Firebase {
			return this.buildFirebase('/users');
		}

		public get(): Firebase {
			return new Firebase(this.baseUrl)
		}

		private buildFirebase(path: string): Firebase {
			return new Firebase(this.baseUrl + path);
		}
	}
	
	angular
		.module('app.utils')
		.service('endpointService', EndpointService);
}