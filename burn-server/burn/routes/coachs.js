var express = require('express');
var router = express.Router();
var coachdao = require('./../dao/coachDAO');
var coachsql = require('./../dao/sql/coachSql');


//图像上传
var formidable = require('./../node_modules/formidable');
var AVATAR_UPLOAD_FOLDER = '/images/';
var coachPhoto='/images/idcard/'
var createUnique = require('./../util/createUnique');
var fs = require('fs');
/* GET users listing. */

router.get('/', function(req, res, next) {

});

/*展示分类*/
router.get('/showkindtype', function(req, res, next) {
    coachdao.showkindtype(function (_result) {
        res.json({result:_result});
    })
});

//展示兼职全职
router.get('/showjobtype', function(req, res, next) {
    coachdao.showjobtype(function (_result) {
        res.json({result:_result});
    })
});

//展示教练基本信息
router.get('/showcoach',function (req,res,next) {
    coachdao.showcoach(function (_result) {
        res.json({result:_result});
    })
})

//展示教练详情
router.get('/showcoachDetail',function (req,res,next) {
    var coach = req.query;
    coachdao.showcoachDetail(coach,function (_result) {
         res.json({result:_result});
    })
})

//预约教练
router.post('/appointCoach',function (req,res,next) {
    var coach = req.body;
    coachdao.appointCoach(coach,function (_result) {
        res.json({result:_result});
    })
})

//查看某时段教练是否已经被预约
router.post('/getappointInfo1',function (req,res,next) {
    var coach = req.body;
    coachdao.getappointInfo1(coach,function (_result) {
        res.json({result:_result});
    });
})
//查看该时段是否已经预约
router.post('/getappointtime',function (req,res,next) {
    var coach = req.body;
    coachdao.getappointtime(coach,function (_result) {
        res.json({result:_result});
    })
})


//个人中心查看预约记录
router.get('/showAppoById',function (req,res,next) {
    var coach = req.query;
    console.log(coach);
    if(coach!=null){
        coachdao.showAppoById(coach,function (_result) {
            res.json({result:_result});
        })
    }
})




//成为教练
router.post('/becomeCoach', function (req, res, next) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        var data=fields.coachdata;
        console.log('文件后缀名为 '+files.file.type);
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
        if(extName.length == 0){
            res.send('只支持png和jpg格式图片');
            return;
        }else{
            form.uploadDir = "../public"+coachPhoto;     //设置上传目录
            form.keepExtensions = true;     //保留后缀
            form.maxFieldsSize = 2 * 1024;   //文件大小
            var newName = createUnique.creatName() + '.' + extName;
            var newPath = form.uploadDir + newName;

            var readStream = fs.createReadStream(files.file.path);
            var writeStream = fs.createWriteStream(newPath);
            readStream.pipe(writeStream);
            readStream.on('end', function () {
                fs.unlinkSync(files.file.path);

            });

            var coachdata=JSON.parse(data);
            coachdata.bpic=newName;
            data[0].bpic=newName;


            coachdao.becomeCoach(coachdata,function (result) {
                if(result==1){
                    coachdao.coachExpress(coachdata,function (result) {
                        res.json({result:result});

                    })
                }
            })



        }

    })//end form.parse

})

//检测是否是教练
router.get('/alreadyCoach',function (req,res,next) {
    var coach = req.query;
    coachdao.alreadyCoach(coach,function (_result) {
        res.json({result:_result});
    });
})


//教练查看预约记录
router.get('/getCoachCourse',function (req,res,next) {
    console.log(1111111111)
    var data = req.query;
    console.log(data.uid);
    if(data!=null){
        coachdao.getCoachCourse(data,function (result) {
            console.log(result)
            res.json({result:result});
        })
    }
})


module.exports = router;
