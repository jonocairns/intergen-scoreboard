module app.admin {
	'use strict';

	export class RecentMessagesController {
		public recentSms: Array<any> = [];
		public recentEmail: Array<any> = [];
		public dataLoading: boolean = true;

		constructor(mandrillService: utils.IMandrillService, $timeout: any) {
			
			$timeout(() => {

				mandrillService.getRecentEmails().then((emails: any) => {
					this.recentEmail = emails.data;

					_.each(this.recentEmail, (email: any) => {
						mandrillService.getEmailContent(email._id).then((resp: any) => {
							email.content = resp.data.text;
						});
					});

					mandrillService.getRecentSms().then((sms: any) => {
						this.recentSms = sms.data.messages;
						this.dataLoading = false;
					});
				});


			}, 5000);
			
		}

		public format(timestamp: number) {
			return moment.unix(timestamp).format('MMMM Do YYYY, h:mm:ss a');
		}
	}

	angular
		.module('app.admin')
		.controller('recentMessagesController', RecentMessagesController );
}

