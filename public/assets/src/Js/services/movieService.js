app.factory('MovieService', function ($q, $http, $firebaseArray, $firebaseObject) {
    let ref = firebase.database().ref();
    let movies;

    function get() {
        return $q(function (resolve, reject) {
            if (movies) {
                resolve(movies);
            }
            movies = $firebaseArray(ref.child("movies"));
            resolve(movies);
        });
    }

    function add(m) {
        return movies.$add(m);
    }
    
    function remove(m) {
        return movies.$remove(m);
    }

    function save(m) {
        return movies.$save(m);
    }
    return {
        add,
        get,
        remove,
        save
    };
});