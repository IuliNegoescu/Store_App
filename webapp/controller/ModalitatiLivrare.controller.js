sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.ModalitatiLivrare", {
        
        onInit: function () {
            var oProducts = new JSONModel({
                deliveryOptions: [
                    {
                        "title": "Livrare cu flota Standard",
                        "subtitle": "Produse uzuale",
                        "image": "img/master.webp",
                        "description": "Îți livrăm acasă corpuri de mobilier, obiecte sanitare sau orice alt produs de dimensiuni normale."
                      },
                      {
                        "title": "Livrare materiale voluminoase",
                        "subtitle": "Cantități mari",
                        "image": "img/volvo.jpeg",
                        "description": "Poți cumpăra fără griji cantități mari de produse voluminoase – ex: vată minerală, rigips."
                      },
                      {
                        "title": "Livrare materiale grele",
                        "subtitle": "Macarale și utilaje",
                        "image": "img/volvo_v2.jpg",
                        "description": "Facilităm descărcarea materialelor grele prin intermediul macaralelor sau utilajelor specializate."
                      }
                ]
            });
            this.getView().setModel(oProducts, "delivery");
        }
    });
});
