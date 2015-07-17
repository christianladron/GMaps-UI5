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
	sap.ui.core.Element.extend("mexbalia.Maps.Polyline",{
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
				"locations":{type:"mexbalia.Maps.Location"}
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
			console.log("Soy polilinea y muero");
		},
		setPolylineProperty:function(property, value){
			if (property in this.getMetadata().getProperties())
				{
					this.setProperty(property,value);
				}
			this.getPolyline().set(property,value);
		}



	});
