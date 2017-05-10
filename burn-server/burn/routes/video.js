/**
 * Created by Yezi on 2017/4/30.
 */
var express = require('express');
var router = express.Router();
var videoDAO = require('./../dao/videoDAO');
var videoSql = require('./../dao/sql/videoSql');


//图像上传
var formidable = require('./../node_modules/formidable');
var AVATAR_UPLOAD_FOLDER = '/uploads/';
var imgForUserCard='images/imgForUserCard/'
var createUnique = require('./../util/createUnique');
var fs = require('fs');
/* GET users listing. */


router.get('/', function(req, res, next) {

});

//查询视频部位
router.get('/getPartType',function (req,res,next) {
    videoDAO.getPartType(function (result) {
        if(result.length>0){
            res.json({result:result});
        }
    })
});
//查询视频种类
router.get('/getKindType',function (req,res,next) {
    videoDAO.getKindType(function (result) {
        if(result.length>0){
            res.json({result:result});
        }
    })
});

//查询视频难度
router.get('/getRankType',function (req,res,next) {
    videoDAO.getRankType(function (result) {
        if(result.length>0){
            res.json({result:result});
        }
    })
});

//查询视频
router.get('/getVideo',function (req,res,next) {
    videoDAO.getVideo(function (result) {
        if(result.length>0){
            res.json({result:result});
        }
    })
});
//查询视频详情
router.get('/getVideoDetail',function (req,res,next) {
    var data =req.query;
    videoDAO.getVideoDetail(data.vid,function (result) {
        if(result.length>0){
            res.json({result:result});
        }
    });
});


//查询视频评论
router.get('/getVideoComment',function (req,res,next) {
    var data =req.query;
    videoDAO.getVideoComment(data.vid,function (result) {
        if(result.length>0){
            res.json({result:result});
        }
    })
});
//查询视频推荐
router.get('/getVideoByRank',function (req,res,next) {
    var data =req.query;
    videoDAO.getVideoByRank(data.vid,function (result) {
        if(result.length>0){
            res.json({result:result});
        }
    })
});

//更新博客点赞数
router.get('/updateVideoLikeCount',function (req,res,next) {
    var data =req.query;
    videoDAO.updateVideoLikeCount(data.vid,function (result) {
        if(result.length>0){
            res.json({result:result});
        }
    })
});


//视频收藏
router.get('/insertVideoCollect',function (req,res,next) {
    var data =req.query;
    videoDAO.insertVideoCollect(data,function (result) {
        if(result.length>0){
            res.json({result:result});
        }
    })
});


//视频评论
router.get('/insertVideoComment',function (req,res,next) {
    var data =req.query;
    videoDAO.insertVideoComment(data,function (result) {
        if(result==1){
            res.json({result:result})
        }
    })
});

//视频收藏
router.get('/getVideoCollect',function (req,res,next) {
    var data =req.query;
    videoDAO.getVideoCollect(data,function (result) {
        res.json({result:result});

    })
});

//查询视频购买
router.get('/getOrderVideo',function (req,res,next) {
    var data =req.query;
    videoDAO.getOrderVideo(data,function (result) {
        res.json({result:result});

    })
});

//购买视频
router.get('/insertVideoOrder',function (req,res,next) {
    var data =req.query;
    videoDAO.insertVideoOrder(data,function (result) {
        res.json({result:result});

    })
});

//个人中心视频订单
router.get('/getVideoOrder',function (req,res,next) {
    var video = req.query;
    if(video!=null){
        videoDAO.getVideoOrder(video,function (_result) {
                 res.json({result:_result});
        })
    }
});

//个人中心收藏的视频
router.get('/keepVideo',function (req,res,next) {
    var video = req.query;
    if(video!=null){
        videoDAO.keepVideo(video,function (_result) {
            res.json({result:_result});
        })
    }
});

//个人中心视频浏览记录
router.get('/videohistory',function (req,res,next) {
    var video = req.query;
    if(video!=null){
        videoDAO.videohistory(video,function (_result) {
            res.json({result:_result});
        })
    }
});

//删除订单
router.get('/deleteOrder',function (req,res,next) {
    var video = req.query;
    if(video.oid!=null){
        videoDAO.deleteOrder(video,function (_result) {
            res.json({result:_result});
        })
    }
});


//个人中心视频取消收藏
router.get('/deleteVideoCollect',function (req,res,next) {
    var video = req.query;
    if(video.vkid!=null){
        videoDAO.deleteVideoCollect(video,function (_result) {
            res.json({result:_result});
        })
    }
});



module.exports = router;