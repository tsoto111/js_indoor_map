# SVG Map Drawer JS

This is an example of SVG Map Drawer jQuery plugin living in `/assets/scripts/svg-map-drawer.js` which is leveraging the SVG JS library. SVG Map Drawer JS can be used to draw and view an svg indoor map of a restaurant or an event's table setting.

<a href="https://htmlpreview.github.io/?https://github.com/tsoto111/js_indoor_map/blob/NMPrototype/index.html" target="_blank">
	<img src="https://github.com/tsoto111/js_indoor_map/blob/NMPrototype/assets/images/preview-btn.png" />
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

[Illustrator Workflow](#illustrator-workflow)

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


1 ) Open Illustrator and set your document to the custom size of your svg map in pixels. For my example, I have set my width to 1440px and height to 955px.

![Document Size](https://github.com/tsoto111/js_indoor_map/blob/NMPrototype/assets/images/tutorial/document-size.png)

2 ) Draw your map. Just be sure to create a rectangle at the bottom of the layer in order to get a shape which will give you the document's dimensions. Name your layers so it is easier to see which shapes are what when you export to svg.

![Document Layer](https://github.com/tsoto111/js_indoor_map/blob/NMPrototype/assets/images/tutorial/document-layers.png)

3 ) Export your map to an SVG via `File > Export As > SVG`. In your SVG Options Window, be sure to set the **Styling** field to **Presentation Attributes**. Also, be sure to check **Responsive** at the bottom of the popup.

![SVG Options](https://github.com/tsoto111/js_indoor_map/blob/NMPrototype/assets/images/tutorial/svg-options.png)

4 ) Now open the svg file in your favorite text editor. From here, we can start extracting our coordinates. 

![SVG Open File](https://github.com/tsoto111/js_indoor_map/blob/NMPrototype/assets/images/tutorial/svg-open-file.png)

Notice that your layer name is the ID of the shape within the SVG. Also, the element wrapper tells you the type of shape the svg is drawing by type: rect, polygon, and circle. All of our data needed to draw our shape lives as attributes of the shape's element tag. 

### Extracting Shape Data from SVG

Here, we will go through each shape and give an example of extracting our draw data by type.

#### rect
```html 
<rect id="C2" x="626" y="788" width="199" height="99" fill="#ae85d4"/>
```
Looking at this element, we can see that we are dealing with our Rectangular shape of C2. Our drawable data is **x coordinate**, **y coordinate**, **width**, and **height**. Fill will be controlled by our shape's state so this fill color is not important to us.

Example of data structure:
```javascript
{
	id:1,
	name:"C2",
	state:"default",
	shape: {
		type:"rectangle",
		x: 626, 
		y: 788, 
		width:199,
		height:99 
	}
},
```

#### circle
```html
<circle id="A1" cx="130.52" cy="300.41" r="24.59" fill="#ae85d4"/>
```

Same as above, we can see that we are dealing with a Circle table named A1. Our drawable data is **cx coordinate**, **cy coordinate**, and **radius**.

Example of data structure:
```javascript
{
	id:2,
	name:"A1",
	state:"default",
	shape: {
		type:"circle",
		x: 130.52, 
		y: 300.41, 
		radius: 24.59 
	}
},
```