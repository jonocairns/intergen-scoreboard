module app.services {
	'use strict';

	export interface IUserService {
		save(user: app.admin.User): void;
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
	}

		angular
		.module('app.services')
		.service('userService', UserService);
}