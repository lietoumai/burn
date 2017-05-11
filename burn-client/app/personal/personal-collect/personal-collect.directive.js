/**
 * Created by Yezi on 2017/4/23.
 */
angular.module('personalCollect')
    .directive('personalCollectPart',function () {
        return {
            restrict : "ACE",
            replace:true,
            templateUrl : 'personal/personal-collect/personal-collect.template.html',
            controller:['$scope',
                '$rootScope',
                'videoKeepService',
                'videoUrl',
                'IconUrl',
                'blogUrl',
                'blogKeepService',
                '$http',
                'serverUrl',
                'deleteblogService',
                'deletevideoCollectService',
                'blogCoverUrl',
                function ($scope,$rootScope,videoKeepService,videoUrl,IconUrl,blogUrl,blogKeepService,$http,serverUrl,deleteblogService,deletevideoCollectService,blogCoverUrl) {

                    $scope.videoUrl = videoUrl;
                    $scope.IconUrl = IconUrl;
                    $scope.blogCoverUrl = blogCoverUrl;



                    //删除视频收藏
                    $scope.deleteVideoCollect = function (vkid) {
                        deletevideoCollectService.deleteVideoCollect(vkid);
                        $scope.collectVideo();
                    }



                    //删除博客收藏
                    $scope.deleteBlogCollect = function (bkid) {
                        deleteblogService.deleteBlogCollect(bkid);
                        $scope.collectBlog();
                    }


                    $(function () {
                        $scope.collectVideo();
                    })

                    $scope.collectVideo = function () {
                        videoKeepService.keepVideo($rootScope.uid);
                    }
                    $scope.collectBlog = function () {
                        blogKeepService.getBlogKeep($rootScope.uid);
                    }

                    $("#video-collect").click(function () {
                        $("#personal-collect-video").siblings().hide();
                        $("#personal-collect-video").show();
                    })
                    $("#blog-collect").click(function () {
                        $("#personal-collect-blog").siblings().hide();
                        $("#personal-collect-blog").show();
                    })



            }]
        }
    });