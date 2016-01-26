$(function(){
	var gwd_gotopIsShow = false,//回到顶部显示标志
		gwd_gotop = $(".gwd_gotop");//回顶部图标

	//点击回顶部
	gwd_gotop.on("click", function(){
		$(window).scrollTop(0);
	});

	//显示控制
	$(window).on("scroll", function(){
		var windowScrollTop = $(window).scrollTop() || $(document).scrollTop(),
			windowHeight = $(window).height();
		if(!gwd_gotopIsShow && windowScrollTop >= windowHeight){
			gwd_gotop.show();
			gwd_gotop.animate({bottom : "40px"}, "slow");
			gwd_gotopIsShow = true;
		}else if(windowScrollTop < windowHeight && gwd_gotopIsShow){
			gwd_gotop.hide();
			gwd_gotop.css("bottom","0px");
			gwd_gotopIsShow = false;
		}
	});
});