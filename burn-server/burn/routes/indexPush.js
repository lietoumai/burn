/**
 * Created by Yezi on 2017/5/1.
 */
var express = require('express');
var router = express.Router();
var indexDAO = require('./../dao/indexPushDAO');
var indexSql = require('./../dao/sql/indexSql');


//图像上传
var formidable = require('./../node_modules/formidable');
var AVATAR_UPLOAD_FOLDER = '/uploads/';
var imgForUserCard='images/imgForUserCard/'
var createUnique = require('./../util/createUnique');
var fs = require('fs');


router.get('/', function(req, res, next) {

});
//博客推荐
router.get('/getBlogPush',function (req,res,next) {
    console.log(11111111111111111)
    indexDAO.getBlogPush(function (result) {
        if(result.length>0){
            res.json({result:result});
        }
    })
});


//视频推荐
router.get('/getVideoPush',function (req,res,next) {
    indexDAO.getVideoPush(function (result) {
        if(result.length>0){
            res.json({result:result});
        }
    })
});

//课程推荐
router.get('/getCoursePush',function (req,res,next) {
    indexDAO.getCoursePush(function (result) {
        if(result.length>0){
            res.json({result:result});
        }
    })
});


//教练推荐
router.get('/getCoachPush',function (req,res,next) {
    indexDAO.getCoachPush(function (result) {
        if(result.length>0){
            res.json({result:result});
        }
    })
});
module.exports = router;