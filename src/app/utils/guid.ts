module app.utils {
	'use strict';

	export class Guid {

		public value: string;

		constructor(guid: string) {
			this.value = guid;
		}

		public static new() {
			var guid = this.generateBlock() + this.generateBlock() + '-' + this.generateBlock() + '-' + this.generateBlock() + '-' +
				this.generateBlock() + '-' + this.generateBlock() + this.generateBlock() + this.generateBlock();
			return new Guid(guid);
		}

		public static empty() {
			return new Guid('00000000-0000-0000-0000-000000000000');
		}

		private static generateBlock() {
			return Math.floor((1 + Math.random()) * 0x10000)
		      .toString(16)
		      .substring(1);
		}
	}
}