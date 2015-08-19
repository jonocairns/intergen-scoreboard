module app.admin {
	'use strict';

	export class AddScoreController {

		public score: string;
        public name: string;
        public query: string = '';

		/* @ngInject */
		constructor (private scoreService: services.IScoreService, private userService: services.IUserService) {
		}

		public save(): void {
			var score = parseInt(this.score, 10);
			var payload = new leaderboard.Leaderboard(score, utils.Guid.new().value, this.name, new Date(), moment().format('dddd'));

			this.scoreService.add(payload, () => {
				this.clear();
			});
        }

        public search(): void {
            this.userService.search(this.query).then((users: Array<admin.User>) => {
							console.log(users);
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
