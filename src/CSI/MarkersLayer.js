
	jQuery.sap.require('sap.ui.core.Element','mexbalia.CSI.Marker');
	sap.ui.core.Element.extend("mexbalia.CSI.MarkersLayer",{
		metadata:{
			properties:{
				"map":"object",
				"animation":"object",
				"clickable":"boolean",
				"title":"string"
			},
			aggregations:{
				"markers":{type:"mexbalia.CSI.Marker"}
			}	
		},
		drawMarker: function(index,Marker){
				var Map = this.getParent().getMap();
				Marker.setMap(Map);
				Marker.draw();
		},
		draw:function(){
			if(!this.getMap()){
				this.setMap(this.getParent().getMap());
			}
			var Markers = this.getMarkers();
			jQuery.each(Markers,this.drawMarker);
		}
	});
