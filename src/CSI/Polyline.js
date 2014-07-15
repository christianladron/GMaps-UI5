
	jQuery.sap.require('sap.ui.core.Element','mexbalia.CSI.Map','mexbalia.CSI.Location');
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
		firstDraw: function(){
			this.setMap(this.getParent().getMap());
				Polyline = new google.maps.Polyline({map:this.getMap(),clickable:this.getClickable(),strokeColor:this.getStrokeColor(),strokeOpacity:this.getStrokeOpacity(),strokeWeight:this.getStrokeWeight()});
				this.setPolyline(Polyline);
		},
		draw: function(){
			if(!this.getPolyline()){
				this.firstDraw();
			}
			var Locations = this.getLocations();
			var Map = this.getMap();
			var LocationsArray = [];
			jQuery.each(Locations,function(index,Location){
				Location.genLocation();
				LocationsArray.push(Location.getLocation());
			});
			this.setLocationsArray(LocationsArray);
			var Polyline = this.getPolyline();
			Polyline.setPath(LocationsArray);
			Polyline.setMap(Map);
			this.setPolyline(Polyline);
		},
		exit: function() {
			this.getPolyline().setMap(null);
		}


	});
