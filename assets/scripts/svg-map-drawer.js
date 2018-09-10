(function($) {
	$.fn.svgMapDrawer = function($map_elements) {
		$wrapper = $(this);
		
		$map_data = $map_elements.map_data;
		
		//Get Map BG Data (sets dimension of map)
		$background_data = $map_elements.map_data.background;
				
		//Prepair Wrappers
		$draw = SVG($wrapper.attr('id'))
			.viewbox(0,0,$background_data.shape.width,$background_data.shape.height);
			
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
					draw_circle($post);
					break;
				case "rectangle":
					draw_rectangle($post);
					break;
				case "polygon":
					draw_polygon($post);
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
			
			$table_state = $shape_data.state;
			
			$rectangle = $draw
				.rect()
				.addClass($shape_data.name + " shape-" + $shape_data.id)
				.width($shape_data.shape.width)
				.height($shape_data.shape.height);
				
				if ($shape_data.id != 0) {
					$rectangle
						.move($shape_data.shape.x - ($shape_data.shape.width / 2), $shape_data.shape.y - ($shape_data.shape.height / 2))
						.fill($map_data.states[$table_state].fill)
						.addClass('table');
				} else {
					$rectangle
						.fill($background_data.shape.fill);
				}
				
			$group_drag.add($rectangle);			
		}
		
		function draw_circle($shape_data){
			
			$table_state = $shape_data.state;
			
			$circle = $draw
				.circle()
				.addClass($shape_data.name + " shape-" + $shape_data.id + " table")
				.radius($shape_data.shape.radius)
				.move($shape_data.shape.x - $shape_data.shape.radius, $shape_data.shape.y - $shape_data.shape.radius)
				.fill($map_data.states[$table_state].fill);
				
			$group_drag.add($circle);
		}
		
		function draw_polygon($shape_data){
			
			$table_state = $shape_data.state;
			
			$polygon = $draw
				.polygon($shape_data.shape.path)
				.addClass($shape_data.name + " shape-" + $shape_data.id + " table")
				.fill($map_data.states[$table_state].fill);
			
			$polygon.move($shape_data.shape.x - ($polygon.bbox().width / 2), $shape_data.shape.y - ($polygon.bbox().height / 2));
			
			$group_drag.add($polygon);
		}
		
		function shape_center($shape){
			$center_x =  ($shape.bbox().x + $shape.bbox().width)/2;
			$center_y =  ($shape.bbox().y + $shape.bbox().height)/2;
			return {cx: $center_x, cy:$center_y}
		}
		
	}
})( jQuery );