module app.services {
	'use strict';

	export interface IUserService {
		save(user: app.admin.User): void;
		login(email: string, password: string): void;
	} 

	class UserService implements IUserService {
		/* @ngInject */
		constructor(private endpointService: app.utils.IEndpointService, private $firebaseArray: any) {
		}

		public save(user: app.admin.User): void {
			var ref = this.endpointService.getUsers();
			var users = this.$firebaseArray(ref);
			
			users.$add(user);
		}

		public login(email: string, password: string): void {
			var ref = this.endpointService.get();

			ref.authWithPassword({ email: email, password: password }, (err: any, authData: any) => {
				console.log(err);
				console.log(authData);
			});
		}
	}

		angular
		.module('app.services')
		.service('userService', UserService);
}