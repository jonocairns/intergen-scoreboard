module app.admin {
	'use strict';

	export class AddScoreController {

		public score: string;
        public users: Array<admin.User>;
        public user: admin.User;
        public autocompleteOptions: any;
        public results: Array<any>
		/* @ngInject */
		constructor (private scoreService: services.IScoreService, private userService: services.IUserService, private $sce: any) {
			this.autocompleteOptions = {
				suggest: this.suggest.bind(this),
				on_select: this.select.bind(this)
			}

			this.userService.get().then((users: Array<admin.User>) => {
				this.users = users;
			});
		}

		public select(selected: any) {
			this.user = selected.obj;
		}

		public suggest(query: string) {
			var query = query.toLowerCase().trim();
			var filteredUsers = _.filter(this.users, (user: admin.User) => {
				return user.name.toLowerCase().indexOf(query) !== -1 || user.email.toLowerCase().indexOf(query) !== -1;
			});

			var results = [];
			_.each(filteredUsers, (user: admin.User) => {
				results.push({
			         value: user.name,
			         obj: user,
			         label: this.$sce.trustAsHtml(
			           '<div class="row">' +
			           ' <div class="col-xs-5">' +
			           '  <i class="fa fa-user"></i>' +
			           '  <strong>' + user.name + '</strong>'+
			           ' </div>' +
			           ' <div class="col-xs-7 text-right text-muted">' +
			           '  <small>' + user.email + '</small>' +
			           ' </div>' +
			           '</div>'
			         )
			       });
			});
			this.results = results;
			return results;
		}


		public save(): void {
			var score = parseInt(this.score, 10);
			var payload = new leaderboard.Leaderboard(score, this.user.id, this.user.name, new Date(), moment().format('dddd'));

			this.scoreService.add(payload, () => {
				this.clear();
			});
        }

		public clear() {
			this.user = admin.User.empty();
			this.score = '';
		}
	}

	angular
		.module('app.admin')
		.controller('addScoreController', AddScoreController);
}
