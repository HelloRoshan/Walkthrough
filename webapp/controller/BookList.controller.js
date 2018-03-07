sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/demo/walkthrough/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";
	
	return Controller.extend("sap.ui.demo.walkthrough.controller.BookList", {
		formatter: formatter,
		onInit: function(){
			var oViewModel = new JSONModel({
				currency: "NPR"
			});
			this.getView().setModel(oViewModel, "view");
		},
		onFilterBooks: function (oEvent) {
			//build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if(sQuery) {
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
			}
			
			//filter binding
			var oList = this.byId("bookList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		}
	});
});