sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("zempcapm1proj1.controller.View1", {
        onInit: async function () {
            var oModel = this.getOwnerComponent().getModel();
            const oListBinding = oModel.bindList("/ReadEmp");
            const aContexts = await oListBinding.requestContexts(0, 100); // skip=0, top=100

            const aEmp = aContexts.map(ctx => ctx.getObject());

            console.log("Employees:", aEmp);
            var json1 = new JSONModel();
            json1.setData(aEmp);
            this.getView().setModel(json1, 'emp');


        },
        onCreate: function () {
            var oModel = this.getOwnerComponent().getModel();


            const sEmpid = this.byId("idEmpid").getValue();
            const sEmpname = this.byId("idEmpname").getValue();

           
            const oListBinding = oModel.bindList("/ReadEmp", undefined, [], null, {
                $$updateGroupId: "createGroup"
            });
           
            oListBinding.create({
                empid: sEmpid,
                empname: sEmpname
            });           
            oModel.submitBatch("createGroup").then(() => {
                sap.m.MessageToast.show("Employee created successfully");            
                this.byId("idEmpTable").bindItems({
                    path: "/ReadEmp",
                    template: new sap.m.ColumnListItem({
                        cells: [
                            new sap.m.Text({ text: "{empid}" }),
                            new sap.m.Text({ text: "{empname}" })
                        ]
                    })
                });
             
            }).catch((err) => {
                sap.m.MessageBox.error("Creation failed: " + err.message);
            });


        },
      
          
    });
});