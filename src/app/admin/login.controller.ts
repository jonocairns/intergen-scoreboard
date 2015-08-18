module app.admin {
	'use strict';

	export class LoginController {

		public email: string;
		public password: string; 

		/* @ngInject */
		constructor (private userService: app.services.IUserService, private $state: any) {
		}

		public save() {
			this.userService.login(this.email, this.password).then((blah: any) => {
                console.log(blah);
                this.$state.go('add-score');
			});
		}
	}

	angular
		.module('app.admin')
		.controller('loginController', LoginController );
}

