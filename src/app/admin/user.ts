module app.admin {
	'use strict';
	export class User {
		constructor(public id: string, public name: string, public company: string,
		public email: string, public phone: string) {
		}

		public static empty(): User {
			return new User('', '', '', '', '');
		}

		public isEmpty(): boolean {
			var emptyUser: User = User.empty();
			return this.equal(emptyUser);
		}

		public equal(other: User): boolean {
			return this.id === other.id &&
				this.name === other.name &&
				this.company === other.company &&
				this.email === other.email &&
				this.phone === other.phone;
		}

		public isValid(): boolean {
			return _.isString(this.name) && this.name.length > 0 &&
				_.isString(this.company) && this.company.length > 0 &&
				_.isString(this.email) && this.email.length > 0 &&
				_.isString(this.phone) && this.phone.length > 0;
		}
	}
}