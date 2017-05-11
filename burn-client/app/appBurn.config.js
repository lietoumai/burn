/**
 * Created by Yezi on 2017/4/21.
 */

angular.module('burn')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/index');
        $stateProvider
            .state('index',{
                url:'/index',
                template:'<index-page></index-page>',
                controller:['$scope','loginService2',function ($scope,loginService2) {
                    var s = localStorage.getItem('isLogin');
                    var s1 = localStorage.getItem('utel');
                    var s2 = localStorage.getItem('upwd');
                    if(s!=null && s1!=null && s2!=null){
                        $scope.utel = s1;
                        $scope.upwd = s2;
                        $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                    }else{
                        var t = sessionStorage.getItem('isLogin');
                        var t1 = sessionStorage.getItem('utel');
                        var t2 = sessionStorage.getItem('upwd');

                        if(t!=null && t1!=null && t2!=null){
                            $scope.utel = t1;
                            $scope.upwd = t2;
                            $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                        }
                    }
                }]
            })
            .state('video', {
                url:'/video',
                params:{'serchTxt':{}},
                template:'<video-page></video-page>',
                controller:['$scope','loginService2',function ($scope,loginService2) {
                    var s = localStorage.getItem('isLogin');
                    var s1 = localStorage.getItem('utel');
                    var s2 = localStorage.getItem('upwd');
                    if(s!=null && s1!=null && s2!=null){
                        $scope.utel = s1;
                        $scope.upwd = s2;
                        $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                    }else{
                        var t = sessionStorage.getItem('isLogin');
                        var t1 = sessionStorage.getItem('utel');
                        var t2 = sessionStorage.getItem('upwd');

                        if(t!=null && t1!=null && t2!=null){
                            $scope.utel = t1;
                            $scope.upwd = t2;
                            $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                        }
                    }
                }]

            })
            .state('video-detail',{
                url:'/video-detail/:vid',
                template:'<video-detail-page></video-detail-page>',
                controller:['$scope','loginService2',function ($scope,loginService2) {
                    var s = localStorage.getItem('isLogin');
                    var s1 = localStorage.getItem('utel');
                    var s2 = localStorage.getItem('upwd');
                    if(s!=null && s1!=null && s2!=null){
                        $scope.utel = s1;
                        $scope.upwd = s2;
                        $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                    }else{
                        var t = sessionStorage.getItem('isLogin');
                        var t1 = sessionStorage.getItem('utel');
                        var t2 = sessionStorage.getItem('upwd');

                        if(t!=null && t1!=null && t2!=null){
                            $scope.utel = t1;
                            $scope.upwd = t2;
                            $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                        }
                    }
                }]
            })
            .state('video-buy',{
                url:'/video-buy/:data',
                template:'<video-buy-page></video-buy-page>',
                controller:['$scope','loginService2',function ($scope,loginService2) {
                    var s = localStorage.getItem('isLogin');
                    var s1 = localStorage.getItem('utel');
                    var s2 = localStorage.getItem('upwd');
                    if(s!=null && s1!=null && s2!=null){
                        $scope.utel = s1;
                        $scope.upwd = s2;
                        $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                    }else{
                        var t = sessionStorage.getItem('isLogin');
                        var t1 = sessionStorage.getItem('utel');
                        var t2 = sessionStorage.getItem('upwd');

                        if(t!=null && t1!=null && t2!=null){
                            $scope.utel = t1;
                            $scope.upwd = t2;
                            $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                        }
                    }
                }]
            })
            .state('course', {
                url:'/course',
                template: '<course-page></course-page>',
                controller:['$scope','loginService2',function ($scope,loginService2) {
                    var s = localStorage.getItem('isLogin');
                    var s1 = localStorage.getItem('utel');
                    var s2 = localStorage.getItem('upwd');
                    if(s!=null && s1!=null && s2!=null){
                        $scope.utel = s1;
                        $scope.upwd = s2;
                        $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                    }else{
                        var t = sessionStorage.getItem('isLogin');
                        var t1 = sessionStorage.getItem('utel');
                        var t2 = sessionStorage.getItem('upwd');

                        if(t!=null && t1!=null && t2!=null){
                            $scope.utel = t1;
                            $scope.upwd = t2;
                            $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                        }
                    }
                }]
            })
            .state('courseDetaileds',{
                // params:{'cid':null},
                url:'/course/course-detaileds/:cid',
                template: '<course-detailed-pages></course-detailed-pages>',
                controller:['$scope','loginService2',function ($scope,loginService2) {
                    var s = localStorage.getItem('isLogin');
                    var s1 = localStorage.getItem('utel');
                    var s2 = localStorage.getItem('upwd');
                    if(s!=null && s1!=null && s2!=null){
                        $scope.utel = s1;
                        $scope.upwd = s2;
                        $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                    }else{
                        var t = sessionStorage.getItem('isLogin');
                        var t1 = sessionStorage.getItem('utel');
                        var t2 = sessionStorage.getItem('upwd');

                        if(t!=null && t1!=null && t2!=null){
                            $scope.utel = t1;
                            $scope.upwd = t2;
                            $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                        }
                    }
                }]

            })
            .state('blog', {
                url:'/blog',
                template: '<blog-page></blog-page>',
                controller:['$scope','loginService2',function ($scope,loginService2) {
                    var s = localStorage.getItem('isLogin');
                    var s1 = localStorage.getItem('utel');
                    var s2 = localStorage.getItem('upwd');
                    if(s!=null && s1!=null && s2!=null){
                        $scope.utel = s1;
                        $scope.upwd = s2;
                        $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                    }else{
                        var t = sessionStorage.getItem('isLogin');
                        var t1 = sessionStorage.getItem('utel');
                        var t2 = sessionStorage.getItem('upwd');

                        if(t!=null && t1!=null && t2!=null){
                            $scope.utel = t1;
                            $scope.upwd = t2;
                            $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                        }
                    }
                }]

            })
            .state('blog-detail', {
                url:'/blog-detail/:bid',
                template: '<blog-detail-page></blog-detail-page>',
                controller:['$scope','loginService2',function ($scope,loginService2) {
                    var s = localStorage.getItem('isLogin');
                    var s1 = localStorage.getItem('utel');
                    var s2 = localStorage.getItem('upwd');
                    if(s!=null && s1!=null && s2!=null){
                        $scope.utel = s1;
                        $scope.upwd = s2;
                        $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                    }else{
                        var t = sessionStorage.getItem('isLogin');
                        var t1 = sessionStorage.getItem('utel');
                        var t2 = sessionStorage.getItem('upwd');

                        if(t!=null && t1!=null && t2!=null){
                            $scope.utel = t1;
                            $scope.upwd = t2;
                            $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                        }
                    }
                }]

            })
            .state('blog-upload', {
                url:'/blog-upload',
                template: '<blog-upload-page></blog-upload-page>',
                controller:['$scope','loginService2',function ($scope,loginService2) {
                    var s = localStorage.getItem('isLogin');
                    var s1 = localStorage.getItem('utel');
                    var s2 = localStorage.getItem('upwd');
                    if(s!=null && s1!=null && s2!=null){
                        $scope.utel = s1;
                        $scope.upwd = s2;
                        $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                    }else{
                        var t = sessionStorage.getItem('isLogin');
                        var t1 = sessionStorage.getItem('utel');
                        var t2 = sessionStorage.getItem('upwd');

                        if(t!=null && t1!=null && t2!=null){
                            $scope.utel = t1;
                            $scope.upwd = t2;
                            $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                        }
                    }
                }]

            })


            .state('appointment', {
                url:'/coach',
                template: '<coach-page></coach-page>',
                controller:['$scope','loginService2',function ($scope,loginService2) {
                    var s = localStorage.getItem('isLogin');
                    var s1 = localStorage.getItem('utel');
                    var s2 = localStorage.getItem('upwd');
                    if(s!=null && s1!=null && s2!=null){
                        $scope.utel = s1;
                        $scope.upwd = s2;
                        $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                    }else{
                        var t = sessionStorage.getItem('isLogin');
                        var t1 = sessionStorage.getItem('utel');
                        var t2 = sessionStorage.getItem('upwd');

                        if(t!=null && t1!=null && t2!=null){
                            $scope.utel = t1;
                            $scope.upwd = t2;
                            $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                        }
                    }
                }]

            })
            .state('coachDetail', {
                url:'/coachDetail/:coid',
                // params:{'coid':null},
                template: '<coach-detail-page></coach-detail-page>',
                controller:['$scope','loginService2',function ($scope,loginService2) {
                    var s = localStorage.getItem('isLogin');
                    var s1 = localStorage.getItem('utel');
                    var s2 = localStorage.getItem('upwd');
                    if(s!=null && s1!=null && s2!=null){
                        $scope.utel = s1;
                        $scope.upwd = s2;
                        $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                    }else{
                        var t = sessionStorage.getItem('isLogin');
                        var t1 = sessionStorage.getItem('utel');
                        var t2 = sessionStorage.getItem('upwd');

                        if(t!=null && t1!=null && t2!=null){
                            $scope.utel = t1;
                            $scope.upwd = t2;
                            $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                        }
                    }
                }]

            })


            .state('appoinmentCoachPart', {
                // params:{'coid':null},
                url:'/appoinmentCoachPart/:coid',
                template: '<appoinment-coach-page></appoinment-coach-page>',
                controller:['$scope','loginService2',function ($scope,loginService2) {
                    var s = localStorage.getItem('isLogin');
                    var s1 = localStorage.getItem('utel');
                    var s2 = localStorage.getItem('upwd');
                    if(s!=null && s1!=null && s2!=null){
                        $scope.utel = s1;
                        $scope.upwd = s2;
                        $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                    }else{
                        var t = sessionStorage.getItem('isLogin');
                        var t1 = sessionStorage.getItem('utel');
                        var t2 = sessionStorage.getItem('upwd');

                        if(t!=null && t1!=null && t2!=null){
                            $scope.utel = t1;
                            $scope.upwd = t2;
                            $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                        }
                    }
                }]

            })

            .state('login', {
                url:'/login',
                template: '<login-part></login-part>',

            })
            .state('regist', {
                url:'/regist',
                template: '<regist-part></regist-part>'

            })
            .state('personal', {
                url:'/personal',
                template: '<personal-page></personal-page>',
                controller: ['$state','$scope','loginService2', function ($state,$scope,loginService2) {
                    var s = localStorage.getItem('isLogin');
                    var s1 = localStorage.getItem('utel');
                    var s2 = localStorage.getItem('upwd');
                    if(s!=null && s1!=null && s2!=null){
                        $scope.utel = s1;
                        $scope.upwd = s2;
                        $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                    }else{
                        var t = sessionStorage.getItem('isLogin');
                        var t1 = sessionStorage.getItem('utel');
                        var t2 = sessionStorage.getItem('upwd');

                        if(t!=null && t1!=null && t2!=null){
                            $scope.utel = t1;
                            $scope.upwd = t2;
                            $scope.logins = loginService2.logins({utel:$scope.utel,upwd:$scope.upwd});
                        }
                    }
                    $state.go('personal.homepage');
                }]



            })

    }
    ])