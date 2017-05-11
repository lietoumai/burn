/**
 * Created by lcx on 2017/4/5.
 */
/*导航条点击展开收缩*/


flag = true;
function nav_show() {
    var s = document.querySelector('#nav-min');
    if(flag){
        s.style.display = 'block';
    }else{
        s.style.display = 'none';
    }
    flag =!flag;
}

/*banner条轮播*/
window.onload = function () {
    var index = 1;
    var inter;
    window.onload = function () {
        loopshow(index);
    }
    //表示每隔3s播放下一张图
    function loopshow(index) {
        inter = setInterval(function(){
            if(index>=3){
                index = 1;
            }else{
                index++;
            }
            changeImage(index);
        },3000);
    }



    //第一步，点击图片变化
    function changeImage(i) {
        //根据id找到轮播图
        var imgadv = document.querySelector('#imgadv');
        imgadv.src = '../upfile/img0'+i+'.jpg';

        //加边框的第二种思路(每点一次，先把所有的边框去掉，再给当前的加上边框)
        var imgs = document.querySelectorAll('[id^="img0"]');

        for(var j=0;j<imgs.length;j++){
            imgs[j].className = '';
        }
        document.querySelector('#img0'+i).className='yellowBorder';
    }
}

function change_active() {
    document.querySelector('#coach-type-1');
}


// 首页Js


