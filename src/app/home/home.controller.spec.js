'use strict';

describe('controllers', function(){
    var scope;

    beforeEach(module('app'));

    beforeEach(inject(function($rootScope) {
        scope = $rootScope.$new();
    }));
});
