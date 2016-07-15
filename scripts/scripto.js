$(document).ready(function (){
	var flag = false;
	$(".meuh").click(function(){
		if(flag == false){
			flag = true;
			$(".bg-meuh").css("display","block");
			$(".top h").css("text-shadow","0 0 5px yellow");
			$(".left").css("text-shadow","0 0 3px yellow");
			$(".right-item").css("opacity","0.5");
		}
		else {
			flag = false;
			$(".bg-meuh").css("display","none");	
			$(".top h").css("text-shadow","");
			$(".left").css("text-shadow","");
			$(".right-item").css("opacity","");
		}	
	});
		
	$('.right-item-title').click(function(){
		var flip = $(this).attr("id");

		$('#' + flip + 'c').slideToggle("fast");
	});
	
	var offset = 150;

	$('.left-a').click(function(event) {
		event.preventDefault();
		$($(this).attr('href'))[0].scrollIntoView();
		scrollBy(0, -offset);
	});
	
	
});