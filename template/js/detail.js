$(function(){
	var goback = $("#goback"),
		formore = $("#formore"),
		threesss = $("#threesss"),
		showshare = $("#showshare"),
		gwd_copyhint = $("#gwd_copyhint"),
		gwd_share = $("#gwd_share"),
		s_bottom = $(".s_bottom"),
		inma = $(".inma"),
		clipsource = $("#clipsource"),
		clipbutton = $("#clipbutton"),
		mask = $(".mask");clipsource

	//头部返回上一页
	goback.on("click", function(){
		window.history.back();
	});

	//头部菜单显示控制
	formore.on("click", function(){
		threesss.toggle();
	});

	//分享显示控制
	showshare.on("click", function(){
		threesss.hide();
		var windowHeight = $(window).height();
		mask.css({"height" : windowHeight}).show();
		gwd_share.show();
	});

	//需用码提示控制
	var zeroclip = new ZeroClipboard(clipbutton[0]);
	if(zeroclip){
		inma.on("click", function(){
			var windowHeight = $(window).height();
			mask.css({"height" : windowHeight}).show();
			gwd_copyhint.css({"top":windowHeight/3}).show();
		});
	}

	//点击遮罩层，全部消失
	mask.on("click", function(){
		gwd_copyhint.hide();
		gwd_share.hide();
		$(this).hide();
	});
	s_bottom.on("click", function(){
		mask.click();
	});
});