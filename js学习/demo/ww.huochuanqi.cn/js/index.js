$(document).ready(function() {
	$.fn.mainmenu(".menu")
	
	$('#newsTab').Tab({
		lilab: "li",
		labselect: ".change",
		Tabname: ".Tab_nr",
		labaction: "click",
		animatename: "scroll_x",
		animateTime: 600,
		mode: "none"
	})
	$('#PhotoShowTab').Tab({
		lilab: "li",
		labselect: ".change",
		Tabname: ".Tab_nr",
		labaction: "click",
		animatename: "scroll_x",
		animateTime: 600,
		mode: "none"
	})
	$('#DocTab').Tab({
		lilab: "li",
		labselect: ".change",
		Tabname: ".Tab_nr",
		labaction: "click",
		animatename: "scroll_x",
		animateTime: 600,
		mode: "none"
	})
	$(".Tab").Tab_()
	
	if($("#guaiwu").length > 0) {
		var gw_h = $("#guaiwu").outerHeight(true)
		$("#Game_zl").css({
			"margin-bottom": gw_h + 2
		})

		$("#guaiwu ul li").bind('mouseenter', function() {
			var liobj = $(this)
			var self = liobj.find(".pic");
			var self2 = liobj.find(".pic2");

			time_delay = setTimeout(function() {
				if(!self2.is(":animated")) {
					liobj.addClass("star_animate");
					//var self_a=self.find("a");

					var easing = {
						duration: 700,
						easing: 'easeInOutCirc'
					};
					self2.css("opacity", 1).stop(true, false).animate({
						"opacity": 0,
						"height": "260px",
						"bottom": "-60px",
						"right": "-10px"
					}, 900, function() {
						self2.css({
							"bottom": 0,
							"opacity": 1,
							"height": "220px",
							"right": "10px",
							"bottom":"0px"
						})
					});
					//	self_a.stop(true,false).animate({"margin-top":"10px"}, 800);
					//self_img.stop(true,false).animate({"bottom":"10px","right":"-50px"}, 700);
				}

			}, 100)

		})

	}
	
	$("#ZhiYe").ZhiYe()
	$(".PhotoList li").GameHover("#fff", 3, 0, 1);
	$(".PicList li").GameHover("#fff", 3, 0, 1);
	
})


$(function(){
	var numB=0;
	var BlengthImg=$(".banner").length;
//按钮添加
	for(var i=0;i<BlengthImg;i++){
		$(".btn_li ul").append("<li></li>");
	}
	$(".btn_li ul li").first().addClass("current");
//内容页面切换	
	$(".content_doc .p").css("display","none");
	$(".content_doc .p").first().css("display","block");
	$(".content_text>ul li a").mouseenter(function(){
		var numLi=$(this).parent("li").index();
		$(".content_text>ul li").removeClass("current");
		$(this).parent("li").addClass("current");
		$(".content_doc .p").css("display","none");
		$(".content_doc .p").eq(numLi).css("display","block");
	})
//banner图片自动切换
	$(".banner").css("display","none");
	$(".banner").first().css("display","block");
	function fadeInner(){
		if(numB<BlengthImg-1){
			numB=numB+1;
		}else{
			numB=0;
		}
		$(".btn_li ul li").removeClass("current");
		$(".btn_li ul li").eq(numB).addClass("current");
		$(".banner").css("display","none");
		$(".banner").eq(numB).fadeIn(300);
	}
	var startBanner=setInterval(fadeInner,5000);
/*小按钮点击切换*/
	$(".btn_li ul li").mouseenter(function(){
		clearInterval(startBanner);
	}).mouseleave(function(){
		startBanner=setInterval(fadeInner,5000);
	})
	$(".btn_li ul li").click(function(){
		var x=$(this).index();
		$(".btn_li ul li").removeClass("current");
		$(this).addClass("current");
		$(".banner").css("display","none");
		$(".banner").eq(x).fadeIn(300);
		num=x;
	})
	
	$(".games").bind('mouseenter',function(){
					var self=$(this)
					time_delay=setTimeout(function(){
								if(!self.is(":animated"))
								{
									self.addClass("hover_games");
									var img=self.find("#img")
									//var self_em=self.find("em");
									var easing={ duration:1300,easing:'easeOutElastic' };
									var easing2={ duration:1600,easing:'easeOutSine' };
								img.stop(true,false).animate({"margin-left":"-10%","margin-top":"-10%","width":"120%","height":"120%" }, easing2);
								
								}
						
					},100)
				
			}).bind('mouseleave',function(){
				    clearTimeout(time_delay)	
							var self=$(this)
							if (self.is(".hover_games"))
							{		
									self.removeClass("hover_games");
									var img=self.find("#img")
									var easing={ duration:500,easing:'easeInOutCirc' };
									var easing2={ duration:600,easing:'easeInOutCirc' };
									img.stop(true,false).animate({"margin-left":"0","margin-top":"0","width":"100%","height":"100%"},easing2);
							}
			})		
})
// JavaScript Document

$(function(){
	var num=0;
	var heightImg=0;
	$(".activity_area .imgs").css("display","none");
	$(".activity_area .imgs").first().css("display","block");
	var lengthImg=$(".activity_area .imgs").length;
	var GlengthImg=$(".game_img img").length;
	var lengthLi=$(".content_text>ul li").length;
	var Hlength=0;
	var deg=0;

//游戏图片按钮切换
	$(".activity a").css({"position":"absolute","top":"50%","margin-top":"-32"})
	$(".activity a").mouseenter(function(){
		clearInterval(startToggle);
	}).mouseleave(function(){
		startToggle=setInterval(fadeIn,6000);
	})
	$("#right").click(function(){
		if(num<lengthImg-1){
			num=num+1;
		}else{
			num=0;
		}
		heightImg=$(".activity_area .imgs").eq(num).height();
		$(".activity_area").height(heightImg+80);
		$(".activity_area .imgs").css("display","none");
		$(".activity_area .imgs").eq(num).fadeIn(300);
	})
	$("#left").click(function(){
		if(num>0){
			num=num-1;
		}else{		
			num=lengthImg-1;
		}
		heightImg=$(".activity_area .imgs").eq(num).height();
		$(".activity_area").height(heightImg+80);
		$(".activity_area .imgs").css("display","none");
		$(".activity_area .imgs").eq(num).fadeIn(300);
	})

})

//职业切换
$.fn.ZhiYe = function() {
	var obj = $(this)
	if(obj.length == 0) return false;

	var navobj = obj.find(".ZhiYe_Nav")
	var boxobj = obj.find(".ZhiYe_nr")
	if(navobj.find("li.change").length == 0) {
		navobj.find("li:first").addClass("change");
		var index = $(this).index();
	}

	//点击职业视频
	obj.find(".btn_videoplay_").bind("click", function() {
		var url = $(this).attr("data-videourl")
		show(url, 850, 600)
	})

	obj.find(".ZhiYe_nr:eq(" + navobj.find("li.change").index() + ")").fadeIn()

	navobj.find("li").bind("click", function() {

		//已加载的
		var index2 = $(this).siblings(".change").index()
		var obj002 = obj.find(".ZhiYe_nr:eq(" + index2 + ")")
		var objleft2 = obj002.find(".zhiyebox")
		var objright2 = obj002.find(".zhiyePic")

		//等待加载的
		$(this).addClass("change").siblings().removeClass("change");
		var index = $(this).index();
		var obj001 = obj.find(".ZhiYe_nr:eq(" + index + ")")
		var objleft = obj001.find(".zhiyebox")
		var objright = obj001.find(".zhiyePic")

		var outplay = [
			function() {
				objleft2.animate({
					"opacity": "0",
					"left": "-242px"
				}, 100, plays)
			},
			function() {
				objright2.animate({
					"opacity": "0",
					"right": "-125px"
				}, 100, plays)
			},
			function() {
				obj002.css("display", "none")
				obj001.css("display", "block")
				plays();
			},
			function() {
				objleft.css({
					"left": "-242px",
					"opacity": 0
				}).stop().animate({
					"opacity": 1,
					"left": "36px"
				}, {
					duration: 300,
					easing: 'easeInOutCirc'
				}, plays())
			},
			function() {
				objright.css({
					"right": "-125px",
					"opacity": 0
				}).stop().animate({
					"opacity": 1,
					"right": "0px"
				}, {
					duration: 300,
					easing: 'easeInOutCirc'
				}, plays())
			}

		]

		obj.queue("playlist01", outplay)
		var plays = function() {
			obj.dequeue("playlist01")
		}
		plays()

	})

}

//选项卡切换
$.fn.Tab = function(config) {
	var self = $(this);
	var select_ = 0;
	var classname = config.labselect.replace(".", "")
	if(self.length == 0) return false;
	if(self.find(config.lilab).length == 0) return false;

	self.each(function(index, element) {

		self = $(this);

		if(self.find(config.labselect).length == 0) {
			self.find(config.lilab + ":eq(0)").addClass(config.labselect);
		}
		self.find(config.lilab).each(function(index, element) {
			if(!$(this).is(config.labselect)) {
				self.siblings(config.Tabname + ":eq(" + index + ")").hide();
			}
		});

		self.find(config.lilab).bind(config.labaction + ".action", function() {
			if($(this).is(config.labselect)) return false;
			var index2 = $(this).siblings(config.labselect).index()
			$(this).addClass(classname).siblings().removeClass(classname);
			var index = $(this).index();
			config.animate(index, index2, config.animatename)
			return config.labaction == "click" ? false : true;
		})

		config.animate = function(index, index2, active) {

			switch(active) {
				case "fade":
					self.siblings(config.Tabname + ":visible").hide();
					self.siblings(config.Tabname + ":eq(" + index + ")").fadeIn(config.animateTime);
					break;
				case "scroll_x":
					self.parent().css({
						"position": "relative",
						"overflow": "hidden"
					});
					var selfs = self.siblings(config.Tabname + ":visible")
					var dr = "100%",
						dr2 = "100%"
					if(index2 > index) {
						dr = "100%";
						dr2 = "-100%"
					} else {
						dr = "-100%";
						dr2 = "100%"
					}
					var top = selfs.position().top

					if(config.mode == "delay") {
						//当前渐隐
						selfs
							.css({
								"position": "relative",
								"width": $(selfs).outerWidth()
							})
							.stop(true, false)
							.animate({
									"left": dr,
									"opacity": 0
								}, config.animateTime,
								function() {
									$(this).css({
										"position": "static",
										"left": "auto",
										"opacity": 1,
										"display": "none"
									})
								}
							)
						setTimeout(function() {
							self.siblings(config.Tabname + ":eq(" + index + ")").css({
									"position": "relative",
									"left": dr2,
									"display": "block",
									"opacity": 0
								})
								.stop(true, false)
								.animate({
									"left": 0,
									"opacity": 1
								}, config.animateTime, function() {
									$(this).css({
										"top": 0,
										"position": "static"
									})

								})
						}, config.animateTime)

					} else {

						selfs
							.css({
								"position": "absolute",
								"width": $(selfs).outerWidth(),
								"left": selfs.position().left,
								"top": selfs.position().top
							})
							.stop(true, false)
							.animate({
									"left": dr,
									"opacity": 0
								}, config.animateTime,
								function() {
									$(this).css({
										"position": "relative",
										"top": "auto",
										"left": "auto",
										"opacity": 1,
										"display": "none"
									})
								}
							)

						self.siblings(config.Tabname + ":eq(" + index + ")").css({
								"position": "relative",
								"left": dr2,
								"display": "block",
								"opacity": 0
							})
							.stop(true, false)
							.animate({
								"left": 0,
								"opacity": 1
							}, config.animateTime, function() {
								$(this).css({
									"top": 0,
									"position": "relative"
								})

							})
					}
					break;
				case "none":
					self.siblings(config.Tabname + ":visible").hide();
					self.siblings(config.Tabname + ":eq(" + index + ")").show();
					break;

			}

		}

	});

}

//悬停效果
$.fn.GameHover = function(bordercolors, width, margin, jiaocuo) {
	var time_delay = null;
	var self = $(this)
	if(self.length == 0) return false;

	var writehtml = "<span class='line_top'></span><span class='line_right'></span><span class='line_bom'></span><span class='line_left'></span>"
	self.each(function(index, element) {
		$(this).append(writehtml)
		var line_top = $(this).find(".line_top");
		var line_right = $(this).find(".line_right");
		var line_bom = $(this).find(".line_bom");
		var line_left = $(this).find(".line_left");
		var bordercolor = bordercolors
		if(jiaocuo == 1) {
			jiaocuo = margin;
		} else {
			jiaocuo = 0;
		}
		line_top.css({
			"position": "absolute",
			"left": jiaocuo,
			"top": margin,
			"height": width + "px",
			width: 0,
			"overflow": "hidden",
			"line-height": 0,
			"font-size": 0,
			"background": bordercolor
		});
		line_right.css({
			"position": "absolute",
			"right": margin,
			"top": jiaocuo,
			"width": width + "px",
			height: 0,
			"overflow": "hidden",
			"line-height": 0,
			"font-size": 0,
			"background": bordercolor
		});
		line_bom.css({
			"position": "absolute",
			"right": jiaocuo,
			"bottom": margin,
			"height": width + "px",
			width: 0,
			"overflow": "hidden",
			"line-height": 0,
			"font-size": 0,
			"background": bordercolor
		});
		line_left.css({
			"position": "absolute",
			"left": margin,
			"bottom": jiaocuo,
			"width": width + "px",
			height: 0,
			"overflow": "hidden",
			"line-height": 0,
			"font-size": 0,
			"background": bordercolor
		});
	});

	var line_top, line_right, line_bom, line_left, txt_right;
	self.bind('mouseenter', function() {
		var selfs = $(this);
		line_top = selfs.find(".line_top");
		line_right = selfs.find(".line_right");
		line_bom = selfs.find(".line_bom");
		line_left = selfs.find(".line_left");
		txt_right = selfs.find(".txt_right")
		var img = selfs.find(".photo img")

		time_delay = setTimeout(function() {
			if(!selfs.is(":animated")) {

				selfs.addClass("star_animate");
				var easing = {
					duration: 500,
					easing: 'easeInOutCirc'
				};
				line_top.stop(true, false).animate({
					"width": "100%"
				}, easing);
				line_bom.stop(true, false).animate({
					"width": "100%"
				}, easing);
				line_right.stop(true, false).animate({
					"height": "100%"
				}, easing);
				line_left.stop(true, false).animate({
					"height": "100%"
				}, easing);
				txt_right.stop(true, false).animate({
					"left": "250"
				}, 500);
				img.stop(true, false).animate({
					"opacity": 0.6,
					"margin-left": "-10%",
					"margin-top": "-10%",
					"width": "120%",
					"height": "120%"
				}, 600);

			}

		}, 100)

	}).bind('mouseleave', function() {
		clearTimeout(time_delay)
		var selfs = $(this);
		var img = selfs.find(".photo img")
		if(selfs.is(".star_animate")) {
			selfs.removeClass("star_animate");

			var easing = {
				duration: 800,
				easing: 'easeInOutCirc'
			};
			line_top.stop(true, false).animate({
				"width": "0%"
			}, easing);
			line_bom.stop(true, false).animate({
				"width": "0%"
			}, easing);
			line_right.stop(true, false).animate({
				"height": "0%"
			}, easing);
			line_left.stop(true, false).animate({
				"height": "0%"
			}, easing);
			txt_right.stop(true, false).animate({
				"left": "10"
			}, 500);
			img.stop(true, false).animate({
				"opacity": 1,
				"margin-left": "0",
				"margin-top": "0",
				"width": "100%",
				"height": "100%"
			}, 400);

		}
	})

}

//选项卡滑动
$.fn.Tab_ = function() {
	var obj = $(this)
	if(obj.length == 0) return false;
	var times = 300
	obj.each(function(index, element) {
		var tab_obj = $(this)
		var li = tab_obj.find("li.change");

		tab_obj.find("li:last-child").after("<span class='lines'></span>")
		if(li.length > 0) {
			obj.css("position", "relative");
			var width = li.outerWidth();
			var lineobj = tab_obj.find(".lines")
			lineobj.css("width", width);

			tab_obj.find("li").bind("mouseenter", function() {
				var left = $(this).position().left
				lineobj.stop(true, false).animate({
					"left": left
				}, times)
			}).bind("mouseleave", function() {
				if(!$(this).is(".change")) {
					var left = $(this).siblings(".change").css("position", "static").position().left;
					lineobj.stop(true, false).animate({
						"left": left
					}, times)
				}

			})
		}
	});
}



//主菜单
$.fn.mainmenu = function(config) {
	var obj = $(config)
	if(obj.length == 0) return false;

	var submenu = $(".header .submenu")

	obj.find("ul").bind("mouseenter", function() {
		submenu.css({
			"opacity": 0
		}).stop(true, false).animate({
			"opacity": 1,
			"top": 0
		}, 500)
		obj.find("ol").stop(true, false).slideDown(100)
	})
	obj.find("ul>li").bind("mouseenter", function() {
		$(this).addClass("change").siblings().removeClass("change");
	})

	submenu.find("ul").bind("mouseenter", function() {
		var index = $(this).index() + 1
		obj.find("ul>li:eq(" + index + ")").addClass("change").siblings().removeClass("change");

	})
	$(".header").bind("mouseleave", function() {
		submenu.stop(true, false).animate({
			"opacity": 0,
			"top": "-370px"
		}, 500, function() {})
		obj.find("ol").stop(true, false).slideUp(100)
		obj.find("li.change").removeClass("change");
	})
}