sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.OtelProfile", {
        
        onInit: function () {
            var oProducts = new JSONModel({
                items: [
                    { id:"p1", name:"Cornier otel 40x40x4 mm", width: 40, thickness: 4, price: 15.58, img:"img/OtelProfile/Cornier-40x40x4-mm.jpg" },
                    { id:"p2", name:"Otel patrat rasucit 14x14 mm", width: 14, thickness: 6, price: 81.02, img:"img/OtelProfile/otel patrat rasucit.jpg" },
                    { id:"p3", name:"Cornier otel 50x50x4 mm", width: 50, thickness: 4, price: 19.69, img:"img/OtelProfile/cornier_50X50X4.webp" },
                    { id:"p4", name:"Cornier otel 20x20x3 mm", width: 20, thickness: 3, price: 5.69, img:"img/OtelProfile/cornier_20X20X3.webp" }
                ]
                
            });
            this.getView().setModel(oProducts, "prod");
        },

        onFilterSelect: function () {
            var oView = this.getView();
            var oList = oView.byId("productList");
            var oBinding = oList.getBinding("items");
        
            var aFilters = [];
        
            // width
            if (oView.byId("cbWidth12").getSelected()) {
                aFilters.push(new sap.ui.model.Filter("width", "EQ", 12));
            }
            if (oView.byId("cbWidth14").getSelected()) {
                aFilters.push(new sap.ui.model.Filter("width", "EQ", 14));
            }
            if (oView.byId("cbWidth20").getSelected()) {
                aFilters.push(new sap.ui.model.Filter("width", "EQ", 20));
            }
        
            // thickness
            if (oView.byId("cbThick3").getSelected()) {
                aFilters.push(new sap.ui.model.Filter("thickness", "EQ", 3));
            }
            if (oView.byId("cbThick4").getSelected()) {
                aFilters.push(new sap.ui.model.Filter("thickness", "EQ", 4));
            }
            if (oView.byId("cbThick5").getSelected()) {
                aFilters.push(new sap.ui.model.Filter("thickness", "EQ", 5));
            }
        
            oBinding.filter(aFilters);
        },

        onAddToCart: function (oEvent) {
            var oItem = oEvent.getSource().getBindingContext("prod").getObject();
            MessageToast.show(oItem.name + " a fost adaugat in cos!");
        }

    });
});
