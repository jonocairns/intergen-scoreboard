module app {
	'use strict';

	function sortByScore() {
		return (items: AngularFireArray) => {

			return _.sortBy(items, (item: any) => {
				var score = parseInt(item.score, 10);
				return score;
			}).reverse();

		};
	}

	angular
		.module('app')
		.filter('score', sortByScore);
}