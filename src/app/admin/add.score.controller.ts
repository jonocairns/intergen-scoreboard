module app.admin {
	'use strict';

	export class AddScoreController {

		public score: number;
		public name: string;

		/* @ngInject */
		constructor (private scoreService: app.services.IScoreService) {
		}

		public save() {
			var payload = new app.leaderboard.Leaderboard(this.score, app.utils.Guid.new().value, this.name, new Date(), moment().format('dddd'));

			this.scoreService.add(payload);
		}
	}

	angular
		.module('app.admin')
		.controller('addScoreController', AddScoreController);
}

