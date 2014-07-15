
	jQuery.sap.require('mexbalia.CSI.GMapsLoader','sap.ui.core.Control');



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
				"Layers":{type:"sap.ui.core.Element"},
			},
			events:{
				"MapCreated":{}
			}
		},
		renderer:function(oRm,oControl){
			oRm.write("<div id=\"mapa"+oControl.getId()+"\" style=\"height:100%;width:100%;\"> </div>");
		},
		onAfterRendering:function(){
			if(typeof google === "undefined" || typeof google.maps === "undefined" ){
				mexbalia.CSI.GMapsLoader.attachEvent('GMapsLoaded-mexbalia',this.firstRendering,this);
			}
			else{
				this.firstRendering();
			}
		},
		firstRendering:function(){
			var Center = this.getCenter();
			var mapOptions = {
				zoom: this.getZoom(),
				center: new google.maps.LatLng(Center.latitude, Center.longitude),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			var map = new google.maps.Map(document.getElementById("mapa"+this.getId()), mapOptions);
			this.setMap(map);
			this.fireMapCreated();
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
