module app.utils {
	'use strict';

	export interface IToastService {
	}

	class ToastService implements IToastService {
		private defaultDuration: number;

		constructor() {
			this.defaultDuration = 4000;
		}

		public toast(message: string, duration?: number): void {
			if(_.isUndefined(duration)){
            	Materialize.toast(message, this.defaultDuration);
			} else {
				Materialize.toast(message, duration);
			}
		}
	}
	
	angular
		.module('app.utils')
		.service('toastService', ToastService);
}