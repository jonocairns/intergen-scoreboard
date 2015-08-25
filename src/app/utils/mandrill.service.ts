module app.utils {
	'use strict';

	export interface IMandrillService {
		send(to: string, from: string, message: string, subject: string): ng.IPromise<any>;
	}

	class MandrillService implements IMandrillService {


		constructor(private $http: ng.IHttpService) {
		}

		public send(to: string, from: string, message: string, subject: string): ng.IPromise<any> {
			return this.$http.post('https://mandrillapp.com/api/1.0/messages/send.json', {
				key: '8HzAM0frdFZpTwjjf3XImg', // TODO: firebase dis
				message: {
					html: message,
					subject: subject,
					from_email: from,
					from_name: 'Intergen',
					to: [{
						email: to
					}]
				}
			});
		}
	}
	
	angular
		.module('app.utils')
		.service('mandrillService', MandrillService);
}