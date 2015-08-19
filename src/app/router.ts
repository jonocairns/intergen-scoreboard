module app {
	'use strict';

	/* @ngInject */
	function config($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'app/home/home.html',
            controller: 'app.home.HomeController'

        });

        $stateProvider.state('admin', {
        	url: '/admin',
        	templateUrl: 'app/admin/admin.html',
        	onEnter: (userService: app.services.IUserService, $state: ng.ui.IStateService) => {
				if(!userService.isLoggedIn()) {
					$state.go('home');
				}
        	}
        });

        $stateProvider.state('leaderboard', {
            url: '/leaderboard{day:(?:/[^/]+)?}',
            templateUrl: 'app/leaderboard/leaderboard.html',
            controller: 'leaderboardController',
            controllerAs: 'vm',
            resolve: {
                day: ($stateParams: any) => {
                    var day = $stateParams.day;
                    day = _.trim(day, '/');

                    if(day.length > 0) {
                        return day;
                    }

                    return moment().format('dddd');
                }
            }
        });

        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'app/admin/login.html',
            controller: 'loginController',
            controllerAs: 'vm'
        });

        $stateProvider.state('logout', {
        	url: '/',
            controllerAs: 'vm',
            resolve: {
                logout: (userService: app.services.IUserService, $state: ng.ui.IStateService) => {
                    userService.logout();
                    $state.go('home');
                }
            }
        });

        $urlRouterProvider.otherwise('/');
	}

	angular
        .module('app')
        .config(config);
}
