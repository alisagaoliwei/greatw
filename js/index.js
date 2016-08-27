$(function() {

	var arr = ["426.218", "437.190", "458.169", "490.151", "518.140", "548.132", "585.141", "614.152", "645.171", "665.202", "666.236", "667.269", "646.300", "637.329", "616.356", "592.384", "565.417", "536.444", "509.468", "482.490", "457.518", "428.543", "401.517", "376.491", "344.466", "320.440", "285.411", "259.384", "236.351", "215.323", "195.293", "187.261", "184.228", "193.189", "214.160", "244.141", "274.129", "307.126", "332.134", "365.145", "392.165", "416.190"];
	var lastTime = 0;
	var delay = 1000; //设置星星消失的延迟,数值越大消失的越慢
	var interval = 50; //生成星星的间隔时间(ms)
	var start = 0; //ctrl键按下时的时间
	var end = 0; //ctrl键弹起时的时间
	var newArray = [];

	Tips(3000);

	//闪烁的心
	var flashInterval = 66;
	setInterval(function() {
		drawHeart(arr);
	}, flashInterval); //66

	//获取数组中的值,并传给setHeart来设置left与top;
	var index = 0;

	function drawHeart(arr) {
		if (index < arr.length) {
			var newArr = arr[index].split(".");
			var interval = arr.length * 35
			setHeart($("#heart"), interval, newArr[0], newArr[1]);
			index++;
		} else {
			index = 0;
		}
		//清除选择
		window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
	}

	//创建星星,并根据数组来设置星星的位置
	function setHeart(element, interval, left, top) {
		var $img = $('<img src="images/sparkling.png" />');
		$img.css({
			"opacity": 0,
			"position": "absolute",
			"left": left + "px",
			"top": top + "px"
		})
		element.append($img);
		$img.animate({
			"opacity": 1
		}, interval, function() {
			$img.animate({
				"opacity": 0
			}, interval, function() {
				$img.remove();
			})

		});
	}
	$(document).keydown(function(event) {
		if (event.which == 219 && interval > 10) {
			interval -= 10;
		} else if (event.which == 221 && interval < 200) {
			interval += 10;
		}
		if (event.which == 189 && delay > 10) {
			delay -= 10;
		} else if (event.which == 187 && delay < 2000) {
			delay += 10;
		} else if (event.which == 17 && !start) { //当ctrl键按下时,记录时间
			var d = new Date();
			start = d.getTime();
		}
		Tips(1000);
	});

	$(document).keyup(function(event) {
		if (event.which == 17) {
			var d = new Date();
			end = d.getTime();
			flashInterval = (end - start); //计算ctrl从按下到弹起经过的时间
			arr = newArray; //将按下ctrl时移动鼠标的轨迹坐标构成的数组newArray传给arr,并清空newArray
			newArray = [];
		}

	});

	$(document).mousemove(function(event) {
		if (!(event.shiftKey || event.ctrlKey)) {
			return;
		}
		var d = new Date();
		if (!lastTime) {
			lastTime = d.getTime();
		}
		var nowTime = d.getTime();
		if (nowTime - lastTime > interval) {
			lastTime = 0;
			if (event.ctrlKey) {
				var zb = event.pageX + "." + event.pageY;
				newArray.push(zb);
			}
			var $img1 = $('<img src="images/sparkling.png" />');
			$img1.css({
				"opacity": 0,
				"position": "absolute",
				"left": event.pageX + "px",
				"top": event.pageY + "px"
			})
			$("#box").append($img1);
			$img1.animate({
				"opacity": 1
			}, delay, function() {
				$img1.animate({
					"opacity": 0
				}, delay, function() {
					$img1.remove();
				})

			});
		}
	});
	//		//按Ctrl键,可以记录鼠标位置并输出到页面上边
	//		/*if (event.ctrlKey) {
	//			var zb = "\"" + x + "." + y + "\"";
	//			str = str + "," + zb;
	//			record.innerHTML = str;
	//		}*/

	function Tips(setDelay) {
		$("#info>span:first").html("延迟:" + delay + "ms")
		$("#info>span:last").html("间隔:" + interval + "ms")
		$("#info").animate({
			"opacity": 1
		}, setDelay, function() {
			$("#info").animate({
				"opacity": 0
			}, setDelay);
		});
	}
});