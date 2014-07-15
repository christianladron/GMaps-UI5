	jQuery.sap.require('sap.ui.core.Element','mexbalia.CSI.Map','mexbalia.CSI.Location');
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
		firstDraw: function(){
				this.setMap(this.getParent().getMap());
				Polygon = new google.maps.Polygon({map:this.getMap()});
				this.setPolygon(Polygon);
		},
		draw: function(){
			if(!this.getPolygon()){
				this.firstDraw();
			}
			var Locations = this.getLocations();
			var LocationsArray = [];
			jQuery.each(Locations,function(index,Location){
				Location.genLocation();
				LocationsArray.push(Location.getLocation());
			});
			this.setLocationsArray(LocationsArray);
			var Polygon = this.getPolygon();
			Polygon.setPath(LocationsArray);
			this.setPolygon(Polygon);
		},
		exit: function() {
			this.getPolygon().setMap(null);
		}

	});
