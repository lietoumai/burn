/**
 * Created by lcx on 2017/4/25.
 */
angular.module('serviceCoach')
    .service('coachService', ['$http', '$state', '$rootScope', 'serverUrl', function ($http, $state, $rootScope, serverUrl) {
    }])

    //展示教练分类
    .factory('showCoachKindService', ['$http','$state', '$rootScope', 'serverUrl', function ($http,$state, $rootScope, serverUrl) {

        return {
            showkindtype: function () {
                $http.get(serverUrl+'coachs/showkindtype/')
                    .then(function successCallback(response) {
                        if(response.data.result.length>0){
                            $rootScope.kindtypedata = response.data.result;
                        }
                    });
            }
        }
    }])
    //展示教练兼职全职
    .factory('showCoachquanService', ['$http','$state', '$rootScope', 'serverUrl', function ($http,$state, $rootScope, serverUrl) {

        return {
            showjobtype: function () {
                $http.get(serverUrl+'coachs/showjobtype/')
                    .then(function successCallback(response) {
                        if(response.data.result.length>0){
                            $rootScope.showjobtype = response.data.result;
                        }
                    });
            }
        }
    }])

    //展示教练详细信息
    .factory('showCoachDetailService', ['$http','$state', '$rootScope', 'serverUrl', function ($http,$state, $rootScope, serverUrl) {

        return {
                showcoachDetail: function (data) {
                    $http.get(serverUrl + "coachs/showcoachDetail?coid="+data.coid)
                        .then(function successCallback(response) {
                            // 请求成功执行代码
                            if (response.data.result.length >0) {
                                $rootScope.coachdataDetailed = response.data.result[0];
                            }

                        }, function errorCallback(response) {
                            // 请求失败执行代码
                        })
                }
            }

    }])

    //展示教练详细相关课程
    .factory('showCoachCourseService', ['$http','$state', '$rootScope', 'serverUrl', function ($http,$state, $rootScope, serverUrl) {

        return {
            getCourseThree: function (data) {
                $http.get(serverUrl + "courses/getCourseThree?coid="+data.coid)
                    .then(function successCallback(response) {
                        // 请求成功执行代码
                        console.log(response.data.result);
                        if (response.data.result.length >0) {

                            $rootScope.coachdataCourse = response.data.result;
                        }

                    }, function errorCallback(response) {
                        // 请求失败执行代码
                    })
            }
        }

    }])

    //预约教练
    .factory('appointCoachService', ['$http','$state', '$rootScope', 'serverUrl', function ($http,$state, $rootScope, serverUrl) {

        return {
            appointCoach: function (data) {
                $http({
                    url: serverUrl + "coachs/appointCoach",
                    method: 'POST',
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    },
                    responseType: 'json'
                })
                    .then(function successCallback(response) {
                        // 请求成功执行代码
                        if (response.data.result==1) {
                            alert('预约成功!')
                        }
                        if(response.data.result==5){
                            alert('该时段您已预约其他教练!')
                        }

                    }, function errorCallback(response) {
                        // 请求失败执行代码
                    })
            }
        }

    }])

    //查看该时段教练是否已经被预约
    .factory('alreadyAppoService', ['$http','$state', '$rootScope', 'serverUrl', function ($http,$state, $rootScope, serverUrl) {

        return {
            getappointInfo1: function (data) {
                $http({
                    url: serverUrl + "coachs/getappointInfo1",
                    method: 'POST',
                    data: data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function (obj) {
                        var str = [];
                        for (var p in obj) {
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        }
                        return str.join("&");
                    },
                    responseType: 'json'
                })
                    .then(function successCallback(response) {
                        // 请求成功执行代码
                        if (response.data.result.length>0) {
                            console.log(response.data.result);
                            for(var i=0;i<response.data.result.length;i++){
                                console.log(response.data.result[i].appointtime);
                                if(response.data.result[i].appointtime=='8:00-10:00'){
                                    $('#time01').css('background-color','#AFAFAF');
                                    $('#time01').css('box-shadow','none');
                                    $('#btn01').attr('disabled',true);
                                }
                                if(response.data.result[i].appointtime=='10:00-12:00'){
                                    $('#time02').css('background-color','#AFAFAF');
                                    $('#time02').css('box-shadow','none');
                                    $('#btn02').attr('disabled',true);
                                }
                                if(response.data.result[i].appointtime=='14:00-16:00'){
                                    $('#time03').css('background-color','#AFAFAF');
                                    $('#time03').css('box-shadow','none');
                                    $('#btn03').attr('disabled',true);
                                }
                                if(response.data.result[i].appointtime=='16:00-18:00'){
                                    $('#time04').css('background-color','#AFAFAF');
                                    $('#time04').css('box-shadow','none');
                                    $('#btn04').attr('disabled',true);
                                }
                                if(response.data.result[i].appointtime=='19:00-21:00'){
                                    $('#time05').css('background-color','#AFAFAF');
                                    $('#time05').css('box-shadow','none');
                                    $('#btn05').attr('disabled',true);
                                }
                            }


                        }
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                    })
            }
        }

    }])