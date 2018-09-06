(function($) {
	
	$(document).ready(function(){
		console.log('On Document Ready!');
		init_map_container();
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
				type:"rectangle", 
				x: 0, 
				y: 0,
				width:1440,
				height:955, 
				rotate:0,
				stroke: {color:"#000", opacity: 1, width:5},
				fill:"#52565e"
			},
			{
				id:"center",
				type:"circle", 
				x: $midpoint_x, 
				y: $midpoint_y, 
				radius:10, 
				rotate:0, 
				fill:"black" // Shape to test zoom midepoint!
			},
			{
				id:"table-1",
				type:"circle", 
				x: 1130, 
				y: 300, 
				radius: 25, 
				rotate:0, 
				fill:"green"
			},
			{
				id:"table-2",
				type:"circle", 
				x: 930, 
				y: 300, 
				radius: 25, 
				rotate:0, 
				fill:"green"
			},
			{
				id:"table-3",
				type:"circle", 
				x: 730, 
				y: 300, 
				radius: 25, 
				rotate:0, 
				fill:"green"
			},
			{
				id:"table-4",
				type:"circle", 
				x: 530, 
				y: 300, 
				radius: 25, 
				rotate:0, 
				fill:"green"
			},
			{
				id:"table-5",
				type:"circle", 
				x: 330, 
				y: 300, 
				radius: 25, 
				rotate:0, 
				fill:"green"
			},
			{
				id:"table-6",
				type:"circle", 
				x: 130, 
				y: 300, 
				radius: 25, 
				rotate:0, 
				fill:"green"
			},
			{
				id:"table-7",
				type:"rectangle", 
				x: 1350, 
				y: 450, 
				width:100,
				height:200, 
				rotate:0,
				stroke: {color:"#000", opacity: 1, width:5},
				fill:"yellow"
			},
			{
				id:"table-8",
				type:"circle", 
				x: 1130, 
				y: 600, 
				radius: 25, 
				rotate:0, 
				fill:"green"
			},
			{
				id:"table-9",
				type:"circle", 
				x: 930, 
				y: 600, 
				radius: 25, 
				rotate:0, 
				fill:"green"
			},
			{
				id:"table-10",
				type:"circle", 
				x: 730, 
				y: 600, 
				radius: 25, 
				rotate:0, 
				fill:"green"
			},
			{
				id:"table-11",
				type:"circle", 
				x: 530, 
				y: 600, 
				radius: 25, 
				rotate:0, 
				fill:"green"
			},
			{
				id:"table-12",
				type:"circle", 
				x: 330, 
				y: 600, 
				radius: 25, 
				rotate:0, 
				fill:"green"
			},
			{
				id:"table-13",
				type:"circle", 
				x: 130, 
				y: 600, 
				radius: 25, 
				rotate:0, 
				fill:"green"
			},
			{
				id:"table-7",
				type:"rectangle", 
				x: 725, 
				y: 837, 
				width:200,
				height:100, 
				rotate:0,
				stroke: {color:"#000", opacity: 1, width:5},
				fill:"pink"
			}
		]
			
		var draw = SVG('map-view-container');
		//draw.viewbox(0,0,$viewport_w,$viewport_h);
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
					$rectangle = draw
						.rect()
						.addClass($elem.id)
						.width($elem.width)
						.height($elem.height)
						.rotate($elem.rotate)
						.fill($elem.fill)
					
					if ($elem.id != "background") {
						$rectangle
							.move($elem.x - ($elem.width / 2), $elem.y - ($elem.height / 2))
					} else {
						$rectangle
							.stroke($elem.stroke);
					}
					
					group.add($rectangle);
					$elem.shape = $rectangle;
					
					break;
					
				case "polygon":
					
					console.log("Polygon Found!");
					
					break;
			}
		});
		
		// Calculate Center Point
		group.center($zoom_center_x,$zoom_center_y);
		$(window).resize(function(){
			$current_scale = group.transform('scaleX');
			$viewport_w = $('#map-view-container')[0].getBoundingClientRect().width;
			$viewport_h = $('#map-view-container')[0].getBoundingClientRect().height;
			$midpoint_x = $viewport_w/2;
			$midpoint_y = $viewport_h/2;
			$zoom_center_x = $midpoint_x;
			$zoom_center_y = $midpoint_y;
			$map_elements[1].shape.x($midpoint_x);
			$map_elements[1].shape.y($midpoint_y);
			//group.center($zoom_center_x,$zoom_center_y);
			//draw.viewbox(0,0,$viewport_w,$viewport_h);

		});
		
		// Allow Group to be Dragged!
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
			console.log(group.bbox());
			$current_scale = group.transform('scaleX');
			group.animate(200).transform({
				scale:$current_scale + 0.2, 
				cx: $zoom_center_x,
				cy: $zoom_center_y,
			});
		});
		
		$('.zoom-out').click(function(){
			//console.log(group.bbox());
			$current_scale = group.transform('scaleX');
			group.animate(200).transform({
				scale:$current_scale - 0.2,
				cx: $zoom_center_x,
				cy: $zoom_center_y,
			});
		});
		
	}
})( jQuery );