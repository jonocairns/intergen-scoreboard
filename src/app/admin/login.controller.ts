module app.admin {
	'use strict';

	export class LoginController {

		public email: string;
		public password: string; 

		/* @ngInject */
		constructor (private userService: app.services.IUserService, private $state: any) {
		}

        public save() {
            this.userService.login(this.email, this.password).then(() => this.$state.go('admin'));
        }

        public facebookLogin(): void {
            this.userService.loginFacebook().then(() => this.$state.go('admin'));
        }
	}

	angular
		.module('app.admin')
		.controller('loginController', LoginController );
}

