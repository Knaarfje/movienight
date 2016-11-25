app.component('app', {
    transclude: true,
    controller($location, $firebaseAuth) {
        let ctrl = this;
        let auth = $firebaseAuth();
        
        ctrl.auth = auth;
        if(!auth.$getAuth()) $location.path('/signin');

        ctrl.navOpen = false;
        ctrl.signOut =()=> {
            ctrl.auth.$signOut();
            $location.path('/signin');
        }

        ctrl.movies = [];
    },
    templateUrl: `${templatePath}/app.html`   
});  