app.controller('registerCtrl', ['userService', 'httpService', function (userService, httpService, $scope) {
    var vm = this;
    vm.user = {};
    vm.alert = false;
    vm.loginForm = false;
    vm.registerForm = false;
    vm.editForm = false;
    vm.check = function () {
        if (JSON.parse(localStorage.getItem('vm.user')) == null) {
            localStorage.setItem('vm.user', JSON.stringify(vm.user))
            window.location = "#"
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

    vm.closeForm = function () {
        vm.registerForm = false;
        vm.loginForm = false;
        vm.editForm = false;
        vm.deleteForm = false;
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
    vm.changeUser = function () {
        vm.editForm = true;
    };

    vm.saveChangeUser = function (editUser) {
        if (editUser != null) {
            vm.user = editUser;
            userService.updateUser(vm.user);
            vm.user = {};
            vm.editUser = {};
            vm.getUsers();
            vm.editForm = false;
            console.log(vm.users)
        } else {
            vm.message = 'all input has been imp';
            vm.alert = true;
            console.log(vm.message)
        }
    };
    vm.deleteUser = function () {
        vm.deleteForm = true;
    }
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

