sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/demo/walkthrough/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/resource/ResourceModel"
], function(Controller, JSONModel, formatter, Filter, FilterOperator, ResourceModel) {
	"use strict";
	
	return Controller.extend("sap.ui.demo.walkthrough.controller.BookList", {
		formatter: formatter,
		onInit: function(){
			var oTable = this.byId("bookList");
			this._oTable = oTable;
			
			//set i18n model on view
			var i18nModel = new ResourceModel({
				bundleName: "sap.ui.demo.walkthrough.i18n.i18n"
			});
			this.getView().setModel(i18nModel,"i18n");
			
			var oViewModel = new JSONModel({
				bookListTitle: this.getView().getModel("i18n").getResourceBundle().getText("bookListTitle"),
				NoDataText: this.getView().getModel("i18n").getResourceBundle().getText("NoDataText"),
				countall: 0,
				bnew: 0,
				instock: 0,
				soldout: 0
			});
			this.getView().setModel(oViewModel, "view");
			
			
			//create an object of filters
			this._mFilters = {
				"bnew": [ new sap.ui.model.Filter("Books/Status", "StartsWith", "N")],
				"instock": [ new sap.ui.model.Filter("Books/Status", "StartsWith","I" )],
				"soldout": [ new sap.ui.model.Filter("Books/Status", "StartsWith", "S")],
				"all": []
			};
		},
		onUpdateFinished: function(oEvent){
			var sTitle,
			oTable = oEvent.getSource(),
			oViewModel = this.getView().getModel("view"),
			iTotalItems = oEvent.getParameter("total");
			
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();
			
			if(iTotalItems && oTable.getBinding("items").isLengthFinal()) {
				sTitle = oResourceBundle.getText("bookCount", [iTotalItems]);
				
				//Get the count for all the books and set the value to 'countall' property		
				this.getView().getModel().getProperty("book>/Books" + "/$count", {
		         success: function (oData) {
		            oViewModel.setProperty("/countall", oData);
		         }
		      });
		      // read the count for the New filter
		      this.getView().getModel().getProperty("{book>/Books}" + "/$count", {
		         success: function (oData) {
		            oViewModel.setProperty("/bnew", oData);
		         },
		         filters: this._mFilters.bnew
		      });
		      // read the count for the inStock filter
		      this.getView().getModel().getProperty("book>/Books" + "/$count", {
		         success: function(oData){
		            oViewModel.setProperty("/instock", oData);
		         },
		         filters: this._mFilters.instock
		      });  
		      // read the count for the soldout filter
		      this.getView().getModel().getProperty("book>/Books" + "/$count", { 
		         success: function(oData){
		            oViewModel.setProperty("/soldout", oData);
		         },
		         filters: this._mFilters.soldout
		      }); 
			}
			// } else {
			// 	sTitle = oResourceBundle().getText("bookListTitle");
			// }
			this.getView().getModel("view").setProperty("/bookListTitle", sTitle);
		}
		,
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
		},
		onQuickFilter: function(oEvent){

			var oBinding = this._oTable.getBinding("items"),
				sKey = oEvent.getParameter("selectedKey");
			oBinding.filter(this._mFilters[sKey]);
		}
	});
});