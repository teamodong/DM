var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var crypto = require('crypto');
var User = require('../models/user.js');
var Fileupload = require('../util/fileupload.js');
var TITLE_REG = '注册';

/* GET users listing. */
router.get('/', function (req, res, next) {

    User.getUser(function (err, results) {

        res.render('users', {title: "权限管理", results: results});

    });

});

router.get('/addnew', function (req, res, next) {

    res.render('addnew', {title: "新增"});

});

router.post('/addnew', multipartMiddleware, function (req, res, next) {

    Fileupload(req);

    var userName = req.body['username'],
        userPassWord = req.body['password'],
        trueName = req.body['truename'],
        userSex = req.body['sex'],
        userBirthday = req.body['birthday'],
        userEmail = req.body['email'],
        userPhone = req.body['phone'],
        md5 = crypto.createHash('md5');

    userPassWord = md5.update(userPassWord).digest('hex');

    var newUser = new User({
        user_name: userName,
        user_pass_word: userPassWord,
        true_name: trueName,
        sex: userSex
    });

    //检查用户名是否已经存在
    User.getUserByUserName(newUser.user_name, function (err, results) {

        if (results != null && results.length!=0) {
            res.locals.error = '用户名已存在';
            res.render('addnew', {title: TITLE_REG});
            return;
        }

        if (err) {
            res.locals.error = err;
            res.render('addnew', {title: TITLE_REG});
            return;
        }

        newUser.save(function (err, result) {
            if (err) {
                res.locals.error = err;
                return;
            }

            if (result.insertId > 0) {
                res.locals.success = '注册成功,请点击   <a class="btn btn-link" href="/login" role="button"> 登录 </a>';
            }
            else {
                res.locals.error = err;
            }

            res.render('addnew', {title: TITLE_REG});
        });
    });
});

module.exports = router;
