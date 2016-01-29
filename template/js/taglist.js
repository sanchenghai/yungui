var loadNow = false;//数据加载中标志

$(function(){
	var goback = $("#goback"),
		formore = $("#formore"),
		threesss = $("#threesss"),
		showshare = $("#showshare"),
		gwd_share = $("#gwd_share"),
		s_bottom = $(".s_bottom"),
		mask = $(".mask"),
		gwd_index = $("#gwd_index .container");//加载数据时的父节点;

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

	//点击遮罩层，全部消失
	mask.on("click", function(){
		gwd_share.hide();
		$(this).hide();
	});
	s_bottom.on("click", function(){
		mask.click();
	});

	// 页面滑动效果
	$(window).on("scroll", function(){
		//页面滑动自动加载数据
		var windowScrollTop = $(window).scrollTop() || $(document).scrollTop(),
			windowHeight = $(window).height(),
			documentHeight = $(document).height();
		if(windowScrollTop + windowHeight > documentHeight - 100 && !loadNow){
			loadNow = true;
			gwd_index.append("<div id='loading' style='text-align:center;padding:10px;'>正在加载...</div>");
			//加载数据成功
			goAjax(gwd_index);
		}
	});
});

//ajax加载数据
function goAjax(gwd_index){
	//@超，这是示例，AJAX你先来吧
	$.getJSON("http://open.gwdang.com/query?appkey=14ddb9671ec3a384ed28efef3e481a20&ac=quan&order=time&page=2&pagesize=10&callback=?", function(data){
		loadNow = false; //更改标志
		$("#loading").remove(); //去除说明
		gwd_index.append("<div>"+data+"</div>"); //加上数据
	});
}