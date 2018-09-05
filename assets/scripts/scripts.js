(function($) {
	
	$(document).ready(function(){
		console.log('On Document Ready!');
		init_map_container();
		//zoom_funks();
		
	});
	
	$(window).on('load',function(){
		console.log('On Window Load!');
	});
	
	/*====================================================
		Funks
	====================================================*/
	function init_map_container() {
		
		// Get Viewport Size
		$viewport_w = $('#map-view-container')[0].getBoundingClientRect().width;
		$viewport_h = $('#map-view-container')[0].getBoundingClientRect().height;
		
		//Viewport Midpoint
		$midpoint_x = ($viewport_w)/2;
		$midpoint_y = ($viewport_h)/2;
		
		// Zoom Midpoint, Dynamically updated by drag!
		$zoom_center_x = $midpoint_x;
		$zoom_center_y = $midpoint_y;
		
		$map_elements = [
			{
				id:"background",
				type:"circle", 
				x: 0, 
				y: 0, 
				radius: "10000", 
				rotate:0, 
				fill:"white"
			},
			{
				id:"center",
				type:"circle", 
				x: $midpoint_x, 
				y: $midpoint_y, 
				radius: 5, 
				rotate:0, 
				fill:"transparent" // Shape to test zoom midepoint!
			},
			{
				id:"table-1",
				type:"circle", 
				x: 428, 
				y: 168, 
				radius: "10", 
				rotate:0, 
				fill:"red"
			},
			{
				id:"table-1",
				type:"circle", 
				x: 388, 
				y: 210, 
				radius: "10", 
				rotate:0, 
				fill:"blue"
			},
			{
				id:"table-1",
				type:"circle", 
				x: 388, 
				y: 265, 
				radius: "10", 
				rotate:0, 
				fill:"blue"
			},
			{
				id:"table-1",
				type:"circle", 
				x: 388, 
				y: 335, 
				radius: "10", 
				rotate:0, 
				fill:"green"
			},
			{
				id:"table-1",
				type:"circle", 
				x: 388, 
				y: 389, 
				radius: "10", 
				rotate:0, 
				fill:"yellow"
			},
			{
				id:"table-8",
				type:"circle", 
				x: 677, 
				y: 270, 
				radius: "20", 
				rotate:0, 
				fill:"orange"
			}
		]
			
		var draw = SVG('map-view-container');
		var group = draw.group();
		
		//Calulate Position on hover
		draw.mousemove(function($evt) {		
			$('.svg-coords')
				.text('Coords: x:' + $evt.offsetX + ' y:' + $evt.offsetY);
		});
		
		//Show hide position on map hover in and out
		$('#map-view-container svg').hover(function(evt){
			$('.svg-coords').css('visibility','visible');
		},function(evt){
			$('.svg-coords').css('visibility','hidden');
		});
		
		//Draw Tables
		$.each($map_elements,function($index,$elem){
			switch($elem.type){
				case "circle":
					$circle = draw
						.circle()
						.addClass($elem.id)
						.radius($elem.radius)
						.move($elem.x - $elem.radius, $elem.y - $elem.radius)
						.rotate($elem.rotate)
						.fill($elem.fill);
					
					group.add($circle);
					$elem.shape = $circle;
					break;
				case "rectangle":
					console.log("I am a square table!");
					break;
			}
		});
		
		// Calculate Center Point
		$(window).resize(function(){
			$midpoint_x = ($('#map-view-container')[0].getBoundingClientRect().width)/2;
			$midpoint_y = ($('#map-view-container')[0].getBoundingClientRect().height)/2;
			$zoom_center_x = $midpoint_x;
			$zoom_center_y = $midpoint_y;
			$map_elements[1].shape.x($midpoint_x);
			$map_elements[1].shape.y($midpoint_y);
		});
		
		group
			.draggable()
			.on('dragmove',function(e){
				
				// Change Cursor on Drag
				$('svg g').css('cursor','grabbing');
				
				// Get Group Matrix Transformation
				var matrix = $('svg g').attr('transform');
				if (matrix != undefined) {
					// Parse Group Matrix Transformation Data into an array 
					matrix = matrix.match(/-?[\d\.]+/g);
					
					//Get Current Zoom Scale for Calculation
					$current_scale = group.transform('scaleX');
					
					// Calculate center position with drag transformation!
					$zoom_center_x = ($midpoint_x - parseInt(matrix[4]))/$current_scale;
					$zoom_center_y = ($midpoint_y - parseInt(matrix[5]))/$current_scale;
					
					// Update Test Center Point
					$map_elements[1].shape.x($zoom_center_x);
					$map_elements[1].shape.y($zoom_center_y);
				}
			}).on('dragend',function(e){
				// Change Cursor on Drag End
				$('svg g').css('cursor','grab')
			});
		
		
		$('.zoom-in').click(function(){
			$current_scale = group.transform('scaleX');
			group.transform({
				scale:$current_scale + 1, 
				cx: $zoom_center_x,
				cy: $zoom_center_y,
			});
		});
		
		$('.zoom-out').click(function(){
			$current_scale = group.transform('scaleX');			
			if ($current_scale != 1) {
				group.transform({
					scale:$current_scale - 1,
					cx: $zoom_center_x,
					cy: $zoom_center_y,
				});
			}
		});
	}
})( jQuery );