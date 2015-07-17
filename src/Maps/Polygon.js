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
	sap.ui.core.Element.extend("mexbalia.Maps.Polygon",{
		metadata:{
			properties:{
				"map":"object",
				"polygon":"object",
				"locationsArray":{type:"object[]",defaultValue:[]},
				"clickable":"boolean",
				"fillColor":"string",
				"fillOpacity":"float",
				"strokeColor":"string",
				"strokeOpacity":"float",
				"strokeWeight":"float"
			},
			aggregations:{
				"locations":{type:"mexbalia.Maps.Location"}
			},
			events:{
				"nextDraw":{}
			}
		},
		firstDraw: function(){
				this.setMap(this.getParent().getMap());
				Polygon = new google.maps.Polygon({
					map:this.getMap(),
					fillColor:this.getFillColor(),
					fillOpacity:this.getFillOpacity(),
					strokeColor:this.getStrokeColor(),
					strokeOpacity:this.getStrokeOpacity(),
					strokeWeight:this.getStrokeWeight(),
					clickable:this.getClickable()
				});
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
			this.fireNextDraw();
		},
		exit: function() {
			this.getPolygon().setMap(null);
			console.log("Soy poligono y muero");
		},
		setPolygonProperty:function(property, value){
			if (property in this.getMetadata().getProperties())
				{
					this.setProperty(property,value);
				}
			this.getPolygon().set(property,value);
		}

	});
