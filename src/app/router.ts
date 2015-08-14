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
            url: '/add-user',
            templateUrl: 'app/admin/add-user.html',
            controller: 'addUserController',
            controllerAs: 'vm'

        });
        
        $stateProvider.state('add-score', {
            url: '/add-score',
            templateUrl: 'app/admin/add-score.html',
            controller: 'addScoreController',
            controllerAs: 'vm'
        });

        $stateProvider.state('leaderboard', {
            url: '/leaderboard',
            templateUrl: 'app/leaderboard/leaderboard.html',
            controller: 'leaderboardController',
            controllerAs: 'vm'
        });

        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'app/admin/login.html',
            controller: 'loginController',
            controllerAs: 'vm'
        });

        $urlRouterProvider.otherwise('/');
	}

	angular
        .module('app')
        .config(config);
}
