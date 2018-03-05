sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel"
], function(UIComponent, JSONModel, ResourceModel) {
	"use strict";

	return UIComponent.extend("sap.ui.demo.walkthrough.Component", {

		metadata: {
			manifest: "json"
		},

		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			//set data model
			var oData = {
				recipient: {
					name: "Roshan"
				}
				
			};
			
			var oModel = new JSONModel(oData);
			this.setModel(oModel);
			
			//set i18n model
			var i18nModel = new ResourceModel({
				bundleName : "sap.ui.demo.walkthrough.i18n.i18n"
			});
			this.setModel(i18nModel, "i18n");

		}
	});
});