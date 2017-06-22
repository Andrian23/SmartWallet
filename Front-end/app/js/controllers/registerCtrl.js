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

