sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/demo/walkthrough/model/formatter"
], function(Controller, JSONModel, formatter) {
	"use strict";
	
	return Controller.extend("sap.ui.demo.walkthrough.controller.BookList", {
		formatter: formatter,
		onInit: function(){
			var oViewModel = new JSONModel({
				currency: "NPR"
			});
			this.getView().setModel(oViewModel, "view");
		}
	});
});