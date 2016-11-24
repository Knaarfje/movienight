app.component('addForm', {
    bindings: {
    },
    controller(TmdbService,MovieService, $timeout,$firebaseAuth) {
        var ctrl = this;
        ctrl.suggestions = [];
        ctrl.timeout = 0;
        
        let auth = $firebaseAuth();

        ctrl.find = (q) => {
            if (ctrl.timeout) {
                $timeout.cancel(ctrl.timeout);
            }
            
            ctrl.timeout = $timeout(() => {
                TmdbService.search(q).then((a) => {
                    ctrl.suggestions = a.data.results;
                })
            }, 350);
        };

        ctrl.add = (m) => {
            var movieToAdd = {
                id: m.id,
                title: m.title,
                date: m.release_date,
                posterPath: m.poster_path,
                backdropPath: m.backdrop_path,
                addedBy: auth.$getAuth().uid,
                cover: `https://image.tmdb.org/t/p/w780/${m.poster_path}`
            }

            MovieService.add(movieToAdd);
        };


    },
    templateUrl: `${templatePath}/addForm.html`
});