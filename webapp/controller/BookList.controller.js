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
			var oTable = this.byId("bookList");
			this._oTable = oTable;
			//keeps the search state
			this._oTableSearchState = [];
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
				"bnew": [ new sap.ui.model.Filter("book>Status", "StartsWith", "N")],
				"instock": [ new sap.ui.model.Filter("book>Status", "StartsWith","I" )],
				"soldout": [ new sap.ui.model.Filter("book>Status", "StartsWith", "S")],
				"countall": []
			};
		},
		onUpdateFinished: function(oEvent){
			var oViewModel = this.getView().getModel("view");
				//Get the count for all the books and set the value to 'countall' property
			if(oViewModel){
				this.getView().getModel().read("/Books/$count", {
		         success: function (oData) {
		            oViewModel.setProperty("/countall", oData);
		         }
		      });
		      // read the count for the New filter
		      this.getModel().read("/Books/$count", {
		         success: function (oData) {
		            oViewModel.setProperty("/bnew", oData);
		         },
		         filters: this._mFilters.bnew
		      });
		      // read the count for the inStock filter
		      this.getModel().read("/Books/$count", {
		         success: function(oData){
		            oViewModel.setProperty("/instock", oData);
		         },
		         filters: this._mFilters.instock
		      });  
		      // read the count for the soldout filter
		      this.getModel().read("/Books/$count", { 
		         success: function(oData){
		            oViewModel.setProperty("/soldout", oData);
		         },
		         filters: this._mFilters.soldout
		      }); 
			}
		},
		onQuickFilter: function(oEvent){

			var oBinding = this._oTable.getBinding("items"),
			sKey = oEvent.getParameter("selectedKey");
			oBinding.filter(this._mFilters[sKey]);
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