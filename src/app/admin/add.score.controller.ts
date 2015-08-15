module app.admin {
	'use strict';

	export class AddScoreController {

		public score: string;
		public name: string;

		/* @ngInject */
		constructor (private scoreService: app.services.IScoreService) {
		}

		public save() {
			var score = parseInt(this.score, 10);
			var payload = new app.leaderboard.Leaderboard(score, app.utils.Guid.new().value, this.name, new Date(), moment().format('dddd'));

			this.scoreService.add(payload, () => {
				this.clear();
			});
		}

		public clear() {
			this.name = '';
			this.score = '';
		}
	}

	angular
		.module('app.admin')
		.controller('addScoreController', AddScoreController);
}