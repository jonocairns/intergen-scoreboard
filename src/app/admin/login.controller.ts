module app.admin {
	'use strict';

	export class LoginController {

		public email: string;
		public password: string; 
		public errorMessage: string = '';
		public isLoading: boolean = false;
		/* @ngInject */
		constructor(private userService: app.services.IUserService, private $state: any, private toastService: utils.IToastService) {
		}

        public save() {
			this.isLoading = true;
			this.errorMessage = '';
            this.userService.login(this.email, this.password).then((resp: any) => {
            	
				if(!_.isUndefined(resp.authData)) {
					this.toastService.toast(this.email + ' just logged in!', 4000);
					this.$state.go('admin');
				} else {
					if(resp.error.code === 'INVALID_EMAIL') {
						this.errorMessage = resp.error.message;
						this.toastService.toast(resp.error.message, 5000);
					} else {
						var failMessage = 'Wrong username or password.';
						this.toastService.toast(failMessage, 5000);
						this.errorMessage = failMessage;
						this.password = '';
					}	
				}
				this.isLoading = false;

			});
		}
	}

	angular
		.module('app.admin')
		.controller('loginController', LoginController );
}

