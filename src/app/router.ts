module app {
	'use strict';

	/* @ngInject */
	function config($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'app/home/home.html',
            controller: 'app.home.HomeController'
        });

        $stateProvider.state('add', {
            url: '/add',
            templateUrl: 'app/admin/add.html',
            controller: 'app.admin.AddEntryController'
        });

        $stateProvider.state('leaderboard', {
            url: '/leaderboard',
            templateUrl: 'app/leaderboard/leaderboard.html',
            controller: 'leaderboardController',
            controllerAs: 'vm'
        });

        $urlRouterProvider.otherwise('/');
	}

	angular
        .module('app')
        .config(config);
}
