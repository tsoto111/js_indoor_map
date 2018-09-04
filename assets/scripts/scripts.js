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
					
					break;
				case "rectangle":
					console.log("I am a square table!");
					break;
			}
		});
		
		group
			.draggable()
			.on('dragmove',function(){
				$('svg g').css('cursor','grabbing');
			}).on('dragend',function(){
				$('svg g').css('cursor','grab')
			});
		
		$('.zoom-in').click(function(){
			$current_scale = group.transform('scaleX');
			group.transform({scale:$current_scale + 1});
			console.log(group.transform('scaleX'));
		});
		
		$('.zoom-out').click(function(){
			$current_scale = group.transform('scaleX');			
			if ($current_scale != 1) {
				group.transform({scale:$current_scale - 1});
			}
		});
		
	}
	
})( jQuery );