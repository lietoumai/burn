/**
 * Created by Yezi on 2017/4/23.
 */
angular.module('personalSet')
    .directive('personalSetPart',function () {
        return {
            restrict : "ACE",
            replace:true,
            templateUrl :'personal/personal-Set/personal-set.template.html',
            controller: [
                '$scope',
                '$http',
                'showUserInfo',
                '$rootScope',
                'IconUrl',
                'Upload',
                'serverUrl',
                'showUserTrueInfo',
                'updateUserInfo',
                'updatePass',
                'logout',
                '$state',
                'idcardUrl',
                function (
                    $scope,
                    $http,
                    showUserInfo,
                    $rootScope,
                    IconUrl,
                    Upload,
                    serverUrl,
                    showUserTrueInfo,
                    updateUserInfo,
                    updatePass,
                    logout,
                    $state,
                    idcardUrl) {

                $scope.idcardUrl = idcardUrl;

                // 个人中心
                $(function () {
                    showUserInfo.showUserInfo($rootScope.uid);
                })
                $("#information").click(function(){
                    $("#personal-set-information").siblings().hide()
                    $("#personal-set-information").show();
                    showUserInfo.showUserInfo($rootScope.uid);
                });
                // 实名认证
                $("#trueName").click(function(){
                    $("#personal-set-trueName").siblings().hide()
                    $("#personal-set-trueName").show();
                     showUserTrueInfo.showUserTrueInfo($rootScope.uid);
                });
                // 修改密码
                $("#resetPwd").click(function(){
                    $("#personal-set-resetPwd").siblings().hide()
                    $("#personal-set-resetPwd").show();
                });
                // 编辑个人信息
                $("#information-edit-btn").click(function(){
                    $("#personal-set-information-edit").siblings().hide()
                    $("#personal-set-information-edit").show();
                });
                // 编辑实名信息
                $("#true-edit-btn").click(function(){
                    $("#personal-set-trueName-edit").siblings().hide()
                    $("#personal-set-trueName-edit").show();
                });
                    
                // 保存身份证样式

                $("#card-pic1").click(function (ev) {
                    $("#userCard1").hide();
                })

                $("#card-pic1").hover(function (ev) {
                    $("#userCard1").show();
                },function (ev) {
                    $("#userCard1").hide();
                })

                $("#card-pic2").click(function (ev) {
                    $("#userCard2").hide();
                })

                $("#card-pic2").hover(function (ev) {
                    $("#userCard2").show();
                },function (ev) {
                    $("#userCard2").hide();
                })

                // 图片上传

                 // 实名制
                $scope.data = {
                    defaultCart:IconUrl+$rootScope.uicon
                };
                $scope.trueName = function () {

                    var url = serverUrl+'users/updateTrueUserInfo';  //params是model传的参数，图片上传接口的url
                    var data = angular.copy({uid:$rootScope.uid,utname:$scope.utname,ucard:$scope.ucard} || {}); // 接口需要的额外参数，比如指定所上传的图片属于哪个用户: { UserId: 78 }
                    data.file1 = $scope.userCard1;
                    data.file2 = $scope.userCard2;
                    Upload.upload({
                        url: url,
                        data: data,
                    }).success(function (data) {
                        console.log(data)
                        alert("认证成功");
                        console.log($rootScope.uid);
                        showUserTrueInfo.showUserTrueInfo($rootScope.uid);
                        // $scope.isCropShow=false;
                        // $rootScope.navIcon=$rootScope.uicon;
                        alert('实名成功！');
                        $scope.isCropShow=false;
                        $rootScope.navIcon=$rootScope.uicon;

                    }).error(function () {
                        console.log('error');
                    });
                };



                    //调用修改信息方法
                    $scope.updateUserInfo = function () {
                        updateUserInfo.updateUserInfo({uname:$scope.uname,usex:$scope.usex,usignature:$scope.usignature,uid:$rootScope.uid});
                    }


                    //调用修改密码方法
                    $scope.updatePass = function () {
                        updatePass.updatePass({upwd:$scope.upwd,upwd2:$scope.upwd2,uid:$rootScope.uid});
                        logout.logout();
                        $rootScope.isLogin = false;
                        $state.go('login');
                    }








            }]
        }
    });