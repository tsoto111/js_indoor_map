(function($) {
	
	$(document).ready(function(){
		console.log('On Document Ready!');
		
		init_map_container();
		zoom_funks();
		
	});
	
	$(window).on('load',function(){
		console.log('On Window Load!');
	});
	
	/*====================================================
		Funks
	====================================================*/
	function init_map_container() {
		
		//Get BG Image W and H
		$map_view_w = $('.map-view')[0].getBoundingClientRect().width;
		$map_view_h = $('.map-view')[0].getBoundingClientRect().height;
		
		//position image by center point!
		
		console.log($('.map-view').offset());
		console.log($('.map-bg').offset());
		
		$('#outer-posX').text('outer x: ' + $('.map-view').offset().left);
		$('#outer-posY').text('outer y: ' + $('.map-view').offset().top);
		
		$('#inner-posX').text('Inner x: ' + $('.map-container').offset().left);
		$('#inner-posY').text('Inner y: ' + $('.map-container').offset().top);
		
		$map_x_center = $map_view_w / 2;
		$map_y_center = $map_view_h / 2;
		
		$center_x = $('.map-view').offset().left + $map_x_center;
		$center_y = $('.map-view').offset().top + $map_y_center;
		
		$center_inner_x = $map_x_center;
		$center_inner_y = $map_y_center;
		
		$('.center-testing-outer').attr('style','top:' + $center_y + 'px; left:' + $center_x + 'px;');
		$('.center-testing-inner').attr('style','top:' + $center_inner_y + 'px; left:' + $center_inner_x + 'px;');
		
		$('.map-container').attr('style','transform-origin: ' + $center_inner_x + 'px ' + $center_inner_y + 'px;')
		
		//$('.map-bg').css('marginTop',-$bg_image_x_center).css('marginLeft',-$bg_image_y_center);
		
		/*
		$('.map-container')
			.width($bg_image_w)
			.height($bg_image_h);
		*/
		
		$('.map-container').draggable({
			drag: function(){
				var offset = $(this).offset();
				var xPos = offset.left;
				var yPos = offset.top;
				
				var $parent_offset = $(this).parent().offset();
				console.log("center y: " + $('.center-testing-inner')[0].getBoundingClientRect().top);
				console.log("center x: " + $('.center-testing-inner')[0].getBoundingClientRect().left);
				console.log("y: " + $(this).css('top'));
				console.log("x: " + $(this).css('left'));
				
				//Stay centered? 
				console.log("True Center y: " + (parseInt($('.center-testing-inner')[0].getBoundingClientRect().top,10) - parseInt($(this).css('top'),10)));
				console.log("True Center x: " + (parseInt($('.center-testing-inner')[0].getBoundingClientRect().left,10) - parseInt($(this).css('left'),10)));
				
				//$('.center-testing-inner').attr('style','left:' + () + '; top:' + () + ';')
				
				$('#inner-posX').text('Inner x: ' + (xPos - $parent_offset.left));
				$('#inner-posY').text('Inner y: ' + (yPos - $parent_offset.top));
				
			}
		});
		
	}
	
	function zoom_funks(){
		$('.zoom-in').click(function(){
			console.log("zoom In");
			$current_zoom_scale = $('.map-container').attr('data-zoom');
			$new_zoom_size = parseInt($current_zoom_scale) + 1;
			if ($new_zoom_size > 4) {
				$new_zoom_size = 4;
			} else if ($new_zoom_size < 1) {
				$new_zoom_size = 1;
			}
			
			$('.map-container').toggleClass('rotate');
			
			//Target center of map-container!!!
			
			/*
			$('.map-container')
				.css('transform','scale(' + $new_zoom_size + ')')
				.attr('data-zoom',$new_zoom_size);
			*/
			
		});
		
		$('.zoom-out').click(function(){
			console.log("zoom Out");
			$current_zoom_scale = $('.map-container').attr('data-zoom');
			$new_zoom_size = parseInt($current_zoom_scale) - 1;
			
			if ($new_zoom_size > 4) {
				$new_zoom_size = 4;
			} else if ($new_zoom_size < 1) {
				$new_zoom_size = 1;
			}
			
			//Target center of map-container!!!
			console.log($('.map-container').offset());
			
			
			$('.map-container').toggleClass('rotate');
			
			/*
			$('.map-container')
				.css('transform','scale(' + $new_zoom_size + ')')
				.attr('data-zoom',$new_zoom_size);
			*/
			
		});
		
	}
	
	
})( jQuery );