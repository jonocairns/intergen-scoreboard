module app.admin {
	'use strict';

	export class RegistrationController {
		public user: User;

		/* @ngInject */
		constructor(private userService: app.services.IUserService) {
			this.clear();
		}

		public register() {
			var guid = app.utils.Guid.new();
			this.user.id = guid.value;

			this.userService.save(this.user, () => {
				swal('Successfully Registered!', '', 'success');
				this.clear();
			});
		}

		public clear() {
			this.user = User.empty();
		}

		public validate(): boolean {
			return !this.user.isValid();
		}
	}

	angular
		.module('app.admin')
		.controller('registrationController', RegistrationController);
}