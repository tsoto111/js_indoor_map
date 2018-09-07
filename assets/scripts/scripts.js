(function($) {
	
	$map_elements = {
		"background": {
			id:"background",
			type:"rectangle", 
			x: 0, 
			y: 0,
			width:1440,
			height:955, 
			fill:"white"
		},
		"tables": [
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
				fill:"pink"
			},
			{
				id:"table-15",
				type:"polygon",
				x:230,
				y:443,
				path:"140.79 35.8 140.79 9.21 114.19 9.21 107.73 0 42.27 0 35.8 9.21 9.21 9.21 9.21 35.8 0 42.27 0 107.73 9.21 114.19 9.21 140.79 35.8 140.79 42.27 150 107.73 150 114.19 140.79 140.79 140.79 140.79 114.19 150 107.73 150 42.27 140.79 35.8",
				fill:"#f06"
			}
		]
	}
	
	$(document).ready(function(){
		console.log('On Document Ready!');		
		$('#map-view-container').svgMapDrawer($map_elements);
	});
	
	$(window).on('load',function(){
		console.log('On Window Load!');
	});
	
})( jQuery );