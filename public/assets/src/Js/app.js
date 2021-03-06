var reg;
var messaging;

if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');
    navigator.serviceWorker.register('/serviceworker.js').then(function () {
        return navigator.serviceWorker.ready;
    }).then(function (serviceWorkerRegistration) {
        console.log('Service Worker is ready :^)', reg);
        reg = serviceWorkerRegistration;
        // TODO
    }).catch(function (error) {
        console.log('Service Worker error :^(', error);
    });

    
    navigator.serviceWorker.getRegistrations().then(a => {
        for (var i in a) {
            if (a[i].active.scriptURL.indexOf('/scripts/ser') >= 0) {
                a[i].unregister();
            }
        }
    });
}


const app = angular.module("movienightApp", ["firebase", 'ngRoute', "angular.filter","hmTouchEvents"]);
const templatePath = './assets/dist/Templates';

app.config(function ($locationProvider, $routeProvider,$firebaseRefProvider) {
    const config = {
        apiKey: "AIzaSyBf7uF7REUbHFFp0ZsecZ73l9EfiadrWck",
        authDomain: "movienight-e6e92.firebaseapp.com",
        databaseURL: "https://movienight-e6e92.firebaseio.com",
        storageBucket: "",
        messagingSenderId: "671159628439"
    }; 

    $locationProvider.html5Mode(true); 
    $firebaseRefProvider.registerUrl(config.databaseURL);
    
    firebase.initializeApp(config);
    const messaging = firebase.messaging();
    // Handle incoming messages. Called when:
    // - a message is received while the app has focus
    // - the user clicks on an app notification created by a sevice worker
    //   `messaging.setBackgroundMessageHandler` handler.
    messaging.onMessage(function (payload) {
        console.log("Message received. ", payload);
        // ...
    });

    $routeProvider
        .when('/signin', { 
            template: '<signin></signin>'
        }) 
        .when('/', {
            resolve: {
                "firebaseUser": function ($firebaseAuthService) {
                    return $firebaseAuthService.$waitForSignIn();
                } 
            },
            template: `<app></app>`,
        }) 
        .when('/vote', {
            resolve: {
                "firebaseUser": function ($firebaseAuthService) {
                    return $firebaseAuthService.$waitForSignIn();
                },
                movies: function(MovieService) {
                    return MovieService.get();   
                },
                votes: function(VoteService) {
                    return VoteService.get();   
                }
            },
            template: `<app votes="$resolve.votes">
        <cardstack cards="$resolve.movies"></cardstack>
    <fab><add-form></add-form></fab></app>`,
        }) 
        .otherwise('/'); 
}); 

Array.prototype.sum = function (prop) {
    var total = 0
    for ( var i = 0, _len = this.length; i < _len; i++ ) {
        total += this[i][prop]
    }
    return total
}