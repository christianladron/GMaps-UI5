jQuery.sap.require('sap.ui.core.Element');
jQuery.sap.declare("mexbalia.Maps.GMapsLoader");
mexbalia.Maps.GMapsLoader = new sap.ui.core.Element();
mexbalia.Maps.GMapsLoader.callback = function() {
	this.fireEvent('GMapsLoaded-mexbalia');
};
if(typeof google === "undefined"){
	jQuery(document).ready(function(){
		jQuery.sap.includeScript('https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=visualization&callback=mexbalia.Maps.GMapsLoader.callback');
});
}
