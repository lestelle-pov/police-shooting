'use strict'; // no joking around here

/* NOTES
	-be sure to mention how hispanics are not accurately represented as a Race
	 because there is inconsistency in the data (i.e. certain races are 
	 considered 'hispanic' and many unknown Races are 'hispanic')
*/

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
  			customBuild(data, map);
  		}
  	});
}

// Loop through your data and add the appropriate layers and points
var customBuild = function(data, map) {
	// Be sure to add each layer to the map

	// races of victims
	var white = new L.LayerGroup([]); // 'White'
	var black = new L.LayerGroup([]); // 'Black or African American'
	var indian = new L.LayerGroup([]); // 'American Indian or Alaskan Native'
	var asian = new L.LayerGroup([]); // 'Asian'
	var islander = new L.LayerGroup([]); // 'Native Hawaiian or Other Pacific Islander'
	var unknown = new L.LayerGroup([]); // 'Unknown' or 'undefined'
	
	// keeps track of victim's that were armed or unarmed
	var armed = {white: 0, nonwhite: 0, unknown: 0};
	var unarmed = {white: 0, nonwhite: 0, unknown: 0};

	// create variable for circle data points on map
	var circle;

	var gender = data.filter(function(d) {

		
	    if (d['Hit or Killed?'] == 'Killed') { 
	    // circle is red if the victim was Killed
	        circle = L.circleMarker([d.lat, d.lng], {
	            radius: 8,
	            color: 'A60000',
	            fillColor: '#A60000',
	            fillOpacity: 0.5
	        });
	    } else { 
	    // circle is blue (default) if the victim was Hit
	        circle = L.circleMarker([d.lat, d.lng], {
	        	radius: 8,
	        	color: '#E6BD30',
	        	fillColor: '#E6BD30',
	        	fillOpacity: 0.5
	        });
	    }

    	// adds circle data point to the appropriate layer and counts Armed or Unarmed
	    if (d.Race == 'White') {
	    	circle.addTo(white);
	    	(d['Armed or Unarmed?'] == 'Armed') ? armed.white++ : unarmed.white++;	    	
	    } else if (d.Race == 'Black or African American') {
	    	circle.addTo(black);
	    	(d['Armed or Unarmed?'] == 'Armed') ? armed.nonwhite++ : unarmed.nonwhite++;
	    } else if (d.Race == 'American Indian or Alaska Native') {
	    	circle.addTo(indian);
	    	(d['Armed or Unarmed?'] == 'Armed') ? armed.nonwhite++ : unarmed.nonwhite++;
	    } else if (d.Race == 'Asian') {
	    	circle.addTo(asian);
	    	(d['Armed or Unarmed?'] == 'Armed') ? armed.nonwhite++ : unarmed.nonwhite++;
	    } else if (d.Race == 'Native Hawaiian or Other Pacific Islander') {
	    	circle.addTo(islander);
	    	(d['Armed or Unarmed?'] == 'Armed') ? armed.nonwhite++ : unarmed.nonwhite++;
	    } else {
	    	circle.addTo(unknown);
	    	(d['Armed or Unarmed?'] == 'Armed') ? armed.unknown++ : unarmed.unknown++;
	    }

	    // adds popup textbox for each circle with a summary of the incident
	    if (d.Summary !== 'undefined') {
    		circle.bindPopup('Summary: ' + d.Summary + '<br><a href="'+d['Source Link']+'" target="_blank">(more info)</a>');
	    }	else {
	    	circle.bindPopup('No additional information.');
	    }

    });

	console.log(unarmed.unknown);
	
	// Once layers are on the map, add a leaflet controller that shows/hides layers
  	var raceLayers = {
  		"White": white,
  		"Black or African American": black,
  		"American Indian or Alaska Native": indian,
  		"Native Hawaiian or Other Pacific Islander": islander,
  		"Asian": asian,
  		"Unknown": unknown
  	}

  	L.control.layers(null, raceLayers, {collapsed: false}).addTo(map);

  	// Populate table data
  	$('#white-armed').html(armed.white);
  	$('#white-unarmed').html(unarmed.white);
  	$('#nonwhite-armed').html(armed.nonwhite);
  	$('#nonwhite-unarmed').html(unarmed.nonwhite);
  	$('#unknown-armed').html(armed.unknown);
  	$('#unknown-unarmed').html(unarmed.unknown);
}



