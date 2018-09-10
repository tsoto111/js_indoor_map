# SVG Indoor Map Drawer

This is an example of SVG Map Drawer jQuery plugin living in `/assets/scripts/svg-map-drawer.js` which is leveraging the SVG JS jQuery library. SVG Map Drawer JS can be used to draw and view an svg indoor map of a restaurant or an event's table setting.

**Dependencies**
* [jQuery](http://jquery.com/): Version 3.3.1
* [SVG JS](http://svgjs.com/): Version 2.6.6
* [SVG Draggable JS](https://github.com/svgdotjs/svg.draggable.js): Version 2.2.1

Note: All of these dependencies are in `assets/scripts` directory.

## Installation

1 ) Load dependencies in the following order via your document header

```html
<!-- SVG Map Drawer Depencies -->
<script src="assets/scripts/jquery-3.3.1.min.js"></script>
<script src="assets/scripts/svg.min.js"></script>
<script src="assets/scripts/svg.draggable.min.js"></script>
<script src="assets/scripts/svg-map-drawer.js"></script>
<!-- Your js file -->
<script src="assets/scripts/scripts.js"></script>
```

2 ) Create a wrapper for the map, in this example I used the following:

```html
<div id="map-view-container"></div>
```

Note: Don't forget to set this container's position to **relative** if not positioned **absolute** in css. In my example, I use the following:

```css
.map-view-container {
	width:100%;
	height:100%;
	position:absolute;
}
```

3 ) Store your table drawing data in the following data structure via your own javascript file and initialize the map. Can be seen in `/assets/scripts/scripts.js`

```javascript

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
		...
	]
}

$(document).ready(function(){		
	$('#map-view-container').svgMapDrawer($map_elements);
});

``` 

