app.controller('historyCtrl', ['userService', 'httpService', function (userService, httpServices, $scope) {
    var vm = this;
    vm.user = JSON.parse(localStorage.getItem("vm.user"))
    vm.totalBalance = []
    vm.totalIncomes = 0;
    vm.totalExpenses = 0;
    vm.targets=["Food","Transport","Clothes","House","Health","Gifts","Fun","Other"]
    vm.getDate = function () {
        var d = new Date();
        vm.date = d.toISOString().slice(0, 10);
        vm.year = vm.date.slice(0, 4);
        vm.dataFilter = vm.date.slice(4, 8)

    };
    vm.getDatas = function () {
        vm.incomes = userService.getIncomes();
        vm.wastes = userService.getWasted();
        vm.userSaves = userService.getSaves();
    };
    vm.connect = function () {
        for (i in vm.incomes) {
            vm.totalIncomes += vm.incomes[i].count
            vm.incomes[i].type = 'Incomes'
            vm.totalBalance.push(vm.incomes[i])
        }
        for (i in vm.wastes) {
            vm.totalExpenses += vm.wastes[i].count
            vm.wastes[i].type = 'Expenses'
            vm.totalBalance.push(vm.wastes[i])
        }
        userService.addTotal(vm.totalBalance)

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
    vm.createArr=function(){
        vm.results=[]
        for(x in vm.targets){
            vm.ex={};
            vm.ex.title=vm.targets[x];
            vm.ex.count=0
            vm.results.push(vm.ex)
        }
        for (i in vm.wastes){
            for(j in vm.results)
            if(vm.wastes[i].title==vm.results[j].title){
                vm.results[j].count+=vm.wastes[i].count
            }
        }
    }

    vm.chartWastes = function () {
        vm.createArr()
        vm.arrW = [['name', 'money Wasted']];
        for (i in vm.results) {
            vm.subarr = [];
            vm.subarr.push(vm.results[i].title);
            vm.subarr.push(vm.results[i].count);


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
        google.charts.load("current", {packages: ['corechart']});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var data = google.visualization.arrayToDataTable([
                ["Type", "Density", {role: "style"}],
                ["Incomes", vm.totalIncomes, "green"],
                ["Expenses", vm.totalExpenses, "red"],
                ["Savings", vm.totalIncomes - vm.totalExpenses, "color: #e5e4e2"]
            ]);

            var view = new google.visualization.DataView(data);
            view.setColumns([0, 1,
                {
                    calc: "stringify",
                    sourceColumn: 1,
                    type: "string",
                    role: "annotation"
                },
                2]);

            var options = {
                title: "Incomes VS expenses",
                width: 600,
                height: 400,
                bar: {groupWidth: "95%"},
                legend: {position: "none"},
            };
            var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
            chart.draw(view, options);
        }
    };
    vm.init = function () {
        vm.getDate()
        vm.getDatas()
        vm.connect()
        vm.createArr(0)
        vm.chartSaves()
        vm.chartWastes()
        vm.chartBalaance()

    };
    vm.init()
}]);

