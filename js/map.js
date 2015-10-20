// Function to draw your map
var drawMap = function() {
	// Create map and set view
	var map = L.map('map-container').setView([38.7, -98.35], 4);
	// Create a tile layer variable using the appropriate url
	var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {maxZoom: 15});
	// Add the layer to your map
 	layer.addTo(map);
	// Execute your function to get data
 	getData(map);
}

// Function for getting data
var getData = function(map) {
  	// Execute an AJAX request to get the data in data/response.js
  	$.ajax({
		url: './data/response.json',
  		dataType: 'json',
  		success: function(data) {
  			console.log(data);
  		}
  	});
}

// Loop through your data and add the appropriate layers and points
var customBuild = function() {
	// Be sure to add each layer to the map

	// Once layers are on the map, add a leaflet controller that shows/hides layers
  
}


