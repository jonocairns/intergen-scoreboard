module app {
	'use strict';

	/* @ngInject */
	function config($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
		$stateProvider.state('home', {
            url: '/',
            templateUrl: 'app/home/home.html',
            controller: 'app.home.HomeController'
        });

        $urlRouterProvider.otherwise('/');
	}

	angular
        .module('app')
        .config(config);
}
