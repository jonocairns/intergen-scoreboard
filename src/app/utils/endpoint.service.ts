module app.utils {
	'use strict';

	export interface IEndpointService {
		getLeaderboard(): Firebase;
		getUsers(): Firebase;
		get(): Firebase;
	}

	class EndpointService implements IEndpointService {

		private baseUrl: string = 'https://intergen-scoreboard.firebaseio.com';
        private firebase: Firebase;

        constructor() {
            this.firebase = new Firebase(this.baseUrl);
        }

		public getLeaderboard(): Firebase {
            return this.firebase.child('/leaderboard');
		}

		public getUsers(): Firebase {
            return this.firebase.child('/users');
		}

		public get(): Firebase {
		    return this.firebase;
		}
	}
	
	angular
		.module('app.utils')
		.service('endpointService', EndpointService);
}