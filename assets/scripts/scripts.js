(function($) {
	
	$map_elements = {
		map_data: {
			background: {
				id:0,
				name:"background",
				shape: {
					type:"rectangle", 
					x: 0, 
					y: 0,
					width:1440,
					height:955, 
					fill:"white"
				}
			},
			states: {
				default: {
					fill:"#ae85d4"
				},
				reserved: {
					fill:"#e65aaf"
				},
				hold: {
					fill:"#facc00"
				},
				selected: {
					fill:"5fc883"
				}
			}
		},
		posts: [
			{
				id:1,
				name: "A1",
				state: "reserved",
				shape: {
					type:"circle",
					x: 1130, 
					y: 300, 
					radius: 25, 
					rotate:0, 
				}
			},
			{
				id:2,
				name: "A2",
				state: "hold",
				shape: {
					type:"circle", 
					x: 930, 
					y: 300, 
					radius: 25, 
					rotate:0, 
				}
			},
			{
				id:3,
				name: "A3",
				state: "hold",
				shape: {
					type:"circle", 
					x: 730, 
					y: 300, 
					radius: 25, 
					rotate:0, 
				}
			},
			{
				id:4,
				name: "A4",
				state: "default",
				shape: {
					type:"circle", 
					x: 530, 
					y: 300, 
					radius: 25, 
					rotate:0, 
				}
			},
			{
				id:5,
				name: "A5",
				state: "default",
				shape: {
					type:"circle", 
					x: 330, 
					y: 300, 
					radius: 25, 
					rotate:0, 
				}
			},
			{
				id:6,
				name: "A6",
				state: "default",
				shape: {
					type:"circle", 
					x: 130, 
					y: 300, 
					radius: 25, 
					rotate:0, 
				}
			},
			{
				id:7,
				name: "B1",
				state: "hold",
				shape: {
					type:"rectangle", 
					x: 1350, 
					y: 450, 
					width:100,
					height:200, 
					rotate:0,
				}
			},
			{
				id:8,
				name: "C1",
				state: "default",
				shape: {
					type:"circle", 
					x: 1130, 
					y: 600, 
					radius: 25, 
					rotate:0, 
				}
			},
			{
				id:9,
				name: "C2",
				state: "default",
				shape: {
					type:"circle", 
					x: 930, 
					y: 600, 
					radius: 25, 
					rotate:0, 
				}
			},
			{
				id:10,
				name: "C3",
				state: "default",
				shape: {
					type:"circle", 
					x: 730, 
					y: 600, 
					radius: 25, 
					rotate:0, 
				}
			},
			{
				id:11,
				name: "C4",
				state: "default",
				shape: {
					type:"circle", 
					x: 530, 
					y: 600, 
					radius: 25, 
					rotate:0, 
				}
			},
			{
				id:12,
				name: "C5",
				state: "reserved",
				shape: {
					type:"circle", 
					x: 330, 
					y: 600, 
					radius: 25, 
					rotate:0, 
				}
				
			},
			{
				id:13,
				name: "C6",
				state: "hold",
				shape: {
					type:"circle", 
					x: 130, 
					y: 600, 
					radius: 25, 
					rotate:0, 
				}
			},
			{
				id:14,
				name: "C7",
				state: "reserved",
				shape: {
					type:"rectangle", 
					x: 725, 
					y: 837, 
					width:200,
					height:100, 
					rotate:0,
				}
			},
			{
				id:15,
				name: "D1",
				state: "reserved",
				shape: {
					type:"polygon",
					x:230,
					y:443,
					path:"140.79 35.8 140.79 9.21 114.19 9.21 107.73 0 42.27 0 35.8 9.21 9.21 9.21 9.21 35.8 0 42.27 0 107.73 9.21 114.19 9.21 140.79 35.8 140.79 42.27 150 107.73 150 114.19 140.79 140.79 140.79 140.79 114.19 150 107.73 150 42.27 140.79 35.8",
				}
			}
		]
	}
	
	$(document).ready(function(){
		//Initialize SVG Map	
		$('#map-view-container')
			.svgMapDrawer($map_elements);
			
		//Build sidebar feed
		$.each($map_elements.posts,function($index,$post){
			console.log($post.name);
			$('.map-menu .posts').append("<li>" + $post.name + "</li>");
		});
		
		//Table on click!
		$("svg rect, svg circle, svg polygon").click(function(){
			if ($(this).hasClass('background')){
				$(this).siblings().removeClass('active');
			} else {
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
			}
		});
	});
	
	$(window).on('load',function(){
		console.log('On Window Load!');
	});
	
})( jQuery );