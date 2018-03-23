sap.ui.define([], function() {
	"use strict";
	
	return {
		statusText: function(sStatus){
			var stat = sStatus.trim();
			var resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			switch(stat) {
				case "A":
					return resourceBundle.getText("bookStatusA");
				case "B":
					return resourceBundle.getText("bookStatusB");
				case "C":
					return resourceBundle.getText("bookStatusC");
				default:
					return stat;
			}
		}
	};
});