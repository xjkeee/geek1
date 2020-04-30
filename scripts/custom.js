$(document).ready(function(){
	$(".spincrement").spincrement({
		thousandSeparator: "",
		duration: 2000
	});
	var show = true;
	$(window).on("scroll", function(){

		if(!show) return false;

		var w_top = $(window).scrollTop();
		var e_top = $("#counts").offset().top;

		var w_height = $(window).height();
		var d_height = $(document).height();

		console.log(w_top + 250 +" " + e_top);

		if(w_top + 250 >= e_top || w_height + w_top == d_height){
			$(".spincrement").spincrement({
				thousandSeparator: "",
				duration: 2000
			});
			show = false;
		}
	});
});

$(document).ready(function() {
	$('#particles').particleground({
		minSpeedX: 0.1,
		maxSpeedX: 0.7,
		minSpeedY: 0.1,
		maxSpeedY: 0.7,
		directionX: 'center',
		directionY: 'center',
		density: 10000,
		dotColor: '#998675',
		lineColor: '#4d3327',
		particleRadius: 4,
		lineWidth: 1,
		curvedLines: false,
		proximity: 100,
		parallax: true,
		parallaxMultiplier: 5,
		onInit: function() {},
		onDestroy: function() {}
	});
});