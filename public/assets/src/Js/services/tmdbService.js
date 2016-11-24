app.factory('TmdbService', function ($q, $http) {
    let baseUrl = 'https://api.themoviedb.org/3';
    let apikey = '8eb4c8d95b57a43106340f0b5f243455';

    function search(q) {
        return $q(function (resolve, reject) {
            var n = $http.get(`${baseUrl}/search/movie?api_key=${apikey}&query=${q}&include_adult=true`);
            resolve(n);
        });
    }

    function details(id) {
        return $q(function (resolve, reject) {
            var n = $http.get(`${baseUrl}/movie/${id}?api_key=${apikey}`)
            resolve(n);
        });
    }

    return { 
        search,
        details
    };
});