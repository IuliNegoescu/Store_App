sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (JSONModel, Controller, History) {
	"use strict";

	return Controller.extend("ui5.walkthrough.controller.Settings", {
		
		onInit: function () {
           // alert('hgvjhvhj')
		},

		onNavBack: function () {
            const oHistory = sap.ui.core.routing.History.getInstance();
            const sPreviousHash = oHistory.getPreviousHash();
        
            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this.getOwnerComponent().getRouter().navTo("overview", {}, true);
            }
        }
	});
});
