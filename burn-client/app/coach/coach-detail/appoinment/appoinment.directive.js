/**
 * Created by lcx on 2017/5/3.
 */
angular.module('appoinmentCoachPart')
    .directive('appoinmentCoachPage',function () {
        return {
            restrict : "ACE",
            replace:true,
            templateUrl :'coach/coach-detail/appoinment/appoinment.template.html',
            controller:['$scope',
                '$rootScope',
                'showCoachDetailService',
                'alreadyAppoService',
                '$stateParams',
                'appointCoachService',
                'IconUrl',
                '$state',
                '$location',
                function ($scope,$rootScope,showCoachDetailService,alreadyAppoService,$stateParams,appointCoachService,IconUrl,$state,$location) {
                $scope.IconUrl = IconUrl;
                $scope.now = new Date().getTime()+1000*60*60*24;   //获取明天日期


                //展示教练信息
                showCoachDetailService.showcoachDetail({coid:$stateParams.coid});

                //取数据裤检查教练什么时段被预约
                alreadyAppoService.getappointInfo1({coid:$stateParams.coid});

                //获取选择的时间段
                $scope.chuan = function (k) {
                    $scope.k = k;
                }
                //提交预约时间

                        $scope.appoinment = function () {
                            var s = localStorage.getItem('isLogin');
                            var s1 = sessionStorage.getItem('isLogin');
                            if(s||s1){
                            appointCoachService.appointCoach({uid:$rootScope.uid,coid:$stateParams.coid,appointtime:$scope.k})
                            }else{
                                var s = $location.absUrl();
                                sessionStorage.setItem('url',s);
                                $state.go('login');
                                alert('请先登录')
                            }
                        }


            }]


        }
    });