sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/Sorter",
    "sap/m/MessageToast"
], function (Controller, JSONModel, Filter, Sorter, MessageToast) {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.LichidariStoc", {
        
        onInit: function () {
            // Date demo produse
            var oData = {
                items: [
                    { id: 1, name: "Plasă sudată Ø12", price: 15, width: 12, img: "images/steel12.png" },
                    { id: 2, name: "Plasă sudată Ø14", price: 18, width: 14, img: "images/steel14.png" },
                    { id: 3, name: "Plasă sudată Ø20", price: 25, width: 20, img: "images/steel20.png" },
                    { id: 4, name: "Plasă sudată Ø12 Premium", price: 20, width: 12, img: "images/steel12-premium.png" },
                    { id: 5, name: "Plasă sudată Ø14 Extra", price: 22, width: 14, img: "images/steel14-extra.png" }
                ]
            };

            // Model JSON
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "prod");
        },

        // Filtrare pe checkbox-uri
        onFilterSelect: function () {
            var oList = this.byId("productList");
            var oBinding = oList.getBinding("items");

            var aFilters = [];
            if (this.byId("cbWidth12").getSelected()) {
                aFilters.push(new Filter("width", "EQ", 12));
            }
            if (this.byId("cbWidth14").getSelected()) {
                aFilters.push(new Filter("width", "EQ", 14));
            }
            if (this.byId("cbWidth20").getSelected()) {
                aFilters.push(new Filter("width", "EQ", 20));
            }

            oBinding.filter(aFilters);
        },

        // Sortare ascendentă
        onSortAsc: function () {
            var oList = this.byId("productList");
            var oBinding = oList.getBinding("items");

            var oSorter = new Sorter("price", false); // false = ascendent
            oBinding.sort(oSorter);
        },

        // Sortare descendentă
        onSortDesc: function () {
            var oList = this.byId("productList");
            var oBinding = oList.getBinding("items");

            var oSorter = new Sorter("price", true); // true = descendent
            oBinding.sort(oSorter);
        },

        // Adăugare în coș
        onAddToCart: function (oEvent) {
            var oItem = oEvent.getSource().getBindingContext("prod").getObject();
            MessageToast.show("Adăugat în coș: " + oItem.name + " (" + oItem.price + " lei/m)");
        }
    });
});
