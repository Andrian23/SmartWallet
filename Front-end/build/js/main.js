var app=angular.module("myapp",
    [
    'ngRoute'
    ]
);

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
app.controller('historyCtrl', ['userService','htpServices', function (userService, httpService, $scope) {
    var vm = this;
//your code should be here


    vm.init = function () {
//write something here
    };
    vm.init()
}]);


app.controller('historyCtrl', ['userService','htpServices', function (userService, httpService, $scope) {
    var vm = this;
//your code should be here


    vm.init = function () {
//write something here
    };
    vm.init()
}]);


app.controller('historyCtrl', ['userService','htpServices', function (userService, httpServices, $scope) {
    var vm = this;
//your code should be here


    vm.init = function () {
//write something here
    };
    vm.init()
}]);


app.controller('historyCtrl', ['userService','htpService', function (userService, httpServices, $scope) {
    var vm = this;
//your code should be here


    vm.init = function () {
//write something here
    };
    vm.init()
}]);


/**
 * Created by Volchak on 10.04.2017.
 */
app.factory("userService", function ($http) {
        return {
            //write your services here

        }
    }
);

/**
 * Created by Volchak on 10.04.2017.
 */
app.factory("httpService", function ($http) {
        return {
            //write your services here

        }
    }
);


