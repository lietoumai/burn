/**
 * Created by lcx on 2017/5/5.
 */
angular.module('serviceBlog')
    .service('blogService', ['$http', '$state', '$rootScope', 'serverUrl', function ($http, $state, $rootScope, serverUrl) {
    }])

    //我的动态
    .factory('getBlogByuidService', ['$http','$state', '$rootScope', 'serverUrl', function ($http,$state, $rootScope, serverUrl) {

        return {
            getBlogByuid: function (data) {
                console.log(data);
                $http.get(serverUrl+'blog/getBlogByuid?uid='+$rootScope.uid)
                    .then(function successCallback(response){
                        if(response.data.result.length!=0){
                            $rootScope.showBlogdata = response.data.result;
                        }
                    })
            }
        }
    }])

    //博客收藏
    .factory('blogKeepService', ['$http','$state', '$rootScope', 'serverUrl', function ($http,$state, $rootScope, serverUrl) {

        return {
            getBlogKeep: function (data) {
                $http.get(serverUrl+'blog/getBlogKeep?uid='+data)
                    .then(function successCallback(response) {
                        if(response.data.result.length>0){
                            $rootScope.blogkeepData = response.data.result;
                        }
                    });
            }
        }
    }])


    .factory('deleteblogService', ['$http','$state', '$rootScope', 'serverUrl', function ($http,$state, $rootScope, serverUrl) {

        return {
            deleteBlogCollect: function (bkid) {
                $http.get(serverUrl+'blog/deleteBlogCollect?bkid='+bkid)
                    .then(function successCallback(response) {
                        if(response.data.result==1){
                            alert('删除成功！')
                        }
                    });
            }
        }
    }])