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

	jQuery.sap.require('sap.ui.core.Element','mexbalia.Maps.Marker');
	sap.ui.core.Element.extend("mexbalia.Maps.MarkersLayer",{
		metadata:{
			properties:{
				"map":"object",
				"animation":"object",
				"clickable":"boolean",
				"title":"string",
				"visible":{type:"boolean",defaultValue:true}
			},
			aggregations:{
				"markers":{type:"mexbalia.Maps.Marker"}
			},
			events:{
				"nextDraw":{}
			}

		},
		drawMarker: function(index,Marker){
				var Map = this.getParent().getMap();
				Marker.setMap(Map);
				Marker.draw();
		},
		disappear: function(){
				var Markers = this.getMarkers();
				var dissapear = function(index,Marker){
					Marker.getMarker().setMap(null);
				}
				jQuery.each(Markers,dissapear);
				this.setVisible(false);
		},
		appear: function(){
				var Markers = this.getMarkers();
				var apear = function(index,Marker){
					Marker.getMarker().setMap(this.getMap());
				}
				this.setVisible(true);
				this.draw();
				jQuery.each(Markers,apear);
		},
		draw:function(){
			if(!this.getMap()){
				this.setMap(this.getParent().getMap());
			}
			var Markers = this.getMarkers();
			if(this.getVisible()){
				jQuery.each(Markers,this.drawMarker);
			}
			this.fireNextDraw();
		},
		exit: function(){
			console.log("Soy markerlayer y muero");
		}
	});
