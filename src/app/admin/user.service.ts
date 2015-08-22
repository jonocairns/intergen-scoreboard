module app.services {
	'use strict';

    export interface IUserService {
        isLoggedIn(): boolean;
        logout(): void;
        save(user: app.admin.User, successAction: Function): void;
        login(email: string, password: string): ng.IPromise<FirebaseAuthData>;
        get(): ng.IPromise<Array<admin.User>>;
        getReference(): AngularFireArray;
    }

    class UserService implements IUserService {

        public cachedUser: any;

		/* @ngInject */
		constructor(private endpointService: app.utils.IEndpointService, private $firebaseArray: any, private $q: ng.IQService) {
		}

		public save(user: app.admin.User, successAction: Function): void {
			var ref = this.endpointService.getUsers();
			var users = this.$firebaseArray(ref);

			users.$add(user).then(() => {
				successAction();
			});
		}

		public login(email: string, password: string): ng.IPromise<FirebaseAuthData> {
			var ref = this.endpointService.get();
		    var deffered = this.$q.defer();
            ref.authWithPassword({ email: email, password: password }, (err: any, authData: FirebaseAuthData) => {
                this.cachedUser = authData;
                deffered.resolve(authData);
            });
		    return deffered.promise;
        }

        public logout(): void {
            var ref = this.endpointService.get();
            ref.unauth();
        }

        public isLoggedIn(): boolean {
            var ref = this.endpointService.get();
            return !!ref.getAuth();
        }

        public get(): ng.IPromise<Array<admin.User>> {
            var ref = this.endpointService.getUsers();

            var deffered = this.$q.defer();
            ref.once('value', (data: any) => {
                var users = [];
                _.each(data.val(), (userDto: any) => {
                    users.push(new admin.User(userDto.id, userDto.name, userDto.company, userDto.email, userDto.phone));
                });
                deffered.resolve(users);
            });
            return deffered.promise;
        }

        public getReference(): AngularFireArray {
            var ref = this.endpointService.getUsers();
            var query = ref.orderByChild('name');

            return this.$firebaseArray(query);
        }
	}

		angular
		.module('app.services')
		.service('userService', UserService);
}
