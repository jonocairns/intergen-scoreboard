module app.admin {
    'use strict';

    export class AdminController {
        public leaderboard: AngularFireArray;
        public dataLoading: boolean = true;
        public days: Array<string>;
        public selectedDay: string;

        /* @ngInject */
        constructor(private leaderboardService: services.ILeaderboardService) {
            this.days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

            this.selectedDay = moment().format('dddd');

            this.leaderboard = leaderboardService.getByDay(this.selectedDay);

            this.leaderboard.$loaded(() => {
                this.dataLoading = false;
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
    }

    angular
        .module('app.admin')
        .controller('adminController', AdminController);
}

