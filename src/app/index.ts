/// <reference path="../../.tmp/typings/tsd.d.ts" />

module app {
    'use strict';

    angular.module('app', [
        'ngAnimate',
        'ngCookies',
        'ngTouch',
        'ngSanitize',
        'ngResource',
        'ui.materialize',
        'firebase',

        // services
        'app.utils',
        'app.services',

        // controllers
        'app.home',
        'app.admin',

        // components
        'app.components',
        'app.directives',

        'ui.router'
    ]);

    angular.module('app.utils', []);
    angular.module('app.services', []);

    angular.module('app.home', []);

    angular.module('app.admin', []);

    angular.module('app.components', []);
    angular.module('app.directives', []);
}
