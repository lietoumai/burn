/**
 * Created by Yezi on 2017/4/23.
 */
angular.module('personal')
    .directive('personalPage',function () {
        return {
            restrict : "ACE",
            replace:true,
            templateUrl : 'personal/personal.template.html',
            controller:[
                '$scope',
                '$http',
                '$state',
                '$rootScope',
                'serverUrl',
                'Upload',
                'IconUrl',
                'showUserInfo',
                'getBlogByuidService',
                'blogCoverUrl',
                function ($scope,$http,$state,$rootScope,serverUrl,Upload,IconUrl,showUserInfo,getBlogByuidService,blogCoverUrl) {




                //展示用户基本信息
                    $(function () {
                        showUserInfo.showUserInfo($rootScope.uid);
                        getBlogByuidService.getBlogByuid($rootScope.uid);

                        //判断是否是教练

                        $http.get(serverUrl+'coachs/alreadyCoach?coid='+$rootScope.uid)
                            .then(function successCallback(response) {
                                if(response.data.result.length>0){
                                    $('#coachDiv').hide();
                                }else{
                                    $('#myJob').hide();
                                }
                            })
                    })



                   $(".nav-aside").hover(function (ev) {
                       $(ev.target).children().css("color","white");

                   },function (ev) {
                       $(ev.target).children().css("color","black");
                   })
                     // 修改头像样式
                   $('#change-user-icon-btn').click(function () {
                       console.log(111);
                       $('#change-user-icon-btn').hide();
                       $('#true-icon-btn').show();
                   })

                   $('#true-icon-btn').click(function () {
                       $('#true-icon-btn').hide();
                       $('#change-user-icon-btn').show();
                   })




                    // 图片上传

                    $scope.data = {
                        defaultImage:IconUrl+$rootScope.uicon
                    };
                    $scope.uploadUserIcon = function () {
                        if (!$scope.user_icon) {
                            return;
                        }

                        var url = serverUrl+'users/upload';  //params是model传的参数，图片上传接口的url
                        var data = angular.copy({uid:$rootScope.uid} || {}); // 接口需要的额外参数，比如指定所上传的图片属于哪个用户: { UserId: 78 }
                        data.file = $scope.user_icon;
                        Upload.upload({
                            url: url,
                            data: data
                        }).success(function (data) {
                            console.log(data.result[0].uicon);
                            $rootScope.uicon = data.result[0].uicon;
                            console.log($rootScope.uicon);
                            $scope.isCropShow=false;

                        }).error(function () {
                            console.log('error');
                        });
                    };

                    
                    //判断是否实名认证(不要删除)
                   /* $scope.panduan = function () {
                        $http.get(serverUrl+'users/alreadyTrueName?uid='+$rootScope.uid)
                            .then(
                                function successCallback(response){
                                    console.log(response.data.result[0].utname)
                                    if(response.data.result[0].utname==null){
                                        $state.go('personal.set');
                                        alert('请先进行实名认证!')
                                    }
                                }
                            );
                    }*/

            }]
        }
    });