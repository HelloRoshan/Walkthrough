sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(Controller, MessageToast) {
	//modules Controller and MessageToast are loaded up
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.HelloPanel", {
		//event handler
		showHello: function(){
			//read msg from i18n model
			var oBundle = this.getView().getModel("i18n").getResourceBundle();
			var sRecipient = this.getView().getModel().getProperty("/recipient/name");
			var sMsg = oBundle.getText("helloMsg", [sRecipient]);
			MessageToast.show(sMsg, {
				width: "20em",
				at: "center"
			});
		}             
	});
});