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
		"posts": [
			{
				id:1,
				name: "A1",
				shape: {
					type:"circle",
					x: 1130, 
					y: 300, 
					radius: 25, 
					rotate:0, 
					fill:"green"
				}
			},
			{
				id:2,
				name: "A2",
				shape: {
					type:"circle", 
					x: 930, 
					y: 300, 
					radius: 25, 
					rotate:0, 
					fill:"green"
				}
			},
			{
				id:3,
				name: "A3",
				shape: {
					type:"circle", 
					x: 730, 
					y: 300, 
					radius: 25, 
					rotate:0, 
					fill:"green"
				}
			},
			{
				id:4,
				name: "A4",
				shape: {
					type:"circle", 
					x: 530, 
					y: 300, 
					radius: 25, 
					rotate:0, 
					fill:"green"
				}
			},
			{
				id:5,
				name: "A5",
				shape: {
					type:"circle", 
					x: 330, 
					y: 300, 
					radius: 25, 
					rotate:0, 
					fill:"green"
				}
			},
			{
				id:6,
				name: "A6",
				shape: {
					type:"circle", 
					x: 130, 
					y: 300, 
					radius: 25, 
					rotate:0, 
					fill:"green"
				}
			},
			{
				id:7,
				name: "B1",
				shape: {
					type:"rectangle", 
					x: 1350, 
					y: 450, 
					width:100,
					height:200, 
					rotate:0,
					fill:"yellow"
				}
			},
			{
				id:8,
				name: "C1",
				shape: {
					type:"circle", 
					x: 1130, 
					y: 600, 
					radius: 25, 
					rotate:0, 
					fill:"green"
				}
			},
			{
				id:9,
				name: "C2",
				shape: {
					type:"circle", 
					x: 930, 
					y: 600, 
					radius: 25, 
					rotate:0, 
					fill:"green"
				}
			},
			{
				id:10,
				name: "C3",
				shape: {
					type:"circle", 
					x: 730, 
					y: 600, 
					radius: 25, 
					rotate:0, 
					fill:"green"
				}
			},
			{
				id:11,
				name: "C4",
				shape: {
					type:"circle", 
					x: 530, 
					y: 600, 
					radius: 25, 
					rotate:0, 
					fill:"green"
				}
			},
			{
				id:12,
				name: "C5",
				shape: {
					type:"circle", 
					x: 330, 
					y: 600, 
					radius: 25, 
					rotate:0, 
					fill:"green"
				}
				
			},
			{
				id:13,
				name: "C6",
				shape: {
					type:"circle", 
					x: 130, 
					y: 600, 
					radius: 25, 
					rotate:0, 
					fill:"green"
				}
			},
			{
				id:14,
				name: "C7",
				shape: {
					type:"rectangle", 
					x: 725, 
					y: 837, 
					width:200,
					height:100, 
					rotate:0,
					fill:"pink"
				}
			},
			{
				id:15,
				name: "D1",
				shape: {
					type:"polygon",
					x:230,
					y:443,
					path:"140.79 35.8 140.79 9.21 114.19 9.21 107.73 0 42.27 0 35.8 9.21 9.21 9.21 9.21 35.8 0 42.27 0 107.73 9.21 114.19 9.21 140.79 35.8 140.79 42.27 150 107.73 150 114.19 140.79 140.79 140.79 140.79 114.19 150 107.73 150 42.27 140.79 35.8",
					fill:"#f06"
				}
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