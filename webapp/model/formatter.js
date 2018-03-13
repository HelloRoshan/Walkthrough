sap.ui.define([], function() {
	"use strict";
	
	return {
		statusText: function(sStatus){
			var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			switch(sStatus) {
				case "A":
					return resourceBundle.getText("bookStatusA");
				case "B":
					return resourceBundle.getText("bookStatusB");
				case "C":
					return resourceBundle.getText("bookStatusC");
				default:
					return sStatus;
			}
		}
	};
});