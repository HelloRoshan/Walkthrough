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
				currency: "NPR",
				countall: 0,
				bnew: 0,
				instock: 0,
				soldout: 0
			});
			this.getView().setModel(oViewModel, "view");
			
			//create an object of filters
			this._mFilters = {
				"countall": [],
				"bnew": [ new sap.ui.model.Filter("BooksInStock", "GT", 10)],
				"instock": [ new sap.ui.model.Filter("BooksInStock", "GT", 10)],
				"soldout": [ new sap.ui.model.Filter("BooksInStock", "BT", 1, 10)]
			};
		},
		onUpdateFinished: function(){
			var oViewModel = this.getModel("view");
			
			//Get the count for all the books and set the value to 'countall' property
			
		},
		onFilterBooks: function (oEvent) {
			//build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if(sQuery) {
				aFilter.push(new Filter("title", FilterOperator.Contains, sQuery));
			}
			
			//filter binding
			var oList = this.byId("bookList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},
		onPress: function(oEvent){
			var oItem = oEvent.getSource();
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("detail", {
				bookPath: encodeURIComponent(oItem.getBindingContext("book").getPath().substr(1))          
			});
		}
	});
});