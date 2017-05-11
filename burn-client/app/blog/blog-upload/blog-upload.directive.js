/**
 * Created by Yezi on 2017/4/30.
 */

angular.module('blogUpload')
    .directive('blogUploadPage',function () {
        return {
            restrict : "ACE",
            replace:true,
            templateUrl :'blog/blog-upload/blog-upload.template.html',
            controller:['$scope','$http','Upload','$state','serverUrl',function ($scope,$http,Upload,$state,serverUrl) {

                $scope.quill = new Quill('#editor-container', {
                    modules: {
                        formula: true,
                        syntax: true,
                        toolbar: '#toolbar-container'
                    },
                    placeholder: '请输入内容....',
                    theme: 'snow'
                });

                //获取种类数据
                $http({
                    method: 'GET',
                    url: serverUrl + 'video/getKindType',
                }).then(function (response) {
                    $scope.kindType = response.data.result;
                })

                //获取博客种类
                $scope.blogKindSelect=function (k) {
                    $scope.btype=k;
                }

                //上传博客
                var s = localStorage.getItem('isLogin');
                var s1 = sessionStorage.getItem('isLogin');
                if(s||s1){
                    $scope.publishBlog = function () {
                        $scope.bpcontent=$('.ql-editor').html();
                        console.log('publishBlog')
                        var blogtxt={
                            btitle:$scope.bptitle,
                            bzhaiyao:$scope.bpzhaiyao,
                            bcontent:$scope.bpcontent,
                            uid:$scope.uid,
                            btype:$scope.btype,
                        }
                        var url = serverUrl + 'blog/insertBlog';  //params是model传的参数，图片上传接口的url
                        var data = angular.copy({blogtxt:JSON.stringify(blogtxt)} || {}); // 接口需要的额外参数，比如指定所上传的图片属于哪个用户: { UserId: 78 }
                        data.file =$scope.blogCover;
                        Upload.upload({
                            url: url,
                            data: data
                        }).success(function (data) {
                            $state.go('blog');

                        }).error(function () {
                            console.log('error');
                        });
                    };
                }else{
                    $state.go('login');
                    alert('请先登录')
                }


            }]

        }
    })

