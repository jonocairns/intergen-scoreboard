module app.utils {
	'use strict';

	export interface IEndpointService {
		getLeaderboard(): Firebase;
		getUsers(): Firebase;
		get(): Firebase;
		getKeys(): Firebase;
	}

	class EndpointService implements IEndpointService {

		private baseUrl: string = 'https://intergen-scoreboard.firebaseio.com';
        private firebase: Firebase;

        constructor($location: ng.ILocationService) {
        	if($location.host() === 'localhost') {
				this.baseUrl = 'https://int-scoreboard-dev.firebaseio.com';
        	}
            this.firebase = new Firebase(this.baseUrl);
        }

		public getLeaderboard(): Firebase {
            return this.firebase.child('/leaderboard');
		}

		public getUsers(): Firebase {
            return this.firebase.child('/users');
		}

		public getKeys(): Firebase {
			return this.firebase.child('/keys');
		}

		public get(): Firebase {
		    return this.firebase;
		}
	}

	angular
		.module('app.utils')
		.service('endpointService', EndpointService);
}
