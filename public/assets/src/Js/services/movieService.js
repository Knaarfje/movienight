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

    function vote(m, score, uid) {
        var voteRef = firebase.database().ref().child("votes");
        var votes = $firebaseArray(ref);
        votes.$loaded().then((a) => {
            a.$add({
                user: uid,
                movie: m.$id,
                score: score
            });
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
        save,
        vote
    };
});