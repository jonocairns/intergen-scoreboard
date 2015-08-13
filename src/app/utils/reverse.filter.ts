module app {
	'use strict';

	function reverse() {
		return (items: Array<any>) => {
			return items.slice().reverse();
		};
	}

	angular.module('app')
		.filter('reverse', reverse);
}