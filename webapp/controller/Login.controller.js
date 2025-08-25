sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], (Controller, History, MessageToast, JSONModel) => {
	"use strict";

	return Controller.extend("ui5.walkthrough.controller.Login", {
		onInit() {
			const oModel = new JSONModel({
                username:"",
                password:""
            });
            this.getView().setModel(oModel,"login");
		},
        onLoginPress()
        {
            const oView = this.getView();
            const sUsername = oView.byId("usernameInput").getValue();
            const sPassword = oView.byId("passwordInput").getValue();
            if(sUsername ==="admin" && sPassword ==="admin123")
            {
                MessageToast.show("Login reusit!");
                this.getOwnerComponent().getRouter().navTo("users" );
            }
            else
            {
                MessageToast.show("Username or incorect password");
            }
            
        },
        onRegisterPress()
        {
            this.getOwnerComponent().getRouter().navTo("create",{
                invoicePath: "3"
            });
        }
	});
});