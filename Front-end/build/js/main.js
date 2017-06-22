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
        , controller: 'historyCtrl'
        , controllerAs: 'his'
    }).when('/history', {
        templateUrl: "../views/history.html"
        , controller: 'historyCtrl'
        , controllerAs: 'his'
    })

        .otherwise({
        redirectTo: '/'
    })

});
app.controller('registerCtrl', ['userService', 'httpService', function (userService, httpService, $scope) {
    var vm = this;
    vm.user={};
    vm.alert = false;
    vm.loginForm = false;
    vm.registerForm = false;
    vm.check=function(){
        if(JSON.parse(localStorage.getItem('vm.user'))==null){
           localStorage.setItem('vm.user', JSON.stringify(vm.user))
            window.location="#"
        }
    };
    vm.getUsers = function () {
        vm.users = userService.getUsers();
    };

    vm.loginButton = function () {

        vm.loginForm = true;
        vm.registerForm = false;
    };
    vm.registerButton = function () {

        vm.registerForm = true;
        vm.loginForm = false;
    };

    vm.createAccount = function (newUser) {
        for (x in vm.users) {
            if (newUser.login == vm.users[x].login) {
                vm.message = 'this login already exist, try another one';
                vm.alert = true;
                vm.account();
                break
            } else {
                vm.user = newUser;
                userService.addUser(vm.user);
                vm.user = {};
                vm.newUser = {};
                vm.getUsers();
                window.location = '#/main';
                break

            }
        }


    };
    // vm.getUserData = function () {
    //     vm.expences = userService.getExpenses();
    //     vm.balanceExpences = 0;
    //     for (x in vm.expences) {
    //         vm.balanceExpences += vm.expences[x].count
    //     }
    //     vm.saves = userService.getSaves()
    //     vm.otherSaves=[]
    //     for(i in vm.saves){
    //         if(vm.saves[i].name!="cash"){
    //             vm.otherSaves.push(vm.saves[i])
    //         }
    //
    //     }
    //     vm.balanceSaves = 0;
    //     for (x in vm.saves) {
    //         vm.balanceSaves += vm.saves[x].count
    //     }
    //     vm.balance = vm.balanceSaves - vm.balanceExpences;
    //
    // };
    vm.login = function (userLogIn) {
        console.log('login');
        for (x in vm.users) {
            if (vm.userLogIn.login == vm.users[x].login && vm.userLogIn.password == vm.users[x].password) {
                vm.user = vm.users[x]
                localStorage.setItem('vm.user', JSON.stringify(vm.user));
                // vm.getUserData()
                window.location.href = '#/main';

                break
            } else {
                vm.message = 'wrong login or password';
                vm.alert = true;
            }
        }
    };




    vm.init = function () {
        vm.check();
        vm.getUsers();
    };
    vm.init()
}]);


app.controller('mainCtrl', ['userService', 'httpService', function (userService, httpService, $scope) {
    var vm = this;
    vm.date = '';
    vm.user = JSON.parse(localStorage.getItem('vm.user'));
    vm.userSaves = [];
    vm.expenses = [];
    vm.incomes = [];
    vm.balance={};
    vm.sum=0
    vm.id;
//modals show/hide

    vm.incomeButton = function () {
        vm.incomeModal = true;
        vm.newIncome = {}
    };
    vm.addSaveModal = function () {
        vm.addsaveModal = true
    };
    vm.chooseSource = function (source) {

        vm.source = source
        vm.changeButton()

    };
    vm.changeButton=function(){
        if(vm.id!=null){
            document.getElementById(vm.id).style.border=" 2px solid #21599E";
        }
        vm.id="source"+vm.source.id;
        document.getElementById(vm.id).style.border="3px solid red"
    };

    vm.wasteModal = function () {
        if (vm.source != null) {
            vm.wastemodal = true;
            document.getElementById(vm.id).style.border=" 2px solid #21599E";
            vm.newWaste = {}
        }

    };


    vm.countExpenses = function () {
        vm.totalExpenses = 0;
        for (i in vm.expenses) {
            vm.totalExpenses += vm.expenses[i].count
        }
    };

    vm.addExpense = function () {
        vm.waste = vm.newWaste;
        if (vm.newWaste.count <= vm.source.count) {
            vm.waste.title = vm.target;
            vm.waste.id_save = vm.source.id;
            vm.waste.id_user = vm.user.id;
            vm.waste.date = vm.date;
            vm.wastemodal = false;
            userService.addExpense(vm.waste)
            vm.expenses.push(vm.waste);

            for (x in vm.userSaves) {
                if (vm.userSaves[x].id == vm.waste.id_save) {
                    vm.userSaves[x].count -= vm.waste.count;
                    vm.source = null;
                    break
                }
            }
            vm.getBalance()
            vm.countExpenses()

        }
        else {
            vm.newWaste={};
            vm.wastemodal = false;
            alert('not enought money')
        }

    };


    vm.addSaves = function () {
        vm.newSave.id_user = vm.user.id;
        // vm.userSaves.push(vm.newSave);
        vm.addsaveModal = false;
        vm.getBalance()
        userService.addSaves(vm.newSave);
        vm.newSave = {};

    };

    vm.getDate = function () {
        var d = new Date();
        vm.date = d.toISOString().slice(0, 10);
        vm.year = vm.date.slice(0, 4);
        vm.month = vm.date.slice(5, 7)
        console.log(vm.date);
    };


    vm.addIncome = function () {
        vm.income = {};
        vm.income = vm.newIncome;
        vm.income.id_user = vm.user.id;
        vm.income.date = vm.date;
        vm.incomes.push(vm.income);
        for (x in vm.userSaves) {
            if (vm.userSaves[x].id == vm.income.id_save) {
                vm.userSaves[x].count += vm.income.count;
                vm.getBalance();
                break
            }
        }
        userService.addIncome(vm.income)

    };
    vm.chooseTarget = function (x) {
        vm.target = x;
        vm.wasted = {}
    };
    vm.logOut = function () {
        localStorage.clear();
        window.location = '#/'
    };


    vm.getBalance = function () {

        for (x in vm.userSaves) {
            vm.sum += vm.userSaves[x].count
        }
        vm.balance.balance=vm.sum;

        userService.addBalance(vm.balance)
    };
    vm.init = function () {
        vm.getDate();
        vm.userSaves = userService.getSaves();
        vm.ecpenses = userService.getWasted();
        // vm.getBalance();
        vm.countExpenses();
        vm.balance.balance=userService.getBalance();


    };
    vm.init()
}]);


app.controller('historyCtrl', ['userService','httpService', function (userService, httpServices, $scope) {
    var vm = this;
//your code should be here


    vm.init = function () {
//write something here
    };
    vm.init()
}]);


app.controller('historyCtrl', ['userService', 'httpService', function (userService, httpServices, $scope) {
    var vm = this;
    vm.user = JSON.parse(localStorage.getItem("vm.user"))
    vm.totalBalance = []
    vm.totalIncomes=0;
    vm.totalExpenses=0;
    vm.getDatas = function () {
        vm.incomes = userService.getIncomes();
        vm.wastes = userService.getWasted();
        vm.userSaves = userService.getSaves();
    };
    vm.connect = function () {
        for (i in vm.incomes) {
            vm.totalIncomes+=vm.incomes[i].count
            vm.incomes[i].type='Incomes'
            vm.totalBalance.push(vm.incomes[i])
        }
        for (i in vm.wastes) {
            vm.totalExpenses+=vm.wastes[i].count
            vm.wastes[i].type='Expenses'
            vm.totalBalance.push(vm.wastes[i])
        }
        userService.addTotal(vm.totalBalance)
        console.log(vm.totalIncomes);
        console.log(vm.totalExpenses);
    };

    vm.chartSaves = function () {
        vm.arr = [['name', 'money saved']];
        for (i in vm.userSaves) {
            vm.subarr = [];
            vm.subarr.push(vm.userSaves[i].title);
            vm.subarr.push(vm.userSaves[i].count);
            vm.arr.push(vm.subarr)

        }
        google.charts.load('current', {'packages': ['corechart']});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(vm.arr
                // [
                //     ['target', 'money per month'],
                //     ['Work', 12],
                //     ['Eat', 33]]

            );
            var options = {
                title: 'where do I save my money'
            };
            var chart = new google.visualization.PieChart(document.getElementById('piechartSave'));
            chart.draw(data, options);
        }
    };

    vm.chartWastes = function () {
        vm.arrW = [['name', 'money Wasted']];
        for (i in vm.wastes) {
            vm.subarr = [];
            vm.subarr.push(vm.wastes[i].title);
            vm.subarr.push(vm.wastes[i].count);
            vm.arrW.push(vm.subarr)

        }
        google.charts.load('current', {'packages': ['corechart']});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable(vm.arrW
                // [
                //     ['target', 'money per month'],
                //     ['Work', 12],
                //     ['Eat', 33]]

            );
            var options = {
                title: 'where do I spend my money'
            };
            var chart = new google.visualization.PieChart(document.getElementById('piechartWaste'));
            chart.draw(data, options);
        }
    };


    vm.chartBalaance = function () {
        google.charts.load("current", {packages:['corechart']});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable([
                ["Type", "Density", { role: "style" } ],
                ["Incomes", vm.totalIncomes, "green"],
                ["Expenses", vm.totalExpenses, "red"],
                ["Savings", vm.totalIncomes-vm.totalExpenses, "color: #e5e4e2"]
            ]);

            var view = new google.visualization.DataView(data);
            view.setColumns([0, 1,
                { calc: "stringify",
                    sourceColumn: 1,
                    type: "string",
                    role: "annotation" },
                2]);

            var options = {
                title: "Incomes VS expenses",
                width: 600,
                height: 400,
                bar: {groupWidth: "95%"},
                legend: { position: "none" },
            };
            var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
            chart.draw(view, options);
        }
    };
    vm.init = function () {
        vm.getDatas()
        vm.connect()
        vm.chartSaves()
        vm.chartWastes()
        vm.chartBalaance()
    };
    vm.init()
}]);


/**
 * Created by Volchak on 10.04.2017.
 */
app.factory("userService", function ($http) {
    return {
        balance: {
            balance: 0
        },
        users: [
            {
                id: 1,
                name: 'xxx',
                sname: 'yyy',
                login: 'z',
                password: 'q'
            },
            {
                id: 2,
                name: 'xx2',
                sname: 'yy2',
                login: 'zz',
                password: 'qq'
            }

        ],
        saves: [
            {
                id: 1,
                id_user: 1,
                title: 'Cash',
                count: 4000,
                img: "cash.png"

            }, {
                id: 2,
                id_user: 1,
                title: 'Card',
                count: 3000,
                img: "card.png"
            }, {
                id: 3,
                id_user: 1,
                title: 'Bank Account',
                count: 5000,
                img: "BA.png"
            }, {
                id: 4,
                id_user: 1,
                title: 'Safe',
                count: 300,
                img: "safe.png"
            }
        ],
        wasted: [
            {
                id: 1,
                id_user: 1,
                id_save: 2,
                description: '',
                count: 3000,
                date: '2017-06-20',
                title: "Health"

            }, {
                id: 1,
                id_user: 1,
                id_save: 2,
                description: '',
                count: 2000,
                date: '2017-06-20',
                title: "Car"
            }
        ],
        incomes: [],
        totalBalance: [],
        addUser: function (user) {
            this.users.push(user)
        },

        getUsers: function () {
            return this.users
        },

        getIncomes: function () {
            return this.incomes
        },

        addIncome: function (income) {
            this.incomes.push(income)
        },

        getWasted: function () {
            return this.wasted
        },
        addExpense: function (wasted) {
            this.wasted.push(wasted)
        },

        getSaves: function () {
            return this.saves
        },
        addSaves: function (save) {
            this.saves.push(save)
        },
        addTotal:function(total){
            this.totalBalance=total
        },
        getTotal:function(){
            return this.totalBalance
        },

        addBalance:function(balance){
            this.balance=balance
        },
        getBalance:function () {
            return this.balance;
        }



    }
});

/**
 * Created by Volchak on 10.04.2017.
 */
app.factory("httpService", function ($http) {
        return {
            //write your services here

        }
    }
);

function openNav() {
    document.getElementById("menu-container").style.display="block"
}

function closeNav() {
    document.getElementById("menu-container").style.display="none"
}

