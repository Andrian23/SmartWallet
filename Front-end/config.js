app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: "../components/main.html"
        , controller: 'myCtrl'
        , controllerAs: 'my'
    }).when('/catalogue', {
        templateUrl: "../components/catalogue.html"
        , controller: 'myCtrl'
        , controllerAs: 'my'
    }).when('/delivery', {
        templateUrl: "../components/delivery.html"
        , controller: 'myCtrl'
        , controllerAs: 'my'
    }).when('/contacts', {
        templateUrl: '../components/contacts.html'
        , controller: 'myCtrl'
        , controllerAs: 'my'
    }).when('/admin', {
        templateUrl: '../components/admin.html'
        , controller: 'admCtrl'
        , controllerAs: 'adm'
    }).otherwise({
        redirectTo: '/'
    })
});