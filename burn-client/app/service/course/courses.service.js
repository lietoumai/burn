/**
 * Created by lcx on 2017/4/25.
 */
angular.module('serviceCourse')
    .service('calService1', ['$http', '$state', '$rootScope', 'serverUrl', function ($http, $state, $rootScope, serverUrl) {
    }])


    //展示多少人选课
    .factory('courseCountService',['$http','$rootScope','serverUrl',function ($http,$rootScope,serverUrl) {
        return{
            selectCourseCount:function (data) {
                $http.get(serverUrl+'courses/selectCourseCount?cid='+data.cid)
                    .then(function successCallback(response) {
                        // 请求成功执行代码
                        if (response.data.result.length >0) {
                            $rootScope.coursedataCount = response.data.result[0];
                        }

                    })
            }
        }
    }])


    //查看课程是否已经过期
    .factory('courseTimeService',['$http','$rootScope','serverUrl',function ($http,$rootScope,serverUrl) {
        return{
            sellectCourseTime:function (data) {
                $http.get(serverUrl+'courses/sellectCourseTime?cid='+data.cid)
                    .then(function successCallback(response) {
                        console.log(response.data.result)
                        // 请求成功执行代码
                        if (response.data.result==0) {
                            // alert('该课程已经过期!');
                            $('#selectCourse').attr('disabled',true);
                            $('#selectCourse').val('该课程已经过期');
                            $('#selectCourse').css('background-color','grey');
                        }

                    })
            }
        }
    }])

    //展示课程详细信息

    .factory('selectCourseDetailed', ['$http','$state', '$rootScope', 'serverUrl', function ($http,$state, $rootScope, serverUrl) {

        return {
            selectCourseDetailed: function (data) {
               $http({
                   url: serverUrl + "courses/selectCourseDetailed",
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
                       if (response.data.result.length >0) {
                           $rootScope.coursedataDetailed = response.data.result[0];
                           if($rootScope.coursedataCount.peopleCount==$rootScope.coursedataDetailed.ccount){
                               alert('该课程已经被选满');
                               $('#selectCourse').attr('disabled',true);
                               $('#selectCourse').val('已满');
                               $('#selectCourse').css('background-color','grey');
                           }
                       }

                   }, function errorCallback(response) {
                       // 请求失败执行代码
                   })
            }
        }
    }])
    .factory('selectcal', ['$http','$state', '$rootScope', 'serverUrl', function ($http,$state, $rootScope, serverUrl) {

    return {
        selectcal: function (data) {
            $http({
                url: serverUrl + "courses/selectcal",
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
                    if (response.data.result.length >0) {
                        $rootScope.coursecal = response.data.result;
                    }

                }, function errorCallback(response) {
                    // 请求失败执行代码
                })
        }
    }
}])

    //选课记录
    .factory('selectCourseService', ['$http','$state', '$rootScope', 'serverUrl', function ($http,$state, $rootScope, serverUrl) {

    return {
        selectCourse: function (data) {
            if($rootScope.coursedataCount.peopleCount==$rootScope.coursedataDetailed.ccount){
                    alert('该课程已经被选满');
            }else{
                $http({
                    url: serverUrl + "courses/selectCourse",
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
                            $rootScope.isSelected = true;
                            alert('选课成功!')
                        }else if(response.data.result==5){
                            $rootScope.isSelected = true;
                            alert('您已经选择过该课程!')
                        }
                        if($rootScope.isSelected==true){
                            $('#selectCourse').attr('disabled',$rootScope.isSelected);
                            $('#selectCourse').val('已选择');
                            $('#selectCourse').css('background-color','grey');
                        }
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                    })
            }
        }
    }
}])
    //查看个人中心的选课记录
    .factory('showCourseByIdService', ['$http','$state', '$rootScope', 'serverUrl', function ($http,$state, $rootScope, serverUrl) {

        return {
            showCourseById: function (data) {
                    $http.get(serverUrl+'courses/showCourseById?uid='+data)
                        .then(function successCallback(response) {
                            // 请求成功执行代码
                            if (response.data.result.length>0) {
                                $rootScope.showmyCourse = response.data.result;
                            }else{
                                $('#personal-course-schedule').html('<img src="images/null.jpg" height="500" width="900" />');
                            }
                        }, function errorCallback(response) {
                            // 请求失败执行代码
                        })

            }
        }
    }])

    //个人中心退课
    .factory('deleteCourseService', ['$http','$state', '$rootScope', 'serverUrl', function ($http,$state, $rootScope, serverUrl) {

        return {
            deleteCourse: function (data) {

                $http.get(serverUrl+'courses/deleteCourse?chid='+data)
                    .then(function successCallback(response) {
                        // 请求成功执行代码
                        if (response.data.result==1) {
                           alert('退课成功!')
                        }
                        if (response.data.result==0) {
                            alert('退课失败!')
                        }
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                    })

            }
        }
    }])
    //查看个人中心的预约记录
    .factory('showappoByIdService', ['$http','$state', '$rootScope', 'serverUrl', function ($http,$state, $rootScope, serverUrl) {

        return {
            showAppoById: function (data) {

                $http.get(serverUrl+'coachs/showAppoById?uid='+data)
                    .then(function successCallback(response) {
                        // 请求成功执行代码
                        if (response.data.result.length>0) {
                            $rootScope.showmyAppoInfo = response.data.result;
                        }else{
                            $('#personal-course-appoinment').html('<img src="images/null.jpg" height="500" width="900" />');
                        }
                    }, function errorCallback(response) {
                        // 请求失败执行代码
                    })

            }
        }
    }])


