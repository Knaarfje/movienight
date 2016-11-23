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

        ctrl.movies = [{
            title: 'Guardians of the Galaxy',
            cover: 'https://image.tmdb.org/t/p/original/y31QB9kn3XSudA15tV7UWQ9XLuW.jpg'
        },
        {
            title: 'Guardians of the Galaxy',
            cover: 'https://image.tmdb.org/t/p/original/y31QB9kn3XSudA15tV7UWQ9XLuW.jpg'
        },
        {
            title: 'Guardians of the Galaxy',
            cover: 'https://image.tmdb.org/t/p/original/y31QB9kn3XSudA15tV7UWQ9XLuW.jpg'
        },
        {
            title: 'Guardians of the Galaxy',
            cover: 'https://image.tmdb.org/t/p/original/y31QB9kn3XSudA15tV7UWQ9XLuW.jpg'
        },
        {
            title: 'Guardians of the Galaxy',
            cover: 'https://image.tmdb.org/t/p/original/y31QB9kn3XSudA15tV7UWQ9XLuW.jpg'
        }]
    },
    templateUrl: `${templatePath}/app.html`   
});  