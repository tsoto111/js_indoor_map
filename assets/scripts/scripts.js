(function($) {
	
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
			id:"table-14",
			type:"rectangle", 
			x: 725, 
			y: 837, 
			width:200,
			height:100, 
			rotate:0,
			stroke: {color:"#000", opacity: 1, width:5},
			fill:"pink"
		},
		{
			id:"table-15",
			type:"rectangle", 
			x: 730, 
			y: 462, 
			width:25,
			height:25, 
			rotate:0, 
			fill:"blue"
		},
		{
			id:"table-16",
			type:"polygon",
			x:230,
			y:443,
			path:"140.79 35.8 140.79 9.21 114.19 9.21 107.73 0 42.27 0 35.8 9.21 9.21 9.21 9.21 35.8 0 42.27 0 107.73 9.21 114.19 9.21 140.79 35.8 140.79 42.27 150 107.73 150 114.19 140.79 140.79 140.79 140.79 114.19 150 107.73 150 42.27 140.79 35.8",
			fill:"#f06"
		}
	]
	
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
		
		/* ======================================== */
		/* Draw Funks                               */
		/* ======================================== */
		var draw = SVG('map-view-container');
		$group_dragg = draw.group().addClass('group_dragg');
		$group_zoom = draw.group().addClass('group_zoom').add($group_dragg);
					
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
					
					$group_dragg.add($circle);
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
					
					$group_dragg.add($rectangle);
					$elem.shape = $rectangle;
					
					break;
					
				case "polygon":
					console.log("Polygon Found!");
					$polygon = draw
						.polygon($elem.path)
						.addClass($elem.id)
						.fill($elem.fill);
					
					$polygon.move($elem.x - ($polygon.bbox().width / 2), $elem.y - ($polygon.bbox().height / 2));
					
					$group_dragg.add($polygon);
					$elem.shape = $polygon;
						
					break;
			}
		});
				
		draw.viewbox(0,0,$group_zoom.bbox().w,$group_zoom.bbox().h);
		
		/* ======================================== */
		/* Zoom Funks                               */
		/* ======================================== */	
		$zoom_center = shape_center($group_zoom);
		/*		
		$center_circle = draw
			.circle()
			.addClass('center')
			.radius(10)
			.move($zoom_center.cx,$zoom_center.cy)
			.fill('black');
			
		$group_dragg.add($center_circle);
		*/
		$('.zoom-in').click(function(){				
			$current_scale = $group_zoom.transform('scaleX');
			$group_zoom.animate(200).transform({
				scale:$current_scale + 0.5, 
				cx: $zoom_center.cx,
				cy: $zoom_center.cy,
			});
		});
		
		$('.zoom-out').click(function(){
			$current_scale = $group_zoom.transform('scaleX');
			if ($current_scale - 0.5 > 0) {
				$group_zoom.animate(200).transform({
					scale:$current_scale - 0.5,
					cx: $zoom_center.cx,
					cy: $zoom_center.cy,
				});
			}
		});
		
		/* ======================================== */
		/* Drag Funks                               */
		/* ======================================== */
		$group_dragg.draggable()
			.on('dragmove',function(e){
				$('svg g').css('cursor','grabbing');
				
				//console.log($center_circle.bbox().x + " " + $center_circle.bbox().y );
				console.log($zoom_center);
			}).on('dragend',function(e){
				$('svg g').css('cursor','grab');
			});
		
	}
	/* ======================================== */
	/* Helper Funks                             */
	/* ======================================== */
	function shape_center($shape){
		$center_x =  ($shape.bbox().x + $shape.bbox().width)/2;
		$center_y =  ($shape.bbox().y + $shape.bbox().height)/2;
		return {cx: $center_x, cy:$center_y}
	}
	
	function element_center($elem){
		$center_x = ($elem[0].getBoundingClientRect().width/2);
		$center_y = ($elem[0].getBoundingClientRect().height/2);
		return {cx:$center_x, cy:$center_y}
	}
	
})( jQuery );