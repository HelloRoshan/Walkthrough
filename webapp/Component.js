sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/resource/ResourceModel",
	"sap/ui/demo/walkthrough/controller/HelloDialog",
	"sap/ui/Device"
], function(UIComponent, JSONModel, ResourceModel, HelloDialog, Device) {
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
					name: "Reader"
				}
				
			};
			
			var oModel = new JSONModel(oData);
			this.setModel(oModel);
			
			// set device model
			var oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device");
			
			//set i18n model
			var i18nModel = new ResourceModel({
				bundleName : "sap.ui.demo.walkthrough.i18n.i18n"
			});
			this.setModel(i18nModel, "i18n");
			
			//set dialog and private function start with underscore 
			this._helloDialog = new HelloDialog(this.getRootControl());
			
			//create the view based on url/hash
			this.getRouter().initialize();
		},
		getContentDensityClass : function() {
			if (!this._sContentDensityClass) {
				if (!sap.ui.Device.support.touch) {
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		},
		exit: function(){
			this._helloDialog.destroy();
			delete this._helloDialog;
		},
		
		openHelloDialog: function(){
			this._helloDialog.open();
		}
	});
});