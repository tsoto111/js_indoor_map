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
			
			// Draw and position shape
			$table_state = $shape_data.state;
			$rectangle = $draw
				.rect()
				.addClass($shape_data.name + " shape-" + $shape_data.id)
				.width($shape_data.shape.width)
				.height($shape_data.shape.height)
				.attr('data-id',$shape_data.id);
			
			if ($shape_data.id != 0) {
				// If not background	
				$rectangle
					.move($shape_data.shape.x,$shape_data.shape.y)
					.fill($map_data.states[$table_state].fill)
					.addClass('table');
			} else {
				// Else if background
				$rectangle
					.fill($background_data.shape.fill);
			}
			
			// Add Shape to correct group
			$group_drag.add($rectangle);
			
			
			//Draw Label
			if($shape_data.id != 0){
				// Draw and add label
				draw_label($rectangle, $shape_data);
			}
		}
		
		function draw_circle($shape_data){
			
			$table_state = $shape_data.state;
						
			$circle_x = $shape_data.shape.x - $shape_data.shape.radius;
			$circle_y = $shape_data.shape.y - $shape_data.shape.radius;
			
			$circle = $draw
				.circle()
				.addClass($shape_data.name + " shape-" + $shape_data.id + " table")
				.radius($shape_data.shape.radius)
				.move($circle_x, $circle_y)
				.fill($map_data.states[$table_state].fill)
				.attr('data-id',$shape_data.id);
				
			$group_drag.add($circle);
			
			// Draw and add label
			draw_label($circle, $shape_data);
			
		}
		
		function draw_polygon($shape_data){
			
			$table_state = $shape_data.state;
			
			$polygon = $draw
				.polygon($shape_data.shape.path)
				.addClass($shape_data.name + " shape-" + $shape_data.id + " table")
				.fill($map_data.states[$table_state].fill)
				.attr('data-id',$shape_data.id);
			
			$polygon_x = $shape_data.shape.x - ($polygon.bbox().width / 2);
			$polygon_y = $shape_data.shape.y - ($polygon.bbox().height / 2);
			
			//$polygon.move($polygon_x, $polygon_y);
			
			$group_drag.add($polygon);
			
			draw_label($polygon, $shape_data);
		}
		
		function shape_center($shape){
			$center_x =  ($shape.bbox().x + $shape.bbox().width)/2;
			$center_y =  ($shape.bbox().y + $shape.bbox().height)/2;
			return {cx: $center_x, cy:$center_y}
		}
		
		function draw_label($shape, $shape_data){
			
			// Draw Label
			$shape_label = $draw
				.text($shape_data.name)
				.font({
					family:'Helvetica',
					size:14,
					weight:'bold',
				})
				.attr('data-id',$shape_data.id)
				.addClass('label');
						
			// Find Label x and y position
			if( $shape_data.shape.type == "rectangle") {
				$label_x = ($shape_data.shape.x + ($shape.bbox().width / 2)) - ($shape_label.bbox().w / 2);
				$label_y = ($shape_data.shape.y + ($shape.bbox().height / 2)) - ($shape_label.bbox().h / 2);
			} else if ($shape_data.shape.type == "circle") {
				$label_x = ($shape_data.shape.x) - ($shape_label.bbox().w / 2);
				$label_y = ($shape_data.shape.y) - ($shape_label.bbox().h / 2);
			} else if ($shape_data.shape.type == "polygon") {
				$label_x = ($shape.bbox().cx) - ($shape_label.bbox().w / 2);
				$label_y = ($shape.bbox().cy) - ($shape_label.bbox().h / 2);
			}
			
			// Position Label
			$shape_label.move($label_x, $label_y);
			
			// Add to group
			$group_drag.add($shape_label);
		}
	}
})( jQuery );