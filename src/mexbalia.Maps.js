
	sap.ui.core.Element.extend("mexbalia.CSI.Polygon",{
		metadata:{
			properties:{
				"map":"object",
				"Polygon":"object",
				"locationsArray":{type:"object[]",defaultValue:[]},
				"clickable":"boolean",
				"fillColor":"string",
				"fillOpacity":"float",
				"strokeColor":"string",
				"strokeOpacity":"float",
				"strokeWeight":"float"
			},
			aggregations:{
				"locations":{type:"mexbalia.CSI.Location"}
			}
		},
		draw: function(){
			var Locations = this.getLocations();
			var LocationsArray = [];
			for (var i in Locations){
				Locations[i].genLocation();
				LocationsArray.push(Locations[i].getLocation());
			}
			this.setLocationsArray(LocationsArray);
			var Polygon = this.getPolygon();
			if (typeof Polygon === "undefined") {
				Polygon = new google.maps.Polygon({map:this.getMap()});
			}
			Polygon.setPath(LocationsArray);
			this.setPolygon(Polygon);
		},
		exit: function() {
			this.getPolygon().setMap(null);
		}

	});

	sap.ui.core.Element.extend("mexbalia.CSI.Polyline",{
		metadata:{
			properties:{
				"map":"object",
				"Polyline":"object",
				"locationsArray":{type:"object[]",defaultValue:[]},
				"clickable":"boolean",
				"strokeColor":"string",
				"strokeOpacity":"float",
				"strokeWeight":"float"
			},
			aggregations:{
				"locations":{type:"mexbalia.CSI.Location"}
			}
		},
		draw: function(){
			var Locations = this.getLocations();
			var LocationsArray = [];
			for (var i in Locations){
				Locations[i].genLocation();
				LocationsArray.push(Locations[i].getLocation());
			}
			this.setLocationsArray(LocationsArray);
			var Polyline = this.getPolyline();
			if (typeof Polyline === "undefined") {
				Polyline = new google.maps.Polyline({map:this.getMap(),clickable:this.getClickable(),strokeColor:this.getStrokeColor(),strokeOpacity:this.getStrokeOpacity(),strokeWeight:this.getStrokeWeight()});
			}
			Polyline.setPath(LocationsArray);
			this.setPolyline(Polyline);
		},
		exit: function() {
			this.getPolyline().setMap(null);
		}


	});

	sap.ui.core.Element.extend("mexbalia.CSI.HeatMap",{
		metadata:{
			properties:{
				"map":"object",
				"heatMap":"object",
				"locationsArray":{type:"object[]",defaultValue:[]},
				"gradient":"string[]",
				"maxIntensity":"float",
				"opacity":"float",
				"radius":"float"
			},
			aggregations:{
				"locations":{type:"mexbalia.CSI.Location"}
			}
		},
		draw: function(){
			var Locations = this.getLocations();
			var LocationsArray = [];
			for (var i in Locations){
				Locations[i].genLocation();
				LocationsArray.push(Locations[i].getLocation());
			}
			this.setLocationsArray(LocationsArray);
			var HeatMap = this.getHeatMap();
			if (typeof HeatMap === "undefined") {
				HeatMap = new google.maps.visualization.HeatmapLayer({map:this.getMap(),gradient:this.getGradient(),maxIntensity:this.getMaxIntensity(),opacity:this.getOpacity(),radius:this.getRadius()});
			}
			HeatMap.setData(LocationsArray);
			this.setHeatMap(HeatMap);
		},
		exit: function() {
			this.getHeatMap().setMap(null);
		}


	});

	sap.ui.core.Element.extend("mexbalia.CSI.MarkersLayer",{
		metadata:{
			properties:{
				"map":"object",
				"animation":"object",
				"clickable":"boolean",
				"title":"string"
			},
			aggregations:{
				"markers":{type:"mexbalia.CSI.Marker"}
			}
		},
		draw:function(){
			var Markers = this.getMarkers();
			var Map = this.getMap();
			for (var i in Markers){
				Markers[i].setMap(Map);
				Markers[i].draw();
				}
		}
	});

	sap.ui.core.Element.extend("mexbalia.CSI.Location",{
		metadata:{
			properties:{
			"latitude":"string",
			"longitude":"string",
			"location":"object",
			}
		},
		genLocation: function() {
			var Loc = this.getLocation();
			if (typeof Loc === "undefined" || Loc.lat() != this.getLatitude || Loc.lng() != this.getLongitude()){
				var Loc = new google.maps.LatLng(this.getLatitude(),this.getLongitude());
				this.setLocation(Loc);
			}
		}
	});
	mexbalia.CSI.Location.extend("mexbalia.CSI.Marker",{
		metadata:{
			properties:{
			"map":"object",
			"marker":"object",
			"animation":"object",
			"clickable":"boolean",
			"title":"string"
			}
		},
		draw: function() {
			var Marker = this.getMarker();
			if (typeof Marker === "undefined"){
				var Map = this.getMap();
				this.genLocation();
				Marker = new google.maps.Marker({position:this.getLocation(),map:Map,title:this.getTitle(),animation:this.getAnimation(),clickable:this.getClickable()});
				this.setMarker(Marker);
			}
			else{
				this.genLocation();
				Marker.setPosition(this.getLocation());
			}

		},
		exit: function(){
			this.getMarker().setMap(null);
		}

	});



	sap.ui.core.Control.extend("mexbalia.CSI.Map",{
		metadata:{
			properties:{
			"zoom":{type:"int",defaultValue:5},
			"center":{type:"object",defaultValue:{latitude:22.804899,longitude:-102.488591}},
			"map":"object",
			"backgroundColor":"string"
			}, 
			aggregations: {
			"markers":{type:"mexbalia.CSI.Marker"},
			"Layers":{type:"sap.ui.core.Element"}
		
		
			}
		},
		renderer:function(oRm,oControl){
			oRm.write("<div id=\"mapa"+oControl.getId()+"\" style=\"height:100%;width:100%;\"> </div>");
			
			
			
		},
		onAfterRendering:function(){
					  var Center = this.getCenter();
					  var mapOptions = {
							    zoom: this.getZoom(),
							    center: new google.maps.LatLng(Center.latitude, Center.longitude),
							    mapTypeId: google.maps.MapTypeId.ROADMAP
							  };

							  var map = new google.maps.Map(document.getElementById("mapa"+this.getId()), mapOptions);
							  this.setMap(map);
		},
		rerender:function(){
			var Layers = this.getLayers();
			for (var i in Layers){
				Layers[i].setMap(this.getMap());
				Layers[i].draw();
			}
		}

	});
