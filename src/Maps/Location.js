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

	jQuery.sap.require('sap.ui.core.Element');
	jQuery.sap.require('mexbalia.Maps.Map');
	sap.ui.core.Element.extend("mexbalia.Maps.Location",{
		metadata:{
			properties:{
			"latitude":"string",
			"longitude":"string",
			"location":"object",
			"wktLocation":"string",
			"text":"string"
			}
		},
		genLocation: function() {
			var Loc = this.getLocation();
			if (typeof Loc === "undefined" || Loc.lat() != this.getLatitude || Loc.lng() != this.getLongitude()){
				if (typeof this.getWktLocation() === "undefined"){
				var Loc = new google.maps.LatLng(this.getLatitude(),this.getLongitude());
				}
				else{
					wkt_conv.read(this.getWktLocation());
					var Loc = wkt_conv.toObject().getPosition();
					this.setLatitude(Loc.lat());
					this.setLongitude(Loc.lng());
				}
				this.setLocation(Loc);
			}
			if (typeof Loc === "undefined"){
				throw "Location can't be created, information not avaliable";
			}
		}
	});
