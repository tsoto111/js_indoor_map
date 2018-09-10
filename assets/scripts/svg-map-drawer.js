(function($) {
	$.fn.svgMapDrawer = function($map_elements) {
		$wrapper = $(this);
		
		//Get Map BG Data (sets dimension of map)
		$background_data = $map_elements.background;
		
		//Prepair Wrappers
		$draw = SVG($wrapper.attr('id'))
			.viewbox(0,0,$background_data.width,$background_data.height);
			
		// Draw Drag Group
		$group_drag = $draw
			.group()
			.addClass('group_drag');
			
		// Draw Zoom Group
		$group_zoom = $draw
			.group()
			.addClass('group_zoom')
			.add($group_drag);
		
		//Draw Background
		$background_shape = draw_rectangle($background_data);
		
		//Draw Each Table
		$.each($map_elements.posts,function($index,$post){
			switch($post.shape.type) {
				case "circle":
					draw_circle($post.shape);
					break;
				case "rectangle":
					draw_rectangle($post.shape);
					break;
				case "polygon":
					draw_polygon($post.shape);
					break;
				default:
					console.log("Missing Shape Type: " + $post.shape.type);
					break;
			}
		});
		
		/*=================================================
			Zoom Functions
		=================================================*/
		//Add Zoom Buttons
		$wrapper.append(
			'<ul class="scroll-tool">' +
				'<li class="zoom-in">+</li>' +
				'<li class="zoom-out">-</li>' +
			'</ul>'
		);
		
		//Style Zoom Buttons
		$wrapper.find('.scroll-tool').css({
			position:'absolute',
			bottom:'20px',
			right:'20px',
			zIndex:'1',
			background:"#fff",
			border:'1px solid #ccc'
		})
		.find('li').css({
			padding:'10px',
			textAlign: 'center',
			cursor: 'pointer'
		}).hover(function(){
			$(this).css({backgroundColor:"#aaa"});
		},function(){
			$(this).css({backgroundColor:"#fff"});
		});
		
		// Get Zoom Center
		$zoom_center = shape_center($group_zoom);
		
		// Zoom In Function
		$wrapper.find('.zoom-in').click(function(){				
			$current_scale = $group_zoom.transform('scaleX');
			$group_zoom.animate(200).transform({
				scale:$current_scale + 0.5, 
				cx: $zoom_center.cx,
				cy: $zoom_center.cy,
			});
		});
		
		//Zoom Out Function
		$wrapper.find('.zoom-out').click(function(){
			$current_scale = $group_zoom.transform('scaleX');
			if ($current_scale - 0.5 > 0) {
				$group_zoom.animate(200).transform({
					scale:$current_scale - 0.5,
					cx: $zoom_center.cx,
					cy: $zoom_center.cy,
				});
			}
		});
		
		/*=================================================
			Drag Functions
		=================================================*/
		$wrapper.find('g').css({cursor:'grab'})
		$group_drag.draggable()
			.on('dragmove',function(e){
				$wrapper.find('g').css('cursor','grabbing');
			}).on('dragend',function(e){
				$wrapper.find('g').css('cursor','grab');
			});
		/*=================================================
			Helper Functions
		=================================================*/
		function draw_rectangle($shape_data){
			$rectangle = $draw
				.rect()
				.addClass($shape_data.id)
				.width($shape_data.width)
				.height($shape_data.height)
				.fill($shape_data.fill);
				
				if ($shape_data.id != "background") {
					$rectangle.move($shape_data.x - ($shape_data.width / 2), $shape_data.y - ($shape_data.height / 2))
				}
				
			$group_drag.add($rectangle);			
		}
		
		function draw_circle($shape_data){
			$circle = $draw
				.circle()
				.addClass($shape_data.id)
				.radius($shape_data.radius)
				.move($shape_data.x - $shape_data.radius, $shape_data.y - $shape_data.radius)
				.fill($shape_data.fill);
				
			$group_drag.add($circle);
		}
		
		function draw_polygon($shape_data){
			$polygon = $draw
				.polygon($shape_data.path)
				.addClass($shape_data.id)
				.fill($shape_data.fill);
			
			$polygon.move($shape_data.x - ($polygon.bbox().width / 2), $shape_data.y - ($polygon.bbox().height / 2));
			
			$group_drag.add($polygon);
		}
		
		function shape_center($shape){
			$center_x =  ($shape.bbox().x + $shape.bbox().width)/2;
			$center_y =  ($shape.bbox().y + $shape.bbox().height)/2;
			return {cx: $center_x, cy:$center_y}
		}
		
	}
})( jQuery );