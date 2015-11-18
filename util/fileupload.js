var formidable = require('formidable');
var fs = require('fs');
var AVATAR_UPLOAD_FOLDER = "/images/";

var form = new formidable.IncomingForm();   //创建上传表单
form.encoding = 'UTF-8';        //设置编辑
form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;     //设置上传目录
form.keepExtensions = true;     //保留后缀
form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

function Fileupload(req){

        var types =  req.files.userface.type;

        console.log(">>>>>>>>>>>>>>1"+types);

        var extName = '';  //后缀名
        switch (types) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }

        if(extName.length == 0){
            res.locals.error = '只支持png和jpg格式图片';
            res.render('addnew', { title: TITLE });
            return;
        }

        var avatarName = new Date()-0 + '.' + extName;
        var newPath = form.uploadDir + avatarName;

        console.log(newPath);

        fs.renameSync(req.files.userface.path, newPath);  //重命名
    };


module.exports = Fileupload;