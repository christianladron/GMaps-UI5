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
	sap.ui.core.Element.extend("mexbalia.Maps.TrafficLayer",{
		metadata:{
			properties:{
				"map":"object",
				"trafficLayer":"object",
				"gradient":"string[]",
				"opacity":"float"
			}
		},
		firstDraw: function(){
				this.setMap(this.getParent().getMap());
				TrafficLayer = new google.maps.TrafficLayer({map:this.getMap()});
				this.setTrafficLayer(TrafficLayer);
				this.draw();
		},
		draw: function(){
			if(!this.getTrafficLayer()){
				this.firstDraw();
			}
			else{
					var TrafficLayer = this.getTrafficLayer();
					this.setTrafficLayer(TrafficLayer);
					this.appear();
			}
		},
		disappear: function(){
			this.getTrafficLayer().setMap(null);
		},
		appear: function(){
			this.getTrafficLayer().setMap(this.getMap());
		},
		exit: function() {
			this.getTrafficLayer().setMap(null);
		}


	});
