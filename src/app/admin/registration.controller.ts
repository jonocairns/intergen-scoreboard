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

    public pullTwitter() {
        this.userService.loginProvider('twitter').then((authData: any) => {
            this.user.name = authData.twitter.displayName;
            this.user.email = authData.twitter.email;
            this.user.image = authData.twitter.profileImageURL;
        });
    }

		public pullFacebook() {
				this.userService.loginProvider('facebook').then((authData: any) => {
						this.user.name = authData.facebook.displayName;
						this.user.email = authData.facebook.email;
						this.user.image = authData.facebook.profileImageURL;
				});
		}

		public pullGoogle() {
				this.userService.loginProvider('google').then((authData: any) => {
						this.user.name = authData.google.displayName;
						this.user.email = authData.google.email;
						this.user.image = authData.google.profileImageURL;
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
