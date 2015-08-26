module app.utils {
	'use strict';

	export interface IMandrillService {
		send(to: string, from: string, message: string, subject: string): ng.IPromise<any>;
		sms(toNumber: string, message: string): ng.IPromise<any>;
	}

	class MandrillService implements IMandrillService {

		public mandrill: ApiKey;
		public twilio: ApiKey;

		constructor(private $http: ng.IHttpService, private endpointService: IEndpointService, private $firebaseArray: any) {
			var ref = this.endpointService.getKeys();
			var array = $firebaseArray(ref);

			array.$loaded(() => {
				_.each(array, (key: any) => {
					if(key.$id === 'mandrill') {
						this.mandrill = new ApiKey(key.$id, key.$value);
					}
					if(key.$id === 'twilio') {
						this.twilio = new ApiKey(key.$id, key.$value);
					}
				});
			});
		}

		public send(to: string, from: string, message: string, subject: string): ng.IPromise<any> {
			return this.$http.post('https://mandrillapp.com/api/1.0/messages/send.json', {
				key: this.mandrill.value,
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

		public sms(toNumber: string, message: string): ng.IPromise<any> {
			var authData = btoa(this.twilio.value);

			return this.$http({
				method: 'POST',
			   url: 'https://api.twilio.com/2010-04-01/Accounts/ACd5a34d0b373349656fb2e42c1ae0a4e7/Messages.json',
			   data: $.param({Body: message, To: toNumber, From: '+16175443729'}),
			   headers: {'Content-Type': 'application/x-www-form-urlencoded',
		   				'Authorization': 'Basic ' + authData
					}
			});

		}
	}

	angular
		.module('app.utils')
		.service('mandrillService', MandrillService);
}
