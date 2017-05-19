var express = require('express');
var router = express.Router();
var coursedao = require('./../dao/courseDAO');
var coursesql = require('./../dao/sql/courseSql');


//图像上传
var formidable = require('./../node_modules/formidable');
var AVATAR_UPLOAD_FOLDER = '/images/';
var coursePic='/images/course/'
var createUnique = require('./../util/createUnique');
var fs = require('fs');

//展示今日课程
router.get('/getTodayCourse',function (req,res,next) {
    coursedao.getTodayCourse(function (_result) {
        res.json({result:_result});
    })
})




//展示课程简介
router.get('/getCourse',function (req,res,next) {
    coursedao.getCourse(function (_result) {
        res.json({result:_result});
    })
})

//根据日历查看课程
router.post('/selectcal',function (req,res,next) {
    var course = req.body;
    if(course!=null){
        coursedao.selectcal(course,function (_result) {
            res.json({result:_result});
        })
    }
})

//查看课程详情
router.post('/selectCourseDetailed',function (req,res,next) {
    var course = req.body;
    coursedao.selectCourseDetailed(course,function (_result) {
        res.json({result:_result});
    })
})

//查看当前课程是否已经过期
router.get('/sellectCourseTime',function (req,res,next) {
    var course = req.query;
    coursedao.sellectCourseTime(course,function (_result) {
        res.json({result:_result});
    })
})

//删除课程
router.get('/deleteCourse',function (req,res,next) {
    var course = req.query;
    coursedao.deleteCourse(course,function (_result) {
        res.json({result:_result});
    })
})


//选择课程
router.post('/selectCourse',function (req,res,next) {
    var course = req.body;
    coursedao.selectCourse(course,function (_result) {
        res.json({result:_result});
    })
})

//查看该课程选课人数
router.get('/selectCourseCount',function (req,res,next) {
    var course = req.query;
    coursedao.selectCourseCount(course,function (_result) {
        res.json({result:_result});
    })
})

//个人中心查看选课记录
router.get('/showCourseById',function (req,res,next) {
    var course = req.query;
    if(course!=null){
        coursedao.showCourseById(course,function (_result) {
            res.json({result:_result});
        })
    }
})

//教练发布课程
router.post('/ReleaseCourse', function (req, res, next) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

        var data=fields.coursedata;
        console.log('文件后缀名为 '+files.file1.type);
        switch (files.file1.type) {  //此处in_file  为页面端 <input type=file name=in_file>
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
            form.uploadDir = "../public"+coursePic;     //设置上传目录
            form.keepExtensions = true;     //保留后缀
            form.maxFieldsSize = 2 * 1024;   //文件大小
            var newName1 = createUnique.creatName() + '.' + extName;
            var newName2 = createUnique.creatName() + '.' + extName;
            var newPath1 = form.uploadDir + newName1;
            var newPath2 = form.uploadDir + newName2;

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

            var coursedata=JSON.parse(data);
            coursedata.cpic1=newName1;
            data[0].cpic1=newName1;
            coursedata.cpic2=newName2;
            data[0].cpic2=newName2;


            coursedao.ReleaseCourse(coursedata,function (result) {
                        console.log({result:result});
                        res.json({result:result});
            })

        }

    })//end form.parse

})

//教练课程推送
router.get('/getCourseThree',function (req,res,next) {
    var course = req.query;
    coursedao.getCourseThree(course,function (_result) {
        res.json({result:_result});
    })
})



//首页轮播
router.get('/bannerPush',function (req,res,next) {
    coursedao.bannerPush(function (_result) {
        res.json({result:_result});
    });
})


//申请轮播
router.post('/insertBanner',function (req,res,next) {
    var course = req.body;
    if(course!=null){
        coursedao.insertBanner(course,function (_result) {
            res.json({result:_result});
        })
    }
})

module.exports = router;