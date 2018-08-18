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
		
		$map_x_center = $map_view_w / 2;
		$map_y_center = $map_view_h / 2;
		
		$center_x = $('.map-view').offset().left + $map_x_center;
		$center_y = $('.map-view').offset().top + $map_y_center;
		
		$center_inner_x = $map_x_center;
		$center_inner_y = $map_y_center;
		
		$('.map-container').attr('style','transform-origin: ' + $center_inner_x + 'px ' + $center_inner_y + 'px;')
		
		//Testing Transform Origin on load!
		$('.center-testing-outer').attr('style','top:' + $center_y + 'px; left:' + $center_x + 'px;');
		$('.center-testing-inner').attr('style','top:' + $center_inner_y + 'px; left:' + $center_inner_x + 'px;');
		
		
		$('.map-container').draggable({
			drag: function(){
				var offset = $(this).offset();
				var xPos = offset.left;
				var yPos = offset.top;
				
				//Keep track of transform origin!!!
				var zoom_scale = $(this).attr('data-zoom');
				var $parent_offset = $(this).parent().offset();				
				var x_difference = (xPos - $parent_offset.left);
				var y_difference = (yPos - $parent_offset.top);
				var true_center_x = ($center_inner_x - x_difference) / zoom_scale;
				var true_center_y = ($center_inner_y - y_difference) / zoom_scale;
				
				//Set transform origin on drag! (zoom from center of map viewport)
				$('.map-container')
					.css({'transform-origin': true_center_x + 'px ' +  true_center_y + "px"});
				
				/* This is for testing transform origin!!!*/
				$('.center-testing-inner')
					.css('left',true_center_x)
					.css('top',true_center_y);
				
				
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
			
			//$('.map-container').toggleClass('rotate');
			
			$('.map-container')
				.css('transform','scale(' + $new_zoom_size + ')')
				.attr('data-zoom',$new_zoom_size);
			
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
			
			//$('.map-container').toggleClass('rotate');
			
			
			$('.map-container')
				.css('transform','scale(' + $new_zoom_size + ')')
				.attr('data-zoom',$new_zoom_size);
			
			
		});
		
	}
	
	
})( jQuery );