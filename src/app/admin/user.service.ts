module app.services {
	'use strict';

	export interface IUserService {
		save(user: app.admin.User): void;
        login(email: string, password: string): any;
        isLoggedIn(): boolean;
        logout(): void;
	} 

    class UserService implements IUserService {

        public cachedUser: any;

		/* @ngInject */
		constructor(private endpointService: app.utils.IEndpointService, private $firebaseArray: any, private $q: ng.IQService) {
		}

		public save(user: app.admin.User): void {
			var ref = this.endpointService.getUsers();
			var users = this.$firebaseArray(ref);
			
			users.$add(user);
        }

		public login(email: string, password: string): any {
			var ref = this.endpointService.get();
		    var deffered = this.$q.defer();
            ref.authWithPassword({ email: email, password: password }, (err: any, authData: any) => {
                this.cachedUser = authData;
                deffered.resolve(authData);
            });
		    return deffered.promise;
        }

        public logout(): void {
            var ref = this.endpointService.get();
            ref.unauth();
        }

        public isLoggedIn(): boolean {
            var ref = this.endpointService.get();
            return !!ref.getAuth();
        }
	}

		angular
		.module('app.services')
		.service('userService', UserService);
}