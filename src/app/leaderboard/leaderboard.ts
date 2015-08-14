module app.leaderboard {
	'use strict';
	
	export class Leaderboard {
		constructor(public score: number, public id: string, public name: string, public date: Date, public conferenceDay: string) {
		}
	}
}