/**
 * Created by lcx on 2017/5/5.
 */
angular.module('serviceVideo')
    .service('videoService', ['$http', '$state', '$rootScope', 'serverUrl', function ($http, $state, $rootScope, serverUrl) {
    }])

    //获取视频购买情况
    .factory('getVideoService', ['$http','$state', '$rootScope', 'serverUrl', function ($http,$state, $rootScope, serverUrl) {

        return {
            getOrderVideo: function (data) {
                $http.get(serverUrl+'video/getOrderVideo/?uid='+data)
                    .then(function successCallback(response) {
                        if(response.data.result.length>0){
                            $rootScope.videoData = response.data.result;
                        }
                    });
            },

        }
    }])


    //获取视频订单
    .factory('getVideoOrderService', ['$http','$state', '$rootScope', 'serverUrl', function ($http,$state, $rootScope, serverUrl) {

        return {
            getVideoOrder: function (data) {
                $http.get(serverUrl+'video/getVideoOrder/?uid='+data)
                    .then(function successCallback(response) {
                        if(response.data.result.length>0){
                            $rootScope.videoOrderData = response.data.result;
                        }else{
                            $('#nav-middle-right-dingdan').html('<img src="images/null.jpg" height="500" width="900" />');
                        }
                    });
            },

        }
    }])
    //视频收藏
    .factory('videoKeepService', ['$http','$state', '$rootScope', 'serverUrl', function ($http,$state, $rootScope, serverUrl) {

        return {
            keepVideo: function (data) {
                $http.get(serverUrl+'video/keepVideo/?uid='+data)
                    .then(function successCallback(response) {
                        if(response.data.result.length>0){
                            $rootScope.videokeepData = response.data.result;
                        }else{
                            $('#personal-collect-video').html('<img src="images/null.jpg" height="500" width="900" />');
                        }
                    });
            }
        }
    }])
    //获取视频浏览记录
    .factory('getVideohistoryService', ['$http','$state', '$rootScope', 'serverUrl', function ($http,$state, $rootScope, serverUrl) {

        return {
            getVideohistory: function (data) {
                $http.get(serverUrl+'video/videohistory/?uid='+data)
                    .then(function successCallback(response) {
                        if(response.data.result.length>0){
                            $rootScope.videohistoryData = response.data.result;
                        }
                    });
            }
        }
    }])

    //删除订单
    .factory('deletevideoService', ['$http','$state', '$rootScope', 'serverUrl', function ($http,$state, $rootScope, serverUrl) {

        return {
            deleteOrder: function (oid) {
                $http.get(serverUrl+'video/deleteOrder?oid='+oid)
                    .then(function successCallback(response) {
                        if(response.data.result==1){
                            alert('删除成功!');
                        }
                    });
            }
        }
    }])

    //删除视频收藏
    .factory('deletevideoCollectService', ['$http','$state', '$rootScope', 'serverUrl', function ($http,$state, $rootScope, serverUrl) {

        return {
            deleteVideoCollect: function (vkid) {
                $http.get(serverUrl+'video/deleteVideoCollect?vkid='+vkid)
                    .then(function successCallback(response) {
                        if(response.data.result==1){
                            alert('删除成功!');
                        }
                    });
            }
        }
    }])