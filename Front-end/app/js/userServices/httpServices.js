/**
 * Created by Volchak on 10.04.2017.
 */
app.factory("httpService", function ($http, toastr) {
        const url = 'https://localhost:8080';
        return {
            getAllUsers: function(user, callback) {
                $http.post(url + "/users/get", user).then(function(res) {
                    if(typeof res.data.message == String) {
                        toastr.warning('Error', 'Warning');
                    } else {
                        callback(res.data);
                    }
                })
            },
            addUsers: function(user, callback) {
                $http.post(url + "/users/add", user).then(function(res) {
                    toastr.success('User Created', 'Success');
                    callback(res.data);
                })
            },
            getAllSaves: function(id_user, callback) {
                $http.get(url + "/saves/get").then(function(res) {
                    if(typeof res.data.message == String) {
                        toastr.warning('Error', 'Warning');
                    } else {
                        callback(res.data);
                    }
                })
            },
            addSaves: function(save, callback) {
                $http.post(url + "/saves/add", save).then(function(res) {
                    callback(res.data);
                })
            },
            updateSaves: function(save, callback) {
                $http.put(url + "/saves/update", save).then(function(res) {
                    if(typeof res.data.message == String) {
                        toastr.warning('Error', 'Warning');
                    } else {
                        callback(res.data);
                    }
                })
            },
            getAllIncomes: function(id_user, callback) {
                $http.get(url + "/incomes/get/" + id_user).then(function(res) {
                    callback(res.data);
                })
            },
            addIncome: function(income, callback) {
                $http.post(url + "/saves/add", income).then(function(res) {
                    if(typeof res.data.message == String) {
                        toastr.warning('Error', 'Warning');
                    } else {
                        callback(res.data);
                    }
                })
            },
            getWasted: function(id_user, callback) {
                $http.get(url + "/wasted/get", id_user).then(function(res) {
                    callback(res.data);
                })
            },
            addWaste: function(waste, callback) {
                $http.post(url + "/wasted/add", waste).then(function(res) {
                    if(typeof res.data.message == String) {
                        toastr.warning('Error', 'Warning');
                    } else {
                        callback(res.data);
                    }
                })
            }
        }
    }
);