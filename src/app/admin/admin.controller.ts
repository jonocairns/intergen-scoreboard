module app.admin {
    'use strict';

    export class AdminController {
        public leaderboard: AngularFireArray;
        public dataLoading: boolean = true;
        public days: Array<string> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
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
            this.leaderboard.$remove(score);
        }

        public removeUser(user: admin.User) {
            this.users.$remove(user);
        }
    }

    angular
        .module('app.admin')
        .controller('adminController', AdminController);
}

