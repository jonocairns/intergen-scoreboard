module app.admin {
    'use strict';

    export class AdminController {
        public leaderboard: any;
        public dataLoading: boolean = true;
        public days: Array<string> = utils.Days.get();
        public selectedDay: string;
        public users: any;
        public usersRef: any;
        public leaderboardSearchQuery: string = '';
        public userSearchQuery: string = '';
        public leaderboardRef: any;

        /* @ngInject */
        constructor(private leaderboardService: services.ILeaderboardService,
            private userService: services.IUserService,
            private mandrillService: utils.IMandrillService, private toastService: utils.IToastService) {
            this.selectedDay = moment().format('dddd');

            this.leaderboard = leaderboardService.getByDay(this.selectedDay);
            this.leaderboardRef = this.leaderboard;

            this.users = userService.getReference();
            this.usersRef = this.users;

            this.leaderboard.$loaded(() => {
                this.users.$loaded(() => {
                    this.dataLoading = false;
                });
            });
        }

        public popDetail(id: string): void {
            var user = _.find(this.usersRef, (user: any) => {
                return user.id === id;
            });

            if (_.isUndefined(user)) {
                swal('User not found!');
                return;
            }

            swal({
                title: user.name,
                text: this.getDetailsMessage(user),
                type: 'info',
                html: true
            });
        }

        public changeDay(): void {
            this.dataLoading = true;
            if(!_.isUndefined(this.leaderboard.$destroy)) {
                this.leaderboard.$destroy();
            }

            this.leaderboardRef.$destroy();

            this.leaderboard = [];
            this.leaderboardRef = [];

            this.leaderboard = this.leaderboardService.getByDay(this.selectedDay);
            this.leaderboardRef = this.leaderboard;

            this.leaderboard.$loaded(() => {
                this.dataLoading = false;
            });
            this.searchLeaderboard();
        }

        public sms(entryId: string) {
            var user = _.find(this.usersRef, (user: any) => {
                return user.id === entryId;
            });

            if (_.isUndefined(user)) {
                swal('User not found!');
                return;
            }

            swal({
                title: 'SMS Message',
                text: 'Write a sms message to ' + user.name + ' with the number ' + user.phone,
                type: 'input',
                showCancelButton: true,
                closeOnConfirm: true,
                animation: 'slide-from-top',
                inputPlaceholder: 'Write a message here...' },
                (inputValue: any) => {
                    if (inputValue === false) {
                        return false;
                    }
                    if (inputValue === '') {
                        swal.showInputError('You need to write something!');
                        return false
                    }
                    this.mandrillService.sms(user.phone, inputValue).then(() => {
                        this.toastService.toast('SMS successfully sent to ' + user.name);
                    });
                    return true;
                });
        }

        public message(entryId: string) {
            var user = _.find(this.usersRef, (user: any) => {
                return user.id === entryId;
            });

            if (_.isUndefined(user)) {
                swal('User not found!');
                return;
            }

            swal({
                title: 'Email',
                text: 'Write a email message to ' + user.name + ' with the email ' + user.email,
                type: 'input',
                showCancelButton: true,
                closeOnConfirm: true,
                animation: 'slide-from-top',
                inputPlaceholder: 'Write a message here...' },
                (inputValue: any) => {
                    if (inputValue === false) {
                        return false;
                    }
                    if (inputValue === '') {
                        swal.showInputError('You need to write something!');
                        return false;
                    }
                    this.mandrillService.send(user.email, 'ignite@intergen.co.nz', inputValue, 'Intergen Ignite').then(() => {
                        this.toastService.toast('Email successfully sent to ' + user.name);
                    });
                    return true;
                });
        }

        public searchLeaderboard(): void {
            this.leaderboard = this.leaderboardRef;

            if(_.isUndefined(this.leaderboardSearchQuery) || this.leaderboardSearchQuery === ''){
                return;
            }

            this.leaderboard = _.filter(this.leaderboard, (entry: any) => {
                var query = this.leaderboardSearchQuery.toLowerCase();
                return entry.name.toLowerCase().indexOf(query) > -1;
            });
        }

        public searchUsers(): void {
            this.users = this.usersRef;

            if(_.isUndefined(this.userSearchQuery) || this.userSearchQuery === ''){
                return;
            }

            this.users = _.filter(this.users, (user: any) => {
                var search = this.userSearchQuery.toLowerCase();
                return user.name.toLowerCase().indexOf(search) > -1 &&
                user.email.toLowerCase().indexOf(search) > -1;
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

        private getDetailsMessage(user: admin.User) {
            return '<br>' +
                '<p>Name: ' + user.name + '</p>' +
                '<p>Email: ' + user.email + '</p>' +
                '<p>Company: ' + user.company + '</p>' +
                '<p>Phone: ' + user.phone + '</p>';
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
