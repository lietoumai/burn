/**
 * Created by Yezi on 2017/4/23.
 */
angular.module('personalCoach')
    .directive('personalCoachPart', function () {
        return {
            restrict: "ACE",
            replace: true,
            templateUrl: 'personal/personal-coach/personal-coach.template.html',
            controller: ['$scope','addDiv','deleteDiv','showCoachKindService','Upload','serverUrl','$state', function ($scope,addDiv,deleteDiv,showCoachKindService,Upload,serverUrl,$state) {
                showCoachKindService.showkindtype();

              /*  addDiv.addDiv();
                $scope.addDiv = function () {
                    addDiv.addDiv();
                }
                $scope.deleteDiv = function () {
                    deleteDiv.deleteDiv();
                }*/

                var moreThree = $('.jobtype');
                maxNum = 3;
                cotag = '';
                
                $scope.subjob = function (k) {
                    if($("input[type='checkbox']:checked").length>3){
                        alert('最多选择三个');
                        cotag='';
                    }
                    if($("input[type='checkbox']:checked").length<1){
                        alert('至少选择一个');
                        cotag='';
                    }
                    if($("input[type='checkbox']:checked").length>0 && $("input[type='checkbox']:checked").length<4){
                        cotag = cotag+k+',';
                    }
                }


                $scope.becomeCoach1 = function () {

                    var starttime = $scope.starttime.toLocaleDateString();
                    var endtime = $scope.endtime.toLocaleDateString();


                    var coachdata={
                        jobtype:$scope.jobtype,
                        cotag:cotag,
                        starttime:starttime,
                        endtime:endtime,
                        coid:$scope.uid,
                        mainjob:$scope.mainjob,
                    }
                    var url = serverUrl + 'coachs/becomeCoach';  //params是model传的参数，图片上传接口的url
                    var data = angular.copy({coachdata:JSON.stringify(coachdata)} || {}); // 接口需要的额外参数，比如指定所上传的图片属于哪个用户: { UserId: 78 }
                    data.file =$scope.coachPhoto;
                    Upload.upload({
                        url: url,
                        data: data
                    }).success(function (data) {
                        console.log(data)
                        if(data.result==1){
                            alert('恭喜您成为教练!')
                            $state.go('personal');
                        }

                    }).error(function () {
                        console.log('error');
                    });
                }
            }]
        }
    })