app.controller('mainCtrl', ['userService', 'httpService', function (userService, httpService, $scope, $rootscope) {
    var vm = this;

    vm.date = '';//the date
    vm.user = JSON.parse(localStorage.getItem('vm.user'));
    vm.userSaves = [];//all user's saves
    vm.expenses = [];//all user's wastes
    vm.incomes = [];//all user's incomes
    vm.sum = 0;
    vm.id = null;//used for the styling of buttons

    //technical functions
    //get the date
    vm.getDate = function () {
        var d = new Date();
        vm.date = d.toISOString().slice(0, 10);
        vm.year = vm.date.slice(0, 4);
        vm.month = vm.date.slice(4, 8)
        vm.dataFilter = vm.month
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

//functional FUNCTIONS
    //add new waste
    vm.addExpense = function () {
        vm.waste = vm.newWaste;
        if (vm.newWaste.count <= vm.source.count) {
            vm.waste.title = vm.target;
            vm.waste.id_save = vm.source.id;
            vm.waste.id_user = vm.user.id;
            vm.waste.date = vm.date;
            vm.wastemodal = false;
            vm.monthExpenses += vm.waste.count
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

        }
        else {
            vm.newWaste = {};
            vm.wastemodal = false;
            alert('not enought money')
        }

    };
    //


    //count all the wastes



    vm.addSaves = function () {
        vm.newSave.id_user = vm.user.id;
        vm.addsaveModal = false;
        userService.addSaves(vm.newSave);
        vm.newSave = {};
    };

    vm.addIncome = function () {
        vm.income = {};
        vm.income = vm.newIncome;
        vm.income.id_user = vm.user.id;
        vm.income.date = vm.date;
        $rootscope.balance.sum+=vm.income.count
        vm.incomes.push(vm.income);
        for (i in vm.userSaves) {
            if (vm.userSaves[i].id == vm.income.id_save) {
                vm.userSaves[i].count += vm.income.count;

                userService.updateSaves(vm.userSaves[i])

                break
            }
        }
        userService.addIncome(vm.income)
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
    };
    vm.init()
}]);

