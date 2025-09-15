sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/ui/core/Fragment",
  "sap/m/MessageToast",
  "sap/m/Dialog",
  "sap/ui/core/HTML",
  "sap/m/Button"
], function (Controller,JSONModel,Fragment, MessageToast, Dialog, HTML, Button) {
  "use strict";

  return Controller.extend("ui5.walkthrough.controller.Website_firstpage", {

    onInit: function () {
        
        
  
        this._oCatsPopover = null;
        const items = [
            { id:"p1", name:"Teavă pătrată 40x40", price: 32.50, img:"img/p1.webp" },
            { id:"p2", name:"Fier beton Ø12",      price: 8.90,  img:"img/fierbeton12.jpeg" },
            { id:"p3", name:"Panouri Sandwich 6cm", price: 129.0, img:"img/panou-sandwich-perete_372e1038-9eb2-4a68-86ae-cc45d3532349.webp" },
            { id:"p4", name:"Panou gard zincat bordurat, verde, 600 x 2000 mm",           price: 35.0,  img:"img/panou_gard.jpg" },
            { id:"p5", name:"Plasă sudată 4mm",    price: 22.0,  img:"img/38400_550_550_0.jpg" }
        ]
        var oProducts = new sap.ui.model.json.JSONModel({
            items: items
          });
         // this.getView().setModel(oProducts, "prod");

         const categories =  [
            { id: "otel-profile",      title: "Otel si profile",                         icon: "sap-icon://chain-link" },
            { id: "panouri-sandwich",     title: "Panouri sandwich",                        icon: "sap-icon://dimension" },
            { id: "beton-ciment", title: "Beton si ciment",                    icon: "sap-icon://factory"},
            { id: "caramida-bca",     title: "Caramida & BCA",           icon: "sap-icon://building" }
          ]
          const categories1 =
          [
            { id: "izolatii",         title: "Izolatii",                icon: "sap-icon://door" },
            { id: "acoperisuri",   title: "Acoperisuri",          icon: "sap-icon://lightbulb" },
            { id: "gard-plase",       title: "Garduri & plase",                icon: "sap-icon://wrench" },
            { id: "scule-unelte",       title: "Scule & unelte",   icon: "sap-icon://picture" }
          ]
          const categories2 = 
          [
            { id: "electrice",     title: "Electrice", icon: "sap-icon://temperature" },
            { id: "sanitare",    title: "Sanitare/Instalatii",   icon: "sap-icon://stethoscope" },
            { id: "vopsele",   title: "Vopsele & tencuieli",               icon: "sap-icon://attachment-photo" },
            { id: "lemn-osb",        title: "Lemn & OSB",                              icon: "sap-icon://car-rental" }
          ]
          

          const oViewModel = new JSONModel()

          oViewModel.setProperty("/items", items)
          oViewModel.setProperty("/categories", categories)
          oViewModel.setProperty("/categories1", categories1)
          oViewModel.setProperty("/categories2", categories2)


          this.getView().setModel(oViewModel, "viewModel")
        
          this._oCatsPopover = null;
          this._oAccountPopover = null;
          this._oMapDialog = null;
          this._oCostDialog = null;
  
      },
  
      onCategoriiPress: function (oEvent) {
        var oButton = oEvent.getSource();
  
        if (!this._oCatsPopover) {
          Fragment.load({
            name: "ui5.walkthrough.view.fragments.Category",
            controller: this
          }).then(function (oPopover) {
            this._oCatsPopover = oPopover;
            this.getView().addDependent(this._oCatsPopover);
            this._oCatsPopover.openBy(oButton);
          }.bind(this));
        } else {
          this._oCatsPopover.openBy(oButton);
        }
      },
      onCategoryPress1: function (oEvent) {
        var oCtx = oEvent.getSource().getBindingContext("viewModel");
        var oData = oCtx.getObject();
    
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
    
        oRouter.navTo("otelprofile", {
            category: oData.id   
        });
    
        this._oCatsPopover.close();
    },
    


    onSearch: function (oEvent) {
      const sQuery = oEvent.getParameter("newValue") ?? oEvent.getSource().getValue();
      MessageToast.show("Caut: " + (sQuery || "(gol)"));
    },

    onNewsletterSearch: function (oEvent) {
      const sEmail = oEvent.getParameter("query");
      if (!sEmail) return MessageToast.show("Introdu adresa de email.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sEmail)) return MessageToast.show("Email invalid.");
      MessageToast.show("Te-ai abonat cu: " + sEmail);
      oEvent.getSource().setValue("");
    },

    onFavoritePress: function () { MessageToast.show("Deschid Favorite"); },
    onCosPress: function () { MessageToast.show("Cosul tau"); },
    onStiluriPress: function () { MessageToast.show("Stiluri de amenajare"); },
    onCatalogPress: function () { MessageToast.show("Catalog produse"); },

    onContulMeuPress: function (oEvent) {
        var oButton = oEvent.getSource();
    
        if (!this._oAccountPopover) {
            Fragment.load({
                name: "ui5.walkthrough.view.fragments.Account",
                controller: this
            }).then(function (oPopover) {
                this._oAccountPopover = oPopover;
                this.getView().addDependent(this._oAccountPopover);
                this._oAccountPopover.openBy(oButton);
            }.bind(this));
        } else {
            this._oAccountPopover.openBy(oButton);
        }
    },
    
    onLoginPress: function () {
        this._oAccountPopover.close();
        sap.m.MessageToast.show("Navighează la pagina de Login");
    },
    
    onSignUpPress: function () {
        this._oAccountPopover.close();
        sap.m.MessageToast.show("Navighează la pagina de Sign Up");
    },
    onAddToCart: function (oEvent) {
        var oCtx = oEvent.getSource().getBindingContext("viewModel");
        var oItem = oCtx && oCtx.getObject();
        sap.m.MessageToast.show("Adăugat în coș: " + (oItem ? oItem.name : "?"));
      },

      onModalitatiLivrarePress:function()
      {
          this.getOwnerComponent().getRouter().navTo("ModalitatiLivrare");
      },
      
    

    onEstimareCostLivrarePress: function () {
      if (!this._oCostDialog) {
        this._oCostDialog = new Dialog({
          title: "Estimare cost livrare",
          contentWidth: "520px",
          resizable: true,
          draggable: true,
          content: [new HTML({ content:
            "<div style='padding:12px;line-height:1.5'>" +
            "<p>Formular demo (oraș, km, greutate).</p>" +
            "<p>Exemplu: cost = 3 lei/km * KM + 0.5 lei/kg * GREUTATE.</p>" +
            "</div>"
          })],
          beginButton: new Button({ text: "Închide", press: () => this._oCostDialog.close() })
        });
        this.getView().addDependent(this._oCostDialog);
      }
      this._oCostDialog.open();
    },

    onOpenMap: function () {
        var src = "https://www.google.com/maps?q=44.9067421,25.4923802&z=17&output=embed";
      
        if (!this._oMapDialog) {
          this._oMapDialog = new sap.m.Dialog({
            title: "Locația magazinului",
            contentWidth: "90%",
            contentHeight: "70%",
            resizable: true,
            draggable: true,
            content: [
              new sap.ui.core.HTML({
                sanitizeContent: false, 
                content:
                  "<div style='width:100%;height:100%'>" +
                    "<iframe width='100%' height='100%' style='border:0' loading='lazy' allowfullscreen " +
                    "referrerpolicy='no-referrer-when-downgrade' src='" + src + "'></iframe>" +
                  "</div>"
              })
            ],
            beginButton: new sap.m.Button({
              text: "Închide",
              press: function () { this._oMapDialog.close(); }.bind(this)
            })
          });
          this.getView().addDependent(this._oMapDialog);
        }
        this._oMapDialog.open();
      }
      

  });
});
