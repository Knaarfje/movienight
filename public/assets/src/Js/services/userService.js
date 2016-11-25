app.factory('UserService', function ($q, $http, $firebaseAuth, $firebaseArray, $firebaseObject) {
    let ref = firebase.database().ref();
        let auth = $firebaseAuth();
    let users;
    let me;

    function getAll() {
        return $q(function (resolve, reject) {
            if (users) {
                resolve(users);
            }
            users = $firebaseArray(ref.child("users"));
            resolve(users);
        });
    }

    function get(uid) {        
        return $q(function (resolve, reject) {
            var u = ref.child("users").orderByChild("uid").isEqual(uid);
            resolve(u);
        });
    }

    function getMe() {           
        return $q(function (resolve, reject) {
            var u = ref.child("users").orderByChild("uid").isEqual(auth.$getAuth().uid);
            resolve(u);
        });
    }

    function add(m) {
        return users.$add(m);
    }
    
    function remove(m) {
        return users.$remove(m);
    }

    function save(m) {
        return users.$save(m);
    }
    return {
        add,
        get,
        getAll,
        remove,
        save,
        me
    };
});