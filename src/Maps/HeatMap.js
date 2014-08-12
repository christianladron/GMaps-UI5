    //Google Maps control for SAP UI5
    //Copyright (C) 2014  Christian Ladrón de Guevara Reyes

    //This program is free software: you can redistribute it and/or modify
    //it under the terms of the GNU General Public License as published by
    //the Free Software Foundation, either version 3 of the License, or
    //(at your option) any later version.

    //This program is distributed in the hope that it will be useful,
    //but WITHOUT ANY WARRANTY; without even the implied warranty of
    //MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    //GNU General Public License for more details.

    //You should have received a copy of the GNU General Public License
    //along with this program.  If not, see <http://www.gnu.org/licenses/>.

	jQuery.sap.require('sap.ui.core.Element','mexbalia.Maps.Map','mexbalia.Maps.Location'); 
	sap.ui.core.Element.extend("mexbalia.Maps.HeatMap",{
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
				"locations":{type:"mexbalia.Maps.Location"}
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
