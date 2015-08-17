module app.admin {
	'use strict';

	export class LoginController {

		public email: string;
		public password: string; 

		/* @ngInject */
		constructor (private userService: app.services.IUserService) {
		}

		public save() {
			this.userService.login(this.email, this.password);
		}
	}

	angular
		.module('app.admin')
		.controller('loginController', LoginController );
}

