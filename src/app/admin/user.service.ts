module app.services {
    'use strict';

    export interface IUserService {
        cachedUser: any;
        isLoggedIn(): boolean;
        logout(): void;
        save(user: app.admin.User, successAction: Function): void;
        login(email: string, password: string): ng.IPromise<FirebaseAuthData>;
        get(): AngularFireArray;
        getReference(): AngularFireArray;
        loginProvider(provider: string): ng.IPromise<FirebaseAuthData>;
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
                deffered.resolve({ authData: authData, error: err });
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

        public get(): AngularFireArray {
            var ref = this.endpointService.getUsers();
            return this.$firebaseArray(ref);
        }

        public loginProvider(provider: string): ng.IPromise<FirebaseAuthData> {
            var ref = this.endpointService.get();
            var deffered = this.$q.defer();
            ref.authWithOAuthPopup(provider, (error: any, authData: any) => {
                this.cachedUser = authData;
                deffered.resolve(authData);
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
