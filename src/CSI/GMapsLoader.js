jQuery.sap.require('sap.ui.core.Element');
jQuery.sap.declare("mexbalia.CSI.GMapsLoader");
mexbalia.CSI.GMapsLoader = new sap.ui.core.Element();
mexbalia.CSI.GMapsLoader.callback = function() {
	this.fireEvent('GMapsLoaded-mexbalia');
};
if(typeof google === "undefined"){
	jQuery.sap.includeScript('https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=visualization&callback=mexbalia.CSI.GMapsLoader.callback');
}
