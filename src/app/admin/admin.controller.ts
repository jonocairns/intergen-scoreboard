module app.admin {
    'use strict';

    export class AdminController {
        public leaderboard: AngularFireArray;
        public dataLoading: boolean = true;
        public days: Array<string> = utils.Days.get();
        public selectedDay: string;
        public users: AngularFireArray;

        /* @ngInject */
        constructor(private leaderboardService: services.ILeaderboardService, private userService: services.IUserService) {
            this.selectedDay = moment().format('dddd');

            this.leaderboard = leaderboardService.getByDay(this.selectedDay);
            this.users = userService.getReference();

            this.leaderboard.$loaded(() => {
                this.users.$loaded(() => {
                    this.dataLoading = false;
                });
            });
        }

        public changeDay(): void {
            this.dataLoading = true;
            this.leaderboard.$destroy();

            this.leaderboard = this.leaderboardService.getByDay(this.selectedDay);

            this.leaderboard.$loaded(() => {
                this.dataLoading = false;
            });
        }

        public removeScore(score: leaderboard.Leaderboard) {
        	swal({
        		title: 'Are you sure?',
				text: this.getRemoveScoreMessage(score.name, score.score),
        		type: 'warning',
        		showCancelButton: true,
        		confirmButtonColor: '#F44336',
        		confirmButtonText: 'Remove',
        		html: true
        	}, () => {
            	this.leaderboard.$remove(score);
        	});
        }

        public removeUser(user: admin.User) {
        	swal({
        		title: 'Are you sure?',
				text: this.getRemoveUserMessage(user.name, user.email, user.phone),
				type: 'warning',
				showCancelButton: true,
        		confirmButtonColor: '#F44336',
        		confirmButtonText: 'Remove',
        		html: true
        	}, () => {
	            this.users.$remove(user);
        	});
        }

        private getRemoveUserMessage(name: string, email: string, phone: string) {
			return '<p>You are about to remove the following user:</p><br>' +
				'<p>' + name + '</p>' +
				'<p>' + email + '</p>' +
				'<p>' + phone + '</p>';
        }

        private getRemoveScoreMessage(name: string, score: number): string {
			return 'The entry for <span style="color:#F44336; font-weight: bold;">' +
				name +
				'</span> with score <span style="color:#F44336; font-weight: bold;">' +
				score +
				'</span> will be permanently deleted.';
        }
    }

    angular
        .module('app.admin')
        .controller('adminController', AdminController);
}
