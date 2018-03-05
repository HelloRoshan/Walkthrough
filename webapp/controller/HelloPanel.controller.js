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
		},
		onOpenDialog: function(){
			var oView = this.getView();
			var oDialog = oView.byId("helloDialog");
			//create oDialog lazily if oDialog don't exist this is called
			if(!oDialog){
			//create dialog via fragment fatory "this" part is missing in the documentation
			oDialog = sap.ui.xmlfragment(oView.getId(), "sap.ui.demo.walkthrough.view.HelloDialog", this);
			//always use addDependent to connect dialog to lifecycle management and databinding of view
			oView.addDependent(oDialog);
			}
			
			oDialog.open();
		},
		onCloseDialog: function(){
			this.byId("helloDialog").close();
		}
	});
});