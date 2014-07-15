
	jQuery.sap.require('sap.ui.core.Element');
	jQuery.sap.require('mexbalia.Maps.Map');
	sap.ui.core.Element.extend("mexbalia.Maps.Location",{
		metadata:{
			properties:{
			"latitude":"string",
			"longitude":"string",
			"location":"object",
			}
		},
		genLocation: function() {
			var Loc = this.getLocation();
			if (typeof Loc === "undefined" || Loc.lat() != this.getLatitude || Loc.lng() != this.getLongitude()){
				var Loc = new google.maps.LatLng(this.getLatitude(),this.getLongitude());
				this.setLocation(Loc);
			}
		}
	});
