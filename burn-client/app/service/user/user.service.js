/**
 * Created by lcx on 2017/4/25.
 */
angular.module('serviceUser')
    .service('loginService',['$http','$state','$rootScope','serverUrl',function ($http,$state,$rootScope,serverUrl) {

    }])

    .factory('loginService2',['$http','$state','$rootScope','serverUrl','$location',function ($http,$state,$rootScope,serverUrl,$location) {

        return{
            logins:function (data) {
            $http({
                url:serverUrl+"users/login",
                method:'POST',
                data:data,
                headers:{'Content-Type':'application/x-www-form-urlencoded'},
                transformRequest:function (obj) {
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p)+"="+encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                },
                responseType:'json'
            })
                .then(function successCallback(response) {
                    // 请求成功执行代码
                    if (response.data.result.status == 1) {
                        $rootScope.isLogin = true;
                        $rootScope.usertel = data.utel;
                        $rootScope.userpwd = data.upwd;
                        $rootScope.uid = response.data.result.uid;
                        $rootScope.uicon = response.data.result.uicon;
                        $rootScope.uname = response.data.result.uname;
                        $rootScope.upointcount = response.data.result.upointcount;
                        if ($rootScope.check == true) {
                            localStorage.setItem('isLogin', $rootScope.isLogin);
                            localStorage.setItem('utel', $rootScope.usertel);
                            localStorage.setItem('upwd', $rootScope.userpwd);
                            localStorage.setItem('uid', $rootScope.uid);
                            localStorage.setItem('uname',$rootScope.uname);
                            localStorage.setItem('upointcount',$rootScope.upointcount);
                            localStorage.setItem('checkbox', true);
                        } else {
                            sessionStorage.setItem('isLogin', $rootScope.isLogin);
                            sessionStorage.setItem('utel', $rootScope.usertel);
                            sessionStorage.setItem('upwd', $rootScope.userpwd);
                            sessionStorage.setItem('uid', $rootScope.uid);
                            sessionStorage.setItem('uname',$rootScope.uname);
                            sessionStorage.setItem('upointcount',$rootScope.upointcount);
                            sessionStorage.setItem('checkbox', false);
                        }
                        // $('#loginSuccess').modal('show');


                    } else if (response.data.result == 2) {   //密码错误
                        $('#loginupwd').text('密码错误');
                        setTimeout('$("#loginupwd").text("")', 2000);

                    } else if (response.data.result == 0) {   //用户名不存在
                        $('#loginutel').text('该手机号不存在');
                        setTimeout('$("#loginutel").text("")', 2000);
                    }
                }, function errorCallback(response) {
                    // 请求失败执行代码
                })
        }
        }


    }])
    //注销
    .factory('logout',function () {
       return{
           logout:function () {
               localStorage.removeItem('isLogin');
               localStorage.removeItem('upwd');
               localStorage.removeItem('uid');
               localStorage.removeItem('utel');
               localStorage.removeItem('checkbox');
               sessionStorage.removeItem('isLogin');
               sessionStorage.removeItem('upwd');
               sessionStorage.removeItem('uid');
               sessionStorage.removeItem('utel');
               sessionStorage.removeItem('checkbox');
           }
       }
    })
    //展示用户基本信息
    .factory('showUserInfo',['$http','$state','$rootScope','serverUrl',function ($http,$state,$rootScope,serverUrl) {
        return{
            showUserInfo:function (uid) {
                console.log(uid);
                $http.get(serverUrl+'users/getInfo/?uid='+uid)
                    .then(function successCallback(response) {
                        // 请求成功执行代码
                        if (response.data.result.length == 1) {
                            
                            if(response.data.result[0].usex==0){
                                $rootScope.usex = '男';
                            }else{
                                $rootScope.usex = '女';
                            }
                            $rootScope.uname=response.data.result[0].uname;
                            $rootScope.utel=response.data.result[0].utel;
                            $rootScope.usignature =response.data.result[0].usignature;
                        } 
                    })
            }
        }
    }])
    //展示用户实名信息
    .factory('showUserTrueInfo',['$http','$state','$rootScope','serverUrl',function ($http,$state,$rootScope,serverUrl) {
        return{
            showUserTrueInfo:function (uid) {
                $http.get(serverUrl+'users/getTrueInfo/?uid='+uid)
                    .then(function successCallback(response) {
                        // 请求成功执行代码
                        if (response.data.result.length == 1) {
                            $rootScope.utname=response.data.result[0].utname;
                            $rootScope.ucard=response.data.result[0].ucard;
                            $rootScope.upic1 =response.data.result[0].upic1;
                            $rootScope.upic2 =response.data.result[0].upic2;

                        }
                    })
            }
        }
    }])
    //修改用户基本信息
    .factory('updateUserInfo', ['$http', '$state', '$rootScope', 'serverUrl', function ($http, $state, $rootScope, serverUrl) {
        return {
            updateUserInfo:function (data) {
                $http({
                    url:serverUrl+'users/updateUserInfo',
                    method:'POST',
                    data:data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    },
                    responseType: 'json'
                }).then(function successCallback(response) {
                    if(response.data.result==1){
                        alert('修改成功！')
                    }
                })
            }
        }
    }])
    .factory('updatePass',['$http', '$state', '$rootScope', 'serverUrl', function ($http, $state, $rootScope, serverUrl){
        return{
            updatePass:function (data) {
                $http({
                    url:serverUrl+'users/updatePwd',
                    method:'POST',
                    data:data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    },
                    responseType: 'json'
                }).then(function successCallback(response) {
                    console.log(response.data.result)
                    if(response.data.result==1){
                        alert('修改成功！请重新登录');

                    }else if(response.data.result==2){
                        alert('原始密码出错！')
                    }
                })
            }
        }
    }])
    .factory('addDiv',['$http', '$state', '$rootScope', 'serverUrl', function ($http, $state, $rootScope, serverUrl){
        return{
            addDiv:function () {
                var i = $('.job').length;
                var node = $('#node');
                var s = ' <div class="job"' +
                    ' id="job' +
                    i +
                    '">' +
                    '<button>' +
                    '开始时间:' +
                    '</button>' +
                    '<span>' +
                    '<input type="date">' +
                    '</span>' +
                    '<button>' +
                    '结束时间:' +
                    '</button>' +
                    '<span>' +
                    '<input type="date">' +
                    '</span>' +
                    '<div class="job-express">' +
                    '<button>' +
                    '工作职责' +
                    '</button> ' +
                    '<div class="express-txt">' +
                    ' <textarea></textarea>' +
                    '</div> ' +
                    '</div>' +
                    '<i class="iconfont icon-shanchu" ' +
                    'id="deletejob' +
                    i +
                    '" onclick="$(this).parent().remove()">' +
                    '</i>' +
                    ' </div>';
                node.append(s);
            }
        }
    }])

    .factory('deleteDiv',['$http', '$state', '$rootScope', 'serverUrl', function ($http, $state, $rootScope, serverUrl){
    return{
        deleteDiv:function () {
            $(this).parent('div').remove();
        }
    }
}])