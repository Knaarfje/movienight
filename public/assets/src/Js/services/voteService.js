app.factory('VoteService', function ($q, $http, $firebaseArray, $firebaseObject, $firebaseAuth, UserService) {
    let ref = firebase.database().ref();
        let auth = $firebaseAuth();
    let votes;

    function get() {
        return $q(function (resolve, reject) {
            if (votes) {
                resolve(votes);
            }
            votes = $firebaseArray(ref.child("votes"));
            resolve(votes);
        });
    }

    function vote(m, score) {
        return $q(function (resolve, reject) {
            vote = votes.$add({
                user: auth.$getAuth().uid,
                movie: m.$id,
                score: score
            });
            resolve(vote);
        });
    }

    function myVotes() {        
        return $q(function (resolve, reject) {
            var u = $firebaseArray(ref.child("votes").orderByChild("user").equalTo(auth.$getAuth().uid));
            resolve(u);
        });
    }

    function getScore(m) {
        var movieVotes = votes.filter((obj) => { obj.$id == m.$id });
        return {
            votes: movieVotes,
            score: movieVotes.sum('score')
        };
    }

    function add(m) {
        return votes.$add(m);
    }
    
    function remove(m) {
        return votes.$remove(m);
    }

    function save(m) {
        return votes.$save(m);
    }
    return {
        add,
        get,
        remove,
        save,
        vote,
        myVotes
    };
});