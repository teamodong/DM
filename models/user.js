var pool = require('./connectmanage');

function User(user){
    this.user_id = user.user_id
    this.user_name = user.user_name
    this.user_face = user.user_face
    this.true_name = user.true_name
    this.sex = user.sex
    this.user_pass_word = user.user_pass_word
    this.org_id = user.org_id
    this.create_time = user.create_time
    this.create_oper = user.create_oper
    this.status = user.status
    this.change_time = user.change_time
};

module.exports = User;

pool.getConnection(function(err, connection) {

    //保存数据
    User.prototype.save = function save(callback) {
        var user = {
            user_name: this.user_name,
            user_pass_word: this.user_pass_word,
            true_name: this.true_name,
            sex:this.sex
        };

        var insertUser_Sql = "INSERT INTO USER(user_name,user_pass_word,true_name,sex,create_time,status) VALUES(?,?,?,?,?,?)";

        var parm =[user.user_name, user.user_pass_word,user.true_name,user.sex, new Date(), '1' ]

        connection.query(insertUser_Sql, parm, function (err, result) {
            if (err) {
                console.log("insertUser_Sql Error: " + err.message);
                return;
            }
            callback(err, result);
        });
    };


    //根据用户名得到用户数量
    User.getUserNumByName = function getUserNumByName(username, callback) {

        var getUserNumByName_Sql = "SELECT COUNT(1) AS num FROM USER WHERE user_name = ?";

        connection.query(getUserNumByName_Sql, [username], function (err, result) {
            if (err) {
                console.log("getUserNumByName Error: " + err.message);
                return;
            }
            callback(err, result);
        });
    };

    //根据用户名得到用户信息
    User.getUserByUserName = function getUserNumByName(username, callback) {

        var getUserByUserName_Sql = "SELECT * FROM user WHERE user_name = ?";

        connection.query(getUserByUserName_Sql, [username], function (err, result) {
            if (err) {
                console.log("getUserByUserName Error: " + err.message);
                return;
            }
            callback(err, result);
        });
    };

    //获取所有用户信息
    User.getUser = function getUser(callback) {

        var getUser_Sql = "SELECT * FROM user";

        connection.query(getUser_Sql, function (err, result) {

            if (err) {
                console.log("getUser Error: " + err.message);
                return;
            }
            callback(err, result);
        });
    }
});