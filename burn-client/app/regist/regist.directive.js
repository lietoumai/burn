/**
 * Created by Yezi on 2017/4/21.
 */
angular.module('regist')
    .directive('registPart',function () {
        return {
            restrict : "ACE",
            replace:true,
            templateUrl : 'regist/regist.template.html',
            controller:['$scope','$http','$state','$rootScope','serverUrl','loginService2',function ($scope,$http,$state,$rootScope,serverUrl,loginService2) {

                //注册
                $scope.regists=function () {
                    $http({
                        url:serverUrl+"users/regist",
                        method:'POST',
                        data:{
                            utel:$scope.utel,
                            upwd:$scope.upwd,
                            uname:$scope.uname
                        },
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

                            if (response.data.result == 1) {
                                alert('注册成功!');
                                sessionStorage.setItem('utel',$scope.utel);
                                sessionStorage.setItem('upwd',$scope.upwd);
                                var t1 = sessionStorage.getItem('utel');
                                var t2 = sessionStorage.getItem('upwd');

                                if(t1!=null && t2!=null){
                                    $scope.utel = t1;
                                    $scope.upwd = t2;
                                    $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                                }

                            }else if(response.data.result == 5){
                                $('#regutel').text('该手机号已经被注册');
                                setTimeout('$("#loginUser").text("")',1000);
                            }
                        }, function errorCallback(response) {
                            // 请求失败执行代码
                        })
                }
            }]
        }
    })
    .directive('utelcheck',function () {
        var tel_regexp = /^1[34578]\d{9}$/;
        return{
            require:'ngModel',
            link:function (sco,ele,att,con) {
                con.$validators.utelcheck = function (v) {
                    if(tel_regexp.test(v)){
                        return true;
                    }else{
                        return false;
                    }
                }
            }
        }
    })
    .directive('unamecheck',function () {
        var uname_regexp = /^[\u4e00-\u9fa5a-zA-Z_]+$/;
        return{
            require:'ngModel',
            link:function (sco,ele,att,con) {
                con.$validators.unamecheck = function (v) {
                    if(uname_regexp.test(v)){
                        return true;
                    }else{
                        return false;
                    }
                }
            }
        }
    })
    .directive('upwdcheck',function () {
        var upwd_regexp =/^[a-zA-Z]\w{5,17}$/;
        return{
            require:'ngModel',
            link:function (sco,ele,att,con) {
                con.$validators.upwdcheck = function (v) {
                    if(upwd_regexp.test(v)){
                        return true;
                    }else{
                        return false;
                    }
                }
            }
        }
    })