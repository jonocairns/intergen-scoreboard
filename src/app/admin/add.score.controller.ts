module app.admin {
	'use strict';

	export class AddScoreController {
		public inputName: string;
		public score: string;
        public users: Array<admin.User>;
        public user: admin.User = admin.User.empty();
        public autocompleteOptions: any;
        public results: Array<any>;
        public query: string;
		public days: Array<string> = utils.Days.get();
		public selectedDay: string;
		public selectedTime: any;

		/* @ngInject */
		constructor (private scoreService: services.IScoreService, private userService: services.IUserService, private $sce: any) {
			this.autocompleteOptions = {
				suggest: this.suggest.bind(this),
				on_select: this.select.bind(this)
			};

			this.userService.get().then((users: Array<admin.User>) => {
				this.users = users;
			});

			this.selectedTime = new Date();
		}

		public select(selected: any) {
			var selectedUser = selected.obj;
			this.user = new User(selectedUser.id, selectedUser.name, selectedUser.company, selectedUser.email, selectedUser.phone, selectedUser.image);
		}

		public suggest(query: string) {
			query = query.toLowerCase().trim();
			var filteredUsers = _.filter(this.users, (user: admin.User) => {
				return user.name.toLowerCase().indexOf(query) !== -1 || user.email.toLowerCase().indexOf(query) !== -1;
			});

			var results = [];
			_.each(filteredUsers, (user: admin.User) => {
				results.push({
			         value: user.name,
			         obj: user,
			         label: this.$sce.trustAsHtml(
			         	'<strong class="ac-name">' + user.name + '</strong>' +
			         	'<small class="ac-email">' + user.email + '</small>'
			         )
			       });
			});
			this.results = results;
			return results;
		}

		public validate(): boolean {
			if (_.isUndefined(this.score) || this.score === '') {
				return true;
			}

			if (_.isUndefined(this.user) || this.user.isEmpty()) {
				return true;
			}

			var userExists = _.find(this.users, (user: admin.User) => {
				return user.email === this.user.email;
			});

			if (_.isUndefined(userExists)) {
				return true;
			}

			return false;
		}

		public save(): void {
			var score = parseInt(this.score, 10);
			var scoreDay = this.selectedTime;
			if(this.selectedTime instanceof Date) {
				scoreDay = moment(this.selectedTime).format('dddd');
			}
			var payload = new leaderboard.Leaderboard(score, this.user.id, this.user.name, new Date().toISOString(), scoreDay);

			this.scoreService.add(payload, () => {
				this.clear();
			});
        }

		public clear() {
			this.inputName = '';
			this.user = admin.User.empty();
			this.score = '';
		}
	}

	angular
		.module('app.admin')
		.controller('addScoreController', AddScoreController);
}
