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

	jQuery.sap.require('mexbalia.Maps.Location','mexbalia.Maps.Map');
	mexbalia.Maps.Location.extend("mexbalia.Maps.Marker",{
		metadata:{
			properties:{
			"map":"object",
			"marker":"object",
			"animation":"object",
			"clickable":"boolean",
			"title":"string",
			"icon":"string",
			"draggable":"boolean"
			},
			events:{
				"click":{},
				"dragEnd":{}
			}
		},
		firstDraw: function() {
			// jQuery.sap.require("sap.ui.core.IconPool");
			// jQuery.sap.require("sap.ui.core.Icon");
				var Map = this.getParent().getMap();
				this.setMap(Map);
				this.genLocation();
				Marker = new google.maps.Marker({position:this.getLocation(),map:Map,title:this.getTitle(),animation:this.getAnimation(),clickable:this.getClickable(),icon:this.getIcon(),draggable:this.getDraggable()});
				this.setMarker(Marker);
				var me = this;
		google.maps.event.addListener(this.getMarker(), 'click',function(event){me.fireClick(event);});
		google.maps.event.addListener(this.getMarker(), 'dragend',function(event){me.fireDragEnd(event);});
		// this.attachClick(this.infowindow);
		},
		// infowindow: function(){
		// 		var marcador = this.getMarker();
		// 		window.lol = marcador;
		// 		var map = this.getMap();
		// 		//var datos = marcador.getBindingContext().getObject();
		//
		// 		var contentString = '<h1>PRueba</h1>';
		// 		var info = new google.maps.InfoWindow({content:contentString});
		// 			info.open(map,marcador);
		// 			console.log("MARCADOR");
		// },
		draw: function() {
			var Marker = this.getMarker();
			if(!Marker){
				this.firstDraw();
			}
			else{
				this.genLocation();
				Marker.setPosition(this.getLocation());
			}

		},
		exit: function(){
			if(this.getMarker()){
			this.getMarker().setMap(null);
			delete this.getMarker();
			//console.log(this);
			}
		}

	});
