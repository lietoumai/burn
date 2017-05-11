/**
 * Created by Yezi on 2017/4/30.
 */

angular.module('blog')
    .directive('blogPage',function () {
        return {
            restrict : "ACE",
            replace:true,
            templateUrl :'blog/blog.template.html',
            controller:[
                '$scope',
                '$http',
                'serverUrl',
                'blogCoverUrl',
                '$state',
                function ($scope,$http,serverUrl,blogCoverUrl,$state) {
                $scope.blogCoverUrl=blogCoverUrl;
                $scope.lookMore=4;
                //获取博客数据
                $http({
                    method:'GET',
                    url:serverUrl+'blog/getBlog',
                }).then(
                    function (response) {
                        $scope.blogList=response.data.result;
                        $scope.blogList=response.data.result;
                        console.log($scope.blogList);
                    }
                )

                //获取博客推荐
                $http({
                    method:'GET',
                    url:serverUrl+'blog/getBlogRecommend',
                }).then(
                    function (response) {
                        $scope.blogRecommend=response.data.result;
                        // $scope.videoList=response.data.result;
                        // console.log($scope.videoList);
                    }
                ),

               $scope.recommendBlogDetail=function (rbd) {
                    console.log(123123123);
                   $state.go('blog-detail',{bid:rbd});
               }

            }]

        }
    });