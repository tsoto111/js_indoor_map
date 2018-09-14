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
				name:"A1",
				state:"default",
				shape: {
					type:"circle",
					x:130.52,
					y:300.41,
					radius:25,
				}
			},
			{
				id:2,
				name:"A2",
				state:"default",
				shape: {
					type:"circle",
					x:330,
					y:300.41,
					radius:25,
				}
			},
			{
				id:3,
				name:"A3",
				state:"default",
				shape: {
					type:"circle",
					x:531,
					y:300.41,
					radius:25,
				}
			},
			{
				id:4,
				name:"A4",
				state:"default",
				shape: {
					type:"circle",
					x:730,
					y:300.41,
					radius:25,
				}
			},
			{
				id:5,
				name:"A5",
				state:"default",
				shape: {
					type:"circle",
					x:930,
					y:300.41,
					radius:25,
				}
			},
			{
				id:6,
				name:"A6",
				state:"default",
				shape: {
					type:"circle",
					x:1130,
					y:300.41,
					radius:25,
				}
			},
			{
				id:7,
				name:"B1",
				state:"default",
				shape: {
					type:"circle",
					x:130.52,
					y:600,
					radius:25,
				}
			},
			{
				id:8,
				name:"B2",
				state:"default",
				shape: {
					type:"circle",
					x:330,
					y:600,
					radius:25,
				}
			},
			{
				id:9,
				name:"B3",
				state:"default",
				shape: {
					type:"circle",
					x:530,
					y:600,
					radius:25,
				}
			},
			{
				id:10,
				name:"B4",
				state:"default",
				shape: {
					type:"circle",
					x:730,
					y:600,
					radius:25,
				}
			},
			{
				id:11,
				name:"B5",
				state:"default",
				shape: {
					type:"circle",
					x:930,
					y:600,
					radius:25,
				}
			},
			{
				id:12,
				name:"B6",
				state:"default",
				shape: {
					type:"circle",
					x:1130,
					y:600,
					radius:25,
				}
			},
			{
				id:13,
				name:"C1",
				state:"hold",
				shape: {
					type:"rectangle",
					x:1300,
					y:350,
					width:100,
					height:200
				}
			},
			{
				id:14,
				name:"C2",
				state:"default",
				shape: {
					type:"rectangle",
					x:626,
					y:788,
					width:199,
					height:99
				}
			},
			{
				id:15,
				name: "D1",
				state: "reserved",
				shape: {
					type:"polygon",
					path:"140.8 35.8 140.8 9.2 114.2 9.2 107.7 0 42.3 0 35.8 9.2 9.2 9.2 9.2 35.8 0 42.3 0 107.7 9.2 114.2 9.2 140.8 35.8 140.8 42.3 150 107.7 150 114.2 140.8 140.8 140.8 140.8 114.2 150 107.7 150 42.3 140.8 35.8",
					x: 155,
					y:368,
					width:150,
					height:150,
				}
			}
		]
	}
	
	$(document).ready(function(){
		//Initialize SVG Map	
		$('#map-view-container')
			.svgMapDrawer($map_elements);
		
		//Get feed count
		$('.info-bar .count').text("Count " + $map_elements.posts.length);
		
		//Build sidebar feed
		$.each($map_elements.posts,function($index,$post){
			$('.map-menu .posts').append("<li class='post-" + $post.id + "' data-id='" + $post.id + "' >" + $post.name + "</li>");
		});
		
		// On Table Click
		$(".table").click(function(){
			if (!$(this).hasClass('background')){
				$(this).siblings().removeClass('active');
				open_detail_view();
				$(this).addClass('active');
			}
		});
		
		// On Label Click, Activate Table
		$("svg text").click(function(){
			$target = ".shape-" + $(this).attr('data-id');
			$($target).trigger('click');
		});
		
		// On Table Cell Click, Activate Table
		$(".posts li").click(function(){
			$target = ".shape-" + $(this).attr('data-id');
			$($target).trigger('click');
		});
		
		// Back Btn Click
		$(".detail-view .back-btn").click(function(){
			$("#map-view-container")
				.find(".table")
				.removeClass('active');
				
			$('.detail-view')
				.removeClass('open')
				.css({borderRight:'1px solid #ccc'})
				.animate({right:'100%'},500,function(){
					$(this).css({borderRight:'0px'});
				});
		});
		
	});
	
	$(window).on('load',function(){
		console.log('On Window Load!');
	});
	
	function open_detail_view(){
		if (!$('.detail-view').hasClass('open')){
			$('.detail-view')
				.addClass('open')
				.css({borderRight:"1px solid #ccc"})
				.animate({right:"0px"},500,function(){
					$(this).css({borderRight:'0px'});
				});
		} else {
			// Close, Reset Data, and Re-open with new data!
			$('.detail-view')
				.css({borderRight:"1px solid #ccc"})
				.animate({right:"100%"},500,function(){
					// Clear data
					console.log("Clear Data");
				
					//Re-open with new data
					$(this).animate({right:"0px"},500,function(){
						$(this).css({borderRight:'0px'});
					});
			});
		}
	}
})( jQuery );