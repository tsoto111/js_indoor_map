# SVG Map Drawer JS

This is an example of SVG Map Drawer jQuery plugin living in `/assets/scripts/svg-map-drawer.js` which is leveraging the SVG JS library. SVG Map Drawer JS can be used to draw and view an svg indoor map of a restaurant or an event's table setting.

<a href="https://htmlpreview.github.io/?https://github.com/tsoto111/js_indoor_map/blob/NMPrototype/index.html" target="_blank">
	<img src="https://github.com/tsoto111/js_indoor_map/blob/master/assets/images/preview-btn.png" />
</a><br/><br/>

**Dependencies**
* [jQuery](http://jquery.com/): Version 3.3.1
* [SVG JS](http://svgjs.com/): Version 2.6.6
* [SVG Draggable JS](https://github.com/svgdotjs/svg.draggable.js): Version 2.2.1

**Note:** All of these dependencies are in `assets/scripts` directory.

## TABLE OF CONTENTS

[Installation](#installation)

[Parameters](#parameters)

* [Map Data](#map-data)
  * [Background](#background)
  * [States](#states)
* [Posts](#posts-aka-tables)
* [Shapes](#shapes)
  * [Circle](#circle)
  * [Rectangle](#rectangle)
  * [Polygon](#polygon)

## INSTALLATION

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

**Note:** Don't forget to set this container's position to **relative** if not positioned **absolute** in css. In my example, I use the following:

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
	"map_data": {
		"background": {
			id:0,
			name: "background",
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
			},
			...
		}
	},
	"posts": [
		{
			id:1,
			name:"A1",
			state:"reserved",
			shape: {
				type:"circle",
				x: 1130, 
				y: 300, 
				radius: 25, 
				rotate:0, 
			}
		},
		...
	]
}

$(document).ready(function(){		
	$('#map-view-container').svgMapDrawer($map_elements);
});

``` 

## PARAMETERS

### Map Data

#### background

The "background" key of the `map_data` object contains and sets the diminsion of the full map.

| Key    | Type      | Description                       | 
| ------ | --------- | --------------------------------- |
| id     | Int       | ID of the post                    |
| name   | String    | Name of the layer in the svg      |
| shape  | Object    | [Draw shape by type](#shapes)      |

#### states

The "states" key of the `map_data` object controls the fill color for the different states of our posts/tables.

| Key                 | Type      | Description                                   | 
| ------------------- | --------- | --------------------------------------------- |
| Variable State Type | Object    | Contains a key value pair of fill:'hex color' |

### Posts (A.K.A. Tables)

The "posts" key is an array of objects which contains all of our data related to a table.

| Key   | Type   | Description                                                | 
| ----- | ------ | ---------------------------------------------------------- |
| id    | int    | Post id of the table                                       |
| name  | string | Name of the table drawn on top of the table within the svg |
| state | string | State of the table which controls the table fill color     |
| shape | object | [Draw shape by type](#shapes)                               |

### Shapes

The "shape" key contains parameters to draw svg tables by 3 different types: "circle", "rectangle", and "polygon".

#### circle

| Key    | Type   | Description                                          | 
| ------ | ------ | ---------------------------------------------------- |
| type   | String | Defines the shape being drawn, in this case "circle" |
| x      | Int    | X coordinate of the drawn shape                      |
| y      | Int    | Y coordinate of the drawn shape                      |
| radius | Int    | Controls the size of the circle                      |

#### rectangle

| Key    | Type   | Description                                             | 
| ------ | ------ | ------------------------------------------------------- |
| type   | String | Defines the shape being drawn, in this case "rectangle" |
| x      | Int    | X coordinate of the drawn shape                         |
| y      | Int    | Y coordinate of the drawn shape                         |
| width  | Int    | Controls the width of the square or rectangle           |
| height | Int    | Controls the height of the square or rectangle          |

#### polygon

| Key    | Type   | Description                                             | 
| ------ | ------ | ------------------------------------------------------- |
| type   | String | Defines the shape being drawn, in this case "polygon"   |
| x      | Int    | X coordinate of the drawn shape                         |
| y      | Int    | Y coordinate of the drawn shape                         |
| path   | Int    | draws the shape with polygon path data.                 |

**Note:** when getting path data, the shape needs to be exported with no whitespace around the graphic in illustrator.

## ILLUSTRATOR WORKFLOW

Since this plugin can only draw shapes based off of svg parameters you pass to it, we need to use illustrator to draw our svg map template in order to figure out those parameters. The reason we had to build it this way is because IOS can not interact with a map rendered from a full svg. It needs to draw each shape by itself in order to be able to manipulate it later. For example, tap events and color changes on tables.   
