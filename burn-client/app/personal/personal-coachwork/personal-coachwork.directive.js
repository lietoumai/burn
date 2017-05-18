/**
 * Created by Yezi on 2017/4/23.
 */
angular.module('personalCoachWork')
    .directive('personalCoachWorkPart',function () {
        return {
            restrict : "ACE",
            replace:true,
            templateUrl : 'personal/personal-coachwork/personal-coachwork.template.html',
            controller: [
                '$state',
                '$rootScope',
                '$scope',
                'serverUrl',
                '$http',
                'Upload',
                function ($state,$rootScope,$scope,serverUrl,$http,Upload) {
                 //css效果
                $("#my-coach-schedule").click(function(){
                    $("#personal-coach-schedule").siblings().hide();

                    $("#personal-coach-schedule").show();
                });
                $("#my-coach-push-schedule").click(function(){
                    $("#personal-coach-push-schedule").siblings().hide();
                    $("#personal-coach-push-schedule").show();
                });

                $scope.aqq = function () {
                    alert(1);
                }

                //获取教练课程

                    $http({
                        method: 'GET',
                        url: serverUrl + 'coachs/getCoachCourse?uid='+$rootScope.uid+'',
                    }).then(function (response) {
                        console.log(response.data.result.length);
                        if(response.data.result.length>0){
                            $scope.coachCourse = response.data.result;
                        }else{
                            $('#personal-coach-schedule').html('<img src="images/null.jpg" height="500" width="900" />');
                        }
                    })



                //发布课程信息
                    $scope.ReleaseCourse = function () {
                        $scope.cdate = $('#cdate').val()
                        $scope.ctimestart = $('#ctimestart').val()
                        $scope.ctimeend = $('#ctimeend').val()
                        var coursedata={
                            cname:$scope.cname,
                            ccount:$scope.ccount,
                            cdate:$scope.cdate,
                            ctimestart:$scope.ctimestart,
                            ctimeend:$scope.ctimeend,
                            cintroduce:$scope.cintroduce,
                            coid:$scope.uid,
                        }
                        var url = serverUrl + 'courses/ReleaseCourse';  //params是model传的参数，图片上传接口的url
                        var data = angular.copy({coursedata:JSON.stringify(coursedata)} || {}); // 接口需要的额外参数，比如指定所上传的图片属于哪个用户: { UserId: 78 }
                        data.file =$scope.coursePic;
                        Upload.upload({
                            url: url,
                            data: data
                        }).success(function (data) {
                            console.log(data)
                            if(data.result==1){
                                alert('课程发布成功!')
                                $state.go('course');
                            }

                        }).error(function () {
                            console.log('error');
                        });
                    }
            }]
        }
    });