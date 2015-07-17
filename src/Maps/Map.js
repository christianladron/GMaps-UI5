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

	jQuery.sap.require('mexbalia.Maps.GMapsLoader','sap.ui.core.Control');



	sap.ui.core.Control.extend("mexbalia.Maps.Map",{
		metadata:{
			properties:{
				"zoom":{type:"int",defaultValue:5},
				"center":{type:"object",defaultValue:{latitude:22.804899,longitude:-102.488591}},
				"map":"object",
				"backgroundColor":"string",
				"width":"sap.ui.core.CSSSize",
				"height":"sap.ui.core.CSSSize"
			},
			aggregations: {
				"markers":{type:"mexbalia.Maps.Marker"},
				"Layers":{type:"sap.ui.core.Element"},
				"uiLayers":{type:"sap.ui.core.Element"}
			},
			events:{
				"MapCreated":{},
				"MapIdle":{},
				"dblClick":{},
				"click":{}
			}
		},
		renderer:function(oRm,oControl){
			oRm.write("<div ");
			oRm.writeControlData(oControl);
			oRm.write("id=\"mapa"+oControl.getId()+"\" style=\"height:"+ oControl.getHeight() +";width:"+ oControl.getWidth() +";\"> </div>");
		},
		onAfterRendering:function(){
			if(typeof google === "undefined" || typeof google.maps === "undefined" ){
				mexbalia.Maps.GMapsLoader.attachEvent('GMapsLoaded-mexbalia',this.firstRendering,this);
			}
			else{
				this.firstRendering();
			}
		},
		firstRendering:function(){
			var Center = this.getCenter();
			jQuery(this.getDomRef().parentElement).width(this.getWidth());
			jQuery(this.getDomRef().parentElement).height(this.getHeight());
			var mapOptions = {
				zoom: this.getZoom(),
				center: new google.maps.LatLng(Center.latitude, Center.longitude),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map(this.getDomRef(), mapOptions);
			this.setMap(map);
		google.maps.event.addListener(this.getMap(), 'click',function(event){me.fireClick(event);});
			this.fireMapCreated();
			var me = this;
			google.maps.event.addListenerOnce(map, 'idle', function(event){me.fireMapIdle(event);});
		},
		drawLayers:function(){
			var Layers = this.getLayers();
			jQuery.each(Layers,function(index,Layer){
				Layer.draw();
			});
		},
		rerender:function(){
			var Map = this.getMap();
			if(Map){
				this.drawLayers();
			}
			else{
				this.detachMapCreated(this.drawLayers,this);
				this.attachMapCreated(this.drawLayers,this);
			}
		}
	});
