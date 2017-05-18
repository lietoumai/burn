var express = require('express');
var router = express.Router();
var userdao = require('./../dao/userDAO');
var usersql = require('./../dao/sql/userSql');


//图像上传
var formidable = require('./../node_modules/formidable');
var AVATAR_UPLOAD_FOLDER = '/uploads/';
var userCardPic='/userCardPic/'
var createUnique = require('./../util/createUnique');
var fs = require('fs');
/* GET users listing. */
router.get('/', function(req, res, next) {

});

/*post方式登录*/
router.post('/login', function(req, res, next) {
    var user=req.body;
    if(user!=null && user.utel!=null && user.upwd!=null){
        if(user.utel.length==11){
            userdao.getUserPwd(user,function (_res) {
                res.json({result:_res});
            })
        }else{
            res.json({result:4});  //数据库连接错误
        }
    }
});

/*get方式注册*/
router.get('/regist', function(req, res, next) {

    var user=req.query;
    if(user!=null && user.utel!=null && user.upwd!=null && user.uname!=null){
        userdao.addUser(user,function (_result) {
            res.json({result:_result});
        });
    }
});

/*post方式注册*/
router.post('/regist', function(req, res, next) {

    var user=req.body;
    if(user!=null && user.utel!=null && user.upwd!=null && user.uname!=null){
        userdao.addUser(user,function (_result) {
            res.json({result:_result});
        });
    }
});

/*上传头像*/
router.post('/upload', function (req, res, next) {

    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
    console.log(files);
        if (err) {
            response.locals.error = err;
            // response.render("uploads");
            return;
        }
        // console.log(fields.user_phone_number.length);
        // console.log(files);
        userdao.getUserIcon(fields.uid,function (result) {
            if(result.length==1){
                var extName ='';  //后缀名
                switch (files.file.type) {  //此处in_file  为页面端 <input type=file name=in_file>
                    case 'image/jpeg':
                        extName = 'jpeg';
                        break;
                    case 'image/jpg':
                        extName = 'jpg';
                        break;
                    case 'image/png':
                        extName = 'png';
                        break;
                    case 'image/x-png':
                        extName = 'png';
                        break;
                }
                console.log('extName='+extName)
                if(extName.length == 0){
                    res.send('只支持png和jpg格式图片');
                    return;
                }else{
                    form.uploadDir = "../public"+AVATAR_UPLOAD_FOLDER;     //设置上传目录
                    form.keepExtensions = true;     //保留后缀
                    form.maxFieldsSize = 2 * 1024;   //文件大小
                    var avatarName = createUnique.creatName() + '.' + extName;
                    var newPath = form.uploadDir + avatarName;



                    var readStream = fs.createReadStream(files.file.path);
                    var writeStream = fs.createWriteStream(newPath);
                    readStream.pipe(writeStream);
                    readStream.on('end', function () {
                        fs.unlinkSync(files.file.path);

                    });

                    console.log('upload end...');

                    userdao.upLoadIcon(avatarName,fields.uid,function (result) {

                    })

                    res.json({result:result});

                }
            }
        }) //end getUserByid
    })//end form.parse

});



/*获取用户基本信息*/
router.get('/getInfo',function (req,res,next) {
    var uid = req.query;
    if(uid!=null){
        userdao.getUserById(uid,function (_result) {
            res.json({result:_result});
        })
    }
});


/*获取用户真实信息*/
router.get('/getTrueInfo',function (req,res,next) {
    var uid = req.query;
    if(uid!=null){
        userdao.getUserTrueInfo(uid,function (_result) {
            res.json({result:_result});
        });
    }
});



/*修改用户基本信息信息*/
router.post('/updateUserInfo',function (req,res,next) {
    var user = req.body;
        userdao.updateUserInfo(user,function (_result) {
            res.json({result:_result});
        });

});

/*实名认证*/
router.post('/updateTrueUserInfo', function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err,user,files) {
        if (err) {
            response.locals.error = err;
            return;
        }

        userdao.getUserById(user,function (result) {
            console.log(result.length==1);
            if(result.length==1){
                var extName ='';  //后缀名
                switch (files.file1.type) {  //此处in_file  为页面端 <input type=file name=in_file>
                    case 'image/jpg':
                        extName = 'jpg';
                        break;
                    case 'image/jpeg':
                        extName = 'jpeg';
                        break;
                    case 'image/png':
                        extName = 'png';
                        break;
                    case 'image/x-png':
                        extName = 'png';
                        break;
                }
                console.log('extName='+extName)
                if(extName.length == 0){
                    res.send('只支持png和jpg格式图片');
                    return;
                }else{
                    form.uploadDir = "../public/"+userCardPic;     //设置上传目录
                    form.keepExtensions = true;     //保留后缀
                    form.maxFieldsSize = 2 * 1024;   //文件大小

                    var avatarName1 = createUnique.creatName() + '.' + extName;
                    var avatarName2 = createUnique.creatName() + '.' + extName;
                    var newPath1 = form.uploadDir+avatarName1;
                    var newPath2 = form.uploadDir+avatarName2;
                    var readStream1 = fs.createReadStream(files.file1.path);
                    var readStream2 = fs.createReadStream(files.file2.path);
                    var writeStream1 = fs.createWriteStream(newPath1);
                    var writeStream2 = fs.createWriteStream(newPath2);
                    readStream1.pipe(writeStream1);
                    readStream2.pipe(writeStream2);
                    readStream1.on('end', function () {
                        fs.unlinkSync(files.file1.path);
                    });

                    readStream2.on('end', function () {
                        fs.unlinkSync(files.file2.path);
                    });


                }
                user.upic1=avatarName1;
                user.upic2=avatarName2;
                userdao.updateUserTrueInfo(user,function (result) {
                    res.json({result:result});
                })
            }
        }) //end getUserByid
    })//end form.parse

});

/*修改密码*/
router.post('/updatePwd',function (req,res,next) {
    var user = req.body;
    userdao.updatePwd(user,function (_result) {
        res.json({result:_result});
    })
})


/*检测用户是否已经实名认证*/
router.get('/alreadyTrueName',function (req,res,next) {
    var user = req.query;
    if(user!=null){
        userdao.alreadyTrueName(user,function (_result) {
            res.json({result:_result});
        })
    }
})


module.exports = router;
