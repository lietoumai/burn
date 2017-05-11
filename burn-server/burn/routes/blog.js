/**
 * Created by Yezi on 2017/5/1.
 */
var express = require('express');
var router = express.Router();
var blogDAO = require('./../dao/blogDAO');
var blogSql = require('./../dao/sql/blogSql');


//图像上传
var formidable = require('./../node_modules/formidable');
var AVATAR_UPLOAD_FOLDER = '/uploads/';
var blogCover='/blogCover/'
var createUnique = require('./../util/createUnique');
var fs = require('fs');
/* GET users listing. */



router.get('/', function(req, res, next) {

});

router.get('/getBlog',function (req,res,next) {
    blogDAO.getBlog(function (result) {
        if(result.length>0){
            res.json({result:result});
        }
    })
})
//
router.get('/getBlogRecommend',function (req,res,next) {;
    blogDAO.getBlogRecommend(function (result) {
        if(result.length>0){
            res.json({result:result});
        }
    })
}),

    //获取博客详情
    router.get('/getBlogDetail',function (req,res,next) {
        var bid = req.query;
        if(bid!=null){
            blogDAO.getBlogDetail(bid.bid,function (result) {
                res.json(result);
            })
        }
    }),
//查询博客评论
    router.get('/getBlogComment',function (req,res,next) {
        var bid = req.query;
        if(bid!=null){
            blogDAO.getBlogComment(bid.bid,function (result) {
                res.json(result);
            })
        }
    }),
//博客评论
    router.get('/insertBlogComment',function (req,res,next) {
        console.log('insertBlogComment');
        var bc = req.query;
        if(bc.bid!=null){
            blogDAO.insertBlogComment(bc,function (result) {
                res.json(result);
            })
        }
    }),
    //收藏博客
    router.get('/insertBlogCollect',function (req,res,next) {
        var data = req.query;
        if(data.bid!=null){
            blogDAO.insertBlogCollect(data,function (result) {
                res.json(result);
            })
        }
    })
//查询博客收藏
router.get('/getBlogCollect',function (req,res,next) {
    var data = req.query;
    if(data.bid!=null){
        blogDAO.getBlogCollect(data,function (result) {
            console.log(result);
            res.json(result);
        })
    }
})
//更新博客点赞数量
router.get('/updateBlogLike',function (req,res,next) {
    var data = req.query;
    if(data.bid!=null){
        blogDAO.updateBlogLike(data,function (result) {
            res.json(result);
        })
    }
})

//插入博客
/*router.get('/insertBlog',function (req,res,next) {
 var data = req.query;
 console.log(11111111111111)
 console.log(data.bpic);
 if(data.uid!=null){
 blogDAO.insertBlog(data,function (result) {
 res.json(result);
 })
 }
 })*/

//上传博客
router.post('/insertBlog', function (req, res, next) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        var data=fields.blogtxt;
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
            form.uploadDir = "../public"+blogCover;     //设置上传目录
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

            var blogdata=JSON.parse(data);
            blogdata.bpic=newName;
            data[0].bpic=newName;


            blogDAO.insertBlog(blogdata,function (result) {
                console.log({result:result});
                res.json({result:result});

            })

        }

    })//end form.parse

})


//个人中心展示博客信息
router.get('/getBlogByuid',function (req,res,next) {
    var blog = req.query;
    if(blog.uid!=null){
        blogDAO.getBlogByuid(blog,function (_result) {
            res.json({result:_result});
        })
    }
})


//个人中心收藏的博客
router.get('/getBlogKeep',function (req,res,next) {
    var blog = req.query;
    if(blog.uid!=null){
        blogDAO.getBlogKeep(blog,function (_result) {
            res.json({result:_result});
        })
    }
});

//个人中心博客取消收藏
router.get('/deleteBlogCollect',function (req,res,next) {
    var blog = req.query;
    if(blog.bkid!=null){
        blogDAO.deleteBlogCollect(blog,function (_result) {
            res.json({result:_result});
        })
    }
});


module.exports = router;