module app.leaderboard {
	'use strict';



	export class Leaderboard {
		public selected: boolean = false;
		
		constructor(public score: number, public id: string, public name: string, public date: string, public conferenceDay: string) {
		}
	}
}
