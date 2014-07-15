
	jQuery.sap.require('mexbalia.CSI.Location','mexbalia.CSI.Map');
	mexbalia.CSI.Location.extend("mexbalia.CSI.Marker",{
		metadata:{
			properties:{
			"map":"object",
			"marker":"object",
			"animation":"object",
			"clickable":"boolean",
			"title":"string"
			}
		},
		firstDraw: function() {
				var Map = this.getParent().getMap();
				this.setMap(Map);
				this.genLocation();
				Marker = new google.maps.Marker({position:this.getLocation(),map:Map,title:this.getTitle(),animation:this.getAnimation(),clickable:this.getClickable()});
				this.setMarker(Marker);
		},
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
			this.getMarker().setMap(null);
		}

	});
