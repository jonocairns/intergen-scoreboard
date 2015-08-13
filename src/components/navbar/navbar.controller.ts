module app.components {
    'use strict';

    interface INavbarScope extends ng.IScope {
        date: Date
    }

    export class NavbarController {
        /* @ngInject */
        constructor($scope: INavbarScope) {
            $scope.date = new Date();
        }
    }

    angular
        .module('app.components')
        .controller('app.components.NavbarController', NavbarController);
}
