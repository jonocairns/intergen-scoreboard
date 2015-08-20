module app.admin {
	'use strict';
	export class User {
		constructor(public id: string, public name: string, public company: string,
		public email: string, public phone: string) {
		}

		public isEmpty(): boolean {
			return this.id === '' && this.name === '' && this.email === '';
		}

		public static empty(): User {
			return new User('', '', '', '', '');
		}
	}
}