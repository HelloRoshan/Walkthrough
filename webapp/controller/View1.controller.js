sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	return Controller.extend("sap.ui.demo.walkthrough.controller.View1", {
		onInit: function () {
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		onOpenDialog : function(){
			this.getOwnerComponent().openHelloDialog();
		}
	});
});