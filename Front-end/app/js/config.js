app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: "../views/home.html"
        , controller: 'registerCtrl'
        , controllerAs: 'reg'
    }).when('/main', {
        templateUrl: "../views/main.html"
        , controller: 'mainCtrl'
        , controllerAs: 'my'
    }).when('/profile', {
        templateUrl: "../views/profile.html"
        , controller: 'registerCtrl'
        , controllerAs: 'reg'
    }).when('/statistic', {
        templateUrl: "../views/statistic.html"
        , controller: 'statisticCtrl'
        , controllerAs: 'stat'
    }).when('/history', {
        templateUrl: "../components/history.html"
        , controller: 'historyCtrl'
        , controllerAs: 'his'
    })

        .otherwise({
        redirectTo: '/'
    })

});