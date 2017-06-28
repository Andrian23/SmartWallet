/**
 * Created by Volchak on 10.04.2017.
 */
app.factory("userService", function ($http) {
    return {
        users: [
            {
                id: 1,
                name: 'xxx',
                sname: 'yyy',
                login: 'z',
                email: 'xxzzqq@gmail.com',
                password: 'q'
            },
            {
                id: 2,
                name: 'Taras',
                sname: 'Kundyk',
                login: 'zz',
                email: 'taraskundyk@gmail.com',
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
        }
    }
});
