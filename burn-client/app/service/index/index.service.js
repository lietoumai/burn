/**
 * Created by Yezi on 2017/4/28.
 */
angular.module('indexBurn',[])
    /*.factory('showUserInfo',['$http','$state','$rootScope','serverUrl',function ($http,$state,$rootScope,serverUrl) {
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
                            console.log($rootScope.usex);
                            console.log($rootScope.uname);
                            console.log($rootScope.utel);
                            console.log($rootScope.usignature);
                        }
                    })
            }
        }
    }])*/