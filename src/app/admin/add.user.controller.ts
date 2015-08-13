module app.admin {
	'use strict';

	export class AddUserController {

		public user: app.admin.User = User.empty();
		/* @ngInject */
		constructor (private userService: app.services.IUserService) {
		}

		public save() {
			this.userService.save(this.user);
		}
	}

	angular
		.module('app.admin')
		.controller('addUserController', AddUserController);
}

