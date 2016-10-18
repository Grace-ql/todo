$(function(){
    //首先要渲染页面
    var todos=[];
    var arr =[];
    var weiarr=[];
    render();
    function render() {
        $('.content-box').empty();
        $.each(todos, function (i, v) {
            $('<ul class="content"><li><div class="lists"><div class="title-btn"><i class="iconfont icon-zhizhang5"></i></div><div class="sub-content">' + v.title + '<input type="text"></div><div class="chance"><i class="iconfont icon-xuanzhong"></i></div></div><div class="items"><div class="item"><i class="iconfont-one icon-clock"></i></div><div class="item"><i class="iconfont-one icon-tianjia"></i></div><div class="item"><i class="iconfont-one icon-shanchu1"></i></div><div class="item"><i class="iconfont-two icon-shezhi"></i></div></div></li></ul>').appendTo('.content-box');
            $('.lists').eq(i).addClass(function () {
                if (v.state === 1) {
                    return 'done';
                }
            })
        })
    }
    function rendernow() {
        $('.content-box').empty();
        // console.log(arr)
        $.each(arr,function (i,v) {
            $('<ul class="content"><li><div class="lists"><div class="title-btn"><i class="iconfont icon-zhizhang5"></i></div><div class="sub-content">'+v.title+'<input type="text"></div><div class="chance"><i class="iconfont icon-xuanzhong"></i></div></div><div class="items"><div class="item"><i class="iconfont-one icon-clock"></i></div><div class="item"><i class="iconfont-one icon-tianjia"></i></div><div class="item"><i class="iconfont-one icon-shanchu1"></i></div><div class="item"><i class="iconfont-two icon-shezhi"></i></div></div></li></ul>').appendTo('.content-box');
            $('.lists').eq(i).addClass(function(){
                if(v.state===1){
                    return 'done';
                }
            })
        })
    }
    function renderwei() {
        $('.content-box').empty();
        // console.log(arr)
        $.each(weiarr,function (i,v) {

            $('<ul class="content"><li><div class="lists"><div class="title-btn"><i class="iconfont icon-zhizhang5"></i></div><div class="sub-content">'+v.title+'<input type="text"></div><div class="chance"><i class="iconfont icon-xuanzhong"></i></div></div><div class="items"><div class="item"><i class="iconfont-one icon-clock"></i></div><div class="item"><i class="iconfont-one icon-tianjia"></i></div><div class="item"><i class="iconfont-one icon-shanchu1"></i></div><div class="item"><i class="iconfont-two icon-shezhi"></i></div></div></li></ul>').appendTo('.content-box');

        })
    }
    //给input添加点击事件
    $('.content-box').on('click','.sub-content',function () {
        $(this).find('input').css('display','block');
        var v=$(this).text();
        $(this).find('input').val(v);
        $(this).find('input').focus();
        $(this).find('input').val('');
        $('.sub-content input').blur(function (){
            var newval=$(this).val();
            $('.sub-content').text=newval;
            var xiabiao=$(this).parent().parent().parent().parent().index();
            $(this).css('display','none');
            todos[xiabiao].title=newval;
            localStorage.todo_data=JSON.stringify(todos);
            render();
        })
    })
    //给todos添加数据
    function addtodos(){
        todos.push({title:'abc',state:0,isdel:0,});
        localStorage.todo_data=JSON.stringify(todos);
        render();
    }
    //滑动
    var left=null;
    $('.content-box').on('touchstart','.content',function(e){
        left=e.originalEvent.changedTouches[0].pageX;
    })
    $('.content-box').on('touchend','.content',function(e){
        var n=e.originalEvent.changedTouches[0].pageX;
        if((n>left)&&(n-left)>40){
            $(this).find('.lists').addClass('done');
            $(this).find('.icon-xuanzhong').css('display','block');
            todos[$(this).index()].state=1;
            // todos[$(this).index()].isdel=0;
            console.log(todos)
            localStorage.todo_data=JSON.stringify(todos);
            // render();
        }
    })
    //拖拽
    $('.content-box').on('touchmove','.content',function(e){
        var n=e.originalEvent.changedTouches[0].pageX;
        var x=n-left;
        $(this).css('transition','transform .8s ease')
        $(this).css('transform','translate3d('+x+'px,0,0)');


    })
    $('.content-box').on('touchend','.content',function(e){
        var n=e.originalEvent.changedTouches[0].pageX;
        $(this).css('transition','transform .8s ease')
        $(this).css('transform','translate3d(0,0,0)');
        $(this).delay(800).queue(function(){
            $(this).css('transition','none').dequeue();
        })
    })
    //删除todos数据'
    $('.content-box').on('click','.icon-shanchu1',function(){
       var i=$(this).closest('.content').index();
        $(this).parent().parent().parent().parent().addClass('feichu').delay(1000).queue(function() {
            todos.splice(i,1);
            localStorage.todo_data=JSON.stringify(todos);
            render();
            $(this).remove().dequeue();
        })
    })

    $('.banner  .search').on('click','input',function(){
        addtodos();
        $(this).val('');
        // $('.alert').addClass('yincang');
        $(this).find('input').focus();
        $(this).val=$('.alert').text;
        $(this).blur(function (){
                var newval=$(this).val();
                $('.sub-content').text=newval;
                todos[todos.length-1].title=newval;
                localStorage.todo_data=JSON.stringify(todos);
                render();
                $('alert').removeClass('.yincang');
        })
    })
    //点击页面调用renger()
    $('.items').on('touchstart','.icon-tianjia2',function () {
        addtodos();
    })
    if(localStorage.todo_data){
        var todos=JSON.parse(localStorage.todo_data);
        render();
    }else{
        localStorage.todo_data=JSON.stringify(todos);
    }
    $('.bianqian-title .span-two').text('[' +todos.length+']')
    var flag=true;
        $('.more .add').on('click',function(){
            if(flag){
            $('.content-box').css('height','auto');
            $('.content-box').find('.content').css('margin-bottom','0.1rem');

        flag=false;
    }else{
        $('.content-box').css('height','0.97rem');
        flag=true;
    }
   })
    // $('.fanhui').on('click',function(){
    //     alert(1)
    //
    // })
    $('.more .shuju').text('[' +(todos.length-2)+']')
    // if($('.bianqian-title .span-two').text('[' +0+']')){
    //     $('.more .shuju').text('[' +0+']');
    // };
    /////////已完成//////////////
    $.each(todos,function(i,v){
        if(v.state==1) {
            arr.push(v);
        }else if(v.state==0){
            weiarr.push(v);
        }
    })
    $('.icon-clock').on('click',function(){
        $('.alert').addClass('yincang')
    })
    $('.alert .que').on('click',function(){
        $('.alert').removeClass('yincang').toggleClass('huashang');
    })
    $('.icon-duihao1').on('click',function () {
        $('.bianqian-box').addClass('huashang').delay(100).queue(function(){
            $(this).remove().dequeue();
        });
        $('.now').addClass('zuochu');
        rendernow();
        $('.now .lists').addClass('done');

        $('.more .finish').text('[' +(arr.length)+']');
        $('.finish-xianshi').text('[' +(arr.length)+']');
        $('.content-box').find('.content').css('margin-bottom','0.1rem');

    })
    if(weiarr.length===0){
        $('.icon-xinxi').find('.yuan').css('display','none');
    }
    $('.icon-gengduo').on('click',function(){
        $('.left').addClass('zuochu').removeClass('zuohui');
    })
    $('.icon-tuichu').on('click',function(){
        $('.left').removeClass('zuochu').addClass('zuohui');
    })
    $('.icon-guidang').on('click',function(){
        $('.bianqian-box').addClass('huashang').delay(100).queue(function(){
            $(this).remove().dequeue();
        });
        $('.now').addClass('zuochu');
        rendernow();
        $('.now .lists').addClass('done');
        $('.more .finish').text('[' +(arr.length)+']');
        $('.finish-xianshi').text('[' +(arr.length)+']');
        $('.content-box').find('.content').css('margin-bottom','0.1rem');
    })
    ////////////////////////header 标签/////////////////////////////
    $('.b').on('click',function(){
        $('.bianqian-box .bianqian').addClass('zuochu')
        
    })
    ////////////////header 已完成///////////////////
    $('.n').on('click',function(){
        $('.wei').removeClass('zuochu');
        $('.now').toggleClass('zuochu');
        $('.bianqian-box .bianqian').removeClass('zuochu');
        rendernow();
        $('.now .lists').addClass('done');
        $('.more .finish').text('[' +(arr.length)+']');
        $('.finish-xianshi').text('[' +(arr.length)+']');
        $('.content-box').find('.content').css('margin-bottom','0.1rem');
    })
    //////////////////header 未完成/////////////////////////////
    $('.icon-xinxi').on('click',function (){
        $('.now').removeClass('zuochu');
        $('.bianqian-box .bianqian').removeClass('zuochu');
        $('.wei').toggleClass('zuochu');
        $('.bianqian-box .bianqian').removeClass('zuochu')
        renderwei();
        $('.more .finish').text('[' +(weiarr.length)+']');
        $('.finish-xianshi').text('[' +(weiarr.length)+']');
        $('.content-box').find('.content').css('margin-bottom','0.1rem');
    })
    $('.icon-fanhui-copy').on('click',function(){
        $('.left').removeClass('zuochu').addClass('zuohui');
    })
    //////////////////////个人//////////////////////
    $('.icon-geren').on('click',function(){
        $('.geren').addClass('yincang');
        render();
        $('.bianqian-box').remove();
    })
    $('.geren .name').on('click','input',function(){
        addtodos();
        var v=$(this).val();
        // var g=$('.gongsi').find('input').val()
        $(this).val('');
        $(this).focus();
        $(this).blur(function (){
            var newval=$(this).val();
            $('.sub-content').text=newval;
            todos[todos.length-1].title=newval;
            localStorage.todo_data=JSON.stringify(todos);
            render();
        })
    })
    // $('.geren .gongsisi').on('click','input',function(){
    //     addtodos();
    //     var v=$(this).val();
    //     // var g=$('.gongsi').find('input').val()
    //     $(this).val('');
    //     $(this).focus();
    //     $(this).blur(function (){
    //         var newval=$(this).val();
    //         $('.sub-content').text=newval;
    //         todos[todos.length-1].title=newval;
    //         localStorage.todo_data=JSON.stringify(todos);
    //         render();
    //     })
    // })
})