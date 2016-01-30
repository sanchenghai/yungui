var loadNow = false;//数据加载中标志
var bodyscroll = 0;//mask消失时body恢复高度

$(function(){
	var mask = $(".mask"),
		classifyula = $("#gwd_classify>ul a"),
		gcfl = $("#gcfl"),
		gcsc = $("#gcsc"),
		gcjg = $("#gcjg"),
		wthimg = $("#wthimg"),
		gcfldiv = $("#gcfldiv"),
		gcscdiv = $("#gcscdiv"),
		gcjgdiv = $("#gcjgdiv"),
		leftul = $(".leftul"),
		rightulactive = $(".rightul.active"),
		rightul = $(".rightul"),
		gcscful = $("#gcscdiv .col-gwd-2-50:first ul"),
		gcsclul = $("#gcscdiv .col-gwd-2-50:last ul"),
		gwd_index = $("#gwd_index .container");//加载数据时的父节点;

	//筛选显示控制
	rightulactive.show();
	shaixuanControl(classifyula);

	//分类筛选效果
	gcfl.on("click", function(){
		gcfldiv.stop().slideToggle().siblings("div").hide();
		$("#gcfldiv .leftul li").on("click", function(){
			$(this).children().addClass("active").parent().siblings().children().removeClass("active");
			var thisindex = $(this).index();
			$("#gcfldiv .rightul").hide().eq(thisindex).show();
		});
	});

	//商城筛选效果
	gcsc.on("click", function(){
		gcscdiv.stop().slideToggle().siblings("div").hide();
	});
	/***
	废弃，修改HTML结构
	gcscful.on("scroll",function(){
		gcsclul.scrollTop($(this).scrollTop());
	});
	gcsclul.on("scroll",function(){
		gcscful.scrollTop($(this).scrollTop());
	});
	***/

	//价格排序效果
	gcjg.on("click", function(){
		gcjgdiv.stop().slideToggle().siblings("div").hide();
		$("#gcjgdiv .leftul li").on("click", function(){
			$(this).children().addClass("active").parent().siblings().children().removeClass("active");
			var thisindex = $(this).index();
			$("#gcjgdiv .rightul").hide().eq(thisindex).show();
		});
		var color = $(this).children().children("p").attr("class");
		var src = wthimg.attr("src");
		if(color.indexOf("red") > -1){
			var a = src.split("black");
			a = a[0] + "red" +a[1];
			wthimg.attr("src",a);
		}else{
			var b = src.split("red");
			b = b[0] + "black" +b[1];
			wthimg.attr("src",b);
		}
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

	//点击遮罩层统统消失
	mask.on("click", function(){
		gcfldiv.hide().siblings("div").hide();
		$("#gwd_classify>ul .gwd_p_big").removeClass("red");
		$("#gwd_classify>ul .heisanjiao").removeClass("heisanjiaoactive");
		$("body").css({"position":"static"});
		$(window).scrollTop(bodyscroll);
		$(this).hide();
		var color = gcjg.children().children("p").attr("class");
		var src = wthimg.attr("src");
		if(color.indexOf("red") > -1){
			var a = src.split("black");
			a = a[0] + "red" +a[1];
			wthimg.attr("src",a);
		}else{
			var b = src.split("red");
			b = b[0] + "black" +b[1];
			wthimg.attr("src",b);
		}
	});

});



//筛选显示控制
function shaixuanControl(nodes){
	var i;
	for (i = 0; i < nodes.length; i++) {
		nodes[i].onclick = function(i){
			return function(){
				var windowHeight = $(window).height(),
					body = $("body"),
					mask = $(".mask"),
					gcfl = $("#gcfl"),
					gcsc = $("#gcsc"),
					gcjg = $("#gcjg");
				var beforemaskflag = gcfl.children().children("p").attr("class") + gcsc.children().children("p").attr("class") + gcjg.children().children("p").attr("class");
				mask.css({"height" : windowHeight});
				$(this).children().children("p").toggleClass("red").end().children("div").toggleClass("heisanjiaoactive").parent().parent().parent().siblings().children().children().children("p").removeClass("red").end().children("div").removeClass("heisanjiaoactive");
				var maskflag = gcfl.children().children("p").attr("class") + gcsc.children().children("p").attr("class") + gcjg.children().children("p").attr("class");
				if(beforemaskflag.indexOf("red") == -1){
					bodyscroll = $(window).scrollTop() || $(document).scrollTop();
				}
				if(maskflag.indexOf("red") > -1){
					mask.show();
					body.css({"position":"fixed", "top":-bodyscroll});
				}else{
					mask.hide();
					body.css({"position":"static"});
					$(window).scrollTop(bodyscroll);
				}
			};
		}(i);
	}
}

//ajax加载数据
function goAjax(gwd_index){
	//@超，这是示例，AJAX你先来吧
	$.getJSON("http://open.gwdang.com/query?appkey=14ddb9671ec3a384ed28efef3e481a20&ac=quan&order=time&page=2&pagesize=10&callback=?", function(data){
		loadNow = false; //更改标志
		$("#loading").remove(); //去除说明
		gwd_index.append("<div>"+data+"</div>"); //加上数据
	});
}