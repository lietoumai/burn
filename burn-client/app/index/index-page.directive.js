/**
 * Created by lcx on 2017/4/23.
 */
angular.module('indexBurn')
    .directive('indexPage', function () {
            return {
                restrict: "ACE",
                replace: true,
                templateUrl: 'index/index-page.template.html',
                controller: ['$scope','$http','$state','serverUrl','courseUrl', function ($scope,$http,$state,serverUrl,courseUrl) {

                    $scope.courseUrl = courseUrl;

                    $scope.css = function (obj, attr, value) {
                        if(arguments.length==2)
                        {
                            if(attr!='opacity')
                            {
                                return parseInt(obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj, false)[attr]);
                            }
                            else
                            {
                                return Math.round(100*parseFloat(obj.currentStyle?obj.currentStyle[attr]:document.defaultView.getComputedStyle(obj, false)[attr]));
                            }
                        }
                        else if(arguments.length==3)
                            switch(attr)
                            {
                                case 'width':
                                case 'height':
                                case 'paddingLeft':
                                case 'paddingTop':
                                case 'paddingRight':
                                case 'paddingBottom':
                                    value=Math.max(value,0);
                                case 'left':
                                case 'top':
                                case 'marginLeft':
                                case 'marginTop':
                                case 'marginRight':
                                case 'marginBottom':
                                    obj.style[attr]=value+'px';
                                    break;
                                case 'opacity':
                                    obj.style.filter="alpha(opacity:"+value+")";
                                    obj.style.opacity=value/100;
                                    break;
                                default:
                                    obj.style[attr]=value;
                            }

                        return function (attr_in, value_in){css(obj, attr_in, value_in)};
                    }
                    $scope.MIAOV_MOVE_TYPE={
                        BUFFER: 1,
                        FLEX: 2
                    };
                    $scope.miaovStopMove = function (obj) {
                        clearInterval(obj.timer);
                    }
                    $scope.miaovStartMove = function (obj, oTarget, iType, fnCallBack, fnDuring) {
                        $scope.fnMove=null;
                        if(obj.timer)
                        {
                            clearInterval(obj.timer);
                        }

                        switch(iType)
                        {
                            case $scope.MIAOV_MOVE_TYPE.BUFFER:
                                $scope.fnMove=$scope.miaovDoMoveBuffer;
                                break;
                            case $scope.MIAOV_MOVE_TYPE.FLEX:
                                $scope.fnMove=$scope.miaovDoMoveFlex;
                                break;
                        }

                        obj.timer=setInterval(function (){
                            $scope.fnMove(obj, oTarget, fnCallBack, fnDuring);
                        }, 30);
                    }


                    $scope.miaovDoMoveBuffer = function (obj, oTarget, fnCallBack, fnDuring) {
                        $scope.bStop=true;
                        $scope.attr='';
                        $scope.speed=0;
                        $scope.cur=0;

                        for($scope.attr in oTarget)
                        {
                            $scope.cur=$scope.css(obj, $scope.attr);
                            if(oTarget[$scope.attr]!=$scope.cur)
                            {
                                $scope.bStop=false;

                                $scope.speed=(oTarget[$scope.attr]-$scope.cur)/5;
                                $scope.speed=$scope.speed>0?Math.ceil($scope.speed):Math.floor($scope.speed);

                                $scope.css(obj, $scope.attr, $scope.cur+$scope.speed);
                            }
                        }

                        if(fnDuring)fnDuring.call(obj);

                        if($scope.bStop)
                        {
                            clearInterval(obj.timer);
                            obj.timer=null;

                            if(fnCallBack)fnCallBack.call(obj);
                        }
                    }


                    $scope.miaovDoMoveFlex = function (obj, oTarget, fnCallBack, fnDuring) {
                        $scope.bStop=true;
                        $scope.attr='';
                        $scope.speed=0;
                        $scope.cur=0;

                        for($scope.attr in oTarget)
                        {
                            if(!obj.oSpeed)obj.oSpeed={};
                            if(!obj.oSpeed[attr])obj.oSpeed[attr]=0;
                            $scope.cur=$scope.css(obj, $scope.attr);
                            if(Math.abs(oTarget[$scope.attr]-$scope.cur)>=1 || Math.abs(obj.oSpeed[$scope.attr])>=1)
                            {
                                $scope.bStop=false;

                                obj.oSpeed[$scope.attr]+=(oTarget[$scope.attr]-$scope.cur)/5;
                                obj.oSpeed[$scope.attr]*=0.7;

                                $scope.css(obj, $scope.attr, $scope.cur+obj.oSpeed[$scope.attr]);
                            }
                        }

                        if(fnDuring)fnDuring.call(obj);

                        if($scope.bStop)
                        {
                            clearInterval(obj.timer);
                            obj.timer=null;

                            if(fnCallBack)fnCallBack.call(obj);
                        }
                    }


                    
                    $(function () {

                        $http({
                            method:'GET',
                            url:serverUrl+'courses/bannerPush',
                        }).then(
                            function (response) {
                                $scope.bannerPush = response.data.result;
                            }
                        )





                        $scope.aPicLi=document.getElementById('pic_list').getElementsByTagName('li');
                        $scope.aIcoLi=document.getElementById('ico_list').getElementsByTagName('li');
                        $scope.oIcoUl=document.getElementById('ico_list').getElementsByTagName('ul')[0];
                        $scope.oDiv=document.getElementById('imgDiv');
                        $scope.i=0;
                        $scope.iNowUlLeft=0;
                        $scope.iNow=0;


                        for(i=0;i<$scope.aIcoLi.length;i++){
                            $scope.aIcoLi[i].index=i;
                            $scope.aIcoLi[i].onclick=function(){
                                if($scope.iNow==this.index){
                                    return false;
                                }
                                $scope.iNow=this.index;
                                $scope.tab();
                            }
                        }

                        $scope.tab = function () {
                            for(i=0;i<$scope.aIcoLi.length;i++){
                                $scope.aIcoLi[i].className='';
                                $scope.aPicLi[i].style.filter='alpha(opacity:0)';
                                $scope.aPicLi[i].style.opacity=0;
                                $scope.miaovStopMove($scope.aPicLi[i]);
                            }
                            $scope.aIcoLi[$scope.iNow].className='yellowBorder';
                            $scope.miaovStartMove($scope.aPicLi[$scope.iNow],{opacity:100},$scope.MIAOV_MOVE_TYPE.BUFFER);
                        }

                        $scope.oUlleft = function () {
                            $scope.oIcoUl.style.left=-$scope.aIcoLi[0].offsetWidth*$scope.iNowUlLeft+'px';
                        }

                        $scope.autoplay = function () {
                            $scope.iNow++;
                            if($scope.iNow>=$scope.aIcoLi.length){
                                $scope.iNow=0;
                            }
                            if($scope.iNow<$scope.iNowUlLeft){
                                $scope.iNowUlLeft=$scope.iNow;
                            }else if($scope.iNow>=$scope.iNowUlLeft+7){
                                $scope.iNowUlLeft=$scope.iNow-6;
                            }

                            $scope.oUlleft();
                            $scope.tab();
                        }

                        $scope.time=setInterval($scope.autoplay,3000);
                        $scope.oDiv.onmouseover=function(){
                            clearInterval(time);
                        }
                        $scope.oDiv.onmouseout=function(){
                            $scope.time=setInterval($scope.autoplay,3000);
                        }



                    })


                    //导航轮播



                    //获取博客推荐内容
                    $http({
                        method:'GET',
                        url:serverUrl+'indexPush/getBlogPush',
                    }).then(
                        function (response) {
                            $scope.blogPush=response.data.result;
                        }
                    )

                    //获取视频推荐内容
                    $http({
                        method:'GET',
                        url:serverUrl+'indexPush/getVideoPush',
                    }).then(
                        function (response) {
                            $scope.videoPush=response.data.result;
                        }
                    )


                    //查看视频详细
                    $scope.watchVideoPush = function (vid, vprice, vname, vtime, vpic) {
                        if (vprice > 0) {
                            $http({
                                method: 'Get',
                                url: serverUrl + 'video/getOrderVideo?vid=' + vid + '',
                                params: {
                                    vid: $scope.vid,
                                    uid: $scope.uid,
                                }
                            }).then(function (response) {
                                $scope.isOrderVideo = response.data.result;
                                if ($scope.isOrderVideo === 1) {
                                    $state.go('video-detail', {vid: vid});
                                } else {
                                    var data = {
                                        vid: vid,
                                        vprice: vprice,
                                        vname: vname,
                                        vtime: vtime,
                                        vpic: vpic,
                                    }
                                    $state.go('video-buy', {data: JSON.stringify(data)});
                                }
                            })

                        } else {
                            $state.go('video-detail', {vid: vid});
                        }
                    }


                    //获取课程推荐内容
                    $http({
                        method:'GET',
                        url:serverUrl+'indexPush/getCoursePush',
                    }).then(
                        function (response) {
                            $scope.coursePush=response.data.result;
                        }
                    )

                    //获取教练推荐
                    $http({
                        method:'GET',
                        url:serverUrl+'indexPush/getCoachPush',
                    }).then(
                        function (response) {
                            $scope.coachPush=response.data.result;
                        }
                    )

                    //推送博客详情页面
                    $scope.blogPushDetail=function (bid) {
                        $state.go('blog-detail',{bid:bid});
                    }

                }]
            }
        }

    );