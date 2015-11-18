var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    crypto = require('crypto'),
    TITLE_REG = '注册';

router.get('/', function(req, res) {
    res.render('reg',{title:TITLE_REG});
});

router.post('/', function(req, res) {
    var userName = req.body['txtUserName'],
        userPwd = req.body['txtUserPwd'],
        userRePwd = req.body['txtUserRePwd'],
        md5 = crypto.createHash('md5');

    userPwd = md5.update(userPwd).digest('hex');

    var newUser = new User({
        user_name: userName,
        user_pass_word: userPwd
    });

    //检查用户名是否已经存在
    User.getUserNumByName(newUser.user_name, function (err, results) {

        if (results != null) {
            err = '用户名已存在';
        }

        if (err) {
            res.locals.error = err;
            res.render('reg', { title: TITLE_REG });
            return;
        }

        newUser.save(function (err,result) {
            if (err) {
                res.locals.error = err;
                res.render('reg', { title: TITLE_REG });
                return;
            }

            if(result.insertId > 0)
            {
                res.locals.success = '注册成功,请点击   <a class="btn btn-link" href="/login" role="button"> 登录 </a>' ;
            }
            else
            {
                res.locals.error = err;
            }

            res.render('reg', { title: TITLE_REG });
        });
    });
});

module.exports = router;