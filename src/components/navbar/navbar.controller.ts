module app.components {
    'use strict';

    interface INavbarScope extends ng.IScope {
        isLoggedIn: boolean
    }

    export class NavbarController {
        /* @ngInject */
        constructor($scope: INavbarScope, private userService: services.IUserService) {
            $scope.$watch(() => {
                return userService.isLoggedIn();
            }, (newValue: boolean) => {
                $scope.isLoggedIn = newValue;
            });

        }
    }

    angular
        .module('app.components')
        .controller('navbarController', NavbarController);
}
