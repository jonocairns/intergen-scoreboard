module app.admin {
	'use strict';

	export class AddScoreController {

		public score: string;
        public name: string;
        public query: string = '';
        public users: Array<admin.User>;

		/* @ngInject */
		constructor (private scoreService: services.IScoreService, private userService: services.IUserService) {
			this.userService.search(this.query).then((users: Array<admin.User>) => {
				this.users = users; 
			});
		}

		public save(): void {
			var score = parseInt(this.score, 10);
			var payload = new leaderboard.Leaderboard(score, utils.Guid.new().value, this.name, new Date(), moment().format('dddd'));

			this.scoreService.add(payload, () => {
				this.clear();
			});
        }

        public search(query: string): Array<admin.User> {
            var filteredUsers = _.filter(this.users, (user: admin.User) => {
				return user.name.indexOf(query) > -1 || user.email.indexOf(query) > -1;
            });

            return filteredUsers;
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
