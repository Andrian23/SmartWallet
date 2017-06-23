app.controller('mainCtrl', ['userService', 'httpService', function (userService, httpService, $scope) {
    var vm = this;
    vm.date = '';//the date
    vm.user = JSON.parse(localStorage.getItem('vm.user'));
    vm.userSaves = [];//all user's saves
    vm.expenses = [];//all user's wastes
    vm.incomes = [];//all user's incomes
    vm.balance = {balance: 0};//total sum of all user saves
    vm.monthExpenses={expense:0};
    vm.sum = 0;
    // vm.dateFilter=''
    vm.id;//used for the styling of buttons

    //get the date
    vm.getDate = function () {
        var d = new Date();
        vm.date = d.toISOString().slice(0, 10);
        vm.year = vm.date.slice(0, 4);
        vm.month = vm.date.slice(4, 8)
        vm.dataFilter=vm.month
        userService.setDefFilter(vm.dataFilter)
    };
    //open income modal
    vm.incomeButton = function () {
        vm.incomeModal = true;
        vm.newIncome = {}
    };
    //open new save modal
    vm.addSaveModal = function () {
        vm.addsaveModal = true
    };
    //choose source when new waste in made
    vm.chooseSource = function (source) {
        vm.source = source
        vm.changeButton()

    };
    //apply some style when the save button in pressed
    vm.changeButton = function () {
        if (vm.id != null) {
            document.getElementById(vm.id).style.border = " 2px solid #21599E";
        }
        vm.id = "source" + vm.source.id;
        document.getElementById(vm.id).style.border = "3px solid red"
    };
    //check weather the save is chosen and opens waste modal
    vm.wasteModal = function () {
        if (vm.source != null) {
            vm.wastemodal = true;
            document.getElementById(vm.id).style.border = " 2px solid #21599E";
            vm.newWaste = {}
        }

    };
    //choose the target of money waste
    vm.chooseTarget = function (x) {
        vm.target = x;
        vm.wasted = {}
    };
    //add ne waste
    vm.addExpense = function () {
        vm.waste = vm.newWaste;
        if (vm.newWaste.count <= vm.source.count) {

            vm.waste.title = vm.target;
            vm.waste.id_save = vm.source.id;
            vm.waste.id_user = vm.user.id;
            vm.waste.date = vm.date;
            vm.wastemodal = false;
            //add to DB
            userService.addExpense(vm.waste)
            //add to local ARR
            vm.expenses.push(vm.waste);

            //update the current save
            for (i in vm.userSaves) {
                if (vm.userSaves[i].id == vm.waste.id_save) {
                    vm.userSaves[i].count -= vm.waste.count;
                    userService.updateSaves(vm.userSaves[i])
                    vm.source = null;
                    break
                }
            }
            vm.countBalance()
            vm.countWastes()
            vm.getBalance()
            vm.getExpense();
        }
        else {
            vm.newWaste = {};
            vm.wastemodal = false;
            alert('not enought money')
        }

    };

    vm.getWastes = function () {
        vm.waste = userService.getWastes()
    }




    //count all the wastes


    vm.countMonthExpenses = function () {
        vm.monthExpenses.expense = 0;
        console.log(vm.expenses);
        for(i in vm.expenses){
            vm.monthExpenses.expense+=vm.expenses[i].count
        }
        console.log(vm.monthExpenses);
        userService.updateMonthExpenses(vm.monthExpenses)
    };


    vm.countBalance = function () {
        vm.balance.balance = 0;
        for (i in vm.userSaves) {
            vm.balance.balance += vm.userSaves[i].count
        }
        userService.updateBalance(vm.balance)

    };

    vm.getBalance = function () {
        vm.balance = userService.getBalance()
    }




    vm.addSaves = function () {
        vm.newSave.id_user = vm.user.id;
        vm.addsaveModal = false;
        userService.addSaves(vm.newSave);
        vm.newSave = {};
        vm.countBalance()
    };


    vm.addIncome = function () {
        vm.income = {};
        vm.income = vm.newIncome;
        vm.income.id_user = vm.user.id;
        vm.income.date = vm.date;
        vm.incomes.push(vm.income);
        for (i in vm.userSaves) {
            if (vm.userSaves[i].id == vm.income.id_save) {
                vm.userSaves[i].count += vm.income.count;
                userService.updateSaves(vm.userSaves[i])
                break
            }
        }
        userService.addIncome(vm.income)
        vm.countBalance();

    };

    vm.logOut = function () {
        localStorage.clear();
        window.location = '#/'
    };


    vm.init = function () {
        vm.getDate();
        vm.userSaves = userService.getSaves();
        vm.expenses = userService.getWasted();

        vm.incomes = userService.getIncomes();
        vm.balance.balance = userService.getBalance();
        vm.countMonthExpenses()
        // vm.countBalance();
        // vm.countWastes();
        vm.getBalance()


    };
    vm.init()
}]);

