
	jQuery.sap.require('sap.ui.core.Element','mexbalia.CSI.Map','mexbalia.CSI.Location'); 
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
		drawLocation: function(index,Location){
				Location.genLocation();
				LocationsArray.push(Location.getLocation());
		},
		firstDraw: function(){
				this.setMap(this.getParent().getMap());
				HeatMap = new google.maps.visualization.HeatmapLayer({map:this.getMap(),gradient:this.getGradient(),maxIntensity:this.getMaxIntensity(),opacity:this.getOpacity(),radius:this.getRadius()});
				this.setHeatMap(HeatMap);
				this.draw();
		},
		draw: function(){
			if(!this.getHeatMap()){
				this.firstDraw();
			}
			else{
				var Locations = this.getLocations();
				var LocationsArray = [];
				jQuery.each(Locations,function(index,ele){
					ele.genLocation();
					LocationsArray.push(ele.getLocation());
				});
				var HeatMap = this.getHeatMap();
				HeatMap.setData(LocationsArray);
				this.setHeatMap(HeatMap);
			}
		},
		exit: function() {
			this.getHeatMap().setMap(null);
		}


	});
