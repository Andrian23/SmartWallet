app.controller('mainCtrl', ['userService', 'httpService', function (userService, httpService, $scope) {
    var vm = this;
    vm.date = '';
    vm.user = JSON.parse(localStorage.getItem('vm.user'));
    vm.userSaves = [];
    vm.expenses = [];
    vm.incomes = [];
    vm.id;

    //modals show/hide

    vm.incomeButton = function () {
        vm.incomeModal = true;
        vm.newIncome = {}
    };

    vm.addSaveModal = function () {
        vm.addsaveModal = true;
    };

    vm.chooseSource = function (source) {
        // document.getElementById(vm.id).style.border=" 2px solid #21599E";
        vm.source = source;
        vm.changeButton();

    };

    vm.changeButton=function(){
        if(vm.id!=null){
            document.getElementById(vm.id).style.border="none";
        }
        vm.id="source"+vm.source.id;
        document.getElementById(vm.id).style.border="3px solid #615151";
    };

    // vm.returnButtons=function(){
    //     if(vm.id!=null)
    //     document.getElementById(vm.id).style.border=" 2px solid #21599E"
    // }

    vm.wasteModal = function () {
        if (vm.source != null) {
            vm.wastemodal = true;
            document.getElementById(vm.id).style.border=" 2px solid #21599E";
            vm.newWaste = {}
        }
        // else {
        //     alert('sdsds')
        // }
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
        // console.log(vm.date);
    };

    vm.getBalance = function () {
        vm.balance = 0;
        for (x in vm.userSaves) {
            vm.balance += vm.userSaves[x].count
        }
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

    vm.init = function () {
        vm.getDate();
        vm.userSaves = userService.getSaves();
        vm.ecpenses = userService.getWasted();
        vm.getBalance();
        vm.countExpenses();
        // vm.Sort()
    };
    vm.init()
}]);

