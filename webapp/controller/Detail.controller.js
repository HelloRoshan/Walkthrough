sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/demo/walkthrough/model/formatter",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	"sap/ui/core/format/DateFormat",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
],function(Controller, History, formatter, MessageToast, JSONModel,Device, DateFormat, Filter, FilterOperator){
	"use strict";
	
	return Controller.extend("sap.ui.demo.walkthrough.controller.Detail", {
		formatter: formatter,
		onInit: function(){
			var oViewModel = new JSONModel({
				currency: "NPR"
			});
			this.getView().setModel(oViewModel, "view");
			
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
		},
		_onObjectMatched: function(oEvent){
			this.byId("rating").reset();
			this.getView().bindElement({
				path: decodeURIComponent("/" + oEvent.getParameter("arguments").bookPath),
				model: "book"
			});
		},
		onNavPress: function(){
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			
			if(sPreviousHash !== undefined) {
				window.history.go(-1);
			}else{
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("overview", {}, true);
			}
		},
		onRatingChange: function(oEvent){
			var fValue = oEvent.getParameter("value");
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			MessageToast.show(oResourceBundle.getText("ratingConfirmation", [fValue]));
		}
	});
});