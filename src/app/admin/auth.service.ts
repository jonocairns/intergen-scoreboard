module app.services {
	'use strict';

	export interface IAuthService {

	} 

    class AuthService implements IAuthService {

        public cachedUser: any;

		/* @ngInject */
		constructor(private endpointService: app.utils.IEndpointService, private $q: ng.IQService) {
		}

		
	}

		angular
		.module('app.services')
            .service('authService', AuthService);
}